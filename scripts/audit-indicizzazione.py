#!/usr/bin/env python3
"""Verifica tutte le pagine Per Me; --live controlla anche il sito pubblicato."""
from __future__ import annotations

import argparse
from collections import deque
from concurrent.futures import ThreadPoolExecutor
import datetime as dt
import hashlib
from html.parser import HTMLParser
import json
from pathlib import Path
import re
from urllib.error import HTTPError, URLError
from urllib.parse import quote, urljoin, urlsplit
from urllib.request import Request, urlopen
from urllib.robotparser import RobotFileParser
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
BASE = "https://cpcpcp106-coder.github.io/Per-Me/"
TECHNICAL = {"googled120465f7b693b08.html", "contatori-personali/index.html", "contatori-per-me-41c83f9e6c2a4d08b5f71e236ba0d94c.html"}
BLOCK = re.compile(r"\b(noindex|nofollow|none|noimageindex|unavailable_after)\b", re.I)
DYNAMIC_BLOCK = re.compile(r"\b(noindex|nofollow|noimageindex|unavailable_after)\b", re.I)


class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.blocked = []
        self.canonicals = []
        self.scripts = []
        self.links = []
        self.inline_scripts = []
        self.in_script = False

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        name = a.get("name", "").lower().strip()
        rel = a.get("rel", "").lower().split()
        robot = name in {"robots", "slurp", "baiduspider", "yandex", "yandexbot"} or "bot" in name
        if tag == "meta" and (robot or a.get("http-equiv", "").lower() == "x-robots-tag"):
            self.blocked.extend(BLOCK.findall(a.get("content", "")))
        if tag in {"a", "area", "link"} and "nofollow" in rel:
            self.blocked.append("rel=nofollow")
        if tag == "link" and "canonical" in rel:
            self.canonicals.append(a.get("href", ""))
        if tag == "a" and a.get("href"):
            self.links.append(a["href"])
        if tag == "script":
            self.in_script = True
            if a.get("src"):
                self.scripts.append(a["src"])

    def handle_endtag(self, tag):
        if tag == "script":
            self.in_script = False

    def handle_data(self, data):
        if self.in_script:
            self.inline_scripts.append(data)


def canonical_url(path):
    name = path.as_posix()
    if name == "index.html":
        name = ""
    elif name.endswith("/index.html"):
        name = name[:-len("index.html")]
    return BASE + quote(name, safe="/")


