p='/home/claude/parts/ui.js'; s=open(p,encoding='utf-8').read()
def rep(a,b,n=1):
    global s
    assert a in s, a[:90]
    s=s.replace(a,b,n)
# boutons jutsu / transformation sur les serviteurs du plateau
rep("  const famH = m.fam && z !== 'sh' ?", """  const nkU = z === 'bd' && V.me && V.pub && (V.pub.laws || []).some(l => l.k === 'chakra') && typeof jutOf === 'function', nkJ = nkU && jutOf(m);
  const nkC = nkJ ? jutCost(V.me, m) : 0, nkUsed = nkJ && m.ju === V.pub.rd, nkOk = nkJ && recr && !nkUsed && (V.me.ck || 0) >= nkC, nkT = nkJ ? nkTfCost(V.me, m) : null;
  const nkH = nkJ ? `<span class="ckm-b jut-b${nkOk ? ' ok' : ''}${nkUsed ? ' used' : ''}" role="button" tabindex="0" data-act="jutsu" data-i="${i}" data-tip="${esc('Jutsu · ' + nkJ.nm + ' (' + nkC + ' chakra, une fois par tour) : ' + jutBody(jutFx(nkJ, m.tf), mult(m)) + '.' + (nkUsed ? ' Déjà lancé ce tour.' : ''))}" aria-label="Lancer le jutsu">${ckMarkH(nkC)}</span>`
    + (nkT != null ? `<span class="tf-b nk-tf${recr && (V.me.ck || 0) >= nkT ? ' ok' : ''}" role="button" tabindex="0" data-act="nktf" data-i="${i}" data-tip="${esc('Transformation · ' + nkJ.tf.nm + ' (' + nkT + ' chakra, une seule fois) : +' + nkJ.tf.a * mult(m) + '/+' + nkJ.tf.h * mult(m) + (nkJ.tf.kw ? ', ' + ((SET.kw[nkJ.tf.kw] || {}).n || '') : '') + (nkJ.tf.x || []).map(o => ', ' + fxText(o, mult(m)).replace(/\\.$/, '')).join('') + (nkJ.tf.fx ? ' ; son jutsu devient : ' + jutBody(nkJ.tf.fx, mult(m)) : '') + '.')}" aria-label="Transformer"><b>${nkT}</b></span>` : '')
    + (m.tfn ? `<span class="tf-n">${esc(m.tfn)}</span>` : '') : '';
  const famH = m.fam && z !== 'sh' ?""")
