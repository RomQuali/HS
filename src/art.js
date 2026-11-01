/* =====================================================================
   ART — portraits dessinés par le code (SVG). Un symbole par serviteur,
   par héros et par joueur, réutilisé partout via <use>.
   ===================================================================== */
const OUT = '#24160d';
function shade(hex, p) {
  const n = parseInt(hex.slice(1), 16);
  let r = n >> 16, g = (n >> 8) & 255, b = n & 255;
  const t = p < 0 ? 0 : 255, k = Math.abs(p);
  r = Math.round((t - r) * k + r); g = Math.round((t - g) * k + g); b = Math.round((t - b) * k + b);
  return '#' + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
}
const so = (w = 2.4) => `stroke="${OUT}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
const P = (d, fill, x = '') => `<path d="${d}" fill="${fill}" ${x}/>`;
const E = (cx, cy, rx, ry, fill, x = '') => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${fill}" ${x}/>`;
const Ci = (cx, cy, r, fill, x = '') => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" ${x}/>`;
const Ln = (d, col = OUT, w = 2, x = '') => `<path d="${d}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${x}/>`;
const GLOW = 'filter="url(#fx-glow)"';
const mirror = s => `<g transform="translate(100 0) scale(-1 1)">${s}</g>`;
const f1 = n => (+n).toFixed(1);
function starD(cx, cy, r1, r2, n) {
  let d = '';
  for (let i = 0; i < n * 2; i++) { const a = -Math.PI / 2 + i * Math.PI / n, r = i % 2 ? r2 : r1; d += (i ? 'L' : 'M') + f1(cx + Math.cos(a) * r) + ' ' + f1(cy + Math.sin(a) * r); }
  return d + 'Z';
}
function gearD(cx, cy, r, n, hole) {
  let d = ''; const ri = r * 0.78;
  for (let i = 0; i < n * 4; i++) { const a = (i + 0.5) / (n * 4) * Math.PI * 2, rr = (i % 4 < 2) ? r : ri; d += (i ? 'L' : 'M') + f1(cx + Math.cos(a) * rr) + ' ' + f1(cy + Math.sin(a) * rr); }
  d += 'Z';
  if (hole) d += `M${f1(cx - hole)} ${cy}a${hole} ${hole} 0 1 0 ${2 * hole} 0a${hole} ${hole} 0 1 0 ${-2 * hole} 0Z`;
  return d;
}

/* lueur douce : dégradé radial au lieu d'un flou (beaucoup plus léger à afficher) */
const SOFT = {};
function softId(col) { const k = col.replace('#', ''); if (!SOFT[k]) SOFT[k] = `<radialGradient id="soft-${k}"><stop offset="0" stop-color="${col}" stop-opacity="1"/><stop offset=".55" stop-color="${col}" stop-opacity=".55"/><stop offset="1" stop-color="${col}" stop-opacity="0"/></radialGradient>`; return 'soft-' + k; }
const softGlow = (cx, cy, r, col, op) => `<circle cx="${cx}" cy="${cy}" r="${f1(r * 1.25)}" fill="url(#${softId(col)})" opacity="${op}"/>`;
const softGlowE = (cx, cy, rx, ry, col, op) => `<ellipse cx="${cx}" cy="${cy}" rx="${f1(rx * 1.25)}" ry="${f1(ry * 1.25)}" fill="url(#${softId(col)})" opacity="${op}"/>`;
/* ---------- pièces de visage humain ---------- */
const MOUTH = {
  smile: Ln('M44.5 61.5 Q50 66 55.5 61.5', OUT, 1.9),
  grin: P('M43.5 60.5 Q50 69.5 56.5 60.5 Z', '#4a1d14', so(1.6)) + P('M45.2 61.2 L54.8 61.2 L54 63.2 L46 63.2 Z', '#fff'),
  frown: Ln('M45 64.4 Q50 60.6 55 64.4', OUT, 1.9),
  o: E(50, 62.6, 2.6, 3, '#4a1d14', so(1.4)),
  flat: Ln('M45.5 62.6 L54.5 62.6', OUT, 1.9),
  smirk: Ln('M45 62.2 Q51 64.6 56 60.6', OUT, 1.9),
};
const BEARD = {
  full: c => P('M29.5 50 C 30 68, 40 79, 50 79 C 60 79, 70 68, 70.5 50 C 67 59, 60 64.5, 50 64.5 C 40 64.5, 33 59, 29.5 50 Z', c, so()),
  long: c => P('M29.5 50 C 29 70, 40 91, 50 96 C 60 91, 71 70, 70.5 50 C 67 59, 60 64.5, 50 64.5 C 40 64.5, 33 59, 29.5 50 Z', c, so()) + Ln('M44 72 Q47 82 49 90 M56 72 Q53 82 51 90', shade(c, -0.18), 1.3),
  mustache: c => P('M50 58.6 C 46 56.6, 40.5 57.6, 38.4 62.2 C 42.5 60.4, 46.5 61.2, 50 60.6 C 53.5 61.2, 57.5 60.4, 61.6 62.2 C 59.5 57.6, 54 56.6, 50 58.6 Z', c, so(1.6)),
  goatee: c => P('M45.5 66 Q50 76.5 54.5 66 Q50 68.6 45.5 66 Z', c, so(1.6)),
  stubble: c => P('M31 54 C 33 67, 42 71, 50 71 C 58 71, 67 67, 69 54 C 64 62, 58 65.5, 50 65.5 C 42 65.5, 36 62, 31 54 Z', c, 'opacity=".42"'),
};
const HAIR_CAP = 'M29.6 47 C 28 30, 39 24.5, 50 24.5 C 61 24.5, 72 30, 70.4 47 C 67 39, 60 35.5, 50 36 C 41 35.5, 33 39, 29.6 47 Z';
const SIDE_TUFT = 'M29.8 52 C 28 44, 30 39, 35 37 C 33.5 42, 33.5 47, 34 52 Z';
const SHINE = E(43, 32, 6, 3, '#fff', 'opacity=".22"');
const HAIR = {
  short: c => P(HAIR_CAP, c, so()),
  long: c => P(HAIR_CAP, c, so()),
  bun: c => P(HAIR_CAP, c, so()),
  braids: c => P(HAIR_CAP, c, so()),
  part: c => P('M29.6 48 C 27 30, 40 24, 52 24.5 C 64 25, 73 32, 70.4 48 C 68 40, 62 34, 52 33.5 C 44 36, 36 40, 29.6 48 Z', c, so()),
  curly: c => { let s = P(HAIR_CAP, c, so()); for (let k = 0; k <= 7; k++) { const a = Math.PI * (1.1 + k * 0.114); s += Ci(f1(50 + 19 * Math.cos(a)), f1(45 + 20 * Math.sin(a)), 6.2, c, so(1.8)); } return s; },
  mohawk: c => SHINE + P('M45 35.5 C 43 24, 46 13, 50 5 C 54 13, 57 24, 55 35.5 Z', c, so()),
  side: c => SHINE + P(SIDE_TUFT, c, so(1.6)) + mirror(P(SIDE_TUFT, c, so(1.6))),
  bald: () => SHINE,
};
const HAT = {
  tricorn: c => P('M32 33 C 33 18, 67 18, 68 33 Z', c, so()) + P('M14 35 C 28 42, 72 42, 86 35 C 78 26, 66 30, 50 26 C 34 30, 22 26, 14 35 Z', c, so()) + Ln('M16.5 35.3 C 30 40.6, 70 40.6, 83.5 35.3', '#e2b452', 1.6),
  bandana: c => P('M29.2 45 C 27 28, 40 23, 50 23 C 61 23, 73 28, 70.8 45 C 63 38.5, 37 38.5, 29.2 45 Z', c, so()) + [[40, 32, 1.4], [50, 28.5, 1.4], [60, 32, 1.4], [45, 37, 1.2], [56, 36.5, 1.2]].map(([x, y, r]) => Ci(x, y, r, '#fff', 'opacity=".8"')).join('') + P('M69 41 L81 46 L74.5 50 Z', c, so(1.8)) + P('M69.5 43.5 L77 55 L71 54 Z', c, so(1.8)),
  admiral: c => P('M11 37 C 19 13, 81 13, 89 37 C 76 31.5, 24 31.5, 11 37 Z', c, so()) + Ln('M13 36 C 26 31, 74 31, 87 36', '#e7bb55', 2.2) + Ci(50, 25, 4.2, '#e7bb55', so(1.4)) + Ci(50, 25, 1.6, OUT),
  hoodfront: c => P('M28.5 50 C 27 31, 39 25, 50 25 C 61 25, 73 31, 71.5 50 C 66 37.5, 58 34, 50 34 C 42 34, 34 37.5, 28.5 50 Z', c, so()),
  wizard: c => P('M30 34 C 41 29, 48 14, 64 2 C 59 14, 61 25, 70 34 Z', c, so()) + E(50, 35, 28, 5.2, c, so()) + P(starD(48, 22, 3.2, 1.3, 5), '#f5d36b') + P(starD(58.5, 28, 2.2, 0.9, 5), '#f5d36b'),
  hardhat: c => P('M28.5 41 C 28 21, 72 21, 71.5 41 Z', c, so()) + P('M23 40.5 L77 40.5 L77 45 Q50 47.5 23 45 Z', shade(c, -0.15), so()) + Ln('M50 23.6 L50 40', shade(c, 0.3), 2.6),
  feather: c => P('M56 31 C 64 12, 82 9, 92 1 C 89 17, 77 28, 61 33.5 Z', '#d9503f', so(1.8)) + Ln('M60 32 C 70 22, 80 14, 90 4', shade('#d9503f', -0.3), 1.2) + P('M31 34 C 31 20, 66 20, 66 34 Z', c, so()) + E(48.5, 35.5, 31, 5.6, c, so()) + Ln('M32.5 31.6 L65 31.6', shade(c, 0.35), 2.4),
  crown: c => P('M32 35 L31 20 L39 28 L45 16 L50 26.5 L55 16 L61 28 L69 20 L68 35 Z', c, so()) + Ci(50, 31, 2.3, '#d6413b', so(1)) + Ci(40.5, 31.4, 1.7, '#4aa3df', so(0.8)) + Ci(59.5, 31.4, 1.7, '#4aa3df', so(0.8)),
  beret: c => P('M27 39 C 24 26, 48 18, 64 23 C 77 27, 78 35, 72 38 C 58 33, 40 34, 27 39 Z', c, so()) + Ci(53, 20.6, 2.4, c, so(1.4)),
  circlet: c => Ln('M30 41 Q50 35 70 41', OUT, 4.6) + Ln('M30 41 Q50 35 70 41', c, 2.6) + P(starD(50, 37.5, 4.6, 2, 4), '#bfe9ff', so(1)),
};
const GOGGLES = g => P('M29.6 38.6 C 36 34, 64 34, 70.4 38.6 L 70.6 42 C 64 38, 36 38, 29.4 42 Z', '#5a3b22', so(1.4)) + [42, 58].map(x => Ci(x, 36.8, 5.4, '#c8963e', so(1.8)) + Ci(x, 36.8, 3.6, g) + Ci(x - 1.2, 35.6, 1.1, '#fff', 'opacity=".9"')).join('');
const PROP = {
  mug: () => '<g transform="translate(64 70) rotate(8)">' + P('M0 7 L18 7 L17 29 Q9 32 1 29 Z', '#c98d3e', so()) + Ln('M2.5 13 L15.5 13 M2.5 21 L15.5 21', '#8a5a22', 1.4) + Ln('M18 12 C 26 12, 26 24, 17.4 24', OUT, 5) + Ln('M18 12 C 26 12, 26 24, 17.4 24', '#c98d3e', 2.4) + P('M-1.5 7.5 C -2 1, 5 0, 7 2 C 9 -1, 16 0, 17 3 C 21 3, 21 8, 18.5 8.5 Z', '#fff8e6', so(1.6)) + '</g>',
  flask: o => '<g transform="translate(72 72) rotate(-10)">' + P('M-3 0 L3 0 L3 8 C 11 11, 13 22, 6 28 C 2 31, -2 31, -6 28 C -13 22, -11 11, -3 8 Z', o.flaskc || '#7fe36a', so()) + P('M-3.6 -4 L3.6 -4 L3.6 0.5 L-3.6 0.5 Z', '#a0703e', so(1.4)) + E(-2.5, 16, 2.2, 4, '#fff', 'opacity=".45"') + Ci(2, 22, 1.6, '#fff', 'opacity=".5"') + '</g>',
  sword: () => '<g transform="translate(74 104) rotate(-28)">' + P('M-3 -6 L3 -6 L2.4 -40 L0 -46 L-2.4 -40 Z', '#dfe6ea', so(1.8)) + P('M-9 -6 L9 -6 L9 -2.5 L-9 -2.5 Z', '#c8963e', so(1.6)) + P('M-2 -2.5 L2 -2.5 L2 6 L-2 6 Z', '#6b3f22', so(1.4)) + '</g>',
  book: () => '<g transform="translate(62 80) rotate(-8)">' + P('M0 0 L26 0 L26 20 L0 20 Z', '#7a2f3a', so()) + P('M2.5 2.5 L23.5 2.5 L23.5 17.5 L2.5 17.5 Z', 'none', 'stroke="#e7bb55" stroke-width="1"') + P(starD(13, 10, 4, 1.8, 5), '#e7bb55') + '</g>',
  wrench: () => '<g transform="translate(78 100) rotate(-35)">' + P('M-2.6 0 L2.6 0 L2.6 -26 L-2.6 -26 Z', '#9aa4ab', so(1.8)) + P('M-7 -26 C -8 -34, -2 -38, 0 -36 L0 -30 L4 -30 L4 -36 C 7 -36, 9 -30, 7 -26 Z', '#9aa4ab', so(1.8)) + '</g>',
  hammer: () => '<g transform="translate(78 102) rotate(-30)">' + P('M-2.4 0 L2.4 0 L2.4 -28 L-2.4 -28 Z', '#8a5a2b', so(1.6)) + P('M-10 -36 L10 -36 L10 -26 L-10 -26 Z', '#7d858c', so(1.8)) + '</g>',
  coins: () => [0, 1, 2].map(k => E(76, 98 - k * 5, 9, 3.6, '#f2c14e', so(1.6))).join('') + E(76, 88, 6, 2, '#fff3c0', 'opacity=".5"'),
  ball: () => Ci(76, 92, 9, '#2f3237', so()) + E(73, 89, 3, 2, '#fff', 'opacity=".3"') + Ln('M80 84 C 82 80, 86 80, 88 77', '#c9a26a', 1.8) + P(starD(89, 76, 3.2, 1.3, 6), '#ffd34d', GLOW),
};

