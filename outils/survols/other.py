from playwright.sync_api import sync_playwright
import sys, json
sys.argv=['x']; exec(open('/tmp/claude-0/t/hov/sweep.py').read().split("if __name__=='__main__':")[0])
def rep(res,label):
    from collections import Counter
    g={}
    for i in res: g.setdefault((i['tag'],i['cls'].split(' ')[0],i['hov'],i['act']),[]).append(i)
    print('==',label,len(res))
    for k,v in sorted(g.items(),key=str):
        v=[i for i in v if not i.get('gone')]; n=len(v)
        if not n: continue
        pk=sum(1 for i in v if i.get('peek')); out=sum(1 for i in v if i.get('out')); bad=sum(1 for i in v if i.get('bad')); ex=next((i for i in v if i.get('peek')),v[0])
        print('  ',k,'n',n,'bulle',pk,'hors',out,'KO',bad,'|',(ex.get('txt') or ex['tip'] or ex['title'] or ex['aria'])[:70], '  <<<' if (out or bad or (pk<n and not ex['title'])) else '')
with sync_playwright() as p:
    for W,Hh in [(1600,900),(1280,720)]:
        b=p.chromium.launch(); pg=b.new_page(viewport={'width':W,'height':Hh}); errs=[]; pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
        pg.goto('file:///home/claude/taverne.html'); pg.wait_for_timeout(600)
        # choix du héros
        pg.evaluate("()=>{window.CS_NOANIM=1; V.mp=null; V.univSel=['Naruto']; startSolo();}"); pg.wait_for_timeout(1500); res=[]; sweep(pg,'heros',res); rep(res,'choix du héros %dx%d'%(W,Hh))
        pops=pg.evaluate("""async()=>{const out=[]; for(const c of document.querySelectorAll('.hp-col')){ const r=c.querySelector('.hp-card').getBoundingClientRect(); const ev=new PointerEvent('pointerover',{bubbles:true}); out.push(1);} return out.length}""")
        for k in range(1,4):
            pg.hover('.hp-col:nth-child(%d) .hp-card'%k,force=True); pg.wait_for_timeout(350)
            print('   pop',k,pg.evaluate("(k)=>{const p=document.querySelector('.hp-col:nth-child('+k+') .hp-pop'),r=p.getBoundingClientRect(),cs=getComputedStyle(p);return [cs.opacity,cs.visibility,[r.left,r.top,r.right,r.bottom].map(Math.round), r.left<0||r.top<0||r.right>innerWidth||r.bottom>innerHeight?'HORS ÉCRAN':'ok', p.innerText.replace(/\\s+/g,' ').slice(0,50)]}",k))
        # jeu : découverte + état riche
        pg.evaluate(SET,'Les Simpson'); pg.wait_for_timeout(2500)
        pg.evaluate("()=>{const me=H.G.ps[0]; const ids=Object.keys(H.G.pool).filter(id=>C[id].t===3).slice(0,3); me.disc=ids.map(id=>mk(id,0)); broadcast();}"); pg.wait_for_timeout(900)
        res=[]; sweep(pg,'decouverte',res); rep([i for i in res if i['y']<Hh],'découverte %dx%d'%(W,Hh)); pg.screenshot(path='_d_%d.png'%W)
        # fin de partie
        pg.evaluate("""()=>{const G=H.G; G.ps[0].disc=null; const ids=Object.keys(G.pool).slice(0,5); for(let r=0;r<300&&H.G.ph!=='end';r++){ const me=G.ps[0]; me.bd=ids.map(id=>{const m=mk(id,0); m.a=60; m.h=60; return m;}); me.hp=40; me.disc=null; if(H.G.ph==='recruit') endRecruit(); if(H.G.ph==='combat') endCombat(); } broadcast();}"""); pg.wait_for_timeout(2500)
        res=[]; sweep(pg,'fin',res); rep(res,'fin de partie %dx%d'%(W,Hh))
        # salon
        pg.evaluate("()=>{H.G=null; Net.role='host'; H.code='ABCD'; V.pub={ph:'lobby',pl:[{n:'Romain',pid:0}],us:[],code:'ABCD'}; V.me=null; V.screen='lobby'; render();}"); pg.wait_for_timeout(800)
        res=[]; sweep(pg,'salon',res); rep(res,'salon %dx%d'%(W,Hh))
        print('erreurs',errs[:3]); b.close()
    # taverne en 1280 et 1920
    for W,Hh in [(1280,720),(1920,1080)]:
        b=p.chromium.launch(); pg=b.new_page(viewport={'width':W,'height':Hh}); pg.goto('file:///home/claude/taverne.html'); pg.wait_for_timeout(500); pg.evaluate(SET,'Dragon Ball')
        pg.evaluate("()=>{const me=H.G.ps[0]; while(me.sh.length<7) me.sh.push(mk(me.sh[0].c,0)); while(me.bd.length<7) me.bd.push(mk(me.sh[1].c,0)); while(me.hd.length<8) me.hd.push(mk(me.sh[2].c,0)); broadcast();}"); pg.wait_for_timeout(2700)
        res=[]; sweep(pg,'taverne',res,slow=True); bad=[i for i in res if i.get('out') or i.get('bad') or (i.get('peek') and i.get('len',0)<3)]
        print('== taverne %dx%d'%(W,Hh),len(res),'bulles',sum(1 for i in res if i.get('peek')),'hors écran',[(i['cls'][:14],i['box']) for i in bad][:8]); b.close()
