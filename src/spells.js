/* =====================================================================
   SORTS DE TAVERNE — une étagère à sorts dans la taverne, des sorts de
   niveau 1 à 6 et six familles. Nouvelles mécaniques : ciblage,
   enchantements permanents, effets « prochain combat », or différé,
   découverte, métamorphose, sacrifice.
   ===================================================================== */
const SP_TYPES = {
  renf:{ n:'Renfort', col:'#c8963e' }, eco:{ n:'Économie', col:'#4f8a3a' }, arc:{ n:'Arcane', col:'#3f6fb0' },
  ombre:{ n:'Ombre', col:'#5a3d7a' }, comb:{ n:'Combat', col:'#a8322a' }, nat:{ n:'Nature', col:'#3f8a6a' }, nin:{ n:'Technique', col:'#2a5a9a' }, eq:{ n:'Équipement', col:'#8a6a3a' }, cof:{ n:'Coffre', col:'#a8742a' },
};
const SPELLS = {
  sp_pinte:{ n:'Pinte offerte', t:1, c:1, ty:'renf', tg:1, tx:'Donne +2/+1 à un de tes serviteurs.' },
  sp_tournee:{ n:'Nouvelle tournée', t:1, c:0, ty:'eco', tx:'Rafraîchit la taverne gratuitement.' },
  sp_placement:{ n:'Placement prudent', t:1, c:1, ty:'eco', tx:'Au début de ton prochain tour, gagne 2 or.' },
  sp_aube:{ n:'Bénédiction de l\'aube', t:2, c:2, ty:'renf', tg:1, tx:'Donne Bouclier divin à un de tes serviteurs.' },
  sp_chopes:{ n:'Échange de chopes', t:2, c:1, ty:'arc', tg:1, tx:'Échange l\'attaque et la vie d\'un de tes serviteurs.' },
  sp_graine:{ n:'Graine de vigueur', t:2, c:2, ty:'nat', tg:1, tx:'Enchante un serviteur : « Fin de tour : gagne +1/+1 ». L\'enchantement reste pour toute la partie.' },
  sp_rabot:{ n:'Coup de rabot', t:2, c:1, ty:'eco', tx:'Améliorer la taverne coûte 3 or de moins.' },
  sp_souffle:{ n:'Souffle d\'outre-tombe', t:3, c:2, ty:'ombre', tg:1, tx:'Donne Renaissance à un de tes serviteurs.' },
  sp_berserk:{ n:'Rage du berserker', t:3, c:2, ty:'comb', tg:1, tx:'Prochain combat seulement : un de tes serviteurs gagne +4 attaque et Furie des vents.' },
  sp_meta:{ n:'Métamorphose ascendante', t:3, c:2, ty:'arc', tg:1, tx:'Transforme un de tes serviteurs en un serviteur aléatoire d\'un niveau au-dessus.' },
  sp_meute:{ n:'Sang de la meute', t:3, c:3, ty:'renf', tg:1, tx:'Donne +1/+1 à un serviteur et à tous tes serviteurs de sa tribu.' },
  sp_lettre:{ n:'Lettre de recommandation', t:4, c:3, ty:'arc', tx:'Découvre un serviteur d\'un niveau au-dessus de ta taverne : choisis-en un parmi trois.' },
  sp_ruee:{ n:'Ruée vers l\'or', t:4, c:3, ty:'eco', tx:'Gagne 1 or au début de chacun de tes 4 prochains tours.' },
  sp_rituel:{ n:'Sacrifice rituel', t:4, c:0, ty:'ombre', tg:1, tx:'Détruit un de tes serviteurs. Un autre de tes serviteurs, au hasard, gagne son attaque et sa vie.' },
  sp_alchimie:{ n:'Alchimie dorée', t:5, c:5, ty:'arc', tg:1, tx:'Rend doré un de tes serviteurs : il gagne deux fois ses stats de base (comme un triple) et ses effets sont doublés.' },
  sp_tempete:{ n:'Tempête de mana', t:5, c:3, ty:'comb', tx:'Prochain combat seulement : tous tes serviteurs gagnent +3/+3.' },
  sp_reflet:{ n:'Double reflet', t:6, c:4, ty:'arc', tg:1, tx:'Ajoute à ta main une copie exacte d\'un de tes serviteurs, bonus compris.' },
  sp_ascension:{ n:'Ascension', t:6, c:6, ty:'renf', tx:'Donne +2/+2 et Bouclier divin à tous tes serviteurs.' },
  // ----- techniques ninja : achetées en or, lancées avec du chakra (fx = étapes ; awk = bonus après l'Éveil) -----
  // Katon : kinjutsu (payés en PV) et explosions
  nj_souffle:{ el:'feu', n:'Hōsenka no jutsu', t:1, c:1, ck:2, nin:1, ty:'nin', fx:[{ k:'fire', d:3 }], awk:{ tx:'+3 dégâts', fx:[{ k:'fire', d:3 }] }, tx:'Fleurs de phénix : prochain combat, 3 dégâts à l\'ennemi.' },
  nj_boule:{ el:'feu', n:'Gōkakyū no jutsu', t:2, c:2, ck:3, nin:1, ty:'nin', fx:[{ k:'fire', d:5 }], awk:{ tx:'+3 dégâts', fx:[{ k:'fire', d:3 }] }, tx:'Grande boule de feu : prochain combat, 5 dégâts à l\'ennemi.' },
  nj_kporte:{ el:'feu', n:'Kinjutsu : Kaimon', t:3, c:2, ck:0, hp:3, nin:1, ty:'nin', tg:1, fx:[{ k:'tbuff', a:4, h:2 }], awk:{ tx:'+2/+2 de plus', fx:[{ k:'tbuff', a:2, h:2 }] }, tx:'Kinjutsu, coûte 3 PV au lieu du chakra. Porte de l\'ouverture : le serviteur ciblé gagne +4/+2.' },
  nj_kbaku:{ el:'feu', n:'Kinjutsu : Bakuretsu', t:4, c:3, ck:0, hp:4, nin:1, ty:'nin', fx:[{ k:'fire', d:8 }, { k:'tma', a:2, h:0 }], awk:{ tx:'+4 dégâts', fx:[{ k:'fire', d:4 }] }, tx:'Kinjutsu, coûte 4 PV au lieu du chakra. Explosion de chakra : prochain combat, 8 dégâts à l\'ennemi et +2/+0 à tes serviteurs.' },
  nj_deluge:{ el:'feu', n:'Hiden : Amaterasu', t:6, c:5, ck:6, hid:3, nin:1, ty:'nin', fx:[{ k:'fire', d:8 }, { k:'tma', a:3, h:3 }], awk:{ tx:'+2/+2 de plus pour tous', fx:[{ k:'tma', a:2, h:2 }] }, tx:'Hiden : il faut 3 serviteurs Katon. Flammes noires : prochain combat, 8 dégâts à l\'ennemi et +3/+3 à tes serviteurs.' },
  // Fûton : techniques à charger (plus fortes à chaque tour gardées en main)
  nj_permut:{ el:'vent', n:'Kaze no yaiba', t:1, c:1, ck:1, nin:1, ty:'nin', tg:1, fx:[{ k:'tbuff', a:3, h:2 }], awk:{ tx:'+1/+1 de plus', fx:[{ k:'tbuff', a:1, h:1 }] }, tx:'Lame de vent : le serviteur ciblé gagne +3/+2.' },
  nj_porteur:{ el:'vent', n:'Daitoppa', t:2, c:1, ck:2, nin:1, ty:'nin', fx:[{ k:'g', n:2 }, { k:'roll' }], awk:{ tx:'+2 or', fx:[{ k:'g', n:2 }] }, tx:'Grande percée : gagne 2 or et rafraîchis gratuitement la taverne.' },
  nj_rafale:{ el:'vent', n:'Rasengan', t:3, c:2, ck:3, nin:1, ty:'nin', tg:1, fx:[{ k:'tbuff', a:5, h:5 }], awk:{ tx:'+2/+2 de plus', fx:[{ k:'tbuff', a:2, h:2 }] }, tx:'Sphère tourbillonnante : le serviteur ciblé gagne +5/+5.' },
  nj_vbun:{ el:'vent', n:'Kage bunshin no jutsu', t:4, c:3, ck:4, nin:1, ty:'nin', fx:[{ k:'summon', card:'tk_clone', n:2 }, { k:'clones', a:2, h:2 }], awk:{ tx:'tes clones gagnent +1/+1 de plus', fx:[{ k:'clones', a:1, h:1 }] }, tx:'Multi-clonage : invoque 2 Clones de l\'ombre, puis tes clones gagnent +2/+2.' },
  nj_vhiden:{ el:'vent', n:'Hiden : Fūton Rasenshuriken', t:6, c:5, ck:6, hid:3, nin:1, ty:'nin', fx:[{ k:'buffall', a:3, h:2 }, { k:'fire', d:5 }], awk:{ tx:'+1/+1 de plus pour tous', fx:[{ k:'buffall', a:1, h:1 }] }, tx:'Hiden : il faut 3 serviteurs Fûton. Tes serviteurs gagnent +3/+2 et 5 dégâts frappent l\'ennemi au prochain combat.' },
  // Suiton : rouleaux à charges (utilisables plusieurs fois)
  nj_brume:{ el:'eau', n:'Kirigakure no jutsu', t:1, c:1, ck:2, uses:2, nin:1, ty:'nin', fx:[{ k:'tma', a:0, h:2 }], awk:{ tx:'+0/+2 de plus', fx:[{ k:'tma', a:0, h:2 }] }, tx:'Brume cachée, rouleau à 2 usages : prochain combat, tes serviteurs gagnent +0/+2.' },
  nj_doubles:{ el:'eau', n:'Suirō no jutsu', t:2, c:2, ck:2, uses:2, nin:1, ty:'nin', fx:[{ k:'seal', n:1 }, { k:'chill', a:2, n:1 }], awk:{ tx:'scelle un ennemi de plus', fx:[{ k:'seal', n:1 }] }, tx:'Prison aqueuse, rouleau à 2 usages : prochain combat, un ennemi est scellé (perd ses mots-clés) et un ennemi perd 2 attaque.' },
  nj_ehenge:{ el:'eau', n:'Henge no jutsu', t:3, c:2, ck:3, nin:1, ty:'nin', tg:1, fx:[{ k:'henge' }], awk:{ tx:'+2/+2 après la transformation', fx:[{ k:'tbuff', a:2, h:2 }] }, tx:'Métamorphose : transforme le serviteur ciblé en un serviteur de son clan d\'un niveau plus haut, en gardant ses bonus.' },
  nj_vague:{ el:'eau', n:'Suiryūdan no jutsu', t:4, c:3, ck:4, uses:2, nin:1, ty:'nin', fx:[{ k:'buffall', a:1, h:2, tb:'n_eau' }], awk:{ tx:'+1/+1 de plus aux Suiton', fx:[{ k:'buffall', a:1, h:1, tb:'n_eau' }] }, tx:'Dragon aqueux, rouleau à 2 usages : tes serviteurs Suiton gagnent +1/+2.' },
  nj_ehiden:{ el:'eau', n:'Hiden : Suikōdan', t:6, c:5, ck:6, uses:2, hid:3, nin:1, ty:'nin', fx:[{ k:'fire', d:5 }, { k:'buffall', a:2, h:2, tb:'n_eau' }], awk:{ tx:'+3 dégâts', fx:[{ k:'fire', d:3 }] }, tx:'Hiden : il faut 3 serviteurs Suiton. Rouleau à 2 usages : requins d\'eau, 5 dégâts à l\'ennemi au prochain combat et +2/+2 à tes Suiton.' },
  // Raiton : jutsu combinés (bonus si une technique d'une autre nature a été lancée ce tour)
  nj_decharge:{ el:'foudre', n:'Raikyū', t:1, c:1, ck:1, nin:1, ty:'nin', fx:[{ k:'ck', n:2 }], comb:[{ k:'g', n:1 }], awk:{ tx:'+1 chakra', fx:[{ k:'ck', n:1 }] }, tx:'Sphère de foudre : gagne 2 chakra. Combiné : +1 or.' },
  nj_foudre:{ el:'foudre', n:'Chidori', t:2, c:2, ck:3, nin:1, ty:'nin', tg:1, fx:[{ k:'ttmp', a:3, h:0, kw:'v' }], comb:[{ k:'tbuff', a:2, h:0 }], awk:{ tx:'+2 attaque définitive', fx:[{ k:'tbuff', a:2, h:0 }] }, tx:'Mille oiseaux : prochain combat, le serviteur ciblé gagne +3 attaque et Toxique. Combiné : +2 attaque définitive.' },
  nj_oyoroi:{ el:'foudre', n:'Raiton no yoroi', t:3, c:2, ck:3, nin:1, ty:'nin', tg:1, fx:[{ k:'tbuff', a:2, h:2 }, { k:'ttmp', a:0, h:0, kw:'w' }], comb:[{ k:'tkwp', kw:'w' }], awk:{ tx:'+2/+2 de plus', fx:[{ k:'tbuff', a:2, h:2 }] }, tx:'Armure de foudre : le serviteur ciblé gagne +2/+2 et Furie des vents au prochain combat. Combiné : Furie définitive.' },
  nj_sceau:{ el:'foudre', n:'Kirin', t:5, c:4, ck:5, nin:1, ty:'nin', fx:[{ k:'fire', d:6 }], comb:[{ k:'fire', d:4 }], awk:{ tx:'+3 dégâts', fx:[{ k:'fire', d:3 }] }, tx:'Dragon de foudre : prochain combat, 6 dégâts à l\'ennemi. Combiné : +4 dégâts.' },
  nj_ohiden:{ el:'foudre', n:'Hiden : Kuropansā', t:6, c:5, ck:6, hid:3, nin:1, ty:'nin', fx:[{ k:'buffall', a:3, h:1, tb:'n_foudre' }, { k:'tkwn', kw:'w', n:2 }], comb:[{ k:'fire', d:4 }], awk:{ tx:'+1/+1 de plus aux Raiton', fx:[{ k:'buffall', a:1, h:1, tb:'n_foudre' }] }, tx:'Hiden : il faut 3 serviteurs Raiton. Panthère noire : tes Raiton gagnent +3/+1, deux de tes serviteurs ont Furie des vents au prochain combat. Combiné : 4 dégâts à l\'ennemi.' },
  // Doton : mode ermite (bonus si ton chakra est plein ou si tu n'as rien dépensé au tour précédent)
  nj_pierre:{ el:'terre', n:'Doryūheki', t:1, c:1, ck:2, nin:1, ty:'nin', fx:[{ k:'summon', card:'tk_mur', n:1 }], sage:[{ k:'summon', card:'tk_mur', n:1 }], awk:{ tx:'+0/+2 à tes Murs', fx:[{ k:'buffcard', card:'tk_mur', a:0, h:2 }] }, tx:'Mur de terre : invoque un Mur de terre. Mode ermite : en invoque un second.' },
  nj_poing:{ el:'terre', n:'Kengan no jutsu', t:2, c:2, ck:2, nin:1, ty:'nin', tg:1, fx:[{ k:'tpoing' }], sage:[{ k:'tbuff', a:0, h:3 }], awk:{ tx:'+2/+2 de plus', fx:[{ k:'tbuff', a:2, h:2 }] }, tx:'Poing de roc : le serviteur ciblé gagne +1 attaque par tranche de 3 PV (+6 au plus). Mode ermite : +0/+3 avant.' },
  nj_thenge:{ el:'terre', n:'Henge : Iwa', t:3, c:2, ck:3, nin:1, ty:'nin', tg:1, fx:[{ k:'henge' }], sage:[{ k:'tbuff', a:2, h:2 }], awk:{ tx:'+2/+2 après la transformation', fx:[{ k:'tbuff', a:2, h:2 }] }, tx:'Métamorphose de pierre : transforme le serviteur ciblé en un serviteur de son clan d\'un niveau plus haut, en gardant ses bonus. Mode ermite : +2/+2.' },
  nj_invoc:{ el:'terre', n:'Iwa Gōremu', t:4, c:3, ck:4, nin:1, ty:'nin', fx:[{ k:'summon', card:'tk_golem', n:2 }], sage:[{ k:'buffcard', card:'tk_golem', a:2, h:2 }], awk:{ tx:'+1/+2 à tes Golems', fx:[{ k:'buffcard', card:'tk_golem', a:1, h:2 }] }, tx:'Golems de roche : invoque 2 Golems de terre. Mode ermite : tes Golems gagnent +2/+2.' },
  nj_thiden:{ el:'terre', n:'Hiden : Senpō', t:6, c:5, ck:6, hid:3, nin:1, ty:'nin', fx:[{ k:'buffall', a:2, h:3 }], sage:[{ k:'buffall', a:2, h:3 }], awk:{ tx:'+1/+1 de plus pour tous', fx:[{ k:'buffall', a:1, h:1 }] }, tx:'Hiden : il faut 3 serviteurs Doton. Art ermite : tes serviteurs gagnent +2/+3. Mode ermite : encore +2/+3.' },
  // ----- sorts au chakra (univers Ninja) : 1 or à l'achat, lancés au chakra -----
  // Feuille
  cs_hosenka:{ cs:1, bg:'feu', el:'feu', n:'Hōsenka no jutsu', t:1, c:1, ck:2, nin:1, ty:'nin', fx:[{ k:'fire', d:4 }], tx:'Fleurs de phénix : prochain combat, 4 dégâts à l\'ennemi.' },
  cs_kibaku:{ cs:1, bg:'feu', el:'feu', n:'Kibaku fuda', t:2, c:1, ck:2, nin:1, ty:'nin', tg:1, fx:[{ k:'tbuff', a:2, h:0 }, { k:'fire', d:2 }], tx:'Parchemin explosif : le serviteur ciblé gagne +2/+0 et 2 dégâts frappent l\'ennemi au prochain combat.' },
  cs_gokakyu:{ cs:1, bg:'feu', el:'feu', n:'Gōkakyū no jutsu', t:3, c:1, ck:4, nin:1, ty:'nin', fx:[{ k:'fire', d:8 }], tx:'Grande boule de feu : prochain combat, 8 dégâts répartis sur l\'ennemi.' },
  cs_amaterasu:{ cs:1, rare:1, bg:'feu', el:'feu', n:'Amaterasu', t:6, c:1, ck:6, nin:1, ty:'nin', fx:[{ k:'fire', d:14 }], tx:'Rare. Flammes noires : prochain combat, 14 dégâts répartis sur l\'ennemi.' },
  // Sable
  cs_kugutsu:{ cs:1, bg:'vent', el:'vent', n:'Kugutsu no jutsu', t:1, c:1, ck:2, nin:1, ty:'nin', fx:[{ k:'summon', card:'tk_puppet', n:2 }], tx:'Invocation des marionnettes : invoque 2 Marionnettes.' },
  cs_sunatate:{ cs:1, bg:'vent', el:'vent', n:'Suna no tate', t:2, c:1, ck:3, nin:1, ty:'nin', tg:1, fx:[{ k:'tbuff', a:0, h:4 }, { k:'tkwp', kw:'t' }], tx:'Bouclier de sable : le serviteur ciblé gagne +0/+4 et Provocation.' },
  cs_kamaitachi:{ cs:1, bg:'vent', el:'vent', n:'Kamaitachi', t:3, c:1, ck:3, nin:1, ty:'nin', fx:[{ k:'tma', a:2, h:0 }], tx:'Faux du vent : prochain combat, tes serviteurs gagnent +2/+0.' },
  cs_sabaku:{ cs:1, rare:1, bg:'vent', el:'vent', n:'Sabaku taisō', t:6, c:1, ck:6, nin:1, ty:'nin', fx:[{ k:'summon', card:'tk_puppet', n:2 }, { k:'buffall', a:2, h:4 }], tx:'Rare. Funérailles du désert : invoque 2 Marionnettes, puis tes serviteurs gagnent +2/+4.' },
  // Brume
  cs_kiri:{ cs:1, bg:'eau', el:'eau', n:'Kirigakure no jutsu', t:1, c:1, ck:2, nin:1, ty:'nin', fx:[{ k:'tma', a:0, h:2 }], tx:'Brume cachée : prochain combat, tes serviteurs gagnent +0/+2.' },
  cs_shosen:{ cs:1, bg:'eau', el:'eau', n:'Shōsen jutsu', t:2, c:1, ck:2, nin:1, ty:'nin', tg:1, fx:[{ k:'tbuff', a:1, h:4 }], tx:'Paume mystique : le serviteur ciblé gagne +1/+4.' },
  cs_suiro:{ cs:1, bg:'eau', el:'eau', n:'Suirō no jutsu', t:3, c:1, ck:3, nin:1, ty:'nin', fx:[{ k:'seal', n:1 }, { k:'chill', a:2, n:2 }], tx:'Prison aqueuse : prochain combat, un ennemi perd ses mots-clés et deux ennemis perdent 2 attaque.' },
  cs_suikodan:{ cs:1, rare:1, bg:'eau', el:'eau', n:'Suikōdan', t:6, c:1, ck:6, nin:1, ty:'nin', fx:[{ k:'tma', a:2, h:3 }, { k:'tkwn', kw:'s', n:3 }], tx:'Rare. Requins d\'eau : prochain combat, tes serviteurs gagnent +2/+3 et trois d\'entre eux Bouclier divin.' },
  // Nuage
  cs_raikyu:{ cs:1, bg:'foudre', el:'foudre', n:'Raikyū', t:1, c:1, ck:1, nin:1, ty:'nin', fx:[{ k:'g', n:2 }], tx:'Sphère de foudre : gagne 2 or.' },
  cs_chidori:{ cs:1, bg:'foudre', el:'foudre', n:'Chidori', t:2, c:1, ck:3, nin:1, ty:'nin', tg:1, fx:[{ k:'ttmp', a:4, h:0, kw:'v' }], tx:'Mille oiseaux : prochain combat, le serviteur ciblé gagne +4/+0 et Toxique.' },
  cs_bijuchakra:{ cs:1, bg:'foudre', el:'foudre', n:'Bijū no chakra', t:3, c:1, ck:4, nin:1, ty:'nin', fx:[{ k:'winup' }], tx:'Chakra de la bête : tes jinchūriki grandissent comme après une victoire.' },
  cs_bijudama:{ cs:1, rare:1, bg:'foudre', el:'foudre', n:'Bijūdama', t:6, c:1, ck:6, nin:1, ty:'nin', fx:[{ k:'winup' }, { k:'winup' }, { k:'fire', d:6 }], tx:'Rare. Orbe de la bête : tes jinchūriki grandissent deux fois comme après une victoire, et 6 dégâts frappent l\'ennemi.' },
  // Roche
  cs_doryu:{ cs:1, bg:'terre', el:'terre', n:'Doryūheki', t:1, c:1, ck:2, nin:1, ty:'nin', fx:[{ k:'summon', card:'tk_mur', n:1 }], tx:'Mur de terre : invoque un Mur de terre (0/4, Provocation).' },
  cs_kengan:{ cs:1, bg:'terre', el:'terre', n:'Kengan no jutsu', t:2, c:1, ck:2, nin:1, ty:'nin', tg:1, fx:[{ k:'tpoing' }], tx:'Poing de roc : le serviteur ciblé gagne +1 attaque par tranche de 3 PV (+6 au plus).' },
  cs_iwa:{ cs:1, bg:'terre', el:'terre', n:'Iwa gōremu', t:3, c:1, ck:4, nin:1, ty:'nin', fx:[{ k:'summon', card:'tk_golem', n:2 }], tx:'Golems de roche : invoque 2 Golems de terre (2/3, Provocation).' },
  cs_chokei:{ cs:1, rare:1, bg:'terre', el:'terre', n:'Chōkeijūgan', t:6, c:1, ck:6, nin:1, ty:'nin', fx:[{ k:'buffall', a:1, h:6 }, { k:'summon', card:'tk_mur', n:2 }], tx:'Rare. Roche ultra-lourde : tes serviteurs gagnent +1/+6, puis invoque 2 Murs de terre.' },
  // Neutres
  cs_shunshin:{ cs:1, n:'Shunshin no jutsu', t:1, c:1, ck:1, nin:1, ty:'nin', fx:[{ k:'roll' }], tx:'Déplacement éclair : rafraîchis gratuitement la taverne.' },
  cs_kawarimi:{ cs:1, n:'Kawarimi no jutsu', t:1, c:1, ck:2, nin:1, ty:'nin', fx:[{ k:'uc', n:2 }], tx:'Permutation : améliorer la taverne coûte 2 or de moins.' },
  cs_kuchiyose:{ cs:1, n:'Kuchiyose no jutsu', t:2, c:1, ck:3, nin:1, ty:'nin', fx:[{ k:'disc' }], tx:'Invocation : découvre un serviteur d\'un niveau au-dessus de ta taverne.' },
  cs_henge:{ cs:1, n:'Henge no jutsu', t:3, c:1, ck:3, nin:1, ty:'nin', tg:1, fx:[{ k:'henge' }], tx:'Métamorphose : transforme le serviteur ciblé en un serviteur de son village d\'un niveau plus haut, bonus gardés.' },
  cs_kagebunshin:{ cs:1, n:'Kage bunshin no jutsu', t:4, c:1, ck:4, nin:1, ty:'nin', fx:[{ k:'summon', card:'tk_clone', n:2 }, { k:'clones', a:1, h:1 }], tx:'Multi-clonage : invoque 2 Clones de l\'ombre, puis tes clones gagnent +1/+1.' },
  // ----- techniques interdites : seulement après l'Éveil des clans -----
  nj_x_cinq:{ el:'feu', n:'Hachimon Tonkō', t:5, c:5, ck:9, nin:1, forb:1, ty:'nin', tx:'Technique interdite, les huit portes. Prochain combat : tous tes serviteurs gagnent +6/+6 et 6 dégâts frappent l\'ennemi au début du combat.' },
  nj_x_sceau:{ el:'terre', n:'Shiki Fūjin', t:5, c:4, ck:8, nin:1, forb:1, ty:'nin', tg:1, tx:'Technique interdite. Le serviteur ciblé gagne +10/+10 ; un autre de tes serviteurs aléatoire est détruit.' },
  nj_x_eveil:{ el:'eau', n:'Senpō : mode ermite', t:5, c:4, ck:7, nin:1, forb:1, ty:'nin', fx:[{ k:'buffall', a:3, h:3 }, { k:'ck', n:3 }], tx:'Technique interdite. Tes serviteurs gagnent +3/+3 et tu récupères 3 chakra.' },
  // ----- équipements (pour le compagnon) et coffres (ouverts au chakra) -----
  eq_lame:{ n:'Lame de chakra', t:1, c:0, item:1, eq:1, ty:'eq', tg:1, tx:'Équipe ton compagnon : +4 attaque.' },
  eq_armure:{ n:'Armure de mailles', t:1, c:0, item:1, eq:1, ty:'eq', tg:1, tx:'Équipe ton compagnon : +6 vie et Provocation.' },
  eq_gants:{ n:'Gantelets du vent', t:1, c:0, item:1, eq:1, ty:'eq', tg:1, tx:'Équipe ton compagnon : +2/+2 et Furie des vents.' },
  eq_bandeau:{ n:'Bandeau du maître', t:2, c:0, item:1, eq:1, ty:'eq', tg:1, tx:'Équipe ton compagnon : « Fin de tour : gagnez 2 chakra ».' },
  eq_cape:{ n:'Cape d\'ombre', t:2, c:0, item:1, eq:1, ty:'eq', tg:1, tx:'Équipe ton compagnon : Bouclier divin et Renaissance.' },
  eq_parchemin:{ n:'Parchemin jumeau', t:2, c:0, item:1, eq:1, ty:'eq', tg:1, tx:'Équipe ton compagnon : chaque combo lui donne aussi +2/+2.' },
  eq_talisman:{ n:'Talisman des cycles', t:2, c:0, item:1, eq:1, ty:'eq', tg:1, tx:'Équipe ton compagnon : ses bonus d\'élément sont doublés.' },
  cf_bois:{ n:'Coffre de bois', t:1, c:0, ck:2, item:1, ty:'cof', tx:'Coffre mineur, reçu après une égalité ou une défaite (taverne de niveau 1 à 4). Ouvre-le avec 2 chakra : un équipement commun.' },
  cf_argent:{ n:'Coffre d\'argent', t:1, c:0, ck:4, item:1, ty:'cof', tx:'Reçu après une victoire (taverne 1 à 3), ou après une défaite avec une taverne de niveau 5 ou plus. Ouvre-le avec 4 chakra : un équipement aléatoire, rare compris.' },
  cf_or:{ n:'Coffre d\'or', t:1, c:0, ck:6, item:1, ty:'cof', tx:'Reçu après une victoire avec une taverne de niveau 4 ou plus. Ouvre-le avec 6 chakra : deux équipements rares.' },
};
const SPELL_IDS = Object.keys(SPELLS);
function drawSpell(t, el) { const nin = typeof H !== 'undefined' && H.G && inMechAny(H.G, 'chakra');
  if (nin && !NJ_TECH) { const ids = SPELL_IDS.filter(id => SPELLS[id].cs && SPELLS[id].t <= t); const w = ids.map(id => SPELLS[id].rare ? 0.35 : 1), tot = w.reduce((a, b) => a + b, 0); let r = Math.random() * tot; for (let i = 0; i < ids.length; i++) { r -= w[i]; if (r <= 0) return { sp:ids[i], u:UID++ }; } return ids.length ? { sp:ids[0], u:UID++ } : null; } const ev = typeof H !== 'undefined' && H.G && H.G.eveil; const ids = SPELL_IDS.filter(id => SPELLS[id].t <= t && !SPELLS[id].item && !!SPELLS[id].nin === !!nin && (!SPELLS[id].forb || ev) && (!el || SPELLS[id].el === el)); return ids.length ? { sp:pickR(ids), u:UID++ } : null; }