def audit_source(root):
    files = sorted(p for p in root.rglob("*") if p.is_file()
                   and not any((part.startswith(".") and part != ".htaccess") or part in {"node_modules", "_site"}
                               for part in p.relative_to(root).parts))
    result = {"public_pages": [], "technical_pages": [], "issues": []}
    navigation = {}
    for path in files:
        if path.suffix.lower() not in {".html", ".htm"}:
            continue
        relative = path.relative_to(root)
        raw = path.read_bytes()
        page = Page()
        page.feed(raw.decode("utf-8"))
        name, url = relative.as_posix(), canonical_url(relative)
        record = {"path": name, "url": url, "sha256": hashlib.sha256(raw).hexdigest()}
        key = "technical_pages" if name in TECHNICAL else "public_pages"
        result[key].append(record)
        if key == "public_pages":
            navigation[url] = (name, page.links)
        if page.blocked and name not in TECHNICAL:
            result["issues"].append(f"{name}: direttive bloccanti {page.blocked}")
        if key == "public_pages" and page.canonicals != [url]:
            result["issues"].append(f"{name}: canonical {page.canonicals}, atteso {url}")
        if any(DYNAMIC_BLOCK.search(s) for s in page.inline_scripts):
            result["issues"].append(f"{name}: istruzioni bloccanti in script inline")
        for src in page.scripts:
            script_url = urljoin(BASE + name, src)
            if script_url.startswith(BASE):
                script = root / script_url[len(BASE):].split("?")[0]
                if script.is_file() and DYNAMIC_BLOCK.search(script.read_text(encoding="utf-8")):
                    result["issues"].append(f"{script.relative_to(root)}: istruzioni bloccanti in script")
    # La presenza nella sitemap non basta: ogni pagina pubblica deve essere
    # raggiungibile dalla home tramite normali collegamenti HTML.
    aliases = {record["url"]: record["url"] for record in result["public_pages"]}
    aliases.update({BASE + quote(record["path"], safe="/"): record["url"]
                    for record in result["public_pages"]})
    graph = {}
    for url, (name, links) in navigation.items():
        targets = set()
        for href in links:
            target = urlsplit(urljoin(BASE + quote(name, safe="/"), href))
            canonical = aliases.get(target._replace(query="", fragment="").geturl())
            if canonical:
                targets.add(canonical)
        graph[url] = targets
    depth = {BASE: 0} if BASE in graph else {}
    pending = deque(depth)
    while pending:
        current = pending.popleft()
        for target in sorted(graph[current]):
            if target not in depth:
                depth[target] = depth[current] + 1
                pending.append(target)
    unreachable = sorted(set(graph) - set(depth))
    result["navigation"] = {"reachable_from_home": len(depth),
                            "unreachable_from_home": unreachable,
                            "depth_from_home": dict(sorted(depth.items()))}
    for url in unreachable:
        result["issues"].append(f"{navigation[url][0]}: non raggiungibile dalla home tramite link HTML")

    for path in files:
        if path.name not in {"robots.txt", "_headers", ".htaccess", "_config.yml", "_config.yaml", "netlify.toml", "vercel.json"}:
            continue
        text = path.read_text(encoding="utf-8")
        if DYNAMIC_BLOCK.search(text) or re.search(r"x-robots-tag\s*[:=].*\bnone\b", text, re.I):
            result["issues"].append(f"{path.relative_to(root)}: configurazione con direttive bloccanti")
        if path.name == "robots.txt" and re.search(r"^[ \t]*Disallow[ \t]*:[ \t]*[^\s#]", text, re.I | re.M):
            result["issues"].append(f"{path.relative_to(root)}: regole Disallow non vuote")
    try:
        tree = ET.parse(root / "sitemap.xml")
        urls = [node.text.strip() for node in tree.iter() if node.tag.split("}")[-1] == "loc" and node.text]
        expected = {p["url"] for p in result["public_pages"]}
        result["sitemap_urls"] = urls
        if len(urls) != len(set(urls)):
            result["issues"].append("sitemap.xml: URL duplicate")
        if set(urls) != expected:
            result["issues"].append(f"sitemap.xml: mancanti {sorted(expected-set(urls))}; eccedenti {sorted(set(urls)-expected)}")
    except (OSError, ET.ParseError) as exc:
        result["issues"].append(f"sitemap.xml: {exc}")
    if not result["public_pages"]:
        result["issues"].append("Nessuna pagina pubblica rilevata")
    return result


def fetch(url):
    request = Request(url, headers={"User-Agent": "PerMe-Indexing-Audit/1.0", "Cache-Control": "no-cache"})
    for attempt in range(2):
        try:
            with urlopen(request, timeout=25) as response:
                headers = {k: ", ".join(response.headers.get_all(k)) for k in set(response.headers.keys())}
                return response.status, headers, response.read(), response.url
        except HTTPError as exc:
            if exc.code < 500 or attempt:
                headers = {k: ", ".join(exc.headers.get_all(k)) for k in set(exc.headers.keys())}
                return exc.code, headers, exc.read(), exc.url
        except (URLError, TimeoutError, OSError):
            if attempt:
                raise


