
// ----- habillage Hearthstone (2e pack) : givre de la taverne gelée, bandeaux de phase, lueurs, bannière de niveau, flèche de triple -----
// Les images sont dans assets/hs/ ; les sons restent ceux de la planche sonore du jeu.
function hsPop(k, txt) {
  try {
    document.querySelectorAll('.hs-pop').forEach(e => e.remove());
    const d = document.createElement('div'); d.className = 'hs-pop hs-pop-' + k; d.setAttribute('aria-hidden', 'true');
    d.innerHTML = '<span><i></i><b>' + txt + '</b></span>'; document.body.appendChild(d); setTimeout(() => d.remove(), 2100);
  } catch (e) {}
}
(function () { const s0 = sfxPub; sfxPub = function (P, d) {
  try { if (P && d && d.ph !== P.ph) { if (d.ph === 'combat') hsPop('combat', 'Combat'); else if (d.ph === 'recruit') setTimeout(() => hsPop('recrutement', 'Recrutement'), P.ph === 'combat' ? 750 : 0); } } catch (e) {}
  return s0.apply(this, arguments); }; })();
function hsSync() {
  try {
    const z = V.screen === 'game' ? document.querySelector('.keeper-zone.frozen:not(.enemy) .counter-line') : null;
    if (!z) { document.querySelectorAll('.hs-gel,.hs-gelb').forEach(e => e.remove()); V.hsFz = false; return; }
    const fresh = !V.hsFz ? ' in' : '';
    if (!z.querySelector(':scope > .hs-gelb')) { const b = document.createElement('i'); b.className = 'hs-gelb' + fresh; z.insertBefore(b, z.firstChild); }
    z.querySelectorAll(':scope > .mn').forEach((m, k) => {
      if (m.querySelector(':scope > .hs-gel')) return;
      const s = m.querySelector('.mn-svg'), i = document.createElement('i'); i.className = 'hs-gel' + fresh; i.style.animationDelay = (k * 55) + 'ms';
      if (s) { const a = m.getBoundingClientRect(), b = s.getBoundingClientRect(); if (a.width > 0 && b.width > 0) { i.style.left = ((b.left - a.left) / a.width * 100) + '%'; i.style.top = ((b.top - a.top) / a.height * 100) + '%'; i.style.width = (b.width / a.width * 100) + '%'; i.style.height = (b.height / a.height * 100) + '%'; } }
      m.appendChild(i);
    });
    V.hsFz = true;
  } catch (e) {}
}
(function () { const r0 = render; render = function () { const out = r0.apply(this, arguments); hsSync(); return out; }; })();
(function () { const st = document.createElement('style'); st.id = 'hs-css'; st.textContent = `
.hs-pop{position:fixed;inset:0;z-index:9000;display:grid;place-items:center;pointer-events:none}
.hs-pop > span{position:relative;display:block;width:min(46vw,76vh);aspect-ratio:720/436;animation:hsPop 2s cubic-bezier(.2,.9,.25,1) both;filter:drop-shadow(0 10px 22px rgba(0,0,0,.6))}
.hs-pop i{position:absolute;inset:0;background:center/contain no-repeat}
.hs-pop-recrutement i{background-image:url(assets/hs/bandeau-recrutement.webp)}
.hs-pop-combat i{background-image:url(assets/hs/bandeau-combat.webp)}
.hs-pop b{position:absolute;left:0;right:0;text-align:center;font:800 min(3.3vw,5.4vh)/1 var(--ft, Georgia, serif);letter-spacing:.04em;color:#fff3d0;text-shadow:0 2px 0 #1a0d06,0 0 10px rgba(0,0,0,.8),0 0 2px #000}
.hs-pop-recrutement b{top:37%;transform:rotate(-2deg)}
.hs-pop-combat b{top:61.5%;font-size:min(2.9vw,4.8vh);color:#e9edf2}
@keyframes hsPop{0%{opacity:0;transform:scale(.45)}14%{opacity:1;transform:scale(1.08)}22%{transform:scale(1)}78%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(1.12) translateY(-4%)}}
html.lite .hs-pop > span{animation-duration:1.4s}
:root:root:root:root:root body .hs-gel,:root:root:root:root:root body .hs-gelb{pointer-events:none!important}
.mn > .hs-gel{position:absolute;left:0;top:0;width:100%;height:100%;z-index:5;display:block;border-radius:50%;
  background:url(assets/hs/gel-anneau.webp) center/112% 108% no-repeat,radial-gradient(ellipse at 50% 45%,rgba(190,235,255,.08) 40%,rgba(150,215,255,.38) 72%,rgba(120,200,255,0) 74%);filter:drop-shadow(0 0 6px rgba(150,220,255,.75))}
.mn > .hs-gel::before,.mn > .hs-gel::after{content:'';position:absolute;background:center/contain no-repeat;pointer-events:none}
.mn > .hs-gel::before{left:-12%;bottom:-6%;width:46%;height:40%;background-image:url(assets/hs/gel-eclat.webp);transform:rotate(-18deg)}
.mn > .hs-gel::after{right:-9%;top:2%;width:24%;height:52%;background-image:url(assets/hs/gel-bloc.webp);transform:rotate(14deg);opacity:.9}
.mn > .hs-gel.in{animation:hsGel .5s cubic-bezier(.2,.9,.3,1.2) both}
@keyframes hsGel{0%{opacity:0;transform:scale(1.35);filter:brightness(2.4) drop-shadow(0 0 14px #dff6ff)}60%{opacity:1}100%{opacity:1;transform:scale(1)}}
.counter-line > .hs-gelb{position:absolute;left:1%;right:1%;top:-14%;bottom:-14%;z-index:0;display:block;background:url(assets/hs/gel-bord.webp) center/100% 100% no-repeat;opacity:.3;animation:hsGelB 3.2s ease-in-out infinite}
.counter-line > .hs-gelb.in{animation:hsGelIn .6s ease-out both,hsGelB 3.2s ease-in-out .6s infinite}
@keyframes hsGelB{50%{opacity:.45}}
@keyframes hsGelIn{0%{opacity:0;transform:scale(.9)}100%{opacity:.3;transform:scale(1)}}
html.lite .hs-gelb,html.lite .mn > .hs-gel.in{animation:none}
.keeper-zone .mn.tripok > .ptag::before{content:'';position:absolute;left:50%;bottom:92%;width:2.3em;height:2.3em;margin-left:-1.15em;background:url(assets/hs/fleche-triple.webp) center/contain no-repeat;filter:drop-shadow(0 0 3px #0a2c55) drop-shadow(0 0 5px rgba(120,200,255,.9));animation:hsFl 1s ease-in-out infinite}
@keyframes hsFl{50%{transform:translateY(-18%)}}
html.lite .keeper-zone .mn.tripok > .ptag::before{animation:none}
@media (hover:hover){.table:not([class*="awk-"]) .fan .cd:hover::after{content:'';position:absolute;inset:-76% -104%;z-index:-1;pointer-events:none;background:url(assets/hs/lueur-carte.webp) center/100% 100% no-repeat;animation:hsLu 1.4s ease-in-out infinite}}
@keyframes hsLu{50%{opacity:.65}}
` + rnCss(`
§ .hero-zone .bell:not(:disabled):hover .bell-t::after{content:'';position:absolute;left:-9%;right:-11%;top:-28%;bottom:-27%;background:url(assets/hs/lueur-bouton.webp) center/100% 100% no-repeat;pointer-events:none}
§ .hero-zone .bell.rung .bell-t::before{content:'';position:absolute;right:-22u;top:-28u;width:76u;height:76u;background:url(assets/hs/coche.webp) center/contain no-repeat;pointer-events:none;animation:hsCo .45s cubic-bezier(.2,.9,.3,1.4) both¤}
§ .keeper .kc::after{content:'Niveau ' attr(data-t);position:absolute;left:-150u;top:30u;width:164u;height:46u;padding:6u 26u 0 0;box-sizing:border-box;background:url(assets/hs/niveau-banniere.webp) 0 0/100% 100% no-repeat;font:800 fs(17,7)/30u var(--ft, Georgia, serif);color:#3a2206;text-align:center;text-shadow:0 1px 0 rgba(255,240,190,.7);pointer-events:none}
`) + '@keyframes hsCo{0%{opacity:0;transform:scale(.3) rotate(-25deg)}100%{opacity:1;transform:none}}';
  document.head.appendChild(st); })();

