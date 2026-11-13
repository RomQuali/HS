from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={'width':1600,'height':900}); errs=[]; pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('file:///home/claude/taverne.html'); pg.wait_for_timeout(1200)
    r=pg.evaluate("""()=>{V.mp=null; V.univSel=['Naruto']; startSolo(); try{finishHero()}catch(e){} clearInterval(H.tick); const G=H.G,p=G.ps[0]; p.hero='nh_bee';
      const T=[]; const t=(n,ok,v)=>T.push((ok?'ok':'KO')+' · '+n+' '+JSON.stringify(v===undefined?'':v));
      const set=(...c)=>{p.bd=c.map(x=>mk(x,0)); p.bd.forEach(m=>delete m.tmp); p.foe=null; return p.bd;};
      let [hi,ka]=set('nk_hidan','nk_kakuzu'); nkGroupsEot(G,p); t('Duo immortel', hi.tmp&&hi.tmp.a===8&&ka.tmp.f.includes('r'), [hi.tmp,ka.tmp]);
      // en combat : les stats et mots-clés temporaires comptent
      let [it,ki]=set('nk_itachi','nk_kisame'); nkGroupsEot(G,p); t('Itachi et Kisame', it.tmp.a===10&&it.tmp.f.includes('l')&&!ki.tmp.f.includes('l'), [it.tmp,ki.tmp]);
      let [de,sa]=set('nk_deidara','nk_sasori'); nkGroupsEot(G,p); t('Artistes', de.tmp.a===6&&p.foe&&p.foe.aoe===4, [de.tmp,p.foe]);
      let [ze,to]=set('nk_zetsu','nk_tobi'); const z0=ze.a; nkGroupsEot(G,p); t('Espions', ze.a===z0+4&&ze.tmp.f.includes('c'), [ze.a-z0,ze.tmp]);
      let [i2,sk]=set('nk_itachi','nk_sasuke'); const s0=sk.a; nkGroupsEot(G,p); t('Frères Uchiha', sk.a===s0+5, sk.a-s0);
      let [ji,na]=set('nk_jiraiya','nk_naruto'); t('Maître et disciple : gratuit', jutCost(p,na)===0&&nkTfCost(p,na)===0&&jutCost(p,ji)===5, [jutCost(p,na),nkTfCost(p,na),jutCost(p,ji)]);
      let [j2,ts]=set('nk_jiraiya','nk_tsunade'); p.ck=10; doJutsu(G,p,j2); let gb=p.bd.find(x=>x.c==='tk_gamabunta'); t('Sannin à 2 : invocation +8/+8', gb&&gb.a===16&&!gb.g, gb&&[gb.a,gb.h,gb.g]);
      let [j3,t3,o3]=set('nk_jiraiya','nk_tsunade','nk_orochimaru'); p.ck=10; doJutsu(G,p,j3); gb=p.bd.find(x=>x.c==='tk_gamabunta'); t('Sannin à 3 : invocation dorée', gb&&gb.g&&gb.a===24, gb&&[gb.a,gb.h,gb.g]);
      let [ga,te,kk,ma]=set('nk_gaara','nk_temari','nk_kankuro','nk_matsuri'); p.g=0; const g0=ga.a; OPS.sell(G,p,{i:3}); t('Fratrie à 3 : vente', ga.a>=g0+5&&p.g===3, [ga.a-g0,p.g]);
      let [n7,s7,sa7,k7]=set('nk_naruto','nk_sasuke','nk_sakura','nk_kakashi'); const n0=n7.a; nkGroupsEot(G,p); t('Équipe 7 à 4', n7.a===n0+8&&jutCost(p,k7)===0, [n7.a-n0,jutCost(p,k7)]);
      let [jo,kd]=set('nk_jirobo','nk_kidomaru'); p.sh=[mk('nk_zaku',0)]; const j0=jo.a; devour(G,p,jo,1); t('Cinq du Son à 2 : double', jo.a===j0+4, jo.a-j0);
      let e=set('nk_zabuza','nk_chojuro','nk_mangetsu'); nkGroupsEot(G,p); t('Épéistes à 3', e[1].tmp.a===4, e[1].tmp);
      let [za,ha]=set('nk_zabuza','nk_haku'); nkGroupsEot(G,p); t('Démon et son arme', za.tmp.a===6&&za.tmp.f.includes('s')&&za.tmp.f.includes('w')&&ha.tmp.f.includes('t'), [za.tmp,ha.tmp]);
      let [gy,ny]=set('nk_gaara','nk_naruto'); t('Jinchūriki à 2 : −5', nkTfCost(p,gy)===5, nkTfCost(p,gy));
      // un vrai combat : le bonus temporaire est bien appliqué puis retiré
      set('nk_hidan','nk_kakuzu'); const h0=p.bd[0].a; endRecruit(); const inF=(V.fight||{}); t('après fin de tour : phase combat', H.G.ph==='combat', H.G.ph); endCombat(); t('bonus retiré après le combat', !p.bd[0]||(!p.bd[0].tmp&&p.bd[0].a<h0+8), p.bd[0]&&[p.bd[0].a,p.bd[0].tmp]);
      t('texte de carte', /Groupe/.test(cardTextH('nk_naruto',0)), cardTextH('nk_naruto',0).slice(0,90));
      return T}""")
    for x in r: print(x)
    print('errs',errs[:5]); b.close()
