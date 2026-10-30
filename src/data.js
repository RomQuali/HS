/* =====================================================================
   STOCKAGE PARTAGÉ — cfg/settings (réglages) + cards/<id> (cartes).
   Lecture pour tous, écriture réservée aux éditeurs (admin).
   Tant que rien n'est enregistré, le jeu utilise le contenu d'origine.
   ===================================================================== */
const DATA = { db:null, user:null, admin:false, seeded:false, liveSet:undefined, liveCards:undefined, pending:false, busy:'', ready:false };

async function dataBoot() {
  const use = n => (window.claude && window.claude.use ? window.claude.use(n) : Promise.resolve(null)).catch(() => null);
  DATA.db = await use('db');
  DATA.user = await use('user');
  if (DATA.user) { try { DATA.admin = !!(await DATA.user.canEdit()); } catch (e) { DATA.admin = false; } }
  if (!DATA.db) { DATA.admin = false; DATA.ready = true; refreshScreen(); return; }
  DATA.db.doc('cfg/settings').onSnapshot(s => { DATA.liveSet = s.exists ? clone(s.data()) : null; liveChanged(); }, () => {});
  DATA.db.collection('cards').onSnapshot(q => { const o = {}; q.docs.forEach(d => { o[d.id] = clone(d.data()); o[d.id].id = d.id; }); DATA.liveCards = o; liveChanged(); }, () => {});
  refreshScreen();
}
function liveChanged() {
  if (DATA.liveSet === undefined || DATA.liveCards === undefined) return;
  DATA.ready = true;
  DATA.seeded = !!DATA.liveSet || Object.keys(DATA.liveCards).length > 0;
  if (V.screen === 'game' || DATA.seeding) { DATA.pending = true; return; }
  clearTimeout(DATA.deb); DATA.deb = setTimeout(applyLive, 150);
}
// la base ne garde que les modifications : le contenu d'origine reste la référence
function applyLive() {
  DATA.pending = false;
  const saved = DATA.liveSet ? clone(DATA.liveSet) : {};
  SET = fillDefaults(saved, DEFAULT_SETTINGS);
  const delT = SET.delTribes || [];
  for (const t of DEFAULT_SETTINGS.tribes) if (!SET.tribes.some(x => x.id === t.id) && !delT.includes(t.id)) SET.tribes.push(clone(t));
  SET.univ = SET.univ || [];
  SET.univ.forEach(u => { if (u.n === 'Les Cinq Nations') { u.n = 'Ninja'; u.lore = null; } });
  if (SET.delUniv) SET.delUniv = SET.delUniv.map(n => n === 'Les Cinq Nations' ? 'Ninja' : n);
  const delU = SET.delUniv || [];
  for (const u of DEFAULT_SETTINGS.univ) { if (delU.includes(u.n)) continue; const mine = SET.univ.find(x => x.n === u.n); if (!mine) SET.univ.push(clone(u)); else { if (!mine.mech) mine.mech = u.mech; if (!mine.fixed) mine.tribes = u.tribes.filter(t => !delT.includes(t)); } }
  CARDS = clone(DEFAULT_CARDS);
  for (const id in (DATA.liveCards || {})) if (!/^c_nj_/.test(id)) CARDS[id] = clone(DATA.liveCards[id]);   // compagnons Ninja : toujours la version du jeu
  for (const id of (SET.deleted || [])) delete CARDS[id];
  rebuildCatalog();
  if (typeof atlOnData === 'function') atlOnData();
  refreshScreen();
}
function refreshScreen() { if (V.screen === 'menu' || V.screen === 'atelier' || V.screen === 'lobby') render(); }

const dbErr = e => e && e.code === 'invalid_argument' ? 'Ton accès ne permet pas de modifier le jeu (il faut être propriétaire ou éditeur).'
  : e && e.code === 'quota_exceeded' ? 'La base du jeu est pleine. Supprime des cartes inutilisées.' : 'L\'enregistrement a échoué. Réessaie dans un instant.';
async function dbRun(label, fn) {
  if (!DATA.db || !DATA.admin) { toast('Seuls le propriétaire et les éditeurs du jeu peuvent le modifier.'); return false; }
  if (DATA.busy) return false;
  try { DATA.busy = label; refreshScreen(); DATA.seeding = true; try { await fn(); } finally { DATA.seeding = false; } DATA.busy = ''; liveChanged(); refreshScreen(); return true; }
  catch (e) { DATA.busy = ''; refreshScreen(); toast(dbErr(e)); return false; }
}
const saveCard = raw => dbRun('Enregistrement…', async () => {
  await DATA.db.doc('cards/' + raw.id).set(clone(raw));
  if ((SET.deleted || []).includes(raw.id)) { const s = clone(SET); s.deleted = s.deleted.filter(x => x !== raw.id); await DATA.db.doc('cfg/settings').set(s); }
});
const deleteCard = id => dbRun('Suppression…', async () => {
  if ((DATA.liveCards || {})[id]) await DATA.db.doc('cards/' + id).delete();
  if (DEFAULT_CARDS[id]) { const s = clone(SET); s.deleted = (s.deleted || []).concat(id); await DATA.db.doc('cfg/settings').set(s); }
});
const saveSettings = s => dbRun('Enregistrement des réglages…', () => DATA.db.doc('cfg/settings').set(clone(s)));
async function resetAll() {
  return dbRun('Remise à zéro…', async () => {
    for (const id of Object.keys(DATA.liveCards || {})) await DATA.db.doc('cards/' + id).delete();
    if (DATA.liveSet) await DATA.db.doc('cfg/settings').delete();
  });
}