/* ---------- humains ---------- */
function human(o) {
  const skin = o.skin || '#f1c7a0', sd = shade(skin, -0.2), shirt = o.shirt || '#5d4a8a', hair = o.hair || '#4a2f1d', brow = shade(hair, -0.15);
  const ey = o.eyes || 'dot';
  let s = '';
  if (o.hat === 'hood') s += P('M21 60 C 19 32, 33 16, 50 16 C 67 16, 81 32, 79 60 C 81 78, 75 90, 71 104 L 29 104 C 25 90, 19 78, 21 60 Z', o.hatc, so());
  if (o.hs === 'long') s += P('M27.5 44 C 24 64, 25 84, 33 90 L 67 90 C 75 84, 76 64, 72.5 44 C 69 30, 31 30, 27.5 44 Z', hair, so());
  if (o.hs === 'bun') s += Ci(50, 22.5, 9, hair, so());
  if (o.hs === 'braids') for (const x of [29.5, 70.5]) for (let k = 0; k < 4; k++) s += E(x, 59 + k * 7.5, 4.4, 4.8, hair, so(1.8));
  s += P('M12 104 C 14 84, 26 77, 40 75 L 60 75 C 74 77, 86 84, 88 104 Z', shirt, so());
  if (o.apron) s += P('M36 81 L64 81 L66 104 L34 104 Z', o.apron, so(1.8)) + Ln('M36 81 L33 76 M64 81 L67 76', o.apron, 2.2);
  if (o.collar) s += P('M40 75.5 L50 86 L60 75.5 L55.5 75 L50 80.5 L44.5 75 Z', o.collar, so(1.5));
  s += P('M43 62 L57 62 L57 76 Q50 80 43 76 Z', sd, so(2));
  if (o.ears === 'pointy') { const ear = P('M31 46 L15 33 L30 57 Z', skin, so()); s += ear + mirror(ear); }
  else s += E(29.5, 51, 4.2, 6, skin, so()) + E(70.5, 51, 4.2, 6, skin, so());
  s += E(50, 48, 20.5, 22.5, skin, so());
  s += P('M31.5 55 C 34 66, 42 70, 50 70 C 58 70, 66 66, 68.5 55 C 64 63, 57 66, 50 66 C 43 66, 36 63, 31.5 55 Z', sd, 'opacity=".35"');
  if (o.soot) s += E(38, 58, 5, 3, '#3a2a22', 'opacity=".35"') + E(60, 38.5, 4, 2.4, '#3a2a22', 'opacity=".3"');
  if (!o.noblush) s += E(37.5, 57, 3.4, 2.2, '#ff8f7d', 'opacity=".33"') + E(62.5, 57, 3.4, 2.2, '#ff8f7d', 'opacity=".33"');
  if (o.freckles) for (const [x, y] of [[36, 55], [39, 57], [37.5, 59], [61, 55], [64, 57], [62.5, 59]]) s += Ci(x, y, 0.75, shade(skin, -0.4));
  const dot = cx => E(cx, 49.5, 2.3, 3, OUT) + Ci(cx + 0.8, 48.3, 0.8, '#fff');
  if (ey === 'happy') s += Ln('M39.5 50.5 Q42.5 47 45.5 50.5', OUT, 1.9) + Ln('M54.5 50.5 Q57.5 47 60.5 50.5', OUT, 1.9);
  else if (ey === 'glow') s += E(42.5, 49.5, 3.1, 2.6, o.glow || '#9ef', GLOW) + E(57.5, 49.5, 3.1, 2.6, o.glow || '#9ef', GLOW);
  else s += dot(42.5) + (ey === 'patch' ? '' : dot(57.5));
  if (ey === 'patch') s += Ln('M29.5 41 L54 47.5', OUT, 1.5) + Ln('M61 46.6 L70.5 43.5', OUT, 1.5) + E(57.5, 49.5, 4.6, 4.1, OUT);
  if (ey === 'glasses') s += Ci(42.5, 49.5, 5.2, 'rgba(255,255,255,.18)', so(1.6)) + Ci(57.5, 49.5, 5.2, 'rgba(255,255,255,.18)', so(1.6)) + Ln('M47.7 49.5 L52.3 49.5', OUT, 1.6);
  if (o.angry) s += Ln('M38 43.4 L46.5 46.4', brow, 2.3) + Ln('M62 43.4 L53.5 46.4', brow, 2.3);
  else if (ey !== 'glow') s += Ln('M39 44 Q42.5 42.4 46 43.8', brow, 1.8) + (ey === 'patch' ? '' : Ln('M54 43.8 Q57.5 42.4 61 44', brow, 1.8));
  s += o.nose === 'big' ? E(50, 56, 4.6, 3.8, shade(skin, -0.08), so(1.6)) : E(50, 55.6, 2.7, 2, sd);
  const mouth = MOUTH[o.mouth || 'smile'];
  if (o.beard && o.beard !== 'mustache') s += BEARD[o.beard](o.beardc || hair) + mouth;
  else s += mouth + (o.beard === 'mustache' ? BEARD.mustache(o.beardc || hair) : '');
  if (o.tusks) s += P('M44 63.8 L45.6 56.8 L47.8 63.6 Z', '#f3ead2', so(1.2)) + P('M52.2 63.6 L54.4 56.8 L56 63.8 Z', '#f3ead2', so(1.2));
  if (o.scar) s += Ln('M56 41 L61 57', '#a8453a', 1.7) + Ln('M56.7 45.2 L59.6 44.2 M57.9 50 L60.8 49', '#a8453a', 1.2);
  if (o.earring) s += Ci(29.5, 57.8, 2, 'none', 'stroke="#e7bb55" stroke-width="1.5"');
  if (o.hs && HAIR[o.hs] && o.hat !== 'hood') s += HAIR[o.hs](hair);
  if (ey === 'goggles') s += GOGGLES(o.glow || '#8fe3ff');
  if (o.hat === 'hood') s += HAT.hoodfront(o.hatc);
  else if (o.hat && HAT[o.hat]) s += HAT[o.hat](o.hatc || '#3a2a22');
  if (o.prop) s += PROP[o.prop](o);
  return s;
}

/* ---------- mécas ---------- */
function robot(o) {
  const c = o.col, d = shade(c, -0.3), hi = shade(c, 0.4), g = o.glow || '#7fe3ff', dk = '#1a1f26';
  let s = P('M16 104 L20 85 Q22 78 30 78 L70 78 Q78 78 80 85 L84 104 Z', d, so());
  s += P('M38 85 L62 85 L60 100 L40 100 Z', shade(c, -0.12), so(1.6)) + Ci(50, 92.5, 3.4, g, GLOW);
  s += P('M43 66 L57 66 L57 80 L43 80 Z', shade(c, -0.45), so(2)) + Ln('M43 70.5 L57 70.5 M43 75 L57 75', shade(c, -0.6), 1.2);
  if (o.pistons) for (const x of [12, 80]) s += P(`M${x} 36 L${x + 8} 36 L${x + 8} 66 L${x} 66 Z`, shade(c, -0.15), so(1.8)) + P(`M${x + 2} 29 L${x + 6} 29 L${x + 6} 36 L${x + 2} 36 Z`, hi, so(1.4));
  else if (o.head !== 'gear') s += P('M19 43 L26 43 L26 57 L19 57 Z', d, so(2)) + P('M74 43 L81 43 L81 57 L74 57 Z', d, so(2));
  if (o.ant) s += Ln('M50 30 L50 15', OUT, 2.4) + Ci(50, 12.5, 3.8, g, so(1.6));
  if (o.horns) s += P('M31 34 L20 12 L41 29 Z', shade(c, 0.15), so()) + P('M69 34 L80 12 L59 29 Z', shade(c, 0.15), so());
  const HEADS = {
    box: `<rect x="25" y="28" width="50" height="43" rx="7" fill="${c}" ${so()}/>`,
    round: E(50, 49, 24, 22, c, so()),
    dome: P('M25 64 L25 47 C 25 27, 75 27, 75 47 L75 64 Q75 71 68 71 L32 71 Q25 71 25 64 Z', c, so()),
    gear: P(gearD(50, 49, 27, 9), c, so()) + Ci(50, 49, 19, shade(c, 0.12), so(1.6)),
  };
  s += HEADS[o.head || 'box'];
  s += Ln(o.head === 'round' || o.head === 'gear' ? 'M35 36 Q41 31.5 49 31.5' : 'M30.5 37 Q31 32.5 36 32.5 L48 32.5', hi, 2.6, 'opacity=".75"');
  if (o.bolts) for (const [x, y] of [[30.5, 33.5], [69.5, 33.5], [30.5, 65.5], [69.5, 65.5]]) s += Ci(x, y, 1.6, hi, so(1));
  if (o.rust) s += E(64, 61, 6, 4, '#a0522d', 'opacity=".55"') + E(33, 40, 4, 3, '#a0522d', 'opacity=".5"') + E(57, 33, 3, 2, '#a0522d', 'opacity=".45"');
  const eye = (x, y, r) => Ci(x, y, r, dk, so(2)) + Ci(x, y, f1(r * 0.6), g, GLOW) + Ci(f1(x - r * 0.28), f1(y - r * 0.28), f1(r * 0.2), '#fff', 'opacity=".9"');
  switch (o.eye) {
    case 'mono': s += eye(50, 46, 10); break;
    case 'visor': s += `<rect x="30" y="40" width="40" height="12" rx="6" fill="${dk}" ${so(2)}/><rect x="33.5" y="43.5" width="33" height="5" rx="2.5" fill="${g}" ${GLOW}/>`; break;
    case 'odd': s += eye(39, 46, 7.5) + eye(61.5, 47, 4.6); break;
    default: s += eye(39.5, 46, 6) + eye(60.5, 46, 6);
  }
  switch (o.mouth) {
    case 'grill': s += `<rect x="37" y="57" width="26" height="8" rx="2" fill="${dk}" ${so(1.6)}/>` + Ln('M41.5 57.6 L41.5 64.4 M46 57.6 L46 64.4 M50.5 57.6 L50.5 64.4 M55 57.6 L55 64.4 M59.5 57.6 L59.5 64.4', shade(c, 0.1), 1.2); break;
    case 'teeth': s += `<rect x="36" y="57" width="28" height="9" rx="2" fill="${dk}" ${so(1.6)}/>` + [39, 44, 49, 54, 59].map(x => `<rect x="${x}" y="58" width="3.6" height="3.4" fill="#eef"/>`).join(''); break;
    case 'furnace': s += `<rect x="35" y="56" width="30" height="11" rx="3" fill="url(#gr-fire)" ${so(1.8)}/>` + Ln('M41 56.6 L41 66.4 M47 56.6 L47 66.4 M53 56.6 L53 66.4 M59 56.6 L59 66.4', OUT, 1.6); break;
    case 'smile': s += Ln('M41 58.5 Q50 65 59 58.5', g, 2.6, GLOW); break;
    default: s += Ln('M42 60.5 L58 60.5', OUT, 2.6);
  }
  if (o.crown) s += `<g transform="translate(0 -6)">${HAT.crown('#f2c14e')}</g>`;
  return s;
}
function bomb() {
  let s = E(38, 96, 7, 4, '#2a2d33', so(1.8)) + E(62, 96, 7, 4, '#2a2d33', so(1.8));
  s += Ci(50, 60, 27, '#3a3e46', so()) + E(40, 47, 8, 5, '#fff', 'opacity=".14"');
  s += `<rect x="44" y="29.5" width="12" height="6" rx="1.6" fill="#6b707a" ${so(1.8)}/>`;
  s += Ln('M50 30 C 50 20, 58 19, 62 12', OUT, 4.4) + Ln('M50 30 C 50 20, 58 19, 62 12', '#c9a26a', 2.2);
  s += P(starD(63, 10, 7, 2.6, 8), '#ffd34d', GLOW) + Ci(63, 10, 2.2, '#fff');
  const eye = x => Ci(x, 57, 5, '#fff', so(1.6)) + Ci(x + 0.6, 58, 2.4, OUT);
  s += eye(40) + eye(60) + Ln('M33 49 L45 53', OUT, 3) + Ln('M67 49 L55 53', OUT, 3);
  s += P('M38 67 Q50 79 62 67 Z', '#5a1d14', so(1.8)) + P('M40.5 67.6 L59.5 67.6 L58 70.5 L42 70.5 Z', '#fff');
  return s;
}

