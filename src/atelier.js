/* =====================================================================
   ATELIER — création et équilibrage (admin = propriétaire ou éditeur)
   ===================================================================== */
const A = { tab:'cards', fTr:'all', fT:'all', q:'', ed:null, edNew:false, set:null, setDirty:false, confirm:null };
const TABS = [['cards', 'Cartes'], ['tribes', 'Tribus'], ['univ', 'Univers'], ['kw', 'Mots-clés'], ['val', 'Valeurs et budgets'], ['rules', 'Règles de partie']];
const newId = p => p + Date.now().toString(36) + Math.floor(Math.random() * 1296).toString(36);
const rseed = () => Math.floor(Math.random() * 1e9) + 1;
const fmtPts = v => (v > 0 ? '+' : '') + r1(v) + ' pt' + (Math.abs(v) >= 2 ? 's' : '');
const withSet = (s, fn) => { const o = SET; SET = s; try { return fn(); } finally { SET = o; } };
const ro = () => !DATA.admin;
const dis = () => ro() ? 'disabled' : '';

function atlOnData() { if (!A.setDirty) A.set = clone(SET); }
function atlSyncDraft() { if (!A.ed) { delete C.__edit; return; } C.__edit = deriveCard({ ...A.ed, id:'__edit' }); setDraftArt(A.ed); }
function canSave() {
  if (!A.ed || ro()) return false;
  if (!String(A.ed.n || '').trim()) return false;
  const st = budgetState(A.ed);
  return !(st.st === 'over' && SET.val.mode === 'block');
}

/* ---------- vue d'ensemble ---------- */
function atelierH() {
  if (!A.set) A.set = clone(SET);
  atlSyncDraft();
  let note = '';
  if (!DATA.db) note = window.STANDALONE ? 'Lecture seule. Cette version autonome utilise les cartes intégrées au fichier ; les modifications se font dans l\'atelier de la version claude.ai.' : 'Lecture seule. La sauvegarde partagée s\'active quand la page est ouverte sur claude.ai avec un compte connecté.';
  else if (!DATA.admin) note = 'Lecture seule. Seuls le propriétaire et les éditeurs du jeu peuvent créer ou modifier des cartes.';
  else if (DATA.ready && !DATA.seeded) note = 'Tu vois le contenu d\'origine. Chaque carte ou réglage que tu enregistres s\'applique ensuite à toutes les nouvelles parties.';
  const body = { cards:cardsTabH, tribes:tribesTabH, univ:univTabH, kw:kwTabH, val:valTabH, rules:rulesTabH }[A.tab]();
  const settingsTab = A.tab !== 'cards';
  return `<div class="atl">
    <header class="atl-top"><button class="btn sm" data-act="atl-back">${icon('back')}Menu</button>
      <h1>L'atelier</h1>${DATA.admin ? '<span class="badge-admin">Admin</span>' : '<span class="badge-ro">Lecture seule</span>'}</header>
    ${note ? `<p class="atl-note">${note}</p>` : ''}${DATA.busy ? `<p class="atl-busy">${esc(DATA.busy)}</p>` : ''}
    <nav class="atl-tabs" role="tablist">${TABS.map(([k, l]) => `<button role="tab" aria-selected="${A.tab === k}" class="${A.tab === k ? 'on' : ''}" data-act="atl-tab" data-t="${k}">${l}</button>`).join('')}</nav>
    <div class="atl-body">${body}</div>
    ${settingsTab && A.setDirty ? `<div class="savebar"><span>${A.confirm === 'leave' ? 'Réglages non enregistrés. Clique encore sur Menu pour les abandonner.' : 'Réglages modifiés'}</span><div class="btns"><button class="btn" data-act="atl-discard">Annuler les changements</button><button class="btn pri" data-act="atl-save" ${DATA.busy ? 'disabled' : ''}>Enregistrer les réglages</button></div></div>` : ''}
  </div>${A.ed ? editorH() : ''}`;
}

/* ---------- onglet Cartes ---------- */
function cardsTabH() {
  const q = A.q.trim().toLowerCase();
  const ids = Object.keys(CARDS).filter(id => {
    const c = C[id] || CARDS[id];
    if (A.fTr === 'tok') { if (c.t) return false; } else if (A.fTr !== 'all' && c.tr !== A.fTr) return false;
    if (A.fT !== 'all' && String(c.t) !== A.fT) return false;
    return !q || c.n.toLowerCase().includes(q);
  });
  const allOver = Object.keys(CARDS).filter(id => ['over', 'under'].includes(budgetState(CARDS[id]).st)).length;
  const chipsTr = [['all', 'Toutes'], ...SET.tribes.map(t => [t.id, t.n]), ['neu', SET.neutral.n || 'Neutre'], ['tok', 'Jetons']];
  const groups = [1, 2, 3, 4, 5, 6, 0].map(t => {
    const list = ids.filter(id => (CARDS[id].t || 0) === t).sort((a, b) => (CARDS[a].tr > CARDS[b].tr ? 1 : -1) || CARDS[a].n.localeCompare(CARDS[b].n));
    if (!list.length) return '';
    const b = SET.budget[t];
    return `<section class="tier-g"><h3>${t ? `Niveau ${t}` : 'Jetons'}<small>${t ? `budget ${b[0]} à ${b[1]} pts · ` : 'invoqués par d\'autres cartes · '}${list.length} carte${list.length > 1 ? 's' : ''}</small></h3>
      <div class="atl-grid">${list.map((id, k) => { const st = budgetState(CARDS[id]); return `<div class="atl-item">${cardH(demo(id), 'atl', k)}<div class="vrow"><span class="vchip ${st.st}">${st.st === 'tok' ? r1(cardValue(CARDS[id]).total) + ' pts' : st.v + ' pts'}</span>${CARDS[id].off ? '<span class="tag">Hors réserve</span>' : ''}${CARDS[id].comp ? `<span class="tag">Compagnon de ${esc((HEROES[CARDS[id].comp] || {}).n || '?')}</span>` : ''}${TRIBES[CARDS[id].tr] && TRIBES[CARDS[id].tr].on === false ? '<span class="tag">Tribu désactivée</span>' : ''}</div></div>`; }).join('')}</div></section>`;
  }).join('');
  return `<div class="atl-tools">
      <input id="atl-q" class="field" type="search" placeholder="Rechercher une carte" value="${esc(A.q)}" aria-label="Rechercher une carte">
      ${DATA.admin ? `<button class="btn pri" data-act="atl-new">${icon('plus')}Nouvelle carte</button>` : ''}
    </div>
    <div class="chips" role="group" aria-label="Filtrer par tribu">${chipsTr.map(([v, l]) => `<button class="chip${A.fTr === v ? ' on' : ''}" data-act="atl-ftr" data-v="${v}">${esc(l)}</button>`).join('')}</div>
    <div class="chips" role="group" aria-label="Filtrer par niveau">${[['all', 'Tous niveaux'], ['1', 'Niv. 1'], ['2', 'Niv. 2'], ['3', 'Niv. 3'], ['4', 'Niv. 4'], ['5', 'Niv. 5'], ['6', 'Niv. 6']].map(([v, l]) => `<button class="chip${A.fT === v ? ' on' : ''}" data-act="atl-ft" data-v="${v}">${l}</button>`).join('')}</div>
    <p class="atl-sum">${Object.keys(CARDS).length} cartes${allOver ? ` · <b class="warn">${allOver} hors budget</b>` : ' · toutes dans le budget'}${DATA.admin ? ' · touche une carte pour la modifier' : ''}</p>
    ${groups || '<p class="hint">Aucune carte ne correspond.</p>'}`;
}

