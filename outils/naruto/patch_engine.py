import re
p='/home/claude/parts/engine.js'; s=open(p,encoding='utf-8').read()
def rep(a,b,n=1):
    global s
    assert a in s, a[:80]
    s=s.replace(a,b,n)
# --- familles
rep("    { id:'n_terre', n:'Iwa', col:'#7a5a3a', bg:'mine', on:true },",
"""    { id:'n_terre', n:'Iwa', col:'#7a5a3a', bg:'mine', on:true },
    { id:'nk_kon', n:'Konoha', sg:'ninja de Konoha', pl:'ninjas de Konoha', col:'#3f9a4a', bg:'colline', on:true },
    { id:'nk_aka', n:'Akatsuki', sg:'membre de l\\'Akatsuki', pl:'membres de l\\'Akatsuki', col:'#c8303a', bg:'vortex', on:true },
    { id:'nk_sun', n:'Suna', sg:'ninja de Suna', pl:'ninjas de Suna', col:'#c8a050', bg:'sqvent', on:true },
    { id:'nk_oto', n:'Oto', sg:'ninja d\\'Oto', pl:'ninjas d\\'Oto', col:'#8a5ac8', bg:'vortex', on:true },
    { id:'nk_kir', n:'Kiri', sg:'ninja de Kiri', pl:'ninjas de Kiri', col:'#2f7ab8', bg:'sqeau', on:true },
    { id:'nk_inv', n:'Invocations', sg:'Invocation', pl:'Invocations', col:'#d88a2a', bg:'colline', on:true },""")
rep("lore:'Cinq villages, un chakra : mêle leurs techniques.', mech:'chakra', tribes:['n_feu', 'n_vent', 'n_eau', 'n_foudre', 'n_terre'] }",
    "lore:'Charge ton chakra : lance les jutsus de tes ninjas, puis transforme-les.', mech:'chakra', tribes:['nk_kon', 'nk_aka', 'nk_sun', 'nk_oto', 'nk_kir'] }")