// pourquoi un sort ne peut pas être lancé (null = il peut)
function spellBlock(p, id, tgt) {
  const S = SPELLS[id];
  if (S.ck && (p.ck || 0) < ckCost(p, S)) return `Il te faut ${ckCost(p, S)} chakra pour lancer cette technique (tu en as ${p.ck || 0}).`;
  if (S.tg && !tgt) return 'Choisis un de tes serviteurs.';
  if (S.hid && p.bd.filter(m => tribeOk(m, 'n_' + S.el)).length < S.hid) return `Hiden : il faut ${S.hid} serviteurs ${ELS[S.el] ? ELS[S.el].n : ''} sur ton plateau.`;
  if (S.hp && p.hp <= S.hp) return `Kinjutsu : il te faut plus de ${S.hp} PV.`;
  if (S.nin && S.fx && S.fx.some(s => s.k === 'summon') && p.bd.length >= 7) return 'Ton plateau est plein.';
  if ((id === 'nj_doubles' || id === 'nj_invoc') && p.bd.length >= 7) return 'Ton plateau est plein.';
  if (S.eq && !(C[tgt.c] && C[tgt.c].comp)) return 'Un équipement se pose sur ton compagnon.';

  if (S.eq && (tgt.eq || []).includes(id)) return 'Ton compagnon porte déjà cet équipement.';
  if (id.startsWith('cf_') && p.hd.length > 10) return 'Ta main est pleine.';
  if (id === 'nj_rafale' && !p.bd.length) return 'Tu n\'as aucun serviteur.';
  if (id === 'nj_invoc' && p.bd.length >= 7) return 'Ton plateau est plein.';
  if (id === 'sp_chopes' && tgt.a < 1) return 'Ce serviteur n\'a pas d\'attaque à échanger.';
  if (id === 'sp_rabot' && p.t >= 6) return 'Ta taverne est déjà au niveau maximum.';
  if (id === 'sp_meta' && tierOf(tgt) >= 6) return 'Ce serviteur est déjà au niveau maximum.';
  if (id === 'sp_rituel' && p.bd.length < 2) return 'Il faut un autre serviteur pour recevoir ses stats.';
  if (id === 'sp_alchimie' && (tgt.g)) return 'Ce serviteur ne peut pas devenir doré.';
  if (id === 'sp_reflet' && p.hd.length > 10) return 'Ta main est pleine.';
  if ((id === 'sp_tempete' || id === 'sp_ascension') && !p.bd.length) return 'Tu n\'as aucun serviteur.';
  return null;
}
// pose un équipement sur un compagnon (zone d'entraînement)
function applyEquip(tgt, id) {
  switch (id) {
    case 'eq_lame': buff(tgt, 4, 0); break;
    case 'eq_armure': buff(tgt, 0, 6); addF(tgt, 't'); break;
    case 'eq_gants': buff(tgt, 2, 2); addF(tgt, 'w'); break;
    case 'eq_bandeau': (tgt.x = tgt.x || []).push({ k:'eot_chakra', n:2, src:'Bandeau du maître' }); break;
    case 'eq_cape': addF(tgt, 's'); addF(tgt, 'r'); break;
    case 'eq_parchemin': (tgt.x = tgt.x || []).push({ k:'combo_self', a:2, h:2, src:'Parchemin jumeau' }); break;
  }
  (tgt.eq = tgt.eq || []).push(id);
}
// amélioration d'un équipement déjà obtenu (niveau 2 à 5) : bonus ajouté à chaque niveau
const EQ_UP = { eq_lame:{ a:2, h:0 }, eq_armure:{ a:0, h:3 }, eq_gants:{ a:1, h:1 }, eq_bandeau:{ ck:1 }, eq_cape:{ a:1, h:2 }, eq_parchemin:{ a:1, h:1 }, eq_talisman:{ a:2, h:2 } };
const EQ_MAXLV = 5;
function eqUpgrade(tgt, id) { const u = EQ_UP[id] || {}; if (u.a || u.h) buff(tgt, u.a || 0, u.h || 0); if (u.ck) (tgt.x = tgt.x || []).push({ k:'eot_chakra', n:u.ck, src:'Amélioration · ' + SPELLS[id].n }); }
// bonus total d'un équipement à un niveau donné (affiché au survol du compagnon)
function eqBonusTx(id, lv) {
  const u = EQ_UP[id] || {}, n = Math.max(0, (lv || 1) - 1), base = { eq_lame:'+4 attaque', eq_armure:'+6 vie et Provocation', eq_gants:'+2/+2 et Furie des vents', eq_bandeau:'Fin de tour : +2 chakra', eq_cape:'Bouclier divin et Renaissance', eq_parchemin:'Chaque combo : +2/+2', eq_talisman:'Bonus d\'élément doublés' }[id] || '';
  const extra = []; if (n && (u.a || u.h)) extra.push(`+${u.a * n}/+${u.h * n}`); if (n && u.ck) extra.push(`+${u.ck * n} chakra par tour`);
  return base + (extra.length ? ' · amélioration ' + extra.join(', ') : '');
}
const EQ_COST = id => ['eq_lame', 'eq_armure', 'eq_gants'].includes(id) ? 2 : 3;
// ----- techniques ninja : moteur à étapes -----
const sageOn = p => (p.ck || 0) >= ckMax(p) || !p.ckSpentLast;
function techRun(G, p, S, it, tgt, tg, sage) {
  const x = S.chg ? 1 + Math.min(2, (it && it.ch) || 0) : 1;
  techSteps(G, p, S.fx, tgt, tg, x);
  if (S.comb && (p.castEls || []).some(e => e !== S.el)) withSrc('Jutsu combiné', () => techSteps(G, p, S.comb, tgt, tg, 1));
  if (S.sage && sage) withSrc('Mode ermite', () => techSteps(G, p, S.sage, tgt, tg, 1));
}
function techSteps(G, p, steps, tgt, tg, x) {
  const tmp = (m, a, h, kw) => { m.tmp = { a:((m.tmp && m.tmp.a) || 0) + a, h:((m.tmp && m.tmp.h) || 0) + h, f:((m.tmp && m.tmp.f) || '') + (kw || ''), s:BSRC || 'Technique' }; };
  for (const s of steps || []) {
    const a = (s.a || 0) * x, h = (s.h || 0) * x;
    switch (s.k) {
      case 'fire': p.njf = (p.njf || 0) + s.d * x; break;
      case 'firebraise': { const b = p.braise || 0; p.lastBraise = b; p.braise = 0; mkSync(p); p.njf = (p.njf || 0) + Math.max(2, b * 2); break; }
      case 'firebraise1': p.njf = (p.njf || 0) + (p.lastBraise || 0); break;
      case 'mk': mkAdd(p, s.el, s.n * x); break;
      case 'ck': p.ck = Math.min(ckMax(p), (p.ck || 0) + s.n * x); break;
      case 'g': p.g += s.n * x; break;
      case 'roll': p.fz = false; fillShop(G, p); trigBoard(G, p, 'roll'); break;
      case 'tma': p.tma = { a:((p.tma && p.tma.a) || 0) + a, h:((p.tma && p.tma.h) || 0) + h }; break;
      case 'buffall': p.bd.filter(m => tribeOk(m, s.tb)).forEach(m => buff(m, a, h)); break;
      case 'buffcard': p.bd.filter(m => m.c === s.card).forEach(m => buff(m, a, h)); break;
      case 'clones': p.bd.filter(m => m.c === 'tk_clone').forEach(m => buff(m, a, h)); break;
      case 'tbuff': if (tgt) buff(tgt, a, h); break;
      case 'ttmp': if (tgt) tmp(tgt, a, h, s.kw); break;
      case 'tkwp': if (tgt) addF(tgt, s.kw); break;
      case 'tkwn': shuffle(p.bd.filter(m => !has(m, s.kw))).slice(0, s.n).forEach(m => tmp(m, 0, 0, s.kw)); break;
      case 'tpoing': if (tgt) buff(tgt, Math.min(6, Math.floor(tgt.h / 3)), 0); break;
      case 'summon': for (let i = 0; i < s.n * x; i++) if (p.bd.length < 7) recruitSummon(p, s.card, 0, tgt || p.bd[p.bd.length - 1]); break;
      case 'marx': { const v = Math.min(3, Math.floor((p.maree || 0) / 3)) * x; if (v) p.bd.filter(m => tribeOk(m, 'n_eau')).forEach(m => buff(m, v, v)); break; }
      case 'seal': p.foe = p.foe || {}; p.foe.seal = (p.foe.seal || 0) + s.n * x; break;
      case 'chill': p.foe = p.foe || {}; p.foe.chill = (p.foe.chill || []).concat(Array(s.n * x).fill(s.a)); break;
      case 'henge': if (tgt) { const i = p.bd.indexOf(tgt), t = Math.min(6, tierOf(tgt) + 1), tb = tribe(tgt); const nm = drawOne(G, 6, t, tb) || drawOne(G, 6, t) || drawAny(t); if (nm && i >= 0) { const b0 = CD(tgt.c); nm.a += Math.max(0, tgt.a - b0.a * (tgt.g ? 3 : 1)); nm.h += Math.max(0, tgt.h - b0.h * (tgt.g ? 3 : 1)); if (tgt.g) { nm.g = 1; nm.a += CD(nm.c).a * 2; nm.h += CD(nm.c).h * 2; } toPool(G, tgt); p.bd[i] = nm; tgt = nm; } } break;
      case 'comp': comps(p).forEach(c => buff(c, a, h)); break;
      case 'winup': winUp(p); break;
      case 'uc': p.uc = Math.max(0, (p.uc || 0) - s.n); break;
      case 'disc': { const t = Math.min(6, p.t + 1), opts = []; for (let i = 0; i < 3; i++) { const m = drawOne(G, 6, t) || drawAny(t); if (m) opts.push(m); } if (opts.length) p.disc = opts; break; }
    }
  }
}
// effets « prochain combat » sur le plateau adverse (sceaux, entraves)
function foeApply(p, board) {
  const f = p && p.foe; if (!f || !board) return;
  const live = () => board.filter(m => m.h > 0);
  for (let i = 0; i < (f.seal || 0); i++) { const o = live().filter(m => (m.f || '').length); if (!o.length) break; pickR(o).f = ''; }
  (f.chill || []).forEach(v => { const o = live(); if (o.length) { const t = pickR(o); t.a = Math.max(0, t.a - v); } });
}
function castSpell(G, p, hi, tg) { const it = p.hd[hi], S0 = it && SPELLS[it.sp]; const ok = withSrc(S0 ? 'Sort : ' + S0.n : BSRC, () => castSpell0(G, p, hi, tg)); if (ok && inMechAny(G, 'resonance')) withSrc('Résonance', () => { const c = p.bd.filter(m => inMech(G, 'resonance', m)); for (let k = 0; k < 2 && c.length; k++) buff(c.splice(Math.floor(Math.random() * c.length), 1)[0], 1, 1); }); return ok; }
function castSpell0(G, p, hi, tg) {
  const id = p.hd[hi].sp, S = SPELLS[id]; if (!S) return false;
  const tgt = S.tg ? p.bd[tg] : null;
  if (spellBlock(p, id, tgt)) return false;
  const it0 = p.hd.splice(hi, 1)[0];
  const sage0 = S.nin && S.sage ? sageOn(p) : false;
  if (S.ck) { p.ck = (p.ck || 0) - ckCost(p, S); if (ckCost(p, S) > 0) p.ckSpent = 1; }
  if (S.hp) p.hp = Math.max(1, p.hp - S.hp);
  if (S.nin && (HEROES[p.hero] && HEROES[p.hero].pw && HEROES[p.hero].pw.k === 'ptechc') && !(p.rsv || []).length) p.g += 1;
  p.lastCast = id;
  if (S.nin && S.fx) techRun(G, p, S, it0, tgt, tg, sage0);
  else switch (id) {
    case 'sp_pinte': buff(tgt, 2, 1); break;
    case 'sp_tournee': p.fz = false; fillShop(G, p); trigBoard(G, p, 'roll'); break;
    case 'sp_placement': p.inc = p.inc || []; p.inc[0] = (p.inc[0] || 0) + 2; break;
    case 'sp_aube': addF(tgt, 's'); break;
    case 'sp_chopes': { const a = tgt.a; tgt.a = tgt.h; tgt.h = a; break; }
    case 'sp_graine': (tgt.x = tgt.x || []).push({ k:'eot_self', a:1, h:1, src:'Graine de vigueur' }); break;
    case 'sp_rabot': p.uc = Math.max(0, p.uc - 3); break;
    case 'sp_souffle': addF(tgt, 'r'); break;
    case 'sp_berserk': tgt.tmp = { a:((tgt.tmp && tgt.tmp.a) || 0) + 4, h:(tgt.tmp && tgt.tmp.h) || 0, f:'w', s:'Rage du berserker' }; break;
    case 'sp_meta': {
      const nm = drawOne(G, 6, Math.min(6, tierOf(tgt) + 1)) || drawAny(Math.min(6, tierOf(tgt) + 1));
      if (!nm) { p.hd.splice(hi, 0, { sp:id, u:UID++ }); return false; }
      if (tgt.g) { nm.g = 1; nm.a *= 3; nm.h *= 3; }
      toPool(G, tgt); p.bd[tg] = nm; break;
    }
    case 'sp_meute': { const tr = tribe(tgt); buff(tgt, 1, 1); if (tr !== 'neu') p.bd.forEach(x => { if (x !== tgt && tribe(x) === tr) buff(x, 1, 1); }); break; }
    case 'sp_lettre': {
      const t = Math.min(6, p.t + 1), opts = [];
      for (let k = 0; k < 3; k++) { const m = drawOne(G, 6, t) || drawAny(t); if (m) opts.push(m); }
      if (!opts.length) { p.hd.splice(hi, 0, { sp:id, u:UID++ }); return false; }
      p.disc = opts; break;
    }
    case 'sp_ruee': p.inc = p.inc || []; for (let k = 0; k < 4; k++) p.inc[k] = (p.inc[k] || 0) + 1; break;
    case 'sp_rituel': { p.bd.splice(tg, 1); toPool(G, tgt); const o = pickR(p.bd); buff(o, tgt.a, tgt.h); break; }
    case 'sp_alchimie': { const b = CD(tgt.c); tgt.g = 1; tgt.a += b.a * 2; tgt.h += b.h * 2; break; }
    case 'sp_tempete': p.tma = { a:((p.tma && p.tma.a) || 0) + 3, h:((p.tma && p.tma.h) || 0) + 3 }; break;
    case 'sp_reflet': { const c = clone(tgt); c.u = UID++; delete c.tmp; p.hd.push(c); break; }
    case 'nj_permut': p.g += 1; tgt.tmp = { a:(tgt.tmp && tgt.tmp.a) || 0, h:(tgt.tmp && tgt.tmp.h) || 0, f:((tgt.tmp && tgt.tmp.f) || '') + 's', s:'Permutation' }; break;
    case 'nj_souffle': p.njf = (p.njf || 0) + 3; p.braise = (p.braise || 0) + 1; break;
    case 'nj_boule': { const b = p.braise || 0; p.lastBraise = b; p.braise = 0; p.njf = (p.njf || 0) + Math.max(2, b * 2); break; }
    case 'nj_porteur': p.g += 2; p.fz = false; fillShop(G, p); break;
    case 'nj_vague': { p.maree = (p.maree || 0) + 2; const x = Math.floor(p.maree / 2); if (x) p.bd.filter(m => CD(m.c).tr === 'n_eau').forEach(m => buff(m, x, x)); break; }
    case 'nj_decharge': p.charge = (p.charge || 0) + 1; p.ck = Math.min(ckMax(p), (p.ck || 0) + 2); break;
    case 'nj_poing': buff(tgt, Math.min(6, Math.floor(tgt.h / 3)), 0); break;
    case 'nj_pierre': buff(tgt, 0, 4); addF(tgt, 't'); break;
    case 'nj_brume': p.tma = { a:(p.tma && p.tma.a) || 0, h:((p.tma && p.tma.h) || 0) + 3 }; p.maree = (p.maree || 0) + 1; break;
    case 'nj_doubles': { const c = mk(tgt.c, 0); c.a = 1; c.h = 1; p.bd.splice(tg + 1, 0, c); p.maree = (p.maree || 0) + 1; break; }
    case 'nj_foudre': tgt.tmp = { a:((tgt.tmp && tgt.tmp.a) || 0) + 3, h:(tgt.tmp && tgt.tmp.h) || 0, f:((tgt.tmp && tgt.tmp.f) || '') + 'v', s:'Lame de foudre' }; p.charge = (p.charge || 0) + 1; break;
    case 'nj_rafale': shuffle(p.bd.slice()).slice(0, 3).forEach(m => buff(m, 2, 1)); p.g += 1; break;
    case 'nj_invoc': { const m = drawOne(G, p.t) || drawAny(Math.max(1, p.t)); if (m) { buff(m, 0, 3); p.bd.push(m); } break; }
    case 'nj_sceau': buff(tgt, 4, 4); addF(tgt, 'r'); p.charge = (p.charge || 0) + 2; break;
    case 'nj_deluge': p.tma = { a:((p.tma && p.tma.a) || 0) + 4, h:((p.tma && p.tma.h) || 0) + 4 }; p.njf = (p.njf || 0) + 4; p.braise = (p.braise || 0) + 3; break;
    case 'eq_lame': buff(tgt, 4, 0); break;
    case 'eq_armure': buff(tgt, 0, 6); addF(tgt, 't'); break;
    case 'eq_gants': buff(tgt, 2, 2); addF(tgt, 'w'); break;
    case 'eq_bandeau': (tgt.x = tgt.x || []).push({ k:'eot_chakra', n:2, src:'Bandeau du maître' }); break;
    case 'eq_cape': addF(tgt, 's'); addF(tgt, 'r'); break;
    case 'eq_parchemin': (tgt.x = tgt.x || []).push({ k:'combo_self', a:2, h:2, src:'Parchemin jumeau' }); break;
    case 'eq_talisman': break;
    case 'cf_bois': case 'cf_argent': case 'cf_or': {
      const common = ['eq_lame', 'eq_armure', 'eq_gants'], all = Object.keys(SPELLS).filter(k => SPELLS[k].eq), rare = all.filter(k => !common.includes(k));
      if (id === 'cf_bois') p.hd.push({ sp:pickR(common), u:UID++ });
      else if (id === 'cf_or') { for (let i = 0; i < 2; i++) if (p.hd.length < 10) p.hd.push({ sp:pickR(rare), u:UID++ }); }
      else p.hd.push({ sp:pickR(all), u:UID++ });
      break;
    }
    case 'nj_x_cinq': p.tma = { a:((p.tma && p.tma.a) || 0) + 6, h:((p.tma && p.tma.h) || 0) + 6 }; p.njf = (p.njf || 0) + 6; break;
    case 'nj_x_sceau': { buff(tgt, 10, 10); const o = p.bd.filter(x => x !== tgt); if (o.length) { const v = pickR(o); p.bd.splice(p.bd.indexOf(v), 1); toPool(G, v); } break; }
    case 'nj_x_eveil': comps(p).forEach(c => { const need = (XP_LV[Math.min(4, compLv(c) + 1)] || c.xp) - (c.xp || 0); giveXp(c, Math.max(0, need)); giveXp(c, Math.max(0, (XP_LV[Math.min(4, compLv(c))] || c.xp) - (c.xp || 0))); }); break;
    case 'sp_ascension': p.bd.forEach(x => { buff(x, 2, 2); addF(x, 's'); }); break;
  }
  if (S.eq) (tgt.eq = tgt.eq || []).push(id);
  if (S.nin && S.awk && awake(G)) withSrc('Technique éveillée', () => techSteps(G, p, S.awk.fx, tgt, tg, 1));
  else if (S.nin && AWK_TECH[id] && awake(G)) withSrc('Technique éveillée', () => AWK_TECH[id][1](G, p, tgt, tg));
  if (S.nin) { p.castEls = p.castEls || []; if (S.el && !p.castEls.includes(S.el)) p.castEls.push(S.el); }
  if (S.uses) { const left = (it0.us || S.uses) - 1; if (left > 0 && p.hd.length < 10) p.hd.push({ sp:id, u:UID++, us:left }); }
  // réservoir : chaque technique remplit une moitié ; la seconde moitié déclenche le combo et le vide
  if (S.el && S.nin) withSrc('Réservoir', () => rsvFill(G, p, S.el));
  if (S.nin) comps(p).forEach(c => giveXp(c, 1));
  if (S.nin && S.el && !S.item) mkAdd(p, S.el, 1);   // chaque technique donne 1 marqueur de sa nature
  if (S.el) comps(p).forEach(c => { const e = compEl(c); if (e && EL_GEN[e] === S.el) { const x = (c.eq || []).includes('eq_talisman') ? 2 : 1; p.ck = Math.min(CK_MAX, (p.ck || 0) + 2 * x); buff(c, 2 * x, 2 * x); } });
  if (!S.item) { p.castN = (p.castN || 0) + 1; trigBoard(G, p, 'cast'); }
  checkTriple(G, p);
  return true;
}
// un serviteur hors réserve (si la réserve est vide pour ce niveau)
function drawAny(t) { const ids = POOL_IDS.filter(id => C[id].t === t); return ids.length ? mk(pickR(ids), 0) : null; }
// plateau de combat : on ajoute les bonus « prochain combat » sans toucher au vrai plateau
function combatBoard(p) {
  const G = typeof H !== 'undefined' ? H.G : null, aw = awake(G), ninja = G && inMechAny(G, 'chakra');
  const bd = p.bd || [], anyFx = k => bd.some(m => hasFx(m, k));
  const phx = 2 * (anyFx('awk_phoenix') ? 2 : 1), tide = 2 * (anyFx('awk_tsunami') ? 2 : 1);
  return bd.map(m => {
    const c = { ...m }; delete c.tmp;
    if (m.tmp) { c.a += m.tmp.a || 0; c.h += m.tmp.h || 0; if (m.tmp.f) addF(c, m.tmp.f); }
    if (p.tma) { c.a += p.tma.a; c.h += p.tma.h; }
    if (ninja) {
      { const el = CLAN_EL[CD(m.c).tr], t = el && NJ_MK ? mkTier(p, el) : 0; if (t && !(C[m.c] && C[m.c].comp)) { const B = MK_TIER[el][t - 1]; c.a += B[0]; c.h += B[1]; if (B[2]) addF(c, B[2]); } }
      const tr = CD(m.c).tr, k = m.g ? 2 : 1, x = c.x = (c.x || []).slice();
      (CD(m.c).fxAll || []).filter(e => e.k === 'awk_surge').forEach(e => { if ((p.ck || 0) >= 7) { c.a += e.a * k; c.h += e.h * k; } });
      if (aw) {
        if (tr === 'n_feu') { c.a += phx; c.h += phx; addF(c, 'r'); }                       // Phénix
        if (tr === 'n_vent') x.push({ k:'atk_zap', d:1, n:3, src:'Ouragan' });                 // Ouragan
        (CD(m.c).fxAll || []).filter(e => e.k === 'awk_hurricane').forEach(e => x.push({ k:'atk_zap', d:e.d * k, n:3, src:'Ouragan' }));
        if (tide && tr === 'n_eau') { c.a += tide; c.h += tide; }                                                 // Raz-de-marée
        if (tr === 'n_terre') x.push({ k:'soc_dmg', d:Math.max(1, Math.floor(c.h / 4)), n:1, src:'Avalanche' });   // Avalanche
        if (hasFx(m, 'awk_quake')) x.push({ k:'soc_aoe', d:Math.max(1, Math.floor(c.h / 6)), src:'Séisme' });
      }
    }
    return c;
  });
}

