/* =====================================================================
   DONNÉES PAR DÉFAUT — tout est modifiable depuis l'atelier (admin)
   ===================================================================== */
const BASE_KW = ['t', 's', 'v', 'r', 'w', 'c', 'l', 'i'];
const PATTERNS = { meca:'Engrenages', bete:'Prairie', cors:'Mer au couchant', spec:'Nuit étoilée', neu:'Planches', chateau:'Château sous la lune', lune:'Pleine lune', tombe:'Cimetière', mine:'Mine', foret:'Forêt', colline:'Collines', bazar:'Bazar', volcan:'Volcan', vortex:'Vortex', sqfeu:'Bonbons brûlants', sqeau:'Bulles', sqterre:'Pâte à modeler', sqvent:'Nuages-guimauve', sqglace:'Flocons', sqfoudre:'Orage rigolo' };
const DEFAULT_SETTINGS = {
  tribes:[
    { id:'meca', n:'Méca', col:'#5f7d96', bg:'meca', on:true },
    { id:'bete', n:'Bête', col:'#7c9a4a', bg:'bete', on:true },
    { id:'cors', n:'Corsaire', col:'#d9784a', bg:'cors', on:true },
    { id:'spec', n:'Spectre', col:'#45386f', bg:'spec', on:true },
    { id:'vamp', n:'Vampire', col:'#7a1f2e', bg:'chateau', on:true },
    { id:'garou', n:'Loup-garou', col:'#4a5a7a', bg:'lune', on:true },
    { id:'mort', n:'Mort-vivant', col:'#4f6a4a', bg:'tombe', on:true },
    { id:'nain', n:'Nain', col:'#8a5a2a', bg:'mine', on:true },
    { id:'elfe', n:'Elfe', col:'#2f7a5a', bg:'foret', on:true },
    { id:'ogre', n:'Ogre', col:'#7a7a3a', bg:'colline', on:true },
    { id:'gob', n:'Gobelin', col:'#5a8a2a', bg:'bazar', on:true },
    { id:'drag', n:'Dragon', col:'#a8402a', bg:'volcan', on:true },
    { id:'elem', n:'Élémentaire', col:'#2a7aa0', bg:'vortex', on:true },
    { id:'sq_feu', n:'Flammou', col:'#ff7a4a', bg:'sqfeu', on:true },
    { id:'sq_eau', n:'Flotti', col:'#4ab0e8', bg:'sqeau', on:true },
    { id:'sq_terre', n:'Mottu', col:'#b0884a', bg:'sqterre', on:true },
    { id:'sq_vent', n:'Zéphy', col:'#6fd0c0', bg:'sqvent', on:true },
    { id:'sq_glace', n:'Givrou', col:'#9fd8ff', bg:'sqglace', on:true },
    { id:'sq_foudre', n:'Zapou', col:'#ffd23a', bg:'sqfoudre', on:true },
    { id:'n_feu', n:'Konoha', col:'#d8502a', bg:'volcan', on:true },
    { id:'n_vent', n:'Suna', col:'#c8a050', bg:'sqvent', on:true },
    { id:'n_eau', n:'Kiri', col:'#2f7ab8', bg:'sqeau', on:true },
    { id:'n_foudre', n:'Kumo', col:'#8a7ad8', bg:'sqfoudre', on:true },
    { id:'n_terre', n:'Iwa', col:'#7a5a3a', bg:'mine', on:true },
    { id:'nk_kon', n:'Konoha', sg:'ninja de Konoha', pl:'ninjas de Konoha', col:'#3f9a4a', bg:'colline', on:true },
    { id:'nk_aka', n:'Akatsuki', sg:'membre de l\'Akatsuki', pl:'membres de l\'Akatsuki', col:'#c8303a', bg:'vortex', on:true },
    { id:'nk_sun', n:'Suna', sg:'ninja de Suna', pl:'ninjas de Suna', col:'#c8a050', bg:'sqvent', on:true },
    { id:'nk_oto', n:'Oto', sg:'ninja d\'Oto', pl:'ninjas d\'Oto', col:'#8a5ac8', bg:'vortex', on:true },
    { id:'nk_kir', n:'Kiri', sg:'ninja de Kiri', pl:'ninjas de Kiri', col:'#2f7ab8', bg:'sqeau', on:true },
    { id:'nk_inv', n:'Invocations', sg:'Invocation', pl:'Invocations', col:'#d88a2a', bg:'colline', on:true },
    { id:'lo_hom', n:'Hommes', sg:'Homme', pl:'Hommes', col:'#b0b8c8', bg:'colline', on:true },
    { id:'lo_elf', n:'Elfes', sg:'Elfe', pl:'Elfes', col:'#5fbf8a', bg:'colline', on:true },
    { id:'lo_nah', n:'Nains et Hobbits', sg:'Nain ou Hobbit', pl:'Nains et Hobbits', col:'#c89a4a', bg:'mine', on:true },
    { id:'lo_mor', n:'Mordor', sg:'serviteur du Mordor', pl:'serviteurs du Mordor', col:'#c8402a', bg:'volcan', on:true },
    { id:'lo_ise', n:'Isengard', sg:'serviteur d’Isengard', pl:'serviteurs d’Isengard', col:'#8a8f98', bg:'mine', on:true },
    { id:'lo_omb', n:'Alliés de l’Ombre', sg:'allié de l’Ombre', pl:'alliés de l’Ombre', col:'#7a3a8a', bg:'volcan', on:true },
    { id:'lo_cre', n:'Créatures', sg:'Créature', pl:'Créatures', col:'#7a6a9a', bg:'colline', on:true },
    { id:'d_sai', n:'Saiyans', col:'#e0a020', bg:'volcan', on:true },
    { id:'d_ter', n:'Terriens', col:'#e8701a', bg:'colline', on:true },
    { id:'d_nam', n:'Namekiens', col:'#4aa84a', bg:'foret', on:true },
    { id:'d_and', n:'Androïdes', col:'#4a7ab8', bg:'meca', on:true },
    { id:'d_fre', n:'Armée de Freezer', col:'#8a4ac8', bg:'vortex', on:true },
    { id:'r_smi', n:'Famille Smith', sg:'Smith', pl:'Smith', col:'#e8b84a', bg:'colline', on:true },
    { id:'r_cit', n:'Citadelle des Ricks', sg:'Rick de la Citadelle', pl:'Ricks de la Citadelle', col:'#6fb8e0', bg:'meca', on:true },
    { id:'r_ali', n:'Aliens amis', sg:'Alien ami', pl:'Aliens amis', col:'#7ac04a', bg:'sqvent', on:true },
    { id:'r_mon', n:'Monstres et cauchemars', sg:'Monstre', pl:'Monstres', col:'#9a4ad8', bg:'vortex', on:true },
    { id:'r_mec', n:'Méchants', sg:'Méchant', pl:'Méchants', col:'#c83a3a', bg:'volcan', on:true },
    { id:'s_gin', n:'Gingers et sectes', sg:'Ginger ou sectaire', pl:'Gingers et sectaires', col:'#d8622a', bg:'volcan', on:true },
    { id:'s_adu', n:'Adultes', sg:'Adulte', pl:'Adultes', col:'#5a84b8', bg:'colline', on:true },
    { id:'s_got', n:'Goths', sg:'Goth', pl:'Goths', col:'#4a3a62', bg:'tombe', on:true },
    { id:'s_cel', n:'Célébrités', sg:'Célébrité', pl:'Célébrités', col:'#d8ac2a', bg:'sqglace', on:true },
    { id:'s_ani', n:'Animaux', sg:'Animal', pl:'Animaux', col:'#5a9a3a', bg:'foret', on:true },
    { id:'si_fam', n:'Simpson et voisins', sg:'Simpson ou voisin', pl:'Simpson et voisins', col:'#e0b020', bg:'colline', on:true },
    { id:'si_moe', n:'Taverne de Moe', sg:'Pilier de bar', pl:'Piliers de bar', col:'#a8622a', bg:'bazar', on:true },
    { id:'si_cra', n:'Crapules et escrocs', sg:'Crapule', pl:'Crapules', col:'#4a8a3a', bg:'mine', on:true },
    { id:'si_aut', n:'Autorités de la ville', sg:'Autorité', pl:'Autorités', col:'#3a6ab8', bg:'meca', on:true },
    { id:'si_hor', n:'Aliens et Horror Show', sg:'Monstre d\'Halloween', pl:'Monstres d\'Halloween', col:'#7a3aa8', bg:'tombe', on:true },
  ],
  univ:[
    { n:'South Park', col:'#6fb8e0', ic:'mount', lore:'Serre les rangs : les voisins d\'une même famille se renforcent.', mech:'bande', tribes:['s_gin', 's_adu', 's_got', 's_cel', 's_ani'] },
    { n:'Rick et Morty', col:'#3fbf6f', ic:'portal', lore:'Ouvre un portail : ton serviteur revient d\'une autre dimension.', mech:'portail', tribes:['r_smi', 'r_cit', 'r_ali', 'r_mon', 'r_mec'] },
    { n:'Les Simpson', col:'#f2c230', ic:'donut', lore:'Mmmh… donuts. Cinq familles, cinq façons de jouer.', mech:'gag', tribes:['si_fam', 'si_moe', 'si_cra', 'si_aut', 'si_hor'] },
    { n:'Royaumes anciens', col:'#9a7228', ic:'crown', lore:'Les vieilles lignées tiennent parole.', mech:'serment', tribes:['nain', 'elfe', 'ogre', 'bete', 'vamp'] },
    { n:'Ateliers et bas-fonds', col:'#4a6a86', ic:'gear', lore:'Tout se vend, surtout ce qui fume.', mech:'marche', tribes:['meca', 'gob', 'nain', 'cors', 'ogre'] },
    { n:'Terres sauvages', col:'#4a7a2a', ic:'leaf', lore:'La meute charge d\'abord.', mech:'ruee', tribes:['bete', 'garou', 'elfe', 'drag', 'elem'] },
    { n:'Mers et cieux', col:'#1f6a96', ic:'wave', lore:'Chaque victoire a son butin.', mech:'pillage', tribes:['cors', 'drag', 'elem', 'spec', 'meca'] },
    { n:'Arcanes', col:'#5a3a9a', ic:'star', lore:'Un sort, et tout s\'illumine.', mech:'resonance', tribes:['elem', 'elfe', 'meca', 'mort', 'spec'] },
    { n:'Montagnes', col:'#6a5038', ic:'mount', lore:'Ils tombent… et tout s\'effondre.', mech:'eboulement', tribes:['nain', 'ogre', 'gob', 'drag', 'garou'] },
    { n:'Dragon Ball', col:'#e8701a', ic:'star', lore:'Médite, charge ton ki, transforme tes guerriers.', mech:'ki', tribes:['d_sai', 'd_ter', 'd_nam', 'd_fre', 'd_and'] },
    { n:'Naruto', col:'#a8402a', ic:'sword', lore:'Charge ton chakra : lance les jutsus de tes ninjas, puis transforme-les.', mech:'chakra', tribes:['nk_kon', 'nk_aka', 'nk_sun', 'nk_oto', 'nk_kir'] },
    { n:'Le Seigneur des Anneaux', col:'#b08a2e', ic:'crown', lore:'On joue en duo : 2 duos des Peuples libres contre 2 duos de l’Ombre. Vie commune, combat en relais, et l’Anneau qu’on se passe entre alliés et auquel chaque serviteur réagit. Un seul porte l’Anneau vers le Mont du Destin ; tous les autres le veulent.', mech:'voyage', tribes:['lo_hom', 'lo_elf', 'lo_nah', 'lo_mor', 'lo_ise', 'lo_omb'] },
    { n:'Squishys', col:'#b04a6a', ic:'blob', lore:'Une grosse boule de câlins.', mech:'fusion', tribes:['sq_feu', 'sq_eau', 'sq_terre', 'sq_vent', 'sq_foudre'] },
  ],
  heroFam:{},
  neutral:{ n:'Neutre', col:'#8a5a30', bg:'neu' },
  kw:{
    t:{ n:'Provocation', d:'Les attaques ennemies doivent viser ce serviteur en priorité.', c:1 },
    s:{ n:'Bouclier divin', d:'Annule la prochaine source de dégâts subie, puis le bouclier disparaît.', c:3 },
    v:{ n:'Toxicité', d:'Détruit tout serviteur blessé par celui-ci.', c:3 },
    n:{ n:'Venimosité', d:'À chaque combat, détruit le premier serviteur blessé par celui-ci.', c:2 },
    r:{ n:'Réincarnation', d:'À sa première mort, revient sous la forme d\'une nouvelle copie à 1 PV s\'il reste une place.', c:2 },
    c:{ n:'Camouflage', d:'Les attaques ennemies ne peuvent pas le viser tant qu\'il n\'a pas attaqué.', c:2 },
    l:{ n:'Vol de vie', d:'Les dégâts qu\'il inflige soignent ton héros (5 PV au plus par combat).', c:2 },
    i:{ n:'Insensible', d:'Ne subit aucun dégât pendant qu\'il attaque.', c:3 },
    w:{ n:'Furie des vents', d:'Quand vient son tour d\'attaquer, attaque deux fois de suite.', c:3 },
    k_ferveur:{ n:'Ferveur', d:'Fin de tour : gagne +1/+1.', c:3, fx:{ k:'eot_self', a:1, h:1 } },
  },
  val:{ atk:1, hp:1, allies:3, mode:'block' },
  fxw:{},
  budget:{ 1:[3, 6], 2:[6, 11], 3:[8, 13], 4:[11, 18], 5:[15, 24], 6:[20, 32] },
  rules:{ hp:40, tribesPerGame:5, time:35, perRound:5, maxTime:75,
    pool:{ 1:16, 2:15, 3:13, 4:11, 5:9, 6:7 }, up:{ 1:6, 2:7, 3:8, 4:11, 5:11 } },   // amélioration : 5 · 7 · 8 · 11 · 11 (Champs de bataille), −1 par tour
};
// id, nom, niveau (0 = jeton), tribu, attaque, vie, mots-clés, effets
const DEFAULT_CARD_LIST = [
  ['r_rouage', 'Rouage blindé', 1, 'meca', 1, 1, 's', []],
  ['b_chiot', 'Chiot des cendres', 1, 'bete', 2, 1, '', [{ k:'dr_summon', card:'tk_chiot', n:1 }]],
  ['p_pilleur', 'Pilleur de quai', 1, 'cors', 3, 2, '', []],
  ['s_lueur', 'Lueur errante', 1, 'spec', 2, 1, 'r', []],
  ['r_ferr', 'Ferrailleur', 1, 'meca', 2, 2, '', [{ k:'sell_gold', n:1 }]],
  ['b_chat', 'Chat de gouttière', 1, 'bete', 1, 1, '', [{ k:'bc_summon', card:'tk_chaton', n:1 }]],
  ['r_piston', 'Pistonneur', 2, 'meca', 2, 3, '', [{ k:'play_self', tb:'meca', a:1, h:1 }]],
  ['b_meute', 'Loup affamé', 2, 'bete', 3, 2, '', [{ k:'dr_buff_rand', tb:'bete', a:2, h:1 }]],
  ['p_second', 'Second du capitaine', 2, 'cors', 3, 3, '', [{ k:'bc_buff_tribe', tb:'cors', a:1, h:1 }]],
  ['s_murmure', 'Murmure glacé', 2, 'spec', 2, 4, '', [{ k:'die_self', tb:'', a:1, h:1 }]],
  ['b_venin', 'Cracheur de venin', 2, 'bete', 1, 2, 'v', []],
  ['r_bombe', 'Bombe ambulante', 2, 'meca', 2, 2, '', [{ k:'dr_dmg', d:4, n:1 }]],
  ['r_meca', 'Mécanicienne', 3, 'meca', 3, 3, '', [{ k:'dr_summon', card:'tk_robot', n:2 }]],
  ['b_louve', 'Mère louve', 3, 'bete', 3, 3, '', [{ k:'dr_summon', card:'tk_louv', n:2 }]],
  ['p_canon', 'Canonnier', 3, 'cors', 2, 3, '', [{ k:'soc_dmg', d:3, n:1 }]],
  ['s_ame', 'Âme en peine', 3, 'spec', 3, 2, 'tr', []],
  ['r_forge', 'Forge vivante', 4, 'meca', 3, 5, '', [{ k:'play_other', tb:'meca', a:2, h:2 }]],
  ['b_cerf', 'Grand cerf', 4, 'bete', 4, 4, '', [{ k:'bc_buff_tribe', tb:'bete', a:2, h:2 }]],
  ['p_bouc', 'Boucanier sanglant', 4, 'cors', 4, 4, 'w', []],
  ['s_hurl', 'Hurleur du voile', 4, 'spec', 3, 5, '', [{ k:'dr_buff_all', tb:'spec', a:2, h:2 }]],
  ['r_titan', 'Titan de ferraille', 5, 'meca', 6, 6, '', [{ k:'dr_summon', card:'r_rouage', n:2 }]],
  ['b_roi', 'Roi des fauves', 5, 'bete', 5, 6, '', [{ k:'die_others', tb:'bete', a:1, h:1 }]],
  ['p_amiral', 'Amirale fantôme', 5, 'cors', 6, 5, '', [{ k:'bc_buff_tribe', tb:'cors', a:2, h:2 }]],
  ['s_liche', 'Liche du gouffre', 5, 'spec', 4, 6, '', [{ k:'soc_kw', kw:'r', tb:'spec' }]],
  ['r_colosse', 'Colosse primordial', 6, 'meca', 7, 7, 's', [{ k:'dr_kw', kw:'s', tb:'meca' }]],
  ['b_fleau', 'Fléau des plaines', 6, 'bete', 7, 7, '', [{ k:'dr_summon_rand', tb:'bete', tier:4, n:2 }]],
  ['p_kraken', 'Kraken des abysses', 6, 'cors', 6, 7, '', [{ k:'soc_dmg', d:4, n:2 }]],
  ['s_seign', 'Seigneur des âmes', 6, 'spec', 6, 6, '', [{ k:'dr_summon', card:'s_ame', n:2 }]],
  ['c_bricole', 'Bricole l\'apprentie', 3, 'neu', 2, 3, '', [{ k:'roll_self', a:1, h:1 }]],
  ['c_lumen', 'Lumen', 3, 'neu', 2, 3, 's', [{ k:'shield_buff', a:2 }]],
  ['c_fiole', 'Fiole l\'homoncule', 3, 'neu', 2, 4, '', [{ k:'pow_buff_rand', a:1, h:1 }]],
  ['c_sou', 'Sou le furet', 3, 'neu', 1, 5, '', [{ k:'sot_gold', n:1 }]],
  ['c_croc', 'Croc', 3, 'neu', 3, 3, '', [{ k:'eot_buff_left', a:1, h:1 }]],
  ['c_plume', 'Plume la chouette', 3, 'neu', 2, 3, '', [{ k:'pow_spell', n:1 }]],
  ['c_bastion', 'Bastion', 3, 'neu', 2, 5, 't', [{ k:'eot_blood', a:1, h:2, d:2 }]],
  ['c_truelle', 'Truelle le castor', 3, 'neu', 3, 3, '', [{ k:'up_buff_all', a:1, h:1, tb:'' }]],
  ['c_braise', 'Braise la salamandre', 3, 'neu', 2, 4, '', [{ k:'eot_fireball', n:1 }]],
  // Vampires
  ['v_ecuyer', 'Écuyer sanguin', 1, 'vamp', 2, 1, '', [{ k:'atk_self', a:1, h:0 }]],
  ['v_chauve', 'Chauve-souris', 0, 'vamp', 1, 1, '', []],
  ['v_sangsue', 'Sangsue des cryptes', 2, 'vamp', 1, 3, '', [{ k:'atk_self', a:1, h:1 }]],
  ['v_hote', 'Hôte du manoir', 2, 'vamp', 2, 3, '', [{ k:'bc_summon', card:'v_chauve', n:1 }]],
  ['v_baronne', 'Baronne écarlate', 3, 'vamp', 3, 3, '', [{ k:'atk_buff_rand', a:1, h:1 }]],
  ['v_comte', 'Comte de minuit', 4, 'vamp', 4, 4, '', [{ k:'die_self', tb:'', a:2, h:1 }]],
  ['v_seigneur', 'Seigneur des nuits', 5, 'vamp', 5, 6, '', [{ k:'atk_self', a:2, h:2 }]],
  ['v_ancetre', 'Ancêtre éternel', 6, 'vamp', 6, 6, 'r', [{ k:'soc_buff', a:2, h:2, tb:'vamp' }]],
  // Loups-garous
  ['g_villageois', 'Villageois mordu', 1, 'garou', 1, 2, '', [{ k:'soc_self', a:2, h:0 }]],
  ['g_pisteuse', 'Pisteuse lunaire', 2, 'garou', 2, 2, '', [{ k:'soc_self', a:2, h:2 }]],
  ['g_hurleur', 'Hurleur de la meute', 3, 'garou', 3, 3, '', [{ k:'soc_buff', a:1, h:1, tb:'garou' }]],
  ['g_alpha', 'Alpha des bois', 4, 'garou', 4, 4, 'w', []],
  ['g_bete', 'Bête des landes', 5, 'garou', 5, 5, '', [{ k:'die_self', tb:'garou', a:2, h:2 }, { k:'soc_self', a:2, h:0 }]],
  ['g_matriarche', 'Matriarche de la lune rousse', 6, 'garou', 7, 6, '', [{ k:'soc_buff', a:3, h:2, tb:'garou' }]],
  // Morts-vivants
  ['m_squelette', 'Squelette', 0, 'mort', 1, 1, '', []],
  ['m_goule', 'Goule affamée', 1, 'mort', 2, 1, 'r', []],
  ['m_cadavre', 'Cadavre ambulant', 2, 'mort', 2, 3, '', [{ k:'dr_summon', card:'m_squelette', n:1 }]],
  ['m_crane', 'Crâne hurlant', 2, 'mort', 1, 2, 'r', [{ k:'dr_dmg', d:2, n:1 }]],
  ['m_chevalier', 'Chevalier déchu', 3, 'mort', 3, 4, 'r', []],
  ['m_necro', 'Nécromancienne', 4, 'mort', 3, 4, '', [{ k:'die_others', tb:'mort', a:1, h:1 }]],
  ['m_abomination', 'Abomination recousue', 5, 'mort', 5, 6, 't', [{ k:'dr_dmg', d:3, n:2 }]],
  ['m_roi', 'Roi des tertres', 6, 'mort', 7, 7, 'r', [{ k:'dr_summon', card:'m_squelette', n:3 }]],
  // Nains
  ['d_mineur', 'Mineur de fond', 1, 'nain', 1, 3, 't', []],
  ['d_brasseur', 'Brasseur de la forge', 2, 'nain', 2, 3, '', [{ k:'eot_buff_rand', a:1, h:1, n:1, tb:'nain' }]],
  ['d_bouclier', 'Porte-bouclier', 2, 'nain', 2, 2, 'st', []],
  ['d_forgeron', 'Forgeron runique', 3, 'nain', 3, 3, '', [{ k:'eot_buff_taunt', a:1, h:1 }]],
  ['d_arbalete', 'Arbalétrier nain', 4, 'nain', 3, 5, 't', [{ k:'soc_dmg', d:3, n:1 }]],
  ['d_thane', 'Thane des forges', 5, 'nain', 5, 6, '', [{ k:'bc_buff_tribe', a:2, h:2, tb:'nain' }]],
  ['d_gardien', 'Gardien runique', 6, 'nain', 6, 8, 'ts', [{ k:'eot_buff_taunt', a:1, h:1 }]],
  // Elfes
  ['e_eclaireuse', 'Éclaireuse sylvaine', 1, 'elfe', 1, 2, '', [{ k:'cast_self', a:1, h:1 }]],
  ['e_archere', 'Archère des cimes', 2, 'elfe', 2, 2, '', [{ k:'soc_dmg', d:2, n:1 }]],
  ['e_druide', 'Druide des clairières', 2, 'elfe', 1, 4, '', [{ k:'cast_buff_rand', a:1, h:1 }]],
  ['e_lamelune', 'Lame-de-lune', 3, 'elfe', 3, 3, '', [{ k:'cast_self', a:2, h:1 }]],
  ['e_enchant', 'Enchanteresse', 4, 'elfe', 3, 4, '', [{ k:'bc_spell', n:1 }, { k:'cast_self', a:1, h:1 }]],
  ['e_gardien', 'Gardien de la sylve', 5, 'elfe', 4, 7, '', [{ k:'cast_buff_tribe', a:1, h:1, tb:'elfe' }]],
  ['e_reine', 'Reine des saisons', 6, 'elfe', 6, 6, '', [{ k:'cast_buff_tribe', a:2, h:1, tb:'elfe' }, { k:'bc_spell', n:1 }]],
  // Ogres
  ['o_bagarreur', 'Bagarreur ogre', 1, 'ogre', 3, 3, '', []],
  ['o_cogneur', 'Cogneur des collines', 2, 'ogre', 4, 4, '', []],
  ['o_mangeur', 'Mangeur de chèvres', 3, 'ogre', 4, 6, '', [{ k:'eot_self', a:1, h:1 }]],
  ['o_brute', 'Brute à deux têtes', 4, 'ogre', 5, 5, 'w', []],
  ['o_chef', 'Chef de clan ogre', 5, 'ogre', 6, 7, '', [{ k:'bc_buff_tribe', a:2, h:2, tb:'ogre' }]],
  ['o_montagne', 'Ogre-montagne', 6, 'ogre', 10, 10, 't', []],
  // Gobelins
  ['gb_chapardeur', 'Chapardeur', 1, 'gob', 1, 2, '', [{ k:'sell_gold', n:1 }]],
  ['gb_bricoleur', 'Bricoleur gobelin', 1, 'gob', 2, 1, '', [{ k:'roll_self', a:1, h:0 }]],
  ['gb_marchand', 'Marchand à la sauvette', 2, 'gob', 2, 3, '', [{ k:'bc_gold', n:1 }]],
  ['gb_dynamiteur', 'Dynamiteur', 3, 'gob', 2, 2, '', [{ k:'dr_dmg', d:3, n:2 }]],
  ['gb_contrebandier', 'Contrebandier', 4, 'gob', 4, 5, '', [{ k:'sot_gold', n:1 }]],
  ['gb_banquier', 'Banquier véreux', 5, 'gob', 4, 5, '', [{ k:'eot_buff_all', a:1, h:1, tb:'gob' }]],
  ['gb_roi', 'Roi-ferraille', 6, 'gob', 7, 7, '', [{ k:'roll_buff_tribe', a:2, h:1, tb:'gob' }]],
  // Dragons
  ['dg_dragonnet', 'Dragonnet', 0, 'drag', 2, 1, '', []],
  ['dg_oeuf', 'Œuf de dragon', 1, 'drag', 0, 3, '', [{ k:'dr_summon', card:'dg_dragonnet', n:1 }]],
  ['dg_wyverne', 'Wyverne des falaises', 2, 'drag', 3, 3, 'w', []],
  ['dg_cracheur', 'Cracheur de flammes', 3, 'drag', 3, 4, '', [{ k:'soc_dmg', d:3, n:1 }]],
  ['dg_garde', 'Garde écaille-d\'or', 4, 'drag', 4, 6, 't', [{ k:'bc_buff_tribe', a:1, h:1, tb:'drag' }]],
  ['dg_matriarche', 'Matriarche des nuées', 5, 'drag', 5, 6, '', [{ k:'soc_dmg', d:2, n:3 }]],
  ['dg_ancien', 'Ancien des braises', 6, 'drag', 8, 8, '', [{ k:'soc_aoe', d:1 }]],
  // Élémentaires
  ['el_flammeche', 'Flammèche', 1, 'elem', 2, 2, '', [{ k:'play_self', tb:'elem', a:1, h:0 }]],
  ['el_galet', 'Galet animé', 1, 'elem', 1, 4, '', []],
  ['el_bourrasque', 'Bourrasque', 2, 'elem', 3, 2, 'w', []],
  ['el_vague', 'Vague vivante', 3, 'elem', 3, 4, '', [{ k:'play_other', tb:'elem', a:1, h:1 }]],
  ['el_magma', 'Cœur de magma', 4, 'elem', 4, 5, '', [{ k:'play_self', tb:'elem', a:2, h:1 }]],
  ['el_tempete', 'Tempête incarnée', 5, 'elem', 5, 6, '', [{ k:'soc_aoe', d:1 }]],
  ['el_primordial', 'Primordial des quatre vents', 6, 'elem', 7, 7, 's', [{ k:'play_other', tb:'elem', a:2, h:2 }]],
  // Compagnons des nouveaux héros
  ['c_nyx', 'Nyx la chauve-souris', 3, 'neu', 2, 4, '', [{ k:'atk_buff_rand', a:1, h:1 }]],
  ['c_enclume', 'Enclume', 3, 'neu', 2, 4, 't', [{ k:'eot_buff_taunt', a:1, h:0 }]],
  ['c_lys', 'Lys la lucine', 3, 'neu', 2, 3, '', [{ k:'cast_buff_rand', a:1, h:1 }]],
  ['c_miette', 'Miette le marmiton', 3, 'neu', 2, 3, '', [{ k:'eot_buff_big', a:1, h:1 }]],
  ['c_osbrise', 'Os-Brisé', 3, 'neu', 3, 3, '', [{ k:'die_self', tb:'', a:1, h:1 }]],
  ['c_etincelle', 'Étincelle', 3, 'neu', 2, 2, '', [{ k:'soc_aoe', d:1 }]],
  // Squishys — Flammous (feu)
  ['sf_braise', 'Petite Braise', 1, 'sq_feu', 2, 1, '', [{ k:'eot_combo', tb2:'sq_vent', a:1, h:1 }]],
  ['sf_guimauve', 'Guimauve grillée', 2, 'sq_feu', 2, 3, '', [{ k:'dr_dmg', d:2, n:1 }]],
  ['sf_piment', 'Piment tout mou', 3, 'sq_feu', 3, 3, '', [{ k:'soc_combo_dmg', tb2:'sq_terre', d:3, n:1 }]],
  ['sf_volcan', 'Volcan rigolo', 4, 'sq_feu', 4, 4, '', [{ k:'eot_elements', a:1, h:0 }]],
  ['sf_phenix', 'Phénix moelleux', 5, 'sq_feu', 4, 5, 'r', [{ k:'soc_combo_dmg', tb2:'sq_vent', d:3, n:2 }]],
  ['sf_soleil', 'Soleil câlin', 6, 'sq_feu', 6, 6, '', [{ k:'soc_elements', a:1, h:1 }]],
  // Flottis (eau)
  ['se_goutte', 'Goutte boudeuse', 1, 'sq_eau', 1, 3, '', [{ k:'eot_combo', tb2:'sq_feu', a:0, h:2 }]],
  ['se_meduse', 'Méduse gélatine', 2, 'sq_eau', 2, 2, 'v', []],
  ['se_bulle', 'Bulle de savon', 3, 'sq_eau', 2, 3, 's', [{ k:'bc_combo', tb2:'sq_vent', a:1, h:1 }]],
  ['se_vapeur', 'Nuage de vapeur', 4, 'sq_eau', 3, 5, '', [{ k:'eot_combo', tb2:'sq_feu', a:2, h:2 }]],
  ['se_baleine', 'Baleine dodue', 5, 'sq_eau', 5, 7, 't', [{ k:'eot_elements', a:0, h:2 }]],
  ['se_tsunami', 'Tsunami tout doux', 6, 'sq_eau', 7, 8, '', [{ k:'soc_combo_dmg', tb2:'sq_vent', d:2, n:4 }]],
  // Mottus (terre)
  ['st_spore', 'Spore', 0, 'sq_terre', 1, 1, '', []],
  ['st_patate', 'Patate molle', 1, 'sq_terre', 1, 4, 't', []],
  ['st_galet', 'Galet ronchon', 2, 'sq_terre', 2, 4, '', [{ k:'eot_combo', tb2:'sq_eau', a:1, h:1 }]],
  ['st_champi', 'Champi-pouf', 3, 'sq_terre', 3, 3, '', [{ k:'dr_summon', card:'st_spore', n:2 }]],
  ['st_boue', 'Boue gloubi', 4, 'sq_terre', 3, 6, 't', [{ k:'bc_combo', tb2:'sq_eau', a:1, h:2 }]],
  ['st_colline', 'Colline endormie', 5, 'sq_terre', 4, 8, 't', [{ k:'eot_elements', a:0, h:1 }]],
  ['st_montagne', 'Montagne-guimauve', 6, 'sq_terre', 7, 9, 't', [{ k:'eot_buff_taunt', a:1, h:1 }]],
  // Zéphys (vent)
  ['sv_plume', 'Plumette', 1, 'sq_vent', 2, 1, 'w', []],
  ['sv_bise', 'Petite bise', 2, 'sq_vent', 2, 2, '', [{ k:'eot_combo', tb2:'sq_feu', a:1, h:1 }]],
  ['sv_tornade', 'Tornade gigoteuse', 3, 'sq_vent', 3, 3, 'w', []],
  ['sv_cerf', 'Cerf-volant farceur', 4, 'sq_vent', 4, 5, '', [{ k:'soc_combo_dmg', tb2:'sq_eau', d:2, n:2 }]],
  ['sv_nuage', 'Nuage-coussin', 5, 'sq_vent', 5, 7, '', [{ k:'soc_elements', a:1, h:0 }]],
  ['sv_ouragan', 'Ouragan câlin', 6, 'sq_vent', 6, 6, 'w', [{ k:'eot_elements', a:1, h:1 }]],
  // Givrous (glace) : ils refroidissent l'attaque des ennemis
  ['sg_boule', 'Boulette de neige', 0, 'sq_glace', 2, 2, '', []],
  ['sg_glacon', 'Glaçon grelottant', 1, 'sq_glace', 1, 3, '', [{ k:'eot_combo', tb2:'sq_eau', a:1, h:1 }]],
  ['sg_flocon', 'Flocon timide', 2, 'sq_glace', 2, 3, '', [{ k:'soc_chill', a:2, n:1 }]],
  ['sg_pingouin', 'Pingouin pas pressé', 3, 'sq_glace', 3, 4, 't', [{ k:'soc_combo_chill', tb2:'sq_eau', a:2, n:2 }]],
  ['sg_bonhomme', 'Bonhomme de neige mou', 4, 'sq_glace', 3, 5, '', [{ k:'dr_summon', card:'sg_boule', n:2 }]],
  ['sg_yeti', 'Yéti câlin', 5, 'sq_glace', 5, 7, '', [{ k:'soc_chill', a:1, n:7 }]],
  ['sg_banquise', 'Banquise câline', 6, 'sq_glace', 6, 9, 't', [{ k:'soc_chill_el', a:1 }]],
  // Zapous (foudre) : ils électrisent après chaque attaque
  ['sz_pile', 'Pile chatouilleuse', 1, 'sq_foudre', 2, 1, '', [{ k:'eot_combo', tb2:'sq_feu', a:1, h:1 }]],
  ['sz_zap', 'Petit zap', 2, 'sq_foudre', 2, 2, '', [{ k:'atk_zap', d:1, n:1 }]],
  ['sz_ampoule', 'Ampoule rigolote', 3, 'sq_foudre', 3, 3, 's', [{ k:'soc_combo_dmg', tb2:'sq_eau', d:2, n:2 }]],
  ['sz_orage', 'Orage grognon', 4, 'sq_foudre', 3, 5, 'w', [{ k:'atk_zap', d:1, n:1 }]],
  ['sz_eclair', 'Éclair zigzag', 5, 'sq_foudre', 5, 5, '', [{ k:'atk_zap_el', d:1 }]],
  ['sz_tonnerre', 'Roi Tonnerre', 6, 'sq_foudre', 6, 7, 'w', [{ k:'atk_zap', d:2, n:2 }]],
  // compagnons des héros squishys
  ['c_pouf', 'Pouf', 3, 'neu', 2, 3, '', [{ k:'eot_buff_all', tb:'sq_feu', a:1, h:0 }]],
  ['c_caillou', 'Caillou mou', 3, 'neu', 2, 4, 't', [{ k:'eot_buff_taunt', a:0, h:1 }]],
  ['c_gloup', 'Gloup', 3, 'neu', 2, 4, '', [{ k:'play_other', tb:'sq_eau', a:1, h:1 }]],
  ['c_frisouille', 'Frisouille', 3, 'neu', 2, 3, '', [{ k:'soc_buff', tb:'sq_vent', a:1, h:1 }]],
  ['tk_chiot', 'Chiot fumant', 0, 'bete', 1, 1, '', []],
  ['tk_chaton', 'Chaton', 0, 'bete', 1, 1, '', []],
  ['tk_robot', 'Micro-robot', 0, 'meca', 1, 1, '', []],
  ['tk_louv', 'Louveteau', 0, 'bete', 2, 1, '', []],
  // ----- Les Cinq Nations (univers ninja original) -----
  // ----- kekkei genkai : serviteurs à double nature -----
  // jetons ninja
  ['tk_clone', 'Kage bunshin', 0, 'n_feu', 2, 2, '', []],
  ['tk_golem', 'Golem du Doton', 0, 'n_terre', 2, 3, 't', []],
  ['tk_mur', 'Doryūheki', 0, 'n_terre', 0, 4, 't', []],
  // ----- univers Dragon Ball (v2) : un personnage = une carte ; 5 familles -----
  ['tk_saiba', 'Saibaman', 0, 'd_sai', 2, 1, '', [{ k:'dr_dmg', d:1, n:1 }]],
  ['tk_sold', 'Soldat de Freezer', 0, 'd_fre', 1, 1, '', []],
  // Saiyans : transformations par paliers (payées en ki)
  ['d_raditz', 'Raditz', 1, 'd_sai', 2, 2, '', [{ k:'tf_self', a:1, h:1 }]],
  ['d_goten', 'Goten', 1, 'd_sai', 1, 3, '', [{ k:'tf', st:[{ c:2, a:2, h:1, nm:'Super Saiyan' }] }, { k:'fus', p:'d_trunks', r:'d_gotenks' }]],
  ['d_nappa', 'Nappa', 2, 'd_sai', 3, 3, '', [{ k:'bc_summon', card:'tk_saiba', n:1 }]],
  ['d_bardock', 'Bardock', 2, 'd_sai', 3, 2, '', [{ k:'tf', st:[{ c:3, a:3, h:2, nm:'Super Saiyan' }], cond:'colere' }]],
  ['d_trunks', 'Trunks', 3, 'd_sai', 3, 3, '', [{ k:'tf', st:[{ c:3, a:2, h:2, nm:'Super Saiyan' }, { c:4, a:3, h:3, nm:'Super Trunks' }] }, { k:'fus', p:'d_goten', r:'d_gotenks' }]],
  ['d_gohan', 'Gohan', 3, 'd_sai', 2, 4, '', [{ k:'tf', st:[{ c:3, a:3, h:2, nm:'Super Saiyan 2' }, { c:5, a:4, h:4, kw:'w', nm:'Gohan ultime' }], cond:'colere' }]],
  ['d_vegeta', 'Vegeta', 4, 'd_sai', 4, 4, '', [{ k:'tf_self', a:2, h:2 }, { k:'tf', st:[{ c:4, a:3, h:3, nm:'Super Saiyan' }, { c:6, a:4, h:4, nm:'Super Saiyan Blue' }] }, { k:'fus', p:'d_goku', r:'d_gogeta', r2:'d_vegetto' }]],
  ['d_roivegeta', 'Roi Vegeta', 4, 'd_sai', 4, 5, '', [{ k:'pas_tfc', n:1 }]],
  ['d_goku', 'Goku', 5, 'd_sai', 5, 6, '', [{ k:'tf', st:[{ c:4, a:3, h:3, nm:'Super Saiyan' }, { c:6, a:4, h:4, nm:'Super Saiyan 2' }, { c:8, a:6, h:6, kw:'w', nm:'Super Saiyan 3' }] }, { k:'fus', p:'d_vegeta', r:'d_gogeta', r2:'d_vegetto' }]],
  ['d_broly', 'Broly', 6, 'd_sai', 8, 7, '', [{ k:'die_self', tb:'', a:1, h:1 }, { k:'tf', st:[{ c:6, a:6, h:6, nm:'Super Saiyan légendaire' }], cond:'colere' }]],
  ['d_gogeta', 'Gogeta', 6, 'd_sai', 8, 8, '', [{ k:'fusres', a:'d_goku', b:'d_vegeta', how:'Danse de fusion' }, { k:'eot_tfbuff', a:2, h:2 }]],
  ['d_gotenks', 'Gotenks', 4, 'd_sai', 4, 6, '', [{ k:'fusres', a:'d_goten', b:'d_trunks', how:'Danse de fusion' }, { k:'tf', st:[{ c:4, a:4, h:4, nm:'Super Saiyan 3' }] }]],
  ['d_vegetto', 'Vegetto', 6, 'd_sai', 8, 7, '', [{ k:'fusres', a:'d_goku', b:'d_vegeta', how:'Boucles Potara' }, { k:'tf_self', a:2, h:2 }, { k:'tf', st:[{ c:6, a:6, h:6, kw:'s', nm:'Vegetto Blue' }] }]],
  // Terriens : soutien (bonus, ki, techniques) jusqu'au Genkidama
  ['d_yamcha', 'Yamcha', 1, 'd_ter', 2, 1, '', [{ k:'bc_buff_rand', a:1, h:1, tb:'' }]],
  ['d_chaozu', 'Chaozu', 1, 'd_ter', 1, 2, '', [{ k:'eot_ki', n:1 }]],
  ['d_chichi', 'Chi-Chi', 2, 'd_ter', 1, 4, '', [{ k:'eot_buff_rand', a:1, h:2, n:1, tb:'d_sai' }]],
  ['d_videl', 'Videl', 2, 'd_ter', 3, 2, '', [{ k:'bc_spell', n:1 }]],
  ['d_krilin', 'Krilin', 3, 'd_ter', 3, 3, '', [{ k:'dr_buff_all', a:2, h:2, tb:'d_sai' }, { k:'choose', o:[{ k:'bc_buff_tribe', a:2, h:0, tb:'d_ter' }, { k:'bc_buff_tribe', a:0, h:2, tb:'d_ter' }] }]],
  ['d_yajirobe', 'Yajirobé', 3, 'd_ter', 2, 5, '', [{ k:'eot_buff_rand', a:0, h:2, n:2, tb:'' }, { k:'craft', sp:'hs_senzu' }]],
  ['d_tenshin', 'Tenshinhan', 4, 'd_ter', 5, 4, '', [{ k:'soc_dmg', d:3, n:2 }]],
  ['d_bulma', 'Bulma', 4, 'd_ter', 2, 6, '', [{ k:'eot_ki', n:2 }, { k:'bc_spell', n:1 }]],
  ['d_satan', 'Mr Satan', 5, 'd_ter', 4, 6, 't', [{ k:'win_all', a:1, h:1, tb:'' }]],
  ['d_kame', 'Tortue Géniale', 5, 'd_ter', 3, 7, '', [{ k:'pas_tkc', n:1 }, { k:'eot_buff_all', a:1, h:1, tb:'' }]],
  ['d_uub', 'Uub', 6, 'd_ter', 6, 8, '', [{ k:'eot_genki', a:1, h:1 }]],
  // Namekiens : mentors (entraînent leurs voisins)
  ['d_cargo', 'Cargo', 1, 'd_nam', 2, 1, '', [{ k:'mentor', a:1, h:0, n:1 }]],
  ['d_dende', 'Dende', 1, 'd_nam', 1, 2, '', [{ k:'mentor', a:0, h:2, n:1 }]],
  ['d_tambourine', 'Tambourine', 2, 'd_nam', 3, 2, '', [{ k:'atk_self', a:1, h:0 }]],
  ['d_moori', 'Moori', 2, 'd_nam', 1, 4, '', [{ k:'mentor', a:1, h:1, n:1 }]],
  ['d_nail', 'Nail', 3, 'd_nam', 3, 4, 't', [{ k:'mentor', a:1, h:2, n:1 }, { k:'fus', p:'d_piccolo', r:'d_piccolof' }]],
  ['d_kami', 'Kami-sama', 3, 'd_nam', 2, 5, '', [{ k:'mentor', a:1, h:1, n:2 }, { k:'fus', p:'d_piccolo', r:'d_piccolof' }]],
  ['d_slug', 'Slug', 4, 'd_nam', 5, 5, '', [{ k:'eot_self', a:2, h:2 }]],
  ['d_daimao', 'Roi Piccolo', 4, 'd_nam', 4, 4, '', [{ k:'bc_summon', card:'d_tambourine', n:1 }]],
  ['d_guru', 'Grand Doyen', 5, 'd_nam', 2, 8, '', [{ k:'mentor', a:2, h:2, n:2 }]],
  ['d_piccolo', 'Piccolo', 5, 'd_nam', 5, 6, '', [{ k:'mentor', a:2, h:2, n:1 }, { k:'tf', st:[{ c:5, a:4, h:4, nm:'Super Namek' }] }, { k:'fus', p:'d_nail', r:'d_piccolof', p2:'d_kami' }]],
  ['d_piccolof', 'Piccolo fusionné', 6, 'd_nam', 7, 8, '', [{ k:'fusres', a:'d_piccolo', b:'d_nail', b2:'d_kami', how:'Fusion namek', buy:1 }, { k:'eot_mentor_all' }]],
  // Armée de Freezer : les soldats tombent, les officiers grandissent
  ['d_appule', 'Appule', 1, 'd_fre', 2, 1, '', [{ k:'dr_summon', card:'tk_sold', n:1 }]],
  ['d_cui', 'Cui', 1, 'd_fre', 1, 1, '', [{ k:'bc_summon', card:'tk_sold', n:1 }]],
  ['d_dodoria', 'Dodoria', 2, 'd_fre', 3, 3, '', [{ k:'die_self', tb:'', a:1, h:1 }]],
  ['d_zarbon', 'Zarbon', 2, 'd_fre', 3, 2, '', [{ k:'tf', st:[{ c:3, a:3, h:2, nm:'Forme monstrueuse' }] }]],
  ['d_guldo', 'Guldo', 2, 'd_fre', 2, 3, 'c', [{ k:'soc_chill', a:2, n:1 }]],
  ['d_recoome', 'Recoome', 3, 'd_fre', 3, 5, 't', [{ k:'dr_summon', card:'tk_sold', n:2 }]],
  ['d_burter', 'Burter', 3, 'd_fre', 3, 3, 'wi', []],
  ['d_jeice', 'Jeice', 3, 'd_fre', 3, 3, '', [{ k:'dr_buff_all', a:1, h:1, tb:'d_fre' }]],
  ['d_ginyu', 'Capitaine Ginyu', 4, 'd_fre', 4, 5, '', [{ k:'soc_ginyu', a:2, h:2 }]],
  ['d_cooler', 'Cooler', 5, 'd_fre', 6, 6, '', [{ k:'die_self', tb:'', a:1, h:1 }, { k:'tf', st:[{ c:5, a:5, h:5, nm:'Métal Cooler' }] }]],
  ['d_cold', 'Roi Cold', 5, 'd_fre', 5, 7, '', [{ k:'die_others', tb:'', a:1, h:0 }, { k:'eot_gem', n:1 }]],
  ['d_freezer', 'Freezer', 6, 'd_fre', 7, 7, '', [{ k:'die_self', tb:'', a:2, h:1 }, { k:'tf', st:[{ c:5, a:4, h:4, nm:'Forme finale' }, { c:8, a:6, h:6, kw:'s', nm:'Golden Freezer' }] }]],
  // Androïdes : autodestruction (râles d'agonie)
  ['d_c8', 'C-8', 1, 'd_and', 1, 3, 't', [{ k:'dr_buff_rand', a:1, h:1, tb:'' }]],
  ['d_c15', 'C-15', 1, 'd_and', 2, 1, '', [{ k:'dr_dmg', d:2, n:1 }]],
  ['d_c14', 'C-14', 2, 'd_and', 3, 3, '', [{ k:'dr_dmg', d:2, n:2 }]],
  ['d_c19', 'C-19', 2, 'd_and', 2, 4, 'l', [{ k:'atk_drain', n:1 }]],
  ['d_gero', 'Dr Gero', 3, 'd_and', 3, 4, '', [{ k:'bc_card', n:1, tb:'d_and' }]],
  ['d_c18', 'C-18', 3, 'd_and', 4, 3, '', [{ k:'dr_buff_rand', a:2, h:2, tb:'d_and' }]],
  ['d_celljr', 'Cell Junior', 3, 'd_and', 2, 3, '', [{ k:'dr_aoe', d:1 }]],
  ['d_c17', 'C-17', 4, 'd_and', 5, 4, 's', [{ k:'dr_dmg', d:3, n:2 }]],
  ['d_c16', 'C-16', 4, 'd_and', 3, 7, 't', [{ k:'dr_aoe', d:3 }]],
  ['d_c13', 'C-13', 5, 'd_and', 6, 6, '', [{ k:'die_self', tb:'d_and', a:2, h:2 }]],
  ['d_cell', 'Cell', 6, 'd_and', 6, 7, '', [{ k:'dr_aoe', d:4 }, { k:'tf', st:[{ c:4, a:3, h:3, nm:'Cell semi-parfait' }, { c:6, a:4, h:4, nm:'Cell parfait' }] }, { k:'bc_devour' }]],
  // ----- univers Rick et Morty : 5 familles (10 personnages chacune), un personnage = une carte -----
  ['tk_meeseeks', 'Mr. Meeseeks', 0, 'r_ali', 2, 2, '', []],
  ['tk_cronen', 'Spore de Cronenberg', 0, 'r_mon', 1, 1, '', []],
  // Famille Smith : soutien entre membres de la famille
  ['rm_jerry', 'Jerry', 1, 'r_smi', 1, 3, '', [{ k:'play_self', tb:'r_smi', a:1, h:1 }]],
  ['rm_morty', 'Morty', 1, 'r_smi', 2, 1, '', [{ k:'bc_buff_rand', a:1, h:1, tb:'r_smi' }]],
  ['rm_summer', 'Summer', 2, 'r_smi', 2, 3, '', [{ k:'play_other', tb:'r_smi', a:1, h:1 }, { k:'choose', o:[{ k:'bc_buff_rand', a:2, h:0, tb:'' }, { k:'bc_buff_rand', a:0, h:2, tb:'' }] }]],
  ['rm_goldenfold', 'M. Goldenfold', 2, 'r_smi', 1, 4, 't', [{ k:'eot_buff_rand', a:1, h:1, n:1, tb:'r_smi' }]],
  ['rm_beth', 'Beth', 3, 'r_smi', 2, 4, '', [{ k:'eot_buff_all', a:1, h:1, tb:'r_smi' }]],
  ['rm_jessica', 'Jessica', 3, 'r_smi', 3, 4, '', [{ k:'bc_buff_rand', a:2, h:2, tb:'r_smi' }]],
  ['rm_bethesp', 'Beth de l\'espace', 4, 'r_smi', 4, 4, '', [{ k:'play_tribe', tb:'r_smi', a:1, h:1 }]],
  ['rm_doofus', 'Jerry Doofus', 4, 'r_smi', 2, 6, 't', [{ k:'eot_tribe_n', tb:'r_smi', a:1, h:1 }]],
  ['rm_snowball', 'Boule de neige', 5, 'r_smi', 4, 5, '', [{ k:'eot_buff_all', a:2, h:2, tb:'r_smi' }]],
  ['rm_poopy', 'Mr. Poopybutthole', 6, 'r_smi', 4, 8, '', [{ k:'bc_buff_tribe', a:2, h:2, tb:'r_smi' }, { k:'aura_bc' }]],
  // Citadelle des Ricks : le nombre de Ricks et de Mortys sur le plateau (toutes familles)
  ['rm_mortycit', 'Morty de la Citadelle', 1, 'r_cit', 1, 2, '', [{ k:'soc_rm', a:1, h:1 }]],
  ['rm_garde', 'Garde de la Citadelle', 1, 'r_cit', 1, 2, 't', [{ k:'bc_pf', n:1 }]],
  ['rm_cadet', 'Morty cadet', 2, 'r_cit', 2, 2, '', [{ k:'eot_rm', a:1, h:0 }]],
  ['rm_cuisinier', 'Rick cuisinier', 2, 'r_cit', 2, 3, '', [{ k:'bc_rm', a:1, h:1 }, { k:'craft', sp:'hs_sauce' }]],
  ['rm_ouvrier', 'Rick ouvrier', 3, 'r_cit', 3, 3, '', [{ k:'eot_rm', a:1, h:1 }]],
  ['rm_juge', 'Morty juge', 3, 'r_cit', 2, 4, '', [{ k:'bc_rm_self', a:2, h:1 }]],
  ['rm_flic', 'Rick flic', 4, 'r_cit', 4, 5, 't', [{ k:'soc_rm_all', a:1, h:1 }]],
  ['rm_simple', 'Rick Simple', 4, 'r_cit', 3, 5, '', [{ k:'play_rm', a:2, h:2 }]],
  ['rm_conseiller', 'Conseiller Rick', 5, 'r_cit', 4, 6, '', [{ k:'eot_rm_all', a:1, h:1 }]],
  ['rm_president', 'Président Morty', 6, 'r_cit', 6, 8, '', [{ k:'eot_rm_all', a:2, h:2 }]],
  // Aliens amis : des râles d'agonie pour les alliés
  ['rm_noobnoob', 'Noob-Noob', 1, 'r_ali', 1, 2, '', [{ k:'dr_buff_rand', a:1, h:1, tb:'' }]],
  ['rm_glootie', 'Glootie', 1, 'r_ali', 2, 1, '', [{ k:'dr_pf', n:1 }]],
  ['rm_squanchy', 'Squanchy', 2, 'r_ali', 3, 2, '', [{ k:'dr_buff_rand', a:2, h:1, tb:'r_ali' }]],
  ['rm_gearhead', 'Gearhead', 2, 'r_ali', 2, 3, '', [{ k:'dr_buff_all', a:1, h:1, tb:'r_ali' }]],
  ['rm_pibbles', 'Shrimply Pibbles', 3, 'r_ali', 2, 5, 't', [{ k:'dr_buff_all', a:0, h:2, tb:'' }]],
  ['rm_kevin', 'Kevin', 3, 'r_ali', 3, 3, '', [{ k:'dr_buff_rand', a:3, h:3, tb:'' }]],
  ['rm_birdperson', 'Birdperson', 4, 'r_ali', 4, 4, '', [{ k:'dr_buff_all', a:2, h:2, tb:'r_ali' }]],
  ['rm_fart', 'Fart', 4, 'r_ali', 3, 5, '', [{ k:'dr_kw', kw:'s', tb:'r_ali' }]],
  ['rm_planetina', 'Planetina', 5, 'r_ali', 4, 6, '', [{ k:'dr_buff_all', a:2, h:3, tb:'' }]],
  ['rm_unity', 'Unity', 6, 'r_ali', 5, 7, '', [{ k:'dr_buff_all', a:2, h:2, tb:'' }, { k:'aura_dr' }]],
  // Monstres et cauchemars : effets de début de combat
  ['rm_cronen', 'Cronenberg', 1, 'r_mon', 1, 2, '', [{ k:'soc_summon', card:'tk_cronen', n:1 }]],
  ['rm_parasite', 'Parasite', 1, 'r_mon', 2, 2, '', [{ k:'soc_dmg', d:1, n:1 }, { k:'bc_gem', n:1 }]],
  ['rm_jelly', 'King Jellybean', 2, 'r_mon', 3, 3, '', [{ k:'soc_dmg', d:2, n:1 }]],
  ['rm_gary', 'Sleepy Gary', 2, 'r_mon', 2, 4, '', [{ k:'soc_chill', a:2, n:1 }]],
  ['rm_terry', 'Scary Terry', 3, 'r_mon', 4, 4, 'l', [{ k:'soc_dmg', d:3, n:1 }]],
  ['rm_ver', 'Ver géant', 3, 'r_mon', 3, 5, 't', [{ k:'soc_self', a:2, h:2 }, { k:'bc_devour' }]],
  ['rm_lincler', 'Abradolph Lincler', 4, 'r_mon', 5, 5, '', [{ k:'soc_aoe', d:2 }]],
  ['rm_concerto', 'Concerto', 4, 'r_mon', 4, 7, '', [{ k:'soc_chill', a:2, n:3 }]],
  ['rm_cromulon', 'Cromulon', 5, 'r_mon', 5, 7, '', [{ k:'soc_dmg', d:4, n:3 }]],
  ['rm_balthromaw', 'Balthromaw', 6, 'r_mon', 7, 9, '', [{ k:'soc_aoe', d:2 }, { k:'aura_soc' }]],
  // Méchants : vol de stats et d'énergie
  ['rm_gromflomite', 'Garde Gromflomite', 1, 'r_mec', 2, 2, '', [{ k:'atk_drain', n:1 }]],
  ['rm_agent', 'Agent de la Fédération', 1, 'r_mec', 1, 3, '', [{ k:'soc_rob', a:1, h:0, n:1 }]],
  ['rm_tammy', 'Tammy', 2, 'r_mec', 3, 2, '', [{ k:'kill_absorb', a:1, h:1 }]],
  ['rm_curtis', 'Président Curtis', 2, 'r_mec', 1, 2, '', [{ k:'bc_robshop', n:1 }]],
  ['rm_michael', 'Krombopulos Michael', 3, 'r_mec', 2, 2, 'vc', [{ k:'soc_rob', a:2, h:0, n:1 }]],
  ['rm_nimbus', 'Mr. Nimbus', 3, 'r_mec', 3, 3, 'i', [{ k:'soc_rob', a:1, h:1, n:2 }]],
  ['rm_needful', 'Lucius Needful', 4, 'r_mec', 3, 5, '', [{ k:'bc_robshop', n:2 }]],
  ['rm_phoenix', 'Phoenixperson', 4, 'r_mec', 5, 4, 'r', [{ k:'atk_drain', n:2 }]],
  ['rm_prime', 'Rick Prime', 5, 'r_mec', 5, 5, '', [{ k:'soc_rob', a:2, h:1, n:2 }, { k:'atk_drain', n:1 }]],
  ['rm_evilmorty', 'Evil Morty', 6, 'r_mec', 5, 6, '', [{ k:'soc_rob', a:1, h:1, n:7 }, { k:'atk_drain', n:2 }]],
  // ----- univers South Park : 5 familles (10 personnages chacune), un personnage = une carte ; loi « Cohésion de groupe » -----
  ['tk_bestiole', 'Bestiole', 0, 's_ani', 2, 1, '', []],
  // Gingers et sectes : cohésion forte, conversions
  ['sp_gamin', 'Gamin roux', 1, 's_gin', 1, 2, '', [{ k:'soc_tribe_n', tb:'s_gin', a:1, h:0 }]],
  ['sp_fanatique', 'Ginger fanatique', 1, 's_gin', 2, 1, '', [{ k:'bc_convert', n:1, tb:'s_gin' }]],
  ['sp_mormon', 'Mormon (Gary)', 2, 's_gin', 1, 4, 't', [{ k:'eot_tribe_n', tb:'s_gin', a:0, h:1 }]],
  ['sp_sciento', 'Scientologue', 2, 's_gin', 2, 3, '', [{ k:'play_self', tb:'s_gin', a:1, h:1 }]],
  ['sp_buttersg', 'Butters ginger', 3, 's_gin', 3, 3, '', [{ k:'soc_nb', a:1, h:1 }]],
  ['sp_cartmang', 'Cartman ginger', 3, 's_gin', 3, 4, '', [{ k:'soc_tribe_n', tb:'s_gin', a:1, h:1 }]],
  ['sp_prophete', 'Prophète mormon', 4, 's_gin', 3, 5, '', [{ k:'bc_convert', n:2, tb:'s_gin' }, { k:'soc_tribe_n', tb:'s_gin', a:0, h:1 }]],
  ['sp_chefsecte', 'Chef de secte ginger', 4, 's_gin', 4, 5, '', [{ k:'eot_tribe_n', tb:'s_gin', a:1, h:1 }]],
  ['sp_pretre', 'Grand Prêtre de la secte', 5, 's_gin', 4, 6, '', [{ k:'bc_convert', n:2, tb:'s_gin' }, { k:'soc_tribe_n', tb:'s_gin', a:1, h:1 }]],
  ['sp_roiginger', 'Roi des Gingers', 6, 's_gin', 6, 8, '', [{ k:'soc_buff', tb:'s_gin', a:2, h:2 }, { k:'soc_nb', a:1, h:1 }]],
  // Adultes : économie et soutien
  ['sp_barbrady', 'Officier Barbrady', 1, 's_adu', 1, 3, 't', [{ k:'bc_upd', n:1 }]],
  ['sp_mackey', 'Mr. Mackey', 1, 's_adu', 1, 2, '', [{ k:'eot_nb_buff', a:0, h:1 }]],
  ['sp_sharon', 'Sharon Marsh', 2, 's_adu', 2, 3, '', [{ k:'sot_gold', n:1 }]],
  ['sp_liane', 'Liane Cartman', 2, 's_adu', 1, 4, '', [{ k:'play_other', tb:'', a:1, h:1 }]],
  ['sp_chef', 'Chef', 3, 's_adu', 3, 4, '', [{ k:'bc_item', n:1, it:'so_chili' }, { k:'choose', o:[{ k:'bc_buff_rand', a:3, h:0, tb:'' }, { k:'bc_buff_rand', a:0, h:3, tb:'' }] }]],
  ['sp_garrison', 'Mr. Garrison', 3, 's_adu', 2, 4, '', [{ k:'eot_nb_buff', a:1, h:1 }]],
  ['sp_pcprincipal', 'PC Principal', 4, 's_adu', 4, 5, 't', [{ k:'bc_buff_tribe', tb:'', a:1, h:1 }]],
  ['sp_shelly', 'Shelly Marsh', 4, 's_adu', 5, 5, '', [{ k:'atk_self', a:2, h:1 }]],
  ['sp_randy', 'Randy (Tegridy)', 5, 's_adu', 4, 6, '', [{ k:'sot_gold', n:1 }, { k:'eot_band_inc', n:2 }]],
  ['sp_maire', 'Maire McDaniels', 6, 's_adu', 6, 8, '', [{ k:'eot_buff_all', tb:'', a:1, h:1 }, { k:'sot_gold', n:2 }]],
  // Goths : solitaires, poison, râles d'agonie, se nourrissent des morts
  ['sp_petitgoth', 'Petit Goth', 1, 's_got', 1, 2, '', [{ k:'soc_lone', a:2, h:1 }]],
  ['sp_gothfumeur', 'Goth fumeur', 1, 's_got', 2, 2, '', [{ k:'dr_dmg', d:2, n:1 }]],
  ['sp_gothboucle', 'Goth bouclé', 2, 's_got', 2, 4, '', [{ k:'die_self', tb:'', a:1, h:1 }]],
  ['sp_gothfille', 'Goth fille', 2, 's_got', 2, 4, '', [{ k:'dr_buff_all', tb:'s_got', a:1, h:1 }]],
  ['sp_henrietta', 'Henrietta', 3, 's_got', 3, 4, '', [{ k:'dr_dmg', d:3, n:1 }, { k:'soc_lone', a:1, h:1 }]],
  ['sp_michael', 'Michael', 3, 's_got', 3, 3, 'v', [{ k:'die_self', tb:'s_got', a:1, h:1 }]],
  ['sp_pete', 'Pete', 4, 's_got', 4, 5, '', [{ k:'die_others', tb:'s_got', a:1, h:1 }]],
  ['sp_firkle', 'Firkle', 4, 's_got', 4, 5, '', [{ k:'dr_dmg', d:3, n:2 }]],
  ['sp_vampemo', 'Vampire emo', 5, 's_got', 5, 6, 'l', [{ k:'atk_drain', n:2 }, { k:'die_self', tb:'', a:1, h:1 }]],
  ['sp_gothsupreme', 'Goth suprême', 6, 's_got', 7, 8, '', [{ k:'die_others', tb:'', a:1, h:1 }, { k:'dr_dmg', d:4, n:3 }]],
  // Célébrités parodiées : grands effets de début de combat, bouclier divin, cadeaux
  ['sp_lutin', 'Lutin du Père Noël', 1, 's_cel', 1, 2, '', [{ k:'soc_dmg', d:1, n:1 }]],
  ['sp_mrhat', 'Mr. Hat', 1, 's_cel', 1, 2, '', [{ k:'soc_self', a:1, h:1 }]],
  ['sp_towelie', 'Towelie', 2, 's_cel', 2, 2, '', [{ k:'bc_item', n:1, it:'so_sac' }]],
  ['sp_terrance', 'Terrance', 2, 's_cel', 3, 2, '', [{ k:'duo', card:'sp_phillip', a:2, h:2 }]],
  ['sp_phillip', 'Phillip', 3, 's_cel', 2, 4, '', [{ k:'duo', card:'sp_terrance', a:2, h:2 }, { k:'soc_dmg', d:2, n:1 }]],
  ['sp_hankey', 'Mr. Hankey', 3, 's_cel', 2, 5, '', [{ k:'soc_aoe', d:1 }]],
  ['sp_jesus', 'Jésus', 4, 's_cel', 3, 6, 'i', [{ k:'soc_kw', kw:'s', tb:'s_cel' }]],
  ['sp_perenoel', 'Père Noël', 4, 's_cel', 4, 5, '', [{ k:'bc_spell', n:2 }, { k:'craft', sp:'hs_cadeau' }]],
  ['sp_satan', 'Satan', 5, 's_cel', 6, 6, '', [{ k:'soc_aoe', d:2 }, { k:'soc_self', a:2, h:2 }]],
  ['sp_cthulhu', 'Cthulhu', 6, 's_cel', 7, 8, '', [{ k:'soc_aoe', d:2 }, { k:'aura_soc' }]],
  // Animaux : Bestioles (jetons), invocations, renaissance
  ['sp_lemmiwinks', 'Lemmiwinks', 1, 's_ani', 1, 2, 'c', [{ k:'dr_summon', card:'tk_bestiole', n:1 }]],
  ['sp_sparky', 'Sparky', 1, 's_ani', 2, 1, '', [{ k:'bc_summon', card:'tk_bestiole', n:1 }]],
  ['sp_kitty', 'Mr. Kitty', 2, 's_ani', 2, 3, 'r', [{ k:'eot_card_buff', card:'tk_bestiole', a:1, h:1 }]],
  ['sp_fluffy', 'Fluffy (cochon)', 2, 's_ani', 1, 4, '', [{ k:'dr_summon', card:'tk_bestiole', n:2 }]],
  ['sp_dinde', 'Dinde géante', 3, 's_ani', 3, 5, 't', [{ k:'dr_summon', card:'tk_bestiole', n:2 }]],
  ['sp_stripe', 'Stripe (gremlin)', 3, 's_ani', 2, 3, '', [{ k:'soc_summon', card:'tk_bestiole', n:2 }]],
  ['sp_scuzzlebutt', 'Scuzzlebutt', 4, 's_ani', 4, 6, 't', [{ k:'bc_summon', card:'tk_bestiole', n:2 }, { k:'bc_gem', n:2 }]],
  ['sp_manbearpig', 'ManBearPig', 4, 's_ani', 6, 5, 'r', [{ k:'atk_self', a:1, h:1 }]],
  ['sp_hamster', 'Hamster géant', 5, 's_ani', 4, 7, '', [{ k:'eot_card_buff', card:'tk_bestiole', a:2, h:2 }, { k:'bc_summon', card:'tk_bestiole', n:1 }, { k:'bc_devour' }]],
  ['sp_cochonelephant', 'Cochon-éléphant', 6, 's_ani', 6, 8, '', [{ k:'soc_kw', kw:'r', tb:'s_ani' }, { k:'dr_summon', card:'tk_bestiole', n:3 }]],
  // ----- univers Les Simpson v2 : 5 familles (10 personnages chacune) jouées comme des tribus de Champs de bataille ; mécanique « Donuts » (gemmes +1/+1) -----
  ['tk_zombie', 'Zombie (petit)', 0, 'si_hor', 2, 1, 'r', []],
  ['tk_minirobot', 'Mini-robot', 0, 'si_hor', 1, 1, 'r', []],
  // Simpson et voisins : donuts (Huran)
  ['si_milhouse', 'Milhouse', 1, 'si_fam', 2, 1, '', [{ k:'bc_donut', n:1 }]],
  ['si_rodtodd', 'Rod et Todd Flanders', 1, 'si_fam', 1, 2, '', [{ k:'sell_donut', n:2 }]],
  ['si_patty', 'Patty', 2, 'si_fam', 2, 3, '', [{ k:'eot_donut_l' }]],
  ['si_selma', 'Selma', 2, 'si_fam', 3, 2, '', [{ k:'eot_donut_r' }]],
  ['si_papanoel', 'Petit Papa Noël', 3, 'si_fam', 3, 3, '', [{ k:'bc_donut', n:1 }, { k:'dr_donut', n:1 }]],
  ['si_bouledeneige', 'Boule de neige II', 3, 'si_fam', 2, 4, '', [{ k:'don_other', tb:'si_fam', a:1, h:1 }]],
  ['si_maude', 'Maude Flanders', 4, 'si_fam', 4, 4, 's', [{ k:'donc_tribe', tb:'si_fam', a:0, h:1 }]],
  ['si_jacqueline', 'Jacqueline Bouvier', 4, 'si_fam', 2, 6, '', [{ k:'bc_donut_up', a:1, h:0 }]],
  ['si_herb', 'Herb Powell', 5, 'si_fam', 4, 6, '', [{ k:'spend_donut', n:4, tb:'si_fam' }]],
  ['si_mona', 'Mona Simpson', 6, 'si_fam', 5, 7, '', [{ k:'eot_donut_all', tb:'' }]],
  // Taverne de Moe : cris de guerre (Murlocs)
  ['si_barney', 'Barney', 1, 'si_moe', 2, 1, '', [{ k:'bc_buff_rand', tb:'si_moe', a:1, h:1 }]],
  ['si_lenny', 'Lenny', 1, 'si_moe', 1, 2, '', [{ k:'play_self', tb:'si_moe', a:1, h:1 }]],
  ['si_carl', 'Carl', 2, 'si_moe', 2, 3, '', [{ k:'bc_buff_tribe', tb:'si_moe', a:1, h:2 }]],
  ['si_sam', 'Sam', 2, 'si_moe', 3, 2, '', [{ k:'hplay_self', tb:'si_moe', a:2, h:2 }]],
  ['si_moe', 'Moe', 3, 'si_moe', 3, 3, '', [{ k:'soc_buff', tb:'si_moe', a:2, h:1 }]],
  ['si_otto', 'Otto', 3, 'si_moe', 3, 2, '', [{ k:'bc_disc', tb:'si_moe' }]],
  ['si_gil', 'Gil', 4, 'si_moe', 2, 4, '', [{ k:'dr_hand', a:5, h:5 }]],
  ['si_larry', 'Larry', 4, 'si_moe', 4, 3, '', [{ k:'bc_kw', kw:'n', n:1, tb:'si_moe' }]],
  ['si_duffman', 'Duffman', 5, 'si_moe', 6, 3, '', [{ k:'bc_buff_tribe', tb:'si_moe', a:2, h:2 }, { k:'dr_buff_all', tb:'si_moe', a:2, h:2 }]],
  ['si_dirigeable', 'Dirigeable Duff', 6, 'si_moe', 6, 8, '', [{ k:'aura_bc' }]],
  // Crapules : l'or (Pirates)
  ['si_snake', 'Snake', 1, 'si_cra', 2, 2, 'c', [{ k:'bc_upd', n:1 }]],
  ['si_jimbo', 'Jimbo', 1, 'si_cra', 1, 3, '', [{ k:'bc_inc', n:1 }]],
  ['si_nelson', 'Nelson', 2, 'si_cra', 3, 2, '', [{ k:'sell_gold', n:2 }]],
  ['si_hutz', 'Lionel Hutz', 2, 'si_cra', 2, 3, '', [{ k:'play_self', tb:'si_cra', a:1, h:1 }]],
  ['si_grostony', 'Gros Tony', 3, 'si_cra', 3, 4, '', [{ k:'spend_buff', n:5, tb:'si_cra', a:1, h:0 }]],
  ['si_louie', 'Louie', 3, 'si_cra', 4, 3, '', [{ k:'bc_bought', tb:'si_cra', a:1, h:1 }]],
  ['si_docnick', 'Docteur Nick', 4, 'si_cra', 3, 5, '', [{ k:'hand_buff', tb:'si_cra', a:1, h:1 }, { k:'craft', sp:'hs_ordo' }]],
  ['si_lanley', 'Lyle Lanley', 4, 'si_cra', 4, 4, '', [{ k:'sot_gold', n:1 }]],
  ['si_tahitibob', 'Tahiti Bob', 5, 'si_cra', 5, 5, '', [{ k:'buy_gold', tb:'si_cra', n:1 }]],
  ['si_scorpio', 'Hank Scorpio', 6, 'si_cra', 6, 7, '', [{ k:'aatk_perm', tb:'si_cra', a:2, h:1 }]],
  // Autorités : Bouclier divin, Magnétisme (Mécas)
  ['si_lou', 'Lou', 1, 'si_aut', 2, 1, '', [{ k:'dr_dmg', d:2, n:1 }]],
  ['si_eddie', 'Eddie', 1, 'si_aut', 2, 2, 's', [{ k:'bc_gem', n:1 }]],
  ['si_willie', 'Willie', 2, 'si_aut', 2, 3, 'ts', [{ k:'choose', o:[{ k:'bc_self', a:2, h:2 }, { k:'bc_kw', kw:'t', n:1 }] }]],
  ['si_edna', 'Edna Krabappel', 2, 'si_aut', 2, 2, '', [{ k:'magnet' }, { k:'sot_gold', n:1 }]],
  ['si_skinner', 'Principal Skinner', 3, 'si_aut', 2, 4, '', [{ k:'shield_self', a:2, h:0 }]],
  ['si_lovejoy', 'Révérend Lovejoy', 3, 'si_aut', 2, 4, 'ts', [{ k:'magnet' }]],
  ['si_wiggum', 'Chef Wiggum', 4, 'si_aut', 4, 5, '', [{ k:'die_avenge_dmg', n:2, d:5 }]],
  ['si_hibbert', 'Dr Hibbert', 4, 'si_aut', 3, 6, '', [{ k:'shield_gain' }]],
  ['si_quimby', 'Maire Quimby', 5, 'si_aut', 4, 6, '', [{ k:'shield_perm', a:3, h:3 }]],
  ['si_chalmers', 'Superintendant Chalmers', 6, 'si_aut', 7, 8, 's', [{ k:'cleave' }]],
  // Horror Show : Réincarnation (Morts-vivants)
  ['si_zombie', 'Zombie', 1, 'si_hor', 2, 1, 'tr', []],
  ['si_gremlin', 'Gremlin du bus', 1, 'si_hor', 1, 2, 'r', [{ k:'eot_buff_rand', a:1, h:0, n:1, tb:'si_hor' }]],
  ['si_kang', 'Kang', 2, 'si_hor', 2, 3, '', [{ k:'bc_tribe_atk', tb:'si_hor', a:1 }]],
  ['si_kodos', 'Kodos', 2, 'si_hor', 2, 2, '', [{ k:'pas_kk' }]],
  ['si_bartmouche', 'Bart-mouche', 3, 'si_hor', 3, 2, '', [{ k:'dr_summon', card:'tk_zombie', n:1 }]],
  ['si_garou', 'Loup-garou Flanders', 3, 'si_hor', 4, 3, 'i', [{ k:'die_avenge_self', n:2, a:1, h:1 }]],
  ['si_robotitchy', 'Robot Itchy', 4, 'si_hor', 4, 3, '', [{ k:'soc_reborn', tb:'si_hor' }]],
  ['si_robotscratchy', 'Robot Scratchy', 4, 'si_hor', 3, 5, '', [{ k:'dr_summon', card:'tk_minirobot', n:1 }]],
  ['si_vampireburns', 'Vampire Burns', 5, 'si_hor', 4, 7, 'l', [{ k:'reborn_perm', tb:'si_hor', a:1, h:1 }]],
  ['si_neddiable', 'Ned le Diable', 6, 'si_hor', 7, 5, 'r', [{ k:'dr_tribe_atk', tb:'si_hor', a:1 }, { k:'eot_devour' }]],
  // ----- univers Ninja : les 5 villages (10 serviteurs chacun) + kekkei genkai -----
  ['n_f1', 'Genin de Konoha', 1, 'n_feu', 2, 2, '', [{ k:'soc_dmg', d:1, n:2 }]],
  ['n_f2', 'Apprenti des kibaku fuda', 1, 'n_feu', 1, 2, '', [{ k:'ckm', c:2, m:{ k:'m_fire', d:2 } }]],
  ['n_f3', 'Chūnin du clan Uchiha', 2, 'n_feu', 3, 3, '', [{ k:'soc_dmg', d:2, n:2 }]],
  ['n_f4', 'Lanceur de kunai explosifs', 2, 'n_feu', 3, 3, '', [{ k:'dr_dmg', d:3, n:1 }]],
  ['n_f5', 'Jōnin du Katon', 3, 'n_feu', 4, 4, '', [{ k:'soc_fire_tb', d:1 }, { k:'cast_fire', d:1 }]],
  ['n_f6', 'Sentinelle de Konoha', 3, 'n_feu', 2, 5, '', [{ k:'soc_dmg', d:2, n:1 }, { k:'ckm', c:3, m:{ k:'m_fire', d:3 } }]],
  ['n_f7', 'Maître des kibaku fuda', 4, 'n_feu', 5, 5, '', [{ k:'soc_fire_tb', d:2 }, { k:'dr_dmg', d:3, n:1 }]],
  ['n_f8', 'ANBU de Konoha', 4, 'n_feu', 5, 5, 'c', [{ k:'soc_dmg', d:3, n:3 }]],
  ['n_f9', 'Jōnin d’élite Uchiha', 5, 'n_feu', 6, 7, '', [{ k:'soc_aoe', d:2 }, { k:'ckm', c:4, m:{ k:'m_fire', d:5 } }]],
  ['n_f10', 'Hokage de la Volonté du Feu', 6, 'n_feu', 8, 8, '', [{ k:'soc_aoe', d:3 }, { k:'soc_fire_tb', d:2 }]],
  ['n_v1', 'Apprenti kugutsu de Suna', 1, 'n_vent', 1, 2, '', [{ k:'bc_summon', card:'tk_puppet', n:1 }]],
  ['n_v2', 'Garde du désert de Suna', 1, 'n_vent', 2, 2, '', [{ k:'ckm', c:2, m:{ k:'m_summon', card:'tk_puppet' } }]],
  ['n_v3', 'Chūnin marionnettiste', 2, 'n_vent', 3, 3, '', [{ k:'eot_card_buff', card:'tk_puppet', a:1, h:1 }]],
  ['n_v4', 'Éclaireur des dunes', 2, 'n_vent', 3, 2, '', [{ k:'dr_summon', card:'tk_puppet', n:2 }]],
  ['n_v5', 'Maître des fils de chakra', 3, 'n_vent', 3, 4, '', [{ k:'bc_summon', card:'tk_puppet', n:2 }, { k:'cast_buff_tribe', a:1, h:1, tb:'n_vent' }]],
  ['n_v6', 'Porteur du Suna no tate', 3, 'n_vent', 2, 6, 't', [{ k:'ckm', c:3, m:{ k:'m_buffall', a:0, h:2, tb:'n_vent' } }]],
  ['n_v7', 'Marionnettiste du Corps d’élite', 4, 'n_vent', 4, 5, '', [{ k:'die_self', tb:'n_vent', a:2, h:1 }]],
  ['n_v8', 'Ninja du Fūton de Suna', 4, 'n_vent', 5, 4, '', [{ k:'soc_buff', a:0, h:2, tb:'n_vent' }]],
  ['n_v9', 'Kazekage des marionnettes', 5, 'n_vent', 5, 6, '', [{ k:'eot_card_buff', card:'tk_puppet', a:2, h:2 }, { k:'ckm', c:4, m:{ k:'m_summon', card:'tk_puppet' } }]],
  ['n_v10', 'Gardien du Sabaku', 6, 'n_vent', 6, 9, '', [{ k:'soc_buff', a:1, h:4, tb:'n_vent' }]],
  ['n_e1', 'Genin de Kiri', 1, 'n_eau', 2, 3, '', [{ k:'surv_self', a:1, h:1 }]],
  ['n_e2', 'Apprenti ninja-médecin', 1, 'n_eau', 1, 2, '', [{ k:'ckm', c:2, m:{ k:'m_shield' } }]],
  ['n_e3', 'Chūnin du Kirigakure', 2, 'n_eau', 2, 4, '', [{ k:'eot_buff_rand', a:0, h:2, n:1 }]],
  ['n_e4', 'Garde du Suiton', 2, 'n_eau', 2, 3, 's', [{ k:'choose', o:[{ k:'bc_kw', kw:'s', n:1 }, { k:'bc_self', a:2, h:2 }] }]],
  ['n_e5', 'Ninja-médecin de Kiri', 3, 'n_eau', 2, 5, '', [{ k:'eot_buff_all', a:0, h:1, tb:'n_eau' }, { k:'cast_buff_rand', a:0, h:2 }]],
  ['n_e6', 'Apprenti épéiste de Kiri', 3, 'n_eau', 4, 5, '', [{ k:'surv_self', a:2, h:0 }]],
  ['n_e7', 'Gardien du brouillard', 4, 'n_eau', 3, 7, 's', [{ k:'ckm', c:3, m:{ k:'m_buffall', a:1, h:2, tb:'n_eau' } }]],
  ['n_e8', 'Maître du Shōsen jutsu', 4, 'n_eau', 4, 6, '', [{ k:'soc_kw', kw:'s', tb:'n_eau' }]],
  ['n_e9', 'Héritier des Sept Sabres', 5, 'n_eau', 6, 6, 'l', [{ k:'dr_buff_all', a:2, h:2, tb:'n_eau' }]],
  ['n_e10', 'Mizukage du brouillard', 6, 'n_eau', 6, 9, '', [{ k:'soc_kw', kw:'r', tb:'n_eau' }]],
  ['n_o1', 'Genin de Kumo', 1, 'n_foudre', 1, 1, '', [{ k:'win_self', a:1, h:0 }]],
  ['n_o2', 'Ninja du Raiton', 1, 'n_foudre', 1, 2, '', [{ k:'ckm', c:2, m:{ k:'m_self', a:1, h:1 } }]],
  ['n_o3', 'Chūnin du Raiton', 2, 'n_foudre', 3, 2, '', [{ k:'win_self', a:1, h:1 }]],
  ['n_o4', 'Élève jinchūriki', 2, 'n_foudre', 2, 2, '', [{ k:'win_self', a:0, h:2 }]],
  ['n_o5', 'Garde du Raikage', 3, 'n_foudre', 3, 4, '', [{ k:'win_self', a:1, h:1 }, { k:'cast_ck', n:1 }]],
  ['n_o6', 'Coureur du Raiton no yoroi', 3, 'n_foudre', 4, 3, 'wi', [{ k:'win_self', a:1, h:1 }]],
  ['n_o7', 'Jinchūriki instable', 4, 'n_foudre', 4, 5, '', [{ k:'win_self', a:1, h:1 }, { k:'dr_summon', card:'tk_bijuu', n:1 }]],
  ['n_o8', 'Escouade de Kumo', 4, 'n_foudre', 5, 5, '', [{ k:'win_all', a:1, h:0, tb:'n_foudre' }]],
  ['n_o9', 'Hôte d’un bijū', 5, 'n_foudre', 5, 7, '', [{ k:'win_self', a:2, h:2 }, { k:'dr_summon', card:'tk_bijuu', n:1 }]],
  ['n_o10', 'Raikage de la tempête', 6, 'n_foudre', 7, 8, '', [{ k:'win_all', a:1, h:1, tb:'n_foudre' }, { k:'ckm', c:4, m:{ k:'m_self', a:3, h:3 } }]],
  ['n_t1', 'Genin d’Iwa', 1, 'n_terre', 1, 3, 't', []],
  ['n_t2', 'Bâtisseur du Doton', 1, 'n_terre', 1, 2, '', [{ k:'ckm', c:2, m:{ k:'m_wall', h:3 } }]],
  ['n_t3', 'Chūnin du Doryūheki', 2, 'n_terre', 2, 4, 't', [{ k:'dr_summon', card:'tk_mur', n:1 }]],
  ['n_t4', 'Garde des falaises d’Iwa', 2, 'n_terre', 2, 3, '', [{ k:'eot_buff_taunt', a:0, h:1 }]],
  ['n_t5', 'Invocateur de Doryūheki', 3, 'n_terre', 2, 5, '', [{ k:'soc_summon', card:'tk_mur', n:1 }, { k:'cast_self', a:0, h:2 }]],
  ['n_t6', 'Colosse du Doton', 3, 'n_terre', 3, 6, 't', [{ k:'eot_anchor' }]],
  ['n_t7', 'Maître de la forteresse d’Iwa', 4, 'n_terre', 3, 8, 't', [{ k:'eot_buff_taunt', a:1, h:2 }]],
  ['n_t8', 'Lanceur de rochers d’Iwa', 4, 'n_terre', 5, 5, '', [{ k:'soc_avalanche' }]],
  ['n_t9', 'Gardien de la montagne', 5, 'n_terre', 4, 9, 't', [{ k:'soc_avalanche' }, { k:'ckm', c:3, m:{ k:'m_wall', h:5 } }]],
  ['n_t10', 'Tsuchikage de l’Avalanche', 6, 'n_terre', 6, 10, 't', [{ k:'soc_avalanche' }, { k:'eot_buff_taunt', a:2, h:2 }]],
  ['n_k1', 'Gardien du Yōton', 4, 'n_feu', 3, 6, 't', [{ k:'soc_dmg', d:2, n:1 }, { k:'combo_kg', a:1, h:2 }]],
  ['n_k2', 'Disciple du Hyōton', 3, 'n_eau', 3, 4, '', [{ k:'bc_summon', card:'tk_puppet', n:1 }, { k:'combo_kg', a:1, h:1 }]],
  ['n_k3', 'Dragon du Ranton', 5, 'n_foudre', 5, 6, '', [{ k:'win_self', a:1, h:1 }, { k:'combo_kg', a:2, h:2 }]],
  ['n_k4', 'Sculpteur explosif', 4, 'n_terre', 4, 5, '', [{ k:'dr_dmg', d:4, n:1 }, { k:'combo_kg', a:2, h:1 }]],
  ['n_k5', 'Ninja du Shakuton', 5, 'n_feu', 5, 5, '', [{ k:'soc_fire_tb', d:1 }, { k:'combo_kg', a:2, h:2 }]],
  ['tk_puppet', 'Kugutsu', 0, 'n_vent', 1, 1, '', []],
  // nouvelles mécaniques : pacte, sceaux, sacrifice, économie, sorts
  ['tk_toad', 'Crapaud de Myōboku', 0, 'n_feu', 2, 2, '', []],
  ['tk_slug', 'Limace de Shikkotsu', 0, 'n_eau', 1, 4, '', []],
  ['tk_snake', 'Serpent de Ryūchi', 0, 'n_foudre', 3, 2, '', []],
  ['tk_shark', 'Requin du Suiton', 0, 'n_eau', 4, 3, '', []],
  ['n_p1', 'Disciple du mont Myōboku', 2, 'n_feu', 2, 2, '', [{ k:'bc_pact', card:'tk_toad', n:1 }]],
  ['n_p2', 'Disciple de la forêt Shikkotsu', 3, 'n_eau', 2, 4, '', [{ k:'bc_pact', card:'tk_slug', n:1 }, { k:'eot_pact_buff', a:1, h:1 }]],
  ['n_p3', 'Sannin de la grotte Ryūchi', 5, 'n_foudre', 4, 6, '', [{ k:'bc_pact', card:'tk_snake', n:2 }, { k:'eot_pact_buff', a:1, h:0 }, { k:'eot_devour' }]],
  ['n_s1', 'Apprenti fūinjutsu', 1, 'n_feu', 1, 2, '', [{ k:'bc_seal', n:1 }]],
  ['n_s2', 'Gardien du fūinjutsu', 3, 'n_terre', 2, 5, 't', [{ k:'eot_seal', n:1 }]],
  ['n_s3', 'Maître fūinjutsu de Suna', 5, 'n_vent', 4, 6, '', [{ k:'eot_seal', n:2 }]],
  ['n_x1', 'Shinobi kamikaze', 1, 'n_foudre', 1, 1, '', [{ k:'dr_buff_rand', a:2, h:1, tb:'' }]],
  ['n_x2', 'Porteur de kibaku fuda', 3, 'n_terre', 3, 3, '', [{ k:'dr_dmg', d:2, n:2 }]],
  ['n_x3', 'Nukenin de Kiri', 5, 'n_eau', 5, 4, '', [{ k:'dr_buff_all', a:2, h:2, tb:'' }]],
  ['n_g1', 'Colporteur de Suna', 1, 'n_vent', 2, 1, '', [{ k:'sell_gold', n:1 }, { k:'bc_gem', n:1 }]],
  ['n_g2', 'Informateur de Konoha', 2, 'n_feu', 2, 3, '', [{ k:'sot_gold', n:1 }]],
  ['n_g3', 'Trésorier du Tsuchikage', 4, 'n_terre', 3, 6, '', [{ k:'sot_gold', n:1 }, { k:'sell_gold', n:2 }]],
  ['n_c1', 'Élève de l’Académie de Kumo', 2, 'n_foudre', 2, 3, '', [{ k:'cast_self', a:1, h:1 }]],
  ['n_c2', 'Archiviste des rouleaux interdits', 4, 'n_vent', 4, 5, '', [{ k:'cast_buff_rand', a:2, h:2 }, { k:'craft', sp:'hs_rouleau' }]],
  ['tk_bijuu', 'Bijū', 0, 'n_foudre', 6, 6, '', []],
  // bêtes d'invocation (apparaissent à l'Éveil grâce au pacte)
  ['nb_feu', 'Salamandre de braise', 0, 'n_feu', 6, 6, '', []],
  ['nb_vent', 'Loup des vents', 0, 'n_vent', 6, 5, '', []],
  ['nb_eau', 'Serpent des marées', 0, 'n_eau', 5, 7, '', []],
  ['nb_foudre', 'Tigre de foudre', 0, 'n_foudre', 7, 5, '', []],
  ['nb_terre', 'Sanglier de roc', 0, 'n_terre', 4, 9, '', []],
  // ===== Naruto : personnages de l'animé, pouvoirs fidèles (jutsus de soutien et de combat, transformations) =====
  ['tk_kclone', 'Clone de l’ombre', 0, 'nk_kon', 1, 1, '', []],
  ['tk_zetsub', 'Zetsu blanc', 0, 'nk_aka', 1, 1, '', []],
  ['tk_crapaud', 'Crapaud du mont Myōboku', 0, 'nk_inv', 2, 3, '', []],
  ['tk_karasu', 'Karasu', 0, 'nk_sun', 2, 2, '', [{ k:'soc_kwself', kw:'n' }]],
  ['tk_kuroari', 'Kuroari', 0, 'nk_sun', 2, 3, '', [{ k:'soc_bind', who:'face' }]],
  ['tk_sanshouo', 'Sanshōuo', 0, 'nk_sun', 1, 6, 't', []],
  ['tk_pantin', 'Marionnette', 0, 'nk_sun', 2, 2, '', []],
  ['tk_kazekage3', 'Troisième Kazekage', 0, 'nk_sun', 4, 4, '', [{ k:'soc_kwself', kw:'n' }]],
  ['tk_pere', 'Père', 0, 'nk_sun', 3, 3, '', []],
  ['tk_mere', 'Mère', 0, 'nk_sun', 3, 3, '', []],
  ['tk_argile', 'Araignée d’argile', 0, 'nk_aka', 1, 1, '', [{ k:'dr_dmg', d:3, n:1 }]],
  ['tk_doki', 'Doki au gourdin', 0, 'nk_inv', 2, 2, '', []],
  ['tk_doki2', 'Doki aux griffes', 0, 'nk_inv', 3, 1, '', []],
  ['tk_doki3', 'Doki enchaîné', 0, 'nk_inv', 1, 3, 't', []],
  ['tk_ukon', 'Ukon', 0, 'nk_oto', 3, 3, '', []],
  ['tk_ninken', 'Meute de ninken', 0, 'nk_inv', 4, 4, '', [{ k:'soc_bind', who:'face' }]],
  ['tk_katsuyu', 'Katsuyu', 0, 'nk_inv', 3, 10, 't', [{ k:'surv_heal', n:2 }, { k:'dr_summon2', card:'tk_katsuyu2', n:2 }]],
  ['tk_katsuyu2', 'Petite Katsuyu', 0, 'nk_inv', 1, 5, 't', []],
  ['tk_rashomon', 'Rashōmon', 0, 'nk_inv', 0, 12, 't', []],
  ['tk_serpent', 'Serpent d’Orochimaru', 0, 'nk_inv', 3, 2, '', []],
  ['tk_aoda', 'Aoda', 0, 'nk_inv', 5, 5, '', []],
  ['tk_requin', 'Requin d’eau', 0, 'nk_inv', 3, 2, '', []],
  // ----- Le Seigneur des Anneaux -----
  ['tl_snaga', 'Snaga', 0, 'lo_cre', 1, 1, '', []],
  ['tl_mumak', 'Mûmak', 0, 'lo_cre', 4, 5, '', [{ k:'cleave', nm:'Défenses' }]],
  ['tl_beteailee', 'Bête ailée', 0, 'lo_cre', 5, 4, 'w', []],
  ['tl_warg', 'Warg', 0, 'lo_cre', 2, 2, '', []],
  ['tl_uruk', 'Uruk-hai', 0, 'lo_cre', 3, 3, '', []],
  ['tl_urukj', 'Jeune Uruk', 0, 'lo_cre', 2, 3, '', []],
  ['tl_ent', 'Ent', 0, 'lo_cre', 4, 6, 't', []],
  ['tl_huorn', 'Huorn', 0, 'lo_cre', 2, 4, 't', []],
  ['tl_aigle', 'Aigle géant', 0, 'lo_cre', 5, 5, '', [{ k:'sickle', nm:'Serres' }]],
  ['tl_morts', 'Soldat de l’Armée des Morts', 0, 'lo_cre', 4, 4, 'c', []],
  ['tl_nazgul', 'Nazgûl', 0, 'lo_cre', 4, 4, '', [{ k:'pierce', nm:'Traque du Porteur' }]],
  ['tl_balrog', 'Balrog', 0, 'lo_cre', 6, 6, '', [{ k:'burn', d:2, nm:'Fouet de flammes' }]],
  ['tl_cavalier', 'Rohirrim', 0, 'lo_cre', 3, 2, '', [{ k:'atk_self', a:1, h:0, nm:'Charge' }]],
  ['lo_garde', 'Garde de la Citadelle', 1, 'lo_hom', 1, 3, 't', []],
  ['lo_cavalier', 'Cavalier du Rohan', 1, 'lo_hom', 2, 1, '', [{ k:'atk_self', a:1, h:0, nm:'Charge' }]],
  ['lo_eowyn', 'Éowyn', 2, 'lo_hom', 2, 3, '', [{ k:'pierce', nm:'Dame protectrice' }]],
  ['lo_faramir', 'Faramir', 2, 'lo_hom', 2, 4, '', [{ k:'soc_dmg', d:2, n:1 }]],
  ['lo_eomer', 'Éomer', 3, 'lo_hom', 4, 3, '', [{ k:'atk_self', a:2, h:0, nm:'Charge' }]],
  ['lo_boromir', 'Boromir', 3, 'lo_hom', 3, 6, 't', [{ k:'dr_buff_all', a:2, h:2, tb:'' }]],
  ['lo_theoden', 'Théoden', 4, 'lo_hom', 3, 5, '', [{ k:'voy_tf', st:[{ et:2, nm:'Théoden, roi du Rohan', a:3, h:3, x:[{ k:'soc_buff', tb:'lo_hom', a:2, h:1 }] }] }]],
  ['lo_denethor', 'Denethor', 4, 'lo_hom', 2, 7, '', [{ k:'eot_buff_taunt', a:1, h:1 }]],
  ['lo_aragorn', 'Grands-Pas', 5, 'lo_hom', 5, 5, '', [{ k:'voy_tf', st:[{ et:1, nm:'Aragorn', a:3, h:3, x:[{ k:'cleave', nm:'Lame du Rôdeur' }] }, { et:3, nm:'Roi Elessar', a:5, h:5, kw:'s', x:[{ k:'soc_summon', card:'tl_morts', n:2 }] }] }]],
  ['lo_isildur', 'Isildur', 6, 'lo_hom', 6, 6, 's', [{ k:'kill_perm', a:2, h:2 }]],
  ['lo_archer', 'Archer de la Lórien', 1, 'lo_elf', 1, 2, '', [{ k:'soc_dmg', d:1, n:1 }]],
  ['lo_haldir', 'Haldir', 1, 'lo_elf', 2, 2, '', [{ k:'see_camo', nm:'Sentinelle' }]],
  ['lo_arwen', 'Arwen', 2, 'lo_elf', 2, 3, '', [{ k:'aft_heal', n:2, nm:'Grâce des Elfes' }]],
  ['lo_tauriel', 'Tauriel', 2, 'lo_elf', 3, 2, '', [{ k:'chain', nm:'Flèches jumelles' }]],
  ['lo_legolas', 'Legolas', 3, 'lo_elf', 3, 3, 'w', [{ k:'soc_dmg', d:2, n:2 }]],
  ['lo_thranduil', 'Thranduil', 3, 'lo_elf', 3, 5, '', [{ k:'riposte', d:2, nm:'Lames du roi' }]],
  ['lo_elrond', 'Elrond', 4, 'lo_elf', 4, 5, '', [{ k:'eot_buff_all', a:1, h:1, tb:'lo_elf' }]],
  ['lo_galadriel', 'Galadriel', 5, 'lo_elf', 4, 7, '', [{ k:'soc_genj', who:'top', n:1, nm:'Miroir de Galadriel' }, { k:'voy_tf', st:[{ et:1, nm:'Dame de Lumière', a:2, h:2, kw:'s' }] }]],
  ['lo_gandalf', 'Gandalf le Gris', 5, 'lo_elf', 4, 6, '', [{ k:'soc_bind', who:'top', nm:'Vous ne passerez pas !' }, { k:'voy_tf', st:[{ et:2, nm:'Gandalf le Blanc', a:4, h:4, kw:'s', x:[{ k:'soc_summon', card:'tl_aigle', n:1 }] }] }]],
  ['lo_gilgalad', 'Gil-galad', 6, 'lo_elf', 7, 7, 's', [{ k:'cleave', nm:'Aeglos' }]],
  ['lo_sam', 'Sam Gamegie', 1, 'lo_nah', 1, 3, '', [{ k:'guard', card:'lo_frodon', n:99, nm:'Fidèle jardinier' }]],
  ['lo_merry', 'Merry', 1, 'lo_nah', 1, 2, '', [{ k:'kill_perm', a:1, h:1 }]],
  ['lo_pippin', 'Pippin', 1, 'lo_nah', 1, 1, '', [{ k:'bc_inc', n:1 }]],
  ['lo_frodon', 'Frodon', 2, 'lo_nah', 1, 4, '', [{ k:'soc_kwself', kw:'c' }]],
  ['lo_bilbon', 'Bilbon', 2, 'lo_nah', 2, 3, '', [{ k:'soc_i1' }]],
  ['lo_gimli', 'Gimli', 3, 'lo_nah', 3, 5, 't', [{ k:'kill_perm', a:1, h:1 }]],
  ['lo_balin', 'Balin', 3, 'lo_nah', 2, 6, 't', [{ k:'eot_buff_taunt', a:1, h:1 }]],
  ['lo_dain', 'Dáin Pied-d’Acier', 4, 'lo_nah', 4, 6, '', [{ k:'armor', d:2, nm:'Pied-d’Acier' }]],
  ['lo_thorin', 'Thorin Écu-de-Chêne', 5, 'lo_nah', 5, 6, '', [{ k:'riposte', d:2, nm:'Écu-de-Chêne' }, { k:'voy_tf', st:[{ et:1, nm:'Roi sous la Montagne', a:3, h:3, x:[{ k:'soc_buff', tb:'lo_nah', a:2, h:2 }] }] }]],
  ['lo_sylvebarbe', 'Sylvebarbe', 6, 'lo_nah', 6, 9, 't', [{ k:'bc_summon', card:'tl_ent', n:1 }, { k:'cleave', nm:'Colère des Ents' }]],
  ['lo_orque', 'Orque du Mordor', 1, 'lo_mor', 2, 2, '', [{ k:'dr_summon', card:'tl_snaga', n:1 }]],
  ['lo_gollum', 'Sméagol', 1, 'lo_mor', 1, 2, '', [{ k:'voy_tf', st:[{ et:1, nm:'Gollum', a:2, h:1, kw:'c', x:[{ k:'tgt_weak', nm:'Sournois' }] }] }]],
  ['lo_troll', 'Troll des cavernes', 2, 'lo_mor', 3, 5, 't', []],
  ['lo_bouche', 'Bouche de Sauron', 2, 'lo_mor', 2, 3, '', [{ k:'soc_chill', a:2, n:1 }]],
  ['lo_gothmog', 'Gothmog', 3, 'lo_mor', 3, 4, '', [{ k:'eot_buff_all', a:1, h:1, tb:'lo_mor' }]],
  ['lo_khamul', 'Khamûl', 3, 'lo_mor', 3, 3, '', [{ k:'soc_genj', who:'face', n:1, nm:'Souffle noir' }]],
  ['lo_arachne', 'Arachne', 4, 'lo_mor', 3, 6, '', [{ k:'soc_kwself', kw:'n' }, { k:'soc_bind', who:'face', nm:'Toile d’Arachne' }]],
  ['lo_suladan', 'Suladân', 4, 'lo_mor', 3, 3, '', [{ k:'bc_summon', card:'tl_mumak', n:1 }]],
  ['lo_roisorcier', 'Roi-Sorcier d’Angmar', 5, 'lo_mor', 5, 6, '', [{ k:'soc_genj', who:'top', n:1, nm:'Cri du Nazgûl' }, { k:'soc_summon', card:'tl_beteailee', n:1 }]],
  ['lo_sauron', 'Sauron', 6, 'lo_mor', 8, 8, '', [{ k:'cleave', nm:'Masse de Sauron' }, { k:'hit_steal', a:1, h:1 }]],
  ['lo_pisteur', 'Pisteur uruk', 1, 'lo_ise', 2, 1, '', [{ k:'tgt_weak', nm:'Traque' }]],
  ['lo_grima', 'Gríma Langue-de-Serpent', 1, 'lo_ise', 1, 3, '', [{ k:'soc_chill', a:1, n:1 }]],
  ['lo_warg', 'Chevaucheur de warg', 2, 'lo_ise', 3, 2, '', [{ k:'atk_self', a:1, h:0, nm:'Charge' }]],
  ['lo_dunlending', 'Homme du Pays de Dun', 2, 'lo_ise', 2, 3, '', [{ k:'dr_dmg', d:2, n:1 }]],
  ['lo_berserker', 'Berserker uruk', 3, 'lo_ise', 4, 2, '', [{ k:'dr_aoe', d:2, nm:'Mine explosive' }]],
  ['lo_mauhur', 'Mauhúr', 3, 'lo_ise', 3, 4, '', [{ k:'eot_buff_all', a:1, h:1, tb:'lo_ise' }]],
  ['lo_ugluk', 'Uglúk', 4, 'lo_ise', 4, 6, '', [{ k:'atk_self', a:2, h:0, nm:'Marche forcée' }, { k:'kill_perm', a:1, h:1 }]],
  ['lo_sharku', 'Sharku', 4, 'lo_ise', 4, 4, '', [{ k:'bc_summon', card:'tl_warg', n:2 }]],
  ['lo_lurtz', 'Lurtz', 5, 'lo_ise', 5, 5, '', [{ k:'soc_dmg', d:4, n:1 }, { k:'kill_perm', a:1, h:1 }]],
  ['lo_saroumane', 'Saroumane le Blanc', 6, 'lo_ise', 5, 7, '', [{ k:'bc_summon', card:'tl_uruk', n:1 }, { k:'voy_tf', st:[{ et:2, nm:'Saroumane le Multicolore', a:2, h:2, x:[{ k:'soc_genj', who:'top', n:1, nm:'Voix de Saroumane' }] }] }]],
  ['lo_gobelin', 'Gobelin de la Moria', 1, 'lo_omb', 1, 1, '', [{ k:'bc_summon', card:'tl_snaga', n:1 }]],
  ['lo_oriental', 'Guerrier oriental', 1, 'lo_omb', 1, 3, 't', []],
  ['lo_haradrim', 'Archer haradrim', 2, 'lo_omb', 2, 2, '', [{ k:'soc_dmg', d:2, n:1 }]],
  ['lo_wargsauv', 'Warg sauvage', 2, 'lo_omb', 3, 1, '', [{ k:'tgt_weak', nm:'Meute' }]],
  ['lo_bolg', 'Bolg', 3, 'lo_omb', 4, 3, '', [{ k:'kill_perm', a:1, h:1 }]],
  ['lo_grandgob', 'Le Grand Gobelin', 3, 'lo_omb', 2, 6, 't', [{ k:'soc_summon', card:'tl_snaga', n:2 }, { k:'eot_buff_all', a:1, h:1, tb:'lo_omb' }]],
  ['lo_azog', 'Azog le Profanateur', 4, 'lo_omb', 5, 4, '', [{ k:'riposte', d:2, nm:'Bras de fer' }, { k:'kill_perm', a:1, h:1 }]],
  ['lo_trollg', 'Troll de guerre', 4, 'lo_omb', 4, 7, 't', [{ k:'armor', d:1, nm:'Cuir épais' }]],
  ['lo_fleau', 'Balrog de Morgoth', 5, 'lo_omb', 6, 7, '', [{ k:'burn', d:3, nm:'Fouet de flammes' }]],
  ['lo_smaug', 'Smaug', 6, 'lo_omb', 8, 7, '', [{ k:'soc_aoe', d:3, nm:'Souffle de feu' }, { k:'armor', d:2, nm:'Écailles' }]],
  ['tk_gamabunta', 'Gamabunta', 0, 'nk_inv', 8, 8, '', [{ k:'cleave' }, { k:'soc_aoe_if', card:'nk_jiraiya', d:3 }]],
  ['tk_manda', 'Manda', 0, 'nk_inv', 10, 7, '', [{ k:'soc_kwself', kw:'n' }]],
  ['tk_kamatari', 'Kamatari', 0, 'nk_inv', 5, 3, 'w', [{ k:'sickle' }]],
  ['tk_cerbere', 'Chien géant de Pain', 0, 'nk_inv', 7, 7, '', [{ k:'surv_split', n:3 }]],
  ['nk_konohamaru', 'Konohamaru', 1, 'nk_kon', 1, 3, '', [{ k:'soc_weak', a:2, nm:'Sexy no jutsu' }, { k:'jutsu', nm:'Rasengan', cb:[{ k:'soc_face', d:2 }] }]],
  ['nk_sakura', 'Sakura Haruno', 1, 'nk_kon', 1, 4, '', [{ k:'aft_heal', n:2 }, { k:'jutsu', nm:'Ninjutsu médical', fx:[{ k:'bc_buff_rand', a:0, h:2, tb:'' }], tf:[{ c:3, nm:'Force de Tsunade', a:1, h:1, x:[{ k:'cleave' }] }, { c:5, nm:'Sceau du Byakugō', a:1, h:2, kw:'r' }] }]],
  ['nk_lee', 'Rock Lee', 2, 'nk_kon', 3, 4, '', [{ k:'atk_self', a:2, h:0 }, { k:'jutsu', nm:'', none:1, tf:[{ c:4, nm:'Ouverture des Portes', a:1, h:1, kw:'w' }, { c:6, nm:'Lotus verso', a:2, h:1, x:[{ k:'soc_first', x:2 }, { k:'aft_selfdmg', d:2 }] }] }]],
  ['nk_shikamaru', 'Shikamaru Nara', 2, 'nk_kon', 2, 4, '', [{ k:'jutsu', nm:'Manipulation des ombres', cb:[{ k:'soc_bind', who:'top' }] }]],
  ['nk_ino', 'Ino Yamanaka', 2, 'nk_kon', 2, 3, '', [{ k:'jutsu', nm:'Shintenshin', cb:[{ k:'soc_genj', who:'face', n:1 }] }]],
  ['nk_choji', 'Chōji Akimichi', 2, 'nk_kon', 2, 5, 't', [{ k:'jutsu', nm:'Baika', fx:[{ k:'bc_self', a:2, h:2 }], tf:{ c:7, nm:'Mode papillon', a:6, h:6 } }]],
  ['nk_bee', 'Killer Bee', 5, 'nk_kir', 5, 8, 'w', [{ k:'jutsu', nm:'Sept lames', cb:[{ k:'soc_self', a:3, h:0 }], tf:{ c:9, nm:'Hachibi', a:6, h:6 } }]],
  ['nk_raikage', 'Yondaime Raikage', 6, 'nk_kir', 8, 11, '', [{ k:'atk_self', a:2, h:0, nm:'Armure de foudre' }, { k:'jutsu', nm:'Lariat', cb:[{ k:'soc_first', x:3 }] }]],
  ['nk_neji', 'Neji Hyūga', 3, 'nk_kon', 3, 6, '', [{ k:'soc_kwself', kw:'s', nm:'Hakkeshō Kaiten' }, { k:'pierce' }, { k:'jutsu', nm:'64 poings', cb:[{ k:'soc_seal', who:'face' }] }]],
  ['nk_kakashi', 'Kakashi Hatake', 4, 'nk_kon', 4, 7, '', [{ k:'soc_copykw' }, { k:'jutsu', nm:'Raikiri', cb:[{ k:'soc_face', d:6 }], tf:[{ c:4, nm:'Sharingan dévoilé', a:1, h:1, x:[{ k:'soc_summon', card:'tk_ninken', n:1 }] }, { c:6, nm:'Kamui', a:2, h:2, x:[{ k:'soc_kill_low' }] }, { c:9, nm:'Double Sharingan', a:3, h:3, x:[{ k:'soc_copyall' }] }] }]],
  ['nk_gai', 'Gaï Maito', 4, 'nk_kon', 5, 6, '', [{ k:'jutsu', nm:'Paon du matin', cb:[{ k:'soc_aoe', d:2 }], tf:[{ c:5, nm:'Sixième Porte', a:2, h:2, cb:[{ k:'soc_aoe', d:4 }] }, { c:7, nm:'Septième Porte', a:3, h:1, x:[{ k:'soc_first', x:3 }] }, { c:9, nm:'Huitième Porte', a:10, h:0, kw:'w', x:[{ k:'aft_burnout', n:3 }] }] }]],
  ['nk_tsunade', 'Tsunade', 5, 'nk_kon', 4, 10, '', [{ k:'aft_heal', n:4 }, { k:'jutsu', nm:'Invocation : Katsuyu', fx:[{ k:'bc_summon', card:'tk_katsuyu', n:1 }], tf:{ c:8, nm:'Création et renaissance', a:3, h:6, kw:'r' } }]],
  ['nk_jiraiya', 'Jiraiya', 5, 'nk_kon', 5, 9, '', [{ k:'jutsu', nm:'Invocation : Gamabunta', fx:[{ k:'bc_summon', card:'tk_gamabunta', n:1 }], tf:{ c:9, nm:'Ermite des crapauds', a:5, h:5, x:[{ k:'soc_face', d:8 }] } }]],
  ['nk_naruto', 'Naruto Uzumaki', 6, 'nk_kon', 6, 9, '', [{ k:'jut_any', a:2, h:2 }, { k:'jutsu', nm:'Multi-clonage', fx:[{ k:'bc_clone', n:2 }], tf:[{ c:6, nm:'Mode Ermite', a:3, h:3, x:[{ k:'soc_aoe', d:4 }] }, { c:8, nm:'Manteau de Kyūbi', a:6, h:6, kw:'w' }, { c:10, nm:'Mode Rikudō', a:3, h:3, fx:[{ k:'bc_clone', n:2, full:1 }] }] }]],
  ['nk_zetsu', 'Zetsu', 1, 'nk_aka', 2, 3, 'c', [{ k:'dr_summon', card:'tk_zetsub', n:1, nm:'Zetsu blanc' }, { k:'jutsu', nm:'Spores', cb:[{ k:'soc_steal', a:2, h:2 }] }]],
  ['nk_tobi', 'Tobi', 1, 'nk_aka', 1, 4, '', [{ k:'soc_kwself', kw:'s' }, { k:'jutsu', nm:'Kamui', fx:[{ k:'bc_self', a:0, h:2 }], tf:[{ c:5, nm:'Obito démasqué', a:2, h:2, x:[{ k:'soc_i1' }] }, { c:10, nm:'Jinchūriki de Jūbi', a:5, h:5, x:[{ k:'soc_genj', who:'top', n:1 }] }] }]],
  ['nk_deidara', 'Deidara', 2, 'nk_aka', 3, 3, '', [{ k:'dr_dmg', d:3, n:1 }, { k:'jutsu', nm:'Argile C1', fx:[{ k:'bc_summon', card:'tk_argile', n:1 }], tf:{ c:6, nm:'C4 Karura', a:2, h:2, x:[{ k:'dr_aoe', d:4 }] } }]],
  ['nk_hidan', 'Hidan', 2, 'nk_aka', 2, 4, 'r', [{ k:'immortal', card:'nk_kakuzu', n:2 }, { k:'jutsu', nm:'Rituel de Jashin', cb:[{ k:'soc_link' }], tf:{ c:6, nm:'Malédiction sanglante', a:3, h:3, kw:'l' } }]],
  ['nk_sasori', 'Sasori', 3, 'nk_aka', 3, 6, 'v', [{ k:'jutsu', nm:'Troisième Kazekage', cb:[{ k:'soc_summon', card:'tk_kazekage3', n:1 }], tf:{ c:7, nm:'Cent marionnettes', a:3, h:3, x:[{ k:'soc_fill', card:'tk_pantin' }] } }]],
  ['nk_kakuzu', 'Kakuzu', 4, 'nk_aka', 3, 7, '', [{ k:'lives', n:4 }, { k:'kill_perm', a:1, h:1 }, { k:'jutsu', nm:'Jiongu', fx:[{ k:'bc_self', a:0, h:3 }], tf:{ c:7, nm:'Masques élémentaires', a:3, h:4, x:[{ k:'soc_aoe', d:2 }] } }]],
  ['nk_kisame', 'Kisame Hoshigaki', 4, 'nk_aka', 5, 7, 'l', [{ k:'hit_steal', a:1, h:1 }, { k:'jutsu', nm:'Prison aqueuse', cb:[{ k:'soc_bind', who:'face' }], tf:{ c:8, nm:'Fusion avec Samehada', a:4, h:5, x:[{ k:'hit_steal', a:1, h:1 }, { k:'soc_summon', card:'tk_requin', n:2 }] } }]],
  ['nk_konan', 'Konan', 4, 'nk_aka', 4, 7, 's', [{ k:'dr_aoe', d:3 }, { k:'jutsu', nm:'Danse de papier', fx:[{ k:'bc_kw', kw:'s', n:1 }] }]],
  ['nk_itachi', 'Itachi Uchiha', 5, 'nk_aka', 6, 8, '', [{ k:'crow1', nm:'Clone de corbeaux' }, { k:'soc_copykw' }, { k:'jutsu', nm:'Tsukuyomi', cb:[{ k:'soc_genj', who:'top', n:2 }], tf:[{ c:6, nm:'Mangekyō', a:2, h:2, x:[{ k:'burn', d:3 }] }, { c:9, nm:'Susano’o', a:3, h:4, kw:'s', x:[{ k:'hit_seal' }] }] }]],
  ['nk_pain', 'Pain', 6, 'nk_aka', 7, 10, '', [{ k:'jutsu', nm:'Shinra Tensei', cb:[{ k:'soc_aoe', d:3 }], tf:{ c:10, nm:'Six chemins de Pain', a:6, h:6, x:[{ k:'soc_summon', card:'tk_cerbere', n:1 }, { k:'die_revive' }] } }]],
  ['nk_kankuro', 'Kankurō', 3, 'nk_sun', 3, 5, '', [{ k:'jutsu', nm:'Kugutsu', fx:[{ k:'bc_summon_of', n:1 }], tf:{ c:7, nm:'Marionnette Sasori', a:3, h:3, fx:[{ k:'bc_summon_of', n:2 }] } }]],
  ['nk_temari', 'Temari', 4, 'nk_sun', 5, 6, 'w', [{ k:'cleave' }, { k:'jutsu', nm:'Invocation : Kamatari', fx:[{ k:'bc_summon', card:'tk_kamatari', n:1 }] }]],
  ['nk_chiyo', 'Chiyo', 4, 'nk_sun', 3, 8, '', [{ k:'die_swap' }, { k:'jutsu', nm:'Transfert de vie', fx:[{ k:'bc_kw', kw:'r', n:1 }] }]],
  ['nk_gaara', 'Gaara', 6, 'nk_sun', 6, 11, 't', [{ k:'soc_kwself', kw:'s' }, { k:'jutsu', nm:'Sarcophage de sable', cb:[{ k:'soc_crush' }], tf:[{ c:6, nm:'Demi-Shukaku', a:4, h:4, x:[{ k:'riposte', d:2 }] }, { c:10, nm:'Shukaku', a:4, h:4, x:[{ k:'soc_aoe', d:3 }] }] }]],
  ['nk_tayuya', 'Tayuya', 2, 'nk_oto', 3, 4, '', [{ k:'soc_genj', who:'face', n:1 }, { k:'dr_kill_tok', cards:['tk_doki', 'tk_doki2', 'tk_doki3'] }, { k:'jutsu', nm:'Doki', fx:[{ k:'bc_fill_tok', cards:['tk_doki', 'tk_doki2', 'tk_doki3'] }], tf:{ c:5, nm:'Marque maudite', a:3, h:3 } }]],
  ['nk_kidomaru', 'Kidōmaru', 2, 'nk_oto', 3, 3, 'i', [{ k:'jutsu', nm:'Toile d’araignée', cb:[{ k:'soc_bind', who:'face' }], tf:{ c:5, nm:'Marque maudite', a:4, h:2 } }]],
  ['nk_jirobo', 'Jirōbō', 3, 'nk_oto', 3, 7, 't', [{ k:'jutsu', nm:'Dévoreur de chakra', cb:[{ k:'soc_steal', a:3, h:0 }], tf:{ c:5, nm:'Marque maudite', a:3, h:4 } }]],
  ['nk_sakon', 'Sakon et Ukon', 3, 'nk_oto', 3, 5, '', [{ k:'dr_twin', card:'tk_ukon' }, { k:'jutsu', nm:'Parasite', fx:[{ k:'bc_self', a:1, h:1 }], tf:[{ c:4, nm:'Marque de niveau 1', a:2, h:2 }, { c:7, nm:'Marque de niveau 2', a:2, h:2, kw:'w' }] }]],
  ['nk_kabuto', 'Kabuto Yakushi', 4, 'nk_oto', 3, 8, '', [{ k:'aft_full' }, { k:'jutsu', nm:'Ninjutsu médical', fx:[{ k:'bc_buff_tribe', a:0, h:3 }], tf:[{ c:6, nm:'Mode serpent', a:4, h:4 }, { c:8, nm:'Mode Ermite', a:0, h:0, x:[{ k:'soc_edo', nm:'Edo Tensei' }] }] }]],
  ['nk_kimimaro', 'Kimimaro', 4, 'nk_oto', 5, 6, '', [{ k:'riposte', d:2 }, { k:'jutsu', nm:'Danse des os', fx:[{ k:'bc_self', a:2, h:1 }], tf:[{ c:4, nm:'Marque de niveau 1', a:2, h:2 }, { c:7, nm:'Marque de niveau 2', a:2, h:2, x:[{ k:'riposte', d:2 }, { k:'cleave' }] }] }]],
  ['nk_sasuke', 'Sasuke Uchiha', 5, 'nk_oto', 5, 8, '', [{ k:'soc_copykw' }, { k:'jutsu', nm:'Chidori', cb:[{ k:'soc_face', d:5 }], tf:[{ c:5, nm:'Marque maudite', a:3, h:3 }, { c:7, nm:'Mangekyō', a:2, h:2, x:[{ k:'burn', d:3 }, { k:'soc_summon', card:'tk_aoda', n:1 }] }, { c:9, nm:'Susano’o', a:2, h:2, x:[{ k:'aft_shield' }] }] }]],
  ['nk_orochimaru', 'Orochimaru', 6, 'nk_oto', 6, 10, 'r', [{ k:'bc_summon', card:'tk_rashomon', n:1, nm:'Kuchiyose : Rashōmon' }, { k:'jutsu', nm:'Invocation : Manda', fx:[{ k:'bc_manda' }], tf:[{ c:7, nm:'Serpent blanc', a:3, h:3, kw:'n', x:[{ k:'soc_summon', card:'tk_rashomon', n:1 }] }, { c:10, nm:'Yamata no Orochi', a:4, h:4, fx:[{ k:'bc_manda' }, { k:'bc_summon', card:'tk_rashomon', n:1 }] }] }]],
  ['nk_suigetsu', 'Suigetsu Hōzuki', 1, 'nk_kir', 1, 4, '', [{ k:'armor', d:2 }, { k:'jutsu', nm:'Corps liquide', fx:[{ k:'bc_self', a:0, h:1 }] }]],
  ['nk_ameyuri', 'Ameyuri Ringo', 2, 'nk_kir', 3, 3, 'w', [{ k:'chain' }, { k:'jutsu', nm:'Kiba', fx:[{ k:'bc_self', a:1, h:0 }] }]],
  ['nk_haku', 'Haku', 3, 'nk_kir', 2, 6, 's', [{ k:'guard', card:'nk_zabuza', n:99 }, { k:'jutsu', nm:'Miroirs de glace', fx:[{ k:'bc_kw', kw:'s', n:1 }] }]],
  ['nk_jinpachi', 'Jinpachi Munashi', 3, 'nk_kir', 4, 5, '', [{ k:'cleave' }, { k:'jutsu', nm:'Shibuki', fx:[{ k:'bc_self', a:2, h:0 }] }]],
  ['nk_zabuza', 'Zabuza Momochi', 4, 'nk_kir', 5, 6, 'c', [{ k:'soc_kw', kw:'c', tb:'' }, { k:'tgt_weak' }, { k:'jutsu', nm:'Kubikiribōchō', fx:[{ k:'bc_self', a:2, h:1 }], tf:{ c:8, nm:'Démon de Kiri', a:5, h:3, kw:'l' } }]],
  ['nk_mangetsu', 'Mangetsu Hōzuki', 4, 'nk_kir', 4, 7, '', [{ k:'jutsu', nm:'Les sept épées', fx:[{ k:'bc_buff_it', a:1, h:0 }] }]],
  ['nk_mei', 'Mei Terumi', 5, 'nk_kir', 5, 9, '', [{ k:'burn', d:2 }, { k:'jutsu', nm:'Yōton', fx:[{ k:'bc_buff_tribe', a:1, h:1, tb:'' }], tf:{ c:9, nm:'Futton et Yōton combinés', a:4, h:5, x:[{ k:'soc_aoe', d:2 }] } }]],
  ['c_nj_kurama', 'Mini Kurama', 3, 'n_feu', 6, 5, '', [{ k:'soc_dmg', d:2, n:1 }, { k:'combo_self', a:2, h:1 }]],
  ['c_nj_shukaku', 'Shukaku (tanuki)', 3, 'n_vent', 5, 4, 'w', [{ k:'atk_self', a:2, h:1 }, { k:'combo_gold', n:1 }, { k:'combo_self', a:1, h:1 }]],
  ['c_nj_glaces', 'Esprit des glaces', 3, 'n_eau', 3, 8, '', [{ k:'surv_self', a:1, h:1 }, { k:'combo_self', a:1, h:2 }]],
  ['c_nj_lapin', 'Bébé lapin électrique', 3, 'n_foudre', 5, 6, '', [{ k:'atk_zap', d:1, n:1 }, { k:'combo_ck', n:1 }, { k:'combo_self', a:1, h:1 }]],
  ['c_nj_songoku', 'Singe à 4 queues', 3, 'n_terre', 2, 11, '', [{ k:'soc_self', a:1, h:0 }, { k:'combo_self', a:1, h:2 }]],
  // un compagnon par héros (même profil que son élément, passif propre)
  ['c_nj_gamabunta', 'Gamabunta (crapaud)', 3, 'n_feu', 6, 5, '', [{ k:'eot_braise_self', n:1 }, { k:'combo_self', a:2, h:1 }]],
  ['c_nj_aigle', 'Aigle de flamme', 3, 'n_feu', 6, 5, '', [{ k:'cast_self', a:1, h:0 }, { k:'combo_self', a:2, h:1 }]],
  ['c_nj_chatnoir', 'Chat noir', 3, 'n_feu', 6, 5, '', [{ k:'soc_self', a:1, h:0 }, { k:'combo_self', a:2, h:1 }]],
  ['c_nj_corbeau', 'Corbeau noir', 3, 'n_feu', 6, 5, '', [{ k:'soc_dmg', d:1, n:2 }, { k:'combo_self', a:2, h:1 }]],
  ['c_nj_renard1', 'Renard à 1 queue', 3, 'n_feu', 6, 5, '', [{ k:'atk_zap', d:1, n:1 }, { k:'combo_self', a:2, h:1 }]],
  ['c_nj_katoncrow', 'Katon Crow', 3, 'n_feu', 6, 5, '', [{ k:'atk_self', a:2, h:1 }, { k:'combo_self', a:2, h:1 }]],
  ['c_nj_zetsu', 'Zetsu enflammé', 3, 'n_feu', 6, 5, '', [{ k:'surv_self', a:1, h:0 }, { k:'combo_self', a:2, h:1 }]],
  ['c_nj_grenouille', 'Paix (grenouille)', 3, 'n_vent', 5, 4, 'w', [{ k:'cast_self', a:0, h:1 }, { k:'combo_gold', n:1 }, { k:'combo_self', a:1, h:1 }]],
  ['c_nj_sasori', 'Sasori (marionnette)', 3, 'n_vent', 5, 4, 'w', [{ k:'soc_self', a:1, h:0 }, { k:'combo_gold', n:1 }, { k:'combo_self', a:1, h:1 }]],
  ['c_nj_cerfvolant', 'Cerf-volant ninja', 3, 'n_vent', 5, 4, 'w', [{ k:'atk_zap', d:2, n:1 }, { k:'combo_gold', n:1 }, { k:'combo_self', a:1, h:1 }]],
  ['c_nj_tanuki', 'Tanuki de sable', 3, 'n_vent', 5, 4, 'w', [{ k:'surv_self', a:1, h:1 }, { k:'combo_gold', n:1 }, { k:'combo_self', a:1, h:1 }]],
  ['c_nj_singe', 'Petit singe', 3, 'n_vent', 5, 4, 'w', [{ k:'soc_dmg', d:2, n:1 }, { k:'combo_gold', n:1 }, { k:'combo_self', a:1, h:1 }]],
  ['c_nj_espritvent', 'Esprit du vent', 3, 'n_vent', 5, 4, 'w', [{ k:'atk_self', a:2, h:0 }, { k:'combo_gold', n:1 }, { k:'combo_self', a:1, h:1 }]],
  ['c_nj_faucon', 'Faucon du désert', 3, 'n_vent', 5, 4, 'w', [{ k:'eot_souffle', n:1 }, { k:'combo_gold', n:1 }, { k:'combo_self', a:1, h:1 }]],
  ['c_nj_requin', 'Requin-ninja', 3, 'n_eau', 3, 8, '', [{ k:'eot_maree_self', n:1 }, { k:'combo_self', a:1, h:2 }]],
  ['c_nj_bulle', 'Bulle d’eau vivante', 3, 'n_eau', 3, 8, '', [{ k:'cast_self', a:0, h:1 }, { k:'combo_self', a:1, h:2 }]],
  ['c_nj_hiramekarei', 'Épée légendaire (Hiramekarei)', 3, 'n_eau', 3, 8, '', [{ k:'atk_self', a:2, h:2 }, { k:'combo_self', a:1, h:2 }]],
  ['c_nj_meduse', 'Méduse d’eau', 3, 'n_eau', 3, 8, '', [{ k:'atk_zap', d:2, n:1 }, { k:'combo_self', a:1, h:2 }]],
  ['c_nj_poissonscie', 'Poisson-scie', 3, 'n_eau', 3, 8, '', [{ k:'surv_self', a:1, h:2 }, { k:'combo_self', a:1, h:2 }]],
  ['c_nj_tortue', 'Tortue des profondeurs', 3, 'n_eau', 3, 8, '', [{ k:'soc_self', a:1, h:2 }, { k:'combo_self', a:1, h:2 }]],
  ['c_nj_samehada', 'Samehada (requin)', 3, 'n_eau', 3, 8, '', [{ k:'soc_dmg', d:2, n:1 }, { k:'combo_self', a:1, h:2 }]],
  ['c_nj_nuage', 'Nuage d’orage', 3, 'n_foudre', 5, 6, '', [{ k:'atk_zap', d:1, n:2 }, { k:'combo_ck', n:1 }, { k:'combo_self', a:1, h:1 }]],
  ['c_nj_renardblanc', 'Renard blanc', 3, 'n_foudre', 5, 6, '', [{ k:'soc_dmg', d:2, n:1 }, { k:'combo_ck', n:1 }, { k:'combo_self', a:1, h:1 }]],
  ['c_nj_gyuki', 'Hachibi (Gyūki)', 3, 'n_foudre', 5, 6, '', [{ k:'atk_self', a:1, h:1 }, { k:'combo_ck', n:1 }, { k:'combo_self', a:1, h:1 }]],
  ['c_nj_ninken', 'Ninken (chiens)', 3, 'n_foudre', 5, 6, '', [{ k:'cast_self', a:1, h:0 }, { k:'combo_ck', n:1 }, { k:'combo_self', a:1, h:1 }]],
  ['c_nj_matatabi', 'Matatabi (chat à 2 queues)', 3, 'n_foudre', 5, 6, '', [{ k:'atk_self', a:3, h:0 }, { k:'combo_ck', n:1 }, { k:'combo_self', a:1, h:1 }]],
  ['c_nj_puma', 'Puma de foudre', 3, 'n_foudre', 5, 6, '', [{ k:'soc_self', a:1, h:1 }, { k:'combo_ck', n:1 }, { k:'combo_self', a:1, h:1 }]],
  ['c_nj_hibou', 'Hibou éclaireur', 3, 'n_foudre', 5, 6, '', [{ k:'surv_self', a:1, h:0 }, { k:'combo_ck', n:1 }, { k:'combo_self', a:1, h:1 }]],
  ['c_nj_geant', 'Géant rocheux', 3, 'n_terre', 2, 11, '', [{ k:'surv_self', a:0, h:1 }, { k:'combo_self', a:1, h:2 }]],
  ['c_nj_dragonbois', 'Dragon de bois', 3, 'n_terre', 2, 11, '', [{ k:'cast_self', a:0, h:1 }, { k:'combo_self', a:1, h:2 }]],
  ['c_nj_argile', 'Iwa (argile)', 3, 'n_terre', 2, 11, '', [{ k:'soc_self', a:1, h:1 }, { k:'combo_self', a:1, h:2 }]],
  ['c_nj_dragonpierre', 'Petit dragon de pierre', 3, 'n_terre', 2, 11, '', [{ k:'eot_roche', n:1 }, { k:'combo_self', a:1, h:2 }]],
  ['c_nj_rocher', 'Rocher animé', 3, 'n_terre', 2, 11, '', [{ k:'surv_self', a:1, h:0 }, { k:'combo_self', a:1, h:2 }]],
  ['c_nj_golem', 'Golem de pierre', 3, 'n_terre', 2, 11, '', [{ k:'atk_self', a:2, h:1 }, { k:'combo_self', a:1, h:2 }]],
  ['c_nj_arbre', 'Arbre gardien', 3, 'n_terre', 2, 11, '', [{ k:'soc_dmg', d:2, n:1 }, { k:'combo_self', a:1, h:2 }]],
];
const DEFAULT_CARDS = {};
DEFAULT_CARD_LIST.forEach(([id, n, t, tr, a, h, kw, fx]) => { DEFAULT_CARDS[id] = { id, n, t, tr, a, h, kw:kw.split(''), fx, art:{ f:'base', id } }; });
// kekkei genkai : seconde nature (compte pour les deux clans)
const TR2 = { n_k1:'n_terre', n_k2:'n_vent', n_k3:'n_eau', n_k4:'n_foudre', n_k5:'n_vent' };
for (const id in TR2) DEFAULT_CARDS[id].tr2 = TR2[id];
// Le Seigneur des Anneaux (duos) : réaction de chaque serviteur à l'Anneau, quand on le pose alors qu'on tient l'Anneau (doublée sur une carte dorée)
const LO_REACT = {
  lo_cavalier:{"a": 1, "h": 1, "kw": "", "sp": "", "tx": "Garde de la route : gagne +1/+1."},
  lo_garde:{"a": 0, "h": 3, "kw": "", "sp": "", "tx": "Sentinelle de Minas Tirith : gagne +0/+3."},
  lo_eowyn:{"a": 2, "h": 0, "kw": "", "sp": "", "tx": "Elle défie l’Ombre : gagne +2/+0."},
  lo_faramir:{"a": 2, "h": 3, "kw": "", "sp": "", "tx": "« Je ne le prendrais pas » : gagne +2/+3."},
  lo_boromir:{"a": 3, "h": 0, "kw": "", "sp": "boromir", "tx": "« Donne-le-moi ! » : gagne +3/+0 et son Râle d’agonie se déclenche deux fois (sa rédemption)."},
  lo_eomer:{"a": 2, "h": 1, "kw": "", "sp": "", "tx": "Il charge pour gagner du temps : gagne +2/+1."},
  lo_denethor:{"a": 4, "h": 0, "kw": "", "sp": "", "tx": "Il aurait voulu s’en servir : gagne +4/+0."},
  lo_theoden:{"a": 2, "h": 2, "kw": "", "sp": "", "tx": "Délivré de Saroumane : gagne +2/+2."},
  lo_aragorn:{"a": 2, "h": 2, "kw": "s", "sp": "", "tx": "Il refuse l’Anneau : gagne +2/+2 et Bouclier divin."},
  lo_isildur:{"a": 4, "h": 4, "kw": "", "sp": "isildur", "tx": "« Je le garde » : gagne +4/+4 mais il perd son Bouclier divin."},
  lo_archer:{"a": 1, "h": 1, "kw": "", "sp": "", "tx": "Les gardes laissent passer le porteur : gagne +1/+1."},
  lo_haldir:{"a": 1, "h": 2, "kw": "", "sp": "", "tx": "Il guide la Communauté : gagne +1/+2."},
  lo_arwen:{"a": 0, "h": 0, "kw": "", "sp": "arwen", "tx": "Elle donne sa grâce : un autre serviteur aléatoire gagne Bouclier divin."},
  lo_tauriel:{"a": 1, "h": 1, "kw": "", "sp": "", "tx": "Elle garde la forêt : gagne +1/+1."},
  lo_legolas:{"a": 2, "h": 1, "kw": "", "sp": "", "tx": "Membre de la Communauté : gagne +2/+1."},
  lo_thranduil:{"a": 0, "h": 3, "kw": "", "sp": "", "tx": "Roi méfiant : gagne +0/+3."},
  lo_elrond:{"a": 0, "h": 0, "kw": "", "sp": "elrond", "tx": "Le Conseil d’Elrond : tes autres Elfes gagnent +1/+1."},
  lo_galadriel:{"a": 3, "h": 3, "kw": "", "sp": "", "tx": "« J’ai passé l’épreuve » : gagne +3/+3."},
  lo_gandalf:{"a": 0, "h": 0, "kw": "s", "sp": "", "tx": "« Ne me tente pas ! » : gagne Bouclier divin."},
  lo_gilgalad:{"a": 3, "h": 3, "kw": "", "sp": "", "tx": "La Dernière Alliance contre l’Anneau : gagne +3/+3."},
  lo_merry:{"a": 1, "h": 1, "kw": "", "sp": "", "tx": "Membre de la Communauté : gagne +1/+1."},
  lo_pippin:{"a": 1, "h": 1, "kw": "", "sp": "", "tx": "Membre de la Communauté : gagne +1/+1."},
  lo_sam:{"a": 2, "h": 2, "kw": "t", "sp": "", "tx": "« Je vais vous porter » : gagne +2/+2 et Provocation."},
  lo_bilbon:{"a": 0, "h": 0, "kw": "c", "sp": "", "tx": "Il disparaît comme à sa fête : gagne Camouflage."},
  lo_frodon:{"a": 1, "h": 2, "kw": "c", "sp": "", "tx": "Le porteur se cache : gagne +1/+2 et Camouflage."},
  lo_balin:{"a": 1, "h": 3, "kw": "", "sp": "", "tx": "Il rêvait de reprendre la Moria : gagne +1/+3."},
  lo_gimli:{"a": 2, "h": 1, "kw": "", "sp": "", "tx": "Membre de la Communauté : gagne +2/+1."},
  lo_dain:{"a": 2, "h": 3, "kw": "", "sp": "", "tx": "Il a chassé le messager de Sauron : gagne +2/+3."},
  lo_thorin:{"a": 3, "h": 1, "kw": "", "sp": "", "tx": "Le mal du dragon : gagne +3/+1."},
  lo_sylvebarbe:{"a": 0, "h": 0, "kw": "", "sp": "none", "tx": "Les Ents ne s’en soucient pas : aucune réaction."},
  lo_gollum:{"a": 3, "h": 3, "kw": "", "sp": "", "tx": "« Mon précieux » : gagne +3/+3."},
  lo_orque:{"a": 2, "h": 2, "kw": "", "sp": "dispute", "tx": "Ils se disputent le butin : inflige 1 dégât à un autre allié (sans le tuer), puis gagne +2/+2."},
  lo_bouche:{"a": 2, "h": 2, "kw": "", "sp": "", "tx": "Le héraut du Maître : gagne +2/+2."},
  lo_troll:{"a": 1, "h": 3, "kw": "", "sp": "", "tx": "Sauron rassemble ses armées : gagne +1/+3."},
  lo_gothmog:{"a": 0, "h": 0, "kw": "", "sp": "gothmog", "tx": "Les légions se mettent en marche : tes autres serviteurs du Mordor gagnent +1/+1."},
  lo_khamul:{"a": 0, "h": 0, "kw": "w", "sp": "", "tx": "L’Anneau appelle les Nazgûl : gagne Furie des vents."},
  lo_arachne:{"a": 0, "h": 0, "kw": "", "sp": "none", "tx": "Elle ne veut que des proies : aucune réaction."},
  lo_suladan:{"a": 2, "h": 2, "kw": "", "sp": "", "tx": "Le Sud répond à l’appel : gagne +2/+2."},
  lo_roisorcier:{"a": 2, "h": 2, "kw": "w", "sp": "", "tx": "L’Anneau appelle les Nazgûl : gagne +2/+2 et Furie des vents."},
  lo_sauron:{"a": 5, "h": 5, "kw": "", "sp": "", "tx": "Il retrouve sa puissance : gagne +5/+5."},
  lo_grima:{"a": 1, "h": 2, "kw": "", "sp": "", "tx": "Il espionne pour son maître : gagne +1/+2."},
  lo_pisteur:{"a": 2, "h": 1, "kw": "", "sp": "", "tx": "Il traque les Semi-Hommes : gagne +2/+1."},
  lo_dunlending:{"a": 1, "h": 2, "kw": "", "sp": "", "tx": "Les hommes des collines suivent Saroumane : gagne +1/+2."},
  lo_warg:{"a": 2, "h": 1, "kw": "", "sp": "", "tx": "La meute flaire le porteur : gagne +2/+1."},
  lo_berserker:{"a": 3, "h": 3, "kw": "", "sp": "dispute", "tx": "Ils se disputent le butin : inflige 1 dégât à un autre allié (sans le tuer), puis gagne +3/+3."},
  lo_mauhur:{"a": 2, "h": 2, "kw": "", "sp": "", "tx": "Les Uruk-hai se rassemblent : gagne +2/+2."},
  lo_sharku:{"a": 2, "h": 2, "kw": "", "sp": "", "tx": "La meute flaire le porteur : gagne +2/+2."},
  lo_ugluk:{"a": 3, "h": 3, "kw": "", "sp": "dispute", "tx": "« Vivants et intacts ! » : inflige 1 dégât à un autre allié (sans le tuer), puis gagne +3/+3."},
  lo_lurtz:{"a": 3, "h": 2, "kw": "", "sp": "", "tx": "Il chasse la Communauté : gagne +3/+2."},
  lo_saroumane:{"a": 3, "h": 3, "kw": "", "sp": "", "tx": "Il le convoite pour lui-même : gagne +3/+3."},
  lo_gobelin:{"a": 1, "h": 1, "kw": "", "sp": "", "tx": "Les tambours de la Moria : gagne +1/+1."},
  lo_oriental:{"a": 1, "h": 2, "kw": "", "sp": "", "tx": "L’Est répond à l’appel : gagne +1/+2."},
  lo_haradrim:{"a": 2, "h": 1, "kw": "", "sp": "", "tx": "Le Sud répond à l’appel : gagne +2/+1."},
  lo_wargsauv:{"a": 2, "h": 1, "kw": "", "sp": "", "tx": "La meute flaire le porteur : gagne +2/+1."},
  lo_bolg:{"a": 2, "h": 2, "kw": "", "sp": "", "tx": "La lignée du Profanateur : gagne +2/+2."},
  lo_grandgob:{"a": 2, "h": 3, "kw": "", "sp": "", "tx": "L’Anneau a dormi sous ses montagnes : gagne +2/+3."},
  lo_azog:{"a": 2, "h": 2, "kw": "", "sp": "", "tx": "La lignée du Profanateur : gagne +2/+2."},
  lo_trollg:{"a": 1, "h": 3, "kw": "", "sp": "", "tx": "Les trolls de guerre marchent : gagne +1/+3."},
  lo_fleau:{"a": 0, "h": 0, "kw": "", "sp": "none", "tx": "Il sert Morgoth, pas Sauron : aucune réaction."},
  lo_smaug:{"a": 3, "h": 3, "kw": "", "sp": "", "tx": "La convoitise de l’or : gagne +3/+3."},
};
for (const id in LO_REACT) if (DEFAULT_CARDS[id]) DEFAULT_CARDS[id].fx = (DEFAULT_CARDS[id].fx || []).concat([{ k:'ring_r', tx:LO_REACT[id].tx }]);
const NJ_MC = { ann:['L’Anneau', '#ffd24a'], voy:['Voyage', '#7ac04a'], tf:['Transformations', '#ffcf3a'], med:['Méditation', '#7ad8f0'], tk:['Techniques', '#5ab8f0'], mt:['Mentor', '#7ac04a'], sd:['Soldats', '#a86ad8'], ct:['Contrôle', '#8a7ad8'], ds:['Destruction', '#c85a8a'], zk:['Zenkai', '#ff7a3a'], fu:['Fusion', '#7ac04a'], ab:['Absorption', '#e86aa8'], kiu:['Ki', '#5ab8f0'], sv:['Soutien', '#f2c14e'], ob:['Objets', '#b48cff'], ad:['Autodestruction', '#ff5a3a'], tok:['Jetons', '#d8b45a'], seal:['Sceaux', '#e8607a'], pact:['Pacte', '#7ac04a'], dr:['Sacrifice', '#a898d0'], eco:['Économie', '#f2c14e'], don:['Donuts', '#ff8ac0'], spl:['Sorts', '#b48cff'], cbt:['Combat', '#ff7a5a'], ckm:['Éveil et chakra', '#5ab8f0'], jut:['Jutsus', '#5ab8f0'], chk:['Chakra', '#5ab8f0'], cmb:['Combos', '#ff9a4a'], kg:['Kekkei genkai', '#6fd08a'], por:['Portails', '#3fbf6f'], inv:['Inventions', '#b48cff'], coh:['Cohésion', '#6fb8e0'], pet:['Petits serviteurs', '#d8b45a'], vol:['Vol', '#e05a5a'], prov:['Provocation', '#c8a040'], nb:['Nombre', '#6fb8e0'], soc:['Début du combat', '#b06ae8'], ral:['Râles d\'agonie', '#7ac04a'], gag:['Gags récurrents', '#f2c230'], fam:['Famille', '#e0b020'] };
// trait passif d'un héros : son pouvoir (pw) ou son bonus (tr) de ce type
function htr(p, k) { const H0 = HX(p); if (!H0) return null; if (H0.pw && H0.pw.k === k) return H0.pw; const t = H0.tr; return t && t.k === k ? t : null; }
const DBV = ['d_sai', 'd_ter', 'd_nam', 'd_fre', 'd_and'];   // héros Dragon Ball : rattachés à l'univers
const RMV = ['r_smi', 'r_cit', 'r_ali', 'r_mon', 'r_mec'];   // héros Rick et Morty : rattachés à l'univers
const SPV = ['s_gin', 's_adu', 's_got', 's_cel', 's_ani'];   // héros South Park : rattachés à l'univers
const SIV = ['si_fam', 'si_moe', 'si_cra', 'si_aut', 'si_hor'];   // héros Les Simpson : rattachés à l'univers
const LOV = ['lo_hom', 'lo_elf', 'lo_nah', 'lo_mor', 'lo_ise', 'lo_omb'];
const NJV = ['nk_kon', 'nk_aka', 'nk_sun', 'nk_oto', 'nk_kir'];   // héros Ninja : rattachés à l'univers, à aucun village
const COMPANIONS = { nh_kushina:'c_nj_kurama', nh_jiraiya:'c_nj_gamabunta', nh_sasuke:'c_nj_aigle', nh_mikoto:'c_nj_chatnoir', nh_itachi:'c_nj_corbeau', nh_temari:'c_nj_shukaku', nh_naruto:'c_nj_grenouille', nh_kankuro:'c_nj_sasori', nh_shikamaru:'c_nj_cerfvolant', nh_gaara:'c_nj_tanuki', nh_haku:'c_nj_glaces', nh_zabuza:'c_nj_requin', nh_suigetsu:'c_nj_bulle', nh_mangetsu:'c_nj_hiramekarei', nh_mei:'c_nj_meduse', nh_omoi:'c_nj_lapin', nh_darui:'c_nj_nuage', nh_samui:'c_nj_renardblanc', nh_bee:'c_nj_gyuki', nh_kakashi:'c_nj_ninken', nh_roshi:'c_nj_songoku', nh_akatsuchi:'c_nj_geant', nh_hashirama:'c_nj_dragonbois', nh_deidara:'c_nj_argile', nh_kurotsuchi:'c_nj_dragonpierre', nh_karin:'c_nj_renard1', nh_asuma:'c_nj_katoncrow', nh_madara:'c_nj_zetsu', nh_konohamaru:'c_nj_singe', nh_pakura:'c_nj_espritvent', nh_baki:'c_nj_faucon', nh_chojuro:'c_nj_poissonscie', nh_ao:'c_nj_tortue', nh_kisame:'c_nj_samehada', nh_yugito:'c_nj_matatabi', nh_raikage:'c_nj_puma', nh_c:'c_nj_hibou', nh_kitsuchi:'c_nj_rocher', nh_onoki:'c_nj_golem', nh_yamato:'c_nj_arbre', paul:'c_pouf', leon:'c_caillou', zoe:'c_gloup', jeanne:'c_frisouille', selene:'c_nyx', brok:'c_enclume', sylvara:'c_lys', grumbo:'c_miette', vaskor:'c_osbrise', pyra:'c_etincelle', rivet:'c_bricole', egide:'c_lumen', ondine:'c_fiole', barnabe:'c_sou', maelle:'c_croc', oren:'c_plume', gor:'c_bastion', ilka:'c_truelle', nono:'c_braise' };
for (const h in COMPANIONS) DEFAULT_CARDS[COMPANIONS[h]].comp = h;
const compOf = hero => { const id = COMPANIONS[hero]; if (id && CARDS[id]) return id; return Object.keys(CARDS).find(k => CARDS[k].comp === hero) || null; };
const compLimit = rd => rd >= 6 ? 3 : rd >= 5 ? 2 : rd >= 3 ? 1 : 0;

const SLOTS = { 1:3, 2:4, 3:4, 4:5, 5:5, 6:6 };
const HEROES = {
  rivet:   {fam:['meca', 'gob'], n:'Rivet', tx:'Passif : ta première actualisation de chaque tour est gratuite.' },
  egide:   {fam:['nain', 'elfe'], n:'Égide', cost:2, tx:'Donne Bouclier divin à un de tes serviteurs aléatoire.' },
  ondine:  {fam:['elem', 'cors'], n:'Ondine l\'alchimiste', cost:1, tx:'Donne +1/+2 à un de tes serviteurs aléatoire.' },
  barnabe: {fam:['gob', 'cors'], n:'Barnabé le marchand', tx:'Passif : +1 or au début de chaque tour pair.' },
  maelle:  {fam:['bete', 'garou'], n:'Maëlle la dompteuse', tx:'Passif : à la fin de ton tour, donne +1/+1 à ton serviteur le plus à gauche.' },
  oren:    {fam:['elfe', 'mort'], n:'Oren l\'archiviste', cost:3, tx:'Ajoute à ta main un serviteur aléatoire de ton niveau de taverne.' },
  gor:     {fam:['ogre'], n:'Gor le colosse', tx:'Passif : commence la partie avec 5 PV de plus.' },
  ilka:    {fam:['nain', 'meca'], n:'Ilka la bâtisseuse', tx:'Passif : améliorer la taverne coûte 1 or de moins.' },
  selene:  {fam:['vamp'], n:'Sélène la comtesse', cost:1, tx:'Donne +1/+1 à un de tes serviteurs aléatoire et l\'enchante : « Après avoir attaqué, gagne +1/+1 ».' },
  brok:    {fam:['nain'], n:'Brok Barbe-d\'acier', cost:2, tx:'Donne Provocation à un de tes serviteurs aléatoire qui n\'en a pas.' },
  sylvara: {fam:['elfe', 'elem'], n:'Sylvara l\'archimage', tx:'Passif : le premier sort que tu achètes chaque tour coûte 1 or de moins.' },
  grumbo:  {fam:['ogre', 'gob'], n:'Grumbo le glouton', cost:2, tx:'Donne +3/+3 à ton serviteur qui a le plus d\'attaque.' },
  vaskor:  {fam:['mort', 'spec'], n:'Vaskor le nécromancien', cost:1, tx:'Invoque un Squelette 1/1 avec Réincarnation sur ton plateau.' },
  // ----- univers Ninja : 8 héros par village (sans élément) -----
  nh_naruto: {diff:1, stars:4, fam:NJV, pv:'nk_kon', mc:'tok', n:'Naruto Uzumaki', pwn:'Multi-clonage', cost:2, pay:'g', pw:{ k:'multi', s:[{ k:'nclone' }] }, tx:'Clone : invoque une copie 1/1 de ton serviteur le plus fort, avec ses mots-clés et son Ralliement.' },
  nh_kakashi: {diff:1, stars:4, fam:NJV, pv:'nk_kon', mc:'cbt', n:'Kakashi Hatake', pwn:'Ninja copieur', cost:1, pay:'g', pw:{ k:'multi', s:[{ k:'hx', who:'top', fx:[{ k:'soc_copykw' }] }] }, tx:'Prochain combat : ton serviteur le plus fort gagne Sharingan (il copie les mots-clés de l’ennemi d’en face).' },
  nh_jiraiya: {diff:1, stars:4, fam:NJV, pv:'nk_kon', mc:'tok', n:'Jiraiya', pwn:'Invocation', cost:2, pay:'g', pw:{ k:'multi', s:[{ k:'toad' }] }, tx:'Invoque un Crapaud : ses caractéristiques grandissent avec le niveau de ta taverne (2/3 au niveau 1, 7/8 au niveau 6).' },
  nh_itachi: {diff:1, stars:5, fam:NJV, pv:'nk_aka', mc:'cbt', n:'Itachi Uchiha', pwn:'Tsukuyomi', cost:2, pay:'g', pw:{ k:'multi', s:[{ k:'foegenj', n:1 }] }, tx:'Genjutsu : au prochain combat, l’ennemi le plus fort saute sa première attaque.' },
  nh_sasuke: {diff:1, stars:4, fam:NJV, pv:'nk_oto', mc:'cbt', n:'Sasuke Uchiha', pwn:'Chidori', cost:1, pay:'g', pw:{ k:'multi', s:[{ k:'foetop', d:4 }] }, tx:'Au début du prochain combat, inflige 4 dégâts à l’ennemi le plus fort.' },
  nh_shikamaru: {diff:1, stars:3, fam:NJV, pv:'nk_kon', mc:'cbt', n:'Shikamaru Nara', pwn:'Manipulation des ombres', cost:2, pay:'g', pw:{ k:'multi', s:[{ k:'hx', who:'hp', fx:[{ k:'soc_bind', who:'face' }] }] }, tx:'Entrave : au prochain combat, ton serviteur qui a le plus de PV empêche l’ennemi d’en face d’attaquer tant qu’il est en vie.' },
  nh_hashirama: {diff:1, stars:5, fam:NJV, pv:'nk_kon', mc:'cbt', n:'Hashirama Senju', pwn:'Mokuton', cost:2, pay:'g', pw:{ k:'multi', s:[{ k:'kw', kw:'t', n:1, a:1, h:3 }] }, tx:'Un de tes serviteurs sans Provocation gagne Provocation et +1/+3.' },
  nh_kushina: {diff:1, stars:5, fam:NJV, pv:'nk_kon', mc:'chk', n:'Kushina Uzumaki', pwn:'Chakra des Uzumaki', ckx:5, pw:{ k:'pturn', ck:1 }, tx:'Passif : ton chakra peut monter jusqu’à 15, et tu gagnes 1 chakra de plus au début de chaque tour.' },
  nh_gaara: {diff:1, stars:4, fam:NJV, pv:'nk_sun', mc:'cbt', n:'Gaara', pwn:'Bouclier de sable', cost:1, pay:'g', pw:{ k:'multi', s:[{ k:'tkw', kw:'t', n:1, a:0, h:5 }, { k:'tkw', kw:'s', n:1 }] }, tx:'Prochain combat : un de tes serviteurs gagne +0/+5 et Provocation, un autre Bouclier divin.' },
  nh_kankuro: {diff:1, stars:3, fam:NJV, pv:'nk_sun', mc:'tok', n:'Kankurō', pwn:'Kugutsu', cost:2, pay:'g', pw:{ k:'multi', s:[{ k:'summonr', cards:['tk_karasu', 'tk_kuroari', 'tk_sanshouo'] }] }, tx:'Invoque une marionnette au hasard : Karasu (Venimosité), Kuroari (Entrave) ou Sanshōuo (Provocation).' },
  nh_sasori: {diff:1, stars:4, fam:NJV, pv:'nk_aka', mc:'cbt', n:'Sasori', pwn:'Poison de Sasori', cost:3, pay:'g', pw:{ k:'multi', s:[{ k:'kw', kw:'n', n:1 }] }, tx:'Un de tes serviteurs gagne Venimosité.' },
  nh_rasa: {diff:1, stars:4, fam:NJV, pv:'nk_sun', mc:'eco', n:'Rasa', pwn:'Poussière d’or', pw:{ k:'pturn', g:1 }, tx:'Passif : au début de chaque tour, gagne 1 or de plus.' },
  nh_tsunade: {diff:1, stars:4, fam:NJV, pv:'nk_kon', mc:'cbt', n:'Tsunade', pwn:'Byakugō', cost:2, pay:'g', pw:{ k:'multi', s:[{ k:'hxall', fx:[{ k:'surv_regen', n:2 }] }] }, tx:'Prochain combat : tes serviteurs récupèrent 2 PV chaque fois qu’ils sont blessés et survivent.' },
  nh_mei: {diff:1, stars:4, fam:NJV, pv:'nk_kir', mc:'cbt', n:'Mei Terumi', pwn:'Brume acide', cost:1, pay:'g', pw:{ k:'multi', s:[{ k:'hx', who:'atk', fx:[{ k:'burn', d:2 }] }] }, tx:'Prochain combat : ton serviteur qui a le plus d’ATQ gagne Brûlure de 2 (l’ennemi qu’il frappe perd 2 PV après chacune de ses attaques).' },
  nh_haku: {diff:1, stars:4, fam:NJV, pv:'nk_kir', mc:'cbt', n:'Haku', pwn:'Garde du corps', cost:1, pay:'g', pw:{ k:'multi', s:[{ k:'hguard' }] }, tx:'Prochain combat : ton serviteur qui a le plus de PV encaisse les attaques qui visent ton serviteur qui a le plus d’ATQ.' },
  nh_bee: {diff:1, stars:4, fam:NJV, pv:'nk_kir', mc:'cbt', n:'Killer Bee', pwn:'Style des sept lames', cost:1, pay:'g', pw:{ k:'multi', s:[{ k:'hbee', a:2 }] }, tx:'Prochain combat : ton serviteur qui a le plus d’ATQ gagne +2 ATQ et Furie des vents.' },
  nh_kakuzu: {diff:1, stars:4, fam:NJV, pv:'nk_aka', mc:'cbt', n:'Kakuzu', pwn:'Doton Domu', cost:1, pay:'g', hearts:5, pw:{ k:'multi', s:[{ k:'hx', who:'hp', fx:[{ k:'armor', d:2, nm:'Domu' }] }] }, tx:'Durcissement du corps : au prochain combat, ton serviteur qui a le plus de PV subit 2 dégâts de moins à chaque coup. Cinq cœurs : la première fois que ton héros devrait mourir, il revient à 5 PV.' },
  nh_yugito: {diff:1, stars:4, fam:NJV, pv:'nk_kir', mc:'cbt', n:'Yugito Nii', pwn:'Flammes de Matatabi', cost:1, pay:'g', pw:{ k:'multi', s:[{ k:'foeburn', n:2, d:2 }] }, tx:'Au prochain combat, 2 ennemis subissent une Brûlure de 2 (ils perdent 2 PV après chacune de leurs attaques).' },
  nh_omoi: {diff:1, stars:3, fam:NJV, pv:'nk_kir', mc:'cbt', n:'Omoi', pwn:'Lame de foudre', cost:1, pay:'g', pw:{ k:'multi', s:[{ k:'hx', who:'atk', fx:[{ k:'soc_first', x:2 }] }] }, tx:'Prochain combat : la première attaque de ton serviteur qui a le plus d’ATQ inflige le double.' },
  nh_deidara: {diff:1, stars:5, fam:NJV, pv:'nk_aka', mc:'tok', n:'Deidara', pwn:'Argile explosive', cost:1, pay:'g', pw:{ k:'multi', s:[{ k:'summon', card:'tk_argile', n:1 }] }, tx:'Invoque une Araignée d’argile 1/1 avec « Râle d’agonie : inflige 3 dégâts à un ennemi aléatoire ».' },
  nh_roshi: {diff:1, stars:4, fam:NJV, pv:'nk_kon', mc:'tf', n:'Rōshi', pwn:'Armure de lave', pw:{ k:'pnktf', n:3 }, tx:'Passif : tes transformations coûtent 3 chakra de moins.' },
  nh_orochimaru: {diff:1, stars:5, fam:NJV, pv:'nk_oto', mc:'tok', n:'Orochimaru', pwn:'Kuchiyose : serpent', cost:2, pay:'g', pw:{ k:'multi', s:[{ k:'snake' }] }, tx:'Invoque un serpent : ses caractéristiques grandissent avec le niveau de ta taverne (3/2 au niveau 1, 8/7 au niveau 6).' },
  nh_zabuza: {diff:1, stars:4, fam:NJV, pv:'nk_kir', mc:'cbt', n:'Zabuza Momochi', pwn:'Brume cachée', cost:1, pay:'g', pw:{ k:'multi', s:[{ k:'tkw', kw:'c', n:7 }] }, tx:'Prochain combat : tous tes serviteurs ont Camouflage.' },
  // ----- Le Seigneur des Anneaux : héros (ceux des 12 duos célèbres sont proposés ; les autres ne le sont plus) -----
  lh_frodon: {diff:1, stars:5, fam:LOV, pv:'lo_nah', mc:'ann', n:'Frodon Sacquet', pwn:'Porteur de l’Anneau', pw:{ k:'pring' }, tx:'Passif : c’est toi qui reçois l’Anneau à la manche 3. Le passer à ton allié ne te coûte rien.' },
  lh_sam: {diff:1, stars:4, fam:LOV, pv:'lo_nah', mc:'cbt', n:'Sam Gamegie', pwn:'Fidèle compagnon', cost:1, pay:'g', pw:{ k:'multi', s:[{ k:'hguard' }] }, tx:'Prochain combat : ton serviteur qui a le plus de PV encaisse les attaques qui visent ton serviteur qui a le plus d’ATQ.' },
  lh_bilbon: {diff:1, stars:4, fam:LOV, pv:'lo_nah', mc:'ann', n:'Bilbon Sacquet', pwn:'Invisible', pw:{ k:'pbilbon' }, tx:'Passif : quand tu tiens l’Anneau, tes serviteurs ont Camouflage au début du combat.' },
  lh_gandalf: {diff:1, stars:5, fam:LOV, pv:'lo_elf', mc:'cbt', n:'Gandalf', pwn:'Lumière d’Istari', cost:2, pay:'g', pw:{ k:'multi', s:[{ k:'foegenj', n:1 }] }, tx:'Au prochain combat, l’ennemi le plus fort, aveuglé, saute sa première attaque.' },
  lh_aragorn: {diff:1, stars:5, fam:LOV, pv:'lo_hom', mc:'cbt', n:'Aragorn', pwn:'Flamme de l’Ouest', cost:2, pay:'g', pw:{ k:'multi', s:[{ k:'hx', who:'top', fx:[{ k:'cleave' }] }] }, tx:'Prochain combat : ton serviteur le plus fort attaque aussi les voisins de sa cible.' },
  lh_legolas: {diff:1, stars:4, fam:LOV, pv:'lo_elf', mc:'cbt', n:'Legolas', pwn:'Tir d’élite', cost:1, pay:'g', pw:{ k:'multi', s:[{ k:'foetop', d:4 }] }, tx:'Au début du prochain combat, inflige 4 dégâts à l’ennemi le plus fort.' },
  lh_gimli: {diff:1, stars:4, fam:LOV, pv:'lo_nah', mc:'cbt', n:'Gimli', pwn:'Hache de nain', cost:1, pay:'g', pw:{ k:'multi', s:[{ k:'hx', who:'hp', fx:[{ k:'riposte', d:3 }] }] }, tx:'Prochain combat : ton serviteur qui a le plus de PV gagne Riposte 3 (3 dégâts à ceux qui l’attaquent).' },
  lh_galadriel: {diff:1, stars:5, fam:LOV, pv:'lo_elf', mc:'cbt', n:'Galadriel', pwn:'Lumière d’Eärendil', cost:2, pay:'g', pw:{ k:'multi', s:[{ k:'tkw', kw:'s', n:1 }] }, tx:'Prochain combat : un de tes serviteurs gagne Bouclier divin.' },
  lh_elrond: {diff:1, stars:4, fam:LOV, pv:'lo_elf', mc:'cbt', n:'Elrond', pwn:'Guérisseur', cost:1, pay:'g', pw:{ k:'multi', s:[{ k:'hx', who:'top', fx:[{ k:'aft_heal', n:4 }] }] }, tx:'Prochain combat : après chaque attaque de ton serviteur le plus fort, ton serviteur le plus blessé récupère 4 PV.' },
  lh_thorin: {diff:1, stars:4, fam:LOV, pv:'lo_nah', mc:'cbt', n:'Thorin Écu-de-Chêne', pwn:'Écu-de-Chêne', cost:2, pay:'g', pw:{ k:'multi', s:[{ k:'kw', kw:'t', n:1, a:1, h:3 }] }, tx:'Un de tes serviteurs sans Provocation gagne Provocation et +1/+3.' },
  lh_theoden: {diff:1, stars:4, fam:LOV, pv:'lo_hom', mc:'cbt', n:'Théoden', pwn:'Charge des Rohirrim', cost:1, pay:'g', pw:{ k:'multi', s:[{ k:'hbee', a:2 }] }, tx:'Prochain combat : ton serviteur qui a le plus d’ATQ gagne +2 ATQ et Furie des vents.' },
  lh_eowyn: {diff:1, stars:3, fam:LOV, pv:'lo_hom', mc:'cbt', n:'Éowyn', pwn:'Je ne suis pas un homme !', cost:1, pay:'g', pw:{ k:'multi', s:[{ k:'hx', who:'atk', fx:[{ k:'soc_first', x:2 }] }] }, tx:'Prochain combat : la première attaque de ton serviteur qui a le plus d’ATQ inflige le double.' },
  lh_sylvebarbe: {diff:1, stars:4, fam:LOV, pv:'lo_nah', mc:'tok', n:'Sylvebarbe', pwn:'Éveil de la forêt', cost:2, pay:'g', pw:{ k:'multi', s:[{ k:'summon', card:'tl_huorn', n:1 }] }, tx:'Invoque un Huorn 2/4 avec Provocation.' },
  lh_arwen: {diff:1, stars:3, fam:LOV, pv:'lo_elf', mc:'eco', n:'Arwen', pwn:'Étoile du soir', hearts:5, pw:{ k:'pturn', sell:0 }, tx:'Passif : la première fois que ton duo devrait tomber, il revient à 5 PV. Quand tu tiens l’Anneau : 1 or de plus par tour.' },
  lh_boromir: {diff:1, stars:3, fam:LOV, pv:'lo_hom', mc:'cbt', n:'Boromir', pwn:'Bouclier du Gondor', cost:1, pay:'g', pw:{ k:'multi', s:[{ k:'tkw', kw:'t', n:1, a:0, h:5 }] }, tx:'Prochain combat : un de tes serviteurs gagne +0/+5 et Provocation.' },
  lh_sauron: {diff:1, stars:5, fam:LOV, pv:'lo_mor', mc:'ann', n:'Sauron', pwn:'Maître de l’Anneau', shadow:1, pw:{ k:'psauron' }, tx:'Passif : quand ton duo tient l’Anneau, les réactions des serviteurs posés se déclenchent deux fois.' },
  lh_saroumane: {diff:1, stars:4, fam:LOV, pv:'lo_ise', mc:'tok', n:'Saroumane', pwn:'Fosses d’Isengard', shadow:1, cost:2, pay:'g', pw:{ k:'multi', s:[{ k:'summon', card:'tl_urukj', n:1 }] }, tx:'Invoque un Jeune Uruk 2/3.' },
  lh_roisorcier: {diff:1, stars:4, fam:LOV, pv:'lo_mor', mc:'cbt', n:'Roi-Sorcier d’Angmar', pwn:'Cri du Nazgûl', shadow:1, cost:2, pay:'g', pw:{ k:'multi', s:[{ k:'hx', who:'top', fx:[{ k:'soc_genj', who:'face', n:1 }] }] }, tx:'Prochain combat : l’ennemi en face de ton serviteur le plus fort saute sa première attaque.' },
  lh_gollum: {diff:1, stars:3, fam:LOV, pv:'lo_mor', mc:'ann', n:'Gollum', pwn:'Mon précieux', shadow:1, pw:{ k:'pgollum' }, tx:'Passif : ton duo prend aussi l’Anneau sur une égalité contre le duo qui le tient.' },
  lh_smaug: {diff:1, stars:5, fam:LOV, pv:'lo_mor', mc:'cbt', n:'Smaug', pwn:'Feu du dragon', shadow:1, cost:2, pay:'g', pw:{ k:'multi', s:[{ k:'foeburn', n:3, d:2 }] }, tx:'Au prochain combat, 3 ennemis subissent une Brûlure de 2 (ils perdent 2 PV après chacune de leurs attaques).' },
  // 7 héros de l'Ombre ajoutés le 15/11/2026 (12 au total : 3 choix uniques pour chacun des 4 joueurs de l'Ombre) ; pouvoirs en miroir de ceux des Peuples libres
  lh_gothmog: {diff:1, stars:3, fam:LOV, pv:'lo_mor', mc:'tok', n:'Gothmog', pwn:'Légions du Mordor', shadow:1, cost:1, pay:'g', pw:{ k:'multi', s:[{ k:'summon', card:'tl_snaga', n:1 }] }, tx:'Invoque un Snaga 1/1.' },
  lh_lurtz: {diff:1, stars:4, fam:LOV, pv:'lo_ise', mc:'cbt', n:'Lurtz', pwn:'Flèche noire', shadow:1, cost:1, pay:'g', pw:{ k:'multi', s:[{ k:'foetop', d:4 }] }, tx:'Au début du prochain combat, inflige 4 dégâts à l’ennemi le plus fort.' },
  lh_arachne: {diff:1, stars:4, fam:LOV, pv:'lo_mor', mc:'cbt', n:'Arachne', pwn:'Toile d’Arachne', shadow:1, cost:2, pay:'g', pw:{ k:'multi', s:[{ k:'hx', who:'hp', fx:[{ k:'soc_bind', who:'face' }] }] }, tx:'Entrave : au prochain combat, ton serviteur qui a le plus de PV empêche l’ennemi d’en face d’attaquer tant qu’il est en vie.' },
  lh_khamul: {diff:1, stars:3, fam:LOV, pv:'lo_mor', mc:'cbt', n:'Khamûl', pwn:'Ombre de l’Est', shadow:1, cost:1, pay:'g', pw:{ k:'multi', s:[{ k:'hx', who:'atk', fx:[{ k:'soc_first', x:2 }] }] }, tx:'Prochain combat : la première attaque de ton serviteur qui a le plus d’ATQ inflige le double.' },
  lh_balrog: {diff:1, stars:5, fam:LOV, pv:'lo_omb', mc:'cbt', n:'Le Balrog', pwn:'Fouet de flammes', shadow:1, cost:1, pay:'g', pw:{ k:'multi', s:[{ k:'hx', who:'atk', fx:[{ k:'burn', d:2 }] }] }, tx:'Prochain combat : ton serviteur qui a le plus d’ATQ gagne Brûlure de 2 (l’ennemi qu’il frappe perd 2 PV après chacune de ses attaques).' },
  lh_sharku: {diff:1, stars:3, fam:LOV, pv:'lo_ise', mc:'cbt', n:'Sharku', pwn:'Charge des wargs', shadow:1, cost:1, pay:'g', pw:{ k:'multi', s:[{ k:'hbee', a:2 }] }, tx:'Prochain combat : ton serviteur qui a le plus d’ATQ gagne +2 ATQ et Furie des vents.' },
  lh_grima: {diff:1, stars:3, fam:LOV, pv:'lo_ise', mc:'cbt', n:'Gríma Langue-de-Serpent', pwn:'Paroles empoisonnées', shadow:1, cost:2, pay:'g', pw:{ k:'multi', s:[{ k:'foegenj', n:1 }] }, tx:'Au prochain combat, l’ennemi le plus fort, envoûté, saute sa première attaque.' },
  // héros ajoutés le 15/11/2026 pour les duos célèbres
  lh_merry: {diff:1, stars:3, fam:LOV, pv:'lo_nah', mc:'cbt', n:'Merry', pwn:'Lame des Galgals', cost:1, pay:'g', pw:{ k:'multi', s:[{ k:'hx', who:'atk', fx:[{ k:'pierce' }] }] }, tx:'Prochain combat : les attaques de ton serviteur qui a le plus d’ATQ ignorent le Camouflage et brisent le Bouclier divin.' },
  lh_pippin: {diff:1, stars:3, fam:LOV, pv:'lo_nah', mc:'tok', n:'Pippin', pwn:'Ami des Ents', cost:2, pay:'g', pw:{ k:'multi', s:[{ k:'summon', card:'tl_huorn', n:1 }] }, tx:'Invoque un Huorn 2/4 avec Provocation.' },
  lh_faramir: {diff:1, stars:4, fam:LOV, pv:'lo_hom', mc:'cbt', n:'Faramir', pwn:'Embuscade en Ithilien', cost:2, pay:'g', pw:{ k:'multi', s:[{ k:'foegenj', n:1 }] }, tx:'Au prochain combat, l’ennemi le plus fort, pris en embuscade, saute sa première attaque.' },
  lh_bouche: {diff:1, stars:3, fam:LOV, pv:'lo_mor', mc:'cbt', n:'La Bouche de Sauron', pwn:'Paroles venimeuses', shadow:1, cost:2, pay:'g', pw:{ k:'multi', s:[{ k:'foeburn', n:3, d:2 }] }, tx:'Au prochain combat, 3 ennemis subissent une Brûlure de 2 (ils perdent 2 PV après chacune de leurs attaques).' },
  lh_azog: {diff:1, stars:4, fam:LOV, pv:'lo_omb', mc:'cbt', n:'Azog le Profanateur', pwn:'Bras de fer', shadow:1, cost:1, pay:'g', pw:{ k:'multi', s:[{ k:'hx', who:'hp', fx:[{ k:'riposte', d:3 }] }] }, tx:'Prochain combat : ton serviteur qui a le plus de PV gagne Riposte 3 (3 dégâts à ceux qui l’attaquent).' },
  lh_bolg: {diff:1, stars:3, fam:LOV, pv:'lo_omb', mc:'cbt', n:'Bolg', pwn:'Charge de Gundabad', shadow:1, cost:1, pay:'g', pw:{ k:'multi', s:[{ k:'hbee', a:2 }] }, tx:'Prochain combat : ton serviteur qui a le plus d’ATQ gagne +2 ATQ et Furie des vents.' },
  pyra:    {fam:['drag'], n:'Pyra la chevaucheuse', tx:'Passif : au début de chaque combat, ton dragon souffle 2 dégâts sur un ennemi aléatoire (le surplus touche d\'autres ennemis).' },
  paul:    {fam:['sq_feu'], n:'Paul', cost:2, el:'sq_feu', tx:'Ami du feu · Attise : un Flammou aléatoire gagne +2/+1 et tes autres Flammous gagnent +1 attaque.' },
  leon:    {fam:['sq_terre'], n:'Léon', el:'sq_terre', tx:'Ami de la terre · Passif : quand tu joues un Mottu, il gagne Provocation et +1/+2.' },
  zoe:     {fam:['sq_eau'], n:'Zoé', cost:1, el:'sq_eau', tx:'Amie de l\'eau · Ajoute à ta main un Flotti aléatoire de ton niveau de taverne ou moins.' },
  jeanne:  {fam:['sq_vent'], n:'Jeanne', cost:2, el:'sq_vent', tx:'Amie du vent · Prochain combat seulement : tes Zéphys gagnent +1/+1 pour chaque Zéphy sur ton plateau.' },
  nono:    {fam:['drag', 'elem'], n:'NonoJose', cost:1, minRound:3, tx:'Dès la manche 3 : lance une boule de feu de 3 dégâts sur un serviteur ennemi aléatoire au début du prochain combat ; les dégâts en trop touchent d\'autres ennemis. Chaque manche où le pouvoir n\'est pas utilisé, ses dégâts augmentent de 1 pour toute la partie.' },
  // ----- univers Dragon Ball : 10 héros et 10 méchants -----
  // ----- héros Dragon Ball (v2) : 10 archétypes originaux -----
  dh_maitre: {diff:2, stars:4, fam:DBV, pv:'d_sai', mc:'tf', n:'Maître d\'arts martiaux', cost:1, pay:'g', pwn:'Dépasser ses limites', pw:{ k:'multi', s:[{ k:'tffree', n:1 }] }, tx:'Un de tes serviteurs passe gratuitement au palier de transformation suivant (sinon il gagne +2/+2).', q:{ k:'tfs', n:3, tx:'Réaliser 3 transformations.' }, aw:{ nm:'Ultra instinct', pwn:'Ultra instinct', cost:2, pay:'g', pw:{ k:'multi', s:[{ k:'tffree', n:2 }] }, tx:'Deux de tes serviteurs passent gratuitement au palier de transformation suivant (sinon +2/+2).' } },
  dh_ange: {diff:1, stars:3, fam:DBV, pv:'d_ter', mc:'med', n:'Ange instructeur', pwn:'Entraînement divin', pw:{ k:'pmed', n:2, a:2, h:1 }, tx:'Passif : chaque serviteur qui médite rapporte 2 ki de plus et gagne +2/+1.', q:{ k:'kiSpent', n:12, tx:'Dépenser 12 ki.' }, aw:{ nm:'Instinct angélique', pwn:'Instinct angélique', pw:{ k:'pmed', n:3, a:3, h:3 }, tx:'Passif : chaque serviteur qui médite rapporte 3 ki de plus et gagne +3/+3.' } },
  dh_ermite: {diff:2, stars:3, fam:DBV, pv:'d_ter', mc:'tk', n:'Ermite des arts', cost:1, pay:'g', pwn:'Enseignement', pw:{ k:'multi', s:[{ k:'tech', n:1 }, { k:'ki', n:1 }] }, tr:{ k:'ptkc', n:2 }, tx:'Ajoute une technique aléatoire à ta main et gagne 1 ki.', trx:'Tes techniques coûtent 2 ki de moins.', q:{ k:'casts', n:5, tx:'Lancer 5 techniques.' }, aw:{ nm:'Grand maître', pwn:'Technique secrète', cost:1, pay:'g', pw:{ k:'multi', s:[{ k:'tech', n:1 }, { k:'ki', n:2 }] }, tx:'Ajoute une technique aléatoire à ta main et gagne 2 ki.' } },
  dh_gardien: {diff:2, stars:3, fam:DBV, pv:'d_nam', mc:'mt', n:'Gardien de la Terre', cost:1, pay:'g', pwn:'Disciple', pw:{ k:'multi', s:[{ k:'drgive', n:1, fx:{ k:'mentor', a:1, h:1, n:1 } }] }, tx:'Un de tes serviteurs gagne « Mentor : fin de tour, donne +1/+1 au serviteur à sa droite ».', q:{ k:'mentor', n:10, tx:'Entraîner 10 fois un serviteur.' }, aw:{ nm:'Palais céleste', pwn:'Palais céleste', cost:1, pay:'g', pw:{ k:'multi', s:[{ k:'drgive', n:1, fx:{ k:'mentor', a:2, h:2, n:2 } }] }, tx:'Un de tes serviteurs gagne « Mentor : fin de tour, donne +2/+2 aux serviteurs à côté de lui ».' } },
  dh_commandant: {diff:2, stars:3, fam:DBV, pv:'d_fre', mc:'sd', n:'Commandant d\'armée', cost:2, pay:'g', pwn:'Renforts', pw:{ k:'multi', s:[{ k:'summon', card:'tk_sold', n:1 }, { k:'cardbuff', card:'tk_sold', a:1, h:1 }] }, tx:'Invoque un Soldat de Freezer, puis tes soldats gagnent +1/+1.', q:{ k:'allyDeaths', n:8, tx:'Voir 8 de tes serviteurs mourir en combat.' }, aw:{ nm:'Armée galactique', pwn:'Armée galactique', cost:2, pay:'g', pw:{ k:'multi', s:[{ k:'summon', card:'tk_sold', n:2 }, { k:'cardbuff', card:'tk_sold', a:1, h:1 }] }, tx:'Invoque 2 Soldats de Freezer, puis tes soldats gagnent +1/+1.' } },
  dh_tyran: {diff:2, stars:4, fam:DBV, pv:'d_fre', mc:'dr', n:'Tyran de l\'espace', pwn:'Chair à canon', pw:{ k:'pdie', n:2 }, tx:'Passif : après chaque combat, gagne 1 or au prochain tour par serviteur allié mort (2 au plus).', q:{ k:'allyDeaths', n:10, tx:'Voir 10 de tes serviteurs mourir en combat.' }, aw:{ nm:'Empereur de l\'univers', pwn:'Empereur de l\'univers', pw:{ k:'pdie', n:4 }, tx:'Passif : après chaque combat, gagne 1 or au prochain tour par serviteur allié mort (4 au plus).' } },
  dh_savant: {diff:2, stars:3, fam:DBV, pv:'d_and', mc:'ad', n:'Savant fou', cost:1, pay:'g', pwn:'Bombe intégrée', pw:{ k:'multi', s:[{ k:'drgive', n:1, fx:{ k:'dr_dmg', d:3, n:1 } }] }, tx:'Un de tes serviteurs gagne « Râle d\'agonie : 3 dégâts à un ennemi aléatoire ».', q:{ k:'drDie', n:10, tx:'Voir 10 de tes serviteurs mourir en combat.' }, aw:{ nm:'Laboratoire secret', pwn:'Autodestruction', cost:2, pay:'g', pw:{ k:'multi', s:[{ k:'drgive', n:2, fx:{ k:'dr_dmg', d:4, n:1 } }] }, tx:'Deux de tes serviteurs gagnent « Râle d\'agonie : 4 dégâts à un ennemi aléatoire ».' } },
  dh_sorcier: {diff:3, stars:3, fam:DBV, pv:'d_and', mc:'ct', n:'Sorcier', cost:1, pay:'g', pwn:'Maléfice', pw:{ k:'multi', s:[{ k:'buffr', a:2, h:2, n:1 }, { k:'foechill', a:2, n:2 }] }, tx:'Un de tes serviteurs gagne +2/+2 ; prochain combat, 2 ennemis aléatoires perdent 2 attaque.', q:{ k:'wins', n:3, tx:'Gagner 3 combats.' }, aw:{ nm:'Grand sorcier', pwn:'Possession', cost:2, pay:'g', pw:{ k:'multi', s:[{ k:'buffr', a:3, h:3, n:1 }, { k:'foechill', a:3, n:3 }, { k:'foeseal', n:1 }] }, tx:'Un de tes serviteurs gagne +3/+3 ; prochain combat, 3 ennemis perdent 3 attaque et un ennemi perd ses mots-clés.' } },
  dh_chasseur: {diff:1, stars:3, fam:DBV, pv:'d_ter', mc:'eco', n:'Chasseur de primes', cost:2, pay:'g', pwn:'Prime', pw:{ k:'multi', s:[{ k:'disc' }] }, tx:'Découvre un serviteur d\'un niveau au-dessus de ta taverne (un parmi trois).', q:{ k:'buys', n:7, tx:'Acheter 7 serviteurs.' }, aw:{ nm:'Chasseur légendaire', pwn:'Grosse prime', cost:2, pay:'g', pw:{ k:'multi', s:[{ k:'disc' }, { k:'g', n:1 }] }, tx:'Découvre un serviteur d\'un niveau au-dessus de ta taverne et récupère 1 or.' } },
  dh_dieu: {diff:3, stars:4, fam:DBV, pv:'d_sai', mc:'ds', n:'Dieu de la destruction', cost:1, pay:'g', pwn:'Destruction', pw:{ k:'multi', s:[{ k:'sacr' }, { k:'buffhi', a:1, h:1 }] }, tx:'Détruis ton serviteur le plus faible : ton plus fort gagne son attaque, sa vie et +1/+1.', q:{ k:'hakai', n:4, tx:'Détruire 4 serviteurs.' }, aw:{ nm:'Hakai', pwn:'Hakai', cost:1, pay:'g', pw:{ k:'multi', s:[{ k:'sacr' }, { k:'buffhi', a:2, h:2 }, { k:'g', n:1 }] }, tx:'Détruis ton serviteur le plus faible : ton plus fort gagne ses stats et +2/+2, et tu récupères 1 or.' } },
  // ----- univers Rick et Morty : 10 Ricks d'autres dimensions (portails, inventions et familles) -----
  rh_c137: {diff:2, stars:4, fam:RMV, pv:'r_cit', mc:'por', n:'Rick C-137', cost:2, pay:'g', pwn:'Pistolet à portails', pw:{ k:'multi', s:[{ k:'pf', n:1 }] }, tr:{ k:'pport', a:1, h:1 }, tx:'Gagne 1 fluide de portail.', trx:'Tes serviteurs qui passent un portail gagnent +1/+1.', q:{ k:'portals', n:10, tx:'Faire passer 10 portails.' }, aw:{ nm:'Le plus Rick des Ricks', pwn:'Portail de secours', cost:1, pay:'g', pw:{ k:'multi', s:[{ k:'pf', n:1 }] }, tr:{ k:'pport', a:2, h:2 }, trx:'Tes serviteurs qui passent un portail gagnent +2/+2.', tx:'Gagne 1 fluide de portail ; tes serviteurs qui passent un portail gagnent désormais +2/+2.' } },
  rh_cornichon: {diff:2, stars:3, fam:RMV, pv:'r_smi', mc:'inv', n:'Rick Cornichon', cost:1, pay:'g', pwn:'Bricolage de garage', pw:{ k:'multi', s:[{ k:'tech', n:1 }] }, tr:{ k:'pcast', a:1, h:1 }, tx:'Ajoute une invention aléatoire à ta main.', trx:'Quand tu lances une invention, un allié aléatoire gagne +1/+1.', q:{ k:'casts', n:7, tx:'Lancer 7 inventions.' }, aw:{ nm:'Cornichon de combat', pwn:'Laboratoire des égouts', cost:1, pay:'g', pw:{ k:'multi', s:[{ k:'tech', n:1 }, { k:'pf', n:1 }] }, tr:{ k:'pcast', a:2, h:2 }, trx:'Quand tu lances une invention, un allié aléatoire gagne +2/+2.', tx:'Ajoute une invention aléatoire à ta main et gagne 1 fluide de portail.' } },
  rh_doofus: {diff:1, stars:3, fam:RMV, pv:'r_smi', mc:'sv', n:'Rick Doofus', cost:1, pay:'g', pwn:'Dîner de famille', pw:{ k:'multi', s:[{ k:'buffr', a:1, h:1, n:2, tb:'r_smi' }] }, tr:{ k:'pplay', tb:'r_smi', a:1, h:1 }, tx:'Donne deux fois +1/+1 à un Smith aléatoire.', trx:'Quand tu joues un Smith, il gagne +1/+1.', q:{ k:'play', card:'r_smi', n:6, tx:'Jouer 6 Smith.' }, aw:{ nm:'Papa du dimanche', pwn:'Repas de fête', cost:1, pay:'g', pw:{ k:'multi', s:[{ k:'buffall', a:1, h:1, tb:'r_smi' }] }, tr:{ k:'pplay', tb:'r_smi', a:2, h:2 }, trx:'Quand tu joues un Smith, il gagne +2/+2.', tx:'Tous tes Smith gagnent +1/+1.' } },
  rh_tiny: {diff:1, stars:3, fam:RMV, pv:'r_cit', mc:'pet', n:'Tiny Rick', cost:1, pay:'g', pwn:'Esprit de lycée', pw:{ k:'multi', s:[{ k:'bufftier', t:3, a:1, h:1 }] }, tx:'Tes serviteurs de niveau 3 ou moins gagnent +1/+1.', q:{ k:'lowBoard', n:1, tx:'Finir un tour avec 5 serviteurs de niveau 3 ou moins.' }, aw:{ nm:'Rick qui se sent vieux', pwn:'Esprit de lycée déchaîné', cost:2, pay:'g', pw:{ k:'multi', s:[{ k:'bufftier', t:4, a:2, h:2 }] }, tx:'Tes serviteurs de niveau 4 ou moins gagnent +2/+2.' } },
  rh_toxique: {diff:2, stars:3, fam:RMV, pv:'r_mec', mc:'vol', n:'Rick Toxique', cost:1, pay:'g', pwn:'Pure toxicité', pw:{ k:'multi', s:[{ k:'buffhi', a:2, h:1 }, { k:'drgive', n:1, fx:{ k:'atk_drain', n:2 } }] }, tx:'Ton serviteur le plus fort gagne +2/+1, et un de tes serviteurs gagne « Absorption d\'énergie : quand il attaque, vole 2 attaque à sa cible ».', q:{ k:'wins', n:3, tx:'Gagner 3 combats.' }, aw:{ nm:'Rick détoxifié', pwn:'Toxines concentrées', cost:1, pay:'g', pw:{ k:'multi', s:[{ k:'buffhi', a:3, h:2 }, { k:'drgive', n:2, fx:{ k:'atk_drain', n:2 } }] }, tx:'Ton serviteur le plus fort gagne +3/+2, et deux de tes serviteurs gagnent « Absorption d\'énergie : vole 2 attaque à sa cible ».' } },
  rh_cop: {diff:1, stars:3, fam:RMV, pv:'r_cit', mc:'prov', n:'Rick Cop', cost:1, pay:'g', pwn:'Matraque de la Citadelle', pw:{ k:'multi', s:[{ k:'kw', kw:'t', n:1, a:0, h:2 }] }, tr:{ k:'ptaunt', a:1, h:0 }, tx:'Un de tes serviteurs sans Provocation gagne Provocation et +0/+2.', trx:'Fin de tour : tes serviteurs avec Provocation gagnent +1 attaque.', q:{ k:'tauntBoard', n:1, tx:'Finir un tour avec 4 serviteurs à Provocation.' }, aw:{ nm:'Commissaire Rick', pwn:'Descente de police', cost:1, pay:'g', pw:{ k:'multi', s:[{ k:'kw', kw:'t', n:1, a:1, h:3 }] }, tr:{ k:'ptaunt', a:1, h:1 }, trx:'Fin de tour : tes serviteurs avec Provocation gagnent +1/+1.', tx:'Un de tes serviteurs sans Provocation gagne Provocation et +1/+3.' } },
  rh_conseil: {diff:2, stars:3, fam:RMV, pv:'r_cit', mc:'nb', n:'Rick du Conseil', cost:1, pay:'g', pwn:'Décret du Conseil', pw:{ k:'multi', s:[{ k:'buffrm', a:1, h:1 }] }, tx:'Tes Ricks et tes Mortys gagnent +1/+1.', q:{ k:'rmBoard', n:1, tx:'Finir un tour avec 5 Ricks ou Mortys sur ton plateau.' }, aw:{ nm:'Conseil des Ricks', pwn:'Décret d\'urgence', cost:2, pay:'g', pw:{ k:'multi', s:[{ k:'buffrm', a:2, h:2 }] }, tx:'Tes Ricks et tes Mortys gagnent +2/+2.' } },
  rh_cyborg: {diff:2, stars:4, fam:RMV, pv:'r_ali', mc:'tok', n:'Rick Cyborg', cost:2, pay:'g', pwn:'Boîte à Meeseeks', pw:{ k:'multi', s:[{ k:'summon', card:'tk_meeseeks', n:1 }, { k:'cardbuff', card:'tk_meeseeks', a:1, h:1 }] }, tr:{ k:'ptok', card:'tk_meeseeks', a:1, h:1 }, tx:'Invoque un Mr. Meeseeks, puis tes Meeseeks gagnent +1/+1.', trx:'Tes Meeseeks apparaissent avec +1/+1.', q:{ k:'tokSum', card:'tk_meeseeks', n:5, tx:'Invoquer 5 Meeseeks.' }, aw:{ nm:'Rick tout en chrome', pwn:'Meeseeks en série', cost:2, pay:'g', pw:{ k:'multi', s:[{ k:'summon', card:'tk_meeseeks', n:2 }, { k:'cardbuff', card:'tk_meeseeks', a:1, h:1 }] }, tx:'Invoque 2 Mr. Meeseeks, puis tes Meeseeks gagnent +1/+1.' } },
  rh_cronen: {diff:2, stars:3, fam:RMV, pv:'r_mon', mc:'soc', n:'Rick Cronenberg', cost:1, pay:'g', pwn:'Sérum raté', pw:{ k:'multi', s:[{ k:'drgive', n:1, fx:{ k:'soc_dmg', d:3, n:1 } }] }, tx:'Un de tes serviteurs gagne « Début du combat : 3 dégâts à un ennemi aléatoire ».', q:{ k:'socBoard', n:1, tx:'Finir un tour avec 5 serviteurs à effet de Début du combat.' }, aw:{ nm:'Monde Cronenberg', pwn:'Épidémie', cost:1, pay:'g', pw:{ k:'multi', s:[{ k:'drgive', n:2, fx:{ k:'soc_dmg', d:4, n:1 } }] }, tx:'Deux de tes serviteurs gagnent « Début du combat : 4 dégâts à un ennemi aléatoire ».' } },
  rh_sorcier: {diff:2, stars:3, fam:RMV, pv:'r_ali', mc:'ral', n:'Rick Sorcier', cost:1, pay:'g', pwn:'Malédiction amicale', pw:{ k:'multi', s:[{ k:'drgive', n:1, fx:{ k:'dr_buff_rand', a:2, h:2, tb:'' } }] }, tx:'Un de tes serviteurs gagne « Râle d\'agonie : donne +2/+2 à un allié aléatoire ».', q:{ k:'drDie', n:10, tx:'Voir 10 de tes serviteurs mourir en combat.' }, aw:{ nm:'Rick nécromancien', pwn:'Grimoire du Sorcier', cost:2, pay:'g', pw:{ k:'multi', s:[{ k:'drgive', n:2, fx:{ k:'dr_buff_rand', a:3, h:3, tb:'' } }] }, tx:'Deux de tes serviteurs gagnent « Râle d\'agonie : donne +3/+3 à un allié aléatoire ».' } },
  // ----- univers South Park : 10 héros, chacun avec son alter ego (éveil) ; cohésion de groupe et objets cultes -----
  sh_cartman: {diff:2, stars:3, fam:SPV, pv:'s_gin', mc:'coh', n:'Cartman', cost:1, pay:'g', pwn:'Respectez mon autoritah', pw:{ k:'multi', s:[{ k:'buffnb', a:1, h:1 }] }, tx:'Tes serviteurs qui ont un voisin de leur famille gagnent +1/+1.', q:{ k:'bandTurns', n:3, tx:'Finir 3 tours avec une bande activée.' }, aw:{ nm:'Le Coon', pwn:'Justice du Coon', cost:1, pay:'g', pw:{ k:'multi', s:[{ k:'buffnb', a:2, h:1 }] }, tx:'Tes serviteurs qui ont un voisin de leur famille gagnent +2/+1.' } },
  sh_stan: {diff:1, stars:3, fam:SPV, pv:'s_ani', mc:'tok', n:'Stan', cost:2, pay:'g', pwn:'Viens, Sparky !', pw:{ k:'multi', s:[{ k:'summon', card:'tk_bestiole', n:1 }, { k:'cardbuff', card:'tk_bestiole', a:1, h:1 }] }, tr:{ k:'ptok', card:'tk_bestiole', a:1, h:0 }, tx:'Invoque une Bestiole, puis tes Bestioles gagnent +1/+1.', trx:'Tes Bestioles apparaissent avec +1/+0.', q:{ k:'tokSum', card:'tk_bestiole', n:4, tx:'Invoquer 4 Bestioles.' }, aw:{ nm:'Toolshed', pwn:'Boîte à outils', cost:2, pay:'g', pw:{ k:'multi', s:[{ k:'summon', card:'tk_bestiole', n:2 }, { k:'cardbuff', card:'tk_bestiole', a:1, h:1 }] }, tr:{ k:'ptok', card:'tk_bestiole', a:1, h:1 }, trx:'Tes Bestioles apparaissent avec +1/+1.', tx:'Invoque 2 Bestioles, puis tes Bestioles gagnent +1/+1.' } },
  sh_kyle: {diff:1, stars:3, fam:SPV, pv:'s_cel', mc:'sv', n:'Kyle', cost:1, pay:'g', pwn:'J\'ai appris un truc aujourd\'hui', pw:{ k:'multi', s:[{ k:'buffchain', a:1, h:1 }] }, tx:'Un de tes serviteurs et toute sa suite de voisins de la même famille gagnent +1/+1.', q:{ k:'play', n:8, tx:'Jouer 8 serviteurs.' }, aw:{ nm:'Human Kite', pwn:'Vol plané', cost:1, pay:'g', pw:{ k:'multi', s:[{ k:'buffchain', a:1, h:1, n:2 }] }, tx:'Deux fois : un de tes serviteurs et toute sa suite de voisins de la même famille gagnent +1/+1.' } },
  sh_kenny: {diff:2, stars:3, fam:SPV, pv:'s_got', mc:'ral', n:'Kenny', cost:1, pay:'g', pwn:'Oh mon Dieu !', pw:{ k:'multi', s:[{ k:'kw', kw:'r', n:1, a:0, h:1 }] }, tx:'Un de tes serviteurs sans Réincarnation gagne Réincarnation et +0/+1.', q:{ k:'drDie', n:8, tx:'Voir 8 de tes serviteurs mourir en combat.' }, aw:{ nm:'Mysterion', pwn:'Je ne peux pas mourir', cost:1, pay:'g', pw:{ k:'multi', s:[{ k:'kw', kw:'r', n:1, a:1, h:2 }] }, tx:'Un de tes serviteurs sans Réincarnation gagne Réincarnation et +1/+2.' } },
  sh_butters: {diff:1, stars:3, fam:SPV, pv:'s_got', mc:'cbt', n:'Butters', cost:1, pay:'g', pwn:'Gentil garçon', pw:{ k:'multi', s:[{ k:'buffr', a:2, h:2, n:1 }, { k:'buffr', a:1, h:1, n:1 }] }, tx:'Un de tes serviteurs aléatoire gagne +2/+2, puis un serviteur aléatoire gagne +1/+1.', q:{ k:'losses', n:3, tx:'Perdre 3 combats.' }, aw:{ nm:'Professeur Chaos', pwn:'Semer le chaos', cost:1, pay:'g', pw:{ k:'multi', s:[{ k:'buffr', a:3, h:3, n:1 }, { k:'foechill', a:3, n:2 }] }, tx:'Un de tes serviteurs aléatoire gagne +3/+3 ; prochain combat, 2 ennemis aléatoires perdent 3 attaque.' } },
  sh_randy: {diff:1, stars:3, fam:SPV, pv:'s_adu', mc:'eco', n:'Randy', pwn:'Je suis géologue', pw:{ k:'pturn', g:1 }, tx:'Passif : au début de chaque tour, gagne 1 or de plus.', q:{ k:'buys', n:8, tx:'Acheter 8 serviteurs.' }, aw:{ nm:'Randy Tegridy', pwn:'Récolte Tegridy', pw:{ k:'pturn', g:1, sell:1, roll:1 }, tx:'Passif : au début de chaque tour, gagne 1 or de plus ; ta première actualisation du tour est gratuite et vendre rapporte 1 or de plus.' } },
  sh_garrison: {diff:2, stars:4, fam:SPV, pv:'s_adu', mc:'coh', n:'Mr. Garrison', cost:2, pay:'g', pwn:'En rang, les enfants', pw:{ k:'multi', s:[{ k:'regroup' }, { k:'buffnb', a:1, h:1 }, { k:'bandbuff', a:2, h:1 }] }, tx:'Regroupe tes serviteurs par famille, puis ceux qui ont un voisin de leur famille gagnent +1/+1, et +2/+1 de plus s\'ils sont dans une bande activée.', q:{ k:'regroups', n:5, tx:'Mettre 5 fois la classe en rang (utiliser le pouvoir).' }, aw:{ nm:'Président Garrison', pwn:'Décret présidentiel', cost:2, pay:'g', pw:{ k:'multi', s:[{ k:'regroup' }, { k:'buffnb', a:1, h:1 }, { k:'bandbuff', a:2, h:2 }] }, tx:'Regroupe tes serviteurs par famille, puis ceux qui ont un voisin de leur famille gagnent +1/+1, et +2/+2 de plus s\'ils sont dans une bande activée.' } },
  sh_chef: {diff:2, stars:3, fam:SPV, pv:'s_cel', mc:'ob', n:'Chef', cost:2, pay:'g', pwn:'Salut les enfants', pw:{ k:'multi', s:[{ k:'tech', n:1 }] }, tr:{ k:'pcast', a:1, h:1 }, tx:'Ajoute un objet culte aléatoire à ta main.', trx:'Quand tu utilises un objet culte, un allié aléatoire gagne +1/+1.', q:{ k:'casts', n:6, tx:'Utiliser 6 objets cultes.' }, aw:{ nm:'Chef cuistot dragon', pwn:'Chili du dragon', cost:1, pay:'g', pw:{ k:'multi', s:[{ k:'tech', n:1 }] }, tr:{ k:'pcast', a:2, h:2 }, trx:'Quand tu utilises un objet culte, un allié aléatoire gagne +2/+2.', tx:'Ajoute un objet culte aléatoire à ta main.' } },
  sh_mackey: {diff:2, stars:3, fam:SPV, pv:'s_adu', mc:'mt', n:'Mr. Mackey', cost:1, pay:'g', pwn:'M\'kay ?', pw:{ k:'multi', s:[{ k:'drgive', n:1, fx:{ k:'eot_nb_buff', a:1, h:1 } }] }, tx:'Un de tes serviteurs gagne « Fin de tour : donne +1/+1 à ses voisins de la même famille ».', q:{ k:'mentor', n:10, tx:'Conseiller 10 fois un voisin.' }, aw:{ nm:'Mackey m\'kay suprême', pwn:'Grand conseil, m\'kay', cost:1, pay:'g', pw:{ k:'multi', s:[{ k:'drgive', n:2, fx:{ k:'eot_nb_buff', a:1, h:1 } }] }, tx:'Deux de tes serviteurs gagnent « Fin de tour : donne +1/+1 à leurs voisins de la même famille ».' } },
  sh_wendy: {diff:2, stars:3, fam:SPV, pv:'s_gin', mc:'nb', n:'Wendy', cost:1, pay:'g', pwn:'Pétition', pw:{ k:'multi', s:[{ k:'buffmain', a:1, h:1 }] }, tx:'Tes serviteurs de ta famille la plus nombreuse gagnent +1/+1.', q:{ k:'famBoard', n:1, tx:'Finir un tour avec 5 serviteurs d\'une même famille.' }, aw:{ nm:'Wendy présidente du club', pwn:'Motion adoptée', cost:2, pay:'g', pw:{ k:'multi', s:[{ k:'buffmain', a:2, h:2 }] }, tx:'Tes serviteurs de ta famille la plus nombreuse gagnent +2/+2.' } },
  // ----- univers Les Simpson v2 : 10 héros aux pouvoirs façon Champs de bataille, chacun avec son alter ego (éveil) -----
  smh_homer: {diff:1, stars:3, fam:SIV, pv:'si_fam', mc:'don', n:'Homer', cost:1, pay:'g', pwn:'Donut du matin', pw:{ k:'multi', s:[{ k:'donut', n:2 }] }, tx:'Reçois deux Donuts : des sorts gratuits qui donnent chacun +1/+1 à un de tes serviteurs.', q:{ k:'donuts', n:14, tx:'Poser 14 Donuts.' }, aw:{ nm:'Max Power', pwn:'Pas de temps à perdre', cost:1, pay:'g', pw:{ k:'multi', s:[{ k:'donut', n:3 }] }, tx:'Reçois trois Donuts.' } },
  smh_marge: {diff:1, stars:3, fam:SIV, pv:'si_aut', mc:'cbt', n:'Marge', cost:1, pay:'g', pwn:'La famille d\'abord', pw:{ k:'multi', s:[{ k:'tkw', kw:'s', n:1 }] }, tx:'Un de tes serviteurs sans Bouclier divin gagne Bouclier divin pour le prochain combat.', q:{ k:'wins', n:3, tx:'Gagner 3 combats.' }, aw:{ nm:'Marge policière', pwn:'Au nom de la loi', cost:1, pay:'g', pw:{ k:'multi', s:[{ k:'tkw', kw:'s', n:2 }] }, tx:'Deux de tes serviteurs sans Bouclier divin gagnent Bouclier divin pour le prochain combat.' } },
  smh_bart: {diff:2, stars:3, fam:SIV, pv:'si_cra', mc:'vol', n:'Bart', cost:1, pay:'g', pwn:'Ay caramba !', pw:{ k:'multi', s:[{ k:'raf' }] }, tx:'Au prochain combat, reçois dans ta main une copie du premier serviteur ennemi tué.', q:{ k:'wins', n:3, tx:'Gagner 3 combats.' }, aw:{ nm:'Bartman', pwn:'Justice de Bartman', cost:1, pay:'g', pw:{ k:'multi', s:[{ k:'raf', g:1 }] }, tx:'Au prochain combat, reçois une copie du premier serviteur ennemi tué ; récupère 1 or.' } },
  smh_lisa: {diff:1, stars:3, fam:SIV, pv:'si_fam', mc:'sv', n:'Lisa', pwn:'Exposé brillant', pw:{ k:'pupdisc' }, tx:'Passif : quand tu améliores la taverne, découvre un serviteur du niveau que tu quittes (un parmi trois).', q:{ k:'buys', n:10, tx:'Acheter 10 serviteurs.' }, aw:{ nm:'Présidente Lisa', pwn:'Décret présidentiel', pw:{ k:'pupdisc' }, tr:{ k:'pupc', n:1 }, tx:'Passif : quand tu améliores la taverne, découvre un serviteur du niveau que tu quittes.', trx:'Améliorer la taverne coûte 1 or de moins.' } },
  smh_maggie: {diff:1, stars:3, fam:SIV, pv:'si_hor', mc:'cbt', n:'Maggie', cost:1, pay:'g', pwn:'Pan !', pw:{ k:'multi', s:[{ k:'foeaoe', d:1 }] }, tx:'Au début du prochain combat, tous les serviteurs ennemis subissent 1 dégât.', q:{ k:'wins', n:5, tx:'Gagner 5 combats.' }, aw:{ nm:'Maggie la tireuse', pwn:'Qui a tiré ?', cost:1, pay:'g', pw:{ k:'multi', s:[{ k:'foeaoe', d:2 }] }, tx:'Au début du prochain combat, tous les serviteurs ennemis subissent 2 dégâts.' } },
  smh_abe: {diff:3, stars:3, fam:SIV, pv:'si_moe', mc:'eco', n:'Grand-père Abe', pwn:'Au temps jadis…', pw:{ k:'pafk', n:2, t:3, m:3 }, tx:'Passif : tu fais la sieste pendant tes 2 premiers tours (aucun or). Au tour 3, découvre trois serviteurs de niveau 3, l\'un après l\'autre.', q:{ k:'buys', n:6, tx:'Acheter 6 serviteurs.' }, aw:{ nm:'Abe des Flying Hellfish', pwn:'Souvenirs de guerre', pw:{ k:'pturn', g:1 }, tx:'Passif : au début de chaque tour, gagne 1 or de plus.' } },
  smh_burns: {diff:1, stars:3, fam:SIV, pv:'si_cra', mc:'eco', n:'Mr. Burns', pwn:'Excellent…', pw:{ k:'psell', n:1, once:1 }, tr:{ k:'pturn', g:1 }, tx:'Passif : au début de chaque tour, gagne 1 or de plus.', trx:'La première vente de chaque tour rapporte 1 or au début du prochain tour.', q:{ k:'sells', n:4, tx:'Vendre 4 serviteurs.' }, aw:{ nm:'Burns cache-soleil', pwn:'Centrale à plein régime', pw:{ k:'psell', n:1, once:1 }, tr:{ k:'pturn', g:1, roll:1 }, tx:'Passif : au début de chaque tour, gagne 1 or de plus ; ta première actualisation du tour est gratuite.', trx:'La première vente de chaque tour rapporte 1 or au début du prochain tour.' } },
  smh_ned: {diff:2, stars:3, fam:SIV, pv:'si_aut', mc:'sv', n:'Ned Flanders', cost:1, pay:'g', pwn:'Salut voisinou !', pw:{ k:'multi', s:[{ k:'buffbought', a:1, h:1 }] }, tx:'Un de tes serviteurs aléatoire gagne +1/+1, et +1/+1 de plus par serviteur acheté ce tour.', q:{ k:'buys', n:10, tx:'Acheter 10 serviteurs.' }, aw:{ nm:'Ned musclé', pwn:'Pectoraux du Seigneur', cost:1, pay:'g', pw:{ k:'multi', s:[{ k:'buffbought', a:2, h:2 }] }, tx:'Un de tes serviteurs aléatoire gagne +2/+2, et +2/+2 de plus par serviteur acheté ce tour.' } },
  smh_krusty: {diff:2, stars:3, fam:SIV, pv:'si_moe', mc:'eco', n:'Krusty', pwn:'Hey hey !', pw:{ k:'psellshop', n:3, a:1, h:1 }, tr:{ k:'pshop', a:1, h:0 }, tx:'Passif : quand tu vends un serviteur, trois fois de suite un serviteur aléatoire de la taverne gagne +1/+1.', trx:'Au début de chaque tour, les serviteurs de la taverne gagnent +1 ATQ.', q:{ k:'sells', n:4, tx:'Vendre 4 serviteurs.' }, aw:{ nm:'Krusty sans maquillage', pwn:'Le vrai Krusty', pw:{ k:'psellshop', n:4, a:1, h:1 }, tr:{ k:'pshop', a:1, h:1 }, tx:'Passif : quand tu vends un serviteur, quatre fois de suite un serviteur aléatoire de la taverne gagne +1/+1.', trx:'Au début de chaque tour, les serviteurs de la taverne gagnent +1/+1.' } },
  smh_moe: {diff:1, stars:3, fam:SIV, pv:'si_moe', mc:'eco', n:'Moe', pwn:'Tournée du patron', pw:{ k:'pupc', n:1 }, tx:'Passif : améliorer la taverne coûte 1 or de moins.', q:{ k:'buys', n:8, tx:'Acheter 8 serviteurs.' }, aw:{ nm:'Moe Flaming', pwn:'Flaming Moe pour tous', pw:{ k:'pupc', n:1 }, tr:{ k:'pturn', roll:1 }, tx:'Passif : améliorer la taverne coûte 1 or de moins.', trx:'Ta première actualisation de chaque tour est gratuite.' } },
};
// Naruto (15/11/2026) : pool réduit à 16 héros, tous membres d'un groupe emblématique
['nh_hashirama', 'nh_kushina', 'nh_roshi', 'nh_bee', 'nh_yugito', 'nh_omoi'].forEach(h => delete HEROES[h]);
// armure de départ (à la Hearthstone), réglée sur 300 parties d'IA le 15/11/2026 : les héros les plus faibles en ont le plus
delete HEROES.nh_rasa;   // retiré le 16/11 (tri des personnages)
Object.entries({ nh_tsunade:6, nh_kakuzu:0, nh_deidara:0, nh_zabuza:2, nh_sasori:2, nh_jiraiya:3, nh_orochimaru:4, nh_haku:5, nh_kankuro:5, nh_rasa:6, nh_naruto:6, nh_kakashi:6, nh_gaara:7, nh_mei:7, nh_shikamaru:7, nh_sasuke:8, nh_itachi:10 }).forEach(([h, a]) => { if (HEROES[h]) HEROES[h].ar = a; });
// héros Ninja : le bonus (trx) s'ajoute au texte du pouvoir
for (const h in HEROES) if (HEROES[h].trx && !HEROES[h].tx.includes(HEROES[h].trx)) HEROES[h].tx += ' Bonus : ' + HEROES[h].trx;
// éveil des héros (quête) : version du héros avec son nouveau pouvoir (le bonus reste, sauf s'il est remplacé)
for (const h in HEROES) { const B = HEROES[h], A = B.aw; if (!A) continue; const trx = A.trx || B.trx; B.awd = Object.assign({}, B, { pw:A.pw, pwn:A.pwn, cost:A.cost || 0, pay:A.pay, tr:A.tr || B.tr, trx, norsv:A.norsv, tx:A.tx + (trx ? ' Bonus : ' + trx : ''), aw:null, awn:A.nm }); if (!A.cost) delete B.awd.cost; }
const HX = p => { const B = p && HEROES[p.hero]; return B ? (p.haw && B.awd ? B.awd : B) : null; };
// progression de la quête du héros ; à la fin, il s'éveille
function qAdd(p, k, n = 1, card) { const B = p && HEROES[p.hero], Q = B && B.q; if (!Q || p.haw || Q.k !== k || (Q.card && card && Q.card !== card)) return; p.qp = (p.qp || 0) + n; if (p.qp >= Q.n) heroAwaken(p); }
function qSet(p, k, v) { const B = p && HEROES[p.hero], Q = B && B.q; if (!Q || p.haw || Q.k !== k) return; p.qp = Math.max(p.qp || 0, v); if (p.qp >= Q.n) heroAwaken(p); }
function heroAwaken(p) { if (p.haw) return; p.qp = HEROES[p.hero].q.n; p.haw = 1; p.hawRd = H.G ? H.G.rd : 0; p.hawId = UID++; p.pu = false; }
// familles d'un héros (modifiables dans l'atelier)
const heroFam = h => (SET.heroFam && Array.isArray(SET.heroFam[h]) && SET.heroFam[h].length ? SET.heroFam[h] : (HEROES[h] && HEROES[h].fam) || []);

/* ---------- les lois des univers : une mécanique signature par univers ---------- */
const MECHS = {
  none:{ n:'Aucune loi', ic:'dice', d:'Pas de règle particulière.' },
  ames:{ n:'Moisson d\'âmes', ic:'skull', d:'Chaque serviteur de l\'univers qui meurt en combat te rapporte une âme. Au début du tour, chaque tranche de 3 âmes donne +1/+1 à tous tes serviteurs de l\'univers.' },
  serment:{ n:'Serment des anciens', ic:'crown', d:'Quand tu obtiens un serviteur doré de l\'univers, tes autres serviteurs de l\'univers gagnent +2/+2.' },
  marche:{ n:'Marché noir', ic:'gear', d:'Vendre un serviteur de l\'univers rapporte 1 or de plus (deux fois par tour).' },
  ruee:{ n:'Ruée sauvage', ic:'leaf', d:'Au début du combat, si tu as au moins 3 serviteurs de l\'univers, ils gagnent +2/+0 pour ce combat.' },
  pillage:{ n:'Pillage', ic:'drop', d:'Quand tu gagnes un combat avec un serviteur de l\'univers encore debout, tu reçois un sort aléatoire de ton niveau.' },
  ki:{ n:'Ki et transformations', ic:'k_spark', d:'Mets un serviteur en méditation : il ne combat pas au prochain combat et te rapporte du ki au début du tour suivant (autant que son niveau, le double s\'il est doré ; 15 au plus). Le ki paie les transformations, les fusions et les techniques (achetées en or à la taverne) ; une technique lancée sur son propriétaire (Signature) a un bonus.' },
  chakra:{ n:'Groupes emblématiques, jutsus et transformations', ic:'k_spark', d:'Réunis les duos, trios et équipes de l\'animé sur ton plateau : chaque groupe réuni débloque un pouvoir tiré de l\'animé, et ils se cumulent. Chaque serviteur génère 1 chakra par tour (10 au plus). Jutsu de soutien (soin, invocation, clone) : effet immédiat. Jutsu de combat (Chidori, Rasengan, Shinra Tensei…) : tu le paies pendant le recrutement, il part au début du prochain combat. Une fois par tour, coût = niveau du ninja. Certains ninjas se transforment une seule fois (étoile bleue). Mots-clés : Genjutsu (un ennemi saute une attaque), Entrave (un ennemi ne peut plus attaquer tant que le lanceur vit), Brûlure (PV perdus après chaque attaque), Scellement (plus de mots-clés ni d\'effets), Clone, Riposte, Sharingan (copie les mots-clés d\'en face), Soin.' },
  voyage:{ n:'La guerre de l’Anneau', ic:'k_spark', d:'On joue en duo, comme dans Duos : ton allié et toi partagez la même vie, vos plateaux combattent en relais et vous pouvez vous passer des cartes par le portail pour 1 or. Ton camp est tiré au sort : les Peuples libres ne recrutent que des Hommes, des Elfes, des Nains et des Hobbits ; l’Ombre que le Mordor, Isengard et ses alliés. À la manche 3, l’Anneau arrive dans la main d’un joueur des Peuples libres : tant qu’on le tient, chaque serviteur qu’on pose réagit à l’Anneau à sa façon (Gandalf le refuse, Boromir le convoite, les orques se le disputent…). Si ton duo perd un combat, l’Anneau passe au duo vainqueur. Le dernier duo en vie gagne.' },
  resonance:{ n:'Résonance', ic:'twin', d:'Chaque sort que tu lances donne +1/+1 à deux de tes serviteurs de l\'univers.' },
  eboulement:{ n:'Éboulement', ic:'up', d:'Quand un de tes serviteurs de l\'univers avec Provocation meurt, il inflige 3 dégâts à un ennemi aléatoire.' },
  fusion:{ n:'Fusion élémentaire', ic:'wind', d:'À la fin du tour, si tu as au moins 4 éléments Squishy différents, tes serviteurs de l\'univers gagnent +1/+1.' },
  bande:{ n:'Cohésion de groupe', ic:'users', d:'Au début de chaque combat, chaque serviteur gagne +1/+1 par voisin direct de la même famille (pour ce combat). Trois voisins ou plus de la même famille forment une bande activée, qui déclenche l\'effet de sa famille : Gingers et sectes, chaque membre gagne +1/+1 par autre Ginger ou sectaire allié ; Adultes, la bande gagne +0/+3 et tu gagnes 1 or au prochain tour ; Goths, la bande gagne Venimosité ; Célébrités, la bande gagne Bouclier divin ; Animaux, la bande gagne Réincarnation. Déplace tes serviteurs pour former tes bandes. Les objets cultes s\'achètent en or à l\'étagère de la taverne.' },
  gag:{ n:'Donuts', ic:'donut', d:'Un Donut est un sort gratuit qui arrive dans ta main : pose-le sur un de tes serviteurs, il gagne +1/+1 pour toute la partie. Certains serviteurs en donnent, en posent tout seuls en fin de tour, ou augmentent la valeur de tous tes Donuts. Chaque famille joue comme une tribu de Champs de bataille : Donuts, Cris de guerre, or, Bouclier divin et Magnétisme, Réincarnation. Les objets de Springfield s\'achètent en or à l\'étagère de la taverne.' },
  portail:{ n:'Portails', ic:'portal', d:'Au début de chaque tour, tu gagnes 1 fluide de portail (3 au plus, il se garde d\'un tour à l\'autre ; certains serviteurs et inventions en donnent). Dépense 1 fluide sur un de tes serviteurs (bouton ◎) : il passe le portail et revient en variante d\'une autre dimension, un personnage aléatoire de sa famille d\'un niveau au-dessus ou au-dessous, en gardant tous ses bonus (stats, mots-clés gagnés, effets, dorure). Les inventions de Rick s\'achètent en or à l\'étagère de la taverne.' },
};
// familles concernées par une loi dans la partie en cours
const mechTr = (G, k) => (G && G.mx && G.mx[k]) || null;
const inMech = (G, k, m) => { const t = mechTr(G, k); return !!(t && m && t.includes(tribe(m))); };
function setupMechs(G) {
  G.mx = {}; G.laws = [];
  const us = (SET.univ || []).filter(u => (G.univ || []).includes(u.n));
  for (const u of us) {
    const k = u.mech && MECHS[u.mech] ? u.mech : 'none'; if (k === 'none') continue;
    const trs = u.tribes.filter(t => G.trs.includes(t)); if (!trs.length) continue;
    G.mx[k] = [...new Set((G.mx[k] || []).concat(trs))];
    G.laws.push({ u:u.n, k, trs });
  }
}

const AI_NAMES = ['Morgane', 'Thibault', 'Sacha', 'Lucie', 'Basile', 'Inès', 'Gaspard', 'Nora', 'Hugo', 'Elsa'];

/* ===================== utilitaires ===================== */
const rint = n => Math.floor(Math.random() * n);
const pickR = a => a[rint(a.length)];
const shuffle = a => { for (let i = a.length - 1; i > 0; i--) { const j = rint(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const has = (m, k) => (m.f || '').includes(k);
const addF = (m, k) => { if (k && k.length > 1) { for (const c of k) addF(m, c); return; } if (k === 'v' && !(m.c && C[m.c] && (C[m.c].f || '').includes('v'))) k = 'n';   // Toxicité de base, Venimosité quand il est gagné
  if (k === 'n' && has(m, 'v')) return;
  if (!has(m, k)) { m.f = (m.f || '') + k; if (BSRC) { const L = m.bn || (m.bn = []); let e = L.find(x => x.s === BSRC); if (!e) { e = { s:BSRC, a:0, h:0, n:1 }; L.push(e); } if (!(e.k || '').includes(k)) e.k = (e.k || '') + k; } } };
const remF = (m, k) => { m.f = (m.f || '').split(k).join(''); };
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
const clone = o => JSON.parse(JSON.stringify(o));
const isObj = o => o && typeof o === 'object' && !Array.isArray(o);
function fillDefaults(dst, def) { for (const k in def) { if (dst[k] === undefined) dst[k] = clone(def[k]); else if (isObj(dst[k]) && isObj(def[k])) fillDefaults(dst[k], def[k]); } return dst; }
function hashStr(s) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return (h >>> 0).toString(36); }
let UID = 1;
function mulberry(seed) { return function () { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }

/* =====================================================================
   CATALOGUE — construit à partir des réglages et des cartes
   ===================================================================== */
let SET = clone(DEFAULT_SETTINGS);
let CARDS = clone(DEFAULT_CARDS);
const C = {};
let TRIBES = {}, POOL_IDS = [], CAT_REV = '';
const UNKNOWN = { id:'?', n:'Carte inconnue', t:1, tr:'neu', a:0, h:1, kw:[], fx:[], f:'', fxAll:[], by:{}, art:{ f:'human', s:1 } };
const CD = id => C[id] || UNKNOWN;
const tribe = m => CD(m.c).tr;
const mult = m => m.g ? 2 : 1;
const tierOf = m => CD(m.c).t || 1;
const trName = id => (TRIBES[id] || {}).n || '';
const tribePl = id => { const T = TRIBES[id] || {}; if (T.pl) return T.pl; const n = trName(id) || id; if (/^Clan /.test(n)) return 'membres du ' + n; return /[sxz]$/i.test(n) ? n : n + 's'; };
const tribeOk = (m, tb) => !tb || tribe(m) === tb || (C[m.c] && CD(m.c).tr2 === tb);

function deriveCard(raw) {
  const kw = (raw.kw || []).filter(k => SET.kw[k]);
  const f = kw.filter(k => BASE_KW.includes(k)).join('');
  const fxAll = (raw.fx || []).filter(e => e && ET[e.k]).slice();
  kw.forEach(k => { const K = SET.kw[k]; if (!BASE_KW.includes(k) && K.fx && ET[K.fx.k]) fxAll.push(K.fx); });
  const by = {}; fxAll.forEach(e => { const tr = ET[e.k].tr; (by[tr] = by[tr] || []).push(e); });
  return { ...raw, kw, tr:TRIBES[raw.tr] ? raw.tr : 'neu', f, fxAll, by, tok:raw.t === 0 };
}
function rebuildCatalog() {
  TRIBES = { neu:{ id:'neu', ...SET.neutral } };
  SET.tribes.forEach(t => TRIBES[t.id] = t);
  for (const k in C) delete C[k];
  Object.keys(CARDS).sort().forEach(id => C[id] = deriveCard(CARDS[id]));
  for (const id in C) C[id].val = cardValue(C[id]).total;
  POOL_IDS = Object.keys(C).filter(id => C[id].t > 0 && !FUS_ONLY.includes(id) && !C[id].off && !C[id].comp && (C[id].tr === 'neu' || TRIBES[C[id].tr].on !== false));
  CAT_REV = hashStr(JSON.stringify([SET, CARDS]));
  if (typeof rebuildArt === 'function') rebuildArt();
}
// carte dorée : caractéristiques de base doublées, comme dans Champs de bataille (les bonus des trois exemplaires s'ajoutent)
const GOLD_K = 2;
function mk(id, g) { const b = CD(id); return { c:id, a:b.a * (g ? GOLD_K : 1), h:b.h * (g ? GOLD_K : 1), g:g ? 1 : 0, f:b.f, u:UID++ }; }
// suivi des améliorations : chaque bonus est noté avec sa source (serviteur, sort, pouvoir…)
let BSRC = null;
function withSrc(src, fn) { const o = BSRC; BSRC = src; try { return fn(); } finally { BSRC = o; } }
function logB(m, src, a, h, kw) {
  const L = m.bn || (m.bn = []); let e = L.find(x => x.s === src);
  if (!e) { if (L.length >= 24) return; e = { s:src, a:0, h:0, n:0 }; L.push(e); }
  e.a += a || 0; e.h += h || 0; e.n++; if (kw && !(e.k || '').includes(kw)) e.k = (e.k || '') + kw;
}
const buff = (m, a, h) => { m.a += a; m.h += h; if (BSRC && (a || h)) logB(m, BSRC, a, h); };

/* =====================================================================
   EFFETS — la liste d'effets proposée dans l'atelier.
   tr : déclencheur ; ps : paramètres ; w : poids par défaut ; mag : ampleur
   ===================================================================== */
const TRIG = { combo:'Combo', bc:'Cri de guerre', dr:'Râle d\'agonie', soc:'Début du combat', eot:'Fin de tour', play:'Après avoir joué', die:'Quand un allié meurt', surv:'Quand il survit', atk:'Après avoir attaqué', sell:'Quand tu le vends', aura:'Aura', roll:'Quand tu actualises', shield:'Quand un allié perd son Bouclier', pow:'Quand tu utilises le pouvoir', sot:'Début de tour', up:'Quand tu améliores', cast:'Quand tu lances un sort', portal:'Quand un allié passe un portail' };
const PARAMS = {
  a:{ l:'Attaque +', min:0, max:20, def:1 }, h:{ l:'Vie +', min:0, max:20, def:1 }, n:{ l:'Nombre', min:1, max:7, def:1 },
  d:{ l:'Dégâts', min:1, max:20, def:2 }, tier:{ l:'Niveau max', min:1, max:6, def:3 },
  tb:{ l:'Tribu', sel:'tribe' }, tb2:{ l:'Avec un', sel:'tribe' }, card:{ l:'Serviteur', sel:'card' }, kw:{ l:'Mot-clé', sel:'kw' },
};
const AL = () => +SET.val.allies || 3;
const sign = (a, h) => `+${a}/+${h}`;
const tierMid = t => { const b = SET.budget[t] || [5, 10]; return (b[0] + b[1]) / 2; };
const kwCost = k => (SET.kw[k] || {}).c || 0;
function cardValueById(id, depth) { const c = CARDS[id]; return c && depth < 3 ? cardValue(c, depth + 1).total : 0; }
const one = (tb, s, p) => tb ? (s ? ((TRIBES[tb] || {}).sg || trName(tb)) : tribePl(tb)) : (s ? 'serviteur' : 'serviteurs');
const ET = {
  bc_buff_tribe:{ tr:'bc', l:'Bonus à tes autres serviteurs', ps:['a', 'h', 'tb'], w:0.7, mag:e => (e.a + e.h) * AL(), txt:(e, k) => `Cri de guerre : donne ${sign(e.a * k, e.h * k)} à tes autres ${one(e.tb)}.` },
  bc_buff_rand:{ tr:'bc', l:'Bonus à un allié aléatoire', ps:['a', 'h', 'tb'], w:1, mag:e => e.a + e.h, txt:(e, k) => `Cri de guerre : donne ${sign(e.a * k, e.h * k)} à un autre ${one(e.tb, 1)} aléatoire.` },
  bc_summon:{ tr:'bc', l:'Invoquer un serviteur', ps:['card', 'n'], w:1, mag:(e, d) => cardValueById(e.card, d) * e.n, txt:e => `Cri de guerre : invoque ${e.n > 1 ? e.n + ' × ' : ''}${CD(e.card).n}.` },
  bc_chakra:{ tr:'bc', l:'Gagner du chakra', ps:['n'], w:1.2, mag:e => e.n, txt:(e, k) => `Cri de guerre : gagnez ${e.n * k} chakra.` },
  eot_chakra:{ tr:'eot', l:'Gagner du chakra', ps:['n'], w:1.4, mag:e => e.n * 2, txt:(e, k) => `Fin de tour : gagnez ${e.n * k} chakra.` },
  cast_braise:{ tr:'cast', l:'Attiser les braises', ps:['n'], w:1.2, mag:e => e.n * 2, txt:(e, k) => `Quand tu lances un sort, gagne ${e.n * k} braise${e.n * k > 1 ? 's' : ''}.` },
  eot_ck_braise:{ tr:'eot', l:'Brûler du chakra en braises', ps:['n'], w:1.3, mag:e => e.n * 2, txt:(e, k) => `Fin de tour : si tu as ${e.n} chakra, le brûle pour gagner ${(e.n + 1) * k} braises.` },
  bc_upd:{ tr:'bc', l:'Réduire le coût d\'amélioration', ps:['n'], w:1.4, mag:e => e.n * 2, txt:(e, k) => `Cri de guerre : améliorer la taverne coûte ${e.n * k} or de moins.` },
  eot_inc:{ tr:'eot', l:'Or au prochain tour', ps:['n'], w:1.5, mag:e => e.n * 3, txt:(e, k) => `Fin de tour : gagnez ${e.n * k} or au début du prochain tour.` },
  eot_maree:{ tr:'eot', l:'Faire monter la marée', ps:['n'], w:1.2, mag:e => e.n * 2, txt:(e, k) => `Fin de tour : la marée monte de ${e.n * k}.` },
  eot_wave:{ tr:'eot', l:'Vague : bonus au voisin de droite', ps:['a', 'h'], w:1.1, mag:e => e.a + e.h, txt:(e, k) => `Fin de tour : donne ${sign(e.a * k, e.h * k)} au serviteur à sa droite ; la vague se transmet.` },
  pas_ckx:{ tr:'pas', l:'Grande réserve de chakra', ps:['n'], w:1.2, mag:e => e.n * 2, txt:e => `Grande réserve : ton chakra peut monter jusqu\'à ${CK_MAX + e.n} tant qu\'il est sur le plateau.` },
  eot_charge:{ tr:'eot', l:'Accumuler de la charge', ps:['n'], w:1.2, mag:e => e.n * 2, txt:(e, k) => `Fin de tour : gagnez ${e.n * k} charge.` },
  awk_surge:{ tr:'awk', l:'Surtension (7 chakra ou plus)', ps:['a', 'h'], w:1.3, mag:e => e.a + e.h, txt:(e, k) => `Surtension : au combat, gagne ${sign(e.a * k, e.h * k)} si tu as 7 chakra ou plus.` },
  eot_souffle:{ tr:'eot', l:'Faire souffler le vent', ps:['n'], w:1.2, mag:e => e.n * 2, txt:(e, k) => `Fin de tour : gagnez ${e.n * k} souffle.` },
  eot_roche:{ tr:'eot', l:'Amasser la roche', ps:['n'], w:1.2, mag:e => e.n * 2, txt:(e, k) => `Fin de tour : gagnez ${e.n * k} roche.` },
  eot_anchor:{ tr:'eot', l:'Ancrage : le chakra restant renforce', ps:[], w:1.2, mag:() => 4, txt:(e, k) => `Ancrage : fin de tour, gagne +0/+1 par chakra non dépensé (${2 * k} au plus).` },
  awk_phoenix:{ tr:'awk', l:'Phénix renforcé', ps:[], w:1.5, mag:() => 6, txt:() => 'Après l\'Éveil : le Phénix de tes serviteurs Katon est doublé.' },
  awk_hurricane:{ tr:'awk', l:'Ouragan', ps:['d'], w:1.5, mag:e => e.d * 5, txt:e => `Après l\'Éveil : après avoir attaqué, inflige ${e.d} dégât${e.d > 1 ? 's' : ''} à 3 ennemis de plus.` },
  awk_tsunami:{ tr:'awk', l:'Raz-de-marée renforcé', ps:[], w:1.5, mag:() => 6, txt:() => 'Après l\'Éveil : le raz-de-marée est doublé.' },
  awk_storm:{ tr:'awk', l:'Orage total renforcé', ps:[], w:1.5, mag:() => 6, txt:() => 'Après l\'Éveil : l\'orage total est doublé.' },
  awk_quake:{ tr:'awk', l:'Séisme', ps:[], w:1.5, mag:() => 6, txt:() => 'Après l\'Éveil : au début du combat, inflige un sixième de sa vie à tous les ennemis.' },
  soc_steal:{ tr:'soc', l:'Voler du chakra', ps:['n'], w:1.4, mag:e => e.n * 2, txt:(e, k) => `Début du combat : vole ${e.n * k} chakra à l\'adversaire.` },
  dr_steal:{ tr:'dr', l:'Voler du chakra en mourant', ps:['n'], w:1.2, mag:e => e.n * 2, txt:(e, k) => `Râle d\'agonie : vole ${e.n * k} chakra à l\'adversaire.` },
  soc_ck:{ tr:'soc', l:'Se renforcer selon le chakra', ps:['a', 'h'], w:1.6, mag:e => (e.a + e.h) * 3, txt:(e, k) => `Début du combat : gagne ${sign(e.a * k, e.h * k)} pour chaque chakra que tu as (5 au plus).` },
  eot_ck_spend:{ tr:'eot', l:'Dépenser du chakra pour se renforcer', ps:['n', 'a', 'h'], w:1.3, mag:e => e.a + e.h, txt:(e, k) => `Fin de tour : si tu as ${e.n} chakra, les dépense pour gagner ${sign(e.a * k, e.h * k)}.` },
  cast_ck:{ tr:'cast', l:'Gagner du chakra en lançant un sort', ps:['n'], w:1.2, mag:e => e.n * 2, txt:(e, k) => `Quand tu lances un sort, gagne ${e.n * k} chakra.` },
  cast_memo:{ tr:'cast', l:'Retenir la technique lancée', ps:[], w:1, mag:() => 3, txt:() => 'Mémoire : retient la dernière technique ninja que tu lances.' },
  sot_memo:{ tr:'sot', l:'Rejouer la technique retenue', ps:[], w:1, mag:() => 3, txt:(e, k) => `Début de tour : ajoute à ta main ${k > 1 ? k + ' copies' : 'une copie'} de la technique retenue.` },
  bc_gold:{ tr:'bc', l:'Gagner de l\'or', ps:['n'], w:1.5, mag:e => e.n, txt:(e, k) => `Cri de guerre : gagnez ${e.n * k} or.` },
  bc_card:{ tr:'bc', l:'Ajouter un serviteur à la main', ps:['n', 'tb'], w:1, mag:e => e.n * 3, txt:e => `Cri de guerre : ajoute ${e.n > 1 ? e.n + ' ' + one(e.tb) + ' aléatoires' : 'un ' + one(e.tb, 1) + ' aléatoire'} à ta main.` },
  dr_summon:{ tr:'dr', l:'Invoquer un serviteur', ps:['card', 'n'], w:0.8, mag:(e, d) => cardValueById(e.card, d) * e.n, txt:e => `Râle d'agonie : invoque ${e.n > 1 ? e.n + ' × ' : ''}${CD(e.card).n}.` },
  dr_summon_rand:{ tr:'dr', l:'Invoquer des serviteurs aléatoires', ps:['n', 'tb', 'tier'], w:0.5, mag:e => e.n * tierMid(e.tier), txt:e => `Râle d'agonie : invoque ${e.n > 1 ? e.n + ' ' + one(e.tb) + ' aléatoires' : 'un ' + one(e.tb, 1) + ' aléatoire'} de niveau ${e.tier} ou moins.` },
  dr_buff_rand:{ tr:'dr', l:'Bonus à un allié aléatoire', ps:['a', 'h', 'tb'], w:0.8, mag:e => e.a + e.h, txt:(e, k) => `Râle d'agonie : donne ${sign(e.a * k, e.h * k)} à un ${one(e.tb, 1)} allié aléatoire.` },
  dr_buff_all:{ tr:'dr', l:'Bonus à tous tes serviteurs', ps:['a', 'h', 'tb'], w:0.8, mag:e => (e.a + e.h) * AL(), txt:(e, k) => `Râle d'agonie : donne ${sign(e.a * k, e.h * k)} à tes autres ${one(e.tb)}.` },
  dr_dmg:{ tr:'dr', l:'Dégâts à des ennemis aléatoires', ps:['d', 'n'], w:0.8, mag:e => e.d * e.n, txt:(e, k) => `Râle d'agonie : inflige ${e.d * k} dégâts à ${e.n > 1 ? e.n + ' ennemis aléatoires' : 'un ennemi aléatoire'}.` },
  dr_kw:{ tr:'dr', l:'Donner un mot-clé aux alliés', ps:['kw', 'tb'], w:0.8, mag:e => kwCost(e.kw) * AL(), txt:e => `Râle d'agonie : donne ${(SET.kw[e.kw] || {}).n || '?'} à tes ${one(e.tb)}.` },
  soc_dmg:{ tr:'soc', l:'Dégâts à des ennemis aléatoires', ps:['d', 'n'], w:1, mag:e => e.d * e.n, txt:(e, k) => `Début du combat : inflige ${e.d * k} dégâts à ${e.n > 1 ? e.n + ' ennemis aléatoires' : 'un ennemi aléatoire'}.` },
  soc_buff:{ tr:'soc', l:'Bonus à tes autres serviteurs', ps:['a', 'h', 'tb'], w:1, mag:e => (e.a + e.h) * AL(), txt:(e, k) => `Début du combat : donne ${sign(e.a * k, e.h * k)} à tes autres ${one(e.tb)}.` },
  soc_kw:{ tr:'soc', l:'Donner un mot-clé aux alliés', ps:['kw', 'tb'], w:1, mag:e => kwCost(e.kw) * AL(), txt:e => `Début du combat : donne ${(SET.kw[e.kw] || {}).n || '?'} à tes autres ${one(e.tb)}.` },
  eot_self:{ tr:'eot', l:'Se renforcer', ps:['a', 'h'], w:1.5, mag:e => e.a + e.h, txt:(e, k) => `Fin de tour : gagne ${sign(e.a * k, e.h * k)}.` },
  eot_buff_rand:{ tr:'eot', l:'Bonus à des alliés aléatoires', ps:['a', 'h', 'n', 'tb'], w:1.5, mag:e => (e.a + e.h) * e.n, txt:(e, k) => `Fin de tour : donne ${sign(e.a * k, e.h * k)} à ${e.n > 1 ? e.n + ' autres ' + one(e.tb) + ' aléatoires' : 'un autre ' + one(e.tb, 1) + ' aléatoire'}.` },
  eot_buff_all:{ tr:'eot', l:'Bonus à tous tes serviteurs', ps:['a', 'h', 'tb'], w:1.2, mag:e => (e.a + e.h) * AL(), txt:(e, k) => `Fin de tour : donne ${sign(e.a * k, e.h * k)} à tous tes autres ${one(e.tb)}.` },
  play_self:{ tr:'play', l:'Se renforcer quand tu joues…', ps:['tb', 'a', 'h'], w:1.5, mag:e => e.a + e.h, txt:(e, k) => `Après que tu as joué un ${one(e.tb, 1)}, gagne ${sign(e.a * k, e.h * k)}.` },
  play_other:{ tr:'play', l:'Renforcer le serviteur joué', ps:['tb', 'a', 'h'], w:1.5, mag:e => e.a + e.h, txt:(e, k) => `Après que tu as joué un ${one(e.tb, 1)}, donne-lui ${sign(e.a * k, e.h * k)}.` },
  die_self:{ tr:'die', l:'Se renforcer quand un allié meurt', ps:['tb', 'a', 'h'], w:1.2, mag:e => e.a + e.h, txt:(e, k) => `Quand un autre ${one(e.tb, 1)} allié meurt, gagne ${sign(e.a * k, e.h * k)}.` },
  die_others:{ tr:'die', l:'Renforcer les alliés quand un allié meurt', ps:['tb', 'a', 'h'], w:0.8, mag:e => (e.a + e.h) * AL(), txt:(e, k) => `Quand un ${one(e.tb, 1)} allié meurt, donne ${sign(e.a * k, e.h * k)} à tes autres ${one(e.tb)}.` },
  surv_self:{ tr:'surv', l:'Se renforcer après des dégâts', ps:['a', 'h'], w:1.2, mag:e => e.a + e.h, txt:(e, k) => `Quand il survit à des dégâts, gagne ${sign(e.a * k, e.h * k)}.` },
  atk_self:{ tr:'atk', l:'Se renforcer après avoir attaqué', ps:['a', 'h'], w:1.2, mag:e => e.a + e.h, txt:(e, k) => `Ralliement : gagne ${sign(e.a * k, e.h * k)}.` },
  atk_buff_rand:{ tr:'atk', l:'Bonus à un autre allié', ps:['a', 'h'], w:1.2, mag:e => e.a + e.h, txt:(e, k) => `Ralliement : donne ${sign(e.a * k, e.h * k)} à un autre allié aléatoire.` },
  soc_self:{ tr:'soc', l:'Se transformer', ps:['a', 'h'], w:0.9, mag:e => e.a + e.h, txt:(e, k) => `Début du combat : gagne ${sign(e.a * k, e.h * k)}.` },
  soc_aoe:{ tr:'soc', l:'Dégâts à tous les ennemis', ps:['d'], w:1, mag:e => e.d * 4, txt:(e, k) => `Début du combat : inflige ${e.d * k} dégât${e.d * k > 1 ? 's' : ''} à tous les ennemis.` },
  eot_buff_taunt:{ tr:'eot', l:'Bonus aux serviteurs avec Provocation', ps:['a', 'h'], w:1.1, mag:e => (e.a + e.h) * 2, txt:(e, k) => `Fin de tour : tes serviteurs avec Provocation gagnent ${sign(e.a * k, e.h * k)}.` },
  eot_buff_big:{ tr:'eot', l:'Bonus au serviteur le plus fort', ps:['a', 'h'], w:1.5, mag:e => e.a + e.h, txt:(e, k) => `Fin de tour : donne ${sign(e.a * k, e.h * k)} à ton serviteur qui a le plus d'attaque.` },
  roll_buff_tribe:{ tr:'roll', l:'Bonus à tes serviteurs', ps:['a', 'h', 'tb'], w:0.8, mag:e => (e.a + e.h) * AL(), txt:(e, k) => `Quand tu actualises la taverne, donne ${sign(e.a * k, e.h * k)} à tes autres ${one(e.tb)}.` },
  bc_spell:{ tr:'bc', l:'Ajouter un sort à la main', ps:['n'], w:1, mag:e => e.n * 3, txt:(e, k) => `Cri de guerre : ajoute ${e.n * k > 1 ? e.n * k + ' sorts aléatoires' : 'un sort aléatoire'} à ta main.` },
  eot_braise_self:{ tr:'eot', l:'Attiser sa lame', ps:['n'], w:1, mag:e => e.n * 2, txt:(e, k) => `Fin de tour : gagne +1 attaque par paire de braises (+${e.n * k} au plus).` },
  eot_maree_self:{ tr:'eot', l:'Boire la marée', ps:['n'], w:1, mag:e => e.n * 2, txt:(e, k) => `Fin de tour : gagne +1/+1 par tranche de 3 marée (+${e.n * k}/+${e.n * k} au plus).` },
  combo_self:{ tr:'combo', l:'Se renforcer à chaque combo', ps:['a', 'h'], w:1.5, mag:e => e.a + e.h, txt:(e, k) => `Quand tu déclenches un combo, gagne ${sign(e.a * k, e.h * k)}.` },
  combo_gold:{ tr:'combo', l:'Or à chaque combo', ps:['n'], w:1.5, mag:e => e.n * 3, txt:(e, k) => `Quand tu déclenches un combo, gagne ${e.n * k} or.` },
  combo_ck:{ tr:'combo', l:'Chakra à chaque combo', ps:['n'], w:1.2, mag:e => e.n * 2, txt:(e, k) => `Quand tu déclenches un combo, récupère ${e.n * k} chakra.` },
  combo_tribe:{ tr:'combo', l:'Bonus au clan à chaque combo', ps:['a', 'h', 'tb'], w:0.8, mag:e => (e.a + e.h) * AL(), txt:(e, k) => `Quand tu déclenches un combo, donne ${sign(e.a * k, e.h * k)} à tes autres ${one(e.tb)}.` },
  rsv_bc:{ tr:'bc', l:'Remplir le réservoir', ps:[], w:1, mag:() => 3, txt:() => 'Cri de guerre : remplit une moitié de ton réservoir de l\'élément de son clan.' },
  cast_self:{ tr:'cast', l:'Se renforcer', ps:['a', 'h'], w:1.5, mag:e => e.a + e.h, txt:(e, k) => `Quand tu lances un sort, gagne ${sign(e.a * k, e.h * k)}.` },
  cast_buff_rand:{ tr:'cast', l:'Bonus à un autre allié', ps:['a', 'h'], w:1.5, mag:e => e.a + e.h, txt:(e, k) => `Quand tu lances un sort, donne ${sign(e.a * k, e.h * k)} à un autre allié aléatoire.` },
  cast_buff_tribe:{ tr:'cast', l:'Bonus à tes serviteurs', ps:['a', 'h', 'tb'], w:0.8, mag:e => (e.a + e.h) * AL(), txt:(e, k) => `Quand tu lances un sort, donne ${sign(e.a * k, e.h * k)} à tes autres ${one(e.tb)}.` },
  eot_combo:{ tr:'eot', l:'Combo : se renforcer si…', ps:['tb2', 'a', 'h'], w:1, mag:e => e.a + e.h, txt:(e, k) => `Fin de tour : si tu as un ${one(e.tb2, 1)}, gagne ${sign(e.a * k, e.h * k)}.` },
  bc_combo:{ tr:'bc', l:'Combo : bonus à tous si…', ps:['tb2', 'a', 'h'], w:0.6, mag:e => (e.a + e.h) * AL(), txt:(e, k) => `Cri de guerre : si tu as un ${one(e.tb2, 1)}, donne ${sign(e.a * k, e.h * k)} à tes autres serviteurs.` },
  soc_combo_dmg:{ tr:'soc', l:'Combo : dégâts si…', ps:['tb2', 'd', 'n'], w:0.7, mag:e => e.d * e.n, txt:(e, k) => `Début du combat : si tu as un ${one(e.tb2, 1)}, inflige ${e.d * k} dégâts à ${e.n > 1 ? e.n + ' ennemis aléatoires' : 'un ennemi aléatoire'}.` },
  soc_chill:{ tr:'soc', l:'Gel : baisser l\'attaque d\'ennemis', ps:['a', 'n'], w:0.8, mag:e => e.a * Math.min(e.n, 4) * 1.2, txt:(e, k) => `Début du combat : ${e.n >= 7 ? 'tous les ennemis perdent' : e.n > 1 ? e.n + ' ennemis aléatoires perdent' : 'un ennemi aléatoire perd'} ${e.a * k} attaque.` },
  soc_combo_chill:{ tr:'soc', l:'Combo : gel si…', ps:['tb2', 'a', 'n'], w:0.6, mag:e => e.a * Math.min(e.n, 4) * 1.2, txt:(e, k) => `Début du combat : si tu as un ${one(e.tb2, 1)}, ${e.n > 1 ? e.n + ' ennemis aléatoires perdent' : 'un ennemi aléatoire perd'} ${e.a * k} attaque.` },
  soc_chill_el:{ tr:'soc', l:'Gel par élément', ps:['a'], w:0.8, mag:e => e.a * 2.5 * 4, txt:(e, k) => `Début du combat : tous les ennemis perdent ${e.a * k} attaque par élément Squishy différent sur ton plateau.` },
  atk_zap:{ tr:'atk', l:'Zap : dégâts après avoir attaqué', ps:['d', 'n'], w:1.1, mag:e => e.d * e.n * 2, txt:(e, k) => `Ralliement : inflige ${e.d * k} dégât${e.d * k > 1 ? 's' : ''} à ${e.n > 1 ? e.n + ' ennemis aléatoires' : 'un ennemi aléatoire'}.` },
  atk_zap_el:{ tr:'atk', l:'Zap par élément', ps:['d'], w:1.1, mag:e => e.d * 2.5 * 2, txt:(e, k) => `Ralliement : inflige ${e.d * k} dégât${e.d * k > 1 ? 's' : ''} à un ennemi aléatoire par élément Squishy différent sur ton plateau.` },
  eot_elements:{ tr:'eot', l:'Se renforcer par élément', ps:['a', 'h'], w:1.2, mag:e => (e.a + e.h) * 2.5, txt:(e, k) => `Fin de tour : gagne ${sign(e.a * k, e.h * k)} par élément différent parmi tes Squishys.` },
  soc_elements:{ tr:'soc', l:'Bonus aux Squishys par élément', ps:['a', 'h'], w:0.6, mag:e => (e.a + e.h) * 2.5 * AL(), txt:(e, k) => `Début du combat : tes autres Squishys gagnent ${sign(e.a * k, e.h * k)} par élément différent.` },
  soc_self_el:{ tr:'soc', l:'Se renforcer par élément', ps:['a', 'h'], w:0.9, mag:e => (e.a + e.h) * 2.5, txt:(e, k) => `Début du combat : gagne ${sign(e.a * k, e.h * k)} par élément différent parmi tes Squishys.` },
  roll_self:{ tr:'roll', l:'Se renforcer', ps:['a', 'h'], w:1.5, mag:e => e.a + e.h, txt:(e, k) => `Quand tu actualises la taverne, gagne ${sign(e.a * k, e.h * k)}.` },
  shield_buff:{ tr:'shield', l:'Renforcer l\'allié qui le perd', ps:['a'], w:1.2, mag:e => e.a * 2, txt:(e, k) => `Quand un de tes serviteurs perd son Bouclier divin, il gagne +${e.a * k} attaque.` },
  pow_buff_rand:{ tr:'pow', l:'Bonus à un allié aléatoire', ps:['a', 'h'], w:1.5, mag:e => e.a + e.h, txt:(e, k) => `Quand tu utilises ton pouvoir héroïque, donne ${sign(e.a * k, e.h * k)} à un autre serviteur aléatoire.` },
  pow_spell:{ tr:'pow', l:'Ajouter un sort à la main', ps:['n'], w:1.2, mag:e => e.n * 3, txt:(e, k) => `Quand tu utilises ton pouvoir héroïque, ajoute ${e.n * k > 1 ? e.n * k + ' sorts aléatoires' : 'un sort aléatoire'} à ta main.` },
  sot_gold:{ tr:'sot', l:'Gagner de l\'or', ps:['n'], w:2, mag:e => e.n, txt:(e, k) => `Début de tour : gagnez ${e.n * k} or.` },
  eot_buff_left:{ tr:'eot', l:'Bonus au serviteur le plus à gauche', ps:['a', 'h'], w:1.5, mag:e => e.a + e.h, txt:(e, k) => `Fin de tour : donne ${sign(e.a * k, e.h * k)} à ton serviteur le plus à gauche.` },
  eot_blood:{ tr:'eot', l:'Payer des PV pour se renforcer', ps:['a', 'h', 'd'], w:1.2, mag:e => Math.max(0, e.a + e.h - e.d), txt:(e, k) => `Fin de tour : ton héros perd ${e.d} PV et ce serviteur gagne ${sign(e.a * k, e.h * k)}.` },
  up_buff_all:{ tr:'up', l:'Bonus à tous tes serviteurs', ps:['a', 'h', 'tb'], w:0.8, mag:e => (e.a + e.h) * AL(), txt:(e, k) => `Quand tu améliores la taverne, donne ${sign(e.a * k, e.h * k)} à tous tes ${one(e.tb)}.` },
  eot_fireball:{ tr:'eot', l:'Renforcer la boule de feu du héros', ps:['n'], w:1, mag:e => e.n * 2, txt:(e, k) => `Fin de tour : la boule de feu de ton héros gagne +${e.n * k} dégât${e.n * k > 1 ? 's' : ''}.` },
  aura_bc:{ tr:'aura', l:'Doubler les Cris de guerre', ps:[], w:10, mag:() => 1, txt:(e, k) => `Tes Cris de guerre se déclenchent ${k > 1 ? 'trois' : 'deux'} fois.` },
  aura_dr:{ tr:'aura', l:'Doubler les Râles d\'agonie', ps:[], w:10, mag:() => 1, txt:(e, k) => `Tes Râles d'agonie se déclenchent ${k > 1 ? 'trois' : 'deux'} fois.` },
  aura_eot:{ tr:'aura', l:'Doubler les effets de Fin de tour', ps:[], w:10, mag:() => 1, txt:(e, k) => `Tes effets de Fin de tour se déclenchent ${k > 1 ? 'trois' : 'deux'} fois.` },
  aura_soc:{ tr:'aura', l:'Doubler les effets de Début du combat', ps:[], w:8, mag:() => 1, txt:(e, k) => `Tes effets de Début du combat se déclenchent ${k > 1 ? 'trois' : 'deux'} fois.` },
  // ----- mécaniques ninja des serviteurs -----
  soc_fire_tb:{ tr:'soc', l:'Explosions de Konoha', ps:['d'], w:1.2, mag:e => e.d * 6, txt:(e, k) => `Début du combat : ${e.d * k} dégât${e.d * k > 1 ? 's' : ''} à un ennemi aléatoire par allié de Konoha.` },
  cast_fire:{ tr:'cast', l:'Sort : dégâts au prochain combat', ps:['d'], w:1.2, mag:e => e.d * 3, txt:(e, k) => `Quand tu lances un sort : +${e.d * k} dégât${e.d * k > 1 ? 's' : ''} à l'ennemi au prochain combat.` },
  eot_card_buff:{ tr:'eot', l:'Renforcer les marionnettes', ps:['card', 'a', 'h'], w:1, mag:e => (e.a + e.h) * 2, txt:(e, k) => `Fin de tour : tes ${CD(e.card).n}${/[usiūxz]$/.test(CD(e.card).n) ? '' : 's'} gagnent ${sign(e.a * k, e.h * k)}.` },
  win_self:{ tr:'win', l:'Jinchūriki : grandir à chaque victoire', ps:['a', 'h'], w:1.3, mag:e => (e.a + e.h) * 3, txt:(e, k) => `Jinchūriki : après chaque combat gagné, gagne ${sign(e.a * k, e.h * k)}.` },
  win_all:{ tr:'win', l:'Victoire de Kumo', ps:['a', 'h', 'tb'], w:1, mag:e => (e.a + e.h) * 6, txt:(e, k) => `Après chaque combat gagné, tes autres ${one(e.tb)} gagnent ${sign(e.a * k, e.h * k)}.` },
  soc_avalanche:{ tr:'soc', l:'Avalanche', ps:[], w:1.2, mag:() => 6, txt:() => 'Avalanche : au début du combat, inflige un quart de sa vie à un ennemi aléatoire.' },
  ckm:{ tr:'ckm', l:'Éveil du serviteur', ps:['c'], w:1.2, mag:e => 6, txt:(e, k) => `Éveil (${e.c} chakra, une seule fois) : gagne +${e.c * k}/+${e.c * k}, puis au début de chaque tour : ${mTx(e.m, k)}` },
  bc_gate:{ tr:'bc', l:'Porte interdite (cri de guerre)', ps:['d', 'a', 'h'], w:1.1, mag:e => Math.max(0, e.a + e.h - e.d / 2), txt:(e, k) => `Cri de guerre · Porte interdite : ton héros perd ${e.d} PV, gagne ${sign(e.a * k, e.h * k)}.` },
  soc_gate:{ tr:'soc', l:'Porte interdite (combat)', ps:['a', 'd'], w:1, mag:e => e.a - e.d / 2, txt:(e, k) => `Début du combat · Porte interdite : perd ${e.d * k} PV, +${e.a * k} attaque.` },
  eot_clones:{ tr:'eot', l:'Renforcer les clones', ps:['a', 'h'], w:1, mag:e => (e.a + e.h) * 2, txt:(e, k) => `Fin de tour : tes clones gagnent ${sign(e.a * k, e.h * k)}.` },
  soc_seal:{ tr:'soc', l:'Sceau : retirer les mots-clés', ps:['n'], w:1, mag:e => e.n * 3, txt:(e, k) => `Début du combat · Sceau : ${e.n * k > 1 ? e.n * k + ' ennemis perdent' : 'un ennemi perd'} ses mots-clés.` },
  soc_summon:{ tr:'soc', l:'Invocation au début du combat', ps:['card', 'n'], w:0.9, mag:(e, d) => cardValueById(e.card, d) * (e.n || 1), txt:e => `Début du combat : invoque ${(e.n || 1) > 1 ? e.n + ' × ' : ''}${CD(e.card).n}.` },
  cast_chain:{ tr:'cast', l:'Jutsu en chaîne', ps:['n', 'a', 'h'], w:1.2, mag:e => (e.a + e.h) * 2, txt:(e, k) => `Chaîne (${e.n}e technique du tour et +) : ${sign(e.a * k, e.h * k)}.` },
  cast_chain_ck:{ tr:'cast', l:'Jutsu en chaîne (chakra)', ps:['n', 'c'], w:1, mag:e => e.c * 2, txt:(e, k) => `Chaîne (${e.n}e technique du tour et +) : +${e.c * k} chakra.` },
  rank:{ tr:'rank', l:'Rang (Genin → Jônin)', ps:['a', 'h'], w:1.2, mag:e => (e.a + e.h) * 2, txt:(e, k) => `Rang : monte en grade à chaque victoire, ${sign(e.a * k, e.h * k)} (Chûnin, Jônin).` },
  soc_team:{ tr:'soc', l:'Équipe de 3', ps:['a', 'h'], w:1.2, mag:e => (e.a + e.h) * 2, txt:(e, k) => `Équipe de 3 : entouré de son clan, l'équipe gagne ${sign(e.a * k, e.h * k)}.` },
  combo_kg:{ tr:'combo', l:'Kekkei genkai', ps:['a', 'h'], w:1.2, mag:e => (e.a + e.h) * 2, txt:(e, k, id) => `Kekkei genkai : à chaque combo, ${sign(e.a * k, e.h * k)} par élément qui est une de ses natures.` },
  fus:{ tr:'fus', l:'Fusion', ps:[], w:0, mag:() => 0, txt:e => `Fusion : avec ${[e.p, e.p2].filter(Boolean).map(x => CD(x).n).join(' ou ')} → ${[e.r, e.r2].filter(Boolean).map(x => CD(x).n).join(' ou ')} (bouton ✚, ki).` },
  fusres:{ tr:'fus', l:'Né d\'une fusion', ps:[], w:0, mag:() => 0, txt:e => `${e.how} : naît de ${CD(e.a).n} + ${[e.b, e.b2].filter(Boolean).map(x => CD(x).n).join(' ou ')} (stats additionnées).${e.buy ? ' Aussi en vente à la taverne.' : ' Pas en vente.'}` },
  tf_self:{ tr:'tfo', l:'Rivalité : grandir quand un allié se transforme', ps:['a', 'h'], w:1.2, mag:e => (e.a + e.h) * 2, txt:(e, k) => `Rivalité : quand un autre de tes serviteurs se transforme, gagne ${sign(e.a * k, e.h * k)}.` },
  pas_tfc:{ tr:'pas', l:'Transformations moins chères', ps:['n'], w:1.5, mag:e => e.n * 4, txt:(e, k) => `Tes transformations coûtent ${e.n * k} ki de moins.` },
  pas_tkc:{ tr:'pas', l:'Techniques moins chères', ps:['n'], w:1.5, mag:e => e.n * 4, txt:(e, k) => `Tes techniques coûtent ${e.n * k} ki de moins.` },
  eot_tfbuff:{ tr:'eot', l:'Renforcer les transformés', ps:['a', 'h'], w:1.2, mag:e => (e.a + e.h) * 3, txt:(e, k) => `Fin de tour : tes autres serviteurs transformés gagnent ${sign(e.a * k, e.h * k)}.` },
  eot_genki:{ tr:'eot', l:'Genkidama', ps:['a', 'h'], w:1.2, mag:e => (e.a + e.h) * 4, txt:(e, k) => `Genkidama : fin de tour, gagne ${sign(e.a * k, e.h * k)} par autre serviteur sur ton plateau.` },
  mentor:{ tr:'eot', l:'Mentor', ps:['a', 'h', 'n'], w:1.4, mag:e => (e.a + e.h) * (e.n || 1), txt:(e, k) => `Mentor : fin de tour, donne ${sign(e.a * k, e.h * k)} ${(e.n || 1) > 1 ? 'aux serviteurs à côté de lui' : 'au serviteur à sa droite'}.` },
  eot_mentor_all:{ tr:'eot', l:'Maître des mentors', ps:[], w:1, mag:() => 10, txt:() => 'Fin de tour : tes autres Mentors entraînent une fois de plus.' },
  soc_ginyu:{ tr:'soc', l:'Commando Ginyu', ps:['a', 'h'], w:1, mag:e => (e.a + e.h) * 2, txt:(e, k) => `Commando Ginyu : début du combat, gagne ${sign(e.a * k, e.h * k)} par membre du commando allié (Guldo, Recoome, Burter, Jeice).` },
  dr_aoe:{ tr:'dr', l:'Autodestruction : dégâts à tous', ps:['d'], w:0.9, mag:e => e.d * 4, txt:(e, k) => `Autodestruction : en mourant, inflige ${e.d * k} dégât${e.d * k > 1 ? 's' : ''} à tous les ennemis.` },
  zenkai:{ tr:'zk', l:'Zenkai', ps:['a', 'h'], w:1.3, mag:e => (e.a + e.h) * 3, txt:(e, k) => `Zenkai : après chaque combat perdu, et s'il est mort au combat, gagne ${sign(e.a * k, e.h * k)}.` },
  zenkai_all:{ tr:'zk', l:'Zenkai des Saiyans', ps:['a', 'h'], w:1, mag:e => (e.a + e.h) * 6, txt:(e, k) => `Zenkai : après chaque combat perdu, tes autres Saiyans gagnent ${sign(e.a * k, e.h * k)}.` },
  tf:{ tr:'tf', l:'Transformation', ps:[], w:1.2, mag:() => 6, txt:(e, k) => 'Transformation : ' + e.st.map(t => `${t.nm} (${t.c} ki) +${t.a * k}/+${t.h * k}${t.kw ? ', ' + ((SET.kw[t.kw] || {}).n || '') : ''}`).join(' → ') + '. ' + ({ colere:'Coûte 2 ki de moins si un allié est mort au dernier combat.', defaite:'Coûte 2 ki de moins après une défaite.', victoire:'Coûte 2 ki de moins après une victoire.' }[e.cond] || '') },
  eot_ki:{ tr:'eot', l:'Gagner du ki', ps:['n'], w:1.5, mag:e => e.n * 2, txt:(e, k) => `Fin de tour : gagne ${e.n * k} ki.` },
  bc_item:{ tr:'bc', l:'Objet en main', ps:['n'], w:1.2, mag:e => e.n * 3, txt:(e, k) => `Cri de guerre : ajoute ${e.n * k > 1 ? e.n * k + ' × ' : ''}${(SPELLS[e.it] || {}).n || 'un objet'} à ta main.` },
  bc_namek:{ tr:'bc', l:'Fusion namek', ps:['n'], w:1.2, mag:e => e.n * 4, txt:(e, k) => `Cri de guerre · Fusion namek : absorbe ${e.n > 1 ? 'tes ' + e.n + ' autres Namekiens les plus faibles' : 'ton autre Namekien le plus faible'} (stats et effets).` },
  bc_absorb:{ tr:'bc', l:'Absorption majin', ps:['n'], w:1.2, mag:e => e.n * 4, txt:(e, k) => `Cri de guerre · Absorption : absorbe ${e.n > 1 ? 'tes ' + e.n + ' autres serviteurs les plus faibles' : 'ton autre serviteur le plus faible'} (stats et effets).` },
  kill_absorb:{ tr:'atk', l:'Absorber les vaincus', ps:['a', 'h'], w:1.2, mag:e => (e.a + e.h) * 2, txt:(e, k) => `Absorption : quand il tue un ennemi en attaquant, gagne ${sign(e.a * k, e.h * k)} pour ce combat.` },
  atk_drain:{ tr:'atk', l:'Absorber l\'énergie', ps:['n'], w:1.2, mag:e => e.n * 3, txt:(e, k) => `Absorption d'énergie : quand il attaque, vole ${e.n * k} attaque à sa cible.` },
  bc_seal:{ tr:'bc', l:'Poser des sceaux', ps:['n'], w:1.2, mag:e => e.n * 2, txt:(e, k) => `Cri de guerre : pose ${e.n * k} sceau${e.n * k > 1 ? 'x' : ''} sur un autre allié aléatoire (+1/+1 chacun ; à 5 sceaux : Bouclier divin).` },
  eot_seal:{ tr:'eot', l:'Sceaux de fin de tour', ps:['n'], w:1.2, mag:e => e.n * 4, txt:(e, k) => `Fin de tour : pose 1 sceau sur ${e.n * k > 1 ? e.n * k + ' alliés aléatoires' : 'un allié aléatoire'} (+1/+1 ; à 5 sceaux : Bouclier divin).` },
  bc_pact:{ tr:'bc', l:'Invocation de pacte', ps:['card', 'n'], w:1, mag:(e, d) => cardValueById(e.card, d) * e.n, txt:e => `Cri de guerre · Pacte : invoque ${e.n > 1 ? e.n + ' × ' : ''}${CD(e.card).n}.` },
  eot_pact_buff:{ tr:'eot', l:'Renforcer les animaux de pacte', ps:['a', 'h'], w:1, mag:e => (e.a + e.h) * 2, txt:(e, k) => `Fin de tour : tes animaux de pacte gagnent ${sign(e.a * k, e.h * k)}.` },
  // ----- univers South Park : cohésion de groupe (voisins de la même famille, bandes), conversions, duos -----
  soc_tribe_n:{ tr:'soc', l:'Nombre : bonus par membre de la famille au combat', ps:['tb', 'a', 'h'], w:1, mag:e => (e.a + e.h) * 2.5, txt:(e, k) => `Début du combat : gagne ${sign(e.a * k, e.h * k)} par autre ${one(e.tb, 1)} allié.` },
  soc_nb:{ tr:'soc', l:'Cohésion : bonus par voisin de sa famille', ps:['a', 'h'], w:1.2, mag:e => (e.a + e.h) * 2, txt:(e, k) => `Début du combat : gagne ${sign(e.a * k, e.h * k)} de plus par voisin de sa famille.` },
  soc_lone:{ tr:'soc', l:'Solitaire : bonus sans voisin de sa famille', ps:['a', 'h'], w:1, mag:e => (e.a + e.h) * 1.5, txt:(e, k) => `Solitaire : début du combat, gagne ${sign(e.a * k, e.h * k)} s'il n'a aucun voisin de sa famille.` },
  duo:{ tr:'soc', l:'Duo : bonus si le partenaire est là', ps:['card', 'a', 'h'], w:1, mag:e => (e.a + e.h) * 1.5, txt:(e, k) => `Duo : début du combat, gagne ${sign(e.a * k, e.h * k)} si ${CD(e.card).n} est sur ton plateau.` },
  bc_convert:{ tr:'bc', l:'Convertir des alliés (cohésion)', ps:['n', 'tb'], w:1, mag:e => e.n * 3, txt:(e, k) => `Cri de guerre : convertit ${e.n * k > 1 ? e.n * k + ' autres alliés aléatoires' : 'un autre allié aléatoire'} : ${e.n * k > 1 ? 'ils comptent' : 'il compte'} comme ${one(e.tb || 's_gin', 1)} pour la cohésion.` },
  eot_nb_buff:{ tr:'eot', l:'Bonus aux voisins de sa famille', ps:['a', 'h'], w:1.2, mag:e => (e.a + e.h) * 2, txt:(e, k) => `Fin de tour : donne ${sign(e.a * k, e.h * k)} à ses voisins de la même famille.` },
  eot_band_inc:{ tr:'eot', l:'Or au prochain tour si une bande est activée', ps:['n'], w:1.2, mag:e => e.n * 3, txt:(e, k) => `Fin de tour : si tu as une bande activée, gagne ${e.n * k} or au début du prochain tour.` },
  // ----- univers Rick et Morty : portails, nombre de Ricks et de Mortys, vol -----
  bc_pf:{ tr:'bc', l:'Gagner du fluide de portail', ps:['n'], w:1.5, mag:e => e.n * 2, txt:(e, k) => `Cri de guerre : gagnez ${e.n * k} fluide de portail.` },
  dr_pf:{ tr:'dr', l:'Fluide de portail en mourant', ps:['n'], w:1.2, mag:e => e.n * 2, txt:(e, k) => `Râle d'agonie : gagnez ${e.n * k} fluide de portail au prochain tour.` },
  portal_self:{ tr:'portal', l:'Se renforcer à chaque portail', ps:['a', 'h'], w:1.3, mag:e => (e.a + e.h) * 2, txt:(e, k) => `Quand un de tes serviteurs passe un portail, gagne ${sign(e.a * k, e.h * k)}.` },
  soc_rm:{ tr:'soc', l:'Nombre : bonus par Rick ou Morty au combat', ps:['a', 'h'], w:1, mag:e => (e.a + e.h) * 2.5, txt:(e, k) => `Début du combat : gagne ${sign(e.a * k, e.h * k)} par autre Rick ou Morty allié.` },
  eot_rm:{ tr:'eot', l:'Nombre : bonus par Rick ou Morty en fin de tour', ps:['a', 'h'], w:1.5, mag:e => (e.a + e.h) * 2.5, txt:(e, k) => `Fin de tour : gagne ${sign(e.a * k, e.h * k)} par autre Rick ou Morty sur ton plateau.` },
  bc_rm:{ tr:'bc', l:'Bonus aux Ricks et Mortys', ps:['a', 'h'], w:0.7, mag:e => (e.a + e.h) * AL(), txt:(e, k) => `Cri de guerre : donne ${sign(e.a * k, e.h * k)} à tes autres Ricks et Mortys.` },
  bc_rm_self:{ tr:'bc', l:'Nombre : bonus par Rick ou Morty au cri de guerre', ps:['a', 'h'], w:0.9, mag:e => (e.a + e.h) * 2.5, txt:(e, k) => `Cri de guerre : gagne ${sign(e.a * k, e.h * k)} par autre Rick ou Morty sur ton plateau.` },
  soc_rm_all:{ tr:'soc', l:'Bonus aux Ricks et Mortys au combat', ps:['a', 'h'], w:1, mag:e => (e.a + e.h) * AL(), txt:(e, k) => `Début du combat : tes autres Ricks et Mortys gagnent ${sign(e.a * k, e.h * k)}.` },
  eot_rm_all:{ tr:'eot', l:'Bonus aux Ricks et Mortys en fin de tour', ps:['a', 'h'], w:1.2, mag:e => (e.a + e.h) * AL(), txt:(e, k) => `Fin de tour : tes autres Ricks et Mortys gagnent ${sign(e.a * k, e.h * k)}.` },
  play_rm:{ tr:'play', l:'Se renforcer quand tu joues un Rick ou un Morty', ps:['a', 'h'], w:1.5, mag:e => e.a + e.h, txt:(e, k) => `Après que tu as joué un Rick ou un Morty, gagne ${sign(e.a * k, e.h * k)}.` },
  play_tribe:{ tr:'play', l:'Renforcer la tribu quand tu joues…', ps:['tb', 'a', 'h'], w:1.2, mag:e => (e.a + e.h) * AL(), txt:(e, k) => `Après que tu as joué un ${one(e.tb, 1)}, tes autres ${one(e.tb)} gagnent ${sign(e.a * k, e.h * k)}.` },
  eot_tribe_n:{ tr:'eot', l:'Bonus par membre de la tribu', ps:['tb', 'a', 'h'], w:1.5, mag:e => (e.a + e.h) * 2.5, txt:(e, k) => `Fin de tour : gagne ${sign(e.a * k, e.h * k)} par autre ${one(e.tb, 1)} sur ton plateau.` },
  soc_rob:{ tr:'soc', l:'Vol : prendre des stats aux ennemis', ps:['a', 'h', 'n'], w:1, mag:e => (e.a + e.h) * 2 * Math.min(e.n, 4), txt:(e, k) => `Début du combat : vole ${sign(e.a * k, e.h * k)} à ${e.n >= 7 ? 'tous les ennemis' : e.n > 1 ? e.n + ' ennemis aléatoires' : 'un ennemi aléatoire'}.` },
  bc_robshop:{ tr:'bc', l:'Vol : prendre les stats de la taverne', ps:['n'], w:1, mag:e => e.n * 5, txt:e => `Cri de guerre : prend l'attaque et la vie ${e.n > 1 ? 'de ' + e.n + ' serviteurs aléatoires' : 'd\'un serviteur aléatoire'} de la taverne (${e.n > 1 ? 'ils tombent' : 'il tombe'} à 1/1).` },
  sell_gold:{ tr:'sell', l:'Rapporter de l\'or à la vente', ps:['n'], w:1.5, mag:e => e.n, txt:(e, k) => `Quand tu le vends, gagne ${e.n * k} or de plus.` },
  // ----- univers Les Simpson : gags récurrents (l'effet grandit de +1 à chaque déclenchement), Provocation donnée -----
  gag_eot_self:{ tr:'eot', gag:1, l:'Gag : se renforcer en fin de tour (grandit)', ps:['a', 'h'], w:1.2, mag:e => (e.a + e.h) * 2 + 2, txt:(e, k) => gagTx(e, `fin de tour, gagne ${sign(e.a * k, e.h * k)}`, gagGrow(e, k)) },
  gag_play_self:{ tr:'play', gag:1, l:'Gag : se renforcer quand tu joues… (grandit)', ps:['tb', 'a', 'h'], w:1.2, mag:e => (e.a + e.h) * 2 + 2, txt:(e, k) => gagTx(e, `après que tu as joué un ${one(e.tb, 1)}, gagne ${sign(e.a * k, e.h * k)}`, gagGrow(e, k)) },
  gag_eot_tribe:{ tr:'eot', gag:1, l:'Gag : tournée en fin de tour (grandit)', ps:['tb', 'a', 'h'], w:1.2, mag:e => (e.a + e.h) * AL() * 1.5 + 2, txt:(e, k) => gagTx(e, `fin de tour, tes autres ${one(e.tb)} gagnent ${sign(e.a * k, e.h * k)}`, gagGrow(e, k)) },
  gag_eot_taunt:{ tr:'eot', gag:1, l:'Gag : bonus aux Provocations en fin de tour (grandit)', ps:['a', 'h'], w:1.2, mag:e => (e.a + e.h) * 3 + 2, txt:(e, k) => gagTx(e, `fin de tour, tes serviteurs avec Provocation gagnent ${sign(e.a * k, e.h * k)}`, gagGrow(e, k)) },
  gag_soc_taunt:{ tr:'soc', gag:1, l:'Gag : bonus aux Provocations au combat (grandit)', ps:['a', 'h'], w:1, mag:e => (e.a + e.h) * 2.5 + 2, txt:(e, k) => gagTx(e, `début du combat, tes serviteurs avec Provocation gagnent ${sign(e.a * k, e.h * k)}`, gagGrow(e, k)) },
  gag_soc_dmg:{ tr:'soc', gag:1, l:'Gag : dégâts au début du combat (grandit)', ps:['d', 'n'], w:1, mag:e => e.d * e.n * 1.5 + 2, txt:(e, k) => gagTx(e, `début du combat, inflige ${e.d * k} dégât${e.d * k > 1 ? 's' : ''} à ${e.n > 1 ? e.n + ' ennemis aléatoires' : 'un ennemi aléatoire'}`, `+${k} dégât${k > 1 ? 's' : ''}`) },
  gag_dr_dmg:{ tr:'dr', gag:1, l:'Gag : dégâts au râle d\'agonie (grandit)', ps:['d', 'n'], w:1, mag:e => e.d * e.n + 2, txt:(e, k) => gagTx(e, `râle d'agonie, inflige ${e.d * k} dégât${e.d * k > 1 ? 's' : ''} à ${e.n > 1 ? e.n + ' ennemis aléatoires' : 'un ennemi aléatoire'}`, `+${k} dégât${k > 1 ? 's' : ''}`) },
  gag_dr_summon:{ tr:'dr', gag:1, l:'Gag : invocations au râle d\'agonie (grandit)', ps:['card', 'n'], w:1, mag:(e, d) => cardValueById(e.card, d) * e.n + 3, txt:(e, k) => gagTx(e, `râle d'agonie, invoque ${e.n > 1 ? e.n + ' × ' : ''}${CD(e.card).n}${k > 1 ? ' (dorés)' : ''}`, 'un de plus') },
  gag_soc_rob:{ tr:'soc', gag:1, l:'Gag : vol de stats au début du combat (grandit)', ps:['a', 'h', 'n'], w:1, mag:e => (e.a + e.h) * 2 * Math.min(e.n, 4) + 2, txt:(e, k) => gagTx(e, `début du combat, vole ${sign(e.a * k, e.h * k)} à ${e.n >= 7 ? 'tous les ennemis' : e.n > 1 ? e.n + ' ennemis aléatoires' : 'un ennemi aléatoire'}`, gagGrow(e, k)) },
  gag_atk_self:{ tr:'atk', gag:1, l:'Gag : se renforcer après avoir attaqué (grandit)', ps:['a', 'h'], w:1.1, mag:e => (e.a + e.h) * 2 + 1, txt:(e, k) => gagTx(e, `après avoir attaqué, gagne ${sign(e.a * k, e.h * k)}`, gagGrow(e, k)) },
  bc_kw:{ tr:'bc', l:'Donner un mot-clé à des alliés (cri de guerre)', ps:['kw', 'n'], w:1, mag:e => kwCost(e.kw) * Math.min(e.n, 4), txt:(e, k) => `Cri de guerre : ${e.n >= 7 ? 'tes autres serviteurs gagnent' : e.n * k > 1 ? e.n * k + ' autres ' + (e.tb ? one(e.tb) : 'alliés') + ' aléatoires gagnent' : 'un autre ' + (e.tb ? one(e.tb, 1) : 'allié') + ' aléatoire gagne'} ${(SET.kw[e.kw] || {}).n || '?'}.` },
  // ----- univers Les Simpson v2 : Donuts et tribus façon Champs de bataille -----
  bc_donut:{ tr:'bc', l:'Recevoir des Donuts', ps:['n'], w:1.2, mag:e => e.n * 2, txt:(e, k) => `Cri de guerre : reçois ${donN(e.n * k)}.` },
  sell_donut:{ tr:'sell', l:'Donuts à la vente', ps:['n'], w:1.2, mag:e => e.n * 2, txt:(e, k) => `Quand tu le vends, reçois ${donN(e.n * k)}.` },
  dr_donut:{ tr:'dr', l:'Donut au râle d\'agonie', ps:['n'], w:1.2, mag:e => e.n * 2, txt:(e, k) => `Râle d'agonie : reçois ${donN(e.n * k)}.` },
  eot_donut_l:{ tr:'eot', l:'Donut au voisin de gauche', ps:[], w:1.3, mag:() => 3, txt:(e, k) => `Fin de tour : pose ${donN(k)} sur son voisin de gauche.` },
  eot_donut_r:{ tr:'eot', l:'Donut au voisin de droite', ps:[], w:1.3, mag:() => 3, txt:(e, k) => `Fin de tour : pose ${donN(k)} sur son voisin de droite.` },
  eot_donut_all:{ tr:'eot', l:'Donut à tous', ps:['tb'], w:1.3, mag:() => 2 * AL() + 4, txt:(e, k) => `Fin de tour : pose ${donN(k)} sur chacun de tes ${one(e.tb)}.` },
  don_other:{ tr:'don', l:'Partager son Donut', ps:['tb', 'a', 'h'], w:1.2, mag:e => (e.a + e.h) * 2, txt:(e, k) => `Quand un Donut est posé sur ${k > 1 ? 'elle' : 'elle'}, un autre ${one(e.tb, 1)} gagne ${sign(e.a * k, e.h * k)}.` },
  donc_tribe:{ tr:'donc', l:'Bonus quand tu joues un Donut', ps:['tb', 'a', 'h'], w:1.2, mag:e => (e.a + e.h) * AL(), txt:(e, k) => `Après que tu as joué un Donut, tes ${one(e.tb)} gagnent ${sign(e.a * k, e.h * k)}.` },
  bc_donut_up:{ tr:'bc', l:'Donuts plus gros', ps:['a', 'h'], w:1.5, mag:e => (e.a + e.h) * 5, txt:(e, k) => `Cri de guerre : tes Donuts donnent ${sign(e.a * k, e.h * k)} de plus pour le reste de la partie.` },
  spend_donut:{ tr:'spend', l:'Donuts après avoir dépensé de l\'or', ps:['n', 'tb'], w:1.3, mag:() => 2 * AL() + 2, txt:(e, k) => `Chaque fois que tu as dépensé ${e.n} or dans le tour : pose ${donN(k)} sur chacun de tes ${one(e.tb)}.` },
  spend_buff:{ tr:'spend', l:'Bonus après avoir dépensé de l\'or', ps:['n', 'tb', 'a', 'h'], w:1.3, mag:e => (e.a + e.h) * AL() + 1, txt:(e, k) => `Chaque fois que tu as dépensé ${e.n} or dans le tour : tes ${one(e.tb)} gagnent ${sign(e.a * k, e.h * k)}.` },
  hplay_self:{ tr:'hplay', l:'Grandir dans la main', ps:['tb', 'a', 'h'], w:1.2, mag:e => (e.a + e.h) * 2, txt:(e, k) => `Dans ta main : gagne ${sign(e.a * k, e.h * k)} quand tu joues un ${one(e.tb, 1)}.` },
  // mots-clés de Champs de bataille : Gemme de sang, Engloutir, Sorcellerie, Choix des armes
  // --- mots-clés et pouvoirs Naruto ---
  soc_face:{ tr:'soc', l:'Dégâts à l\'ennemi d\'en face', ps:[], w:1, mag:e => e.d, txt:(e, k) => `Début du combat : inflige ${e.d * k} dégâts à l'ennemi d'en face.` },
  soc_weaktop:{ tr:'soc', l:'Affaiblir l\'ennemi le plus fort', ps:['a'], w:1, mag:e => e.a, txt:(e, k) => `Début du combat : l'ennemi le plus fort perd ${e.a * k} ATQ.` },
  soc_plus1:{ tr:'soc', l:'Première attaque plus forte', ps:['d'], w:1, mag:e => e.d, txt:(e, k) => `Sa première attaque de chaque combat inflige ${e.d * k} dégâts de plus.` },
  crow1:{ tr:'pas', l:'Clone de corbeaux', ps:[], w:1, mag:() => 4, txt:() => `La première fois qu'il devrait mourir à chaque combat, il reste à 1 PV.` },
  jut_any:{ tr:'jut', l:'Grandir quand tu lances un jutsu', ps:['a', 'h'], w:1.2, mag:e => (e.a + e.h) * 2.5, txt:(e, k) => `Chaque fois qu'un autre de tes ninjas lance un jutsu, gagne ${sign(e.a * k, e.h * k)}.` },
  bc_buff_it:{ tr:'bc', l:'Bonus aux porteurs d\'objet', ps:['a', 'h'], w:1, mag:e => (e.a + e.h) * 2, txt:(e, k) => `Tes serviteurs qui portent un objet gagnent ${sign(e.a * k, e.h * k)}.` },
  soc_weak:{ tr:'soc', l:'Affaiblir l\'ennemi d\'en face', ps:[], w:1, mag:e => e.a, txt:(e, k) => `Début du combat : l'ennemi d'en face perd ${e.a * k} ATQ.` },
  soc_steal:{ tr:'soc', l:'Voler des caractéristiques', ps:[], w:1, mag:e => e.a + e.h, txt:(e, k) => `Début du combat : vole ${sign(e.a * k, e.h * k)} à l'ennemi d'en face.` },
  soc_genj:{ tr:'soc', l:'Genjutsu', ps:[], w:1, mag:e => 4 * e.n, txt:e => `Genjutsu : au début du combat, l'ennemi ${e.who === 'top' ? 'le plus fort' : 'd\'en face'} saute ${e.n > 1 ? 'ses ' + e.n + ' premières attaques' : 'sa première attaque'}.` },
  soc_bind:{ tr:'soc', l:'Entrave', ps:[], w:1, mag:() => 6, txt:e => `Entrave : au début du combat, l'ennemi ${e.who === 'top' ? 'le plus fort' : 'd\'en face'} ne peut plus attaquer tant que ce serviteur est en vie.` },
  soc_seal:{ tr:'soc', l:'Scellement', ps:[], w:1, mag:() => 5, txt:() => `Scellement : au début du combat, l'ennemi d'en face perd ses mots-clés et ses effets.` },
  soc_copykw:{ tr:'soc', l:'Sharingan', ps:[], w:1, mag:() => 4, txt:() => `Sharingan : au début du combat, copie les mots-clés de l'ennemi d'en face.` },
  soc_kwself:{ tr:'soc', l:'Mot-clé à chaque combat', ps:[], w:1, mag:() => 3, txt:e => `Début du combat : gagne ${(SET.kw[e.kw] || {}).n || ''}.` },
  soc_first:{ tr:'soc', l:'Première attaque renforcée', ps:[], w:1, mag:e => 3 * e.x, txt:e => `Début du combat : sa première attaque inflige le ${e.x > 2 ? 'triple' : 'double'}.` },
  soc_i1:{ tr:'soc', l:'Première attaque sans riposte', ps:[], w:1, mag:() => 2, txt:() => `Sa première attaque de chaque combat est Insensible.` },
  soc_link:{ tr:'soc', l:'Rituel', ps:[], w:1, mag:() => 5, txt:() => `Début du combat : les dégâts que subit ce serviteur sont aussi infligés à l'ennemi d'en face.` },
  soc_crush:{ tr:'soc', l:'Sarcophage', ps:[], w:1, mag:() => 8, txt:() => `Début du combat : détruit l'ennemi d'en face s'il a moins de PV que ce serviteur.` },
  soc_kill_low:{ tr:'soc', l:'Bannir le plus faible', ps:[], w:1, mag:() => 6, txt:() => `Début du combat : détruit l'ennemi qui a le moins de PV.` },
  soc_summon:{ tr:'soc', l:'Invocation pour le combat', ps:[], w:1, mag:() => 6, txt:(e, k) => `Début du combat : invoque ${e.n > 1 ? e.n + ' ' : ''}${CD(e.card).n}${e.g ? ' doré' : ''} pour ce combat.` },
  soc_fill:{ tr:'soc', l:'Remplir le plateau', ps:[], w:1, mag:() => 8, txt:e => `Début du combat : remplit ton plateau de ${CD(e.card).n}s ${CD(e.card).a}/${CD(e.card).h} pour ce combat.` },
  soc_edo:{ tr:'soc', l:'Edo Tensei', ps:[], w:1, mag:() => 8, txt:() => `Edo Tensei : au début du combat, ressuscite ton serviteur le plus fort mort au combat précédent.` },
  soc_copyfx:{ tr:'soc', l:'Maître des sept épées', ps:[], w:1, mag:() => 6, txt:() => `Maître des sept épées : possède les effets de combat de tes autres ninjas de Kiri.` },
  soc_strike:{ tr:'soc', l:'Attaque avant le combat', ps:[], w:1, mag:() => 6, txt:() => `Attaque une fois avant le début du combat.` },
  pierce:{ tr:'pas', l:'Byakugan (attaques)', ps:[], w:1, mag:() => 3, txt:() => `Byakugan : ses attaques ignorent le Camouflage et brisent le Bouclier divin.` },
  see_camo:{ tr:'pas', l:'Byakugan (vision)', ps:[], w:1, mag:() => 2, txt:() => `Byakugan : tes serviteurs ignorent le Camouflage ennemi.` },
  tgt_weak:{ tr:'pas', l:'Vise le plus faible', ps:[], w:1, mag:() => 3, txt:() => `Assassinat silencieux : vise toujours l'ennemi qui a le moins de PV.` },
  tgt_top:{ tr:'pas', l:'Vise le plus fort', ps:[], w:1, mag:() => 2, txt:() => `Vise toujours l'ennemi le plus fort.` },
  chain:{ tr:'pas', l:'Foudre en chaîne', ps:[], w:1, mag:() => 4, txt:() => `Ses attaques touchent aussi un autre ennemi au hasard.` },
  armor:{ tr:'pas', l:'Corps liquide', ps:[], w:1, mag:e => 2 * e.d, txt:(e, k) => `Corps liquide : chaque coup reçu lui inflige ${e.d * k} dégâts de moins (1 au minimum).` },
  riposte:{ tr:'pas', l:'Riposte', ps:[], w:1, mag:e => 2 * e.d, txt:(e, k) => `Riposte : inflige ${e.d * k} dégâts à celui qui l'attaque.` },
  burn:{ tr:'pas', l:'Brûlure', ps:[], w:1, mag:e => 2 * e.d, txt:(e, k) => `Brûlure : l'ennemi qu'il frappe perd ${e.d * k} PV après chacune de ses attaques.` },
  hit_seal:{ tr:'pas', l:'Scellement à la frappe', ps:[], w:1, mag:() => 6, txt:() => `Scellement : l'ennemi qu'il frappe perd ses mots-clés et ses effets.` },
  hit_genj:{ tr:'pas', l:'Genjutsu à la frappe', ps:[], w:1, mag:() => 5, txt:() => `L'ennemi qu'il frappe saute sa prochaine attaque.` },
  hit_steal:{ tr:'pas', l:'Vol à la frappe', ps:[], w:1, mag:e => 3 * (e.a + e.h), txt:(e, k) => `Chaque coup vole ${sign(e.a * k, e.h * k)} à sa cible.` },
  guard:{ tr:'pas', l:'Garde du corps', ps:[], w:1, mag:() => 3, txt:e => `Garde du corps : encaisse ${e.n > 1 ? 'les attaques qui visent' : 'la première attaque qui vise'} ${CD(e.card).n}.` },
  immortal:{ tr:'pas', l:'Immortel', ps:[], w:1, mag:() => 6, txt:e => `Immortel : revient à la vie avec 1 PV à chaque mort tant que ${CD(e.card).n} est en vie (${e.n} fois par combat).` },
  lives:{ tr:'pas', l:'Cinq cœurs', ps:[], w:1, mag:() => 8, txt:e => `Cinq cœurs : revient à la vie jusqu'à ${e.n} fois par combat, plus faible à chaque fois.` },
  x3bound:{ tr:'pas', l:'Triple aux entravés', ps:[], w:1, mag:() => 3, txt:() => `Inflige le triple de dégâts aux ennemis entravés.` },
  heal2:{ tr:'pas', l:'Soin doublé', ps:[], w:1, mag:() => 3, txt:() => `Son Soin est doublé et peut dépasser les PV de départ.` },
  camo_keep:{ tr:'pas', l:'Camouflage durable', ps:[], w:1, mag:() => 3, txt:() => `Son Camouflage ne disparaît pas quand il attaque.` },
  rip_burn:{ tr:'pas', l:'Barrière de flammes', ps:[], w:1, mag:e => e.d, txt:(e, k) => `Les ennemis qui l'attaquent subissent une Brûlure de ${e.d * k}.` },
  wide:{ tr:'pas', l:'Jutsu de zone', ps:[], w:1, mag:() => 3, txt:() => `Son jutsu de combat touche tous les ennemis.` },
  ring_r:{ tr:'pas', l:'Réaction à l’Anneau', ps:[], w:0, mag:() => 0, txt:e => '💍 Si tu tiens l’Anneau quand tu le poses · ' + (e.tx || '') },
  dr2:{ tr:'pas', l:'Râles doublés', ps:[], w:1, mag:() => 4, txt:() => `Ses Râles d'agonie se déclenchent deux fois.` },
  pup_r:{ tr:'pas', l:'Marionnettes éternelles', ps:[], w:1, mag:() => 3, txt:() => `Les marionnettes qu'il invoque ont Réincarnation.` },
  imm:{ tr:'pas', l:'Insensible aux illusions', ps:[], w:1, mag:() => 2, txt:() => `Insensible au Genjutsu, à l'Entrave et au Scellement.` },
  fr3:{ tr:'pas', l:'Fratrie', ps:[], w:1, mag:() => 4, txt:() => `Quand un membre de la fratrie est attaqué, les autres ripostent.` },
  follow:{ tr:'pas', l:'Attaque enchaînée', ps:[], w:1, mag:() => 5, txt:e => `Attaque aussitôt après ${CD(e.card).n}.` },
  aft_heal:{ tr:'aft', l:'Soin', ps:[], w:1, mag:e => e.n, txt:(e, k) => `Soin : après son attaque, rend ${e.n * k} PV à ton serviteur le plus blessé.` },
  aft_full:{ tr:'aft', l:'Régénération', ps:[], w:1, mag:() => 6, txt:() => `Régénération : après son attaque, récupère tous ses PV.` },
  aft_selfdmg:{ tr:'aft', l:'Contrecoup', ps:[], w:1, mag:e => -e.d, txt:(e, k) => `Perd ${e.d * k} PV après chacune de ses attaques.` },
  aft_aoe:{ tr:'aft', l:'Brume acide', ps:[], w:1, mag:e => 3 * e.d, txt:(e, k) => `Après son attaque, inflige ${e.d * k} dégâts à tous les ennemis.` },
  die_swap:{ tr:'die', l:'Kishō Tensei', ps:[], w:1, mag:() => 7, txt:() => `Kishō Tensei : la première fois qu'un de tes autres serviteurs meurt en combat, ce serviteur meurt à sa place et l'autre revient à pleine vie.` },
  die_revive:{ tr:'die', l:'Voie de Naraka', ps:[], w:1, mag:() => 7, txt:() => `Ressuscite le premier de tes autres serviteurs qui meurt à chaque combat.` },
  die_rage:{ tr:'die', l:'Rage', ps:[], w:1, mag:() => 5, txt:e => `À la mort de ${CD(e.card).n} : attaque doublée et Furie des vents.` },
  die_inherit:{ tr:'die', l:'Héritage', ps:[], w:1, mag:() => 5, txt:e => `À la mort de ${CD(e.card).n} : gagne ses caractéristiques et ses mots-clés.` },
  die_tf:{ tr:'die', l:'Transformation de rage', ps:[], w:1, mag:() => 5, txt:e => `À la mort de ${CD(e.card).n} : se transforme pour le reste du combat.` },
  die_aoe:{ tr:'die', l:'Vengeance', ps:[], w:1, mag:e => 3 * e.d, txt:(e, k) => `À la mort de ${CD(e.card).n} : ${e.d * k} dégâts à tous les ennemis.` },
  dr_twin:{ tr:'dr', l:'Deux corps', ps:[], w:1, mag:() => 6, txt:e => `Râle d'agonie : ${CD(e.card).n} sort de son corps, avec les mêmes caractéristiques.` },
  kill_perm:{ tr:'kill', l:'Voleur de cœurs', ps:[], w:1, mag:e => 3 * (e.a + e.h), txt:(e, k) => `La première fois qu'il tue un ennemi en attaquant à chaque combat, gagne ${sign(e.a * k, e.h * k)} définitivement.` },
  atk_team:{ tr:'atk', l:'Travail d\'équipe', ps:[], w:1, mag:e => e.a + e.h, txt:(e, k) => `Quand il attaque, un coéquipier gagne ${sign(e.a * k, e.h * k)}.` },
  surv_once:{ tr:'surv', l:'Marque maudite', ps:[], w:1, mag:e => e.a + e.h, txt:(e, k) => `Marque maudite : la première fois qu'il est blessé, gagne ${sign(e.a * k, e.h * k)}.` },
  bc_clone:{ tr:'bc', l:'Clone', ps:[], w:1, mag:e => 3 * e.n, txt:e => e.full ? `Cri de guerre : Clone parfait. Invoque ${e.n > 1 ? e.n + ' copies' : 'une copie'} de lui-même avec ses caractéristiques et ses mots-clés.` : `Cri de guerre : Clone. Invoque ${e.n > 1 ? e.n + ' copies' : 'une copie'} 1/1 de lui-même avec ses mots-clés.` },
  bc_summon_of:{ tr:'bc', l:'Marionnette au hasard', ps:[], w:1, mag:e => 4 * e.n, txt:e => `Cri de guerre : invoque ${e.n > 1 ? e.n + ' marionnettes' : 'une marionnette'} au hasard : Karasu (Venimosité), Kuroari (Entrave) ou Sanshōuo (Provocation).` },
  osell_gold:{ tr:'osell', l:'Or à chaque vente', ps:[], w:1, mag:e => 6 * e.n, txt:(e, k) => `Poussière d'or : quand tu vends un autre serviteur, gagne ${e.n * k} or.` },
  jutsu:{ tr:'jutsu', l:'Jutsu (et transformation)', ps:['nm'], w:1.2, mag:() => 5, txt:(e, k) => jutTxt(e, k) },
  jut_self:{ tr:'jut', l:'Élève : grandir quand un allié lance un jutsu', ps:['a', 'h', 'tb'], w:1.2, mag:e => (e.a + e.h) * 2.5, txt:(e, k) => `Élève : gagne ${sign(e.a * k, e.h * k)} quand un autre ${one(e.tb, 1)} lance un jutsu.` },
  bc_kwself:{ tr:'bc', l:'Gagner un mot-clé', ps:['kw'], w:1, mag:e => kwCost(e.kw), txt:e => `Cri de guerre : gagne ${(SET.kw[e.kw] || {}).n || ''}.` },
  eot_few:{ tr:'eot', l:'Solitaire : grandir avec peu de serviteurs', ps:['n', 'a', 'h'], w:1.1, mag:e => (e.a + e.h) * 3, txt:(e, k) => `Fin de tour : si tu as ${e.n} serviteurs ou moins, gagne ${sign(e.a * k, e.h * k)}.` },
  sell_buff:{ tr:'sell', l:'Bonus à la famille à la vente', ps:['a', 'h', 'tb'], w:1, mag:e => (e.a + e.h) * 2, txt:(e, k) => `Quand tu le vends, tes ${one(e.tb)} gagnent ${sign(e.a * k, e.h * k)}.` },
  sell_ck:{ tr:'sell', l:'Chakra à la vente', ps:['n'], w:1, mag:e => e.n, txt:(e, k) => `Quand tu le vends, gagne ${e.n * k} chakra.` },
  osell_self:{ tr:'osell', l:'Grandir à chaque vente', ps:['a', 'h'], w:1.2, mag:e => (e.a + e.h) * 3, txt:(e, k) => `Quand tu vends un autre serviteur, gagne ${sign(e.a * k, e.h * k)}.` },
  osell_tribe:{ tr:'osell', l:'Bonus à la famille à chaque vente', ps:['a', 'h', 'tb'], w:1.4, mag:e => (e.a + e.h) * 6, txt:(e, k) => `Quand tu vends un autre serviteur, tes autres ${one(e.tb)} gagnent ${sign(e.a * k, e.h * k)}.` },
  osell_ck:{ tr:'osell', l:'Chakra à chaque vente', ps:['n'], w:1.2, mag:e => e.n * 4, txt:(e, k) => `Quand tu vends un autre serviteur, gagne ${e.n * k} chakra.` },
  dev_self:{ tr:'dev', l:'Grandir quand un allié engloutit', ps:['a', 'h'], w:1.2, mag:e => (e.a + e.h) * 3, txt:(e, k) => `Quand un de tes serviteurs engloutit, gagne ${sign(e.a * k, e.h * k)}.` },
  bc_self:{ tr:'bc', l:'Bonus à soi-même (cri de guerre)', ps:['a', 'h'], w:1, mag:e => e.a + e.h, txt:(e, k) => `Cri de guerre : gagne ${sign(e.a * k, e.h * k)}.` },
  bc_gem:{ tr:'bc', l:'Gemmes de sang', ps:['n'], w:1.2, mag:e => e.n * 2.5, txt:(e, k) => `Cri de guerre : obtiens ${e.n * k} Gemme${e.n * k > 1 ? 's' : ''} de sang.` },
  eot_gem:{ tr:'eot', l:'Gemme de sang à chaque tour', ps:['n'], w:1.4, mag:e => e.n * 5, txt:(e, k) => `Fin de tour : obtiens ${e.n * k} Gemme${e.n * k > 1 ? 's' : ''} de sang.` },
  bc_gem_up:{ tr:'bc', l:'Améliorer les Gemmes de sang', ps:['a', 'h'], w:1.6, mag:e => (e.a + e.h) * 4, txt:(e, k) => `Cri de guerre : tes Gemmes de sang donnent ${sign(e.a * k, e.h * k)} de plus.` },
  bc_devour:{ tr:'bc', l:'Engloutir', ps:[], w:1.5, mag:() => 6, txt:(e, k) => `Cri de guerre : Engloutir un serviteur de la taverne${k > 1 ? ' (caractéristiques doublées)' : ''}.` },
  eot_devour:{ tr:'eot', l:'Engloutir à chaque tour', ps:[], w:1.8, mag:() => 10, txt:(e, k) => `Fin de tour : Engloutir un serviteur de la taverne${k > 1 ? ' (caractéristiques doublées)' : ''}.` },
  craft:{ tr:'bc', l:'Sorcellerie', ps:['sp'], w:1.4, mag:() => 5, txt:e => `Sorcellerie : ${typeof SPELLS !== 'undefined' && SPELLS[e.sp] ? SPELLS[e.sp].n : 'un sort'} (sort temporaire, à chaque tour).` },
  choose:{ tr:'bc', l:'Choix des armes', ps:['o'], w:1.3, mag:e => Math.max(...(e.o || []).map(o => ET[o.k] && ET[o.k].mag ? ET[o.k].mag(o) : 3)), txt:(e, k) => `Choix des armes : ${(e.o || []).map(o => ET[o.k] ? ET[o.k].txt(o, k).replace(/^Cri de guerre : /, '').replace(/\.$/, '') : '?').join(' ; ou ')}.` },
  bc_disc:{ tr:'bc', l:'Découvrir un serviteur', ps:['tb'], w:1.5, mag:() => 4, txt:e => `Cri de guerre : découvre un ${one(e.tb, 1)}.` },
  dr_hand:{ tr:'dr', l:'Renforcer la main au râle d\'agonie', ps:['a', 'h'], w:1, mag:e => e.a + e.h, txt:(e, k) => `Râle d'agonie : un serviteur de ta main gagne ${sign(e.a * k, e.h * k)}.` },
  bc_inc:{ tr:'bc', l:'Or au prochain tour (cri de guerre)', ps:['n'], w:1.4, mag:e => e.n * 2, txt:(e, k) => `Cri de guerre : gagne ${e.n * k} or au début du prochain tour.` },
  bc_bought:{ tr:'bc', l:'Bonus par achat du tour', ps:['tb', 'a', 'h'], w:1.2, mag:e => (e.a + e.h) * 2, txt:(e, k) => `Cri de guerre : une autre ${one(e.tb, 1)} gagne ${sign(e.a * k, e.h * k)} par ${one(e.tb, 1)} achetée ce tour.` },
  hand_buff:{ tr:'hand', l:'Bonus quand une carte arrive en main', ps:['tb', 'a', 'h'], w:1.3, mag:e => (e.a + e.h) * 3, txt:(e, k) => `Quand une carte arrive dans ta main, une autre ${one(e.tb, 1)} gagne ${sign(e.a * k, e.h * k)}.` },
  buy_gold:{ tr:'buy', l:'Or à l\'achat', ps:['tb', 'n'], w:1.5, mag:e => e.n * 6, txt:(e, k) => `Après avoir acheté une ${one(e.tb, 1)}, gagne ${e.n * k} or.` },
  aatk_perm:{ tr:'aatk', l:'Bonus définitif à chaque attaque', ps:['tb', 'a', 'h'], w:1.5, mag:e => (e.a + e.h) * 6, txt:(e, k) => `Quand ${/^nk_/.test(e.tb) ? 'un' : 'une'} de tes ${one(e.tb)} attaque, tes ${one(e.tb)} gagnent ${sign(e.a * k, e.h * k)} définitivement.` },
  magnet:{ tr:'pas', l:'Magnétisme', ps:[], w:1, mag:() => 2, txt:() => `Magnétisme : joué juste à gauche d'une Autorité, il fusionne avec elle (stats, mots-clés et effets).` },
  aft_shield:{ tr:'aft', l:'Susano’o', ps:[], w:1, mag:() => 6, txt:() => `Susano’o : regagne Bouclier divin après chacune de ses attaques.` },
  soc_copyall:{ tr:'soc', l:'Double Sharingan', ps:[], w:1, mag:() => 5, txt:() => `Double Sharingan : au début du combat, copie aussi les effets de combat de l'ennemi d'en face.` },
  aft_burnout:{ tr:'aft', l:'Huitième Porte', ps:[], w:1, mag:() => -4, txt:e => `Gaï de la nuit : il s'effondre après sa ${e.n}e attaque du combat.` },
  soc_aoe_if:{ tr:'soc', l:'Huile enflammée', ps:[], w:1, mag:e => 2 * e.d, txt:(e, k) => `Huile enflammée : si ${CD(e.card).n} est à tes côtés, inflige ${e.d * k} dégâts à tous les ennemis au début du combat.` },
  surv_regen:{ tr:'surv', l:'Byakugō', ps:['n'], w:1, mag:e => 2 * e.n, txt:(e, k) => `Byakugō : quand il est blessé et survit, récupère ${e.n * k} PV.` },
  surv_heal:{ tr:'surv', l:'Soin de Katsuyu', ps:[], w:1, mag:e => 2 * e.n, txt:(e, k) => `Quand elle est blessée et survit, rend ${e.n * k} PV à tes autres serviteurs.` },
  surv_split:{ tr:'surv', l:'Cerbère', ps:[], w:1, mag:() => 8, txt:e => `Cerbère : chaque fois qu'il est blessé et survit, une nouvelle tête naît (une copie, ${e.n} par combat au plus).` },
  dr_summon2:{ tr:'dr', l:'Division', ps:[], w:1, mag:() => 5, txt:e => `Râle d'agonie : se divise en ${e.n} ${CD(e.card).n}.` },
  dr_kill_tok:{ tr:'dr', l:'Flûte brisée', ps:[], w:1, mag:() => -2, txt:() => `Si elle meurt en combat, ses Doki disparaissent.` },
  sickle:{ tr:'pas', l:'Faucille', ps:[], w:1, mag:() => 4, txt:() => `Faucille : ses attaques ignorent la Provocation et tranchent le Bouclier divin.` },
  bc_manda:{ tr:'bc', l:'Sacrifice à Manda', ps:[], w:1, mag:() => 2, txt:() => `Invoque Manda, qui exige un sacrifice : il dévore ton serviteur le plus faible et gagne ses caractéristiques.` },
  bc_fill_tok:{ tr:'bc', l:'Invoquer jusqu’à N', ps:[], w:1, mag:e => 3 * e.cards.length, txt:e => `Cri de guerre : invoque ceux de ses ${e.cards.length} Doki qui manquent sur ton plateau.` },
  cleave:{ tr:'pas', l:'Attaque les voisins', ps:[], w:1, mag:() => 6, txt:() => `Attaque aussi les voisins de sa cible.` },
  shield_self:{ tr:'shield', l:'Grandir quand un Bouclier divin tombe', ps:['a', 'h'], w:1.2, mag:e => (e.a + e.h) * 2, txt:(e, k) => `Quand un allié perd son Bouclier divin, gagne ${sign(e.a * k, e.h * k)} pour ce combat.` },
  shield_gain:{ tr:'shield', l:'Reprendre un Bouclier divin', ps:[], w:1, mag:() => 5, txt:() => `Quand un autre allié perd son Bouclier divin, gagne Bouclier divin.` },
  shield_perm:{ tr:'shield', l:'Bonus définitif quand un Bouclier divin tombe', ps:['a', 'h'], w:1.3, mag:e => (e.a + e.h) * 2, txt:(e, k) => `Quand un allié perd son Bouclier divin, il gagne ${sign(e.a * k, e.h * k)} définitivement.` },
  die_avenge_dmg:{ tr:'die', l:'Vengeance : dégâts', ps:['n', 'd'], w:1, mag:e => e.d * 1.5, txt:(e, k) => `Vengeance (${e.n}) : inflige ${e.d * k} dégâts à l'ennemi qui a le plus de PV.` },
  die_avenge_self:{ tr:'die', l:'Vengeance : grandir', ps:['n', 'a', 'h'], w:1.2, mag:e => (e.a + e.h) * 3, txt:(e, k) => `Vengeance (${e.n}) : gagne ${sign(e.a * k, e.h * k)} définitivement.` },
  bc_tribe_atk:{ tr:'bc', l:'Attaque de la famille pour la partie', ps:['tb', 'a'], w:1.3, mag:e => e.a * 6, txt:(e, k) => `Cri de guerre : tes ${one(e.tb)} ont +${e.a * k} ATQ pour le reste de la partie.` },
  pas_kk:{ tr:'pas', l:'Kang et Kodos', ps:[], w:1, mag:() => 3, txt:(e, k) => `Gagne ${sign(k, k)} pour chaque Kang ou Kodos allié mort cette partie.` },
  soc_reborn:{ tr:'soc', l:'Donner Réincarnation', ps:['tb'], w:1, mag:() => 4, txt:(e, k) => `Début du combat : donne Réincarnation à ${k > 1 ? 'deux autres' : 'un autre'} ${one(e.tb, k === 1)}.` },
  reborn_perm:{ tr:'reborn', l:'Bonus définitif après une Réincarnation', ps:['tb', 'a', 'h'], w:1.4, mag:e => (e.a + e.h) * 4, txt:(e, k) => `Après une Réincarnation alliée, tes ${one(e.tb)} gagnent ${sign(e.a * k, e.h * k)} définitivement.` },
  dr_tribe_atk:{ tr:'dr', l:'Attaque de la famille pour la partie (râle)', ps:['tb', 'a'], w:1.3, mag:e => e.a * 6, txt:(e, k) => `Râle d'agonie : tes ${one(e.tb)} ont +${e.a * k} ATQ pour le reste de la partie.` },
};
// gags récurrents : texte « Gag « D'oh ! » : effet, et +1 de plus à chaque déclenchement »
const donN = n => n > 1 ? n + ' Donuts' : 'un Donut';
const gagGrow = (e, k) => sign(e.a ? k : 0, e.h ? k : 0);
const gagTx = (e, body, grow) => `Gag${e.cp ? ' « ' + e.cp + ' »' : ''} : ${body}, et ${grow} de plus à chaque déclenchement.`;
const isGag = e => !!(e && ET[e.k] && ET[e.k].gag);
const hasGag = m => !!m && !m.sp && ((CD(m.c).fxAll || []).some(isGag) || (m.x || []).some(isGag));
// valeur courante d'un paramètre de gag : base + nombre de déclenchements (0 si la base est nulle), × 2 pour un doré
const gagV = (m, v, k) => v ? (v + (m.gag || 0)) * k : 0;
// un gag vient de se déclencher : le compteur grandit (en combat, on note le serviteur pour reporter la hausse sur le vrai plateau)
function gagBump(p, m, S, s) { m.gag = (m.gag || 0) + 1; if (S) { S.gag = S.gag || [{}, {}]; const u = m.ou || m.u; S.gag[s][u] = (S.gag[s][u] || 0) + 1; } else if (p) qAdd(p, 'gags'); }
const fxW = k => { const o = SET.fxw[k] || {}; return { b:o.b != null ? +o.b : 0, w:o.w != null ? +o.w : ET[k].w }; };
function newEffect(k) { const e = { k }; ET[k].ps.forEach(p => { const P = PARAMS[p]; e[p] = P.sel === 'tribe' ? '' : P.sel === 'card' ? (Object.keys(CARDS).find(id => CARDS[id].t === 0) || Object.keys(CARDS)[0] || '') : P.sel === 'kw' ? 's' : P.def; }); return e; }
// effets du « mode chakra » (activés en payant du chakra, une fois par tour)
const mTx = (m, k = 1) => !m ? '' : m.k === 'm_fire' ? `prochain combat, ${m.d * k} dégâts à l'ennemi.` : m.k === 'm_summon' ? `invoque ${CD(m.card).n}.` : m.k === 'm_shield' ? 'un allié aléatoire gagne Bouclier divin au prochain combat.' : m.k === 'm_buffall' ? `tes ${one(m.tb)} gagnent ${sign(m.a * k, m.h * k)}.` : m.k === 'm_self' ? `gagne ${sign(m.a * k, m.h * k)}.` : m.k === 'm_wall' ? `un allié aléatoire gagne +0/+${m.h * k}.` : '';
function runMode(G, p, m, md) {
  const k = mult(m), others = p.bd.filter(x => x !== m);
  switch (md.k) {
    case 'm_fire': p.njf = (p.njf || 0) + md.d * k; break;
    case 'm_summon': for (let i = 0; i < k; i++) recruitSummon(p, md.card, 0, m); break;
    case 'm_shield': { const o = p.bd.filter(x => !has(x, 's') && !(x.tmp && (x.tmp.f || '').includes('s'))); if (o.length) { const t = pickR(o); t.tmp = { a:(t.tmp && t.tmp.a) || 0, h:(t.tmp && t.tmp.h) || 0, f:((t.tmp && t.tmp.f) || '') + 's', s:'Mode chakra' }; } break; }
    case 'm_buffall': p.bd.filter(x => tribeOk(x, md.tb)).forEach(x => buff(x, md.a * k, md.h * k)); break;
    case 'm_self': buff(m, md.a * k, md.h * k); break;
    case 'm_wall': { const o = p.bd.length ? pickR(p.bd) : null; if (o) buff(o, 0, md.h * k); break; }
  }
}
const fxText = (e, k = 1) => ET[e.k] ? ET[e.k].txt(e, k) : '';
function fxCost(e, depth = 0) { const T = ET[e.k]; if (!T) return 0; const W = fxW(e.k); return W.b + W.w * T.mag(e, depth); }
const r1 = x => Math.round(x * 10) / 10;
function cardValue(raw, depth = 0) {
  const br = [];
  const add = (l, v, kind) => { if (v) br.push({ l, v:r1(v), kind }); };
  add(`Attaque ${raw.a}`, raw.a * SET.val.atk, 'stat'); add(`Vie ${raw.h}`, raw.h * SET.val.hp, 'stat');
  (raw.kw || []).forEach(k => { const K = SET.kw[k]; if (K) add(K.n, +K.c || 0, 'kw'); });
  (raw.fx || []).forEach(e => { if (ET[e.k]) add(fxText(e), fxCost(e, depth), 'fx'); });
  return { total:r1(br.reduce((t, x) => t + x.v, 0)), br };
}
function budgetState(raw) {
  if (!raw.t) return { st:'tok' };
  const b = SET.budget[raw.t] || [0, 99], v = cardValue(raw).total;
  return { st:v > b[1] ? 'over' : v < b[0] ? 'under' : 'ok', v, b };
}
function cardTextH(id, g, full, tf) {
  const c = CD(id), k = g ? 2 : 1, parts = [], short = !full && /^nk_/.test(id); TX_SHORT = short; TX_TF = tf || 0;   // tf : transformations déjà faites (on ne montre que la forme actuelle et la suite)
  const kws = (c.kw || []).map(x => `<b>${esc(SET.kw[x].n)}</b>`);
  if (kws.length) parts.push(kws.join(', ') + '.');
  if (!short && typeof NK_GOF !== 'undefined' && NK_GOF[id]) parts.push('<b>Groupe</b> : ' + [...new Set(NK_GOF[id].map(g => esc(g.n)))].join(', ') + '.');
  (c.fx || []).forEach(e => { if (ET[e.k]) { const t = esc(fxText(e, k)); const i = t.indexOf(' : '); parts.push(i > 0 && i < 24 ? `<b>${t.slice(0, i)}</b>${t.slice(i)}` : t); } });
  TX_SHORT = false; TX_TF = 0;
  return parts.join(' ');
}

/* =====================================================================
   EFFETS EN RECRUTEMENT (côté hôte, Math.random)
   ===================================================================== */
function recruitSummon(p, id, g, after) {
  if (p.bd.length >= 7 || !C[id]) return;
  const i = p.bd.indexOf(after), nm = mk(id, g);
  p.bd.splice(i < 0 ? p.bd.length : i + 1, 0, nm);
  if (C[id].t === 0) qAdd(p, 'tokSum', 1, id);
  const w = htr(p, 'ptok'); if (w && C[id].t === 0 && (!w.card || w.card === id)) withSrc('Pouvoir de ' + HEROES[p.hero].n.split(' ')[0], () => buff(nm, w.a || 0, w.h || 0));
}
function runRecruit(G, p, m, e, ctx) { return withSrc(e && e.src ? e.src : m && m.c && C[m.c] ? CD(m.c).n : BSRC, () => runRecruit0(G, p, m, e, ctx)); }
function runRecruit0(G, p, m, e, ctx) {
  const k = mult(m), A = (e.a || 0) * k, Hh = (e.h || 0) * k;
  const others = () => p.bd.filter(x => x !== m && tribeOk(x, e.tb));
  switch (e.k) {
    case 'bc_buff_tribe': case 'eot_buff_all': others().forEach(x => buff(x, A, Hh)); break;
    case 'bc_buff_it': p.bd.filter(x => x.it).forEach(x => buff(x, A, Hh)); break;
    case 'bc_buff_rand': { const o = others(); if (o.length) buff(pickR(o), A, Hh); break; }
    case 'bc_summon': for (let i = 0; i < e.n; i++) recruitSummon(p, e.card, m.g, m); break;
    case 'bc_gold': p.g += e.n * k; break;
    case 'bc_chakra': case 'eot_chakra': p.ck = Math.min(ckMax(p), (p.ck || 0) + e.n * k); break;
    case 'cast_ck': p.ck = Math.min(ckMax(p), (p.ck || 0) + e.n * k); break;
    case 'cast_braise': p.braise = (p.braise || 0) + e.n * k * pureX(p, 'n_feu'); break;
    case 'eot_ck_braise': if ((p.ck || 0) >= e.n) { p.ck -= e.n; p.braise = (p.braise || 0) + (e.n + 1) * k * pureX(p, 'n_feu'); } break;
    case 'bc_upd': p.uc = Math.max(0, p.uc - e.n * k); break;
    case 'eot_inc': p.inc = p.inc || []; p.inc[0] = (p.inc[0] || 0) + e.n * k + (p.pure === 'n_vent' ? 1 : 0); break;
    case 'eot_maree': p.maree = (p.maree || 0) + e.n * k * pureX(p, 'n_eau'); break;
    case 'eot_wave': { const r = p.bd[p.bd.indexOf(m) + 1]; if (r) buff(r, A, Hh); break; }
    case 'eot_charge': p.charge = (p.charge || 0) + e.n * k * pureX(p, 'n_foudre'); break;
    case 'eot_anchor': { const n = Math.min(2 * k, p.ck || 0) * pureX(p, 'n_terre'); if (n) buff(m, 0, n); break; }
    case 'eot_ck_spend': if ((p.ck || 0) >= e.n) { p.ck -= e.n; buff(m, A, Hh); } break;
    case 'cast_memo': if (p.lastCast && SPELLS[p.lastCast] && SPELLS[p.lastCast].nin) { m.memo = p.lastCast; if (SPELLS[p.lastCast].el) m.el = SPELLS[p.lastCast].el; } break;
    case 'sot_memo': if (m.memo && SPELLS[m.memo]) for (let i = 0; i < k + (m.memo2 ? 1 : 0); i++) if (p.hd.length < 10) p.hd.push({ sp:m.memo, u:UID++ }); break;
    case 'bc_card': for (let i = 0; i < e.n; i++) if (p.hd.length < 10) { const c = drawOne(G, p.t, null, e.tb); if (c) p.hd.push(c); } break;
    case 'eot_self': buff(m, A, Hh); break;
    case 'eot_buff_rand': shuffle(others()).slice(0, e.n).forEach(x => buff(x, A, Hh)); break;
    case 'play_self': if (tribeOk(ctx, e.tb)) buff(m, A, Hh); break;
    case 'play_other': if (tribeOk(ctx, e.tb)) buff(ctx, A, Hh); break;
    case 'sell_gold': p.g += e.n * k; break;
    case 'roll_self': case 'cast_self': case 'combo_self': buff(m, A, Hh); break;
    case 'combo_gold': p.g += e.n * k; break;
    case 'cast_fire': p.njf = (p.njf || 0) + e.d * k; break;
    case 'eot_card_buff': p.bd.filter(x => x.c === e.card).forEach(x => buff(x, A, Hh)); break;
    case 'bc_gate': p.hp = Math.max(1, p.hp - e.d); buff(m, A, Hh); break;
    case 'eot_clones': p.bd.filter(x => x.c === 'tk_clone').forEach(x => buff(x, A, Hh)); break;
    case 'cast_chain': if ((p.castN || 0) >= e.n) buff(m, A, Hh); break;
    case 'cast_chain_ck': if ((p.castN || 0) >= e.n) p.ck = Math.min(ckMax(p), (p.ck || 0) + e.c * k); break;
    case 'combo_kg': { const b = CD(m.c), els = [CLAN_EL[b.tr], CLAN_EL[b.tr2]], x = (p.lastCombo || []).filter(el => els.includes(el)).length * (htr(p, 'pkg') ? (htr(p, 'pkg').x || 2) : 1); if (x) buff(m, A * x, Hh * x); break; }
    case 'eot_souffle': mkAdd(p, 'vent', e.n * k * pureX(p, 'n_vent')); break;
    case 'eot_roche': mkAdd(p, 'terre', e.n * k * pureX(p, 'n_terre')); break;
    case 'eot_braise_self': { const x = Math.min(e.n * k, Math.floor((p.braise || 0) / 2)); if (x) buff(m, x, 0); break; }
    case 'eot_maree_self': { const x = Math.min(e.n * k, Math.floor((p.maree || 0) / 3)); if (x) buff(m, x, x); break; }
    case 'combo_ck': p.ck = Math.min(ckMax(p), (p.ck || 0) + e.n * k); break;
    case 'rsv_bc': { const el = CLAN_EL[CD(m.c).tr]; if (el) withSrc('Réservoir', () => rsvFill(G, p, el)); break; }
    case 'roll_buff_tribe': case 'cast_buff_tribe': case 'combo_tribe': others().forEach(x => buff(x, A, Hh)); break;
    case 'cast_buff_rand': { const o = p.bd.filter(x => x !== m); if (o.length) buff(pickR(o), A, Hh); break; }
    case 'bc_spell': for (let i = 0; i < e.n * k; i++) if (p.hd.length < 10) { const sp = drawSpell(p.t); if (sp) p.hd.push(sp); } break;
    case 'eot_buff_taunt': p.bd.forEach(x => { if (has(x, 't')) buff(x, A, Hh); }); break;
    case 'eot_combo': if (p.bd.some(x => x !== m && tribe(x) === e.tb2)) buff(m, A, Hh); break;
    case 'bc_combo': if (p.bd.some(x => x !== m && tribe(x) === e.tb2)) p.bd.forEach(x => { if (x !== m) buff(x, A, Hh); }); break;
    case 'eot_elements': { const n = elems(p.bd); buff(m, A * n, Hh * n); break; }
    case 'eot_buff_big': if (p.bd.length) buff(p.bd.slice().sort((a, b) => b.a - a.a)[0], A, Hh); break;
    case 'pow_buff_rand': { const o = p.bd.filter(x => x !== m); if (o.length) buff(pickR(o), A, Hh); break; }
    case 'pow_spell': for (let i = 0; i < e.n * k; i++) if (p.hd.length < 10) { const sp = drawSpell(p.t); if (sp) p.hd.push(sp); } break;
    case 'sot_gold': p.g += e.n * k; break;
    case 'eot_buff_left': if (p.bd[0]) buff(p.bd[0], A, Hh); break;
    case 'eot_blood': p.hp = Math.max(1, p.hp - e.d); buff(m, A, Hh); break;
    case 'up_buff_all': p.bd.forEach(x => { if (tribeOk(x, e.tb)) buff(x, A, Hh); }); break;
    case 'eot_fireball': p.fb = (p.fb || 3) + e.n * k; break;
    case 'eot_ki': kiAdd(p, e.n * k); break;
    case 'mentor': { const i = p.bd.indexOf(m), ts = (e.n || 1) > 1 ? [p.bd[i - 1], p.bd[i + 1]] : [p.bd[i + 1]]; ts.forEach(x => { if (x) { buff(x, A, Hh); qAdd(p, 'mentor'); } }); break; }
    case 'eot_mentor_all': p.bd.forEach(o => { if (o !== m) fxOf(o, 'eot').filter(f => f.k === 'mentor').forEach(f => runRecruit(G, p, o, f)); }); break;
    case 'eot_tfbuff': p.bd.forEach(o => { if (o !== m && o.tf) buff(o, A, Hh); }); break;
    case 'eot_genki': { const n = p.bd.filter(o => o !== m).length; if (n) buff(m, A * n, Hh * n); break; }
    case 'tf_self': buff(m, A, Hh); break;
    case 'bc_item': for (let i = 0; i < e.n * k; i++) if (p.hd.length < 10) p.hd.push({ sp:e.it, u:UID++ }); break;
    case 'bc_namek': for (let i = 0; i < e.n; i++) { const o = p.bd.filter(x => x !== m && tribeOk(x, 'd_nam')); if (!o.length) break; absorbInto(p, m, o.reduce((b, x) => x.a + x.h < b.a + b.h ? x : b), 'Fusion namek'); qAdd(p, 'fusions'); } break;
    case 'bc_absorb': for (let i = 0; i < e.n; i++) { const o = p.bd.filter(x => x !== m); if (!o.length) break; absorbInto(p, m, o.reduce((b, x) => x.a + x.h < b.a + b.h ? x : b), 'Absorption'); qAdd(p, 'absorbs'); } break;
    case 'bc_seal': { const o = p.bd.filter(x => x !== m); if (o.length) sealAdd(p, pickR(o), e.n * k); break; }
    case 'eot_seal': shuffle(p.bd.slice()).slice(0, e.n * k).forEach(x => sealAdd(p, x, 1)); break;
    case 'bc_pact': for (let i = 0; i < e.n * k + (htr(p, 'ppactx') ? 1 : 0); i++) pactSummon(p, e.card, m); break;
    case 'eot_pact_buff': p.bd.filter(isPact).forEach(x => buff(x, A, Hh)); break;
    // ----- Rick et Morty -----
    case 'bc_pf': pfAdd(p, e.n * k); break;
    case 'portal_self': buff(m, A, Hh); break;
    case 'eot_rm': { const n = p.bd.filter(x => x !== m && isRM(x)).length; if (n) buff(m, A * n, Hh * n); break; }
    case 'bc_rm': p.bd.forEach(x => { if (x !== m && isRM(x)) buff(x, A, Hh); }); break;
    case 'bc_rm_self': { const n = p.bd.filter(x => x !== m && isRM(x)).length; if (n) buff(m, A * n, Hh * n); break; }
    case 'eot_rm_all': p.bd.forEach(x => { if (x !== m && isRM(x)) buff(x, A, Hh); }); break;
    case 'play_rm': if (ctx && isRM(ctx)) buff(m, A, Hh); break;
    case 'play_tribe': if (tribeOk(ctx, e.tb)) p.bd.forEach(x => { if (x !== m && x !== ctx && tribeOk(x, e.tb)) buff(x, A, Hh); }); break;
    case 'eot_tribe_n': { const n = others().length; if (n) buff(m, A * n, Hh * n); break; }
    case 'bc_robshop': shuffle(p.sh.filter(x => !x.sp)).slice(0, e.n).forEach(x => { const a = Math.max(0, x.a - 1), h = Math.max(0, x.h - 1); x.a -= a; x.h -= h; buff(m, a * k, h * k); qAdd(p, 'robs'); }); break;
      // ----- South Park : cohésion -----
    case 'bc_convert': { const tb = e.tb || 's_gin'; shuffle(p.bd.filter(x => x !== m && famOf(x) !== tb && x.fam !== '*')).slice(0, e.n * k).forEach(x => { x.fam = tb; x.famOf = CD(m.c).n; qAdd(p, 'converts'); }); break; }
    case 'eot_nb_buff': { const i = p.bd.indexOf(m); [p.bd[i - 1], p.bd[i + 1]].forEach(x => { if (x && sameFam(x, m)) { buff(x, A, Hh); qAdd(p, 'mentor'); } }); break; }
    case 'eot_band_inc': if (bandsOf(p.bd).length) { p.inc = p.inc || []; p.inc[0] = (p.inc[0] || 0) + e.n * k; } break;
      // ----- Les Simpson : gags récurrents (recrutement) -----
    case 'gag_eot_self': buff(m, gagV(m, e.a, k), gagV(m, e.h, k)); gagBump(p, m); break;
    case 'gag_play_self': if (tribeOk(ctx, e.tb)) { buff(m, gagV(m, e.a, k), gagV(m, e.h, k)); gagBump(p, m); } break;
    case 'gag_eot_tribe': { const A2 = gagV(m, e.a, k), H2 = gagV(m, e.h, k); others().forEach(x => buff(x, A2, H2)); gagBump(p, m); break; }
    case 'gag_eot_taunt': { const A2 = gagV(m, e.a, k), H2 = gagV(m, e.h, k); p.bd.forEach(x => { if (has(x, 't')) buff(x, A2, H2); }); gagBump(p, m); break; }
    // ----- Les Simpson v2 : Donuts et tribus -----
    case 'bc_donut': case 'sell_donut': giveDonut(p, e.n * k); break;
    case 'eot_donut_l': case 'eot_donut_r': { const x = p.bd[p.bd.indexOf(m) + (e.k === 'eot_donut_l' ? -1 : 1)]; for (let i = 0; i < k; i++) putDonut(G, p, x); break; }
    case 'eot_donut_all': p.bd.filter(x => tribeOk(x, e.tb)).forEach(x => { for (let i = 0; i < k; i++) putDonut(G, p, x); }); break;
    case 'spend_donut': p.bd.filter(x => tribeOk(x, e.tb)).forEach(x => { for (let i = 0; i < k; i++) putDonut(G, p, x); }); break;
    case 'don_other': case 'hand_buff': { const o = others(); if (o.length) buff(pickR(o), A, Hh); break; }
    case 'donc_tribe': case 'spend_buff': p.bd.filter(x => tribeOk(x, e.tb)).forEach(x => buff(x, A, Hh)); break;
    case 'bc_donut_up': p.donA = (p.donA || 0) + A; p.donH = (p.donH || 0) + Hh; break;
    case 'hplay_self': if (tribeOk(ctx, e.tb)) buff(m, A, Hh); break;
    case 'bc_self': buff(m, A, Hh); break;
    case 'bc_clone': nkClone(p, m, e.n, e.full); break;
    case 'bc_manda': { const o = p.bd.filter(x => x !== m && x.c !== 'tk_manda').sort((a, b) => (a.a + a.h) - (b.a + b.h))[0]; if (!o && p.bd.length >= 7) break; let at = m; if (o) { const i = p.bd.indexOf(o); p.bd.splice(i, 1); toPool(G, o); } recruitSummon(p, 'tk_manda', m.g, at); const md = p.bd.filter(x => x.c === 'tk_manda' && !x.fed).pop(); if (md) { md.fed = 1; if (o) buff(md, o.a, o.h); } break; }   // Manda arrive en dévorant le serviteur le plus faible (même sur un plateau plein)
    case 'bc_fill_tok': e.cards.filter(c => !p.bd.some(x => x.c === c)).forEach(c => { if (p.bd.length < 7) recruitSummon(p, c, m.g, m); }); break;
    case 'bc_summon_of': for (let i = 0; i < e.n; i++) recruitSummon(p, pickR(['tk_karasu', 'tk_kuroari', 'tk_sanshouo']), m.g, m); break;
    case 'osell_gold': p.g += e.n * k; break;
    case 'jut_self': if (ctx && ctx !== m && tribeOk(ctx, e.tb)) buff(m, A, Hh); break;
    case 'jut_any': if (ctx && ctx !== m) buff(m, A, Hh); break;
    case 'bc_kwself': if (!has(m, e.kw)) addF(m, e.kw); break;
    case 'eot_few': if (p.bd.length <= e.n) buff(m, A, Hh); break;
    case 'sell_buff': p.bd.filter(x => x !== m && tribeOk(x, e.tb)).forEach(x => buff(x, A, Hh)); break;
    case 'sell_ck': case 'osell_ck': p.ck = Math.min(ckMax(p), (p.ck || 0) + e.n * k); break;
    case 'osell_self': buff(m, A, Hh); break;
    case 'osell_tribe': others().forEach(x => buff(x, A, Hh)); break;
    case 'dev_self': if (ctx !== m) buff(m, A, Hh); break;
    case 'bc_gem': case 'eot_gem': giveGem(p, e.n * k); break;
    case 'bc_gem_up': p.gemA = (p.gemA || 0) + e.a * k; p.gemH = (p.gemH || 0) + e.h * k; break;
    case 'bc_devour': case 'eot_devour': devour(G, p, m, k); break;
    case 'craft': giveCraft(p, m, e); break;
    case 'choose': if ((e.o || []).length) { if (p.bot) runRecruit(G, p, m, pickR(e.o)); else p.cho = { u:m.u, c:m.c, o:e.o }; } break;
    case 'bc_disc': if (!p.disc && p.hd.length < 10) { const opts = []; for (let i = 0; i < 3; i++) { const c = drawOne(G, p.t, null, e.tb); if (c) opts.push(c); } if (opts.length) p.disc = opts; } break;
    case 'bc_inc': p.inc = p.inc || []; p.inc[0] = (p.inc[0] || 0) + e.n * k; break;
    case 'bc_bought': { const n = (p.bt || {})[e.tb] || 0, o = others(); if (n && o.length) buff(pickR(o), A * n, Hh * n); break; }
    case 'buy_gold': if (ctx && !ctx.sp && tribeOk(ctx, e.tb)) p.g += e.n * k; break;
    case 'bc_tribe_atk': p.horA = (p.horA || 0) + A; p.bd.forEach(x => { if (tribeOk(x, e.tb)) buff(x, A, 0); }); break;
    case 'bc_kw': shuffle(p.bd.filter(x => x !== m && !has(x, e.kw) && tribeOk(x, e.tb))).slice(0, e.n >= 7 ? 9 : e.n * k).forEach(x => addF(x, e.kw)); break;
  }
}
// ----- univers Les Simpson v2 : Donuts (sort gratuit +1/+1, plus les bonus gagnés pendant la partie) -----
const DON = 'si_don';
// Gemme de sang : sort gratuit, +1/+1 (améliorable) sur un serviteur ; Sorcellerie : sort temporaire donné à la pose puis à chaque tour
const GEM = 'hs_gem';
const LS_CAP = 5;
// ----- Naruto : jutsus (une fois par tour, coût = niveau du ninja), transformation unique, groupes emblématiques -----
// Un jutsu de soutien (fx) agit tout de suite ; un jutsu de combat (cb) se paie au recrutement et part au début du prochain combat.
const NJ_RSV = false;      // plus de réservoir ni de combos de villages
const NJ_SPELLS = false;   // plus de sorts en taverne : chaque ninja porte son jutsu
const INV_T = { tl_snaga:1, tl_warg:2, tl_urukj:2, tl_huorn:2, tl_uruk:3, tl_cavalier:3, tl_mumak:4, tl_ent:4, tl_morts:4, tl_beteailee:5, tl_aigle:5, tl_nazgul:4, tl_balrog:6, tk_katsuyu2:2, tk_requin:2, tk_aoda:4, tk_rashomon:4, tk_ninken:4, tk_kamatari:4, tk_katsuyu:5, tk_gamabunta:5, tk_cerbere:6, tk_manda:6 };   // les grosses invocations frappent le héros adverse comme leur invocateur
const dmgTier = m => INV_T[m.c] || tierOf(m);
const jutOf = m => (m && C[m.c] && (CD(m.c).fxAll || []).find(e => e.k === 'jutsu')) || null;
const tfSt = J => !J || !J.tf ? [] : Array.isArray(J.tf) ? J.tf : [J.tf];   // paliers de transformation (un ou plusieurs)
const jutLast = (J, tf, key) => { const st = tfSt(J); for (let i = Math.min(tf || 0, st.length) - 1; i >= 0; i--) if (st[i][key]) return st[i][key]; return J[key] || []; };
const jutFx = (J, tf) => jutLast(J, tf, 'fx');
const jutCb = (J, tf) => jutLast(J, tf, 'cb');
const tfStTxt = (T, k) => `${T.nm} (${T.c} chakra) : ${T.a || T.h ? sign(T.a * k, T.h * k) : ''}${T.kw ? (T.a || T.h ? ', ' : '') + ((SET.kw[T.kw] || {}).n || '') : ''}${(T.x || []).map(o => ET[o.k] ? ' · ' + ET[o.k].txt(o, k).replace(/\.$/, '') : '').join('')}${T.fx ? ' · son jutsu devient : ' + jutBody(T.fx, k) : ''}${T.cb ? ' · son jutsu de combat devient : ' + jutBody(T.cb, k) : ''}`.replace(' :  · ', ' : ');
const jutBody = (fx, k) => fx.map(o => ET[o.k] ? ET[o.k].txt(o, k).replace(/^(Cri de guerre|Début du combat) : /, '').replace(' : au début du combat, ', ' : ').replace(/\.$/, '') : '?').join(' ; ');
let TX_SHORT = false, TX_TF = 0;   // texte court sur les cartes (les détails s'affichent à côté de la grande carte au survol)
function jutTxt(e, k) {
  /* une fois transformé, la carte montre le jutsu de la forme actuelle et seulement les transformations qui restent */
  const done = Math.min(TX_TF || 0, tfSt(e).length), ST = tfSt(e).slice(done), n0 = tfSt(e).length, FX = done ? jutFx(e, done) : e.fx || [], CB = done ? jutCb(e, done) : e.cb || [], cb = CB.length, fx = FX.length;
  const j = e.none ? '' : (cb && !fx ? `Jutsu de combat · ${e.nm} : ${jutBody(CB, k)}.` : `Jutsu · ${e.nm} : ${jutBody(FX, k)}${cb ? ' ; au combat : ' + jutBody(CB, k) : ''}.`);
  const last = i => done + i === n0 - 1, lab = ST.length > 1 ? (done ? 'Transformations suivantes' : 'Transformations') : (done ? 'Transformation suivante' : 'Transformation');
  if (TX_SHORT) return j + (ST.length ? `${j ? ' ' : ''}${lab} : ${ST.map((T, i) => `${T.nm} (${T.c}${last(i) ? ', doré' : ''})`).join(' → ')}.` : '');
  const got = tfSt(e).slice(0, done).flatMap(T => (T.x || []).map(o => ET[o.k] ? ET[o.k].txt(o, k).replace(/\.$/, '') : '').filter(Boolean));   // effets gagnés par les transformations déjà faites
  return j + (got.length ? ` Pouvoirs acquis : ${got.join(' ; ')}.` : '') + (ST.length ? `${j ? ' ' : ''}${lab} · ${ST.map((T, i) => (last(i) ? 'carte dorée seulement · ' : '') + tfStTxt(T, k)).join(' → ')}.` : '');
}
function jutCost(p, m) { const J = jutOf(m); if (!J || J.none) return null; if (itL(m).includes('ni_kusanagi') && SPELLS.ni_kusanagi.ow.includes(m.c)) return 0; if (false) return 0; return Math.max(1, tierOf(m) - ((htr(p, 'pjutc') || {}).n || 0)); }
// le dernier palier d'un ninja à plusieurs transformations est réservé à la carte dorée (triple)
const nkTfLock = m => { const st = tfSt(jutOf(m)), i = m.tf || 0; return st.length >= 1 && i === st.length - 1 && !m.g; };   // la dernière transformation (ou l'unique) demande la carte dorée
function nkTfCost(p, m) { const T = tfSt(jutOf(m))[m.tf || 0]; if (!T || nkTfLock(m)) return null; return Math.max(1, T.c - ((htr(p, 'pnktf') || {}).n || 0)); }
function jutBlock(G, p, m) { const J = jutOf(m), c = jutCost(p, m); if (!J || c == null) return 'Pas de jutsu.'; if (m.ju === G.rd) return jutCb(J, m.tf).length ? 'Jutsu prêt : il partira au début du combat.' : 'Jutsu déjà lancé ce tour.'; if ((p.ck || 0) < c) return `Il te faut ${c} chakra (tu en as ${p.ck || 0}).`; const fx = jutFx(J, m.tf); if (fx.length && !jutCb(J, m.tf).length && fx.every(o => /^bc_(summon|summon_of|clone)$/.test(o.k)) && p.bd.length >= 7) return 'Ton plateau est plein.'; if (fx.some(o => o.k === 'bc_manda') && p.bd.length >= 7 && !p.bd.some(x => x !== m && x.c !== 'tk_manda')) return 'Ton plateau est plein.'; { const ft = fx.find(o => o.k === 'bc_fill_tok'); if (ft && (p.bd.length >= 7 || ft.cards.every(c => p.bd.some(x => x.c === c)))) return p.bd.length >= 7 ? 'Ton plateau est plein.' : 'Ses invocations sont déjà toutes là.'; } return null; }
function doJutsu(G, p, m) {
  if (jutBlock(G, p, m)) return false; const J = jutOf(m), c = jutCost(p, m);
  p.ck -= c; m.ju = G.rd; if (jutCb(J, m.tf).length) m.jp = G.rd;   // jutsu de combat : préparé pour le prochain combat
  withSrc('Jutsu · ' + J.nm, () => jutFx(J, m.tf).forEach(o => runRecruit0(G, p, m, o)));
  qAdd(p, 'jutsus'); p.bd.slice().forEach(x => fxOf(x, 'jut').forEach(e => runRecruit(G, p, x, e, m))); checkTriple(G, p); return true;
}
function doNkTf(G, p, m, free) { const T = nkTfLock(m) ? null : tfSt(jutOf(m))[m.tf || 0], c = !T ? null : free ? 0 : nkTfCost(p, m); if (!T || c == null || (p.ck || 0) < c) return false; const k = mult(m); p.ck -= c; m.tf = (m.tf || 0) + 1; m.tfn = T.nm; withSrc('Transformation · ' + T.nm, () => buff(m, T.a * k, T.h * k)); if (T.kw && !has(m, T.kw)) addF(m, T.kw); (T.x || []).forEach(o => (m.x = m.x || []).push(Object.assign({ src:T.nm }, o))); qAdd(p, 'nktf'); return true; }
// ----- groupes emblématiques : duos, trios et plus. Actifs quand les membres sont ensemble sur le plateau ; les effets se cumulent -----
const NK_GROUPS = [
  { id:'immortels', n:'Duo immortel', m:['nk_hidan', 'nk_kakuzu'], th:[2], tx:['Les immortels : tant que l\'un des deux est en vie, l\'autre revient à la vie à chaque mort (2 fois par combat au plus). Il faut les abattre ensemble.'] },
  { id:'artistes', n:'Les artistes', m:['nk_deidara', 'nk_sasori'], th:[2], tx:['« L\'art est une explosion » : les Râles d\'agonie de Deidara se déclenchent deux fois. « L\'art est éternel » : les marionnettes invoquées par Sasori ont Réincarnation.'] },
  { id:'itakisa', n:'Itachi et Kisame', m:['nk_itachi', 'nk_kisame'], th:[2], tx:['Chasseurs de Kyūbi : ils visent toujours l\'ennemi le plus fort. Kisame lui vole 3 ATQ à chaque attaque ; les coups d\'Itachi le mettent sous Genjutsu.'] },
  { id:'anges', n:'Les anges d\'Ame', m:['nk_pain', 'nk_konan'], th:[2], tx:['Konan encaisse la première attaque qui vise Pain. Si Konan meurt, Pain lance Shinra Tensei : 3 dégâts à tous les ennemis.'] },
  { id:'espions', n:'Les espions', m:['nk_zetsu', 'nk_tobi'], th:[2], tx:['Dans l\'ombre : Camouflage à chaque combat, et il ne disparaît pas quand ils attaquent. Fin de tour : ils gagnent +0/+1.'] },
  { id:'demon', n:'Le démon et son arme', m:['nk_zabuza', 'nk_haku'], th:[2], tx:['Haku encaisse les attaques qui visent Zabuza et retrouve son Bouclier divin à chaque combat. À la mort de Haku, Zabuza devient le Démon : attaque doublée et Furie des vents jusqu\'à la fin du combat. Les deux gagnent +3/+3 au début du combat.'] },
  { id:'uchiha', n:'Frères Uchiha', m:['nk_itachi', 'nk_sasuke'], th:[2], tx:['Mangekyō éternel : quand l\'un meurt, l\'autre reçoit ses yeux et gagne ses caractéristiques et ses mots-clés pour le reste du combat.'] },
  { id:'md1', n:'Maître et disciple', m:['nk_jiraiya', 'nk_naruto'], el:'nk_naruto', th:[2], tx:['Naruto lance un Rasengan géant au début du combat (8 dégâts à l\'ennemi d\'en face). Si Jiraiya meurt, Naruto se transforme pour le reste du combat.'] },
  { id:'md2', n:'Maître et disciple', m:['nk_gai', 'nk_lee'], el:'nk_lee', th:[2], tx:['La fleur de la jeunesse : chaque fois que Gaï attaque, Rock Lee attaque aussitôt après lui.'] },
  { id:'md3', n:'Maître et disciple', m:['nk_orochimaru', 'nk_kabuto'], el:'nk_kabuto', th:[2], tx:['Edo Tensei : au début du combat, Kabuto ressuscite ton serviteur le plus fort mort au combat précédent.'] },
  { id:'md4', n:'Maître et disciple', m:['nk_tsunade', 'nk_sakura'], el:'nk_sakura', th:[2], tx:['Ninjutsu médical : leur Soin rend deux fois plus de PV et peut dépasser les PV de départ.'] },
  { id:'md5', n:'Maître et disciple', m:['nk_naruto', 'nk_konohamaru'], el:'nk_konohamaru', th:[2], tx:['Konohamaru apprend le Multi-clonage : un Clone de lui-même à chaque fin de tour.'] },
  { id:'ombre', n:'Ombre et vent', m:['nk_shikamaru', 'nk_temari'], th:[2], tx:['Stratège et éventail : Shikamaru entrave l\'ennemi d\'en face au début du combat, et Temari inflige le triple de dégâts aux ennemis entravés.'] },
  { id:'chiyo', n:'Grand-mère et petit-fils', m:['nk_chiyo', 'nk_sasori'], th:[2], tx:['Chiyo invoque Père et Mère, les premières marionnettes de Sasori (3/3 chacune), au début de chaque combat.'] },
  { id:'kage', n:'Les Kage', m:['nk_gaara', 'nk_tsunade', 'nk_mei', 'nk_raikage'], th:[2, 3, 4], tx:['Fin de tour : gagne 2 chakra.', 'Sommet des Kage : en plus, tes serviteurs sont insensibles au Genjutsu et à l\'Entrave.', 'En plus, chacun de tes Kage attaque une fois avant le début du combat.'] },
  { id:'sannin', n:'Les Sannin', m:['nk_jiraiya', 'nk_tsunade', 'nk_orochimaru'], th:[2, 3], tx:['Impasse à trois : leurs invocations arrivent d\'elles-mêmes au début de chaque combat, sans chakra.', 'Gamabunta, Katsuyu et Manda arrivent ensemble, dorés.'] },
  { id:'fratrie', n:'Fratrie du Sable', m:['nk_gaara', 'nk_temari', 'nk_kankuro'], th:[2, 3], tx:['Le sable protège : Bouclier divin à chaque combat pour les membres présents.', 'En plus, quand l\'un des trois est attaqué, les deux autres ripostent.'] },
  { id:'gai', n:'Équipe Gaï', m:['nk_gai', 'nk_lee', 'nk_neji'], th:[2, 3], tx:['Taijutsu : +0/+4 au début du combat, et +5 ATQ à chacune de leurs attaques.', 'Les Portes : en plus, Furie des vents, et la première attaque de chacun inflige le double.'] },
  { id:'jinchu', n:'Jinchūriki', m:['nk_naruto', 'nk_gaara', 'nk_bee'], th:[2, 3], tx:['Bijū : ils se transforment gratuitement dès que ton héros a moins de 15 PV.', 'En plus, Bijūdama : 3 dégâts à tous les ennemis au début du combat.'] },
  { id:'equipe7', n:'Équipe 7', m:['nk_naruto', 'nk_sasuke', 'nk_sakura', 'nk_kakashi'], th:[2, 3, 4], tx:['Travail d\'équipe : quand l\'un d\'eux attaque, un autre gagne +3/+3.', 'Épreuve des clochettes : en plus, Kakashi copie les jutsus de combat de ses élèves.', 'Rasengan et Chidori : en plus, Naruto et Sasuke frappent ensemble la même cible, sans riposte.'] },
  { id:'son', n:'Les Cinq du Son', m:['nk_jirobo', 'nk_kidomaru', 'nk_sakon', 'nk_tayuya', 'nk_kimimaro'], th:[2, 3, 5], tx:['Marque maudite : ils gagnent +5/+5 la première fois qu\'ils sont blessés à chaque combat.', 'Barrière des quatre flammes : en plus, les ennemis qui les attaquent subissent une Brûlure de 3.', 'Marque de niveau 2 : le bonus passe à +10/+10 et ils gagnent Réincarnation.'] },
  { id:'inoshika', n:'Ino-Shika-Chō', m:['nk_shikamaru', 'nk_ino', 'nk_choji'], th:[2, 3], tx:['Formation : ils gagnent +2/+2 au début de chaque combat.', 'Ino-Shika-Chō : en plus, au début du combat, l\'ennemi le plus fort est entravé et perd 5 ATQ.'] },
  { id:'kumo', n:'Frères de Kumo', m:['nk_raikage', 'nk_bee'], th:[2], tx:['Double Lariat : avant le combat, ils frappent tous les deux une fois.'] },
  { id:'epees', n:'Épéistes de la Brume', m:['nk_zabuza', 'nk_mangetsu', 'nk_ameyuri', 'nk_jinpachi', 'nk_suigetsu', 'nk_kisame'], th:[2, 4, 6], tx:['Brouillard : Camouflage et +3/+3 pour tous tes épéistes à chaque combat.', 'En plus, chaque épéiste gagne l\'effet de l\'épée de son voisin épéiste de droite.', 'Les épées réunies : en plus, chaque attaque d\'un épéiste déclenche l\'attaque du suivant.'] },
];
// libellé propre à l'univers : un effet peut porter son nom (nm) à la place de celui d'origine
Object.keys(ET).forEach(k => { const t0 = ET[k].txt; ET[k].txt = (e, x) => { const t = t0(e, x); if (!e || !e.nm) return t; const i = t.indexOf(' : '), head = i > 0 ? t.slice(0, i) : ''; return e.nm + ' : ' + (i > 0 && !/^(Cri de guerre|Début du combat|Râle d'agonie|Fin de tour|Début de tour)$/.test(head) ? t.slice(i + 3) : t.charAt(0).toLowerCase() + t.slice(1)); }; });
ET.voy_tf = { tr:'voy', l:'Transformation du voyage', ps:[], w:1, mag:() => 4, txt:(e, k) => e.st.map((T, i) => `${e.st.length > 1 && i === e.st.length - 1 ? 'carte dorée seulement · ' : ''}Après ${(LO_BAT[T.et - 1] || {}).n} : devient ${T.nm} (${sign((T.a || 0) * k, (T.h || 0) * k)}${T.kw ? ', ' + [...T.kw].map(f => (SET.kw[f] || {}).n).join(', ') : ''}${(T.x || []).map(o => ET[o.k] ? ' · ' + ET[o.k].txt(o, k).replace(/\.$/, '') : '').join('')})`).join(' → ') + '.' };
// ===================== Le Seigneur des Anneaux : voyage vers le Mordor, Anneau unique, objets légendaires =====================
const LO_ETAPES = [{ n:'Fondcombe' }, { n:'La Moria' }, { n:'La Lórien' }, { n:'Le Rohan' }, { n:'Le Gondor' }, { n:'Le Mont du Destin' }];   // route de l'Anneau (6 étapes après la Comté)
// grandes batailles : à manche fixe, chaque camp reçoit ses renforts ; les vainqueurs choisissent un butin parmi trois
const LO_BAT = [
  { rd:4, n:'La Moria', L:{ buff:[0, 2], tx:'les Peuples libres tiennent le pont : +0/+2 pour ce combat' }, O:{ tok:['tl_snaga', 'tl_snaga', 'tl_snaga'], tx:'3 gobelins rejoignent l’Ombre' },
    rwL:['lo_dard', 'lo_mithril', 'lo_glamdring', 'lo_hache', 'lo_lembas'], rwO:['lo_balrog', 'lo_morgul', 'lo_palantir', 'lo_gobelins'] },
  { rd:7, n:'Le Gouffre de Helm', L:{ tok:['tl_cavalier', 'tl_cavalier'], tx:'2 Rohirrim chargent avec les Peuples libres' }, O:{ tok:['tl_uruk', 'tl_uruk', 'tl_uruk'], tx:'3 Uruk-hai rejoignent l’Ombre' },
    rwL:['lo_herugrim', 'lo_anduril', 'lo_arc', 'lo_cape', 'lo_charge'], rwO:['lo_baton', 'lo_uruks', 'lo_mine', 'lo_grond'] },
  { rd:10, n:'Minas Tirith', L:{ tok:['tl_morts', 'tl_morts'], tx:'2 soldats de l’Armée des Morts rejoignent les Peuples libres' }, O:{ tok:['tl_mumak', 'tl_mumak', 'tl_beteailee'], tx:'2 Mûmakil et une Bête ailée rejoignent l’Ombre' },
    rwL:['lo_cor', 'lo_feux', 'lo_morts', 'lo_gripoil', 'lo_fiole', 'lo_palantir'], rwO:['lo_grond', 'lo_mumakil', 'lo_bete', 'lo_morgul'] },
  { rd:13, n:'La Porte Noire', L:{ tok:['tl_aigle', 'tl_aigle'], tx:'2 Aigles géants rejoignent les Peuples libres' }, O:{ tok:['tl_beteailee', 'tl_beteailee', 'tl_mumak'], tx:'2 Bêtes ailées et un Mûmak rejoignent l’Ombre' },
    rwL:['lo_aigles', 'lo_couronne', 'lo_arkenstone', 'lo_ents'], rwO:['lo_ombre', 'lo_masse', 'lo_bete'] },
];
const LO_HOBBITS = ['lo_frodon', 'lo_sam', 'lo_merry', 'lo_pippin', 'lo_bilbon'];
// duos célèbres (version en duos du 15/11/2026) : chaque équipe de deux choisit un duo de l'œuvre ; b = bonus du duo
const LO_DUOS = [
  { id:'frodsam', camp:'L', h:['lh_frodon', 'lh_sam'], n:'Frodon et Sam', bn:'Compagnons de route', tx:'Vous vous passez des cartes gratuitement.', b:{ pass:1 } },
  { id:'merpip', camp:'L', h:['lh_merry', 'lh_pippin'], n:'Merry et Pippin', bn:'Second petit-déjeuner', tx:'Aux manches paires, chacun gagne 1 or de plus.', b:{ gold:[2, 1] } },
  { id:'leggim', camp:'L', h:['lh_legolas', 'lh_gimli'], n:'Legolas et Gimli', bn:'Le décompte', tx:'Après chaque combat gagné, le serviteur le plus fort de chacun gagne +1/+1.', b:{ win:[1, 1] } },
  { id:'aragarw', camp:'L', h:['lh_aragorn', 'lh_arwen'], n:'Aragorn et Arwen', bn:'Étoile du soir', tx:'Votre duo commence avec 10 PV de plus.', b:{ hp:10 } },
  { id:'rohan', camp:'L', h:['lh_theoden', 'lh_eowyn'], n:'Théoden et Éowyn', bn:'La Maison d’Eorl', tx:'Au début de chaque tour, un Homme de chacun gagne +1/+1.', b:{ turn:['lo_hom', 1, 1] } },
  { id:'gondor', camp:'L', h:['lh_boromir', 'lh_faramir'], n:'Boromir et Faramir', bn:'Fils de l’Intendant', tx:'Au début de chaque tour, un serviteur avec Provocation de chacun gagne +1/+2.', b:{ turn:['t', 1, 2] } },
  { id:'erebor', camp:'L', h:['lh_thorin', 'lh_bilbon'], n:'Thorin et Bilbon', bn:'Le trésor d’Erebor', tx:'Toutes les 3 manches, chacun gagne 2 or de plus.', b:{ gold:[3, 2] } },
  { id:'oeil', camp:'O', h:['lh_sauron', 'lh_bouche'], n:'Sauron et la Bouche de Sauron', bn:'La voix du Maître', tx:'Au début de chaque tour, un serviteur du Mordor de chacun gagne +1/+1.', b:{ turn:['lo_mor', 1, 1] } },
  { id:'nazgul', camp:'O', h:['lh_roisorcier', 'lh_khamul'], n:'Le Roi-Sorcier et Khamûl', bn:'Les Neuf', tx:'Après chaque combat gagné, le serviteur le plus fort de chacun gagne +1/+1.', b:{ win:[1, 1] } },
  { id:'isengard', camp:'O', h:['lh_saroumane', 'lh_grima'], n:'Saroumane et Gríma', bn:'L’espion du magicien', tx:'Aux manches paires, chacun gagne 1 or de plus.', b:{ gold:[2, 1] } },
  { id:'ungol', camp:'O', h:['lh_gollum', 'lh_arachne'], n:'Gollum et Arachne', bn:'Cirith Ungol', tx:'Vous vous passez des cartes gratuitement.', b:{ pass:1 } },
  { id:'gundabad', camp:'O', h:['lh_azog', 'lh_bolg'], n:'Azog et Bolg', bn:'La lignée du Profanateur', tx:'Au début de chaque tour, un allié de l’Ombre de chacun gagne +1/+1.', b:{ turn:['lo_omb', 1, 1] } },
];
const loDuoOf = h => LO_DUOS.find(d => d.h.includes(h)) || null;
const loDuoId = id => LO_DUOS.find(d => d.id === id) || null;
const loAlly = (G, p) => (G && G.tm && p && p.tm != null ? G.ps.find(x => x !== p && x.tm === p.tm) : null) || null;
const loDuoB = (G, p) => { const t = G && G.tm && p && p.tm != null ? G.tm[p.tm] : null, d = t && t.duo ? loDuoId(t.duo) : null; return d ? d.b : {}; };
const loRingIn = p => !!(p && p.hd && p.hd.some(x => x.sp === 'lo_anneau'));
// (ancienne règle, désactivée le 15/11/2026 : l'Anneau doublait le pouvoir héroïque ; ce sont maintenant les serviteurs qui y réagissent)
const loPowMax = (G, p) => { return 1; if (!G || !G.tm || !inMechAny(G, 'voyage')) return 1; if (loRingIn(p)) return 2; const al = loAlly(G, p); return al && loRingIn(al) && ((HEROES[p.hero] || {}).pw || {}).k !== 'psauron' && ((HEROES[al.hero] || {}).pw || {}).k === 'psauron' ? 2 : 1; };
const LO_RING = 'lo_anneau', LO_SHADOW_TR = ['lo_mor', 'lo_ise', 'lo_omb'], LO_BOTH = ['lo_gollum', 'lo_saroumane'];
const LO_HV = [4, 6];   // traqueurs : caractéristiques de base et gain par étape
const loOn = G => inMechAny(G, 'voyage');
const loHero = (p, k) => { const h = HEROES[p.hero]; return !!(h && h.pw && h.pw.k === k); };
// camp fixé par le héros : Peuples libres (L) ou Ombre (O). Chacun ne voit que les cartes de son camp (Sméagol et Saroumane vont des deux côtés).
const loCamp = p => { const h = HEROES[p && p.hero]; return h ? (h.shadow ? 'O' : 'L') : (p && p.camp) || 'L'; };   // avant le choix du héros : le camp tiré au sort
const loSee = (p, id) => { const tr = C[id] && C[id].tr; if (!tr || !/^lo_/.test(tr) || LO_BOTH.includes(id)) return true; return LO_SHADOW_TR.includes(tr) === (loCamp(p) === 'O'); };
let DRAWP = null;   // joueur pour qui on tire des cartes (taverne, découverte)
const loHas = p => !!(p && p.ring);
const loChap = G => LO_BAT.filter(b => G.rd > b.rd).length;   // batailles déjà livrées : les transformations suivent l'histoire
const loBatNow = G => LO_BAT.findIndex(b => b.rd === G.rd);
function loShelf(G, p) { if (loOn(G)) { p.sp = null; p.sp2 = null; } }   // pas de sorts de taverne dans cet univers : l'étagère reste vide
// l'Anneau est une carte en main : on tient à jour le témoin « porteur » et le nombre d'utilisations du pouvoir
function loRingSync(G) { G.ps.forEach(p => { p.ring = p.al && loRingIn(p) ? 1 : 0; if (G.ph === 'recruit') p.pu = (p.pun || 0) >= loPowMax(G, p); }); }
function loRingMove(G, from, to) { const i = from.hd.findIndex(x => x.sp === LO_RING); if (i < 0 || !to) return false; to.hd.push(from.hd.splice(i, 1)[0]); loRingSync(G); return true; }
// réaction du serviteur posé par celui qui tient l'Anneau (Sauron : deux fois, si lui ou son allié est Sauron)
function loReact(G, p, m) { const R = LO_REACT[m.c]; if (!R || R.sp === 'none') return; const al = loAlly(G, p), n = [p, al].some(x => x && loHero(x, 'psauron')) ? 2 : 1;
  withSrc('L’Anneau unique', () => { for (let r = 0; r < n; r++) { const k = mult(m);
    if (R.sp === 'dispute') { const o = p.bd.filter(x => x !== m && x.h >= 2); if (o.length) pickR(o).h -= 1; }
    if (R.a || R.h) buff(m, R.a * k, R.h * k); if (R.kw) addF(m, R.kw);
    if (R.sp === 'boromir' && !(m.x || []).some(e => e.k === 'dr2')) (m.x = m.x || []).push({ k:'dr2', src:'L’Anneau unique' });
    if (R.sp === 'isildur') remF(m, 's');
    if (R.sp === 'arwen') { const o = p.bd.filter(x => x !== m && !has(x, 's')); if (o.length) addF(pickR(o), 's'); }
    if (R.sp === 'elrond' || R.sp === 'gothmog') { const tb = R.sp === 'elrond' ? 'lo_elf' : 'lo_mor'; p.bd.forEach(x => { if (x !== m && tribeOk(x, tb)) buff(x, k, k); }); } } });
  m.rr = 1; }
// une fois par manche : à la manche 3, l'Anneau arrive dans la main d'un joueur des Peuples libres (Frodon d'abord) ; s'il n'est plus dans aucune main, il revient de la même façon
function loRound(G) {
  const alive = G.ps.filter(p => p.al); if (G.rd < 3 || !alive.length) return;
  if (!alive.some(loRingIn)) { G.ps.forEach(p => { p.hd = p.hd.filter(x => x.sp !== LO_RING); });
    const fr = alive.filter(p => loHero(p, 'pring')), fp = alive.filter(p => loCamp(p) === 'L'), to = fr.length ? pickR(fr) : fp.length ? pickR(fp) : pickR(alive);
    to.hd.push({ sp:LO_RING, u:UID++ }); }
  loRingSync(G);
}
// butin d'une grande bataille gagnée : un choix parmi trois objets de son camp
function loOffer(G, p) {
  if (p.disc || !(p.vq || []).length) return; const e = LO_BAT[p.vq.shift()]; if (!e) return;
  p.disc = shuffle((loCamp(p) === 'O' ? e.rwO : e.rwL).slice()).slice(0, 3).map(id => ({ sp:id, u:UID++ })); p.dsc = e.n;
}
// transformations : un personnage change quand la bataille de son histoire a été livrée
const voyOf = m => (CD(m.c).fxAll || []).find(e => e.k === 'voy_tf');
const loTfLock = (m, st) => st.length > 1 && (m.tf || 0) === st.length - 1 && !m.g;
function loTf(ch, m) { const V0 = voyOf(m); if (!V0) return; const st = V0.st;
  while ((m.tf || 0) < st.length && ch >= st[m.tf || 0].et && !loTfLock(m, st)) { const T = st[m.tf || 0], k = mult(m);
    withSrc(T.nm, () => buff(m, (T.a || 0) * k, (T.h || 0) * k)); if (T.kw) for (const f of T.kw) addF(m, f);
    (T.x || []).forEach(o => (m.x = m.x || []).push(Object.assign({ src:T.nm }, o))); m.tf = (m.tf || 0) + 1; m.tfn = T.nm; } }
const loTfAll = (G, p) => { const ch = loChap(G); p.bd.concat(p.hd.filter(x => !x.sp)).forEach(m => loTf(ch, m)); };
// début du tour : arrivée de l'Anneau, transformations, bonus du duo, butin de bataille
function loTurn(G, p) {
  if (G.lor !== G.rd) { G.lor = G.rd; loRound(G); }
  p.vq = p.vq || []; loTfAll(G, p);
  if (G.tm) { const b = loDuoB(G, p), d = loDuoId(G.tm[p.tm].duo);
    if (b.gold && G.rd % b.gold[0] === 0) p.g += b.gold[1];
    if (b.turn) { const [k, a, h] = b.turn, c = p.bd.filter(m => k === 't' ? has(m, 't') : tribeOk(m, k)); if (c.length) withSrc(d.bn, () => { const m = pickR(c); buff(m, a * mult(m), h * mult(m)); }); }
    if (loRingIn(p) && (HEROES[p.hero] || {}).hearts) p.g += 1;
    p.pu = (p.pun || 0) >= loPowMax(G, p);
  }
  loOffer(G, p);
}
// combat : renforts des grandes batailles
function loBattle(G, p, board) { const b = LO_BAT[loBatNow(G)]; if (!b || !p) return; const s = b[loCamp(p)];
  (s.tok || []).forEach(c => { if (board.length < 7) board.push(fullM(mk(c, 0))); }); if (s.buff) board.forEach(m => { m.a += s.buff[0]; m.h += s.buff[1]; }); }
// combat : les Nazgûl traquent le porteur des Peuples libres ; les Rohirrim pourchassent le porteur de l'Ombre
function loHunters(G, p) { const et = G.rg ? G.rg.et : 0; return { v:LO_HV[0] + LO_HV[1] * et, n:Math.min(loHero(p, 'pbilbon') ? 1 : 3, 1 + Math.floor(et / 2)) }; }   // plus l'Anneau approche du Mordor, plus la traque est féroce
function loNazgul(p, foeBoard) {
  return;   // version en duos : plus de traque
  if (!p || !p.ring || typeof H === 'undefined' || !H.G) return; const hu = loHunters(H.G, p), c = loCamp(p) === 'O' ? 'tl_cavalier' : 'tl_nazgul';
  for (let i = 0; i < hu.n; i++) { const n = fullM(mk(c, 0)); n.a = hu.v; n.h = hu.v;
    if (foeBoard.length < 7) { foeBoard.push(n); continue; }
    const w = foeBoard.filter(m => m.c !== c).sort((x, y) => (x.a + x.h) - (y.a + y.h))[0]; if (w && w.a + w.h < 2 * hu.v) foeBoard[foeBoard.indexOf(w)] = n; }   // plateau plein : le traqueur prend la place du plus faible pour ce combat
}
// fin du combat : butin des batailles, marche de l'Anneau (il avance si son porteur n'est pas battu, recule sinon et passe au vainqueur)
function loAfter(G) {
  const bi = loBatNow(G); G.ps.forEach(p => { if (p.al && bi >= 0 && p.vres === 'win') (p.vq = p.vq || []).push(bi); });
  if (G.tm) {
    G.ps.forEach(p => { const b = loDuoB(G, p); if (p.al && p.vres === 'win' && b.win && p.bd.length) { const m = p.bd.reduce((x, y) => y.a + y.h > x.a + x.h ? y : x); withSrc(loDuoId(G.tm[p.tm].duo).bn, () => buff(m, b.win[0] * mult(m), b.win[1] * mult(m))); } });
    // l'Anneau passe au duo qui a battu celui qui le tient (Gollum : aussi sur une égalité)
    const h = G.ps.find(loRingIn);
    if (h && h.vfoe != null) { let f = G.ps.find(x => x.pid === h.vfoe) || null; if (f && !f.al) f = loAlly(G, f); const fa = f ? loAlly(G, f) : null, gf = f && loHero(f, 'pgollum') ? f : fa && fa.al && loHero(fa, 'pgollum') ? fa : null;
      if (f && f.al && f.tm !== h.tm && (h.vres === 'loss' || (h.vres === 'draw' && gf))) loRingMove(G, h, gf || f); }
    G.ps.forEach(p => { if (!p.al && loRingIn(p)) p.hd = p.hd.filter(x => x.sp !== LO_RING); });   // porteur éliminé sans vainqueur vivant : l'Anneau reviendra à la manche suivante
    loRingSync(G);
  }
  G.ps.forEach(p => { p.vres = null; p.vfoe = null; });
  return null;
}
// IA : pose ses objets sur leur porteur du film (sinon sur le plus fort)
function loBot(G, p) {
  for (let g = 0; g < 10; g++) { const i = p.hd.findIndex(x => x.sp && x.sp !== LO_RING && SPELLS[x.sp] && SPELLS[x.sp].lo); if (i < 0) break; const S = SPELLS[p.hd[i].sp]; let tg = -1;
    if (S.tg) { if (!p.bd.length) break; const sg = p.bd.filter(m => (S.sig || []).includes(m.c)); const t = (sg.length ? sg : p.bd).reduce((b, x) => x.a + x.h > b.a + b.h ? x : b); tg = p.bd.indexOf(t); }
    if (!castSpell(G, p, i, tg)) break; }
}
const LO_GROUPS = [
  { id:'lo_frodsam', n:'Frodon et Sam', m:['lo_frodon', 'lo_sam'], th:[2], tx:['« Je ne peux pas le porter à votre place, mais je peux vous porter, vous ! » : Frodon gagne +0/+4 en combat ; s’il meurt, Sam gagne ses caractéristiques et ses mots-clés.'] },
  { id:'lo_merpip', n:'Merry et Pippin', m:['lo_merry', 'lo_pippin'], th:[2], tx:['Breuvage des Ents : fin de tour, ils gagnent +1/+1.'] },
  { id:'lo_leggim', n:'Legolas et Gimli', m:['lo_legolas', 'lo_gimli'], th:[2], tx:['Le décompte : ils gagnent +2 ATQ à chacune de leurs attaques.'] },
  { id:'lo_trois', n:'Les Trois Chasseurs', m:['lo_aragorn', 'lo_legolas', 'lo_gimli'], th:[3], tx:['« Allons chasser de l’orque ! » : Furie des vents pour les trois à chaque combat.'] },
  { id:'lo_aragarw', n:'Aragorn et Arwen', m:['lo_aragorn', 'lo_arwen'], th:[2], tx:['Étoile du soir : Aragorn revient à la vie une fois par combat tant qu’Arwen est en vie.'] },
  { id:'lo_mages', n:'Gandalf et Saroumane', m:['lo_gandalf', 'lo_saroumane'], th:[2], tx:['Duel de magiciens : au début du combat, chacun inflige 4 dégâts à un ennemi.'] },
  { id:'lo_eorl', n:'La Maison d’Eorl', m:['lo_theoden', 'lo_eomer', 'lo_eowyn', 'lo_cavalier'], th:[2, 3], tx:['Cavaliers du Rohan : +2/+2 en combat.', 'La charge : en plus, leur première attaque inflige le double.'] },
  { id:'lo_intend', n:'Les Intendants du Gondor', m:['lo_denethor', 'lo_boromir', 'lo_faramir', 'lo_garde'], th:[2, 3], tx:['Remparts de Minas Tirith : +0/+4 en combat.', 'En plus, Riposte : 2 dégâts à ceux qui les attaquent.'] },
  { id:'lo_eowmer', n:'Éowyn et Merry', m:['lo_eowyn', 'lo_merry'], th:[2], tx:['« Je ne suis pas un homme ! » : leur première attaque de chaque combat inflige le double et brise le Bouclier divin.'] },
  { id:'lo_conseil', n:'Le Conseil Blanc', m:['lo_gandalf', 'lo_galadriel', 'lo_elrond'], th:[2, 3], tx:['L’ennemi le plus fort saute sa première attaque.', 'En plus, Bouclier divin pour les trois à chaque combat.'] },
  { id:'lo_cie', n:'Thorin et Compagnie', m:['lo_thorin', 'lo_balin', 'lo_dain', 'lo_bilbon'], th:[2, 3, 4], tx:['+2/+2 en combat.', '+4/+4 en combat.', '+6/+6 et Réincarnation en combat.'] },
  { id:'lo_nazgul', n:'Les Nazgûl', m:['lo_roisorcier', 'lo_khamul'], th:[2], tx:['Souffle noir : Camouflage à chaque combat, et l’ennemi d’en face saute sa première attaque.'] },
  { id:'lo_main', n:'La Main Blanche', m:['lo_saroumane', 'lo_grima'], th:[2], tx:['Murmures de Gríma : au début du combat, tous les ennemis perdent 1 ATQ.'] },
  { id:'lo_uruk', n:'Les Uruk-hai', m:['lo_lurtz', 'lo_ugluk', 'lo_mauhur', 'lo_berserker'], th:[2, 3], tx:['+3/+3 en combat.', 'En plus, Furie des vents.'] },
  { id:'lo_guide', n:'Le guide et le porteur', m:['lo_gollum', 'lo_frodon'], th:[2], tx:['Par les chemins secrets : Camouflage pour les deux à chaque combat.'] },
  { id:'lo_foret', n:'La Forêt Noire', m:['lo_legolas', 'lo_tauriel', 'lo_thranduil'], th:[2, 3], tx:['Archers sylvestres : au début du combat, chacun inflige 2 dégâts à un ennemi.', 'En plus, leurs attaques touchent aussi un autre ennemi.'] },
  { id:'lo_mordor', n:'L’armée du Mordor', m:['lo_gothmog', 'lo_troll', 'lo_orque', 'lo_bouche'], th:[2, 3], tx:['+2/+2 en combat.', 'En plus, 2 Snagas rejoignent chaque combat.'] },
  { id:'lo_hobbits', n:'Les quatre Hobbits', m:['lo_frodon', 'lo_sam', 'lo_merry', 'lo_pippin'], th:[3, 4], tx:['Plus coriaces qu’ils n’en ont l’air : +0/+3 en combat, et chaque coup reçu leur fait 1 dégât de moins.', 'En plus, Réincarnation.'] },
  { id:'lo_alliance', n:'La Dernière Alliance', m:['lo_isildur', 'lo_elrond', 'lo_gilgalad'], th:[2, 3], tx:['+3/+3 en combat.', 'En plus, 4 dégâts à tous les ennemis au début du combat.'] },
  { id:'lo_lorien', n:'Les gardiens de la Lórien', m:['lo_haldir', 'lo_archer', 'lo_galadriel'], th:[2, 3], tx:['Capes elfiques : Camouflage à chaque combat.', 'En plus, Galadriel inflige 2 dégâts à 3 ennemis au début du combat.'] },
  { id:'lo_meute', n:'La meute d’Isengard', m:['lo_sharku', 'lo_warg', 'lo_pisteur'], th:[2, 3], tx:['+2 ATQ en combat.', 'En plus, Furie des vents.'] },
  { id:'lo_ungol', n:'Cirith Ungol', m:['lo_arachne', 'lo_gollum'], th:[2], tx:['« Elle a toujours faim » : Arachne vise toujours l’ennemi le plus faible et gagne +3 ATQ en combat.'] },
  { id:'lo_ents', n:'Les Ents et les Hobbits', m:['lo_sylvebarbe', 'lo_merry', 'lo_pippin'], th:[2, 3], tx:['Sylvebarbe gagne +4/+4 en combat.', 'La dernière marche des Ents : un Ent rejoint chaque combat.'] },
  { id:'lo_azbo', n:'Azog et Bolg', m:['lo_azog', 'lo_bolg'], th:[2], tx:['La lignée du Profanateur : +3/+3 en combat.'] },
  { id:'lo_gobs', n:'Les profondeurs de la Moria', m:['lo_gobelin', 'lo_grandgob', 'lo_fleau'], th:[2, 3], tx:['Les tambours : 2 Snagas rejoignent chaque combat.', 'En plus, le Balrog inflige 3 dégâts à tous les ennemis au début du combat.'] },
  { id:'lo_est', n:'Les armées de l’Est et du Sud', m:['lo_oriental', 'lo_haradrim', 'lo_suladan', 'lo_trollg'], th:[2, 3], tx:['+2/+2 en combat.', 'En plus, Riposte : 2 dégâts à ceux qui les attaquent.'] },
  { id:'lo_harad', n:'Les Suderons', m:['lo_suladan', 'lo_bouche'], th:[2], tx:['Les Mûmakil de Suladân gagnent +3/+3 en combat.'] },
];
NK_GROUPS.push(...LO_GROUPS);
function loGroupsEot(G, p, H0) {
  const { lv, gx, all, kw, name } = H0, mem = id => nkMem(p, id), tmp = (id, a, h, f) => mem(id).forEach(m => nkTmp(m, a, h, f || '', name(id)));
  if (lv('lo_frodsam')) { p.bd.filter(m => m.c === 'lo_frodon').forEach(m => nkTmp(m, 0, 4, '', name('lo_frodsam'))); gx('lo_frodsam', 'lo_sam', { k:'die_inherit', card:'lo_frodon' }); }
  if (lv('lo_merpip')) withSrc(name('lo_merpip'), () => mem('lo_merpip').forEach(m => buff(m, mult(m), mult(m))));
  if (lv('lo_leggim')) all('lo_leggim', { k:'atk_self', a:2, h:0 });
  if (lv('lo_trois')) kw('lo_trois', 'w');
  if (lv('lo_aragarw')) gx('lo_aragarw', 'lo_aragorn', { k:'immortal', card:'lo_arwen', n:1 });
  if (lv('lo_mages')) all('lo_mages', { k:'soc_dmg', d:4, n:1 });
  if (lv('lo_eorl')) { tmp('lo_eorl', 2, 2); if (lv('lo_eorl') > 1) all('lo_eorl', { k:'soc_first', x:2 }); }
  if (lv('lo_intend')) { tmp('lo_intend', 0, 4); if (lv('lo_intend') > 1) all('lo_intend', { k:'riposte', d:2 }); }
  if (lv('lo_eowmer')) all('lo_eowmer', { k:'soc_first', x:2 }, { k:'pierce' });
  if (lv('lo_conseil')) { const g = mem('lo_conseil')[0]; if (g) g.gx = (g.gx || []).concat([{ k:'soc_genj', who:'top', n:1, src:name('lo_conseil') }]); if (lv('lo_conseil') > 1) kw('lo_conseil', 's'); }
  if (lv('lo_cie')) { const k = lv('lo_cie'); tmp('lo_cie', 2 * k, 2 * k, k > 2 ? 'r' : ''); }
  if (lv('lo_nazgul')) { kw('lo_nazgul', 'c'); all('lo_nazgul', { k:'soc_genj', who:'face', n:1 }); }
  if (lv('lo_main')) gx('lo_main', 'lo_grima', { k:'soc_chill', a:1, n:7 });
  if (lv('lo_uruk')) tmp('lo_uruk', 3, 3, lv('lo_uruk') > 1 ? 'w' : '');
  if (lv('lo_guide')) kw('lo_guide', 'c');
  if (lv('lo_foret')) { all('lo_foret', { k:'soc_dmg', d:2, n:1 }); if (lv('lo_foret') > 1) all('lo_foret', { k:'chain' }); }
  if (lv('lo_mordor')) { tmp('lo_mordor', 2, 2); if (lv('lo_mordor') > 1) { const g = mem('lo_mordor')[0]; if (g) g.gx = (g.gx || []).concat([{ k:'soc_summon', card:'tl_snaga', n:2, src:name('lo_mordor') }]); } }
  if (lv('lo_hobbits')) { tmp('lo_hobbits', 0, 3, lv('lo_hobbits') > 1 ? 'r' : ''); all('lo_hobbits', { k:'armor', d:1 }); }
  if (lv('lo_alliance')) { tmp('lo_alliance', 3, 3); if (lv('lo_alliance') > 1) { const g = mem('lo_alliance')[0]; if (g) g.gx = (g.gx || []).concat([{ k:'soc_aoe', d:4, src:name('lo_alliance') }]); } }
  if (lv('lo_lorien')) { kw('lo_lorien', 'c'); if (lv('lo_lorien') > 1) gx('lo_lorien', 'lo_galadriel', { k:'soc_dmg', d:2, n:3 }); }
  if (lv('lo_meute')) tmp('lo_meute', 2, 0, lv('lo_meute') > 1 ? 'w' : '');
  if (lv('lo_ungol')) { p.bd.filter(m => m.c === 'lo_arachne').forEach(m => nkTmp(m, 3, 0, '', name('lo_ungol'))); gx('lo_ungol', 'lo_arachne', { k:'tgt_weak' }); }
  if (lv('lo_ents')) { p.bd.filter(m => m.c === 'lo_sylvebarbe').forEach(m => nkTmp(m, 4, 4, '', name('lo_ents'))); if (lv('lo_ents') > 1) gx('lo_ents', 'lo_sylvebarbe', { k:'soc_summon', card:'tl_ent', n:1 }); }
  if (lv('lo_azbo')) tmp('lo_azbo', 3, 3);
  if (lv('lo_gobs')) { const g = mem('lo_gobs')[0]; if (g) g.gx = (g.gx || []).concat([{ k:'soc_summon', card:'tl_snaga', n:2, src:name('lo_gobs') }]); if (lv('lo_gobs') > 1) gx('lo_gobs', 'lo_fleau', { k:'soc_aoe', d:3 }); }
  if (lv('lo_est')) { tmp('lo_est', 2, 2); if (lv('lo_est') > 1) all('lo_est', { k:'riposte', d:2 }); }
  if (lv('lo_harad')) p.bd.filter(m => m.c === 'tl_mumak').forEach(m => nkTmp(m, 3, 3, '', name('lo_harad')));
}
const NK_GOF = {}; NK_GROUPS.forEach(g => g.m.forEach(c => (NK_GOF[c] = NK_GOF[c] || []).push(g)));
const NK_BEAST = { nk_jiraiya:'tk_gamabunta', nk_tsunade:'tk_katsuyu', nk_orochimaru:'tk_manda' };
// palier atteint par chaque groupe (0 = inactif) : nombre de membres différents présents sur le plateau
function nkLv(p) { const on = new Set(((p && p.bd) || []).map(m => m.c)), o = {}; NK_GROUPS.forEach(g => { const n = g.m.filter(c => on.has(c)).length; let l = 0; g.th.forEach((t, i) => { if (n >= t) l = i + 1; }); if (n >= 1) o[g.id] = { l, n }; }); return o; }
const nkOn = (p, id) => ((nkLv(p)[id] || {}).l) || 0;
const nkMem = (p, id) => { const g = NK_GROUPS.find(x => x.id === id); return p.bd.filter(m => g.m.includes(m.c)); };
function nkTmp(m, a, h, f, src) { const t = m.tmp || {}; let ff = t.f || ''; for (const c of (f || '')) if (!has(m, c) && !ff.includes(c)) ff += c; m.tmp = { a:(t.a || 0) + a * mult(m), h:(t.h || 0) + h * mult(m), f:ff, s:t.s || src }; }
// effets de combat propres à une carte (hors jutsu), pour les copier d'un épéiste à l'autre
const nkSword = c => (CD(c).fxAll || []).filter(e => e.k !== 'jutsu' && ET[e.k] && ['pas', 'atk', 'aft', 'soc', 'dr', 'surv'].includes(ET[e.k].tr) && e.k !== 'soc_copyfx' && e.k !== 'guard');
// fin de tour : effets des groupes. m.gx = effets ajoutés pour le prochain combat seulement (retirés après)
function nkGroupsEot(G, p) {
  const L = nkLv(p), lv = id => (L[id] || {}).l || 0, name = id => NK_GROUPS.find(x => x.id === id).n;
  const by = c => p.bd.filter(m => m.c === c), gx = (id, c, ...e) => by(c).forEach(m => { m.gx = (m.gx || []).concat(e.map(o => Object.assign({ src:name(id) }, o))); });
  const all = (id, ...e) => nkMem(p, id).forEach(m => { m.gx = (m.gx || []).concat(e.map(o => Object.assign({ src:name(id) }, o))); });
  const kw = (id, f, only) => nkMem(p, id).filter(m => !only || only.includes(m.c)).forEach(m => nkTmp(m, 0, 0, f, name(id)));
  p.bd.forEach(m => { delete m.gx; });
  if (loOn(G)) { loGroupsEot(G, p, { lv, gx, all, kw, name }); return; }
  if (lv('immortels')) { gx('immortels', 'nk_hidan', { k:'immortal', card:'nk_kakuzu', n:2 }); gx('immortels', 'nk_kakuzu', { k:'immortal', card:'nk_hidan', n:2 }); }
  if (lv('artistes')) { gx('artistes', 'nk_deidara', { k:'dr2' }); gx('artistes', 'nk_sasori', { k:'pup_r' }); }
  if (lv('itakisa')) { all('itakisa', { k:'tgt_top' }); gx('itakisa', 'nk_kisame', { k:'atk_drain', n:3 }); gx('itakisa', 'nk_itachi', { k:'hit_genj' }); }
  if (lv('anges')) { gx('anges', 'nk_konan', { k:'guard', card:'nk_pain', n:1 }); gx('anges', 'nk_pain', { k:'die_aoe', card:'nk_konan', d:3 }); }
  if (lv('espions')) { kw('espions', 'c'); all('espions', { k:'camo_keep' }); withSrc(name('espions'), () => nkMem(p, 'espions').forEach(m => buff(m, 0, mult(m)))); }
  if (lv('demon')) { gx('demon', 'nk_zabuza', { k:'die_rage', card:'nk_haku' }); kw('demon', 's', ['nk_haku']); all('demon', { k:'soc_self', a:3, h:3 }); }
  if (lv('uchiha')) { gx('uchiha', 'nk_itachi', { k:'die_inherit', card:'nk_sasuke' }); gx('uchiha', 'nk_sasuke', { k:'die_inherit', card:'nk_itachi' }); }
  if (lv('md1')) gx('md1', 'nk_naruto', { k:'soc_face', d:8 }, { k:'die_tf', card:'nk_jiraiya' });
  if (lv('md2')) gx('md2', 'nk_lee', { k:'follow', card:'nk_gai' });
  if (lv('md3')) gx('md3', 'nk_kabuto', { k:'soc_edo' });
  if (lv('md4')) all('md4', { k:'heal2' });
  if (lv('md5') && p.bd.length < 7) by('nk_konohamaru').slice(0, 1).forEach(m => withSrc(name('md5'), () => nkClone(p, m, 1)));
  if (lv('ombre')) { gx('ombre', 'nk_temari', { k:'x3bound' }); gx('ombre', 'nk_shikamaru', { k:'soc_bind', who:'face' }); }
  if (lv('chiyo')) gx('chiyo', 'nk_chiyo', { k:'soc_summon', card:'tk_pere', n:1 }, { k:'soc_summon', card:'tk_mere', n:1 });
  if (lv('inoshika')) { all('inoshika', { k:'soc_self', a:2, h:2 }); if (lv('inoshika') > 1) gx('inoshika', 'nk_shikamaru', { k:'soc_bind', who:'top' }, { k:'soc_weaktop', a:5 }); }
  if (lv('kumo')) all('kumo', { k:'soc_strike' });
  if (lv('kage')) { p.ck = Math.min(ckMax(p), (p.ck || 0) + 2); if (lv('kage') > 1) p.bd.forEach(m => { m.gx = (m.gx || []).concat([{ k:'imm', src:name('kage') }]); }); if (lv('kage') > 2) all('kage', { k:'soc_strike' }); }
  if (lv('sannin')) nkMem(p, 'sannin').forEach(m => { m.gx = (m.gx || []).concat([{ k:'soc_summon', card:NK_BEAST[m.c], n:1, g:lv('sannin') > 1 ? 1 : 0, src:name('sannin') }]); });
  if (lv('fratrie')) { kw('fratrie', 's'); if (lv('fratrie') > 1) all('fratrie', { k:'fr3' }); }
  if (lv('gai')) { all('gai', { k:'atk_self', a:5, h:0 }, { k:'soc_self', a:0, h:4 }); if (lv('gai') > 1) { kw('gai', 'w'); all('gai', { k:'soc_first', x:2 }); } }
  if (lv('jinchu')) { if ((p.hp || 0) < 15) nkMem(p, 'jinchu').forEach(m => doNkTf(G, p, m, true)); if (lv('jinchu') > 1) nkMem(p, 'jinchu').slice(0, 1).forEach(m => { m.gx = (m.gx || []).concat([{ k:'soc_aoe', d:3, src:'Bijūdama' }]); }); }
  if (lv('equipe7')) { const k = lv('equipe7'); all('equipe7', { k:'atk_team', a:3, h:3 });
    if (k > 1) by('nk_kakashi').forEach(m => { nkMem(p, 'equipe7').filter(x => x.c !== 'nk_kakashi').forEach(x => { const J = jutOf(x); if (J) m.gx = (m.gx || []).concat(jutCb(J, x.tf).map(o => Object.assign({ src:'Sharingan' }, o))); }); });
    if (k > 2) { gx('equipe7', 'nk_naruto', { k:'follow', card:'nk_sasuke' }); gx('equipe7', 'nk_sasuke', { k:'follow', card:'nk_naruto' }); kw('equipe7', 'i', ['nk_naruto', 'nk_sasuke']); } }
  if (lv('son')) { const k = lv('son'), v = k > 2 ? 10 : 5; all('son', { k:'surv_once', a:v, h:v }); if (k > 1) all('son', { k:'rip_burn', d:3 }); if (k > 2) kw('son', 'r'); }
  if (lv('epees')) { const k = lv('epees'), sw = nkMem(p, 'epees'); kw('epees', 'c'); sw.forEach(m => nkTmp(m, 3, 3, '', name('epees')));
    if (k > 1) sw.forEach((m, i) => { const nx = sw[(i + 1) % sw.length]; if (nx !== m && nx.c !== m.c) m.gx = (m.gx || []).concat(nkSword(nx.c).map(o => Object.assign({ src:CD(nx.c).n }, o))); });
    if (k > 2) sw.forEach((m, i) => { const pv = sw[(i - 1 + sw.length) % sw.length]; if (pv !== m && pv.c !== m.c) m.gx = (m.gx || []).concat([{ k:'follow', card:pv.c, src:name('epees') }]); }); }
}
// Clone : copie 1/1 du ninja, avec ses mots-clés
function nkClone(p, m, n, full) { for (let i = 0; i < n && p.bd.length < 7; i++) { const c = mk('tk_kclone', m.g); c.f = m.f || ''; c.of = m.c; { const rl = fxOf(m, 'atk').map(e => Object.assign({}, e)); if (rl.length) c.x = (c.x || []).concat(rl); }   /* le Clone garde aussi le Ralliement de l'original */ if (full) { c.a = m.a; c.h = m.h; } p.bd.splice(p.bd.indexOf(m) + 1, 0, c); } }
// ----- combat : aides des mots-clés Naruto -----
const nkHas = (m, k) => !!m && !m.sld && fxOf(m, 'pas').some(e => e.k === k);
const nkVal = (m, k, f = 'd') => (!m || m.sld) ? 0 : fxOf(m, 'pas').filter(e => e.k === k).reduce((t, e) => t + (e[f] || 0) * mult(m), 0);
const nkFace = (S, s, m) => { const al = S.sides[s], en = S.sides[1 - s].filter(x => x.h > 0); if (!en.length) return null; return en[Math.min(Math.max(0, al.indexOf(m)), en.length - 1)]; };
const nkTop = (S, s) => S.sides[1 - s].filter(x => x.h > 0).sort((a, b) => (b.a + b.h) - (a.a + a.h))[0] || null;
const nkWho = (S, s, m, who) => who === 'top' ? nkTop(S, s) : nkFace(S, s, m);
// un serviteur entravé ne peut pas attaquer tant que son geôlier est en vie
function nkBound(S, s, m) { if (!m.ent) return false; const j = S.sides[1 - s].find(x => x.u === m.ent && x.h > 0); if (!j) { delete m.ent; return false; } return true; }
// choix de la cible : le plus faible (Assassinat silencieux), le plus fort (Chasseurs), sinon au hasard ; puis un garde du corps peut s'interposer
function nkPick(S, s, att, pool) {
  let t;
  if (nkHas(att, 'tgt_weak')) t = pool.slice().sort((a, b) => a.h - b.h)[0];
  else if (nkHas(att, 'tgt_top')) t = pool.slice().sort((a, b) => (b.a + b.h) - (a.a + a.h))[0];
  else t = pool[Math.floor(S.rng() * pool.length)];
  const g = S.sides[1 - s].find(x => x !== t && x.h > 0 && !x.sld && fxOf(x, 'pas').some(e => e.k === 'guard' && e.card === t.c && (x.gdn || 0) < e.n));
  if (g) { g.gdn = (g.gdn || 0) + 1; t = g; }
  return t;
}
// après les dégâts d'une attaque : riposte, brûlure, scellement, vol, coéquipiers qui ripostent
function nkAfterHit(S, s, att, tgt) {
  const rp = nkVal(tgt, 'riposte'); if (rp && att.h > 0) simDamage(S, att, rp, null);
  const rb = nkVal(tgt, 'rip_burn'); if (rb && att.h > 0) att.brn = Math.max(att.brn || 0, rb);
  const bn = nkVal(att, 'burn'); if (bn && tgt.h > 0) tgt.brn = Math.max(tgt.brn || 0, bn);
  if (tgt.h > 0 && nkHas(att, 'hit_seal')) nkSeal(tgt);
  if (tgt.h > 0 && nkHas(att, 'hit_genj') && !nkHas(tgt, 'imm')) tgt.gj = Math.max(tgt.gj || 0, 1);
  if (tgt.h > 0 && att.h > 0) fxOf(att, 'pas').filter(e => e.k === 'hit_steal').forEach(e => { const k = mult(att), a = Math.min(tgt.a, e.a * k), h = Math.min(tgt.h - 1, e.h * k); if (a > 0) { tgt.a -= a; att.a += a; } if (h > 0) { tgt.h -= h; att.h += h; } });
  if (nkHas(tgt, 'fr3') && att.h > 0) S.sides[1 - s].filter(x => x !== tgt && x.h > 0 && nkHas(x, 'fr3')).forEach(x => { if (att.h > 0) simDamage(S, att, x.a, x); });
  if (tgt.h <= 0 && att.h > 0) fxOf(att, 'kill').forEach(e => runCombat(S, s, att, e, 0, tgt));
}
function nkSeal(t) { if (!t || nkHas(t, 'imm')) return; t.f = ''; t.sld = 1; delete t.jp; }
// une frappe hors tour (coéquipier qui enchaîne, Kage avant le combat)
function nkStrike(S, s, x, tgt) {
  const en = S.sides[1 - s]; if (!tgt || tgt.h <= 0 || !en.includes(tgt)) { const o = en.filter(y => y.h > 0); if (!o.length) return; tgt = o[Math.floor(S.rng() * o.length)]; }
  S.frames.push({ s:snap(S), at:x.u, tg:tgt.u }); const xa = x.a, ta = tgt.a; simDamage(S, tgt, xa, x); if (!has(x, 'i')) simDamage(S, x, ta, tgt); nkAfterHit(S, s, x, tgt);
}
// après l'attaque : soins, brûlure subie, attaques enchaînées
function nkAfterAttack(S, s, att, tgt) {
  const arr = S.sides[s];
  if (att.h > 0 && arr.includes(att)) fxOf(att, 'aft').forEach(e => runCombat(S, s, att, e, 0, tgt));
  if (att.h > 0 && att.brn) simDamage(S, att, att.brn, null);
  if (!S._fw) { S._fw = 1; for (const x of arr.slice()) if (x !== att && x.h > 0 && x.a > 0 && !x.sld && arr.includes(x) && fxOf(x, 'pas').some(e => e.k === 'follow' && e.card === att.c)) { nkStrike(S, s, x, tgt); simDeaths(S, s); } S._fw = 0; }
}
// retours à la vie propres à Naruto : Immortel (tant que le partenaire vit) et les Cinq cœurs de Kakuzu
function nkRevive(S, s, d, pos) {
  const arr = S.sides[s]; if (arr.length >= 7 || d.sld) return false;
  const im = fxOf(d, 'pas').find(e => e.k === 'immortal' && (d.imn || 0) < e.n && arr.some(x => x.c === e.card && x.h > 0));
  const lv = !im && fxOf(d, 'pas').find(e => e.k === 'lives' && (d.lvn || 0) < e.n);
  if (!im && !lv) return false;
  const nm = simSummon(S, s, pos, d.c, d.g); if (!nm) return false;
  nm.f = d.f || ''; nm.ou = d.ou || d.u; if (d.x) nm.x = d.x.slice(); nm.tf = d.tf; nm.rb = d.rb; nm.hm = d.hm; nm.imn = d.imn || 0; nm.lvn = d.lvn || 0; nm.a0 = d.a0 || d.a;
  if (im) { nm.imn++; nm.a = d.a; nm.h = 1; } else { nm.lvn++; const q = Math.pow(0.75, nm.lvn); nm.a = Math.max(1, Math.ceil(nm.a0 * q)); nm.h = Math.max(1, Math.ceil((d.hm || 1) * q)); }
  return true;
}
// l'IA : se transforme dès qu'elle le peut, sinon lance ses jutsus du plus cher au moins cher en gardant de quoi se transformer
function botJutsus(G, p) {
  for (let g = 0; g < 7; g++) { const m = p.bd.find(x => nkTfCost(p, x) != null && (p.ck || 0) >= nkTfCost(p, x)); if (!m || !doNkTf(G, p, m)) break; }
  const want = Math.min(...p.bd.map(x => nkTfCost(p, x)).filter(c => c != null), 99), save = want <= 10 && p.bd.length >= 4 ? want : 0;
  p.bd.slice().sort((a, b) => tierOf(b) - tierOf(a)).forEach(m => { const c = jutCost(p, m); if (c != null && !jutBlock(G, p, m) && ((p.ck || 0) - c >= save || (p.ck || 0) >= 10)) doJutsu(G, p, m); });
}
function giveGem(p, n) { for (let i = 0; i < n; i++) if (p.hd.length < 10) { p.hd.push({ sp:GEM, u:UID++ }); handIn(p); } }
function putGem(G, p, m) { if (!m) return; withSrc('Gemme de sang', () => buff(m, 1 + (p.gemA || 0), 1 + (p.gemH || 0))); qAdd(p, 'gems'); }
function giveCraft(p, m, e) { if (p.hd.length < 10 && SPELLS[e.sp]) p.hd.push({ sp:e.sp, u:UID++, tmpc:1, free:1, src:m.u }); }
// Engloutir : retire un serviteur de la taverne et ajoute ses caractéristiques
function devour(G, p, m, k) { const o = p.sh.filter(x => !x.sp); if (!o.length) return false; const v = pickR(o); p.sh.splice(p.sh.indexOf(v), 1); toPool(G, v); withSrc('Engloutir · ' + CD(v.c).n, () => buff(m, v.a * k, v.h * k)); qAdd(p, 'devours'); p.bd.slice().forEach(x => fxOf(x, 'dev').forEach(e => runRecruit(G, p, x, e, m))); return true; }
function handIn(p) { const G = typeof H !== 'undefined' ? H.G : null; if (!G || p._hin) return; p._hin = 1; try { p.bd.slice().forEach(x => fxOf(x, 'hand').forEach(e => runRecruit(G, p, x, e))); } finally { delete p._hin; } }
function giveDonut(p, n) { for (let i = 0; i < n; i++) if (p.hd.length < 10) { p.hd.push({ sp:DON, u:UID++ }); handIn(p); } }
function putDonut(G, p, m, played) {
  if (!m) return;
  withSrc('Donut', () => buff(m, 1 + (p.donA || 0), 1 + (p.donH || 0))); qAdd(p, 'donuts');
  fxOf(m, 'don').forEach(e => runRecruit(G, p, m, e));
  if (played) p.bd.slice().forEach(x => fxOf(x, 'donc').forEach(e => runRecruit(G, p, x, e, m)));
}
// or dépensé dans le tour : les compteurs « chaque fois que tu as dépensé N or » avancent
function spent(G, p, n) { if (n > 0) p.bd.slice().forEach(m => fxOf(m, 'spend').forEach(e => { m.spc = (m.spc || 0) + n; while (m.spc >= e.n) { m.spc -= e.n; runRecruit(G, p, m, e); } })); }
function discTier(G, p, t) { DRAWP = p; const opts = []; for (let i = 0; i < 3; i++) { const c = drawOne(G, 6, t) || drawAny(t); if (c) opts.push(c); } if (opts.length) p.disc = opts; }
// ----- univers South Park : cohésion de groupe -----
// famille « de cohésion » d'un serviteur : sa tribu, ou celle qu'on lui a donnée (converti) ; '*' = compte pour toutes les familles
const famOf = m => m.fam || tribe(m);
const sameFam = (a, b) => !!a && !!b && (a.fam === '*' || b.fam === '*' || (famOf(a) !== 'neu' && famOf(a) === famOf(b)));
const famOk = (m, tb) => !tb || famOf(m) === tb || m.fam === '*';
// voisins directs de la même famille (0, 1 ou 2)
const nbFam = (bd, i) => (sameFam(bd[i], bd[i - 1]) ? 1 : 0) + (sameFam(bd[i], bd[i + 1]) ? 1 : 0);
// famille d'une suite de voisins (la plus présente hors jokers)
function bandFam(run) { const n = {}; run.forEach(m => { if (m.fam !== '*') n[famOf(m)] = (n[famOf(m)] || 0) + 1; }); const ks = Object.keys(n).sort((a, b) => n[b] - n[a]); return ks[0] || famOf(run[0]); }
// bandes activées : suites d'au moins 3 voisins de la même famille → [{ s, e, tb }]
function bandsOf(bd) { const out = []; let s = 0; for (let i = 1; i <= bd.length; i++) if (i === bd.length || !sameFam(bd[i - 1], bd[i])) { if (i - s >= 3) out.push({ s, e:i - 1, tb:bandFam(bd.slice(s, i)) }); s = i; } return out; }
// effet de bande de chaque famille (texte court et texte complet)
const BAND_FX = {
  s_gin:['+1/+1 par autre Ginger ou sectaire allié', 'Bande de Gingers : chaque membre gagne +1/+1 par autre Ginger ou sectaire allié (toute la rangée).'],
  s_adu:['+0/+3 et 1 or au prochain tour', 'Réunion de parents : la bande gagne +0/+3 et tu gagnes 1 or au début du prochain tour.'],
  s_got:['Venimosité', 'Cercle gothique : la bande gagne Venimosité (détruit le premier serviteur qu\'elle blesse).'],
  s_cel:['Bouclier divin', 'Tapis rouge : la bande gagne Bouclier divin.'],
  s_ani:['Réincarnation', 'Meute : la bande gagne Réincarnation.'],
};
const bandTx = tb => (BAND_FX[tb] || ['', ''])[1] || `Bande de ${tribePl(tb)}.`;
// nombre de serviteurs de la famille la plus présente, et cette famille
function mainFam(bd) { const n = {}; bd.forEach(m => { const f = famOf(m); if (f !== 'neu' && m.fam !== '*') n[f] = (n[f] || 0) + 1; }); const ks = Object.keys(n).sort((a, b) => n[b] - n[a]); return ks.length ? { tb:ks[0], n:n[ks[0]] } : { tb:null, n:0 }; }
// regroupe le plateau par famille (les plus nombreuses d'abord, ordre conservé à l'intérieur ; les jokers rejoignent la plus grande)
function regroupFam(bd) { if (bd.length < 2) return bd; const g = {}, order = []; bd.forEach(m => { const f = m.fam === '*' ? '*' : famOf(m); if (!g[f]) { g[f] = []; order.push(f); } g[f].push(m); }); const ks = order.filter(f => f !== '*' && f !== 'neu').sort((a, b) => g[b].length - g[a].length); const out = []; ks.forEach((f, i) => { out.push(...g[f]); if (i === 0 && g['*']) out.push(...g['*']); }); if (!ks.length && g['*']) out.push(...g['*']); if (g.neu) out.push(...g.neu); bd.splice(0, bd.length, ...out); return bd; }
// loi « Cohésion de groupe » au combat : +1/+1 par voisin de la même famille, puis l'effet de chaque bande activée
function spCohesion(S, s) {
  const arr = S.sides[s]; if (!arr.length) return;
  const nb = arr.map((m, i) => nbFam(arr, i)); nb.forEach((n, i) => { if (n) buff(arr[i], n, n); });
  for (const b of bandsOf(arr)) { const run = arr.slice(b.s, b.e + 1);
    if (b.tb === 's_gin') run.forEach(m => { const n = arr.filter(x => x !== m && famOk(x, 's_gin')).length; if (n) buff(m, n, n); });
    else if (b.tb === 's_adu') { run.forEach(m => buff(m, 0, 3)); S.inc = S.inc || [0, 0]; S.inc[s] += 1; }
    else if (b.tb === 's_got') run.forEach(m => addF(m, 'n'));
    else if (b.tb === 's_cel') run.forEach(m => addF(m, 's'));
    else if (b.tb === 's_ani') run.forEach(m => addF(m, 'r'));
  }
}
// ----- univers Dragon Ball : ki, absorption, transformations, zenkai -----
const KI_MAX = 15;
// fusions Dragon Ball : deux personnages sur le plateau + du ki → une seule carte (stats additionnées + bonus)
const DB_FUS = [
  { id:'gogeta', a:'d_goku', b:'d_vegeta', r:'d_gogeta', c:5, bo:3, nm:'Danse de fusion' },
  { id:'vegetto', a:'d_goku', b:'d_vegeta', r:'d_vegetto', c:5, bo:3, nm:'Boucles Potara' },
  { id:'gotenks', a:'d_goten', b:'d_trunks', r:'d_gotenks', c:3, bo:2, nm:'Danse de fusion' },
  { id:'picnail', a:'d_piccolo', b:'d_nail', r:'d_piccolof', c:3, bo:2, nm:'Fusion namek' },
  { id:'pickami', a:'d_piccolo', b:'d_kami', r:'d_piccolof', c:3, bo:2, nm:'Fusion namek' },
];
const FUS_ONLY = ['d_gogeta', 'd_vegetto', 'd_gotenks'];   // nés d'une fusion : jamais en vente (Piccolo fusionné reste aussi achetable)
// partenaire de fusion d'un serviteur sur le plateau (le plus proche)
function fusPartner(p, m, F) { const o = F.a === m.c ? F.b : F.b === m.c ? F.a : null; if (!o) return null; const i = p.bd.indexOf(m); return p.bd.filter(x => x !== m && x.c === o).sort((x, y) => Math.abs(p.bd.indexOf(x) - i) - Math.abs(p.bd.indexOf(y) - i))[0] || null; }
const fusOpts = (p, m) => m ? DB_FUS.filter(F => fusPartner(p, m, F)) : [];
function doFusion(G, p, m, F) {
  const o = fusPartner(p, m, F); if (!o) return false;
  const i = Math.min(p.bd.indexOf(m), p.bd.indexOf(o)), g = m.g || o.g ? 1 : 0, nm = mk(F.r, g), k = g ? 2 : 1;
  nm.a = m.a + o.a; nm.h = m.h + o.h; nm.bn = (m.bn || []).concat(o.bn || []);
  for (const f of (m.f || '') + (o.f || '')) addF(nm, f);
  const x = (m.x || []).concat(o.x || []); if (x.length) nm.x = x;
  [m, o].forEach(v => { p.bd.splice(p.bd.indexOf(v), 1); toPool(G, v); });
  p.bd.splice(i, 0, nm);
  withSrc(F.nm + ' · ' + CD(F.r).n, () => buff(nm, F.bo * k, F.bo * k));
  qAdd(p, 'fusions'); checkTriple(G, p); return true;
}
const GINYU = ['d_guldo', 'd_recoome', 'd_burter', 'd_jeice'];
const pasN = (p, k) => (p.bd || []).reduce((s, m) => s + fxOf(m, 'pas').filter(e => e.k === k).reduce((a, e) => a + e.n * mult(m), 0), 0);
const kiCost = (p, S) => Math.max(0, (S.kc || 0) - pasN(p, 'pas_tkc') - ((htr(p, 'ptkc') || {}).n || 0));
function kiAdd(p, n) { p.ki = Math.min(KI_MAX, (p.ki || 0) + n); }
// absorber un serviteur : on récupère ses stats, ses mots-clés et ses effets (sauf ses absorptions, pour ne pas boucler)
function absorbInto(p, m, v, src) {
  if (!v || v === m) return; const i = p.bd.indexOf(v); if (i < 0) return;
  p.bd.splice(i, 1);
  const hb = htr(p, 'pab'), x = hb ? hb.n || 1 : 0;
  withSrc(src, () => buff(m, v.a + x, v.h + x));
  for (const f of v.f || '') addF(m, f);
  const fx = (CD(v.c).fxAll || []).filter(e => !['bc_namek', 'bc_absorb', 'tf'].includes(e.k)).concat(v.x || []);
  if (fx.length) m.x = (m.x || []).concat(fx.map(e => Object.assign({}, e, { src:(e.src || CD(v.c).n) })));
  m.abs = (m.abs || 0) + 1;
}
const tfOf = m => (CD(m.c).fxAll || []).find(e => e.k === 'tf');
function tfCost(p, m) { const T = tfOf(m); if (!T) return null; const st = T.st[m.tf || 0]; if (!st) return null; const ok = T.cond === 'colere' ? (p.dbDied || 0) > 0 : T.cond === 'defaite' ? p.dbRes === 'loss' : T.cond === 'victoire' ? p.dbRes === 'win' : false; const pt = htr(p, 'ptf'); return Math.max(0, st.c - (ok ? 2 : 0) - (pt ? pt.n || 1 : 0) - pasN(p, 'pas_tfc')); }
function doTransform(p, m) {
  const T = tfOf(m); if (!T) return false; const st = T.st[m.tf || 0]; if (!st) return false;
  const k = mult(m); m.tf = (m.tf || 0) + 1; m.tfn = st.nm;
  withSrc('Transformation · ' + st.nm, () => { buff(m, st.a * k, st.h * k); if (st.kw) addF(m, st.kw); });
  qAdd(p, 'tfs');
  p.bd.forEach(o => { if (o !== m) fxOf(o, 'tfo').forEach(e => runRecruit(H.G, p, o, e)); });
  return true;
}
// après chaque combat : Zenkai des Saiyans
function zenkaiAfter(p, lost, deadIds) {
  const zx = htr(p, 'pzk') ? (htr(p, 'pzk').x || 2) : 1;
  p.bd.forEach(m => (CD(m.c).fxAll || []).forEach(e => {
    const k = mult(m) * zx;
    if (e.k === 'zenkai') { let n = (lost ? 1 : 0) + (deadIds.includes(m.c) ? 1 : 0); if (n) withSrc('Zenkai', () => buff(m, e.a * k * n, e.h * k * n)); }
    if (e.k === 'zenkai_all' && lost) withSrc('Zenkai', () => p.bd.forEach(o => { if (o !== m && tribeOk(o, 'd_sai')) buff(o, e.a * k, e.h * k); }));
  }));
  const za = htr(p, 'pzkall'); if (za && lost) withSrc('Rage', () => p.bd.forEach(o => buff(o, za.a || 1, za.h || 1)));
}
// ----- univers Rick et Morty : fluide de portail, portails, Ricks et Mortys -----
const PF_MAX = 3;
const pfMax = p => PF_MAX;
function pfAdd(p, n) { p.pf = Math.min(pfMax(p), (p.pf || 0) + n); }
const isRM = m => /\b(Rick|Morty)\b/.test(CD(m.c).n || '');
// un serviteur passe le portail : il revient en variante de sa famille (niveau ±1), avec tous ses bonus
function doPortal(G, p, m, opt = {}) {
  const i = p.bd.indexOf(m); if (i < 0 || CD(m.c).tok || isComp(m)) return null;   // les jetons (Meeseeks, spores) ne passent pas le portail
  const t0 = tierOf(m), tb = tribe(m), dir = opt.up ? 1 : opt.down ? -1 : (Math.random() < 0.5 ? 1 : -1);
  const cl = t => Math.max(1, Math.min(6, t));
  const pick = tt => { for (let k = 0; k < 3; k++) { const c = drawOne(G, 6, tt, tb); if (!c) break; if (c.c !== m.c || k === 2) return c; toPool(G, c); } const ids = POOL_IDS.filter(id => C[id].tr === tb && C[id].t === tt && id !== m.c); return ids.length ? mk(pickR(ids), 0) : null; };
  const nm = pick(cl(t0 + dir)) || pick(cl(t0 - dir)) || pick(cl(t0)) || drawOne(G, 6, cl(t0 + dir)) || drawAny(cl(t0 + dir)); if (!nm) return null;
  const b0 = CD(m.c), k0 = m.g ? GOLD_K : 1, b1 = CD(nm.c);
  nm.a += Math.max(0, m.a - b0.a * k0); nm.h += Math.max(0, m.h - b0.h * k0);
  if (m.g) { nm.g = 1; nm.a += b1.a * 2; nm.h += b1.h * 2; }
  for (const f of m.f || '') if (!(b0.f || '').includes(f)) addF(nm, f);   // mots-clés gagnés (pas ceux de base de l'ancienne carte)
  if (m.x && m.x.length) nm.x = m.x.slice(); if (m.bn && m.bn.length) nm.bn = m.bn.slice(); if (m.tmp) nm.tmp = m.tmp;
  nm.por = (m.por || 0) + 1; nm.porOf = b0.n;
  toPool(G, m); p.bd[i] = nm;
  qAdd(p, 'portals');
  const w = htr(p, 'pport'); if (w) withSrc('Pouvoir de ' + HEROES[p.hero].n.split(' ')[0], () => buff(nm, w.a || 0, w.h || 0));
  p.bd.slice().forEach(o => { if (o !== nm) fxOf(o, 'portal').forEach(e => runRecruit(G, p, o, e, nm)); });
  checkTriple(G, p); return nm;
}
// ----- univers Ninja : sceaux, pacte, villages dominants -----
const PACT_AN = ['tk_toad', 'tk_slug', 'tk_snake', 'tk_shark'];
const isPact = m => PACT_AN.includes(m.c);
const NJ_KG = ['n_k1', 'n_k2', 'n_k3', 'n_k4', 'n_k5'];
const NJ_PACTM = ['n_p1', 'n_p2', 'n_p3'];
const isTok = m => C[m.c] && C[m.c].t === 0 && !isComp(m);
const hpw = p => (HEROES[p.hero] && HEROES[p.hero].pw) || {};
// un sceau : +1/+1 (+2/+2 avec Han) ; au 5e, le serviteur gagne Bouclier divin
function sealAdd(p, m, n) {
  if (!m) return; const v = htr(p, 'pseal') ? 2 : 1, s5 = htr(p, 'pseal5');
  for (let i = 0; i < n; i++) { m.sl = (m.sl || 0) + 1; qAdd(p, 'seals'); if (m.sl === 5) qAdd(p, 'seal5'); withSrc('Sceau', () => buff(m, v, v)); if (m.sl >= 5 && !m.slf) { m.slf = 1; addF(m, 's'); if (s5) withSrc('Sceau complet', () => buff(m, s5.a || 0, s5.h || 0)); } }
}
function pactSummon(p, id, after) {
  if (p.bd.length >= 7) return null; recruitSummon(p, id, 0, after); qAdd(p, 'pactSum');
  const nm = p.bd[after && p.bd.includes(after) ? p.bd.indexOf(after) + 1 : p.bd.length - 1];
  const w = htr(p, 'ppact') || {}; if (nm && nm.c === id && w.k) withSrc('Pouvoir de ' + HEROES[p.hero].n.split(' ')[0], () => buff(nm, w.a || 0, w.h || 0));
  return nm;
}
// villages les plus présents sur le plateau (pour remplir le réservoir avec un pouvoir de héros)
function domVils(p) {
  const n = {}; (p.bd || []).forEach(m => { const b = CD(m.c); [b.tr, b.tr2].forEach(t => { if (CLAN_EL[t]) n[t] = (n[t] || 0) + 1; }); });
  const ks = Object.keys(n).sort((a, b) => n[b] - n[a] || Math.random() - 0.5);
  const all = shuffle(Object.keys(CLAN_EL));
  return ks.concat(all.filter(t => !ks.includes(t)));
}
// ajoute un kekkei genkai de la réserve à la main
function kgCard(G, p) { if (p.hd.length >= 10) return false; const c = NJ_KG.filter(id => G.pool[id] > 0); const id = c.length ? pickR(c) : pickR(NJ_KG); if (G.pool[id] > 0) G.pool[id]--; p.hd.push(mk(id, 0)); return true; }
const fxOf = (m, tr) => { if (m.sld) return []; const b = CD(m.c).by[tr] || []; return m.x && m.x.length ? b.concat(m.x.filter(e => ET[e.k] && ET[e.k].tr === tr)) : b; };
// nombre de déclenchements : 1, ou 2 avec une aura (3 si l'aura est dorée) ; les auras ne se cumulent pas
function auraTimes(list, k) { let t = 1; for (const m of list) if (m.h > 0 && fxOf(m, 'aura').some(e => e.k === k)) t = Math.max(t, 1 + mult(m)); return t; }

/* =====================================================================
   COMBAT — entièrement déterministe à partir d'une graine : l'hôte et
   chaque joueur rejouent exactement le même combat.
   ===================================================================== */
function permBuff(S, s, x, a, h) { buff(x, a, h); const u = x.ou || x.u; S.perm = S.perm || [{}, {}]; const o = S.perm[s][u] = S.perm[s][u] || [0, 0]; o[0] += a; o[1] += h; }   // bonus « définitif » gagné en combat : reporté sur le vrai plateau
function simSummon(S, s, pos, id, g) {
  const arr = S.sides[s]; if (arr.length >= 7 || !C[id]) return null;
  const b = C[id]; const m = { c:id, a:b.a * (g ? GOLD_K : 1), h:b.h * (g ? GOLD_K : 1), g:g ? 1 : 0, f:b.f, u:S.uid++ };
  if (S.hx && S.hx[s] && b.tr === 'si_hor') m.a += S.hx[s];
  arr.splice(Math.min(pos, arr.length), 0, m); return m;
}
const sideOf = (S, m) => S.sides[0].includes(m) ? 0 : 1;
function runCombat(S, s, m, e, pos, ctx) {
  const k = mult(m), A = (e.a || 0) * k, Hh = (e.h || 0) * k, al = S.sides[s], en = S.sides[1 - s];
  const R = n => Math.floor(S.rng() * n);
  switch (e.k) {
    case 'dr_summon': for (let i = 0; i < e.n; i++) simSummon(S, s, pos, e.card, m.g); break;
    case 'dr_summon_rand': { const ids = POOL_IDS.filter(id => C[id].t <= e.tier && (!e.tb || C[id].tr === e.tb)); for (let i = 0; i < e.n && ids.length; i++) simSummon(S, s, pos, ids[R(ids.length)], m.g); break; }
    case 'atk_drain': if (ctx && ctx.h > 0) { const v = Math.min(ctx.a, e.n * k); ctx.a -= v; m.a += v; } else if (ctx) m.a += e.n * k; break;
    case 'kill_absorb': if (ctx && ctx.h <= 0) buff(m, A, Hh); break;
    case 'dr_buff_rand': { const o = al.filter(x => x.h > 0 && tribeOk(x, e.tb)); if (o.length) buff(o[R(o.length)], A, Hh); break; }
    case 'dr_buff_all': al.filter(x => x.h > 0 && tribeOk(x, e.tb)).forEach(x => buff(x, A, Hh)); break;
    case 'dr_dmg': case 'soc_dmg': { const o = en.filter(x => x.h > 0); for (let i = 0; i < (e.k === 'soc_dmg' && nkHas(m, 'wide') ? 99 : e.n) && o.length; i++) { const j = R(o.length); simDamage(S, o[j], e.d * k, null); o.splice(j, 1); } break; }
    case 'dr_kw': al.filter(x => x.h > 0 && tribeOk(x, e.tb)).forEach(x => addF(x, e.kw)); break;
    case 'soc_kw': al.filter(x => x !== m && tribeOk(x, e.tb)).forEach(x => addF(x, e.kw)); break;
    case 'soc_buff': al.filter(x => x !== m && tribeOk(x, e.tb)).forEach(x => buff(x, A, Hh)); break;
    case 'die_self': if (tribeOk(ctx, e.tb)) buff(m, A, Hh); break;
    case 'die_others': if (tribeOk(ctx, e.tb)) al.filter(x => x !== m && x.h > 0 && tribeOk(x, e.tb)).forEach(x => buff(x, A, Hh)); break;
    case 'surv_self': case 'atk_self': buff(m, A, Hh); break;
    case 'shield_buff': if (ctx && ctx.h > 0) buff(ctx, A, 0); break;
    case 'soc_self': buff(m, A, Hh); break;
    case 'soc_combo_dmg': if (al.some(x => x !== m && x.h > 0 && tribe(x) === e.tb2)) { const o = en.filter(x => x.h > 0); for (let i = 0; i < e.n && o.length; i++) { const j = R(o.length); simDamage(S, o[j], e.d * k, null); o.splice(j, 1); } } break;
    case 'soc_elements': { const n = elems(al); al.forEach(x => { if (x !== m && x.h > 0 && isSq(x)) buff(x, A * n, Hh * n); }); break; }
    case 'soc_chill': case 'soc_combo_chill': case 'soc_chill_el': {
      if (e.k === 'soc_combo_chill' && !al.some(x => x !== m && x.h > 0 && tribe(x) === e.tb2)) break;
      const o = en.filter(x => x.h > 0), amt = e.k === 'soc_chill_el' ? A * elems(al) : A;
      const tg = e.k === 'soc_chill_el' || e.n >= 7 ? o : (() => { const r = []; for (let i = 0; i < e.n && o.length; i++) r.push(o.splice(R(o.length), 1)[0]); return r; })();
      tg.forEach(x => { x.a = Math.max(0, x.a - amt); }); break;
    }
    case 'atk_zap': case 'atk_zap_el': {
      const o = en.filter(x => x.h > 0), n = e.k === 'atk_zap_el' ? elems(al) : e.n;
      for (let i = 0; i < n && o.length; i++) { const j = R(o.length); simDamage(S, o[j], e.d * k, null); o.splice(j, 1); } break;
    }
    case 'soc_self_el': { const n = elems(al); buff(m, A * n, Hh * n); break; }
    case 'soc_face': { const t = nkFace(S, s, m); if (t) simDamage(S, t, e.d * k, null); break; }
    case 'soc_weaktop': { const t = en.filter(x => x.h > 0).reduce((b, x) => !b || x.a + x.h > b.a + b.h ? x : b, null); if (t) t.a = Math.max(0, t.a - e.a * k); break; }
    case 'soc_plus1': m.pl1 = (m.pl1 || 0) + e.d * k; break;
    case 'soc_weak': (nkHas(m, 'wide') ? en.filter(x => x.h > 0) : [nkFace(S, s, m)].filter(Boolean)).forEach(t => { t.a = Math.max(0, t.a - e.a * k); }); break;
    case 'soc_steal': { const t = nkFace(S, s, m); if (t) { const a = Math.min(t.a, e.a * k), h = Math.min(Math.max(0, t.h - 1), e.h * k); t.a -= a; t.h -= h; buff(m, a, h); } break; }
    case 'soc_genj': { const t = nkWho(S, s, m, e.who); if (t && !nkHas(t, 'imm')) t.gj = (t.gj || 0) + e.n; break; }
    case 'soc_bind': { const t = nkWho(S, s, m, e.who); if (t && !nkHas(t, 'imm')) t.ent = m.u; break; }
    case 'soc_seal': nkSeal(nkWho(S, s, m, e.who)); break;
    case 'soc_copykw': { const t = nkFace(S, s, m); if (t) for (const c of (t.f || '')) if (!has(m, c)) m.f = (m.f || '') + c; break; }
    case 'soc_kwself': if (!has(m, e.kw)) m.f = (m.f || '') + e.kw; break;
    case 'soc_first': m.mul1 = Math.max(m.mul1 || 1, e.x); break;
    case 'soc_i1': m.i1 = 1; break;
    case 'soc_link': { const t = nkFace(S, s, m); if (t) m.link = t.u; break; }
    case 'soc_crush': { const t = nkFace(S, s, m); if (t && t.h < m.h) { remF(t, 's'); t.h = 0; } break; }
    case 'soc_kill_low': { const t = en.filter(x => x.h > 0).sort((a, b) => a.h - b.h)[0]; if (t) { remF(t, 's'); t.h = 0; } break; }
    case 'soc_summon': for (let i = 0; i < (e.n || 1); i++) { const nm = simSummon(S, s, al.indexOf(m) + 1, e.card, e.g || m.g); if (nm) { nm.hm = nm.h; if (nkHas(m, 'pup_r') && CD(e.card).tr === 'nk_sun') nm.f = (nm.f || '') + 'r'; fxOf(nm, 'soc').forEach(o => { if (o.k === 'soc_kwself') runCombat(S, s, nm, o); }); } } break;
    case 'soc_fill': for (let i = 0; i < 7 && al.length < 7; i++) { const nm = simSummon(S, s, al.length, e.card, m.g); if (nm) { nm.hm = nm.h; if (nkHas(m, 'pup_r')) nm.f = (nm.f || '') + 'r'; } } break;
    case 'soc_edo': if (m.edo && C[m.edo]) { const nm = simSummon(S, s, al.indexOf(m) + 1, m.edo, 0); if (nm) nm.hm = nm.h; } break;
    case 'soc_copyfx': al.filter(x => x !== m && x.c !== m.c && CD(x.c).tr === 'nk_kir').forEach(x => { m.x = (m.x || []).concat(nkSword(x.c).map(o => Object.assign({ src:CD(x.c).n }, o))); }); break;
    case 'soc_strike': if (m.a > 0 && en.some(x => x.h > 0)) nkStrike(S, s, m, null); break;
    case 'aft_heal': { const o = al.filter(x => x.h > 0 && (nkHas(m, 'heal2') || x.h < (x.hm || x.h))).sort((a, b) => (a.h - (a.hm || a.h)) - (b.h - (b.hm || b.h)))[0]; if (o) { const n = e.n * k * (nkHas(m, 'heal2') ? 2 : 1); o.h = nkHas(m, 'heal2') ? o.h + n : Math.min(o.hm || o.h, o.h + n); } break; }
    case 'aft_full': if (m.h < (m.hm || m.h)) m.h = m.hm; break;
    case 'aft_selfdmg': simDamage(S, m, e.d * k, null); break;
    case 'aft_shield': if (m.h > 0 && !has(m, 's')) m.f = (m.f || '') + 's'; break;
    case 'aft_burnout': m.bo = (m.bo || 0) + 1; if (m.bo >= e.n && m.h > 0) { remF(m, 's'); m.h = 0; } break;
    case 'soc_copyall': { const t = nkFace(S, s, m); if (t && !t.sld) { const fx = nkSword(t.c).concat((t.x || []).filter(o => ET[o.k] && ['pas', 'atk', 'aft', 'dr', 'surv'].includes(ET[o.k].tr) && o.k !== 'guard')); if (fx.length) m.x = (m.x || []).concat(fx.map(o => Object.assign({}, o, { src:'Double Sharingan' }))); } break; }
    case 'soc_aoe_if': if (al.some(x => x.c === e.card && x.h > 0)) en.filter(x => x.h > 0).forEach(x => simDamage(S, x, e.d * k, null)); break;
    case 'surv_regen': if (m.h > 0) m.h = Math.min(Math.max(m.hm || m.h, m.h), m.h + e.n * k); break;
    case 'surv_heal': al.filter(x => x !== m && x.h > 0 && x.h < (x.hm || x.h)).forEach(x => { x.h = Math.min(x.hm || x.h, x.h + e.n * k); }); break;
    case 'surv_split': { S.spl = S.spl || [0, 0]; if (S.spl[s] < e.n && al.length < 7) { S.spl[s]++; const nm = simSummon(S, s, al.indexOf(m) + 1, m.c, m.g); if (nm) { nm.a = m.a; nm.h = m.h; nm.hm = m.h; nm.f = m.f || ''; } } break; }
    case 'dr_summon2': for (let i = 0; i < e.n; i++) { const nm = simSummon(S, s, pos + i, e.card, m.g); if (nm) nm.hm = nm.h; } break;
    case 'dr_kill_tok': al.filter(x => e.cards.includes(x.c) && x.h > 0).forEach(x => { remF(x, 's'); x.h = 0; }); break;
    case 'aft_aoe': en.filter(x => x.h > 0).forEach(x => simDamage(S, x, e.d * k, null)); break;
    case 'die_swap': if (ctx && ctx !== m && !m.swp && m.h > 0 && ctx.c !== 'tk_kclone' && al.length < 7) { m.swp = 1; const nm = simSummon(S, s, al.indexOf(m), ctx.c, ctx.g); if (nm) { nm.a = ctx.a; nm.h = ctx.hm || nm.h; nm.hm = nm.h; nm.f = ctx.f || ''; if (ctx.x) nm.x = ctx.x.slice(); nm.ou = ctx.ou || ctx.u; nm.tf = ctx.tf; nm.rb = 1; remF(m, 'r'); remF(m, 's'); m.h = 0; } } break;
    case 'die_revive': if (ctx && ctx !== m && !m.rvd && m.h > 0 && al.length < 7) { m.rvd = 1; const nm = simSummon(S, s, al.indexOf(m) + 1, ctx.c, ctx.g); if (nm) { nm.hm = nm.h; nm.ou = ctx.ou || ctx.u; nm.rb = 1; } } break;
    case 'die_rage': if (ctx && ctx.c === e.card && !m.rgd) { m.rgd = 1; m.a *= 2; if (!has(m, 'w')) m.f = (m.f || '') + 'w'; } break;
    case 'die_inherit': if (ctx && ctx.c === e.card && !m.inh) { m.inh = 1; buff(m, ctx.a, ctx.hm || 1); for (const c of (ctx.f || '')) if (!has(m, c)) m.f = (m.f || '') + c; } break;
    case 'die_tf': if (ctx && ctx.c === e.card && !m.dtf) { const T = nkTfLock(m) ? null : tfSt(jutOf(m))[m.tf || 0]; if (T) { m.dtf = 1; m.tf = (m.tf || 0) + 1; buff(m, T.a * k, T.h * k); if (T.kw && !has(m, T.kw)) m.f = (m.f || '') + T.kw; (T.x || []).forEach(o => { if (ET[o.k] && ET[o.k].tr !== 'soc') (m.x = m.x || []).push(o); }); } } break;
    case 'die_aoe': if (ctx && ctx.c === e.card) en.filter(x => x.h > 0).forEach(x => simDamage(S, x, e.d * k, null)); break;
    case 'dr_twin': { const nm = simSummon(S, s, pos, e.card, m.g); if (nm) { nm.a = m.a; nm.h = m.hm || nm.h; nm.hm = nm.h; nm.f = (m.f || '').replace('r', ''); } break; }
    case 'kill_perm': { S.kp = S.kp || {}; const id = s + ':' + (m.ou || m.u); if (!S.kp[id]) { S.kp[id] = 1; permBuff(S, s, m, A, Hh); } break; }   // une seule fois par combat
    case 'atk_team': { const o = al.filter(x => x !== m && x.h > 0 && (NK_GOF[x.c] || []).some(g => g.id === 'equipe7')); if (o.length) buff(o[R(o.length)], A, Hh); break; }
    case 'surv_once': if (!m.so1) { m.so1 = 1; buff(m, A, Hh); } break;
    case 'soc_aoe': case 'dr_aoe': en.filter(x => x.h > 0).forEach(x => simDamage(S, x, e.d * k, null)); break;
    case 'soc_ginyu': { const n = al.filter(x => x !== m && (S.pre || x.h > 0) && GINYU.includes(x.c)).length; if (n) buff(m, A * n, Hh * n); break; }
    case 'soc_fire_tb': { const n = al.filter(x => (S.pre || x.h > 0) && tribeOk(x, 'n_feu')).length; for (let i = 0; i < n; i++) { const o = en.filter(x => x.h > 0); if (!o.length) break; simDamage(S, o[R(o.length)], (e.d || 1) * k, null); } break; }
    case 'soc_avalanche': { const o = en.filter(x => x.h > 0); if (o.length) simDamage(S, o[R(o.length)], Math.max(1, Math.floor((S.pre && m.h0 != null ? m.h0 : m.h) / 4)), m); break; }
    case 'soc_gate': { const d = Math.min(m.h - 1, (e.d || 0) * k); if (d > 0) m.h -= d; m.a += (e.a || 0) * k; break; }
    case 'soc_seal': { const o = en.filter(x => x.h > 0 && (x.f || '').length); for (let i = 0; i < (e.n || 1) * k && o.length; i++) { const t = o.splice(R(o.length), 1)[0]; t.f = ''; } break; }
    case 'soc_summon': { const at = al.indexOf(m); for (let i = 0; i < (e.n || 1); i++) simSummon(S, s, (at < 0 ? al.length : at) + 1 + i, e.card, m.g); break; }
    case 'soc_team': { const i = al.indexOf(m), L = al[i - 1], Rr = al[i + 1]; if (L && Rr && L.h > 0 && Rr.h > 0 && tribeOk(L, tribe(m)) && tribeOk(Rr, tribe(m))) [L, m, Rr].forEach(x => buff(x, A, Hh)); break; }
    case 'atk_buff_rand': { const o = al.filter(x => x !== m && x.h > 0); if (o.length) buff(o[R(o.length)], A, Hh); break; }
    // ----- Rick et Morty -----
    case 'soc_rm': { const n = al.filter(x => x !== m && (S.pre || x.h > 0) && isRM(x)).length; if (n) buff(m, A * n, Hh * n); break; }
    case 'soc_rm_all': al.forEach(x => { if (x !== m && (S.pre || x.h > 0) && isRM(x)) buff(x, A, Hh); }); break;
    case 'dr_pf': S.pf = S.pf || [0, 0]; S.pf[s] += e.n * k; break;
    // ----- South Park -----
    case 'soc_tribe_n': { const n = al.filter(x => x !== m && (S.pre || x.h > 0) && tribeOk(x, e.tb)).length; if (n) buff(m, A * n, Hh * n); break; }
    case 'soc_nb': { const n = nbFam(al, al.indexOf(m)); if (n) buff(m, A * n, Hh * n); break; }
    case 'soc_lone': if (!nbFam(al, al.indexOf(m))) buff(m, A, Hh); break;
    case 'duo': if (al.some(x => x !== m && (S.pre || x.h > 0) && x.c === e.card)) buff(m, A, Hh); break;
    case 'soc_rob': case 'gag_soc_rob': { const A2 = e.k === 'soc_rob' ? A : gagV(m, e.a, k), H2 = e.k === 'soc_rob' ? Hh : gagV(m, e.h, k); const o = en.filter(x => x.h > 0), tg = e.n >= 7 ? o : (() => { const r = []; for (let i = 0; i < e.n && o.length; i++) r.push(o.splice(R(o.length), 1)[0]); return r; })(); tg.forEach(x => { const va = Math.min(x.a, A2), vh = Math.min(Math.max(0, x.h - 1), H2); x.a -= va; x.h -= vh; buff(m, va, vh); }); if (e.k === 'gag_soc_rob') gagBump(null, m, S, s); break; }
    // ----- Les Simpson v2 -----
    case 'dr_donut': S.don = S.don || [0, 0]; S.don[s] += e.n * k; break;
    case 'dr_hand': S.hb = S.hb || [[], []]; S.hb[s].push([A, Hh]); break;
    case 'aatk_perm': if (ctx && tribeOk(ctx, e.tb)) al.filter(x => x.h > 0 && tribeOk(x, e.tb)).forEach(x => permBuff(S, s, x, A, Hh)); break;
    case 'shield_self': buff(m, A, Hh); break;
    case 'shield_gain': if (ctx !== m && !has(m, 's')) addF(m, 's'); break;
    case 'shield_perm': if (ctx && ctx.h > 0) permBuff(S, s, ctx, A, Hh); break;
    case 'die_avenge_dmg': m.av = (m.av || 0) + 1; if (m.av >= e.n) { m.av = 0; const o = en.filter(x => x.h > 0); if (o.length) simDamage(S, o.reduce((b, x) => x.h > b.h ? x : b), e.d * k, null); } break;
    case 'die_avenge_self': m.av = (m.av || 0) + 1; if (m.av >= e.n) { m.av = 0; permBuff(S, s, m, A, Hh); } break;
    case 'soc_reborn': { const o = al.filter(x => x !== m && (S.pre || x.h > 0) && tribeOk(x, e.tb) && !has(x, 'r')); for (let i = 0; i < k && o.length; i++) addF(o.splice(R(o.length), 1)[0], 'r'); break; }
    case 'reborn_perm': al.filter(x => x.h > 0 && tribeOk(x, e.tb)).forEach(x => permBuff(S, s, x, A, Hh)); break;
    case 'dr_tribe_atk': al.filter(x => x.h > 0 && tribeOk(x, e.tb)).forEach(x => buff(x, A, 0)); S.gl = S.gl || [{}, {}]; S.gl[s].horA = (S.gl[s].horA || 0) + A; if (S.hx) S.hx[s] += A; break;
    // ----- Les Simpson : gags récurrents (combat) -----
    case 'gag_soc_dmg': case 'gag_dr_dmg': { const d = gagV(m, e.d, k), o = en.filter(x => x.h > 0); for (let i = 0; i < (e.n || 1) && o.length; i++) { const j = R(o.length); simDamage(S, o[j], d, null); o.splice(j, 1); } gagBump(null, m, S, s); break; }
    case 'gag_dr_summon': { const n = (e.n || 1) + (m.gag || 0); for (let i = 0; i < n; i++) simSummon(S, s, pos + i, e.card, m.g); gagBump(null, m, S, s); break; }
    case 'gag_atk_self': buff(m, gagV(m, e.a, k), gagV(m, e.h, k)); gagBump(null, m, S, s); break;
    case 'gag_soc_taunt': { const A2 = gagV(m, e.a, k), H2 = gagV(m, e.h, k); al.forEach(x => { if ((S.pre || x.h > 0) && has(x, 't')) buff(x, A2, H2); }); gagBump(null, m, S, s); break; }
  }
}
function simDamage(S, m, n, src) {
  if (n <= 0 || m.h <= 0) return;
  { const ar = nkVal(m, 'armor'); if (ar) n = Math.max(1, n - ar); }
  if (has(m, 's')) { remF(m, 's'); const s = sideOf(S, m); S.sides[s].forEach(al => { if (al.h > 0) fxOf(al, 'shield').forEach(e => runCombat(S, s, al, e, 0, m)); }); return; }
  m.h -= n;
  if (m.link && !S._lk) { const t = S.sides[1 - sideOf(S, m)].find(x => x.u === m.link && x.h > 0); if (t) { S._lk = 1; simDamage(S, t, n, null); S._lk = 0; } }   // Rituel de Jashin
  if (src && has(src, 'l')) { const ss = sideOf(S, src); if (ss >= 0) { S.heal = S.heal || [0, 0]; S.heal[ss] += n; } }   // Vol de vie : les dégâts infligés soignent le héros
  if (src && has(src, 'v')) m.h = Math.min(m.h, 0);
  else if (src && has(src, 'n')) { m.h = Math.min(m.h, 0); remF(src, 'n'); }   // Venimosité : une seule fois
  if (m.h <= 0 && !m.crw && fxOf(m, 'pas').some(e => e.k === 'crow1')) { m.h = 1; m.crw = 1; }   // Itachi : Clone de corbeaux
  if (m.h > 0) { const s = sideOf(S, m); fxOf(m, 'surv').forEach(e => runCombat(S, s, m, e)); }
}
// Morts (règle Champs de bataille) : tous les serviteurs à 0 PV quittent le plateau ensemble, puis leurs effets se résolvent
// camp de l'attaquant d'abord (f), puis l'autre, chaque camp de gauche à droite : « quand un allié meurt », Râle d'agonie
// (invoqué à la place du mort), puis Réincarnation (1 PV, à droite des invocations du râle). Les morts causées par ces effets
// forment la vague suivante.
function simDeaths(S, f = 0) {
  for (let guard = 0; guard < 50; guard++) {
    const batch = [];
    for (const s of [f, 1 - f]) for (const m of S.sides[s]) if (m.h <= 0) batch.push({ s, m });
    if (!batch.length) return;
    for (const d of batch) { const arr = S.sides[d.s], i = arr.indexOf(d.m); d.L = arr[i - 1] || null; arr.splice(i, 1); S.dead[d.s].push(d.m.c); }   // ancre : voisin de gauche encore en place
    for (const { s, m:d, L } of batch) {
      const arr = S.sides[s], pos = () => (L && arr.includes(L) ? arr.indexOf(L) + 1 : 0);
      if (S.mx.eboulement && has(d, 't') && S.mx.eboulement.includes(tribe(d))) { const o = S.sides[1 - s].filter(x => x.h > 0); if (o.length) simDamage(S, o[Math.floor(S.rng() * o.length)], 3, null); }
      for (const al of arr.slice()) if (al.h > 0) fxOf(al, 'die').forEach(e => runCombat(S, s, al, e, 0, d));
      const before = arr.length, ndr = Math.max(auraTimes(arr, 'aura_dr'), !d.sld && fxOf(d, 'pas').some(e => e.k === 'dr2') ? 2 : 1);
      for (let r = 0; r < ndr; r++) fxOf(d, 'dr').forEach(e => runCombat(S, s, d, e, pos()));
      const added = Math.max(0, arr.length - before);
      if (!(has(d, 'r') && !d.rb) && nkRevive(S, s, d, pos() + added)) continue;
      if (has(d, 'r') && !d.rb && arr.length < 7) { const nm = simSummon(S, s, pos() + added, d.c, d.g); if (nm) { nm.h = 1; remF(nm, 'r'); nm.rb = 1; if (d.gag) nm.gag = d.gag; nm.ou = d.ou || d.u; for (const al of arr.slice()) if (al.h > 0 && al !== nm) fxOf(al, 'reborn').forEach(e => runCombat(S, s, al, e, 0, nm)); } }   // le compteur de gag suit la Réincarnation
    }
  }
}
const snap = S => S.sides.map((arr, si) => arr.map(m => { const o = { c:m.c, a:m.a, h:m.h, g:m.g, f:m.f, u:m.u }; if (m.gj > 0) o.gj = 1; if (m.ent && S.sides[1 - si] && S.sides[1 - si].some(x => x.u === m.ent && x.h > 0)) o.ent = 1; if (m.tf) o.tf = m.tf; if (m.fam) o.fam = m.fam; if (m.gag) o.gag = m.gag; return o; }));   // tf : l'image transformée reste en combat
function simulate(bA, bB, seed, tA, tB, fire, mx) {
  const BS0 = BSRC; BSRC = null;
  try { return simulate0(bA, bB, seed, tA, tB, fire, mx); } finally { BSRC = BS0; }
}
function simulate0(bA, bB, seed, tA, tB, fire, mx) {
  const S = { sides:[clone(bA), clone(bB)], rng:mulberry(seed), uid:1000000, frames:[], mx:mx || {}, dead:[[], []] };
  S.hx = S.sides.map(arr => arr.reduce((t, m) => Math.max(t, m.hx || 0), 0));   // Horror Show : bonus d'attaque « pour le reste de la partie », aussi pour les invoqués
  S.frames.push({ s:snap(S) });
  // Ordre de résolution « Champs de bataille » : le camp qui a le plus de serviteurs est prioritaire (égalité : au hasard)
  const nA = S.sides[0].length, nB = S.sides[1].length;
  let first = nA > nB ? 0 : nB > nA ? 1 : (S.rng() < 0.5 ? 0 : 1);
  const ord = [first, 1 - first];
  // Début du combat (règle de la maison) : tous les effets s'empilent et se déclenchent de gauche à droite — héros d'abord
  // (camp prioritaire puis l'autre), puis les serviteurs du camp prioritaire puis ceux de l'autre camp. Personne ne meurt
  // pendant la pile : chaque serviteur présent au départ déclenche son effet, et les morts (râles compris) sont résolues à la fin.
  S.pre = true; S.sides.forEach(arr => arr.forEach(m => { m.h0 = m.h; m.hm = m.h; }));
  if (S.mx.bande) for (const s of ord) spCohesion(S, s);   // Cohésion de groupe : voisins de la même famille, bandes activées
  if (fire) for (const s of ord) {
    let dmg = fire[s] || 0, hit = [];
    while (dmg > 0) {
      const pool = S.sides[1 - s].filter(x => x.h > 0 && !hit.includes(x)); if (!pool.length) break;
      const t = pool[Math.floor(S.rng() * pool.length)]; hit.push(t);
      const shielded = has(t, 's'), dealt = shielded ? dmg : Math.min(dmg, t.h);
      S.frames.push({ s:snap(S), fb:t.u, fs:s, fd:shielded ? 0 : dealt });
      simDamage(S, t, dealt, null);
      dmg = shielded ? 0 : dmg - dealt;
    }
  }
  for (const s of ord) { const list = S.sides[s].filter(m => fxOf(m, 'soc').length), nsoc = auraTimes(S.sides[s], 'aura_soc'); for (const m of list) if (S.sides[s].includes(m)) for (let r = 0; r < nsoc; r++) fxOf(m, 'soc').forEach(e => runCombat(S, s, m, e)); }
  // Naruto : les jutsus de combat préparés au recrutement partent maintenant, de gauche à droite
  for (const s of ord) for (const m of S.sides[s].slice()) if (m.jp && !m.sld && S.sides[s].includes(m)) { const J = jutOf(m); if (J) jutCb(J, m.tf).forEach(e => runCombat(S, s, m, e)); }
  S.pre = false; S.sides.forEach(arr => arr.forEach(m => { delete m.h0; }));
  simDeaths(S, first);
  if (S.mx.ruee) for (const s of ord) { const w = S.sides[s].filter(m => m.h > 0 && S.mx.ruee.includes(tribe(m))); if (w.length >= 3) w.forEach(m => buff(m, 2, 0)); }
  simDeaths(S, first);
  S.frames.push({ s:snap(S) });
  // 3. premier attaquant : le camp qui a le plus de serviteurs une fois le Début du combat résolu (égalité : au hasard)
  const lA = S.sides[0].length, lB = S.sides[1].length;
  let cur = lA > lB ? 0 : lB > lA ? 1 : (lA === nA && lB === nB ? first : (S.rng() < 0.5 ? 0 : 1));
  const ptr = [0, 0]; let guard = 0, stall = 0;
  // duos : réserve de chaque camp (le plateau de l'allié), qui entre quand le premier plateau est tombé ; ses « Début du combat » se déclenchent à son entrée
  const rsv = (S.mx.rsv || [null, null]).map(b => b && b.length ? clone(b) : null);
  const relayIn = s => { const nb = rsv[s]; rsv[s] = null; nb.forEach(m => S.sides[s].push(m)); S.frames.push({ s:snap(S), rly:s });
    S.pre = true; nb.forEach(m => { m.h0 = m.h; m.hm = m.h; }); const nsoc = auraTimes(S.sides[s], 'aura_soc');
    for (const m of nb) if (S.sides[s].includes(m)) for (let r = 0; r < nsoc; r++) fxOf(m, 'soc').forEach(e => runCombat(S, s, m, e));
    S.pre = false; nb.forEach(m => { delete m.h0; }); simDeaths(S, s); S.frames.push({ s:snap(S) }); ptr[s] = 0; };
  for (;;) {
  while (S.sides[0].length && S.sides[1].length && guard++ < 400) {
    const arr = S.sides[cur], en = S.sides[1 - cur];
    let idx = -1;
    for (let k = 0; k < arr.length; k++) { const j = (ptr[cur] + k) % arr.length; if (arr[j].a > 0 && !nkBound(S, cur, arr[j])) { idx = j; break; } }
    if (idx < 0) { if (++stall >= 2) break; cur = 1 - cur; continue; }
    stall = 0;
    const att = arr[idx];
    if (att.gj > 0) { att.gj--; S.frames.push({ s:snap(S), gj:att.u }); ptr[cur] = (idx + 1) % arr.length; cur = 1 - cur; continue; }   // Genjutsu : il perd son attaque
    const swings = has(att, 'w') ? 2 : 1; let rights = arr.slice(idx + 1);
    for (let w = 0; w < swings; w++) {
      if (att.h <= 0 || !arr.includes(att) || !en.length) break;
      const seeAll = nkHas(att, 'pierce') || arr.some(x => x.h > 0 && nkHas(x, 'see_camo')), seen = seeAll ? en : en.filter(x => !has(x, 'c')), vis = seen.length ? seen : en;   // Camouflage : invisible aux attaques tant qu'il n'a pas attaqué (sauf s'il ne reste que des camouflés)
      const taunts = nkHas(att, 'sickle') ? [] : vis.filter(x => has(x, 't')); const pool = taunts.length ? taunts : vis;
      const tgt = nkPick(S, cur, att, pool);
      if (has(att, 'c') && !nkHas(att, 'camo_keep')) remF(att, 'c');
      S.frames.push({ s:snap(S), at:att.u, tg:tgt.u });
      rights = arr.slice(arr.indexOf(att) + 1);
      // Ralliement : « quand il attaque », avant les dégâts (règle de Champs de bataille)
      fxOf(att, 'atk').forEach(e => runCombat(S, cur, att, e, 0, tgt));
      for (const al of arr.slice()) if (al.h > 0) fxOf(al, 'aatk').forEach(e => runCombat(S, cur, al, e, 0, att));
      if (att.h <= 0 || !en.includes(tgt) || tgt.h <= 0) { simDeaths(S, cur); if (att.h <= 0 || !arr.includes(att)) break; if (!en.includes(tgt) || tgt.h <= 0) continue; }
      let aa = att.a; const ta = tgt.a; if (att.mul1) { aa *= att.mul1; delete att.mul1; } if (att.pl1) { aa += att.pl1; delete att.pl1; } if (tgt.ent && nkHas(att, 'x3bound')) aa *= 3; const noRet = has(att, 'i') || !!att.i1; delete att.i1; if (nkHas(att, 'pierce') || nkHas(att, 'sickle')) remF(tgt, 's');
      const cl = fxOf(att, 'pas').some(e => e.k === 'cleave') ? [en[en.indexOf(tgt) - 1], en[en.indexOf(tgt) + 1]].filter(Boolean) : [];
      if (nkHas(att, 'chain')) { const o = en.filter(x => x !== tgt && x.h > 0 && !cl.includes(x)); if (o.length) cl.push(o[Math.floor(S.rng() * o.length)]); }   // attaque aussi les voisins de la cible
      simDamage(S, tgt, aa, att); cl.forEach(x => simDamage(S, x, aa, att)); if (!(S.mx.first && tgt.h <= 0) && !noRet) simDamage(S, att, ta, tgt);   // duel : la cible abattue ne riposte pas ; Insensible : aucun dégât pendant son attaque
      nkAfterHit(S, cur, att, tgt);
      simDeaths(S, cur);
      nkAfterAttack(S, cur, att, tgt); simDeaths(S, cur);
      // duo lié (Éveil) : le partenaire du compagnon frappe aussitôt la même cible
      if (att.duo && tgt.h > 0 && en.includes(tgt)) { const pt = arr.find(x => x !== att && x.duo && x.h > 0 && x.a > 0); if (pt) { S.frames.push({ s:snap(S), at:pt.u, tg:tgt.u }); const pa = pt.a, tb = tgt.a; simDamage(S, tgt, pa, pt); simDamage(S, pt, tb, tgt); simDeaths(S, cur); } }
    }
    // prochain attaquant : le serviteur à droite de l'attaquant ; s'il est mort, le premier survivant qui était à sa droite
    // (les invocations apparues à sa place attendent le tour suivant) ; plus personne à droite : on repart de la gauche
    if (arr.includes(att)) ptr[cur] = arr.indexOf(att) + 1;
    else { const nx = rights.find(x => arr.includes(x)); ptr[cur] = nx ? arr.indexOf(nx) : arr.length; }
    if (ptr[cur] >= arr.length) ptr[cur] = 0;
    cur = 1 - cur;
  }
  let ent = false; for (const s of [0, 1]) if (!S.sides[s].length && rsv[s]) { relayIn(s); ent = true; }
  if (!ent) break; stall = 0;
  }
  S.frames.push({ s:snap(S) });
  const a = S.sides[0].length, b = S.sides[1].length;
  const w = a && !b ? 0 : b && !a ? 1 : -1;
  let dmg = 0;
  if (w === 0) dmg = tA + S.sides[0].reduce((t, m) => t + dmgTier(m), 0);
  if (w === 1) dmg = tB + S.sides[1].reduce((t, m) => t + dmgTier(m), 0);
  if (w >= 0 && rsv[w]) dmg += rsv[w].reduce((t, m) => t + dmgTier(m), 0);   // duos : le plateau de l'allié resté en réserve ajoute ses dégâts
  return { w, dmg, frames:S.frames, dead:S.dead, alive:S.sides.map(a => a.map(m => m.c)), pf:S.pf || null, inc:S.inc || null, gag:S.gag || null, perm:S.perm || null, gl:S.gl || null, don:S.don || null, hb:S.hb || null, heal:S.heal || null };
}

/* =====================================================================
   HÔTE — fait tourner toute la partie (règles, IA, minuteurs)
   ===================================================================== */
const LOCAL = 'local';
const H = { G:null, nr:null, roster:[], code:null, lastSeq:{}, tick:null, hb:0 };
const RU = () => SET.rules;

function newPlayer(pid, n, human, peer) {
  return { pid, n, human, peer, bot:!human, hero:null, ho:[], hp:+RU().hp || 40, t:1, uc:+RU().up[1] || 6, g:0, mg:0, sh:[], fz:false, bd:[], hd:[], pu:false, rr:0, rdy:false, al:true, place:0, lastOpp:null, res:null };
}
const upCost = p => p.t >= 6 ? 0 : Math.max(0, p.uc - (p.hero === 'ilka' ? 1 : 0) - ((htr(p, 'pupc') || {}).n || 0)) + (p.tm != null && p.t >= 3 ? 2 : 0);   // duos : les niveaux 4, 5 et 6 coûtent 2 or de plus

const UNIV_FAMS = 5;   // chaque univers compte 5 familles ; on n'en joue qu'un par partie
// univers jouables pour l'instant (les autres sont en chantier)
const UNIV_OPEN = ['Le Seigneur des Anneaux', 'Naruto', 'Dragon Ball', 'Rick et Morty', 'South Park', 'Les Simpson'];
const univOpen = u => !!u && UNIV_OPEN.includes(u.n);
// univers « modernes » (Naruto, Dragon Ball, Rick et Morty, South Park, Les Simpson) : 3 héros proposés et 2 relances, héros rattachés à l'univers seulement
const univ3 = G => inMechAny(G, 'voyage') || inMechAny(G, 'chakra') || inMechAny(G, 'ki') || inMechAny(G, 'portail') || inMechAny(G, 'bande') || inMechAny(G, 'gag');
function univChosen(sel) {
  const on = SET.tribes.filter(t => t.on !== false).map(t => t.id);
  const first = (sel || [])[0];
  const us = (SET.univ || []).filter(u => u.n === first && univOpen(u) && u.tribes.some(t => on.includes(t)));
  const trs = [];
  for (const u of us) for (const t of u.tribes) if (on.includes(t) && !trs.includes(t)) trs.push(t);
  return { us:us.map(u => u.n), trs };
}
const HERO_OFFER = 5, HERO_ROLLS = 3;
// relance d'un héros proposé : d'abord un héros de l'univers que personne ne s'est vu proposer, sinon un autre de l'univers
function heroReroll(G, p) {
  const ok = h => heroFam(h).some(t => G.trs.includes(t));
  const seen = new Set(); G.ps.forEach(q => { if (q.hero) seen.add(q.hero); if (!q.hero || q === p) (q.ho || []).forEach(h => seen.add(h)); });
  return pickR(Object.keys(HEROES).filter(h => ok(h) && !seen.has(h))) || pickR(Object.keys(HEROES).filter(h => ok(h) && !(p.ho || []).includes(h) && !G.ps.some(q => q.hero === h))) || pickR(Object.keys(HEROES).filter(h => !seen.has(h) && !/^nh_/.test(h))) || null;
}
const RANKS = ['Genin', 'Chûnin', 'Jônin'];
function winUp(p) {
  const J = htr(p, 'pjin'), x2 = J ? (J.x || 2) : 1;
  if (J && p.bd && p.bd.length) withSrc('Huit queues', () => buff(pickR(p.bd), J.b || 2, J.b || 2));
  (p.bd || []).forEach(m => (CD(m.c).fxAll || []).forEach(e => { const k = mult(m) * x2;
    if (e.k === 'win_self') withSrc('Jinchūriki', () => buff(m, e.a * k, e.h * k));
    if (e.k === 'win_all') withSrc(CD(m.c).n, () => p.bd.forEach(o => { if (o !== m && tribeOk(o, e.tb)) buff(o, e.a * mult(m), e.h * mult(m)); })); }));
}
function rankUp(p) {
  (p.bd || []).forEach(m => { const e = (CD(m.c).fxAll || []).find(x => x.k === 'rank'); if (!e || (m.rk || 0) >= 2) return; m.rk = (m.rk || 0) + 1; const k = mult(m); withSrc('Rang : ' + RANKS[m.rk], () => buff(m, e.a * k, e.h * k)); });
}
// choix du duo : le premier des deux alliés qui clique fixe le duo et prend ce héros ; son allié reçoit l'autre
function loPick(G, p, h) { const t = G.tm[p.tm], al = loAlly(G, p), d = loDuoOf(h); if (!d || !t.ho.includes(d.id) || (t.duo && t.duo !== d.id) || p.hero || (al && al.hero === h)) return false;
  t.duo = d.id; p.hero = h; if (al && !al.hero) al.hero = d.h.find(x => x !== h); return true; }
// vie commune : les deux alliés partagent une seule réserve de PV ; toute variation chez l'un vaut pour le duo
function duoSync(G) { if (!G || !G.tm) return; G.tm.forEach(t => { if (!t.set) return; const ps = G.ps.filter(p => p.tm === t.id), n = t.hp + ps.reduce((x, p) => x + (p.hp - t.hp), 0); t.hp = n; ps.forEach(p => { p.hp = n; }); }); }
function hostStart(humans, opt) {
  const G = { ph:'hero', rd:0, end:Date.now() + 60000, pool:{}, ps:[] };
  const on = SET.tribes.filter(t => t.on !== false).map(t => t.id);
  const n = +RU().tribesPerGame || 0;
  const ch = univChosen(opt && opt.univ);
  G.univ = [];
  const pool = (SET.univ || []).filter(u => univOpen(u) && u.tribes.some(t => on.includes(t)));
  if (ch.trs.length) { G.univ = ch.us; G.trs = ch.trs; G.pick = 1; }
  else if (pool.length) { const u = pickR(pool); G.univ = [u.n]; G.trs = u.tribes.filter(t => on.includes(t)); }
  else if (n > 0 && n < on.length) {
    const picked = [];
    for (const u of shuffle((SET.univ || []).slice())) {
      const add = shuffle(u.tribes.filter(t => on.includes(t) && !picked.includes(t)));
      if (!add.length) continue;
      G.univ.push(u.n);
      for (const t of add) if (picked.length < n) picked.push(t);
      if (picked.length >= n) break;
    }
    for (const t of shuffle(on.slice())) if (picked.length < n && !picked.includes(t)) picked.push(t);
    G.trs = picked;
  } else G.trs = on;
  if (!G.univ.length) G.univ = (SET.univ || []).filter(u => u.tribes.length && u.tribes.every(t => G.trs.includes(t))).map(u => u.n);
  setupMechs(G);
  G.ban = on.filter(t => !G.trs.includes(t));
  G.ids = POOL_IDS.filter(id => C[id].tr === 'neu' || G.trs.includes(C[id].tr));
  G.ids.forEach(id => G.pool[id] = +RU().pool[C[id].t] || 0);
  const names = shuffle(AI_NAMES.slice());
  for (let i = 0; i < 8; i++) {
    const h = humans[i];
    G.ps.push(h ? newPlayer(i, h.n, true, h.peer) : newPlayer(i, 'IA ' + names[i], false, null));
  }
  // chaque héros n'est proposé qu'à un seul joueur
  // héros proposés : uniques, rattachés à au moins une famille en jeu ; repli sur les autres s'il n'y en a pas assez
  const ok = h => heroFam(h).some(t => G.trs.includes(t));
  const ids = shuffle(Object.keys(HEROES).filter(ok)), rest = shuffle(Object.keys(HEROES).filter(h => !ok(h))).sort((x, y) => (/^nh_/.test(x) ? 1 : 0) - (/^nh_/.test(y) ? 1 : 0));
  G.ps.forEach(p => { p.ho = []; });
  // 5 héros par joueur : uniques tant que possible, puis doublons entre joueurs (jamais deux fois le même pour un joueur)
  const allOk = Object.keys(HEROES).filter(ok);
  const nOffer = inMechAny(G, 'chakra') ? 2 : univ3(G) ? 3 : HERO_OFFER;   // Naruto : 16 héros, 2 par joueur, aucun doublon
  for (let k = 0; k < nOffer; k++) for (const p of G.ps) {
    let h = ids.shift();
    if (!h && rest.length && !univ3(G)) h = rest.shift();
    if (!h) h = pickR(allOk.filter(x => !p.ho.includes(x)));
    if (!h) h = pickR(Object.keys(HEROES).filter(x => !p.ho.includes(x)));
    if (h) p.ho.push(h);
  }
  // Le Seigneur des Anneaux en duos : 4 équipes de deux tirées au sort (2 des Peuples libres, 2 de l'Ombre) ;
  // chaque équipe se voit proposer des duos célèbres de son camp, sans doublon dans le camp (donc pas de relance)
  if (loOn(G)) {
    G.tm = [0, 1, 2, 3].map(i => ({ id:i, camp:i < 2 ? 'L' : 'O', duo:null, ho:[], hp:0, set:0, lo:-1 }));
    shuffle(G.ps.slice()).forEach((p, k) => { p.tm = k >> 1; p.camp = G.tm[p.tm].camp; p.ho = []; });
    for (const c of ['L', 'O']) { const ds = shuffle(LO_DUOS.filter(d => d.camp === c)), teams = G.tm.filter(t => t.camp === c), n = Math.min(3, Math.floor(ds.length / teams.length));
      teams.forEach(t => { t.ho = ds.splice(0, n).map(d => d.id); G.ps.filter(p => p.tm === t.id).forEach(p => { p.ho = t.ho.flatMap(id => loDuoId(id).h); }); }); }
  }
  G.ps.forEach(p => { p.hrr = loOn(G) || inMechAny(G, 'chakra') ? 0 : univ3(G) ? 2 : HERO_ROLLS; p.hrm = p.hrr; });
  if (loOn(G) && G.tm) G.tm.forEach(t => { const ps = G.ps.filter(p => p.tm === t.id); if (ps.every(p => p.bot)) loPick(G, ps[0], pickR(ps[0].ho)); });   // une IA alliée d'un joueur attend son choix
  else G.ps.forEach(p => { if (p.bot) p.hero = pickR(p.ho); });
  H.G = G;
  clearInterval(H.tick); H.tick = setInterval(hostTick, 200);
  broadcast();
}

function drawOne(G, maxT, exactT, tb) {
  const see = DRAWP && loOn(G) ? id => loSee(DRAWP, id) : null;
  const cands = G.ids.filter(id => (exactT ? C[id].t === exactT : C[id].t <= maxT) && G.pool[id] > 0 && (!tb || C[id].tr === tb) && (!see || see(id)));
  if (!cands.length) return null;
  let tot = cands.reduce((t, id) => t + G.pool[id], 0), r = Math.random() * tot;
  for (const id of cands) { r -= G.pool[id]; if (r <= 0) { G.pool[id]--; return mk(id, 0); } }
  const id = cands[cands.length - 1]; G.pool[id]--; return mk(id, 0);
}
function toPool(G, m) { if (G.pool[m.c] != null) G.pool[m.c] += m.g ? 3 : 1; }
// taverne gelée : on garde ce qui reste et on complète les places vides (et l'étagère à sorts si elle est vide)
const sp2On = (G, p) => false;   // Naruto : un seul objet proposé à chaque actualisation (16/11/2026)
function topUpShop(G, p) { DRAWP = p; if (!p.sp) p.sp = drawSpell(p.t); if (sp2On(G, p) && !p.sp2) p.sp2 = drawSpell(p.t); loShelf(G, p); for (let k = p.sh.length; k < SLOTS[p.t]; k++) { const m = drawOne(G, p.t); if (m) p.sh.push(m); else break; } }
function fillShop(G, p) { DRAWP = p; if (inMechAny(G, 'chakra')) [p.sp, p.sp2].forEach(x => { if (x) itBack(G, x.sp); }); const ring0 = loOn(G) && p.sp && p.sp.sp === LO_RING ? p.sp : null; p.sp = drawSpell(p.t); p.sp2 = sp2On(G, p) ? drawSpell(p.t) : null; if (ring0) p.sp = ring0; loShelf(G, p); p.sh.forEach(m => toPool(G, m)); p.sh = []; for (let k = 0; k < SLOTS[p.t]; k++) { const m = drawOne(G, p.t); if (m) p.sh.push(m); } }

function checkTriple(G, p) {
  const all = p.hd.concat(p.bd).filter(m => !m.sp && !m.g && !isComp(m));   // jetons compris (marionnettes, clones…)
  const cnt = {}; all.forEach(m => cnt[m.c] = (cnt[m.c] || 0) + 1);
  for (const id in cnt) if (cnt[id] >= 3) {
    const copies = [];
    for (const zone of [p.hd, p.bd]) for (let i = zone.length - 1; i >= 0 && copies.length < 3; i--) if (zone[i].c === id && !zone[i].g && !zone[i].sp) copies.push(zone.splice(i, 1)[0]);
    const b = CD(id);
    const gm = { c:id, a:copies.reduce((t, m) => t + m.a, 0) - (3 - GOLD_K) * b.a, h:Math.max(1, copies.reduce((t, m) => t + m.h, 0) - (3 - GOLD_K) * b.h), g:1, f:b.f, u:UID++, tr:1 }; { const sl = copies.reduce((t, m) => t + (m.sl || 0), 0); if (sl) { gm.sl = sl; if (copies.some(m => m.slf) || sl >= 5) gm.slf = 1; } }
    copies.forEach(m => { for (const k of m.f || '') addF(gm, k); if (m.x) gm.x = (gm.x || []).concat(m.x); (m.bn || []).forEach(e => { const L = gm.bn || (gm.bn = []); const f = L.find(x => x.s === e.s); if (f) { f.a += e.a; f.h += e.h; f.n += e.n; for (const k of e.k || '') if (!(f.k || '').includes(k)) f.k = (f.k || '') + k; } else L.push({ ...e }); }); });
    { const f = copies.find(m => m.fam === '*') || copies.find(m => m.fam); if (f) { gm.fam = f.fam; if (f.famOf) gm.famOf = f.famOf; } }   // la conversion (cohésion) suit le doré
    { const gg = copies.reduce((t, m) => t + (m.gag || 0), 0); if (gg) gm.gag = gg; }   // gags récurrents : les compteurs s'additionnent dans le doré
    { const tf = Math.max(0, ...copies.map(m => m.tf || 0)); if (tf) { gm.tf = tf; gm.tfn = (copies.find(m => (m.tf || 0) === tf) || {}).tfn; } if (copies.some(m => m.awk)) gm.awk = 1; if (copies.some(m => m.ring)) { gm.ring = 1; gm.rc = Math.max(...copies.map(m => m.rc || 0)); } }   // le doré garde son palier de transformation et son éveil
    { const its = copies.flatMap(itL), keep = [...new Set(its)]; if (keep.length) gm.it = keep.join(','); its.slice().forEach((id, i) => { if (its.indexOf(id) !== i) itBack(G, id); }); }   // objets : le doré garde un exemplaire de chaque objet
    p.hd.push(gm); p.trc = (p.trc || 0) + 1;
    if (C[id].t === 0) qAdd(p, 'tripTok');
    { const t = htr(p, 'ptrip'); if (t && C[id].t === 0) withSrc('Pouvoir de ' + HEROES[p.hero].n.split(' ')[0], () => { p.ck = Math.min(ckMax(p), (p.ck || 0) + (t.ck || 0)); }); }
    if (inMech(G, 'serment', gm)) withSrc('Serment des anciens', () => p.bd.concat(p.hd).forEach(x => { if (x !== gm && !x.sp && inMech(G, 'serment', x)) buff(x, 2, 2); }));
    return checkTriple(G, p);
  }
}
// univers Ninja : compagnons, duels, coffres et inventaire désactivés
const NJ_COMP = false;
const NJ_AWK = false;    // pas d'Éveil
const NJ_TECH = false;   // pas de techniques
const CK_MAX = 15;   // Naruto (15/11/2026) : 15 au plus, les objets produisent du chakra
// Naruto : carte du héros (la carte de taverne du même personnage), jouable quand la taverne atteint son niveau
const nhCard = h => (h && /^nh_/.test(h) && C['nk_' + h.slice(3)]) ? 'nk_' + h.slice(3) : null;
const lkd = (p, m) => !!(m && m.lk && p && p.t < tierOf(m));
const ckMax = p => CK_MAX + ((p && HEROES[p.hero] && HEROES[p.hero].ckx) || 0) + ((p && p.bd) || []).reduce((t, m) => t + ((CD(m.c).fxAll || []).filter(e => e.k === 'pas_ckx').reduce((u, e) => u + e.n, 0)) * (m.g ? 2 : 1), 0);
const pureX = (p, tr) => p && p.pure === tr ? 2 : 1;
const awake = G => !!(G && G.eveil && G.rd >= G.eveil);
var AWK_JOIN = true;
/* ---------- Marqueurs de clan (Ninja) : un par élément ----------
   Gagnés par les techniques de leur nature, les serviteurs du clan et les coffres (Sceau de clan).
   Paliers (5, 10, 20 marqueurs gagnés au total) : bonus permanents pour le clan.
   Résonance : chaque combo consomme 5 marqueurs de chacun de ses éléments pour déclencher leur éclat. */
const MK = { feu:'braise', vent:'souffle', eau:'maree', foudre:'charge', terre:'roche' };
const MK_N = { feu:'Braises', vent:'Souffle', eau:'Marée', foudre:'Charge', terre:'Roche' };
const MK_STEPS = [5, 10, 20];
// bonus de palier en combat pour les serviteurs du clan : [attaque, vie, mot-clé au 3e palier]
const MK_TIER = { feu:[[1, 0], [2, 1], [4, 2, 'r']], vent:[[1, 1], [2, 1], [3, 2, 'w']], eau:[[0, 2], [1, 3], [2, 5, 's']], foudre:[[1, 0], [2, 1], [3, 3, 'n']], terre:[[0, 3], [1, 5], [2, 8, 't']] };
const MK_TIER_TX = { feu:'Clan Katon', vent:'Clan Fûton', eau:'Clan Suiton', foudre:'Clan Raiton', terre:'Clan Doton' };
const MK_KW = { r:'Réincarnation', w:'Furie des vents', s:'Bouclier divin', v:'Venimosité', t:'Provocation' };
// éclat de résonance (5 marqueurs consommés par un combo)
const MK_BURST = {
  feu:['Prochain combat : 5 dégâts à l\'ennemi', (G, p) => { p.njf = (p.njf || 0) + 5; }],
  vent:['Gagne 2 or', (G, p) => { p.g += 2; }],
  eau:['Tes serviteurs gagnent +1/+2', (G, p) => p.bd.forEach(m => buff(m, 1, 2))],
  foudre:['Récupère 3 chakra', (G, p) => { p.ck = Math.min(ckMax(p), (p.ck || 0) + 3); }],
  terre:['Tes serviteurs gagnent +0/+3', (G, p) => p.bd.forEach(m => buff(m, 0, 3))],
};
function mkSync(p) { p.mkl = p.mkl || {}; p.mkLast = p.mkLast || {}; for (const el in MK) { const v = p[MK[el]] || 0, l = p.mkLast[el] || 0; if (v > l) p.mkl[el] = (p.mkl[el] || 0) + (v - l); p.mkLast[el] = v; } }
const NJ_MK = false;   // marqueurs de clan désactivés (gameplay simplifié)
const mkAdd = (p, el, n) => { if (!NJ_MK || !MK[el] || !n) return; p[MK[el]] = (p[MK[el]] || 0) + n; mkSync(p); };
const mkTier = (p, el) => { const t = ((p.mkl || {})[el]) || 0; return MK_STEPS.filter(s => t >= s).length; };
var AWK_JOIN = true;
const awakeNow = () => typeof H !== 'undefined' && awake(H.G);
/* ---------- Éveil (4 joueurs ou moins) : héros, compagnon et techniques s'éveillent ---------- */
// pouvoir éveillé : les valeurs sont doublées (sauf les coûts) et certains pouvoirs gagnent un bonus
const PW_COSTS = { braisebuff:['n'], g2ck:['g'] };
function awkPw(w) {
  if (!w) return w; const o = Object.assign({}, w), keep = PW_COSTS[w.k] || [];
  if (w.k === 'multi') { o.s = (w.s || []).map(st => { const x = Object.assign({}, st); ['n', 'd', 'a', 'h'].forEach(k => { if (typeof x[k] === 'number') x[k] *= 2; }); return x; }); return o; }
  ['n', 'd', 'a', 'h', 'g', 'n2', 'a2', 'h2', 'm', 'max'].forEach(k => { if (typeof o[k] === 'number' && !keep.includes(k)) o[k] *= 2; });
  return o;
}
const pwOf = p => { const w = HX(p) && HX(p).pw; return w && typeof H !== 'undefined' && awake(H.G) ? awkPw(w) : w; };
const PW_AWK_TX = { rfill:'remplit la moitié et récupère 2 chakra', techel:'ajoute 2 techniques', rpure:'déclenche le combo pur et gagne 2 or', pdouble:'les deux premiers combos du tour s\'appliquent deux fois', ptechc:'tes techniques coûtent 2 or de moins', rcycle:'gagne 2 or', rdump:'gagne 6 or' };
const heroAwkTx = h => !h || !h.pw ? '' : PW_AWK_TX[h.pw.k] || 'effet doublé';
// forme éveillée du compagnon : pouvoir ultime de son clan (sans doublement des stats)
const COMP_AWK = {
  feu:{ n:'Phénix de flammes', tx:'Réincarnation et début du duel : 4 dégâts au compagnon adverse', fn:c => { addF(c, 'r'); (c.x = c.x || []).push({ k:'soc_dmg', d:4, n:1, src:'Phénix de flammes' }); } },
  vent:{ n:'Lame d\'ouragan', tx:'Furie des vents et après avoir attaqué : +2/+0', fn:c => { addF(c, 'w'); (c.x = c.x || []).push({ k:'atk_self', a:2, h:0, src:'Lame d\'ouragan' }); } },
  eau:{ n:'Corps de l\'eau', tx:'+0/+8 et quand il survit à un coup : +3/+3', fn:c => { buff(c, 0, 8); (c.x = c.x || []).push({ k:'surv_self', a:3, h:3, src:'Corps de l\'eau' }); } },
  foudre:{ n:'Chakra de foudre', tx:'+3 attaque et après avoir attaqué : 4 dégâts à l\'ennemi', fn:c => { buff(c, 3, 0); (c.x = c.x || []).push({ k:'atk_zap', d:4, n:1, src:'Chakra de foudre' }); } },
  terre:{ n:'Golem de pierre', tx:'+0/+10 et début du duel : gagne +3/+3', fn:c => { buff(c, 0, 10); (c.x = c.x || []).push({ k:'soc_self', a:3, h:3, src:'Golem de pierre' }); } },
};
function awakenComp(c) { if (!c || c.awk) return; const el = CLAN_EL[CD(c.c).tr], A = COMP_AWK[el]; c.awk = 1; withSrc('Éveil du compagnon', () => { if (A) A.fn(c); }); c.awkN = A ? A.n : ''; }
const hasFx = (m, k) => (CD(m.c).fxAll || []).some(e => e.k === k);
// dans l'univers du chakra, les pouvoirs héroïques se paient en chakra
const powPaid = G => !!(G && inMechAny(G, 'chakra'));   // Ninja : le pouvoir du héros se paie en chakra
const heroCk = (G, p) => { const h = HX(p); return h && h.pay ? h.pay === 'ck' : powPaid(G); };
const heroKi = p => { const h = HX(p); return !!(h && h.pay === 'ki'); };
const powPurse = (G, p) => heroKi(p) ? (p.ki || 0) : heroCk(G, p) ? (p.ck || 0) : p.g;
// coffres : un par combat, rangés hors de la main ; mineur (égalité ou défaite) ou majeur (victoire), du niveau de la taverne
const CHEST_COMMON = ['eq_lame', 'eq_armure', 'eq_gants'];
/* ---------- Améliorations du compagnon (univers Ninja) ----------
   Le compagnon porte dès le départ 5 pièces. Chaque coffre propose 3 améliorations au choix,
   de rareté Normal, Héroïque, Épique ou Légendaire (selon le duel et le niveau de taverne). */
const RARS = [{ n:'Normal', col:'#c9c2b4' }, { n:'Héroïque', col:'#4a9aff' }, { n:'Épique', col:'#b45aff' }, { n:'Légendaire', col:'#ff9a2a' }];
const PIECES = {
  lame:{ n:'Lame de chakra', art:'eq_lame' },
  armure:{ n:'Armure de roc', art:'eq_armure' },
  bandeau:{ n:'Bandeau du maître', art:'eq_bandeau' },
  gants:{ n:'Gantelets du vent', art:'eq_gants' },
  talisman:{ n:'Talisman des cycles', art:'eq_talisman' },
  pacte:{ n:'Parchemin de pacte', art:'nj_invoc' },
  sceau:{ n:'Sceau de clan', art:'nj_sceau' },
};
const PIECE_IDS = Object.keys(PIECES);
const xAdd = (c, e, src) => (c.x = c.x || []).push(Object.assign({ src }, e));
// [texte, effet] pour chaque pièce et chaque rareté
// pacte d'invocation : chaque parchemin posé renforce la bête qui arrivera à l'Éveil (ou la renforce tout de suite si elle est là)
const BEAST_KW = { feu:{ tx:'Début du duel : 5 dégâts au compagnon adverse', fn:b => (b.x = b.x || []).push({ k:'soc_dmg', d:5, n:1, src:'Pacte légendaire' }) },
  vent:{ tx:'Furie des vents et après avoir attaqué : +2/+0', fn:b => { addF(b, 'w'); (b.x = b.x || []).push({ k:'atk_self', a:2, h:0, src:'Pacte légendaire' }); } },
  eau:{ tx:'Quand elle survit à un coup : +3/+3', fn:b => (b.x = b.x || []).push({ k:'surv_self', a:3, h:3, src:'Pacte légendaire' }) },
  foudre:{ tx:'Après avoir attaqué : 4 dégâts à l\'ennemi', fn:b => (b.x = b.x || []).push({ k:'atk_zap', d:4, n:1, src:'Pacte légendaire' }) },
  terre:{ tx:'+0/+8 et Provocation', fn:b => { buff(b, 0, 8); addF(b, 't'); } } };
const pactEl = c => CLAN_EL[CD(c.c).tr] || 'feu';
const PACT = [['+2/+2', b => buff(b, 2, 2)], ['+4/+4', b => buff(b, 4, 4)], ['+5/+5', b => buff(b, 5, 5)], ['+5/+5 et pouvoir ultime', (b, el) => { buff(b, 5, 5); BEAST_KW[el].fn(b); }]];
const pactTx = (o, c) => o.r === 3 && c ? PACT[3][0].replace('pouvoir ultime', BEAST_KW[pactEl(c)].tx.toLowerCase()) : PACT[o.r][0];
function summonBeast(p) {
  const c = p.cp; if (!c || p.bst || !(c.pact || []).length) return;
  const el = pactEl(c), b = mk('nb_' + el, 0);
  withSrc('Pacte d\'invocation', () => c.pact.forEach(r => PACT[r][1](b, el)));
  p.bst = b;
}
const UPS = {
  // Lame : frapper le premier
  lame:[['+2 attaque', c => buff(c, 2, 0)],
        ['Début du duel : inflige 2 dégâts au compagnon adverse', c => xAdd(c, { k:'soc_dmg', d:2, n:1 }, 'Lame de chakra')],
        ['+3 attaque et Furie des vents (frappe deux fois)', c => { buff(c, 3, 0); addF(c, 'w'); }],
        ['Début du duel : inflige 6 dégâts au compagnon adverse', c => xAdd(c, { k:'soc_dmg', d:6, n:1 }, 'Lame de chakra')]],
  // Armure : encaisser
  armure:[['+3 vie', c => buff(c, 0, 3)], ['+6 vie', c => buff(c, 0, 6)],
          ['+2/+9', c => buff(c, 2, 9)],
          ['+6 vie et Réincarnation : se relève une fois pendant le duel', c => { buff(c, 0, 6); addF(c, 'r'); }]],
  // Bandeau : concentration du ninja
  bandeau:[['+1/+1', c => buff(c, 1, 1)],
           ['Début du duel : gagne +2/+2', c => xAdd(c, { k:'soc_self', a:2, h:2 }, 'Bandeau du maître')],
           ['Fin de tour : +1 chakra, et début du duel : +2/+2', c => { xAdd(c, { k:'eot_chakra', n:1 }, 'Bandeau du maître'); xAdd(c, { k:'soc_self', a:2, h:2 }, 'Bandeau du maître'); }],
           ['Fin de tour : +2 chakra, et début du duel : +4/+4', c => { xAdd(c, { k:'eot_chakra', n:2 }, 'Bandeau du maître'); xAdd(c, { k:'soc_self', a:4, h:4 }, 'Bandeau du maître'); }]],
  // Gantelets : riposte au corps à corps
  gants:[['+1/+2', c => buff(c, 1, 2)],
         ['Après avoir attaqué : gagne +1/+1', c => xAdd(c, { k:'atk_self', a:1, h:1 }, 'Gantelets du vent')],
         ['Quand il survit à un coup : gagne +2/+2', c => xAdd(c, { k:'surv_self', a:2, h:2 }, 'Gantelets du vent')],
         ['Après avoir attaqué : gagne +3/+3', c => xAdd(c, { k:'atk_self', a:3, h:3 }, 'Gantelets du vent')]],
  // Talisman : l'avantage élémentaire
  talisman:[['+1/+1', c => buff(c, 1, 1)],
            ['Résonance : +2/+2 de plus', c => { c.domb = (c.domb || 0) + 2; }],
            ['Début du duel : le compagnon adverse perd 2 attaque', c => xAdd(c, { k:'soc_chill', a:2, n:1 }, 'Talisman des cycles')],
            ['+3/+3 et résonance : +5/+5 de plus', c => { buff(c, 3, 3); c.domb = (c.domb || 0) + 5; }]],
};
const UPS_MAX = 8;
const upgCost = o => 1 + o.r;   // Normal 1 · Héroïque 2 · Épique 3 · Légendaire 4 chakra
const upTx = (o, c) => o.kind === 'mn' ? `${C[o.c] ? C[o.c].n : '?'} ${o.g ? 'doré ' : ''}(niveau ${C[o.c] ? C[o.c].t : '?'}) dans ta main` : o.kind === 'sp' ? `${SPELLS[o.sp] ? SPELLS[o.sp].n : '?'} dans ta main` : o.pc === 'sceau' ? `+${SCEAU[o.r]} ${c ? (MK_N[CLAN_EL[CD(c.c).tr]] || 'marqueurs').toLowerCase() : 'marqueurs du clan'}` : o.pc === 'pacte' ? 'Invocation : ' + pactTx(o, c) : (UPS[o.pc] && UPS[o.pc][o.r] || [''])[0];
// rareté : meilleure avec un coffre majeur (duel gagné) et une taverne haute
function rollRar(q, t) {
  const s = t + (q === 'maj' ? 2 : 0);
  const W = s <= 2 ? [80, 20, 0, 0] : s <= 4 ? [50, 40, 10, 0] : s <= 6 ? [25, 45, 25, 5] : [10, 35, 40, 15];
  let x = Math.random() * 100; for (let r = 0; r < 4; r++) { x -= W[r]; if (x < 0) return r; } return 0;
}
function chestChoice(q, t) { return shuffle(PIECE_IDS.concat(['tech']).slice()).slice(0, 3).map(pc => { const r = rollRar(q, t); if (pc !== 'tech') return { pc, r }; const ids = SPELL_IDS.filter(id => SPELLS[id].nin && !SPELLS[id].item && !SPELLS[id].forb && SPELLS[id].t <= Math.min(6, t + r)); return ids.length ? { kind:'sp', sp:pickR(ids), r } : { pc:'lame', r }; }); }
const SCEAU = [3, 5, 8, 12];
/* Éveil : les coffres donnent des serviteurs ou techniques puissants ; les derniers au classement ont au moins de l'Épique et les reçoivent gratuitement */
function awkChoice(G, p, q, t) {
  const roll = () => p.chFav ? (Math.random() < .35 ? 3 : 2) : rollRar(q, t);
  const minion = r => { const tier = r >= 3 ? 6 : Math.min(6, t + r); const ids = (G.ids || POOL_IDS).filter(id => C[id] && C[id].t === tier && !C[id].comp); const id = ids.length ? pickR(ids) : null; return id ? { kind:'mn', c:id, g:r >= 3 ? 1 : 0, r } : null; };
  const tech = r => { const ev = SPELL_IDS.filter(id => SPELLS[id].nin && !SPELLS[id].item && (r >= 2 ? (SPELLS[id].forb || SPELLS[id].t >= 5) : SPELLS[id].t <= Math.min(6, t + r))); return ev.length ? { kind:'sp', sp:pickR(ev), r } : null; };
  const out = []; for (const f of [minion, minion, tech]) { let o = null; for (let k = 0; k < 6 && !o; k++) o = f(roll()); if (o && !out.some(x => x.c && x.c === o.c)) out.push(o); }
  return out.length ? out : chestChoice(q, t);
}
function giveAwkCard(G, p, o) { if (o.kind === 'mn') { const m = mk(o.c, o.g); p.hd.push(m); checkTriple(G, p); } else p.hd.push({ sp:o.sp, u:UID++ }); }
function applyUp(c, o) { if (o.pc === 'sceau') { const el = CLAN_EL[CD(c.c).tr] || 'feu'; if (o.p) mkAdd(o.p, el, SCEAU[o.r]); c.pc = c.pc || {}; (c.pc.sceau = c.pc.sceau || []).push(o.r); return; }
  if (o.pc === 'pacte') { (c.pact = c.pact || []).push(o.r); c.pc = c.pc || {}; (c.pc.pacte = c.pc.pacte || []).push(o.r); if (o.p && o.p.bst) withSrc('Pacte d\'invocation', () => PACT[o.r][1](o.p.bst, pactEl(c))); return; }
  const U = UPS[o.pc] && UPS[o.pc][o.r]; if (!U) return; withSrc(PIECES[o.pc].n + ' · ' + RARS[o.r].n, () => U[1](c)); c.pc = c.pc || {}; (c.pc[o.pc] = c.pc[o.pc] || []).push(o.r); }
const EQS_MAX = 8;
const chestCost = (q, t) => q === 'maj' ? 3 + Math.floor(t / 2) : 2 + Math.floor(t / 3);
// jamais deux fois le même équipement : ni dans un même coffre, ni s'il est déjà rangé ou porté
function chestLoot(q, t, p) {
  const maxed = new Set(Object.keys((p && p.eqlv) || {}).filter(k => p.eqlv[k] >= EQ_MAXLV));
  const all = Object.keys(SPELLS).filter(k => SPELLS[k].eq && !maxed.has(k)), rare = all.filter(k => !CHEST_COMMON.includes(k)), common = all.filter(k => CHEST_COMMON.includes(k));
  const out = [], take = pool => { const c = pool.filter(k => !out.includes(k)); const k = c.length ? pickR(c) : null; if (k) out.push(k); return k; };
  const tech = () => { const sp = drawSpell(Math.max(1, t)); if (sp) out.push(sp.sp); };
  if (q === 'min') { if (!take(t <= 3 && common.length ? common : all)) tech(); }
  else { if (!take(rare.length ? rare : all)) tech(); if (t >= 4 && !take(rare.length > 1 ? rare : all)) tech(); if (t >= 6) tech(); }
  return out;
}
// le cycle des cinq éléments (Vent ← Bois, Foudre ← case jaune, Terre ← Métal)
const ELS = { feu:{ n:'Katon', col:'#ff7a2a' }, vent:{ n:'Fûton', col:'#6fd8a0' }, eau:{ n:'Suiton', col:'#4ab0e8' }, foudre:{ n:'Raiton', col:'#ffd23a' }, terre:{ n:'Doton', col:'#c8a878' } };
const EL_GEN = { vent:'feu', feu:'foudre', foudre:'terre', terre:'eau', eau:'vent' };   // génération : A nourrit B
const EL_DOM = { feu:'vent', vent:'foudre', foudre:'terre', terre:'eau', eau:'feu' };   // domination : A l'emporte sur B
// fusions : deux éléments enchaînés par le compagnon lui donnent un pouvoir hybride (remplace le précédent)
const FUSIONS = {
  'eau+vent':{ n:'Hyōton', col:'#bfe8ff', fx:{ k:'soc_chill', a:2, n:7 } },
  'eau+terre':{ n:'Mokuton', col:'#6aa84a', fx:{ k:'eot_self', a:1, h:2 } },
  'feu+terre':{ n:'Yōton', col:'#ff5a1a', fx:{ k:'soc_aoe', d:3 } },
  'eau+feu':{ n:'Futton', col:'#e8e2da', fx:{ k:'surv_self', a:2, h:2 } },
  'foudre+terre':{ n:'Bakuton', col:'#ffb04a', fx:{ k:'dr_dmg', d:6, n:1 } },
  'feu+vent':{ n:'Shakuton', col:'#ff9a4a', fx:{ k:'soc_dmg', d:4, n:1 } },
  'foudre+vent':{ n:'Tempête du Fūton', col:'#c8f0ff', fx:{ k:'atk_zap', d:2, n:2 } },
  'eau+foudre':{ n:'Ranton', col:'#6a9ad8', fx:{ k:'soc_self', a:2, h:4 } },
  'feu+foudre':{ n:'Éclair ardent', col:'#ff6ad8', fx:{ k:'atk_self', a:3, h:0 } },
  'terre+vent':{ n:'Jiton', col:'#d8b878', fx:{ k:'eot_self', a:0, h:3 } },
};
// fusions à trois éléments : compagnon de niveau 4 ou plus
const FUSIONS3 = {
  'eau+terre+vent':{ n:'Forêt glaciaire', col:'#8fe0c8', fx:{ k:'eot_buff_all', a:2, h:3 } },
  'feu+foudre+vent':{ n:'Ciel ardent', col:'#ffb0e0', fx:{ k:'soc_dmg', d:5, n:4 } },
  'eau+feu+terre':{ n:'Volcan', col:'#ff4a2a', fx:{ k:'soc_aoe', d:4 } },
  'eau+foudre+terre':{ n:'Cataclysme', col:'#8a9ad8', fx:{ k:'dr_dmg', d:8, n:3 } },
};
const fusionOf = (a, b) => a && b && a !== b ? FUSIONS[[a, b].sort().join('+')] || null : null;
const fusion3Of = (a, b, c) => a && b && c && new Set([a, b, c]).size === 3 ? FUSIONS3[[a, b, c].sort().join('+')] || null : null;
// niveaux d'entraînement du compagnon : expérience gagnée en lançant des techniques (+1) et en gagnant un combat (+2)
const XP_LV = [0, 3, 7, 12, 18];
const compLv = m => { let lv = 1; XP_LV.forEach((x, k) => { if ((m.xp || 0) >= x) lv = k + 1; }); return Math.min(5, lv); };
const eqSlots = m => 3 + (compLv(m) >= 3 ? 1 : 0) + (compLv(m) >= 5 ? 1 : 0);
// pouvoirs fixes du compagnon aux niveaux 3 et 5, propres à son clan
const COMP_LV = {
  feu:{ 3:['Début du duel : 2 dégâts à l\'adversaire', { k:'soc_dmg', d:2, n:1 }], 5:['Après avoir attaqué : gagne +3 attaque', { k:'atk_self', a:3, h:0 }] },
  vent:{ 3:['Furie des vents (attaque deux fois)', 'w'], 5:['Après avoir attaqué : 2 dégâts à l\'ennemi', { k:'atk_zap', d:2, n:1 }] },
  eau:{ 3:['Début du duel : gagne +0/+4', { k:'soc_self', a:0, h:4 }], 5:['Quand il survit à un coup : +2/+2', { k:'surv_self', a:2, h:2 }] },
  foudre:{ 3:['Après avoir attaqué : 2 dégâts à l\'ennemi', { k:'atk_zap', d:2, n:1 }], 5:['Début du duel : 3 dégâts à l\'adversaire', { k:'soc_dmg', d:3, n:1 }] },
  terre:{ 3:['Début du duel : gagne +2/+0', { k:'soc_self', a:2, h:0 }], 5:['Après avoir attaqué : +1/+1', { k:'atk_self', a:1, h:1 }] },
};
function giveXp(m, n) { const before = compLv(m); m.xp = (m.xp || 0) + n; const after = compLv(m); for (let l = before + 1; l <= after; l++) { const P = (COMP_LV[CLAN_EL[CD(m.c).tr]] || {})[l]; if (P) withSrc('Niveau ' + l, () => { if (typeof P[1] === 'string') addF(m, P[1]); else (m.x = m.x || []).push(Object.assign({ src:'Niveau ' + l }, P[1])); }); } m.lv = after; }
// coût en chakra d'une technique (réductions des héros et des effets)
const ckCost = (p, S) => Math.max(0, (S.ck || 0) - (p.spd || 0) - ((htr(p, 'pspell') || {}).n || 0) - ((HEROES[p.hero] && HEROES[p.hero].pw && HEROES[p.hero].pw.k === 'ptechc') && S.nin ? 1 : 0));
const ckmCost = (p, md) => Math.max(0, md.c - ((htr(p, 'pawk') || {}).n || 0));
const CLAN_EL = { n_feu:'feu', n_vent:'vent', n_eau:'eau', n_foudre:'foudre', n_terre:'terre' };
const isComp = m => !!(m && C[m.c] && C[m.c].comp);
// Cinq Nations : le compagnon est déjà en jeu (triplé) à côté du héros, hors plateau
const comps = p => p.cp ? [p.cp] : (p.bd || []).filter(isComp);
const compEl = m => m.el || CLAN_EL[CD(m.c).tr] || null;
const spCost = (p, S) => S.ring ? (loHero(p, 'pbilbon') ? 0 : S.c) : p.hero === 'sylvara' && !p.sylv ? Math.max(0, S.c - 1) : (HEROES[p.hero] && HEROES[p.hero].pw && HEROES[p.hero].pw.k === 'ptechc') && S.nin ? Math.max(0, S.c - (awakeNow() ? 2 : 1)) : S.c;
const trigBoard = (G, p, tr) => p.bd.concat(p.cp ? [p.cp] : []).forEach(x => fxOf(x, tr).forEach(e => runRecruit(G, p, x, e)));
const SQ = ['sq_feu', 'sq_eau', 'sq_terre', 'sq_vent', 'sq_glace', 'sq_foudre'];
const isSq = m => SQ.includes(tribe(m));
const elems = list => new Set(list.filter(x => x.h > 0 && isSq(x)).map(tribe)).size;
const sellValue = m => 1 + fxOf(m, 'sell').reduce((t, e) => t + e.n * mult(m), 0);

const OPS = {
  buy(G, p, a) { const i = a.i; if (p.g < 3 || p.hd.length >= 10 || !p.sh[i]) return false; p.g -= 3; qAdd(p, 'buys'); const m0 = p.sh.splice(i, 1)[0]; p.hd.push(m0); if (!m0.sp) { p.bt = p.bt || {}; p.bt[tribe(m0)] = (p.bt[tribe(m0)] || 0) + 1; p.btN = (p.btN || 0) + 1; } p.bd.slice().forEach(x => fxOf(x, 'buy').forEach(e => runRecruit(G, p, x, e, m0))); spent(G, p, 3); handIn(p); checkTriple(G, p); return true; },
  sellit(G, p, a) { const x = p.hd[a.i]; if (!x || !x.sp || !SPELLS[x.sp] || !SPELLS[x.sp].ni) return false; p.hd.splice(a.i, 1); itBack(G, x.sp); p.g += 1; qAdd(p, 'sells'); return true; },   // Naruto : revendre un objet depuis la main (1 or, il retourne dans la réserve)
  sell(G, p, a) { const m = p.bd[a.i]; if (!m) return false; if (m.it) { itL(m).forEach(id => itBack(G, id)); delete m.it; } if (m.ring && p.hd.length >= 10) return false; p.bd.splice(a.i, 1); if (m.ring) { delete m.ring; delete m.rc; p.hd.push({ sp:LO_RING, u:UID++ }); } if (p.ck) p.ck = Math.min(p.ck, ckMax(p)); p.g += 1; if (inMech(G, 'marche', m) && (p.mkt || 0) < 2) { p.g += 1; p.mkt = (p.mkt || 0) + 1; } fxOf(m, 'sell').forEach(e => runRecruit(G, p, m, e)); p.bd.slice().forEach(x => fxOf(x, 'osell').forEach(e => runRecruit(G, p, x, e, m))); { const t = htr(p, 'pturn'); if (t && t.sell) p.g += t.sell; } { const w = htr(p, 'psell'); if (w && !(w.once && p.soldT)) { p.inc = p.inc || []; p.inc[0] = (p.inc[0] || 0) + (w.n || 1); } p.soldT = 1; } { const w = htr(p, 'psellshop'); if (w) withSrc('Pouvoir de ' + HEROES[p.hero].n.split(' ')[0], () => { for (let i = 0; i < (w.n || 2); i++) { const o = p.sh.filter(x => !x.sp); if (o.length) buff(pickR(o), w.a || 1, w.h || 1); } }); } qAdd(p, 'sells'); toPool(G, m); return true; },
  play(G, p, a) {
    const m = p.hd[a.i]; if (!m || m.sp) return false;
    if (lkd(p, m)) return false; delete m.lk;   // carte du héros : verrouillée tant que la taverne n'a pas son niveau
    // plateau plein : seul le Magnétisme reste jouable, à gauche d'un serviteur de sa famille (règle de Champs de bataille)
    if (p.bd.length >= 7) { const q = Math.max(0, Math.min(a.pos == null ? p.bd.length : a.pos, p.bd.length)); if (!(fxOf(m, 'pas').some(e => e.k === 'magnet') && p.bd[q] && tribeOk(p.bd[q], tribe(m)))) return false; }
    p.hd.splice(a.i, 1);
    const pos = Math.max(0, Math.min(a.pos == null ? p.bd.length : a.pos, p.bd.length));
    // Magnétisme : joué juste à gauche d'un serviteur de sa famille, il fusionne avec lui
    if (fxOf(m, 'pas').some(e => e.k === 'magnet') && p.bd[pos] && tribeOk(p.bd[pos], tribe(m))) {
      const tgt = p.bd[pos];
      withSrc('Magnétisme · ' + CD(m.c).n, () => { buff(tgt, m.a, m.h); addF(tgt, m.f); (CD(m.c).fxAll || []).filter(e => e.k !== 'magnet').forEach(e => xAdd(tgt, e, CD(m.c).n)); (m.x || []).forEach(e => (tgt.x = tgt.x || []).push(e)); });
      qAdd(p, 'play', 1, CD(m.c).tr); qAdd(p, 'magnets');
      p.bd.slice().forEach(x => fxOf(x, 'play').forEach(e => runRecruit(G, p, x, e, m)));
      p.hd.forEach(x => { if (!x.sp) fxOf(x, 'hplay').forEach(e => runRecruit(G, p, x, e, m)); });
      return true;
    }
    p.bd.splice(pos, 0, m);
    if (loOn(G) && G.tm && loRingIn(p)) loReact(G, p, m);
    if (p.horA && tribeOk(m, 'si_hor')) withSrc('Horror Show', () => buff(m, p.horA, 0));
    if (p.kk && fxOf(m, 'pas').some(e => e.k === 'pas_kk')) withSrc('Kang et Kodos', () => buff(m, p.kk * mult(m), p.kk * mult(m)));
    p.hd.forEach(x => { if (!x.sp) fxOf(x, 'hplay').forEach(e => runRecruit(G, p, x, e, m)); });
    if (p.hero === 'leon' && tribe(m) === 'sq_terre') withSrc('Passif de Léon', () => { addF(m, 't'); buff(m, 1, 2); });
    qAdd(p, 'play', 1, CD(m.c).tr);
    { const w = htr(p, 'pplay'); if (w && tribeOk(m, w.tb)) withSrc('Pouvoir de ' + HEROES[p.hero].n.split(' ')[0], () => buff(m, w.a || 0, w.h || 0)); }
    if (NJ_PACTM.includes(m.c)) qAdd(p, 'pactPlay'); if (NJ_KG.includes(m.c)) { qAdd(p, 'kgPlay'); qSet(p, 'kgBoard', p.bd.filter(x => NJ_KG.includes(x.c)).length); }
    if (htr(p, 'pkgs') && NJ_KG.includes(m.c)) withSrc('Pouvoir de Haku', () => addF(m, 's'));
    const nbc = auraTimes(p.bd, 'aura_bc');
    for (let r = 0; r < nbc; r++) fxOf(m, 'bc').forEach(e => runRecruit(G, p, m, e));
    p.bd.slice().forEach(x => { if (x !== m) fxOf(x, 'play').forEach(e => runRecruit(G, p, x, e, m)); });
    if (m.tr) { delete m.tr; if (p.hd.length < 10 && !p.disc) { const tt = Math.min(6, p.t + 1), opts = []; for (let i = 0; i < 3; i++) { const r = drawOne(G, 6, tt) || (typeof drawAny === 'function' ? drawAny(tt) : null); if (r) opts.push(r); } if (opts.length) p.disc = opts; } }   // récompense de triple : découverte au niveau supérieur
    checkTriple(G, p); return true;
  },
  move(G, p, a) { const m = p.bd[a.i]; if (!m) return false; p.bd.splice(a.i, 1); p.bd.splice(Math.max(0, Math.min(a.to, p.bd.length)), 0, m); return true; },
  roll(G, p) { const free = (p.hero === 'rivet' || (htr(p, 'pturn') || {}).roll) && p.rr === 0; if (!free && p.g < 1) return false; if (!free) { p.g -= 1; spent(G, p, 1); } p.rr++; qAdd(p, 'rolls'); p.fz = false; fillShop(G, p); trigBoard(G, p, 'roll'); return true; },
  frz(G, p) { p.fz = !p.fz; return true; },
  up(G, p) { const c = upCost(p); if (p.t >= 6 || p.g < c) return false; p.g -= c; p.t++; p.uc = +RU().up[p.t] || 0; spent(G, p, c); trigBoard(G, p, 'up'); if (htr(p, 'pupdisc') && !p.disc && p.hd.length < 10) discTier(G, p, p.t - 1); if (inMechAny(G, 'chakra') && nkOn(p, 'anciens') > 1 && !p.disc && p.hd.length < 10) { const opts = []; for (let i = 0; i < 3; i++) { const c = drawOne(G, p.t, null, 'nk_sun'); if (c) opts.push(c); } if (opts.length) p.disc = opts; } if (htr(p, 'pkg') && p.t >= 3) withSrc('Pouvoir de Mei', () => kgCard(G, p)); return true; },
  comp(G, p) { const id = compOf(p.hero); if (inMechAny(G, 'chakra') || !id || !C[id] || (p.cb || 0) >= compLimit(G.rd) || p.g < 3 || p.hd.length >= 10) return false; p.g -= 3; p.cb = (p.cb || 0) + 1; p.hd.push(mk(id, 0)); checkTriple(G, p); return true; },
  pow(G, p) { const r = withSrc(HEROES[p.hero] ? 'Pouvoir de ' + HEROES[p.hero].n.split(' ')[0] : null, () => OPS.pow0(G, p)); if (r) checkTriple(G, p); return r; },   // jetons invoqués par le pouvoir : triple possible
  pow0(G, p) {
    const h = HX(p); if (!h || !h.cost || p.pu || powPurse(G, p) < h.cost) return false;
    if (h.pw && !powRun(G, p, h.pw)) return false;
    { const el = NJ_RSV && inMechAny(G, 'chakra') && /^nh_/.test(p.hero) && !h.norsv && CLAN_EL[domVils(p)[0]]; if (el && typeof rsvFill === 'function') withSrc('Réservoir', () => rsvFill(G, p, el)); }
    if (heroCk(G, p)) p.ckSpent = 1;
    if (p.hero === 'egide') { const c = p.bd.filter(m => !has(m, 's')); if (!c.length) return false; addF(pickR(c), 's'); }
    if (p.hero === 'ondine') { if (!p.bd.length) return false; buff(pickR(p.bd), 1, 2); }
    if (p.hero === 'paul') { const f = p.bd.filter(m => tribe(m) === 'sq_feu'); if (!f.length) return false; const t = pickR(f); buff(t, 2, 1); f.forEach(m => { if (m !== t) buff(m, 1, 0); }); }
    if (p.hero === 'zoe') { if (p.hd.length >= 10) return false; const tr = 'sq_eau'; const c = drawOne(G, p.t, null, tr) || (() => { const ids = POOL_IDS.filter(id => C[id].tr === tr && C[id].t <= p.t && C[id].t > 0); return ids.length ? mk(pickR(ids), 0) : null; })(); if (!c) return false; p.hd.push(c); checkTriple(G, p); }
    if (p.hero === 'jeanne') { const z = p.bd.filter(m => tribe(m) === 'sq_vent'); if (!z.length) return false; const n = z.length; z.forEach(m => { m.tmp = { a:((m.tmp && m.tmp.a) || 0) + n, h:((m.tmp && m.tmp.h) || 0) + n, f:(m.tmp && m.tmp.f) || '', s:'Pouvoir de Jeanne' }; }); }
    if (p.hero === 'nono') { if (G.rd < 3) return false; p.fbq = true; }
    if (p.hero === 'selene') { if (!p.bd.length) return false; const t = pickR(p.bd); buff(t, 1, 1); (t.x = t.x || []).push({ k:'atk_self', a:1, h:1, src:'Pouvoir de Sélène' }); }
    if (p.hero === 'brok') { const c = p.bd.filter(m => !has(m, 't')); if (!c.length) return false; const t = pickR(c); addF(t, 't'); }
    if (p.hero === 'grumbo') { if (!p.bd.length) return false; const t = p.bd.slice().sort((a, b) => b.a - a.a)[0]; buff(t, 3, 3); }
    if (p.hero === 'vaskor') { if (p.bd.length >= 7 || !C.m_squelette) return false; const t = mk('m_squelette', 0); addF(t, 'r'); p.bd.push(t); }
    if (p.hero === 'oren') { if (p.hd.length >= 10) return false; const m = drawOne(G, 6, p.t); if (!m) return false; p.hd.push(m); checkTriple(G, p); }
    if (heroKi(p)) { p.ki -= h.cost; qAdd(p, 'kiSpent', h.cost); } else if (heroCk(G, p)) p.ck -= h.cost; else { p.g -= h.cost; spent(G, p, h.cost); } p.pun = (p.pun || 0) + 1; p.pu = p.pun >= loPowMax(G, p); trigBoard(G, p, 'pow'); return true;
  },
  rdy(G, p) { p.rdy = !p.rdy; return true; },
  // entraînement : les coffres s'ouvrent gratuitement, les équipements se rangent comme des médailles
  chest(G, p) {
    const k = p.pendChest || '', m = /^(min|maj)([1-6])$/.exec(k); if (!m) return false;
    const q = m[1], t = +m[2]; p.pendChest = null;
    if (p.cp && awake(G)) { p.choice = awkChoice(G, p, q, t); p.loot = []; return true; }
    if (p.cp) {   // Ninja : 3 améliorations au choix, et une technique en bonus si l'une d'elles est épique ou légendaire
      p.choice = chestChoice(q, t); p.loot = [];
      if (Math.max(...p.choice.map(o => o.r)) >= 2 && p.hd.length < 10) { const sp = drawSpell(Math.max(1, t)); if (sp) { p.hd.push(sp); p.loot.push({ id:sp.sp }); } }
      return true;
    }
    p.eqs = p.eqs || []; p.eqlv = p.eqlv || {}; p.loot = [];
    chestLoot(q, t, p).forEach(id => {
      if (!(SPELLS[id] && SPELLS[id].eq)) { if (p.hd.length < 10) { p.hd.push({ sp:id, u:UID++ }); p.loot.push({ id }); } return; }
      const worn = comps(p).find(m => (m.eq || []).includes(id));
      if (worn || p.eqs.includes(id)) {            // déjà obtenu : on l'améliore
        p.eqlv[id] = Math.min(EQ_MAXLV, (p.eqlv[id] || 1) + 1);
        if (worn) withSrc('Amélioration · ' + SPELLS[id].n, () => eqUpgrade(worn, id));
        p.loot.push({ id, lv:p.eqlv[id], up:1, worn:!!worn });
      } else if (p.eqs.length < EQS_MAX) { p.eqs.push(id); p.eqlv[id] = p.eqlv[id] || 1; p.loot.push({ id, lv:p.eqlv[id] }); }
    });
    return true;
  },
  // fixer l'élément du compagnon (2 chakra)
  cpel(G, p, a) { if (!p.cp || !ELS[a.el] || (p.ck || 0) < 2 || compEl(p.cp) === a.el) return false; p.ck -= 2; p.ckSpent = 1; p.cp.el = a.el; p.cp.elLock = 1; return true; },
  // choisir une des 3 améliorations du coffre
  // choix obligatoire d'une récompense sur 3 : elle se range dans l'inventaire, les 2 autres sont perdues
  upick(G, p, a) { const o = p.choice && p.choice[a.i]; if (!o || !p.cp) return false;
    if (o.kind && p.chFav && p.hd.length < 10) { giveAwkCard(G, p, o); p.choice = null; p.lastUp = o; return true; }   // gratuit pour les derniers
    p.ups = (p.ups || []).concat([o]).sort((x, y) => y.r - x.r).slice(0, UPS_MAX);
    p.choice = null; p.lastUp = o; return true; },
  // poser une amélioration rangée : coûte du chakra selon sa rareté
  uapply(G, p, a) { const o = (p.ups || [])[a.i]; if (!o || !p.cp) return false; const c = upgCost(o); if ((p.ck || 0) < c) return false; if (o.kind) { if (p.hd.length >= 10) return false; p.ck -= c; giveAwkCard(G, p, o); p.ups.splice(a.i, 1); return true; } p.ck -= c; applyUp(p.cp, Object.assign({ p }, o)); p.ups.splice(a.i, 1); return true; },
  // équiper le compagnon coûte du chakra
  equip(G, p, a) {
    const id = (p.eqs || [])[a.i]; if (!id || !SPELLS[id]) return false;
    const c = EQ_COST(id); if ((p.ck || 0) < c) return false;
    const comp = comps(p).find(m => (m.eq || []).length < eqSlots(m) && !(m.eq || []).includes(id)); if (!comp) return false;
    p.ck -= c; p.ckSpent = 1; p.eqs.splice(a.i, 1);
    withSrc('Inventaire · ' + SPELLS[id].n, () => { applyEquip(comp, id); for (let l = 1; l < ((p.eqlv || {})[id] || 1); l++) eqUpgrade(comp, id); });
    return true;
  },
  buysp(G, p, a) { const k = a && +a.k === 1 ? 'sp2' : 'sp', it = p[k], S = it && SPELLS[it.sp]; const c = S ? spCost(p, S) : 0; if (!S || p.g < c || p.hd.length >= 10) return false; if (S.ni && itHave(p, it.sp)) return false; /* Naruto : pas un objet déjà en main ou déjà porté, ni sans un de ses propriétaires sur le plateau ou dans la main */ p.g -= c; if (p.hero === 'sylvara') p.sylv = true; p.hd.push(it); p[k] = null; spent(G, p, c); handIn(p); return true; },
  med(G, p, a) { const m = p.bd[a.i]; if (!m || !inMechAny(G, 'ki')) return false; m.med = m.med ? 0 : 1; return true; },
  portal(G, p, a) { const m = p.bd[a.i]; if (!m || !inMechAny(G, 'portail') || (p.pf || 0) < 1) return false; if (!doPortal(G, p, m)) return false; p.pf -= 1; return true; },
  fuse(G, p, a) { const m = p.bd[a.i], F = DB_FUS.find(f => f.id === a.f); if (!m || !F || !inMechAny(G, 'ki') || (p.ki || 0) < F.c || !fusPartner(p, m, F)) return false; p.ki -= F.c; qAdd(p, 'kiSpent', F.c); return doFusion(G, p, m, F); },
  tf(G, p, a) { const m = p.bd[a.i]; if (!m) return false; const c = tfCost(p, m); if (c == null || (p.ki || 0) < c) return false; p.ki -= c; qAdd(p, 'kiSpent', c); doTransform(p, m); checkTriple(G, p); return true; },
  jutsu(G, p, a) { const m = p.bd[a.i]; return !!m && doJutsu(G, p, m); },
  nktf(G, p, a) { const m = p.bd[a.i]; if (!m || !doNkTf(G, p, m)) return false; checkTriple(G, p); return true; },
  ckm(G, p, a) { const m = p.bd[a.i]; if (!m || m.awk) return false; const md = (CD(m.c).fxAll || []).find(x => x.k === 'ckm'); if (!md || (p.ck || 0) < ckmCost(p, md)) return false;
    p.ck -= ckmCost(p, md); m.awk = 1; qAdd(p, 'awk'); withSrc('Éveil · ' + CD(m.c).n, () => { buff(m, md.c * mult(m), md.c * mult(m)); runMode(G, p, m, md.m); }); checkTriple(G, p); return true; },
  // portail (duos) : passer une carte de sa main à son allié pour 1 or
  pass(G, p, a) { if (!loOn(G) || !G.tm || p.disc) return false; const al = loAlly(G, p), it = p.hd[a.i]; if (!al || !al.al || !it || al.hd.length >= 10) return false;
    const free = loDuoB(G, p).pass || (it.sp === LO_RING && loHero(p, 'pring')); if (!free) { if (p.g < 1) return false; p.g -= 1; }
    p.hd.splice(a.i, 1); al.hd.push(it); if (!it.sp) checkTriple(G, al); loRingSync(G); return true; },
  cast(G, p, a) { const it = p.hd[a.i]; if (!it || !it.sp || p.disc) return false; if (it.sp === LO_RING && loOn(G)) return false; return castSpell(G, p, a.i, a.tg); },
  choose(G, p, a) { const ch = p.cho; if (!ch || !ch.o[a.i]) return false; p.cho = null; const m = p.bd.find(x => x.u === ch.u); if (m) runRecruit(G, p, m, ch.o[a.i]); checkTriple(G, p); return true; },
  pick(G, p, a) { if (!p.disc || !p.disc[a.i]) return false; const m = p.disc.splice(a.i, 1)[0]; p.disc.forEach(x => { if (!x.sp) toPool(G, x); else itBack(G, x.sp); }); p.disc = null; p.dsc = null; if (p.hd.length < 10) { p.hd.push(m); handIn(p); } else if (!m.sp) toPool(G, m); else itBack(G, m.sp); if (p.discQ > 0 && !p.disc) { p.discQ--; discTier(G, p, p.discT); } if (!p.disc) nkLootOffer(G, p); if (loOn(G)) loOffer(G, p); checkTriple(G, p); return true; },
};

// pouvoirs décrits par des données (héros des Cinq Nations)
const rsvHas = (p, el) => (p.rsv || []).includes(el);
const pwPool = (p, w) => (p.bd || []).filter(m => !w.tb || tribe(m) === w.tb);
function powCanW(p, w) {
  if (w.k === 'multi') return (w.s || []).some(st => powStepCan(p, st));
  switch (w.k) {
    case 'ck': return (p.ck || 0) < ckMax(p);
    case 'tech': return (p.hd || []).length < 10;
    case 'buffr': case 'buffall': return pwPool(p, w).length > 0;
    case 'kw': return (p.bd || []).some(m => !has(m, w.kw));
    case 'tma': return (p.bd || []).length > 0;
    case 'fire': return true;
    case 'rfill': case 'ctr': case 'rollg': return true;
    case 'rpure': return (p.rsv || []).length === 1;
    case 'mist': return (p.bd || []).some(m => !has(m, 's') && !(m.tmp && (m.tmp.f || '').includes('s')));
    case 'rcycle': case 'rdump': return (p.rsv || []).length === 1;
    case 'braisebuff': return (p.braise || 0) >= w.n && pwPool(p, w).length > 0;
    case 'techel': return (p.hd || []).length < 10;
    case 'tmamaree': return (p.maree || 0) >= 2 && (p.bd || []).length > 0;
    case 'ckmaree': case 'chargebuff': return true;
    case 'g2ck': return (p.g || 0) >= w.g + ((HEROES[p.hero] && HEROES[p.hero].cost) || 0) && (p.ck || 0) < ckMax(p);
    case 'kwbuff': case 'buffrsv': return pwPool(p, w).length > 0;
  }
  return false;
}
// pouvoirs à étapes (héros Ninja) : chaque étape est un petit effet
function powStepCan(p, s) {
  switch (s.k) {
    case 'nclone': return (p.bd || []).length < 7 && (p.bd || []).some(x => x.c !== 'tk_kclone');
    case 'toad': case 'snake': case 'summonr': return (p.bd || []).length < 7;
    case 'hxall': return (p.bd || []).length > 0;
    case 'hx': return !!nhPick(p, s.who, x => !(x.nhx || []).some(e => e.k === s.fx[0].k));
    case 'hguard': { const a = nhPick(p, 'atk'); return !!(a && nhPick(p, 'hp', x => x !== a && x.c !== a.c)); }
    case 'hbee': return (p.bd || []).length > 0;
    case 'devlow': return (p.bd || []).length > 0 && (p.sh || []).some(x => !x.sp);
    case 'foegenj': case 'foetop': case 'foeburn': return true;
    case 'buffr': case 'buffall': case 'buffhi': return pwPool(p, s).length > 0;
    case 'kw': return pwPool(p, s).some(m => !has(m, s.kw));
    case 'tkw': return (p.bd || []).some(m => !has(m, s.kw) && !(m.tmp && (m.tmp.f || '').includes(s.kw)));
    case 'tma': return (p.bd || []).length > 0;
    case 'comp': return comps(p).length > 0;
    case 'card': case 'tech': case 'techel': return (p.hd || []).length < 10;
    case 'ck': return (p.ck || 0) < ckMax(p);
    case 'summon': return (p.bd || []).length < 7;
    case 'cardbuff': return (p.bd || []).some(m => m.c === s.card);
    case 'tokbuff': return (p.bd || []).some(isTok);
    case 'tffree': case 'rage': return (p.bd || []).length > 0;
    case 'absorbw': return (p.bd || []).length > 1;
    case 'tfbest': return (p.bd || []).length > 0;
    case 'item': case 'itemr': case 'disc': return (p.hd || []).length < 10 && !p.disc;
    case 'seal': case 'sealhi': case 'drgive': case 'kggive': case 'sacr': return (p.bd || []).length > (s.k === 'sacr' ? 1 : 0);
    case 'pact': return (p.bd || []).length < 7;
    case 'cardset': case 'kgcard': return (p.hd || []).length < 10;
    case 'awkall': return (p.bd || []).some(m => m.awk);
    case 'awkfree': return (p.bd || []).some(m => !m.awk && (CD(m.c).fxAll || []).some(x => x.k === 'ckm')) || (s.ck && (p.ck || 0) < ckMax(p));
    case 'rsvsame': return true;
    case 'pf': return (p.pf || 0) < pfMax(p);
    case 'buffrm': return (p.bd || []).some(isRM);
    case 'bufftier': return (p.bd || []).some(m => tierOf(m) <= s.t || CD(m.c).tok);
    case 'buffnb': return (p.bd || []).some((m, i) => nbFam(p.bd, i) > 0);
    case 'bandbuff': return bandsOf(p.bd || []).length > 0;
    case 'regroup': return (p.bd || []).length > 1;
    case 'buffchain': case 'buffmain': return (p.bd || []).length > 0;
    case 'gagup': return (p.bd || []).length > 0;
    case 'gagnow': return (p.bd || []).some(m => fxOf(m, 'eot').some(isGag));
    case 'bufftaunt': return (p.bd || []).some(m => has(m, 't'));
    case 'shieldtaunt': return (p.bd || []).length > 0;
    case 'robshop': return (p.bd || []).length > 0 && (p.sh || []).some(x => !x.sp && (x.a > 1 || x.h > 1));
    case 'gaggive': return (p.bd || []).length > 0;
    case 'donut': return (p.hd || []).length < 10;
    case 'buffbought': return (p.bd || []).length > 0;
    case 'raf': return !p.raf;
  }
  return true;
}
// héros Naruto : serviteur visé par le pouvoir (le plus fort, le plus d'ATQ, le plus de PV)
function nhPick(p, who, ok) { const o = (p.bd || []).filter(m => !ok || ok(m)); if (!o.length) return null; const v = m => who === 'atk' ? m.a * 1000 + m.h : who === 'hp' ? m.h * 1000 + m.a : m.a + m.h; return o.reduce((b, x) => v(x) > v(b) ? x : b); }
function powStep(G, p, s) {
  const N = s.n || 1;
  switch (s.k) {
    case 'ck': p.ck = Math.min(ckMax(p), (p.ck || 0) + s.n); break;
    case 'g': p.g += s.n; break;
    case 'mk': mkAdd(p, s.el, s.n); break;
    case 'fire': p.njf = (p.njf || 0) + s.d; break;
    // ----- héros Naruto : pouvoirs fidèles à l'animé -----
    case 'nclone': { const m = nhPick(p, 'top', x => x.c !== 'tk_kclone'); if (m) nkClone(p, m, 1); break; }
    case 'snake': { const b = p.bd.length; recruitSummon(p, 'tk_serpent', 0, p.bd[b - 1]); const m = p.bd.length > b ? p.bd[p.bd.length - 1] : null; if (m && m.c === 'tk_serpent') { m.a = p.t + 2; m.h = p.t + 1; } break; }
    case 'toad': { const b = p.bd.length; recruitSummon(p, 'tk_crapaud', 0, p.bd[b - 1]); const m = p.bd.length > b ? p.bd[p.bd.length - 1] : null; if (m && m.c === 'tk_crapaud') { m.a = p.t + 1; m.h = p.t + 2; } break; }
    case 'summonr': if (p.bd.length < 7) recruitSummon(p, pickR(s.cards), 0, p.bd[p.bd.length - 1]); break;
    case 'hxall': p.bd.forEach(m => { m.nhx = (m.nhx || []).concat(s.fx.map(o => Object.assign({ src:BSRC || 'Pouvoir du héros' }, o))); }); break;
    case 'hx': { const m = nhPick(p, s.who, x => !(x.nhx || []).some(e => e.k === s.fx[0].k)); if (m) m.nhx = (m.nhx || []).concat(s.fx.map(o => Object.assign({ src:BSRC || 'Pouvoir du héros' }, o))); break; }
    case 'hguard': { const a = nhPick(p, 'atk'), g = a && nhPick(p, 'hp', x => x !== a && x.c !== a.c); if (g) g.nhx = (g.nhx || []).concat([{ k:'guard', card:a.c, n:99, src:BSRC || 'Pouvoir du héros' }]); break; }
    case 'devlow': { const o = (p.bd || []).slice(); if (!o.length) break; const m = o.reduce((w, x) => x.a + x.h < w.a + w.h ? x : w); devour(G, p, m, mult(m)); break; }
    case 'hbee': { const m = nhPick(p, 'atk'); if (m) nkTmp(m, s.a / mult(m), 0, 'w', BSRC || 'Pouvoir du héros'); break; }
    case 'foegenj': p.foe = p.foe || {}; p.foe.genj = (p.foe.genj || 0) + (s.n || 1); break;
    case 'foetop': p.foe = p.foe || {}; p.foe.top = (p.foe.top || 0) + s.d; break;
    case 'foeburn': p.foe = p.foe || {}; p.foe.burn = { n:s.n, d:s.d }; break;
    case 'tma': p.tma = { a:((p.tma && p.tma.a) || 0) + (s.a || 0), h:((p.tma && p.tma.h) || 0) + (s.h || 0) }; break;
    case 'buffr': for (let i = 0; i < N; i++) { const o = pwPool(p, s); if (o.length) buff(pickR(o), s.a || 0, s.h || 0); } break;
    case 'buffall': pwPool(p, s).forEach(m => buff(m, s.a || 0, s.h || 0)); break;
    case 'buffhi': { const o = pwPool(p, s); if (o.length) { const m = o.reduce((b, x) => x.a + x.h > b.a + b.h ? x : b); buff(m, s.a || 0, s.h || 0); if (s.kw) addF(m, s.kw); } break; }
    case 'kw': shuffle(pwPool(p, s).filter(m => !has(m, s.kw))).slice(0, N).forEach(m => { addF(m, s.kw); if (s.a || s.h) buff(m, s.a || 0, s.h || 0); }); break;
    case 'tkw': shuffle((p.bd || []).filter(m => !has(m, s.kw) && !(m.tmp && (m.tmp.f || '').includes(s.kw)))).sort((x, y) => (x.tmp ? 1 : 0) - (y.tmp ? 1 : 0)).slice(0, N)   /* d'abord un serviteur qui n'a encore rien reçu ce tour : « un autre » */.forEach(m => { m.tmp = { a:((m.tmp && m.tmp.a) || 0) + (s.a || 0), h:((m.tmp && m.tmp.h) || 0) + (s.h || 0), f:((m.tmp && m.tmp.f) || '') + s.kw, s:BSRC || 'Pouvoir' }; }); break;
    case 'comp': comps(p).forEach(c => buff(c, s.a || 0, s.h || 0)); break;
    case 'card': for (let i = 0; i < N; i++) if (p.hd.length < 10) { const c = drawOne(G, p.t, null, s.tb) || drawOne(G, p.t, null, null); if (c) p.hd.push(c); } break;
    case 'tech': for (let i = 0; i < N; i++) if (p.hd.length < 10) { const sp = drawSpell(p.t); if (sp) p.hd.push(sp); } break;
    case 'techel': { const lo = SPELL_IDS.filter(id => SPELLS[id].nin && !SPELLS[id].forb && SPELLS[id].el === s.el).reduce((m, id) => Math.min(m, SPELLS[id].t), 9); for (let i = 0; i < N; i++) if (p.hd.length < 10) { const sp = drawSpell(Math.max(p.t, lo), s.el); if (sp) p.hd.push(sp); } break; }
    case 'roll': p.fz = false; fillShop(G, p); trigBoard(G, p, 'roll'); qAdd(p, 'rolls'); break;
    case 'summon': for (let i = 0; i < N; i++) if (p.bd.length < 7) recruitSummon(p, s.card, 0, p.bd[p.bd.length - 1]); break;
    case 'cardbuff': p.bd.filter(m => m.c === s.card).forEach(m => buff(m, s.a || 0, s.h || 0)); break;
    case 'clones': p.bd.filter(m => m.c === 'tk_clone').forEach(m => buff(m, s.a || 0, s.h || 0)); break;
    case 'tokbuff': p.bd.filter(isTok).forEach(m => buff(m, s.a || 0, s.h || 0)); break;
    case 'ki': kiAdd(p, N); break;
    case 'tffree': for (let i = 0; i < N; i++) { const o = p.bd.filter(m => tfOf(m) && tfOf(m).st[m.tf || 0]); if (o.length) doTransform(p, pickR(o)); else if (p.bd.length) buff(pickR(p.bd), 2, 2); } break;
    case 'rage': { const m = pickR(p.bd); if (m) (p.dbDied || 0) > 0 ? buff(m, s.a, s.h) : buff(m, s.a2, s.h2); break; }
    case 'item': if (p.hd.length < 10) p.hd.push({ sp:s.it, u:UID++ }); break;
    case 'itemr': if (p.hd.length < 10) { const ids = SPELL_IDS.filter(id => SPELLS[id].db && SPELLS[id].t <= p.t); if (ids.length) p.hd.push({ sp:pickR(ids), u:UID++ }); } break;
    case 'absorbw': { if (p.bd.length < 2) break; const v = x => x.a + x.h, hi = p.bd.reduce((b, x) => v(x) > v(b) ? x : b), lo = p.bd.filter(x => x !== hi).reduce((b, x) => v(x) < v(b) ? x : b); absorbInto(p, hi, lo, 'Absorption'); qAdd(p, 'absorbs'); break; }
    case 'tfbest': { const m = p.bd.slice().sort((x, y) => (y.tf || 0) - (x.tf || 0) || (y.a + y.h) - (x.a + x.h))[0]; if (m) buff(m, s.a || 0, s.h || 0); break; }
    case 'seal': shuffle(p.bd.slice()).slice(0, s.m || 1).forEach(m => sealAdd(p, m, N)); break;
    case 'sealhi': { if (!p.bd.length) break; const top = Math.max(...p.bd.map(m => m.sl || 0)); sealAdd(p, pickR(p.bd.filter(m => (m.sl || 0) === top)), N); break; }
    case 'pact': for (let i = 0; i < N; i++) pactSummon(p, s.card, p.bd[p.bd.length - 1]); break;
    case 'pactbuff': p.bd.filter(isPact).forEach(m => buff(m, s.a || 0, s.h || 0)); break;
    case 'cardset': if (p.hd.length < 10) { const ids = (s.set === 'pact' ? NJ_PACTM : NJ_KG).filter(id => C[id] && C[id].t <= Math.max(p.t, 2)); const c = ids.filter(id => G.pool[id] > 0); const id = pickR(c.length ? c : ids); if (id) { if (G.pool[id] > 0) G.pool[id]--; p.hd.push(mk(id, 0)); } } break;
    case 'drgive': { let c = p.bd.filter((m, i) => !(m.x || []).some(e => e.k === s.fx.k && e.src && /^Pouvoir/.test(e.src)) && (s.fx.k !== 'mentor' || (s.fx.n || 1) > 1 || i < p.bd.length - 1)); if (c.length < N) c = p.bd.slice(); shuffle(c).slice(0, N).forEach(m => { (m.x = m.x || []).push(Object.assign({ src:'Pouvoir de ' + HEROES[p.hero].n.split(' ')[0] }, s.fx)); }); break; }
    case 'foechill': p.foe = p.foe || {}; p.foe.chill = (p.foe.chill || []).concat(Array(s.n || 1).fill(s.a || 1)); break;
    case 'foeseal': p.foe = p.foe || {}; p.foe.seal = (p.foe.seal || 0) + (s.n || 1); break;
    case 'disc': { const tt = Math.min(6, p.t + 1), opts = []; for (let i = 0; i < 3; i++) { const m = drawOne(G, 6, tt) || drawAny(tt); if (m) opts.push(m); } if (opts.length) p.disc = opts; break; }
    case 'sacr': { qAdd(p, 'hakai'); if (p.bd.length < 2) break; const v = x => x.a + x.h, lo = p.bd.reduce((b, x) => v(x) < v(b) ? x : b), hi = p.bd.filter(x => x !== lo).reduce((b, x) => v(x) > v(b) ? x : b); p.bd.splice(p.bd.indexOf(lo), 1); toPool(G, lo); buff(hi, lo.a, lo.h); break; }
    case 'upd': p.uc = Math.max(0, p.uc - N); break;
    case 'spd': p.spd = (p.spd || 0) + N; break;
    case 'awkall': p.bd.forEach(m => { if (m.awk) { const md = (CD(m.c).fxAll || []).find(f => f.k === 'ckm'); if (md) withSrc('Éveil · ' + CD(m.c).n, () => runMode(G, p, m, md.m)); } }); break;
    case 'awkfree': { const o = p.bd.filter(m => !m.awk && (CD(m.c).fxAll || []).some(x => x.k === 'ckm')); if (!o.length) { if (s.ck) p.ck = Math.min(ckMax(p), (p.ck || 0) + s.ck); break; } const m = pickR(o), md = CD(m.c).fxAll.find(x => x.k === 'ckm'); m.awk = 1; qAdd(p, 'awk'); withSrc('Éveil · ' + CD(m.c).n, () => { buff(m, md.c * mult(m), md.c * mult(m)); runMode(G, p, m, md.m); }); break; }
    case 'rsvsame': { const r = p.rsv || []; const el = r[0] || CLAN_EL[domVils(p)[0]]; rsvFill(G, p, el); break; }
    case 'rsv2': { const d = domVils(p); p.rsv = []; rsvFill(G, p, CLAN_EL[d[0]]); rsvFill(G, p, CLAN_EL[d[1]]); break; }
    case 'cdbl': p.cnext = (p.cnext || 0) + 1; break;
    case 'kgcard': kgCard(G, p); break;
    case 'kggive': { const m = pickR(p.bd); if (m) (m.x = m.x || []).push({ k:'combo_self', a:s.a || 1, h:s.h || 1, src:'Yōton' }); break; }
    case 'kgbuff': { const o = p.bd.filter(m => NJ_KG.includes(m.c)); if (o.length) o.forEach(m => buff(m, s.a || 0, s.h || 0)); else kgCard(G, p); break; }
    case 'pf': pfAdd(p, N); break;
    case 'buffrm': p.bd.filter(isRM).forEach(m => buff(m, s.a || 0, s.h || 0)); break;
    case 'bufftier': p.bd.filter(m => tierOf(m) <= s.t || CD(m.c).tok).forEach(m => buff(m, s.a || 0, s.h || 0)); break;
    // ----- South Park : cohésion -----
    case 'buffnb': p.bd.forEach((m, i) => { if (nbFam(p.bd, i)) buff(m, s.a || 0, s.h || 0); }); break;
    case 'bandbuff': bandsOf(p.bd).forEach(b => { for (let i = b.s; i <= b.e; i++) buff(p.bd[i], s.a || 0, s.h || 0); }); break;
    case 'regroup': regroupFam(p.bd); qAdd(p, 'regroups'); break;
    case 'buffchain': { const done = new Set(); for (let r = 0; r < N; r++) { const c = p.bd.map((m, i) => ({ m, i, n:nbFam(p.bd, i) })).filter(x => !done.has(x.m)); if (!c.length) break; const top = Math.max(...c.map(x => x.n)), pick = pickR(c.filter(x => x.n === top)); done.add(pick.m); let lo = pick.i, hi = pick.i; while (lo > 0 && sameFam(p.bd[lo - 1], p.bd[lo])) lo--; while (hi + 1 < p.bd.length && sameFam(p.bd[hi], p.bd[hi + 1])) hi++; for (let j = lo; j <= hi; j++) buff(p.bd[j], s.a || 0, s.h || 0); } break; }
    case 'buffmain': { const f = mainFam(p.bd); if (f.tb) p.bd.filter(m => famOk(m, f.tb)).forEach(m => buff(m, s.a || 0, s.h || 0)); else if (p.bd.length) buff(pickR(p.bd), s.a || 0, s.h || 0); break; }
    // ----- Les Simpson : gags récurrents, Provocation, vol à la taverne -----
    case 'gagup': { const c = shuffle(p.bd.filter(hasGag)).slice(0, (s.m || 1) >= 7 ? 9 : (s.m || 1)); c.forEach(m => { m.gag = (m.gag || 0) + N; if (s.a || s.h) buff(m, s.a || 0, s.h || 0); }); if (!c.length && (s.a || s.h) && p.bd.length) buff(pickR(p.bd), s.a || 0, s.h || 0); break; }
    case 'gagnow': p.bd.slice().forEach(m => fxOf(m, 'eot').filter(isGag).forEach(e => runRecruit(G, p, m, e))); break;
    case 'bufftaunt': p.bd.forEach(m => { if (has(m, 't')) buff(m, s.a || 0, s.h || 0); }); break;
    case 'shieldtaunt': { const c = p.bd.filter(m => has(m, 't') && !has(m, 's')); const t = c.length ? pickR(c) : (p.bd.filter(m => !has(m, 't')).length ? pickR(p.bd.filter(m => !has(m, 't'))) : null); if (!t) break; addF(t, c.length ? 's' : 't'); buff(t, s.a || 0, s.h || 0); break; }
    case 'gaggive': { const src = 'Pouvoir de ' + HEROES[p.hero].n.split(' ')[0], has0 = p.bd.filter(m => (m.x || []).some(e => e.k === s.fx.k && e.src === src)); if (has0.length) has0.forEach(m => buff(m, s.a || 1, s.h || 1)); else { const t = pickR(p.bd.filter(m => !hasGag(m))) || pickR(p.bd); (t.x = t.x || []).push(Object.assign({ src }, s.fx)); } break; }
    // ----- Les Simpson v2 -----
    case 'donut': giveDonut(p, N); break;
    case 'buffbought': { const n = 1 + (p.btN || 0), m = pickR(p.bd); if (m) buff(m, (s.a || 0) * n, (s.h || 0) * n); break; }
    case 'raf': p.raf = 1; if (s.g) p.g += s.g; break;
    case 'foeaoe': p.foe = p.foe || {}; p.foe.aoe = (p.foe.aoe || 0) + (s.d || 1); break;
    case 'robshop': { const tg = p.bd.length ? pickR(p.bd) : null; if (!tg) break; shuffle(p.sh.filter(x => !x.sp && (x.a > 1 || x.h > 1))).slice(0, N).forEach(x => { const a = Math.max(0, x.a - 1), h = Math.max(0, x.h - 1); x.a -= a; x.h -= h; buff(tg, a, h); qAdd(p, 'robs'); }); break; }
  }
}
function powRun(G, p, w0) {
  const w = awake(G) ? awkPw(w0) : w0;
  if (!powCanW(p, w)) return false;
  if (w.k === 'multi') { (w.s || []).forEach(st => { if (powStepCan(p, st) || ['ck', 'g', 'mk', 'fire', 'roll', 'pf'].includes(st.k)) powStep(G, p, st); }); return true; }
  switch (w.k) {
    case 'ck': p.ck = Math.min(ckMax(p), (p.ck || 0) + w.n); break;
    case 'tech': { const sp = drawSpell(p.t); if (sp) p.hd.push(sp); break; }
    case 'buffr': buff(pickR(pwPool(p, w)), w.a, w.h); break;
    case 'buffall': pwPool(p, w).forEach(m => buff(m, w.a, w.h)); break;
    case 'kw': addF(pickR(p.bd.filter(m => !has(m, w.kw))), w.kw); break;
    case 'tma': p.tma = { a:((p.tma && p.tma.a) || 0) + w.a, h:((p.tma && p.tma.h) || 0) + w.h }; break;
    case 'fire': p.njf = (p.njf || 0) + w.d; break;
    // ----- pouvoirs des héros Ninja (réservoir et compteurs de clan) -----
    case 'mist': { const c = shuffle(p.bd.filter(m => !has(m, 's') && !(m.tmp && (m.tmp.f || '').includes('s')))).slice(0, rsvHas(p, w.el) ? w.n2 : w.n); c.forEach(m => { m.tmp = { a:(m.tmp && m.tmp.a) || 0, h:(m.tmp && m.tmp.h) || 0, f:((m.tmp && m.tmp.f) || '') + 's', s:'Brume de Mizu' }; }); break; }
    case 'rfill': if (w.b) mkAdd(p, w.el, w.b); rsvFill(G, p, w.el); if (awake(G)) p.ck = Math.min(ckMax(p), (p.ck || 0) + 2); break;
    case 'rpure': rsvFill(G, p, p.rsv[0]); if (awake(G)) p.g += 2; break;
    case 'rcycle': p.rsv[0] = EL_GEN[p.rsv[0]]; comps(p).forEach(c => { c.el = p.rsv[0]; }); p.g += w.g || 0; break;
    case 'rdump': p.rsv = []; p.g += w.g; break;
    case 'ctr': p[w.c] = (p[w.c] || 0) + (w.el && rsvHas(p, w.el) ? w.n2 : w.n); break;
    case 'braisebuff': p.braise -= w.n; pwPool(p, w).forEach(m => buff(m, w.a, w.h)); break;
    case 'techel': { const el = w.el === 'rsv' ? ((p.rsv || [])[0] || 'terre') : w.el; const lo = SPELL_IDS.filter(id => SPELLS[id].nin && !SPELLS[id].forb && SPELLS[id].el === el).reduce((m, id) => Math.min(m, SPELLS[id].t), 9); for (let i = 0; i < (awake(G) ? 2 : 1); i++) { const sp = drawSpell(Math.max(p.t, lo), el); if (sp && p.hd.length < 10) p.hd.push(sp); } break; }
    case 'rollg': p.fz = false; fillShop(G, p); trigBoard(G, p, 'roll'); p.g += w.g + (rsvHas(p, w.el) ? w.g : 0); break;
    case 'tmamaree': { const x = Math.min(w.max, Math.floor((p.maree || 0) / 2)); p.tma = { a:((p.tma && p.tma.a) || 0) + x, h:(p.tma && p.tma.h) || 0 }; break; }
    case 'ckmaree': p.ck = Math.min(ckMax(p), (p.ck || 0) + w.n); p.maree = (p.maree || 0) + w.m; break;
    case 'chargebuff': p.charge = (p.charge || 0) + w.n; if (rsvHas(p, w.el)) pwPool(p, w).forEach(m => buff(m, w.a, w.h)); break;
    case 'g2ck': p.g -= w.g; p.ck = Math.min(ckMax(p), (p.ck || 0) + w.n); break;
    case 'kwbuff': { const t = pickR(pwPool(p, w)); buff(t, w.a, w.h); addF(t, w.kw); break; }
    case 'buffrsv': { const r = rsvHas(p, w.el); pwPool(p, w).forEach(m => buff(m, w.a, r ? w.h2 : w.h)); break; }
  }
  return true;
}
// le pouvoir a-t-il un effet possible maintenant ? (même règles que pow0, sans rien modifier)
function powCan(p, rd) {
  const h = HX(p); if (!h || !h.cost || p.pu || (p.kiPay ? (p.ki || 0) : p.ckPay ? (p.ck || 0) : p.g) < h.cost) return false;
  if (h.pw) return powCanW(p, h.pw);
  const bd = p.bd || [], hd = p.hd || [], tr = t => bd.some(m => tribe(m) === t);
  switch (p.hero) {
    case 'egide': return bd.some(m => !has(m, 's'));
    case 'ondine': case 'selene': case 'grumbo': return bd.length > 0;
    case 'paul': return tr('sq_feu');
    case 'jeanne': return tr('sq_vent');
    case 'zoe': case 'oren': return hd.length < 10;
    case 'nono': return (rd || 0) >= 3;
    case 'brok': return bd.some(m => !has(m, 't'));
    case 'vaskor': return bd.length < 7 && !!C.m_squelette;
  }
  return true;
}
function hostApply(pid, a) {
  const G = H.G; if (!G) return;
  const p = G.ps[pid]; if (!p || !p.al) return;
  if (a.t === 'hero') { if (G.ph === 'hero' && !p.hero && p.ho.includes(a.h)) { if (loOn(G) && G.tm) loPick(G, p, a.h); else p.hero = a.h; broadcast(); } return; }
  if (a.t === 'jutsu' || a.t === 'nktf') { if (G.ph === 'recruit' && OPS[a.t](G, p, a)) broadcast(); return; }
  if (a.t === 'ckm') { if (G.ph === 'recruit' && OPS.ckm(G, p, a)) broadcast(); return; }
  if (a.t === 'med' || a.t === 'tf' || a.t === 'fuse' || a.t === 'portal' || a.t === 'pass') { if (G.ph === 'recruit' && OPS[a.t](G, p, a)) broadcast(); return; }
  if (a.t === 'hroll') { const i = +a.i; if (G.ph === 'hero' && !p.hero && (p.hrr || 0) > 0 && p.ho[i]) { const nh = heroReroll(G, p); if (nh) { p.ho[i] = nh; p.hrr--; broadcast(); } } return; }
  if (G.ph !== 'recruit' || !OPS[a.t]) return;
  if (a.t !== 'rdy' && p.rdy) p.rdy = false;
  if (OPS[a.t](G, p, a)) { sendPriv(p); if (a.t === 'rdy') sendPub(); }
}

/* ---------- IA ---------- */
function aiScore(p, m) {
  const b = CD(m.c);
  const tribes = {}; p.bd.forEach(x => { const t = tribe(x); if (t !== 'neu') tribes[t] = (tribes[t] || 0) + 1; });
  const main = Object.keys(tribes).sort((x, y) => tribes[y] - tribes[x])[0];
  const copies = p.bd.concat(p.hd).filter(x => x.c === m.c && !x.g).length;
  let s = (b.val || 0) + (m.a - b.a) + (m.h - b.h) + (b.t || 1) * 2 + copies * 6 + (m.g ? 12 : 0);
  if (main && b.tr === main) s += 4;
  if (typeof NK_GOF !== 'undefined' && NK_GOF[m.c]) { const on = new Set(p.bd.concat(p.hd).filter(x => x !== m && !x.sp).map(x => x.c)); NK_GOF[m.c].forEach(g => { const n = g.m.filter(c => c !== m.c && on.has(c)).length; if (n) s += 6 + 5 * n; }); }   // Naruto : les groupes emblématiques passent avant tout
  if (/^(rh|sh|smh)_/.test(p.hero || '')) { const hv = HEROES[p.hero].pv; if (hv && tribeOk(m, hv)) s += 4; if (p.hero === 'rh_conseil' && isRM(m)) s += 4; if (p.hero === 'rh_tiny' && (b.t || 1) <= 3) s += 2; }   // l'IA joue la famille de son héros
  if (typeof H !== 'undefined' && H.G && inMechAny(H.G, 'bande')) { if (main && b.tr === main) s += 3; if (b.tr === 'neu') s -= 3; }   // Cohésion : l'IA concentre ses familles, évite les neutres qui cassent les bandes
  if (typeof H !== 'undefined' && H.G && inMechAny(H.G, 'gag')) { if (hasGag(m)) s += 2 + Math.min(6, (m.gag || 0)); if (/^smh_(lisa|ned)$/.test(p.hero || '') && (b.f || '').includes('t')) s += 3; }   // Gags récurrents : l'IA garde ses gags (ils grandissent), Lisa et Ned aiment les Provocations
  // mécaniques ninja : renforcer le clan d'un hiden en main ou d'un serviteur « Équipe de 3 », valoriser les kekkei genkai du clan
  const want = new Set();
  p.hd.forEach(x => { const S = x.sp && SPELLS[x.sp]; if (S && S.hid) want.add('n_' + S.el); });
  p.bd.forEach(x => { if ((CD(x.c).fxAll || []).some(e => e.k === 'soc_team')) want.add(tribe(x)); });
  if ([...want].some(t => tribeOk(m, t))) s += 6;
  if (b.tr2 && main && (b.tr === main || b.tr2 === main)) s += 3;
  if ((b.fxAll || []).some(e => e.k === 'bc_gate') && p.hp <= 12) s -= 8;
  return s;
}
// IA : regroupe les clans autour des serviteurs « Équipe de 3 » (un équipier de chaque côté)
function aiTeams(p) {
  const isT = m => (CD(m.c).fxAll || []).some(x => x.k === 'soc_team');
  const used = new Set(), out = [];
  for (const t of p.bd.filter(isT)) {
    if (used.has(t)) continue;
    const mates = p.bd.filter(m => m !== t && !used.has(m) && tribeOk(m, tribe(t)));
    if (mates.length < 2) continue;
    const [l, r] = mates.sort((x, y) => (isT(y) ? 1 : 0) - (isT(x) ? 1 : 0)).slice(0, 2);
    [l, t, r].forEach(m => used.add(m)); out.push(l, t, r);
  }
  if (!out.length) return;
  const rest = p.bd.filter(m => !used.has(m));
  p.bd.splice(0, p.bd.length, ...rest.filter(m => fxOf(m, 'dr').length), ...out, ...rest.filter(m => !fxOf(m, 'dr').length));
}
// IA South Park : regroupe les familles (les plus nombreuses d'abord), les Solitaires goths à l'écart si possible, les râles devant
function aiCohesion(p) {
  if (p.bd.length < 2) return;
  const lone = m => (CD(m.c).fxAll || []).some(e => e.k === 'soc_lone') && !p.bd.some(x => x !== m && sameFam(x, m) && !(CD(x.c).fxAll || []).some(e => e.k === 'soc_lone'));
  const L = p.bd.filter(lone), rest = p.bd.filter(m => !lone(m));
  regroupFam(rest);
  // à l'intérieur de chaque famille : râles d'agonie et renaissances devant, puis la plus grosse attaque
  const front = m => fxOf(m, 'dr').length || has(m, 'r') ? 0 : 1;
  const out = []; let i = 0; while (i < rest.length) { let j = i; while (j + 1 < rest.length && sameFam(rest[j], rest[j + 1])) j++; out.push(...rest.slice(i, j + 1).sort((x, y) => front(x) - front(y) || y.a - x.a)); i = j + 1; }
  // les Solitaires : chacun à l'écart de sa famille (fin de rangée, début, ou entre deux groupes), sinon à la suite
  for (const m of L) { const fit = (a, b) => !sameFam(a, m) && !sameFam(b, m); if (fit(out[out.length - 1], null)) out.push(m); else if (fit(null, out[0])) out.unshift(m); else { let k = out.findIndex((x, i) => i > 0 && fit(out[i - 1], x)); if (k < 0) k = out.length; out.splice(k, 0, m); } }
  p.bd.splice(0, p.bd.length, ...out);
}
// pouvoirs qui renforcent le plateau selon sa disposition (cohésion) : l'IA les garde pour la fin du tour, une fois le plateau rangé, et réserve l'or
const aiLatePow = p => { const w = HX(p) && HX(p).pw; return !!(w && w.k === 'multi' && (w.s || []).some(st => ['buffnb', 'bandbuff', 'buffchain', 'buffmain', 'regroup'].includes(st.k))); };
function aiTurn(G, p) {
  p.aiSave = typeof aiSageWait === 'function' && aiSageWait(G, p);
  const targetRound = inMechAny(G, 'chakra') ? { 1:2, 2:5, 3:7, 4:9, 5:11 } : { 1:2, 2:4, 3:6, 4:8, 5:10 };
  while (p.g >= 3 && OPS.comp(G, p)) {}
  for (let guard = 0; guard < 40; guard++) {
    let acted = false;
    const c = upCost(p);
    if (p.t < 6 && p.g >= c && (G.rd >= targetRound[p.t] || p.g - c >= 3)) { OPS.up(G, p); acted = true; continue; }
    const hc = HX(p) && HX(p).cost, late = aiLatePow(p), res = late && hc && !p.pu && p.bd.length + p.hd.filter(m => !m.sp).length >= 2 ? hc : 0;
    const nonoWait = p.hero === 'nono' && (G.rd < 3 || ((p.fb || 1) < 4 && G.rd < 9));
    if (hc && !nonoWait && !late && !p.pu && !p.aiSave && (heroKi(p) ? (p.ki || 0) >= hc : heroCk(G, p) ? (p.ck || 0) >= hc : p.g >= hc && p.g - hc >= 3) && (p.bd.length || p.hero === 'oren' || p.hero === 'nono')) { if (OPS.pow(G, p)) { if (p.disc) OPS.pick(G, p, { i:aiBestIndex(p, p.disc) }); acted = true; continue; } }
    aiPlayAll(G, p);
    if (p.g - res >= 3 && p.sh.length) {
      let bi = 0; p.sh.forEach((m, i) => { if (aiScore(p, m) > aiScore(p, p.sh[bi])) bi = i; });
      const cand = p.sh[bi];
      if (p.bd.length < 7) { OPS.buy(G, p, { i:bi }); acted = true; }
      else {
        let wi = 0; p.bd.forEach((m, i) => { if (aiScore(p, m) < aiScore(p, p.bd[wi])) wi = i; });
        if (aiScore(p, cand) > aiScore(p, p.bd[wi]) + 3) { OPS.sell(G, p, { i:wi }); OPS.buy(G, p, { i:bi }); acted = true; }
      }
      aiPlayAll(G, p);
      if (acted) continue;
    }
    const free = (p.hero === 'rivet' || (htr(p, 'pturn') || {}).roll) && p.rr === 0;
    if ((p.g - res >= 4 || (free && p.g - res >= 3)) && p.bd.length < 7) { OPS.roll(G, p); acted = true; continue; }
    if (!acted) break;
  }
  const front = m => fxOf(m, 'dr').length || has(m, 'r') ? 0 : 1;
  p.bd.sort((x, y) => front(x) - front(y) || y.a - x.a);
  aiPlayAll(G, p); aiSpells(G, p);
  if (inMechAny(G, 'ki')) {
    for (let g = 0; g < 3; g++) { let done = false; for (let i = 0; i < p.bd.length && !done; i++) { const F = fusOpts(p, p.bd[i]).find(F => (p.ki || 0) >= F.c); if (F) done = OPS.fuse(G, p, { i, f:F.id }); } if (!done) break; }
    for (let g = 0; g < 7; g++) { const i = p.bd.findIndex(m => { const c = tfCost(p, m); return c != null && (p.ki || 0) >= c; }); if (i < 0) break; OPS.tf(G, p, { i }); }
    const want = (p.bd.some(m => tfOf(m) && tfCost(p, m) != null) || p.hd.some(x => x.sp && SPELLS[x.sp] && SPELLS[x.sp].kc > (p.ki || 0)) || htr(p, 'pmed')) && p.bd.length >= 4;
    p.bd.forEach(m => { m.med = 0; });
    if (want) { const c = p.bd.filter(m => !tfOf(m) || tfCost(p, m) == null).sort((x, y) => (x.a + x.h) - (y.a + y.h))[0]; if (c) c.med = 1; }
  }
  if (inMechAny(G, 'chakra')) botJutsus(G, p);
  if (loOn(G)) loBot(G, p);
  if (inMechAny(G, 'chakra')) for (let g = 0; g < 7; g++) { const i = p.bd.findIndex(m => !m.awk && (CD(m.c).fxAll || []).some(x => x.k === 'ckm' && (p.ck || 0) >= ckmCost(p, x))); if (i < 0) break; OPS.ckm(G, p, { i }); }
  // Portails : l'IA fait passer son serviteur du plus bas niveau (celui qui a le plus de bonus à garder), sans casser un triple en cours ; elle garde du fluide tant que tout est au niveau de sa taverne, sauf si la jauge est pleine
  if (inMechAny(G, 'portail')) for (let g = 0; g < 3 && (p.pf || 0) > 0; g++) { const full = (p.pf || 0) >= pfMax(p), bonus = m => m.a + m.h - (CD(m.c).a + CD(m.c).h) * (m.g ? GOLD_K : 1); const c = p.bd.filter(m => !CD(m.c).tok && (tierOf(m) < p.t || full) && p.bd.concat(p.hd).filter(x => x.c === m.c && !x.g).length < 2); if (!c.length) break; c.sort((x, y) => tierOf(x) - tierOf(y) || bonus(y) - bonus(x)); if (!OPS.portal(G, p, { i:p.bd.indexOf(c[0]) })) break; }
  if (inMechAny(G, 'bande')) aiCohesion(p);
  { const hc = HX(p) && HX(p).cost; if (hc && aiLatePow(p) && !p.pu && p.g >= hc && p.bd.length) OPS.pow(G, p); }
  aiTeams(p);
  p.rdy = true;
}

/* ---------- phases ---------- */
const humansLive = G => G.ps.filter(p => p.al && p.human && !p.bot);
function startRecruit() {
  duoSync(H.G);
  const G = H.G; G.rd++;
  for (const p of G.ps) if (p.al) {
    if (NJ_COMP && inMechAny(G, 'chakra') && !p.cp && p.hero && compOf(p.hero)) { p.cp = mk(compOf(p.hero), 1); p.cb = 3; }
    if (p.cp && awake(G) && !p.cp.awk) awakenComp(p.cp);
    if (p.cp && awake(G)) summonBeast(p);
    p.mg = Math.min(10, 2 + G.rd); p.g = p.mg;
    if (p.hero === 'barnabe' && G.rd % 2 === 0) p.g += 1;
    p.bt = {}; p.btN = 0; p.soldT = 0; p.bd.forEach(m => { delete m.spc; });
    { const w = htr(p, 'pafk'); if (w) { if (G.rd <= w.n) p.g = 0; else if (G.rd === w.n + 1 && !p.disc) { p.discT = w.t; p.discQ = (w.m || 1) - 1; discTier(G, p, w.t); } } }   // Abe : deux tours de sieste, puis des découvertes
    p.uc = Math.max(0, p.uc - 1);
    if (p.fz) { p.fz = false; topUpShop(G, p); } else fillShop(G, p);
    { const w = htr(p, 'pshop'); if (w) p.sh.forEach(m => { if (!m.sp) { m.a += w.a || 0; m.h += w.h || 0; } }); }   // Krusty : la taverne se renforce
    nkLootOffer(G, p); p.pu = false; p.pun = 0; p.castN = 0; p.castEls = []; p.ckSpentLast = p.ckSpent || 0; p.ckSpent = 0; p.hd.forEach(x => { if (x.sp && SPELLS[x.sp] && SPELLS[x.sp].chg) x.ch = Math.min(2, (x.ch || 0) + 1); }); p.fbq = false; p.njf = 0; p.sylv = false; p.rr = 0; p.rdy = false; p.lastRes = p.res ? (p.res.cr || p.res.r) : null; p.res = null;
    if (p.inc && p.inc.length) p.g += p.inc.shift() || 0;
    { const w = /^(nh|dh|rh|sh|smh)_/.test(p.hero || '') ? htr(p, 'pturn') : (pwOf(p) && pwOf(p).k === 'pturn' ? null : null); if (w) { if (w.g) p.g += w.g; if (w.ki) kiAdd(p, w.ki); if (w.ck) p.ck = Math.min(ckMax(p), (p.ck || 0) + w.ck); if ((w.h || w.a) && p.bd.length) { if (w.all) p.bd.forEach(m => buff(m, w.a || 0, w.h || 0)); else buff(pickR(p.bd), w.a || 0, w.h || 0); } if (w.el) mkAdd(p, w.el, w.n); const src = 'Pouvoir de ' + HEROES[p.hero].n.split(' ')[0]; if (w.sl) shuffle(p.bd.slice()).slice(0, w.sl).forEach(m => sealAdd(p, m, 1)); if (w.drp) withSrc(src, () => { const o = p.bd.filter(m => !(m.x || []).some(e => e.drp)); shuffle(o).slice(0, w.drp).forEach(t => (t.x = t.x || []).push({ k:'dr_summon', card:'tk_puppet', n:1, drp:1, src:'Sasori' })); }); if (w.pa) withSrc(src, () => { const a = p.bd.filter(isPact); if (a.length) a.forEach(m => buff(m, 1, 1)); else pactSummon(p, 'tk_toad', p.bd[p.bd.length - 1]); }); if (w.dr) withSrc(src, () => p.bd.forEach(m => { if (fxOf(m, 'dr').length) buff(m, w.dr, 0); })); } p.spd = 0; }
    p.bd.forEach(m => fxOf(m, 'bc').forEach(e => { if (e.k === 'craft') giveCraft(p, m, e); }));   // Sorcellerie : un nouveau sort temporaire à chaque tour
    trigBoard(G, p, 'sot'); checkTriple(G, p);
    if (inMechAny(G, 'ki')) { let n = 0; const pm = htr(p, 'pmed'); p.bd.forEach(m => { if (m.med) { n += tierOf(m) * (m.g ? 2 : 1) + (pm ? pm.n || 1 : 0); if (pm && (pm.a || pm.h)) withSrc('Entraînement divin', () => buff(m, pm.a || 0, pm.h || 0)); m.med = 0; } }); if (n) { kiAdd(p, n); p.kiGain = n; } else p.kiGain = 0; }
    p.mkt = 0; p.cdbl = 0; p.hruse = 0;
    if (inMechAny(G, 'portail')) { pfAdd(p, 1 + (p.pfNext || 0)); p.pfNext = 0; }   // Portails : +1 fluide par tour (3 au plus), plus les râles du combat
    if (inMechAny(G, 'ames') && (p.souls || 0) >= 3) { const k = Math.floor(p.souls / 3); p.souls -= k * 3; withSrc('Moisson d\'âmes', () => p.bd.forEach(m => { if (inMech(G, 'ames', m)) buff(m, k, k); })); }
    if (inMechAny(G, 'chakra')) { const n = p.bd.length + p.bd.reduce((t, m) => t + itProd(m), 0); p.ck = Math.min(ckMax(p), (p.ck || 0) + n); mkSync(p); }   // 1 chakra par serviteur, plus ce que produisent les objets
    if (loOn(G)) loTurn(G, p);
    // un coffre après chaque combat : majeur si le compagnon gagne son duel, mineur sinon
    if (NJ_COMP && inMechAny(G, 'chakra') && p.lastRes) p.pendChest = (p.lastRes === 'win' ? 'maj' : 'min') + (p.t || 1);
    // Éveil : le coffre favorise les plus bas au classement (moitié inférieure en points de vie)
    p.chFav = 0;
    if (NJ_COMP && inMechAny(G, 'chakra') && awake(G) && p.lastRes) { const al = G.ps.filter(x => x.al).sort((x, y) => x.hp - y.hp), k = al.indexOf(p); p.chFav = k < Math.ceil(al.length / 2) ? 1 : 0; p.pendChest = (p.chFav ? 'maj' : 'min') + (p.t || 1); }
    // pureté : 5 serviteurs ou plus d'un même clan → +1 chakra
    if (inMechAny(G, 'chakra')) { const n = {}; p.bd.forEach(m => { const t = CD(m.c).tr; if (CLAN_EL[t]) n[t] = (n[t] || 0) + 1; }); const pure = Object.keys(n).find(t => n[t] >= 5) || null; p.pure = pure; if (pure) p.ck = Math.min(ckMax(p), (p.ck || 0) + 1); if ((p.ck || 0) >= 10) qAdd(p, 'ckFull'); }
    { const w = HEROES[p.hero] && HEROES[p.hero].pw; if (w && w.k === 'pck') p.ck = Math.min(ckMax(p), (p.ck || 0) + w.n); if (w && w.k === 'ptech' && G.rd % 2 === 0 && p.hd.length < 10) { const sp = drawSpell(p.t); if (sp) p.hd.push(sp); } }
    p.bd.forEach(m => { delete m.tmp; delete m.gx; delete m.nhx; delete m.jp; }); p.tma = null; p.foe = null;
    // serviteurs éveillés : leur effet se répète (après la remise à zéro des bonus « prochain combat », sinon feu et bouclier seraient perdus)
    p.bd.slice().forEach(x => { if (x.awk && !C[x.c].comp) { const md = (CD(x.c).fxAll || []).find(f => f.k === 'ckm'); if (md) withSrc('Éveil · ' + CD(x.c).n, () => runMode(G, p, x, md.m)); } }); checkTriple(G, p);
  }
  G.ph = 'recruit';
  const live = humansLive(G).length;
  // univers Ninja (techniques, réservoir, récompenses) : tours plus longs, +20 s et plafond relevé de 35 s
  const nj = inMechAny(G, 'chakra') ? 1 : 0;
  const secs = Math.min((+RU().maxTime || 75) + nj * 35, (+RU().time || 35) + nj * 20 + G.rd * (+RU().perRound || 0));
  G.end = Date.now() + (live ? secs * 1000 : 1500);
  for (const p of G.ps) if (p.al && p.bot) aiTurn(G, p);
  broadcast();
}
function endRecruit() {
  const G = H.G;
  for (const p of G.ps) if (p.al) {
    p.hd = p.hd.filter(x => !x.tmpc);   // Sorcellerie : le sort temporaire non lancé disparaît à la fin du tour
    qSet(p, 'drBoard', p.bd.filter(m => fxOf(m, 'dr').length).length);
    if (p.pendChest) OPS.chest(G, p);
    if (p.choice) { const b = p.bot ? p.choice.reduce((bi, o, i) => o.r > p.choice[bi].r ? i : bi, 0) : 0; OPS.upick(G, p, { i:b }); }
    if (p.bot && p.cp) for (let g = 0; g < 8 && (p.ups || []).length && (p.ck || 0) >= upgCost(p.ups[0]); g++) OPS.uapply(G, p, { i:0 });
    { const w = pwOf(p); if (w && w.k === 'prsv' && (p.rsv || []).length === 1) p.maree = (p.maree || 0) + w.n; }
    const neot = auraTimes(p.bd, 'aura_eot');
    for (const m of p.bd.concat(p.cp ? [p.cp] : [])) for (let r = 0; r < neot; r++) fxOf(m, 'eot').forEach(e => runRecruit(G, p, m, e));
    if (loOn(G)) loTfAll(G, p);
    if (inMechAny(G, 'chakra') || loOn(G)) nkGroupsEot(G, p);
    mkSync(p);
    if (p.hero === 'maelle' && p.bd[0]) withSrc('Passif de Maëlle', () => buff(p.bd[0], 1, 1));
    if (inMechAny(G, 'fusion') && elems(p.bd) >= 4) withSrc('Fusion élémentaire', () => p.bd.forEach(m => { if (inMech(G, 'fusion', m)) buff(m, 1, 1); }));
    if (p.hero === 'nono' && G.rd >= 3 && !p.pu) p.fb = (p.fb || 3) + 1;
    if (p.cho) OPS.choose(G, p, { i:0 });   // Choix des armes non tranché : premier effet
    // chrono écoulé pendant un choix de carte : un joueur prend la première proposée (les IA gardent leur meilleur choix) ; on vide aussi les choix en file
    for (let g = 0; g < 6 && p.disc; g++) OPS.pick(G, p, { i:p.bot ? aiBestIndex(p, p.disc) : 0 });
    // Rick et Morty : passif de Rick Cop (Provocation) et quêtes « finir un tour avec… »
    { const w = htr(p, 'ptaunt'); if (w) withSrc('Pouvoir de ' + HEROES[p.hero].n.split(' ')[0], () => p.bd.forEach(m => { if (has(m, 't')) buff(m, w.a || 0, w.h || 0); })); }
    qSet(p, 'lowBoard', p.bd.filter(m => tierOf(m) <= 3).length >= 5 ? 1 : 0); qSet(p, 'tauntBoard', p.bd.filter(m => has(m, 't')).length >= 4 ? 1 : 0);
    qSet(p, 'rmBoard', p.bd.filter(isRM).length >= 5 ? 1 : 0); qSet(p, 'socBoard', p.bd.filter(m => fxOf(m, 'soc').length).length >= 5 ? 1 : 0);
    // South Park : quêtes de cohésion (bandes, famille la plus nombreuse)
    if (inMechAny(G, 'bande')) { const nb = bandsOf(p.bd).length; if (nb) qAdd(p, 'bandTurns'); qSet(p, 'bands2', nb >= 2 ? 1 : 0); qSet(p, 'famBoard', mainFam(p.bd).n >= 5 ? 1 : 0); }
    // Les Simpson : quêtes « finir un tour avec… » (Provocations, famille)
    { const nt = p.bd.filter(m => has(m, 't')).length; if (nt >= 3) qAdd(p, 'tauntTurns'); const Q = HEROES[p.hero] && HEROES[p.hero].q; if (Q && Q.k === 'tribeBoard') qSet(p, 'tribeBoard', p.bd.filter(m => tribeOk(m, Q.card)).length >= (Q.m || 4) ? 1 : 0); }
  }
  const alive = G.ps.filter(p => p.al);
  let order = shuffle(alive.slice());
  for (let t = 0; t < 12; t++) {
    let ok = true; for (let i = 0; i + 1 < order.length; i += 2) if (order[i].lastOpp === order[i + 1].pid) ok = false;
    if (ok) break; order = shuffle(alive.slice());
  }
  // Le Seigneur des Anneaux en duos : un duo des Peuples libres affronte un duo de l'Ombre, en changeant d'adversaire d'une manche à l'autre.
  // Duo sans adversaire : il affronte le fantôme du dernier duo éliminé du camp d'en face. Un camp entièrement éliminé : les deux duos restants s'affrontent.
  let loPairs = null;
  if (loOn(G) && G.tm) { duoSync(G); const T = G.tm.filter(t => G.ps.filter(p => p.tm === t.id && p.al).length === 2), L = shuffle(T.filter(t => t.camp === 'L')), O = shuffle(T.filter(t => t.camp === 'O'));
    loPairs = { duo:[], solo:[] };
    if (L.length && O.length) { const n = Math.min(L.length, O.length); if (n === 2 && L[0].lo === O[0].id) O.reverse();
      for (let i = 0; i < n; i++) loPairs.duo.push([L[i], O[i]]); loPairs.solo = (L.length > n ? L : O).slice(n); }
    else if (T.length >= 2) loPairs.duo.push([T[0], T[1]]); }
  G.pend = []; let maxFrames = 0;
  // plafond de dégâts (Champs de bataille, saison 9) : 5 jusqu'à la manche 3, 10 jusqu'à la 7, 15 ensuite ; plus de plafond dans le Top 4
  const cap = alive.length <= 4 ? 99 : G.rd <= 3 ? 5 : G.rd <= 7 ? 10 : 15;
  const fight = (p, q, ghost, ex) => {
    const seed = rint(1e9), qb = ghost ? ghost.bd : q.bd, qt = ghost ? ghost.t : q.t, qn = ghost ? 'Fantôme de ' + ghost.n : q.n;
    const heat = x => (x.fbq ? (x.fb || 3) : 0) + (x.hero === 'pyra' ? 2 : 0) + (x.njf || 0) + (HX(x) && HX(x).pw && HX(x).pw.k === 'pfire' ? HX(x).pw.d * (awake(G) ? 2 : 1) : 0) + (awake(G) && x.bd && inMechAny(G, 'chakra') ? x.bd.filter(m => tribeOk(m, 'n_foudre')).length * (x.bd.some(m => hasFx(m, 'awk_storm')) ? 2 : 1) : 0);
    const fire = [heat(p), ghost ? 0 : heat(q)];
    const pb = combatBoard(p), qcb = combatBoard(ghost || q);
    if (p.horA) pb.forEach(m => { m.hx = p.horA; }); if ((ghost || q).horA) qcb.forEach(m => { m.hx = (ghost || q).horA; });
    foeApply(p, qcb); if (!ghost) foeApply(q, pb);
    if (loOn(G)) { loBattle(G, p, pb); if (!ghost) loBattle(G, q, qcb); loNazgul(p, qcb); if (!ghost) loNazgul(q, pb); }
    // après l'Éveil (Ninja) : compagnon et bête d'invocation rejoignent la bataille, en tête de rangée
    const join = awake(G) && inMechAny(G, 'chakra') && (typeof AWK_JOIN === 'undefined' || AWK_JOIN);
    const lead = x => x && x.cp ? [resonate(x, Object.assign({}, x.cp, { duo:1 }))].concat(x.bst ? [Object.assign({}, x.bst, { duo:1 })] : []) : [];
    if (join) { pb.splice(Math.floor(pb.length / 2), 0, ...lead(p)); const qx = ghost || q; qcb.splice(Math.floor(qcb.length / 2), 0, ...lead(qx)); }   // au centre de la rangée
    elementDuel(pb, qcb);
    // duos : le plateau de l'allié attend en réserve et entre quand celui qui a ouvert le combat est tombé
    let fmx = G.mx, pab = null, qab = null;
    if (ex) { pab = ex.pa ? combatBoard(ex.pa) : []; qab = ex.qa ? combatBoard(ex.qa) : []; if (ex.pa && !ghost) foeApply(ex.pa, qab.length ? qab : qcb); if (ex.qa && !ghost) foeApply(ex.qa, pab.length ? pab : pb);
      [[p, pb], [ex.pa, pab], [ghost ? null : q, qcb], [ghost ? null : ex.qa, qab]].forEach(([x, bd]) => { if (x && loRingIn(x) && loHero(x, 'pbilbon')) bd.forEach(m => addF(m, 'c')); });   // Bilbon : invisible quand il tient l'Anneau
      fmx = Object.assign({}, G.mx, { rsv:[pab, qab] }); }
    const r = simulate(pb, qcb, seed, p.t, qt, fire, fmx);
    lawsAfterFight(G, p, r, 0); if (!ghost) lawsAfterFight(G, q, r, 1);
    if (ex) { if (ex.pa) lawsAfterFight(G, ex.pa, r, 0); if (ex.qa && !ghost) lawsAfterFight(G, ex.qa, r, 1); }
    if (loOn(G)) { p.vres = r.w === 0 ? 'win' : r.w === 1 ? 'loss' : 'draw'; p.vfoe = ghost ? null : q.pid; if (!ghost) { q.vres = r.w === 1 ? 'win' : r.w === 0 ? 'loss' : 'draw'; q.vfoe = p.pid; } }
    if (ex && loOn(G)) { if (ex.pa) { ex.pa.vres = p.vres; ex.pa.vfoe = p.vfoe; } if (ex.qa && !ghost) { ex.qa.vres = q.vres; ex.qa.vfoe = q.vfoe; } }
    const stl = !ghost ? chakraSteal(p, q, pb, qcb, r) : [0, 0];
    const d = Math.min(cap, r.dmg);
    if (r.w === 1) G.pend.push({ pid:p.pid, d, by:ghost ? null : q.pid });
    if (r.w === 0 && !ghost) G.pend.push({ pid:q.pid, d, by:p.pid });
    const W = w => w === 0 ? 'win' : w === 1 ? 'loss' : 'draw', X = w => w === 0 ? 'loss' : w === 1 ? 'win' : 'draw';
    // duel des compagnons : ils ne combattent que le compagnon adverse, ne touchent jamais le héros, et décident du coffre
    const qq = ghost || q; let duel = null;
    if (!join && (p.cp || qq.cp)) {
      const ca = p.cp ? [resonate(p, Object.assign({}, p.cp))] : [], cbb = qq.cp ? [resonate(qq, Object.assign({}, qq.cp))] : [];
      // petit avantage d'élément (cycle de domination) : +2/+2
      if (ca[0] && cbb[0]) { const ea = compEl(ca[0]), eb = compEl(cbb[0]); if (EL_DOM[ea] === eb) buff(ca[0], 2, 2); if (EL_DOM[eb] === ea) buff(cbb[0], 2, 2); }
      const ca0 = ca.map(fullM), cb0 = cbb.map(fullM);
      const cs = rint(1e9), cr = simulate(ca, cbb, cs, p.t, qt, [0, 0], Object.assign({}, G.mx, { first:1 }));
      duel = { a:ca0, b:cb0, w:cr.w, seed:cs };
      if (cr.w === 0 && p.cp) { giveXp(p.cp, 2); mkAdd(p, compEl(p.cp), 2); } if (!ghost && cr.w === 1 && q.cp) { giveXp(q.cp, 2); mkAdd(q, compEl(q.cp), 2); }
    }
    // après l'Éveil : coffre majeur si le compagnon est encore debout à la fin de la bataille
    const stand = (x, side) => x && x.cp && r.alive && (r.alive[side] || []).includes(x.cp.c) ? 'win' : 'loss';
    p.res = { o:qn, r:W(r.w), d, cr:duel ? W(duel.w) : join && p.cp ? stand(p, 0) : null };
    if (join) { if (r.w === 0 && p.cp) giveXp(p.cp, 2); if (!ghost && r.w === 1 && q.cp) giveXp(q.cp, 2); }
    if (r.w === 0) p.bd.filter(isComp).forEach(m => giveXp(m, 2)); if (!ghost && r.w === 1) q.bd.filter(isComp).forEach(m => giveXp(m, 2));
    if (r.w === 0) rankUp(p); if (!ghost && r.w === 1) rankUp(q);
    if (r.w === 0) winUp(p); if (!ghost && r.w === 1) winUp(q);
    if (!ghost) q.res = { o:p.n, r:X(r.w), d, cr:duel ? X(duel.w) : join && q.cp ? stand(q, 1) : null };
    { const hist = (x, oh, on, w) => { x.hist = [{ h:oh || '', n:on, d:w === 'win' ? d : w === 'loss' ? -d : 0 }].concat(x.hist || []).slice(0, 3); }; hist(p, ghost ? ghost.hero : q.hero, qn, W(r.w)); if (!ghost) hist(q, p.hero, p.n, X(r.w)); }
    const base = { duel, stl, rd:G.rd, a:pb.map(fullM), b:qcb.map(fullM), seed, ta:p.t, tb:qt, cap, ha:p.hero, hb:ghost ? ghost.hero : q.hero, fire, mx:fmx || {} };
    if (p.human && !p.bot) { deliverFight(p, Object.assign({ me:0, on:qn }, base)); maxFrames = Math.max(maxFrames, r.frames.length); }
    if (!ghost && q.human && !q.bot) { deliverFight(q, Object.assign({ me:1, on:p.n }, base)); maxFrames = Math.max(maxFrames, r.frames.length); }
    if (ex) { if (ex.pa) { ex.pa.res = p.res; ex.pa.hist = p.hist; if (ex.pa.human && !ex.pa.bot) deliverFight(ex.pa, Object.assign({ me:0, on:qn }, base)); }
      if (ex.qa && !ghost) { ex.qa.res = q.res; ex.qa.hist = q.hist; if (ex.qa.human && !ex.qa.bot) deliverFight(ex.qa, Object.assign({ me:1, on:p.n }, base)); } }
    p.lastOpp = ghost ? null : q.pid; if (!ghost) q.lastOpp = p.pid;
  };
  if (loPairs) { const pl = t => { const ps = G.ps.filter(p => p.tm === t.id); return G.rd % 2 ? ps : ps.slice().reverse(); };   // celui qui ouvre le combat alterne à chaque manche
    loPairs.duo.forEach(([a, b]) => { const A = pl(a), B = pl(b); a.lo = b.id; b.lo = a.id; fight(A[0], B[0], null, { pa:A[1], qa:B[1] }); });
    loPairs.solo.forEach(t => { const A = pl(t), foe = G.tm.filter(x => x.camp !== t.camp), gone = foe.filter(x => !G.ps.some(p => p.tm === x.id && p.al)).sort((x, y) => pl(x)[0].place - pl(y)[0].place), B = pl(gone[0] || foe[0]); t.lo = -1; fight(A[0], null, B[0], { pa:A[1], qa:B[1] }); });
    duoSync(G); }
  else {
  for (let i = 0; i + 1 < order.length; i += 2) fight(order[i], order[i + 1]);
  // joueur impair : il affronte le fantôme du dernier joueur éliminé (son plateau et son niveau de taverne) ; à défaut, un vivant au hasard
  if (order.length % 2) { const p = order[order.length - 1]; const gone = G.ps.filter(x => !x.al && x.place).sort((a, b) => a.place - b.place), others = alive.filter(x => x !== p); fight(p, null, gone[0] || (others.length ? pickR(others) : p)); }
  }
  G.ph = 'combat';
  const anyWatcher = G.ps.some(p => p.human && !p.bot && p.peer);
  G.end = Date.now() + (anyWatcher ? Math.min(50000, 3500 + maxFrames * 700) : 800);
  broadcast();
}
// domination : un compagnon dont l'élément l'emporte sur celui d'en face gagne +4/+4 pour ce combat (×2 avec le Talisman des cycles)
var DOM = { up:.5, dn:.35 };
// résonance : pendant le duel, le compagnon gagne +1/+1 par tranche de 3 marqueurs de son élément (+ bonus du talisman)
var RES_K = 3;
function resonate(p, c) { const el = compEl(c), n = el && MK[el] ? Math.floor((p[MK[el]] || 0) / RES_K) : 0; if (n) { c.a += n + (c.domb || 0); c.h += n + (c.domb || 0); c.res = n; } return c; }
function elementDuel(a, b) {
  const elOf = bd => { const c = bd.find(isComp); if (c) return compEl(c); const n = {}; bd.forEach(m => { const e = CLAN_EL[CD(m.c).tr]; if (e) n[e] = (n[e] || 0) + 1; }); return Object.keys(n).sort((x, y) => n[y] - n[x])[0] || null; };
  const ea = elOf(a), eb = elOf(b);
  for (const [bd, mine, theirs] of [[a, ea, eb], [b, eb, ea]]) {
    if (!mine || !theirs || EL_DOM[mine] !== theirs) continue;
    // domination renforcée : le compagnon dominant gagne +4/+4 (+ talisman) et +DOM.up de ses stats ; le compagnon dominé perd DOM.dn de son attaque et de sa vie
    const foe = bd === a ? b : a;
    bd.filter(isComp).forEach(c => { const x = ((c.eq || []).includes('eq_talisman') ? 8 : 4) + (c.domb || 0); c.a += x + Math.round(c.a * DOM.up); c.h += x + Math.round(c.h * DOM.up); });
    foe.filter(isComp).forEach(c => { c.a = Math.max(1, Math.round(c.a * (1 - DOM.dn))); c.h = Math.max(1, Math.round(c.h * (1 - DOM.dn))); });
  }
}
// vol de chakra : « Début du combat » (plateaux de départ) et « Râle d'agonie » (serviteurs morts)
function chakraSteal(p, q, pb, qb, r) {
  const n = (b, k) => b.reduce((t, m) => t + (CD(m.c).fxAll || []).filter(e => e.k === k).reduce((u, e) => u + e.n * (m.g ? 2 : 1), 0), 0);
  const dead = (side, k) => r.dead[side].reduce((t, c) => t + ((C[c] && C[c].fxAll) || []).filter(e => e.k === k).reduce((u, e) => u + e.n, 0), 0);
  // le voleur gagne toujours le chakra volé ; la victime perd ce qu'elle a (souvent peu : on dépense son chakra avant le combat)
  const take = (from, to, x) => { if (x <= 0) return 0; const v = Math.min(from.ck || 0, x); from.ck = (from.ck || 0) - v; to.ck = Math.min(ckMax(to), (to.ck || 0) + x); return x; };
  const sh = b => b.filter(m => itL(m).includes('ni_samehada') && (m.c === 'nk_kisame' || m.c === 'nk_bee')).length * 2;   // Samehada sur Kisame : dévore 2 chakra
  const a = take(q, p, n(pb, 'soc_steal') + dead(0, 'dr_steal') + sh(pb)), b = take(p, q, n(qb, 'soc_steal') + dead(1, 'dr_steal') + sh(qb));
  return [a, b];
}
function lawsAfterFight(G, p, r, side) {
  if (r.w === 1 - side) qAdd(p, 'losses');
  if (inMechAny(G, 'chakra')) { const dd = (r.dead[side] || []).filter(c => C[c] && C[c].t > 0).sort((a, b) => (C[b].a + C[b].h) - (C[a].a + C[a].h)); p.ld = dd[0] || null; }   // pour l'Edo Tensei du prochain combat
  if (inMechAny(G, 'ki')) { const lost = r.w === 1 - side; p.dbRes = r.w === side ? 'win' : lost ? 'loss' : 'draw'; p.dbDied = (r.dead[side] || []).length; qAdd(p, 'allyDeaths', p.dbDied); zenkaiAfter(p, lost || r.w === -1, r.dead[side] || []); const pd = htr(p, 'pdie'); if (pd && p.dbDied) { p.inc = p.inc || []; p.inc[0] = (p.inc[0] || 0) + Math.min(pd.n || 2, p.dbDied); } }
  qAdd(p, 'drDie', (r.dead[side] || []).length); if (r.w === side) { p.wst = (p.wst || 0) + 1; qAdd(p, 'wins'); qSet(p, 'streak', p.wst); } else p.wst = 0;
  if (inMechAny(G, 'ames')) { const n = r.dead[side].filter(c => C[c] && G.mx.ames.includes(C[c].tr)).length; if (n) p.souls = (p.souls || 0) + n; }
  if (inMechAny(G, 'portail') && r.pf && r.pf[side]) p.pfNext = (p.pfNext || 0) + r.pf[side];   // Râle d'agonie : fluide de portail au prochain tour
  if (inMechAny(G, 'bande') && r.inc && r.inc[side]) { p.inc = p.inc || []; p.inc[0] = (p.inc[0] || 0) + r.inc[side]; }   // bande d'Adultes : or au prochain tour
  if (r.gag && r.gag[side]) { let tot = 0; for (const u in r.gag[side]) { const n = r.gag[side][u], m = p.bd.find(x => String(x.u) === u); tot += n; if (m) m.gag = (m.gag || 0) + n; } if (tot) qAdd(p, 'gags', tot); }   // gags récurrents déclenchés au combat : les compteurs grandissent sur le vrai plateau
  // Les Simpson v2 : ce que le combat rapporte (bonus définitifs, Donuts, main, Horror Show, Kang et Kodos, copie de Bart)
  if (r.perm && r.perm[side]) withSrc('Combat', () => { for (const u in r.perm[side]) { const m = p.bd.find(x => String(x.u) === u); if (m) buff(m, r.perm[side][u][0], r.perm[side][u][1]); } });
  if (r.gl && r.gl[side] && r.gl[side].horA) { const n = r.gl[side].horA; p.horA = (p.horA || 0) + n; withSrc('Horror Show', () => p.bd.forEach(m => { if (tribeOk(m, 'si_hor')) buff(m, n, 0); })); }
  if (r.heal && r.heal[side]) p.hp = Math.min(+RU().hp || 40, p.hp + Math.min(LS_CAP, r.heal[side]));   // Vol de vie (plafonné par combat, sinon les fins de partie ne se terminent plus)
  if (r.don && r.don[side]) giveDonut(p, r.don[side]);
  if (r.hb && r.hb[side]) withSrc('Gil', () => r.hb[side].forEach(([a, h]) => { const o = p.hd.filter(x => !x.sp); if (o.length) buff(pickR(o), a, h); }));
  { const n = (r.dead[side] || []).filter(c => c === 'si_kang' || c === 'si_kodos').length; if (n) { p.kk = (p.kk || 0) + n; withSrc('Kang et Kodos', () => p.bd.forEach(m => { if (fxOf(m, 'pas').some(e => e.k === 'pas_kk')) buff(m, n * mult(m), n * mult(m)); })); } }
  if (p.raf) { const c = (r.dead[1 - side] || [])[0]; if (c && C[c] && p.hd.length < 10) p.hd.push(mk(c, 0)); p.raf = 0; }
  if (G.mx && G.mx.pillage && r.w === side && r.alive[side].some(c => C[c] && G.mx.pillage.includes(C[c].tr)) && p.hd.length < 10) { const sp = drawSpell(p.t); if (sp) { p.hd.push(sp); p.loot = (p.loot || 0) + 1; } }
}
const inMechAny = (G, k) => !!(G && G.mx && G.mx[k]);
// Naruto : celui qui élimine un joueur choisit un objet parmi ses 3 plus puissants ; le reste retourne dans la réserve
function nkLoot(G, p) {
  const its = p.bd.concat(p.hd).flatMap(m => m.sp ? (SPELLS[m.sp] && SPELLS[m.sp].ni ? [m.sp] : []) : itL(m)).sort((x, y) => itPow(y) - itPow(x));
  [p.sp, p.sp2].forEach(x => { if (x) itBack(G, x.sp); }); p.sp = p.sp2 = null;
  p.bd.concat(p.hd).forEach(m => { delete m.it; }); p.hd = p.hd.filter(m => !(m.sp && SPELLS[m.sp] && SPELLS[m.sp].ni));
  const hit = G.pend.find(x => x.pid === p.pid && x.by != null), k = hit && G.ps[hit.by];
  if (!k || !k.al || k.hp <= 0 || !its.length) { its.forEach(id => itBack(G, id)); return; }
  its.slice(3).forEach(id => itBack(G, id));
  k.lootQ = (k.lootQ || []).concat([{ n:p.n, its:its.slice(0, 3) }]);
}
function nkLootOffer(G, p) {
  if (p.disc || !p.lootQ || !p.lootQ.length || !p.al) return;
  const L = p.lootQ.shift();
  if (!p.human || p.ai) { const best = L.its[0]; L.its.slice(1).forEach(id => itBack(G, id)); if (p.hd.length < 10) p.hd.push({ sp:best, u:UID++ }); else itBack(G, best); return nkLootOffer(G, p); }   // l'IA prend le plus fort
  p.disc = L.its.map(id => ({ sp:id, u:UID++ })); p.dsc = 'Ninja vaincu : ' + L.n;
}
function endCombat() {
  const G = H.G;
  for (const x of G.pend) { const q = G.ps[x.pid], a = Math.min(q.ar || 0, x.d); q.ar = (q.ar || 0) - a; q.hp -= x.d - a; }   // l'armure du héros encaisse d'abord
  duoSync(G);
  G.ps.forEach(p => { const hh = HEROES[p.hero]; if (p.al && p.hp <= 0 && hh && hh.hearts && !p.k5) { p.k5 = 1; p.hp = hh.hearts; } });   // Kakuzu : Cinq cœurs
  duoSync(G);
  const dead = G.ps.filter(p => p.al && p.hp <= 0).sort((a, b) => b.hp - a.hp);
  let alive = G.ps.filter(p => p.al && p.hp > 0).length;
  if (inMechAny(G, 'chakra')) dead.forEach(p => nkLoot(G, p));   // Naruto : butin du ninja vaincu
  dead.forEach((p, k) => { p.al = false; p.place = alive + 1 + k; p.sh.forEach(m => toPool(G, m)); p.bd.forEach(m => toPool(G, m)); p.sh = []; });
  if (loOn(G)) { const w = loAfter(G);   // l'Anneau est arrivé au Mont du Destin : détruit (Peuples libres) ou rendu à Sauron (Ombre)
    if (w) { G.ringWin = { pid:w.pid, shadow:loCamp(w) === 'O' }; const rest = G.ps.filter(x => x.al && x !== w).sort((a, b) => b.hp - a.hp); rest.forEach((x, k) => { x.al = false; x.place = 2 + k; x.sh.forEach(m => toPool(G, m)); x.bd.forEach(m => toPool(G, m)); x.sh = []; }); alive = 1; } }
  if (NJ_AWK && inMechAny(G, 'chakra') && !G.eveil) { const al = G.ps.filter(p => p.al), low = al.filter(p => p.hp <= ((+RU().hp || 40) / 2)).length; if (low * 2 >= al.length || alive <= 3) G.eveil = G.rd + 1; }
  if (alive <= 1 || (G.tm && loOn(G) && new Set(G.ps.filter(p => p.al).map(p => p.tm)).size <= 1)) {   // en duos : il ne reste qu'une équipe
    const w = G.ps.find(p => p.al); if (w) w.place = 1; if (G.tm && loOn(G)) G.ps.forEach(x => { if (x.al) x.place = 1; });
    if (!w && dead[0]) dead[0].place = 1;
    G.ph = 'end'; G.end = Date.now(); broadcast(); clearInterval(H.tick); setLobbyPresence();
    if (Net.role === 'host') setTimeout(hostBackToTable, 1200);   // en ligne : tout le monde revient à la table
    return;
  }
  startRecruit();
}
function finishHero() {
  const G = H.G;
  if (loOn(G) && G.tm) G.tm.forEach(t => { const ps = G.ps.filter(p => p.tm === t.id); if (!t.duo) { const h0 = ps.find(p => p.hero); t.duo = (h0 && loDuoOf(h0.hero) || loDuoId(t.ho[0])).id; }
    const d = loDuoId(t.duo); ps.forEach(p => { if (!d.h.includes(p.hero)) p.hero = null; }); ps.forEach(p => { if (!p.hero) p.hero = d.h.find(x => !ps.some(q => q.hero === x)) || d.h[0]; });
    const hp = (+RU().hp || 40) + (d.b.hp || 0); t.hp = hp; t.set = 1; ps.forEach(p => { p.hp = hp; }); });
  G.ps.forEach(p => { if (!p.hero) p.hero = p.ho[0]; if (p.hero === 'gor') p.hp += 5; });
  G.ps.forEach(p => { const a = HEROES[p.hero] && HEROES[p.hero].ar; if (a) p.ar = a; });   // armure de départ du héros (équilibrage à la Hearthstone)
  if (inMechAny(G, 'chakra')) G.ps.forEach(p => { const c = nhCard(p.hero); if (!c) return; if ((G.pool[c] || 0) > 0) G.pool[c]--; const m = mk(c, 0); m.lk = 1; p.hd.push(m); });   // Naruto : la carte du héros attend dans la main
  startRecruit();
}
function hostTick() {
  const G = H.G; if (!G) return;
  const now = Date.now();
  if (G.ph === 'hero' && (now >= G.end || G.ps.every(p => p.hero))) finishHero();
  else if (G.ph === 'recruit') { const hl = humansLive(G); if (now >= G.end || (hl.length && hl.every(p => p.rdy))) endRecruit(); }
  else if (G.ph === 'combat' && now >= G.end) endCombat();
  if (now - H.hb > 2500) { H.hb = now; broadcast(); }
}

/* ---------- diffusion ---------- */
const smallM = m => { if (m.sp) return { sp:m.sp, u:m.u, ch:m.ch || 0, us:m.us || 0, tmpc:m.tmpc || 0 }; const o = { c:m.c, a:m.a, h:m.h }; if (m.it) o.it = m.it; if (m.lk) o.lk = 1; if (m.ring) { o.ring = 1; o.rc = m.rc || 0; } if (m.awk) o.awk = 1; if (m.sl) o.sl = m.sl; if (m.med) o.med = 1; if (m.ju) o.ju = m.ju; if (m.tf) { o.tf = m.tf; o.tfn = m.tfn; } if (m.abs) o.abs = m.abs; if (m.por) { o.por = m.por; o.porOf = m.porOf; } if (m.fam) { o.fam = m.fam; if (m.famOf) o.famOf = m.famOf; } if (m.gag) o.gag = m.gag; if (m.rk) o.rk = m.rk; if (m.memo) o.memo = m.memo; if (m.el) o.el = m.el; if (m.fu) o.fu = m.fu; if (m.xp) o.xp = m.xp; if (m.eq && m.eq.length) o.eq = m.eq; if (m.u) o.u = m.u; if (m.g) o.g = 1; if (m.f) o.f = m.f; if (m.tr) o.tr = 1; if (m.x) o.x = m.x; if (m.tmp) o.tmp = m.tmp; if (m.bn) o.bn = m.bn; return o; };
const fullM = m => { const o = { c:m.c, a:m.a, h:m.h, g:m.g || 0, f:m.f || '', u:m.u }; if (m.lk) o.lk = 1; if (m.it) o.it = m.it; if (m.x) o.x = m.x; if (m.fam) o.fam = m.fam; if (m.gag) o.gag = m.gag; if (m.domb) o.domb = m.domb; if (m.awk) o.awk = m.awk; if (m.tf) o.tf = m.tf; if (m.duo) o.duo = 1; if (m.el) o.el = m.el; if (m.hx) o.hx = m.hx; return o; };
function pubData() {
  const G = H.G;
  if (!G) return { ph:'lobby', code:H.code, cv:CAT_REV, us:(V.univSel || []).slice(), pl:H.roster.map(r => ({ n:r.n, pe:r.peer })), last:H.last || null };
  return { ph:G.ph, rd:G.rd, rem:Math.max(0, G.end - Date.now()), code:H.code, cv:CAT_REV, trs:G.trs, ban:G.ban, univ:G.univ, laws:G.laws || [], ringp:(p => p ? p.pid : null)(G.ps.find(x => x.ring)), rg:G.rg ? { pid:G.rg.pid, et:G.rg.et } : null, ev:G.eveil || 0, mhp:(+RU().hp || 40) + 10,
    pl:G.ps.map(p => ({ pid:p.pid, ar:p.ar || 0, haw:p.haw || 0, hs:p.hist || [], tc:p.trc || 0, ws:p.wst || 0, n:p.n, tm:p.tm == null ? null : p.tm, hp:p.hp, t:p.t, ai:!p.human, bot:p.bot, al:p.al, pl:p.place, r:p.rdy, h:p.hero, pe:p.peer, nb:p.bd.length, el:p.cp ? compEl(p.cp) : null, mk:p.cp ? p[MK[compEl(p.cp)]] || 0 : 0 })) };
}
function privData(p, noAv) {
  return { to:p.peer, pid:p.pid, ar:p.ar || 0, av:!noAv && H.G && H.G.tm ? (a => a && a.al ? privData(a, 1) : null)(loAlly(H.G, p)) : null, ally:(a => a ? { pid:a.pid, n:a.n, hero:a.hero, t:a.t, g:a.g, mg:a.mg, bd:a.bd.map(smallM), sh:a.sh.map(smallM), hd:a.hd.map(smallM), hn:a.hd.length, fz:a.fz ? 1 : 0, rdy:a.rdy ? 1 : 0, ring:a.ring ? 1 : 0 } : null)(H.G ? loAlly(H.G, p) : null), duo:H.G && H.G.tm && p.tm != null ? H.G.tm[p.tm].duo : null, pmax:H.G ? loPowMax(H.G, p) : 1, pun:p.pun || 0, passfree:H.G && H.G.tm && p.tm != null && loDuoB(H.G, p).pass ? 1 : 0, ring:p.ring ? 1 : 0, camp:H.G && loOn(H.G) ? loCamp(p) : null, rh:p.rh || 0, dsc:p.dsc || null, fell:p.fell || null, g:p.g, mg:p.mg, t:p.t, uc:upCost(p), sh:p.sh.map(smallM), bd:p.bd.map(smallM), hd:p.hd.map(smallM),
    fz:p.fz, pu:p.pu, fb:p.fb || 3, spc:p.sp && SPELLS[p.sp.sp] ? spCost(p, SPELLS[p.sp.sp]) : null, sp2:p.sp2 ? p.sp2.sp : null, cb:p.cb || 0, cid:compOf(p.hero), cp:p.cp || null, bst:p.bst || null, sp:p.sp ? p.sp.sp : null, disc:p.disc ? p.disc.map(smallM) : null, cho:p.cho || null, gem:[p.gemA || 0, p.gemH || 0], inc:(p.inc && p.inc[0]) || 0, tma:p.tma || null, souls:p.souls || 0, braise:p.braise || 0, maree:p.maree || 0, charge:p.charge || 0, ck:p.ck || 0, ki:p.ki || 0, kiGain:p.kiGain || 0, pf:p.pf || 0, pfn:p.pfNext || 0, dbDied:p.dbDied || 0, dbRes:p.dbRes || '', njf:p.njf || 0, spd:p.spd || 0, castN:p.castN || 0, ckm:ckMax(p), ckPay:heroCk(H.G, p) ? 1 : 0, kiPay:heroKi(p) ? 1 : 0, pend:p.pendChest || null, rsv:p.rsv || [], combo:p.combo || null, mkl:(mkSync(p), p.mkl) || {}, souffle:p.souffle || 0, roche:p.roche || 0, choice:p.choice || null, chFav:p.chFav || 0, ups:p.ups || [], pure:p.pure || null, eqs:p.eqs || [], eqlv:p.eqlv || {}, loot:p.loot || null, mkt:p.mkt || 0, rd:H.G ? H.G.rd : 0, hero:p.hero, ho:p.ho, hrr:p.hrr || 0, hrm:p.hrm == null ? HERO_ROLLS : p.hrm, haw:p.haw || 0, hawId:p.hawId || 0, qp:p.qp || 0, rdy:p.rdy, rr:p.rr, res:p.res, hp:p.hp };
}
function netEmit(topic, data) {
  if (!H.nr) return;
  H.nr.emit(topic, data).catch(e => { if (e && e.code === 'not_permitted') toast('Ton accès ne permet pas d\'héberger une partie en ligne (accès Contributeur requis).'); });
}
function sendPub() { const d = pubData(); onPub(d, true); netEmit('pub', d); }
function sendPriv(p) {
  if (!p.human || p.bot || !p.peer) return;
  const d = privData(p);
  if (p.peer === LOCAL || p.peer === Net.myPeer) onPriv(d, true); else netEmit('priv', d);
}
function deliverFight(p, d) {
  d.to = p.peer;
  if (p.peer === LOCAL || p.peer === Net.myPeer) onFight(d, true);
  else { netEmit('fight', d); setTimeout(() => netEmit('fight', d), 600); }
}
function broadcast() { sendPub(); if (H.G) H.G.ps.forEach(sendPriv); }

// Le Seigneur des Anneaux : toute action d'un joueur fixe le camp des cartes qu'on lui tire
Object.keys(OPS).forEach(k => { const f = OPS[k]; if (typeof f === 'function') OPS[k] = function (G, p, a) { DRAWP = p; return f.call(OPS, G, p, a); }; });
