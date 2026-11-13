p='/home/claude/parts/engine.js'; s=open(p,encoding='utf-8').read()
def rep(a,b,n=1):
    global s
    assert a in s, a[:90]
    s=s.replace(a,b,n)
rep("  { id:'sannin', n:'Les Sannin',", """  { id:'md5', n:'Maître et disciple', m:['nk_naruto', 'nk_konohamaru'], el:'nk_konohamaru', th:[2], tx:['Le jutsu de Konohamaru est gratuit, et il gagne +3/+3 à chaque fin de tour.'] },
  { id:'md6', n:'Maître et disciple', m:['nk_gaara', 'nk_matsuri'], el:'nk_matsuri', th:[2], tx:['Le jutsu de Matsuri est gratuit, et elle gagne +3/+3 à chaque fin de tour.'] },
  { id:'ombre', n:'Ombre et vent', m:['nk_shikamaru', 'nk_temari'], th:[2], tx:['Chaque combat : les deux gagnent +6/+6. Fin de tour : 2 or de plus au prochain tour.'] },
  { id:'genins', n:'Genins du Son', m:['nk_dosu', 'nk_zaku'], th:[2], tx:['Fin de tour : les deux gagnent +3/+3.'] },
  { id:'chiyo', n:'Grand-mère et petit-fils', m:['nk_chiyo', 'nk_sasori'], th:[2], tx:['Chaque combat : les deux gagnent +6/+6 et Réincarnation.'] },
  { id:'anciens', n:'Anciens de Suna', m:['nk_chiyo', 'nk_ebizo', 'nk_pakura'], th:[2, 3], tx:['Chaque vente donne 1 chakra.', 'Chaque vente donne 2 chakra et +2/+2 à tous tes ninjas de Suna.'] },
  { id:'gardek', n:'Garde du Kazekage', m:['nk_rasa', 'nk_yashamaru', 'nk_baki'], th:[2, 3], tx:['Fin de tour : 1 or de plus au prochain tour.', 'Fin de tour : 2 or de plus au prochain tour, et ils gagnent +3/+3.'] },
  { id:'gardem', n:'Garde du Mizukage', m:['nk_mei', 'nk_ao', 'nk_chojuro'], th:[2, 3], tx:['Chaque combat : ils gagnent +5/+5.', 'Chaque combat : ils gagnent +10/+10 et Bouclier divin.'] },
  { id:'kage', n:'Les Kage', m:['nk_gaara', 'nk_tsunade', 'nk_mei', 'nk_rasa', 'nk_yagura'], th:[2, 3, 5], tx:['Fin de tour : gagne 2 chakra.', 'Fin de tour : gagne 4 chakra.', 'Fin de tour : ton chakra est rempli, et ils gagnent +6/+6.'] },
  { id:'sannin', n:'Les Sannin',""")
rep("  if (lv('immortels')) tmp('immortels', 8, 8, 'r');", """  ['md5', 'md6'].forEach(id => { if (lv(id)) { const g = NK_GROUPS.find(x => x.id === id); withSrc(g.n, () => p.bd.filter(m => m.c === g.el).forEach(m => buff(m, 3 * mult(m), 3 * mult(m)))); } });
  if (lv('genins')) perm('genins', 3, 3);
  if (lv('ombre')) { tmp('ombre', 6, 6, ''); p.inc = p.inc || []; p.inc[0] = (p.inc[0] || 0) + 2; }
  if (lv('chiyo')) tmp('chiyo', 6, 6, 'r');
  if (lv('gardek')) { p.inc = p.inc || []; p.inc[0] = (p.inc[0] || 0) + lv('gardek'); if (lv('gardek') > 1) perm('gardek', 3, 3); }
  if (lv('gardem')) tmp('gardem', lv('gardem') > 1 ? 10 : 5, lv('gardem') > 1 ? 10 : 5, lv('gardem') > 1 ? 's' : '');
  if (lv('kage')) { const k = lv('kage'); p.ck = Math.min(ckMax(p), (p.ck || 0) + [2, 4, 99][k - 1]); if (k > 2) perm('kage', 6, 6); }
  if (lv('immortels')) tmp('immortels', 8, 8, 'r');""")