/* ---------- bêtes ---------- */
function beast(o) {
  const c = o.col, d = shade(c, -0.28), l = o.belly || shade(c, 0.4), ey = o.eye || '#f2c14e';
  let s = o.sp === 'snake' ? '' : P('M18 104 C 20 86, 32 77.5, 50 77.5 C 68 77.5, 80 86, 82 104 Z', c, so()) + P('M38.5 104 C 39 92, 44 85, 50 85 C 56 85, 61 92, 61.5 104 Z', l, 'opacity=".9"');
  const almond = (x, y) => P(`M${x - 5} ${y} Q${x} ${y - 4.6} ${x + 5} ${y} Q${x} ${y + 3.2} ${x - 5} ${y} Z`, ey, so(1.4)) + E(x, y - 0.4, 1.3, 2.4, OUT);
  const round = (x, y, r = 3) => E(x, y, f1(r * 0.85), r, OUT) + Ci(f1(x + r * 0.3), f1(y - r * 0.4), f1(r * 0.3), '#fff');
  const glowEye = (x, y) => E(x, y, 3.2, 2.4, o.glow, GLOW);
  switch (o.sp) {
    case 'dog':
      s += E(50, 51, 21, 19.5, c, so());
      s += E(50, 60.5, 11, 8, l, so(1.8));
      s += E(50, 56.6, 4, 2.9, OUT) + E(48.8, 55.8, 1.2, 0.7, '#fff', 'opacity=".6"');
      s += Ln('M50 59.5 L50 62 M45.5 62.4 Q50 66.2 54.5 62.4', OUT, 1.6);
      if (o.tongue) s += P('M48 63.6 Q50 70 52 63.6 Z', '#e86a7a', so(1.2));
      s += o.glow ? glowEye(41.5, 48) + glowEye(58.5, 48) : round(41.5, 48, 3.2) + round(58.5, 48, 3.2);
      s += `<g transform="rotate(18 29 49)">${E(29, 52, 7, 13.5, d, so())}</g><g transform="rotate(-18 71 49)">${E(71, 52, 7, 13.5, d, so())}</g>`;
      break;
    case 'cat': {
      const ear = P('M33.5 46 L30 26 L46.5 38 Z', c, so()) + P('M35 42 L32.6 30.6 L42.5 38.4 Z', '#f2a7a0');
      s += ear + mirror(ear);
      s += E(50, 54, 20.5, 18, c, so());
      if (o.stripes) s += Ln('M50 37.4 L50 43.4 M44.6 38.6 L45.8 43.2 M55.4 38.6 L54.2 43.2', d, 1.9);
      s += E(50, 61, 8, 5, l, 'opacity=".85"');
      s += o.kitten ? round(42, 51.5, 4) + round(58, 51.5, 4) : almond(42, 52) + almond(58, 52);
      s += P('M47.6 57.6 L52.4 57.6 L50 60.2 Z', '#e88a8a', so(1.1));
      s += Ln('M50 60.2 Q47.8 63 45.6 61.6 M50 60.2 Q52.2 63 54.4 61.6', OUT, 1.4);
      s += Ln('M40 59.4 L28 57.4 M40 61.6 L28.6 62.6 M60 59.4 L72 57.4 M60 61.6 L71.4 62.6', OUT, 1);
      break; }
    case 'wolf': {
      const ear = P('M32.5 42 L29 16 L46 31 Z', c, so()) + P('M34 37 L31.6 22.6 L41.6 31.4 Z', d);
      const tuft = P('M29 50 L20 58 L29.5 57 L26 65 L36 62 Z', c, so(1.8));
      s += ear + mirror(ear) + tuft + mirror(tuft);
      s += P('M28 50 C 28 35, 38 29, 50 29 C 62 29, 72 35, 72 50 C 72 59, 65 63, 61 67 L 50 76 L 39 67 C 35 63, 28 59, 28 50 Z', c, so());
      s += P('M41 57 C 44 53.6, 56 53.6, 59 57 L 50 75.4 Z', l, 'opacity=".95"');
      s += E(50, 67.6, 4.1, 3, OUT) + E(48.8, 66.8, 1.2, 0.7, '#fff', 'opacity=".6"');
      s += Ln('M50 70.6 L50 73.2', OUT, 1.4);
      if (o.fangs) s += P('M45.4 71.6 L47.2 77 L48.6 72.4 Z', '#fff', so(1)) + P('M54.6 71.6 L52.8 77 L51.4 72.4 Z', '#fff', so(1));
      s += o.pup ? round(42, 49, 3.6) + round(58, 49, 3.6) : almond(42, 49) + almond(58, 49);
      if (o.angry) s += Ln('M35.6 43.6 L46.6 46.6', d, 2.6) + Ln('M64.4 43.6 L53.4 46.6', d, 2.6);
      break; }
    case 'snake': {
      s += P('M10 104 C 10 90, 30 84, 50 87 C 70 90, 90 86, 90 104 Z', c, so()) + Ln('M22 96 Q30 92 38 96 M44 98 Q52 94 60 98 M66 96 Q74 92 82 96', d, 1.6);
      s += P('M39 66 C 37 80, 43 89, 50 89 C 57 89, 63 80, 61 66 Z', c, so()) + P('M45 68 C 44 78, 47 86, 50 86 C 53 86, 56 78, 55 68 Z', l, 'opacity=".9"');
      s += P('M27 52 C 27 37, 39 30, 50 30 C 61 30, 73 37, 73 52 C 73 64, 62 72, 50 72 C 38 72, 27 64, 27 52 Z', c, so());
      s += E(37, 38, 3, 2, d) + E(63, 38, 3, 2, d) + E(50, 35, 2.6, 1.8, d);
      const se = x => E(x, 48, 6.2, 6.6, ey, so(1.6)) + E(x, 48, 1.4, 5, OUT) + Ci(x - 2, 45.6, 1.2, '#fff');
      s += se(39.5) + se(60.5) + Ci(46.4, 58, 1, OUT) + Ci(53.6, 58, 1, OUT);
      s += Ln('M37 62.5 Q50 68 63 62.5', OUT, 1.6) + Ln('M50 65.6 L50 73 M50 73 L47 77 M50 73 L53 77', '#e0435a', 1.8);
      s += P('M62 64 C 64 68, 66 70.6, 64 73.4 C 62.4 75, 59.8 74.2, 59.8 72 C 59.8 70, 61.4 67.4, 62 64 Z', '#86d65a', so(1.2));
      break; }
    case 'stag': {
      const ant = 'M44 35 C 38 27, 34 19, 33 6 M36 22 L25 17 M33.6 13 L40 5 M33 6 L29 0.5';
      const a2 = Ln(ant, OUT, 6.4) + Ln(ant, '#ecdfbf', 3.2);
      const ear = `<g transform="rotate(-28 28 41)">${E(28, 41, 10, 4.6, c, so())}${E(28.5, 41, 6, 2.2, l, 'opacity=".7"')}</g>`;
      s += a2 + mirror(a2) + ear + mirror(ear);
      s += P('M35.5 40 C 35.5 29, 64.5 29, 64.5 40 C 64.5 55, 60 70, 50 77 C 40 70, 35.5 55, 35.5 40 Z', c, so());
      s += E(50, 39.5, 5, 3, l, 'opacity=".6"') + E(50, 68.5, 7.6, 7, l, so(1.6)) + E(50, 72, 4, 2.7, OUT);
      s += round(42.5, 48, 3) + round(57.5, 48, 3);
      break; }
    case 'lion': {
      const mane = o.mane || '#8a4a22';
      s += Ci(50, 50, 27, mane);
      for (let k = 0; k < 14; k++) { const a = k / 14 * Math.PI * 2; s += Ci(f1(50 + 26 * Math.cos(a)), f1(50 + 25 * Math.sin(a)), 8.6, mane, so(1.8)); }
      s += Ci(50, 50, 24, shade(mane, -0.15));
      s += Ci(36.5, 37.5, 4.6, c, so(1.6)) + Ci(63.5, 37.5, 4.6, c, so(1.6));
      s += E(50, 52, 17.5, 16.5, c, so()) + E(50, 59.5, 9.6, 6.4, l, so(1.6));
      s += P('M46 55 L54 55 L50 59 Z', '#6b3b2a', so(1.2)) + Ln('M50 59 L50 61.4 M46 62 Q50 64.6 54 62', OUT, 1.4);
      s += almond(43, 49) + almond(57, 49);
      break; }
    case 'boar': {
      if (o.horns) { const hn = P('M33 38 C 22 31, 18 18, 24 7 C 26 19, 32 26, 39 32 Z', '#e8dcc0', so(1.8)); s += hn + mirror(hn); }
      s += P('M33 34 L37 19 L42 31 L46 15 L50 29 L54 15 L58 31 L63 19 L67 34 Z', d, so(1.8));
      const ear = P('M31 41 L16 31 L28.6 51 Z', c, so()); s += ear + mirror(ear);
      s += P('M28 46 C 28 31, 72 31, 72 46 C 72 60, 64 72, 50 74 C 36 72, 28 60, 28 46 Z', c, so());
      s += E(50, 62.5, 11.5, 8.6, shade(c, 0.22), so(1.8)) + E(46, 62.6, 1.9, 2.8, OUT) + E(54, 62.6, 1.9, 2.8, OUT);
      const tusk = P('M38.5 66 C 34 60, 34 53, 37.4 49 C 38.4 55.6, 40.6 61, 43 64 Z', '#f3ead2', so(1.4)); s += tusk + mirror(tusk);
      s += (o.glow ? glowEye(40.5, 47) + glowEye(59.5, 47) : round(40.5, 47) + round(59.5, 47)) + Ln('M34.6 41.6 L45 45.6', OUT, 2.6) + Ln('M65.4 41.6 L55 45.6', OUT, 2.6);
      break; }
  }
  if (o.crown) s += `<g transform="translate(0 ${o.crownY || -4})">${HAT.crown('#f2c14e')}</g>`;
  if (o.smoke) s += Ci(68, 27, 5, '#d8d2cc', 'opacity=".75"') + Ci(73.5, 19, 4, '#d8d2cc', 'opacity=".6"') + Ci(77, 12, 3, '#d8d2cc', 'opacity=".45"');
  if (o.embers) s += [[30, 34, 1.5], [70, 30, 1.3], [24, 60, 1.2], [78, 64, 1.4], [62, 22, 1.1]].map(([x, y, r]) => Ci(x, y, r, '#ffb04a', GLOW)).join('') + Ln('M45 35.5 L47.5 39.5 L45.6 42.6 M56 36 L54 40', '#ff9a3a', 1.2, GLOW);
  return s;
}

/* ---------- spectres ---------- */
function ghost(o) {
  const c = o.col, g = o.glow || '#e9fbff', dk = '#120c22';
  const body = 'M24 54 C 24 29, 76 29, 76 54 L 76 84 Q 69.5 94 63 84 Q 56.5 74 50 84 Q 43.5 94 37 84 Q 30.5 74 24 84 Z';
  let s = P(body, g, 'opacity=".5" filter="url(#fx-blur)"') + P(body, c, so());
  const arm = P('M24.5 60 C 16 61, 11 69, 13 76 C 17 70, 21 68, 25 68.5 Z', c, so(1.8)); s += arm + mirror(arm);
  s += E(43, 42, 9, 6, '#fff', 'opacity=".22"');
  if (o.frost) s += P('M40.5 88 L43.5 99 L46.5 88 Z', '#e6f8ff', so(1.2)) + P('M66.5 88 L69.5 99 L72.5 88 Z', '#e6f8ff', so(1.2)) + P(starD(67, 39, 4.6, 1.4, 6), '#fff', 'opacity=".85"') + P(starD(31, 47, 3, 1, 6), '#fff', 'opacity=".7"');
  const hol = x => E(x, 51, 4.4, 6, dk) + Ci(x, 52.4, 1.6, g, GLOW);
  s += hol(41) + hol(59);
  if (o.mood === 'sad') s += Ln('M35 45.6 L45.4 42.8', dk, 2.2) + Ln('M65 45.6 L54.6 42.8', dk, 2.2);
  if (o.mood === 'angry') s += Ln('M35 42.4 L46 46.4', dk, 2.6) + Ln('M65 42.4 L54 46.4', dk, 2.6);
  if (o.mouth === 'howl') s += E(50, 68, 5.4, 8, dk);
  else if (o.mouth === 'o') s += E(50, 66.5, 3, 3.8, dk);
  else if (o.mouth === 'wail') s += Ln('M43 67 Q46.5 64.5 50 67 T57 67', dk, 2.2);
  if (o.chains) s += [[27, 66], [33, 70], [39, 73], [45, 75], [51, 76], [57, 75], [63, 73], [69, 70], [75, 66]].map(([x, y], k) => E(x, y, 3.2, 2.1, 'none', `stroke="#8c8a96" stroke-width="1.7" transform="rotate(${k % 2 ? 60 : -24} ${x} ${y})"`)).join('');
  return s;
}
function wisp(o) {
  const c = o.col, g2 = shade(c, 0.5), dk = '#0d2a2a';
  const d = 'M50 13 C 58 27, 73 38, 72 58 C 71 74, 62 86, 50 86 C 38 86, 29 74, 28 58 C 27.5 47, 35 40, 39 31 C 42 37, 44.5 40, 47 42 C 46.5 32, 48 23, 50 13 Z';
  let s = P(d, c, 'opacity=".7" filter="url(#fx-blur)"') + P(d, c, so());
  s += P('M50 40 C 55 48, 63 54, 62 64 C 61 74, 56 80, 50 80 C 44 80, 39 74, 38 65 C 38 57, 46 52, 50 40 Z', g2, 'opacity=".85"');
  s += E(44, 61, 2.8, 3.6, dk) + Ci(45, 59.6, 1, '#fff') + E(56, 61, 2.8, 3.6, dk) + Ci(57, 59.6, 1, '#fff') + E(50, 68.6, 1.8, 1.4, dk);
  s += [[24, 30, 1.6], [78, 40, 1.3], [70, 18, 1.1], [26, 72, 1.2]].map(([x, y, r]) => Ci(x, y, r, g2, GLOW)).join('');
  return s;
}
function lich() {
  const robe = '#4b2f7a', bone = '#ece3c8', dk = '#140c1c', g = '#b48cff';
  let s = P('M20 60 C 18 32, 33 17, 50 17 C 67 17, 82 32, 80 60 C 82 78, 76 90, 72 104 L 28 104 C 24 90, 18 78, 20 60 Z', robe, so());
  s += P('M14 104 C 16 86, 28 80, 40 78 L 60 78 C 72 80, 84 86, 86 104 Z', shade(robe, -0.2), so()) + Ln('M38 104 L44 79 M62 104 L56 79', '#d9b45a', 2);
  s += P('M30 58 C 28 32, 72 32, 70 58 Z', '#0b0712');
  s += Ci(50, 46, 17.5, bone, so()) + P('M40.5 57 L59.5 57 L58 69 Q50 72.4 42 69 Z', bone, so());
  s += E(43, 46.6, 4.6, 5.2, dk) + E(57, 46.6, 4.6, 5.2, dk) + Ci(43, 47.4, 1.9, g, GLOW) + Ci(57, 47.4, 1.9, g, GLOW);
  s += P('M48.4 53 L51.6 53 L50 56.6 Z', dk) + Ln('M43.5 62 L56.5 62 M46.4 59 L46.4 66.4 M50 59 L50 67.2 M53.6 59 L53.6 66.4', dk, 1.3);
  s += P('M28.5 52 C 27 31, 39 24, 50 24 C 61 24, 73 31, 71.5 52 C 66 37, 58 32, 50 32 C 42 32, 34 37, 28.5 52 Z', robe, so());
  s += `<g transform="translate(0 -8)">${HAT.crown('#e2b452')}</g>`;
  return s;
}
function wraith() {
  const robe = '#2f2450', g = '#7fffd4';
  let s = [[18, 40, 3], [83, 56, 2.4], [77, 22, 2], [22, 76, 2.2]].map(([x, y, r]) => Ci(x, y, r, g, 'opacity=".55" ' + GLOW)).join('');
  s += P('M22 70 C 20 40, 34 18, 50 14 C 66 18, 80 40, 78 70 C 78 84, 70 96, 66 104 L 34 104 C 30 96, 22 84, 22 70 Z', robe, so());
  s += P('M12 104 C 14 88, 24 82, 36 80 L 64 80 C 76 82, 86 88, 88 104 Z', shade(robe, -0.25), so());
  s += E(50, 53, 15.5, 18.5, '#07050d', so(1.6));
  s += E(43.5, 51, 3.6, 2.2, g, GLOW) + E(56.5, 51, 3.6, 2.2, g, GLOW);
  s += P('M33 56 C 31 36, 40 28, 50 28 C 60 28, 69 36, 67 56 C 64 42, 58 36, 50 36 C 42 36, 36 42, 33 56 Z', shade(robe, 0.12), so(1.8));
  s += `<g transform="translate(0 -13)">${HAT.crown('#cfd6dd')}</g>`;
  return s;
}