/* ---------- éditeur de carte ---------- */
const tribeOptions = (sel, any) => (any ? `<option value="" ${!sel ? 'selected' : ''}>Toutes les tribus</option>` : '')
  + SET.tribes.map(t => `<option value="${t.id}" ${t.id === sel ? 'selected' : ''}>${esc(t.n)}</option>`).join('')
  + (any ? '' : `<option value="neu" ${sel === 'neu' ? 'selected' : ''}>${esc(SET.neutral.n || 'Neutre')}</option>`);
const fxOptions = sel => Object.keys(TRIG).map(tr => `<optgroup label="${esc(TRIG[tr])}">${Object.keys(ET).filter(k => ET[k].tr === tr).map(k => `<option value="${k}" ${k === sel ? 'selected' : ''}>${esc(TRIG[tr])} · ${esc(ET[k].l)}</option>`).join('')}</optgroup>`).join('');
function cardOptions(sel) {
  const ids = Object.keys(CARDS).sort((a, b) => (CARDS[a].t - CARDS[b].t) || CARDS[a].n.localeCompare(CARDS[b].n));
  return ids.map(id => `<option value="${id}" ${id === sel ? 'selected' : ''}>${CARDS[id].t ? 'Niv. ' + CARDS[id].t : 'Jeton'} · ${esc(CARDS[id].n)}</option>`).join('')
    + (sel && !CARDS[sel] ? `<option value="${esc(sel)}" selected>Serviteur supprimé</option>` : '');
}
const kwBaseOptions = sel => BASE_KW.map(k => `<option value="${k}" ${k === sel ? 'selected' : ''}>${esc(SET.kw[k].n)}</option>`).join('');
function paramH(e, p, idp, attr, set) {
  const P = PARAMS[p], v = e[p], d = dis();
  let ctl;
  if (P.sel === 'tribe') ctl = `<select id="${idp}-${p}" ${attr} data-p="${p}" ${d}>${tribeOptions(v, true)}</select>`;
  else if (P.sel === 'card') ctl = `<select id="${idp}-${p}" ${attr} data-p="${p}" ${d}>${cardOptions(v)}</select>`;
  else if (P.sel === 'kw') ctl = `<select id="${idp}-${p}" ${attr} data-p="${p}" ${d}>${kwBaseOptions(v)}</select>`;
  else ctl = `<input type="number" inputmode="numeric" id="${idp}-${p}" ${attr} data-p="${p}" data-num min="${P.min}" max="${P.max}" value="${v}" ${d}>`;
  return `<label class="pf${P.sel ? ' wide' : ''}"><span>${P.l}</span>${ctl}</label>`;
}
function valueH(raw) {
  const st = budgetState(raw), cv = cardValue(raw);
  const rows = cv.br.map(x => `<li><span>${esc(x.l)}</span><b>${fmtPts(x.v)}</b></li>`).join('');
  if (st.st === 'tok') return `<div class="gauge-h"><b class="vbig">${cv.total}<small> pts</small></b><span class="vst tok">Jeton</span></div><p class="vnote">Un jeton n'a pas de budget. Sa valeur compte dans le coût des cartes qui l'invoquent.</p><ul class="vbr">${rows}</ul>`;
  const [b0, b1] = st.b, max = Math.max(b1 * 1.35, st.v * 1.08, 1), pc = x => Math.min(100, x / max * 100).toFixed(1);
  const label = { ok:'Dans le budget', over:'Au-dessus du budget', under:'Sous le budget' }[st.st];
  const hint = st.st === 'over' ? (SET.val.mode === 'block' ? `Trop puissante pour le niveau ${raw.t} : baisse ses stats ou ses effets, ou monte-la de niveau, pour pouvoir l'enregistrer.` : `Plus puissante que prévu pour le niveau ${raw.t}.`)
    : st.st === 'under' ? `Un peu faible pour le niveau ${raw.t} : elle sera rarement achetée.` : `Bien placée pour le niveau ${raw.t}.`;
  return `<div class="gauge-h"><b class="vbig">${st.v}<small> pts</small></b><span class="vst ${st.st}">${label}</span></div>
    <div class="gauge" role="img" aria-label="Valeur ${st.v} pour un budget de ${b0} à ${b1}"><span class="zone" style="left:${pc(b0)}%;width:${(pc(b1) - pc(b0)).toFixed(1)}%"></span><span class="mark ${st.st}" style="left:${pc(st.v)}%"></span></div>
    <div class="gauge-s"><span>0</span><span>Budget niveau ${raw.t} : ${b0} à ${b1} pts</span></div>
    <p class="vnote">${hint}</p><ul class="vbr">${rows}</ul>`;
}
function editorH() {
  const e = A.ed, d = dis(), isBase = e.art && e.art.f === 'base';
  const usedBy = A.edNew ? [] : Object.keys(CARDS).filter(id => id !== e.id && (CARDS[id].fx || []).some(x => x.card === e.id));
  const kwChips = Object.keys(SET.kw).map(k => { const on = (e.kw || []).includes(k); return `<button class="kwc${on ? ' on' : ''}" data-act="ed-kw" data-k="${k}" aria-pressed="${on}" ${d} title="${esc(SET.kw[k].d || '')}">${esc(SET.kw[k].n)}<small>${fmtPts(+SET.kw[k].c || 0)}</small></button>`; }).join('');
  const fxRows = (e.fx || []).map((x, i) => `<div class="fxrow"><div class="fxh"><select id="ed-fx-${i}" data-fx="${i}" data-p="k" ${d} aria-label="Type d'effet">${fxOptions(x.k)}</select>
      <span class="fxc" id="ed-fxc-${i}">${fmtPts(fxCost(x))}</span>${ro() ? '' : `<button class="btn sm ghost" data-act="ed-fxdel" data-i="${i}" aria-label="Retirer cet effet">Retirer</button>`}</div>
      <div class="pgrid">${ET[x.k].ps.map(p => paramH(x, p, 'ed-fx-' + i, `data-fx="${i}"`)).join('')}</div></div>`).join('');
  const baseOpts = Object.keys(ART).map(id => `<option value="${id}" ${isBase && e.art.id === id ? 'selected' : ''}>${esc((DEFAULT_CARDS[id] || {}).n || id)}</option>`).join('');
  const st = budgetState(e);
  return `<div class="ov ed-ov" id="ed-ov" data-ks><div class="ed" role="dialog" aria-modal="true" aria-label="Éditeur de carte">
    <aside class="ed-prev"><div id="ed-card">${cardH(demo('__edit'), 'p', 0)}</div><div class="ed-val" id="ed-val">${valueH(e)}</div></aside>
    <div class="ed-form">
      <h2>${ro() ? esc(e.n) : A.edNew ? 'Nouvelle carte' : 'Modifier la carte'}</h2>
      <div class="fgrid">
        <label class="f2"><span>Nom</span><input id="ed-n" data-ed="n" maxlength="28" value="${esc(e.n)}" placeholder="Nom du serviteur" ${d}></label>
        <label><span>Tribu</span><select id="ed-tr" data-ed="tr" ${d}>${tribeOptions(e.tr)}</select></label>
        <label><span>Niveau</span><select id="ed-t" data-ed="t" data-num ${d}>${[1, 2, 3, 4, 5, 6].map(t => `<option value="${t}" ${e.t === t ? 'selected' : ''}>Niveau ${t}</option>`).join('')}<option value="0" ${!e.t ? 'selected' : ''}>Jeton (invoqué seulement)</option></select></label>
        <label><span>Attaque</span><input type="number" inputmode="numeric" id="ed-a" data-ed="a" data-num min="0" max="30" value="${e.a}" ${d}></label>
        <label><span>Vie</span><input type="number" inputmode="numeric" id="ed-h" data-ed="h" data-num min="1" max="30" value="${e.h}" ${d}></label>
      </div>
      <fieldset><legend>Mots-clés</legend><div class="kwchips">${kwChips}</div></fieldset>
      <fieldset><legend>Effets</legend>${fxRows || '<p class="mini">Aucun effet. Ajoute-en un depuis la liste.</p>'}
        ${ro() ? '' : `<select id="ed-fxadd" class="addfx" aria-label="Ajouter un effet"><option value="">Ajouter un effet…</option>${fxOptions('')}</select>`}</fieldset>
      <fieldset><legend>Portrait</legend><div class="artrow">
        <label><span>Style</span><select id="ed-artf" ${d}>${Object.keys(FAMILIES).map(f => `<option value="${f}" ${(e.art || {}).f === f ? 'selected' : ''}>${FAMILIES[f]}</option>`).join('')}</select></label>
        ${isBase ? `<label class="f2"><span>Portrait</span><select id="ed-artid" ${d}>${baseOpts}</select></label>` : (ro() ? '' : `<button class="btn" data-act="ed-reroll">${icon('dice')}Nouveau tirage</button>`)}</div></fieldset>
      ${e.t ? `<label class="check"><input type="checkbox" id="ed-off" data-ed="off" ${e.off ? 'checked' : ''} ${d}><span>Retirer de la réserve (la carte reste dans l'atelier mais n'apparaît plus en taverne)</span></label>` : ''}
      ${usedBy.length ? `<p class="mini">Invoquée par : ${usedBy.map(id => esc(CARDS[id].n)).join(', ')}.</p>` : ''}
      <div class="ed-foot">
        ${ro() ? '' : (A.edNew ? '' : `<button class="btn danger" data-act="ed-del" ${usedBy.length ? 'disabled title="Cette carte est invoquée par d\'autres cartes"' : ''}>${A.confirm === 'del' ? 'Confirmer la suppression' : 'Supprimer'}</button><button class="btn" data-act="ed-dup">Dupliquer</button>`)}
        <span class="sp"></span>
        <button class="btn" data-act="ed-cancel">${ro() ? 'Fermer' : 'Annuler'}</button>
        ${ro() ? '' : `<button class="btn pri" id="ed-save" data-act="ed-save" ${canSave() && !DATA.busy ? '' : 'disabled'}>Enregistrer la carte</button>`}
      </div>
      ${!ro() && st.st === 'over' && SET.val.mode === 'block' ? '<p class="mini warn">L\'enregistrement est bloqué tant que la carte dépasse le budget de son niveau.</p>' : ''}
    </div></div></div>`;
}
function atlPreview() {
  atlSyncDraft();
  const c = $('#ed-card'); if (c) c.innerHTML = cardH(demo('__edit'), 'p', 0);
  const v = $('#ed-val'); if (v) v.innerHTML = valueH(A.ed);
  (A.ed.fx || []).forEach((e, i) => { const s = $('#ed-fxc-' + i); if (s) s.textContent = fmtPts(fxCost(e)); });
  const sv = $('#ed-save'); if (sv) sv.disabled = !canSave() || !!DATA.busy;
}
function atlOpen(id) {
  if (!CARDS[id]) return;
  A.ed = clone(CARDS[id]); A.ed.kw = A.ed.kw || []; A.ed.fx = A.ed.fx || []; A.ed.art = A.ed.art || { f:'human', s:rseed() };
  A.edNew = false; A.confirm = null; render();
}

