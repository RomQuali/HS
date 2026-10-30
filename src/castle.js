/* =====================================================================
   FOND : LA SORTIE DU CHÂTEAU
   On se tient dans le passage voûté ; le pont-levis s'abaisse lentement
   et dévoile le monde : un terrain de foot de Squishys, des loups-garous
   qui hurlent à la lune, des chevaliers face à un dragon.
   Chaque calque est dessiné une fois puis converti en image ; seules les
   images bougent (légèrement), pour rester fluide sur téléphone.
   ===================================================================== */
const CS = { W: 1600, H: 900, VX: 800, VY: 470, BR: { cx: 800, W: 1300, L: 760, Yb: 800, p: 560 } };
const csRnd = seed => () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
const csF = n => Math.round(n * 10) / 10;
const csArchY = x => { const u = (x - 800) / 630; return Math.abs(u) >= 1 ? 300 : 300 - 230 * Math.sqrt(1 - u * u); };
const CS_OPEN = 'M170 800 V300 A630 230 0 0 1 1430 300 V800 Z';

/* ---------- outils de dessin ---------- */
function csRidge(x0, x1, y0, y1, amp, rough, seed) {
  const r = csRnd(seed); let pts = [[x0, y0], [x1, y1]]; let a = amp;
  for (let it = 0; it < 7; it++) {
    const n = [pts[0]];
    for (let k = 1; k < pts.length; k++) { const [ax, ay] = pts[k - 1], [bx, by] = pts[k]; n.push([(ax + bx) / 2, (ay + by) / 2 + (r() - .5) * a], [bx, by]); }
    pts = n; a *= rough;
  }
  return pts.map(([x, y], k) => (k ? 'L' : 'M') + csF(x) + ' ' + csF(y)).join('');
}
const CS_TOON = true;
const csGrain = (id, fx, fy, k = .35, seed = 2) => CS_TOON ? `<filter id="${id}"><feOffset/></filter>` : `<filter id="${id}" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="${fx} ${fy}" numOctaves="4" seed="${seed}" result="n"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 ${-k * 2.2} ${k * 1.1}" result="d"/><feComposite in="d" in2="SourceAlpha" operator="in" result="dd"/><feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="dd"/></feMerge></filter>`;
const csRim = (i, dx, dy, c) => `<filter id="${i}" x="-10%" y="-10%" width="120%" height="120%"><feOffset in="SourceAlpha" dx="${dx}" dy="${dy}" result="o"/><feComposite in="SourceAlpha" in2="o" operator="out" result="e"/><feFlood flood-color="${c}"/><feComposite in2="e" operator="in" result="rc"/><feGaussianBlur in="rc" stdDeviation=".9" result="rb"/><feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="rb"/><feMergeNode in="rb"/></feMerge></filter>`;
const csHex = c => [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16));
const csMix = (a, b, t) => '#' + csHex(a).map((v, i) => Math.round(v + (csHex(b)[i] - v) * t).toString(16).padStart(2, '0')).join('');
function csSteps(stops, n) { // stops [[offset, '#hex', opacity?]] → bandes franches
  const at = t => { for (let i = 1; i < stops.length; i++) if (t <= stops[i][0]) { const [o0, c0, a0 = 1] = stops[i - 1], [o1, c1, a1 = 1] = stops[i], u = (t - o0) / ((o1 - o0) || 1); return [csMix(c0, c1, u), a0 + (a1 - a0) * u]; } const l = stops[stops.length - 1]; return [l[1], l[2] ?? 1]; };
  let o = ''; for (let i = 0; i < n; i++) { const [c, a] = at((i + .5) / n); o += `<stop offset="${(i / n).toFixed(3)}" stop-color="${c}" stop-opacity="${a.toFixed(2)}"/><stop offset="${((i + 1) / n).toFixed(3)}" stop-color="${c}" stop-opacity="${a.toFixed(2)}"/>`; }
  return o;
}
const csInk = (r, c = '#120a06') => `<filter id="ink" x="-8%" y="-8%" width="116%" height="116%"><feMorphology in="SourceAlpha" operator="dilate" radius="${r}" result="d"/><feFlood flood-color="${c}"/><feComposite in2="d" operator="in" result="o"/><feMerge><feMergeNode in="o"/><feMergeNode in="SourceGraphic"/></feMerge></filter>`;
const csBlur = (id, s) => `<filter id="${id}" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="${s}"/></filter>`;

/* ---------- le ciel ---------- */
function csSky() {
  const r = csRnd(11);
  let s = `<defs><linearGradient id="k" x1="0" y1="0" x2="0" y2="560" gradientUnits="userSpaceOnUse">${csSteps([[0, "#0c1430"], [.35, "#1f2a5a"], [.62, "#4a3478"], [.82, "#b0506a"], [1, "#ff9a5a"]], 9)}</linearGradient>
    <radialGradient id="sun" cx="330" cy="520" r="760" gradientUnits="userSpaceOnUse">${csSteps([[0, "#ffe08a", .95], [.18, "#ffa05a", .6], [.5, "#c04a6a", .22], [1, "#3a2050", 0]], 7)}</radialGradient>
    <radialGradient id="mg" cx="1240" cy="245" r="300" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#dfe8ff" stop-opacity=".5"/><stop offset=".25" stop-color="#9ab0e8" stop-opacity=".18"/><stop offset="1" stop-color="#9ab0e8" stop-opacity="0"/></radialGradient>
    <radialGradient id="mo" cx=".42" cy=".38" r=".7"><stop offset="0" stop-color="#fffdf2"/><stop offset=".7" stop-color="#ece6cf"/><stop offset="1" stop-color="#c9c2aa"/></radialGradient>
    <filter id="cr" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".05" numOctaves="3" seed="4"/><feColorMatrix type="matrix" values="0 0 0 0 .55  0 0 0 0 .52  0 0 0 0 .45  0 0 0 -2.4 1.25"/><feComposite in2="SourceAlpha" operator="in"/></filter>
    <filter id="cl" x="-20%" y="-60%" width="140%" height="220%"><feTurbulence type="fractalNoise" baseFrequency=".012 .05" numOctaves="4" seed="9" result="t"/><feGaussianBlur in="SourceGraphic" stdDeviation="9" result="b"/><feDisplacementMap in="b" in2="t" scale="70" xChannelSelector="R" yChannelSelector="G"/></filter>
    ${csBlur('sb', 1.2)}</defs>`;
  s += `<rect x="-40" y="0" width="1680" height="900" fill="url(#k)"/><rect x="-40" y="0" width="1680" height="900" fill="url(#sun)"/><rect x="-40" y="0" width="1680" height="600" fill="url(#mg)"/>`;
  for (let k = 0; k < 170; k++) { const x = r() * 1680 - 40, y = r() * 360, warm = Math.hypot(x - 330, y - 520) < 520; if (warm && r() < .85) continue; s += `<circle cx="${csF(x)}" cy="${csF(y)}" r="${csF(.5 + r() * 1.1)}" fill="#fff" opacity="${csF(.25 + r() * .7)}"/>`; }
  // nuages étirés, éclairés par le couchant
  s += `<g filter="url(#cl)">${[[260, 300, 260, 16, '#c86a5a', .55], [520, 250, 220, 10, '#8a4a62', .5], [180, 380, 300, 14, '#f0a070', .5], [980, 210, 300, 12, '#3a3060', .7], [1380, 330, 260, 12, '#4a3a6a', .6], [760, 360, 240, 10, '#a85a60', .45], [1100, 140, 200, 8, '#2a2a50', .7]].map(([x, y, rx, ry, c, o]) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${c}" opacity="${o}"/>`).join('')}</g>`;
  // la lune
  s += `<circle cx="1240" cy="245" r="56" fill="url(#mo)"/><circle cx="1240" cy="245" r="56" fill="#fff" filter="url(#cr)" opacity=".55"/><circle cx="1240" cy="245" r="57" fill="none" stroke="#fffbe8" stroke-width="2" opacity=".5" filter="url(#sb)"/>`;
  return { id: 'sky', x: -40, y: 0, w: 1680, h: 600, d: .08, svg: s, big: 1 };
}

/* ---------- montagnes lointaines ---------- */
function csMountains() {
  let s = `<defs><linearGradient id="hz" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#e8906a" stop-opacity=".55"/><stop offset=".45" stop-color="#a0607a" stop-opacity=".2"/><stop offset="1" stop-color="#405080" stop-opacity=".15"/></linearGradient>${csGrain('g1', .02, .05, .25, 5)}</defs>`;
  s += `<path d="${csRidge(-40, 1640, 400, 380, 120, .55, 3)} L1640 600 L-40 600 Z" fill="#5a4a72" filter="url(#g1)"/>`;
  s += `<path d="${csRidge(-40, 1640, 400, 380, 120, .55, 3)} L1640 600 L-40 600 Z" fill="url(#hz)"/>`;
  s += `<path d="${csRidge(-40, 1640, 452, 430, 70, .6, 8)} L1640 600 L-40 600 Z" fill="#3a3050" filter="url(#g1)"/>`;
  s += `<path d="${csRidge(-40, 1640, 452, 430, 70, .6, 8)} L1640 600 L-40 600 Z" fill="url(#hz)" opacity=".7"/>`;
  // château lointain sur la crête, quelques fenêtres allumées
  s += `<g transform="translate(1040 412)" fill="#2a2440"><rect x="-30" y="-24" width="60" height="30"/><rect x="-38" y="-46" width="14" height="52"/><rect x="24" y="-40" width="14" height="46"/><rect x="-6" y="-60" width="12" height="40"/><path d="M-40 -46 L-31 -62 L-22 -46 Z M22 -40 L31 -54 L40 -40 Z M-8 -60 L0 -76 L8 -60 Z"/><rect x="-33" y="-36" width="3" height="5" fill="#ffc870"/><rect x="28" y="-28" width="3" height="5" fill="#ffc870"/><rect x="-2" y="-48" width="3" height="5" fill="#ffc870"/></g>`;
  return { ink: 2, id: 'mnt', x: -40, y: 300, w: 1680, h: 300, d: .16, svg: s, big: 1 };
}