/* ---------- neutres spéciaux ---------- */
function knight(o) {
  const c = o.col, d = shade(c, -0.3), hi = shade(c, 0.45);
  let s = '';
  if (o.plume) s += P('M47 30 C 40 12, 56 1, 74 6 C 63 9, 57 17, 54 30 Z', o.plume, so());
  if (o.wings) { const w = P('M28 46 C 16 40, 8 30, 6 18 C 14 24, 20 26, 26 26 C 20 22, 17 17, 16 11 C 23 18, 28 22, 30 30 Z', '#f4f0e6', so(1.8)); s += w + mirror(w); }
  s += P('M14 104 C 14 87, 22 79, 34 78 L 66 78 C 78 79, 86 87, 86 104 Z', d, so());
  s += P('M40 79 L60 79 L58.5 104 L41.5 104 Z', o.tabard || '#2f5d8a', so(1.8));
  if (o.emblem) s += P(starD(50, 92, 5, 2.2, o.emblem), '#f2c14e', so(1));
  s += E(25.5, 85, 12.5, 9.5, c, so()) + E(74.5, 85, 12.5, 9.5, c, so()) + Ln('M17 83 Q25.5 79 34 83 M66 83 Q74.5 79 83 83', hi, 1.6, 'opacity=".7"');
  s += P('M27 71 L27 45 C 27 24, 73 24, 73 45 L73 71 Q50 78 27 71 Z', c, so());
  s += Ln('M50 25.5 L50 45', d, 2, 'opacity=".55"');
  s += P('M31.5 46 L68.5 46 L68.5 51.6 L31.5 51.6 Z', '#14100c', so(1.4));
  if (o.glow) s += E(41, 48.8, 3.2, 1.6, o.glow, GLOW) + E(59, 48.8, 3.2, 1.6, o.glow, GLOW);
  s += Ln('M50 51.6 L50 69.6', d, 2.6);
  for (const [x, y] of [[57, 58], [61, 58], [57, 62.5], [61, 62.5], [57, 67], [61, 67]]) s += Ci(x, y, 1.05, '#14100c');
  s += Ln('M32.6 40 C 35 31, 42 28.5, 49 28.5', hi, 2.6, 'opacity=".8"');
  for (const [x, y] of [[29.6, 50], [70.4, 50], [29.6, 64], [70.4, 64]]) s += Ci(x, y, 1.4, hi, so(0.9));
  if (o.band) s += Ln('M27.5 40 Q50 36 72.5 40', o.band, 3.2);
  return s;
}
function golem() {
  const c = '#8d8a82', d = shade(c, -0.3), g = '#7fe9ff';
  let s = E(23, 89, 16, 13, shade(c, -0.12), so()) + E(77, 89, 16, 13, shade(c, -0.12), so()) + P('M30 104 L34 80 L66 80 L70 104 Z', shade(c, -0.05), so());
  s += Ln('M19 88 L23 83 L27 88 M73 88 L77 83 L81 88', g, 1.4, GLOW);
  s += P('M28 71 L25 45 L31.6 29 L50 23 L68.4 29 L75 45 L72 71 L50 77.6 Z', c, so());
  s += Ln('M36 31 L40.5 39 L37 45.6 M64 58 L60 64 L63.6 70 M45 70 L48 74', d, 1.5);
  s += E(34, 29.6, 6, 2.8, '#6f8f45', so(1)) + E(66, 72, 4.6, 2.2, '#6f8f45', so(1)) + E(72, 40, 3, 1.6, '#7fa553');
  s += P('M30.6 45 L69.4 45 L66.6 50.4 L33.4 50.4 Z', d, so(1.6));
  s += P('M36 52 L46 52 L45 56.4 L37 56.4 Z', g, GLOW) + P('M54 52 L64 52 L63 56.4 L55 56.4 Z', g, GLOW);
  s += Ln('M46.6 31.4 L50 36.6 L53.4 31.4 M50 36.6 L50 41', g, 1.8, GLOW) + Ln('M39.6 65 L60.4 65', d, 2.8);
  return s;
}
function kraken() {
  const c = '#a3425c', l = shade(c, 0.3);
  const tents = ['M30 62 C 20 74, 12 82, 15 98 C 20 92, 22 84, 34 72 Z', 'M39 66 C 33 80, 31 90, 37 104 C 41 96, 41 86, 45 72 Z'];
  let s = '';
  for (const t of tents) { const one = P(t, c, so()); s += one + mirror(one); }
  s += P('M47 68 C 46 82, 50 92, 49 104 C 55 96, 56 84, 54 70 Z', c, so());
  s += [[18, 92], [21, 84], [37, 96], [38, 87], [63, 96], [62, 87], [82, 92], [79, 84], [51, 94]].map(([x, y]) => Ci(x, y, 1.5, l, so(0.8))).join('');
  s += P('M25 60 C 21 29, 79 29, 75 60 C 73 71, 27 71, 25 60 Z', c, so());
  s += E(37, 42, 3.2, 2.2, l) + E(63, 44, 2.6, 1.8, l) + E(50, 37, 2, 1.4, l);
  const eye = x => E(x, 55, 6.2, 5.6, '#f6e7b0', so(1.6)) + P(`M${x - 4.4} 54 L${x + 4.4} 54 L${x + 4.4} 56.6 L${x - 4.4} 56.6 Z`, OUT);
  s += eye(39) + eye(61);
  s += `<g transform="translate(0 -3)">${HAT.tricorn('#2a1f2e')}</g>`;
  return s;
}

/* ---------- les quatre doubleurs ---------- */
function hourglass(x, y) {
  const glass = `M${x - 7} ${y + 3.5} C ${x - 7} ${y + 11} ${x - 1.3} ${y + 12.5} ${x - 1.3} ${y + 15} C ${x - 1.3} ${y + 17.5} ${x - 7} ${y + 19} ${x - 7} ${y + 26} L ${x + 7} ${y + 26} C ${x + 7} ${y + 19} ${x + 1.3} ${y + 17.5} ${x + 1.3} ${y + 15} C ${x + 1.3} ${y + 12.5} ${x + 7} ${y + 11} ${x + 7} ${y + 3.5} Z`;
  return softGlow(x, y + 15, 14, '#ffd27a', .16)
    + P(glass, '#d9f2f7', 'opacity=".5"')
    + P(`M${x - 5.6} ${y + 8} L${x + 5.6} ${y + 8} Q${x + 2} ${y + 12} ${x} ${y + 14.6} Q${x - 2} ${y + 12} ${x - 5.6} ${y + 8} Z`, '#f2c14e')
    + P(`M${x - 6.6} ${y + 25.6} Q${x} ${y + 17.5} ${x + 6.6} ${y + 25.6} Z`, '#f2c14e')
    + Ln(`M${x} ${y + 14.6} L${x} ${y + 23}`, '#ffe9a8', 1.1, GLOW)
    + P(glass, 'none', so(1.6)) + Ln(`M${x - 4.6} ${y + 5.5} C ${x - 4.6} ${y + 9} ${x - 2.6} ${y + 10.5} ${x - 2} ${y + 11.5}`, '#fff', 1, 'opacity=".75"')
    + `<rect x="${x - 10}" y="${y}" width="20" height="4" rx="1.5" fill="#7a4a28" ${so(1.6)}/><rect x="${x - 10}" y="${y + 25.5}" width="20" height="4" rx="1.5" fill="#7a4a28" ${so(1.6)}/>`
    + Ln(`M${x - 8.6} ${y + 4} L${x - 8.6} ${y + 25.5} M${x + 8.6} ${y + 4} L${x + 8.6} ${y + 25.5}`, OUT, 3.4) + Ln(`M${x - 8.6} ${y + 4} L${x - 8.6} ${y + 25.5} M${x + 8.6} ${y + 4} L${x + 8.6} ${y + 25.5}`, '#c8963e', 1.6);
}
function artSablier() {
  let s = Ci(50, 40, 37, '#efe0b8', so(2)) + Ci(50, 40, 32.5, 'none', 'stroke="#8a5a2a" stroke-width="1.4"') + Ci(50, 40, 37, 'none', 'stroke="#c8963e" stroke-width="3.5" opacity=".9"');
  for (let k = 0; k < 60; k++) { const a = k / 60 * Math.PI * 2, big = k % 5 === 0, r1 = big ? 27.5 : 30.5; s += Ln(`M${f1(50 + Math.cos(a) * r1)} ${f1(40 + Math.sin(a) * r1)} L${f1(50 + Math.cos(a) * 32.5)} ${f1(40 + Math.sin(a) * 32.5)}`, '#5a3412', big ? 1.6 : 0.6); }
  s += Ln('M50 40 L50 9.5', '#3a2412', 2.6) + P('M50 6 L52.6 12 L47.4 12 Z', '#3a2412') + Ln('M50 40 L50 15', '#c8963e', 1.2);
  s += [[10, 12], [90, 16], [8, 56], [92, 60], [82, 6]].map(([x, y]) => P(starD(x, y, 2.6, 0.9, 4), '#fff1b8', 'opacity=".8"')).join('');
  s += human({ skin:'#e6c0a0', hair:'#e8e2da', hs:'bald', hat:'hood', hatc:'#2c3a6e', beard:'long', beardc:'#f3f0ea', eyes:'glow', glow:'#ffd27a', mouth:'flat', shirt:'#2c3a6e', noblush:true });
  s += Ln('M37 22.6 Q50 19 63 22.6', '#e2b452', 1.6) + P(starD(50, 21.4, 3.4, 1.4, 4), '#ffe9a8', GLOW);
  s += hourglass(17, 68) + hourglass(83, 68);
  s += [[30, 64], [70, 64], [16, 60], [84, 60]].map(([x, y], k) => Ci(x, y, k < 2 ? 1 : 0.8, '#ffe9a8', GLOW)).join('');
  return s;
}
function lantern(x, y) {
  return softGlow(x, y + 1, 14, '#8dff9a', .22)
    + Ln(`M${x} ${y - 12} L${x} ${y - 18}`, OUT, 1.4) + Ci(x, y - 20, 2.4, 'none', so(1.3))
    + P(`M${x - 6.5} ${y - 7.5} L${x + 6.5} ${y - 7.5} L${x + 4} ${y - 12.5} L${x - 4} ${y - 12.5} Z`, '#3a3530', so(1.5))
    + `<rect x="${x - 6}" y="${y - 7.5}" width="12" height="17.5" rx="1.5" fill="#bff7b6" opacity=".55"/>`
    + P(`M${x} ${y - 5.5} C ${x + 4.6} ${y - 0.5} ${x + 4.4} ${y + 6.5} ${x} ${y + 7.6} C ${x - 4.4} ${y + 6.5} ${x - 4.6} ${y - 0.5} ${x} ${y - 5.5} Z`, '#eaffdf', GLOW)
    + E(x - 1.5, y + 2.4, 0.7, 1.1, '#1d3a24') + E(x + 1.5, y + 2.4, 0.7, 1.1, '#1d3a24') + E(x, y + 4.8, 0.7, 0.5, '#1d3a24')
    + `<rect x="${x - 6}" y="${y - 7.5}" width="12" height="17.5" rx="1.5" fill="none" ${so(1.6)}/>`
    + Ln(`M${x - 2} ${y - 7.5} L${x - 2} ${y + 10} M${x + 2} ${y - 7.5} L${x + 2} ${y + 10}`, '#3a3530', 1)
    + `<rect x="${x - 7.5}" y="${y + 10}" width="15" height="3.6" rx="1.2" fill="#3a3530" ${so(1.4)}/>`;
}
function artFossoy() {
  let s = Ci(24, 18, 9, '#eef2d8', 'opacity=".85"') + Ci(28.5, 15.5, 8, '#3a3e4a');
  s += [[66, 10], [80, 22], [14, 34], [90, 40]].map(([x, y]) => Ci(x, y, 0.9, '#fff', 'opacity=".7"')).join('');
  s += P('M4 104 L4 70 Q15 56 26 70 L26 104 Z', '#6f7378', so(2)) + Ln('M15 70 L15 84 M10.5 75 L19.5 75', '#4a4d52', 2);
  s += P('M76 104 L76 74 Q86 63 96 74 L96 104 Z', '#62666b', so(2)) + Ln('M81 82 L91 82 M81 87 L89 87', '#4a4d52', 1.4);
  s += `<g transform="translate(83 20) rotate(20)">${P('M-7.5 -12 L7.5 -12 L7.5 3 Q0 13 -7.5 3 Z', '#8a9097', so(2))}${Ln('M-4 -9 L-4 2', '#c4c9ce', 1.2)}${Ln('M0 -12 L0 -18', OUT, 3.6)}${Ln('M0 -12 L0 -18', '#7a4a28', 1.8)}${Ln('M0 4 L0 92', OUT, 4.6)}${Ln('M0 4 L0 92', '#7a4a28', 2.6)}</g>`;
  s += softGlowE(30, 96, 30, 6, '#dfe7d8', .25) + softGlowE(76, 99, 30, 6, '#dfe7d8', .22);
  s += human({ skin:'#d3dac6', hair:'#6a6a72', hs:'side', beard:'stubble', beardc:'#4a4a52', eyes:'dot', mouth:'smirk', nose:'big', shirt:'#2b2a33', collar:'#6b2a3a', noblush:true, earring:true });
  s += E(37, 53.5, 4.6, 1.6, '#9aa58f', 'opacity=".5"') + E(63, 53.5, 4.6, 1.6, '#9aa58f', 'opacity=".5"');
  s += P('M35.5 34 L37 8 L63 8 L64.5 34 Z', '#26232c', so()) + Ln('M36 28.5 L64 28.5', '#6b2a3a', 3.4) + E(50, 34.5, 25, 4.6, '#1f1d24', so()) + Ln('M39 11 L38.2 26', '#fff', 1.2, 'opacity=".18"');
  s += P(starD(43, 28.5, 2.4, 1, 4), '#8dff9a', GLOW);
  s += lantern(19, 76) + lantern(81, 76);
  return s;
}
function trumpet(flagCol) {
  return Ln('M0 0 L0 -50', OUT, 4.6) + Ln('M0 0 L0 -50', '#f2c14e', 2.6) + Ln('M-0.6 -6 L-0.6 -46', '#fff3c4', 0.9)
    + P('M-2.2 -49 L-9 -61 Q0 -65.5 9 -61 L2.2 -49 Z', '#f2c14e', so(1.8)) + E(0, -62.2, 8.6, 2.2, '#a87418', so(1.4))
    + Ci(0, 1.5, 2.4, '#f2c14e', so(1.4))
    + P('M1.8 -42 L15 -42 L12 -33.5 L15 -25 L1.8 -25 Z', flagCol, so(1.6)) + P(starD(7.8, -33.5, 3.2, 1.3, 5), '#f2c14e');
}
function artHeraut() {
  let s = '';
  for (let k = 0; k < 14; k++) { const a = k / 14 * Math.PI * 2, a1 = a - 0.11, a2 = a + 0.11; s += P(`M50 44 L${f1(50 + Math.cos(a1) * 80)} ${f1(44 + Math.sin(a1) * 80)} L${f1(50 + Math.cos(a2) * 80)} ${f1(44 + Math.sin(a2) * 80)} Z`, '#fff2c0', 'opacity=".2"'); }
  s += softGlow(50, 44, 30, '#fff2c0', .25);
  s += `<g transform="translate(31 95) rotate(-17)">${trumpet('#8a2a24')}</g>` + `<g transform="translate(69 95) rotate(17) scale(-1 1)">${trumpet('#8a2a24')}</g>`;
  const wave = 'M0 0 Q 4 -4 0 -8';
  s += [[13, 26, -40], [9, 31, -40], [87, 26, 40], [91, 31, 40]].map(([x, y, r], k) => `<g transform="translate(${x} ${y}) rotate(${r})">${Ln(k % 2 ? 'M0 0 Q 5 -5 0 -10' : wave, '#fff3c4', 1.6, 'opacity=".85"')}</g>`).join('');
  s += human({ skin:'#f2c6a2', hair:'#e0b25a', hs:'curly', hat:'beret', hatc:'#8a2a24', eyes:'happy', mouth:'o', freckles:true, shirt:'#8a2a24', collar:'#e2b452' });
  s += P(starD(50, 93, 5.4, 2.3, 5), '#e2b452', so(1)) + Ln('M37 84 L37 104 M63 84 L63 104', '#e2b452', 1.6);
  s += P('M62 21 C 68 13, 78 11, 84 13 C 78 15, 72 19, 66 25 Z', '#f3ecdc', so(1.4)) + Ln('M64 22.5 C 70 16, 77 14, 83 13.4', '#c8b89a', 0.9);
  return s;
}
function drum(x, y, w) {
  let ropes = ''; for (let k = 0; k < 6; k++) { const x0 = x - w + 1 + k * (2 * w - 2) / 6, x1 = x0 + (2 * w - 2) / 6; ropes += `M${f1(x0)} ${y + 2} L${f1((x0 + x1) / 2)} ${y + 14} L${f1(x1)} ${y + 2}`; }
  return P(`M${x - w} ${y} L${x - w} ${y + 15} Q${x} ${y + 21} ${x + w} ${y + 15} L${x + w} ${y} Z`, '#8a2a24', so(2))
    + Ln(ropes, '#f0e2bd', 1.1) + Ln(`M${x - w} ${y + 14.6} Q${x} ${y + 20.4} ${x + w} ${y + 14.6}`, '#c8963e', 2.4)
    + E(x, y, w, 4, '#f6ead0', so(2)) + E(x, y, w - 2.4, 2.6, 'none', 'stroke="#c8963e" stroke-width="1.6"')
    + P(starD(x + 2, y - 0.4, 3.6, 1.2, 6), '#fffbe6', 'opacity=".8"');
}
function drumstick(x1, y1, x2, y2) { return Ln(`M${x1} ${y1} L${x2} ${y2}`, OUT, 3.6) + Ln(`M${x1} ${y1} L${x2} ${y2}`, '#c98d3e', 2) + Ci(x2, y2, 2.4, '#f0e2bd', so(1.2)); }
function artTambour() {
  let s = softGlow(50, 46, 44, '#ff8a3a', .28);
  const spear = (x1, y1, x2, y2, a) => Ln(`M${x1} ${y1} L${x2} ${y2}`, OUT, 3.4) + Ln(`M${x1} ${y1} L${x2} ${y2}`, '#6b4a2a', 1.8) + `<g transform="translate(${x2} ${y2}) rotate(${a})">${P('M0 -9 L3 0 L0 3 L-3 0 Z', '#c4c9ce', so(1.2))}</g>`;
  s += spear(30, 104, 92, 48, 48) + spear(70, 104, 8, 48, -48);
  s += [[14, 28, 6], [22, 20, 5], [84, 30, 6], [78, 22, 4.5]].map(([x, y, r]) => Ci(x, y, r, '#8a7a6e', 'opacity=".45"')).join('');
  s += human({ skin:'#e3a982', hair:'#b8452c', hs:'bald', beard:'full', beardc:'#c2502e', eyes:'dot', angry:true, mouth:'grin', nose:'big', shirt:'#5d4a32', scar:true });
  const horn = P('M30.5 37 C 18 33, 11 22, 13.5 9 C 18.5 20, 25 25, 33.5 28.6 Z', '#efe4c8', so(1.8)) + Ln('M17 22 L21 20.4 M22 27.4 L25.6 25.4', '#c8b89a', 1.2);
  s += horn + mirror(horn);
  s += P('M28.5 43 C 28 21, 72 21, 71.5 43 Z', '#9aa3ab', so()) + Ln('M34 33 C 36 27, 42 24.5, 48 24.2', '#e8edf0', 2.2, 'opacity=".7"');
  s += P('M27 41 L73 41 L73 46.4 Q50 49.4 27 46.4 Z', '#c8963e', so(1.8)) + [33, 41, 50, 59, 67].map(x => Ci(x, 44, 1.1, '#fff1b8')).join('');
  s += P('M48 46 L52 46 L51.4 56 L48.6 56 Z', '#9aa3ab', so(1.4));
  s += drum(23, 82, 13) + drum(77, 82, 13);
  s += drumstick(8, 62, 19, 79) + drumstick(36, 64, 26, 79) + drumstick(64, 64, 74, 79) + drumstick(92, 62, 81, 79);
  s += Ln('M12 74 L8 70 M34 74 L38 70 M66 74 L62 70 M88 74 L92 70', '#fff1b8', 1.3, 'opacity=".8"');
  return s;
}