m=re.search(r"  chakra:\{ n:'Chakra et combos de villages'.*\n", s); assert m
s=s.replace(m.group(0), "  chakra:{ n:'Chakra, jutsus et transformations', ic:'k_spark', d:'Chaque serviteur de ton plateau (invocations comprises) génère 1 chakra au début de ton tour ; il se garde d\\'un tour à l\\'autre, 10 au plus. Chaque ninja porte son jutsu : clique sur la goutte bleue pour le lancer, une fois par tour, pour un coût égal au niveau du ninja. Certains ninjas peuvent aussi se transformer une seule fois, pour un gros coût en chakra : ils gagnent des caractéristiques, un mot-clé, et leur jutsu devient plus fort. Les grosses invocations (Gamabunta, Manda, Katsuyu…) n\\'apparaissent pas en taverne : seuls les jutsus de leurs invocateurs les appellent.' },\n")
rep("const NJV = ['n_feu', 'n_vent', 'n_eau', 'n_foudre', 'n_terre'];", "const NJV = ['nk_kon', 'nk_aka', 'nk_sun', 'nk_oto', 'nk_kir'];")
# --- héros : 20 pouvoirs simples, sans quête d'éveil
a=s.index("  nh_naruto: {"); b=s.index("\n", s.index("  nh_roshi: {"))+1
H=lambda id,pv,mc,n,pwn,rest,tx,st=3: "  %s: {diff:1, stars:%d, fam:NJV, pv:'%s', mc:'%s', n:'%s', pwn:'%s', %s, tx:'%s' },\n"%(id,st,pv,mc,n,pwn,rest,tx)
P=lambda cost,pay,steps: "cost:%d, pay:'%s', pw:{ k:'multi', s:[%s] }"%(cost,pay,steps)
heroes=''.join([
 H('nh_naruto','nk_kon','tok','Naruto Uzumaki','Multi-clonage',P(2,'g',"{ k:'summon', card:'tk_kclone', n:1 }"),'Invoque un Clone de l’ombre 1/1 : il génère du chakra comme tes autres serviteurs.',4),
 H('nh_kakashi','nk_kon','spl','Kakashi Hatake','Ninja copieur',"pw:{ k:'pjutc', n:1 }",'Passif : tes jutsus coûtent 1 chakra de moins (1 au minimum).',4),
 H('nh_jiraiya','nk_kon','tok','Jiraiya','Ermite des crapauds',P(2,'g',"{ k:'summon', card:'tk_crapaud', n:1 }"),'Invoque un Crapaud 2/3.',4),
 H('nh_itachi','nk_aka','cbt','Itachi Uchiha','Tsukuyomi',P(1,'g',"{ k:'foechill', n:2, a:2 }"),'Au prochain combat, 2 serviteurs ennemis perdent 2 ATQ.',5),
 H('nh_sasuke','nk_oto','cbt','Sasuke Uchiha','Chidori',P(1,'g',"{ k:'buffhi', a:2, h:1 }"),'Ton serviteur le plus fort gagne +2/+1.',4),
 H('nh_shikamaru','nk_kon','ckm','Shikamaru Nara','Stratège',"pw:{ k:'pturn', ck:2 }",'Passif : au début de chaque tour, gagne 2 chakra de plus.'),
 H('nh_hashirama','nk_kon','cbt','Hashirama Senju','Mokuton',P(2,'g',"{ k:'kw', kw:'t', n:1, a:1, h:3 }"),'Un de tes serviteurs sans Provocation gagne Provocation et +1/+3.',5),
 H('nh_kushina','nk_kon','cbt','Kushina Uzumaki','Chaînes de scellement',P(4,'ck',"{ k:'kw', kw:'s', n:1 }"),'Un de tes serviteurs sans Bouclier divin gagne Bouclier divin.',5),
 H('nh_gaara','nk_sun','cbt','Gaara','Bouclier de sable',P(1,'g',"{ k:'tkw', kw:'t', n:1, a:0, h:5 }, { k:'tkw', kw:'s', n:1 }"),'Prochain combat : un de tes serviteurs gagne +0/+5 et Provocation, un autre Bouclier divin.',4),
 H('nh_kankuro','nk_sun','tok','Kankuro','Kugutsu',P(2,'g',"{ k:'summon', card:'tk_karasu', n:1 }"),'Invoque une marionnette Karasu 2/2.'),
 H('nh_sasori','nk_aka','cbt','Sasori','Poison de Sasori',P(3,'g',"{ k:'kw', kw:'n', n:1 }"),'Un de tes serviteurs gagne Venimosité.',4),
 H('nh_rasa','nk_sun','eco','Rasa','Poussière d’or',"pw:{ k:'pturn', g:1 }",'Passif : au début de chaque tour, gagne 1 or de plus.',4),
 H('nh_mei','nk_kir','cbt','Mei Terumi','Futton',P(1,'g',"{ k:'foeaoe', d:1 }"),'Au début du prochain combat, inflige 1 dégât à tous les serviteurs ennemis.',4),
 H('nh_haku','nk_kir','cbt','Haku','Miroirs de glace',P(2,'g',"{ k:'kw', kw:'s', n:1 }"),'Un de tes serviteurs sans Bouclier divin gagne Bouclier divin.',4),
 H('nh_bee','nk_kir','cbt','Killer Bee','Rap du Hachibi',P(1,'g',"{ k:'buffr', a:1, h:1, n:2 }"),'Deux fois : un de tes serviteurs aléatoire gagne +1/+1.',4),
 H('nh_kakuzu','nk_aka','eco','Kakuzu','Chasseur de primes',"pw:{ k:'pturn', sell:1 }",'Passif : vendre un serviteur rapporte 1 or de plus.',4),
 H('nh_yugito','nk_kir','cbt','Yugito Nii','Flammes de Matatabi',P(1,'g',"{ k:'fire', d:3 }"),'Au début du prochain combat, 3 dégâts frappent un serviteur ennemi.',4),
 H('nh_omoi','nk_kir','ckm','Omoi','Concentration',P(1,'g',"{ k:'ck', n:2 }"),'Gagne 2 chakra.'),
 H('nh_deidara','nk_aka','dr','Deidara','Art explosif',P(2,'g',"{ k:'drgive', n:1, fx:{ k:'dr_dmg', d:3, n:1 } }"),'Un de tes serviteurs gagne « Râle d’agonie : inflige 3 dégâts à un ennemi aléatoire ».',5),
 H('nh_roshi','nk_kon','ckm','Roshi','Armure de lave',"pw:{ k:'pnktf', n:3 }",'Passif : tes transformations coûtent 3 chakra de moins.',4),
])
s=s[:a]+heroes+s[b:]
# --- cartes
J=lambda nm,fx,tf='': "{ k:'jutsu', nm:'%s', fx:[%s]%s }"%(nm,fx,tf)
TF=lambda c,nm,a,h,kw='',fx='',x='': ", tf:{ c:%d, nm:'%s', a:%d, h:%d%s%s%s }"%(c,nm,a,h,(", kw:'%s'"%kw) if kw else '',(", fx:[%s]"%fx) if fx else '',(", x:[%s]"%x) if x else '')
S=lambda a,h:"{ k:'bc_self', a:%d, h:%d }"%(a,h)
R=lambda a,h,tb='':"{ k:'bc_buff_rand', a:%d, h:%d, tb:'%s' }"%(a,h,tb)
T=lambda a,h,tb='':"{ k:'bc_buff_tribe', a:%d, h:%d, tb:'%s' }"%(a,h,tb)
SU=lambda c,n=1:"{ k:'bc_summon', card:'%s', n:%d }"%(c,n)
DUO=lambda c,a,h:"{ k:'duo', card:'%s', a:%d, h:%d }"%(c,a,h)
LEARN=lambda a,h:"{ k:'jut_self', a:%d, h:%d, tb:'nk_kon' }"%(a,h)
DEV="{ k:'bc_devour' }"
def C(id,n,t,tr,a,h,f,*fx): return "  ['%s', '%s', %d, '%s', %d, %d, '%s', [%s]],\n"%(id,n,t,tr,a,h,f,', '.join(fx))
cards="  // ===== Naruto (refonte) : personnages de l'animé, un jutsu par ninja, transformations au chakra =====\n"+''.join([
 # jetons et invocations
 C('tk_kclone','Clone de l’ombre',0,'nk_kon',1,1,''), C('tk_crapaud','Crapaud du mont Myōboku',0,'nk_inv',2,3,''), C('tk_karasu','Karasu',0,'nk_sun',2,2,''),
 C('tk_ninken','Meute de ninken',0,'nk_inv',4,4,''), C('tk_katsuyu','Katsuyu',0,'nk_inv',3,10,'t'), C('tk_gamabunta','Gamabunta',0,'nk_inv',8,8,''),
 C('tk_manda','Manda',0,'nk_inv',9,6,'n'), C('tk_kamatari','Kamatari',0,'nk_inv',5,3,'w'), C('tk_cerbere','Chien géant de Pain',0,'nk_inv',7,7,'r'),
 # Konoha : maîtres et élèves
 C('nk_konohamaru','Konohamaru',1,'nk_kon',1,2,'',LEARN(1,1),J('Rasengan miniature',S(1,1))),
 C('nk_sakura','Sakura Haruno',1,'nk_kon',1,3,'',J('Ninjutsu médical',R(0,2),TF(5,'Sceau du Byakugō',2,3,'',R(2,3)))),
 C('nk_lee','Rock Lee',2,'nk_kon',3,2,'',LEARN(1,1),J('Lotus recto',S(2,0),TF(6,'Huit Portes',3,2,'w',S(3,1)))),
 C('nk_shikamaru','Shikamaru Nara',2,'nk_kon',2,3,'',J('Manipulation des ombres',"{ k:'bc_inc', n:1 }")),
 C('nk_neji','Neji Hyūga',3,'nk_kon',3,4,'',LEARN(1,1),J('Tourbillon divin',"{ k:'bc_kwself', kw:'s' }")),
 C('nk_kakashi','Kakashi Hatake',4,'nk_kon',4,5,'',J('Invocation : Ninken',SU('tk_ninken'),TF(8,'Mangekyō Sharingan',4,4,'c',SU('tk_ninken')+', '+T(1,1,'nk_inv')))),
 C('nk_gai','Gaï Maito',4,'nk_kon',5,4,'',J('Paon du matin',T(1,1,'nk_kon'),TF(9,'Huitième Porte',6,3,'w',T(2,1,'nk_kon')))),
 C('nk_tsunade','Tsunade',5,'nk_kon',4,7,'',J('Invocation : Katsuyu',SU('tk_katsuyu'),TF(8,'Force centuple',3,6,'r',SU('tk_katsuyu')+', '+T(0,2,'')))),
 C('nk_jiraiya','Jiraiya',5,'nk_kon',5,6,'',J('Invocation : Gamabunta',SU('tk_gamabunta'),TF(9,'Mode Ermite',5,5,'',SU('tk_gamabunta')+', '+T(2,2,'nk_inv')))),
 C('nk_naruto','Naruto Uzumaki',6,'nk_kon',6,6,'',LEARN(2,2),J('Rasengan',S(3,3),TF(10,'Mode Kyūbi',8,8,'w',S(4,4)+', '+T(1,1,'nk_kon')))),
 # Akatsuki : peu nombreux, énormes, en binôme
 C('nk_zetsu','Zetsu',1,'nk_aka',2,2,'',"{ k:'eot_few', n:4, a:1, h:1 }",DUO('nk_tobi',1,1),J('Clone spore',S(1,1))),
 C('nk_tobi','Tobi',1,'nk_aka',1,3,'c',DUO('nk_zetsu',1,1),J('Kamui',S(0,2),TF(10,'Obito démasqué',7,7,'i',S(3,3)))),
 C('nk_deidara','Deidara',2,'nk_aka',3,2,'',"{ k:'dr_dmg', d:3, n:1 }",DUO('nk_sasori',2,1),J('Argile explosive',S(2,0),TF(6,'C4 Karura',2,2,'',S(3,1),"{ k:'dr_aoe', d:2 }"))),
 C('nk_hidan','Hidan',2,'nk_aka',2,3,'r',DUO('nk_kakuzu',1,2),J('Rituel de Jashin',S(1,1),TF(6,'Malédiction sanglante',3,3,'l',S(2,2)))),
 C('nk_sasori','Sasori',3,'nk_aka',3,4,'n',DUO('nk_deidara',1,2),J('Aiguilles empoisonnées',S(1,2),TF(7,'Cent marionnettes',3,3,'s',S(2,3)))),
 C('nk_kakuzu','Kakuzu',3,'nk_aka',3,5,'',"{ k:'die_self', tb:'', a:1, h:1 }",DUO('nk_hidan',1,2),J('Jiongu',S(0,3),TF(7,'Cinq cœurs',3,4,'r',S(1,4)))),
 C('nk_kisame','Kisame Hoshigaki',4,'nk_aka',5,5,'l',DUO('nk_itachi',2,2),J('Samehada',"{ k:'bc_robshop', n:1 }",TF(8,'Fusion avec Samehada',4,5,'',"{ k:'bc_robshop', n:2 }"))),
 C('nk_konan','Konan',4,'nk_aka',4,5,'s',DUO('nk_pain',2,2),J('Danse de papier',"{ k:'bc_kw', kw:'s', n:1 }")),
 C('nk_itachi','Itachi Uchiha',5,'nk_aka',6,5,'',"{ k:'eot_few', n:4, a:2, h:2 }",DUO('nk_kisame',3,3),J('Tsukuyomi',S(2,2),TF(9,'Susano’o',5,6,'i',S(4,4)))),
 C('nk_pain','Pain',6,'nk_aka',7,7,'',DUO('nk_konan',4,4),J('Invocation : Chien géant',SU('tk_cerbere'),TF(10,'Six chemins de Pain',6,6,'',SU('tk_cerbere')+', '+S(3,3)))),
 # Suna : vente et revente
 C('nk_matsuri','Matsuri',1,'nk_sun',1,2,'',"{ k:'sell_gold', n:1 }",J('Jōhyō',S(1,0))),
 C('nk_yashamaru','Yashamaru',1,'nk_sun',2,1,'',"{ k:'sell_buff', a:1, h:1, tb:'nk_sun' }",J('Soins',R(0,1))),
 C('nk_baki','Baki',2,'nk_sun',2,3,'',"{ k:'osell_self', a:1, h:1 }",J('Lame de vent',S(1,0))),
 C('nk_ebizo','Ebizō',2,'nk_sun',1,4,'',"{ k:'sell_ck', n:3 }",J('Conseil des anciens',"{ k:'bc_upd', n:1 }")),
 C('nk_kankuro','Kankurō',3,'nk_sun',3,3,'',J('Marionnette : Karasu',SU('tk_karasu'),TF(7,'Marionnette Sasori',3,3,'',SU('tk_karasu',2)))),
 C('nk_pakura','Pakura',3,'nk_sun',4,3,'',"{ k:'osell_tribe', a:1, h:0, tb:'nk_sun' }",J('Shakuton',S(2,0))),
 C('nk_temari','Temari',4,'nk_sun',5,4,'w',J('Invocation : Kamatari',SU('tk_kamatari'))),
 C('nk_chiyo','Chiyo',4,'nk_sun',3,6,'',J('Transfert de vie',"{ k:'bc_kw', kw:'r', n:1 }")),
 C('nk_rasa','Rasa',5,'nk_sun',4,7,'',"{ k:'osell_ck', n:1 }",J('Sable aurifère',"{ k:'bc_gold', n:2 }")),
 C('nk_gaara','Gaara',6,'nk_sun',6,8,'ts',"{ k:'osell_tribe', a:1, h:1, tb:'nk_sun' }",J('Bouclier de sable',"{ k:'bc_kwself', kw:'s' }",TF(10,'Shukaku',8,8,'',"{ k:'bc_kwself', kw:'s' }, "+T(1,1,'nk_sun')))),
 # Oto : les expériences d'Orochimaru (Engloutir)
 C('nk_zaku','Zaku Abumi',1,'nk_oto',2,1,'',J('Zankūha',S(1,0))),
 C('nk_dosu','Dosu Kinuta',1,'nk_oto',1,3,'',"{ k:'dev_self', a:1, h:1 }",J('Onde sonore',S(0,1))),
 C('nk_tayuya','Tayuya',2,'nk_oto',2,3,'',"{ k:'dev_self', a:1, h:1 }",J('Flûte démoniaque',R(1,1))),
 C('nk_kidomaru','Kidōmaru',2,'nk_oto',3,2,'',J('Toile d’araignée',R(2,0))),
 C('nk_jirobo','Jirōbō',3,'nk_oto',3,5,'t',J('Dévoreur de chakra',DEV)),
 C('nk_sakon','Sakon et Ukon',3,'nk_oto',3,3,'r',J('Parasite',S(1,1),TF(7,'Marque maudite',3,3,'w',S(2,2)))),
 C('nk_kabuto','Kabuto Yakushi',4,'nk_oto',3,6,'',J('Expérience interdite',DEV,TF(8,'Mode Sage du dragon',4,4,'r',DEV+', '+DEV))),
 C('nk_kimimaro','Kimimaro',4,'nk_oto',5,4,'',J('Danse des os',S(2,1),TF(7,'Marque maudite niveau 2',4,4,'',S(3,2),"{ k:'cleave' }"))),
 C('nk_sasuke','Sasuke Uchiha',5,'nk_oto',5,5,'',J('Chidori',S(3,1),TF(9,'Marque maudite niveau 2',5,5,'w',S(4,2)))),
 C('nk_orochimaru','Orochimaru',6,'nk_oto',6,7,'',DEV,J('Invocation : Manda',SU('tk_manda'),TF(10,'Yamata no Orochi',7,7,'r',SU('tk_manda')+', '+DEV))),
 # Kiri : les épéistes de la Brume (Ralliement)
 C('nk_chojuro','Chōjūrō',1,'nk_kir',2,2,'',"{ k:'atk_self', a:1, h:0 }",J('Hiramekarei',S(1,0))),
 C('nk_suigetsu','Suigetsu Hōzuki',1,'nk_kir',1,2,'r',J('Corps liquide',S(0,1))),
 C('nk_ao','Ao',2,'nk_kir',2,3,'',J('Byakugan',R(2,0,'nk_kir'))),
 C('nk_ameyuri','Ameyuri Ringo',2,'nk_kir',3,2,'w',J('Kiba',S(1,0))),
 C('nk_haku','Haku',3,'nk_kir',2,4,'s',J('Miroirs de glace',"{ k:'bc_kw', kw:'s', n:1 }")),
 C('nk_jinpachi','Jinpachi Munashi',3,'nk_kir',4,3,'',"{ k:'dr_dmg', d:4, n:1 }",J('Shibuki',S(2,0))),
 C('nk_zabuza','Zabuza Momochi',4,'nk_kir',5,4,'c',"{ k:'atk_self', a:2, h:1 }",J('Camouflage dans la brume',"{ k:'bc_kw', kw:'c', n:1 }",TF(8,'Démon de Kiri',5,3,'l',"{ k:'bc_kw', kw:'c', n:2 }"))),
 C('nk_mangetsu','Mangetsu Hōzuki',4,'nk_kir',4,5,'',"{ k:'atk_buff_rand', a:1, h:1 }",J('Les sept épées',T(1,0,'nk_kir'))),
 C('nk_mei','Mei Terumi',5,'nk_kir',5,6,'',J('Yōton',T(1,1,'nk_kir'),TF(9,'Futton',4,5,'',T(2,1,'nk_kir'),"{ k:'soc_aoe', d:2 }"))),
 C('nk_yagura','Yagura',6,'nk_kir',6,8,'',"{ k:'aatk_perm', tb:'nk_kir', a:1, h:1 }",J('Miroir d’eau',S(2,3),TF(10,'Sanbi',8,8,'t',S(3,4)))),
])
a="  ['c_nj_kurama',"; i=s.index(a); s=s[:i]+cards+s[i:]
# --- effets
rep("  bc_self:{ tr:'bc'", """  jutsu:{ tr:'jutsu', l:'Jutsu (et transformation)', ps:['nm'], w:1.2, mag:() => 5, txt:(e, k) => jutTxt(e, k) },
  jut_self:{ tr:'jut', l:'Élève : grandir quand un allié lance un jutsu', ps:['a', 'h', 'tb'], w:1.2, mag:e => (e.a + e.h) * 2.5, txt:(e, k) => `Élève : quand un autre ${one(e.tb, 1)} lance un jutsu, gagne ${sign(e.a * k, e.h * k)}.` },
  bc_kwself:{ tr:'bc', l:'Gagner un mot-clé', ps:['kw'], w:1, mag:e => kwCost(e.kw), txt:e => `Cri de guerre : gagne ${(SET.kw[e.kw] || {}).n || ''}.` },
  eot_few:{ tr:'eot', l:'Solitaire : grandir avec peu de serviteurs', ps:['n', 'a', 'h'], w:1.1, mag:e => (e.a + e.h) * 3, txt:(e, k) => `Fin de tour : si tu as ${e.n} serviteurs ou moins, gagne ${sign(e.a * k, e.h * k)}.` },
  sell_buff:{ tr:'sell', l:'Bonus à la famille à la vente', ps:['a', 'h', 'tb'], w:1, mag:e => (e.a + e.h) * 2, txt:(e, k) => `Quand vous le vendez, vos ${one(e.tb)} gagnent ${sign(e.a * k, e.h * k)}.` },
  sell_ck:{ tr:'sell', l:'Chakra à la vente', ps:['n'], w:1, mag:e => e.n, txt:(e, k) => `Quand vous le vendez, gagnez ${e.n * k} chakra.` },
  osell_self:{ tr:'osell', l:'Grandir à chaque vente', ps:['a', 'h'], w:1.2, mag:e => (e.a + e.h) * 3, txt:(e, k) => `Quand tu vends un autre serviteur, gagne ${sign(e.a * k, e.h * k)}.` },
  osell_tribe:{ tr:'osell', l:'Bonus à la famille à chaque vente', ps:['a', 'h', 'tb'], w:1.4, mag:e => (e.a + e.h) * 6, txt:(e, k) => `Quand tu vends un autre serviteur, tes autres ${one(e.tb)} gagnent ${sign(e.a * k, e.h * k)}.` },
  osell_ck:{ tr:'osell', l:'Chakra à chaque vente', ps:['n'], w:1.2, mag:e => e.n * 4, txt:(e, k) => `Quand tu vends un autre serviteur, gagne ${e.n * k} chakra.` },
  dev_self:{ tr:'dev', l:'Grandir quand un allié engloutit', ps:['a', 'h'], w:1.2, mag:e => (e.a + e.h) * 3, txt:(e, k) => `Quand un de tes serviteurs engloutit, gagne ${sign(e.a * k, e.h * k)}.` },
  bc_self:{ tr:'bc'""")