/* ---------- rochers : piton du dragon et crête des loups ---------- */
function csRocks() {
  let s = `<defs>${csGrain('g2', .03, .012, .45, 7)}
    <linearGradient id="rl" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ffb070"/><stop offset="1" stop-color="#ff7a4a" stop-opacity="0"/></linearGradient>
    <linearGradient id="vg" x1="0" y1="440" x2="0" y2="640" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#2a2a30"/><stop offset=".4" stop-color="#1e2a20"/><stop offset="1" stop-color="#141c14"/></linearGradient>
    <radialGradient id="fl" cx="800" cy="560" r="560" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ffb060" stop-opacity=".22"/><stop offset="1" stop-color="#ffb060" stop-opacity="0"/></radialGradient>
    ${csBlur('rb', 2)}${csBlur('mb', 14)}</defs>`;
  // fond de vallée
  s += `<path d="${csRidge(-40, 1640, 478, 470, 16, .6, 21)} L1640 660 L-40 660 Z" fill="url(#vg)" filter="url(#g2)"/><rect x="-40" y="440" width="1680" height="220" fill="url(#fl)"/>`;
  // arbres sombres en lisière
  const r = csRnd(31); let trees = '';
  for (let k = 0; k < 46; k++) { const x = (k < 23 ? 500 + r() * 160 : 980 + r() * 200), y = 486 + r() * 10, h = 20 + r() * 26; trees += `<path d="M${csF(x)} ${csF(y - h)} L${csF(x + h * .28)} ${csF(y)} L${csF(x - h * .28)} ${csF(y)} Z"/>`; }
  s += `<g fill="#141a16" opacity=".9">${trees}</g>`;
  // piton rocheux à gauche (contre-jour du couchant)
  const crag = 'M60 560 C90 520 110 470 140 430 C160 400 170 360 196 336 C214 318 228 300 252 296 L300 292 C330 290 352 296 372 304 C392 314 404 336 418 360 C440 396 470 430 500 470 C520 498 540 530 560 560 Z';
  s += `<g transform="translate(40 50)"><path d="${crag}" fill="#1c1620" filter="url(#g2)"/><path d="${crag}" fill="none" stroke="url(#rl)" stroke-width="3" opacity=".8" filter="url(#rb)"/>`;
  s += `<g stroke="#2e2430" stroke-width="2" fill="none" opacity=".8"><path d="M150 450 L230 420 L300 430 M180 390 L260 370 M120 500 L240 480 L360 490 M330 340 L390 360 M420 420 L470 450"/></g>`;
  s += `<path d="M196 336 C214 318 228 300 252 296 L300 292 C330 290 352 296 372 304" fill="none" stroke="#ffcf9a" stroke-width="2" opacity=".55" filter="url(#rb)"/></g>`;
  // crête des loups à droite (rim de lune)
  const ridge = 'M1000 530 C1040 500 1080 470 1120 450 C1150 436 1170 420 1190 404 C1200 396 1214 392 1232 394 C1254 396 1262 404 1274 414 C1300 430 1340 440 1380 448 C1430 458 1500 470 1640 480 L1640 600 L1000 600 Z';
  s += `<path d="${ridge}" fill="#12141e" filter="url(#g2)"/><path d="M1120 450 C1150 436 1170 420 1190 404 C1200 396 1214 392 1232 394 C1254 396 1262 404 1274 414 C1300 430 1340 440 1380 448" fill="none" stroke="#b8c8ff" stroke-width="2" opacity=".55" filter="url(#rb)"/>`;
  s += `<path d="M1196 400 C1200 386 1214 380 1230 382 C1246 384 1254 392 1256 404 Z" fill="#161a26"/>`;
  // brume de vallée
  s += `<ellipse cx="800" cy="492" rx="900" ry="22" fill="#d8c8d8" opacity=".14" filter="url(#mb)"/>`;
  return { ink: 3, id: 'rock', x: -40, y: 280, w: 1680, h: 380, d: .3, svg: s, big: 1 };
}

/* ---------- le terrain de foot ---------- */
function csField() {
  const P = { nl: [330, 600], nr: [1270, 600], fl: [470, 505], fr: [1130, 505] };
  const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
  const at = (u, v) => { const n = lerp(P.nl, P.nr, u), f = lerp(P.fl, P.fr, u); return lerp(f, n, v); };
  const pt = p => csF(p[0]) + ' ' + csF(p[1]);
  const poly = pts => 'M' + pts.map(pt).join('L') + 'Z';
  let s = `<defs>${csGrain('g3', .25, .9, .3, 3)}
    <radialGradient id="br" r=".5"><stop offset="0" stop-color="#ffc070" stop-opacity=".55"/><stop offset=".4" stop-color="#ff8a3a" stop-opacity=".18"/><stop offset="1" stop-color="#ff8a3a" stop-opacity="0"/></radialGradient>
    <linearGradient id="gr" x1="0" y1="505" x2="0" y2="600" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#2a4a28"/><stop offset="1" stop-color="#3a6a32"/></linearGradient>${csBlur('fb', 1.6)}</defs>`;
  s += `<path d="${poly([P.fl, P.fr, P.nr, P.nl])}" fill="url(#gr)" filter="url(#g3)"/>`;
  for (let k = 0; k < 14; k += 2) s += `<path d="${poly([at(k / 14, 0), at((k + 1) / 14, 0), at((k + 1) / 14, 1), at(k / 14, 1)])}" fill="#5a8a46" opacity=".22"/>`;
  const L = (a, b) => `<path d="M${pt(a)} L${pt(b)}" />`;
  let lines = L(at(0, 0), at(1, 0)) + L(at(1, 0), at(1, 1)) + L(at(1, 1), at(0, 1)) + L(at(0, 1), at(0, 0)) + L(at(.5, 0), at(.5, 1));
  lines += `<path d="M${pt(at(0, .25))} L${pt(at(.12, .27))} L${pt(at(.12, .73))} L${pt(at(0, .75))} M${pt(at(1, .25))} L${pt(at(.88, .27))} L${pt(at(.88, .73))} L${pt(at(1, .75))}"/>`;
  const c = at(.5, .5); lines += `<ellipse cx="${csF(c[0])}" cy="${csF(c[1])}" rx="62" ry="15"/>`;
  s += `<g stroke="#f4f0e0" stroke-width="2.2" fill="none" opacity=".75">${lines}</g>`;
  // buts avec filets
  const goal = (u, side) => {
    const a = at(u, .4), b = at(u, .6), h = 30 + (a[1] - 505) * .12, dx = side * 16;
    return `<g><path d="M${pt(a)} l${dx} -6 l0 ${-h + 6} M${pt(b)} l${dx} -6 l0 ${-h + 6} M${csF(a[0] + dx)} ${csF(a[1] - h)} L${csF(b[0] + dx)} ${csF(b[1] - h)}" stroke="#cfcac0" stroke-width="1.5" opacity=".7" fill="none"/>
      <path d="M${pt(a)} L${csF(a[0])} ${csF(a[1] - h)} L${csF(b[0])} ${csF(b[1] - h)} L${pt(b)}" stroke="#fff" stroke-width="3.4" fill="#ffffff" fill-opacity=".08"/>
      <path d="${Array.from({ length: 7 }, (_, k) => { const t = k / 6, p = lerp(a, b, t); return `M${csF(p[0])} ${csF(p[1])} l${dx} -6 l0 ${csF(-h + 6)}`; }).join('')}" stroke="#fff" stroke-width=".7" opacity=".45" fill="none"/></g>`;
  };
  s += goal(0, -1) + goal(1, 1);
  // braseros aux coins
  [[300, 610], [1300, 610], [452, 508], [1148, 508]].forEach(([x, y], k) => {
    const sc = k < 2 ? 1 : .7;
    s += `<g transform="translate(${x} ${y}) scale(${sc})"><circle r="120" fill="url(#br)"/><path d="M-3 0 L-8 -50 M3 0 L8 -50 M-12 -50 H12" stroke="#1a1410" stroke-width="3"/><path d="M-14 -50 Q0 -42 14 -50 L10 -58 H-10 Z" fill="#2a2018"/><path d="M-9 -56 C-10 -70 -2 -74 0 -88 C4 -74 12 -70 9 -56 Z" fill="#ffb03a" filter="url(#fb)"/><path d="M-4 -56 C-4 -64 0 -68 0 -76 C3 -68 5 -64 4 -56 Z" fill="#fff0b0"/></g>`;
  });
  // fanions des univers le long de la touche
  const U = ['#6a2a8a', '#9a7228', '#4a6a86', '#4a7a2a', '#1f6a96', '#5a3a9a', '#6a5038', '#b04a6a'];
  U.forEach((col, k) => { const p = at(.06 + k * .125, -.02); s += `<g transform="translate(${csF(p[0])} ${csF(p[1])})"><path d="M0 0 V-44" stroke="#2a2018" stroke-width="2"/><path d="M0 -44 L22 -38 L0 -31 Z" fill="${col}"/><path d="M0 -44 L22 -38" stroke="#fff" stroke-opacity=".25"/></g>`; });
  // guirlandes de lampions
  const gar = (x0, y0, x1, y1, sag, n, k0) => { let d = '', b = ''; const C = ['#ff5a5a', '#ffd24a', '#5ad0ff', '#9aff6a', '#ff8ad8'];
    for (let i = 0; i <= n; i++) { const t = i / n, x = x0 + (x1 - x0) * t, y = y0 + (y1 - y0) * t + sag * 4 * t * (1 - t); d += (i ? 'L' : 'M') + csF(x) + ' ' + csF(y); if (i && i < n) b += `<circle cx="${csF(x)}" cy="${csF(y + 5)}" r="9" fill="${C[(i + k0) % 5]}" opacity=".35" filter="url(#fb)"/><circle cx="${csF(x)}" cy="${csF(y + 5)}" r="3.6" fill="${C[(i + k0) % 5]}"/>`; }
    return `<path d="${d}" stroke="#1a1410" stroke-width="1.5" fill="none"/>${b}`; };
  s += gar(300, 440, 800, 430, 46, 14, 0) + gar(800, 430, 1300, 440, 46, 14, 2) + gar(330, 500, 640, 476, 28, 9, 1) + gar(960, 476, 1270, 500, 28, 9, 3);
  // tentes de tournoi
  const tent = (x, y, c1, c2, sc) => `<g transform="translate(${x} ${y}) scale(${sc})"><path d="M-30 0 L0 -44 L30 0 Z" fill="${c1}"/><path d="M-10 0 L0 -44 L10 0 Z" fill="${c2}"/><path d="M-4 0 L0 -12 L4 0 Z" fill="#ffd070" opacity=".9"/><path d="M0 -44 V-56 L10 -52 L0 -48" stroke="#2a1a10" stroke-width="1.5" fill="${c1}"/></g>`;
  s += tent(360, 500, '#8a2a2a', '#d8c8a8', .9) + tent(410, 496, '#2a4a8a', '#d8c8a8', .75) + tent(1240, 498, '#4a7a2a', '#e0d0b0', .85) + tent(1300, 502, '#8a5a1a', '#e0d0b0', .95);
  return { ink: 2.5, id: 'field', x: 240, y: 400, w: 1120, h: 220, d: .42, svg: s };
}