// ----- sélection du héros (pack Roni-Selection-Heros) : cadre en arche de Champs de bataille autour des portraits du jeu -----
function heroArchHS(art, hp) {
  const base = heroArchH(art, hp, 'hp-arch'), k = base.indexOf('<span class="harch-hp">'), tail = k < 0 ? '</span>' : base.slice(k);
  return `<span class="harch hp-arch hsarch"><span class="hsa-im"><svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><use href="#${art}" width="100" height="100"/></svg></span><i class="hsa-fr"></i><i class="hsa-gl"></i>${tail}`;
}
(function () { const st = document.createElement('style'); st.id = 'hs-hero-css'; st.textContent = `
.hp-card{aspect-ratio:400/480!important}
.hsarch{display:block;isolation:isolate;filter:drop-shadow(0 8px 6px rgba(10,6,14,.7))}
.hsarch .hsa-im,.hsarch .hsa-fr,.hsarch .hsa-gl{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;display:block}
.hsarch .hsa-im{background:#1a120c;clip-path:polygon(50% 12%,63% 15%,73% 20%,80% 28%,84% 37%,87% 46%,87% 90%,13% 90%,13% 48%,15% 38%,19% 28%,25% 21%,36% 15%)}
.hsarch .hsa-im svg{position:absolute;left:11%;top:10%;width:78%;height:82%}
.hsarch .hsa-fr{background:url(assets/hs/heros-cadre.webp) center/100% 100% no-repeat}
.hp-col.on .hsarch .hsa-fr{background-image:url(assets/hs/heros-cadre-or.webp)}
.hsarch .hsa-gl{opacity:0;background:url(assets/hs/heros-survol.webp) center/100% 100% no-repeat;transition:opacity .15s}
.hp-col .hp-card:hover .hsa-gl,.hp-col .hp-card:focus-visible .hsa-gl{opacity:.85}
.hp-col.on .hp-card{filter:brightness(1.05) drop-shadow(0 0 18px rgba(255,205,110,.55))!important}
.hp-card .hsarch .harch-hp{right:-6%;bottom:2%}
.hp-pc{background:linear-gradient(95deg,rgba(48,38,34,.82),rgba(42,37,36,.92)),url(assets/hs/heros-parchemin.webp) center/100% 100% no-repeat!important;border:1px solid #755b45!important;border-radius:8px!important;box-shadow:0 10px 26px rgba(0,0,0,.55)!important}
.hp-pc .pwb-med{position:relative;background:none!important;box-shadow:none!important;width:92px;height:92px;margin-top:-16px}
.hp-pc .pwb-med::after{content:'';position:absolute;inset:0;background:url(assets/hs/heros-medaillon.webp) center/contain no-repeat;pointer-events:none}
.hp-pc .pwb-med .pwart{width:62px;height:62px}
.hp-go{font-size:clamp(14px,1.7vh,18px)}
`; document.head.appendChild(st); })();

