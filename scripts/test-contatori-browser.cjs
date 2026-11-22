/* Test autonomo del tracciamento Per Me su sito pubblico.
 * Intercetta tutti gli /hit/ nel browser: NESSUNA visita/installazione reale
 * viene conteggiata da questa diagnostica.
 */
const { chromium }=require('playwright');
const fs=require('node:fs');
const path=require('node:path');
const http=require('node:http');
require('node:child_process').execFileSync(process.execPath,
  ['--test',path.join(__dirname,'test-origini-contatori.cjs')],{stdio:'inherit'});
const analytics=fs.readFileSync(path.join(__dirname,'..','analytics.js'),'utf8');
const site='https://cpcpcp106-coder.github.io/Per-Me/';
const external=/^https:\/\/countapi\.mileshilliard\.com\/api\/v1\/hit\//;
const results=[];
function row(name,pass,details){results.push({name,pass,details});console.log((pass?'PASS':'FAIL')+' '+name+' '+JSON.stringify(details));}
(async()=>{
 const browser=await chromium.launch({headless:true,args:['--no-sandbox'],
   executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH||undefined});
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
  const beaconPresent=await home.locator('script[src*="static.cloudflareinsights.com/beacon.min.js"]').count();
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
  const ownerBeacon=await owner.locator('script[src*="static.cloudflareinsights.com/beacon.min.js"]').count();
  row('owner_cloudflare_excluded',ownerBeacon===0,{ownerBeacon});
  row('owner_excluded',t.hits.length===0,{hits:t.hits.length});
  await t.ctx.close();

  // Le diverse campagne e un referrer esterno vengono ripartiti correttamente.
  for(const [source,query,referrer,channel=false] of [
    ['facebook','?utm_source=facebook&utm_medium=social',undefined],
    ['whatsapp','?utm_source=whatsapp',undefined],
    ['whatsapp','?utm_source=whatsapp&utm_medium=channel',undefined,true],
    ['whatsapp','?test-contatori-browser=whatsapp','https://web.whatsapp.com/'],
    ['instagram','?utm_source=instagram&utm_medium=social',undefined],
    ['instagram','?utm_source=ig',undefined],
    ['instagram','?test-contatori-browser=instagram','https://l.instagram.com/'],
    ['instagram','?utm_source=instagram&utm_medium=channel&fbclid=prova',undefined],
    ['pinterest','?utm_source=pinterest&utm_medium=organic_social',undefined],
    ['pinterest','?utm_source=%20Pinterest%20&fbclid=prova',undefined],
    ['pinterest','?test-contatori-browser=pinterest','https://it.pinterest.com/'],
    ['pinterest','?test-contatori-browser=pinterest-it','https://www.pinterest.it/'],
    ['pinterest','?test-contatori-browser=pin-it','https://pin.it/prova'],
    ['altri','?test-contatori-browser=falso-pinterest','https://pinterest.com.example.org/'],
    ['google','?utm_source=google',undefined],
    ['altri','?test-contatori-browser=esterno','https://example.org/articolo'],
  ]){
    t=await contextWithMock();
    const page=await t.ctx.newPage();
    await page.goto(site+'index.html'+query,{waitUntil:'domcontentloaded',timeout:35000,...(referrer?{referer:referrer}:{})});
    await awaitHits(t.hits,channel?3:2);
    const count=t.hits.filter(u=>u.includes('perme-origine-'+source+'-dal-')).length;
    const channelHits=t.hits.filter(u=>u.includes('perme-canale-whatsapp-dal-20261120-')).length;
    row('source_'+source+(channel?'_canale':''),t.hits.length===(channel?3:2)&&count===1&&channelHits===(channel?1:0),{hits:t.hits});
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

  // Il test non deve mai inviare POST reali al servizio Cloudflare.
  // Carica il vero script Cloudflare e intercetta la raccolta dei dati prima della rete.
  const cfCtx=await browser.newContext({serviceWorkers:'block'});
  // Osserva sendBeacon sul browser stesso; blocca sempre l'invio reale a Cloudflare.
  await cfCtx.addInitScript(()=>{
    window.__perme_cf_attempts=[];
    const oldBeacon=navigator.sendBeacon?.bind(navigator);
    navigator.sendBeacon=function(url,data){
      const target=String(url);
      if(target.includes('/cdn-cgi/rum')){
        window.__perme_cf_attempts.push({type:'sendBeacon',url:target});
        return true;
      }
      return oldBeacon?oldBeacon(url,data):false;
    };
  });
  let cfPosts=0;
  const cfErrors=[],cfNetwork=[];

  await cfCtx.route('**/analytics.js?*',route=>route.fulfill({
    status:200,contentType:'application/javascript',body:analytics
  }));
  await cfCtx.route(external,route=>route.fulfill({
    status:200,contentType:'application/json',
    headers:{'Access-Control-Allow-Origin':'*'},
    body:'{"value":1}'
  }));
  await cfCtx.route('**/cdn-cgi/rum*',async route=>{
    if(route.request().method()==='POST') cfPosts++;
    await route.fulfill({status:200,contentType:'application/json',
      headers:{'Access-Control-Allow-Origin':'*'},body:'{}'});
  });
  const cfPage=await cfCtx.newPage();
  cfPage.on('request',request=>{
    if(/cloudflareinsights\.com/.test(request.url())){
      const u=new URL(request.url());
      cfNetwork.push({type:'request',host:u.hostname,path:u.pathname,method:request.method()});
    }
  });
  cfPage.on('response',response=>{
    if(/cloudflareinsights\.com/.test(response.url())){
      const u=new URL(response.url());
      cfNetwork.push({type:'response',host:u.hostname,path:u.pathname,status:response.status()});
    }
  });
  cfPage.on('console',msg=>{
    if(msg.type()==='error') cfErrors.push(msg.text().slice(0,190));
  });
  cfPage.on('pageerror',error=>cfErrors.push(String(error).slice(0,200)));
  cfPage.on('requestfailed',request=>{
    if(request.url().includes('cloudflareinsights.com'))
      cfErrors.push(request.url().split('?')[0]+': '+request.failure());
  });
  await cfPage.goto(site+'index.html?prova-analytics-intercettata=1',{
    waitUntil:'load',timeout:35000
  });
  await cfPage.waitForTimeout(2400);
  const cfBeaconAttempts=await cfPage.evaluate(()=>window.__perme_cf_attempts||[]);
  const cfState=await cfPage.evaluate(()=>({
    webdriver:navigator.webdriver,readyState:document.readyState,
    scriptCount:document.querySelectorAll('script[src*="cloudflareinsights.com/beacon.min.js"]').length
  }));
  await cfPage.goto('about:blank',{waitUntil:'load',timeout:20000});
  await cfPage.waitForTimeout(1000);
  // Browser automatici possono essere esclusi dai sistemi anti-bot.
  // Non richiedere POST al test headless: verifica il JS HTTP 200 e il suo
  // caricamento, registrando separatamente se il beacon avrebbe trasmesso.
  const loaded=cfNetwork.some(x=>x.type==='response' &&
    x.path==='/beacon.min.js' && x.status===200);
  row('cloudflare_real_js_posts_intercepted',loaded && cfPosts>=1,
    {loaded,attemptedPosts:cfPosts,sendBeaconAttempts:cfBeaconAttempts,context:cfState,network:cfNetwork,errors:cfErrors,
     note:'Verifica invio HTTP POST reale intercettato dal test: nessuna statistica trasmessa al fornitore.'});
  // Controllo comparativo con la configurazione HTML statica ufficiale:
  // stessa origine di Per Me, stesso browser, script caricato come nella dashboard.
  // La risposta HTML è simulata e non esiste alcuna pagina nuova sul sito.
  await cfCtx.route('**/Per-Me/cf-diagnostica-virtuale.html',route=>route.fulfill({
    status:200,contentType:'text/html',
    body:`<!doctype html><html><head><meta charset="utf-8"><title>Prova virtuale Cloudflare</title>
    <script type="module" src="https://static.cloudflareinsights.com/beacon.min.js"
    data-cf-beacon='{"token":"f16507f2d95944b0be1e747974750ad1"}'></script>
    </head><body><h1>Diagnostica senza incrementi reali</h1></body></html>`
  }));
  const staticPage=await cfCtx.newPage();
  const staticErrors=[];
  staticPage.on('pageerror',e=>staticErrors.push(String(e).slice(0,200)));
  staticPage.on('console',m=>{if(m.type()==='error')staticErrors.push(m.text().slice(0,180));});
  const beforePosts=cfPosts;
  const beforeRequests=cfNetwork.length;
  await staticPage.goto(site+'cf-diagnostica-virtuale.html',{waitUntil:'load',timeout:35000});
  await staticPage.waitForTimeout(2400);
  const staticBeaconCalls=await staticPage.evaluate(()=>window.__perme_cf_attempts||[]);
  await staticPage.goto('about:blank',{waitUntil:'load',timeout:20000});
  await staticPage.waitForTimeout(850);
  row('cloudflare_static_snippet_comparison',true,{
    posts:cfPosts-beforePosts,
    sendBeaconCalls:staticBeaconCalls,
    network:cfNetwork.slice(beforeRequests),errors:staticErrors,
    note:'Pagina temporanea simulata nel browser, nessuna modifica al sito e nessuna metrica reale inviata'
  });
  // Verifica se il problema è type="module" su script creato con appendChild:
  // confronta il caricamento classico nello stesso ambiente e senza richieste reali.
  await cfCtx.route('**/Per-Me/cf-diagnostica-classic.html',route=>route.fulfill({
    status:200,contentType:'text/html',
    body:`<!doctype html><html><head><meta charset="utf-8"><title>Test script classico</title>
    <script>
    const s=document.createElement('script');
    s.src='https://static.cloudflareinsights.com/beacon.min.js?token=f16507f2d95944b0be1e747974750ad1';
    document.head.appendChild(s);
    </script></head><body>Diagnostica</body></html>`
  }));
  const classicPage=await cfCtx.newPage();
  const classicErrors=[];
  classicPage.on('pageerror',e=>classicErrors.push(String(e).slice(0,200)));
  const beforeClassic=cfPosts;
  await classicPage.goto(site+'cf-diagnostica-classic.html',{waitUntil:'load',timeout:35000});
  await classicPage.waitForTimeout(2400);
  const classicBeaconCalls=await classicPage.evaluate(()=>window.__perme_cf_attempts||[]);
  await classicPage.goto('about:blank',{waitUntil:'load',timeout:20000});
  await classicPage.waitForTimeout(700);
  row('cloudflare_dynamic_classic_comparison',true,{
    posts:cfPosts-beforeClassic,
    sendBeaconCalls:classicBeaconCalls,errors:classicErrors,
    note:'Script classico caricato dinamicamente: POST solo simulati'
  });
  await cfCtx.close();

  // Collaudo dei pannelli del commit corrente, anche su schermi stretti e offline.
  // Il server espone soltanto i file del checkout; tutti i contatori sono simulati.
  const root=path.resolve(__dirname,'..');
  const server=http.createServer((req,res)=>{
    const pathname=new URL(req.url,'http://localhost').pathname;
    const relative=pathname.replace(/^\/Per-Me\//,'');
    let file=path.resolve(root,relative);
    if(!file.startsWith(root+path.sep)){res.writeHead(404);res.end();return;}
    if(pathname.endsWith('/'))file=path.join(file,'index.html');
    fs.readFile(file,(error,data)=>{
      if(error){res.writeHead(404);res.end();return;}
      const mime={'.html':'text/html','.js':'application/javascript','.css':'text/css',
        '.webmanifest':'application/manifest+json','.png':'image/png','.webp':'image/webp',
        '.jpg':'image/jpeg','.jpeg':'image/jpeg','.ico':'image/x-icon'};
      res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream',
        'Cache-Control':'no-store'});res.end(data);
    });
  });
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const panelCtx=await browser.newContext({viewport:{width:390,height:844}});
  let offline=false,missingInstagram=false,panelHits=0;
  await panelCtx.route('**/api/v1/hit/**',route=>{panelHits++;return route.abort();});
  await panelCtx.route('**/api/v1/get/**',route=>{
    if(offline)return route.abort();
    const key=route.request().url();
    const value=key.includes('origine-instagram')?13:
      key.includes('origine-pinterest')?17:
      key.includes('canale-whatsapp')?8:key.includes('origine-whatsapp')?21:101;
    return route.fulfill({status:missingInstagram&&/origine-(instagram|pinterest)/.test(key)?404:200,
      contentType:'application/json',headers:{'Access-Control-Allow-Origin':'*'},
      body:JSON.stringify({value})});
  });
  try{
    const base='http://127.0.0.1:'+server.address().port+'/Per-Me/';
    const links=await panelCtx.newPage();
    for(const width of [320,390,768]){
      await links.setViewportSize({width,height:844});
      for(const file of ['index.html','farine-quale-scegliere.html']){
        await links.goto(base+file,{waitUntil:'networkidle'});
        const button=links.getByRole('link',{name:'Per Me su Pinterest',exact:true});
        const details={width,count:await button.count(),
          href:await button.getAttribute('href'),
          button:await button.evaluate(el=>({height:el.getBoundingClientRect().height,
            width:el.getBoundingClientRect().width,font:getComputedStyle(el).fontSize})),
          page:await links.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth}))};
        row('pinterest_link_'+file+'_'+width,
          details.count===1&&details.href==='https://it.pinterest.com/permeguide/'&&
          details.button.height>=48&&details.page.scrollWidth<=details.page.width+2,details);
      }
    }
    await links.close();
    const panel=await panelCtx.newPage();
    await panel.goto(base+'contatori-personali/',{waitUntil:'networkidle'});
    row('social_panel_values',await panel.locator('#instagram').innerText()==='13'&&
      await panel.locator('#pinterest').innerText()==='17'&&
      await panel.locator('#whatsapp').innerText()==='21'&&
      await panel.locator('#whatsapp-canale').innerText()==='8',{});
    for(const width of [320,390,768]){
      await panel.setViewportSize({width,height:844});
      row('social_panel_width_'+width,await panel.evaluate(()=>
        document.documentElement.scrollWidth<=innerWidth),{width});
    }
    missingInstagram=true;
    await panel.locator('#refresh').click();
    await panel.waitForFunction(()=>!document.getElementById('refresh').disabled);
    row('new_counter_404_is_zero',await panel.locator('#instagram').innerText()==='0'&&
      await panel.locator('#pinterest').innerText()==='0',{});
    missingInstagram=false;
    await panel.locator('#refresh').click();
    await panel.waitForFunction(()=>!document.getElementById('refresh').disabled);
    await panel.evaluate(()=>navigator.serviceWorker.ready);
    await panel.reload({waitUntil:'networkidle'});
    const controller=await panel.evaluate(()=>Boolean(navigator.serviceWorker.controller));
    row('counter_service_worker_ready',controller,{});
    offline=true;await panelCtx.setOffline(true);
    await panel.reload({waitUntil:'domcontentloaded'});
    await panel.waitForFunction(()=>document.getElementById('status').textContent.includes('Impossibile aggiornare'));
    row('counter_offline_shell_and_saved_values',await panel.locator('#instagram').innerText()==='13'&&
      await panel.locator('#pinterest').innerText()==='17'&&
      await panel.locator('#whatsapp-canale').innerText()==='8',{});
    await panelCtx.setOffline(false);offline=false;
    await panel.goto(base+'contatori-per-me-41c83f9e6c2a4d08b5f71e236ba0d94c.html',{
      waitUntil:'networkidle'});
    row('legacy_panel_social_values',await panel.locator('#instagram').innerText()==='13'&&
      await panel.locator('#pinterest').innerText()==='17'&&
      await panel.locator('#whatsapp-canale').innerText()==='8',{});
    row('panels_never_increment',panelHits===0,{panelHits});
  }finally{
    await panelCtx.close();await new Promise(resolve=>server.close(resolve));
  }
 }finally{await browser.close()}
 console.log('Diagnostica con intercettazione HTTP, nessun incremento delle chiavi reali.');
 if(results.some(x=>!x.pass))process.exitCode=1;
})().catch(e=>{console.error('FAIL errore diagnostica',e);process.exitCode=1});
