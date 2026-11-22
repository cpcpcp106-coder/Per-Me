'use strict';
// Verifica esclusione, frequenza e riservatezza senza richieste reali.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const code=fs.readFileSync(require('node:path').join(__dirname,'../analytics.js'),'utf8');
let checks=0;
function run({path='/',store=new Map(),online=true,standalone=false,now=Date.UTC(2026,10,21,12),search='',consent=true}={}){
 const requests=[],listeners={},documentListeners={};
 const location={hostname:'cpcpcp106-coder.github.io',origin:'https://cpcpcp106-coder.github.io',pathname:'/Per-Me/'+path.replace(/^\//,''),search};
 location.href=location.origin+location.pathname+search;
 class Clock extends Date{constructor(...args){super(...(args.length?args:[now]));}static now(){return now;}}
 const storage={getItem:key=>store.get(key)??null,setItem:(key,value)=>store.set(key,String(value))};
 if(consent)storage.setItem('perme-marketing-consenso-v1',JSON.stringify({allowed:true,until:now+86400000*180}));
 const document={referrer:'',cookie:'',createElement:()=>({style:{},setAttribute(){}}),head:{appendChild(){}},querySelector:selector=>selector==='main'?{prepend(){}}:null,querySelectorAll:()=>[],addEventListener:(event,fn)=>documentListeners[event]=fn};
 const context={URL,Date:Clock,Intl,Math,Number,Promise,location,document,navigator:{onLine:online},localStorage:storage,sessionStorage:storage,history:{replaceState(){}},fetch:(url,options)=>{requests.push({url,options});return Promise.resolve({ok:true,json:()=>Promise.resolve({value:1})});}};
 context.window={matchMedia:()=>({matches:standalone}),addEventListener:(event,fn)=>listeners[event]=fn};
 vm.runInNewContext(code,context);
 return{requests,store,documentListeners,listeners,advanceTo:time=>{now=time;}};
}
function marketing(result){return result.requests.filter(r=>r.url.includes('/hit/perme-marketing-'));}
function check(ok,message){assert.ok(ok,message);checks++;console.log('PASS',message);}
let r=run({search:'?perme_escludimi=1',path:'app/menu-mediterraneo.html'});
check(r.requests.length===0,'il curatore escluso non registra alcun evento');
check(marketing(run({online:false,path:'app/menu-mediterraneo.html'})).length===0,'nessun evento offline');
check(marketing(run({standalone:true,path:'app/menu-mediterraneo.html'})).length===0,'l’app installata resta fuori dalle nuove misure web');
check(marketing(run({consent:false,path:'app/menu-mediterraneo.html'})).length===0,'nuove statistiche spente senza consenso');
check(marketing(run({consent:false,store:new Map([['perme-marketing-consenso-v1',JSON.stringify({allowed:false,until:Date.UTC(2027,0,1)})]]),path:'app/menu-mediterraneo.html'})).length===0,'rifiuto rispettato');
let store=new Map();
r=run({store,path:'app/menu-mediterraneo.html'});
check(marketing(r).length===1&&marketing(r)[0].url.includes('marketing-menu'),'apertura del menu registrata nella sua categoria');
check(marketing(run({store,path:'app/menu-mediterraneo.html'})).length===0,'riapertura nello stesso intervallo senza doppione');
r=run({store,now:Date.UTC(2026,10,22,12)});
check(marketing(r).length===1&&marketing(r)[0].url.includes('ritorni-giornalieri'),'ritorno riconosciuto in un giorno successivo');
check(marketing(run({store,now:Date.UTC(2026,10,22,16)})).length===0,'un solo ritorno per browser nello stesso giorno');
r=run();
r.documentListeners.click({target:{closest:()=>({href:'https://wa.me/?text=prova'})}});
check(marketing(r).length===0,'condivisione WhatsApp distinta dal seguire il canale');
r.documentListeners.click({target:{closest:()=>({href:'https://whatsapp.com/channel/0029VbDxWTg4dTnMxrqamP3J'})}});
r.documentListeners.click({target:{closest:()=>({href:'https://whatsapp.com/channel/0029VbDxWTg4dTnMxrqamP3J'})}});
check(marketing(r).length===1&&marketing(r)[0].url.includes('segui-whatsapp'),'pressione sul canale distinta e senza doppione immediato');
r=run({path:'strumenti/costo-spesa-settimanale.html',search:'?documento=RISERVATO&prezzo=987654'});
check(marketing(r).length===1&&r.requests.every(x=>!x.url.includes('RISERVATO')&&!x.url.includes('987654')),'prezzi, documenti e parametri non trasmessi ai contatori');
check(r.requests.every(x=>x.options.credentials==='omit'&&x.options.referrerPolicy==='no-referrer'),'richieste ai contatori senza credenziali e referrer');
const consentKey='perme-marketing-consenso-v1';
const now=Date.UTC(2026,10,22,12);
const click=result=>result.documentListeners.click({target:{closest:()=>({href:'https://www.facebook.com/PerMeGuide/'})}});
r=run({now});
r.store.set(consentKey,JSON.stringify({allowed:false,until:now+60000}));
click(r);
check(marketing(r).length===0,'revoca in un’altra scheda rispettata dalla pagina già aperta');
r=run({now});
r.store.set(consentKey,JSON.stringify({allowed:true,until:now+1000}));
r.advanceTo(now+1000);
click(r);
check(marketing(r).length===0,'consenso scaduto durante la lettura blocca il clic successivo');
for(const [choice,label] of [
 [{allowed:true},'senza scadenza'],
 [{allowed:true,until:'9999999999999'},'con scadenza non numerica'],
 [{allowed:true,until:now-1},'già scaduto'],
 [{allowed:'true',until:now+60000},'con scelta non booleana']
]){
 r=run({now,consent:false,path:'app/menu-mediterraneo.html',store:new Map([[consentKey,JSON.stringify(choice)]])});
 check(marketing(r).length===0,'nessun evento con consenso '+label);
}
r=run({now});r.store.delete(consentKey);click(r);
check(marketing(r).length===0,'cancellazione della scelta rispettata dalla pagina già aperta');
for(const [time,expected,label] of [
 [Date.parse('2026-11-20T23:59:59.999+01:00'),0,'prima del 21 novembre'],
 [Date.parse('2026-11-21T00:00:00+01:00'),1,'all’inizio del 21 novembre'],
 [Date.parse('2026-12-21T23:59:59.999+01:00'),1,'fino alla fine del 21 dicembre'],
 [Date.parse('2026-12-22T00:00:00+01:00'),0,'dal 22 dicembre']
])check(marketing(run({now:time,path:'app/menu-mediterraneo.html'})).length===expected,'finestra italiana rispettata '+label);
r=run({now:Date.parse('2026-12-21T23:59:59+01:00')});
r.advanceTo(Date.parse('2026-12-22T00:00:00+01:00'));click(r);
check(marketing(r).length===0,'pagina lasciata aperta smette di contare alla fine del periodo');
console.log(checks+' verifiche marketing superate; nessuna richiesta di rete.');
