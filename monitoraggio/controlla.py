#!/usr/bin/env python3
"""Per Me: sorveglianza conservativa di fonti e collegamenti, senza dipendenze esterne."""
import datetime as dt
from concurrent.futures import ThreadPoolExecutor
import hashlib
import json
import re
import ssl
import urllib.error
import urllib.request
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urldefrag, urljoin, urlsplit

ROOT = Path(__file__).resolve().parent.parent
DIR = ROOT / "monitoraggio"
STATE = DIR / "stato.json"
REPORT = DIR / "ultimo-controllo.json"
TIMEOUT = 18
HEADERS = {"User-Agent": "PerMe-Monitor/1.0 (progetto informativo non commerciale)", "Accept": "text/html,application/pdf,*/*"}

class Links(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = set()
        self.links = []
        self.images = []
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if "id" in a:
            self.ids.add(a["id"])
        if tag == "a" and a.get("href"):
            self.links.append(a["href"])
        if tag == "img" and a.get("src"):
            self.images.append(a["src"])

def request(url):
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=TIMEOUT) as resp:
        data = resp.read(2_000_000)
        return resp.getcode(), hashlib.sha256(data).hexdigest(), resp.geturl()

def read_json(path, default):
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except (FileNotFoundError, ValueError):
        return default

def main():
    now = dt.datetime.now(dt.timezone.utc).isoformat(timespec="seconds")
    prev = read_json(STATE, {})
    config = read_json(DIR / "fonti.json", {"sources":[]})
    next_state = dict(prev)
    events = []
    for entry in config["sources"]:
        key, url = entry["id"], entry["url"]
        try:
            code, digest, final_url = request(url)
            before = prev.get(key, {}).get("sha256")
            status = "prima_verifica" if before is None else ("variata" if before != digest else "invariata")
            next_state[key] = {"url":url, "sha256":digest, "last_checked":now}
            events.append({"id":key, "rubrica":entry["rubrica"], "status":status, "http":code, "url":url, "final_url":final_url})
        except (urllib.error.URLError, TimeoutError, ValueError, ssl.SSLError) as exc:
            events.append({"id":key, "rubrica":entry["rubrica"], "status":"non_raggiungibile", "url":url, "error":str(exc)[:180]})
    pages = {p.name:p for p in ROOT.glob("*.html")}
    parsed = {}
    for name, path in pages.items():
        parser = Links()
        parser.feed(path.read_text(encoding="utf-8"))
        parsed[name] = parser
    broken = []
    external = {}
    for name, parser in parsed.items():
        for link in parser.links + parser.images:
            if link.startswith(("mailto:","tel:","javascript:","data:")):
                continue
            if link.startswith(("http://","https://")):
                external[link] = True
                continue
            clean, anchor = urldefrag(link)
            target_name = clean.split("?")[0] or name
            if not target_name.startswith("/") and not target_name.startswith("#"):
                f = ROOT / target_name
            else:
                f = ROOT / target_name.lstrip("/")
            if not (f.is_file() or (f.is_dir() and (f / 'index.html').is_file())):
                broken.append({"page":name,"target":link,"issue":"file_mancante"})
            elif anchor and target_name in parsed and anchor not in parsed[target_name].ids:
                broken.append({"page":name,"target":link,"issue":"ancora_mancante"})
    def check_external(url):
        try:
            code, _, final_url = request(url)
            return {"url":url,"status":"raggiungibile","http":code,"final_url":final_url}
        except (urllib.error.URLError, TimeoutError, ValueError, ssl.SSLError) as exc:
            return {"url":url,"status":"da_verificare","error":str(exc)[:180]}

    # I controlli HTTP sono indipendenti: li parallelizziamo con un limite prudente.
    with ThreadPoolExecutor(max_workers=8) as pool:
        external_results = list(pool.map(check_external, sorted(external)))
    report = {
        "checked_at_utc":now,
        "note":"Le variazioni sono segnali da verificare manualmente; non aggiornare automaticamente gli articoli.",
        "fonti":events,"pagine_controllate":len(pages),
        "collegamenti_locali_problematici":broken,
        "collegamenti_esterni":external_results
    }
    DIR.mkdir(exist_ok=True)
    STATE.write_text(json.dumps(next_state, ensure_ascii=False, indent=2)+"\n", encoding="utf-8")
    REPORT.write_text(json.dumps(report, ensure_ascii=False, indent=2)+"\n", encoding="utf-8")
    print(f"Controllate {len(events)} fonti, {len(pages)} pagine, {len(external_results)} URL esterni.")
    print(f"Variazioni: {sum(x['status']=='variata' for x in events)}. Problemi interni: {len(broken)}.")
    # Non fallire per un sito remoto temporaneamente irraggiungibile.

if __name__ == "__main__":
    main()
