/* =====================================================================
   ART 2 — décors et portraits des nouvelles familles, héros et compagnons
   ===================================================================== */
Object.assign(BGS, (() => {
  const stars = (pts, o = '.7') => pts.map(([x, y]) => Ci(x, y, 0.8, '#fff', `opacity="${o}"`)).join('');
  let trees = '';
  for (const [x, w, h] of [[6, 7, 70], [22, 5, 60], [80, 8, 74], [94, 5, 58]]) trees += `<rect x="${x - w / 2}" y="${100 - h}" width="${w}" height="${h}" fill="#0f2a20" opacity=".55"/>`;
  return {
    chateau: Ci(76, 20, 12, '#ff9a8a', 'opacity=".75"') + stars([[14, 10], [34, 16], [58, 8], [90, 40]]) + P('M0 100 L0 70 L8 70 L8 62 L14 62 L14 70 L22 70 L22 54 L26 46 L30 54 L30 72 L70 72 L70 50 L74 40 L78 50 L78 66 L86 66 L86 58 L92 58 L92 66 L100 66 L100 100 Z', '#1a0a12', 'opacity=".6"'),
    lune: Ci(50, 34, 26, '#f6f0d8', 'opacity=".85"') + Ci(42, 28, 4, '#d8d0b8', 'opacity=".6"') + Ci(58, 40, 3, '#d8d0b8', 'opacity=".6"') + stars([[10, 12], [88, 14], [16, 50], [86, 56]]) + trees,
    tombe: Ci(80, 18, 9, '#e8f2d8', 'opacity=".6"') + [[10, 82, 8], [30, 88, 6], [72, 86, 7], [92, 80, 8]].map(([x, y, w]) => P(`M${x - w} 100 L${x - w} ${y} Q${x} ${y - w * 1.3} ${x + w} ${y} L${x + w} 100 Z`, '#1e2a1e', 'opacity=".55"')).join('') + E(50, 96, 60, 8, '#cfe8c8', 'opacity=".18"'),
    mine: P('M0 0 L100 0 L100 100 L86 100 L86 30 Q50 6 14 30 L14 100 L0 100 Z', '#1e120a', 'opacity=".5"') + Ln('M14 30 Q50 6 86 30', '#6b4a2a', 3) + [[22, 40], [78, 40]].map(([x, y]) => Ci(x, y, 5, '#ffcf6a', 'opacity=".55"') + Ci(x, y, 2, '#fff1b8')).join('') + [[30, 92, 4], [70, 90, 3], [52, 96, 3]].map(([x, y, r]) => P(starD(x, y, r, r * 0.4, 4), '#8fe3ff', 'opacity=".7"')).join(''),
    foret: trees + [[20, 30], [70, 22], [84, 46], [36, 62], [60, 70]].map(([x, y]) => Ci(x, y, 1.6, '#d9ffcf', 'opacity=".8"')).join('') + Ci(50, 10, 30, '#d9ffcf', 'opacity=".12"'),
    colline: P('M0 100 L0 74 Q24 56 50 72 Q74 58 100 70 L100 100 Z', '#3a3a1a', 'opacity=".5"') + P('M0 100 L0 86 Q30 76 60 88 Q80 80 100 86 L100 100 Z', '#2a2a12', 'opacity=".5"') + Ci(20, 22, 10, '#fff2c8', 'opacity=".5"'),
    bazar: [[12, 80, 16, 14], [72, 84, 20, 12], [86, 70, 12, 14]].map(([x, y, w, h]) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#5a3a1c" opacity=".55"/>`).join('') + [[18, 20], [30, 12], [80, 18], [90, 30]].map(([x, y]) => E(x, y, 3, 3, '#f2c14e', 'opacity=".6"')).join('') + Ln('M0 14 Q25 22 50 14 T100 14', '#c8392f', 2, 'opacity=".5"'),
    volcan: P('M0 100 L30 46 L40 52 L50 34 L60 52 L70 46 L100 100 Z', '#2a1008', 'opacity=".6"') + P('M46 40 L50 34 L54 40 L52 60 L48 60 Z', '#ff7a2a', 'opacity=".8"') + [[24, 20], [70, 14], [84, 28]].map(([x, y]) => Ci(x, y, 1.4, '#ffb04a', 'opacity=".8"')).join(''),
    vortex: [0, 1, 2].map(k => Ln(`M50 50 m${-30 + k * 8} 0 a${30 - k * 8} ${30 - k * 8} 0 1 1 ${2 * (30 - k * 8)} 0`, '#fff', 1.4, 'opacity=".25"')).join('') + [[20, 20], [80, 24], [18, 78], [84, 80]].map(([x, y]) => P(starD(x, y, 2.4, 0.8, 4), '#fff', 'opacity=".55"')).join(''),
  };
})());

/* ---------- éléments partagés ---------- */
const fangs = (y = 62.6) => P(`M46.4 ${y} L47.8 ${y + 3.4} L49 ${y} Z`, '#fff', so(0.8)) + P(`M51 ${y} L52.2 ${y + 3.4} L53.6 ${y} Z`, '#fff', so(0.8));
function helmHorn(col = '#9aa3ab', horns = '#efe4c8') {
  const horn = P('M30.5 37 C 18 33, 11 22, 13.5 9 C 18.5 20, 25 25, 33.5 28.6 Z', horns, so(1.8));
  return horn + mirror(horn) + P('M28.5 43 C 28 21, 72 21, 71.5 43 Z', col, so()) + P('M27 41 L73 41 L73 46.4 Q50 49.4 27 46.4 Z', '#c8963e', so(1.8)) + Ln('M34 33 C 36 27, 42 24.5, 48 24.2', '#fff', 2, 'opacity=".5"');
}
const helmDome = (col = '#8c949b') => P('M28.5 44 C 28 20, 72 20, 71.5 44 Z', col, so()) + P('M27 42 L73 42 L73 47 Q50 50 27 47 Z', shade(col, -0.25), so(1.8)) + Ln('M50 22 L50 42', shade(col, 0.3), 2.4) + P('M48 47 L52 47 L51.4 57 L48.6 57 Z', col, so(1.4));
const minerHood = () => P('M28.5 46 C 26 22, 74 22, 71.5 46 Z', '#c8963e', so()) + `<rect x="44" y="24" width="12" height="9" rx="2" fill="#5a5f69" ${so(1.4)}/>` + Ci(50, 28.5, 3.4, '#fff1b8', GLOW) + Ln('M50 25 L50 8', '#fff1b8', 1, 'opacity=".25"');
function pickaxe(x = 78, y = 100, r = -30) { return `<g transform="translate(${x} ${y}) rotate(${r})">${Ln('M0 0 L0 -30', OUT, 4.4)}${Ln('M0 0 L0 -30', '#8a5a2b', 2.6)}${P('M-14 -26 Q0 -38 14 -26 L12 -24 Q0 -32 -12 -24 Z', '#9aa3ab', so(1.6))}</g>`; }
function club(x = 80, y = 102, r = -24) { return `<g transform="translate(${x} ${y}) rotate(${r})">${P('M-3 0 L3 0 L7 -34 C 7 -40, -7 -40, -7 -34 Z', '#7a4a28', so(1.8))}${[[-3, -30], [3, -24], [-2, -18]].map(([a, b]) => Ci(a, b, 1.4, '#c4c9ce', so(0.8))).join('')}</g>`; }
function bow(x = 80, y = 70) { return `<g transform="translate(${x} ${y})">${Ln('M-4 -26 Q12 0 -4 26', '#7a4a28', 3)}${Ln('M-4 -26 L-4 26', '#f3ecdc', 0.9)}</g>`; }
function orb(x, y, col) { return softGlow(x, y, 9, col, .35) + Ci(x, y, 5.5, col, so(1.4) + ' ' + GLOW) + Ci(x - 1.6, y - 1.6, 1.6, '#fff', 'opacity=".9"'); }
function leaves(pts, col = '#6fbf4a') { return pts.map(([x, y, r]) => `<g transform="translate(${x} ${y}) rotate(${r})">${P('M0 0 C 4 -6, 10 -6, 12 0 C 10 6, 4 6, 0 0 Z', col, so(1))}</g>`).join(''); }
const bats = pts => pts.map(([x, y, s]) => `<g transform="translate(${x} ${y}) scale(${s})">${P('M0 0 C -4 -4, -9 -3, -12 1 C -9 0, -7 2, -6 4 C -4 2, -2 2, 0 3 C 2 2, 4 2, 6 4 C 7 2, 9 0, 12 1 C 9 -3, 4 -4, 0 0 Z', '#1a0a12')}</g>`).join('');
const coinsPile = (x, y) => [0, 1, 2].map(k => E(x, y - k * 4, 8, 3, '#f2c14e', so(1.4))).join('') + E(x, y - 9, 5, 1.6, '#fff3c0', 'opacity=".5"');
const crownOn = (dy = -6, col = '#f2c14e') => `<g transform="translate(0 ${dy})">${HAT.crown(col)}</g>`;

/* ---------- générateurs par famille ---------- */
function vampire(o) {
  let s = P('M6 104 C 8 70, 18 54, 30 52 L50 74 L70 52 C 82 54, 92 70, 94 104 Z', o.cape || '#3a0a14', so());
  s += P('M30 52 C 24 62, 22 72, 26 82 L40 76 Z', o.lining || '#a8202e', so(1.6)) + mirror(P('M30 52 C 24 62, 22 72, 26 82 L40 76 Z', o.lining || '#a8202e', so(1.6)));
  s += human({ skin:o.skin || '#ebe2ea', hair:o.hair || '#1a1418', hs:o.hs || 'part', eyes:'glow', glow:o.glow || '#ff3a4a', mouth:o.mouth || 'smirk', noblush:true, shirt:o.shirt || '#2a1418', collar:o.collar || '#a8202e', hat:o.hat, hatc:o.hatc, earring:o.earring, beard:o.beard, beardc:o.beardc, ears:o.ears });
  s += fangs(o.fy || 62.6);
  if (o.crown) s += crownOn(-6, '#d8d0e0');
  if (o.bats) s += bats([[18, 22, 0.9], [82, 18, 1.1], [74, 34, 0.7]]);
  if (o.chalice) s += `<g transform="translate(78 78)">${P('M-7 -10 L7 -10 C 7 -2, 3 2, 1 2 L1 10 L5 12 L-5 12 L-1 10 L-1 2 C -3 2, -7 -2, -7 -10 Z', '#c8963e', so(1.6))}${E(0, -9, 6, 1.6, '#a8202e')}</g>`;
  return s;
}
function werewolf(o) {
  let s = beast({ sp:'wolf', col:o.col || '#6a5a4a', belly:o.belly || '#d8c8b0', eye:o.eye || '#ffd23f', angry:o.angry !== false, fangs:o.fangs !== false, pup:o.pup });
  s += P('M16 104 L20 90 L27 94 L33 86 L40 92 L46 86 L54 92 L60 86 L66 92 L72 88 L78 94 L84 104 Z', o.shirt || '#7a5a3a', so(1.8));
  if (o.straps) s += Ln('M30 92 L44 104 M70 92 L56 104', '#3a2a1a', 2.4);
  if (o.claws) s += [[22, 96], [78, 96]].map(([x, y]) => P(`M${x - 4} ${y} L${x - 5} ${y - 7} L${x - 2} ${y} M${x} ${y} L${x} ${y - 8} L${x + 2} ${y} M${x + 4} ${y} L${x + 5} ${y - 7} L${x + 6} ${y}`, '#efe4c8', so(1))).join('');
  if (o.crown) s += crownOn(o.crownY || -10, '#c8963e');
  return s;
}
function skeleton(o) {
  const bone = o.bone || '#ece3c8', dk = '#140c1c', g = o.glow || '#8dff9a';
  let s = '';
  if (o.robe) s += P('M14 104 C 16 86, 28 80, 40 78 L 60 78 C 72 80, 84 86, 86 104 Z', o.robe, so());
  else { s += P('M30 104 L34 80 L66 80 L70 104 Z', o.armor || '#4a4d52', so()); s += Ln('M38 86 Q50 82 62 86 M38 92 Q50 88 62 92 M38 98 Q50 94 62 98', bone, 2.4); }
  s += Ln('M50 70 L50 80', bone, 4);
  s += P('M30 48 C 28 30, 40 22, 50 22 C 60 22, 72 30, 70 48 C 70 56, 66 60, 62 62 L38 62 C 34 60, 30 56, 30 48 Z', bone, so());
  s += P('M38 60 L62 60 L60 72 Q50 75 40 72 Z', bone, so(1.8)) + Ln('M42 64 L42 71 M46 64 L46 72 M50 64 L50 72.6 M54 64 L54 72 M58 64 L58 71', dk, 1.2);
  s += E(41.5, 47, 6, 6.6, dk) + E(58.5, 47, 6, 6.6, dk) + Ci(41.5, 48, 2.4, g, GLOW) + Ci(58.5, 48, 2.4, g, GLOW);
  s += P('M48 54 L52 54 L50 58 Z', dk) + Ln('M34 36 L38 40 M66 32 L62 38', '#b8ae94', 1.2);
  if (o.hood) s += P('M26 52 C 24 26, 38 16, 50 16 C 62 16, 76 26, 74 52 C 68 36, 60 30, 50 30 C 40 30, 32 36, 26 52 Z', o.hood, so());
  if (o.helm) s += P('M29 40 C 28 20, 72 20, 71 40 Z', o.helm, so()) + Ln('M50 21 L50 40', shade(o.helm, 0.3), 2);
  if (o.crown) s += crownOn(-12, '#b8b0a0');
  if (o.sword) s += PROP.sword();
  if (o.flies) s += [[20, 30], [26, 22], [80, 34]].map(([x, y]) => Ci(x, y, 1.2, OUT)).join('');
  return s;
}
function zombie(o) {
  let s = human({ skin:o.skin || '#9fb38a', hair:o.hair || '#3a3a2a', hs:o.hs || 'side', eyes:'glow', glow:o.glow || '#d8ff8a', mouth:o.mouth || 'o', noblush:true, shirt:o.shirt || '#4a4a3a', nose:o.nose });
  s += Ln('M56 36 L60 50 M55.5 40 L59 39 M57 45 L60.4 44', '#5a2a2a', 1.4) + Ln('M34 60 L42 64', '#5a2a2a', 1.2) + E(38, 58, 3, 2, '#6a8a5a', 'opacity=".6"');
  s += Ln('M24 90 L36 84 M64 84 L76 92', '#2a2a1a', 1.4) + P('M28 104 L32 94 L38 104 Z', '#2a2a1a', 'opacity=".5"');
  if (o.stitch) s += P('M14 104 C 16 86, 28 80, 40 78 L 60 78 C 72 80, 84 86, 86 104 Z', o.stitch, so()) + Ln('M30 84 L70 96 M32 82 L34 86 M40 85 L42 89 M50 88 L52 92 M60 91 L62 95', '#e8d8b8', 1.4) + human({ skin:o.skin || '#9fb38a', hair:'#3a3a2a', hs:'bald', eyes:'glow', glow:'#d8ff8a', mouth:'frown', noblush:true, shirt:o.stitch, tusks:true, scar:true });
  return s;
}
function dwarf(o) {
  let s = human({ skin:o.skin || '#eab08a', hair:o.hair || '#8a3a1c', hs:o.hs || 'bald', beard:o.beard || 'long', beardc:o.beardc || o.hair || '#8a3a1c', nose:'big', eyes:o.eyes || 'dot', mouth:o.mouth || 'smile', angry:o.angry, shirt:o.shirt || '#4a5a6a', scar:o.scar, prop:o.prop });
  s += Ln('M44 80 L44 92 M56 80 L56 92', shade(o.beardc || o.hair || '#8a3a1c', -0.25), 1.6) + Ci(44, 93, 1.8, '#c8963e', so(0.8)) + Ci(56, 93, 1.8, '#c8963e', so(0.8));
  if (o.helm === 'horn') s += helmHorn(o.hc);
  else if (o.helm === 'dome') s += helmDome(o.hc);
  else if (o.helm === 'miner') s += minerHood();
  else if (o.helm === 'crown') s += crownOn(-4);
  if (o.pick) s += pickaxe();
  if (o.shield) s += `<g transform="translate(20 86)">${Ci(0, 0, 14, '#8a5a2b', so(2))}${Ci(0, 0, 10, 'none', 'stroke="#c8963e" stroke-width="2"')}${Ci(0, 0, 3, '#c8963e', so(1))}</g>`;
  if (o.runes) s += [[18, 30], [82, 30], [14, 60]].map(([x, y]) => P(starD(x, y, 3.6, 1.2, 4), '#8fe3ff', GLOW)).join('');
  return s;
}
function elf(o) {
  let s = '';
  if (o.cloak) s += P('M8 104 C 10 74, 22 58, 34 54 L50 72 L66 54 C 78 58, 90 74, 92 104 Z', o.cloak, so());
  s += human({ skin:o.skin || '#f3dcc4', hair:o.hair || '#e8d8a0', hs:o.hs || 'long', ears:'pointy', hat:o.hat || 'circlet', hatc:o.hatc || '#d8e8d0', eyes:o.eyes || 'dot', mouth:o.mouth || 'smile', shirt:o.shirt || '#2f6b46', collar:o.collar || '#c8e8a0', noblush:o.noblush, prop:o.prop, flaskc:o.flaskc });
  if (o.bow) s += bow();
  if (o.orb) s += orb(80, 76, o.orb);
  if (o.leaves !== false) s += leaves([[14, 24, 30], [82, 16, -20], [86, 50, 40]], o.leafc);
  if (o.moon) s += P('M14 18 A9 9 0 1 0 22 32 A7 7 0 1 1 14 18 Z', '#f2ecff', 'opacity=".85"');
  return s;
}
function ogre(o) {
  let s = P('M8 104 C 10 82, 24 72, 40 70 L60 70 C 76 72, 90 82, 92 104 Z', o.fur || '#6a5232', so());
  s += human({ skin:o.skin || '#8fa06a', hair:o.hair || '#2a2418', hs:o.hs || 'bald', tusks:true, nose:'big', ears:o.ears, angry:o.angry !== false, mouth:o.mouth || 'frown', scar:o.scar, noblush:true, shirt:o.shirt || '#5a4a2a', beard:o.beard, beardc:o.beardc, eyes:o.eyes });
  s += E(50, 33, 12, 3, shade(o.skin || '#8fa06a', -0.15), 'opacity=".5"');
  if (o.club) s += club();
  if (o.twin) s += `<g transform="translate(20 20) scale(.42)">${human({ skin:o.skin || '#8fa06a', hs:'mohawk', hair:'#2a2418', tusks:true, nose:'big', angry:true, mouth:'grin', noblush:true, shirt:o.shirt || '#5a4a2a' })}</g>`;
  if (o.leg) s += `<g transform="translate(78 84) rotate(-30)">${P('M-4 0 C -10 -10, -6 -24, 4 -24 C 12 -24, 14 -12, 6 0 Z', '#c87a4a', so(1.6))}${Ln('M0 0 L0 10', '#f3ead2', 3)}${Ci(-2, 11, 2.4, '#f3ead2')}${Ci(2, 11, 2.4, '#f3ead2')}</g>`;
  if (o.crown) s += crownOn(-8, '#c8963e');
  return s;
}
function goblin(o) {
  let s = human({ skin:o.skin || '#7fb04a', hair:o.hair || '#2a1a10', hs:o.hs || 'side', ears:'pointy', nose:'big', mouth:o.mouth || 'grin', eyes:o.eyes || 'dot', glow:o.glow, hat:o.hat, hatc:o.hatc, shirt:o.shirt || '#6a4a2a', collar:o.collar, earring:true, prop:o.prop, angry:o.angry, freckles:o.freckles });
  s += E(42.5, 49.5, 3.4, 3.6, '#ffe14a', 'opacity=".45"') + E(57.5, 49.5, 3.4, 3.6, '#ffe14a', 'opacity=".45"');
  if (o.coins) s += coinsPile(78, 98);
  if (o.bomb) s += `<g transform="translate(80 82) scale(.42)">${bomb()}</g>`;
  if (o.crown) s += crownOn(-6, '#9aa3ab');
  if (o.sack) s += P('M14 104 C 10 90, 14 80, 24 80 C 34 80, 38 90, 34 104 Z', '#a8845e', so(1.8)) + Ln('M18 82 Q24 78 30 82', '#5a3a1c', 1.6) + P(starD(24, 92, 3, 1.2, 4), '#f2c14e');
  return s;
}
function dragonHead(o) {
  const c = o.col || '#a8402a', d = shade(c, -0.3), l = o.belly || shade(c, 0.45), eye = o.eye || '#ffd23f';
  let s = '';
  if (o.wings) { const w = P('M30 70 C 18 60, 6 46, 4 30 C 12 36, 18 38, 24 36 C 18 30, 16 24, 18 16 C 26 26, 32 34, 38 56 Z', d, so(1.8)) + Ln('M8 34 C 16 44, 24 52, 32 62 M20 20 C 26 32, 30 42, 36 56', shade(c, -0.5), 1); s += w + mirror(w); }
  s += P('M32 104 C 34 88, 40 76, 50 74 C 60 76, 66 88, 68 104 Z', c, so()) + P('M43 104 C 44 92, 47 82, 50 80 C 53 82, 56 92, 57 104 Z', l);
  for (let k = 0; k < 4; k++) s += Ln(`M44 ${88 + k * 4} Q50 ${86 + k * 4} 56 ${88 + k * 4}`, shade(l, -0.25), 1);
  const horn = P('M34 34 C 26 26, 22 14, 26 4 C 30 14, 36 20, 42 26 Z', o.horn || '#efe4c8', so(1.8));
  s += horn + mirror(horn);
  if (o.frill) { const f = P('M28 46 L14 38 L20 50 L10 54 L24 58 Z', d, so(1.6)); s += f + mirror(f); }
  s += P('M28 46 C 28 30, 40 24, 50 24 C 60 24, 72 30, 72 46 C 72 58, 66 64, 62 72 C 58 78, 42 78, 38 72 C 34 64, 28 58, 28 46 Z', c, so());
  s += P('M38 58 C 40 72, 60 72, 62 58 C 60 66, 40 66, 38 58 Z', l, 'opacity=".9"');
  s += E(44, 62, 1.6, 2.2, OUT) + E(56, 62, 1.6, 2.2, OUT);
  for (const x of [40, 60]) s += P(`M${x - 6} 46 Q${x} 39 ${x + 6} 46 Q${x} 51 ${x - 6} 46 Z`, eye, so(1.4)) + E(x, 46, 1.2, 3.4, OUT);
  s += Ln('M33 40 L44 43 M67 40 L56 43', d, 2.6);
  s += [[50, 32], [46, 36], [54, 36]].map(([x, y]) => E(x, y, 2.4, 1.6, d, 'opacity=".7"')).join('');
  if (o.fire) s += P('M44 72 C 40 82, 46 92, 50 98 C 54 92, 60 82, 56 72 Z', '#ff8a2a', so(1.2) + ' ' + GLOW) + P('M47 74 C 46 82, 49 88, 50 92 C 51 88, 54 82, 53 74 Z', '#ffd34d');
  if (o.smoke) s += Ci(36, 66, 3, '#d8d2cc', 'opacity=".6"') + Ci(64, 66, 3, '#d8d2cc', 'opacity=".6"');
  if (o.crown) s += crownOn(-14, '#f2c14e');
  return s;
}
function dragonEgg() {
  return softGlow(50, 60, 30, '#ffb04a', .3) + E(50, 92, 26, 7, '#5a3a1c', so()) + P('M50 22 C 70 22, 76 52, 74 70 C 72 86, 62 92, 50 92 C 38 92, 28 86, 26 70 C 24 52, 30 22, 50 22 Z', '#c84a2a', so())
    + [[40, 40, 6], [60, 50, 5], [44, 66, 7], [62, 74, 5], [34, 56, 4]].map(([x, y, r]) => E(x, y, r, r * 0.7, '#e8a04a', 'opacity=".8"')).join('') + P('M52 30 L48 40 L54 46 L49 54', 'none', 'stroke="#ffd34d" stroke-width="2" ' + GLOW) + E(42, 34, 4, 7, '#fff', 'opacity=".25"');
}
function elemental(o) {
  const k = o.kind;
  let s = '';
  const eyes = (y = 50, col = '#fff') => E(42, y, 3.4, 4.2, col, so(1.2)) + E(58, y, 3.4, 4.2, col, so(1.2)) + Ci(42.6, y + 0.6, 1.6, OUT) + Ci(58.6, y + 0.6, 1.6, OUT);
  if (k === 'fire') {
    s += softGlow(50, 56, 32, '#ff7a2a', .35) + P('M50 12 C 58 26, 74 34, 72 58 C 70 78, 60 90, 50 90 C 40 90, 30 78, 28 58 C 27 46, 34 40, 38 30 C 41 37, 44 40, 46 42 C 46 32, 47 22, 50 12 Z', '#ff7a2a', so()) + P('M50 40 C 56 50, 64 56, 62 68 C 60 80, 56 84, 50 84 C 44 84, 38 78, 38 68 C 38 58, 46 52, 50 40 Z', '#ffd34d') + eyes(60, '#fff6c8') + P('M44 72 Q50 77 56 72', 'none', 'stroke="#8a2a10" stroke-width="2" stroke-linecap="round"');
  } else if (k === 'stone') {
    s += P('M24 92 L20 60 L30 36 L50 28 L70 36 L80 60 L76 92 Z', '#8d8a82', so()) + Ln('M30 48 L40 54 L36 66 M64 46 L58 58 L66 70', '#6a675f', 1.6) + E(36, 40, 5, 2.4, '#7fa553') + eyes(56, '#ffe9a8') + Ln('M42 72 L58 72', '#4a4842', 2.6) + [[18, 96, 6], [84, 94, 5]].map(([x, y, r]) => E(x, y, r, r * 0.6, '#7d7a72', so(1.4))).join('');
  } else if (k === 'air') {
    s += [0, 1, 2, 3].map(i => Ln(`M${20 + i * 4} ${30 + i * 14} C ${40} ${20 + i * 14}, ${70} ${40 + i * 14}, ${82 - i * 4} ${28 + i * 14}`, '#e8f6ff', 5 - i, 'opacity=".85"')).join('') + P('M30 44 C 30 30, 70 30, 70 44 C 70 60, 60 70, 50 70 C 40 70, 30 60, 30 44 Z', '#bfe3ff', so() + ' opacity=".9"') + eyes(48, '#fff') + E(50, 60, 4, 3, '#4a6a8a');
  } else if (k === 'water') {
    s += P('M14 92 C 20 70, 30 40, 50 22 C 70 40, 80 70, 86 92 Z', '#3f8ad0', so()) + Ln('M22 80 Q32 72 42 80 T62 80 T82 80', '#bfe3ff', 2.4) + Ln('M30 64 Q38 58 46 64 T62 64 T76 64', '#bfe3ff', 1.8, 'opacity=".7"') + eyes(48, '#e8f6ff') + P('M44 56 Q50 61 56 56', 'none', 'stroke="#1a3a6a" stroke-width="2" stroke-linecap="round"') + [[30, 30], [72, 34], [80, 56]].map(([x, y]) => Ci(x, y, 2, '#e8f6ff', so(0.8))).join('');
  } else if (k === 'magma') {
    s += softGlow(50, 60, 32, '#ff6a1a', .3) + P('M22 90 L18 58 L30 32 L50 24 L70 32 L82 58 L78 90 Z', '#3a2a24', so()) + P('M30 40 L42 52 L36 66 L46 80 M70 38 L58 50 L66 64 L56 80 M50 26 L50 44', 'none', 'stroke="#ff8a2a" stroke-width="3" ' + GLOW) + eyes(54, '#ffd34d') + P('M40 70 Q50 64 60 70 Q50 76 40 70 Z', '#ff8a2a', GLOW);
  } else if (k === 'storm') {
    s += P('M20 52 C 10 52, 10 36, 22 36 C 22 22, 40 18, 46 28 C 52 16, 76 18, 76 34 C 90 32, 92 52, 78 52 Z', '#5a6a8a', so()) + eyes(40, '#fff1b8') + P('M44 52 L36 70 L46 70 L40 92 L60 62 L50 62 L58 52 Z', '#fff1b8', so(1.4) + ' ' + GLOW) + P('M70 54 L66 64 L72 64 L68 76 L78 60 L72 60 L76 54 Z', '#bfe3ff', so(1));
  } else {
    s += softGlow(50, 54, 34, '#fff', .25);
    const cols = ['#ff7a2a', '#3f8ad0', '#8d8a82', '#bfe3ff'];
    cols.forEach((col, i) => { const a = i / 4 * Math.PI * 2; s += Ci(f1(50 + Math.cos(a) * 26), f1(54 + Math.sin(a) * 26), 7, col, so(1.4)); });
    s += Ci(50, 54, 18, '#f6f0ff', so()) + Ci(50, 54, 12, '#d8c8ff') + eyes(52, '#fff') + P(starD(50, 22, 6, 2, 4), '#fff1b8', GLOW);
  }
  if (o.sparks) s += [[16, 20], [84, 16], [12, 70], [88, 74]].map(([x, y]) => Ci(x, y, 1.4, o.sparks, GLOW)).join('');
  return s;
}

/* ---------- table : cartes des nouvelles familles ---------- */
Object.assign(ART, {
  v_ecuyer: () => vampire({ hair:'#2a1a20', hs:'short', shirt:'#4a1a24', mouth:'grin' }),
  v_chauve: () => bats([[50, 50, 3.6]]) + Ci(44, 49, 1.6, '#ff3a4a', GLOW) + Ci(56, 49, 1.6, '#ff3a4a', GLOW) + bats([[20, 24, 1], [80, 30, 0.8]]),
  v_sangsue: () => vampire({ skin:'#d8d0e0', hair:'#3a2a40', hs:'bald', nose:'big', glow:'#ff6a8a', mouth:'o', cape:'#2a1a2e', ears:'pointy' }),
  v_hote: () => vampire({ hair:'#c8c8d0', hs:'side', beard:'mustache', beardc:'#c8c8d0', shirt:'#1a1418', chalice:true, bats:true }),
  v_baronne: () => vampire({ hair:'#7a1a2a', hs:'bun', collar:'#e2b452', earring:true, lining:'#e2b452', mouth:'smirk', chalice:true }),
  v_comte: () => vampire({ hair:'#1a1418', hs:'part', hat:'tricorn', hatc:'#1a0a12', bats:true }),
  v_seigneur: () => vampire({ hair:'#e8e2da', hs:'long', crown:true, cape:'#1a0610', lining:'#c8202e', glow:'#ff1a2a' }),
  v_ancetre: () => vampire({ skin:'#c8c0d0', hair:'#f0f0f0', hs:'long', beard:'long', beardc:'#f0f0f0', crown:true, bats:true, cape:'#120408' }),
  g_villageois: () => werewolf({ col:'#9a8a6a', belly:'#efe2c8', shirt:'#c8b89a', angry:false, fangs:false, pup:true }),
  g_pisteuse: () => werewolf({ col:'#7a7a8a', belly:'#dcdce8', shirt:'#4a6a3a', straps:true }),
  g_hurleur: () => werewolf({ col:'#5a5a6a', belly:'#c8c8d8', shirt:'#6a3a2a', claws:true }),
  g_alpha: () => werewolf({ col:'#3a3a44', belly:'#a8a8b8', eye:'#ff8a2a', shirt:'#2a2a2a', claws:true, straps:true }),
  g_bete: () => werewolf({ col:'#5a3a2a', belly:'#b8987a', eye:'#ff4a2a', shirt:'#3a2a1a', claws:true }),
  g_matriarche: () => werewolf({ col:'#b8b0b8', belly:'#f3eef3', eye:'#ff6a4a', shirt:'#7a1f2e', crown:true, claws:true }),
  m_squelette: () => skeleton({ armor:'#3a3a3a' }),
  m_goule: () => zombie({ skin:'#a8b88a', mouth:'grin', hs:'bald', shirt:'#3a3a2a' }),
  m_cadavre: () => zombie({ skin:'#8fa07a', hair:'#4a4a3a', hs:'side', shirt:'#5a4a3a', nose:'big' }),
  m_crane: () => skeleton({ robe:'#2a1a3a', glow:'#ff6a4a', flies:true }) + Ln('M30 22 Q24 14 30 8 M70 22 Q76 14 70 8', '#ff6a4a', 1.4, 'opacity=".7"'),
  m_chevalier: () => skeleton({ armor:'#5a5f69', helm:'#6a707a', sword:true }),
  m_necro: () => human({ skin:'#d8dccb', hair:'#1a1a22', hs:'long', hat:'hood', hatc:'#1e2a1e', eyes:'glow', glow:'#8dff9a', mouth:'flat', noblush:true, shirt:'#1e2a1e', prop:'book' }) + orb(18, 78, '#8dff9a'),
  m_abomination: () => zombie({ skin:'#8a9a7a', stitch:'#5a4a3a' }),
  m_roi: () => skeleton({ robe:'#2a2a3a', crown:true, glow:'#7fffd4' }),
  d_mineur: () => dwarf({ helm:'miner', hair:'#3a2a1a', beard:'full', pick:true, shirt:'#5a4a3a' }),
  d_brasseur: () => dwarf({ hair:'#c8a050', beard:'long', mouth:'grin', prop:'mug', shirt:'#7a4a2a' }),
  d_bouclier: () => dwarf({ helm:'dome', hair:'#6a3a1a', beard:'full', shield:true, angry:true }),
  d_forgeron: () => dwarf({ hair:'#2a1a10', beard:'long', prop:'hammer', runes:true, shirt:'#3a3a3a', helm:'horn' }),
  d_arbalete: () => dwarf({ helm:'dome', hc:'#a87418', hair:'#8a3a1c', beard:'full', eyes:'patch', bowx:true }) + `<g transform="translate(78 80) rotate(-90)">${bow(0, 0)}</g>`,
  d_thane: () => dwarf({ helm:'horn', hc:'#c8963e', hair:'#e8e2da', beard:'long', beardc:'#e8e2da', shirt:'#7a1f2e', prop:'sword' }),
  d_gardien: () => dwarf({ helm:'crown', hair:'#5a5a60', beard:'long', beardc:'#8fe3ff', skin:'#9aa3ab', eyes:'glow', runes:true, shield:true }),
  e_eclaireuse: () => elf({ hair:'#c8a050', hs:'braids', hat:'hood', hatc:'#2f5a3a', bow:true }),
  e_archere: () => elf({ hair:'#5a3a22', hs:'long', bow:true, shirt:'#3a5a2a' }),
  e_druide: () => elf({ hair:'#8a6a4a', hs:'curly', hat:'circlet', hatc:'#6fbf4a', beard:'long', shirt:'#5a4a2a', orb:'#a6e07a', leafc:'#8fe36a' }),
  e_lamelune: () => elf({ hair:'#e8e8f0', hs:'long', shirt:'#2a2a4a', collar:'#bfe3ff', moon:true, prop:'sword' }),
  e_enchant: () => elf({ hair:'#b8452c', hs:'bun', shirt:'#5a3d7a', collar:'#e2b452', orb:'#d9c8ff', eyes:'happy' }),
  e_gardien: () => elf({ hair:'#2a2a1a', hs:'long', cloak:'#2f5a3a', shirt:'#4a5a3a', eyes:'glow', glow:'#a6e07a' }),
  e_reine: () => elf({ hair:'#f0e0a0', hs:'long', hat:'crown', hatc:'#e2b452', shirt:'#2f6b46', collar:'#e2b452', cloak:'#1e4a3a', orb:'#fff1b8' }),
  o_bagarreur: () => ogre({ hs:'mohawk', hair:'#3a2a1a', mouth:'grin', scar:true }),
  o_cogneur: () => ogre({ skin:'#9a9a7a', club:true }),
  o_mangeur: () => ogre({ skin:'#a0a870', mouth:'grin', angry:false, leg:true }),
  o_brute: () => ogre({ skin:'#7a9a8a', twin:true, club:true }),
  o_chef: () => ogre({ skin:'#8a9a5a', crown:true, fur:'#4a3a22', beard:'goatee', beardc:'#2a2418' }),
  o_montagne: () => ogre({ skin:'#8a8a7a', hs:'bald', fur:'#3a3a2a', club:true, scar:true }) + E(50, 20, 40, 8, '#fff', 'opacity=".15"'),
  gb_chapardeur: () => goblin({ hat:'bandana', hatc:'#3a3a3a', mouth:'smirk', sack:true }),
  gb_bricoleur: () => goblin({ eyes:'goggles', glow:'#ffd27a', prop:'wrench', hs:'mohawk', hair:'#c8452c' }),
  gb_marchand: () => goblin({ hat:'beret', hatc:'#8a2a24', collar:'#e2b452', coins:true }),
  gb_dynamiteur: () => goblin({ eyes:'goggles', glow:'#ff7a2a', hs:'bald', bomb:true, angry:true, mouth:'grin' }),
  gb_contrebandier: () => goblin({ hat:'tricorn', hatc:'#2a2330', eyes:'patch', sack:true }),
  gb_banquier: () => goblin({ hat:'admiral', hatc:'#1d2b45', eyes:'glasses', collar:'#e2b452', coins:true, mouth:'smirk' }),
  gb_roi: () => goblin({ crown:true, skin:'#6aa03a', collar:'#9aa3ab', coins:true, mouth:'grin' }),
  dg_dragonnet: () => dragonHead({ col:'#e0703a', eye:'#ffe14a', smoke:true }),
  dg_oeuf: () => dragonEgg(),
  dg_wyverne: () => dragonHead({ col:'#5a8a4a', eye:'#ffd23f', wings:true }),
  dg_cracheur: () => dragonHead({ col:'#c8402a', fire:true }),
  dg_garde: () => dragonHead({ col:'#d8a040', belly:'#fff1b8', horn:'#fff6d8', frill:true }),
  dg_matriarche: () => dragonHead({ col:'#3a6a9a', eye:'#bfe3ff', frill:true, wings:true }),
  dg_ancien: () => dragonHead({ col:'#5a1a10', eye:'#ff8a2a', frill:true, crown:true, fire:true }),
  el_flammeche: () => elemental({ kind:'fire', sparks:'#ffd34d' }),
  el_galet: () => elemental({ kind:'stone' }),
  el_bourrasque: () => elemental({ kind:'air' }),
  el_vague: () => elemental({ kind:'water' }),
  el_magma: () => elemental({ kind:'magma', sparks:'#ffb04a' }),
  el_tempete: () => elemental({ kind:'storm', sparks:'#fff1b8' }),
  el_primordial: () => elemental({ kind:'prism', sparks:'#fff' }),
  // compagnons des nouveaux héros
  c_nyx: () => compHalo('#ff3a4a') + bats([[50, 54, 3.8]]) + Ci(44, 52, 2, '#ff3a4a', GLOW) + Ci(56, 52, 2, '#ff3a4a', GLOW) + fangs(58) + `<g transform="translate(0 -8)">${HAT.crown('#d8d0e0')}</g>`,
  c_enclume: () => compHalo('#8fe3ff') + P('M20 70 L80 70 L72 80 L60 80 L60 96 L72 100 L28 100 L40 96 L40 80 L28 80 Z', '#5a5f69', so()) + P('M14 56 L86 56 C 86 66, 80 70, 70 70 L30 70 C 20 70, 14 66, 14 56 Z', '#7a848e', so()) + Ln('M18 60 L82 60', '#c4c9ce', 1.6, 'opacity=".7"') + E(40, 64, 3, 2.4, '#8fe3ff', GLOW) + E(60, 64, 3, 2.4, '#8fe3ff', GLOW) + P(starD(50, 40, 8, 3, 4), '#fff1b8', GLOW) + Ln('M30 34 L36 40 M70 34 L64 40', '#fff1b8', 1.6),
  c_lys: () => compHalo('#d9ffcf') + wisp({ col:'#9fe8c8' }) + leaves([[30, 70, -40], [62, 74, 220]], '#7fd05a') + P(starD(50, 22, 5, 2, 6), '#fff', GLOW),
  c_miette: () => compHalo('#ffd27a') + goblin({ skin:'#9ac06a', hat:'hardhat', hatc:'#f6f0e6', apron:true, mouth:'grin', freckles:true, shirt:'#f6f0e6' }) + P('M36 22 C 30 10, 44 4, 50 10 C 56 4, 70 10, 64 22 Z', '#fff', so(1.6)) + `<g transform="translate(78 86) rotate(20)">${Ln('M0 0 L0 -18', '#8a5a2b', 2.4)}${E(0, -22, 5, 3, '#8a5a2b', so(1.2))}</g>`,
  c_osbrise: () => compHalo('#8dff9a') + P('M24 52 C 22 34, 36 26, 50 30 C 64 26, 78 34, 76 52 C 74 62, 66 66, 60 74 L40 74 C 34 66, 26 62, 24 52 Z', '#ece3c8', so()) + P('M30 40 L22 22 L38 34 Z', '#ece3c8', so(1.6)) + P('M70 40 L78 22 L62 34 Z', '#ece3c8', so(1.6)) + E(41, 48, 5, 5.4, '#140c1c') + E(59, 48, 5, 5.4, '#140c1c') + Ci(41, 49, 2, '#8dff9a', GLOW) + Ci(59, 49, 2, '#8dff9a', GLOW) + P('M44 60 C 44 74, 56 74, 56 60 Z', '#ece3c8', so(1.6)) + E(50, 60, 3, 2.2, OUT) + Ln('M44 68 L56 68 M47 66 L47 72 M50 66 L50 73 M53 66 L53 72', '#140c1c', 1) + `<g transform="translate(76 86) rotate(-30)">${Ln('M-10 0 L10 0', '#ece3c8', 4)}${Ci(-11, -2, 3, '#ece3c8', so(1))}${Ci(-11, 2, 3, '#ece3c8', so(1))}${Ci(11, -2, 3, '#ece3c8', so(1))}${Ci(11, 2, 3, '#ece3c8', so(1))}</g>`,
  c_etincelle: () => compHalo('#ffb04a') + `<g transform="translate(10 12) scale(.8)">${dragonHead({ col:'#ff8a3a', eye:'#ffe14a', belly:'#fff1c8', smoke:true })}</g>` + [[20, 20], [82, 28], [86, 76]].map(([x, y]) => Ci(x, y, 1.6, '#ffd34d', GLOW)).join(''),
});

/* ---------- portraits des nouveaux héros ---------- */
Object.assign(HART, {
  selene: () => vampire({ hair:'#1a0a14', hs:'bun', collar:'#e2b452', lining:'#e2b452', crown:true, earring:true, mouth:'smirk', bats:true }),
  brok: () => dwarf({ helm:'horn', hc:'#9aa3ab', hair:'#3a2a1a', beard:'long', beardc:'#3a2a1a', prop:'hammer', runes:true, shirt:'#7a4a2a' }),
  sylvara: () => elf({ hair:'#e8e8f0', hs:'long', hat:'circlet', hatc:'#bfe3ff', shirt:'#3a2a6a', collar:'#bfe3ff', orb:'#b48cff', eyes:'glow', glow:'#d9c8ff', cloak:'#2a1a4a' }),
  grumbo: () => ogre({ skin:'#9aa86a', angry:false, mouth:'grin', leg:true, fur:'#f6f0e6' }) + P('M34 30 C 26 16, 42 8, 50 14 C 58 8, 74 16, 66 30 Z', '#fff', so(1.6)) + `<rect x="34" y="28" width="32" height="6" rx="2" fill="#fff" ${so(1.4)}/>`,
  vaskor: () => human({ skin:'#cfd6c4', hair:'#1a1a22', hs:'side', hat:'hood', hatc:'#1a1a22', eyes:'glow', glow:'#8dff9a', mouth:'smirk', beard:'goatee', beardc:'#1a1a22', noblush:true, shirt:'#1e2a1e' }) + `<g transform="translate(80 100)">${Ln('M0 0 L0 -60', OUT, 4)}${Ln('M0 0 L0 -60', '#5a4a3a', 2.4)}<g transform="translate(-12 -78) scale(.24)">${skeleton({ robe:null, armor:'none', glow:'#8dff9a' })}</g></g>`,
  pyra: () => `<g transform="translate(46 0) scale(.6)">${dragonHead({ col:'#c8402a', frill:true, smoke:true })}</g>` + human({ skin:'#e8b894', hair:'#d9502a', hs:'braids', hat:'feather', hatc:'#5a3a22', eyes:'goggles', glow:'#ffb04a', mouth:'grin', freckles:true, shirt:'#7a3a22', collar:'#e2b452' }),
});

/* ---------- le tavernier (personnage original) ---------- */
HART.keeper = () => {
  let s = softGlow(50, 30, 40, '#ffcf6a', 0.35);
  s += [[14, 20], [86, 24]].map(([x, y]) => `<rect x="${x - 3}" y="${y}" width="6" height="12" rx="1.5" fill="#efe4c8" ${so(1.2)}/>` + P(`M${x} ${y - 8} C ${x + 3} ${y - 4} ${x + 3} ${y - 1} ${x} ${y} C ${x - 3} ${y - 1} ${x - 3} ${y - 4} ${x} ${y - 8} Z`, '#ffb04a', GLOW)).join('');
  s += human({ skin:'#eab08a', hair:'#4a2a18', hs:'side', beard:'mustache', beardc:'#5a321c', nose:'big', eyes:'happy', mouth:'grin', shirt:'#e9e0cf', collar:'#7a1f2e', apron:'#6b3f22', earring:false });
  s += P('M58 76 C 66 74, 74 78, 78 88 L72 92 C 68 84, 62 80, 56 80 Z', '#f6f0e6', so(1.6)) + Ln('M62 79 L70 87 M66 78 L74 86', '#c8392f', 1.2);
  s += P('M38.5 57 C 33 58, 30 54, 30 51 C 34 53, 37 53, 40 52.6 Z', '#5a321c', so(1.2)) + mirror(P('M38.5 57 C 33 58, 30 54, 30 51 C 34 53, 37 53, 40 52.6 Z', '#5a321c', so(1.2)));
  s += PROP.mug();
  return s;
};