/* ---------- les douves ---------- */
function csMoat() {
  const r = csRnd(51);
  let s = `<defs><linearGradient id="w" x1="0" y1="600" x2="0" y2="820" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#5a4a6a"/><stop offset=".25" stop-color="#2a2a46"/><stop offset="1" stop-color="#0c0e18"/></linearGradient>
    <radialGradient id="wr" cx="380" cy="620" r="420" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ffa070" stop-opacity=".45"/><stop offset="1" stop-color="#ffa070" stop-opacity="0"/></radialGradient>${csGrain('g4', .01, .2, .25, 6)}</defs>`;
  s += `<path d="${csRidge(-40, 1640, 606, 606, 6, .5, 61)} L1640 830 L-40 830 Z" fill="url(#w)" filter="url(#g4)"/><rect x="-40" y="600" width="1680" height="230" fill="url(#wr)"/>`;
  s += `<path d="${csRidge(-40, 1640, 603, 603, 8, .5, 61)} L1640 612 L-40 612 Z" fill="#141a12"/>`;
  let rip = '';
  for (let k = 0; k < 90; k++) { const y = 616 + Math.pow(r(), 1.4) * 200, x = r() * 1680 - 40, w = 10 + (y - 600) * .35 * r(); rip += `<path d="M${csF(x)} ${csF(y)} h${csF(w)}" stroke="${x < 700 ? '#ffc0a0' : '#c8d4ff'}" stroke-width="${csF(.6 + (y - 600) / 160)}" opacity="${csF(.12 + r() * .3)}"/>`; }
  s += rip;
  // roseaux sur les rives
  let reeds = ''; for (let k = 0; k < 40; k++) { const x = k < 20 ? 180 + r() * 220 : 1200 + r() * 230, y = 612 + r() * 6, h = 14 + r() * 22; reeds += `<path d="M${csF(x)} ${csF(y)} q${csF((r() - .5) * 8)} ${csF(-h / 2)} ${csF((r() - .5) * 10)} ${csF(-h)}"/>`; }
  s += `<g stroke="#10160e" stroke-width="2" fill="none">${reeds}</g>`;
  return { id: 'moat', x: -40, y: 590, w: 1680, h: 240, d: .6, svg: s, big: 1 };
}

/* ---------- le dragon ---------- */
function csDragon() {
  const body = 'M228 262 C240 236 290 222 332 226 C356 228 372 246 368 268 C362 290 336 298 300 298 C268 298 240 292 228 282 Z';
  const neck = 'M326 236 C340 202 366 176 398 166 C414 162 428 168 432 182 C420 186 404 194 392 208 C378 224 372 246 368 266 Z';
  const head = 'M408 166 C426 156 448 164 464 176 L484 194 C478 199 467 197 457 195 L448 199 L476 216 C471 223 456 223 440 215 C428 209 418 201 410 191 C404 182 402 172 408 166 Z';
  const horns = 'M414 170 L386 142 L405 162 Z M425 165 L412 130 L421 160 Z';
  const legF = 'M338 272 C350 286 354 296 348 302 L364 305 L340 309 L326 292 Z';
  const legH = 'M234 266 C212 276 214 300 238 306 L264 308 L247 300 C251 290 253 280 249 270 Z';
  const tail = 'M232 272 C200 280 170 300 160 330 C152 352 140 372 118 380 L110 372 L122 368 C136 356 144 336 150 318 C162 292 196 270 228 262 Z M120 380 L96 388 L112 366 Z';
  const farWing = 'M318 232 L350 142 L398 92 L394 124 L382 150 L374 176 L354 202 Z';
  let spines = ''; for (let k = 0; k < 9; k++) { const t = k / 8, x = 250 + t * 150, y = 236 - Math.sin(t * Math.PI) * 30 - t * 40; spines += `M${csF(x)} ${csF(y)} l4 -11 l5 10 Z`; }
    const s = `<defs>${csGrain('g5', .09, .09, .28, 12)}${csRim('dRim', .8, -1.8, '#ffa060')}<linearGradient id="dr" x1="0" y1="1" x2=".6" y2="0"><stop offset="0" stop-color="#ffb070"/><stop offset=".5" stop-color="#ff7a4a" stop-opacity=".5"/><stop offset="1" stop-color="#ff7a4a" stop-opacity="0"/></linearGradient>
    <linearGradient id="db" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a1e22"/><stop offset="1" stop-color="#140e12"/></linearGradient>${csBlur('db2', .9)}${csBlur('eg', 2)}</defs>
    <path d="${farWing}" fill="#2a1416"/><path d="${farWing}" fill="#a8401e" opacity=".35"/>
    <g filter="url(#dRim)"><g filter="url(#g5)"><path d="${tail} ${legH} ${body} ${legF} ${neck} ${head} ${horns}" fill="url(#db)"/></g></g>
    <path d="M300 280 C320 286 340 284 356 276 M250 290 C270 296 290 296 300 294" stroke="#3a2a2a" stroke-width="2" fill="none" opacity=".7"/>
    <path d="M384 210 C392 200 402 194 412 192" stroke="#4a2a22" stroke-width="5" fill="none" opacity=".5"/>
    <circle cx="440" cy="178" r="5" fill="#ffb03a" filter="url(#eg)"/><circle cx="440" cy="178" r="2.2" fill="#fff0a0"/>
    <path d="M458 196 L470 207" stroke="#ff9a3a" stroke-width="2" opacity=".8"/>`;
  return { ink: 3, id: 'dragon', x: 120, y: 130, w: 420, h: 320, d: .3, svg: s, cls: 'cs-breathe', ox: '60%', oy: '70%', vb: [80, 80] };
}
function csDragonWing() {
  const mem = 'M300 232 L252 150 L202 80 L108 112 C140 122 150 142 146 168 C168 172 180 192 180 214 C204 212 226 222 236 238 Z';
  const s = `<defs><linearGradient id="wm" gradientUnits="userSpaceOnUse" x1="202" y1="80" x2="140" y2="210"><stop offset="0" stop-color="#3a1a16"/><stop offset=".6" stop-color="#7a2a1a"/><stop offset="1" stop-color="#c8582a"/></linearGradient>${csBlur('wb', .8)}${csGrain('g6', .06, .06, .35, 14)}</defs>
    <path d="${mem}" fill="url(#wm)" opacity=".94" filter="url(#g6)"/>
    <g stroke="#140c0e" stroke-linecap="round" fill="none"><path d="M300 232 L252 150 L202 80" stroke-width="9"/><path d="M202 80 L108 112 M202 80 L146 168 M202 80 L180 214 M252 150 L236 238" stroke-width="4"/></g>
    <g stroke="#e8884a" stroke-width="1" fill="none" opacity=".4"><path d="M196 92 C170 120 156 150 150 166 M200 96 C192 140 186 180 182 210 M248 160 C244 190 240 214 238 234"/></g>
    <path d="${mem}" fill="none" stroke="#ff9a5a" stroke-width="1.6" opacity=".7" filter="url(#wb)"/><path d="M196 74 L204 60 L210 76 Z" fill="#140c0e"/>`;
  return { ink: 3, id: 'wing', x: 130, y: 100, w: 230, h: 210, d: .3, svg: s, cls: 'cs-wing', ox: '91%', oy: '87%', vb: [90, 50] };
}
function csFire() {
  const s = `<defs><linearGradient id="fi" x1="0" y1="0" x2=".3" y2="1"><stop offset="0" stop-color="#fffbe0"/><stop offset=".25" stop-color="#ffd24a"/><stop offset=".6" stop-color="#ff7a1a" stop-opacity=".85"/><stop offset="1" stop-color="#c8301a" stop-opacity="0"/></linearGradient>
    <filter id="ff" x="-30%" y="-10%" width="160%" height="120%"><feTurbulence type="fractalNoise" baseFrequency=".04 .02" numOctaves="3" seed="5" result="t"/><feDisplacementMap in="SourceGraphic" in2="t" scale="24" xChannelSelector="R" yChannelSelector="G" result="d"/><feGaussianBlur in="d" stdDeviation="2.2"/></filter>
    <radialGradient id="fg"><stop offset="0" stop-color="#ffb050" stop-opacity=".55"/><stop offset="1" stop-color="#ff7a2a" stop-opacity="0"/></radialGradient></defs>
    <ellipse cx="466" cy="428" rx="90" ry="34" fill="url(#fg)"/>
    <path d="M478 204 C484 250 494 300 502 350 C508 386 504 412 488 424 C466 434 438 428 428 410 C436 380 452 320 466 270 C470 240 474 220 478 204 Z" fill="url(#fi)" filter="url(#ff)"/>
    <path d="M478 208 C482 250 488 300 492 340 C494 370 488 392 478 398 C468 396 462 380 464 350 C468 300 474 250 478 208 Z" fill="#fff6c8" opacity=".75" filter="url(#ff)"/>`;
  return { id: 'fire', x: 460, y: 240, w: 220, h: 300, d: .3, svg: s, cls: 'cs-fire', ox: '27%', oy: '5%', vb: [420, 190] };
}

