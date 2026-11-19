'use strict';
/* Collaudo locale della prima fase: lettura mobile, fotografie, link, app offline. */
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const { chromium } = require('playwright');

const root = path.resolve(__dirname, '..');
const types = {'.html':'text/html; charset=utf-8','.js':'application/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.webp':'image/webp','.png':'image/png','.ico':'image/x-icon','.webmanifest':'application/manifest+json'};
const server = http.createServer((req,res) => {
  const pathname = decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  let file = path.resolve(root,'.'+pathname);
  if (file !== root && !file.startsWith(root+path.sep)) {res.writeHead(403);res.end();return;}
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file,'index.html');
  if (!fs.existsSync(file)) {res.writeHead(404);res.end();return;}
  res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream'});
  fs.createReadStream(file).pipe(res);
});

async function run() {
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const base = 'http://127.0.0.1:'+server.address().port;
  const browser = await chromium.launch({headless:true,...(process.env.PERME_CHROMIUM?{executablePath:process.env.PERME_CHROMIUM}:{}),args:['--no-sandbox']});
  let checked=0;
  const check=(value,label)=>{if(!value)throw Error('COLLAUDO FALLITO: '+label);checked++;console.log('OK: '+label);};
  try {
    for(const width of [320,390,768]) {
      const page=await browser.newPage({viewport:{width,height:820},deviceScaleFactor:1});
      await page.route(/^https?:\/\/(?!127\.0\.0\.1)/,route=>route.abort());
      for(const file of ['index.html','lievito-madre.html','pasta-madre-solida-da-zero.html','licoli-da-zero.html']) {
        const response=await page.goto(base+'/'+file,{waitUntil:'domcontentloaded'});
        check(response.status()===200,file+' HTTP 200 a '+width+' px');
        check(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+2),file+' senza scorrimento orizzontale a '+width+' px');
        const buttons=await page.locator('.lievito-home-links a, .lievito-page a.button-lievito').evaluateAll(links=>{
          const luminance=color=>{
            const rgb=(color.match(/[\d.]+/g)||[]).slice(0,3).map(Number).map(v=>{
              const s=v/255;return s<=0.04045?s/12.92:((s+0.055)/1.055)**2.4;
            });
            return rgb[0]*0.2126+rgb[1]*0.7152+rgb[2]*0.0722;
          };
          return links.map(link=>{
            const css=getComputedStyle(link),foreground=luminance(css.color),background=luminance(css.backgroundColor);
            return {label:link.textContent.trim(),ratio:(Math.max(foreground,background)+0.05)/(Math.min(foreground,background)+0.05)};
          });
        });
        check(buttons.length>0&&buttons.every(b=>b.ratio>=7),file+' pulsanti ad alto contrasto (minimo '+Math.min(...buttons.map(b=>b.ratio)).toFixed(1)+':1) a '+width+' px');
        if(file!=='index.html') {
          check(await page.locator('main a[href="https://www.facebook.com/PerMeGuide/"]').count()===1,file+' collegamento Facebook');
          const photos=await page.locator('main img[src*="originale.webp"]').evaluateAll(images=>images.map(img=>({loaded:img.complete&&img.naturalWidth>0,alt:!!img.alt.trim()})));
          check(photos.length>0&&photos.every(p=>p.loaded&&p.alt),file+' foto caricata e testo alternativo');
        }
        if(file==='pasta-madre-solida-da-zero.html'){
          const pesi=await page.locator('.pesature').nth(1).innerText();
          check(pesi.includes('100 g')&&pesi.includes('200 g')&&pesi.includes('400 g'),'Pasta madre 100 + 200 + 100 g');
        }
        if(file==='licoli-da-zero.html'){
          const pesi=await page.locator('.pesature').nth(1).innerText();
          check(pesi.includes('50 g')&&pesi.includes('150 g'),'LI.CO.LI. 50 + 50 + 50 g');
        }
      }
      await page.close();
    }
    const context=await browser.newContext({viewport:{width:390,height:820}});
    const page=await context.newPage();
    await page.route(/^https?:\/\/(?!127\.0\.0\.1)/,route=>route.abort());
    await page.goto(base+'/app/');
    await page.waitForFunction(()=>document.querySelector('#sync-status').textContent.includes('pagine salvate'),null,{timeout:60000});
    const offlineEntries=await page.evaluate(()=>{
      const saved=JSON.parse(localStorage.getItem('perme-app-offline-20261014')||'{}');
      return saved.guides?.filter(g=>['pasta-madre-solida-da-zero.html','licoli-da-zero.html'].includes(g.path)).map(g=>({path:g.path,hasContent:g.content.includes('rinfresco')}))||[];
    });
    check(offlineEntries.length===2&&offlineEntries.every(x=>x.hasContent),'app: entrambe le guide scaricate per lettura offline');
    await context.setOffline(true);
    await page.reload({waitUntil:'domcontentloaded'});
    await page.waitForTimeout(800);
    check((await page.locator('#guide-list .guide-card').count())>0,'app: elenco disponibile offline');
    await page.locator('#search').fill('LI.CO.LI.');
    check((await page.locator('#guide-list .guide-card').count())>0,'app: LI.CO.LI. trovato offline');
    await page.locator('#guide-list .guide-card').first().click();
    check(await page.locator('#reader-content').innerText().then(t=>t.includes('50 g')),'app: testo LI.CO.LI. leggibile offline');
    await context.close();
  } finally {
    await browser.close();
    await new Promise(resolve=>server.close(resolve));
  }
  console.log('COLLAUDO SUPERATO: '+checked+' controlli');
}
run().catch(error=>{console.error(error);server.close();process.exitCode=1;});
