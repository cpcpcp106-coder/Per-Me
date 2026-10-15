'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');

const app=path.resolve(__dirname,'..');
const main=fs.readFileSync(path.join(app,'main.js'),'utf8');
const sw=fs.readFileSync(path.join(app,'sw.js'),'utf8');
const ROOT='https://cpcpcp106-coder.github.io/Per-Me/';

function makeReader(online=false,seed=null){
 const store=new Map();
 if(seed)store.set('perme-app-offline-20261014',JSON.stringify(seed));
 const nodes=new Map();
 const element=id=>{
  if(!nodes.has(id))nodes.set(id,{
   hidden:false,disabled:false,textContent:'',innerHTML:'',children:[],
   replaceChildren(){this.children=[]},
   appendChild(x){this.children.push(x)},
   setAttribute(name,value){this[name]=value},
   addEventListener(){},
   append(...x){this.children.push(...x)}
  });
  return nodes.get(id);
 };
 const ctx=vm.createContext({
  URL,location:{href:ROOT+'app/',pathname:'/Per-Me/app/',hash:''},
  navigator:{onLine:online},localStorage:{
   getItem:key=>store.get(key)||null,
   setItem:(key,value)=>store.set(key,value)
  },
  document:{
   getElementById:element,
   addEventListener(){},
   createElement:()=>({className:'',textContent:'',type:'',append(){},addEventListener(){}})
  },
  history:{replaceState(){}},window:{scrollTo(){}},console
 });
 vm.runInContext(main+'\nthis.__api={model,restore,persist,openGuide,sync,compareGuides};',ctx);
 return {ctx,store,nodes,element,api:ctx.__api};
}

test('Una copia precedentemente salvata si apre senza rete',()=>{
 const old={path:'debiti-guida-04-rateizzazione.html',category:'Debiti e cartelle',title:'Rateizzazione',summary:'Come rateizzare',content:'<p>Testo salvato prima della disconnessione.</p>'};
 const env=makeReader(false,{guides:[old],favorites:[],updated:'2026-10-15T08:00:00.000Z'});
 env.api.restore();
 env.api.openGuide(old.path,false);
 assert.equal(env.element('reader-title').textContent,'Rateizzazione');
 assert.match(env.element('reader-content').innerHTML,/Testo salvato/);
 assert.equal(env.element('reader-warning').hidden,false);
 assert.match(env.element('reader-warning').textContent,/offline/i);
});

test('L esito della sincronizzazione resta salvato dopo la riapertura',()=>{
 const a=makeReader(true);
 a.api.model.guides=[{path:'a.html',category:'Rubrica',title:'A',content:'Testo'}];
 a.api.model.updated='2026-10-15T08:30:00Z';
 a.api.model.lastSync={added:1,modified:0,unchanged:0,removed:0,failed:0,checkedAt:a.api.model.updated};
 assert.equal(a.api.persist(),true);
 const seed=JSON.parse(a.store.get('perme-app-offline-20261014'));
 const b=makeReader(false,seed);b.api.restore();
 assert.equal(b.api.model.guides.length,1);
 assert.equal(b.api.model.lastSync.added,1);
});

test('Errore di rete su una rubrica: preserva la guida precedente come copia da verificare',async()=>{
 const old={path:'debiti-guida-04-rateizzazione.html',category:'Debiti e cartelle',title:'Vecchia copia',summary:'',content:'<p>Non cancellare</p>'};
 const env=makeReader(true,{guides:[old],favorites:[],updated:'2026-10-14T12:00:00Z'});
 env.api.restore();
 vm.runInContext(`
  downloadPage=async path=>{
   if(path==='debiti-cartelle.html')throw Error('rete interrotta');
   return {doc:{querySelectorAll(){return []}}};
  };
  fetchGuide=async (p,category)=>({path:p,category,title:category,summary:'',content:'<p>Nuovo contenuto</p>'});
 `,env.ctx);
 await env.api.sync();
 const saved=env.api.model.guides.find(g=>g.path===old.path);
 assert.ok(saved,'copia esistente non cancellata');
 assert.equal(saved.stale,true);
 assert.match(saved.content,/Non cancellare/);
 assert.ok(env.api.model.lastSync.failed>0);
 assert.match(env.element('sync-summary-note').textContent,/parziale/i);
});

test('Service worker: navigazione offline usa la pagina in cache',async()=>{
 const handlers={};
 const cacheHit={ok:true,source:'pagina in cache'};
 const shell=[];
 const environment={
  URL,self:{
   location:{origin:'https://cpcpcp106-coder.github.io'},
   addEventListener:(event,handler)=>{handlers[event]=handler},
   skipWaiting:async()=>{},
   clients:{claim:async()=>{}}
  },
  caches:{
   open:async()=>({addAll:async urls=>{shell.push(...urls)},put:async()=>{}}),
   keys:async()=>[],
   delete:async()=>true,
   match:async request=>request==='./index.html'?cacheHit:null
  },
  fetch:async()=>{throw Error('offline')},
  Response:{error:()=>({ok:false})}
 };
 vm.runInNewContext(sw,environment);
 assert.equal(typeof handlers.install,'function');
 let installed;handlers.install({waitUntil:p=>{installed=p}});
 await installed;
 assert.ok(shell.includes('./index.html'));
 assert.ok(shell.some(x=>String(x).includes('main.js')));
 let fallback;handlers.fetch({
  request:{method:'GET',mode:'navigate',url:ROOT+'app/'},
  respondWith:p=>{fallback=p}
 });
 const result=await fallback;
 assert.equal(result.source,'pagina in cache');
});