/* ---------- chevaliers ---------- */
function csKnight(x, y, sc, col, opt = {}) {
  const st = 'stroke="#0c0a0c" stroke-width="1.2" stroke-linejoin="round"';
  const spear = opt.spear ? `<path d="M2 -40 L-30 -84" stroke="#3a2a1a" stroke-width="2.2"/><path d="M-30 -84 L-27 -94 L-36 -86 Z" fill="#d8d0c0"/>` : `<path d="M4 -34 L-20 -70" stroke="#c8c8d0" stroke-width="2.4"/><path d="M-20 -70 L-24 -78" stroke="#fff" stroke-width="1.4"/>`;
  return `<g transform="translate(${x} ${y}) scale(${sc})">
    <ellipse cx="0" cy="0" rx="12" ry="3" fill="#000" opacity=".5"/>
    <path d="M-6 0 L-5 -18 L-1 -18 L-1 0 Z M1 0 L1 -18 L5 -18 L7 0 Z" fill="#4a4a54" ${st}/>
    <path d="M-9 -16 L-7 -38 L7 -38 L9 -16 Z" fill="${col}" ${st}/><path d="M-1 -36 V-18" stroke="#f2c14e" stroke-width="1.5" opacity=".8"/>
    <path d="M-8 -38 L-12 -26 M8 -38 L10 -28" stroke="#6a6a74" stroke-width="4" stroke-linecap="round"/>
    ${spear}
    <path d="M-6 -38 C-7 -48 -4 -52 0 -52 C4 -52 7 -48 6 -38 Z" fill="#8a8a96" ${st}/><path d="M-6 -45 H4" stroke="#0c0a0c" stroke-width="1.6"/>
    ${opt.plume ? `<path d="M0 -52 C6 -60 12 -60 16 -56 C10 -56 6 -52 2 -50 Z" fill="${opt.plume}"/>` : ''}
    <path d="M-20 -40 L-8 -42 L-8 -28 C-8 -20 -14 -16 -16 -14 C-20 -18 -22 -24 -21 -32 Z" fill="${opt.shield || '#8a1e1a'}" ${st}/><path d="M-15 -39 V-18 M-20 -30 H-9" stroke="#f2c14e" stroke-width="1.6" opacity=".9"/>
    <path d="M-6 -50 C-7 -46 -7 -42 -6 -38" stroke="#ffb070" stroke-width="1.2" opacity=".8" fill="none"/>
  </g>`;
}
function csKnights() {
  let s = `<defs>${csBlur('kb', .5)}</defs>`;
  // chevalier à cheval, cabré
  s += `<g transform="translate(415 500)"><ellipse cx="0" cy="0" rx="26" ry="4" fill="#000" opacity=".5"/>
    <path d="M-20 -2 L-18 -22 M-12 -2 L-10 -22 M14 -26 L22 -40 M20 -24 L30 -36" stroke="#2a201c" stroke-width="4" stroke-linecap="round"/>
    <path d="M-24 -22 C-26 -34 -14 -40 4 -38 C14 -38 20 -44 24 -54 C28 -60 36 -62 40 -56 C42 -50 36 -46 32 -42 C28 -34 22 -24 10 -20 C0 -18 -16 -16 -24 -22 Z" fill="#3a2a22" stroke="#0c0a0c" stroke-width="1.2"/>
    <path d="M24 -54 C20 -60 22 -66 26 -64 M-24 -24 C-34 -22 -36 -14 -34 -8" stroke="#1a1210" stroke-width="3" fill="none"/>
    <path d="M-8 -38 L-6 -30 L4 -30 L6 -38 Z" fill="#1f4a8a"/>
    ${csKnight(-2, -32, .78, '#1f4a8a', { shield: '#1f4a8a', plume: '#c83a2a', spear: 1 })}</g>`;
  s += csKnight(462, 506, .85, '#8a1e1a', { plume: '#f2c14e' });
  s += csKnight(498, 512, .9, '#4a6a2a', { shield: '#9a7228', spear: 1 });
  s += csKnight(536, 504, .8, '#5a2a6a', { shield: '#5a2a6a', plume: '#e8e0d0' });
  s += csKnight(565, 515, .92, '#8a5a1a', { shield: '#8a1e1a', spear: 1 });
  // bannière plantée, déchirée
  s += `<g transform="translate(445 506)"><path d="M0 0 V-70" stroke="#3a2a1a" stroke-width="2.2"/><path d="M0 -70 L28 -64 L22 -58 L28 -50 L0 -48 Z" fill="#8a1e1a" stroke="#0c0a0c" stroke-width="1"/><path d="M6 -64 L20 -54 M20 -64 L6 -54" stroke="#f2c14e" stroke-width="2"/></g>`;
  return { ink: 1.6, id: 'kn', x: 360, y: 420, w: 240, h: 110, d: .34, svg: s, cls: 'cs-knights', vb: [360, 420] };
}

/* ---------- loups-garous ---------- */
function csWolf(id, x, y, H, flip, delay) {
  const pal = { w1: ['#8a6444', '#c8a07a', '#5e4430'], w2: ['#727a90', '#b8c0d4', '#4c5266'], w3: ['#5a5a6a', '#9a9aae', '#3a3a48'] }[id] || ['#727a90', '#b8c0d4', '#4c5266'];
  const [fur, light, dark] = pal, k = H / 120, w = 112 * k, L = csF(1.6 / k);
  const st = `stroke="#120a06" stroke-width="${L}" stroke-linejoin="round"`;
  const s = `<g transform="translate(${flip ? w : 0} ${csF(42 * k)}) scale(${flip ? -k : k} ${k})">
    <ellipse cx="46" cy="122" rx="30" ry="4" fill="#000" opacity=".35"/>
    <path d="M30 92 C14 90 6 76 10 62 C14 70 20 74 26 74 C22 66 24 58 30 54 C32 66 36 78 40 86 Z" fill="${dark}" ${st}/>
    <path d="M44 34 C38 44 36 54 38 62 L34 68 L39 67 L38 72 L43 68 L44 70 L45 62 C46 54 50 44 52 38 Z" fill="${dark}" ${st}/>
    <path d="M34 70 C26 80 28 94 36 100 L30 116 L22 118 L22 122 L44 122 L44 116 L40 114 L46 98 C52 90 50 76 44 68 Z" fill="${dark}" ${st}/>
    <path d="M32 74 C26 56 30 36 42 24 C50 16 62 14 70 20 C78 28 78 44 72 58 C68 70 60 80 48 82 C40 82 34 80 32 74 Z" fill="${fur}" ${st}/>
    <path d="M56 30 C66 30 72 40 70 52 C68 64 60 74 52 76 C56 64 58 50 56 30 Z" fill="${light}"/>
    <path d="M60 22 L66 30 L62 30 L68 38 L62 37 L66 46 L58 40 Z" fill="${light}" ${st}/>
    <path d="M54 74 C60 84 60 96 56 104 L58 116 L52 118 L52 122 L72 122 L70 116 L64 114 L66 102 C70 92 68 80 62 72 Z" fill="${fur}" ${st}/>
    <path d="M62 34 C70 40 76 50 78 60 L84 66 L80 67 L82 71 L77 69 L76 72 L72 64 C68 56 62 48 58 42 Z" fill="${fur}" ${st}/>
    <path d="M56 -6 L50 -22 L62 -12 Z M62 -10 L60 -26 L68 -12 Z" fill="${dark}" ${st}/><path d="M55 -9 L52 -17 L58 -12 Z M63 -12 L62 -20 L66 -13 Z" fill="#e8a0a8"/>
    <path d="M50 20 C46 8 50 -6 62 -10 C72 -12 80 -6 80 4 C80 12 74 20 66 24 Z" fill="${fur}" ${st}/>
    <path d="M50 12 L44 14 L50 18 L44 22 L54 22 Z" fill="${light}" ${st}/>
    <path d="M78 -1 L95 -22 L96 -9 L79 5 Z" fill="#8a1a2a"/><path d="M86 -8 Q90 -12 94 -12" stroke="#e8606a" stroke-width="${L}" fill="none"/>
    <path d="M70 -6 L92 -28 C96 -31 100 -27 97 -23 L80 0 Z" fill="${fur}" ${st}/>
    <path d="M76 4 L96 -10 C99 -11 100 -7 97 -5 L80 10 Z" fill="${light}" ${st}/>
    <path d="M86 -16 L88 -11 L90 -18 Z M90 -9 L92 -13 L94 -10 Z" fill="#fff" ${st}/>
    <circle cx="97" cy="-25" r="3.4" fill="#120a06"/><circle cx="96" cy="-26" r="1" fill="#fff"/>
    <path d="M64 -2 Q69 -7 74 -2" stroke="#120a06" stroke-width="${csF(2.2 / k)}" fill="none" stroke-linecap="round"/><path d="M63 -8 L72 -9" stroke="#120a06" stroke-width="${L}" stroke-linecap="round"/>
    <path d="M102 -34 q6 4 4 12 M107 -40 q9 6 7 20" stroke="#fff" stroke-width="${csF(2 / k)}" fill="none" stroke-linecap="round" opacity=".85"/>
  </g>`;
  return { ink: 2.2, id, x, y: y - 42 * H / 120, w, h: H * 166 / 120 + 4, d: .3, svg: s, cls: 'cs-howl', ox: '45%', oy: '100%', delay, vb: [0, 0] };
}

