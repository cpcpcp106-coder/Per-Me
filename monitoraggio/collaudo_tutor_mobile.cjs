/* Collaudo browser con emulazione schermo Android: NON equivale a una prova fisica. */
'use strict';
const fs=require('node:fs');
const {spawn}=require('node:child_process');
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const BASE='http://127.0.0.1:8787/';
const OUT='monitoraggio/ultimo-collaudo-tutor-mobile.json';
const ids=['prompt-avviso','prompt-messaggio','prompt-lista','prompt-domande','prompt-verifica','prompt-correzione'];
const report={date:new Date().toISOString(),environment:'Chromium Linux + viewport 390x844 / 320x720 + touch Android emulato',physical_android_test:false,checks:[],errors:[]};
let server,browser;
const step=async(label,task)=>{
 try{const details=await task();report.checks.push({label,result:'PASS',details:details||'ok'});console.log('PASS '+label);}
 catch(e){report.checks.push({label,result:'FAIL',error:String(e.message||e).slice(0,500)});console.error('FAIL '+label+': '+String(e.message||e).slice(0,300));}
};
function waitServer(){return new Promise(async(resolve,reject)=>{
 for(let i=0;i<30;i++){try{let res=await fetch(BASE+'tutor-ai.html');if(res.ok)return resolve();}catch(e){}await new Promise(r=>setTimeout(r,250));}
 reject(Error('Server HTTP locale non raggiungibile'));
});}
const expectedText=async(page,id)=>{
 const lines=await page.locator('blockquote#'+id+' p').allTextContents();
 return lines.map(x=>x.trim()).join('\n\n');
};
(async()=>{
 try{
  server=spawn('python3',['-m','http.server','8787','--bind','127.0.0.1'],{stdio:'ignore'});
  await waitServer();
  browser=await chromium.launch({headless:true,args:['--no-sandbox']});
  const context=await browser.newContext({
   viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true,hasTouch:true,
   permissions:['clipboard-read','clipboard-write'],serviceWorkers:'allow'
  });
  const page=await context.newPage();
  page.on('pageerror',e=>report.errors.push(String(e).slice(0,350)));
  await step('Dalla homepage si apre la rubrica Tutor AI',async()=>{
   await page.goto(BASE+'index.html',{waitUntil:'domcontentloaded'});
   await page.locator('.topics a[href="tutor-ai.html"]').first().click();
   await page.waitForURL('**/tutor-ai.html');
   assert.match(await page.locator('main h1').innerText(),/Tutor AI essenziale/);
  });
  await step('Sei riquadri e sei pulsanti distinti nella pagina',async()=>{
   const values=await page.locator('button[data-copy]').evaluateAll(nodes=>nodes.map(x=>x.getAttribute('data-copy')));
   assert.deepEqual(values,ids);
   for(const id of ids)assert.equal(await page.locator('blockquote#'+id).count(),1);
   return {ids:values};
  });
  for(const id of ids)await step('Copia e incolla reale nel clipboard: '+id,async()=>{
   const expected=await expectedText(page,id);
   assert.ok(expected.length>40);
   const btn=page.locator('button[data-copy="'+id+'"]');
   await btn.click();
   await page.waitForTimeout(100);
   assert.match(await btn.innerText(),/Copiato/);
   const pasted=await page.evaluate(()=>navigator.clipboard.readText());
   assert.equal(pasted,expected);
   assert.match(await page.locator('#copia-stato').innerText(),/copiato/i);
   return {characters:pasted.length};
  });
  await step('Esercizi con soluzioni apribili al tocco',async()=>{
   const first=page.locator('details').first();
   assert.ok(await page.locator('details').count()>=4);
   await first.locator('summary').click();
   assert.equal(await first.evaluate(e=>e.open),true);
   await first.locator('summary').click();
   assert.equal(await first.evaluate(e=>e.open),false);
  });
  for(const width of [390,320])await step('Leggibilita geometrica a '+width+' px',async()=>{
   await page.setViewportSize({width,height:720});
   let d=await page.evaluate(()=>({inner:innerWidth,scroll:document.documentElement.scrollWidth}));
   assert.ok(d.scroll<=d.inner+3,JSON.stringify(d));
   let bounds=await page.locator('button[data-copy]').first().boundingBox();
   assert.ok(bounds && bounds.height>=48,JSON.stringify(bounds));
   return {width,scrollWidth:d.scroll,copyButtonHeight:bounds.height};
  });
  await page.setViewportSize({width:390,height:844});
  await step('Tutor AI Android: pagina raggiungibile dalla rubrica',async()=>{
   await page.goto(BASE+'tutor-ai.html',{waitUntil:'domcontentloaded'});
   await page.locator('a[href="tutor-ai-android-primi-passi.html"]').first().click();
   await page.waitForURL('**/tutor-ai-android-primi-passi.html');
   assert.match(await page.locator('article h1').innerText(),/Android/);
   assert.equal(await page.locator('blockquote#prompt-avviso').count(),1);
   return {url:page.url()};
  });
  await step('Tutor AI Android: copia reale del nuovo esempio',async()=>{
   const expected=await expectedText(page,'prompt-avviso');
   await page.locator('button#copia-android').click();
   await page.waitForTimeout(100);
   assert.equal(await page.evaluate(()=>navigator.clipboard.readText()),expected);
   assert.match(await page.locator('#copia-stato').innerText(),/copiato/i);
   return {characters:expected.length};
  });
  await step('Tutor AI Android: soluzione toccabile e due larghezze',async()=>{
   const details=page.locator('details').first();
   await details.locator('summary').click();
   assert.equal(await details.evaluate(el=>el.open),true);
   await details.locator('summary').click();
   for(const width of [390,320]){
    await page.setViewportSize({width,height:720});
    const d=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth}));
    assert.ok(d.scroll<=d.width+3,JSON.stringify(d));
    const button=await page.locator('#copia-android').boundingBox();
    assert.ok(button&&button.height>=48);
   }
   await page.setViewportSize({width:390,height:844});
  });
  await step('Sincronizzazione PWA comprende la pagina Tutor AI',async()=>{
   await page.goto(BASE+'app/',{waitUntil:'domcontentloaded'});
   await page.waitForFunction(()=>{
    let s=localStorage.getItem('perme-app-offline-20261014');
    if(!s)return false;
    try{return JSON.parse(s).guides?.some(g=>g.path==='tutor-ai.html')}catch(e){return false}
   },{timeout:120000});
   const saved=await page.evaluate(()=>{
    let s=JSON.parse(localStorage.getItem('perme-app-offline-20261014'));
    return {total:s.guides.length,tutor:s.guides.find(g=>g.path==='tutor-ai.html')};
   });
   assert.ok(saved.total>=8);
   assert.ok(saved.tutor.content.includes('prompt-avviso'));
   return {totalSaved:saved.total,tutorContentLength:saved.tutor.content.length};
  });
  await step('PWA online: sei tasti di copia generati e funzionanti',async()=>{
   await page.locator('#guide-list .guide-card').filter({hasText:'Tutor AI essenziale'}).first().click();
   assert.match(await page.locator('#reader-title').innerText(),/Tutor AI/);
   assert.equal(await page.locator('#reader-content .prompt-copy').count(),6);
   const p=page.locator('#reader-content blockquote#prompt-avviso');
   const expected=(await p.locator('p').allTextContents()).map(x=>x.trim()).join('\n\n');
   await page.locator('#reader-content .prompt-copy').first().click();
   await page.waitForTimeout(100);
   assert.equal(await page.evaluate(()=>navigator.clipboard.readText()),expected);
   return {buttons:6,pastedCharacters:expected.length};
  });
  await step('PWA online: nuova guida Android ha copia funzionante',async()=>{
   await page.locator('#back').click();
   await page.locator('#guide-list .guide-card').filter({hasText:'Usare una chat AI sul telefono Android'}).first().click();
   assert.equal(await page.locator('#reader-content .prompt-copy').count(),1);
   const expected=(await page.locator('#reader-content blockquote#prompt-avviso p').allTextContents()).map(x=>x.trim()).join('\n\n');
   await page.locator('#reader-content .prompt-copy').click();
   await page.waitForTimeout(100);
   assert.equal(await page.evaluate(()=>navigator.clipboard.readText()),expected);
   return {characters:expected.length};
  });
  await step('PWA offline: riapertura, lettura e copia',async()=>{
   await page.evaluate(async()=>{await navigator.serviceWorker.ready;});
   await page.goto(BASE+'app/',{waitUntil:'domcontentloaded'}); 
   await context.setOffline(true);
   await page.reload({waitUntil:'domcontentloaded',timeout:30000});
   await page.locator('#guide-list .guide-card').filter({hasText:'Tutor AI essenziale'}).first().click();
   assert.match(await page.locator('#reader-title').innerText(),/Tutor AI/);
   assert.equal(await page.locator('#reader-content .prompt-copy').count(),6);
   const id='prompt-correzione';
   const target=page.locator('#reader-content blockquote#'+id);
   const expected=(await target.locator('p').allTextContents()).map(x=>x.trim()).join('\n\n');
   await target.locator('xpath=preceding-sibling::button[contains(@class,"prompt-copy")][1]').click();
   await page.waitForTimeout(100);
   assert.equal(await page.evaluate(()=>navigator.clipboard.readText()),expected);
   return {copyOffline:true,characters:expected.length};
  });
  await step('PWA offline: nuova guida Android leggibile e copiabile',async()=>{
   await page.locator('#back').click();
   await page.locator('#guide-list .guide-card').filter({hasText:'Usare una chat AI sul telefono Android'}).first().click();
   assert.equal(await page.locator('#reader-content .prompt-copy').count(),1);
   assert.match(await page.locator('#reader-title').innerText(),/Android/);
   const expected=(await page.locator('#reader-content blockquote#prompt-avviso p').allTextContents()).map(x=>x.trim()).join('\n\n');
   await page.locator('#reader-content .prompt-copy').click();
   await page.waitForTimeout(100);
   assert.equal(await page.evaluate(()=>navigator.clipboard.readText()),expected);
   return {characters:expected.length};
  });
  await context.setOffline(false);
  await context.close();
 }catch(e){report.errors.push('Fatal: '+String(e.stack||e).slice(0,1000));}
 finally{
  await browser?.close().catch(()=>{});try{server?.kill()}catch(e){}
  report.overall=report.checks.every(x=>x.result==='PASS')&&report.errors.length===0?'PASS':'FAIL';
  fs.mkdirSync('monitoraggio',{recursive:true});
  fs.writeFileSync(OUT,JSON.stringify(report,null,2)+'\n');
  console.log('TUTOR MOBILE REPORT '+JSON.stringify({overall:report.overall,checks:report.checks.length,failures:report.checks.filter(x=>x.result==='FAIL'),errors:report.errors}));
  if(report.overall!=='PASS')process.exitCode=1;
 }
})();