/* ---------- onglet Tribus ---------- */
function tribesTabH() {
  const S = A.set, d = dis();
  const deck = id => {
    const list = Object.keys(CARDS).filter(k => CARDS[k].tr === id);
    const per = [1, 2, 3, 4, 5, 6].map(t => list.filter(k => CARDS[k].t === t).length), max = Math.max(1, ...per);
    const vals = list.filter(k => CARDS[k].t).map(k => budgetState(CARDS[k]));
    const out = vals.filter(v => v.st === 'over' || v.st === 'under').length;
    return { n:list.filter(k => CARDS[k].t).length, tok:list.filter(k => !CARDS[k].t).length, out, html:`<div class="deck" aria-label="Cartes par niveau">${per.map((c, i) => `<div class="dcol"><span class="dbar" style="height:${(c / max * 100).toFixed(0)}%"></span><b>${c}</b><small>N${i + 1}</small></div>`).join('')}</div>` };
  };
  const card = (t, i, neutral) => {
    const dk = deck(neutral ? 'neu' : t.id), path = neutral ? 'neutral' : `tribes.${i}`;
    const saved = neutral || SET.tribes.some(x => x.id === t.id);
    return `<article class="tcard">
      <div class="tsw" style="--c:${esc(t.col)}"><span>${esc(PATTERNS[t.bg] || '')}</span></div>
      <div class="tf">
        <label class="f2"><span>Nom</span><input id="s-${path}-n" data-s="${path}.n" maxlength="20" value="${esc(t.n)}" ${d}></label>
        <label><span>Couleur</span><input type="color" id="s-${path}-col" data-s="${path}.col" value="${esc(t.col)}" ${d}></label>
        <label><span>Décor</span><select id="s-${path}-bg" data-s="${path}.bg" ${d}>${Object.keys(PATTERNS).map(k => `<option value="${k}" ${t.bg === k ? 'selected' : ''}>${PATTERNS[k]}</option>`).join('')}</select></label>
        ${neutral ? '<p class="mini">Les neutres sont toujours en jeu.</p>' : `<label class="check"><input type="checkbox" id="s-${path}-on" data-s="${path}.on" data-bool ${t.on !== false ? 'checked' : ''} ${d}><span>En jeu</span></label>`}
      </div>
      <div class="tdeck">${dk.html}<p class="mini">${dk.n} carte${dk.n > 1 ? 's' : ''}${dk.tok ? ` + ${dk.tok} jeton${dk.tok > 1 ? 's' : ''}` : ''}${dk.out ? ` · <b class="warn">${dk.out} hors budget</b>` : ''}</p>
        <div class="btns l">${saved ? `<button class="btn sm" data-act="atl-tview" data-id="${neutral ? 'neu' : t.id}">Voir les cartes</button>` : '<span class="mini">Enregistre pour y ranger des cartes.</span>'}
        ${neutral || ro() ? '' : `<button class="btn sm danger" data-act="atl-tdel" data-i="${i}" ${dk.n + dk.tok ? 'disabled title="Supprime ou déplace d\'abord ses cartes"' : ''}>Supprimer</button>`}</div></div>
    </article>`;
  };
  return `<p class="atl-intro">Une tribu est un deck complet, comme les Bêtes ou les Mécas : ses cartes partagent une couleur, un décor et des synergies. Désactive une tribu pour la retirer des parties sans perdre ses cartes.</p>
    <div class="tlist">${S.tribes.map((t, i) => card(t, i)).join('')}${card(S.neutral, 0, true)}</div>
    ${DATA.admin ? `<button class="btn pri" data-act="atl-tnew">${icon('plus')}Nouvelle tribu</button>` : ''}`;
}

