/* Test autonomo del tracciamento Per Me su sito pubblico.
 * Intercetta tutti gli /hit/ nel browser: NESSUNA visita/installazione reale
 * viene conteggiata da questa diagnostica.
 */
const { chromium }=require('playwright');
const fs=require('node:fs');
const path=require('node:path');
const analytics=fs.readFileSync(path.join(__dirname,'..','analytics.js'),'utf8');
const site='https://cpcpcp106-coder.github.io/Per-Me/';
const external=/^https:\/\/countapi\.mileshilliard\.com\/api\/v1\/hit\//;
const results=[];
function row(name,pass,details){results.push({name,pass,details});console.log((pass?'PASS':'FAIL')+' '+name+' '+JSON.stringify(details));}
(async()=>{
 const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
 try{
  async function contextWithMock(){
   const ctx=await browser.newContext({serviceWorkers:'block'});
   const hits=[];
   // Il collaudo NON deve inviare neppure eventi Cloudflare.
   await ctx.route('**/beacon.min.js*',route=>route.fulfill({
     status:200,contentType:'application/javascript',body:''
   }));
   await ctx.route('**/cdn-cgi/rum*',route=>route.abort());
   // Testa il codice del commit corrente, senza aspettare l'aggiornamento CDN.
   await ctx.route('**/analytics.js?*',route=>route.fulfill({
     status:200,contentType:'application/javascript',body:analytics
   }));
   await ctx.route(external,async route=>{
    const url=route.request().url();
    hits.push(url);
    const key=decodeURIComponent(new URL(url).pathname.split('/').pop());
    await route.fulfill({status:200,contentType:'application/json',
       headers:{'Access-Control-Allow-Origin':'https://cpcpcp106-coder.github.io','Cache-Control':'no-store'},
       body:JSON.stringify({key,value:1})});
   });
   return {ctx,hits};
  }
  async function awaitHits(arr,limit){
   for(let i=0;i<36&&arr.length<limit;i++)await new Promise(r=>setTimeout(r,250));
  }
  let t=await contextWithMock();
  const home=await t.ctx.newPage();
  const errors=[];
  home.on('pageerror',e=>errors.push(String(e)));
  const resp=await home.goto(site+'index.html?test-contatori-browser=1',{waitUntil:'domcontentloaded',timeout:35000});
  await awaitHits(t.hits,2);
  row('home_page_http',resp?.status()===200,{http:resp?.status()});
  const beaconPresent=await home.locator('script[data-cf-beacon]').count();
  row('cloudflare_beacon_present',beaconPresent===1,{beaconPresent});
  row('first_visit_attempt_mocked',t.hits.length===2&&t.hits.some(u=>u.includes('perme-visite-dal-20261018-43bcc26da793'))&&t.hits.some(u=>u.includes('perme-origine-sconosciuta-dal-20261023')),{hits:t.hits,errors});
  await home.reload({waitUntil:'domcontentloaded'});
  await new Promise(r=>setTimeout(r,800));
  row('no_double_count_within_30min',t.hits.length===2,{hits:t.hits.length});
  await t.ctx.close();

  t=await contextWithMock();
  await t.ctx.addCookies([{name:'perme_no_count',value:'1',domain:'cpcpcp106-coder.github.io',path:'/Per-Me/',secure:true,sameSite:'Lax'}]);
  const owner=await t.ctx.newPage();
  await owner.goto(site+'index.html?test-contatori-browser=2',{waitUntil:'domcontentloaded',timeout:35000});
  await new Promise(r=>setTimeout(r,1500));
  const ownerBeacon=await owner.locator('script[data-cf-beacon]').count();
  row('owner_cloudflare_excluded',ownerBeacon===0,{ownerBeacon});
  row('owner_excluded',t.hits.length===0,{hits:t.hits.length});
  await t.ctx.close();

  // Le diverse campagne e un referrer esterno vengono ripartiti correttamente.
  for(const [source,query,referrer] of [
    ['facebook','?utm_source=facebook&utm_medium=social',undefined],
    ['google','?utm_source=google',undefined],
    ['altri','?test-contatori-browser=esterno','https://example.org/articolo'],
  ]){
    t=await contextWithMock();
    const page=await t.ctx.newPage();
    await page.goto(site+'index.html'+query,{waitUntil:'domcontentloaded',timeout:35000,...(referrer?{referer:referrer}:{})});
    await awaitHits(t.hits,2);
    const count=t.hits.filter(u=>u.includes('perme-origine-'+source+'-dal-20261023')).length;
    row('source_'+source,t.hits.length===2&&count===1,{hits:t.hits});
    await t.ctx.close();
  }

  t=await contextWithMock();
  const app=await t.ctx.newPage();
  const appResp=await app.goto(site+'app/?test-contatori-browser=3',{waitUntil:'domcontentloaded',timeout:35000});
  await awaitHits(t.hits,2);
  await app.evaluate(()=>window.dispatchEvent(new Event('appinstalled')));
  await awaitHits(t.hits,3);
  const installHits=t.hits.filter(u=>u.includes('perme-installazioni-dal-20261018-43bcc26da793'));
  row('app_page_http',appResp?.status()===200,{http:appResp?.status()});
  row('app_installed_event_mocked',installHits.length===1,{hits:t.hits});
  await t.ctx.close();
 }finally{await browser.close()}
 console.log('Diagnostica con intercettazione HTTP, nessun incremento delle chiavi reali.');
 if(results.some(x=>!x.pass))process.exitCode=1;
})().catch(e=>{console.error('FAIL errore diagnostica',e);process.exitCode=1});