/* ---------- IA ---------- */
function aiPlayAll(G, p) {
  for (let guard = 0; guard < 12 && p.bd.length < 7; guard++) {
    const i = p.hd.findIndex(m => !m.sp); if (i < 0) break;
    OPS.play(G, p, { i });
  }
}
const aiBestIndex = (p, list) => { let bi = 0; list.forEach((m, i) => { if (aiScore(p, m) > aiScore(p, list[bi])) bi = i; }); return bi; };
function aiTarget(p, id) {
  const pool = p.bd.map((m, i) => ({ m, i }));
  const by = (f, ok = () => true) => { const c = pool.filter(x => ok(x.m)); if (!c.length) return null; c.sort((a, b) => f(b.m) - f(a.m)); return c[0].i; };
  const S = SPELLS[id] || {}, st = (S.fx || []).map(x => x.k);
  if (st.includes('henge')) return by(m => -tierOf(m) * 10 + m.a + m.h, m => tierOf(m) < 6 && !CD(m.c).tok);
  if (st.includes('tpoing')) return by(m => m.h);
  if (st.includes('ttmp') || id === 'nj_oyoroi') return by(m => m.a + m.h / 2, m => !CD(m.c).tok);
  if (st.includes('tbuff')) return by(m => m.a + m.h + tierOf(m) * 2 + (has(m, 'w') ? 4 : 0), m => !CD(m.c).tok);
  switch (id) {
    case 'sp_aube': return by(m => m.a + m.h, m => !has(m, 's'));
    case 'sp_souffle': return by(m => m.a + m.h, m => !has(m, 'r'));
    case 'sp_berserk': return by(m => m.a, m => !has(m, 'w'));
    case 'sp_meta': return by(m => -tierOf(m) * 10 - m.a - m.h, m => tierOf(m) < 6 && !m.g);
    case 'sp_alchimie': return by(m => CD(m.c).a + CD(m.c).h + tierOf(m) * 3, m => !m.g && !CD(m.c).tok);
    case 'sp_meute': { const cnt = {}; p.bd.forEach(m => { const t = tribe(m); if (t !== 'neu') cnt[t] = (cnt[t] || 0) + 1; }); return by(m => (cnt[tribe(m)] || 0) * 10 + m.a); }
    default: return by(m => m.a + m.h + tierOf(m) * 2);
  }
}
const AI_SKIP = ['sp_chopes', 'sp_rituel'];
// IA : mode ermite — garde une technique Doton et ne dépense pas de chakra ce tour pour la lancer au suivant
function aiSageWait(G, p) { return G.rd < 11 && !sageOn(p) && p.hd.some(x => x.sp && SPELLS[x.sp] && SPELLS[x.sp].sage) && (p.ck || 0) >= 2; }
// IA : une technique vaut-elle d'être lancée maintenant ?
function aiCanCast(G, p, it) {
  const S = SPELLS[it.sp]; if (!S || AI_SKIP.includes(it.sp)) return false;
  if (S.chg && (it.ch || 0) < 2 && G.rd < 12 && p.hd.length < 9) return false;            // on laisse charger
  if (S.hp && p.hp <= S.hp + 8) return false;                                                // kinjutsu : pas trop risqué
  if (S.hid && p.bd.filter(m => tribeOk(m, 'n_' + S.el)).length < S.hid) return false;       // hiden : attendre le clan
  if (p.aiSave && S.ck) return false;                                                        // tour d'économie (mode ermite)
  return true;
}
// ordre : mode ermite d'abord (avant de dépenser), techniques combinées en dernier
function aiCastPrio(G, p, it) { const S = SPELLS[it.sp] || {}; return (S.sage && sageOn(p) ? 30 : 0) + (S.comb ? ((p.castEls || []).some(e => e !== S.el) ? 25 : -10) : 0) + (S.t || 0); }
// achat : pas de hiden sans clan, pas de kinjutsu à petite vie
function aiWantSpell(p, S) { if (S.hid && p.bd.filter(m => tribeOk(m, 'n_' + S.el)).length < Math.max(1, S.hid - 1)) return false; if (S.hp && p.hp <= S.hp + 10) return false; return true; }
function aiSpells(G, p) {
  const bad = new Set();
  for (let guard = 0; guard < 8; guard++) {
    const S = p.sp && SPELLS[p.sp.sp];
    if (S && !AI_SKIP.includes(p.sp.sp) && p.g >= S.c && p.hd.length < 10 && !(S.tg && !p.bd.length) && aiWantSpell(p, S)) OPS.buysp(G, p);
    { const S2 = p.sp2 && SPELLS[p.sp2.sp]; if (S2 && p.g >= S2.c && p.hd.length < 10 && !(S2.tg && !p.bd.length) && aiWantSpell(p, S2)) OPS.buysp(G, p, { k:1 }); }
    let hi = -1, best = -1e9;
    p.hd.forEach((m, i) => { if (!m.sp || bad.has(m.u) || !aiCanCast(G, p, m)) return; const v = aiCastPrio(G, p, m); if (v > best) { best = v; hi = i; } });
    if (hi < 0) break;
    const it = p.hd[hi], id = it.sp, tg = SPELLS[id].tg ? aiTarget(p, id) : null;
    if (!castSpell(G, p, hi, tg)) { bad.add(it.u); continue; }
    if (p.disc) OPS.pick(G, p, { i:aiBestIndex(p, p.disc) });
    aiPlayAll(G, p);
  }
}