/* ---------- onglet Univers ---------- */
const UNIV_ICONS = [['moon', 'Lune'], ['crown', 'Couronne'], ['gear', 'Engrenage'], ['leaf', 'Feuille'], ['wave', 'Vague'], ['star', 'Étoile'], ['mount', 'Montagne'], ['blob', 'Goutte'], ['skull', 'Crâne'], ['bolt', 'Éclair'], ['drop', 'Larme'], ['wind', 'Vent'], ['twin', 'Anneaux'], ['sword', 'Épée'], ['book', 'Livre'], ['dice', 'Dé']];
function univTabH() {
  const S = A.set, d = dis(); S.univ = S.univ || []; S.heroFam = S.heroFam || {};
  const fam = h => (Array.isArray(S.heroFam[h]) && S.heroFam[h].length ? S.heroFam[h] : (HEROES[h].fam || []));
  const card = (u, i) => {
    const M = MECHS[u.mech] || MECHS.none;
    const pool = Object.keys(HEROES).filter(h => fam(h).some(t => u.tribes.includes(t)));
    return `<article class="ucard">
      <div class="uf"><label class="f2"><span>Nom</span><input id="s-univ-${i}-n" data-s="univ.${i}.n" maxlength="28" value="${esc(u.n)}" ${d}></label>
        <label class="f2"><span>Loi de l'univers</span><select id="s-univ-${i}-mech" data-s="univ.${i}.mech" ${d}>${Object.keys(MECHS).map(k => `<option value="${k}" ${(u.mech || 'none') === k ? 'selected' : ''}>${esc(MECHS[k].n)}</option>`).join('')}</select></label></div>
      <p class="umd">${icon(M.ic)}<span>${esc(M.d)}</span></p>
      <div class="uf"><label><span>Couleur</span><input type="color" id="s-univ-${i}-col" data-s="univ.${i}.col" value="${esc(univLook(u).col)}" ${d}></label>
        <label><span>Emblème</span><select id="s-univ-${i}-ic" data-s="univ.${i}.ic" ${d}>${UNIV_ICONS.map(([k, l]) => `<option value="${k}" ${univLook(u).ic === k ? 'selected' : ''}>${l}</option>`).join('')}</select></label>
        <label class="f2" style="grid-column:1 / -1"><span>Phrase d'ambiance</span><input id="s-univ-${i}-lore" data-s="univ.${i}.lore" maxlength="60" value="${esc(univLook(u).lore)}" ${d}></label></div>
      <div class="ufam"><span class="lbl">Familles</span><div class="ftogs">${S.tribes.map(t => `<button class="ftog${u.tribes.includes(t.id) ? ' on' : ''}" style="--c:${esc(t.col)}" data-act="atl-ufam" data-i="${i}" data-t="${esc(t.id)}" aria-pressed="${u.tribes.includes(t.id)}" ${d}>${esc(t.n)}</button>`).join('')}</div></div>
      <div class="upool"><span class="lbl">Vivier de héros · ${pool.length}</span><div class="uheroes">${pool.map(h => `<span class="uh">${faceH('art-h-' + h)}<small>${esc(HEROES[h].n.split(' ')[0])}</small></span>`).join('') || '<span class="mini">Aucun héros rattaché à ces familles pour l\'instant.</span>'}</div></div>
      ${ro() ? '' : `<div class="btns l"><button class="btn sm danger" data-act="atl-udel" data-i="${i}">Supprimer l'univers</button></div>`}
    </article>`;
  };
  const heroRow = h => `<div class="hrow">${faceH('art-h-' + h)}<b>${esc(HEROES[h].n)}</b><div class="ftogs">${S.tribes.map(t => `<button class="ftog sm${fam(h).includes(t.id) ? ' on' : ''}" style="--c:${esc(t.col)}" data-act="atl-hfam" data-h="${h}" data-t="${esc(t.id)}" aria-pressed="${fam(h).includes(t.id)}" ${d}>${esc(t.n)}</button>`).join('')}</div></div>`;
  return `<p class="atl-intro">Un univers regroupe exactement 5 familles ; une partie se joue dans un seul univers. Il regroupe ces familles, une loi qui lui est propre et un vivier de héros. Une famille peut appartenir à plusieurs univers : elle profite alors de chaque loi. Un héros est proposé en début de partie dès qu'une de ses familles est en jeu.</p>
    <div class="ulist">${S.univ.map(card).join('')}</div>
    ${DATA.admin ? `<button class="btn pri" data-act="atl-unew">${icon('plus')}Nouvel univers</button>` : ''}
    <section class="vsec"><h3 class="atl-h">Héros et familles</h3><p class="mini">Rattache chaque héros à une ou plusieurs familles. Il rejoint alors le vivier des univers qui contiennent ces familles.</p><div class="hlist">${Object.keys(HEROES).map(heroRow).join('')}</div></section>`;
}

/* ---------- onglet Mots-clés ---------- */
function kwTabH() {
  const S = A.set, d = dis();
  const used = k => Object.keys(CARDS).filter(id => (CARDS[id].kw || []).includes(k)).length;
  const row = k => {
    const K = S.kw[k], base = BASE_KW.includes(k), u = used(k);
    const fx = !base && K.fx ? `<div class="kfx"><label class="f2"><span>Effet du mot-clé</span><select id="s-kw-${k}-fx" data-s="kw.${k}.fx.k" ${d}>${fxOptions(K.fx.k)}</select></label>
      <div class="pgrid">${ET[K.fx.k].ps.map(p => paramH(K.fx, p, 's-kw-' + k + '-fx', `data-s="kw.${k}.fx.${p}"`)).join('')}</div>
      <p class="mini">« ${esc(withSet(S, () => fxText(K.fx)))} » · valeur calculée de l'effet : ${r1(withSet(S, () => fxCost(K.fx)))} pts</p></div>` : '';
    return `<article class="krow${base ? '' : ' custom'}">
      <div class="kf"><label><span>Nom</span><input id="s-kw-${k}-n" data-s="kw.${k}.n" maxlength="22" value="${esc(K.n)}" ${d}></label>
      <label class="f2"><span>Description</span><input id="s-kw-${k}-d" data-s="kw.${k}.d" maxlength="120" value="${esc(K.d || '')}" ${d}></label>
      <label><span>Coût</span><input type="number" step="0.5" id="s-kw-${k}-c" data-s="kw.${k}.c" data-num min="0" max="30" value="${K.c}" ${d}></label></div>
      ${fx}
      <div class="kfoot"><span class="mini">${base ? 'Mécanique de base · ' : 'Mot-clé créé · '}utilisé par ${u} carte${u > 1 ? 's' : ''}</span>
      ${base || ro() ? '' : `<button class="btn sm danger" data-act="atl-kwdel" data-k="${k}" ${u ? 'disabled title="Retire-le d\'abord des cartes qui l\'utilisent"' : ''}>Supprimer</button>`}</div></article>`;
  };
  const custom = Object.keys(S.kw).filter(k => !BASE_KW.includes(k));
  return `<p class="atl-intro">Le coût d'un mot-clé s'ajoute à la valeur de chaque carte qui le porte. Les mots-clés créés regroupent un effet de la liste sous un nom court : la carte affiche le nom, et l'effet s'applique en jeu.</p>
    <h3 class="atl-h">Mécaniques de base</h3><div class="klist">${BASE_KW.map(row).join('')}</div>
    <h3 class="atl-h">Mots-clés créés</h3><div class="klist">${custom.map(row).join('') || '<p class="mini">Aucun pour l\'instant.</p>'}</div>
    ${DATA.admin ? `<button class="btn pri" data-act="atl-kwnew">${icon('plus')}Nouveau mot-clé</button>` : ''}`;
}