rep("${mdH}${kiH}${porH}${famH}", "${mdH}${kiH}${porH}${nkH}${famH}")
rep("    case 'ckm': sendAct({ t:'ckm', i:+btn.dataset.i }); break;", "    case 'ckm': sendAct({ t:'ckm', i:+btn.dataset.i }); break;\n    case 'jutsu': case 'nktf': sendAct({ t:btn.dataset.act, i:+btn.dataset.i }); break;")
# réservoir masqué
rep("function rsvH(d, me) {\n", "function rsvH(d, me) {\n  if (typeof NJ_RSV !== 'undefined' && !NJ_RSV) return '';\n")
rep("const ck = me.ck || 0, inc = (me.bd || []).filter(m => (law.trs || []).includes(CD(m.c).tr)).length;", "const ck = me.ck || 0, inc = (me.bd || []).length;")
rep("Chakra : il lance tes techniques ninja et le pouvoir de ton héros. Chaque serviteur Ninja en génère 1 au début de ton tour (10 au plus).", "Chakra : il lance les jutsus de tes ninjas (goutte bleue) et paie leur transformation (étoile dorée). Chaque serviteur de ton plateau en génère 1 au début de ton tour (10 au plus, il se garde).")
# règles
i=s.index("function chakraLawH(big) {"); j=s.index("// style de jeu de chaque village", i)
s=s[:i]+"""function chakraLawH(big) {
  const sec = (ic, t, body) => `<div class="njl-s"><b class="njl-h"><span>${ic}</span>${t}</b>${body}</div>`;
  const fam = (tb, ic, x) => sec(ic, esc((TRIBES[tb] || {}).n || ''), `<small>${x}</small>`);
  return `<span class="ban-law ck-law njl${big ? ' big' : ''}">
    ${sec('💧', 'Chakra', `<small>Chaque serviteur de ton plateau (invocations comprises) donne 1 chakra au début du tour. Il se garde, 10 au plus.</small>`)}
    ${sec('🌀', 'Jutsus', `<small>Chaque ninja porte son jutsu : clique sur la goutte bleue au-dessus de lui. Une fois par tour, pour un coût égal à son niveau.</small>`)}
    ${sec('⭐', 'Transformations', `<small>Certains ninjas se transforment une seule fois (étoile dorée, 5 à 10 chakra) : caractéristiques, mot-clé, et un jutsu plus fort.</small>`)}
    ${fam('nk_kon', '🍃', 'Maîtres et élèves : les élèves grandissent quand un autre ninja de Konoha lance un jutsu.')}
    ${fam('nk_aka', '☁️', 'Peu nombreux mais énormes, en binôme : bonus si le partenaire est sur le plateau.')}
    ${fam('nk_sun', '🏜️', 'Vente et revente : or, chakra et bonus à chaque serviteur vendu.')}
    ${fam('nk_oto', '🐍', 'Les expériences d\\'Orochimaru : Engloutir les serviteurs de la taverne.')}
    ${fam('nk_kir', '🌫️', 'Les épéistes de la Brume : Ralliement, Vol de vie et Camouflage.')}
    ${sec('🐸', 'Invocations', `<small>Gamabunta, Manda, Katsuyu… n'apparaissent pas en taverne : seuls les jutsus de leurs invocateurs les appellent.</small>`)}
  </span>`;
}
function njCardH() { return chakraLawH(true); }
"""+s[j:]
rep("const NJ_STYLE = { n_feu:'Explosions',", "const NJ_STYLE = { nk_kon:'Maîtres et élèves', nk_aka:'Binômes', nk_sun:'Vente et revente', nk_oto:'Engloutir', nk_kir:'Épéistes', n_feu:'Explosions',")
rep("const NJ_VIC = { n_feu:'🔥',", "const NJ_VIC = { nk_kon:'🍃', nk_aka:'☁️', nk_sun:'🏜️', nk_oto:'🐍', nk_kir:'🌫️', n_feu:'🔥',")
rep("rules = nin && (d.laws || []).some(l => l.k === 'chakra') && V.hpRules, por = (d.laws || []).some(l => l.k === 'portail') ? rmCardH :", "rules = false, por = (d.laws || []).some(l => l.k === 'chakra') ? njCardH : (d.laws || []).some(l => l.k === 'portail') ? rmCardH :")
rep("${nin && (d.laws || []).some(l => l.k === 'chakra') ? `<button class=\"btn sm hp-rb\" data-act=\"hprules\">", "${false ? `<button class=\"btn sm hp-rb\" data-act=\"hprules\">")
open(p,'w',encoding='utf-8').write(s)
# images
p='/home/claude/parts/heroimg.js'; s=open(p,encoding='utf-8').read()
s+="""
// ===== Naruto (refonte) : les cartes reprennent les portraits fournis ; forme transformée = portrait éveillé. Les autres ont une image d'attente =====
const NK_IMG = { nk_naruto:'nh_naruto', nk_kakashi:'nh_kakashi', nk_jiraiya:'nh_jiraiya', nk_shikamaru:'nh_shikamaru', nk_itachi:'nh_itachi', nk_deidara:'nh_deidara', nk_sasori:'nh_sasori', nk_kakuzu:'nh_kakuzu', nk_gaara:'nh_gaara', nk_kankuro:'nh_kankuro', nk_rasa:'nh_rasa', nk_sasuke:'nh_sasuke', nk_mei:'nh_mei', nk_haku:'nh_haku' };
const NK_WAIT = { nk_konohamaru:'n_f1', nk_sakura:'n_f2', nk_lee:'n_f3', nk_neji:'n_f5', nk_gai:'n_f7', nk_tsunade:'n_f9',
  nk_zetsu:'n_o1', nk_tobi:'n_o2', nk_hidan:'n_o4', nk_kisame:'n_o7', nk_konan:'n_o5', nk_pain:'n_o10',
  nk_matsuri:'n_v1', nk_yashamaru:'n_v2', nk_baki:'n_v3', nk_ebizo:'n_v4', nk_pakura:'n_v6', nk_temari:'n_v7', nk_chiyo:'n_v8',
  nk_zaku:'n_t1', nk_dosu:'n_t2', nk_tayuya:'n_t3', nk_kidomaru:'n_t4', nk_jirobo:'n_t5', nk_sakon:'n_t6', nk_kabuto:'n_t7', nk_kimimaro:'n_t8', nk_orochimaru:'n_t10',
  nk_chojuro:'n_e1', nk_suigetsu:'n_e2', nk_ao:'n_e3', nk_ameyuri:'n_e4', nk_jinpachi:'n_e6', nk_zabuza:'n_e7', nk_mangetsu:'n_e8', nk_yagura:'n_e10',
  tk_crapaud:'tk_toad', tk_gamabunta:'tk_toad', tk_katsuyu:'tk_slug', tk_manda:'tk_snake', tk_karasu:'tk_puppet' };
(function () {
  const img = src => () => `<rect width="100" height="100" fill="#1a120c"/><image href="${src}" x="0" y="0" width="100" height="100" preserveAspectRatio="xMidYMid slice"/>`;
  for (const id in NK_IMG) { const h = NK_IMG[id]; if (ROIMG[h]) ART[id] = img(ROIMG[h]); if (ROIMG[h + '_aw']) ART[id + '_tf1'] = img(ROIMG[h + '_aw']); }
  for (const id in NK_WAIT) { const k = NK_WAIT[id]; if (ROIMG[k]) ART[id] = img(ROIMG[k]); else if (ART[k]) ART[id] = ART[k]; }
  if (ART.tk_clone) ART.tk_kclone = ART.tk_clone;
  if (typeof beast === 'function') { ART.tk_ninken = () => beast({ sp:'dog', col:'#b88a5a', belly:'#f0dcc0', eye:'#2a1a0a' }); ART.tk_kamatari = () => beast({ sp:'cat', col:'#e8e4d8', belly:'#ffffff', eye:'#2a1a0a' }); ART.tk_cerbere = () => beast({ sp:'wolf', col:'#5a4a6a', belly:'#b8a8c8', eye:'#c88aff' }); }
})();
"""
open(p,'w',encoding='utf-8').write(s)
