#!/usr/bin/env python3
"""Check all external HTTP URLs mentioned by the published HTML files. HTTP accessibility != semantic evidence."""
import concurrent.futures as cf, datetime, html.parser, json, ssl, time, urllib.error, urllib.request
from pathlib import Path
from urllib.parse import urldefrag, urlsplit
ROOT=Path(__file__).resolve().parent.parent
OUT=ROOT/"monitoraggio"/"ultimo-controllo-url-esterni.json"
class P(html.parser.HTMLParser):
 def __init__(self):super().__init__();self.links=[]
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if tag in ("a","link","img","script") and a.get("href" if tag in ("a","link") else "src"):
   self.links.append(a.get("href" if tag in ("a","link") else "src"))
pages=sorted(list(ROOT.glob("*.html"))+[ROOT/"app"/"index.html"])
found={}
for p in pages:
 q=P();q.feed(p.read_text("utf-8"))
 for u in q.links:
  if u.startswith(("https://","http://")) and urlsplit(u).hostname!="cpcpcp106-coder.github.io":
   found.setdefault(u,[]).append(str(p.relative_to(ROOT)))
def check(item):
 u,pages=item
 req=urllib.request.Request(u,headers={"User-Agent":"Mozilla/5.0 (compatible; PerMe-audit/2026-10-15)","Accept":"text/html,application/pdf,*/*"})
 try:
  with urllib.request.urlopen(req,timeout=12) as r:
   r.read(2048)
   return {"url":u,"status":"raggiungibile","http":r.status,"final_url":r.geturl(),"pages":pages}
 except urllib.error.HTTPError as e:
  classification="bloccato_o_riservato" if e.code in (401,403,429) else "errore_http"
  return {"url":u,"status":classification,"http":e.code,"pages":pages}
 except Exception as e:return {"url":u,"status":"non_verificato_trasporto","error":str(e)[:160],"pages":pages}
with cf.ThreadPoolExecutor(max_workers=8) as pool:results=list(pool.map(check,found.items()))
counts={}
for x in results:counts[x["status"]]=counts.get(x["status"],0)+1
j={"date_utc":datetime.datetime.now(datetime.timezone.utc).isoformat(),"scope":{"pages":len(pages),"unique_external_urls":len(found),"occurrences":sum(map(len,found.values()))},"counts":counts,"results":sorted(results,key=lambda x:x["url"]),"limitations":["Un HTTP 200 non prova che la fonte supporti il testo della guida.","403/429 possono essere un blocco di rete automatizzata, non un errore per il visitatore.","Non certifica pulsanti o interazioni nel browser."]}
OUT.write_text(json.dumps(j,ensure_ascii=False,indent=2)+"\n","utf-8")
print(json.dumps({"unique":len(found),"counts":counts},ensure_ascii=False))
