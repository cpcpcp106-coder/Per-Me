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
 check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),'nessun overflow orizzontale '+width);
 check(await page.locator('a[href="https://www.facebook.com/PerMeGuide/"]').count()===1,'Facebook '+width);
 await page.goto(origin+'/strumenti/orientamento-benefici.html');
 await page.locator('#verifica button').click();
 check(await page.locator('#risultati').isVisible(),'orientatore risultati '+width);
 await page.goto(origin+'/strumenti/costo-spesa-settimanale.html');
 await page.locator('.riga').first().locator('[data-key=prezzo]').fill('4');
 await page.locator('.riga').first().locator('[data-key=quantita]').fill('250');
 await page.locator('.riga').first().locator('[data-key=nome]').fill('Ceci');
 while(await page.locator('.riga').count()>1) await page.locator('.riga').last().locator('button').click();
 await page.locator('#f button[type=submit]').click();
 check((await page.locator('#totale').innerText()).includes('1,00'),'costo 250g a 4€/kg = 1 euro '+width);
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
