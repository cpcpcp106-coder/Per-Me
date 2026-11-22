'use strict';
// Esegue il tracciamento con rete simulata: nessun contatore reale viene incrementato.
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const source=fs.readFileSync(path.join(__dirname,'..','analytics.js'),'utf8');
const root='https://cpcpcp106-coder.github.io/Per-Me/';

function simulate({query='',referrer='',owner=false,cookie='',online=true,standalone=false,last=0,origin=root}={}){
 const events={},hits=[],appended=[],store=new Map();
 if(owner)store.set('per-me-non-contare-questo-browser','1');
 if(last)store.set('per-me-ultima-visita-30min-v1',String(last));
 const location=new URL(origin+query);
 const navigator={onLine:online};
 const env={URL,Date,Math,location,navigator,console,
  localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v)},
  sessionStorage:{getItem:()=>null,setItem(){}},
  history:{state:null,replaceState(){}},
  document:{referrer,cookie,head:{appendChild:x=>appended.push(x)},
   createElement:()=>({style:{},setAttribute(){}}),querySelector:()=>({prepend(){}})},
  window:{matchMedia:()=>({matches:standalone}),addEventListener:(name,fn)=>{events[name]=fn;}},
  fetch:url=>{hits.push(url);return Promise.resolve({ok:true,json:()=>Promise.resolve({value:1})});}
 };
 vm.runInNewContext(source,env);
 return {hits,events,navigator,appended,store};
}

for(const [name,options,expected] of [
 ['link Pinterest senza referrer',{query:'?utm_source=pinterest&utm_medium=organic_social'},'pinterest'],
 ['campagna Pinterest normalizzata e prioritaria su fbclid',{query:'?utm_source=%20Pinterest%20&fbclid=prova'},'pinterest'],
 ['campagna Pinterest prevale sul referrer Facebook',{query:'?utm_source=pinterest',referrer:'https://www.facebook.com/'},'pinterest'],
 ['referrer Pinterest italiano',{referrer:'https://it.pinterest.com/pin/123/'},'pinterest'],
 ['referrer Pinterest principale',{referrer:'https://pinterest.com/'},'pinterest'],
 ['dominio italiano Pinterest',{referrer:'https://www.pinterest.it/'},'pinterest'],
 ['link breve Pinterest',{referrer:'https://pin.it/esempio'},'pinterest'],
 ['dominio ingannevole non attribuito a Pinterest',{referrer:'https://pinterest.com.example.org/'},'altri'],
 ['nome simile non attribuito a Pinterest',{referrer:'https://notpinterest.com/'},'altri'],
 ['parametro non riconosciuto conservato tra altri',{query:'?utm_source=esempio',referrer:'https://it.pinterest.com/'},'altri'],
 ['Instagram conserva la propria attribuzione',{query:'?utm_source=ig'},'instagram'],
 ['Facebook conserva la propria attribuzione',{query:'?fbclid=esempio'},'facebook'],
 ['Google conserva la propria attribuzione',{query:'?utm_source=google'},'google'],
 ['referrer WhatsApp conserva la propria attribuzione',{referrer:'https://web.whatsapp.com/'},'whatsapp'],
 ['accesso diretto resta sconosciuto',{},'sconosciuta']
])test(name,()=>{
 const result=simulate(options);
 assert.equal(result.hits.length,2);
 assert.equal(result.hits.filter(u=>u.includes('perme-visite-dal-')).length,1);
 assert.equal(result.hits.filter(u=>u.includes('perme-origine-'+expected+'-dal-')).length,1);
 assert.ok(result.hits.every(u=>new URL(u).origin==='https://countapi.mileshilliard.com'));
});

test('Il canale WhatsApp mantiene totale e dettaglio, senza attribuzione Pinterest',()=>{
 const result=simulate({query:'?utm_source=whatsapp&utm_medium=channel',referrer:'https://it.pinterest.com/'});
 assert.equal(result.hits.length,3);
 assert.equal(result.hits.filter(u=>u.includes('perme-origine-whatsapp-')).length,1);
 assert.equal(result.hits.filter(u=>u.includes('perme-canale-whatsapp-')).length,1);
 assert.equal(result.hits.filter(u=>u.includes('origine-pinterest-')).length,0);
});

for(const [name,options] of [
 ['Curatore escluso tramite memoria',{owner:true}],
 ['Curatore escluso tramite cookie',{cookie:'perme_no_count=1'}],
 ['Richiesta di esclusione immediata',{query:'?perme_escludimi=1&utm_source=pinterest'}],
 ['Nessun conteggio senza rete',{online:false}],
 ['App installata esclusa dalle visite al sito',{standalone:true}],
 ['Nessun doppione nei trenta minuti',{last:Date.now()-60000}],
 ['Anteprima locale esclusa',{origin:'http://localhost/Per-Me/'}]
])test(name,()=>assert.equal(simulate(options).hits.length,0));

test('Ritorno online: una sola visita Pinterest e una sola provenienza',()=>{
 const result=simulate({query:'?utm_source=pinterest',online:false});
 assert.equal(result.hits.length,0);
 result.navigator.onLine=true;
 result.events.online();result.events.online();
 assert.equal(result.hits.length,2);
 assert.equal(result.hits.filter(u=>u.includes('origine-pinterest-')).length,1);
});

test('I pannelli leggono la stessa chiave Pinterest e non incrementano i contatori',()=>{
 for(const file of ['contatori-personali/index.html','contatori-per-me-41c83f9e6c2a4d08b5f71e236ba0d94c.html']){
  const html=fs.readFileSync(path.join(__dirname,'..',file),'utf8');
  assert.match(html,/id="pinterest"/);
  assert.match(html,/perme-origine-pinterest-dal-20261122-43bcc26da793/);
  assert.doesNotMatch(html,/api\/v1\/hit\//);
 }
});
