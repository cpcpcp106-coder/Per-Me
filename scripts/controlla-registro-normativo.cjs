'use strict';
/* Controllo coerente con la politica editoriale pubblica di Per Me.
 * Non certifica la correttezza delle norme citate.
 */
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const guideNames=[
 'come-leggere-busta-paga.html','dal-lordo-al-netto.html','ore-ferie-permessi-malattia-straordinari.html',
 'stipendio-diminuito-cosa-controllare.html','ccnl-inquadramento-livello-superminimo.html','controllare-cedolino-cassa-integrazione-solidarieta.html',
 'inps-prestazione-sospesa-respinta-cosa-fare.html','assegno-ordinario-invalidita-requisiti-conferma.html','aoi-invalidita-civile-differenze.html',
 'verbale-invalidita-civile-legge-104-come-leggerlo.html','cedolino-pensione-obism-arretrati-verificare-importi.html',
 'contributi-inps-estratto-conto-pensione-vicina.html','redditi-red-comunicazioni-obbligatorie-inps.html','riesame-ricorso-inps-termini.html',
 'debiti-guida-01-leggere-cartella.html','debiti-guida-02-controllare-debiti.html','debiti-guida-03-cartella-errata.html',
 'debiti-guida-04-rateizzazione.html','debiti-guida-05-rottamazione.html','debiti-guida-06-fermo-pignoramento.html',
 'debiti-guida-07-banche-bollette.html','debiti-guida-08-sovraindebitamento.html','debiti-guida-09-a-chi-rivolgersi.html',
 'agevolazioni-guida-01-isee-corrente.html','agevolazioni-guida-02-bonus-sociali.html','agevolazioni-guida-03-trasporti-fvg.html',
 'agevolazioni-guida-03-trasporti-italia.html','agevolazioni-guida-04-esenzioni-ticket-fvg.html','agevolazioni-guida-04-esenzioni-ticket-italia.html',
 'agevolazioni-guida-05-comune-servizi-sociali-italia.html','salute-guida-01-preparare-visita.html'
];
assert.equal(guideNames.length,31);
const errors=[];
for(const filename of guideNames){
 const file=path.join(root,filename);
 if(!fs.existsSync(file)){errors.push(filename+': file inesistente');continue}
 const html=fs.readFileSync(file,'utf8');
 if(!/name=["']robots["']\s+content=["']index,follow["']/.test(html))errors.push(filename+': indicizzazione difforme');
 if(/non indicizzat[aoie]/i.test(html.replace(/<script[\s\S]*?<\/script>/g,'')))errors.push(filename+': testo contrario a index,follow');
 if(!/<h1\b/i.test(html))errors.push(filename+': nessun titolo');
 if(!/<a\b[^>]*href=["']https?:\/\//i.test(html))errors.push(filename+': nessun rimando esterno verificabile');
}
const report=fs.readFileSync(path.join(root,'verifiche/revisione-normativa-31-guide-2026-10-15.md'),'utf8');
for(const name of guideNames)if(!report.includes('| '+name+' |'))errors.push(name+': assente dal rapporto guida per guida');
console.log(JSON.stringify({guideInRegisto:guideNames.length,errori:errors,nota:'Controllo di presenza, accessibilità e integrità del registro; NON prova l’esattezza normativa'},null,2));
if(errors.length)process.exitCode=1;