function fireballArt(x, y, r) {
  let tongues = '';
  for (let k = 0; k < 7; k++) { const a = -Math.PI / 2 + (k - 3) * 0.32, L = r * (1.7 + (k % 2) * 0.45); tongues += `M${f1(x + Math.cos(a - 0.5) * r * 0.8)} ${f1(y + Math.sin(a - 0.5) * r * 0.8)} Q${f1(x + Math.cos(a) * L * 0.75)} ${f1(y + Math.sin(a) * L * 0.75)} ${f1(x + Math.cos(a) * L)} ${f1(y + Math.sin(a) * L)} Q${f1(x + Math.cos(a + 0.2) * r * 1.1)} ${f1(y + Math.sin(a + 0.2) * r * 1.1)} ${f1(x + Math.cos(a + 0.5) * r * 0.8)} ${f1(y + Math.sin(a + 0.5) * r * 0.8)} Z`; }
  return softGlow(x, y, r * 2.2, '#ff8a2a', .35) + P(tongues, '#ff6a1a', so(1.6)) + Ci(x, y, r, '#ff9a2e', so(1.8))
    + Ci(x, y + r * 0.1, r * 0.7, '#ffd34d') + Ci(x - r * 0.15, y + r * 0.2, r * 0.38, '#fff6c8', GLOW)
    + [[x - r * 1.6, y + r * 0.9, 1.2], [x + r * 1.5, y + r * 0.6, 1], [x + r * 0.9, y - r * 2.4, 0.9]].map(([a, b, c]) => Ci(f1(a), f1(b), c, '#ffd34d', GLOW)).join('');
}
function artNono() {
  let s = softGlow(70, 70, 34, '#ff7a2a', .3);
  s += [[14, 20], [86, 14], [10, 60], [24, 8]].map(([x, y]) => Ci(x, y, 1.2, '#ffb04a', GLOW)).join('');
  s += human({ skin:'#d9a07a', hair:'#22160f', hs:'curly', hat:'wizard', hatc:'#9a2a1c', beard:'goatee', beardc:'#22160f', eyes:'dot', mouth:'grin', angry:false, shirt:'#9a2a1c', collar:'#f2c14e', earring:true, nose:'big' });
  s += P(starD(48, 22, 3.2, 1.3, 5), '#ffd34d', GLOW);
  s += Ln('M42 44.6 Q43.5 43 46 44.2', '#ffb04a', 1.2, 'opacity=".9"') + E(42.5, 50.2, 0.9, 0.9, '#ffb04a', GLOW) + E(57.5, 50.2, 0.9, 0.9, '#ffb04a', GLOW);
  s += P('M64 104 C 66 94, 70 88, 76 86 L84 92 C 80 95, 76 98, 74 104 Z', '#9a2a1c', so(1.8)) + E(80, 87, 6.5, 5.4, '#d9a07a', so(1.8));
  s += fireballArt(80, 74, 9.5);
  return s;
}

/* ---------- compagnons des héros ---------- */
function compHalo(col) { return softGlow(50, 50, 42, col, .28) + Ci(50, 50, 40, 'none', `stroke="${col}" stroke-width="1.2" stroke-dasharray="2 4" opacity=".7"`); }
function artBricole() {
  let s = compHalo('#7fe9ff');
  s += `<path d="${gearD(18, 22, 12, 8, 4)}" fill="#c49a4c" fill-rule="evenodd" ${so(1.4)}/><path d="${gearD(84, 30, 9, 7, 3)}" fill="#9aa3ab" fill-rule="evenodd" ${so(1.4)}/>`;
  s += human({ skin:'#f6d2b0', hair:'#3f8ad0', hs:'braids', ears:'pointy', nose:'big', eyes:'goggles', glow:'#7fe9ff', mouth:'grin', freckles:true, shirt:'#6b4a2a', apron:'#8a5a2b', prop:'wrench' });
  s += Ln('M36 92 L44 92 M56 92 L64 92', '#c8963e', 2) + Ci(40, 97, 1.6, '#c8963e') + Ci(60, 97, 1.6, '#c8963e');
  return s;
}
function artLumen() {
  let s = compHalo('#fff2b0') + softGlow(50, 46, 26, '#fff6c8', .55);
  const wing = P('M36 60 C 20 54, 8 40, 8 24 C 18 32, 26 34, 34 32 C 24 28, 20 20, 22 12 C 30 22, 38 28, 44 44 Z', '#f8f2ff', so(1.6) + ' opacity=".95"') + Ln('M12 28 C 20 36, 30 42, 40 50 M24 18 C 30 28, 36 36, 42 46', '#c8b8e8', 1);
  s += wing + mirror(wing);
  s += human({ skin:'#f3d6bc', hair:'#fff1b8', hs:'curly', hat:'circlet', hatc:'#e8eef2', eyes:'happy', mouth:'smile', shirt:'#f2ece0', collar:'#e2b452' });
  s += P('M50 76 L64 81 L62.6 92 C 61 98, 56 102, 50 104 C 44 102, 39 98, 37.4 92 L36 81 Z', '#e2b452', so(1.8)) + P(starD(50, 89, 5, 2.2, 8), '#fff6c8', GLOW);
  return s;
}
function artFiole() {
  let s = compHalo('#9be36a');
  s += P('M40 10 L60 10 L60 30 C 82 38, 90 62, 80 80 C 72 94, 28 94, 20 80 C 10 62, 18 38, 40 30 Z', '#d9f2f7', 'opacity=".45"');
  s += P('M18 66 C 34 60, 66 70, 82 62 C 84 72, 80 80, 76 86 C 66 96, 34 96, 24 86 C 20 80, 16 74, 18 66 Z', '#8fe36a', 'opacity=".75"');
  s += P('M34 86 C 30 72, 34 52, 50 50 C 66 52, 70 72, 66 86 Z', '#5fbf3a', so(2));
  s += Ci(43, 64, 6, '#fff', so(1.4)) + Ci(57, 64, 6, '#fff', so(1.4)) + Ci(44, 65, 3, OUT) + Ci(58, 65, 3, OUT) + Ci(45, 63.6, 1, '#fff') + Ci(59, 63.6, 1, '#fff');
  s += P('M44 74 Q50 79 56 74 Z', '#2f5a1a', so(1.2)) + Ln('M38 56 L33 49 M62 56 L67 49', '#3f7a2a', 2) + Ci(33, 48, 2, '#8fe36a', so(1)) + Ci(67, 48, 2, '#8fe36a', so(1));
  s += [[28, 50, 2.2], [72, 46, 1.8], [30, 76, 1.6], [70, 78, 2]].map(([x, y, r]) => Ci(x, y, r, '#eaffdf', so(0.8) + ' opacity=".8"')).join('');
  s += P('M40 10 L60 10 L60 30 C 82 38, 90 62, 80 80 C 72 94, 28 94, 20 80 C 10 62, 18 38, 40 30 Z', 'none', so(2.4)) + Ln('M28 46 C 22 56, 22 66, 26 74', '#fff', 2, 'opacity=".6"');
  s += `<rect x="37" y="4" width="26" height="9" rx="2.5" fill="#a0703e" ${so(1.8)}/>`;
  return s;
}
function artSou() {
  let s = compHalo('#f2c14e');
  s += P('M22 104 C 24 86, 36 78, 50 78 C 64 78, 76 86, 78 104 Z', '#b9926a', so()) + P('M40 104 C 41 92, 45 86, 50 86 C 55 86, 59 92, 60 104 Z', '#f1e2c6');
  s += Ci(31, 32, 7, '#b9926a', so()) + Ci(69, 32, 7, '#b9926a', so()) + Ci(31, 32, 3.6, '#f2b8a8') + Ci(69, 32, 3.6, '#f2b8a8');
  s += P('M26 52 C 26 34, 74 34, 74 52 C 74 64, 64 74, 50 76 C 36 74, 26 64, 26 52 Z', '#b9926a', so());
  s += P('M30 48 C 36 42, 44 44, 48 50 C 44 56, 34 56, 30 48 Z', '#5a3d2a') + P('M70 48 C 64 42, 56 44, 52 50 C 56 56, 66 56, 70 48 Z', '#5a3d2a');
  s += P('M38 58 C 42 54, 58 54, 62 58 C 60 68, 56 74, 50 75 C 44 74, 40 68, 38 58 Z', '#f6ead6');
  s += Ci(40, 50, 2.6, OUT) + Ci(41, 49, 0.8, '#fff') + Ci(60, 50, 4.6, 'none', 'stroke="#e2b452" stroke-width="1.8"') + Ci(60, 50, 2.6, OUT) + Ci(61, 49, 0.8, '#fff') + Ln('M64.4 52 C 68 60, 66 70, 70 76', '#e2b452', 1);
  s += E(50, 61, 3, 2.2, '#3a2418') + Ln('M50 63 L50 66 M46 67 Q50 70 54 67', OUT, 1.4) + Ln('M42 62 L30 60 M42 64 L31 66 M58 62 L70 60 M58 64 L69 66', OUT, 0.9);
  s += `<g transform="translate(72 84) rotate(-14)">${E(0, 0, 10, 10, '#f2c14e', so(1.8))}${E(0, 0, 6.8, 6.8, 'none', 'stroke="#b37c26" stroke-width="1.4"')}${P(starD(0, 0, 4, 1.6, 4), '#fff6c8')}</g>`;
  return s;
}
function artCroc() {
  let s = compHalo('#d9503f');
  s += beast({ sp:'wolf', col:'#8a7a6a', belly:'#e9dccb', eye:'#ffd23f', fangs:true });
  s += P('M30 78 Q50 88 70 78 L68 86 Q50 96 32 86 Z', '#c8392f', so(1.8)) + P('M58 84 L66 98 L72 92 L64 82 Z', '#c8392f', so(1.6));
  s += P('M64 22 C 70 12, 80 8, 90 6 C 86 14, 78 20, 68 26 Z', '#d9503f', so(1.4)) + Ln('M66 24 C 74 16, 82 11, 89 7', '#8a2a24', 1);
  return s;
}
function artPlume() {
  let s = compHalo('#b48cff');
  s += P('M26 104 C 22 80, 26 58, 50 56 C 74 58, 78 80, 74 104 Z', '#8a6a4a', so());
  for (let k = 0; k < 4; k++) s += Ln(`M${36 + k * 9} ${74 + (k % 2) * 4} q 4 4 8 0`, '#5a4430', 1.4);
  s += P('M22 50 C 20 28, 34 18, 50 18 C 66 18, 80 28, 78 50 C 76 66, 64 72, 50 72 C 36 72, 24 66, 22 50 Z', '#a8845e', so());
  s += P('M26 22 L30 8 L40 20 Z', '#a8845e', so(1.6)) + P('M74 22 L70 8 L60 20 Z', '#a8845e', so(1.6));
  s += P('M30 46 C 30 34, 46 32, 50 42 C 54 32, 70 34, 70 46 C 70 58, 56 62, 50 54 C 44 62, 30 58, 30 46 Z', '#f1e2c6');
  s += Ci(40, 45, 8, '#fff', so(1.6)) + Ci(60, 45, 8, '#fff', so(1.6)) + Ci(40, 45, 5, '#e2a43a') + Ci(60, 45, 5, '#e2a43a') + Ci(40, 45, 2.8, OUT) + Ci(60, 45, 2.8, OUT) + Ci(41.4, 43.6, 1, '#fff') + Ci(61.4, 43.6, 1, '#fff');
  s += Ci(40, 45, 9.6, 'none', 'stroke="#c8963e" stroke-width="1.6"') + Ci(60, 45, 9.6, 'none', 'stroke="#c8963e" stroke-width="1.6"') + Ln('M49.6 45 L50.4 45', '#c8963e', 1.6);
  s += P('M46 54 L54 54 L50 62 Z', '#e2a43a', so(1.4));
  s += '<g transform="translate(30 82) rotate(-6)">' + `<rect x="0" y="0" width="40" height="18" rx="2" fill="#5a3d7a" ${so(1.8)}/>` + Ln('M20 0 L20 18', '#3a2650', 1.6) + `<rect x="2" y="2" width="16" height="14" fill="#f6ead0"/><rect x="22" y="2" width="16" height="14" fill="#f6ead0"/>` + Ln('M5 6 L15 6 M5 9 L15 9 M5 12 L13 12 M25 6 L35 6 M25 9 L33 9', '#8a7a62', 0.8) + P(starD(30, 12, 3, 1.2, 5), '#b48cff', GLOW) + '</g>';
  return s;
}
function artBastion() {
  let s = compHalo('#7fa05a');
  s += E(24, 88, 15, 13, '#8d8a82', so()) + E(76, 88, 15, 13, '#8d8a82', so()) + P('M30 104 L33 78 L67 78 L70 104 Z', '#7d7a72', so());
  s += P('M22 58 C 18 34, 34 20, 50 20 C 66 20, 82 34, 78 58 C 76 74, 64 80, 50 80 C 36 80, 24 74, 22 58 Z', '#9a968c', so());
  s += P('M26 40 C 30 28, 40 22, 50 22 C 44 30, 36 34, 26 40 Z', '#6f8f45', so(1.2)) + E(70, 66, 6, 2.6, '#6f8f45') + E(34, 72, 4, 1.8, '#7fa553');
  s += Ln('M38 30 L42 38 L38 44 M66 34 L62 42 L66 48', '#6a675f', 1.4);
  s += P('M34 50 L46 50 L45 56 L35 56 Z', '#ff8a3a', GLOW) + P('M54 50 L66 50 L65 56 L55 56 Z', '#ff8a3a', GLOW);
  s += P('M40 66 Q50 72 60 66', 'none', 'stroke="#3a3832" stroke-width="2.6" stroke-linecap="round"');
  s += P('M47 76 L50 84 L53 76 Z', '#ff8a3a', GLOW) + Ln('M40 86 L46 96 M60 86 L54 96', '#ff8a3a', 1.6, 'opacity=".8"');
  return s;
}
function artTruelle() {
  let s = compHalo('#e2b452');
  s += P('M22 104 C 24 86, 36 78, 50 78 C 64 78, 76 86, 78 104 Z', '#8a5a32', so()) + P('M40 104 C 41 92, 45 86, 50 86 C 55 86, 59 92, 60 104 Z', '#c8a07a');
  s += Ci(30, 38, 6, '#8a5a32', so()) + Ci(70, 38, 6, '#8a5a32', so());
  s += P('M24 54 C 24 36, 76 36, 76 54 C 76 68, 64 78, 50 78 C 36 78, 24 68, 24 54 Z', '#9a6a3e', so());
  s += E(50, 62, 14, 10, '#c8a07a', so(1.6)) + E(50, 56, 5, 3.6, '#2a1a10') + E(48.6, 55, 1.4, 0.8, '#fff', 'opacity=".6"');
  s += `<rect x="45" y="65" width="10" height="9" rx="1.5" fill="#fff8e6" ${so(1.4)}/>` + Ln('M50 65 L50 74', OUT, 1);
  s += Ci(40, 48, 2.8, OUT) + Ci(60, 48, 2.8, OUT) + Ci(41, 47, 0.9, '#fff') + Ci(61, 47, 0.9, '#fff');
  s += `<g transform="translate(0 4)">${HAT.hardhat('#e2b452')}</g>`;
  s += '<g transform="translate(78 92) rotate(-30)">' + Ln('M0 0 L0 -12', OUT, 4) + Ln('M0 0 L0 -12', '#7a4a28', 2.4) + P('M-8 -12 L8 -12 L0 -30 Z', '#c4c9ce', so(1.6)) + '</g>';
  return s;
}
function artBraise() {
  let s = compHalo('#ff7a2a') + softGlow(50, 56, 34, '#ff6a1a', .3);
  const flame = (x, y, sc) => `<g transform="translate(${x} ${y}) scale(${sc})">${P('M0 0 C -6 -8, -2 -16, 0 -24 C 2 -16, 8 -10, 6 -2 C 4 2, -4 2, 0 0 Z', '#ff8a2a', so(1.2))}${P('M0 -2 C -3 -6, -1 -11, 0 -15 C 2 -10, 4 -6, 2 -2 Z', '#ffd34d')}</g>`;
  s += flame(38, 32, 0.9) + flame(50, 26, 1.1) + flame(62, 32, 0.9);
  s += P('M20 104 C 22 86, 34 76, 50 76 C 66 76, 78 86, 80 104 Z', '#d9502a', so()) + P('M40 104 C 41 92, 45 86, 50 86 C 55 86, 59 92, 60 104 Z', '#ffb04a');
  s += P('M20 56 C 20 38, 36 30, 50 30 C 64 30, 80 38, 80 56 C 80 70, 66 78, 50 78 C 34 78, 20 70, 20 56 Z', '#e0602a', so());
  s += [[34, 42, 3], [62, 40, 2.4], [70, 58, 2.6], [28, 62, 2]].map(([x, y, r]) => Ci(x, y, r, '#ffb04a', 'opacity=".9"')).join('');
  s += E(38, 52, 7, 7.5, '#ffe14a', so(1.6)) + E(62, 52, 7, 7.5, '#ffe14a', so(1.6)) + E(38, 52, 1.8, 5.6, OUT) + E(62, 52, 1.8, 5.6, OUT) + Ci(36, 49, 1.2, '#fff') + Ci(60, 49, 1.2, '#fff');
  s += P('M34 66 Q50 74 66 66', 'none', 'stroke="#5a1d0e" stroke-width="2.2" stroke-linecap="round"') + Ci(45, 62, 1, '#5a1d0e') + Ci(55, 62, 1, '#5a1d0e');
  s += Ln('M66 70 C 70 74, 72 72, 74 76', '#ff6a8a', 1.8);
  s += Ci(84, 22, 1.6, '#ffd34d', GLOW) + Ci(16, 28, 1.3, '#ffd34d', GLOW) + Ci(86, 70, 1.2, '#ffd34d', GLOW);
  return s;
}