/* ---------- onglet Valeurs et budgets ---------- */
function valTabH() {
  const S = A.set, d = dis();
  const num = (path, v, step = 0.1, min = 0, max = 99, ph = '') => `<input type="number" step="${step}" id="s-${path.replace(/\./g, '-')}" data-s="${path}" data-num min="${min}" max="${max}" value="${v == null ? '' : v}" placeholder="${ph}" ${d}>`;
  const states = withSet(S, () => Object.keys(CARDS).filter(id => CARDS[id].t).map(id => ({ id, ...budgetState(CARDS[id]) })));
  const budRows = [1, 2, 3, 4, 5, 6].map(t => {
    const s = states.filter(x => CARDS[x.id].t === t), o = s.filter(x => x.st === 'over').length, u = s.filter(x => x.st === 'under').length;
    const vs = s.map(x => x.v), lo = vs.length ? Math.min(...vs) : '–', hi = vs.length ? Math.max(...vs) : '–';
    return `<tr><th>Niveau ${t}</th><td>${num(`budget.${t}.0`, S.budget[t][0], 0.5)}</td><td>${num(`budget.${t}.1`, S.budget[t][1], 0.5)}</td><td class="mini">${s.length} cartes · de ${lo} à ${hi}</td><td>${o ? `<b class="warn">${o} au-dessus</b> ` : ''}${u ? `<b class="low">${u} en dessous</b>` : ''}${!o && !u ? '<span class="okc">Tout est bon</span>' : ''}</td></tr>`;
  }).join('');
  const fxRows = Object.keys(TRIG).map(tr => `<tr class="grp"><th colspan="4">${esc(TRIG[tr])}</th></tr>` + Object.keys(ET).filter(k => ET[k].tr === tr).map(k => {
    const o = S.fxw[k] || {};
    return `<tr><td>${esc(ET[k].l)}</td><td>${num(`fxw.${k}.b`, o.b, 0.5, -20, 50, '0')}</td><td>${num(`fxw.${k}.w`, o.w, 0.1, 0, 10, String(ET[k].w))}</td><td class="mini">${magHelp(k)}</td></tr>`;
  }).join('')).join('');
  const bad = states.filter(x => x.st === 'over' || x.st === 'under').sort((a, b) => CARDS[a.id].t - CARDS[b.id].t);
  return `<p class="atl-intro">La valeur d'une carte = attaque × ${S.val.atk} + vie × ${S.val.hp} + le coût de ses mots-clés + le coût de ses effets. Chaque niveau de taverne a un budget : une carte doit tomber dans sa fourchette.</p>
    <section class="vsec"><h3 class="atl-h">Barème</h3><div class="fgrid narrow">
      <label><span>Points par attaque</span>${num('val.atk', S.val.atk)}</label>
      <label><span>Points par vie</span>${num('val.hp', S.val.hp)}</label>
      <label><span>Alliés estimés</span>${num('val.allies', S.val.allies, 0.5, 1, 7)}</label>
      <label class="f2"><span>Cartes hors budget</span><select id="s-val-mode" data-s="val.mode" ${d}><option value="block" ${S.val.mode === 'block' ? 'selected' : ''}>Bloquer l'enregistrement</option><option value="warn" ${S.val.mode !== 'block' ? 'selected' : ''}>Avertir seulement</option></select></label></div>
      <p class="mini">« Alliés estimés » sert aux effets qui touchent plusieurs serviteurs : un bonus +1/+1 à tous vos serviteurs vaut 2 × ${S.val.allies} = ${2 * S.val.allies} fois le poids de l'effet.</p></section>
    <section class="vsec"><h3 class="atl-h">Budget par niveau</h3><div class="tscroll"><table class="tbl"><thead><tr><th></th><th>Minimum</th><th>Maximum</th><th>Cartes</th><th>État</th></tr></thead><tbody>${budRows}</tbody></table></div></section>
    ${bad.length ? `<section class="vsec"><h3 class="atl-h">À rééquilibrer</h3><div class="badlist">${bad.map(x => `<button class="bad ${x.st}" data-act="atl-openc" data-id="${x.id}"><b>${esc(CARDS[x.id].n)}</b><span>Niv. ${CARDS[x.id].t} · ${x.v} pts pour ${x.b[0]} à ${x.b[1]}</span></button>`).join('')}</div></section>` : ''}
    <section class="vsec"><h3 class="atl-h">Coût des effets</h3><p class="mini">Coût d'un effet = fixe + poids × ampleur. Laisse vide pour garder la valeur par défaut (en gris).</p>
      <div class="tscroll"><table class="tbl"><thead><tr><th>Effet</th><th>Fixe</th><th>Poids</th><th>Ampleur</th></tr></thead><tbody>${fxRows}</tbody></table></div></section>`;
}
function magHelp(k) {
  const ps = ET[k].ps;
  if (k.startsWith('aura_')) return 'valeur fixe (le poids)';
  if (k.includes('summon_rand')) return 'nombre × valeur moyenne du niveau';
  if (k.includes('summon')) return 'nombre × valeur du serviteur invoqué';
  if (ps.includes('kw')) return 'coût du mot-clé × alliés estimés';
  if (ps.includes('d')) return 'dégâts × nombre';
  if (k === 'bc_card') return 'nombre × 3';
  if (k === 'bc_gold' || k === 'sell_gold') return 'or gagné';
  if (ET[k].mag({ a:1, h:1, n:1 }) > 2) return '(attaque + vie) × alliés estimés';
  if (ps.includes('n')) return '(attaque + vie) × nombre';
  return 'attaque + vie';
}

