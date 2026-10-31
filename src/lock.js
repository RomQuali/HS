// Chiffre une page HTML (AES-GCM, clé PBKDF2-SHA256) et produit une page d'accès par mot de passe.
const fs = require('fs'), crypto = require('crypto');
const [,, inp, out, pass] = process.argv;
const html = fs.readFileSync(inp);
const salt = crypto.randomBytes(16), iv = crypto.randomBytes(12), IT = 250000;
const key = crypto.pbkdf2Sync(pass, salt, IT, 32, 'sha256');
const c = crypto.createCipheriv('aes-256-gcm', key, iv);
const enc = Buffer.concat([c.update(html), c.final(), c.getAuthTag()]);
const b64 = x => x.toString('base64');
const page = `<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Mêlée de Taverne</title>
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
</style></head><body>
<form class="lk" id="lk" autocomplete="off"><h1>Mêlée de Taverne</h1><p>Entre le mot de passe pour jouer.</p>
<input id="pw" type="password" aria-label="Mot de passe" placeholder="Mot de passe" autofocus>
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
  if(s && await tryPw(s,false)) return; try{localStorage.removeItem('mdt-pw');}catch(e){}
  const f=document.getElementById('lk'), b=document.getElementById('go'), er=document.getElementById('er');
  f.addEventListener('submit',async ev=>{ ev.preventDefault(); b.disabled=true; er.textContent='';
    const ok=await tryPw(document.getElementById('pw').value,document.getElementById('rm').checked);
    if(!ok){ b.disabled=false; er.textContent='Mot de passe incorrect.'; } });
})();
</script></body></html>`;
fs.writeFileSync(out, page);
console.log('ok', page.length);
