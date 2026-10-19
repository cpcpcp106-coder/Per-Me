'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const names=fs.readdirSync(root).filter(x=>x.endsWith('.html')&&!x.startsWith('google')&&!x.startsWith('contatori-per-me-')).sort();
// Il pannello contatori e' una pagina tecnica con noindex: non e' una guida editoriale.
const codeFor=file=>fs.readFileSync(path.join(root,file),'utf8');
const unique=x=>[...new Set(x)];
const getIds=html=>new Set([...html.matchAll(/\bid=["']([^"']+)["']/g)].map(m=>m[1]));
const faults=[],warnings=[],rows=[],idsCache=new Map();
for(const f of names)idsCache.set(f,getIds(codeFor(f)));
for(const file of names){
 const html=codeFor(file),main=html.match(/<main\b[^>]*>[\s\S]*?<\/main>/i)?.[0]||'';
 const title=html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]||'';
 const h1=(html.match(/<h1\b/gi)||[]).length;
 const h2=(main.match(/<h2\b/gi)||[]).length;
 const text=main.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi,'').replace(/<[^>]+>/g,' ').replace(/&[a-z0-9#]+;/gi,' ').replace(/\s+/g,' ').trim();
 const words=text?text.split(' ').length:0;
 const a=[...html.matchAll(/<a\b[^>]*href=["']([^"']+)["']/gi)].map(m=>m[1]);
 const external=a.filter(x=>/^https?:/.test(x));const official=unique(external.map(x=>{try{return new URL(x).hostname}catch{return''}}).filter(x=>/\.gov\.it$|\.inps\.it$|\.salute\.gov\.it$|\.regione\.[a-z]+\.it$|\.arera\.it$|\.normattiva\.it$|\.agenziaentrateriscossione\.gov\.it$|\.trenitalia\.com$|(^|\.)iss\.it$|(^|\.)issalute\.it$|(^|\.)who\.int$|(^|\.)cdc\.gov$|(^|\.)siditalia\.it$|(^|\.)alimentinutrizione\.it$/.test(x))).length;
 const imgs=[...html.matchAll(/<img\b[^>]*>/gi)].map(m=>m[0]);
 if(!main)faults.push(file+': nessun main');
 if(h1!==1)faults.push(file+': '+h1+' titoli H1');
 if(!title.trim())faults.push(file+': titolo assente');
 if(!/<meta\b[^>]*name=["']description["']/i.test(html))faults.push(file+': meta description mancante');
 if(!/<meta\b[^>]*name=["']robots["'][^>]*content=["']index,follow["']/i.test(html) && !/<meta\b[^>]*content=["']index,follow["'][^>]*name=["']robots["']/i.test(html))faults.push(file+': indicizzazione incoerente');
 if(!/rel=["']canonical["']/i.test(html))faults.push(file+': canonical mancante');
 if(!/href=["']#contenuto["']/i.test(html))faults.push(file+': collegamento Salta al contenuto assente');
 if(imgs.some(x=>!/\balt=["'][^"']*["']/i.test(x)))faults.push(file+': immagine senza alt');
 if(idsCache.get(file).size!==[...html.matchAll(/\bid=["']([^"']+)["']/g)].length)faults.push(file+': ID duplicati');
 for(const link of a){
   if(!link||/^(https?:|mailto:|tel:|javascript:|data:)/i.test(link))continue;
   const [target,anchor]=link.split('#'),base=target.split('?')[0];
   const f=base||file;
   if(!f.endsWith('.html')){if(!base || base==='app/' || base==='/')continue;if(!fs.existsSync(path.join(root,base)))faults.push(file+': file assente '+link);continue;}
   if(!fs.existsSync(path.join(root,f))){faults.push(file+': file HTML non esistente '+link);continue;}
   if(anchor&&!idsCache.get(f)?.has(anchor))faults.push(file+': ancora assente '+link);
 }
 for(const image of imgs){const m=image.match(/\bsrc=["']([^"']+)/i);if(!m)continue;const src=m[1].split('?')[0];let decoded=src;try{decoded=decodeURIComponent(src)}catch(e){faults.push(file+': percorso immagine non decodificabile '+src);continue;}if(!/^https?:/.test(decoded)&&!fs.existsSync(path.join(root,decoded)))faults.push(file+': immagine locale mancante '+decoded);}
 if(/(?:Tarcento|Attimis|Racchiuso|CAF UIL|ITAL UIL)/i.test(main)&&!/agevolazioni-guida-0[34]-.*-fvg\.html/.test(file))faults.push(file+': riferimenti personali/territoriali impropri');
 if(/guida-\d+/.test(file)&&words<350)warnings.push(file+': guida troppo breve ('+words+' parole)');
 if(/(?:guida-\d+|contributi-|ricorsi-|debiti-|aoi-)/.test(file)&&official===0)warnings.push(file+': nessuna fonte istituzionale diretta riconosciuta');
 if(/in preparazione/i.test(main)&&words<500)warnings.push(file+': rubrica dichiarata in preparazione, non guida completa');
 if(/<img\b[^>]*src=["']https?:/i.test(html))warnings.push(file+': fotografia remota non disponibile offline e da verificare HTTP');
 rows.push({file,words,sections:h2,officialSourceHosts:official,images:imgs.length,externalLinks:external.length,status:words<350?'CONCISO/DA APPROFONDIRE':'CONTROLLO EDITORIALE CAMPIONARIO'});
}
for(const f of ['agevolazioni-guida-03-trasporti-italia.html','agevolazioni-guida-04-esenzioni-ticket-italia.html','agevolazioni-guida-05-comune-servizi-sociali-italia.html']){assert.ok(names.includes(f),'Manca guida nazionale: '+f);}
const photos=['23720159','4266930','9870140'];for(let i=0;i<photos.length;i++)assert.ok(codeFor(['agevolazioni-guida-03-trasporti-italia.html','agevolazioni-guida-04-esenzioni-ticket-italia.html','agevolazioni-guida-05-comune-servizi-sociali-italia.html'][i]).includes('photos/'+photos[i]),'Foto distinta assente');
const out={date:'2026-10-15',pages:rows.length,issues:faults,warnings:unique(warnings),inventory:rows,scope:'statico completo di tutte le pagine; giuridico campionario, non certificazione articolo per articolo',limitation:'WCAG automatica non prova accessibilita reale; fonti esterne e fotografie vanno controllate; Android reale escluso'};
console.log(JSON.stringify(out,null,2));
assert.equal(faults.length,0,'Audit editoriale automatico: problemi bloccanti '+faults.length);
