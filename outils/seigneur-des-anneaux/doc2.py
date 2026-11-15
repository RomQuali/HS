from playwright.sync_api import sync_playwright
import json
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(); pg.goto('file:///home/claude/taverne.html'); pg.wait_for_timeout(1000)
    r=pg.evaluate("""()=>{ const fam={}; SET.tribes.forEach(t=>fam[t.id]=t.n); const o={cards:[],tok:[],her:[],obj:[],grp:[],bat:[],et:LO_ETAPES.map(e=>e.n),fams:LOV.map(t=>fam[t])};
      Object.keys(C).filter(c=>/^lo_/.test(c)).forEach(c=>{ const d=CD(c), m=mk(c,0); o.cards.push([fam[d.tr],d.t,d.n,m.a,m.h,[...(d.f||'')].map(f=>(SET.kw[f]||{}).n).join(', '),(d.fxAll||[]).map(e=>ET[e.k].txt(e,1)).join(' ')]); });
      Object.keys(C).filter(c=>/^tl_/.test(c)).forEach(c=>{ const d=CD(c), m=mk(c,0); o.tok.push([d.n,m.a,m.h,[...(d.f||'')].map(f=>(SET.kw[f]||{}).n).join(', '),(d.fxAll||[]).map(e=>ET[e.k].txt(e,1)).join(' ')]); });
      Object.keys(HEROES).filter(h=>/^lh_/.test(h)).forEach(h=>{ const x=HEROES[h]; o.her.push([x.n,x.shadow?'Ombre':'Peuples libres',x.pwn,x.cost?x.cost+' or':'passif',x.tx]); });
      Object.keys(SPELLS).filter(k=>SPELLS[k].lo).forEach(k=>{ const S=SPELLS[k]; const L=LO_BAT.some(b=>b.rwL.includes(k)), O=LO_BAT.some(b=>b.rwO.includes(k)); o.obj.push([S.n,S.tx,S.stx||'',L&&O?'les deux camps':L?'Peuples libres':O?'Ombre':'hors butin']); });
      LO_GROUPS.forEach(g=>o.grp.push([g.n,g.m.map(c=>CD(c).n).join(', '),g.th.map((t,i)=>t+' : '+g.tx[i]).join(' · ')]));
      LO_BAT.forEach(e=>o.bat.push([e.n,e.rd,e.L.tx,e.O.tx,e.rwL.map(id=>SPELLS[id].n).join(', '),e.rwO.map(id=>SPELLS[id].n).join(', ')])); return o; }""")
    b.close()
d="""# Univers « Le Seigneur des Anneaux » — gameplay de référence (version 2, 15/11/2026)

Refonte demandée le 15/11/2026 pour coller davantage à l'univers. Réponses au questionnaire : ce qui ne collait pas = Bien et Mal mélangés, l'Anneau qui s'achète 3 or, le même voyage pour tous. Décisions : camp fixé par le héros ; un porteur désigné, les autres le chassent ; le voyage du seul porteur ; une 3e famille pour l'Ombre ; les grandes batailles ; le porteur est le héros lui-même ; l'Anneau avance en résistant aux Nazgûl.

## Règles
- **Deux camps** : ton héros fixe ton camp. Peuples libres (15 héros) : seulement Hommes, Elfes, Nains et Hobbits en taverne et en découverte. Ombre (5 héros) : seulement Mordor, Isengard, Alliés de l'Ombre. Sméagol et Saroumane se trouvent des deux côtés.
- **L'Anneau unique** : il ne s'achète plus. À la manche 3, un héros des Peuples libres est désigné porteur (Frodon en priorité s'il est en jeu). C'est le héros qui le porte, pas un serviteur.
- **Le fardeau** : à chaque tour, le porteur gagne +1/+1 sur tout son plateau et son héros perd 1 PV (jamais en dessous de 1). Frodon ne perd pas de PV ; Sauron non plus, et gagne +2/+2.
- **La traque** : à chaque combat, des Nazgûl rejoignent l'adversaire du porteur : 4/4 au départ, +6/+6 par étape franchie ; 1 traqueur, puis 2 dès l'étape 2, 3 dès l'étape 4 (Bilbon : toujours 1). Si le plateau adverse est plein, ils remplacent ses serviteurs les plus faibles. Si le porteur est de l'Ombre, ce sont des Rohirrim qui le pourchassent.
- **Le voyage du porteur** : """+' → '.join(['La Comté']+r['et'])+""". Combat gagné ou égalité : l'Anneau avance d'une étape. Combat perdu : il recule d'une étape et passe au vainqueur (contre un fantôme, il recule mais reste). Si le porteur est éliminé, l'Anneau trouve un autre maître à la même étape.
- **Deux façons de gagner** : dernier survivant, ou amener l'Anneau au Mont du Destin (6e étape) : il est détruit (Peuples libres) ou rendu à Sauron (Ombre).
- **Les grandes batailles** : manches 4, 7, 10 et 13. Chaque camp reçoit des renforts pour ce combat ; les vainqueurs choisissent un objet légendaire parmi 3 de leur camp (rien pour les perdants).
- **Objets légendaires** : effet de base pour tous, bonus en plus sur le porteur du film.
- **Transformations** : gratuites, après la bataille de l'histoire du personnage. Roi Elessar réservé à l'Aragorn doré.
- **Groupes emblématiques** : duos et trios célèbres, toujours réalisables dans un seul camp.

## Grandes batailles
| Bataille | Manche | Renfort Peuples libres | Renfort Ombre |
|---|---|---|---|
"""
for n,rd,l,o,rl,ro in r['bat']: d+=f"| {n} | {rd} | {l} | {o} |\n"
d+="\nButins :\n"
for n,rd,l,o,rl,ro in r['bat']: d+=f"- **{n}** — Peuples libres : {rl}. Ombre : {ro}.\n"
d+=f"\n## Cartes ({len(r['cards'])}, 10 par famille)\n"
for f in r['fams']:
    d+=f"\n**{f}**\n"
    for c in sorted([x for x in r['cards'] if x[0]==f],key=lambda x:x[1]): d+=f"- {c[2]} (niveau {c[1]}, {c[3]}/{c[4]}{', '+c[5] if c[5] else ''}) — {c[6] or 'sans effet'}\n"
