#!/usr/bin/env python3
"""Audit statico riproducibile di Per Me. Non certifica fonti, browser, PWA Android o WCAG."""
from __future__ import annotations
import datetime as dt
import json
import posixpath
import re
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "monitoraggio" / "ultimo-audit-statico.json"
ORIGIN = "cpcpcp106-coder.github.io"
PREFIX = "/Per-Me/"

class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.ids=set(); self.refs=[]; self.images=[]; self.headings=[]; self.title=[]
        self._title=False;self.description=False;self.noindex=False;self.canonical=False
        self.skip=False;self.external_buttons=0
    def handle_starttag(self, tag, attrs):
        a=dict(attrs)
        if a.get("id"):self.ids.add(a["id"])
        if tag in ("a","img","link","script"):
            key="href" if tag in ("a","link") else "src"
            if a.get(key):self.refs.append((tag,a[key]))
        if tag=="img":self.images.append({"src":a.get("src"),"has_alt":"alt" in a,"alt":a.get("alt")})
        if tag in ("h1","h2","h3","h4","h5","h6"):self.headings.append(tag)
        if tag=="title":self._title=True
        if tag=="a" and "skip" in a.get("class","").split():self.skip=True
        if tag=="meta":
            if a.get("name","").lower()=="description" and a.get("content"):self.description=True
            if a.get("name","").lower()=="robots" and "noindex" in a.get("content","").lower():self.noindex=True
        if tag=="link" and a.get("rel","").lower()=="canonical":self.canonical=True
    def handle_endtag(self,tag):
        if tag=="title":self._title=False
    def handle_data(self,data):
        if self._title:self.title.append(data)

def resolve(source,ref):
    if ref.startswith(("mailto:","tel:","javascript:","data:")):return None,None,"action"
    u=urlsplit(ref)
    if u.scheme in ("http","https"):
        if u.netloc.lower()!=ORIGIN or not u.path.startswith(PREFIX):return None,None,"external"
        p=u.path[len(PREFIX):]
    elif u.scheme:return None,None,"external"
    else:
        p=u.path
        if p.startswith(PREFIX):p=p[len(PREFIX):]
        elif p.startswith("/"):return p,u.fragment,"outside_root"
        elif p:p=posixpath.join(posixpath.dirname(source),p)
        else:p=source
    path=posixpath.normpath(unquote(p))
    if path in ("","."):path="index.html"
    if path.endswith("/"):path+="index.html"
    if path.startswith("../"):return path,u.fragment,"outside_root"
    return path,unquote(u.fragment),"local"