/* ---------- illustrations des sorts ---------- */
const NJA = (col, inner) => () => softGlow(50, 52, 34, col, .35) + `<g transform="translate(50 54)">${inner}</g>` + [[-26, -30], [28, -26], [-30, 26], [30, 28]].map(([x, y]) => Ci(50 + x, 54 + y, 1.6, '#fff', 'opacity=".6"')).join('');
const HANDS = `<path d="M-9 14 L-9 -6 Q-9 -14 -3 -16 L-1 -2 M9 14 L9 -6 Q9 -14 3 -16 L1 -2" fill="#f1c7a0" ${so(1.8)}/><path d="M-3 -16 Q0 -20 3 -16 L1 -2 L-1 -2 Z" fill="#f1c7a0" ${so(1.6)}/>`;
const SPART = {
  nj_x_cinq: NJA('#ffffff', ['#ff7a2a', '#6fd8a0', '#ffd23a', '#c8a878', '#4ab0e8'].map((c, k) => { const a = (-90 + k * 72) * Math.PI / 180; return `<circle cx="${(Math.cos(a) * 18).toFixed(1)}" cy="${(Math.sin(a) * 18).toFixed(1)}" r="7" fill="${c}" ${so(1.4)}/>`; }).join('') + `<circle r="7" fill="#2a1a3a" ${so(1.6)}/><path d="M-26 0 H26 M0 -26 V26" stroke="#a8322a" stroke-width="2.4" opacity=".8"/>`),
  nj_x_sceau: NJA('#ff6a6a', `<rect x="-18" y="-24" width="36" height="46" rx="3" fill="#2a1a1a" ${so(2)}/><circle cy="-2" r="11" fill="none" stroke="#ff4a4a" stroke-width="3"/><path d="M6 -2 H-6 M0 4 V-8 M-8 -10 L8 6" stroke="#ff4a4a" stroke-width="3"/>`),
  nj_x_eveil: NJA('#bfe8ff', `<circle r="16" fill="none" stroke="#bfe8ff" stroke-width="3"/><circle r="8" fill="#6fd0ff" ${so(1.6)}/>` + [0, 60, 120, 180, 240, 300].map(a => `<path d="M0 -20 L0 -28" stroke="#e8fcff" stroke-width="3" stroke-linecap="round" transform="rotate(${a})"/>`).join('')),
  eq_lame: NJA('#bfe8ff', `<path d="M-20 20 L16 -16 L22 -22 L18 -12 L-16 24 Z" fill="#d8dce4" ${so(1.8)}/><path d="M-24 12 L-12 24" stroke="#5a3a1a" stroke-width="6" stroke-linecap="round"/><path d="M-4 4 L10 -10" stroke="#6fd0ff" stroke-width="2"/>`),
  eq_armure: NJA('#c8a878', `<path d="M-20 -18 L-8 -22 Q0 -14 8 -22 L20 -18 L18 20 L-18 20 Z" fill="#8a929c" ${so(2)}/>` + [-10, 0, 10].map(y => `<path d="M-16 ${y} H16" stroke="#5a626c" stroke-width="1.6" stroke-dasharray="3 2"/>`).join('')),
  eq_gants: NJA('#e8ffd0', `<path d="M-14 -10 L-14 16 L8 16 L10 -2 L4 -4 L4 -16 L-2 -16 L-2 -8 L-8 -8 L-8 -14 Z" fill="#a8744a" ${so(1.8)}/>` + Ln('M12 -14 Q22 -6 14 4', '#e8ffd0', 2.4)),
  eq_bandeau: NJA('#6fd0ff', `<path d="M-28 -4 Q0 -14 28 -4 L28 4 Q0 -6 -28 4 Z" fill="#2a5a9a" ${so(1.8)}/><rect x="-10" y="-12" width="20" height="13" rx="2" fill="#c8ccd4" ${so(1.6)}/><path d="M28 0 Q34 10 30 20 M24 2 Q28 12 22 20" stroke="#2a5a9a" stroke-width="4" fill="none" stroke-linecap="round"/>`),
  eq_cape: NJA('#b48cff', `<path d="M-10 -20 Q0 -24 10 -20 L22 22 Q0 14 -22 22 Z" fill="#2a2440" ${so(2)}/><path d="M-6 -16 Q0 -12 6 -16" stroke="#b48cff" stroke-width="2" fill="none"/>`),
  eq_parchemin: NJA('#ffe9a8', [-8, 8].map(x => `<g transform="translate(${x} 0)"><rect x="-8" y="-18" width="16" height="34" rx="2" fill="#f4ecd8" ${so(1.6)}/><path d="M-8 -18 H8 M-8 16 H8" stroke="#8a6a3a" stroke-width="4"/></g>`).join('')),
  eq_talisman: NJA('#ffffff', `<circle r="20" fill="#2a2440" ${so(2)}/>` + ['#9be36a', '#ff7a2a', '#ffd23a', '#c8a878', '#4ab0e8'].map((c, k) => { const a = (-90 + k * 72) * Math.PI / 180; return `<circle cx="${(Math.cos(a) * 12).toFixed(1)}" cy="${(Math.sin(a) * 12).toFixed(1)}" r="5" fill="${c}" ${so(1.2)}/>`; }).join('')),
  cf_bois: NJA('#ffd27a', `<rect x="-22" y="-8" width="44" height="26" rx="3" fill="#a8744a" ${so(2)}/><path d="M-22 -8 Q0 -26 22 -8 Z" fill="#8a5a32" ${so(2)}/><rect x="-5" y="-4" width="10" height="10" rx="2" fill="#6fd0ff" ${so(1.4)}/>`),
  cf_argent: NJA('#e8f0ff', `<rect x="-22" y="-8" width="44" height="26" rx="3" fill="#a8b0bc" ${so(2)}/><path d="M-22 -8 Q0 -26 22 -8 Z" fill="#7a828e" ${so(2)}/><rect x="-5" y="-4" width="10" height="10" rx="2" fill="#6fd0ff" ${so(1.4)}/>`),
  cf_or: NJA('#ffe27a', `<rect x="-22" y="-8" width="44" height="26" rx="3" fill="#e2b04e" ${so(2)}/><path d="M-22 -8 Q0 -26 22 -8 Z" fill="#c88a26" ${so(2)}/><rect x="-5" y="-4" width="10" height="10" rx="2" fill="#6fd0ff" ${so(1.4)}/>` + P(starD(18, -18, 5, 2, 4), '#fff1b8', GLOW)),
  nj_permut: NJA('#bfe8ff', `<rect x="-20" y="-14" width="16" height="30" rx="3" fill="#a8744a" ${so(1.8)}/><path d="M-18 -8 H-6 M-18 2 H-6" stroke="#6a4a2a" stroke-width="1.6"/>` + Ln('M-2 0 Q6 -16 16 -4', '#fff', 2.6) + `<circle cx="12" cy="4" r="8" fill="#e8e2da" ${so(1.8)}/><path d="M6 2 Q12 -2 18 2" stroke="#2a2a34" stroke-width="2.4"/>`),
  nj_souffle: NJA('#ffb04a', HANDS + `<path d="M0 -18 C 14 -24 24 -10 34 -14 C 30 -4 22 0 10 -2 C 18 4 10 10 2 6 Z" fill="#ff7a2a" ${so(1.8)}/><path d="M6 -14 C 14 -16 20 -10 26 -12 C 22 -6 16 -6 10 -6 Z" fill="#ffe27a"/>`),
  nj_pierre: NJA('#c8a878', `<path d="M-22 18 L-16 -10 L-4 -20 L10 -16 L22 -2 L18 18 Z" fill="#8a7a6a" ${so(2)}/><path d="M-12 -4 L-2 6 L12 -6 M-4 18 L-2 6" stroke="#5a4e44" stroke-width="2" fill="none"/>`),
  nj_brume: NJA('#bfe8ff', [-14, -2, 10].map((y, k) => `<path d="M-28 ${y} C -14 ${y - 8}, -4 ${y + 6}, 8 ${y - 2} S 24 ${y - 6}, 30 ${y}" fill="none" stroke="#e8f8ff" stroke-width="${5 - k}" stroke-linecap="round" opacity="${.9 - k * .2}"/>`).join('')),
  nj_doubles: NJA('#e8e2da', [-16, 0, 16].map((x, k) => `<g transform="translate(${x} ${k === 1 ? -4 : 2})" opacity="${k === 1 ? 1 : .6}"><circle cy="-8" r="7" fill="#f1c7a0" ${so(1.6)}/><rect x="-8" y="-12" width="16" height="4" fill="#2a5a9a"/><path d="M-9 16 L-7 0 L7 0 L9 16 Z" fill="#2c2e3a" ${so(1.6)}/></g>`).join('')),
  nj_foudre: NJA('#ffe14a', `<path d="M-22 18 L14 -18" stroke="#c8ccd4" stroke-width="5" stroke-linecap="round"/><path d="M-26 22 L-18 14" stroke="#5a3a1a" stroke-width="6" stroke-linecap="round"/><path d="M2 -26 L-6 -4 L4 -4 L-4 16 L12 -10 L2 -10 Z" fill="#ffe14a" ${so(1.6)}/>`),
  nj_rafale: NJA('#e8ffd0', [-14, 0, 14].map(y => `<path d="M-26 ${y + 6} Q0 ${y - 12} 26 ${y}" fill="none" stroke="#f4ffe8" stroke-width="4" stroke-linecap="round"/>`).join('') + `<path d="M18 -4 L30 -2 L20 6 Z" fill="#c8ccd4" ${so(1.4)}/>`),
  nj_invoc: NJA('#ffd27a', `<circle r="22" fill="none" stroke="#fff3c0" stroke-width="2.4"/><circle r="15" fill="none" stroke="#fff3c0" stroke-width="1.4" stroke-dasharray="3 3"/>` + [0, 72, 144, 216, 288].map(a => `<circle cx="${(Math.cos(a * Math.PI / 180) * 22).toFixed(1)}" cy="${(Math.sin(a * Math.PI / 180) * 22).toFixed(1)}" r="3" fill="#fff3c0"/>`).join('') + `<path d="M-10 14 Q0 -18 10 14" fill="#5a3a1a" ${so(1.6)}/>`),
  nj_sceau: NJA('#d8b8ff', `<rect x="-18" y="-24" width="36" height="46" rx="3" fill="#f4ecd8" ${so(2)}/><circle cy="-2" r="11" fill="none" stroke="#a8322a" stroke-width="3"/><path d="M-6 -2 H6 M0 -8 V4" stroke="#a8322a" stroke-width="3"/><path d="M-18 -24 H18 M-18 22 H18" stroke="#8a6a3a" stroke-width="4"/>`),
  nj_boule: NJA('#ffb04a', HANDS + `<circle cx="0" cy="-12" r="15" fill="#ff7a2a" ${so(2)}/><circle cx="-4" cy="-16" r="8" fill="#ffd23a"/><circle cx="-6" cy="-18" r="3" fill="#fff3c0"/>`),
  nj_porteur: NJA('#e8ffd0', [-12, 2].map(y => `<path d="M-28 ${y} Q-6 ${y - 14} 18 ${y - 2} Q26 ${y + 2} 20 ${y + 8}" fill="none" stroke="#f4ffe8" stroke-width="4" stroke-linecap="round"/>`).join('') + `<circle cx="10" cy="14" r="7" fill="#f2c14e" ${so(1.6)}/><circle cx="20" cy="10" r="6" fill="#f2c14e" ${so(1.6)}/>`),
  nj_vague: NJA('#bfe8ff', `<path d="M-28 18 C-20 -6 -2 -22 16 -16 C6 -12 4 -4 12 2 C18 6 26 4 28 0 L28 18 Z" fill="#4ab0e8" ${so(2)}/><path d="M-14 6 C-8 -6 2 -12 10 -12" fill="none" stroke="#dff4ff" stroke-width="3" stroke-linecap="round"/>`),
  nj_decharge: NJA('#ffe14a', `<circle r="14" fill="#6fc8ff" ${so(2)}/><path d="M2 -26 L-8 0 L2 0 L-6 24 L12 -6 L2 -6 Z" fill="#ffe14a" ${so(1.6)}/>`),
  nj_poing: NJA('#c8a878', `<path d="M-18 -14 L14 -16 L20 -4 L18 14 L-14 16 L-20 2 Z" fill="#8a7a6a" ${so(2)}/><path d="M-10 -14 V-4 M0 -15 V-4 M10 -15 V-4" stroke="#5a4e44" stroke-width="2.4"/><path d="M-26 -6 L-34 -10 M-26 4 L-36 4 M-26 12 L-34 16" stroke="#ffd27a" stroke-width="2.6" stroke-linecap="round"/>`),
  nj_deluge: NJA('#ffffff', `<path d="M-6 -22 C 2 -16 2 -10 -4 -6 C -10 -10 -12 -16 -6 -22 Z" fill="#ff7a2a" ${so(1.4)}/><path d="M14 -10 C 18 -4 18 0 14 4 C 10 0 10 -4 14 -10 Z" fill="#6fc8ff" ${so(1.4)}/><path d="M-16 0 L-20 10 L-14 10 L-18 20 L-8 6 L-14 6 Z" fill="#ffe14a" ${so(1.2)}/><path d="M4 12 L10 4 L16 12 Z" fill="#8a7a6a" ${so(1.4)}/><path d="M-4 18 Q4 10 12 18" fill="none" stroke="#e8ffd0" stroke-width="3"/>`),
  sp_pinte: () => softGlow(50, 54, 30, '#ffe39a', .25) + '<g transform="translate(30 30) scale(1.45)">' + P('M0 7 L18 7 L17 29 Q9 32 1 29 Z', '#d99a3e', so()) + Ln('M2.5 13 L15.5 13 M2.5 21 L15.5 21', '#8a5a22', 1.4) + Ln('M18 12 C 27 12, 27 24, 17.4 24', OUT, 5) + Ln('M18 12 C 27 12, 27 24, 17.4 24', '#d99a3e', 2.4) + P('M-2 8 C -3 0, 5 -2, 7 1 C 9 -3, 17 -2, 18 2 C 22 2, 22 8, 19 9 L18 12 C 16 9, 12 10, 9 9 C 6 11, 1 10, -2 8 Z', '#fff8e6', so(1.6)) + E(4, 4, 2, 1.4, '#fff', 'opacity=".9"') + '</g>' + [[24, 30, 2.2], [76, 26, 1.6], [72, 40, 1.2], [28, 44, 1.4]].map(([x, y, r]) => Ci(x, y, r, '#fff8e6', so(0.8))).join('') + P(starD(76, 72, 6, 2.4, 4), '#fff1b8', GLOW),
  sp_tournee: () => P('M14 70 Q50 82 86 70 L84 76 Q50 89 16 76 Z', '#8a5a2b', so()) + [[28, 46], [44, 40], [60, 46]].map(([x, y], k) => `<g transform="translate(${x} ${y}) scale(.95) rotate(${(k - 1) * 8})">` + P('M0 7 L14 7 L13 26 Q7 28 1 26 Z', '#d99a3e', so(1.8)) + Ln('M14 11 C 20 11, 20 21, 13.6 21', OUT, 4) + Ln('M14 11 C 20 11, 20 21, 13.6 21', '#d99a3e', 2) + P('M-1.4 8 C -2 2, 4 1, 6 3 C 8 0, 14 1, 15 4 C 17 5, 16 8, 14.6 8.4 Z', '#fff8e6', so(1.4)) + '</g>').join('') + P(starD(50, 22, 7, 2.4, 4), '#fff1b8', GLOW) + P(starD(24, 26, 3.4, 1.2, 4), '#fff1b8', GLOW) + P(starD(78, 30, 4, 1.4, 4), '#fff1b8', GLOW),
  sp_placement: () => P('M30 52 C 22 62, 22 86, 50 88 C 78 86, 78 62, 70 52 C 66 46, 34 46, 30 52 Z', '#7a4a28', so()) + P('M36 50 C 40 42, 60 42, 64 50 Z', '#5a321c', so(1.8)) + Ln('M38 48 Q50 54 62 48', '#e2b452', 2.6) + P(starD(50, 70, 7, 3, 4), '#e2b452', so(1)) + [[50, 30, 0], [42, 22, -12], [58, 18, 14]].map(([x, y, r]) => `<g transform="translate(${x} ${y}) rotate(${r})">${E(0, 0, 8, 8, '#f2c14e', so(1.8))}${E(0, 0, 5, 5, 'none', 'stroke="#b37c26" stroke-width="1.4"')}</g>`).join('') + Ln('M50 40 L50 46', '#fff1b8', 1.6) + Ln('M76 76 L82 70 L86 74', '#a6e07a', 2.6),
  sp_aube: () => softGlow(50, 64, 30, '#ffe7a0', .5) + Array.from({ length:11 }, (_, k) => { const a = Math.PI + k / 10 * Math.PI; return Ln(`M${f1(50 + Math.cos(a) * 24)} ${f1(66 + Math.sin(a) * 24)} L${f1(50 + Math.cos(a) * 42)} ${f1(66 + Math.sin(a) * 42)}`, '#ffe39a', 2.4, 'opacity=".8"'); }).join('') + P('M10 100 L10 70 Q30 60 50 70 Q70 60 90 70 L90 100 Z', '#6a7f4a', so()) + P('M50 30 L70 38 L68 60 C 66 72, 58 80, 50 84 C 42 80, 34 72, 32 60 L30 38 Z', '#f6ead0', so()) + P('M50 36 L64 42 L62.6 60 C 61 69, 56 75, 50 78 Z', '#e2b452', 'opacity=".8"') + P(starD(50, 56, 7, 3, 8), '#fff6c8', GLOW),
  sp_chopes: () => ['#c8392f', '#3f6fb0'].map((col, k) => `<g transform="translate(${k ? 56 : 22} 34) rotate(${k ? 16 : -16})">` + P('M0 7 L16 7 L15 30 Q8 33 1 30 Z', col, so()) + Ln('M16 12 C 23 12, 23 24, 15.5 24', OUT, 4.4) + Ln('M16 12 C 23 12, 23 24, 15.5 24', col, 2.2) + P('M-1.5 8 C -2 2, 5 1, 7 3 C 9 0, 16 1, 17 4 C 19 5, 18 8, 16.5 8.4 Z', '#fff8e6', so(1.4)) + '</g>').join('') + Ln('M32 20 Q50 8 68 20', '#fff1b8', 2.6) + P('M66 14 L71 21 L63 22 Z', '#fff1b8') + Ln('M68 84 Q50 96 32 84', '#fff1b8', 2.6) + P('M34 90 L29 83 L37 82 Z', '#fff1b8'),
  sp_graine: () => softGlow(50, 60, 26, '#b6ff9a', .3) + P('M18 100 Q50 80 82 100 Z', '#5a3a22', so()) + E(50, 82, 9, 6, '#a8744a', so()) + Ln('M50 78 C 50 64, 46 54, 50 40', '#3f7a2a', 4.4) + Ln('M50 78 C 50 64, 46 54, 50 40', '#6fbf4a', 2.4) + P('M49 58 C 38 56, 30 48, 28 38 C 38 38, 46 44, 49 58 Z', '#7fd05a', so(1.8)) + P('M51 50 C 60 46, 68 38, 70 28 C 60 28, 52 36, 51 50 Z', '#8fe36a', so(1.8)) + Ln('M30 40 Q40 46 48 56 M68 30 Q60 38 52 48', '#3f7a2a', 1.1) + P(starD(50, 34, 6, 2.2, 4), '#fff6c8', GLOW) + [[30, 26], [74, 52], [24, 64]].map(([x, y]) => Ci(x, y, 1.4, '#d9ffcf', GLOW)).join(''),
  sp_rabot: () => '<g transform="translate(50 56) rotate(-12)">' + P('M-30 -4 L30 -4 L34 12 L-34 12 Z', '#b07a43', so()) + P('M-24 -4 C -22 -16, -8 -18, -4 -4 Z', '#7a4a28', so(1.8)) + P('M6 -4 L14 -20 L20 -18 L14 -4 Z', '#9aa3ab', so(1.8)) + Ln('M-30 4 L30 4', '#8a5a2b', 1.2) + '</g>' + Ln('M20 76 C 26 70, 34 72, 32 80 C 30 86, 22 84, 24 78', '#e6c08a', 3) + Ln('M66 78 C 72 72, 80 76, 76 84 C 72 88, 66 84, 70 80', '#e6c08a', 3) + P('M46 30 L50 18 L54 30 Z', '#a6e07a', so(1.4)) + Ln('M50 30 L50 40', '#a6e07a', 3.4) + P('M62 34 L66 22 L70 34 Z', '#a6e07a', so(1.4)) + Ln('M66 34 L66 42', '#a6e07a', 3.4),
  sp_souffle: () => Ln('M30 84 C 10 70, 20 40, 44 46 C 64 50, 60 72, 44 70 C 32 68, 34 54, 46 56', '#9fffd6', 4.2, 'opacity=".85" ' + GLOW) + Ln('M56 30 C 70 24, 84 34, 80 48', '#9fffd6', 2.6, 'opacity=".6"') + '<g transform="translate(66 64)">' + `<rect x="-6" y="-2" width="12" height="20" rx="2" fill="#efe4c8" ${so(1.6)}/>` + Ln('M0 -2 L0 -6', OUT, 1.4) + P('M0 -18 C 4 -12, 4 -8, 0 -6 C -4 -8, -4 -12, 0 -18 Z', '#9fffd6', GLOW) + '</g>' + Ci(42, 58, 1.4, '#fff', GLOW) + Ci(48, 58, 1.4, '#fff', GLOW) + E(45, 63, 1.4, 1.8, '#0d2a2a'),
  sp_berserk: () => softGlow(50, 50, 30, '#ff6a2a', .35) + Ln('M50 92 L50 14', OUT, 6) + Ln('M50 92 L50 14', '#7a4a28', 3.6) + ['M50 22 C 36 14, 22 18, 16 30 C 22 40, 36 42, 50 36 Z', 'M50 22 C 64 14, 78 18, 84 30 C 78 40, 64 42, 50 36 Z'].map(d => P(d, '#c4c9ce', so(2))).join('') + Ln('M20 30 C 24 36, 34 38, 46 34 M80 30 C 76 36, 66 38, 54 34', '#fff', 1.2, 'opacity=".6"') + ['M30 64 C 26 52, 34 46, 34 38 C 40 46, 42 54, 38 64 Z', 'M66 70 C 62 58, 70 52, 70 44 C 76 52, 78 60, 74 70 Z', 'M48 82 C 44 70, 52 64, 52 56 C 58 64, 60 72, 56 82 Z'].map(d => P(d, '#ff8a2a', so(1.4)) ).join(''),
  sp_meta: () => softGlow(50, 52, 30, '#bfe3ff', .35) + P('M50 20 C 64 30, 64 70, 50 86 C 36 70, 36 30, 50 20 Z', '#8a6a9a', so()) + Ln('M42 40 Q50 44 58 40 M41 52 Q50 56 59 52 M43 64 Q50 68 57 64', '#5a3d7a', 1.4) + P('M50 20 L46 34 L52 40 L47 52', 'none', 'stroke="#fff6c8" stroke-width="2.4" stroke-linejoin="round"' + ' ' + GLOW) + ['M50 44 C 34 26, 14 30, 16 44 C 18 58, 36 56, 50 50 Z', 'M50 44 C 66 26, 86 30, 84 44 C 82 58, 64 56, 50 50 Z'].map(d => P(d, '#7fb8ff', so(1.8) + ' opacity=".9"')).join('') + Ci(28, 42, 3, '#fff1b8') + Ci(72, 42, 3, '#fff1b8') + P('M44 96 L50 86 L56 96 Z', '#a6e07a', so(1.2)),
  sp_meute: () => softGlow(50, 54, 30, '#ff8a72', .25) + E(50, 62, 16, 13, '#a8322a', so()) + [[30, 42, 6, 7.5, -20], [42, 32, 6, 8, -6], [58, 32, 6, 8, 6], [70, 42, 6, 7.5, 20]].map(([x, y, rx, ry, r]) => `<g transform="rotate(${r} ${x} ${y})">${E(x, y, rx, ry, '#a8322a', so())}</g>`).join('') + E(46, 58, 4, 2.6, '#ff8a72', 'opacity=".6"') + [[22, 74], [80, 72], [70, 86]].map(([x, y]) => P(`M${x} ${y - 6} C ${x + 3} ${y - 1} ${x + 3} ${y + 3} ${x} ${y + 3} C ${x - 3} ${y + 3} ${x - 3} ${y - 1} ${x} ${y - 6} Z`, '#c8392f', so(1.2))).join(''),
  sp_lettre: () => '<g transform="rotate(-8 50 56)">' + `<rect x="18" y="34" width="64" height="42" rx="3" fill="#f6ead0" ${so()}/>` + Ln('M18 36 L50 60 L82 36', '#b79f72', 2) + Ln('M18 76 L42 56 M82 76 L58 56', '#d9c69c', 1.4) + Ci(50, 60, 8, '#a8322a', so(1.8)) + P(starD(50, 60, 4.4, 2, 5), '#e2b452') + '</g>' + '<g transform="translate(72 20) rotate(30)">' + P('M0 0 C 8 10, 8 30, 2 46 L-1 46 C -4 30, -6 12, 0 0 Z', '#f3ecdc', so(1.6)) + Ln('M0 4 L0 50', '#8a7a62', 1) + '</g>',
  sp_ruee: () => softGlow(50, 40, 26, '#ffe39a', .4) + [[34, 46, 7], [46, 40, 8], [58, 44, 7], [68, 48, 6], [40, 52, 6], [54, 52, 6], [28, 52, 5]].map(([x, y, r]) => P(`M${x - r} ${y} L${x - r * 0.4} ${y - r} L${x + r * 0.6} ${y - r * 0.8} L${x + r} ${y + r * 0.2} L${x + r * 0.2} ${y + r * 0.8} L${x - r * 0.7} ${y + r * 0.6} Z`, '#f2c14e', so(1.4))).join('') + P('M18 50 L82 50 L76 78 L24 78 Z', '#7a5232', so()) + Ln('M22 58 L78 58 M23 68 L77 68', '#5a3a1c', 1.4) + Ci(32, 84, 7, '#5a5f69', so()) + Ci(68, 84, 7, '#5a5f69', so()) + Ci(32, 84, 2, '#c4c9ce') + Ci(68, 84, 2, '#c4c9ce') + P(starD(48, 28, 5, 1.8, 4), '#fffbe6', GLOW),
  sp_rituel: () => P('M14 82 L86 82 L80 98 L20 98 Z', '#3a2f3a', so()) + `<rect x="10" y="76" width="80" height="8" rx="2" fill="#4a3d4a" ${so(1.8)}/>` + [[22, 60], [78, 60]].map(([x, y]) => `<rect x="${x - 4}" y="${y}" width="8" height="16" rx="1.5" fill="#efe4c8" ${so(1.4)}/>` + P(`M${x} ${y - 10} C ${x + 3.4} ${y - 5} ${x + 3} ${y - 2} ${x} ${y - 1} C ${x - 3} ${y - 2} ${x - 3.4} ${y - 5} ${x} ${y - 10} Z`, '#ffb04a', GLOW)).join('') + '<g transform="translate(50 46) rotate(180)">' + P('M-4 -6 L4 -6 L3 -38 L0 -46 L-3 -38 Z', '#c4c9ce', so(1.8)) + P('M-12 -6 L12 -6 L12 -2 L-12 -2 Z', '#5a3d7a', so(1.6)) + P('M-3 -2 L3 -2 L3 12 L-3 12 Z', '#2b2330', so(1.4)) + Ci(0, 14, 3, '#a8322a', so(1)) + '</g>' + P('M50 94 C 53 90, 53 87, 50 84 C 47 87, 47 90, 50 94 Z', '#c8392f', so(1)),
  sp_alchimie: () => softGlow(50, 58, 30, '#ffe39a', .5) + P('M44 18 L56 18 L56 40 C 74 46, 80 66, 70 80 C 64 88, 36 88, 30 80 C 20 66, 26 46, 44 40 Z', '#e8f4f6', so() + ' opacity=".9"') + P('M28 66 C 40 62, 60 70, 72 64 C 74 72, 72 78, 68 82 C 60 88, 40 88, 32 82 C 28 78, 26 72, 28 66 Z', '#f2c14e') + P('M44 18 L56 18 L56 40 C 74 46, 80 66, 70 80 C 64 88, 36 88, 30 80 C 20 66, 26 46, 44 40 Z', 'none', so()) + `<rect x="42" y="12" width="16" height="7" rx="2" fill="#a0703e" ${so(1.6)}/>` + [[44, 74, 2], [54, 70, 1.6], [60, 78, 1.4], [50, 60, 1.2]].map(([x, y, r]) => Ci(x, y, r, '#fff6c8')).join('') + P(starD(76, 30, 6, 2, 4), '#fff1b8', GLOW) + P(starD(24, 36, 4, 1.4, 4), '#fff1b8', GLOW) + Ln('M38 50 C 36 56, 36 60, 38 64', '#fff', 1.6, 'opacity=".7"'),
  sp_tempete: () => softGlow(50, 36, 30, '#9fd8ff', .3) + P('M20 50 C 10 50, 10 34, 22 34 C 22 22, 40 18, 46 28 C 52 16, 74 18, 74 32 C 88 30, 92 50, 78 50 Z', '#5a6a8a', so()) + E(40, 30, 8, 3, '#fff', 'opacity=".2"') + P('M44 48 L36 66 L46 66 L40 88 L60 60 L50 60 L58 48 Z', '#fff1b8', so(1.6) + ' ' + GLOW) + P('M70 50 L66 60 L72 60 L68 72 L78 56 L72 56 L76 50 Z', '#bfe3ff', so(1.2)) + [[22, 62], [28, 76], [82, 70]].map(([x, y]) => Ln(`M${x} ${y} L${x - 3} ${y + 8}`, '#9fd8ff', 1.8)).join(''),
  sp_reflet: () => ['#c8963e', '#3f6fb0'].map((col, k) => `<g transform="translate(${k ? 60 : 40} 50) rotate(${k ? 10 : -10})">` + E(0, -6, 17, 22, col, so()) + E(0, -6, 13, 18, '#cfe9f2', so(1.6)) + E(-4, -14, 4, 7, '#fff', 'opacity=".6"') + `<rect x="-3.6" y="16" width="7.2" height="22" rx="2" fill="${col}" ${so(1.6)}/>` + P(starD(0, -6, 6, 2.6, 5), k ? '#7fb8ff' : '#f2c14e', GLOW) + '</g>').join(''),
  sp_ascension: () => softGlow(50, 46, 34, '#fff1b8', .45) + ['M50 52 C 36 40, 20 42, 8 30 C 14 50, 24 60, 46 62 Z', 'M50 52 C 64 40, 80 42, 92 30 C 86 50, 76 60, 54 62 Z'].map(d => P(d, '#f6f0e0', so(1.8))).join('') + Ln('M14 36 C 24 46, 34 50, 46 56 M86 36 C 76 46, 66 50, 54 56 M20 44 C 28 50, 36 54, 46 58 M80 44 C 72 50, 64 54, 54 58', '#c8b89a', 1.1) + P(starD(50, 40, 14, 5.6, 5), '#f2c14e', so(1.8) + ' ' + GLOW) + Ln('M50 64 L50 92 M42 72 L50 64 L58 72', '#fff1b8', 3),
};
Object.assign(SPART, { cs_hosenka:SPART.nj_souffle, cs_kibaku:SPART.nj_sceau, cs_gokakyu:SPART.nj_boule, cs_amaterasu:SPART.nj_deluge, cs_kugutsu:SPART.nj_doubles, cs_sunatate:SPART.nj_pierre, cs_kamaitachi:SPART.nj_rafale, cs_sabaku:SPART.nj_porteur,
  cs_kiri:SPART.nj_brume, cs_shosen:SPART.nj_vague, cs_suiro:SPART.nj_x_sceau, cs_suikodan:SPART.nj_vague, cs_raikyu:SPART.nj_decharge, cs_chidori:SPART.nj_foudre, cs_bijuchakra:SPART.nj_x_eveil, cs_bijudama:SPART.nj_x_cinq,
  cs_doryu:SPART.nj_pierre, cs_kengan:SPART.nj_poing, cs_iwa:SPART.nj_invoc, cs_chokei:SPART.nj_poing, cs_shunshin:SPART.nj_rafale, cs_kawarimi:SPART.nj_permut, cs_kuchiyose:SPART.nj_invoc, cs_henge:SPART.nj_doubles, cs_kagebunshin:SPART.nj_doubles });