/* ---------- table des portraits ---------- */
const ART = {
  r_rouage: () => robot({ col:'#c49a4c', head:'gear', eye:'mono', glow:'#7fe9ff' }),
  r_ferr: () => robot({ col:'#8d938f', head:'box', eye:'odd', mouth:'teeth', ant:true, rust:true, glow:'#ffd27a' }),
  r_piston: () => robot({ col:'#9fb3c4', head:'box', eye:'visor', mouth:'grill', pistons:true, bolts:true, glow:'#7fe9ff' }),
  r_bombe: () => bomb(),
  r_meca: () => human({ skin:'#f0c39a', hair:'#b8452c', hs:'bun', eyes:'goggles', glow:'#8fe3ff', mouth:'grin', freckles:true, shirt:'#3f6c8f', collar:'#2c4d66', prop:'wrench' }),
  r_forge: () => robot({ col:'#5a5f69', head:'dome', eye:'duo', mouth:'furnace', glow:'#ffb347', bolts:true }),
  r_titan: () => robot({ col:'#7a848e', head:'box', eye:'visor', mouth:'teeth', horns:true, bolts:true, glow:'#ff5a4a' }),
  r_colosse: () => robot({ col:'#d8b45c', head:'dome', eye:'mono', mouth:'grill', bolts:true, crown:true, glow:'#7fe9ff' }),
  tk_robot: () => robot({ col:'#b7c3cc', head:'round', eye:'duo', mouth:'smile', ant:true, glow:'#8dff9a' }),
  b_chiot: () => beast({ sp:'dog', col:'#5b5350', belly:'#8a807a', glow:'#ffa53a', embers:true }),
  tk_chiot: () => beast({ sp:'dog', col:'#9a918c', belly:'#d6cfc8', tongue:true, smoke:true }),
  b_chat: () => beast({ sp:'cat', col:'#d98b3a', belly:'#f3d6aa', eye:'#9be36a', stripes:true }),
  tk_chaton: () => beast({ sp:'cat', col:'#b8b2ac', belly:'#ece6df', eye:'#8fd0ff', kitten:true }),
  b_meute: () => beast({ sp:'wolf', col:'#7f848c', belly:'#c7cbd0', eye:'#ffd23f', angry:true, fangs:true }),
  b_venin: () => beast({ sp:'snake', col:'#5f9e46', belly:'#cfe39a', eye:'#ffe14a' }),
  b_louve: () => beast({ sp:'wolf', col:'#cfcac3', belly:'#f3efe9', eye:'#8fd0ff' }),
  tk_louv: () => beast({ sp:'wolf', col:'#a07a55', belly:'#e2c9a6', pup:true }),
  b_cerf: () => beast({ sp:'stag', col:'#a8744a', belly:'#e6caa2' }),
  b_roi: () => beast({ sp:'lion', col:'#e0a94a', belly:'#f6deb0', mane:'#8a4a22', eye:'#ffe27a', crown:true, crownY:-15 }),
  b_fleau: () => beast({ sp:'boar', col:'#5d4440', glow:'#ff4a2e', horns:true }),
  p_pilleur: () => human({ skin:'#d9a27a', hair:'#3b2618', hs:'short', hat:'bandana', hatc:'#c8392f', beard:'stubble', mouth:'grin', earring:true, shirt:'#e9e0cf', collar:'#c8392f' }),
  p_second: () => human({ skin:'#efc3a0', hair:'#5a3a22', hs:'short', hat:'tricorn', hatc:'#2b2330', beard:'mustache', mouth:'smirk', shirt:'#2e3f6e', collar:'#e2b452', scar:true }),
  p_canon: () => human({ skin:'#c98e66', hair:'#1f1612', hs:'bald', beard:'full', mouth:'flat', soot:true, shirt:'#5d6a3c', prop:'ball', angry:true }),
  p_bouc: () => human({ skin:'#e0aa84', hair:'#6b2a1a', hs:'short', hat:'bandana', hatc:'#7a1d1d', eyes:'patch', beard:'goatee', mouth:'grin', scar:true, shirt:'#3a2f2a', prop:'sword' }),
  p_amiral: () => human({ skin:'#bfe3df', hair:'#f2f6f6', hs:'long', hat:'admiral', hatc:'#1d2b45', eyes:'glow', glow:'#7fffd4', mouth:'smirk', noblush:true, shirt:'#1d2b45', collar:'#e2b452' }),
  p_kraken: () => kraken(),
  s_lueur: () => wisp({ col:'#5fd6c6' }),
  s_murmure: () => ghost({ col:'#bfe3f5', glow:'#e9fbff', mood:'sad', mouth:'o', frost:true }),
  s_ame: () => ghost({ col:'#b9a8e3', glow:'#f1e9ff', mood:'sad', mouth:'wail', chains:true }),
  s_hurl: () => ghost({ col:'#8f73d0', glow:'#ffe9a8', mood:'angry', mouth:'howl' }),
  s_liche: () => lich(),
  s_seign: () => wraith(),
  n_garde: () => knight({ col:'#8c949b', tabard:'#2f5d8a', band:'#6b4a2a' }),
  n_bricol: () => human({ skin:'#f2c8a4', hair:'#e8e2da', hs:'side', ears:'pointy', nose:'big', eyes:'goggles', glow:'#ffd27a', beard:'mustache', mouth:'smile', shirt:'#7a5232', prop:'wrench' }),
  n_aube: () => knight({ col:'#e2bb62', tabard:'#f2ece0', wings:true, glow:'#fff2b0', emblem:8 }),
  n_taver: () => human({ skin:'#f0b996', hair:'#6b3a20', hs:'side', beard:'mustache', mouth:'grin', eyes:'happy', shirt:'#efe6d6', apron:'#7a4a2a', prop:'mug' }),
  n_champ: () => knight({ col:'#b07a43', tabard:'#8a2a24', plume:'#c8392f' }),
  n_sage: () => human({ skin:'#e9c3a3', hair:'#eeeeea', hs:'bald', hat:'wizard', hatc:'#2f4f8a', beard:'long', beardc:'#f1f1ee', eyes:'glow', glow:'#9fe8ff', mouth:'flat', shirt:'#2f4f8a', prop:'book' }),
  n_gardien: () => golem(),
  n_sablier: artSablier,
  c_bricole: artBricole, c_lumen: artLumen, c_fiole: artFiole, c_sou: artSou, c_croc: artCroc,
  c_plume: artPlume, c_bastion: artBastion, c_truelle: artTruelle, c_braise: artBraise,
  n_fossoy: artFossoy,
  n_heraut: artHeraut,
  n_tambour: artTambour,
};
const HART = {
  rivet: () => human({ skin:'#f3cba8', hair:'#e2742b', hs:'mohawk', ears:'pointy', nose:'big', eyes:'goggles', glow:'#7fe9ff', mouth:'grin', shirt:'#6b4a2a', prop:'wrench', freckles:true }),
  egide: () => human({ skin:'#f2cfb0', hair:'#f0cf6a', hs:'long', hat:'circlet', hatc:'#e8eef2', mouth:'smile', shirt:'#c9d3db', collar:'#e2b452' }),
  ondine: () => human({ skin:'#e8b894', hair:'#2e8a8a', hs:'bun', eyes:'glasses', mouth:'smirk', shirt:'#5a3d7a', collar:'#c8963e', prop:'flask', flaskc:'#86e36a' }),
  barnabe: () => human({ skin:'#f0b996', hair:'#4a2a18', hs:'short', hat:'beret', hatc:'#8a2a2a', beard:'mustache', mouth:'grin', earring:true, shirt:'#2f6b46', collar:'#e2b452', prop:'coins' }),
  maelle: () => human({ skin:'#d9a07a', hair:'#5a321c', hs:'braids', hat:'feather', hatc:'#4a3022', mouth:'smile', freckles:true, scar:true, shirt:'#7a5a32' }),
  oren: () => human({ skin:'#ebc6a6', hair:'#e9e6e0', hs:'side', eyes:'glasses', beard:'long', beardc:'#eeebe6', mouth:'flat', shirt:'#2a3a5e', collar:'#c8963e', prop:'book' }),
  gor: () => human({ skin:'#7fa05a', hair:'#1f1a14', hs:'mohawk', tusks:true, ears:'pointy', mouth:'frown', angry:true, scar:true, noblush:true, shirt:'#6b4a2e' }),
  nono: artNono,
  ilka: () => human({ skin:'#f0c4a0', hair:'#c8452c', hs:'braids', hat:'hardhat', hatc:'#c8963e', mouth:'grin', freckles:true, shirt:'#4a5a6a', prop:'hammer' }),
};

