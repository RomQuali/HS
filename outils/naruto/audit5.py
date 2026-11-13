from playwright.sync_api import sync_playwright
JS=r"""()=>{ const T=[]; const t=(n,ok,v)=>T.push((ok?'ok':'KO')+' · '+n+(ok?'':' '+JSON.stringify(v===undefined?'':v)));
V.mp=null; V.univSel=['Naruto']; startSolo(); try{finishHero()}catch(e){} clearInterval(H.tick); const G=H.G,p=G.ps[0]; p.hero='nh_bee';
// triple d'un ninja transformé
p.bd=[mk('nk_sakura',0),mk('nk_sakura',0)]; p.hd=[mk('nk_sakura',0)]; p.ck=10; p.g=10; doNkTf(G,p,p.bd[0]); const s=p.bd[0]; const a0=[s.a,s.h];
OPS.play(G,p,{i:0,pos:2}); const g=p.bd.concat(p.hd).find(x=>x.c==='nk_sakura'&&x.g);
t('triple avec un ninja transformé : la carte dorée existe', !!g, p.bd.concat(p.hd).map(x=>[x.c,x.g,x.a,x.h,x.tf]));
if(g){ t('la dorée garde la transformation et ses bonus', g.tf===1&&g.tfn==='Sceau du Byakugō'&&g.a>=2+2&&g.h>=6+3, [g.tf,g.tfn,g.a,g.h]); if(p.hd.includes(g)){ OPS.play(G,p,{i:p.hd.indexOf(g),pos:0}); } const m=p.bd.find(x=>x===g)||p.bd.find(x=>x.c==='nk_sakura'&&x.g); p.ck=10; t('dorée transformée : pas de seconde transformation', m&&nkTfCost(p,m)===null, m&&nkTfCost(p,m)); const J=jutOf(m); p.bd.push(mk('nk_ao',0)); const o=p.bd[p.bd.length-1], o0=[o.a,o.h]; p.ck=10; G.rd++; doJutsu(G,p,m); t('dorée transformée : jutsu renforcé doublé (+4/+6)', o.a===o0[0]+4&&o.h===o0[1]+6, [o.a-o0[0],o.h-o0[1]]); }
// triple de jetons d'invocation
p.bd=[mk('nk_jiraiya',0)]; p.hd=[]; for(let i=0;i<3;i++){ G.rd++; p.ck=10; doJutsu(G,p,p.bd[0]); } const gg=p.bd.concat(p.hd).filter(x=>x.c==='tk_gamabunta'); t('trois Gamabunta fusionnent en un doré', gg.length===1&&gg[0].g===1&&gg[0].a===16, gg.map(x=>[x.g,x.a,x.h]));
// affichage : le jutsu utilisé et la transformation arrivent bien jusqu'à l'écran du joueur
p.bd=[mk('nk_naruto',0)]; p.hd=[]; p.ck=10; G.rd++; doJutsu(G,p,p.bd[0]); broadcast(); const me=V.me; t('écran du joueur : jutsu marqué comme lancé ce tour', me&&me.bd[0].ju===V.pub.rd, me&&[me.bd[0].ju,V.pub.rd]);
p.ck=10; doNkTf(G,p,p.bd[0]); broadcast(); t('écran du joueur : transformation visible (portrait et nom)', V.me.bd[0].tf===1&&V.me.bd[0].tfn==='Mode Ermite'&&!!ART['nk_naruto_tf1'], [V.me.bd[0].tf,V.me.bd[0].tfn]);
return T}"""
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(); errs=[]; pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('file:///home/claude/taverne.html'); pg.wait_for_timeout(1200)
    r=pg.evaluate(JS); [print(x[:500]) for x in r]; print('errs',errs[:3]); b.close()
