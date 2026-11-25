'use strict';
// Integrazione: foto e navigazione delle nuove pagine, reflow e testi salvati offline.
const fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..');
const types={'.html':'text/html; charset=utf-8','.js':'application/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.webp':'image/webp','.png':'image/png','.webmanifest':'application/manifest+json'};
const files=['digitale-quotidiano.html','digitale-telefono-leggibile.html','digitale-spid-cie-accesso-recupero.html'];
const server=http.createServer((req,res)=>{
 const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
 let file=path.resolve(root,'.'+pathname);
 if(file!==root&&!file.startsWith(root+path.sep)){res.writeHead(403);return res.end();}
 if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');
 if(!fs.existsSync(file)){res.writeHead(404);return res.end();}
 res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream'});
 fs.createReadStream(file).pipe(res);
});
async function run(){
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 const origin='http://127.0.0.1:'+server.address().port;
 const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
 let checks=0;
 try{
  for(const width of [320,390]){
   const context=await browser.newContext({viewport:{width,height:800}});
   await context.route('**/*',route=>route.request().url().startsWith(origin)?route.continue():route.abort());
   const page=await context.newPage();
   for(const file of files){
    const response=await page.goto(origin+'/'+file);
    assert.equal(response.status(),200,file);checks++;
    await page.locator('main .foto-guida img').waitFor({state:'visible'});
    assert.ok(await page.locator('main .foto-guida img').evaluate(img=>img.complete&&img.naturalWidth>0),'foto caricata: '+file);checks++;
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),'reflow: '+file+' '+width);checks++;
    const fb=page.locator('main a.digitale-button[href="https://www.facebook.com/PerMeGuide/"]');
    assert.equal(await fb.count(),1,'Facebook: '+file);checks++;
    assert.ok(await fb.evaluate(a=>a.getBoundingClientRect().height>=56),'pulsante Facebook: '+file);checks++;
    const enlarge=page.getByRole('button',{name:'Ingrandisci la dimensione del testo',exact:true});
    for(let n=0;n<4;n++)await enlarge.click();
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),'reflow con testo ingrandito: '+file+' '+width);checks++;
    await page.getByRole('button',{name:'Normale: ripristina la dimensione iniziale del testo',exact:true}).click();
   }
   await page.goto(origin+'/');
   await page.getByRole('link',{name:'Apri la rubrica Digitale quotidiano',exact:true}).click();
   await page.waitForURL('**/digitale-quotidiano.html');checks++;
   await page.getByRole('link',{name:'Rendi il telefono più leggibile',exact:true}).click();
   await page.waitForURL('**/digitale-telefono-leggibile.html');
   await page.getByRole('link',{name:'Ho un Samsung',exact:true}).click();
   assert.ok(page.url().endsWith('#samsung'));checks++;
   await page.goto(origin+'/app/');
   await page.waitForFunction(()=>!document.querySelector('#refresh').disabled,undefined,{timeout:60000});
   const saved=await page.evaluate(()=>{
    const key=Object.keys(localStorage).find(k=>k.startsWith('perme-app-offline'));
    return key?JSON.parse(localStorage.getItem(key)):null;
   });
   for(const file of files)assert.ok(saved?.guides.some(g=>g.path===file),'salvataggio app: '+file);
   checks+=files.length;
   await context.setOffline(true);
   await page.reload();
   await page.locator('#search').fill('SPID e CIE');
   await page.getByRole('button',{name:/SPID e CIE: accesso, recupero e assistenza/}).click();
   assert.match(await page.locator('#reader-content').innerText(),/tre inserimenti consecutivi errati/);
   assert.ok(await page.locator('#reader-content a[href*="recupero-puk"]').count()>0,'fonte conservata offline');
   checks+=2;
   await context.close();
  }
  console.log('PASS Digitale quotidiano: '+checks+' verifiche; viewport 320/390, foto, Facebook, navigazione, reflow e lettura offline.');
 }finally{await browser.close();server.close();}
}
run().catch(error=>{console.error(error);server.close();process.exitCode=1});