/* ---------- onglet Règles ---------- */
function rulesTabH() {
  const S = A.set, R = S.rules, d = dis();
  const num = (path, v, min, max) => `<input type="number" step="1" id="s-${path.replace(/\./g, '-')}" data-s="${path}" data-num min="${min}" max="${max}" value="${v}" ${d}>`;
  const on = S.tribes.filter(t => t.on !== false).length;
  return `<p class="atl-intro">Ces règles s'appliquent aux nouvelles parties, en solo comme en ligne.</p>
    <section class="vsec"><h3 class="atl-h">Partie</h3><div class="fgrid narrow">
      <label><span>PV de départ</span>${num('rules.hp', R.hp, 5, 99)}</label>
      <label><span>Tribus par partie</span>${num('rules.tribesPerGame', R.tribesPerGame, 0, 20)}</label>
      <label><span>Recrutement (s)</span>${num('rules.time', R.time, 10, 180)}</label>
      <label><span>+ par manche (s)</span>${num('rules.perRound', R.perRound, 0, 30)}</label>
      <label><span>Maximum (s)</span>${num('rules.maxTime', R.maxTime, 10, 300)}</label></div>
      <p class="mini">Tribus par partie : 0 = toutes les tribus en jeu (${on} actuellement). Avec un nombre plus petit, chaque partie tire ses tribus au hasard, ce qui varie les parties.</p></section>
    <section class="vsec"><h3 class="atl-h">Réserve partagée</h3><p class="mini">Nombre d'exemplaires de chaque serviteur dans la réserve commune aux 8 joueurs.</p>
      <div class="fgrid six">${[1, 2, 3, 4, 5, 6].map(t => `<label><span>Niveau ${t}</span>${num('rules.pool.' + t, R.pool[t], 0, 40)}</label>`).join('')}</div></section>
    <section class="vsec"><h3 class="atl-h">Coût d'amélioration de la taverne</h3><p class="mini">Coût de départ ; il baisse de 1 or à chaque manche.</p>
      <div class="fgrid six">${[1, 2, 3, 4, 5].map(t => `<label><span>Niveau ${t} → ${t + 1}</span>${num('rules.up.' + t, R.up[t], 0, 20)}</label>`).join('')}</div></section>
    ${DATA.admin && DATA.seeded ? `<section class="vsec danger-z"><h3 class="atl-h">Contenu d'origine</h3><p class="mini">Remet toutes les cartes, tribus, mots-clés et réglages d'origine. Les cartes que tu as créées sont supprimées.</p>
      <button class="btn danger" data-act="atl-reset">${A.confirm === 'reset' ? 'Confirmer : tout remettre à zéro' : 'Revenir au contenu d\'origine'}</button></section>` : ''}`;
}