/* ---------- Squishys (gelées translucides) ---------- */
const CS_SQ = { feu: ['#ff6a2a', '#ffd08a', '#a8280a'], eau: ['#2a8ad8', '#bfe6ff', '#0a3a7a'], terre: ['#9a6a3a', '#e0c08a', '#4a2a10'], vent: ['#5ad0b8', '#d8fff4', '#1a6a5a'], glace: ['#8ac8f0', '#f4fcff', '#3a6a9a'], foudre: ['#f0c020', '#fff6b0', '#8a6a00'] };
function csSquishy(id, el, x, y, S, opt = {}) {
  const [c, l, d] = CS_SQ[el];
  const bodies = {
    feu: 'M50 14 C56 24 60 20 62 12 C72 26 80 42 80 60 C80 82 66 94 50 94 C34 94 20 82 20 60 C20 44 28 30 36 20 C40 28 44 30 46 24 Z',
    eau: 'M50 10 C58 30 82 46 82 66 C82 84 68 94 50 94 C32 94 18 84 18 66 C18 46 42 30 50 10 Z',
    terre: 'M28 38 C34 26 50 24 58 28 C70 24 82 34 82 50 C86 62 82 84 64 92 C54 96 40 96 30 90 C16 82 14 60 20 50 C20 44 24 40 28 38 Z',
    vent: 'M50 20 C66 20 80 32 80 52 C80 74 70 94 50 94 C30 94 20 74 20 52 C20 32 34 20 50 20 Z',
    glace: 'M30 26 L50 18 L70 26 L80 50 L78 80 L64 94 H36 L22 80 L20 50 Z',
    foudre: 'M50 22 C62 20 76 30 78 46 C84 50 82 58 78 60 C80 76 68 94 50 94 C32 94 20 76 22 60 C18 58 16 50 22 46 C24 30 38 20 50 22 Z'
  };
  const b = bodies[el], sc = S / 100;
  let extra = '';
  if (el === 'feu') extra = `<path d="M44 16 C40 2 50 -6 50 -14 C56 -4 62 2 56 16 Z" fill="#ffb03a" opacity=".9" filter="url(#sqb${id})"/><path d="M48 14 C46 6 50 2 51 -4 C54 4 56 8 53 14 Z" fill="#fff0b0"/>`;
  if (el === 'eau') extra = `<circle cx="40" cy="74" r="3" fill="#fff" opacity=".35"/><circle cx="58" cy="80" r="2" fill="#fff" opacity=".3"/><circle cx="50" cy="60" r="1.6" fill="#fff" opacity=".35"/>`;
  if (el === 'terre') extra = `<path d="M40 30 C38 22 42 18 44 22 M52 28 C52 18 58 16 58 24 M62 30 C64 24 68 24 66 30" stroke="#5a8a2a" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="34" cy="80" r="3" fill="#6a4a2a"/><circle cx="66" cy="84" r="2.4" fill="#6a4a2a"/>`;
  if (el === 'vent') extra = `<path d="M8 50 C20 40 30 46 26 54 M86 40 C96 46 94 58 84 58 M14 72 C24 66 28 74 22 78" stroke="#e8fff8" stroke-width="2" fill="none" opacity=".6" stroke-linecap="round"/>`;
  if (el === 'glace') extra = `<path d="M30 26 L44 50 L70 26 M44 50 L36 94 M44 50 L80 50" stroke="#fff" stroke-width="1.2" opacity=".45" fill="none"/><path d="M74 20 l2 5 l5 2 l-5 2 l-2 5 l-2 -5 l-5 -2 l5 -2 Z" fill="#fff" opacity=".9"/>`;
  if (el === 'foudre') extra = `<path d="M14 40 L22 46 L16 50 L26 58 M86 36 L78 44 L86 46 L76 56" stroke="#f4fbff" stroke-width="2" fill="none" filter="url(#sqb${id})"/><path d="M14 40 L22 46 L16 50 L26 58 M86 36 L78 44 L86 46 L76 56" stroke="#9adfff" stroke-width="1" fill="none"/>`;
  const s = `<defs><radialGradient id="sqg${id}" cx=".38" cy=".3" r=".75"><stop offset="0" stop-color="${l}"/><stop offset=".45" stop-color="${c}"/><stop offset="1" stop-color="${d}"/></radialGradient>
    <radialGradient id="sqi${id}" cx=".5" cy=".72" r=".4"><stop offset="0" stop-color="${l}" stop-opacity=".55"/><stop offset="1" stop-color="${l}" stop-opacity="0"/></radialGradient>
    ${csBlur('sqb' + id, 1.6)}${csBlur('sqs' + id, 4)}</defs>
    <g transform="translate(${csF(S * .1)} ${csF(S * .15)}) scale(${csF(sc)})">
    <ellipse cx="50" cy="96" rx="30" ry="6" fill="#000" opacity="${opt.water ? .0 : .45}" filter="url(#sqs${id})"/>
    ${opt.water ? `<ellipse cx="50" cy="86" rx="46" ry="8" fill="none" stroke="#c8d8ff" stroke-width="1.6" opacity=".45"/><ellipse cx="50" cy="88" rx="62" ry="11" fill="none" stroke="#c8d8ff" stroke-width="1" opacity=".25"/>` : ''}
    <path d="${b}" fill="url(#sqg${id})" opacity=".93"/><path d="${b}" fill="url(#sqi${id})"/>
    <path d="${b}" fill="none" stroke="${l}" stroke-width="1.6" opacity=".55"/>
    ${extra}
    <ellipse cx="36" cy="40" rx="11" ry="7" fill="#fff" opacity=".75" transform="rotate(-25 36 40)" filter="url(#sqb${id})"/><circle cx="30" cy="36" r="3" fill="#fff"/>
    <g><ellipse cx="41" cy="58" rx="5.5" ry="7.5" fill="#120c10"/><ellipse cx="61" cy="58" rx="5.5" ry="7.5" fill="#120c10"/><circle cx="39.5" cy="55" r="2.2" fill="#fff"/><circle cx="59.5" cy="55" r="2.2" fill="#fff"/><circle cx="42.5" cy="61" r="1" fill="#fff" opacity=".7"/><circle cx="62.5" cy="61" r="1" fill="#fff" opacity=".7"/></g>
    <path d="M45 70 Q51 75 57 70" stroke="#120c10" stroke-width="2.2" fill="none" stroke-linecap="round"/>
    ${opt.water ? `<rect x="0" y="86" width="100" height="20" fill="#1a2040" opacity=".6"/>` : ''}
    </g>`;
  return { ink: 2.6, id, x: x - S * .6, y: y - S * 1.15, w: S * 1.2, h: S * 1.25, vb: [0, 0], d: opt.d || .42, svg: s, cls: opt.cls || 'cs-sq', ox: '50%', oy: '92%', delay: opt.delay || 0 };
}
function csBall() {
  const s = `<defs><radialGradient id="bl" cx=".35" cy=".3" r=".75"><stop offset="0" stop-color="#fff"/><stop offset=".7" stop-color="#d8d4cc"/><stop offset="1" stop-color="#8a867e"/></radialGradient></defs>
    <circle cx="10" cy="10" r="8" fill="url(#bl)"/><path d="M10 6 L13.5 8.5 L12 12.5 H8 L6.5 8.5 Z" fill="#1a1a1a"/><path d="M3 9 L5 11 M17 9 L15 11 M10 18 V15" stroke="#1a1a1a" stroke-width="1.6"/>`;
  return { ink: 1.1, id: 'ball', x: 452, y: 560, w: 20, h: 20, d: .42, svg: s, cls: 'cs-ball', vb: [0, 0] };
}

/* ---------- le pont-levis ---------- */
function csBridge() {
  const { W, L } = CS.BR, r = csRnd(71);
  let s = `<defs>${csGrain('g7', .18, .006, .55, 17)}
    <linearGradient id="wd" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a4a2e"/><stop offset=".6" stop-color="#5a3c24"/><stop offset="1" stop-color="#3a2614"/></linearGradient>
    <linearGradient id="ir" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a4a50"/><stop offset=".5" stop-color="#2a2a30"/><stop offset="1" stop-color="#1a1a1e"/></linearGradient></defs>`;
  let planks = '';
  for (let x = 0; x < W; x += 62) { const t = r(); planks += `<rect x="${x + 1.5}" y="0" width="59" height="${L}" fill="${t < .3 ? '#9a6636' : t < .6 ? '#a8723c' : '#8a5a30'}" stroke="#1a0c04" stroke-width="4"/><path d="M${x + 18} 40 q8 160 0 320 M${x + 40} 420 q-6 140 0 300" stroke="#6a4020" stroke-width="3" fill="none"/>`; }
  s += `<g filter="url(#g7)"><rect width="${W}" height="${L}" fill="url(#wd)" opacity=".6"/>${planks}</g><rect width="${W}" height="${L}" fill="url(#wd)" opacity=".2"/>`;
  [70, 370, 670].forEach(y => { s += `<rect x="0" y="${y}" width="${W}" height="30" fill="#4a4a54" stroke="#120a06" stroke-width="5"/><path d="M0 ${y + 1} H${W}" stroke="#8a8a90" stroke-width="1.5" opacity=".6"/>`; for (let x = 31; x < W; x += 62) s += `<circle cx="${x}" cy="${y + 15}" r="5" fill="#5a5a60" stroke="#141418" stroke-width="2"/>`; });
  s += `<rect x="0" y="0" width="30" height="${L}" fill="#3a2614"/><rect x="${W - 30}" y="0" width="30" height="${L}" fill="#3a2614"/>`;
  s += `<circle cx="70" cy="40" r="16" fill="none" stroke="#2a2a30" stroke-width="8"/><circle cx="${W - 70}" cy="40" r="16" fill="none" stroke="#2a2a30" stroke-width="8"/>`;
  return { id: 'bridge', x: 0, y: 0, w: W, h: L, svg: s, vb: [0, 0], bridge: 1 };
}

/* ---------- l'intérieur de la cathédrale (premier plan) ---------- */
function csFrame() {
  const r = csRnd(91), VX = CS.VX, VY = CS.VY;
  let s = `<defs>${csGrain('g8', .04, .04, .55, 23)}
    <clipPath id="cw"><path d="M-30 -30 H1630 V930 H-30 Z ${CS_OPEN}" clip-rule="evenodd"/></clipPath>
    <radialGradient id="tl" cx="40" cy="300" r="560" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ffb060" stop-opacity=".5"/><stop offset=".35" stop-color="#ff8a3a" stop-opacity=".18"/><stop offset="1" stop-color="#ff8a3a" stop-opacity="0"/></radialGradient>
    <radialGradient id="tr" cx="1560" cy="300" r="560" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ffb060" stop-opacity=".5"/><stop offset=".35" stop-color="#ff8a3a" stop-opacity=".18"/><stop offset="1" stop-color="#ff8a3a" stop-opacity="0"/></radialGradient>
    <radialGradient id="dk" cx="800" cy="450" r="1000" gradientUnits="userSpaceOnUse"><stop offset=".5" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".6"/></radialGradient>
    <linearGradient id="col" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#2a2224"/><stop offset=".45" stop-color="#5a4c48"/><stop offset="1" stop-color="#241c1e"/></linearGradient></defs>`;
  const cell = (pts, fill) => `<path d="M${pts.map(p => csF(p[0]) + ' ' + csF(p[1])).join('L')}Z" fill="${fill}" stroke="#0c0806" stroke-width="4" stroke-linejoin="round"/>`;
  const proj = (x0, y0, t) => [VX + (x0 - VX) * t, VY + (y0 - VY) * t];
  const tone = () => { const v = r(); return v < .33 ? '#5a4a4c' : v < .66 ? '#665450' : '#4e4044'; };
  const depthT = [1.06, 1.18, 1.32, 1.5, 1.74, 2.06, 2.56, 3.3];
  let st = '';
  [170, 1430].forEach(ex => { for (let y = 40; y < 840; y += 48) for (let k = 0; k < depthT.length - 1; k++) st += cell([proj(ex, y, depthT[k]), proj(ex, y, depthT[k + 1]), proj(ex, y + 48, depthT[k + 1]), proj(ex, y + 48, depthT[k])], tone()); });
  for (let x = 170; x < 1430; x += 70) for (let k = 0; k < depthT.length - 1; k++) { const y1 = csArchY(x) - 60, y2 = csArchY(Math.min(1430, x + 70)) - 60; st += cell([proj(x, y1, depthT[k]), proj(x + 70, y2, depthT[k]), proj(x + 70, y2, depthT[k + 1]), proj(x, y1, depthT[k + 1])], tone()); }
  for (let x = 170; x < 1430; x += 90) for (let k = 0; k < depthT.length - 1; k++) st += cell([proj(x, 800, depthT[k]), proj(x + 90, 800, depthT[k]), proj(x + 90, 800, depthT[k + 1]), proj(x, 800, depthT[k + 1])], k % 2 ? '#463c3e' : '#504446');
  s += `<g clip-path="url(#cw)"><rect x="-30" y="-30" width="1660" height="960" fill="#3a3034"/><g filter="url(#g8)">${st}</g>
    <rect x="-30" y="-30" width="1660" height="960" fill="url(#tl)"/><rect x="-30" y="-30" width="1660" height="960" fill="url(#tr)"/><rect x="-30" y="-30" width="1660" height="960" fill="url(#dk)"/></g>`;
  // voussures sculptées du portail
  const ring = (o, w, c, dash) => `<path d="M${170 - o} 820 V300 A${630 + o} ${230 + o} 0 0 1 ${1430 + o} 300 V820" fill="none" stroke="${c}" stroke-width="${w}" ${dash ? `stroke-dasharray="${dash}"` : ''}/>`;
  s += `<g clip-path="url(#cw)">${ring(64, 26, '#2e2628')}${ring(64, 14, '#4a3e3c', '3 9')}${ring(40, 22, '#3e3434')}${ring(40, 10, '#5a4c48', '10 6')}${ring(16, 24, '#4a3e3c')}${ring(16, 2, '#d8a080')}${ring(76, 4, '#0c0806')}${ring(52, 4, '#0c0806')}${ring(28, 4, '#0c0806')}${ring(4, 4, '#0c0806')}</g>`;
  // colonnes et chapiteaux
  [[124, 1], [1476, -1]].forEach(([x]) => { s += `<rect x="${x - 22}" y="300" width="44" height="560" fill="url(#col)" stroke="#0c0806" stroke-width="4"/><path d="M${x - 34} 300 h68 l-8 -26 h-52 Z" fill="#6a5a54" stroke="#0c0806" stroke-width="4"/><path d="M${x - 26} 284 q26 -18 52 0" stroke="#6a5a54" stroke-width="3" fill="none"/>`; });
  // torchères hautes
  const sconce = x => `<g transform="translate(${x} 300)"><path d="M0 40 L0 0 M-14 0 H14" stroke="#141214" stroke-width="5"/><path d="M-10 0 L-6 -46 H6 L10 0 Z" fill="#3a2414" stroke="#0c0606" stroke-width="2"/><path d="M-10 -46 H10 L8 -52 H-8 Z" fill="#141214"/></g>`;
  s += sconce(40) + sconce(1560);
  return { id: 'frame', x: -30, y: -30, w: 1660, h: 960, d: 1, svg: s, big: 1 };
}

