'use strict';
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..');
const mime={'.html':'text/html;charset=utf-8','.js':'application/javascript;charset=utf-8','.css':'text/css;charset=utf-8','.webp':'image/webp','.png':'image/png','.webmanifest':'application/manifest+json','.json':'application/json'};
const server=http.createServer((req,res)=>{
 const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
 let file=path.resolve(root,'.'+pathname);
 if(!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
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
  for(const width of [320,390]){
   const context=await browser.newContext({viewport:{width,height:850}});
   const hits=[];
   await context.route('**/*',async route=>{
    const url=route.request().url();
    if(url.startsWith(origin))return route.continue();
    if(url.includes('countapi.mileshilliard.com')){
     if(url.includes('/hit/'))hits.push(url);
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
   const grow=page.getByRole('button',{name:'Aumenta la dimensione del testo',exact:true});
   for(let i=0;i<4;i++)await grow.click();
   check(Math.abs(await page.evaluate(()=>parseFloat(getComputedStyle(document.documentElement).fontSize))-base*2)<0.1,'testo raddoppiato '+width);
   check(await grow.isDisabled?.()??!(await grow.isEnabled()),'limite massimo del testo '+width);
   await page.locator('.perme-riscontro summary').click();
   const overflow=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,outliers:[...document.querySelectorAll('body *')].map(e=>({tag:e.tagName,cls:e.className,id:e.id,left:e.getBoundingClientRect().left,right:e.getBoundingClientRect().right,text:e.textContent.slice(0,70)})).filter(e=>e.right>innerWidth+2&&e.left>-5).slice(0,12)}));
   if(overflow.scroll>width+2)console.log('DETTAGLI LETTURA 200%',JSON.stringify(overflow));
   check(overflow.scroll<=width+2,'guida e riscontri senza scorrimento orizzontale al 200% '+width);
   await page.reload();await page.locator('.perme-lettura').waitFor();
   check((await page.locator('.perme-lettura').innerText()).includes('Testo 200%'),'preferenza di lettura conservata '+width);
   await page.getByRole('button',{name:'Ripristina la dimensione iniziale del testo',exact:true}).click();
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
  await page.locator('.guide-card').first().click();
  check(await page.locator('#reader-content .perme-lettura').count()===1,'comandi conservati dopo riapertura offline');
  await page.getByRole('button',{name:'Aumenta la dimensione del testo',exact:true}).click();
  check((await page.locator('.perme-lettura').innerText()).includes('125%'),'ingrandimento utilizzabile offline');
  await page.locator('.perme-riscontro summary').click();
  await page.getByRole('button',{name:'Informazione da aggiornare',exact:true}).click();
  check((await page.locator('.perme-riscontro').innerText()).includes('conteggio non è stato inviato'),'riscontro offline non dichiarato inviato');
  await context.close();
  console.log('MIGLIORIE RISULTATO',passed,'superati, 0 falliti');
 }finally{await browser.close();await new Promise(resolve=>server.close(resolve));}
}
main().catch(error=>{console.error(error);server.close();process.exitCode=1;});
