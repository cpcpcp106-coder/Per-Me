'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const data = require('../../dati/ricette-mediterranee.json');
const { normalizzaStato, ingredientiNecessari, daComprare } = require('../menu-mediterraneo.js');

const root = path.resolve(__dirname, '../..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const ricette = new Map(data.ricette.map(recipe => [recipe.id, recipe]));
const stato = initial => normalizzaStato(data, ricette, initial);
const lista = initial => new Map(ingredientiNecessari(stato(initial), data, ricette).map(row => [row.id, row]));

test('Archivio con 28 ricette, riferimenti CREA e pagine raggiungibili', () => {
  assert.equal(ricette.size, 28);
  assert.equal(data.ricette.filter(r => r.gruppo === 'colazione').length, 4);
  const sitemap = read('sitemap.xml');
  for (const recipe of data.ricette) {
    const [file, anchor] = recipe.path.split('#');
    const html = read(file);
    assert.ok(sitemap.includes('/Per-Me/' + file));
    const section = anchor ? html.split('id="' + anchor + '"')[1]?.split('</section>')[0] : html;
    assert.ok(section, recipe.id);
    for (const [id, amount] of recipe.ingredienti) {
      const item = data.ingredienti[id];
      assert.ok(item && Number.isInteger(amount) && amount > 0, recipe.id + ' ' + id);
      assert.ok(section.includes('/tabelle-nutrizionali/' + item.codice), recipe.id + ' ' + id);
    }
    if (anchor) assert.ok(section.includes('#ricetta=' + recipe.id));
  }
});

test('Ogni esempio propone 21 pasti e alterna le cinque fonti proteiche principali', () => {
  assert.equal(data.settimane.length, 2);
  for (const settimana of data.settimane) {
    assert.equal(settimana.giorni.length, 7);
    const counts = new Map();
    for (const day of settimana.giorni) {
      assert.equal(day.length, 3);
      const [breakfast, lunch, dinner] = day.map(id => ricette.get(id).gruppo);
      assert.equal(breakfast, 'colazione');
      assert.notEqual(lunch, 'colazione');
      assert.notEqual(dinner, 'colazione');
      for (const group of [lunch, dinner]) counts.set(group, (counts.get(group) ?? 0) + 1);
    }
    assert.ok(counts.get('legumi') >= 6);
    assert.equal(counts.get('pesce'), 3);
    assert.equal(counts.get('carne-bianca'), 2);
    assert.equal(counts.get('uova'), 2);
    assert.equal(counts.get('latticini'), 1);
  }
});

test('Porzioni familiari e quantità locali si sommano con gli extra in una sola voce', () => {
  const menu = [null, { ricetta: 'pasta-integrale-ceci-cavolfiore' },
    { ricetta: 'riso-ceci-broccoli', porzioni: 1 }];
  const initial = { persone: 2, menu, aggiunte: { broccoli: 150 } };
  const a = lista(initial);
  assert.equal(a.get('pasta').totale, 110);
  assert.equal(a.get('olio').totale, 30);
  assert.equal(a.get('ceci:cotti').totale, 310);
  assert.equal(a.get('broccoli').totale, 330);
  const b = lista({ ...initial, legumi: 'secchi' });
  assert.equal(b.get('ceci:secchi').totale, 107);
  assert.equal(b.get('ceci:secchi').stimato, true);
});

test('Pesi a cottura diversa vengono riportati a un’unica quantità da comprare', () => {
  const menu = [null,
    { ricetta: 'insalata-borlotti-riso-integrale-pomodori' },
    { ricetta: 'riso-integrale-pollo-radicchio-noci' },
    null, { ricetta: 'merluzzo-patate-finocchio-limone' }, { ricetta: 'zuppa-lenticchie-patate-carote' }
  ];
  const a = lista({ persone: 2, menu });
  assert.equal(a.get('riso').totale, 187);
  assert.equal(a.get('riso').stimato, true);
  assert.equal(a.get('patate').totale, 767);
  assert.equal(a.get('carote').totale, 138);
  assert.equal(a.get('borlotti:cotti').totale, 180);
});

test('Uova in pezzi e scorte per tipo di prodotto restano coerenti', () => {
  const uova = { ricetta: 'frittata-zucca-spinaci-pane-integrale' };
  const pasta = { ricetta: 'pasta-integrale-ceci-cavolfiore' };
  const initial = {
    persone: 2, menu: [null, uova, pasta],
    presenti: ['olio'], scorte: { uova: 1, 'ceci:cotti': 65, 'ceci:secchi': 11 }
  };
  const a = lista(initial);
  assert.equal(a.get('uova').unita, 'pezzi');
  assert.equal(daComprare(a.get('uova'), stato(initial)), 3);
  assert.equal(daComprare(a.get('olio'), stato(initial)), 0);
  assert.equal(daComprare(a.get('ceci:cotti'), stato(initial)), 115);
  const secco = { ...initial, legumi: 'secchi' };
  assert.equal(daComprare(lista(secco).get('ceci:secchi'), stato(secco)), 52);
});

test('Vecchi o invalidi valori locali non generano pasti, scorte o quantità spurie', () => {
  const opts = stato({ persone: 20, menu: [{ ricetta: 'frittata-patate-zucchine', porzioni: 2 }], scorte: { olio: -1 }, aggiunte: { pesce: 30 } });
  assert.equal(opts.persone, 1);
  assert.equal(opts.menu.length, 21);
  assert.equal(opts.menu[0].ricetta, '');
  assert.equal(opts.menu[0].porzioni, null);
  assert.deepEqual(opts.scorte, {});
  assert.deepEqual(opts.aggiunte, {});
  assert.equal(ingredientiNecessari(opts, data, ricette).length, 0);
});