Object.assign(SPART, { nj_kporte:SPART.nj_souffle, nj_kbaku:SPART.nj_deluge, nj_vbun:SPART.nj_doubles, nj_vhiden:SPART.nj_rafale, nj_ehenge:SPART.nj_doubles, nj_ehiden:SPART.nj_vague, nj_oyoroi:SPART.nj_foudre, nj_ohiden:SPART.nj_decharge, nj_thenge:SPART.nj_pierre, nj_thiden:SPART.nj_invoc });
function spellBg(ty) {
  const col = SP_TYPES[ty].col;
  return `<radialGradient id="spbg-${ty}" cx="50%" cy="42%" r="70%"><stop offset="0" stop-color="${shade(col, 0.45)}"/><stop offset=".6" stop-color="${col}"/><stop offset="1" stop-color="${shade(col, -0.55)}"/></radialGradient>`;
}
function buildSpellDefs() {
  let s = Object.keys(SP_TYPES).map(spellBg).join('');
  const runes = [[12, 14], [88, 18], [10, 86], [90, 84]].map(([x, y]) => Ci(x, y, 3.4, 'none', 'stroke="#fff" stroke-width=".8" opacity=".35"') + P(starD(x, y, 2, 0.6, 4), '#fff', 'opacity=".45"')).join('');
  // techniques ninja : le fond prend la couleur de leur nature
  const ELBG = { feu:'#c8401a', vent:'#b8862a', eau:'#1e6ab0', foudre:'#6a4ab8', terre:'#7a5a32' };
  for (const e in ELBG) s += `<radialGradient id="spbg-el-${e}" cx="50%" cy="42%" r="70%"><stop offset="0" stop-color="${shade(ELBG[e], 0.5)}"/><stop offset=".6" stop-color="${ELBG[e]}"/><stop offset="1" stop-color="${shade(ELBG[e], -0.6)}"/></radialGradient>`;
  for (const id in SPELLS) s += `<symbol id="sp-${id}" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice"><rect width="100" height="100" fill="url(#spbg-${SPELLS[id].bg && ELBG[SPELLS[id].bg] ? 'el-' + SPELLS[id].bg : SPELLS[id].el && ELBG[SPELLS[id].el] && !SPELLS[id].item ? 'el-' + SPELLS[id].el : SPELLS[id].ty})"/>${Ci(50, 50, 40, 'none', 'stroke="#fff" stroke-width=".8" stroke-dasharray="2 3" opacity=".35"')}${runes}${SPART[id]()}</symbol>`;
  document.body.insertAdjacentHTML('afterbegin', `<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>${s}${Object.values(SOFT).join('')}</defs></svg>`);
}


