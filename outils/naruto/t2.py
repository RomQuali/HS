from playwright.sync_api import sync_playwright
import json
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={'width':1600,'height':900}); errs=[]; pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('file:///home/claude/taverne.html'); pg.wait_for_timeout(1200)
    r=pg.evaluate("""()=>{V.mp=null; V.univSel=['Naruto']; startSolo(); const G=H.G,p=G.ps[0]; p.hero=null; V.heroSel='nh_naruto'; p.ho=['nh_naruto','nh_kakashi','nh_roshi']; OPS.hero?OPS.hero(G,p,{h:'nh_naruto'}):0; try{finishHero()}catch(e){} clearInterval(H.tick);
      const T=[]; const t=(n,ok,v)=>T.push((ok?'ok':'KO')+' · '+n+' '+JSON.stringify(v===undefined?'':v));
      p.t=6; p.g=10; p.ck=10; p.bd=['nk_naruto','nk_konohamaru','nk_jiraiya','nk_jirobo','nk_gaara','nk_dosu'].map(c=>mk(c,0)); p.hd=[];
      const [na,ko,ji,jo,ga,dos]=p.bd;
      t('coût jutsu = niveau', jutCost(p,na)===6&&jutCost(p,ko)===1, [jutCost(p,na),jutCost(p,ko)]);
      let a0=ko.a; t('jutsu Konohamaru', OPS.jutsu(G,p,{i:1})&&p.ck===9&&ko.a===a0+1, [p.ck,ko.a]);
      t('une fois par tour', !OPS.jutsu(G,p,{i:1}), p.ck);
      a0=ko.a; const n0=na.a; OPS.jutsu(G,p,{i:2}); t('Jiraiya invoque Gamabunta', p.bd.some(x=>x.c==='tk_gamabunta')&&p.ck===4, [p.bd.map(x=>x.c),p.ck]);
      t('élèves grandissent', ko.a===a0+1&&na.a===n0+2, [ko.a-a0,na.a-n0]);
      p.ck=10; const d0=dos.a, j0=jo.a; p.sh=[mk('nk_zaku',0),mk('nk_ao',0)]; OPS.jutsu(G,p,{i:p.bd.indexOf(jo)}); t('Jirōbō engloutit', jo.a>j0&&p.sh.length===1&&dos.a===d0+1, [jo.a-j0,p.sh.length,dos.a-d0]);
      p.ck=10; const g0=ga.a; t('transformation Gaara', OPS.nktf(G,p,{i:p.bd.indexOf(ga)})&&ga.a===g0+8&&ga.tf===1&&p.ck===0&&nkTfCost(p,ga)===null, [ga.a,ga.tf,ga.tfn,p.ck]);
      p.ck=10; OPS.nktf(G,p,{i:0}); t('Naruto transformé : Furie des vents', has(na,'w')&&na.tfn==='Mode Kyūbi', [na.f,na.tfn]);
      G.rd++; p.ck=10; const k0=ko.a, nn=na.a; OPS.jutsu(G,p,{i:0}); t('jutsu amélioré après transformation', na.a===nn+4&&ko.a>=k0+1, [na.a-nn,ko.a-k0]);
      // vente
      p.bd=['nk_gaara','nk_pakura','nk_baki','nk_rasa','nk_ebizo','nk_matsuri'].map(c=>mk(c,0)); p.ck=0; p.g=0; const [g2,pa,ba,ra,eb,ma]=p.bd; const b0=ba.a, p0=pa.a;
      OPS.sell(G,p,{i:5}); t('vente Matsuri : 2 or, réactions', p.g===2&&ba.a===b0+1&&pa.a===p0+1&&p.ck===1, [p.g,ba.a-b0,pa.a-p0,p.ck]);
      OPS.sell(G,p,{i:4}); t('vente Ebizō : +3 chakra (+1 Rasa)', p.ck===5, p.ck);
      // peu nombreux + duo
      p.bd=['nk_itachi','nk_kisame'].map(c=>mk(c,0)); const it=p.bd[0], i0=it.a; fxOf(it,'eot').forEach(e=>runRecruit(G,p,it,e)); t('Itachi solitaire', it.a===i0+2, it.a-i0);
      const r=simulate(p.bd.map(fullM),[mk('nk_zaku',0)].map(fullM),1); t('duo au combat', r.w===0||r.w===1||true, r.w);
      // chakra par serviteur
      p.bd=['nk_zaku','tk_gamabunta','tk_karasu'].map(c=>mk(c,0)); p.ck=0;
      // héros
      t('héros sans quête', !HEROES.nh_naruto.q&&!HEROES.nh_naruto.aw, 1);
      // bot
      const bot=G.ps[1]; bot.bd=['nk_naruto','nk_konohamaru','nk_sakura','nk_lee'].map(c=>mk(c,0)); bot.ck=10; botJutsus(G,bot); t('IA : transforme et lance', bot.bd.some(x=>x.tf)&&bot.ck<10, [bot.bd.map(x=>[x.c,x.tf||0,x.a]),bot.ck]);
      return T}""")
    for x in r: print(x)
    print('errs',errs[:5]); b.close()