d+="\n## Créatures et jetons\n"
for t in r['tok']: d+=f"- {t[0]} {t[1]}/{t[2]}{', '+t[3] if t[3] else ''}{' — '+t[4] if t[4] else ''}\n"
d+=f"\n## Objets légendaires ({len(r['obj'])})\n"
for o in r['obj']: d+=f"- **{o[0]}** ({o[3]}) — {o[1]}{' Porteur légitime · '+o[2]+'.' if o[2] else ''}\n"
d+=f"\n## Groupes emblématiques ({len(r['grp'])})\n"
for g in r['grp']: d+=f"- **{g[0]}** ({g[1]}) — {g[2]}\n"
d+=f"\n## Héros ({len(r['her'])})\n"
for h in r['her']: d+=f"- {h[0]} ({h[1]}) — {h[2]} ({h[3]}) : {h[4]}\n"
d+="""
## Mesures (parties jouées par l'IA)
- 48 parties puis 30 parties : aucune erreur ; 14,5 puis 15,3 manches en moyenne.
- Victoires par l'Anneau : 10 sur 48 (5 par l'Ombre), puis 5 sur 30 (1 par l'Ombre).
- Place moyenne : Peuples libres 4,53 / Ombre 4,40, puis 4,42 / 4,73.
- 54 contrôles automatiques (`outils/seigneur-des-anneaux/t_lo2.py`).
- Non mesuré : équilibrage héros par héros, objets, groupes ; multijoueur en ligne non testé.

## Images
119 images fournies (archive « Roni-Terre-du-Milieu.zip ») en place. Manquantes (silhouette d'attente) : cartes Guerrier oriental, Archer haradrim, Bolg, Le Grand Gobelin, Azog le Profanateur, Troll de guerre ; objets Mine d'Orthanc, Masse de Sauron. Réutilisent une image fournie : Balrog de Morgoth, Smaug, Warg sauvage, Gobelin de la Moria, et 4 objets de l'Ombre.

## Écarts et choix de Claude
- Porteur de l'Ombre : chassé par des Rohirrim (les Nazgûl servent Sauron).
- Le fardeau ne tue jamais le héros (plancher à 1 PV).
- Butin de bataille réservé aux vainqueurs du combat de la manche.
- Transformations liées aux batailles et non plus au voyage (seul le porteur voyage).
- Étagère de taverne vide dans cet univers ; l'Anneau n'est plus une carte.
- Seulement 5 héros de l'Ombre sur 20.
- Reste à faire : carte « Comment on joue ? », message de fin propre à la victoire par l'Anneau.
"""
open('/home/claude/sda-gameplay.md','w',encoding='utf-8').write(d); print(len(d))
