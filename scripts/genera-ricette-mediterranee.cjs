'use strict';
const fs = require('node:fs');
const path = require('node:path');
const { isDeepStrictEqual } = require('node:util');

const root = path.join(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const { ingredienti, raccolte, ricette, settimane, aggiunte } = JSON.parse(read('dati/ricette-mediterranee.json'));
const date = '2026-11-14';
const site = 'https://cpcpcp106-coder.github.io/Per-Me/';
const crea = 'https://www.alimentinutrizione.it/tabelle-nutrizionali/';
const archive = 'dieta-mediterranea-ricette.html';
const header = read('site/header.inc').trim();
const footer = read('site/footer.inc').trim();
const escapeHtml = value => String(value).replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'})[c]);
const oneDecimal = new Intl.NumberFormat('it-IT', { maximumFractionDigits: 1, minimumFractionDigits: 1 });
const fmt = value => oneDecimal.format(value);
const groups = { legumi: 'Legumi', pesce: 'Pesce', uova: 'Uova', 'carne-bianca': 'Carne bianca', latticini: 'Ricotta', colazione: 'Colazione' };

function nutrients(recipe) {
  const fields = ['kcal', 'carboidrati', 'proteine'];
  const [kcal, carboidrati, proteine] = fields.map(field =>
    recipe.ingredienti.reduce((total, [id, grams]) => total + ingredienti[id][field] * grams / 100, 0) / recipe.porzioni);
  return { kcal: Math.round(kcal), carboidrati, proteine };
}

function pageHead(title, description, file, image, alt) {
  return `<!doctype html>
<html lang="it">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="index,follow">
<meta name="description" content="${escapeHtml(description)}">
<title>${escapeHtml(title)} | Per Me</title>
<link rel="canonical" href="${site}${file}">
<link rel="icon" href="favicon.ico">
<link rel="stylesheet" href="style.css?v=20261015-a11y-global">
<link rel="stylesheet" href="guide-pratiche.css?v=20261110">
<link rel="stylesheet" href="ricette.css?v=20261114">
<script defer src="analytics.js?v=2"></script>
<script defer src="gradimento.js?v=4"></script>
<meta property="og:type" content="article">
<meta property="og:locale" content="it_IT">
<meta property="og:site_name" content="Per Me">
<meta property="og:title" content="${escapeHtml(title)}">
<meta property="og:description" content="${escapeHtml(description)}">
<meta property="og:url" content="${site}${file}">
<meta property="og:image" content="${site}assets/${image}">
<meta property="og:image:alt" content="${escapeHtml(alt)}">
<meta name="twitter:card" content="summary_large_image">
</head>`;
}

function renderRecipe(recipe) {
  const values = nutrients(recipe);
  const products = recipe.ingredienti.map(([id, grams]) => ({ ...ingredienti[id], grams }));
  const allergens = [...new Set(products.map(product => product.allergene).filter(Boolean))];
  return `
<section class="ricetta-archivio" id="${recipe.id}">
<h2>${escapeHtml(recipe.titolo)}</h2>
<p>1 porzione · Circa ${recipe.minuti} minuti${products.some(p => p.resaSecco) ? ' con i legumi già cotti' : ''}</p>
<p class="valori-ricetta" data-portion-kcal="${values.kcal}" data-portion-carbs-g="${values.carboidrati.toFixed(1)}" data-portion-count="1"><strong>${values.kcal} kcal · ${fmt(values.carboidrati)} g di carboidrati disponibili · ${fmt(values.proteine)} g di proteine</strong></p>
<h3>Ingredienti per una porzione</h3>
<ul>
${products.map(p => `<li><strong>${p.grams} g</strong> di ${escapeHtml(p.nome.toLocaleLowerCase('it'))}${p.peso ? ' (' + escapeHtml(p.peso) + ')' : ''}.</li>`).join('\n')}
</ul>
<p><strong>Allergeni degli ingredienti indicati.</strong> ${allergens.length ? escapeHtml(allergens.join(', ')) + '.' : 'Controlla le etichette dei prodotti che usi.'}</p>
<h3>Preparazione</h3>
<ol>
${recipe.preparazione.map(step => '<li>' + escapeHtml(step) + '</li>').join('\n')}
</ol>
<p><strong>Per la spesa.</strong> ${escapeHtml(recipe.spesa)}</p>
<details><summary>Valori per ingrediente e fonti</summary>
<div class="calcolo-ricetta" role="region" aria-label="Tabella nutrizionale di ${escapeHtml(recipe.titolo)}" tabindex="0">
<table>
<caption>Valori CREA per 100 g e quantità nella ricetta</caption>
<thead><tr><th scope="col">Ingrediente</th><th scope="col">Peso (g)</th><th scope="col">kcal per 100 g</th><th scope="col">Carboidrati per 100 g (g)</th><th scope="col">Proteine per 100 g (g)</th></tr></thead>
<tbody>
${products.map(p => `<tr><th scope="row"><a href="${crea}${p.codice}">${escapeHtml(p.nome)}</a></th><td>${p.grams}</td><td>${p.kcal}</td><td>${p.tracce ? 'Tracce' : fmt(p.carboidrati)}</td><td>${fmt(p.proteine)}</td></tr>`).join('\n')}
</tbody></table>
</div>
</details>
<p><a class="guida-button" href="app/menu-mediterraneo.html#ricetta=${recipe.id}">Usa nel menu</a></p>
</section>`;
}

function renderCollection(collection) {
  const items = ricette.filter(recipe => recipe.raccolta === collection.id);
  const image = 'dieta-' + collection.image + '-originale.webp';
  const description = `${collection.titolo}. ${items.length} ricette per una porzione con preparazione, calorie e carboidrati stimati da tabelle CREA.`;
  const ids = items.map(item => `<li><a href="#${item.id}">${escapeHtml(item.titolo)}</a></li>`).join('\n');
  const safeCooking = items.some(r => ['pesce', 'uova', 'carne-bianca'].includes(r.gruppo))
    ? '\n<p>Temperature interne di cottura. <a href="https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures">FoodSafety.gov (in inglese)</a></p>' : '';
  return `${pageHead(collection.titolo, description, collection.file, image, collection.alt)}
<body class="pagina-interna rubrica-salute guida-completamento raccolta-ricette">
<a class="skip" href="#contenuto">Vai al contenuto</a>
${header}
<main id="contenuto" class="wrap">
<div class="crumb"><a href="index.html">Inizio</a> / <a href="${archive}">Ricette mediterranee</a></div>
<article class="article">
<h1>${escapeHtml(collection.titolo)}</h1>
<p class="lead">${escapeHtml(collection.lead)}</p>
<ul class="indice-ricette">
${ids}
</ul>
<figure class="foto-piatto">
<img src="assets/${image}" width="1080" height="720" alt="${escapeHtml(collection.alt)}" loading="lazy" decoding="async">
<figcaption>${escapeHtml(collection.rappresenta)}. Immagine illustrativa generata con intelligenza artificiale.</figcaption>
</figure>
${items.map(renderRecipe).join('\n')}
<h2 id="metodo-calcolo">Come stimiamo i valori</h2>
<p>Per ogni ingrediente moltiplichiamo il peso per il valore per 100 g e dividiamo per 100. Sommiamo prima di arrotondare. Le tabelle CREA riportano la fibra separatamente. I valori cambiano con il prodotto e con la preparazione.</p>
<p>Le quantità sono quelle della ricetta. Per una dieta terapeutica usa le porzioni concordate con chi ti segue. <a href="dieta-guida-06-diabete-cuore-piano-alimentare-sicuro.html">Guida su dieta, diabete e cuore</a></p>
<p>Tabelle consultate il <time datetime="${date}">14 novembre 2026</time>. <a href="https://www.crea.gov.it/-/tabella-di-composizione-degli-alimenti">CREA · Tabelle di composizione degli alimenti</a></p>${safeCooking}
<p><a class="guida-button" href="${archive}">Tutte le ricette mediterranee</a></p>
</article>
</main>
${footer}
</body>
</html>
`;
}

function renderArchive() {
  const file = archive;
  const title = 'Ricette mediterranee';
  const photo = 'ricette-mediterranee-13-novembre-2026.jpg';
  const alt = 'Cinque piatti mediterranei su una tavola con pasta, pollo e riso, merluzzo, zuppa e frittata.';
  const description = `${ricette.length} ricette mediterranee con ingredienti, carboidrati e calorie per porzione. Componi il menu della settimana e genera la tua lista della spesa.`;
  const cards = raccolte.map(item => {
    const items = ricette.filter(recipe => recipe.raccolta === item.id);
    return `<section class="scheda-ricetta">
<img src="assets/dieta-${item.image}-originale.webp" width="1080" height="720" alt="${escapeHtml(item.alt)}" loading="lazy" decoding="async">
<div class="scheda-ricetta-testo">
<h3>${escapeHtml(item.titolo)}</h3>
<ul>${items.map(recipe => `<li><a href="${recipe.path}">${escapeHtml(recipe.titolo)}</a></li>`).join('')}</ul>
<a class="guida-button" href="${item.file}">Apri ${items.length} ricette</a>
</div>
</section>`;
  }).join('\n');
  const old = ricette.filter(recipe => recipe.immagine).map(recipe => {
    const stored = recipe.valoriPubblicati;
    return `<li id="${recipe.id === 'insalata-borlotti-riso-integrale-pomodori' ? 'ricetta-esempio' : recipe.id === 'zuppa-lenticchie-patate-carote' ? 'ricetta-lenticchie' : recipe.id}">
<a href="${recipe.path}">${escapeHtml(recipe.titolo)}</a> · ${stored.kcal} kcal e ${Number.isInteger(stored.carboidrati) ? stored.carboidrati : fmt(stored.carboidrati)} g per porzione (${groups[recipe.gruppo].toLocaleLowerCase('it')}).
</li>`;
  }).join('\n');
  const breakfasts = ricette.filter(r => r.gruppo === 'colazione').length;
  return `${pageHead(title, description, file, photo, alt)}
<body class="pagina-interna rubrica-salute guida-completamento raccolta-ricette">
<a class="skip" href="#contenuto">Vai al contenuto</a>
${header}
<main id="contenuto" class="wrap">
<div class="crumb"><a href="index.html">Inizio</a> / <a href="dieta-mediterranea-scientifica.html">Dieta mediterranea scientifica</a> / Ricette</div>
<article class="article">
<h1>Ricette mediterranee</h1>
<p class="lead"><strong>${ricette.length} ricette</strong> da mettere in rotazione. Scegli tra ${ricette.length - breakfasts} pranzi e cene con verdure, cereali o patate e una fonte di proteine. Completa la settimana con ${breakfasts} idee per colazione.</p>
<p><a class="guida-button" href="app/menu-mediterraneo.html">Componi la settimana e fai la lista della spesa</a></p>
<p>Nel menu puoi partire da due esempi pronti o scegliere ogni pasto. La lista somma gli ingredienti in base alle porzioni e a quello che hai già in casa.</p>
<section id="nuove-ricette" aria-labelledby="nuove-ricette-titolo">
<h2 id="nuove-ricette-titolo">Scegli una ricetta</h2>
<p>Le raccolte sono illustrate con un piatto di esempio. Ogni ricetta ha dosi, preparazione e stime per porzione tratte dalle tabelle CREA.</p>
<div class="schede-ricette">
${cards}
</div>
</section>
<h2>Altre sette ricette dell’archivio</h2>
<ul class="indice-ricette">
${old}
</ul>
<h2 id="mediterranea">Varietà e spesa sostenibile</h2>
<p>Fai spazio a legumi, cereali integrali e ortaggi di stagione. Puoi scegliere più piatti con le stesse verdure o usare una parte dei legumi in una seconda ricetta. Per valutare prezzi e quantità utilizzabili, consulta la <a href="dieta-guida-08-ricette-mediterranee-economiche-valori.html">guida al costo di una ricetta</a>.</p>
<p>Indicazioni sul modello alimentare e la sostenibilità. <a href="https://www.crea.gov.it/web/alimenti-e-nutrizione/-/linee-guida-per-una-sana-alimentazione-2018">CREA · Linee guida per una sana alimentazione</a></p>
<h2 id="carboidrati">Capire i carboidrati e le porzioni</h2>
<p>Nei pesi trovi indicato se l’alimento va pesato a crudo, a secco o da cotto. Controlla l’etichetta dei prodotti che usi e considera anche ciò che aggiungi al piatto.</p>
<h2 id="ricette">Ingredienti, dosi e valori per porzione</h2>
<p>Le ricette riportano <strong>i carboidrati disponibili in grammi e le calorie per porzione</strong>. Le stime dipendono dalle dosi e dagli ingredienti indicati.</p>
<p>Se segui un piano per il diabete o la salute del cuore, usa le porzioni concordate con chi ti segue. <a href="dieta-guida-06-diabete-cuore-piano-alimentare-sicuro.html">Dieta, diabete e cuore</a></p>
<p>Aggiornato il <time datetime="${date}">14 novembre 2026</time>.</p>
<p><a class="guida-button" href="dieta-mediterranea-scientifica.html">Torna a Dieta mediterranea scientifica</a></p>
</article>
</main>
${footer}
</body>
</html>
`;
}

function plannerData() {
  return {
    ingredienti: Object.fromEntries(Object.entries(ingredienti).map(([id, item]) =>
      [id, {
        nome: item.nome, reparto: item.reparto, peso: item.peso, resaSecco: item.resaSecco,
        grammiPerPezzo: item.grammiPerPezzo,
        acquisto: item.acquisto ? { ingrediente: item.acquisto.ingrediente, resa: item.acquisto.resa } : undefined
      }])),
    ricette: ricette.map(item => {
      const estimate = nutrients(item);
      const { kcal, carboidrati } = item.valoriPubblicati || estimate;
      return {
        id: item.id, titolo: item.titolo, gruppo: item.gruppo, path: item.path, porzioni: item.porzioni,
        ingredienti: item.ingredienti, kcal, carboidrati: Number(carboidrati.toFixed(1))
      };
    }),
    settimane,
    aggiunte,
    gruppi: groups
  };
}

const dataFile = 'app/ricette-mediterranee.js';
const dataPrefix = "'use strict';\n// Generato con node scripts/genera-ricette-mediterranee.cjs\nwindow.PerMeRicetteMediterranee = ";
const htmlFiles = new Map([[archive, renderArchive()], ...raccolte.map(c => [c.file, renderCollection(c)])]);
const write = process.argv.includes('--write');
const mismatches = [];
for (const [file, expected] of htmlFiles) {
  if (write) fs.writeFileSync(path.join(root, file), expected);
  else if (read(file) !== expected) mismatches.push(file);
}
const data = plannerData();
if (write) {
  const rows = Object.entries(data).map(([key, value]) => {
    const json = Array.isArray(value)
      ? '[\n    ' + value.map(row => JSON.stringify(row)).join(',\n    ') + '\n  ]'
      : JSON.stringify(value);
    return '  ' + JSON.stringify(key) + ': ' + json;
  });
  fs.writeFileSync(path.join(root, dataFile), dataPrefix + '{\n' + rows.join(',\n') + '\n};\n');
} else {
  const generated = JSON.parse(read(dataFile).slice(dataPrefix.length).trim().replace(/;$/, ''));
  if (!isDeepStrictEqual(JSON.parse(JSON.stringify(data)), generated)) mismatches.push(dataFile);
}
if (mismatches.length) {
  console.error('Aggiorna i file con node scripts/genera-ricette-mediterranee.cjs --write', mismatches);
  process.exitCode = 1;
} else {
  console.log(`${ricette.length} ricette in ${htmlFiles.size} pagine, dati del menu coerenti.`);
}