/* ---------- univers Ninja : icône de nature et marqueur de chakra ---------- */
// pictogramme d'élément dessiné autour de (0,0), rayon ~8
const EL_ICON = {
  feu:`<path d="M0 -8 C4 -3 6 0 6 3 A6 6 0 0 1 -6 3 C-6 0 -3 -2 -2 -6 C-1 -3 0 -3 0 -8 Z" fill="#ff7a2a" stroke="#120a06" stroke-width="1.4"/><path d="M0 -1 C2 1 3 2 3 3.5 A3 3 0 0 1 -3 3.5 C-3 2 -1 1 0 -1 Z" fill="#ffe14a"/>`,
  vent:`<path d="M-7 -2 C-4 -6 4 -7 6 -3 C7 0 3 2 1 0" fill="none" stroke="#6fd8a0" stroke-width="2.4" stroke-linecap="round"/><path d="M-7 3 H4 Q8 3 7 6.5" fill="none" stroke="#bff0d4" stroke-width="2" stroke-linecap="round"/>`,
  eau:`<path d="M0 -8 C4 -2 6 1 6 3 A6 6 0 0 1 -6 3 C-6 1 -4 -2 0 -8 Z" fill="#4ab0e8" stroke="#120a06" stroke-width="1.4"/><path d="M-3 2 A3 3 0 0 0 0 5" fill="none" stroke="#dff4ff" stroke-width="1.4" stroke-linecap="round"/>`,
  foudre:`<path d="M2.5 -8.5 L-5 1 L-0.5 1 L-3 8.5 L5 -2 L0.5 -2 Z" fill="#ffd23a" stroke="#120a06" stroke-width="1.3" stroke-linejoin="round"/>`,
  terre:`<path d="M-7.5 6 L-4 -3 L0 -7 L4 -3.5 L7.5 6 Z" fill="#c8a878" stroke="#120a06" stroke-width="1.4" stroke-linejoin="round"/><path d="M-1 6 L0 0 L3 -2" fill="none" stroke="#6a5a44" stroke-width="1.2"/>`,
};
// pastille d'élément pour un SVG (cx, cy, rayon)
const elBadgeG = (el, cx, cy, r) => ELS[el] ? `<g transform="translate(${cx} ${cy})"><title>Nature : ${ELS[el].n}</title><circle r="${r}" fill="#1b120b" stroke="${ELS[el].col}" stroke-width="2.4"/><g transform="scale(${(r / 11).toFixed(2)})">${EL_ICON[el]}</g></g>` : '';
const elBadgeH = (el, cls = '') => ELS[el] ? `<svg class="elbadge ${cls}" viewBox="-12 -12 24 24" aria-label="Nature : ${ELS[el].n}">${elBadgeG(el, 0, 0, 11)}</svg>` : '';
// marqueur de chakra : une flamme bleue à spirale, le chiffre au cœur
const CK_DROP = 'M0 -17 C9 -9 15 -3 15 5 A15 15 0 0 1 -15 5 C-15 -3 -9 -9 0 -17 Z';
const ckMarkG = (n, cx, cy, r, col) => `<g transform="translate(${cx} ${cy}) scale(${(r / 15).toFixed(3)})"><path d="${CK_DROP}" fill="url(#ckm-g)" stroke="#0c1a3a" stroke-width="2.6"/><path d="M-8 -1 A8.5 8.5 0 0 1 7 -4" fill="none" stroke="rgba(232,252,255,.6)" stroke-width="2" stroke-linecap="round"/><text x="0" y="5" dy=".36em" text-anchor="middle" class="ckm-t" style="fill:${col || '#fff'}">${n}</text></g>`;
const ckMarkH = (n, cls = '', title = '', col) => `<svg class="ckm ${cls}" viewBox="-18 -19 36 38" ${title ? `aria-label="${esc(title)}"` : 'aria-hidden="true"'}>${title ? `<title>${esc(title)}</title>` : ''}${ckMarkG(n, 0, 0, 15, col)}</svg>`;
(function () { const add = () => document.body.insertAdjacentHTML('afterbegin', '<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs><radialGradient id="ckm-g" cx=".4" cy=".55" r=".7"><stop offset="0" stop-color="#e8fcff"/><stop offset=".3" stop-color="#6fd0ff"/><stop offset=".72" stop-color="#2a6ad8"/><stop offset="1" stop-color="#0c2a6a"/></radialGradient></defs></svg>'); if (document.body) add(); else document.addEventListener('DOMContentLoaded', add); })();

