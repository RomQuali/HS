from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(); errs=[]; pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('file:///home/claude/taverne.html'); pg.wait_for_timeout(1000)
    r=pg.evaluate("""()=>{const out=[]; const U={sp:'South Park',rm:'Rick et Morty',si:'Les Simpson',d_:'Dragon Ball',n_:'Naruto'};
    const T0=[['sp_perenoel','craft'],['sp_chef','choose'],['sp_scuzzlebutt','gem'],['sp_hamster','dev'],['rm_cuisinier','craft'],['rm_summer','choose'],['rm_parasite','gem'],['rm_ver','dev'],['si_docnick','craft'],['si_willie','choose'],['si_eddie','gem'],['si_neddiable','eot'],['d_yajirobe','craft'],['d_krilin','choose'],['d_cold','eotgem'],['d_cell','dev'],['n_c2','craft'],['n_e4','choose'],['n_g1','gem'],['n_p3','eot']];
    const T=T0.filter(x=>x[1]==='craft'); for(const [id,kind] of T){ V.mp=null; V.univSel=[U[id.slice(0,2)]]; startSolo(); clearInterval(H.tick); const G=H.G,p=G.ps[0]; if(typeof finishHero==='function'&&G.ph==='hero'){try{finishHero()}catch(e){}} clearInterval(H.tick);
      p.bd=[mk(Object.keys(G.pool).find(x=>CD(x).tr===CD(id).tr&&x!==id)||id,0)]; p.hd=[mk(id,0)]; p.g=10; p.cho=null; const o=p.bd[0], oa=o.a, oh=o.h; const shn=p.sh.filter(x=>!x.sp).length;
      const ok=OPS.play(G,p,{i:0,pos:1}); const me=p.bd.find(x=>x.c===id); let res={id,ok,txt:(CD(id).fxAll||[]).map(e=>fxText(e)).join(' '),f:CD(id).f};
      if(kind==='craft'){ const s=p.hd.find(x=>x.sp); res.sp=s&&SPELLS[s.sp].n; res.tmp=s&&s.tmpc; if(s){const a0=o.a,h0=o.h; res.cast=OPS.cast?OPS.cast(G,p,{i:p.hd.indexOf(s),tg:p.bd.indexOf(o)}):'nocast'; res.d=[o.a-a0,o.h-h0];} }
      if(kind==='choose'){ res.cho=!!p.cho; const a0=me.a,h0=me.h,f0=o.f; OPS.choose(G,p,{i:0}); res.after=[o.a-oa,o.h-oh,me.a-a0,me.h-h0,o.f]; res.cleared=!p.cho; }
      if(kind==='gem'){ res.gems=p.hd.filter(x=>x.sp==='hs_gem').length; }
      if(kind==='dev'){ res.shop=[shn,p.sh.filter(x=>!x.sp).length]; res.st=[me.a,me.h,CD(id).a,CD(id).h]; }
      if(kind==='eot'||kind==='eotgem'){ const a0=me.a; p.sh=[mk(Object.keys(G.pool)[0],0),mk(Object.keys(G.pool)[1],0)]; fxOf(me,'eot').forEach(e=>runRecruit(G,p,me,e)); res.gems=p.hd.filter(x=>x.sp==='hs_gem').length; res.da=me.a-a0; res.shop=p.sh.length; }
      out.push(res);} return out}""")
    for x in r: print(x)
    print('errs',errs); b.close()
