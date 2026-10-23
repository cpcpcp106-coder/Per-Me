'use strict';
/* Verifica pubblicazione analytics senza aprire le pagine e senza creare visite. */
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const analytics = fs.readFileSync(path.join(root, 'analytics.js'), 'utf8');
const errors = [];
if (!analytics.includes('static.cloudflareinsights.com/beacon.min.js') ||
    !analytics.includes("if (isOwner) return;") ||
    analytics.indexOf("if (isOwner) return;") > analytics.indexOf('document.head.appendChild(beacon)')) {
  errors.push('Script Cloudflare mancante o caricamento precedente alla esclusione del proprietario');
}
const skip = new Set(['contatori-per-me-41c83f9e6c2a4d08b5f71e236ba0d94c.html']);
const pages = fs.readdirSync(root).filter(name =>
  name.endsWith('.html') && !name.startsWith('google') && !skip.has(name)
);
pages.push('app/index.html');
let covered = 0;
for (const name of pages) {
  const file = fs.readFileSync(path.join(root, name), 'utf8');
  // Il pannello amministrativo tecnico non misura le proprie aperture.
  if (name === 'contatori-personali/index.html') continue;
  if (!/<script\b[^>]*\bsrc\s*=\s*["'](?:\.\.\/)?analytics\.js(?:\?[^"']*)?["']/i.test(file)) {
    errors.push(name + ': manca analytics.js');
  } else covered++;
}
console.log(JSON.stringify({checked: pages.length, covered, errors},null,2));
if (errors.length) process.exitCode=1;