/* ---------- les battants de la porte ---------- */
function csLeaf(right) {
  const r = csRnd(right ? 133 : 131);
  let g = '';
  for (let x = 170; x < 800; x += 52) { const t = r(); g += `<rect x="${x}" y="40" width="52" height="780" fill="${t < .33 ? '#8a5a30' : t < .66 ? '#9a6636' : '#7e522c'}" stroke="#1a0c04" stroke-width="3"/><path d="M${x + 14} 60 q6 120 0 240 M${x + 34} 340 q-5 140 0 280" stroke="#5a3418" stroke-width="2.5" fill="none" stroke-linecap="round"/>`; }
  const panel = (x, y, w, h) => `<path d="M${x} ${y + h} V${y + 40} Q${x} ${y} ${x + w / 2} ${y - 16} Q${x + w} ${y} ${x + w} ${y + 40} V${y + h} Z" fill="#6a4020" stroke="#120804" stroke-width="5"/><path d="M${x + 12} ${y + h - 10} V${y + 44} Q${x + 12} ${y + 14} ${x + w / 2} ${y} Q${x + w - 12} ${y + 14} ${x + w - 12} ${y + 44} V${y + h - 10} Z" fill="#54321a" stroke="#120804" stroke-width="3"/><path d="M${x + 18} ${y + 50} Q${x + 18} ${y + 22} ${x + w / 2} ${y + 8}" stroke="#c88a50" stroke-width="3" fill="none" stroke-linecap="round" opacity=".7"/><path d="M${x + w / 2} ${y + 6} V${y + h - 12} M${x + 14} ${y + h / 2 + 10} H${x + w - 14}" stroke="#1a0e06" stroke-width="2" opacity=".6"/>`;
  g += panel(240, 300, 220, 190) + panel(520, 300, 220, 190) + panel(240, 580, 220, 160) + panel(520, 580, 220, 160);
  [260, 540, 770].forEach(y => g += `<rect x="170" y="${y - 14}" width="630" height="28" fill="#5a3418" stroke="#120804" stroke-width="4"/>${Array.from({ length: 12 }, (_, k) => `<circle cx="${200 + k * 50}" cy="${y}" r="6" fill="#9a9aa4" stroke="#120804" stroke-width="2.5"/><circle cx="${198 + k * 50}" cy="${y - 2}" r="2" fill="#fff" opacity=".7"/>`).join('')}`);
  // pentures en fer forgé
  [190, 450, 700].forEach(y => g += `<path d="M170 ${y} H560 q34 0 40 -22 q6 -22 -16 -26 q-18 0 -16 16 M560 ${y} q34 0 40 22 q6 22 -16 26 q-18 0 -16 -16" stroke="#141216" stroke-width="18" fill="none" stroke-linecap="round"/><path d="M170 ${y - 6} H550" stroke="#5a5a62" stroke-width="2" opacity=".55"/><path d="M380 ${y} q20 -40 60 -44 M380 ${y} q20 40 60 44" stroke="#141216" stroke-width="8" fill="none" stroke-linecap="round"/>`);
  // heurtoir
  g += `<circle cx="720" cy="490" r="20" fill="#2a2a30" stroke="#0c0a0c" stroke-width="2"/><path d="M712 486 l8 -8 l8 8 M710 496 q10 8 20 0" stroke="#7a7a82" stroke-width="2" fill="none"/><circle cx="720" cy="530" r="28" fill="none" stroke="#141216" stroke-width="9"/><circle cx="720" cy="530" r="28" fill="none" stroke="#7a7a82" stroke-width="2" opacity=".6"/>`;
  g += `<rect x="786" y="40" width="14" height="780" fill="#2a1a0e"/><rect x="170" y="40" width="12" height="780" fill="#2a1a0e"/>`;
  const s = `<defs>${csGrain('gl' + (right ? 'r' : 'l'), .16, .008, .5, right ? 19 : 18)}<clipPath id="lc"><path d="M170 800 V300 A630 230 0 0 1 800 70 V800 Z"/></clipPath>
    <linearGradient id="ls" x1="0" y1="0" x2="1" y2="0">${csSteps([[0, "#ffb070", .2], [.6, "#000000", 0], [1, "#000000", .32]], 4)}</linearGradient></defs>
    <g clip-path="url(#lc)"${right ? ' transform="translate(1600 0) scale(-1 1)"' : ''}><g filter="url(#gl${right ? 'r' : 'l'})">${g}</g><rect x="170" y="40" width="630" height="780" fill="url(#ls)"/></g>`;
  return { id: right ? 'leafR' : 'leafL', x: right ? 800 : 170, y: 70, w: 630, h: 730, svg: s, leaf: right ? 1 : -1 };
}

/* ---------- l'ogre et le mort-vivant, portiers terrifiants (et ravis) ---------- */
function csOgre() {
  // l'ogre fourni par l'utilisateur (image détourée), main libre tendue vers la corde
  const k = 700 / 720 * (720 / 1080) * (1080 / 720);
  return { id: 'ogre', img: typeof CS_OGRE_IMG !== 'undefined' ? CS_OGRE_IMG : '', x: -70, y: 262, w: 566, h: 700, d: .9, hand: [-70 + 760 * .648, 262 + 752 * .648], origin: [222, 960] };
}
function csUndead() {
  // le zombie fourni par l'utilisateur (SVG), bras tendu vers la corde
  const h = 780, w = h * 326.58 / 973.63, x = 1255, y = 215;
  return { id: 'undead', raw: typeof CS_ZOMBIE_SVG !== 'undefined' ? CS_ZOMBIE_SVG : '', x, y, w, h, d: .9, hand: [x + w * .64, y + h * .655], origin: [x + w * .5, y + h * .99], flip: 1 };
}

/* ---------- la fête ---------- */
const CS_PARTY = [['p_pilleur', 400, 560, 70], ['v_chauve', 470, 470, 52], ['n_heraut', 520, 548, 62], ['tk_chaton', 360, 600, 48], ['v_ecuyer', 570, 590, 64], ['s_lueur', 1060, 520, 60], ['m_squelette', 1180, 560, 66], ['b_chat', 1100, 596, 58], ['n_garde', 1240, 600, 62], ['d_mineur', 700, 590, 62], ['c_fiole', 900, 590, 52], ['m_goule', 760, 540, 60], ['g_villageois', 860, 545, 60], ['b_cerf', 820, 516, 64], ['p_second', 640, 548, 60], ['s_murmure', 980, 540, 58],
  ['d_brasseur', 480, 694, 118], ['n_tambour', 1122, 694, 118], ['b_chiot', 575, 640, 76], ['g_alpha', 1030, 642, 84]];
function csSharedDefs() {
  const seen = new Set(); let out = '';
  document.querySelectorAll('defs > linearGradient, defs > radialGradient, defs > filter').forEach(n => { if (!n.id || seen.has(n.id) || n.closest('#scene')) return; seen.add(n.id); out += n.outerHTML; });
  return out;
}
function csCreature(id, x, y, S, k) {
  return { id: 'pc' + k, x: x - S * .65, y: y - S * 1.2, w: S * 1.3, h: S * 1.3, vb: [-15, -15], vw: 130, d: S > 70 ? .7 : .42, near: S > 70, svg: (typeof ART !== 'undefined' && ART[id] ? ART[id]() : ''), cls: 'cs-dance', ox: '50%', oy: '90%', delay: -(k * .37 % 1.6), shared: 1 };
}
function csFireworks() {
  return [['#ffd24a', 520, 150, 70], ['#ff5a8a', 1060, 120, 80], ['#6ad8ff', 760, 90, 60], ['#9aff6a', 1180, 200, 54], ['#ff9a3a', 420, 230, 50]].map(([c, x, y, R], k) => {
    let rays = ''; for (let i = 0; i < 24; i++) { const a = i / 24 * Math.PI * 2; rays += `<path d="M${csF(Math.cos(a) * R * .2 + R)} ${csF(Math.sin(a) * R * .2 + R)} L${csF(Math.cos(a) * R * .95 + R)} ${csF(Math.sin(a) * R * .95 + R)}"/><circle cx="${csF(Math.cos(a) * R + R)}" cy="${csF(Math.sin(a) * R + R)}" r="2.4"/>`; }
    const s = `<defs>${csBlur('fwb', 2)}<radialGradient id="fwg"><stop offset="0" stop-color="${c}" stop-opacity=".45"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient></defs><circle cx="${R}" cy="${R}" r="${R}" fill="url(#fwg)"/><g stroke="${c}" fill="#fff" stroke-width="2" stroke-linecap="round" filter="url(#fwb)">${rays}</g><g stroke="#fff" fill="#fff" stroke-width=".8" opacity=".8">${rays}</g>`;
    return { id: 'fw' + k, x: x - R - 24, y: y - R - 24, w: R * 2 + 48, h: R * 2 + 48, vb: [-24, -24], d: .1, svg: s, cls: 'cs-fw', delay: -(k * 1.3) };
  });
}