def main():
    now=dt.datetime.now(dt.timezone.utc).isoformat(timespec="seconds")
    pages=sorted(list(ROOT.glob("*.html"))+[ROOT/"app"/"index.html"])
    parsers={}
    for path in pages:
        p=Page();p.feed(path.read_text(encoding="utf-8"));parsers[path.relative_to(ROOT).as_posix()]=p
    missing=[]; anchors=[]; ext=[]; local=[]; actions=0
    inventory=[]
    for name,p in parsers.items():
        per_missing=[];per_local=0;per_ext=0
        for tag,ref in p.refs:
            target,fragment,kind=resolve(name,ref)
            if kind=="action":actions+=1;continue
            if kind=="external":ext.append((name,ref));per_ext+=1;continue
            if kind=="outside_root":
                entry={"page":name,"ref":ref,"target":target,"issue":"fuori_radice"}
                missing.append(entry);per_missing.append(entry);continue
            per_local+=1;local.append((name,ref))
            check=ROOT/target
            if check.is_dir():check=check/"index.html"
            if not check.is_file():
                entry={"page":name,"ref":ref,"target":target,"issue":"file_mancante"}
                missing.append(entry);per_missing.append(entry)
            elif fragment and target in parsers and fragment not in parsers[target].ids:
                anchors.append({"page":name,"ref":ref,"target":target,"anchor":fragment})
        text=(ROOT/name).read_text(encoding="utf-8")
        numeric=len(re.findall(r"\b\d{1,3}(?:[.,]\d+)?\s*(?:€|euro|giorni|mesi|anni|rate|%)\b|\barticolo\s+\d+|\blegge\s+n?\.?\s*\d+",text,re.I))
        inventory.append({"file":name,"title":"".join(p.title).strip(),"h1":p.headings.count("h1"),
            "images":len(p.images),"images_without_alt":sum(not x["has_alt"] for x in p.images),
            "links_local":per_local,"links_external":per_ext,"missing_local":len(per_missing),
            "noindex":p.noindex,"canonical":p.canonical,"description":p.description,
            "skip_link":p.skip,"candidate_numeric_legal_mentions":numeric})
    manifest=json.loads((ROOT/"app/manifest.webmanifest").read_text(encoding="utf-8"))
    icon_checks=[{"src":x["src"],"present":(ROOT/"app"/x["src"]).is_file(),"purpose":x.get("purpose")} for x in manifest.get("icons",[])]
    sw=(ROOT/"app/sw.js").read_text(encoding="utf-8")
    shell=re.search(r"\bSHELL\s*=\s*\[([^\]]+)\]",sw,re.S)
    shell_files=re.findall(r"['\"]([^'\"]+)['\"]",shell.group(1)) if shell else []
    shell_missing=[]
    for src in shell_files:
        name=src.split("?")[0].replace("./","")
        if not name:name="index.html"
        if not (ROOT/"app"/name).is_file():shell_missing.append(src)
    sitemap=(ROOT/"sitemap.xml").read_text(encoding="utf-8")
    sitemap_paths=set()
    for url in re.findall(r"<loc>([^<]+)</loc>",sitemap):
        v=urlsplit(url);p=v.path[len(PREFIX):] if v.path.startswith(PREFIX) else v.path.lstrip("/")
        p=p or "index.html"
        if p.endswith("/"):p+="index.html"
        sitemap_paths.add(p)
    indexable=set(n for n,p in parsers.items() if not p.noindex and n!="googled120465f7b693b08.html")
    report={"date_utc":now,"method":"HTMLParser su sorgente main + risoluzione locale; verifica solamente statica",
        "scope":{"html_total":len(pages),"editorial_pages":len(pages)-2,
                 "guide_pages":sum(x.startswith(("debiti-guida-","agevolazioni-guida-")) or x.startswith(("aoi-","assegno-ordinario","cedolino-pensione","contributi-inps-","inps-prestazione","redditi-red-","riesame-ricorso","verbale-invalidita","come-leggere-busta","dal-lordo","ccnl-","controllare-cedolino","ore-ferie","stipendio-diminuito")) for x in parsers)},
        "links":{"local_occurrences":len(local),"external_occurrences":len(ext),
                 "external_unique":len(set(u for _,u in ext)),"actions":actions,
                 "broken_local":missing,"broken_anchors":anchors},
        "seo":{"indexable_pages":sorted(indexable),"sitemap_pages":sorted(sitemap_paths),
               "missing_from_sitemap":sorted(indexable-sitemap_paths),
               "sitemap_not_indexable":sorted(sitemap_paths-indexable)},
        "pwa_static":{"manifest_valid":True,"icons":icon_checks,"service_worker_shell_files":shell_files,
                      "missing_shell_files":shell_missing,
                      "offline_content_in_localStorage":True,
                      "installation_test_on_android":"NON_ESEGUITO",
                      "offline_test_on_android":"NON_ESEGUITO",
                      "one_icon_verified":"NON_ESEGUITO"},
        "inventario":inventory,
        "limits":["La conformita WCAG 2.2 AA non e attestata senza test visivi e di tastiera",
                  "Collegamenti esterni enumerati ma non verificati HTTP o semanticamente da questo script",
                  "Menzioni numeriche/normative non equivalgono a proposizioni atomiche verificate",
                  "Nessun test Android installazione, offline o cache effettivo"]
    }
    OUT.write_text(json.dumps(report,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
    print("PER ME AUDIT STATICO",json.dumps({
        "html":len(pages),"local":len(local),"external":len(ext),
        "broken_files":len(missing),"broken_anchors":len(anchors),
        "sitemap_missing":len(indexable-sitemap_paths),
        "sitemap_excess":len(sitemap_paths-indexable),
        "manifest_icons_missing":sum(not x["present"] for x in icon_checks),
        "sw_shell_missing":len(shell_missing)},ensure_ascii=False))
    print("REPORT",OUT.relative_to(ROOT))
if __name__=="__main__":main()