def audit_live(source):
    robots_url = urljoin(BASE, "/robots.txt")
    status, _, data, _ = fetch(robots_url)
    robots = RobotFileParser()
    issues = []
    if status == 200:
        robots.parse(data.decode("utf-8", errors="replace").splitlines())
    elif status in {404, 410}:
        robots.parse([])
    else:
        robots.parse(["User-agent: *", "Disallow: /"])
        issues.append(f"robots.txt all'origine: HTTP {status}")
    requests = {}
    for record in source["public_pages"] + source["technical_pages"]:
        requests[record["url"]] = record
        # Controlla anche index.html esplicito, oltre al relativo URL canonico.
        requests[BASE + quote(record["path"], safe="/")] = record

    def check(item):
        url, record = item
        row = {"url": url, "issues": []}
        try:
            code, headers, body, final = fetch(url)
            row.update(http=code, final_url=final, sha256=hashlib.sha256(body).hexdigest())
            if code != 200:
                row["issues"].append(f"HTTP {code}")
            header = next((v for k, v in headers.items() if k.lower() == "x-robots-tag"), "")
            row["x_robots_tag"] = header
            if BLOCK.search(header):
                row["issues"].append(f"X-Robots-Tag: {header}")
            page = Page()
            page.feed(body.decode("utf-8", errors="replace"))
            if page.blocked and record["path"] not in TECHNICAL:
                row["issues"].append(f"HTML: {page.blocked}")
            if record["path"] not in TECHNICAL and page.canonicals != [record["url"]]:
                row["issues"].append(f"canonical: {page.canonicals}")
            if row["sha256"] != record["sha256"]:
                row["issues"].append("Pubblicazione diversa dal sorgente verificato")
            for agent in ("Googlebot", "Googlebot-Image", "Bingbot", "*"):
                if not robots.can_fetch(agent, url):
                    row["issues"].append(f"robots.txt vieta {agent}")
        except (URLError, TimeoutError, OSError) as exc:
            row["issues"].append(str(exc))
        return row

    with ThreadPoolExecutor(max_workers=8) as pool:
        pages = list(pool.map(check, requests.items()))
    code, headers, body, _ = fetch(BASE + "sitemap.xml")
    header = next((v for k, v in headers.items() if k.lower() == "x-robots-tag"), "")
    if code != 200 or BLOCK.search(header):
        issues.append(f"sitemap pubblicata: HTTP {code}, X-Robots-Tag {header}")
    try:
        urls = [n.text.strip() for n in ET.fromstring(body).iter() if n.tag.split("}")[-1] == "loc" and n.text]
        if sorted(urls) != sorted(source["sitemap_urls"]):
            issues.append("Sitemap pubblicata diversa dal sorgente")
    except ET.ParseError:
        issues.append("Sitemap pubblicata non XML")
    return {"checked_at_utc": dt.datetime.now(dt.timezone.utc).isoformat(),
            "robots_url": robots_url, "robots_http": status,
            "urls_checked": len(pages), "pages": pages, "issues": issues}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--live", action="store_true")
    parser.add_argument("--report", type=Path)
    args = parser.parse_args()
    result = audit_source(ROOT)
    if args.live:
        result["live"] = audit_live(result)
    errors = list(result["issues"])
    if args.live:
        errors.extend(result["live"]["issues"])
        errors.extend(f"{r['url']}: {e}" for r in result["live"]["pages"] for e in r["issues"])
    summary = {"public_pages": len(result["public_pages"]), "technical_pages": len(result["technical_pages"]),
               "sitemap_urls": len(result.get("sitemap_urls", [])),
               "reachable_from_home": result["navigation"]["reachable_from_home"], "issues": len(errors)}
    if args.live:
        summary["live_urls_checked"] = result["live"]["urls_checked"]
        summary["origin_robots_http"] = result["live"]["robots_http"]
    print("PER ME INDICIZZAZIONE", json.dumps(summary, ensure_ascii=False))
    for error in errors:
        print("ERRORE", error)
    if args.report:
        args.report.write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    raise SystemExit(bool(errors))


if __name__ == "__main__":
    main()
