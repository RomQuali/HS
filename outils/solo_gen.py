import json
S='/tmp/claude-0/t/fonds/partie-solo/'
css=open(S+'solo.css').read().replace("url('visuels/","url('assets/solo/visuels/").replace('url("visuels/','url("assets/solo/visuels/').replace("url(visuels/","url(assets/solo/visuels/")
js=open(S+'solo.js').read()
def rep(a,b):
    global js
    assert a in js, a; js=js.replace(a,b)
rep("const dossier = new URL('.', document.currentScript.src);","const dossier = new URL('assets/solo/', window.location.href);")
rep("const css=el('link');css.rel='stylesheet';css.href=url('solo.css');","const css=el('style');css.textContent=SOLO_CSS;")
rep("css.addEventListener('load',montrer,{once:true});css.addEventListener('error',montrer,{once:true});","")
rep("$('.chantier p').textContent=chantier.join(' · ');","$('.chantier p').textContent=chantier.join(' · ');if(options.titre)$('#titre').textContent=options.titre;if(options.description)$('#description').textContent=options.description;if(options.libelle)$('.jouer').textContent=options.libelle;")
rep("choisir(index,false);active=api;return api;","choisir(index,false);active=api;montrer();return api;")
out="""
// ----- écran « Partie solo » (pack Roni-Tavernes-Cinq-Univers) : choix de l'univers par vignettes ; généré par outils/solo_gen.py -----
const SOLO_CSS = """+json.dumps(css)+""";
"""+open(S+'univers.js').read()+"\n"+js+r"""
// raccord : « Jouer solo » de l'accueil ouvre cet écran ; « Lancer la partie » démarre la partie solo dans l'univers choisi
const SOLO_IDS = { 'south-park':'South Park', 'rick-et-morty':'Rick et Morty', 'les-simpson':'Les Simpson', 'dragon-ball':'Dragon Ball', 'naruto':'Naruto' };
function soloOpen() {
  try {
    const cur = Object.keys(SOLO_IDS).find(k => SOLO_IDS[k] === (V.univSel || [])[0]) || 'les-simpson';
    const ok = id => { const u = (SET.univ || []).find(x => x.n === SOLO_IDS[id]); return !!u && (typeof univOpen !== 'function' || univOpen(u)); };
    const cat = window.RoniUnivers.filter(u => ok(u.id));
    if (!cat.length) throw 0;
    RoniSolo.ouvrir({ univers:cat, selection:cat.some(u => u.id === cur) ? cur : cat[0].id, onJouer({ universId }) {
      V.univSel = [SOLO_IDS[universId]]; try { localStorage.setItem('tav-univ', JSON.stringify(V.univSel)); } catch (e) {}
      V.mp = null; startSolo(); } });
    return true;
  } catch (e) { return false; }
}
// en ligne : l'hôte choisit l'univers de la table avec le même écran
function soloOpenMp() {
  try {
    const cur = Object.keys(SOLO_IDS).find(k => SOLO_IDS[k] === (V.univSel || [])[0]) || 'les-simpson';
    const cat = window.RoniUnivers.filter(u => { const x = (SET.univ || []).find(z => z.n === SOLO_IDS[u.id]); return !!x && (typeof univOpen !== 'function' || univOpen(x)); });
    if (!cat.length) return false;
    RoniSolo.ouvrir({ univers:cat, selection:cat.some(u => u.id === cur) ? cur : cat[0].id, titre:'Partie multijoueur', description:'Choisis l’univers de la table.', libelle:'Choisir cet univers', onJouer({ universId }) {
      V.univSel = [SOLO_IDS[universId]]; try { localStorage.setItem('tav-univ', JSON.stringify(V.univSel)); } catch (e) {}
      if (Net.role === 'host' && !H.G) sendPub(); else render(); } });
    return true;
  } catch (e) { return false; }
}

"""
open('/home/claude/parts/solo.js','w').write(out); print(len(out))