/* ---------- décors de fond ---------- */
const BGS = (() => {
  let grass = ''; for (let k = 0; k < 17; k++) { const x = k * 6.2 - 2, h = 10 + ((k * 37) % 9); grass += `M${f1(x)} 100 L${f1(x + 2.2)} ${100 - h} L${f1(x + 4.4)} 100 Z`; }
  const stars = [[12, 14], [30, 8], [58, 12], [88, 44], [8, 44], [70, 28], [44, 22]].map(([x, y]) => Ci(x, y, 0.9, '#fff', 'opacity=".7"')).join('');
  return {
    meca: `<path d="${gearD(14, 18, 16, 8, 6)}" fill="#fff" fill-rule="evenodd" opacity=".08"/><path d="${gearD(90, 78, 22, 10, 8)}" fill="#fff" fill-rule="evenodd" opacity=".07"/><path d="${gearD(86, 14, 9, 6, 3)}" fill="#fff" fill-rule="evenodd" opacity=".06"/>`,
    bete: `${Ci(80, 20, 15, '#fff6c8', 'opacity=".35"')}<path d="M0 74 Q22 62 46 70 T100 66 L100 100 L0 100 Z" fill="#2e4a22" opacity=".55"/><path d="${grass}" fill="#355626" opacity=".75"/>`,
    cors: `${Ci(24, 64, 13, '#ffd88f', 'opacity=".85"')}<rect y="64" width="100" height="36" fill="#1f4257"/>${Ln('M0 72 Q8 69 16 72 T32 72 T48 72 T64 72 T80 72 T96 72 T112 72', '#bfe3ef', 1.2, 'opacity=".45"')}${Ln('M-6 82 Q2 79 10 82 T26 82 T42 82 T58 82 T74 82 T90 82 T106 82', '#bfe3ef', 1.2, 'opacity=".3"')}`,
    spec: `${stars}${E(20, 78, 40, 10, '#d9ccff', 'opacity=".1"')}${E(84, 88, 40, 9, '#d9ccff', 'opacity=".09"')}<path d="M78 10 A9 9 0 1 0 86 24 A7 7 0 1 1 78 10 Z" fill="#f2ecff" opacity=".55"/>`,
    neu: `${Ln('M18 0 L18 100 M43 0 L43 100 M68 0 L68 100 M92 0 L92 100', '#2a170b', 1.2, 'opacity=".35"')}${Ci(16, 18, 18, '#ffcf7a', 'opacity=".22"')}`,
    hero: `<rect width="100" height="100" fill="url(#bg-hero)"/>${Ci(50, 46, 40, 'none', 'stroke="#f2c14e" stroke-width="1" opacity=".25"')}${[[16, 20], [84, 26], [22, 70], [80, 74], [50, 8]].map(([x, y]) => P(starD(x, y, 2.4, 0.8, 4), '#f6d77a', 'opacity=".55"')).join('')}`,
  };
})();