// ----- phase de combat (pack Roni-Phase-Combat) : impacts, étoiles de dégâts, têtes de mort, fissures, mots-clés et 44 bruitages (planche assets/sons/combat.mp3) -----
Object.assign(SFX.map, {"c_att":[[60233,285,1]],"c_hit1":[[55377,1491,1]],"c_hit2":[[58805,1278,1]],"c_hit3":[[57018,1637,1]],"c_armure":[[97470,479,1]],"c_bd_acquis":[[108767,3326,1]],"c_bd_rupture":[[46276,2723,1]],"c_bd_touche":[[49149,2213,1]],"c_bd_renforce":[[51511,3716,1]],"c_mort":[[71970,3141,1],[75261,3078,1],[78489,3296,1],[81935,2524,1],[84609,2919,1],[87678,2668,1]],"c_soin":[[69385,2435,1]],"c_soin_depart":[[60668,2807,1],[63625,3132,1],[66907,2327,1]],"c_soin_ombre":[[93691,3630,1]],"c_vol_vie":[[33309,1970,1]],"c_etoiles":[[10934,2925,1],[14009,3017,1],[17176,3012,1]],"c_proj":[[27198,1912,1],[29261,1819,1],[31229,1930,1]],"c_himpact":[[20338,1932,1],[22420,2247,1],[24817,2232,1]],"c_prov":[[113880,1361,1]],"c_prov_fin":[[112243,1487,1]],"c_rb_acquis":[[101188,2594,1]],"c_rb_mort":[[103932,2161,1]],"c_rb_retour":[[106243,2374,1]],"c_rale":[[98099,2939,1]],"c_rale_rebond":[[43585,2541,1]],"c_bascule_c":[[38542,2410,1]],"c_bascule_r":[[41102,2333,1]],"c_combat":[[35430,2962,1]],"c_recrut":[[90496,3045,1]],"c_p1":[[2733,4221,1]],"c_p4":[[7104,3680,1]],"c_p8":[[0,2583,1]]});
function hsSprite(x, y, img, size, ms, cls) {
  if (FX_OFF()) return; const e = document.createElement('i'); e.className = 'hs-spr ' + (cls || '');
  e.style.cssText = `left:${f1(x - size / 2)}px;top:${f1(y - size / 2)}px;width:${f1(size)}px;height:${f1(size)}px;background-image:url(assets/hs/${img}.webp)`;
  fxLayer.appendChild(e);
  const k = []; for (let i = 0; i < 8; i++) k.push({ backgroundPosition:`${(i % 4) * 100 / 3}% ${i < 4 ? 0 : 100}%`, easing:'steps(1)' }); k.push({ backgroundPosition:'100% 100%' });
  try { e.animate(k, { duration:ms || 380 }).onfinish = () => e.remove(); } catch (er) { setTimeout(() => e.remove(), ms || 380); }
}
function hsDecal(x, y, img, size, cls, ms) { if (FX_OFF()) return; const e = document.createElement('i'); e.className = 'hs-dec ' + cls; e.style.cssText = `left:${f1(x - size / 2)}px;top:${f1(y - size / 2)}px;width:${f1(size)}px;height:${f1(size)}px;background-image:url(assets/hs/${img}.webp)`; fxLayer.appendChild(e); setTimeout(() => e.remove(), ms); }
function hsCombatFrame() {
  const F = V.fight; if (!F || V.fi === 0) return;
  const pa = F.r.frames[V.fi - 1]; if (!pa) return;
  if (pa.at) {
    const a = fq(pa.at), t = fq(pa.tg), d = Math.max(t ? +t.dataset.dmg || 0 : 0, a ? +a.dataset.dmg || 0 : 0);
    sfx(d >= 7 ? 'c_hit3' : d >= 4 ? 'c_hit2' : 'c_hit1', d >= 7 ? 1 : .85);
    if (t) {
      const r = t.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height * .45, s = r.width;
      hsSprite(x, y, 'c-impact', s * 1.5, 360); setTimeout(() => hsSprite(x, y, 'c-eclair', s * 1.2, 300, 'add'), 40);
      hsDecal(x, r.top + r.height * .8, 'c-trace-impact', s * 1.25, 'trace', 1300);
      if (d >= 7) hsDecal(x, y, 'c-onde-lourde', s * 1.3, 'onde', 600);
      if (a && /[vn]/.test(a.dataset.f || '') && t.classList.contains('dying')) { const g = t.querySelector('.dmg'); if (g) g.classList.add('psn'); }
    }
  }
  if (pa.fb) sfx('c_hit2', .8);
  if (document.querySelector('.arena .mn.shbreak')) sfx('c_bd_rupture', .8);
  const dead = document.querySelectorAll('.arena .mn.dying');
  if (dead.length) {
    const rb = [...dead].some(el => el.querySelector('.dmg.rbd')), dr = [...dead].some(el => el.classList.contains('dr'));
    setTimeout(() => sfx(rb ? 'c_rb_mort' : 'c_mort', .8), 260); if (rb) F.hsRb = 1;
    if (dr) setTimeout(() => sfx('c_rale', .7), 520);
  }
  if (F.hsRb && !dead.length && document.querySelector('.arena .mn.born')) { F.hsRb = 0; sfx('c_rb_retour', .8); }
}
(function () {
  const f0 = fxFrame; fxFrame = function () { const out = f0.apply(this, arguments); try { hsCombatFrame(); } catch (e) {} return out; };
  const l0 = fxLunge; fxLunge = function () { const out = l0.apply(this, arguments); try { sfx('c_att', .8); } catch (e) {} return out; };
  const e0 = fxEnd; fxEnd = function () {
    const F = V.fight, fresh = F && !F.fxDone; const out = e0.apply(this, arguments);
    try { if (fresh && F.r && F.r.w != null && F.r.w >= 0 && Math.min(F.cap || 99, F.r.dmg) > 0) { sfx('c_proj', .7); setTimeout(() => { sfx('c_himpact', .8); sfx('c_etoiles', .5); }, 380); } } catch (e) {}
    return out; };
  const a0 = sfxAct; sfxAct = function (a) {
    try { if (a && a.t === 'play' && V.me && V.me.hd && V.me.hd[a.i]) { const m = V.me.hd[a.i], f = (m.f || '') + (m.tmp && m.tmp.f ? m.tmp.f : ''); if (f.includes('t')) setTimeout(() => sfx('c_prov', .7), 180); else if (f.includes('s')) setTimeout(() => sfx('c_bd_acquis', .6), 180); else if (f.includes('r')) setTimeout(() => sfx('c_rb_acquis', .6), 180); } } catch (e) {}
    return a0.apply(this, arguments); };
  const p0 = sfxPub; sfxPub = function (P, d) {
    try { if (P && d && d.ph !== P.ph) { if (d.ph === 'combat') sfx('c_bascule_c', .45); else if (d.ph === 'recruit' && P.ph === 'combat') sfx('c_bascule_r', .45); } } catch (e) {}
    return p0.apply(this, arguments); };
  // mots-clés : écu de Provocation et bulle de Bouclier divin de Hearthstone à la place des dessins vectoriels
  try {
    const tk = document.getElementById('tk-taunt'); if (tk) tk.innerHTML = '<image href="assets/hs/c-provocation.webp" x="-11" y="-17" width="122" height="152" preserveAspectRatio="none"/>';
    const sh = document.getElementById('tk-shield'); if (sh) sh.innerHTML = '<image href="assets/hs/c-bouclier-divin.webp" x="-13" y="-22" width="126" height="152" preserveAspectRatio="none" opacity=".55" style="mix-blend-mode:screen"/>';
  } catch (e) {}
  const st = document.createElement('style'); st.id = 'hs-combat-css'; st.textContent = `
.hs-spr,.hs-dec{position:absolute;pointer-events:none;background-repeat:no-repeat}
.hs-spr{background-size:400% 200%}.hs-spr.add{mix-blend-mode:screen}
.hs-dec{background-size:100% 100%}
.hs-dec.trace{opacity:.55;transform:scaleY(.42);animation:hsTrace 1.3s linear both;mix-blend-mode:multiply}
@keyframes hsTrace{0%{opacity:0}8%{opacity:.6}60%{opacity:.5}100%{opacity:0}}
.hs-dec.onde{animation:hsOnde .6s ease-out both;mix-blend-mode:screen}
@keyframes hsOnde{0%{opacity:.9;transform:scale(.4)}100%{opacity:0;transform:scale(1.9)}}
.dmg::before{inset:-34%!important;clip-path:none!important;background:url(assets/hs/c-degats.webp) center/contain no-repeat!important}
.dmg.psn::before{background-image:url(assets/hs/c-poison.webp)!important}
.dmg.mort::before{inset:-12%!important;background-image:url(assets/hs/c-mort.webp)!important}
.dmg.mort.psn::before{inset:-34%!important}
.mn .hs-fis{position:absolute;left:10%;right:10%;top:6%;bottom:24%;z-index:6;pointer-events:none;background:url(assets/hs/c-fissures.webp) center/100% 100% no-repeat;mix-blend-mode:screen;animation:hsFis .45s ease-out both}
@keyframes hsFis{0%{opacity:0;transform:scale(.6)}40%{opacity:1}100%{opacity:1;transform:scale(1.05)}}
.fxtxt.hdmg{width:92px!important;height:92px!important}
.fxtxt.hdmg::before{clip-path:none!important;background:url(assets/hs/c-degats-heros.webp) center/contain no-repeat!important;inset:-18%!important}
.bub-run{display:none!important}
.fxtxt.intro{display:none!important}
.mn-svg .hs-rb{mix-blend-mode:screen;opacity:.85;animation:hsRb 2.4s ease-in-out infinite;pointer-events:none}
@keyframes hsRb{50%{opacity:.45}}
html.lite .mn-svg .hs-rb{animation:none}
`; document.head.appendChild(st);
})();

