p='/home/claude/parts/engine.js'; s=open(p,encoding='utf-8').read()
def rep(a,b,n=1):
    global s
    assert a in s, a[:90]
    s=s.replace(a,b,n)
rep("// l'IA : se transforme dès qu'elle le peut", r"""// ----- groupes emblématiques : duos, trios et plus. Actifs quand les membres sont ensemble sur le plateau ; les bonus se cumulent -----
const NK_GROUPS = [
  { id:'immortels', n:'Duo immortel', m:['nk_hidan', 'nk_kakuzu'], th:[2], tx:['Chaque combat : les deux gagnent +8/+8 et Réincarnation.'] },
  { id:'artistes', n:'Les artistes', m:['nk_deidara', 'nk_sasori'], th:[2], tx:['Chaque combat : les deux gagnent +6/+6, et 4 dégâts frappent tous les ennemis au début du combat.'] },
  { id:'itakisa', n:'Itachi et Kisame', m:['nk_itachi', 'nk_kisame'], th:[2], tx:['Chaque combat : les deux gagnent +10/+10 et Vol de vie.'] },
  { id:'anges', n:'Les anges d\'Ame', m:['nk_pain', 'nk_konan'], th:[2], tx:['Chaque combat : les deux gagnent +6/+6 et Bouclier divin. Le Chien géant de Pain arrive doré.'] },
  { id:'espions', n:'Les espions', m:['nk_zetsu', 'nk_tobi'], th:[2], tx:['Fin de tour : les deux gagnent +4/+4. Chaque combat : Camouflage.'] },
  { id:'demon', n:'Le démon et son arme', m:['nk_zabuza', 'nk_haku'], th:[2], tx:['Chaque combat : Zabuza gagne +6/+6, Bouclier divin et Furie des vents ; Haku gagne +0/+6 et Provocation.'] },
  { id:'uchiha', n:'Frères Uchiha', m:['nk_itachi', 'nk_sasuke'], th:[2], tx:['Fin de tour : les deux gagnent +5/+5.'] },
  { id:'md1', n:'Maître et disciple', m:['nk_jiraiya', 'nk_naruto'], el:'nk_naruto', th:[2], tx:['Le jutsu et la transformation de Naruto sont gratuits.'] },
  { id:'md2', n:'Maître et disciple', m:['nk_gai', 'nk_lee'], el:'nk_lee', th:[2], tx:['Le jutsu et la transformation de Rock Lee sont gratuits.'] },
  { id:'md3', n:'Maître et disciple', m:['nk_orochimaru', 'nk_kabuto'], el:'nk_kabuto', th:[2], tx:['Le jutsu et la transformation de Kabuto sont gratuits.'] },
  { id:'md4', n:'Maître et disciple', m:['nk_tsunade', 'nk_sakura'], el:'nk_sakura', th:[2], tx:['Le jutsu et la transformation de Sakura sont gratuits.'] },
  { id:'sannin', n:'Les Sannin', m:['nk_jiraiya', 'nk_tsunade', 'nk_orochimaru'], th:[2, 3], tx:['Leurs invocations arrivent avec +8/+8.', 'Leurs invocations arrivent dorées, avec +8/+8.'] },
  { id:'fratrie', n:'Fratrie du Sable', m:['nk_gaara', 'nk_temari', 'nk_kankuro'], th:[2, 3], tx:['Chaque vente leur donne +2/+2.', 'Chaque vente leur donne +5/+5 et rapporte 1 or de plus.'] },
  { id:'gai', n:'Équipe Gaï', m:['nk_gai', 'nk_lee', 'nk_neji'], th:[2, 3], tx:['Fin de tour : ils gagnent +3/+1.', 'Fin de tour : ils gagnent +5/+3. Chaque combat : Furie des vents.'] },
  { id:'jinchu', n:'Jinchūriki', m:['nk_naruto', 'nk_gaara', 'nk_yagura'], th:[2, 3], tx:['Leurs transformations coûtent 5 chakra de moins.', 'Leurs transformations sont gratuites. Fin de tour : ils gagnent +4/+4.'] },
  { id:'equipe7', n:'Équipe 7', m:['nk_naruto', 'nk_sasuke', 'nk_sakura', 'nk_kakashi'], th:[2, 3, 4], tx:['Fin de tour : ils gagnent +2/+2.', 'Fin de tour : ils gagnent +4/+4.', 'Fin de tour : ils gagnent +8/+8. Leurs jutsus sont gratuits.'] },
  { id:'son', n:'Les Cinq du Son', m:['nk_jirobo', 'nk_kidomaru', 'nk_sakon', 'nk_tayuya', 'nk_kimimaro'], th:[2, 3, 5], tx:['Quand l\'un d\'eux engloutit, il gagne le double.', 'Quand l\'un d\'eux engloutit, il gagne le triple.', 'Le triple, et à chaque fin de tour chacun d\'eux engloutit un serviteur de la taverne.'] },
  { id:'epees', n:'Épéistes de la Brume', m:['nk_zabuza', 'nk_chojuro', 'nk_mangetsu', 'nk_ameyuri', 'nk_jinpachi', 'nk_suigetsu', 'nk_kisame'], th:[3, 5, 7], tx:['Chaque combat : ils gagnent +4/+4.', 'Chaque combat : ils gagnent +10/+10.', 'Chaque combat : ils gagnent +20/+20 et Furie des vents.'] },
];
const NK_GOF = {}; NK_GROUPS.forEach(g => g.m.forEach(c => (NK_GOF[c] = NK_GOF[c] || []).push(g)));
// palier atteint par chaque groupe (0 = inactif) : nombre de membres différents présents sur le plateau
function nkLv(p) { const on = new Set(((p && p.bd) || []).map(m => m.c)), o = {}; NK_GROUPS.forEach(g => { const n = g.m.filter(c => on.has(c)).length; let l = 0; g.th.forEach((t, i) => { if (n >= t) l = i + 1; }); if (n >= 1) o[g.id] = { l, n }; }); return o; }
const nkOn = (p, id) => ((nkLv(p)[id] || {}).l) || 0;
const nkMem = (p, id) => { const g = NK_GROUPS.find(x => x.id === id); return p.bd.filter(m => g.m.includes(m.c)); };
function nkTmp(m, a, h, f, src) { const t = m.tmp || {}; let ff = t.f || ''; for (const c of (f || '')) if (!has(m, c) && !ff.includes(c)) ff += c; m.tmp = { a:(t.a || 0) + a * mult(m), h:(t.h || 0) + h * mult(m), f:ff, s:t.s || src }; }
// fin de tour : bonus définitifs des groupes, puis bonus du prochain combat
function nkGroupsEot(G, p) {
  const L = nkLv(p), lv = id => (L[id] || {}).l || 0, each = (id, f) => nkMem(p, id).forEach(f), G0 = id => NK_GROUPS.find(x => x.id === id).n;
  const perm = (id, a, h) => withSrc(G0(id), () => each(id, m => buff(m, a * mult(m), h * mult(m))));
  const tmp = (id, a, h, f) => each(id, m => nkTmp(m, a, h, f, G0(id)));
  if (lv('espions')) perm('espions', 4, 4);
  if (lv('uchiha')) perm('uchiha', 5, 5);
  if (lv('gai')) perm('gai', lv('gai') > 1 ? 5 : 3, lv('gai') > 1 ? 3 : 1);
  if (lv('jinchu') > 1) perm('jinchu', 4, 4);
  if (lv('equipe7')) perm('equipe7', [2, 4, 8][lv('equipe7') - 1], [2, 4, 8][lv('equipe7') - 1]);
  if (lv('son') > 2) withSrc(G0('son'), () => each('son', m => devour(G, p, m, mult(m))));
  if (lv('immortels')) tmp('immortels', 8, 8, 'r');
  if (lv('artistes')) { tmp('artistes', 6, 6, ''); p.foe = p.foe || {}; p.foe.aoe = (p.foe.aoe || 0) + 4; }
  if (lv('itakisa')) tmp('itakisa', 10, 10, 'l');
  if (lv('anges')) tmp('anges', 6, 6, 's');
  if (lv('espions')) tmp('espions', 0, 0, 'c');
  if (lv('demon')) p.bd.forEach(m => { if (m.c === 'nk_zabuza') nkTmp(m, 6, 6, 'sw', G0('demon')); if (m.c === 'nk_haku') nkTmp(m, 0, 6, 't', G0('demon')); });
  if (lv('gai') > 1) tmp('gai', 0, 0, 'w');
  if (lv('epees')) { const k = lv('epees'), v = [4, 10, 20][k - 1]; tmp('epees', v, v, k > 2 ? 'w' : ''); }
}
// jutsu / transformation gratuits ou moins chers
function nkFreeJut(p, m) { return NK_GROUPS.some(g => g.el === m.c && nkOn(p, g.id)) || (nkOn(p, 'equipe7') > 2 && NK_GOF[m.c] && NK_GOF[m.c].some(g => g.id === 'equipe7')); }
function nkTfCut(p, m) { if (NK_GROUPS.some(g => g.el === m.c && nkOn(p, g.id))) return 99; const j = (NK_GOF[m.c] || []).some(g => g.id === 'jinchu') ? nkOn(p, 'jinchu') : 0; return j > 1 ? 99 : j ? 5 : 0; }
// les invocations des Sannin et le chien de Pain arrivent renforcés
function nkInvBoost(G, p, m, before) {
  const sn = ['nk_jiraiya', 'nk_tsunade', 'nk_orochimaru'].includes(m.c) ? nkOn(p, 'sannin') : 0, an = m.c === 'nk_pain' && nkOn(p, 'anges');
  if (!sn && !an) return;
  p.bd.forEach((x, i) => { if (before.has(x) || tribe(x) !== 'nk_inv') return; let y = x; if ((sn > 1 || an) && !x.g) { y = mk(x.c, 1); p.bd[i] = y; } if (sn) withSrc('Les Sannin', () => buff(y, 8, 8)); });
}
// l'IA : se transforme dès qu'elle le peut""")
rep("function jutCost(p, m) { if (!jutOf(m)) return null; return Math.max(1,", "function jutCost(p, m) { if (!jutOf(m)) return null; if (nkFreeJut(p, m)) return 0; return Math.max(1,")
rep("if (!J || !J.tf || m.tf) return null; return Math.max(1, J.tf.c - ((htr(p, 'pnktf') || {}).n || 0)); }", "if (!J || !J.tf || m.tf) return null; const cut = nkTfCut(p, m); return cut >= 99 ? 0 : Math.max(1, J.tf.c - cut - ((htr(p, 'pnktf') || {}).n || 0)); }")
rep("p.ck -= c; m.ju = G.rd; withSrc('Jutsu · ' + J.nm, () => jutFx(J, m.tf).forEach(o => runRecruit0(G, p, m, o)));", "const before = new Set(p.bd); p.ck -= c; m.ju = G.rd; withSrc('Jutsu · ' + J.nm, () => jutFx(J, m.tf).forEach(o => runRecruit0(G, p, m, o))); nkInvBoost(G, p, m, before);")
# engloutir : multiplicateur des Cinq du Son
rep("withSrc('Engloutir · ' + CD(v.c).n, () => buff(m, v.a * k, v.h * k));", "{ const s5 = (NK_GOF[m.c] || []).some(g => g.id === 'son') ? nkOn(p, 'son') : 0, kk = k * (s5 > 1 ? 3 : s5 ? 2 : 1); withSrc('Engloutir · ' + CD(v.c).n, () => buff(m, v.a * kk, v.h * kk)); }")
# vente : Fratrie du Sable
rep("p.bd.slice().forEach(x => fxOf(x, 'osell').forEach(e => runRecruit(G, p, x, e, m)));", "p.bd.slice().forEach(x => fxOf(x, 'osell').forEach(e => runRecruit(G, p, x, e, m))); { const f = nkOn(p, 'fratrie'); if (f) { withSrc('Fratrie du Sable', () => nkMem(p, 'fratrie').forEach(x => buff(x, (f > 1 ? 5 : 2) * mult(x), (f > 1 ? 5 : 2) * mult(x)))); if (f > 1) p.g += 1; } }",1)
# fin de tour
rep("    mkSync(p);\n    if (p.hero === 'maelle' && p.bd[0])", "    if (inMechAny(G, 'chakra')) nkGroupsEot(G, p);\n    mkSync(p);\n    if (p.hero === 'maelle' && p.bd[0])")
# texte des cartes : groupes du personnage
rep("  (c.fx || []).forEach(e => { if (ET[e.k]) { const t = esc(fxText(e, k));", "  if (typeof NK_GOF !== 'undefined' && NK_GOF[id]) parts.push('<b>Groupe</b> : ' + [...new Set(NK_GOF[id].map(g => esc(g.n)))].join(', ') + '.');\n  (c.fx || []).forEach(e => { if (ET[e.k]) { const t = esc(fxText(e, k));")
# l'ancien bonus Duo des cartes Akatsuki disparaît (remplacé par les groupes)
import re
s,n=re.subn(r"\{ k:'duo', card:'nk_[a-z]+', a:\d, h:\d \}, ", "", s); print('duo retirés',n)
open(p,'w',encoding='utf-8').write(s)
# interface : bandeau des groupes
p='/home/claude/parts/gel.js'; s=open(p,encoding='utf-8').read()
s+=r"""
/* ===== Naruto : bandeau des groupes emblématiques (actifs en doré, incomplets en gris) ===== */
function nkGroupsSync() {
  const tb = document.querySelector('#app .table'); let el = document.getElementById('nk-groups');
  const on = tb && V.screen === 'game' && V.me && V.pub && (V.pub.laws || []).some(l => l.k === 'chakra') && typeof nkLv === 'function';
  if (!on) { if (el) el.remove(); return; }
  const L = nkLv(V.me), rows = NK_GROUPS.filter(g => L[g.id] && (L[g.id].l || L[g.id].n >= 1)).sort((a, b) => (L[b.id].l - L[a.id].l) || (L[b.id].n - L[a.id].n));
  const h = rows.slice(0, 9).map(g => { const x = L[g.id], next = g.th[x.l], names = g.m.map(c => CD(c).n.split(' ')[0]).join(', ');
    const tip = g.n + ' (' + names + '). ' + g.th.map((t, i) => (g.th.length > 1 ? t + ' : ' : '') + g.tx[i]).join(' ') + (x.l ? '' : ' Il te manque ' + (g.th[0] - x.n) + ' membre' + (g.th[0] - x.n > 1 ? 's' : '') + '.');
    return `<span class="nkg${x.l ? ' on' : ''}" data-tip="${esc(tip)}"><b>${esc(g.n)}</b><i>${x.n}/${next || g.th[g.th.length - 1]}</i></span>`; }).join('');
  if (!el) { el = document.createElement('div'); el.id = 'nk-groups'; }
  if (el.parentNode !== tb) tb.appendChild(el);
  if (el.innerHTML !== h) el.innerHTML = h;
}
(function () { const r0 = render; render = function () { const out = r0.apply(this, arguments); try { nkGroupsSync(); } catch (e) {} return out; };
  const st = document.createElement('style'); st.id = 'nk-groups-css'; st.textContent = `
#nk-groups{position:absolute;right:1.2%;top:19%;z-index:6;display:flex;flex-direction:column;align-items:flex-end;gap:5px;pointer-events:auto}
#nk-groups .nkg{display:flex;align-items:center;gap:7px;padding:3px 10px 3px 12px;border-radius:99px;font:700 clamp(10px,1.35vh,14px) var(--f-label),serif;color:#cdbfa6;background:rgba(20,14,10,.72);border:1px solid rgba(160,130,90,.5);cursor:help;white-space:nowrap}
#nk-groups .nkg i{font-style:normal;font-family:var(--f-num);opacity:.85}
#nk-groups .nkg.on{color:#2a1606;background:linear-gradient(180deg,#ffe28a,#d09a2a);border-color:#fff3c0;box-shadow:0 0 10px rgba(255,200,60,.65)}
.table.fighting #nk-groups{display:none}
@media (max-width:900px){#nk-groups{display:none}}
`; document.head.appendChild(st); })();
"""
open(p,'w',encoding='utf-8').write(s)
