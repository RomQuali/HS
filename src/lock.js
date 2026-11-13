// Chiffre une page HTML (AES-GCM, clé PBKDF2-SHA256) et produit une page d'accès par mot de passe.
// Protection anti-robot de la page d'accès : pas d'indexation, navigateurs automatisés refusés, curseur à glisser à la main,
// champ piège, attente qui double après chaque erreur (gardée sur l'appareil) et dérivation de clé lente (600 000 tours).
const fs = require('fs'), crypto = require('crypto');
const [,, inp, out, pass] = process.argv;
const html = fs.readFileSync(inp);
const salt = crypto.randomBytes(16), iv = crypto.randomBytes(12), IT = 600000;
const key = crypto.pbkdf2Sync(pass, salt, IT, 32, 'sha256');
const c = crypto.createCipheriv('aes-256-gcm', key, iv);
const enc = Buffer.concat([c.update(html), c.final(), c.getAuthTag()]);
const b64 = x => x.toString('base64');
const page = `<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow,noarchive"><title>Roni</title>
<style id="lk-css">
:root{--bg:#140c07;--card:#24160c;--fg:#f1e4c6;--mut:#bfae8a;--gold:#f2c14e;--err:#ff8a6a}
:root[data-theme="light"]{--bg:#140c07}
body{margin:0;min-height:100vh;display:grid;place-items:center;background:radial-gradient(120% 90% at 50% 20%,#3a2414,var(--bg));color:var(--fg);font-family:Georgia,'Times New Roman',serif;padding:16px;box-sizing:border-box}
.lk{width:min(380px,100%);background:var(--card);border-radius:18px;padding:26px 22px;box-shadow:inset 0 0 0 2px #a8402a,0 18px 40px rgba(0,0,0,.6);text-align:center}
.lk h1{margin:0 0 4px;font-size:28px;color:var(--gold)}.lk p{margin:0 0 18px;color:var(--mut);font-size:14px}
.lk input{width:100%;box-sizing:border-box;padding:12px 14px;border-radius:10px;border:0;background:#120a06;color:var(--fg);font:16px Georgia,serif;box-shadow:inset 0 0 0 1.5px #6a4a2a}
.lk input:focus{outline:none;box-shadow:inset 0 0 0 2px var(--gold)}
.lk button{margin-top:12px;width:100%;padding:12px;border:0;border-radius:10px;cursor:pointer;font:700 17px Georgia,serif;color:#2a1608;background:linear-gradient(180deg,#ffe08a,#e0a43a);box-shadow:0 4px 0 #8a5a1a}
.lk button:disabled{opacity:.6;cursor:wait}.lk .e{min-height:20px;margin-top:10px;color:var(--err);font-size:14px}
.lk label{display:flex;gap:8px;align-items:center;justify-content:center;margin-top:12px;color:var(--mut);font-size:13px}
.lk .hpot{position:absolute;left:-9999px;width:1px;height:1px;opacity:0}
.lk .sl{position:relative;height:46px;margin-top:12px;border-radius:23px;background:#120a06;box-shadow:inset 0 0 0 1.5px #6a4a2a;touch-action:none;user-select:none;-webkit-user-select:none;overflow:hidden}
.lk .sl:focus-visible{outline:2px solid var(--gold);outline-offset:2px}
.lk .sl span{position:absolute;inset:0;display:grid;place-items:center;color:var(--mut);font-size:13px;pointer-events:none;padding-left:40px}
.lk .sl i{position:absolute;left:3px;top:3px;width:40px;height:40px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#fff1a8,#f2c14e 45%,#a8701a);box-shadow:0 0 0 2px #3a2206,0 2px 5px rgba(0,0,0,.6);cursor:grab}
.lk .sl.ok{box-shadow:inset 0 0 0 2px #7ac04a}.lk .sl.ok span{color:#b8e89a;padding-left:0}.lk .sl.ok i{background:radial-gradient(circle at 35% 30%,#e8ffd0,#8fd85a 45%,#3e7a1c);cursor:default}
</style></head><body>
<form class="lk" id="lk" autocomplete="off"><h1>Roni</h1><p>Entre le mot de passe pour jouer.</p>
<input id="pw" type="password" aria-label="Mot de passe" placeholder="Mot de passe" autofocus>
<input class="hpot" id="site" name="site" type="text" tabindex="-1" autocomplete="off" aria-hidden="true">
<div class="sl" id="sl" role="slider" tabindex="0" aria-label="Glisse la pièce vers la droite pour prouver que tu n'es pas un robot" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><span id="slt">Glisse la pièce vers la droite</span><i id="slk"></i></div>
<label><input id="rm" type="checkbox" checked style="width:auto"> Se souvenir sur cet appareil</label>
<button id="go" type="submit">Entrer</button><div class="e" id="er" role="alert"></div></form>
<script>
const D={s:"${b64(salt)}",i:"${b64(iv)}",n:${IT},c:"${b64(enc)}"};
const u8=b=>Uint8Array.from(atob(b),c=>c.charCodeAt(0));
async function open(pw){
  const k0=await crypto.subtle.importKey('raw',new TextEncoder().encode(pw),'PBKDF2',false,['deriveKey']);
  const k=await crypto.subtle.deriveKey({name:'PBKDF2',salt:u8(D.s),iterations:D.n,hash:'SHA-256'},k0,{name:'AES-GCM',length:256},false,['decrypt']);
  const buf=await crypto.subtle.decrypt({name:'AES-GCM',iv:u8(D.i)},k,u8(D.c));
  return new TextDecoder().decode(buf);
}
function mount(html){
  const doc=new DOMParser().parseFromString(html,'text/html');
  document.title=doc.title||document.title;
  for(const a of doc.documentElement.attributes) document.documentElement.setAttribute(a.name,a.value);
  const l0=document.getElementById('lk'); if(l0) l0.remove(); const c0=document.getElementById('lk-css'); if(c0) c0.remove();
  document.body.removeAttribute('style');
  for(const a of doc.body.attributes) document.body.setAttribute(a.name,a.value);
  const run=(src,dst)=>{ for(const n of Array.from(src.childNodes)){
    if(n.nodeName==='SCRIPT'){ const s=document.createElement('script'); for(const a of n.attributes) s.setAttribute(a.name,a.value); s.textContent=n.textContent; dst.appendChild(s); }
    else dst.appendChild(document.importNode(n,true)); } };
  run(doc.head,document.head); run(doc.body,document.body);
}
async function tryPw(pw,remember){
  try{ const h=await open(pw); if(remember){ try{localStorage.setItem('mdt-pw',pw);}catch(e){} } mount(h); return true; }
  catch(e){ return false; }
}
(async()=>{ let s=null; try{s=localStorage.getItem('mdt-pw');}catch(e){}
  if(s && !(function(){ try{ return !!navigator.webdriver; }catch(e){ return false; } })() && await tryPw(s,false)) return; try{localStorage.removeItem('mdt-pw');}catch(e){}
  const f=document.getElementById('lk'), b=document.getElementById('go'), er=document.getElementById('er');
  const robot=()=>{ try{ return !!navigator.webdriver; }catch(e){ return false; } };
  // contrôle humain : la pièce doit être glissée à la main (vrais événements, plusieurs mouvements, pas instantané)
  const sl=document.getElementById('sl'), kn=document.getElementById('slk'), st=document.getElementById('slt'); let human=false, drag=null;
  const setX=p=>{ const w=sl.clientWidth-46; kn.style.transform='translateX('+Math.max(0,Math.min(1,p))*w+'px)'; sl.setAttribute('aria-valuenow',Math.round(Math.max(0,Math.min(1,p))*100)); };
  const pass=()=>{ human=true; sl.classList.add('ok'); st.textContent='Vérifié'; setX(1); b.disabled=false; };
  b.disabled=true;
  sl.addEventListener('pointerdown',e=>{ if(human||!e.isTrusted) return; drag={x:e.clientX,t:performance.now(),n:0,p:0}; try{sl.setPointerCapture(e.pointerId);}catch(x){} });
  sl.addEventListener('pointermove',e=>{ if(!drag||human||!e.isTrusted) return; drag.n++; drag.p=(e.clientX-drag.x)/(sl.clientWidth-46); setX(drag.p); });
  const end=e=>{ if(!drag||human) return; const d=drag; drag=null; if(e.isTrusted && d.p>=.92 && d.n>=6 && performance.now()-d.t>=250) pass(); else setX(0); };
  sl.addEventListener('pointerup',end); sl.addEventListener('pointercancel',end);
  let kp=0,kt=0,kv=0; sl.addEventListener('keydown',e=>{ if(human||!e.isTrusted) return; if(e.key==='ArrowRight'){ e.preventDefault(); if(!kp) kt=performance.now(); kp++; kv=Math.min(1,kv+.12); setX(kv); if(kv>=1 && kp>=6 && performance.now()-kt>=250) pass(); } else if(e.key==='ArrowLeft'){ e.preventDefault(); kv=Math.max(0,kv-.12); setX(kv); } });
  // attente qui double après chaque erreur, gardée sur l'appareil
  const LK='mdt-lock'; const getL=()=>{ try{ return JSON.parse(localStorage.getItem(LK)||'{}'); }catch(e){ return {}; } }, setL=o=>{ try{ localStorage.setItem(LK,JSON.stringify(o)); }catch(e){} };
  let tick=null; const wait=()=>{ const L=getL(), left=Math.ceil(((L.until||0)-Date.now())/1000); if(left>0){ b.disabled=true; er.textContent='Trop d’essais. Réessaie dans '+left+' s.'; clearTimeout(tick); tick=setTimeout(wait,500); return true; } if(er.textContent.indexOf('Trop d')===0) er.textContent=''; b.disabled=!human; return false; };
  wait();
  f.addEventListener('submit',async ev=>{ ev.preventDefault(); if(wait()) return;
    if(robot()||document.getElementById('site').value){ er.textContent='Accès refusé aux robots.'; return; }
    if(!human){ er.textContent='Glisse d’abord la pièce vers la droite.'; return; }
    b.disabled=true; er.textContent='';
    const ok=await tryPw(document.getElementById('pw').value,document.getElementById('rm').checked);
    if(ok){ try{ localStorage.removeItem(LK); }catch(e){} return; }
    const L=getL(), n=(L.n||0)+1, d=n<3?0:Math.min(300,2*Math.pow(2,n-3)); setL({n:n,until:Date.now()+d*1000});
    er.textContent='Mot de passe incorrect.'; if(!wait()) b.disabled=false; });
})();
</script></body></html>`;
fs.writeFileSync(out, page);
console.log('ok', page.length);
