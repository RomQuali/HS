
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
