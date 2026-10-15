/* Browser integration test: Chromium emulated Android 390px; not a physical-device certification. */
const fs=require('node:fs'),path=require('node:path'),{spawn}=require('node:child_process');
const {chromium}=require('playwright');
const axe=require('axe-core');
const URL='http://127.0.0.1:8765/';
const out=path.join('monitoraggio','ultimo-collaudo-browser.json');
const report={checked_at_utc:new Date().toISOString(),engine:'Playwright Chromium Linux, viewport 390x844, touch emulated; NOT real Android',status:'STARTED',tests:[],axe:[],page_errors:[],limitations:['Non certifica installazione di icona PWA su telefono Samsung','Non certifica WCAG 2.2 AA con lettore schermo e tastiera fisica','Non verifica semanticamente ogni fonte normativa']};
const record=(name,ok,details)=>report.tests.push({name,result:ok?'PASS':'FAIL',details});
function save(){fs.mkdirSync('monitoraggio',{recursive:true});fs.writeFileSync(out,JSON.stringify(report,null,2)+'\n')}
let server,browserInstance;
async function axeTest(page,label){
try{await page.addScriptTag({content:axe.source});let r=await page.evaluate(async()=>window.axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']}}));
report.axe.push({page:label,violations:r.violations.map(x=>({id:x.id,impact:x.impact,description:x.description,help:x.help,affected:x.nodes.map(n=>n.target).slice(0,10),total:x.nodes.length})),passes:r.passes.length,incomplete:r.incomplete.length});}
catch(e){report.axe.push({page:label,error:String(e).slice(0,300)})}}
async function start(){
server=spawn('python3',['-m','http.server','8765','--bind','127.0.0.1'],{stdio:'ignore'});
await new Promise(r=>setTimeout(r,1500));
browserInstance=await chromium.launch({headless:true,args:['--no-sandbox']});
const context=await browserInstance.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:2,serviceWorkers:'allow'});
const page=await context.newPage();
page.on('pageerror',err=>report.page_errors.push(String(err).slice(0,280)));
await page.goto(URL+'index.html',{waitUntil:'domcontentloaded'});
record('home_load',await page.locator('h1').count()===1,await page.title());
record('home_overflow_mobile',await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+3),await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth})));
await axeTest(page,'home');
let htmls=fs.readdirSync('.').filter(x=>x.endsWith('.html')&&!x.startsWith('google'));
let failures=[];
for(let name of htmls){let resp=await context.request.get(URL+name,{timeout:15000});if(!resp.ok())failures.push({page:name,status:resp.status()});}
record('published_html_http_local',failures.length===0,{count:htmls.length,failures});
const allPageOverflow=[],allPageBrowserErrors=[];
for (const name of htmls){
try{
 await page.goto(URL+name,{waitUntil:'domcontentloaded',timeout:25000});
 const width390=await page.evaluate(()=>({inner:innerWidth,scroll:document.documentElement.scrollWidth}));
 await page.setViewportSize({width:320,height:820});
 const width320=await page.evaluate(()=>({inner:innerWidth,scroll:document.documentElement.scrollWidth}));
 if(width390.scroll>width390.inner+3 || width320.scroll>width320.inner+3)
  allPageOverflow.push({name,width390,width320});
 await page.setViewportSize({width:390,height:844});
 await axeTest(page,name);
}catch(e){allPageBrowserErrors.push({name,error:String(e).slice(0,260)})}
}
record('all_root_html_mobile_reflow',allPageOverflow.length===0,{checked:htmls.length,violations:allPageOverflow});
record('all_root_html_axe_wcag_auto',!report.axe.some(x=>x.error||(x.violations||[]).length) && !allPageBrowserErrors.length,{checked:htmls.length,failed:report.axe.filter(x=>x.error||(x.violations||[]).length).map(x=>({page:x.page,violations:x.violations?.map(y=>({id:y.id,nodes:y.total})),error:x.error})),errors:allPageBrowserErrors});

await page.goto(URL+'debiti-guida-09-a-chi-rivolgersi.html',{waitUntil:'domcontentloaded'});
record('guide_09_load',await page.locator('article h1').count()===1,await page.locator('article h1').textContent());
record('guide09_overflow_mobile',await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+3),await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth})));
await axeTest(page,'guida09');
await page.goto(URL+'app/',{waitUntil:'domcontentloaded'});
const manifest=await page.evaluate(async()=>{let u=document.querySelector('link[rel="manifest"]')?.href;return u?await (await fetch(u)).json():null});
record('manifest_and_app_id',!!(manifest&&manifest.id&&manifest.start_url&&manifest.icons?.length>=2),manifest&&{id:manifest.id,start:manifest.start_url,icons:manifest.icons.length});
await page.waitForFunction(()=>{let x=document.getElementById('sync-status');return x&&/pagine salvate|NON sono state salvate|Impossibile aggiornare/.test(x.textContent||'')},{timeout:90000}).catch(()=>{});
const status=await page.locator('#sync-status').innerText();
let stored=await page.evaluate(()=>{let k=Object.keys(localStorage).find(x=>x.startsWith('perme-app-offline'));let o=k?JSON.parse(localStorage.getItem(k)):{};return {guides:o.guides?.length||0,updated:o.updated,bytes:k?localStorage.getItem(k).length:0,includesNew09:!!o.guides?.some(g=>g.path==='debiti-guida-09-a-chi-rivolgersi.html')}});
record('sync_and_persist_localStorage',stored.guides>=23 && stored.includesNew09,{status,stored});
await axeTest(page,'app-catalogue');
const reg=await page.evaluate(async()=>{await navigator.serviceWorker.ready;return !!(await navigator.serviceWorker.getRegistration('./'))});
record('service_worker_registration',reg,reg);
await context.setOffline(true);
await page.reload({waitUntil:'domcontentloaded',timeout:30000}).catch(e=>report.page_errors.push('Offline reload: '+String(e).slice(0,180)));
await page.waitForTimeout(500);
const offlinePage=await page.locator('#guide-list .guide-card').count();
record('offline_shell_and_catalogue',offlinePage>=23,{count:offlinePage});
if(offlinePage){await page.locator('#guide-list .guide-card').first().click();record('offline_guide_readable',(await page.locator('#reader-content').innerText()).trim().length>250,{title:await page.locator('#reader-title').innerText(),chars:(await page.locator('#reader-content').innerText()).length})}
await context.setOffline(false);
await page.reload({waitUntil:'domcontentloaded'});
await page.waitForTimeout(800);
record('app_back_online_after_offline',(await page.locator('h1').count())>=1,'App reopened after offline test');
await browserInstance.close();browserInstance=null;
report.status='COMPLETED';
} 
(async()=>{try{await start()}catch(e){report.status='ERROR';report.error=String(e.stack||e).slice(0,1800)}
finally{try{await browserInstance?.close()}catch(e){};try{server?.kill()}catch(e){};save();console.log(JSON.stringify({status:report.status,tests:report.tests,axe:report.axe.map(x=>({page:x.page,violations:x.violations?.length,error:x.error})),errors:report.page_errors},null,2));}})();
