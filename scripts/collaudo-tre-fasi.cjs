'use strict';
const fs=require('node:fs');
const path=require('node:path');
const http=require('node:http');
const { chromium }=require('playwright');
const root=path.resolve(__dirname,'..');
const types={'.html':'text/html; charset=utf-8','.js':'application/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.webp':'image/webp','.png':'image/png','.ico':'image/x-icon','.webmanifest':'application/manifest+json'};
const server=http.createServer((req,res)=>{
 const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
 let file=path.resolve(root,'.'+pathname);
 if(!file.startsWith(root+path.sep)&&file!==root){res.writeHead(403);return res.end();}
 if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');
 if(!fs.existsSync(file)){res.writeHead(404);return res.end('not found');}
 res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream'});
 fs.createReadStream(file).pipe(res);
});
async function run(){
 await new Promise(r=>server.listen(0,'127.0.0.1',r));
 const origin='http://127.0.0.1:'+server.address().port;
 const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
 let failed=0,passed=0;
 const check=(ok,msg)=>{if(ok){passed++;console.log('PASS',msg)}else{failed++;console.error('FAIL',msg)}};
 try{
 for(const width of [320,390]){
 const page=await browser.newPage({viewport:{width,height:800}});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(origin+'/da-dove-cominciare.html');
 check(await page.locator('.problemi a').count()===12,'12 percorsi '+width);
 check(await page.locator('#cerca-problema').isVisible(),'ricerca accessibile disponibile '+width);
 await page.locator('#cerca-problema').fill('cauzione');
 check(await page.locator('.problemi a:visible').count()===1 && await page.locator('.problemi a:visible').first().getAttribute('href')==='agevolazioni-guida-09-locazioni-abitative.html','ricerca cauzione trova affitto '+width);
 await page.locator('#cerca-problema').fill('parola-inesistente-xyz');
 check(await page.locator('.problemi a:visible').count()===0 && (await page.locator('#conta-problemi').innerText()).includes('Nessun percorso'),'ricerca nessun risultato spiegato '+width);
 await page.locator('#cerca-problema').fill('');
 check(await page.locator('.problemi a:visible').count()===12,'ripristino dei 12 percorsi '+width);
 check(await page.locator('.percorso-immediato ol li').count()===3 && await page.locator('.percorso-immediato a[href="inps-prestazione-sospesa-respinta-cosa-fare.html"]').count()===1,'primi tre passi INPS e guida corretta '+width);
 const cardSizes=await page.locator('.problemi a').evaluateAll(items=>items.map(a=>a.getBoundingClientRect().height));
 check(cardSizes.every(h=>h>=54),'percorsi con superficie tattile almeno 54 px '+width);
 await page.evaluate(()=>{document.documentElement.style.fontSize='200%'});
 const zoomResult=await page.evaluate(()=>{
 const viewport=window.innerWidth;
 const elements=Array.from(document.querySelectorAll('body *'))
 .map(e=>({tag:e.tagName,css:e.className?.toString().slice(0,75),right:Math.round(e.getBoundingClientRect().right),left:Math.round(e.getBoundingClientRect().left),width:Math.round(e.getBoundingClientRect().width)}))
 .filter(x=>x.right>viewport+2||x.left<-2).slice(0,10);
 return {ok:document.documentElement.scrollWidth<=viewport+2,viewport,scrollWidth:document.documentElement.scrollWidth,elements};
 });
 if(!zoomResult.ok)console.log('DETTAGLI REFLOW 200%',width,JSON.stringify(zoomResult));
 check(zoomResult.ok,'reflow con caratteri al 200% '+width);
 await page.evaluate(()=>{document.documentElement.style.fontSize=''});
 check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),'nessun overflow orizzontale '+width);
 const facebook='a[href="https://www.facebook.com/PerMeGuide/"]';
 for(const [scope,label] of [['main','Facebook nel contenuto'],['footer','Facebook nel footer']]){
  const link=page.locator(scope+' '+facebook);
  check(await link.count()===1&&await link.isVisible(),label+' '+width);
  check(await link.evaluate(a=>a.target==='_blank'&&a.relList.contains('noopener')&&a.relList.contains('noreferrer')),label+' apertura sicura '+width);
 }
 check(await page.locator('footer '+facebook).evaluate(a=>a.getBoundingClientRect().height>=54),'Facebook nel footer facile da toccare '+width);
 await page.goto(origin+'/strumenti/orientamento-benefici.html');
 await page.locator('#verifica button').click();
 check(await page.locator('#risultati').isVisible(),'orientatore risultati '+width);
 await page.goto(origin+'/strumenti/costo-spesa-settimanale.html');
 await page.locator('.riga').first().locator('[data-key=prezzo]').fill('4');
 await page.locator('.riga').first().locator('[data-key=quantita]').fill('250');
 await page.locator('.riga').first().locator('[data-key=nome]').fill('Ceci');
 while(await page.locator('.riga').count()>1) await page.locator('.riga').last().locator('button').click();
 await page.locator('.riga').first().locator('[data-key=confezione]').fill('500');
 await page.locator('#f button[type=submit]').click();
 check((await page.locator('#totale').innerText()).includes('1,00'),'costo 250g a 4€/kg = 1 euro '+width);
 check((await page.locator('#cassa').innerText()).includes('2,00'),'cassa confezione da 500g a 4€/kg = 2 euro '+width);
 const unita=page.locator('.riga').first().locator('[data-key=unita]');
 for(const [value,basis] of [['g','chilogrammo'],['ml','litro'],['pezzi','pezzo']]){
  await unita.selectOption(value);
  const helpId=await unita.getAttribute('aria-describedby');
  check(!!helpId && (await page.locator('#'+helpId).innerText()).includes(basis),'unità e base del prezzo accessibili '+value+' '+width);
 }
 await unita.selectOption('ml');
 await page.locator('#f button[type=submit]').click();
 check((await page.locator('#totale').innerText()).includes('1,00'),'250 ml a 4 €/litro = 1 euro '+width);
 await unita.selectOption('pezzi');
 await page.locator('.riga').first().locator('[data-key=quantita]').fill('3');
 await page.locator('.riga').first().locator('[data-key=confezione]').fill('2');
 await page.locator('#f button[type=submit]').click();
 check((await page.locator('#totale').innerText()).includes('12,00') && (await page.locator('#cassa').innerText()).includes('16,00'),'pezzi e confezioni intere conservano il calcolo '+width);
 const baseFont=await page.evaluate(()=>parseFloat(getComputedStyle(document.documentElement).fontSize));
 await page.evaluate(px=>document.documentElement.style.setProperty('font-size',px*2+'px','important'),baseFont);
 for(const value of ['g','ml','pezzi']){
  await unita.selectOption(value);
  const fit=await unita.evaluate(el=>{
   const css=getComputedStyle(el),canvas=document.createElement('canvas'),context=canvas.getContext('2d');
   context.font=css.font;
   const text=el.selectedOptions[0].textContent;
   const available=el.clientWidth-parseFloat(css.paddingLeft)-parseFloat(css.paddingRight)-24;
   return {ok:context.measureText(text).width<=available,text,available,textWidth:context.measureText(text).width};
  });
  if(!fit.ok)console.log('DETTAGLI UNITÀ 200%',width,JSON.stringify(fit));
  check(fit.ok,'unità intera leggibile al 200% '+value+' '+width);
 }
 check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),'calcolatore senza overflow al 200% '+width);
 await page.evaluate(()=>document.documentElement.style.removeProperty('font-size'));
 await unita.selectOption('g');
 await page.locator('.riga').first().locator('[data-key=quantita]').fill('250');
 await page.locator('.riga').first().locator('[data-key=confezione]').fill('500');
 await page.locator('#aggiungi').click();
 const seconda=page.locator('.riga').last();
 await seconda.locator('[data-key=nome]').fill('Lenticchie');
 await seconda.locator('[data-key=quantita]').fill('400');
 await page.locator('#f button[type=submit]').click();
 check((await page.locator('#copertura').innerText()).includes('Mancano prezzo'),'riepilogo parziale se manca un prezzo '+width);
 check(errors.length===0,'nessun errore JavaScript '+width+': '+errors.join(' | '));
 await page.close();
 }
 const page=await browser.newPage();
 await page.goto(origin+'/app/menu-mediterraneo.html');
 const menuButton=page.locator('#costo-spesa-automatico');
 check(await menuButton.count()===1,'pulsante trasferimento menu presente');
 if(await menuButton.count()){
 await page.locator('#esempio').selectOption({index:1});
 await page.locator('#carica').click();
 await menuButton.click();
 await page.waitForURL('**/strumenti/costo-spesa-settimanale.html?origine=menu');
 check(await page.locator('.riga').count()>0,'ingredienti importati dal menu');
 check((await page.locator('.riga').first().locator('[data-key=nome]').inputValue()).length>0,'nome ingrediente importato');
 }
 check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),'nessun overflow su desktop');
 await page.close();
 }finally{await browser.close();await new Promise(r=>server.close(r))}
 console.log('RISULTATO',passed,'superati',failed,'falliti');
 if(failed)process.exitCode=1;
}
run().catch(e=>{console.error(e);server.close();process.exitCode=1});