rep("if (f > 1) p.g += 1; } }", "if (f > 1) p.g += 1; } const an = nkOn(p, 'anciens'); if (an) { p.ck = Math.min(ckMax(p), (p.ck || 0) + an); if (an > 1) withSrc('Anciens de Suna', () => p.bd.filter(x => tribe(x) === 'nk_sun').forEach(x => buff(x, 2 * mult(x), 2 * mult(x)))); } }")
# l'IA cherche à compléter ses groupes
rep("  if (main && b.tr === main) s += 4;\n", "  if (main && b.tr === main) s += 4;\n  if (typeof NK_GOF !== 'undefined' && NK_GOF[m.c]) { const on = new Set(p.bd.concat(p.hd).filter(x => x !== m && !x.sp).map(x => x.c)); NK_GOF[m.c].forEach(g => { const n = g.m.filter(c => c !== m.c && on.has(c)).length; if (n) s += 6 + 5 * n; }); }   // Naruto : les groupes emblématiques passent avant tout\n",1)
m=__import__('re').search(r"  chakra:\{ n:'Chakra, jutsus et transformations'.*\n", s); assert m
s=s.replace(m.group(0), "  chakra:{ n:'Groupes emblématiques, jutsus et transformations', ic:'k_spark', d:'Réunis les duos, trios et équipes de l\\'animé sur ton plateau (Équipe 7, les Sannin, les binômes de l\\'Akatsuki, la Fratrie du Sable, les Épéistes de la Brume…) : chaque groupe réuni donne un gros bonus, et les bonus se cumulent. La liste des groupes s\\'affiche à droite du plateau ; les cartes de la taverne qui complètent un de tes groupes sont signalées. Chaque serviteur génère 1 chakra par tour (10 au plus) : il paie le jutsu de chaque ninja (goutte bleue, une fois par tour, coût = niveau) et sa transformation unique (étoile dorée). Les grosses invocations n\\'arrivent que par les jutsus de leurs invocateurs.' },\n")
open(p,'w',encoding='utf-8').write(s)
p='/home/claude/parts/ui.js'; s=open(p,encoding='utf-8').read()
a="    ${sec('💧', 'Chakra',"; assert a in s
s=s.replace(a,"    ${sec('🤝', 'Groupes emblématiques', `<small><b>La mécanique principale.</b> Réunis sur ton plateau les duos, trios et équipes de l'animé : Équipe 7, les Sannin, les binômes de l'Akatsuki, la Fratrie du Sable, les Cinq du Son, les Épéistes de la Brume… Chaque groupe réuni donne un gros bonus, plus fort à chaque membre ajouté, et les bonus se cumulent. La liste s'affiche à droite du plateau ; la taverne signale les cartes qui complètent tes groupes.</small>`)}\n"+a,1)
open(p,'w',encoding='utf-8').write(s)
p='/home/claude/parts/gel.js'; s=open(p,encoding='utf-8').read()
a="  if (el.innerHTML !== h) el.innerHTML = h;\n}"; assert a in s
s=s.replace(a, a[:-1]+r"""  // plateau : halo doré sur les membres d'un groupe actif ; taverne et main : étiquette sur les cartes qui font avancer un de mes groupes
  const act = new Set(); NK_GROUPS.forEach(g => { if (L[g.id] && L[g.id].l) g.m.forEach(c => act.add(c)); });
  const have = new Set((V.me.bd || []).map(m => m.c));
  tb.querySelectorAll('.mn[data-z="bd"]').forEach(e => { const m = (V.me.bd || [])[+e.dataset.i]; e.classList.toggle('nk-in', !!(m && act.has(m.c))); });
  const mark = (e, m) => { const gs = m && !m.sp && !have.has(m.c) ? (NK_GOF[m.c] || []).filter(g => g.m.some(c => c !== m.c && have.has(c))) : []; let t = e.querySelector(':scope > .nk-tag');
    if (!gs.length) { if (t) t.remove(); return; }
    const done = gs.some(g => { const n = g.m.filter(c => have.has(c)).length + 1; return g.th.includes(n); }), tx = (done ? '★ ' : '') + gs[0].n + (gs.length > 1 ? ' +' + (gs.length - 1) : '');
    if (!t) { t = document.createElement('span'); t.className = 'nk-tag'; e.appendChild(t); } t.classList.toggle('done', done); if (t.textContent !== tx) t.textContent = tx; };
  tb.querySelectorAll('.mn[data-z="sh"]').forEach(e => mark(e, (V.me.sh || [])[+e.dataset.i]));
  tb.querySelectorAll('.cd[data-z="hd"]').forEach(e => mark(e, (V.me.hd || [])[+e.dataset.i]));
}""",1)
a="@media (max-width:900px){#nk-groups{display:none}}"; assert a in s
s=s.replace(a,a+"""
.mn.nk-in::before{content:'';position:absolute;inset:-7% -9% 4% -9%;border-radius:50%;z-index:-1;background:radial-gradient(ellipse at 50% 50%,rgba(255,214,90,.75),rgba(255,180,40,.28) 55%,transparent 72%);pointer-events:none;animation:nkIn 2.2s ease-in-out infinite}
@keyframes nkIn{50%{opacity:.55}}
html.lite .mn.nk-in::before{animation:none}
.nk-tag{position:absolute;left:50%;bottom:-13%;transform:translateX(-50%);z-index:8;padding:1px 8px;border-radius:99px;font:700 clamp(8px,1.1vh,12px) var(--f-label),serif;white-space:nowrap;pointer-events:none;color:#fff3c0;background:rgba(40,24,10,.9);border:1px solid #c8a04a}
.nk-tag.done{color:#2a1606;background:linear-gradient(180deg,#ffe28a,#d09a2a);border-color:#fff3c0;box-shadow:0 0 9px rgba(255,200,60,.8)}
.cd > .nk-tag{bottom:auto;top:-4%}""",1)
open(p,'w',encoding='utf-8').write(s)