rep("    case 'bc_self': buff(m, A, Hh); break;", """    case 'bc_self': buff(m, A, Hh); break;
    case 'jut_self': if (ctx && ctx !== m && tribeOk(ctx, e.tb)) buff(m, A, Hh); break;
    case 'bc_kwself': if (!has(m, e.kw)) addF(m, e.kw); break;
    case 'eot_few': if (p.bd.length <= e.n) buff(m, A, Hh); break;
    case 'sell_buff': p.bd.filter(x => x !== m && tribeOk(x, e.tb)).forEach(x => buff(x, A, Hh)); break;
    case 'sell_ck': case 'osell_ck': p.ck = Math.min(ckMax(p), (p.ck || 0) + e.n * k); break;
    case 'osell_self': buff(m, A, Hh); break;
    case 'osell_tribe': others().forEach(x => buff(x, A, Hh)); break;
    case 'dev_self': if (ctx !== m) buff(m, A, Hh); break;""")
# --- aides
rep("const LS_CAP = 5;", """const LS_CAP = 5;
// ----- Naruto (refonte) : jutsus (une fois par tour, coût = niveau du ninja) et transformation unique -----
const NJ_RSV = false;      // plus de réservoir ni de combos de villages
const NJ_SPELLS = false;   // plus de sorts en taverne : chaque ninja porte son jutsu
const jutOf = m => (m && C[m.c] && (CD(m.c).fxAll || []).find(e => e.k === 'jutsu')) || null;
const jutFx = (J, tf) => (tf && J.tf && J.tf.fx ? J.tf.fx : J.fx) || [];
const jutBody = (fx, k) => fx.map(o => ET[o.k] ? ET[o.k].txt(o, k).replace(/^Cri de guerre : /, '').replace(/\\.$/, '') : '?').join(' ; ');
function jutTxt(e, k) { const T = e.tf; return `Jutsu · ${e.nm} : ${jutBody(e.fx || [], k)}.` + (T ? ` Transformation · ${T.nm} (${T.c} chakra, une seule fois) : ${sign(T.a * k, T.h * k)}${T.kw ? ', ' + ((SET.kw[T.kw] || {}).n || '') : ''}${(T.x || []).map(o => ET[o.k] ? ', ' + ET[o.k].txt(o, k).replace(/\\.$/, '') : '').join('')}${T.fx ? ' ; son jutsu devient : ' + jutBody(T.fx, k) : ''}.` : ''); }
function jutCost(p, m) { if (!jutOf(m)) return null; return Math.max(1, tierOf(m) - ((htr(p, 'pjutc') || {}).n || 0)); }
function nkTfCost(p, m) { const J = jutOf(m); if (!J || !J.tf || m.tf) return null; return Math.max(1, J.tf.c - ((htr(p, 'pnktf') || {}).n || 0)); }
function jutBlock(G, p, m) { const J = jutOf(m), c = jutCost(p, m); if (!J) return 'Pas de jutsu.'; if (m.ju === G.rd) return 'Jutsu déjà lancé ce tour.'; if ((p.ck || 0) < c) return `Il te faut ${c} chakra (tu en as ${p.ck || 0}).`; const fx = jutFx(J, m.tf); if (fx.length && fx.every(o => o.k === 'bc_summon') && p.bd.length >= 7) return 'Ton plateau est plein.'; return null; }
function doJutsu(G, p, m) { if (jutBlock(G, p, m)) return false; const J = jutOf(m), c = jutCost(p, m); p.ck -= c; m.ju = G.rd; withSrc('Jutsu · ' + J.nm, () => jutFx(J, m.tf).forEach(o => runRecruit0(G, p, m, o))); qAdd(p, 'jutsus'); p.bd.slice().forEach(x => fxOf(x, 'jut').forEach(e => runRecruit(G, p, x, e, m))); checkTriple(G, p); return true; }
function doNkTf(G, p, m) { const J = jutOf(m), c = nkTfCost(p, m); if (c == null || (p.ck || 0) < c) return false; const T = J.tf, k = mult(m); p.ck -= c; m.tf = 1; m.tfn = T.nm; withSrc('Transformation · ' + T.nm, () => buff(m, T.a * k, T.h * k)); if (T.kw && !has(m, T.kw)) addF(m, T.kw); (T.x || []).forEach(o => (m.x = m.x || []).push(Object.assign({ src:T.nm }, o))); qAdd(p, 'nktf'); return true; }
// l'IA : se transforme dès qu'elle le peut, sinon lance ses jutsus du plus cher au moins cher en gardant de quoi se transformer
function botJutsus(G, p) {
  for (let g = 0; g < 7; g++) { const m = p.bd.find(x => nkTfCost(p, x) != null && (p.ck || 0) >= nkTfCost(p, x)); if (!m || !doNkTf(G, p, m)) break; }
  const want = Math.min(...p.bd.map(x => nkTfCost(p, x)).filter(c => c != null), 99), save = want <= 10 && p.bd.length >= 4 ? want : 0;
  p.bd.slice().sort((a, b) => tierOf(b) - tierOf(a)).forEach(m => { const c = jutCost(p, m); if (c != null && !jutBlock(G, p, m) && ((p.ck || 0) - c >= save || (p.ck || 0) >= 10)) doJutsu(G, p, m); });
}""")
# devour : préviens les alliés
rep("qAdd(p, 'devours'); return true; }", "qAdd(p, 'devours'); p.bd.slice().forEach(x => fxOf(x, 'dev').forEach(e => runRecruit(G, p, x, e, m))); return true; }")
# vente : réactions des autres
rep("fxOf(m, 'sell').forEach(e => runRecruit(G, p, m, e));", "fxOf(m, 'sell').forEach(e => runRecruit(G, p, m, e)); p.bd.slice().forEach(x => fxOf(x, 'osell').forEach(e => runRecruit(G, p, x, e, m)));",1)
# ops
rep("  ckm(G, p, a) {", "  jutsu(G, p, a) { const m = p.bd[a.i]; return !!m && doJutsu(G, p, m); },\n  nktf(G, p, a) { const m = p.bd[a.i]; if (!m || !doNkTf(G, p, m)) return false; checkTriple(G, p); return true; },\n  ckm(G, p, a) {")
rep("  if (a.t === 'ckm') {", "  if (a.t === 'jutsu' || a.t === 'nktf') { if (G.ph === 'recruit' && OPS[a.t](G, p, a)) broadcast(); return; }\n  if (a.t === 'ckm') {")
# IA
a="  if (inMechAny(G, 'chakra')) for (let g = 0; g < 7; g++) { const i = p.bd.findIndex(m => !m.awk"; assert a in s
s=s.replace(a,"  if (inMechAny(G, 'chakra')) botJutsus(G, p);\n"+a,1)
# chakra : chaque serviteur du plateau (invocations comprises)
rep("if (inMechAny(G, 'chakra')) { const n = p.bd.filter(m => inMech(G, 'chakra', m)).length;", "if (inMechAny(G, 'chakra')) { const n = p.bd.length;")
rep("{ const el = inMechAny(G, 'chakra') && /^nh_/.test(p.hero)", "{ const el = NJ_RSV && inMechAny(G, 'chakra') && /^nh_/.test(p.hero)")

rep("if (m.med) o.med = 1;", "if (m.med) o.med = 1; if (m.ju) o.ju = m.ju;",1)
open(p,'w',encoding='utf-8').write(s)
