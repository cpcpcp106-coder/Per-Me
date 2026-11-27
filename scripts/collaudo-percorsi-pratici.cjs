'use strict';
// Prove simulate dei percorsi, copia, stampa e riepiloghi; non una prova con lettori reali.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const {chromium} = require('playwright');
const axe = require('axe-core');
const root = path.resolve(__dirname, '..');
const types = {'.html':'text/html; charset=utf-8','.js':'application/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.webp':'image/webp','.png':'image/png'};
const routes = [
  ['inps','Pagamento o domanda INPS','inps-prestazione-sospesa-respinta-cosa-fare.html'],
  ['assistenza','Assistenza a un familiare','caregiver-familiari-anziani-disabilita-legge-104.html'],
  ['stipendio','Stipendio diminuito','stipendio-diminuito-cosa-controllare.html'],
  ['visita','Prenotare una visita','salute-guida-07-cup-prenotazioni-liste-attesa.html'],
  ['documenti','Documenti sul telefono','digitale-documenti-telefono-pdf-allegati.html']
];
let checks = 0, server, browser;
const check = (condition, label) => {assert.ok(condition, label);checks++;};
const fit = async page => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 2);
async function main() {
  let origin = process.env.PERME_TEST_URL;
  if (!origin) {
    server = http.createServer((req,res) => {
      let file = path.resolve(root, '.' + decodeURIComponent(new URL(req.url,'http://localhost').pathname));
      if (!file.startsWith(root + path.sep) && file !== root) {res.writeHead(403);return res.end();}
      if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
      if (!fs.existsSync(file)) {res.writeHead(404);return res.end();}
      res.writeHead(200,{'Content-Type':types[path.extname(file)] || 'application/octet-stream'});
      fs.createReadStream(file).pipe(res);
    });
    await new Promise(resolve => server.listen(0,'127.0.0.1',resolve));
    origin = 'http://127.0.0.1:' + server.address().port + '/';
  }
  browser = await chromium.launch({headless:true,args:['--no-sandbox'],executablePath:process.env.PERME_CHROMIUM_PATH || undefined});
  for (const width of [320,390]) {
    const context = await browser.newContext({viewport:{width,height:844},permissions:['clipboard-read','clipboard-write']});
    const page = await context.newPage();
    await page.goto(origin + 'da-dove-cominciare.html');
    const photo = page.locator('main figure img');
    await photo.scrollIntoViewIfNeeded();
    await page.waitForFunction(() => {const img=document.querySelector('main figure img');return img.complete && img.naturalWidth > 0;});
    check(await photo.evaluate(img => img.complete && img.naturalWidth > 0), 'Fotografia presente e caricata');
    for (const [id,label,guide] of routes) {
      await page.getByRole('link',{name:label,exact:true}).click();
      const card = page.locator('#percorso-' + id);
      check(await card.isVisible() && await card.locator('ol li').count() === 3, label + ': tre passi visibili');
      check(await card.locator('a[href="' + guide + '"]').isVisible(), label + ': guida collegata');
      await card.getByRole('button',{name:'Copia i passi',exact:true}).click();
      const copied = await page.evaluate(() => navigator.clipboard.readText());
      check(copied.includes('Da preparare:') && copied.includes('Se ti blocchi:') && copied.includes(origin + guide), label + ': testo copiato con collegamenti completi');
      check(!copied.includes('Stampa il percorso'), label + ': nessun controllo copiato come istruzione');
      await page.evaluate(() => document.documentElement.style.fontSize = '200%');
      check(await fit(page), label + ': reflow al 200% su ' + width);
      await page.addScriptTag({content:axe.source});
      const violations = await page.evaluate(async () => (await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','wcag22aa']}})).violations.map(item => item.id));
      check(violations.length === 0, label + ': accessibilità automatica ' + JSON.stringify(violations));
      await page.evaluate(() => document.documentElement.style.fontSize = '');
    }
    await page.locator('#percorso-documenti summary').click();
    await page.getByRole('link',{name:'Documenti sul telefono',exact:true}).click();
    check(await page.locator('#percorso-documenti').getAttribute('open') !== null, 'Riapertura del percorso con lo stesso frammento');
    await page.evaluate(() => {window.print = () => window.dispatchEvent(new Event('beforeprint'));});
    await page.locator('#percorso-documenti').getByRole('button',{name:'Stampa il percorso',exact:true}).click();
    await page.emulateMedia({media:'print'});
    check(await page.locator('#percorso-documenti').isVisible() && !(await page.locator('#percorso-inps').isVisible()), 'Stampa del solo percorso scelto');
    check(!(await page.locator('header').isVisible()) && !(await page.locator('#percorso-documenti .percorso-azioni').isVisible()), 'Stampa senza navigazione e pulsanti');
    await page.evaluate(() => window.dispatchEvent(new Event('afterprint')));
    await page.emulateMedia({media:'screen'});
    check(await page.locator('#percorso-inps').isVisible(), 'Navigazione ripristinata dopo la stampa');
    await context.close();
  }
  const fallbackContext = await browser.newContext({viewport:{width:320,height:844}});
  await fallbackContext.addInitScript(() => Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async () => {throw new Error('Appunti negati');}}}));
  const fallbackPage = await fallbackContext.newPage();
  await fallbackPage.goto(origin + 'da-dove-cominciare.html#percorso-visita');
  const card = fallbackPage.locator('#percorso-visita');
  check(await card.locator('ol').isVisible(), 'Collegamento diretto apre il percorso');
  await card.getByRole('button',{name:'Copia i passi',exact:true}).click();
  const field = card.getByRole('textbox',{name:'Passi da copiare'});
  check(await field.isVisible() && (await field.inputValue()).includes('Centro unico di prenotazione'), 'Copia manuale se gli appunti sono negati');
  check(await field.evaluate(input => document.activeElement === input && input.selectionEnd === input.value.length), 'Testo già selezionato per la copia manuale');
  check(await fit(fallbackPage), 'Copia manuale senza scorrimento orizzontale');
  await fallbackContext.close();
  const noJs = await browser.newContext({javaScriptEnabled:false});
  const plain = await noJs.newPage();
  await plain.goto(origin + 'da-dove-cominciare.html');
  await plain.locator('#percorso-assistenza summary').click();
  check(await plain.locator('#percorso-assistenza ol').isVisible() && !(await plain.locator('#percorso-assistenza .percorso-azioni').isVisible()), 'Passi leggibili anche senza JavaScript');
  await noJs.close();
  const context = await browser.newContext({viewport:{width:320,height:844}});
  const page = await context.newPage();
  await page.goto(origin + 'monitoraggio.html');
  await page.waitForFunction(() => document.getElementById('statico-stato').textContent.startsWith('Controllo statico del'));
  check(Number(await page.locator('#statico-pagine').innerText()) > 0 && (await page.locator('#browser-stato').innerText()).includes('riuscite su'), 'Riepiloghi aggiornati dalle evidenze');
  await page.evaluate(() => document.documentElement.style.fontSize = '200%');
  if (!(await fit(page))) console.log('Dettagli reflow monitoraggio', await page.evaluate(() => ({viewport:innerWidth,scrollWidth:document.documentElement.scrollWidth,elements:[...document.querySelectorAll('body *')].map(e => ({tag:e.tagName,id:e.id,text:e.textContent.slice(0,80),right:e.getBoundingClientRect().right,left:e.getBoundingClientRect().left})).filter(e => e.right > innerWidth + 2 || e.left < -2).slice(0,10)})));
  check(await fit(page), 'Monitoraggio leggibile al 200%');
  await page.route('**/ultimo-audit-statico.json', route => route.fulfill({json:{date_utc:null,scope:{editorial_pages:999}}}));
  await page.route('**/ultimo-collaudo-browser.json', route => route.fulfill({json:{checked_at_utc:'2026-11-27T12:00:00Z',status:'STARTED',tests:[{result:'PASS'}]}}));
  await page.reload();
  await page.waitForFunction(() => document.getElementById('statico-stato').textContent.includes('non disponibile'));
  check(!(await page.locator('#statico-pagine').innerText()).includes('999'), 'Dati incompleti non presentati come controllo valido');
  check((await page.locator('#browser-stato').innerText()).includes('non risulta concluso'), 'Collaudo parziale riconosciuto');
  await page.route('**/ultimo-audit-statico.json', route => route.fulfill({status:503,body:'Unavailable'}));
  await page.route('**/ultimo-collaudo-browser.json', route => route.fulfill({json:{checked_at_utc:'2026-11-27T12:00:00Z',status:'COMPLETED',tests:[{result:'FAIL'}]}}));
  await page.reload();
  await page.waitForFunction(() => document.getElementById('browser-stato').textContent.includes('da verificare'));
  check((await page.locator('#statico-stato').innerText()).includes('non disponibile'), 'Rapporto non raggiungibile segnalato');
  check(!(await page.locator('#browser-stato').innerText()).includes('Nessun esito negativo'), 'Esito fallito mai presentato come riuscito');
  await context.close();
  console.log('PASS: ' + checks + ' verifiche dei percorsi e dei riepiloghi. Browser simulato; nessuna prova con lettori reali.');
}
main().catch(error => {console.error(error);process.exitCode = 1;}).finally(async () => {if (browser) await browser.close();if (server) server.close();});
