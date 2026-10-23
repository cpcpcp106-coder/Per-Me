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
assert.ok(home.includes('8 guide scientifiche pubblicate su 8'),'Stato editoriale homepage non aggiornato');
assert.ok(sitemap.includes(recipePath));
assert.ok(sitemap.includes('dieta-guida-02-prevenzione-cardiovascolare-studi.html'));
const guide03Path='dieta-guida-03-carboidrati-fibre-indice-carico-glicemico.html';
const guide03=read(guide03Path);
assert.ok(rubric.includes('href="'+guide03Path+'"'),'Guida 03 assente dalla rubrica');
assert.ok(sitemap.includes(guide03Path),'Guida 03 assente dalla sitemap');
assert.ok(guide03.includes('Carboidrati della porzione')&&guide03.includes('CG ='),'Guida 03 senza formule');
assert.ok(guide03.includes('diabetes.org.uk')&&guide03.includes('dc26-S005'),'Mancano le fonti primarie scientifiche della Guida 03');
const guide04Path='dieta-guida-04-porzioni-pesi-crudo-cotto-tabelle-crea.html';
const guide04=read(guide04Path);
assert.ok(rubric.includes('href="'+guide04Path+'"'),'Guida 04 assente dalla rubrica');
assert.ok(sitemap.includes(guide04Path),'Guida 04 assente dalla sitemap');
for(const source of ['000800','000805','presentazione-dati'])assert.ok(guide04.includes(source),'Fonte CREA assente: '+source);
for(const value of ['80 g crudi','1,88','58,2 g','273 kcal','56,0 g','36,1 g','287 kcal'])assert.ok(guide04.includes(value),'Numero o esempio assente: '+value);
assert.equal(Number((80*72.7/100).toFixed(1)),58.2);
assert.equal(Math.round(80*341/100),273);
assert.equal(Number((80*1.88).toFixed(1)),150.4);
assert.equal(Number((150*37.3/100).toFixed(1)),56);
assert.equal(Math.round(150*175/100),263);
const image04='assets/dieta-mediterranea-guida04-crudo-cotto-originale.webp';
assert.ok(guide04.includes('src="'+image04+'"'),'Guida 04 senza foto originale');
assert.ok(fs.existsSync(path.join(root,image04)) && fs.statSync(path.join(root,image04)).size>50000,'Foto guida 04 mancante o troppo piccola');
const guide05Path='dieta-guida-05-grassi-olio-evo-origine-etichette-costi.html';
const guide05=read(guide05Path);
assert.ok(rubric.includes('href="'+guide05Path+'"'),'Guida 05 assente dalla rubrica');
assert.ok(sitemap.includes(guide05Path),'Guida 05 assente dalla sitemap');
for(const val of ['009210','2022/2104','90 kcal','0 g','10 ml','grammi','millilitri']){
 assert.ok(guide05.includes(val),'Guida 05 priva di un dato nutrizionale, unità o riferimento: '+val);
}
assert.equal(Math.round(10*899/100),90,'Calcolo CREA 10 g di EVO errato');
assert.equal(Math.round(20*899/100),180,'Calcolo CREA 20 g di EVO errato');
const image05='assets/dieta-mediterranea-guida05-olio-grassi-originale.webp';
assert.ok(guide05.includes('src="'+image05+'"'),'Fotografia originale Guida 05 non collegata');
assert.ok(fs.existsSync(path.join(root,image05)) && fs.statSync(path.join(root,image05)).size>50000,'Fotografia originale Guida 05 mancante');
assert.ok(guide05.includes('www.facebook.com/PerMeGuide'),'Collegamento pubblico di feedback assente');
assert.ok(guide05.includes('Foto')||guide05.includes('Fotografia'),'Didascalia immagine assente');
const guide01=read('dieta-guida-01-modello-mediterraneo-diabete-evidenze.html');
assert.ok(guide01.includes('dc26-S005')&&guide01.includes('5.30'),'Mancano ADA 2026 e grado delle prove Guida 01');
assert.ok(guide01.includes('Non cambiare autonomamente dosi'),'Manca avvertenza sulla sicurezza insulinica Guida 01');
assert.ok(guide02.includes('beneficio osservato nell\'esito')&&guide02.includes('ictus'),'Revisione PREDIMED non presente Guida 02');
assert.ok(guide02.includes('www.bmj.com/content/364/bmj.l341.full'),'Manca fonte critica BMJ Guida 02');
assert.ok(guide03.includes('50 g di carboidrati disponibili')&&guide03.includes('non porzioni qualsiasi'),'Manca la distinzione prova IG/carboidrati Guida 03');
assert.ok(guide04.includes('349 kcal')&&guide04.includes('arrotondati'),'Manca spiegazione differenza arrotondamenti CREA Guida 04');
assert.ok(guide05.includes('grammi')&&guide05.includes('millilitri')&&guide05.includes('non equivalgono esattamente'),'Manca avvertenza g/ml dell\'olio Guida 05');
assert.ok(guide05.includes('2022/2104'),'Riferimento normativo origine EVO mancante');