/* ---------- fond sobre : intérieur de taverne cartoon (fixe) ---------- */
function csTavernBg() {
  const O = 'stroke="#120a06" stroke-width="5" stroke-linejoin="round"', r = csRnd(77);
  let s = '';
  for (let x = 0; x < 1600; x += 80) { const t = r(); s += `<rect x="${x}" y="0" width="80" height="640" fill="${t < .33 ? '#7a4a26' : t < .66 ? '#84522b' : '#6e4222'}" ${O}/><path d="M${x + 22} ${40 + r() * 60} q8 120 0 240 M${x + 54} ${320 + r() * 60} q-6 110 0 220" stroke="#4e2c14" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="${x + 40}" cy="${150 + r() * 380}" r="5" fill="#4e2c14"/>`; }
  for (let y = 640; y < 770; y += 40) s += `<rect x="-10" y="${y}" width="1620" height="40" fill="${y % 80 ? '#5a3418' : '#643a1c'}" ${O}/>`;
  s += `<path d="M0 770 H1600 V900 H0 Z" fill="#6a3e1e" ${O}/>` + Array.from({ length: 17 }, (_, k) => `<path d="M${800 + (k * 100 - 800) * .8} 770 L${800 + (k * 100 - 800) * 1.6} 900" stroke="#120a06" stroke-width="4"/>`).join('') + `<path d="M0 830 H1600" stroke="#120a06" stroke-width="4"/>`;
  s += `<rect x="-10" y="70" width="1620" height="56" fill="#4a2a14" ${O}/><path d="M0 84 H1600" stroke="#7a4a26" stroke-width="4"/>`;
  [110, 1490].forEach(x => s += `<rect x="${x - 26}" y="0" width="52" height="780" fill="#55301a" ${O}/><path d="M${x - 12} 140 V760" stroke="#7a4a26" stroke-width="4"/>`);
  const mug = (x, y) => `<g transform="translate(${x} ${y})"><path d="M-16 0 V-38 H16 V0 Z" fill="#d89a3a" ${O}/><path d="M16 -30 q16 0 16 12 q0 12 -16 12" fill="none" ${O}/><path d="M-20 -38 q6 -12 14 -6 q6 -10 14 -2 q8 -6 12 6 Z" fill="#fff6e0" ${O}/><path d="M-8 -30 V-8" stroke="#fff3c0" stroke-width="4" stroke-linecap="round"/></g>`;
  const bottle = (x, y, c) => `<g transform="translate(${x} ${y})"><path d="M-12 0 V-40 Q-12 -52 -5 -56 V-72 H5 V-56 Q12 -52 12 -40 V0 Z" fill="${c}" ${O}/><rect x="-6" y="-80" width="12" height="9" fill="#8a5a30" ${O}/><path d="M-5 -40 V-12" stroke="#fff" stroke-width="3" opacity=".5" stroke-linecap="round"/></g>`;
  const shelf = (x0, x1, y) => `<rect x="${x0}" y="${y}" width="${x1 - x0}" height="18" fill="#4a2a14" ${O}/><path d="M${x0 + 20} ${y + 18} l18 30 M${x1 - 20} ${y + 18} l-18 30" ${O}/>`;
  s += shelf(160, 470, 360) + mug(200, 360) + mug(260, 360) + bottle(330, 360, '#3a7a4a') + bottle(375, 360, '#8a2a2a') + mug(430, 360);
  s += shelf(1130, 1440, 360) + bottle(1170, 360, '#3a5a9a') + mug(1225, 360) + bottle(1285, 360, '#9a6a1a') + mug(1340, 360) + bottle(1395, 360, '#5a2a6a');
  const barrel = (x, y, w, h) => `<g transform="translate(${x} ${y})"><rect x="${-w / 2}" y="${-h}" width="${w}" height="${h}" rx="${w * .3}" fill="#8a5428" ${O}/><path d="M${-w / 2 + 4} ${-h * .25} Q0 ${-h * .2} ${w / 2 - 4} ${-h * .25} M${-w / 2 + 4} ${-h * .75} Q0 ${-h * .7} ${w / 2 - 4} ${-h * .75}" fill="none" stroke="#2a2a30" stroke-width="9"/><path d="M${-w / 4} ${-h + 8} V-8" stroke="#a8703a" stroke-width="5" stroke-linecap="round"/></g>`;
  s += barrel(230, 790, 120, 150) + barrel(1370, 790, 120, 150) + barrel(1470, 800, 100, 130);
  const lantern = x => `<g transform="translate(${x} 126)"><path d="M0 0 V70" stroke="#120a06" stroke-width="5"/><circle cx="0" cy="104" r="90" fill="#ffc870" opacity=".14"/><path d="M-18 70 H18 L14 124 H-14 Z" fill="#ffd27a" ${O}/><path d="M-22 66 H22 M-18 128 H18" stroke="#120a06" stroke-width="8" stroke-linecap="round"/><path d="M0 80 V114" stroke="#fff6d0" stroke-width="5" stroke-linecap="round"/></g>`;
  s += lantern(560) + lantern(1040);
  return `<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><radialGradient id="tbg" cx="50%" cy="40%" r="75%"><stop offset="0" stop-color="#ffb060" stop-opacity=".22"/><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".55"/></radialGradient></defs>${s}<rect width="1600" height="900" fill="url(#tbg)"/></svg>`;
}

