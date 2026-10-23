'use strict';
/* Per Me: impedisce che una nuova guida perda il collegamento Facebook.
 * Uso: node scripts/controlla-facebook-guide.cjs
 * Controlla tutte le pagine del catalogo e ogni nuovo articolo HTML.
 */
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const catalog = JSON.parse(read('gradimento-articoli.json'));
const known = new Set(catalog.map(entry => entry.path));
const files = fs.readdirSync(root).filter(name => name.endsWith('.html'));
// Le pagine istituzionali e tecniche non sono guide e non richiedono il pulsante.
const notGuides = new Set(['index.html', 'chi-siamo.html', 'metodo.html', 'monitoraggio.html', 'gradimento.html']);
const hasArticle = html => /<article\b[^>]*\bclass\s*=\s*["'][^"']*\barticle\b[^"']*["']/i.test(html);
const hasSharedScript = html => /<script\b[^>]*\bsrc\s*=\s*["'](?:\.\/)?gradimento\.js(?:[?#][^"']*)?["']/i.test(html);
const issues = [];
const component = read('gradimento.js');
if (!component.includes('https://www.facebook.com/PerMeGuide') ||
    !component.includes('Vai su Facebook e commenta') ||
    !component.includes('facebookContact(target)')) {
  issues.push('gradimento.js: collegamento o componente Facebook mancante');
}
for (const item of catalog) {
  if (!item || typeof item.path !== 'string' || !files.includes(item.path)) {
    issues.push('Catalogo: pagina mancante o non valida: ' + String(item && item.path));
  }
}
let guides = 0;
for (const file of files) {
  const html = read(file);
  const guide = !notGuides.has(file) && (known.has(file) || hasArticle(html) || /(?:^|-)guida(?:-|\.)/.test(file));
  if (!guide) continue;
  guides++;
  if (!hasSharedScript(html)) {
    issues.push(file + ': inserire <script defer src="gradimento.js?v=4"></script> nella pagina');
  }
}
if (issues.length) {
  console.error('ERRORE: collegamento Facebook non garantito in tutte le guide:\n' + issues.join('\n'));
  process.exitCode = 1;
} else {
  console.log('OK: ' + guides + ' pagine/guide con componente Facebook condiviso. Le nuove guide vengono controllate a ogni pubblicazione.');
}
