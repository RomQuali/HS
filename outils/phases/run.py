from playwright.sync_api import sync_playwright
import json,sys
U=sys.argv[1:] or ['South Park','Les Simpson']
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(); errs=[]; pg.on('pageerror',lambda e:errs.append(str(e)[:300]))
    pg.goto('file:///home/claude/taverne.html'); pg.wait_for_timeout(1000); pg.set_default_timeout(900000)
    r=pg.evaluate(open('/tmp/claude-0/t/ph/phases.js').read(),U); b.close()
json.dump(r,open('/tmp/claude-0/t/ph/res_%s.json'%('_'.join(u[:2] for u in U)),'w'),ensure_ascii=False)
rows=r['rows']; ok=lambda x:(all(v>=1 for v in x['strong']) or all(v>=1 for v in x['fragile']) or all(v>=1 for v in x['mixed'])) and x['changed']>0
bad=[x for x in rows if not ok(x)]
print(len(set(x['c'] for x in rows)),'cartes,',len(rows),'effets,',len(bad),'à revoir ; erreurs',len(r['err']),errs[:2])
for e in r['err'][:10]: print('ERR',e)
for x in bad: print('%-22s %-16s %-6s fort %s fragile %s mixte %s chg %d | %s'%(x['n'][:22],x['k'],x['tr'],x['strong'],x['fragile'],x['mixed'],x['changed'],x['txt'][:110]))
