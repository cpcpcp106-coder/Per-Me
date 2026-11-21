'use strict';
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..');
const mime={'.html':'text/html;charset=utf-8','.js':'application/javascript;charset=utf-8','.css':'text/css;charset=utf-8','.webp':'image/webp','.png':'image/png','.webmanifest':'application/manifest+json','.json':'application/json'};
const server=http.createServer((req,res)=>{
 const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
 let file=path.resolve(root,'.'+pathname);
 if(file!==root&&!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
 if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');
 if(!fs.existsSync(file)){res.writeHead(404);res.end();return;}
 res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream'});fs.createReadStream(file).pipe(res);
});
let passed=0;
function check(ok,message){assert.ok(ok,message);passed++;console.log('PASS MIGLIORIE',message);}
async function main(){
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 const origin='http://127.0.0.1:'+server.address().port;
 const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
 try{
  const basket=JSON.parse(fs.readFileSync(path.join(root,'FONTI/paniere-mediterraneo-2026-11-20.json'),'utf8'));
  const quantities=Object.fromEntries(basket.prodotti.map(p=>[p.id,0]));
  for(const group of ['colazione_quotidiana','spuntini_quotidiani'])for(const [id,q]of Object.entries(basket[group]))quantities[id]+=q*7;
  for(const day of basket.settimana)for(const slot of ['pranzo','cena'])for(const [id,q]of Object.entries(day[slot].ingredienti))quantities[id]+=q;
  check(basket.settimana.length===7&&basket.prodotti.length===22&&new Set(basket.prodotti.map(p=>p.id)).size===22,'paniere con sette giorni e 22 prodotti distinti');
  check(basket.prodotti.every(p=>p.quantita_settimana===quantities[p.id]),'nessun ingrediente del menu omesso dalla spesa');
  let used=0,paid=0;
  for(const p of basket.prodotti){used+=Number(p.prezzo_confezione)*100*p.quantita_settimana/p.confezione;paid+=Number(p.prezzo_confezione)*100*Math.ceil(p.quantita_settimana/p.confezione);}
  check(Math.round(used)===11519&&Math.round(paid)===14906,'conto indipendente del paniere: 115,19 usati e 149,06 in confezioni');
  check(basket.prodotti.every(p=>p.fonte.startsWith('https://www.cicalia.com/it/')&&p.disponibilita_osservata==='AGGIUNGI AL CARRELLO'),'fonte diretta e disponibilità osservata per tutti i prodotti');
  for(const width of [320,390]){
   const context=await browser.newContext({viewport:{width,height:850}});
   const hits=[];let failCounters=false;
   await context.route('**/*',async route=>{
    const url=route.request().url();
    if(url.startsWith(origin))return route.continue();
    if(url.includes('countapi.mileshilliard.com')){
     if(url.includes('/hit/'))hits.push(url);
     if(failCounters)return route.fulfill({status:503,body:'Temporaneamente non disponibile'});
     return route.fulfill({status:200,contentType:'application/json',body:'{"value":3}'});
    }
    return route.abort();
   });
   await context.addInitScript(()=>{
    window.__voice={calls:[],cancels:0,pauses:0,resumes:0};
    window.SpeechSynthesisUtterance=function(text){this.text=text;};
    Object.defineProperty(window,'speechSynthesis',{configurable:true,value:{
     getVoices:()=>[{lang:'it-IT',localService:true}],
     speak:utterance=>{window.__voice.calls.push(utterance.text);window.__voice.last=utterance;},
     cancel:()=>window.__voice.cancels++,pause:()=>window.__voice.pauses++,resume:()=>window.__voice.resumes++
    }});
   });
   const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
   await page.goto(origin+'/agevolazioni-guida-09-locazioni-abitative.html');
   await page.locator('.perme-lettura').waitFor();
   const base=await page.evaluate(()=>parseFloat(getComputedStyle(document.documentElement).fontSize));
   const grow=page.getByRole('button',{name:'Ingrandisci la dimensione del testo',exact:true});
   for(let i=0;i<4;i++)await grow.click();
   check(Math.abs(await page.evaluate(()=>parseFloat(getComputedStyle(document.documentElement).fontSize))-base*2)<0.1,'testo raddoppiato '+width);
   check(await grow.isDisabled?.()??!(await grow.isEnabled()),'limite massimo del testo '+width);
   await page.locator('.perme-riscontro summary').click();
   const overflow=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,outliers:[...document.querySelectorAll('body *')].map(e=>({tag:e.tagName,cls:e.className,id:e.id,left:e.getBoundingClientRect().left,right:e.getBoundingClientRect().right,text:e.textContent.slice(0,70)})).filter(e=>e.right>innerWidth+2&&e.left>-5).slice(0,12)}));
   if(overflow.scroll>width+2)console.log('DETTAGLI LETTURA 200%',JSON.stringify(overflow));
   check(overflow.scroll<=width+2,'guida e riscontri senza scorrimento orizzontale al 200% '+width);
   await page.reload();await page.locator('.perme-lettura').waitFor();
   check((await page.locator('.perme-lettura').innerText()).includes('Testo 200%'),'preferenza di lettura conservata '+width);
   await page.getByRole('button',{name:'Normale: ripristina la dimensione iniziale del testo',exact:true}).click();
   check(Math.abs(await page.evaluate(()=>parseFloat(getComputedStyle(document.documentElement).fontSize))-base)<0.1,'ripristino del testo '+width);
   await page.getByRole('button',{name:'Ascolta la guida ad alta voce',exact:true}).click();
   check(await page.evaluate(()=>__voice.calls.length===1&&__voice.calls[0].length>10),'avvio della voce verificato con simulazione API '+width);
   await page.getByRole('button',{name:'Pausa',exact:true}).click();
   await page.getByRole('button',{name:'Riprendi',exact:true}).click();
   check(await page.evaluate(()=>__voice.pauses===1&&__voice.resumes===1),'pausa e ripresa della voce '+width);
   await page.getByRole('button',{name:'Interrompi la lettura vocale',exact:true}).click();
   const calls=await page.evaluate(()=>__voice.calls.length);
   await page.evaluate(()=>__voice.last.onend());
   check(await page.evaluate(()=>__voice.calls.length)===calls,'interruzione annulla la coda della voce '+width);
   await page.locator('.perme-riscontro summary').click();
   await page.getByRole('button',{name:'Passaggio poco chiaro',exact:true}).click();
   await page.getByText('Segnalazione registrata per questa categoria.',{exact:false}).waitFor();
   check(hits.length===1&&hits[0].includes('riscontro-chiarezza-agevolazioni-guida-09'),'riscontro classificato e senza voto aggiunto '+width);
   await page.locator('.perme-riscontro input').fill('Il secondo collegamento della sezione Durante');
   check((await page.locator('.perme-riscontro textarea').inputValue()).includes('Durante'),'messaggio pronto con il punto segnalato '+width);
   await page.getByRole('button',{name:'Passaggio poco chiaro',exact:true}).click();
   check(hits.length===1,'evitato il doppio invio immediato '+width);
   check(await page.locator('.perme-rating-stars button').count()===5,'stelle esistenti conservate '+width);
   await page.goto(origin+'/strumenti/costo-spesa-settimanale.html');
   await page.evaluate(()=>{window.__printCalls=0;window.print=()=>window.__printCalls++;});
   await page.locator('#stampa').click();
   check(await page.evaluate(()=>__printCalls)===0,'riepilogo vuoto non stampato '+width);
   for(const [key,value]of [['nome','Pasta prova'],['prezzo','2'],['quantita','500'],['confezione','500']])await page.locator('[data-key='+key+']').fill(value);
   await page.locator('#f button[type=submit]').click();
   await page.locator('[data-key=quantita]').fill('750');
   await page.locator('#stampa').click();
   check(await page.evaluate(()=>__printCalls)===1,'stampa sintetica invocata '+width);
   const summary=await page.locator('#perme-riepilogo-stampa').innerText();
   check(summary.includes('1,50')&&summary.includes('2,00'),'riepilogo usa le quantità attuali e confezioni intere '+width);
   check(await page.locator('#perme-riepilogo-stampa tbody tr').count()===1,'tabella sintetica con un ingrediente '+width);
   await page.emulateMedia({media:'print'});
   check(!(await page.locator('main').isVisible())&&await page.locator('#perme-riepilogo-stampa').isVisible(),'stampa contiene il solo riepilogo '+width);
   const pdf=await page.pdf({format:'A4',preferCSSPageSize:true});
   check((pdf.toString('latin1').match(/\/Type\s*\/Page\b/g)||[]).length===1,'riepilogo semplice in una pagina PDF '+width);
   await page.emulateMedia({media:'screen'});await page.evaluate(()=>window.dispatchEvent(new Event('afterprint')));
   check(await page.locator('main').isVisible(),'ritorno alla pagina dopo stampa '+width);
   await page.goto(origin+'/');
   const order=await page.evaluate(()=>{
    const hero=document.querySelector('.hero'),search=document.querySelector('#cerca-guide'),invite=document.querySelector('.reader-invite'),situations=document.querySelector('#situazioni');
    return{heroFirst:!!(hero.compareDocumentPosition(search)&Node.DOCUMENT_POSITION_FOLLOWING),inviteLater:!!(situations.compareDocumentPosition(invite)&Node.DOCUMENT_POSITION_FOLLOWING),mainLinks:document.querySelectorAll('.hero a[href="da-dove-cominciare.html"]').length};
   });
   check(order.heroFirst&&order.inviteLater&&order.mainLinks===1,'home con ingresso unico e invito alle prove spostato '+width);
   check(await page.locator('.home-strumenti-grid article').count()===3,'tre strumenti subito riconoscibili nella home '+width);
   check(await page.locator('.home-segui a[href="https://whatsapp.com/channel/0029VbDxWTg4dTnMxrqamP3J"]').count()===1&&await page.locator('footer a[href="https://www.facebook.com/PerMeGuide/"]').count()===1,'seguire i canali distinto dalla condivisione '+width);
   check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),'home marketing senza scorrimento orizzontale '+width);
   await page.locator('.home-notizie summary').click();
   check(await page.locator('.home-notizie a[href="inps-malattia-pagamento-diretto-sr212.html"]').isVisible(),'notizie raggiungibili aprendo il riepilogo '+width);
   await page.locator('.home-notizie summary').click();
   await page.locator('#parole-guida').fill('paniere');
   await page.locator('#risultati-guide a').first().waitFor();
   check((await page.locator('#risultati-guide a').first().getAttribute('href')).endsWith('#spesa-settimana-documentata'),'ricerca della home trova il paniere documentato '+width);
   await page.goto(origin+'/monitoraggio/marketing.html');
   await page.locator('.metrica').first().waitFor();
   check(await page.locator('.metrica').count()===14,'pannello con quattordici confronti e dati archiviati '+width);
   check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),'pannello marketing leggibile su schermo stretto '+width);
   await page.goto(origin+'/dieta-guida-08-ricette-mediterranee-economiche-valori.html#spesa-settimana-documentata');
   check(await page.locator('.paniere-prodotto').count()===22&&await page.locator('.paniere-giorno').count()===7,'menu e lista completi leggibili nella guida '+width);
   check((await page.locator('#paniere-totali').innerText()).includes('149,06')&&(await page.locator('#paniere-totali').innerText()).includes('Spedizione esclusa'),'esborso e spese escluse visibili '+width);
   for(let i=0;i<4;i++)await page.getByRole('button',{name:'Ingrandisci la dimensione del testo',exact:true}).click();
   await page.locator('.paniere-giorno summary').first().click();
   check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),'paniere leggibile al 200% senza overflow '+width);
   await page.getByRole('button',{name:'Normale: ripristina la dimensione iniziale del testo',exact:true}).click();
   await page.locator('#importa-paniere').click();
   await page.waitForURL('**/strumenti/costo-spesa-settimanale.html?origine=paniere');
   check(await page.locator('.riga').count()===22,'trasferiti tutti gli ingredienti senza ricopiare '+width);
   check(await page.locator('#data-prezzi').inputValue()==='2026-11-20'&&(await page.locator('#fonte-prezzi').inputValue()).includes('Cicalia'),'fonte e data trasferite '+width);
   const imported=await page.locator('.riga').evaluateAll(rows=>rows.map(row=>Object.fromEntries([...row.querySelectorAll('[data-key]')].map(el=>[el.dataset.key,el.value]))));
   const oil=imported.find(r=>r.nome==='Olio extravergine di oliva'),eggs=imported.find(r=>r.nome==='Uova');
   check(oil.unita==='ml'&&Number(oil.quantita)===280&&Number(oil.prezzo)===23.18&&Number(eggs.confezione)===10&&Math.abs(Number(eggs.prezzo)-0.379)<1e-10,'millilitri e pezzi mantengono unità e precisione '+width);
   await page.locator('#f button[type=submit]').click();
   check((await page.locator('#totale').innerText()).includes('115,19')&&(await page.locator('#cassa').innerText()).includes('149,06'),'calcolatore concorda con il conto documentato '+width);
   await page.evaluate(()=>window.print=()=>{});await page.locator('#stampa').click();
   check(await page.locator('#perme-riepilogo-stampa tbody tr').count()===22,'PDF completo con tutti i 22 ingredienti '+width);
   await page.emulateMedia({media:'print'});
   const basketPdf=await page.pdf({format:'A4',preferCSSPageSize:true});
   const basketPages=(basketPdf.toString('latin1').match(/\/Type\s*\/Page\b/g)||[]).length;
   check(basketPages<=2,'paniere stampato in massimo due pagine: '+basketPages+' '+width);
   await page.emulateMedia({media:'screen'});await page.evaluate(()=>window.dispatchEvent(new Event('afterprint')));
   await page.goto(origin+'/monitoraggio/riscontri.html');
   await page.waitForFunction(()=>document.getElementById('guida').options.length>2);
   await page.locator('#filtro').fill('locazioni');
   check(await page.locator('#leggi').isEnabled(),'pannello riscontri pronto alla lettura '+width);
   await page.locator('#leggi').click();
   await page.locator('#esito').waitFor();
   check(await page.locator('#conteggi tr').count()===3&&hits.length===1,'pannello legge tre categorie senza aggiungere segnalazioni '+width);
   failCounters=true;await page.locator('#leggi').click();
   await page.getByText('Conteggi non disponibili: non sono stati sostituiti con zero.',{exact:true}).waitFor();
   check(!(await page.locator('#esito').isVisible()),'errore del servizio distinto da zero segnalazioni '+width);failCounters=false;
   check(errors.length===0,'nessun errore JavaScript '+width+': '+errors.join(' | '));
   await context.close();
  }
  const context=await browser.newContext({viewport:{width:390,height:850}});
  const page=await context.newPage();
  await page.goto(origin+'/app/');
  await page.evaluate(()=>navigator.serviceWorker.ready);
  await page.locator('#refresh').click();
  await page.waitForFunction(()=>/pagine salvate per la lettura offline/.test(document.getElementById('sync-status').textContent),{},{timeout:120000});
  await page.locator('.guide-card').first().click();
  check(await page.locator('#reader-content .perme-lettura').count()===1,'comandi di lettura presenti nella PWA');
  await context.setOffline(true);await page.reload();
  await page.locator('#reader-content .perme-lettura').waitFor();
  check(await page.locator('#reader-content .perme-lettura').count()===1,'comandi conservati dopo riapertura offline');
  await page.getByRole('button',{name:'Ingrandisci la dimensione del testo',exact:true}).click();
  check((await page.locator('.perme-lettura').innerText()).includes('125%'),'ingrandimento utilizzabile offline');
  await page.locator('.perme-riscontro summary').click();
  await page.getByRole('button',{name:'Informazione da aggiornare',exact:true}).click();
  check((await page.locator('.perme-riscontro').innerText()).includes('conteggio non è stato inviato'),'riscontro offline non dichiarato inviato');
  await page.locator('#back').click();
  await page.locator('#search').fill('Ricette mediterranee semplici');
  await page.locator('.guide-card').first().click();
  check(await page.locator('#reader-content #spesa-settimana-documentata').isVisible()&&(await page.locator('#reader-content #paniere-totali').innerText()).includes('149,06'),'menu, prezzi e totali del paniere conservati offline');
  await context.close();
  console.log('MIGLIORIE RISULTATO',passed,'superati, 0 falliti');
 }finally{await browser.close();await new Promise(resolve=>server.close(resolve));}
}
main().catch(error=>{console.error(error);server.close();process.exitCode=1;});