/* ---------- interactions ---------- */
function setPath(obj, path, val) {
  const ks = path.split('.'); let o = obj;
  for (let i = 0; i < ks.length - 1; i++) { if (o[ks[i]] == null || typeof o[ks[i]] !== 'object') o[ks[i]] = {}; o = o[ks[i]]; }
  const last = ks[ks.length - 1];
  if (last === 'k' && ks[ks.length - 2] === 'fx') { const parent = ks.slice(0, -1).reduce((x, k) => x[k], obj); Object.keys(parent).forEach(k => delete parent[k]); Object.assign(parent, newEffect(val)); return; }
  if (val === null) delete o[last]; else o[last] = val;
}
function readVal(el) {
  if (el.hasAttribute('data-bool')) return el.checked;
  if (el.type === 'checkbox') return el.checked;
  if (el.hasAttribute('data-num')) {
    if (el.value === '') return (el.dataset.s || '').startsWith('fxw.') ? null : undefined;
    let v = +el.value; if (!isFinite(v)) return undefined;
    const mn = el.getAttribute('min') != null ? +el.getAttribute('min') : -Infinity, mx = el.getAttribute('max') != null ? +el.getAttribute('max') : Infinity;
    return Math.max(mn, Math.min(mx, v));
  }
  return el.value;
}
function atlField(el, live) {
  if (el.id === 'atl-q') { A.q = el.value; if (!live) return; render(); return; }
  if (A.ed && (el.dataset.ed || el.dataset.fx != null || el.id.startsWith('ed-art'))) {
    if (ro()) return;
    let v = readVal(el); if (v === undefined) return;
    if (el.dataset.ed) { if (['a', 'h'].includes(el.dataset.ed) && v !== undefined) v = Math.round(v); A.ed[el.dataset.ed] = v; if (el.dataset.ed === 'off' && !v) delete A.ed.off; }
    else if (el.dataset.fx != null) { const i = +el.dataset.fx, p = el.dataset.p; if (p === 'k') A.ed.fx[i] = newEffect(v); else A.ed.fx[i][p] = PARAMS[p] && !PARAMS[p].sel ? Math.round(v) : v; }
    else if (el.id === 'ed-artf') A.ed.art = v === 'base' ? { f:'base', id:Object.keys(ART)[0] } : { f:v, s:(A.ed.art && A.ed.art.s) || rseed() };
    else if (el.id === 'ed-artid') A.ed.art = { f:'base', id:v };
    A.confirm = null;
    if (live) atlPreview(); else render();
    return;
  }
  if (el.dataset.s) {
    if (ro()) return;
    const v = readVal(el); if (v === undefined) return;
    setPath(A.set, el.dataset.s, v); A.confirm = null;
    const wasDirty = A.setDirty; A.setDirty = true;
    if (!live || !wasDirty) render();
  }
}
document.addEventListener('input', e => { if (V.screen !== 'atelier' || !e.target.matches('input')) return; if (e.target.type === 'checkbox' || e.target.type === 'color') return; atlField(e.target, true); });
document.addEventListener('change', e => {
  if (V.screen !== 'atelier') return;
  const el = e.target;
  if (el.id === 'ed-fxadd') { if (el.value && A.ed && !ro()) { A.ed.fx.push(newEffect(el.value)); A.confirm = null; render(); } return; }
  if (el.id === 'atl-q') return;
  if (el.tagName === 'INPUT' && !['checkbox', 'color'].includes(el.type)) { if (el.dataset.s && A.tab !== 'cards') softRender(); return; }
  atlField(el, false);
});
function atlValidateSet(S) {
  for (const t of [1, 2, 3, 4, 5, 6]) if (!(+S.budget[t][0] <= +S.budget[t][1])) return `Le budget du niveau ${t} a un minimum plus grand que son maximum.`;
  if (S.tribes.some(t => !String(t.n || '').trim())) return 'Chaque tribu doit avoir un nom.';
  if ((S.univ || []).some(u => !String(u.n || '').trim())) return 'Chaque univers doit avoir un nom.';
  { const bad = (S.univ || []).find(u => u.tribes.length !== UNIV_FAMS); if (bad) return `L'univers « ${bad.n} » doit compter exactement ${UNIV_FAMS} familles (il en a ${bad.tribes.length}).`; }
  if (new Set((S.univ || []).map(u => u.n.trim())).size !== (S.univ || []).length) return 'Deux univers portent le même nom.';
  if (Object.values(S.kw).some(k => !String(k.n || '').trim())) return 'Chaque mot-clé doit avoir un nom.';
  return '';
}
async function atlAct(act, btn) {
  const conf = A.confirm; A.confirm = null;
  switch (act) {
    case 'atl-open': V.screen = 'atelier'; A.set = clone(SET); A.setDirty = false; A.ed = null; break;
    case 'atl-back':
      if (A.setDirty && conf !== 'leave') { A.confirm = 'leave'; break; }
      A.setDirty = false; A.ed = null; delete C.__edit; V.screen = 'menu'; break;
    case 'atl-tab': A.tab = btn.dataset.t; break;
    case 'atl-ftr': A.fTr = btn.dataset.v; break;
    case 'atl-ft': A.fT = btn.dataset.v; break;
    case 'atl-tview': A.tab = 'cards'; A.fTr = btn.dataset.id; A.fT = 'all'; break;
    case 'atl-openc': atlOpen(btn.dataset.id); return;
    case 'atl-new': {
      const tr = SET.tribes.some(t => t.id === A.fTr) || A.fTr === 'neu' ? A.fTr : (SET.tribes[0] || {}).id || 'neu';
      const t = A.fT !== 'all' ? +A.fT : A.fTr === 'tok' ? 0 : 1;
      A.ed = { id:newId('c'), n:'', t, tr, a:2, h:2, kw:[], fx:[], art:{ f:'human', s:rseed() } }; A.edNew = true; break;
    }
    case 'ed-kw': { const k = btn.dataset.k, kw = A.ed.kw; const i = kw.indexOf(k); if (i >= 0) kw.splice(i, 1); else kw.push(k); break; }
    case 'ed-fxdel': A.ed.fx.splice(+btn.dataset.i, 1); break;
    case 'ed-reroll': A.ed.art = { f:A.ed.art.f, s:rseed() }; break;
    case 'ed-cancel': A.ed = null; break;
    case 'ed-dup': A.ed = { ...clone(A.ed), id:newId('c'), n:(A.ed.n + ' (copie)').slice(0, 28) }; A.edNew = true; break;
    case 'ed-del':
      if (conf !== 'del') { A.confirm = 'del'; break; }
      if (await deleteCard(A.ed.id)) { toast(`« ${A.ed.n} » est supprimée.`); A.ed = null; }
      break;
    case 'ed-save': {
      if (!canSave()) break;
      const raw = clone(A.ed); raw.n = raw.n.trim(); raw.a = Math.round(raw.a); raw.h = Math.max(1, Math.round(raw.h)); if (!raw.t) delete raw.off;
      if (await saveCard(raw)) { toast(`« ${raw.n} » est enregistrée.`); A.ed = null; }
      break;
    }
    case 'atl-tnew': A.set.tribes.push({ id:newId('tr'), n:'Nouvelle tribu', col:'#7a5aa0', bg:'spec', on:true }); A.setDirty = true; break;
    case 'atl-tdel': { const t = A.set.tribes.splice(+btn.dataset.i, 1)[0]; if (t && DEFAULT_SETTINGS.tribes.some(x => x.id === t.id)) A.set.delTribes = (A.set.delTribes || []).concat(t.id); A.setDirty = true; break; }
    case 'atl-unew': if (ro()) break; A.set.univ = (A.set.univ || []).concat({ n:'Nouvel univers', mech:'none', tribes:[], fixed:true }); A.setDirty = true; break;
    case 'atl-udel': { if (ro()) break; const u = A.set.univ.splice(+btn.dataset.i, 1)[0]; if (u && DEFAULT_SETTINGS.univ.some(x => x.n === u.n)) A.set.delUniv = (A.set.delUniv || []).concat(u.n); A.setDirty = true; break; }
    case 'atl-ufam': { if (ro()) break; const u = A.set.univ[+btn.dataset.i], t = btn.dataset.t; if (!u) break; if (!u.tribes.includes(t) && u.tribes.length >= UNIV_FAMS) { toast(`Un univers compte ${UNIV_FAMS} familles : retire-en une avant d'en ajouter.`); break; } u.tribes = u.tribes.includes(t) ? u.tribes.filter(x => x !== t) : u.tribes.concat(t); u.fixed = true; A.setDirty = true; break; }
    case 'atl-hfam': {
      if (ro()) break; const h = btn.dataset.h, t = btn.dataset.t; A.set.heroFam = A.set.heroFam || {};
      const cur = Array.isArray(A.set.heroFam[h]) && A.set.heroFam[h].length ? A.set.heroFam[h] : (HEROES[h].fam || []);
      const nx = cur.includes(t) ? cur.filter(x => x !== t) : cur.concat(t);
      if (!nx.length) { toast('Un héros garde au moins une famille.'); break; }
      A.set.heroFam[h] = nx; A.setDirty = true; break;
    }
    case 'atl-kwnew': A.set.kw[newId('k_')] = { n:'Nouveau mot-clé', d:'', c:2, fx:newEffect('eot_self') }; A.setDirty = true; break;
    case 'atl-kwdel': delete A.set.kw[btn.dataset.k]; A.setDirty = true; break;
    case 'atl-discard': A.set = clone(SET); A.setDirty = false; break;
    case 'atl-save': {
      const err = atlValidateSet(A.set); if (err) { toast(err); break; }
      if (await saveSettings(A.set)) { A.setDirty = false; toast('Réglages enregistrés. Ils s\'appliquent aux nouvelles parties.'); }
      break;
    }
    case 'atl-reset':
      if (conf !== 'reset') { A.confirm = 'reset'; break; }
      if (await resetAll()) { A.set = clone(DEFAULT_SETTINGS); A.setDirty = false; toast('Le contenu d\'origine est rétabli.'); }
      break;
  }
  render();
}
function atlAfterRender() {}
// un re-rendu pendant un clic ferait perdre ce clic : on attend le relâchement
let PDOWN = false;
function softRender() { if (PDOWN) V.deferRender = true; else render(); }
document.addEventListener('pointerdown', () => { PDOWN = true; }, true);
document.addEventListener('pointerup', () => { PDOWN = false; if (V.deferRender) { V.deferRender = false; setTimeout(render, 0); } }, true);
document.addEventListener('pointercancel', () => { PDOWN = false; }, true);