/* ---------- rendu ---------- */
function spellTokenH(id, z, i, o = {}) {
  const S = SPELLS[id], sel = V.sel && V.sel.z === z && V.sel.i === i;
  return `<div class="spt${sel ? ' sel' : ''}" data-z="${z}" data-i="${i}" data-sp="${id}"${o.drag ? ' data-drag="1"' : ''} tabindex="0" role="button" aria-label="Sort ${esc(S.n)}, coût ${S.c} or">
    <svg class="spt-svg" viewBox="-4 -6 108 124" aria-hidden="true"><path d="M8 6 Q50 -4 92 6 L92 96 Q50 106 8 96 Z" fill="#f1e2bd" ${so(2.6)}/>
    <clipPath id="spc-${z}-${i}"><path d="M14 12 Q50 4 86 12 L86 90 Q50 98 14 90 Z"/></clipPath><g clip-path="url(#spc-${z}-${i})"><use href="#sp-${id}" x="14" y="4" width="72" height="94"/></g>
    <path d="M14 12 Q50 4 86 12 L86 90 Q50 98 14 90 Z" fill="none" ${so(2)}/>
    <rect x="0" y="-2" width="100" height="10" rx="5" fill="#7a4a28" ${so(2)}/><rect x="0" y="94" width="100" height="10" rx="5" fill="#7a4a28" ${so(2)}/>
    <circle cx="14" cy="104" r="12" fill="url(#gr-badge)" stroke="#e2b452" stroke-width="2.2"/><text class="gt" x="14" y="104" dy=".36em" style="fill:${spellCostFor(id, z) < S.c ? '#b8ff8a' : '#ffe39a'}">${spellCostFor(id, z)}</text>
    <g><title>Niveau ${S.t}</title>${Array.from({ length:S.t }, (_, k) => `<path d="${starD(50 + (k - (S.t - 1) / 2) * 14, 3, 7.4, 3.2, 5)}" fill="#ffd86a" stroke="#120a06" stroke-width="1.4" stroke-linejoin="round"/>`).join('')}</g>${S.el ? elBadgeG(S.el, 50, 102, 13) : ''}${S.ck ? ckMarkG(V.me ? ckCost(V.me, S) : S.ck, 86, 101, 13, V.me && ckCost(V.me, S) < S.ck ? '#b8ff8a' : '#fff') : ''}</svg>
    <span class="mn-nm">${esc(S.n)}</span></div>`;
}
// coût réel pour le joueur (réductions actives), et coût de base
function spellCostFor(id, z) { const S = SPELLS[id]; if (V.me && V.me.sp === id && V.me.spc != null && (z === 'ss' || z === 'p')) return V.me.spc; return S.c; }
function spellCardH(id, z, i, o = {}) {
  const S = SPELLS[id], sel = V.sel && V.sel.z === z && V.sel.i === i, ty = SP_TYPES[S.ty];
  const it = z === 'hd' && V.me && V.me.hd ? V.me.hd[i] : null, badge = S.chg ? `<span class="tx-tag">Charge ×${1 + Math.min(2, (it && it.ch) || 0)}</span> ` : S.uses ? `<span class="tx-tag">Rouleau ${(it && it.us) || S.uses}/${S.uses}</span> ` : S.hp ? `<span class="tx-tag kin">${S.hp} PV</span> ` : S.hid ? `<span class="tx-tag hid">Hiden</span> ` : '';
  const n = S.tx.length + (S.n.length > 16 ? 30 : 0);   // un nom sur deux lignes laisse moins de place au texte
  return `<div class="cd spc${sel ? ' sel' : ''}${V.aim != null && V.aim === i && z === 'hd' ? ' aiming' : ''}" data-z="${z}" data-i="${i}" data-sp="${id}"${o.drag ? ' data-drag="1"' : ''}${o.style ? ` style="${o.style}"` : ''} tabindex="0" role="button" aria-label="Sort ${esc(S.n)}">`
    + `<div class="cd-art"><svg viewBox="0 0 100 92" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><use href="#sp-${id}" y="-4" width="100" height="100"/></svg></div>`
    + `<div class="cd-tier" aria-hidden="true">${'<i></i>'.repeat(S.t)}</div>`
    + `<div class="cd-nm"><span>${esc(S.n)}</span></div><div class="cd-tx${n + (AWK_TECH[id] ? 30 : 0) > 95 ? ' xlong' : n + (AWK_TECH[id] ? 30 : 0) > 62 ? ' long' : ''}">${badge}${esc(S.tx)}${AWK_TECH[id] ? `<span class="tx-awk${awakeUI() ? ' on' : ''}"><b>Éveil :</b> ${esc(AWK_TECH[id][0])}</span>` : ''}</div>`
    + `<div class="cd-tb" style="background:${ty.col}">${esc(ty.n)}</div>`
    + (S.item ? '' : costGemH(spellCostFor(id, z), S.c)) + (S.ck ? ckMarkH(V.me ? ckCost(V.me, S) : S.ck, 'ck-gem' + (V.me && ckCost(V.me, S) < S.ck ? ' aff' : ''), 'Coût en chakra' + (V.me && ckCost(V.me, S) < S.ck ? ' (affinité de ton héros : 1 de moins)' : '')) : '') + (S.el ? `<span class="el-tag" style="--ec:${ELS[S.el].col}">${elBadgeH(S.el)}${ELS[S.el].n}</span>` : '') + `${z === 'hd' ? '<i class="hx" aria-hidden="true"></i>' : ''}</div>`;
}

