'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const sources=[
 {code:'004125',mass:180,kcal100:106,carb100:16.4},
 {code:'000115',mass:140,kcal100:113,carb100:25.5},
 {code:'006610',mass:200,kcal100:23,carb100:3.5},
 {code:'009210',mass:20,kcal100:899,carb100:0}
];
const portions=2;
const totalKcal=sources.reduce((sum,x)=>sum+x.mass*x.kcal100/100,0);
const totalCarbs=sources.reduce((sum,x)=>sum+x.mass*x.carb100/100,0);
const perKcal=Math.round(totalKcal/portions);
const perCarbs=(totalCarbs/portions).toFixed(1).replace('.',',');
assert.equal(perKcal,287);
assert.equal(perCarbs,'36,1');
const recipePath='ricetta-insalata-borlotti-riso-integrale-pomodori.html';
const recipe=read(recipePath);
assert.ok(recipe.includes('36,1 g di carboidrati disponibili'));
assert.ok(recipe.includes('287 kcal'));
for(const source of sources){
 assert.ok(recipe.includes('/'+source.code+'"'),'Manca fonte CREA '+source.code);
 assert.ok(recipe.includes(source.mass+' g'),'Manca peso '+source.mass);
}
const index=read('dieta-mediterranea-ricette.html');
const rubric=read('dieta-mediterranea-scientifica.html');
const home=read('index.html');
const sitemap=read('sitemap.xml');
const guide02=read('dieta-guida-02-prevenzione-cardiovascolare-studi.html');
assert.ok(index.includes('href="'+recipePath+'"'),'Ricetta non collegata dalla raccolta');
assert.ok(rubric.includes('href="'+recipePath+'"'),'Ricetta non collegata dalla rubrica');
assert.ok(rubric.includes('Carboidrati')||rubric.includes('carboidrati'));
assert.ok(rubric.includes('calorie (kcal) per porzione'),'Rubrica non specifica calorie a porzione');
assert.ok(index.includes('calorie in kcal PER UNA PORZIONE'),'Standard obbligatorio non chiaro');
assert.ok(home.includes('2 guide scientifiche pubblicate su 8'));
assert.ok(sitemap.includes(recipePath));
assert.ok(sitemap.includes('dieta-guida-02-prevenzione-cardiovascolare-studi.html'));
assert.ok(guide02.includes('assets/dieta-mediterranea-guida02-originale.webp'));
assert.ok(fs.existsSync(path.join(root,'assets/dieta-mediterranea-guida02-originale.webp')));
const recipes=fs.readdirSync(root).filter(x=>x.startsWith('ricetta-')&&x.endsWith('.html'));
assert.ok(recipes.length>=1,'Nessuna ricetta pubblicata');
for(const name of recipes){
 const html=read(name);
 const data=html.match(/data-portion-carbs-g="([0-9.]+)" data-portion-kcal="([0-9.]+)" data-portion-count="([0-9]+)"/);
 assert.ok(data,'Ricetta senza indicatori nutrizionali per porzione: '+name);
 const carbs=Number(data[1]),kcal=Number(data[2]),count=Number(data[3]);
 assert.ok(carbs>=0&&kcal>0&&count>=1,'Valori non validi: '+name);
 assert.ok(html.toLowerCase().includes('carboidrati disponibili')&&html.includes('kcal')&&html.includes('porzione'),'Carboidrati/calorie non leggibili: '+name);
 assert.ok(html.includes('alimentinutrizione.it')||html.includes('crea.gov.it')||html.toLowerCase().includes('etichetta'),'Ricetta senza fonte nutrizionale: '+name);
 assert.ok(/<figure[^>]*class="foto-piatto"[^>]*>[\\s\\S]*?<img\\s[^>]*src="assets\\/[^"]+"/.test(html),'Ricetta senza fotografia originale del piatto: '+name);
 const imagePath=html.match(/<figure[^>]*class="foto-piatto"[^>]*>[\\s\\S]*?<img\\s[^>]*src="(assets\\/[^"]+)"/)?.[1];
 assert.ok(imagePath && fs.existsSync(path.join(root,imagePath)),'Foto del piatto non salvata nel repository: '+name);
 assert.ok(html.includes('figcaption'),'Didascalia immagine mancante: '+name);
}
console.log('PASS: guida 02 e prima ricetta coerenti, fonte CREA per 4 ingredienti, 2 porzioni, 36,1 g carboidrati disponibili e 287 kcal per porzione, sitemap e link.');
console.log('LIMITI: valori stimati; il test non equivale a valutazione dietistica indipendente.');