/* ---------- assemblage ---------- */
function csLayers() {
  return [csSky(), csMountains(), csRocks(), csField(),
    csWolf('w1', 1120, 356, 90, 1, -1.2), csWolf('w2', 1186, 278, 118, 0, 0), csWolf('w3', 1300, 352, 92, 0, -2.4),
    csDragon(), csDragonWing(), csFire(), csKnights(),
    csSquishy('s1', 'terre', 380, 578, 52, { delay: -.4 }), csSquishy('s2', 'feu', 470, 590, 56, { delay: -1.1 }), csSquishy('s3', 'eau', 540, 562, 46, { delay: -.2 }),
    csSquishy('s4', 'glace', 1080, 590, 56, { delay: -.8 }), csSquishy('s5', 'foudre', 1150, 566, 48, { delay: -1.6 }), csSquishy('s6', 'vent', 1218, 572, 50, { delay: -.5 }),
    csBall(), csMoat(), ...csFireworks(), ...CS_PARTY.filter(c => typeof ART !== 'undefined' && ART[c[0]]).map((c, k) => csCreature(c[0], c[1], c[2], c[3], k)),
    csSquishy('s7', 'eau', 300, 720, 78, { water: 1, cls: 'cs-float', d: .6 }), csSquishy('s8', 'glace', 1320, 716, 74, { water: 1, cls: 'cs-float', d: .6, delay: -2 })];
}
const csWrap = (L, R, extra = '') => {
  const vb = L.vb ? [L.vb[0], L.vb[1], L.vw || L.w, L.vw ? L.vw * L.h / L.w : L.h] : [L.x, L.y, L.w, L.h];
  const body = L.ink && CS_TOON ? `<defs>${csInk(L.ink)}</defs><g filter="url(#ink)">${L.svg}</g>` : L.svg;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${Math.round(L.w * R)}" height="${Math.round(L.h * R)}" viewBox="${vb.join(' ')}">${extra ? `<defs>${extra}</defs>` : ''}${body}</svg>`;
};
function csFixVB(L) { return L; }
async function csRaster(L, R, extra) {
  const svg = L.raw ? L.raw.replace('<svg ', `<svg width="${Math.round(L.w * R)}" height="${Math.round(L.h * R)}" `) : csWrap(L, R, extra), url = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  const im = new Image(); im.src = url;
  try { await im.decode(); } catch (e) { return url; }
  try {
    const c = document.createElement('canvas'); c.width = Math.max(1, Math.round(L.w * R)); c.height = Math.max(1, Math.round(L.h * R));
    c.getContext('2d').drawImage(im, 0, 0, c.width, c.height);
    const b = await new Promise(res => c.toBlob(res, 'image/png'));
    return b ? URL.createObjectURL(b) : url;
  } catch (e) { return url; }
}
function csQuad(th) {
  const { cx, W, L, Yb, p } = CS.BR, z = L * Math.sin(th), sc = p / (p + z), yt = Yb - L * Math.cos(th);
  const P = x => [CS.VX + (x - CS.VX) * sc, CS.VY + (yt - CS.VY) * sc];
  return [P(cx - W / 2), P(cx + W / 2), [cx + W / 2, Yb], [cx - W / 2, Yb]];
}
// un point d'un battant (pivot sur le jambage), ouvert de phi vers nous
function csLeafPt(x, y, phi, right) {
  const h = right ? 1430 : 170, d = Math.abs(x - h), xr = h + (right ? -1 : 1) * d * Math.cos(phi), z = -d * Math.sin(phi), s = CS.BR.p / (CS.BR.p + z);
  return [CS.VX + (xr - CS.VX) * s, CS.VY + (y - CS.VY) * s];
}
function csMatrix(w, h, q) {
  const [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = q;
  const dx1 = x1 - x2, dx2 = x3 - x2, dx3 = x0 - x1 + x2 - x3, dy1 = y1 - y2, dy2 = y3 - y2, dy3 = y0 - y1 + y2 - y3;
  let g = 0, hh = 0; const den = dx1 * dy2 - dx2 * dy1;
  if (Math.abs(den) > 1e-9) { g = (dx3 * dy2 - dx2 * dy3) / den; hh = (dx1 * dy3 - dx3 * dy1) / den; }
  const a = x1 - x0 + g * x1, b = x3 - x0 + hh * x3, c = x0, d = y1 - y0 + g * y1, e = y3 - y0 + hh * y3, f = y0;
  return `matrix3d(${[a / w, d / w, 0, g / w, b / h, e / h, 0, hh / h, 0, 0, 1, 0, c, f, 0, 1].map(v => +v.toFixed(8)).join(',')})`;
}
function castleScene(el) {
  if (el.dataset.cs) return; el.dataset.cs = '1';
  const lite = document.documentElement.classList.contains('lite');
  el.innerHTML = `<div class="cs-stage"><div class="cs-sky0"></div><div class="cs-glow cs-gl"></div><div class="cs-glow cs-gr"></div></div><div class="cs-vig"></div>`;
  const stage = el.firstChild;
  let zoom = 1;
  const fit = () => { const s = Math.max(innerWidth / CS.W, innerHeight / CS.H); stage.style.transform = `translate(-50%,-50%) scale(${(s * zoom).toFixed(4)})`; return s; };
  const s0 = fit(); addEventListener('resize', fit);
  const dpr = Math.min(2, devicePixelRatio || 1), R = Math.max(.5, Math.min(lite ? .9 : 1.6, s0 * dpr * (lite ? .8 : 1)));
  const Ls = csLayers();
  const byId = {}; Ls.forEach(L => byId[L.id] = L);
  byId.bridge = csBridge(); byId.frame = csFrame(); byId.leafL = csLeaf(0); byId.leafR = csLeaf(1); byId.ogre = csOgre(); byId.undead = csUndead();
  const fw = Ls.filter(L => /^fw/.test(L.id)).map(L => L.id), pc = Ls.filter(L => /^pc/.test(L.id) && !L.near).map(L => L.id), pcn = Ls.filter(L => /^pc/.test(L.id) && L.near).map(L => L.id);
  const order = ['sky', ...fw, 'mnt', 'rock', 'w1', 'w2', 'w3', 'field', 'kn', 'dragon', 'wing', 'fire', 's1', 's2', 's3', 's4', 's5', 's6', ...pc, 'ball', 'confetti', 'moat', 's7', 's8', 'bridge', ...pcn, 'confetti2', 'frame', 'leafL', 'leafR', 'beam', 'ropes', 'ogre', 'undead'];
  const slots = {};
  order.forEach((id, z) => {
    const L = byId[id], w = document.createElement('div');
    w.className = 'cs-p'; w.style.zIndex = z + 2; w.style.setProperty('--d', L ? (L.leaf ? 1 : L.d) : (id === 'confetti' ? .42 : id === 'confetti2' ? .7 : 1));
    if (id === 'ropes') w.innerHTML = `<svg class="cs-ov" viewBox="0 0 1600 900" width="1600" height="900"><g fill="none" stroke-linecap="round"><path id="cs-r1" stroke="#3a2a18" stroke-width="9"/><path id="cs-r2" stroke="#3a2a18" stroke-width="9"/><path id="cs-r1b" stroke="#8a6a3a" stroke-width="3" stroke-dasharray="5 7"/><path id="cs-r2b" stroke="#8a6a3a" stroke-width="3" stroke-dasharray="5 7"/></g></svg>`;
    if (id === 'beam') w.innerHTML = `<svg class="cs-ov" viewBox="0 0 1600 900" width="1600" height="900"><defs><linearGradient id="cs-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd8a0" stop-opacity=".0"/><stop offset=".5" stop-color="#ffc070" stop-opacity=".22"/><stop offset="1" stop-color="#ffb060" stop-opacity=".5"/></linearGradient><filter id="cs-sb" x="-50%" y="-10%" width="200%" height="120%"><feGaussianBlur stdDeviation="3"/></filter></defs><path id="cs-beam" fill="url(#cs-bg)"/><path id="cs-seam" d="M800 90 V800" stroke="#ffd08a" stroke-width="5" filter="url(#cs-sb)"/></svg>`;
    if (id === 'confetti' || id === 'confetti2') { const near = id === 'confetti2'; const cols = ['#ff5a5a', '#ffd24a', '#5ad0ff', '#9aff6a', '#ff8ad8', '#ffffff']; const r = csRnd(near ? 6 : 5); let h = ''; for (let k = 0; k < (lite ? 14 : 40); k++) h += `<i class="cs-cf${near ? ' n' : ''}" style="left:${csF((near ? 380 : 340) + r() * (near ? 840 : 920))}px;top:${csF((near ? 470 : 380) + r() * 60)}px;background:${cols[k % 6]};animation-duration:${csF(2.6 + r() * 2.4)}s;animation-delay:-${csF(r() * 5)}s"></i>`; w.innerHTML = h; }
    stage.appendChild(w); slots[id] = w;
  });
  const imgs = {};
  const mk = (L, url) => {
    const im = document.createElement('img'); im.alt = ''; im.decoding = 'async'; im.src = url; im.draggable = false;
    if (L.bridge || L.leaf) { im.className = 'cs-l cs-q'; im.style.width = L.w + 'px'; im.style.height = L.h + 'px'; }
    else {
      im.className = 'cs-l' + (L.cls ? ' ' + L.cls : '');
      Object.assign(im.style, { left: L.x + 'px', top: L.y + 'px', width: L.w + 'px', height: L.h + 'px' });
      if (L.ox) im.style.transformOrigin = `${L.ox} ${L.oy}`;
      if (L.origin) im.style.transformOrigin = `${L.origin[0] - L.x}px ${L.origin[1] - L.y}px`;
      if (L.delay) im.style.animationDelay = L.delay + 's';
    }
    slots[L.id].appendChild(im); imgs[L.id] = im;
  };
  // pont baissé (fixe) et porte : angle phi des battants (0 = fermée)
  let phi = 0, lean = 0;
  const rot = (P, O, a) => { const c = Math.cos(a), s = Math.sin(a); return [O[0] + (P[0] - O[0]) * c - (P[1] - O[1]) * s, O[1] + (P[0] - O[0]) * s + (P[1] - O[1]) * c]; };
  const put = () => {
    if (imgs.bridge) imgs.bridge.style.transform = csMatrix(CS.BR.W, CS.BR.L, csQuad(Math.PI / 2));
    const LQ = [[170, 70], csLeafPt(800, 70, phi, 0), csLeafPt(800, 800, phi, 0), [170, 800]];
    const RQ = [csLeafPt(800, 70, phi, 1), [1430, 70], [1430, 800], csLeafPt(800, 800, phi, 1)];
    if (imgs.leafL) imgs.leafL.style.transform = csMatrix(630, 730, LQ);
    if (imgs.leafR) imgs.leafR.style.transform = csMatrix(630, 730, RQ);
    const op = Math.min(1, phi / .5);
    const beam = document.getElementById('cs-beam'), seam = document.getElementById('cs-seam');
    if (beam) { const a = LQ[2], b = RQ[3], a1 = LQ[1], b1 = RQ[0]; beam.setAttribute('d', `M${csF(a1[0])} ${csF(a1[1])} L${csF(b1[0])} ${csF(b1[1])} L${csF(b[0])} ${csF(b[1])} L${csF(b[0] + (b[0] - 800) * .9)} 930 L${csF(a[0] + (a[0] - 800) * .9)} 930 L${csF(a[0])} ${csF(a[1])} Z`); beam.style.opacity = op.toFixed(3); }
    if (seam) seam.style.opacity = (Math.max(0, 1 - phi / .05) * .8).toFixed(3);
    // portiers : ils se penchent en tirant, les cordes suivent leurs mains
    [['ogre', 'cs-r1', csLeafPt(720, 530, phi, 0), -1], ['undead', 'cs-r2', csLeafPt(880, 530, phi, 1), 1]].forEach(([id, rid, ring, sg]) => {
      const L = byId[id], im = imgs[id]; const a = sg * lean * .09;
      if (im) im.style.transform = `rotate(${(a * 180 / Math.PI).toFixed(3)}deg)${L.flip ? ' scaleX(-1)' : ''}`;
      const hnd = rot(L.hand, L.origin, a), mid = [(hnd[0] + ring[0]) / 2, (hnd[1] + ring[1]) / 2 + 18 * (1 - Math.min(1, Math.abs(lean)))];
      const d = `M${csF(hnd[0])} ${csF(hnd[1])} Q${csF(mid[0])} ${csF(mid[1])} ${csF(ring[0])} ${csF(ring[1])}`;
      const e1 = document.getElementById(rid), e2 = document.getElementById(rid + 'b'); if (e1) e1.setAttribute('d', d); if (e2) e2.setAttribute('d', d);
    });
  };
  const queue = ['frame', 'leafL', 'leafR', ...(byId.ogre.img ? ['ogre'] : []), 'undead', 'bridge', 'sky', 'mnt', 'rock', 'field', 'moat', ...fw, 'dragon', 'wing', 'fire', 'kn', 'w2', 'w1', 'w3', 's2', 's1', 's3', 's4', 's5', 's6', ...pc, 's7', 's8', ...pcn, 'ball'];
  const reduce = matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  const PH = .66; // ouverture maximale (environ 38°)
  const ease = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  const tween = (from, to, D, leanTo) => new Promise(done => {
    const T0 = performance.now(), l0 = lean;
    const step = now => { const t = Math.min(1, (now - T0) / D), e = ease(t); phi = from + (to - from) * e; lean = l0 + (leanTo - l0) * Math.sin(Math.min(1, t * 1.4) * Math.PI / 2); put(); if (t < 1) requestAnimationFrame(step); else done(); };
    requestAnimationFrame(step);
  });
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const inMenu = () => document.body.classList.contains('sc-menu') && !document.hidden;
  // la porte reste fermée ; « Jouer » l'ouvre, on la franchit et la lumière éblouit
  let state = 'closed', ready = false, doorReady = false, pending = null;
  const flash = document.createElement('div'); flash.className = 'cs-flash'; document.body.appendChild(flash);
  // fond sobre du choix des univers, une fois la porte franchie
  const plain = document.createElement('div'); plain.className = 'cs-plain';
  plain.innerHTML = csTavernBg();
  el.appendChild(plain);
  const startEnter = cb => {
    state = 'entering'; document.body.classList.add('cs-entering');
    (async () => {
      await tween(0, .12, 520, 1);                 // ça grince…
      await tween(.12, .09, 260, .5);
      setTimeout(() => { stage.classList.add('cs-in'); zoom = 2.8; fit(); }, 200);
      setTimeout(() => flash.classList.add('on'), 1250);
      await tween(.09, 1.02, 1500, 1);             // …les battants s'ouvrent en grand
      await wait(380);
      el.classList.add('cs-inside');
      document.body.classList.remove('cs-entering'); state = 'in';
      try { cb(); } catch (e) {}
      setTimeout(() => flash.classList.remove('on'), 160);
    })();
  };
  window.csEnter = cb => {
    if (reduce || window.CS_NOANIM) return false;
    if (state === 'in') return false;
    if (state === 'entering' || pending) return true;   // clic répété : on laisse l'animation finir
    if (state === 'leaving' || !doorReady) { pending = cb; document.body.classList.add('cs-entering'); return true; }
    startEnter(cb); return true;
  };
  const flush = () => { if (pending && state === 'closed' && doorReady) { const cb = pending; pending = null; startEnter(cb); } };
  window.csLeave = () => {
    if (state !== 'in') return;
    state = 'leaving'; el.classList.remove('cs-inside'); stage.classList.remove('cs-in'); zoom = 1; fit();
    (async () => { await wait(500); await tween(phi, 0, 1700, -1); lean = 0; put(); stage.classList.remove('cs-thud'); void stage.offsetWidth; stage.classList.add('cs-thud'); state = 'closed'; flush(); })();
  };
  (async () => {
    const shared = csSharedDefs();
    for (const id of queue) {
      const L = byId[id]; if (!L) continue;
      const Rl = L.big ? Math.min(R, 1.25) : Math.min(2, R * 1.25);
      mk(L, L.img ? L.img : await csRaster(L, Rl, L.shared ? shared : ''));
      if (L.bridge || L.leaf || id === 'ogre' || id === 'undead') put();
      if (id === 'undead') { doorReady = true; flush(); }
      await new Promise(r => setTimeout(r, 0));
    }
    el.classList.add('cs-ready'); ready = true; doorReady = true; flush();
  })();
  put();
  if (!lite) {
    let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
    const tick = () => { cx += (tx - cx) * .06; cy += (ty - cy) * .06; stage.style.setProperty('--mx', cx.toFixed(3)); stage.style.setProperty('--my', cy.toFixed(3)); raf = Math.abs(tx - cx) + Math.abs(ty - cy) > .002 ? requestAnimationFrame(tick) : 0; };
    const go = () => { if (!raf) raf = requestAnimationFrame(tick); };
    addEventListener('pointermove', e => { if (!document.body.classList.contains('sc-menu') || document.body.classList.contains('cs-still')) return; tx = e.clientX / innerWidth * 2 - 1; ty = e.clientY / innerHeight * 2 - 1; go(); }, { passive: true });
    addEventListener('deviceorientation', e => { if (!document.body.classList.contains('sc-menu') || document.body.classList.contains('cs-still') || e.gamma == null) return; tx = Math.max(-1, Math.min(1, e.gamma / 25)); ty = Math.max(-1, Math.min(1, (e.beta - 40) / 25)); go(); }, { passive: true });
  }
}
