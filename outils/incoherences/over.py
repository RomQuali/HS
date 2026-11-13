from playwright.sync_api import sync_playwright
import json
with sync_playwright() as p:
    b=p.chromium.launch(); res={}
    for vp in [(1600,900)]:
        pg=b.new_page(viewport={'width':vp[0],'height':vp[1]}); errs=[]; pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
        pg.goto('file:///home/claude/taverne.html'); pg.wait_for_timeout(1200)
        for U in (__import__('sys').argv[1:] or ['Naruto','South Park','Les Simpson']):
            pg.evaluate("(U)=>{window.CS_NOANIM=1; V.mp=null; V.univSel=[U]; startSolo(); try{finishHero()}catch(e){} clearInterval(H.tick);}",U); pg.wait_for_timeout(300)
            ids=pg.evaluate("""()=>{const G=H.G; const ids=Object.keys(G.pool); const tok=new Set(); const walk=e=>{ if(e&&typeof e==='object'){ if(e.card&&C[e.card]) tok.add(e.card); Object.values(e).forEach(v=>Array.isArray(v)?v.forEach(walk):walk(v)); } }; ids.forEach(c=>(CD(c).fxAll||[]).forEach(walk)); return ids.concat([...tok])}""")
            bad=[]
            for gold in [0,1]:
                for k in range(0,len(ids),6):
                    chunk=ids[k:k+6]
                    pg.evaluate("([ids,g])=>{const p=H.G.ps[0]; p.bd=ids.map(c=>mk(c,g)); p.hd=[]; p.sh=[]; broadcast();}",[chunk,gold]); pg.wait_for_timeout(350 if k else 3800)
                    for i in range(len(chunk)):
                        bx=pg.evaluate("(i)=>{const e=document.querySelector('.board-zone .mn[data-i=\"'+i+'\"]'); if(!e) return null; const r=e.getBoundingClientRect(); return [r.left+r.width/2,r.top+r.height*0.6]}",i)
                        if not bx: continue
                        pg.mouse.move(bx[0],bx[1]); pg.wait_for_timeout(260)
                        r=pg.evaluate("""()=>{const pk=document.querySelector('#peek, .peek'); const pe=[...document.querySelectorAll('.cd')].filter(e=>e.offsetParent&&e.closest('#peek,.peek,.detail-pop')); const c=pe[0]; if(!c) return {none:1}; const tx=c.querySelector('.cd-tx'); const r=c.getBoundingClientRect(); const o={}; if(tx){ const cs=getComputedStyle(tx); o.over=tx.scrollHeight-tx.clientHeight; o.fs=parseFloat(cs.fontSize); o.len=tx.textContent.length; const tr=tx.getBoundingClientRect(); const inner=[...tx.children]; if(inner.length){ const ir=inner.reduce((a,e)=>{const q=e.getBoundingClientRect(); return [Math.min(a[0],q.top),Math.max(a[1],q.bottom)]},[1e9,-1e9]); o.cut=Math.round(Math.max(tr.top-ir[0],ir[1]-tr.bottom)); } } o.off=(r.left<0||r.top<0||r.right>innerWidth||r.bottom>innerHeight); const nm=c.querySelector('.cd-n,.cd-name'); if(nm) o.nameOver=nm.scrollWidth-nm.clientWidth; return o}""")
                        if r.get('none') or r.get('over',0)>2 or r.get('cut',0)>2 or r.get('off') or r.get('nameOver',0)>2 or r.get('fs',99)<9: bad.append((chunk[i],gold,r))
                    pg.mouse.move(5,5)
            res[(U,vp)]=bad
            print(U,vp,len(ids),'cartes ×2 ;',len(bad),'à revoir'); [print('   ',x) for x in bad[:40]]
        print(errs[:2]); pg.close()
    b.close()
