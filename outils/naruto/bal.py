from playwright.sync_api import sync_playwright
import json
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={'width':1280,'height':720}); errs=[]; pg.on('pageerror',lambda e:errs.append(str(e)[:300]))
    pg.goto('file:///home/claude/taverne.html'); pg.wait_for_timeout(1000)
    r=pg.evaluate("""()=>{window.CS_NOANIM=1; const fam={}, hero={}, st={jut:0,tf:0,games:0,rd:0,topStats:[]};
      for(let g=0;g<30;g++){ V.mp=null; V.univSel=['Naruto']; startSolo(); const G=H.G; G.ps.forEach(p=>{p.hero=p.hero||p.ho[g%p.ho.length]; if(p===G.ps[0]) p.ai=1;}); finishHero();
        let n=0, last={}; while(H.G.ph!=='end'&&n++<200){ if(H.G.ph==='recruit'){ endRecruit(); } H.G.ps.forEach(p=>{ if(p.al&&p.bd.length) last[p.pid]={bd:p.bd.map(m=>[m.c,m.a,m.h,m.tf||0]),q:p.q}; }); if(H.G.ph==='combat') endCombat(); }
        if(H.G.ph!=='end') continue; st.games++; st.rd+=H.G.rd;
        const rk=H.G.ps.slice().sort((a,b)=>(a.rank||(a.al?1:9))-(b.rank||(b.al?1:9)));
        rk.forEach((p,i)=>{ const pl=p.rank||(p.al?1:i+1); const L=last[p.pid]; if(!L) return; const c={}; L.bd.forEach(m=>{const t=CD(m[0]).tr; c[t]=(c[t]||0)+1}); const top=Object.keys(c).sort((a,b)=>c[b]-c[a])[0]; if(top&&c[top]>=3){ fam[top]=fam[top]||[0,0]; fam[top][0]+=pl; fam[top][1]++; }
          hero[p.hero]=hero[p.hero]||[0,0]; hero[p.hero][0]+=pl; hero[p.hero][1]++; if(pl===1){ st.topStats.push(L.bd.reduce((s,m)=>s+m[1]+m[2],0)); st.tf+=L.bd.filter(m=>m[3]).length; } });
      }
      const f={}; for(const k in fam) f[trName(k)]=[+(fam[k][0]/fam[k][1]).toFixed(2),fam[k][1]]; const h={}; for(const k in hero) h[k.slice(3)]=[+(hero[k][0]/hero[k][1]).toFixed(1),hero[k][1]];
      return {f,h,games:st.games,avgRd:+(st.rd/st.games).toFixed(1),winStats:Math.round(st.topStats.reduce((a,b)=>a+b,0)/st.topStats.length),tfWin:+(st.tf/st.games).toFixed(1), rankSample:H.G.ps.map(p=>[p.rank,p.al])}}""")
    print(json.dumps(r,ensure_ascii=False)); print(errs[:3]); b.close()