// ----- choix du héros, mise en page façon Champs de bataille : plaque de titre, grands portraits, bandeau du nom, relance sous chaque héros, bannière du pouvoir au survol, bouton OK -----
(function () { const st = document.createElement('style'); st.id = 'hs-hero2-css'; st.textContent = `
.hp-ov{background:radial-gradient(ellipse at 50% 45%,#12101c,#050409 78%)!important}
.hp-wrap{position:relative;width:min(1560px,97vw)!important;max-height:97vh!important;gap:clamp(6px,1.4vh,16px)!important;padding:clamp(10px,2vh,26px) clamp(10px,2vw,40px) clamp(12px,2.4vh,30px)!important;box-sizing:border-box;border-radius:28px;
  background:linear-gradient(180deg,rgba(255,255,255,.035),transparent 30%),radial-gradient(ellipse at 50% 30%,#23202e,#14121d 60%,#0d0c15);box-shadow:inset 0 0 0 3px #0a0910,inset 0 0 0 7px #2d2a3a,inset 0 0 0 9px #0a0910,inset 0 0 90px rgba(0,0,0,.75),0 24px 70px rgba(0,0,0,.8)}
.hp-head{position:relative;display:grid;justify-items:center;gap:2px;min-width:min(620px,86vw);padding:clamp(8px,1.6vh,18px) clamp(40px,7vw,120px) clamp(10px,2vh,22px);box-sizing:border-box;
  background:radial-gradient(ellipse at 50% 0,#8b44c8,#5a2296 55%,#3c1466);clip-path:polygon(3% 8%,10% 0,24% 5%,40% 0,58% 4%,76% 0,90% 5%,97% 9%,100% 46%,96% 86%,88% 96%,72% 91%,56% 100%,42% 93%,26% 100%,12% 93%,4% 88%,0 50%);filter:drop-shadow(0 0 18px rgba(150,80,255,.55))}
.hp-t{margin:0!important;font:800 clamp(24px,4.4vh,50px)/1.05 var(--f-disp),serif!important;color:#fff!important;text-shadow:0 0 2px #000,0 3px 0 #1a0a2c,0 0 12px rgba(20,0,40,.9)!important;letter-spacing:.01em}
.hp-fams{margin:0;max-width:min(520px,70vw);font:700 clamp(11px,1.9vh,20px)/1.2 var(--f-label),serif;color:#f6a6ee;text-align:center;text-shadow:0 1px 0 #2a0a44}
.hp-row{align-items:flex-start!important;gap:clamp(8px,2.6vw,52px)!important;margin-top:clamp(4px,1.6vh,18px)!important}
.hp-col{flex:0 1 clamp(110px,min(18vw,28vh),270px)!important;gap:0!important;justify-items:center}
.hp-card{margin-bottom:0!important;overflow:visible}
.hp-col .hp-card:hover{transform:translateY(-4px)!important;filter:none!important}
.hp-col.on .hp-card{transform:translateY(-4px) scale(1.03)!important;filter:drop-shadow(0 0 10px #46ff5a) drop-shadow(0 0 22px rgba(60,255,90,.75))!important}
.hp-col.on .hsarch .hsa-fr{background-image:url(assets/hs/heros-cadre.webp)!important}
.hp-card .hp-nm{position:absolute!important;top:86%!important;bottom:auto!important;left:-7%!important;right:-7%!important;margin:0!important;padding:0!important;height:30%;display:grid!important;place-items:center;z-index:3;border-radius:0!important;box-shadow:none!important;
  background:linear-gradient(180deg,#8a3fc4,#6a2aa6 45%,#4a1a7c)!important;clip-path:polygon(0 0,6% 6%,94% 6%,100% 0,100% 62%,95% 74%,90% 70%,84% 84%,74% 78%,62% 92%,50% 84%,38% 94%,26% 80%,16% 86%,10% 72%,5% 76%,0 64%);filter:drop-shadow(0 4px 4px rgba(0,0,0,.6))}
.hp-card .hp-nm i{display:block;margin-top:-10%;padding:0 8%;font:800 clamp(12px,min(1.9vw,3.2vh),28px)/1.05 var(--f-label),serif;font-style:normal;color:#fff;text-shadow:0 0 2px #000,0 2px 0 #1c0830,0 0 6px #1c0830;text-wrap:balance}
.hp-card .hp-st{top:-4%!important;z-index:4}
.hp-card .hsarch .harch-hp{right:-9%!important;top:44%!important;bottom:auto!important;width:29%!important;z-index:4}
.hp-rr{position:relative;display:flex;align-items:center;margin-top:calc(26% + 6px);padding:0 14px 0 0;height:clamp(28px,5vh,46px);width:88%;border:0;border-radius:8px;cursor:pointer;font:inherit;
  background:linear-gradient(180deg,#f7e6b4,#dcc081 55%,#b7955a);box-shadow:inset 0 0 0 2px #7a5c2c,inset 0 0 0 4px rgba(255,246,210,.5),0 4px 8px rgba(0,0,0,.6);transition:filter .15s,transform .15s}
.hp-rr:hover{filter:brightness(1.1);transform:translateY(-1px)}
.hp-rr b{flex:1;text-align:center;font:800 clamp(10px,min(1.2vw,2.1vh),17px) var(--f-label),serif;color:#5a3d18;padding-left:8px}
.hp-rrn{flex:none;display:grid;place-items:center;height:150%;aspect-ratio:1;margin-left:-8%;border-radius:50%;background:radial-gradient(circle at 38% 30%,#b9c7d6,#5d7186 55%,#2f3e50);box-shadow:inset 0 0 0 3px #2a3644,inset 0 0 0 5px #8fa4b8,0 3px 6px rgba(0,0,0,.6);
  font:800 clamp(15px,2.9vh,28px) var(--f-num),serif;color:#3dff4a;text-shadow:0 0 2px #000,0 2px 0 #062a08,0 0 6px #0a3a0c}
.hp-rr.off{filter:grayscale(.9) brightness(.62);cursor:not-allowed}.hp-rr.off .hp-rrn{color:#c9c9c9}
.hp-pop{position:absolute;z-index:8;left:66%;top:-9%;opacity:0;visibility:hidden;pointer-events:none;transform:translateY(8px) scale(.94);transform-origin:0 40%;transition:opacity .14s,transform .14s,visibility .14s}
.hp-col:last-child .hp-pop,.hp-col:nth-child(n+3):nth-last-child(-n+2) .hp-pop{left:auto;right:66%;transform-origin:100% 40%}
.hp-col:hover .hp-pop,.hp-row:not(:has(.hp-col:hover)) .hp-col.on .hp-pop{opacity:1;visibility:visible;transform:none}
.hp-pop .pwb{width:clamp(168px,min(15vw,30vh),236px)}
.hp-ok{margin-top:clamp(2px,1vh,10px);min-width:clamp(120px,12vw,196px);height:clamp(44px,8.6vh,92px);padding:0 30px;border:0;border-radius:30px/46%;cursor:pointer;
  font:800 clamp(20px,4vh,40px) var(--f-disp),serif;color:#fff;text-shadow:0 0 2px #000,0 3px 0 #2a2a30;background:linear-gradient(180deg,#f2f2f6,#c9cad2 45%,#8c8e9a);box-shadow:inset 0 0 0 3px #6c6e7a,inset 0 0 0 7px rgba(255,255,255,.55),0 6px 14px rgba(0,0,0,.7);transition:filter .15s,transform .15s}
.hp-ok:not(:disabled){background:linear-gradient(180deg,#fff4c8,#f0c860 45%,#c08a26);box-shadow:inset 0 0 0 3px #7a5414,inset 0 0 0 7px rgba(255,250,220,.6),0 0 22px rgba(255,210,90,.7),0 6px 14px rgba(0,0,0,.7);text-shadow:0 0 2px #000,0 3px 0 #5a3a08;animation:hpOk 1.6s ease-in-out infinite}
.hp-ok:not(:disabled):hover{filter:brightness(1.1);transform:scale(1.04)}
.hp-ok:disabled{cursor:default;filter:brightness(.8) saturate(.6)}
@keyframes hpOk{50%{box-shadow:inset 0 0 0 3px #7a5414,inset 0 0 0 7px rgba(255,250,220,.6),0 0 34px rgba(255,220,110,.95),0 6px 14px rgba(0,0,0,.7)}}
.hp-infos{min-height:clamp(96px,15vh,140px)!important;width:min(820px,94vw)!important;margin:0!important}
.hp-pc{position:relative!important;display:none!important;grid-template-columns:auto 1fr!important;padding:10px 18px!important;column-gap:18px!important;opacity:1!important;visibility:visible!important}
.hp-wrap:has(.hp-col:nth-child(1):hover) .hp-pc.k0,.hp-wrap:has(.hp-col:nth-child(2):hover) .hp-pc.k1,.hp-wrap:has(.hp-col:nth-child(3):hover) .hp-pc.k2,.hp-wrap:has(.hp-col:nth-child(4):hover) .hp-pc.k3,.hp-wrap:not(:has(.hp-col:hover)) .hp-pc.on{display:grid!important}
.hpc-who{align-self:center;font:800 clamp(14px,2vh,20px) var(--f-label),serif;color:#ffe0a6}
@media (max-width:820px){.hp-pop{left:50%!important;right:auto!important;top:auto;bottom:-6%;transform-origin:50% 100%!important;margin-left:-84px}.hp-pc{grid-template-columns:1fr!important}}
@media (orientation:landscape) and (max-height:540px){.hp-col{flex:0 0 clamp(80px,24vh,110px)!important}.hp-row{justify-content:center!important;margin-top:14px!important}.hp-wrap{justify-content:center}.hp-card{aspect-ratio:400/480!important}.hp-fams{display:none}.hp-infos{display:none!important}.hp-pop{top:-30%}}
html.lite .hp-ok{animation:none!important}
`; document.head.appendChild(st); })();
