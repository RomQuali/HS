import json, collections, re, sys
d=json.load(open(sys.argv[1])); rows=d['rows']; print('parties',len(d['len']),'err',d['errs'][:3],'manches moy',round(sum(d['len'])/len(d['len']),1),'min',min(d['len']),'max',max(d['len']))
src=open('/home/claude/parts/engine.js',encoding='utf-8').read()
nm={m.group(1):m.group(2) for m in re.finditer(r"\['((?:nk|tk)_\w+)', '([^']+)', \d",src)}
tr={m.group(1):m.group(2) for m in re.finditer(r"\['(nk_\w+)', '[^']+', \d, '(\w+)'",src)}
tier={m.group(1):int(m.group(2)) for m in re.finditer(r"\['(nk_\w+)', '[^']+', (\d)",src)}
G0=[(m.group(1),m.group(2).replace("\\'","'"),[x.strip().strip("'") for x in m.group(3).split(',')]) for m in re.finditer(r"\{ id:'(\w+)', n:'((?:[^'\\]|\\.)*)', m:\[([^\]]*)\]",src)]
gn={a:(b+(' '+nm[c[0]].split(' ')[0]+'–'+nm[c[1]].split(' ')[0] if b=='Maître et disciple' else '')) for a,b,c in G0}
hn={m.group(1):m.group(2) for m in re.finditer(r"  (nh_\w+): \{[^\n]*?n:'([^']+)'",src)}
def agg(keyf):
    A=collections.defaultdict(list)
    for r in rows:
        for k in keyf(r): A[k].append(r['place'])
    return A
def show(title,A,names,minn=15,top=None):
    L=[(sum(v)/len(v),len(v),sum(1 for x in v if x==1)/len(v),sum(1 for x in v if x<=4)/len(v),k) for k,v in A.items() if len(v)>=minn]
    L.sort(); print('\n==',title)
    if top and len(L)>2*top: L=L[:top]+[None]+L[-top:]
    for x in L:
        if x is None: print('   ...'); continue
        a,n,w,t4,k=x; print(f"  {names.get(k,k)[:36]:36} n={n:4} place {a:.2f} 1er {w*100:4.1f}% top4 {t4*100:4.1f}%")
show('héros',agg(lambda r:[r['hero']]),hn)
def fam(r):
    c=collections.Counter(tr.get(m['c']) for m in r['bd'] if m['c'] in tr)
    return [k for k,v in c.items() if v>=4]
show('famille dominante',agg(fam),{'nk_kon':'Konoha','nk_aka':'Akatsuki','nk_sun':'Suna','nk_oto':'Oto','nk_kir':'Kiri'})
G=agg(lambda r:[g for g in r['gr']]); show('groupes',G,{k:gn[k.split(':')[0]]+' (palier '+k.split(':')[1]+')' for k in G},minn=12)
show('cartes',agg(lambda r:set(m['c'] for m in r['bd'] if m['c'] in tr)),{k:f"{v} (T{tier.get(k,0)})" for k,v in nm.items()},minn=20,top=int(sys.argv[2]) if len(sys.argv)>2 else 12)
show('jetons',agg(lambda r:set(m['c'] for m in r['bd'] if m['c'].startswith('tk_'))),nm,minn=15)
w=[r for r in rows if r['place']==1]; lo=[r for r in rows if r['place']>=5]
f=lambda R,fn: round(sum(fn(r) for r in R)/len(R),2)
print('\nvainqueurs : paliers tf',f(w,lambda r:sum(m['tf'] for m in r['bd'])),'dorés',f(w,lambda r:sum(m['g'] for m in r['bd'])),'groupes',f(w,lambda r:len(r['gr'])),'| places 5-8 :',f(lo,lambda r:sum(m['tf'] for m in r['bd'])),f(lo,lambda r:sum(m['g'] for m in r['bd'])),f(lo,lambda r:len(r['gr'])))
ng=collections.defaultdict(list)
for r in rows: ng[min(len(r['gr']),5)].append(r['place'])
print('place selon nb de groupes',{k:(round(sum(v)/len(v),2),len(v)) for k,v in sorted(ng.items())})
print('jamais vus',[nm[c] for c in tr if not any(m['c']==c for r in rows for m in r['bd'])])