/* ---------- icônes (24×24, currentColor) ---------- */
const ICONS = (() => {
  let flake = '';
  for (let k = 0; k < 6; k++) {
    const a = k * Math.PI / 3, x = 12 + Math.cos(a) * 9.5, y = 12 + Math.sin(a) * 9.5;
    flake += `M12 12 L${f1(x)} ${f1(y)}`;
    const bx = 12 + Math.cos(a) * 6, by = 12 + Math.sin(a) * 6;
    for (const sg of [-1, 1]) { const b2 = a + sg * 0.75; flake += `M${f1(bx)} ${f1(by)} L${f1(bx + Math.cos(b2) * 3.2)} ${f1(by + Math.sin(b2) * 3.2)}`; }
  }
  return {
    k_taunt: '<path d="M12 2.5 L20 5.5 V11.5 C20 16.5 16.5 19.8 12 21.5 C7.5 19.8 4 16.5 4 11.5 V5.5 Z" fill="currentColor"/><path d="M12 6 V18 M7.5 10.5 H16.5" stroke="#1b120b" stroke-width="1.8" stroke-linecap="round"/>',
    k_div: '<circle cx="12" cy="12" r="8.6" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M8 9.5 A5 5 0 0 1 12 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="12" r="3" fill="currentColor" opacity=".55"/>',
    k_reborn: '<path d="M12 3 C 15.5 3 17 5.5 17 8 C 17 10.5 15 12 12 13 C 9 12 7 10.5 7 8 C 7 5.5 8.5 3 12 3 Z" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M12 13 V21.5 M7 16.5 H17" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/>',
    k_horn: '<path d="M3 10 L13 5 V19 L3 14 Z" fill="currentColor"/><path d="M13 7.5 C 19 5.5 21.5 3 21.5 3 V21 C 21.5 21 19 18.5 13 16.5" fill="currentColor" opacity=".8"/><path d="M5 14.5 L7 20.5 H10 L9 15.5" fill="currentColor"/>',
    k_cross: '<path d="M4 3 L6.5 3 L15 11.5 L12.5 14 L4 5.5 Z M20 3 L17.5 3 L9 11.5 L11.5 14 L20 5.5 Z" fill="currentColor"/><path d="M5 14.5 L9.5 19 M19 14.5 L14.5 19 M4.5 20.5 L7 18 M19.5 20.5 L17 18" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/>',
    k_glass: '<path d="M6 3 H18 M6 21 H18" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><path d="M7.5 3.5 C 7.5 9 12 10 12 12 C 12 14 7.5 15 7.5 20.5 H16.5 C 16.5 15 12 14 12 12 C 12 10 16.5 9 16.5 3.5 Z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M9.5 19.5 C 10 17 12 16 12 16 C 12 16 14 17 14.5 19.5 Z M10 6.5 H14 L12 9.5 Z" fill="currentColor"/>',
    k_heart: '<path d="M12 20.5 C 6 16 2.5 12.5 2.5 8.6 A4.6 4.6 0 0 1 12 6.4 A4.6 4.6 0 0 1 21.5 8.6 C 21.5 12.5 18 16 12 20.5 Z" fill="currentColor"/>',
    k_coin: '<circle cx="12" cy="12" r="8.8" fill="currentColor"/><circle cx="12" cy="12" r="6" fill="none" stroke="#1b120b" stroke-width="1.6"/><path d="M12 8.5 V15.5" stroke="#1b120b" stroke-width="2" stroke-linecap="round"/>',
    k_tomb: '<path d="M5.5 21 V10 A6.5 6.5 0 0 1 18.5 10 V21 Z" fill="currentColor"/><path d="M12 9 V16 M9 11.5 H15" stroke="#1b120b" stroke-width="2" stroke-linecap="round"/><path d="M3 21.5 H21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
    k_sun: '<circle cx="12" cy="15" r="5" fill="currentColor"/><path d="M12 3 V6.5 M4 7 L6.5 9.5 M20 7 L17.5 9.5 M2 15 H5 M19 15 H22 M2 21 H22" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>',
    k_spark: '<path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z" fill="currentColor"/>',
    up: '<path d="M12 2.5 L21 12 H15.5 V21.5 H8.5 V12 H3 Z" fill="currentColor"/>',
    roll: '<g fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M19.5 9.3 A8 8 0 0 0 6.3 6.3"/><path d="M4.5 14.7 A8 8 0 0 0 17.7 17.7"/></g><path d="M3.9 8.7 L8.4 8.4 L4.3 3.9 Z" fill="currentColor"/><path d="M20.1 15.3 L15.6 15.6 L19.7 20.1 Z" fill="currentColor"/>',
    frz: `<path d="${flake}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
    bell: '<path d="M12 2.6 C 7.8 2.6 6.3 6.2 6.3 10 L6.3 13.8 L4.2 17.2 L19.8 17.2 L17.7 13.8 L17.7 10 C 17.7 6.2 16.2 2.6 12 2.6 Z" fill="currentColor"/><circle cx="12" cy="19.7" r="2" fill="currentColor"/><circle cx="12" cy="1.9" r="1.3" fill="currentColor"/>',
    skull: '<path d="M12 3 C 7 3 4 6.4 4 10.6 C 4 13.4 5.4 15.4 7.4 16.4 L7.4 20 L16.6 20 L16.6 16.4 C 18.6 15.4 20 13.4 20 10.6 C 20 6.4 17 3 12 3 Z" fill="currentColor"/><circle cx="8.8" cy="11" r="2.2" fill="#1b120b"/><circle cx="15.2" cy="11" r="2.2" fill="#1b120b"/><path d="M12 13.4 L10.8 15.6 L13.2 15.6 Z" fill="#1b120b"/><path d="M10 17.6 L10 20 M12 17.6 L12 20 M14 17.6 L14 20" stroke="#1b120b" stroke-width="1"/>',
    bolt: '<path d="M13.5 2 L5 13.4 H11 L9.5 22 L19 9.6 H13 Z" fill="currentColor"/>',
    drop: '<path d="M12 2.5 C 15 7.5 19 11 19 15 C 19 19 15.9 21.5 12 21.5 C 8.1 21.5 5 19 5 15 C 5 11 9 7.5 12 2.5 Z" fill="currentColor"/>',
    wind: '<path d="M3 8 H14 A3 3 0 1 0 11 5 M3 12.5 H18 A3 3 0 1 1 15 15.5 M3 17 H10" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>',
    crown: '<path d="M3 18.5 L2 7 L7.5 11 L12 3.5 L16.5 11 L22 7 L21 18.5 Z" fill="currentColor"/>',
    leaf: '<path d="M4 20 C 4 9, 11 3, 21 3 C 21 13, 15 20, 4 20 Z" fill="currentColor"/><path d="M5 19 L15 9" stroke="#1b120b" stroke-width="1.4"/>',
    twin: '<circle cx="8.6" cy="12" r="6.2" fill="none" stroke="currentColor" stroke-width="2.4"/><circle cx="15.4" cy="12" r="6.2" fill="none" stroke="currentColor" stroke-width="2.4"/>',
    gear: `<path d="${gearD(12, 12, 10, 8, 3.6)}" fill="currentColor" fill-rule="evenodd"/>`,
    plus: '<path d="M12 4 V20 M4 12 H20" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>',
    back: '<path d="M14.5 5 L7.5 12 L14.5 19" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>',
    moon: '<path d="M15 3a8 8 0 1 0 6 13A9 9 0 0 1 15 3z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>',
    wave: '<path d="M2 12c3-3 5-3 8 0s5 3 8 0 4-2 4-2M2 17c3-3 5-3 8 0s5 3 8 0" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>',
    star: '<path d="M12 2l2.5 7H22l-6 4.5 2.5 7.5L12 16.5 5.5 21 8 13.5 2 9h7.5z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>',
    mount: '<path d="M2 20l7-12 4 6 3-4 6 10z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>',
    blob: '<path d="M12 3c4 5 7 8 7 11a7 7 0 0 1-14 0c0-3 3-6 7-11z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>',
    sword: '<path d="M19.5 2.5 L21.5 4.5 L11 15 L9 13 Z" fill="currentColor"/><path d="M5.5 12.5 L11.5 18.5 L10 20 L8.4 18.4 L5 21.8 L2.2 19 L5.6 15.6 L4 14 Z" fill="currentColor"/>',
    users: '<circle cx="8.5" cy="8" r="3.6" fill="currentColor"/><path d="M1.8 20 C 2.4 15.4 5 13.2 8.5 13.2 C 12 13.2 14.6 15.4 15.2 20 Z" fill="currentColor"/><circle cx="16.5" cy="7.4" r="3" fill="currentColor" opacity=".75"/><path d="M15.6 12.4 C 19.4 12.2 21.8 14.6 22.2 19 L16.8 19 C 16.6 16.2 16.4 14 15.6 12.4 Z" fill="currentColor" opacity=".75"/>',
    key: '<circle cx="7.5" cy="12" r="4.6" fill="none" stroke="currentColor" stroke-width="2.6"/><path d="M12 12 H21.5 M18 12 V16 M21 12 V15" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/>',
    book: '<path d="M3 4.5 C 6.5 3.5 9.5 4 12 6 C 14.5 4 17.5 3.5 21 4.5 V19.5 C 17.5 18.5 14.5 19 12 21 C 9.5 19 6.5 18.5 3 19.5 Z" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/><path d="M12 6 V21" stroke="currentColor" stroke-width="2"/>',
    pen: '<path d="M4 20 L5 15.5 L15.5 5 L19 8.5 L8.5 19 Z" fill="currentColor"/><path d="M16.8 3.7 L18.6 1.9 L22.1 5.4 L20.3 7.2 Z" fill="currentColor"/>',
    dice: '<rect x="3.5" y="3.5" width="17" height="17" rx="4" fill="none" stroke="currentColor" stroke-width="2.2"/><circle cx="8.5" cy="8.5" r="1.7" fill="currentColor"/><circle cx="15.5" cy="15.5" r="1.7" fill="currentColor"/><circle cx="12" cy="12" r="1.7" fill="currentColor"/><circle cx="15.5" cy="8.5" r="1.7" fill="currentColor"/><circle cx="8.5" cy="15.5" r="1.7" fill="currentColor"/>',
  };
})();

function buildDefs() {
  const stops = a => a.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join('');
  const lin = (id, a) => `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">${stops(a)}</linearGradient>`;
  const rad = (id, a, x = 'cx="35%" cy="30%" r="75%"') => `<radialGradient id="${id}" ${x}>${stops(a)}</radialGradient>`;
  let s = '';
  s += rad('bg-hero', [[0, '#8a3a2c'], [1, '#2a0f0b']], 'cx="50%" cy="38%" r="72%"');
  s += lin('gr-fire', [[0, '#fff2a8'], [0.5, '#ff9a2e'], [1, '#c8331c']]);
  s += rad('gr-atk', [[0, '#ffe7a0'], [0.55, '#f0a62a'], [1, '#93520a']]) + rad('gr-hp', [[0, '#ff9a86'], [0.55, '#d23a2c'], [1, '#78150e']]);
  s += lin('gr-frame', [[0, '#bf9058'], [0.5, '#7a5230'], [1, '#4a2d16']]) + lin('gr-frame-g', [[0, '#fff4c2'], [0.45, '#efc04e'], [1, '#9a6a14']]);
  s += lin('gr-stone', [[0, '#aaa69e'], [1, '#5c5852']]) + rad('gr-badge', [[0, '#7a5230'], [1, '#2e1b0d']]);
  s += `<radialGradient id="gr-bub" cx="50%" cy="46%" r="52%"><stop offset="0.45" stop-color="#fff6c8" stop-opacity="0.06"/><stop offset="0.78" stop-color="#ffe282" stop-opacity="0.32"/><stop offset="1" stop-color="#ffc83a" stop-opacity="0.92"/></radialGradient>`;
  s += '<filter id="fx-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>';
  s += '<filter id="fx-blur" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="3"/></filter>';
  s += `<g id="bgx-hero">${BGS.hero}</g>`;
  const OUTER = 'M50 2 C 79 2, 95 30, 95 60 C 95 88, 75 108, 50 108 C 25 108, 5 88, 5 60 C 5 30, 21 2, 50 2 Z';
  const INNER = 'M50 9.5 C 74 9.5, 88 33, 88 60 C 88 84, 71 101, 50 101 C 29 101, 12 84, 12 60 C 12 33, 26 9.5, 50 9.5 Z';
  const nails = [[91.6, 60], [8.4, 60], [50, 104.8]].map(([x, y]) => Ci(x, y, 1.8, '#e8c38a', so(1))).join('');
  const sparks = [[20, 24], [83, 32], [85, 86], [16, 84]].map(([x, y]) => P(starD(x, y, 3.4, 1, 4), '#fffbe6', 'opacity=".9"')).join('');
  s += `<clipPath id="tk-clip"><path d="${INNER}"/></clipPath>`;
  s += `<g id="tk-frame"><path d="${OUTER}" fill="url(#gr-frame)" ${so(2.6)}/>${nails}</g>`;
  s += `<g id="tk-frame-g"><path d="${OUTER}" fill="url(#gr-frame-g)" ${so(2.6)}/>${sparks}</g>`;
  s += `<g id="tk-rim"><path d="${INNER}" fill="none" stroke="rgba(0,0,0,.35)" stroke-width="5"/><path d="${INNER}" fill="none" ${so(2)}/></g>`;
  s += `<g id="tk-taunt"><path d="M50 -3 L99 11 L97 66 C 93 95, 72 113, 50 123 C 28 113, 7 95, 3 66 L1 11 Z" fill="url(#gr-stone)" ${so(2.6)}/><path d="M50 3 L93 15 L91.5 65 C 88 89, 70 105, 50 114 C 30 105, 12 89, 8.5 65 L7 15 Z" fill="none" stroke="rgba(255,255,255,.25)" stroke-width="1.6"/></g>`;
  s += `<g id="tk-shield"><path d="M50 -4 C 85 -4, 102 28, 102 60 C 102 93, 79 115, 50 115 C 21 115, -2 93, -2 60 C -2 28, 15 -4, 50 -4 Z" fill="none" stroke="#ffc83a" stroke-width="10" opacity=".28"/><path d="M50 -4 C 85 -4, 102 28, 102 60 C 102 93, 79 115, 50 115 C 21 115, -2 93, -2 60 C -2 28, 15 -4, 50 -4 Z" fill="url(#gr-bub)" stroke="#fff1b8" stroke-width="3.2"/><path d="M50 -4 C 85 -4, 102 28, 102 60 C 102 93, 79 115, 50 115 C 21 115, -2 93, -2 60 C -2 28, 15 -4, 50 -4 Z" fill="none" stroke="#ffd34d" stroke-width="1.2" transform="translate(50 56) scale(.93) translate(-50 -56)" opacity=".8"/><path d="M14 26 C 22 10, 36 2, 52 1" fill="none" stroke="#fff" stroke-width="4.5" stroke-linecap="round" opacity=".9"/><path d="M8 40 C 9 36, 10 33, 12 30" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".7"/><path d="M92 86 C 86 100, 74 108, 62 111" fill="none" stroke="#fff6d0" stroke-width="2.6" stroke-linecap="round" opacity=".55"/></g>`;
  s += `<symbol id="gem-a" viewBox="0 0 40 40"><circle cx="20" cy="20" r="16.5" fill="url(#gr-atk)" ${so(2.4)}/><path d="M9.5 15 A11.5 11.5 0 0 1 20 8.5" fill="none" stroke="#fff6d0" stroke-width="2" stroke-linecap="round" opacity=".7"/></symbol>`;
  s += `<symbol id="gem-h" viewBox="0 0 40 40"><path d="M20 2.5 C 26 10.5, 36 16.5, 36 25 C 36 33, 29 38, 20 38 C 11 38, 4 33, 4 25 C 4 16.5, 14 10.5, 20 2.5 Z" fill="url(#gr-hp)" ${so(2.4)}/><path d="M10.5 23 C 11 19, 13.5 15.6, 16.6 13" fill="none" stroke="#ffd8cf" stroke-width="2" stroke-linecap="round" opacity=".7"/></symbol>`;
  for (const k in ICONS) s += `<symbol id="ic-${k}" viewBox="0 0 24 24">${ICONS[k]}</symbol>`;
  for (const id in HART) s += `<symbol id="art-h-${id}" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice"><use href="#bgx-hero"/>${HART[id]()}</symbol>`;
  document.body.insertAdjacentHTML('afterbegin', `<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>${s}${Object.values(SOFT).join('')}</defs></svg>`);
}

/* portraits des joueurs : générés à partir du nom */
const AV = {};
function avatarSym(name) {
  let h = 2166136261; for (const ch of String(name)) { h ^= ch.codePointAt(0); h = Math.imul(h, 16777619); }
  h >>>= 0;
  const id = 'av-' + h.toString(36);
  if (!AV[id]) {
    const r = mulberry(h), pk = a => a[Math.floor(r() * a.length)];
    const spec = {
      skin:pk(['#f3d0b0', '#e8b894', '#d9a27a', '#c98e66', '#a8714f', '#8a5a3c', '#f0c4a0']),
      hair:pk(['#2a1d14', '#4a2f1d', '#7a4a2a', '#b8452c', '#e0b25a', '#e8e2da', '#2e8a8a', '#5a3d7a']),
      hs:pk(['short', 'long', 'bun', 'curly', 'part', 'mohawk', 'bald', 'braids']),
      beard:pk([null, null, null, 'stubble', 'mustache', 'full', 'goatee']),
      hat:pk([null, null, null, 'beret', 'bandana', 'tricorn', 'feather']),
      hatc:pk(['#7a2f3a', '#2f4f8a', '#3a2a22', '#4a6a3a', '#6a3a7a']),
      eyes:pk(['dot', 'dot', 'happy', 'glasses']), mouth:pk(['smile', 'grin', 'smirk']),
      shirt:pk(['#5d4a8a', '#2f6b46', '#8a3a2a', '#2e3f6e', '#7a5232', '#4a5a6a']),
      freckles:r() < 0.25, earring:r() < 0.2,
    };
    AV[id] = 1;
    document.body.insertAdjacentHTML('beforeend', `<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><symbol id="${id}" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice"><use href="#bgx-neu"/>${human(spec)}</symbol></svg>`);
  }
  return id;
}


/* ---------- portraits générés (cartes créées dans l'atelier) ---------- */
const FAMILIES = { human:'Personnage', robot:'Robot', bete:'Bête', spec:'Spectre', knight:'Chevalier', base:'Portrait existant' };
function genArt(f, seed) {
  const r = mulberry((seed >>> 0) || 1), pk = a => a[Math.floor(r() * a.length)], ch = p => r() < p;
  const GLOWS = ['#7fe9ff', '#ffd27a', '#b48cff', '#8dff9a', '#ff7a6a', '#7fffd4'];
  if (f === 'robot') return robot({ col:pk(['#9fb3c4', '#c49a4c', '#8d938f', '#5a5f69', '#7a848e', '#d8b45c', '#b7c3cc', '#a35d4a', '#5f8a6a', '#6a5a8a']), head:pk(['box', 'round', 'dome', 'gear']), eye:pk(['duo', 'mono', 'visor', 'odd']), mouth:pk(['grill', 'teeth', 'furnace', 'smile', 'line']), glow:pk(GLOWS), ant:ch(.4), horns:ch(.25), bolts:ch(.5), rust:ch(.25), pistons:ch(.2), crown:ch(.07) });
  if (f === 'bete') { const sp = pk(['dog', 'cat', 'wolf', 'snake', 'stag', 'lion', 'boar']); const col = pk(['#5b5350', '#d98b3a', '#7f848c', '#5f9e46', '#a8744a', '#e0a94a', '#5d4440', '#cfcac3', '#a07a55', '#3d3a44', '#b8b2ac']);
    return beast({ sp, col, belly:shade(col, 0.45), eye:pk(['#f2c14e', '#9be36a', '#8fd0ff', '#ff6a4a', '#ffe14a']), glow:ch(.2) ? pk(GLOWS) : null, angry:ch(.4), fangs:ch(.4), tongue:ch(.3), stripes:ch(.4), kitten:ch(.2), pup:ch(.2), horns:ch(.3), mane:pk(['#8a4a22', '#3a2a22', '#c8452c', '#e6dcc8']), crown:ch(.08), crownY:sp === 'lion' ? -15 : -4, embers:ch(.12), smoke:ch(.1) }); }
  if (f === 'spec') { const k = pk(['ghost', 'ghost', 'ghost', 'ghost', 'wisp', 'wisp', 'lich', 'wraith']);
    if (k === 'lich') return lich(); if (k === 'wraith') return wraith();
    if (k === 'wisp') return wisp({ col:pk(['#5fd6c6', '#8f73d0', '#6fb5ff', '#ff9a6a', '#9be36a']) });
    return ghost({ col:pk(['#bfe3f5', '#b9a8e3', '#8f73d0', '#a8e6c8', '#e3b8c8', '#d8d2cc']), glow:pk(['#e9fbff', '#ffe9a8', '#f1e9ff']), mood:pk(['sad', 'angry', null]), mouth:pk(['o', 'wail', 'howl']), chains:ch(.3), frost:ch(.3) }); }
  if (f === 'knight') { const col = pk(['#8c949b', '#e2bb62', '#b07a43', '#5a6470', '#a3a9b0', '#6a4a7a']);
    return knight({ col, tabard:pk(['#2f5d8a', '#8a2a24', '#f2ece0', '#2f6b46', '#5a3d7a', '#c8963e']), plume:ch(.4) ? pk(['#c8392f', '#2f5d8a', '#f2ece0', '#e2b452']) : null, wings:ch(.2), glow:ch(.35) ? pk(GLOWS) : null, emblem:ch(.4) ? pk([4, 5, 6, 8]) : null, band:ch(.3) ? pk(['#6b4a2a', '#e2b452']) : null }); }
  return human({
    skin:pk(['#f3d0b0', '#e8b894', '#d9a27a', '#c98e66', '#a8714f', '#8a5a3c', '#f0c4a0', '#7fa05a', '#bfe3df']),
    hair:pk(['#2a1d14', '#4a2f1d', '#7a4a2a', '#b8452c', '#e0b25a', '#e8e2da', '#2e8a8a', '#5a3d7a', '#c8392f']),
    hs:pk(['short', 'long', 'bun', 'curly', 'part', 'mohawk', 'bald', 'braids', 'side']), beard:pk([null, null, 'stubble', 'mustache', 'full', 'goatee', 'long']),
    hat:pk([null, null, null, 'tricorn', 'bandana', 'admiral', 'wizard', 'hardhat', 'feather', 'crown', 'beret', 'circlet', 'hood']),
    hatc:pk(['#7a2f3a', '#2f4f8a', '#3a2a22', '#4a6a3a', '#6a3a7a', '#c8392f', '#2b2330']),
    eyes:pk(['dot', 'dot', 'dot', 'happy', 'glasses', 'patch', 'goggles', 'glow']), glow:pk(GLOWS), mouth:pk(['smile', 'grin', 'frown', 'o', 'flat', 'smirk']),
    shirt:pk(['#5d4a8a', '#2f6b46', '#8a3a2a', '#2e3f6e', '#7a5232', '#4a5a6a', '#e9e0cf']), collar:pk([null, null, '#e2b452', '#c8392f']),
    ears:pk([null, null, null, 'pointy']), nose:pk([null, null, 'big']), freckles:ch(.3), scar:ch(.2), earring:ch(.2), tusks:ch(.08), angry:ch(.25), soot:ch(.1),
    apron:ch(.12) ? '#7a4a2a' : null, prop:pk([null, null, null, 'mug', 'flask', 'sword', 'book', 'wrench', 'hammer', 'coins', 'ball']), flaskc:pk(['#7fe36a', '#ff7a6a', '#8fd0ff']),
  });
}
const ART_CACHE = {};
function artBody(spec, id) {
  if (!spec) spec = ART[id] ? { f:'base', id } : { f:'human', s:1 };
  const key = spec.f === 'base' ? 'b:' + spec.id : spec.f + ':' + spec.s;
  if (ART_CACHE[key] == null) ART_CACHE[key] = spec.f === 'base' ? (ART[spec.id] ? ART[spec.id]() : '') : genArt(spec.f, spec.s);
  return ART_CACHE[key];
}
function tribeBg(t) {
  const col = /^#[0-9a-f]{6}$/i.test(t.col || '') ? t.col : '#8a5a30';
  return `<linearGradient id="bgc-${t.id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${shade(col, 0.38)}"/><stop offset=".55" stop-color="${col}"/><stop offset="1" stop-color="${shade(col, -0.5)}"/></linearGradient>`
    + `<g id="bgx-${t.id}"><rect width="100" height="100" fill="url(#bgc-${t.id})"/>${BGS[t.bg] || BGS.neu}</g>`;
}
let DYN = null;
// mise à jour incrémentale : on ne redessine que les portraits qui ont changé
let DYN_BG = '', DYN_KEYS = {};
function rebuildArt() {
  if (typeof document === 'undefined' || !document.body) return;
  if (!DYN) { DYN = document.createElement('div'); DYN.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden'; DYN.setAttribute('aria-hidden', 'true'); document.body.prepend(DYN); }
  const bg = Object.values(TRIBES).map(tribeBg).join('');
  const keys = {}; for (const id in C) keys[id] = JSON.stringify([C[id].tr, C[id].art || null]);
  if (bg !== DYN_BG || !DYN.firstChild) {
    let s = bg; for (const id in C) s += artSymbol('art-' + id, C[id].tr, C[id].art, id);
    for (const id in ART) { const b = id.replace(/_tf\d$/, ''); if (b !== id && C[b]) s += artSymbol('art-' + id, C[b].tr, { f:'base', id }, id); }
    DYN.innerHTML = `<svg width="0" height="0" focusable="false"><defs>${s}${Object.values(SOFT).join('')}</defs></svg>`;
    DYN_BG = bg; DYN_KEYS = keys; return;
  }
  const defs = DYN.querySelector('defs'); let add = '';
  for (const id in DYN_KEYS) if (!(id in keys)) { const el = defs.querySelector('#' + CSS.escape('art-' + id)); if (el) el.remove(); }
  for (const id in keys) if (keys[id] !== DYN_KEYS[id]) { const el = defs.querySelector('#' + CSS.escape('art-' + id)); if (el) el.remove(); add += artSymbol('art-' + id, C[id].tr, C[id].art, id); }
  if (add) { const tmp = document.createElement('div'); tmp.innerHTML = `<svg><defs>${add}${Object.values(SOFT).join('')}</defs></svg>`; [...tmp.querySelector('defs').children].forEach(n => { if (!n.id || !defs.querySelector('#' + CSS.escape(n.id))) defs.appendChild(n); }); }
  DYN_KEYS = keys;
}
const artSymbol = (sid, tr, spec, id) => `<symbol id="${sid}" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice"><use href="#bgx-${TRIBES[tr] ? tr : 'neu'}"/>${artBody(spec, id)}</symbol>`;
let DRAFT_SVG = null;
function setDraftArt(raw) {
  if (!DRAFT_SVG) { DRAFT_SVG = document.createElement('div'); DRAFT_SVG.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden'; DRAFT_SVG.setAttribute('aria-hidden', 'true'); document.body.prepend(DRAFT_SVG); }
  DRAFT_SVG.innerHTML = `<svg width="0" height="0" focusable="false"><defs>${artSymbol('art-__edit', raw.tr, raw.art, raw.id)}</defs></svg>`;
}
