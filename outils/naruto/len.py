from playwright.sync_api import sync_playwright
import json,sys
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(); pg.goto('file:///home/claude/taverne.html'); pg.wait_for_timeout(1000)
    for U in ['Naruto','South Park']:
        r=pg.evaluate("""(U)=>{window.CS_NOANIM=1; const out=[];
      for(let g=0;g<4;g++){ V.mp=null; V.univSel=[U]; startSolo(); const G=H.G; G.ps.forEach(p=>{p.hero=p.hero||p.ho[0]; if(p===G.ps[0]) p.ai=1;}); finishHero();
        let n=0; const rows=[]; while(H.G.ph!=='end'&&n++<200){ if(H.G.ph==='recruit'){ endRecruit(); } const hp0=H.G.ps.map(p=>p.hp); const al0=H.G.ps.filter(p=>p.al).length; if(H.G.ph==='combat') endCombat(); const d=H.G.ps.map((p,i)=>hp0[i]-p.hp); rows.push([H.G.rd, al0, d.filter(x=>x>0).length, Math.round(d.filter(x=>x>0).reduce((a,b)=>a+b,0)/Math.max(1,d.filter(x=>x>0).length)), d.filter(x=>x<0).length, Math.max(...H.G.ps.map(p=>p.t))]); }
        out.push(rows.filter((r,i)=>i%3===2).map(r=>r.join('/')).join('  ')); }
      return out}""",U)
        print(U); [print('  ',x) for x in r]
    b.close()
