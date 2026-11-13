import sys, base64, io, re, json
from PIL import Image
src='/tmp/claude-0/t/nkimg/x'
MAP={'rock-lee':'nk_lee','sakon-ukon':'nk_sakon'}
TOK={'chien-pain':'tk_cerbere','clone':'tk_kclone','crapaud':'tk_crapaud','gamabunta':'tk_gamabunta','kamatari':'tk_kamatari','karasu':'tk_karasu','katsuyu':'tk_katsuyu','manda':'tk_manda','ninken':'tk_ninken'}
import glob, os
out={}
for f in sorted(glob.glob(src+'/*/*.png')):
    b=os.path.basename(f)[:-4]; d=os.path.basename(os.path.dirname(f))
    if d=='invocations-jetons': k=TOK[b]
    elif d=='transformations': b0=b[:-3]; k=MAP.get(b0,'nk_'+b0)+'_tf1'
    else: k=MAP.get(b,'nk_'+b)
    im=Image.open(f).convert('RGB').resize((256,256),Image.LANCZOS); bio=io.BytesIO(); im.save(bio,'WEBP',quality=80,method=6)
    out[k]='data:image/webp;base64,'+base64.b64encode(bio.getvalue()).decode()
print(len(out), sum(len(v) for v in out.values())//1024,'Ko')
p='/home/claude/parts/heroimg.js'; s=open(p,encoding='utf-8').read()
i=s.find('// ===== Naruto : images fournies (pack de 59) =====')
if i>=0: s=s[:i]
s+="// ===== Naruto : images fournies (pack de 59) =====\nconst NK_PACK = {\n"+''.join("  %s:'%s',\n"%(k,v) for k,v in out.items())+"};\n(function () { const img = src => () => `<rect width=\"100\" height=\"100\" fill=\"#1a120c\"/><image href=\"${src}\" x=\"0\" y=\"0\" width=\"100\" height=\"100\" preserveAspectRatio=\"xMidYMid slice\"/>`; for (const id in NK_PACK) ART[id] = img(NK_PACK[id]); })();\n"
open(p,'w',encoding='utf-8').write(s)
json.dump(sorted(out),open('/tmp/claude-0/t/nkimg/keys.json','w'))