/* ---------- Réservoir des techniques (univers Ninja) ----------
   1re technique : une moitié se remplit de son élément. 2e technique : l'autre moitié se remplit,
   le mélange déclenche un combo (effet immédiat sur le plateau + pouvoir hybride au compagnon) et le réservoir se vide.
   Deux fois le même élément : combo pur, plus fort. Le réservoir garde sa moitié d'un tour à l'autre. */
// techniques éveillées : après l'Éveil, chaque technique gagne un effet en plus (défini dans la technique : awk)
const awakeUI = () => !!((typeof V !== 'undefined' && V.pub && V.pub.ev && V.pub.rd >= V.pub.ev) || awakeNow());
const AWK_TECH0 = {
  nj_souffle:['+3 dégâts de plus', (G, p) => { p.njf = (p.njf || 0) + 3; }],
  nj_boule:['1 dégât de plus par braise consumée', (G, p) => { p.njf = (p.njf || 0) + (p.lastBraise || 0); }],
  nj_deluge:['+2/+2 de plus pour tous', (G, p) => tmaAdd(p, 2, 2)],
  nj_permut:['le Bouclier divin devient permanent', (G, p, t) => { if (t) addF(t, 's'); }],
  nj_porteur:['+2 or de plus', (G, p) => { p.g += 2; }],
  nj_rafale:['touche deux serviteurs de plus', (G, p) => shuffle(p.bd.slice()).slice(0, 2).forEach(m => buff(m, 2, 1))],
  nj_brume:['+0/+3 de plus', (G, p) => tmaAdd(p, 0, 3)],
  nj_doubles:['la copie gagne +3/+3', (G, p, t, tg) => { const c = p.bd[tg + 1]; if (c) buff(c, 3, 3); }],
  nj_vague:['la marée monte de 2 de plus', (G, p) => ctrAdd(p, 'maree', 2)],
  nj_decharge:['+2 chakra et +1 charge de plus', (G, p) => { p.ck = Math.min(ckMax(p), (p.ck || 0) + 2); ctrAdd(p, 'charge', 1); }],
  nj_foudre:['+2 attaque permanente en plus', (G, p, t) => { if (t) buff(t, 2, 0); }],
  nj_sceau:['+3/+3 de plus', (G, p, t) => { if (t) buff(t, 3, 3); }],
  nj_pierre:['+0/+4 de plus', (G, p, t) => { if (t) buff(t, 0, 4); }],
  nj_poing:['jusqu\'à +4 attaque de plus', (G, p, t) => { if (t) buff(t, Math.min(4, Math.floor(t.h / 3)), 0); }],
  nj_invoc:['le serviteur invoqué gagne aussi +3/+3', (G, p) => { const m = p.bd[p.bd.length - 1]; if (m) buff(m, 3, 3); }],
};
const AWK_TECH = {};
for (const id in AWK_TECH0) if (!(SPELLS[id] && SPELLS[id].awk)) AWK_TECH[id] = AWK_TECH0[id];
for (const id in SPELLS) if (SPELLS[id].awk) AWK_TECH[id] = [SPELLS[id].awk.tx, (G, p, t, tg) => techSteps(G, p, SPELLS[id].awk.fx, t, tg, 1)];
const PURES = {
  feu:{ n:'Brasier', col:'#ff5a1a', fx:{ k:'soc_dmg', d:4, n:2 } },
  vent:{ n:'Typhon', col:'#6fd8a0', fx:{ k:'atk_self', a:2, h:2 } },
  eau:{ n:'Marée haute', col:'#4ab0e8', fx:{ k:'surv_self', a:3, h:3 } },
  foudre:{ n:'Surcharge', col:'#ffd23a', fx:{ k:'atk_zap', d:3, n:2 } },
  terre:{ n:'Rempart', col:'#c8a878', fx:{ k:'eot_self', a:1, h:3 } },
};
const tmaAdd = (p, a, h) => { p.tma = { a:((p.tma && p.tma.a) || 0) + a, h:((p.tma && p.tma.h) || 0) + h }; };
const ctrAdd = (p, k, n) => { p[k] = (p[k] || 0) + n; };
// effet immédiat de chaque combo (texte + action)
const COMBO_BD = {
  'Glace':        ['Tes serviteurs gagnent +0/+2 ; l\'un d\'eux gagne Bouclier divin.', (G, p) => { p.bd.forEach(m => buff(m, 0, 2)); const c = p.bd.filter(m => !has(m, 's')); if (c.length) addF(pickR(c), 's'); }],
  'Bois':         ['Tes serviteurs gagnent +1/+2.', (G, p) => p.bd.forEach(m => buff(m, 1, 2))],
  'Lave':         ['Prochain combat : 7 dégâts frappent l\'ennemi.', (G, p) => { p.njf = (p.njf || 0) + 7; }],
  'Vapeur':       ['Prochain combat : tes serviteurs gagnent +2/+2.', (G, p) => tmaAdd(p, 2, 2)],
  'Explosion':    ['Prochain combat : 8 dégâts frappent l\'ennemi.', (G, p) => { p.njf = (p.njf || 0) + 8; }],
  'Fournaise':    ['Gagne 3 or ; prochain combat, 2 dégâts frappent l\'ennemi.', (G, p) => { p.g += 3; p.njf = (p.njf || 0) + 2; }],
  'Tempête':      ['Tes serviteurs gagnent +2/+0 ; gagne 1 or.', (G, p) => { p.bd.forEach(m => buff(m, 2, 0)); p.g += 1; }],
  'Pluie d\'orage':['Récupère 3 chakra ; tes serviteurs gagnent +0/+1.', (G, p) => { p.ck = Math.min(ckMax(p), (p.ck || 0) + 3); p.bd.forEach(m => buff(m, 0, 1)); }],
  'Plasma':       ['Ton serviteur le plus fort gagne +4 attaque et Toxique.', (G, p) => { const t = p.bd.slice().sort((a, b) => b.a - a.a)[0]; if (t) { buff(t, 4, 0); addF(t, 'v'); } }],
  'Sable':        ['Un serviteur gagne Provocation et Bouclier divin ; gagne 1 or.', (G, p) => { if (p.bd.length) { const t = pickR(p.bd); addF(t, 't'); addF(t, 's'); } p.g += 1; }],
  'Brasier':      ['Prochain combat : 8 dégâts frappent l\'ennemi.', (G, p) => { p.njf = (p.njf || 0) + 8; }],
  'Typhon':       ['Gagne 3 or et rafraîchis gratuitement la taverne.', (G, p) => { p.g += 3; p.fz = false; fillShop(G, p); }],
  'Marée haute':  ['Tes serviteurs gagnent +1/+2.', (G, p) => { p.bd.forEach(m => buff(m, 1, 2)); }],
  'Surcharge':    ['Récupère 4 chakra ; tes serviteurs gagnent +1/+0.', (G, p) => { p.ck = Math.min(ckMax(p), (p.ck || 0) + 4); p.bd.forEach(m => buff(m, 1, 0)); }],
  'Rempart':      ['Tes serviteurs gagnent +0/+4, puis +1 attaque par tranche de 5 points de vie.', (G, p) => p.bd.forEach(m => { buff(m, 0, 4); const x = Math.floor(m.h / 5); if (x) buff(m, x, 0); })],
};
const comboOf = (a, b) => !a || !b ? null : a === b ? PURES[a] || null : FUSIONS[[a, b].sort().join('+')] || null;
const comboTx = F => F ? (COMBO_BD[F.n] || [''])[0] : '';
function rsvFill(G, p, el) {
  p.rsv = p.rsv || [];
  p.rsv.push(el);
  comps(p).forEach(c => { if (!c.elLock) c.el = el; });   // le compagnon prend l'élément de la dernière technique (sauf s'il a été fixé)
  if (p.rsv.length < 2) return;
  const [a, b] = p.rsv, F = comboOf(a, b); p.rsv = [];
  if (!F) return;
  const bd = COMBO_BD[F.n], w = pwOf(p);
  if (bd) withSrc('Combo · ' + F.n, () => { bd[1](G, p); if (w && w.k === 'pdouble' && (p.cdbl || 0) < (awake(G) ? 2 : 1)) { p.cdbl = (p.cdbl || 0) + 1; bd[1](G, p); } });
  if (w && w.k === 'pcombo') withSrc('Pouvoir de ' + HEROES[p.hero].n.split(' ')[0], () => { if (w.d && (a === w.el || b === w.el)) { p.njf = (p.njf || 0) + w.d; if (w.b) mkAdd(p, 'feu', w.b); } if (w.h) p.bd.forEach(m => buff(m, 0, w.h)); });
  p.lastCombo = [a, b]; trigBoard(G, p, 'combo');
  comps(p).forEach(c => { c.x = (c.x || []).filter(e => !e.fusion); c.x.push(Object.assign({ src:'Combo · ' + F.n, fusion:1 }, F.fx)); c.fu = F.n; });
  // résonance : chaque combo consomme 5 marqueurs de chacun de ses éléments pour déclencher leur éclat
  const bursts = [];
  [...new Set([a, b])].forEach(e => { const k = MK[e]; if ((p[k] || 0) >= 5) { p[k] -= 5; mkSync(p); withSrc('Éclat · ' + MK_N[e], () => MK_BURST[e][1](G, p)); bursts.push(e); } });
  p.combo = { n:F.n, col:F.col, a, b, pure:a === b ? 1 : 0, id:UID++, bursts };
}
