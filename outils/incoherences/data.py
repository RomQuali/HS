from playwright.sync_api import sync_playwright
import json
JS=r"""()=>{ window.CS_NOANIM=1; const out={};
for(const U of ['Naruto','South Park','Les Simpson']){ V.mp=null; V.univSel=[U]; startSolo(); clearInterval(H.tick); const G=H.G, P=Object.keys(G.pool), trs=G.laws[0].trs, o={}; out[U]=o;
  o.cartes=P.length; o.parNiveau=[1,2,3,4,5,6].map(t=>P.filter(c=>CD(c).t===t).length); o.parFamille=trs.map(tb=>trName(tb)+' '+P.filter(c=>CD(c).tr===tb).length);
  const pb=[]; const tok=new Set();
  const walk=(e,c)=>{ if(!e||typeof e!=='object') return; if(e.card){ if(!C[e.card]) pb.push(CD(c).n+' : carte inconnue '+e.card); else tok.add(e.card); } if(e.sp&&typeof e.sp==='string'&&!SPELLS[e.sp]) pb.push(CD(c).n+' : sort inconnu '+e.sp); if(e.tb&&!TRIBES[e.tb]&&e.tb!=='') pb.push(CD(c).n+' : famille inconnue '+e.tb); if(e.tb&&TRIBES[e.tb]&&!trs.includes(e.tb)&&!/inv$/.test(e.tb)) pb.push(CD(c).n+' : vise une famille hors univers ('+trName(e.tb)+')'); if(e.k&&!ET[e.k]) pb.push(CD(c).n+' : effet inconnu '+e.k); for(const k in e){ const v=e[k]; if(Array.isArray(v)) v.forEach(x=>walk(x,c)); else if(v&&typeof v==='object') walk(v,c); } };
  P.forEach(c=>{ const d=CD(c); if(!ART[c]) pb.push(d.n+' : pas d\'image'); if(!trs.includes(d.tr)) pb.push(d.n+' : famille hors univers'); (d.fxAll||[]).forEach(e=>walk(e,c)); const tx=cardTextH(c,0)+cardTextH(c,1); if(/undefined|NaN|\?\?|null|\[object/.test(tx)) pb.push(d.n+' : texte cassé : '+tx.replace(/<[^>]+>/g,'').slice(0,120)); if(!d.n||d.a<0||d.h<1) pb.push(c+' : stats'); });
  [...tok].forEach(c=>{ if(!ART[c]) pb.push('jeton '+CD(c).n+' : pas d\'image'); const tx=cardTextH(c,0); if(/undefined|NaN/.test(tx)) pb.push('jeton '+CD(c).n+' : texte cassé'); });
  // doublons de noms, cartes présentes deux fois
  const names={}; P.forEach(c=>{ (names[CD(c).n]=names[CD(c).n]||[]).push(c); }); for(const n in names) if(names[n].length>1) pb.push('nom en double : '+n);
  // valeur des stats par niveau : cartes très au-dessus ou au-dessous de leur niveau
  const byT={}; P.forEach(c=>{ const d=CD(c); (byT[d.t]=byT[d.t]||[]).push(d.a+d.h); }); const med=t=>{const a=byT[t].slice().sort((x,y)=>x-y); return a[Math.floor(a.length/2)];};
  o.statsMedianes=[1,2,3,4,5,6].map(t=>med(t));
  o.statsHorsNorme=P.filter(c=>{const d=CD(c), m=med(d.t); return d.a+d.h>m+5||d.a+d.h<m-4;}).map(c=>CD(c).n+' T'+CD(c).t+' '+CD(c).a+'/'+CD(c).h+' (médiane '+med(CD(c).t)+')');
  // héros
  const hs=Object.keys(HEROES).filter(h=>(heroFam(h)||[]).some(f=>trs.includes(f))&&(/^(nh|sh|smh)_/.test(h))); o.heros=hs.length;
  hs.forEach(h=>{ const x=HEROES[h]; if(!HART[h]&&!ROIMG[h]) pb.push('héros '+x.n+' : pas de portrait'); for(const d of [x, x.awd].filter(Boolean)){ const tx=(d.tx||'')+(d.trx||''); if(!tx) pb.push('héros '+x.n+' : pas de texte'); if(/undefined|NaN/.test(tx)) pb.push('héros '+x.n+' : texte cassé'); if(d.pv&&!trs.includes(d.pv)) pb.push('héros '+x.n+' : famille préférée hors univers ('+d.pv+')'); const w=d.pw; if(w&&w.k==='multi'&&!(d.cost>0)) pb.push('héros '+x.n+' : pouvoir actif sans coût'); if(w&&w.k!=='multi'&&d.cost) pb.push('héros '+x.n+' : passif avec un coût'); if(w&&w.k==='multi') w.s.forEach(s=>{ if(s.card&&!C[s.card]) pb.push('héros '+x.n+' : carte inconnue '+s.card); if(s.card&&C[s.card]&&!trs.includes(CD(s.card).tr)&&!/inv$/.test(CD(s.card).tr)) pb.push('héros '+x.n+' : invoque une carte hors univers ('+CD(s.card).n+', '+trName(CD(s.card).tr)+')'); }); }
    if(x.aw&&!x.q) pb.push('héros '+x.n+' : éveil sans quête'); if(x.q&&!x.aw) pb.push('héros '+x.n+' : quête sans éveil'); });
  o.problemes=pb; }
// Naruto : groupes
const g=[]; NK_GROUPS.forEach(G0=>{ G0.m.forEach(c=>{ if(!C[c]) g.push(G0.n+' : membre inconnu '+c); }); if(G0.th.length!==G0.tx.length) g.push(G0.n+' : paliers et textes ne correspondent pas'); if(G0.th.some(t=>t>G0.m.length)) g.push(G0.n+' : palier impossible'); if(G0.el&&!G0.m.includes(G0.el)) g.push(G0.n+' : élève hors groupe'); });
const P=Object.keys(C).filter(c=>/^nk_/.test(c)); out.Naruto.sansGroupe=P.filter(c=>!NK_GOF[c]).map(c=>CD(c).n); out.Naruto.groupes=NK_GROUPS.length; out.Naruto.pbGroupes=g;
out.Naruto.transfos=P.filter(c=>{const J=jutOf({c}); return J&&J.tf;}).length; out.Naruto.sansJutsu=P.filter(c=>!jutOf({c})).map(c=>CD(c).n);
out.Naruto.tfSansImage=P.filter(c=>{const J=jutOf({c}); return J&&J.tf&&!ART[c+'_tf1'];}).map(c=>CD(c).n);
out.Naruto.coutTf=P.filter(c=>{const J=jutOf({c}); return J&&J.tf&&(J.tf.c<5||J.tf.c>10);}).map(c=>CD(c).n);
// noms de transformation en double (source de confusion)
const tfn={}; P.forEach(c=>{const J=jutOf({c}); if(J&&J.tf)(tfn[J.tf.nm]=tfn[J.tf.nm]||[]).push(CD(c).n);}); out.Naruto.nomsTfEnDouble=Object.entries(tfn).filter(([k,v])=>v.length>1).map(([k,v])=>k+' : '+v.join(', '));
const jn={}; P.forEach(c=>{const J=jutOf({c}); if(J)(jn[J.nm]=jn[J.nm]||[]).push(CD(c).n);}); out.Naruto.nomsJutsuEnDouble=Object.entries(jn).filter(([k,v])=>v.length>1).map(([k,v])=>k+' : '+v.join(', '));
// transformation dont le jutsu renforcé n'est pas plus fort que le jutsu de base
out.Naruto.jutsuRenforcePasMieux=P.filter(c=>{const J=jutOf({c}); if(!J||!J.tf||!J.tf.fx) return false; const v=fx=>fx.reduce((s,e)=>s+(e.a||0)+(e.h||0)+(e.n||0)*3+(e.k==='bc_summon'?10:0)+(e.k==='bc_devour'?6:0)+(e.k==='bc_kwself'?4:0),0); return v(J.tf.fx)<=v(J.fx);}).map(c=>CD(c).n);
return out}"""
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(); errs=[]; pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('file:///home/claude/taverne.html'); pg.wait_for_timeout(1200)
    r=pg.evaluate(JS); print(json.dumps(r,ensure_ascii=False,indent=1)); print(errs[:3]); b.close()
