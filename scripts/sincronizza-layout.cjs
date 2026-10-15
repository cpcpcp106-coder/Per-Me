'use strict';
/* Per Me: intestazione e footer sono mantenuti in un unico punto. 
 * node scripts/sincronizza-layout.cjs --check : controlla
 * node scripts/sincronizza-layout.cjs --write : allinea i file HTML pubblici
 */
const fs=require('node:fs'),path=require('node:path');
const ROOT=path.resolve(__dirname,'..'),head=fs.readFileSync(path.join(ROOT,'site/header.html'),'utf8').trim(),foot=fs.readFileSync(path.join(ROOT,'site/footer.html'),'utf8').trim();
const write=process.argv.includes('--write'),pages=fs.readdirSync(ROOT).filter(p=>p.endsWith('.html')&&!p.startsWith('google'));
let problems=[],changed=0;
for(const file of pages){
 const filename=path.join(ROOT,file),source=fs.readFileSync(filename,'utf8');
 let next=source.replace(/<header\b[\s\S]*?<\/header>/i,head).replace(/<footer\b[\s\S]*?<\/footer>/i,foot);
 if(file!=='esperienza-caf-patronato.html')next=next.replace(/<aside\b[^>]*class=["'][^"']*\bexperience-caf-uil\b[^"']*["'][^>]*>[\s\S]*?<\/aside>/gi,'');
 next=next.replace(/<meta\s+name=["']robots["']\s+content=["']noindex[^"']*["']\s*\/?>/gi,'<meta name="robots" content="index,follow">');
 if(next!==source){if(write){fs.writeFileSync(filename,next);changed++}else problems.push(file)}
 if(!/<main\b/i.test(next))problems.push(file+': manca main');
}
if(problems.length){console.error('Problemi layout:',problems.join(', '));process.exitCode=1}
else console.log(write?'Layout sincronizzato: '+changed+' pagine':'Layout coerente: '+pages.length+' pagine');
