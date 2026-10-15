'use strict';
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const base='https://cpcpcp106-coder.github.io/Per-Me/';
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const pages=fs.readdirSync(root).filter(p=>p.endsWith('.html')&&!p.startsWith('google'));
const map=read('sitemap.xml'),head=read('site/header.html').trim(),foot=read('site/footer.html').trim();
const issues=[];let links=0;
for(const page of pages){
 const html=read(page);
 if(!html.includes(head))issues.push(page+': intestazione differente');
 if(!html.includes(foot))issues.push(page+': footer differente');
 if(!/<main\b/i.test(html))issues.push(page+': main assente');
 if(/<meta[^>]*content=["'][^"']*noindex/i.test(html))issues.push(page+': noindex');
 if(page!=='index.html'&&!map.includes(base+page+'</loc>'))issues.push(page+': manca sitemap');
 for(const match of html.matchAll(/\b(?:href|src)=["']([^"']+)["']/g)){
   const ref=match[1];
   if(!ref||ref.startsWith('#')||/^(?:https?:|tel:|mailto:|data:|javascript:|\/\/)/i.test(ref))continue;
   const target=decodeURIComponent(ref.split(/[?#]/)[0]).replace(/^\/Per-Me\//,'');
   if(!target)continue;
   const candidate=target.endsWith('/')?target+'index.html':target;
   if(!fs.existsSync(path.join(root,candidate)))issues.push(page+': link locale mancante '+ref);
   links++;
 }
}
const hub=read('agevolazioni-diritti.html');
for(const p of ['agevolazioni-guida-03-trasporti-italia.html','agevolazioni-guida-04-esenzioni-ticket-italia.html','agevolazioni-guida-03-trasporti-fvg.html','agevolazioni-guida-04-esenzioni-ticket-fvg.html'])
 if(!hub.includes(p))issues.push('Rubrica 04: collegamento mancante '+p);
for(const p of ['agevolazioni-guida-03-trasporti-fvg.html','agevolazioni-guida-04-esenzioni-ticket-fvg.html'])
 if(!read(p).includes('Approfondimento territoriale'))issues.push(p+': manca indicazione territoriale');
const app=read('app/main.js');
if(!app.includes("const ROOT=new URL('../',location.href)")||!app.includes("const KEY='perme-app-offline-20261014'")||!app.includes('async function sync()'))issues.push('PWA: sorgente di sincronizzazione o memoria cambiata');
if(!map.includes(base+'app/</loc>'))issues.push('PWA assente dalla sitemap');
console.log(JSON.stringify({esito:issues.length?'ERRORE':'OK',pagine:pages.length,linkLocali:links,errori:issues},null,2));
if(issues.length)process.exitCode=1;