const guide06Path='dieta-guida-06-diabete-cuore-piano-alimentare-sicuro.html';
const guide07Path='dieta-guida-07-etichette-sale-zuccheri-allergeni.html';
const guide08Path='dieta-guida-08-ricette-mediterranee-economiche-valori.html';
for(const p of [guide06Path,guide07Path,guide08Path]){
 const html=read(p);
 assert.ok(rubric.includes('href="'+p+'"'),'Nuova guida non collegata dalla rubrica: '+p);
 assert.ok(sitemap.includes(p),'Nuova guida assente dalla sitemap: '+p);
 assert.ok(html.includes('www.facebook.com/PerMeGuide'),'Link Facebook mancante: '+p);
 assert.ok(html.includes('Fotografia')||html.includes('fotografia'),'Didascalia foto non trasparente: '+p);
 assert.ok(html.includes('Revisione documentale')||html.includes('Controllo documentale'),'Limiti fonte non dichiarati: '+p);
}
const guide06=read(guide06Path),guide07=read(guide07Path),guide08=read(guide08Path);
assert.ok(guide06.includes('dc26-S005')&&guide06.includes('dc26-S010')&&guide06.includes('dc26-S011'),'Guida 06 senza fonti ADA essenziali');
assert.ok(guide06.includes('SGLT2')&&guide06.includes('chetoacidosi'),'Guida 06 senza cautela su SGLT2');
assert.ok(guide07.includes('1169/2011')&&guide07.includes('allergeni')&&guide07.includes('100 g'),'Guida 07 senza norma o lettura delle porzioni');
assert.ok(guide07.includes('già compresi')||guide07.includes('già compresi'),'Zuccheri non distinti dai carboidrati');
assert.ok(guide08.includes('36,1 g')&&guide08.includes('40,0 g'),'Guida 08 senza carboidrati delle due ricette');
assert.ok(guide08.includes('287 kcal')&&guide08.includes('298 kcal'),'Guida 08 senza calorie delle due ricette');
const soupPath='ricetta-zuppa-lenticchie-patate-carote.html',soup=read(soupPath);
assert.ok(index.includes('href="'+soupPath+'"'),'Nuova zuppa assente dalla raccolta');
assert.ok(rubric.includes('href="'+soupPath+'"'),'Nuova zuppa assente dalla rubrica');
assert.ok(sitemap.includes(soupPath),'Nuova zuppa assente dalla sitemap');
const soupData=[
 {code:'004505',mass:240,kcal100:109,carb100:16.3},
 {code:'006515',mass:180,kcal100:74,carb100:16.9},
 {code:'005155',mass:120,kcal100:47,carb100:8.7},
 {code:'009210',mass:16,kcal100:899,carb100:0}
];
const soupK=soupData.reduce((a,b)=>a+b.mass*b.kcal100/100,0);
const soupC=soupData.reduce((a,b)=>a+b.mass*b.carb100/100,0);
assert.equal(Number(soupK.toFixed(2)),595.04,'Kcal totali zuppa errate');
assert.equal(Number(soupC.toFixed(2)),79.98,'Carboidrati totali zuppa errati');
assert.equal(Math.round(soupK/2),298,'Kcal per porzione zuppa errate');
assert.equal((soupC/2).toFixed(1),'40.0','Carboidrati per porzione zuppa errati');
for(const z of soupData)assert.ok(soup.includes('/'+z.code+'"')&&soup.includes(z.mass+' g'),'Fonte CREA o peso assente nella zuppa '+z.code);
assert.ok(soup.includes('40,0 g di carboidrati disponibili')&&soup.includes('298 kcal'),'Numeri zuppa non leggibili');
assert.ok(fs.statSync(path.join(root,'assets/ricetta-zuppa-lenticchie-patate-carote-originale.webp')).size>50000,'Foto della zuppa assente o troppo piccola');
const recipeImage='assets/ricetta-borlotti-riso-piatto-originale-hd.webp';
assert.ok(recipe.includes('src="'+recipeImage+'"'),'La ricetta non usa la foto HD');
assert.ok(fs.existsSync(path.join(root,recipeImage)),'Asset della fotografia HD assente');
assert.ok(fs.statSync(path.join(root,recipeImage)).size>150000,'Fotografia HD troppo compressa o miniatura');
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
 assert.ok(html.includes('class="foto-piatto"'),'Ricetta senza fotografia del piatto: '+name);
 const imageTag=html.slice(html.indexOf('class="foto-piatto"'));
 const imagePath=imageTag.match(/src="([^"]+)"/)?.[1];
 assert.ok(imagePath && imagePath.startsWith('assets/') && fs.existsSync(path.join(root,imagePath)),'Foto del piatto non salvata nel repository: '+name);
 assert.ok(html.includes('figcaption'),'Didascalia immagine mancante: '+name);
}
console.log('PASS: 8 guide, 2 ricette, 4 schede CREA per la nuova zuppa, 40.0 g CHO e 298 kcal per porzione, immagini originali, sitemap e link.');
console.log('LIMITI: valori stimati; il test non equivale a valutazione dietistica indipendente.');
