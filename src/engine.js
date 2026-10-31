/* =====================================================================
   DONNÉES PAR DÉFAUT — tout est modifiable depuis l'atelier (admin)
   ===================================================================== */
const BASE_KW = ['t', 's', 'v', 'r', 'w'];
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
    { id:'n_feu', n:'Clan Katon', col:'#d8502a', bg:'volcan', on:true },
    { id:'n_vent', n:'Clan Fûton', col:'#3aa86a', bg:'sqvent', on:true },
    { id:'n_eau', n:'Clan Suiton', col:'#2f7ab8', bg:'sqeau', on:true },
    { id:'n_foudre', n:'Clan Raiton', col:'#c8a020', bg:'sqfoudre', on:true },
    { id:'n_terre', n:'Clan Doton', col:'#7a5a3a', bg:'mine', on:true },
  ],
  univ:[
    { n:'Ténèbres', col:'#6a2a8a', ic:'moon', lore:'Ici, mourir n\'est qu\'un contretemps.', mech:'ames', tribes:['spec', 'vamp', 'garou', 'mort', 'bete'] },
    { n:'Royaumes anciens', col:'#9a7228', ic:'crown', lore:'Les vieilles lignées tiennent parole.', mech:'serment', tribes:['nain', 'elfe', 'ogre', 'bete', 'vamp'] },
    { n:'Ateliers et bas-fonds', col:'#4a6a86', ic:'gear', lore:'Tout se vend, surtout ce qui fume.', mech:'marche', tribes:['meca', 'gob', 'nain', 'cors', 'ogre'] },
    { n:'Terres sauvages', col:'#4a7a2a', ic:'leaf', lore:'La meute charge d\'abord.', mech:'ruee', tribes:['bete', 'garou', 'elfe', 'drag', 'elem'] },
    { n:'Mers et cieux', col:'#1f6a96', ic:'wave', lore:'Chaque victoire a son butin.', mech:'pillage', tribes:['cors', 'drag', 'elem', 'spec', 'meca'] },
    { n:'Arcanes', col:'#5a3a9a', ic:'star', lore:'Un sort, et tout s\'illumine.', mech:'resonance', tribes:['elem', 'elfe', 'meca', 'mort', 'spec'] },
    { n:'Montagnes', col:'#6a5038', ic:'mount', lore:'Ils tombent… et tout s\'effondre.', mech:'eboulement', tribes:['nain', 'ogre', 'gob', 'drag', 'garou'] },
    { n:'Ninja', col:'#a8402a', ic:'sword', lore:'Cinq clans, un chakra : la technique décide.', mech:'chakra', tribes:['n_feu', 'n_vent', 'n_eau', 'n_foudre', 'n_terre'] },
    { n:'Squishys', col:'#b04a6a', ic:'blob', lore:'Une grosse boule de câlins.', mech:'fusion', tribes:['sq_feu', 'sq_eau', 'sq_terre', 'sq_vent', 'sq_foudre'] },
  ],
  heroFam:{},
  neutral:{ n:'Neutre', col:'#8a5a30', bg:'neu' },
  kw:{
    t:{ n:'Provocation', d:'Les ennemis doivent l\'attaquer en premier.', c:1 },
    s:{ n:'Bouclier divin', d:'Ignore la première source de dégâts.', c:3 },
    v:{ n:'Toxique', d:'Détruit tout serviteur qu\'il blesse.', c:3 },
    r:{ n:'Renaissance', d:'Revient à la vie avec 1 PV la première fois qu\'il meurt.', c:2 },
    w:{ n:'Furie des vents', d:'Attaque deux fois.', c:3 },
    k_ferveur:{ n:'Ferveur', d:'Fin de tour : gagne +1/+1.', c:3, fx:{ k:'eot_self', a:1, h:1 } },
  },
  val:{ atk:1, hp:1, allies:3, mode:'block' },
  fxw:{},
  budget:{ 1:[3, 6], 2:[6, 11], 3:[8, 13], 4:[11, 18], 5:[15, 24], 6:[20, 32] },
  rules:{ hp:40, tribesPerGame:5, time:35, perRound:5, maxTime:75,
    pool:{ 1:16, 2:15, 3:13, 4:11, 5:9, 6:7 }, up:{ 1:6, 2:7, 3:8, 4:9, 5:10 } },
};
// id, nom, niveau (0 = jeton), tribu, attaque, vie, mots-clés, effets
const DEFAULT_CARD_LIST = [
  ['r_rouage', 'Rouage blindé', 1, 'meca', 1, 1, 's', []],
  ['b_chiot', 'Chiot des cendres', 1, 'bete', 2, 1, '', [{ k:'dr_summon', card:'tk_chiot', n:1 }]],
  ['p_pilleur', 'Pilleur de quai', 1, 'cors', 3, 2, '', []],
  ['s_lueur', 'Lueur errante', 1, 'spec', 2, 1, 'r', []],
  ['n_garde', 'Garde-barrière', 1, 'neu', 1, 4, 't', []],
  ['r_ferr', 'Ferrailleur', 1, 'meca', 2, 2, '', [{ k:'sell_gold', n:1 }]],
  ['b_chat', 'Chat de gouttière', 1, 'bete', 1, 1, '', [{ k:'bc_summon', card:'tk_chaton', n:1 }]],
  ['r_piston', 'Pistonneur', 2, 'meca', 2, 3, '', [{ k:'play_self', tb:'meca', a:1, h:1 }]],
  ['b_meute', 'Loup affamé', 2, 'bete', 3, 2, '', [{ k:'dr_buff_rand', tb:'bete', a:2, h:1 }]],
  ['p_second', 'Second du capitaine', 2, 'cors', 3, 3, '', [{ k:'bc_buff_tribe', tb:'cors', a:1, h:1 }]],
  ['s_murmure', 'Murmure glacé', 2, 'spec', 2, 4, '', [{ k:'die_self', tb:'', a:1, h:1 }]],
  ['n_bricol', 'Bricoleur', 2, 'neu', 2, 3, '', [{ k:'eot_buff_rand', a:1, h:1, n:1, tb:'' }]],
  ['b_venin', 'Cracheur de venin', 2, 'bete', 1, 2, 'v', []],
  ['r_bombe', 'Bombe ambulante', 2, 'meca', 2, 2, '', [{ k:'dr_dmg', d:4, n:1 }]],
  ['r_meca', 'Mécanicienne', 3, 'meca', 3, 3, '', [{ k:'dr_summon', card:'tk_robot', n:2 }]],
  ['b_louve', 'Mère louve', 3, 'bete', 3, 3, '', [{ k:'dr_summon', card:'tk_louv', n:2 }]],
  ['p_canon', 'Canonnier', 3, 'cors', 2, 3, '', [{ k:'soc_dmg', d:3, n:1 }]],
  ['s_ame', 'Âme en peine', 3, 'spec', 3, 2, 'tr', []],
  ['n_aube', 'Paladin de l\'aube', 3, 'neu', 3, 3, 's', []],
  ['n_taver', 'Tavernier jovial', 3, 'neu', 2, 3, '', [{ k:'eot_buff_rand', a:1, h:1, n:2, tb:'' }]],
  ['r_forge', 'Forge vivante', 4, 'meca', 3, 5, '', [{ k:'play_other', tb:'meca', a:2, h:2 }]],
  ['b_cerf', 'Grand cerf', 4, 'bete', 4, 4, '', [{ k:'bc_buff_tribe', tb:'bete', a:2, h:2 }]],
  ['p_bouc', 'Boucanier sanglant', 4, 'cors', 4, 4, 'w', []],
  ['s_hurl', 'Hurleur du voile', 4, 'spec', 3, 5, '', [{ k:'dr_buff_all', tb:'spec', a:2, h:2 }]],
  ['n_champ', 'Champion de l\'arène', 4, 'neu', 3, 6, 't', [{ k:'surv_self', a:2, h:0 }]],
  ['r_titan', 'Titan de ferraille', 5, 'meca', 6, 6, '', [{ k:'dr_summon', card:'r_rouage', n:2 }]],
  ['b_roi', 'Roi des fauves', 5, 'bete', 5, 6, '', [{ k:'die_others', tb:'bete', a:1, h:1 }]],
  ['p_amiral', 'Amirale fantôme', 5, 'cors', 6, 5, '', [{ k:'bc_buff_tribe', tb:'cors', a:2, h:2 }]],
  ['s_liche', 'Liche du gouffre', 5, 'spec', 4, 6, '', [{ k:'soc_kw', kw:'r', tb:'spec' }]],
  ['n_sage', 'Sage des runes', 5, 'neu', 4, 5, '', [{ k:'eot_buff_all', a:1, h:1, tb:'' }]],
  ['r_colosse', 'Colosse primordial', 6, 'meca', 7, 7, 's', [{ k:'dr_kw', kw:'s', tb:'meca' }]],
  ['b_fleau', 'Fléau des plaines', 6, 'bete', 7, 7, '', [{ k:'dr_summon_rand', tb:'bete', tier:4, n:2 }]],
  ['p_kraken', 'Kraken des abysses', 6, 'cors', 6, 7, '', [{ k:'soc_dmg', d:4, n:2 }]],
  ['s_seign', 'Seigneur des âmes', 6, 'spec', 6, 6, '', [{ k:'dr_summon', card:'s_ame', n:2 }]],
  ['n_gardien', 'Gardien éternel', 6, 'neu', 6, 10, 'ts', []],
  ['n_tambour', 'Tambour des deux fronts', 4, 'neu', 2, 5, '', [{ k:'aura_soc' }]],
  ['n_heraut', 'Héraut des échos', 5, 'neu', 2, 4, '', [{ k:'aura_bc' }]],
  ['n_fossoy', 'Fossoyeur aux lanternes', 5, 'neu', 1, 7, '', [{ k:'aura_dr' }]],
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
  ['sg_boule', 'Boule de neige', 0, 'sq_glace', 2, 2, '', []],
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
  ['n_sablier', 'Maître des sabliers', 5, 'neu', 3, 5, '', [{ k:'aura_eot' }]],
  ['tk_chiot', 'Chiot fumant', 0, 'bete', 1, 1, '', []],
  ['tk_chaton', 'Chaton', 0, 'bete', 1, 1, '', []],
  ['tk_robot', 'Micro-robot', 0, 'meca', 1, 1, '', []],
  ['tk_louv', 'Louveteau', 0, 'bete', 2, 1, '', []],
  // ----- Les Cinq Nations (univers ninja original) -----
  ['n_f1', 'Apprentie des braises', 1, 'n_feu', 2, 1, '', [{ k:'cast_braise', n:1 }]],
  ['n_f2', 'Souffleur de flammes', 2, 'n_feu', 3, 2, '', [{ k:'eot_ck_braise', n:1 }]],
  ['n_f3', 'Gardienne du foyer', 3, 'n_feu', 3, 4, '', [{ k:'cast_buff_tribe', a:1, h:1, tb:'n_feu' }]],
  ['n_f4', 'Danseur de cendres', 4, 'n_feu', 4, 5, '', [{ k:'cast_braise', n:2 }, { k:'soc_dmg', d:2, n:2 }]],
  ['n_f5', 'Maître du brasier', 5, 'n_feu', 5, 5, '', [{ k:'bc_spell', n:1 }, { k:'cast_buff_tribe', a:2, h:1, tb:'n_feu' }]],
  ['n_f6', 'Grand Sage Katon', 6, 'n_feu', 7, 7, '', [{ k:'awk_phoenix' }, { k:'cast_braise', n:2 }]],
  ['n_v1', 'Éclaireur des dunes', 1, 'n_vent', 2, 2, '', [{ k:'bc_gold', n:1 }]],
  ['n_v2', 'Lame tourbillon', 2, 'n_vent', 2, 3, 'w', [{ k:'bc_upd', n:1 }]],
  ['n_v3', 'Cerf-volant de guerre', 3, 'n_vent', 3, 4, '', [{ k:'roll_buff_tribe', a:1, h:2, tb:'n_vent' }, { k:'eot_souffle', n:1 }]],
  ['n_v4', 'Faucheuse du vent', 4, 'n_vent', 4, 4, 'w', [{ k:'awk_hurricane', d:1 }, { k:'eot_inc', n:1 }, { k:'eot_souffle', n:1 }]],
  ['n_v5', 'Mur de sable', 5, 'n_vent', 5, 6, '', [{ k:'eot_inc', n:2 }, { k:'eot_souffle', n:1 }]],
  ['n_v6', 'Seigneur des dunes', 6, 'n_vent', 7, 8, 't', [{ k:'awk_hurricane', d:2 }, { k:'eot_buff_all', a:1, h:2, tb:'n_vent' }]],
  ['n_e1', 'Guetteur des brumes', 1, 'n_eau', 1, 2, '', [{ k:'eot_maree', n:1 }]],
  ['n_e2', 'Ondine silencieuse', 2, 'n_eau', 2, 3, 's', [{ k:'eot_wave', a:1, h:1 }]],
  ['n_e3', 'Porteuse de marée', 3, 'n_eau', 3, 3, '', [{ k:'eot_maree', n:1 }, { k:'eot_wave', a:1, h:1 }]],
  ['n_e4', 'Duelliste des brumes', 4, 'n_eau', 4, 4, '', [{ k:'pas_ckx', n:2 }, { k:'dr_kw', kw:'s', tb:'n_eau' }]],
  ['n_e5', 'Serpent de marée', 5, 'n_eau', 5, 5, '', [{ k:'bc_chakra', n:3 }, { k:'eot_maree', n:2 }]],
  ['n_e6', 'Gardien des abysses', 6, 'n_eau', 6, 8, 's', [{ k:'awk_tsunami' }, { k:'pas_ckx', n:3 }]],
  ['n_o1', 'Étincelle rapide', 1, 'n_foudre', 2, 2, '', [{ k:'eot_charge', n:1 }]],
  ['n_o2', 'Messager de l\'orage', 2, 'n_foudre', 2, 3, '', [{ k:'eot_chakra', n:1 }]],
  ['n_o3', 'Lame crépitante', 3, 'n_foudre', 4, 3, '', [{ k:'awk_surge', a:3, h:0 }, { k:'atk_zap', d:2, n:1 }]],
  ['n_o4', 'Hurleur du tonnerre', 4, 'n_foudre', 4, 5, '', [{ k:'eot_charge', n:2 }, { k:'bc_chakra', n:2 }]],
  ['n_o5', 'Cuirasse d\'éclairs', 5, 'n_foudre', 6, 6, 'w', [{ k:'awk_surge', a:3, h:3 }, { k:'atk_zap', d:2, n:2 }]],
  ['n_o6', 'Seigneur de l\'orage', 6, 'n_foudre', 8, 7, '', [{ k:'awk_storm' }, { k:'eot_chakra', n:2 }]],
  ['n_t1', 'Petit golem de pierre', 1, 'n_terre', 1, 2, 't', [{ k:'eot_anchor' }, { k:'eot_roche', n:1 }]],
  ['n_t2', 'Bâtisseur de remparts', 2, 'n_terre', 2, 3, 't', [{ k:'bc_buff_tribe', a:0, h:1, tb:'n_terre' }]],
  ['n_t3', 'Garde des roches', 3, 'n_terre', 2, 5, 't', [{ k:'eot_buff_taunt', a:1, h:1 }, { k:'eot_roche', n:1 }]],
  ['n_t4', 'Lanceur de rochers', 4, 'n_terre', 5, 4, '', [{ k:'soc_dmg', d:3, n:1 }, { k:'eot_anchor' }]],
  ['n_t5', 'Colosse de granit', 5, 'n_terre', 4, 8, 't', [{ k:'eot_anchor' }, { k:'surv_self', a:1, h:0 }]],
  // bêtes d'invocation (apparaissent à l'Éveil grâce au pacte)
  ['nb_feu', 'Salamandre de braise', 0, 'n_feu', 6, 6, '', []],
  ['nb_vent', 'Loup des vents', 0, 'n_vent', 6, 5, '', []],
  ['nb_eau', 'Serpent des marées', 0, 'n_eau', 5, 7, '', []],
  ['nb_foudre', 'Tigre de foudre', 0, 'n_foudre', 7, 5, '', []],
  ['nb_terre', 'Sanglier de roc', 0, 'n_terre', 4, 9, '', []],
  ['n_f9', 'Gardien du foyer', 3, 'n_feu', 3, 3, '', [{ k:'combo_self', a:2, h:2 }]],
  ['n_v9', 'Courrier des vents', 2, 'n_vent', 3, 3, '', [{ k:'combo_gold', n:1 }]],
  ['n_e9', 'Puits sans fond', 4, 'n_eau', 3, 6, '', [{ k:'rsv_bc' }, { k:'combo_tribe', a:1, h:1, tb:'n_eau' }]],
  ['n_o9', 'Condensateur vivant', 3, 'n_foudre', 3, 4, '', [{ k:'combo_ck', n:2 }]],
  ['n_t9', 'Colosse d\'argile', 5, 'n_terre', 4, 7, 't', [{ k:'rsv_bc' }, { k:'combo_self', a:1, h:3 }]],
  ['n_f7', 'Voleur d\'étincelles', 2, 'n_feu', 2, 3, '', [{ k:'soc_steal', n:1 }]],
  ['n_f8', 'Pyromancien avide', 4, 'n_feu', 3, 4, '', [{ k:'eot_ck_braise', n:2 }, { k:'soc_ck', a:1, h:0 }]],
  ['n_v7', 'Pickpocket des sables', 1, 'n_vent', 2, 2, '', [{ k:'dr_steal', n:1 }]],
  ['n_v8', 'Danseur d\'éventail', 3, 'n_vent', 3, 4, '', [{ k:'cast_ck', n:1 }]],
  ['n_e7', 'Siphon de brume', 3, 'n_eau', 2, 5, '', [{ k:'soc_steal', n:2 }]],
  ['n_e8', 'Méditant des cascades', 5, 'n_eau', 4, 6, '', [{ k:'eot_ck_spend', n:2, a:2, h:2 }, { k:'pas_ckx', n:2 }]],
  ['n_o7', 'Parasite de foudre', 2, 'n_foudre', 3, 3, '', [{ k:'dr_steal', n:2 }]],
  ['n_o8', 'Tempête intérieure', 5, 'n_foudre', 5, 5, '', [{ k:'soc_ck', a:1, h:1 }]],
  ['n_t7', 'Pilleur souterrain', 4, 'n_terre', 4, 5, 't', [{ k:'soc_steal', n:2 }]],
  ['n_t8', 'Ermite des cimes', 6, 'n_terre', 5, 7, '', [{ k:'eot_ck_spend', n:3, a:3, h:3 }, { k:'cast_ck', n:1 }]],
  ['c_nj_feu', 'Disciple de la flamme', 3, 'n_feu', 6, 5, '', [{ k:'soc_dmg', d:2, n:1 }, { k:'combo_self', a:2, h:1 }]],
  ['c_nj_vent', 'Disciple du vent', 3, 'n_vent', 5, 4, 'w', [{ k:'atk_self', a:1, h:1 }, { k:'combo_gold', n:1 }, { k:'combo_self', a:1, h:1 }]],
  ['c_nj_eau', 'Disciple de la brume', 3, 'n_eau', 3, 8, '', [{ k:'surv_self', a:1, h:1 }, { k:'combo_self', a:1, h:2 }]],
  ['c_nj_foudre', 'Disciple de l\'orage', 3, 'n_foudre', 5, 6, '', [{ k:'atk_zap', d:2, n:1 }, { k:'combo_ck', n:1 }, { k:'combo_self', a:1, h:1 }]],
  ['c_nj_terre', 'Disciple du roc', 3, 'n_terre', 2, 11, '', [{ k:'soc_self', a:1, h:0 }, { k:'combo_self', a:1, h:2 }]],
  ['n_t6', 'Seigneur des roches', 6, 'n_terre', 6, 10, 't', [{ k:'awk_quake' }, { k:'eot_buff_taunt', a:2, h:2 }]],
];
const DEFAULT_CARDS = {};
DEFAULT_CARD_LIST.forEach(([id, n, t, tr, a, h, kw, fx]) => { DEFAULT_CARDS[id] = { id, n, t, tr, a, h, kw:kw.split(''), fx, art:{ f:'base', id } }; });
const COMPANIONS = { nh_akari:'c_nj_feu', nh_hoshi:'c_nj_feu', nh_ren:'c_nj_feu', nh_tsubaki:'c_nj_feu', nh_daigo:'c_nj_feu', nh_mira:'c_nj_vent', nh_taro:'c_nj_vent', nh_haru:'c_nj_vent', nh_gen:'c_nj_vent', nh_saki:'c_nj_vent', nh_mizu:'c_nj_eau', nh_ryota:'c_nj_eau', nh_umi:'c_nj_eau', nh_kenji:'c_nj_eau', nh_aya:'c_nj_eau', nh_raiko:'c_nj_foudre', nh_kenta:'c_nj_foudre', nh_hikari:'c_nj_foudre', nh_akio:'c_nj_foudre', nh_rika:'c_nj_foudre', nh_goro:'c_nj_terre', nh_kaito:'c_nj_terre', nh_masa:'c_nj_terre', nh_toshi:'c_nj_terre', nh_emi:'c_nj_terre', nh_hina:'c_nj_feu', nh_kazan:'c_nj_feu', nh_tatsu:'c_nj_feu', nh_sora:'c_nj_vent', nh_fumi:'c_nj_vent', nh_shin:'c_nj_vent', nh_nami:'c_nj_eau', nh_shizuka:'c_nj_eau', nh_kai:'c_nj_eau', nh_jin:'c_nj_foudre', nh_ikazu:'c_nj_foudre', nh_sho:'c_nj_foudre', nh_iwao:'c_nj_terre', nh_daichi:'c_nj_terre', nh_kuro:'c_nj_terre', paul:'c_pouf', leon:'c_caillou', zoe:'c_gloup', jeanne:'c_frisouille', selene:'c_nyx', brok:'c_enclume', sylvara:'c_lys', grumbo:'c_miette', vaskor:'c_osbrise', pyra:'c_etincelle', rivet:'c_bricole', egide:'c_lumen', ondine:'c_fiole', barnabe:'c_sou', maelle:'c_croc', oren:'c_plume', gor:'c_bastion', ilka:'c_truelle', nono:'c_braise' };
for (const h in COMPANIONS) DEFAULT_CARDS[COMPANIONS[h]].comp = h;
const compOf = hero => { const id = COMPANIONS[hero]; if (id && CARDS[id]) return id; return Object.keys(CARDS).find(k => CARDS[k].comp === hero) || null; };
const compLimit = rd => rd >= 6 ? 3 : rd >= 5 ? 2 : rd >= 3 ? 1 : 0;

const SLOTS = { 1:3, 2:4, 3:4, 4:5, 5:5, 6:6 };
const HEROES = {
  nh_akari: {diff:1, fam:['n_feu'], n:'Akari l\'ardente', cost:1, clan:'feu', pw:{ k:'rfill', el:'feu', b:2 }, tx:'Remplis une moitié de ton réservoir Katon (comme une technique Katon) et gagne 2 braises.' },
  nh_hoshi: {diff:3, fam:['n_feu'], n:'Hoshi le vieux sage', clan:'feu', pw:{ k:'pcombo', el:'feu', d:5, b:1 }, tx:'Passif : chaque combo qui contient du Katon inflige aussi 5 dégâts à l\'ennemi au début du prochain combat et donne 1 braise.' },
  nh_ren: {diff:2, fam:['n_feu'], n:'Ren aux mille braises', cost:1, clan:'feu', pw:{ k:'ctr', c:'braise', n:3, el:'feu', n2:5 }, tx:'Gagne 3 braises, ou 5 si ton réservoir contient du Katon.' },
  nh_tsubaki: {diff:2, fam:['n_feu'], n:'Tsubaki la gardienne', cost:1, clan:'feu', pw:{ k:'braisebuff', n:2, a:2, h:2, tb:'n_feu' }, tx:'Consume 2 braises : tes serviteurs du Clan Katon gagnent +2/+2.' },
  nh_daigo: {diff:2, fam:['n_feu'], n:'Daigo le souffleur', cost:1, clan:'feu', pw:{ k:'techel', el:'feu' }, tx:'Ajoute à ta main une technique Katon aléatoire de ton niveau.' },
  nh_mira: {diff:1, fam:['n_vent'], n:'Mira des dunes', cost:2, clan:'vent', pw:{ k:'rfill', el:'vent' }, tx:'Remplis une moitié de ton réservoir Fûton (comme une technique Fûton).' },
  nh_taro: {diff:2, fam:['n_vent'], n:'Taro le cerf-volant', cost:1, clan:'vent', pw:{ k:'rdump', g:4 }, tx:'Vide la moitié remplie de ton réservoir : gagne 4 or.' },
  nh_haru: {diff:3, fam:['n_vent'], n:'Haru le nomade', clan:'vent', pw:{ k:'ptechc' }, tx:'Passif : tes techniques ninja coûtent 1 or et 1 chakra de moins, et chacune te rend 1 or de plus si elle remplit un réservoir vide.' },
  nh_gen: {diff:3, fam:['n_vent'], n:'Gen aux éventails', cost:1, clan:'vent', pw:{ k:'rcycle', g:2 }, tx:'L\'élément de ton réservoir devient celui qu\'il nourrit (cycle de génération). Gagne 2 or.' },
  nh_saki: {diff:2, fam:['n_vent'], n:'Saki la bourrasque', cost:1, clan:'vent', pw:{ k:'rollg', el:'vent', g:1 }, tx:'Rafraîchis la taverne et sa technique et gagne 1 or (2 si ton réservoir contient du Fûton).' },
  nh_mizu: {diff:1, fam:['n_eau'], n:'Mizu la brume', cost:1, clan:'eau', pw:{ k:'mist', n:1, n2:2, el:'eau' }, tx:'Brume : prochain combat, un de tes serviteurs aléatoires gagne Bouclier divin (deux si ton réservoir contient du Suiton).' },
  nh_ryota: {diff:3, fam:['n_eau'], n:'Ryota le silencieux', clan:'eau', pw:{ k:'prsv', n:1 }, tx:'Passif : en fin de tour, si ton réservoir est à moitié plein, la marée monte de 1.' },
  nh_umi: {diff:3, fam:['n_eau'], n:'Umi la marée', cost:3, clan:'eau', pw:{ k:'rpure' }, tx:'Remplis l\'autre moitié de ton réservoir avec le même élément : déclenche son combo pur.' },
  nh_kenji: {diff:2, fam:['n_eau'], n:'Kenji l\'épéiste', cost:1, clan:'eau', pw:{ k:'tmamaree', max:6 }, tx:'Prochain combat : tes serviteurs gagnent +1 attaque par tranche de 2 marée (+6 au plus).' },
  nh_aya: {diff:1, fam:['n_eau'], n:'Aya des abysses', cost:1, clan:'eau', pw:{ k:'ckmaree', n:2, m:1 }, tx:'Gagne 2 chakra et la marée monte de 1.' },
  nh_raiko: {diff:1, fam:['n_foudre'], n:'Raiko l\'éclair', cost:2, clan:'foudre', pw:{ k:'rfill', el:'foudre' }, tx:'Remplis une moitié de ton réservoir Raiton (comme une technique Raiton).' },
  nh_kenta: {diff:3, fam:['n_foudre'], n:'Kenta le tonnerre', clan:'foudre', pw:{ k:'pdouble' }, tx:'Passif : le premier combo de chaque tour applique deux fois son effet sur le plateau.' },
  nh_hikari: {diff:3, fam:['n_foudre'], n:'Hikari l\'étincelle', clan:'foudre', pw:{ k:'pfire', d:2 }, tx:'Passif : au début de chaque combat, 2 dégâts frappent l\'ennemi.' },
  nh_akio: {diff:2, fam:['n_foudre'], n:'Akio l\'orage', cost:1, clan:'foudre', pw:{ k:'chargebuff', n:2, el:'foudre', a:2, h:1, tb:'n_foudre' }, tx:'Gagne 2 charges. Si ton réservoir contient du Raiton, tes serviteurs du Clan Raiton gagnent aussi +2/+1.' },
  nh_rika: {diff:2, fam:['n_foudre'], n:'Rika la foudroyante', cost:1, clan:'foudre', pw:{ k:'g2ck', g:2, n:4 }, tx:'Dépense 2 or : gagne 4 chakra.' },
  nh_goro: {diff:1, fam:['n_terre'], n:'Goro le roc', cost:3, clan:'terre', pw:{ k:'rfill', el:'terre' }, tx:'Remplis une moitié de ton réservoir Doton (comme une technique Doton).' },
  nh_kaito: {diff:1, fam:['n_terre'], n:'Kaito le bâtisseur', cost:1, clan:'terre', pw:{ k:'kwbuff', kw:'t', a:1, h:4, tb:'n_terre' }, tx:'Un serviteur du Clan Doton aléatoire gagne +1/+4 et Provocation.' },
  nh_masa: {diff:3, fam:['n_terre'], n:'Masa la montagne', clan:'terre', pw:{ k:'pcombo', h:1 }, tx:'Passif : chaque fois que tu déclenches un combo, tes serviteurs gagnent +0/+1.' },
  nh_toshi: {diff:1, fam:['n_terre'], n:'Toshi le colosse', cost:2, clan:'terre', pw:{ k:'buffrsv', tb:'n_terre', a:1, h:2, el:'terre', a2:1, h2:3 }, tx:'Tes serviteurs du Clan Doton gagnent +1/+2, ou +1/+3 si ton réservoir contient du Doton.' },
  nh_emi: {diff:2, fam:['n_terre'], n:'Emi la géode', cost:2, clan:'terre', pw:{ k:'techel', el:'rsv' }, tx:'Ajoute à ta main une technique du même élément que ton réservoir (combo pur assuré), sinon Doton.' },
  nh_hina: {diff:1, fam:['n_feu'], n:'Hina la flammèche', cost:1, clan:'feu', pw:{ k:'fire', d:3 }, tx:'Prochain combat : 3 dégâts frappent l\'ennemi au début du combat.' },
  nh_kazan: {diff:1, fam:['n_feu'], n:'Kazan le forgeron', cost:2, clan:'feu', pw:{ k:'buffr', tb:'n_feu', a:3, h:1 }, tx:'Un serviteur du Clan Katon aléatoire gagne +3/+1.' },
  nh_tatsu: {diff:2, fam:['n_feu'], n:'Tatsu le dragon rouge', clan:'feu', pw:{ k:'pturn', el:'feu', n:1 }, tx:'Passif : au début de chaque tour, gagne 1 braise.' },
  nh_sora: {diff:1, fam:['n_vent'], n:'Sora le planeur', cost:1, clan:'vent', pw:{ k:'techel', el:'vent' }, tx:'Ajoute à ta main une technique Fûton aléatoire de ton niveau.' },
  nh_fumi: {diff:1, fam:['n_vent'], n:'Fumi la plume', cost:1, clan:'vent', pw:{ k:'tma', a:2, h:0 }, tx:'Prochain combat : tes serviteurs gagnent +2/+0.' },
  nh_shin: {diff:2, fam:['n_vent'], n:'Shin le vagabond', clan:'vent', pw:{ k:'pturn', g:1 }, tx:'Passif : au début de chaque tour, gagne 1 or de plus.' },
  nh_nami: {diff:1, fam:['n_eau'], n:'Nami la vague', cost:1, clan:'eau', pw:{ k:'buffr', tb:'n_eau', a:1, h:3 }, tx:'Un serviteur du Clan Suiton aléatoire gagne +1/+3.' },
  nh_shizuka: {diff:1, fam:['n_eau'], n:'Shizuka la source', cost:2, clan:'eau', pw:{ k:'ck', n:3 }, tx:'Gagne 3 chakra.' },
  nh_kai: {diff:2, fam:['n_eau'], n:'Kai le récif', clan:'eau', pw:{ k:'pturn', el:'eau', n:1 }, tx:'Passif : au début de chaque tour, la marée monte de 1.' },
  nh_jin: {diff:2, fam:['n_foudre'], n:'Jin le fulgurant', cost:2, clan:'foudre', pw:{ k:'kw', kw:'w' }, tx:'Un de tes serviteurs aléatoires gagne Furie des vents.' },
  nh_ikazu: {diff:1, fam:['n_foudre'], n:'Ikazu le tambour', cost:2, clan:'foudre', pw:{ k:'buffall', tb:'n_foudre', a:1, h:1 }, tx:'Tes serviteurs du Clan Raiton gagnent +1/+1.' },
  nh_sho: {diff:2, fam:['n_foudre'], n:'Shō l\'aiguille', clan:'foudre', pw:{ k:'pturn', el:'foudre', n:2 }, tx:'Passif : au début de chaque tour, gagne 2 charges.' },
  nh_iwao: {diff:1, fam:['n_terre'], n:'Iwao la falaise', cost:1, clan:'terre', pw:{ k:'buffr', tb:'n_terre', a:0, h:5 }, tx:'Un serviteur du Clan Doton aléatoire gagne +0/+5.' },
  nh_daichi: {diff:1, fam:['n_terre'], n:'Daichi l\'ermite', cost:2, clan:'terre', pw:{ k:'tech' }, tx:'Ajoute à ta main une technique aléatoire de ton niveau.' },
  nh_kuro: {diff:2, fam:['n_terre'], n:'Kuro la taupe', clan:'terre', pw:{ k:'pturn', el:'terre', n:1 }, tx:'Passif : au début de chaque tour, gagne 1 roche.' },
  rivet:   {fam:['meca', 'gob'], n:'Rivet', tx:'Passif : votre première actualisation de chaque tour est gratuite.' },
  egide:   {fam:['nain', 'elfe'], n:'Égide', cost:2, tx:'Donne Bouclier divin à un de vos serviteurs aléatoire.' },
  ondine:  {fam:['elem', 'cors'], n:'Ondine l\'alchimiste', cost:1, tx:'Donne +1/+2 à un de vos serviteurs aléatoire.' },
  barnabe: {fam:['gob', 'cors'], n:'Barnabé le marchand', tx:'Passif : +1 or au début de chaque tour pair.' },
  maelle:  {fam:['bete', 'garou'], n:'Maëlle la dompteuse', tx:'Passif : à la fin de votre tour, donne +1/+1 à votre serviteur le plus à gauche.' },
  oren:    {fam:['elfe', 'mort'], n:'Oren l\'archiviste', cost:3, tx:'Ajoute à votre main un serviteur aléatoire de votre niveau de taverne.' },
  gor:     {fam:['ogre'], n:'Gor le colosse', tx:'Passif : commence la partie avec 5 PV de plus.' },
  ilka:    {fam:['nain', 'meca'], n:'Ilka la bâtisseuse', tx:'Passif : améliorer la taverne coûte 1 or de moins.' },
  selene:  {fam:['vamp'], n:'Sélène la comtesse', cost:1, tx:'Donne +1/+1 à un de vos serviteurs aléatoire et l\'enchante : « Après avoir attaqué, gagne +1/+1 ».' },
  brok:    {fam:['nain'], n:'Brok Barbe-d\'acier', cost:2, tx:'Donne Provocation à un de vos serviteurs aléatoire qui n\'en a pas.' },
  sylvara: {fam:['elfe', 'elem'], n:'Sylvara l\'archimage', tx:'Passif : le premier sort que vous achetez chaque tour coûte 1 or de moins.' },
  grumbo:  {fam:['ogre', 'gob'], n:'Grumbo le glouton', cost:2, tx:'Donne +3/+3 à votre serviteur qui a le plus d\'attaque.' },
  vaskor:  {fam:['mort', 'spec'], n:'Vaskor le nécromancien', cost:1, tx:'Invoque un Squelette 1/1 avec Renaissance sur votre plateau.' },
  pyra:    {fam:['drag'], n:'Pyra la chevaucheuse', tx:'Passif : au début de chaque combat, votre dragon souffle 2 dégâts sur un ennemi aléatoire (le surplus touche d\'autres ennemis).' },
  paul:    {fam:['sq_feu'], n:'Paul', cost:2, el:'sq_feu', tx:'Ami du feu · Attise : un Flammou aléatoire gagne +2/+1 et vos autres Flammous gagnent +1 attaque.' },
  leon:    {fam:['sq_terre'], n:'Léon', el:'sq_terre', tx:'Ami de la terre · Passif : quand vous jouez un Mottu, il gagne Provocation et +1/+2.' },
  zoe:     {fam:['sq_eau'], n:'Zoé', cost:1, el:'sq_eau', tx:'Amie de l\'eau · Ajoute à votre main un Flotti aléatoire de votre niveau de taverne ou moins.' },
  jeanne:  {fam:['sq_vent'], n:'Jeanne', cost:2, el:'sq_vent', tx:'Amie du vent · Prochain combat seulement : vos Zéphys gagnent +1/+1 pour chaque Zéphy sur votre plateau.' },
  nono:    {fam:['drag', 'elem'], n:'NonoJose', cost:1, minRound:3, tx:'Dès la manche 3 : lance une boule de feu de 3 dégâts sur un serviteur ennemi aléatoire au début du prochain combat ; les dégâts en trop touchent d\'autres ennemis. Chaque manche où le pouvoir n\'est pas utilisé, ses dégâts augmentent de 1 pour toute la partie.' },
};
// familles d'un héros (modifiables dans l'atelier)
const heroFam = h => (SET.heroFam && Array.isArray(SET.heroFam[h]) && SET.heroFam[h].length ? SET.heroFam[h] : (HEROES[h] && HEROES[h].fam) || []);

/* ---------- les lois des univers : une mécanique signature par univers ---------- */
const MECHS = {
  none:{ n:'Aucune loi', ic:'dice', d:'Pas de règle particulière.' },
  ames:{ n:'Moisson d\'âmes', ic:'skull', d:'Chaque serviteur de l\'univers qui meurt en combat vous rapporte une âme. Au début du tour, chaque tranche de 3 âmes donne +1/+1 à tous vos serviteurs de l\'univers.' },
  serment:{ n:'Serment des anciens', ic:'crown', d:'Quand vous obtenez un serviteur doré de l\'univers, vos autres serviteurs de l\'univers gagnent +2/+2.' },
  marche:{ n:'Marché noir', ic:'gear', d:'Vendre un serviteur de l\'univers rapporte 1 or de plus (deux fois par tour).' },
  ruee:{ n:'Ruée sauvage', ic:'leaf', d:'Au début du combat, si vous avez au moins 3 serviteurs de l\'univers, ils gagnent +2/+0 pour ce combat.' },
  pillage:{ n:'Pillage', ic:'drop', d:'Quand vous gagnez un combat avec un serviteur de l\'univers encore debout, vous recevez un sort aléatoire de votre niveau.' },
  chakra:{ n:'Chakra et cycle des éléments', ic:'k_spark', d:'Chaque serviteur de l\'univers génère 1 chakra au début de votre tour (10 au plus). Les techniques s\'achètent en or et se lancent au chakra (1 de moins dans l\'élément de votre héros) ; le pouvoir du héros se paie en chakra. Deux techniques remplissent le réservoir : leur mélange déclenche un combo (effet sur le plateau et pouvoir hybride au compagnon). Le compagnon, déjà triplé et hors plateau, affronte seulement le compagnon adverse et ne blesse jamais le héros : ce duel décide du coffre (majeur s\'il gagne). Chaque coffre impose de choisir 1 récompense sur 3 (Normal à Légendaire), rangée dans l\'entraînement et posée au chakra. En duel, le compagnon résonne avec les marqueurs de son élément (+1/+1 par tranche de 3). Après l\'Éveil, compagnon et bête combattent en duo lié dans la bataille.' },
  resonance:{ n:'Résonance', ic:'twin', d:'Chaque sort que vous lancez donne +1/+1 à deux de vos serviteurs de l\'univers.' },
  eboulement:{ n:'Éboulement', ic:'up', d:'Quand un de vos serviteurs de l\'univers avec Provocation meurt, il inflige 3 dégâts à un ennemi aléatoire.' },
  fusion:{ n:'Fusion élémentaire', ic:'wind', d:'À la fin du tour, si vous avez au moins 4 éléments Squishy différents, vos serviteurs de l\'univers gagnent +1/+1.' },
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
const addF = (m, k) => { if (!has(m, k)) { m.f = (m.f || '') + k; if (BSRC) { const L = m.bn || (m.bn = []); let e = L.find(x => x.s === BSRC); if (!e) { e = { s:BSRC, a:0, h:0, n:1 }; L.push(e); } if (!(e.k || '').includes(k)) e.k = (e.k || '') + k; } } };
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
const tribePl = id => { const n = trName(id) || id; if (/^Clan /.test(n)) return 'membres du ' + n; return /[sxz]$/i.test(n) ? n : n + 's'; };
const tribeOk = (m, tb) => !tb || tribe(m) === tb;

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
  POOL_IDS = Object.keys(C).filter(id => C[id].t > 0 && !C[id].off && !C[id].comp && (C[id].tr === 'neu' || TRIBES[C[id].tr].on !== false));
  CAT_REV = hashStr(JSON.stringify([SET, CARDS]));
  if (typeof rebuildArt === 'function') rebuildArt();
}
function mk(id, g) { const b = CD(id); return { c:id, a:b.a * (g ? 2 : 1), h:b.h * (g ? 2 : 1), g:g ? 1 : 0, f:b.f, u:UID++ }; }
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
const TRIG = { combo:'Combo', bc:'Cri de guerre', dr:'Râle d\'agonie', soc:'Début du combat', eot:'Fin de tour', play:'Après avoir joué', die:'Quand un allié meurt', surv:'Quand il survit', atk:'Après avoir attaqué', sell:'Quand vous le vendez', aura:'Aura', roll:'Quand vous actualisez', shield:'Quand un allié perd son Bouclier', pow:'Quand vous utilisez le pouvoir', sot:'Début de tour', up:'Quand vous améliorez', cast:'Quand vous lancez un sort' };
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
const one = (tb, s, p) => tb ? (s ? trName(tb) : tribePl(tb)) : (s ? 'serviteur' : 'serviteurs');
const ET = {
  bc_buff_tribe:{ tr:'bc', l:'Bonus à vos autres serviteurs', ps:['a', 'h', 'tb'], w:0.7, mag:e => (e.a + e.h) * AL(), txt:(e, k) => `Cri de guerre : donne ${sign(e.a * k, e.h * k)} à vos autres ${one(e.tb)}.` },
  bc_buff_rand:{ tr:'bc', l:'Bonus à un allié aléatoire', ps:['a', 'h', 'tb'], w:1, mag:e => e.a + e.h, txt:(e, k) => `Cri de guerre : donne ${sign(e.a * k, e.h * k)} à un autre ${one(e.tb, 1)} aléatoire.` },
  bc_summon:{ tr:'bc', l:'Invoquer un serviteur', ps:['card', 'n'], w:1, mag:(e, d) => cardValueById(e.card, d) * e.n, txt:e => `Cri de guerre : invoque ${e.n > 1 ? e.n + ' × ' : ''}${CD(e.card).n}.` },
  bc_chakra:{ tr:'bc', l:'Gagner du chakra', ps:['n'], w:1.2, mag:e => e.n, txt:(e, k) => `Cri de guerre : gagnez ${e.n * k} chakra.` },
  eot_chakra:{ tr:'eot', l:'Gagner du chakra', ps:['n'], w:1.4, mag:e => e.n * 2, txt:(e, k) => `Fin de tour : gagnez ${e.n * k} chakra.` },
  cast_braise:{ tr:'cast', l:'Attiser les braises', ps:['n'], w:1.2, mag:e => e.n * 2, txt:(e, k) => `Quand vous lancez un sort, gagnez ${e.n * k} braise${e.n * k > 1 ? 's' : ''}.` },
  eot_ck_braise:{ tr:'eot', l:'Brûler du chakra en braises', ps:['n'], w:1.3, mag:e => e.n * 2, txt:(e, k) => `Fin de tour : si vous avez ${e.n} chakra, le brûle pour gagner ${(e.n + 1) * k} braises.` },
  bc_upd:{ tr:'bc', l:'Réduire le coût d\'amélioration', ps:['n'], w:1.4, mag:e => e.n * 2, txt:(e, k) => `Cri de guerre : améliorer la taverne coûte ${e.n * k} or de moins.` },
  eot_inc:{ tr:'eot', l:'Or au prochain tour', ps:['n'], w:1.5, mag:e => e.n * 3, txt:(e, k) => `Fin de tour : gagnez ${e.n * k} or au début du prochain tour.` },
  eot_maree:{ tr:'eot', l:'Faire monter la marée', ps:['n'], w:1.2, mag:e => e.n * 2, txt:(e, k) => `Fin de tour : la marée monte de ${e.n * k}.` },
  eot_wave:{ tr:'eot', l:'Vague : bonus au voisin de droite', ps:['a', 'h'], w:1.1, mag:e => e.a + e.h, txt:(e, k) => `Fin de tour : donne ${sign(e.a * k, e.h * k)} au serviteur à sa droite ; la vague se transmet.` },
  pas_ckx:{ tr:'pas', l:'Grande réserve de chakra', ps:['n'], w:1.2, mag:e => e.n * 2, txt:e => `Grande réserve : votre chakra peut monter jusqu\'à ${CK_MAX + e.n} tant qu\'il est sur le plateau.` },
  eot_charge:{ tr:'eot', l:'Accumuler de la charge', ps:['n'], w:1.2, mag:e => e.n * 2, txt:(e, k) => `Fin de tour : gagnez ${e.n * k} charge.` },
  awk_surge:{ tr:'awk', l:'Surtension (7 chakra ou plus)', ps:['a', 'h'], w:1.3, mag:e => e.a + e.h, txt:(e, k) => `Surtension : au combat, gagne ${sign(e.a * k, e.h * k)} si vous avez 7 chakra ou plus.` },
  eot_souffle:{ tr:'eot', l:'Faire souffler le vent', ps:['n'], w:1.2, mag:e => e.n * 2, txt:(e, k) => `Fin de tour : gagnez ${e.n * k} souffle.` },
  eot_roche:{ tr:'eot', l:'Amasser la roche', ps:['n'], w:1.2, mag:e => e.n * 2, txt:(e, k) => `Fin de tour : gagnez ${e.n * k} roche.` },
  eot_anchor:{ tr:'eot', l:'Ancrage : le chakra restant renforce', ps:[], w:1.2, mag:() => 4, txt:(e, k) => `Ancrage : fin de tour, gagne +0/+1 par chakra non dépensé (${3 * k} au plus).` },
  awk_phoenix:{ tr:'awk', l:'Phénix renforcé', ps:[], w:1.5, mag:() => 6, txt:() => 'Après l\'Éveil : le Phénix de vos serviteurs Katon est doublé.' },
  awk_hurricane:{ tr:'awk', l:'Ouragan', ps:['d'], w:1.5, mag:e => e.d * 5, txt:e => `Après l\'Éveil : après avoir attaqué, inflige ${e.d} dégât${e.d > 1 ? 's' : ''} à 3 ennemis de plus.` },
  awk_tsunami:{ tr:'awk', l:'Raz-de-marée renforcé', ps:[], w:1.5, mag:() => 6, txt:() => 'Après l\'Éveil : le raz-de-marée est doublé.' },
  awk_storm:{ tr:'awk', l:'Orage total renforcé', ps:[], w:1.5, mag:() => 6, txt:() => 'Après l\'Éveil : l\'orage total est doublé.' },
  awk_quake:{ tr:'awk', l:'Séisme', ps:[], w:1.5, mag:() => 6, txt:() => 'Après l\'Éveil : au début du combat, inflige un sixième de sa vie à tous les ennemis.' },
  soc_steal:{ tr:'soc', l:'Voler du chakra', ps:['n'], w:1.4, mag:e => e.n * 2, txt:(e, k) => `Début du combat : vole ${e.n * k} chakra à l\'adversaire.` },
  dr_steal:{ tr:'dr', l:'Voler du chakra en mourant', ps:['n'], w:1.2, mag:e => e.n * 2, txt:(e, k) => `Râle d\'agonie : vole ${e.n * k} chakra à l\'adversaire.` },
  soc_ck:{ tr:'soc', l:'Se renforcer selon le chakra', ps:['a', 'h'], w:1.6, mag:e => (e.a + e.h) * 3, txt:(e, k) => `Début du combat : gagne ${sign(e.a * k, e.h * k)} pour chaque chakra que vous avez (5 au plus).` },
  eot_ck_spend:{ tr:'eot', l:'Dépenser du chakra pour se renforcer', ps:['n', 'a', 'h'], w:1.3, mag:e => e.a + e.h, txt:(e, k) => `Fin de tour : si vous avez ${e.n} chakra, les dépense pour gagner ${sign(e.a * k, e.h * k)}.` },
  cast_ck:{ tr:'cast', l:'Gagner du chakra en lançant un sort', ps:['n'], w:1.2, mag:e => e.n * 2, txt:(e, k) => `Quand vous lancez un sort, gagnez ${e.n * k} chakra.` },
  cast_memo:{ tr:'cast', l:'Retenir la technique lancée', ps:[], w:1, mag:() => 3, txt:() => 'Mémoire : retient la dernière technique ninja que vous lancez.' },
  sot_memo:{ tr:'sot', l:'Rejouer la technique retenue', ps:[], w:1, mag:() => 3, txt:(e, k) => `Début de tour : ajoute à votre main ${k > 1 ? k + ' copies' : 'une copie'} de la technique retenue.` },
  bc_gold:{ tr:'bc', l:'Gagner de l\'or', ps:['n'], w:1.5, mag:e => e.n, txt:(e, k) => `Cri de guerre : gagnez ${e.n * k} or.` },
  bc_card:{ tr:'bc', l:'Ajouter un serviteur à la main', ps:['n', 'tb'], w:1, mag:e => e.n * 3, txt:e => `Cri de guerre : ajoute ${e.n > 1 ? e.n + ' ' + one(e.tb) + ' aléatoires' : 'un ' + one(e.tb, 1) + ' aléatoire'} à votre main.` },
  dr_summon:{ tr:'dr', l:'Invoquer un serviteur', ps:['card', 'n'], w:0.8, mag:(e, d) => cardValueById(e.card, d) * e.n, txt:e => `Râle d'agonie : invoque ${e.n > 1 ? e.n + ' × ' : ''}${CD(e.card).n}.` },
  dr_summon_rand:{ tr:'dr', l:'Invoquer des serviteurs aléatoires', ps:['n', 'tb', 'tier'], w:0.5, mag:e => e.n * tierMid(e.tier), txt:e => `Râle d'agonie : invoque ${e.n > 1 ? e.n + ' ' + one(e.tb) + ' aléatoires' : 'un ' + one(e.tb, 1) + ' aléatoire'} de niveau ${e.tier} ou moins.` },
  dr_buff_rand:{ tr:'dr', l:'Bonus à un allié aléatoire', ps:['a', 'h', 'tb'], w:0.8, mag:e => e.a + e.h, txt:(e, k) => `Râle d'agonie : donne ${sign(e.a * k, e.h * k)} à un ${one(e.tb, 1)} allié aléatoire.` },
  dr_buff_all:{ tr:'dr', l:'Bonus à tous vos serviteurs', ps:['a', 'h', 'tb'], w:0.8, mag:e => (e.a + e.h) * AL(), txt:(e, k) => `Râle d'agonie : donne ${sign(e.a * k, e.h * k)} à vos autres ${one(e.tb)}.` },
  dr_dmg:{ tr:'dr', l:'Dégâts à des ennemis aléatoires', ps:['d', 'n'], w:0.8, mag:e => e.d * e.n, txt:(e, k) => `Râle d'agonie : inflige ${e.d * k} dégâts à ${e.n > 1 ? e.n + ' ennemis aléatoires' : 'un ennemi aléatoire'}.` },
  dr_kw:{ tr:'dr', l:'Donner un mot-clé aux alliés', ps:['kw', 'tb'], w:0.8, mag:e => kwCost(e.kw) * AL(), txt:e => `Râle d'agonie : donne ${(SET.kw[e.kw] || {}).n || '?'} à vos ${one(e.tb)}.` },
  soc_dmg:{ tr:'soc', l:'Dégâts à des ennemis aléatoires', ps:['d', 'n'], w:1, mag:e => e.d * e.n, txt:(e, k) => `Début du combat : inflige ${e.d * k} dégâts à ${e.n > 1 ? e.n + ' ennemis aléatoires' : 'un ennemi aléatoire'}.` },
  soc_buff:{ tr:'soc', l:'Bonus à vos autres serviteurs', ps:['a', 'h', 'tb'], w:1, mag:e => (e.a + e.h) * AL(), txt:(e, k) => `Début du combat : donne ${sign(e.a * k, e.h * k)} à vos autres ${one(e.tb)}.` },
  soc_kw:{ tr:'soc', l:'Donner un mot-clé aux alliés', ps:['kw', 'tb'], w:1, mag:e => kwCost(e.kw) * AL(), txt:e => `Début du combat : donne ${(SET.kw[e.kw] || {}).n || '?'} à vos autres ${one(e.tb)}.` },
  eot_self:{ tr:'eot', l:'Se renforcer', ps:['a', 'h'], w:1.5, mag:e => e.a + e.h, txt:(e, k) => `Fin de tour : gagne ${sign(e.a * k, e.h * k)}.` },
  eot_buff_rand:{ tr:'eot', l:'Bonus à des alliés aléatoires', ps:['a', 'h', 'n', 'tb'], w:1.5, mag:e => (e.a + e.h) * e.n, txt:(e, k) => `Fin de tour : donne ${sign(e.a * k, e.h * k)} à ${e.n > 1 ? e.n + ' autres ' + one(e.tb) + ' aléatoires' : 'un autre ' + one(e.tb, 1) + ' aléatoire'}.` },
  eot_buff_all:{ tr:'eot', l:'Bonus à tous vos serviteurs', ps:['a', 'h', 'tb'], w:1.2, mag:e => (e.a + e.h) * AL(), txt:(e, k) => `Fin de tour : donne ${sign(e.a * k, e.h * k)} à tous vos autres ${one(e.tb)}.` },
  play_self:{ tr:'play', l:'Se renforcer quand vous jouez…', ps:['tb', 'a', 'h'], w:1.5, mag:e => e.a + e.h, txt:(e, k) => `Après que vous avez joué un ${one(e.tb, 1)}, gagne ${sign(e.a * k, e.h * k)}.` },
  play_other:{ tr:'play', l:'Renforcer le serviteur joué', ps:['tb', 'a', 'h'], w:1.5, mag:e => e.a + e.h, txt:(e, k) => `Après que vous avez joué un ${one(e.tb, 1)}, donnez-lui ${sign(e.a * k, e.h * k)}.` },
  die_self:{ tr:'die', l:'Se renforcer quand un allié meurt', ps:['tb', 'a', 'h'], w:1.2, mag:e => e.a + e.h, txt:(e, k) => `Quand un autre ${one(e.tb, 1)} allié meurt, gagne ${sign(e.a * k, e.h * k)}.` },
  die_others:{ tr:'die', l:'Renforcer les alliés quand un allié meurt', ps:['tb', 'a', 'h'], w:0.8, mag:e => (e.a + e.h) * AL(), txt:(e, k) => `Quand un ${one(e.tb, 1)} allié meurt, donne ${sign(e.a * k, e.h * k)} à vos autres ${one(e.tb)}.` },
  surv_self:{ tr:'surv', l:'Se renforcer après des dégâts', ps:['a', 'h'], w:1.2, mag:e => e.a + e.h, txt:(e, k) => `Quand il survit à des dégâts, gagne ${sign(e.a * k, e.h * k)}.` },
  atk_self:{ tr:'atk', l:'Se renforcer après avoir attaqué', ps:['a', 'h'], w:1.2, mag:e => e.a + e.h, txt:(e, k) => `Après avoir attaqué, gagne ${sign(e.a * k, e.h * k)}.` },
  atk_buff_rand:{ tr:'atk', l:'Bonus à un autre allié', ps:['a', 'h'], w:1.2, mag:e => e.a + e.h, txt:(e, k) => `Après avoir attaqué, donne ${sign(e.a * k, e.h * k)} à un autre allié aléatoire.` },
  soc_self:{ tr:'soc', l:'Se transformer', ps:['a', 'h'], w:0.9, mag:e => e.a + e.h, txt:(e, k) => `Début du combat : gagne ${sign(e.a * k, e.h * k)}.` },
  soc_aoe:{ tr:'soc', l:'Dégâts à tous les ennemis', ps:['d'], w:1, mag:e => e.d * 4, txt:(e, k) => `Début du combat : inflige ${e.d * k} dégât${e.d * k > 1 ? 's' : ''} à tous les ennemis.` },
  eot_buff_taunt:{ tr:'eot', l:'Bonus aux serviteurs avec Provocation', ps:['a', 'h'], w:1.1, mag:e => (e.a + e.h) * 2, txt:(e, k) => `Fin de tour : vos serviteurs avec Provocation gagnent ${sign(e.a * k, e.h * k)}.` },
  eot_buff_big:{ tr:'eot', l:'Bonus au serviteur le plus fort', ps:['a', 'h'], w:1.5, mag:e => e.a + e.h, txt:(e, k) => `Fin de tour : donne ${sign(e.a * k, e.h * k)} à votre serviteur qui a le plus d'attaque.` },
  roll_buff_tribe:{ tr:'roll', l:'Bonus à vos serviteurs', ps:['a', 'h', 'tb'], w:0.8, mag:e => (e.a + e.h) * AL(), txt:(e, k) => `Quand vous actualisez la taverne, donne ${sign(e.a * k, e.h * k)} à vos autres ${one(e.tb)}.` },
  bc_spell:{ tr:'bc', l:'Ajouter un sort à la main', ps:['n'], w:1, mag:e => e.n * 3, txt:(e, k) => `Cri de guerre : ajoute ${e.n * k > 1 ? e.n * k + ' sorts aléatoires' : 'un sort aléatoire'} à votre main.` },
  eot_braise_self:{ tr:'eot', l:'Attiser sa lame', ps:['n'], w:1, mag:e => e.n * 2, txt:(e, k) => `Fin de tour : gagne +1 attaque par paire de braises (+${e.n * k} au plus).` },
  eot_maree_self:{ tr:'eot', l:'Boire la marée', ps:['n'], w:1, mag:e => e.n * 2, txt:(e, k) => `Fin de tour : gagne +1/+1 par tranche de 3 marée (+${e.n * k}/+${e.n * k} au plus).` },
  combo_self:{ tr:'combo', l:'Se renforcer à chaque combo', ps:['a', 'h'], w:1.5, mag:e => e.a + e.h, txt:(e, k) => `Quand vous déclenchez un combo, gagne ${sign(e.a * k, e.h * k)}.` },
  combo_gold:{ tr:'combo', l:'Or à chaque combo', ps:['n'], w:1.5, mag:e => e.n * 3, txt:(e, k) => `Quand vous déclenchez un combo, gagnez ${e.n * k} or.` },
  combo_ck:{ tr:'combo', l:'Chakra à chaque combo', ps:['n'], w:1.2, mag:e => e.n * 2, txt:(e, k) => `Quand vous déclenchez un combo, récupérez ${e.n * k} chakra.` },
  combo_tribe:{ tr:'combo', l:'Bonus au clan à chaque combo', ps:['a', 'h', 'tb'], w:0.8, mag:e => (e.a + e.h) * AL(), txt:(e, k) => `Quand vous déclenchez un combo, donne ${sign(e.a * k, e.h * k)} à vos autres ${one(e.tb)}.` },
  rsv_bc:{ tr:'bc', l:'Remplir le réservoir', ps:[], w:1, mag:() => 3, txt:() => 'Cri de guerre : remplit une moitié de votre réservoir de l\'élément de son clan.' },
  cast_self:{ tr:'cast', l:'Se renforcer', ps:['a', 'h'], w:1.5, mag:e => e.a + e.h, txt:(e, k) => `Quand vous lancez un sort, gagne ${sign(e.a * k, e.h * k)}.` },
  cast_buff_rand:{ tr:'cast', l:'Bonus à un autre allié', ps:['a', 'h'], w:1.5, mag:e => e.a + e.h, txt:(e, k) => `Quand vous lancez un sort, donne ${sign(e.a * k, e.h * k)} à un autre allié aléatoire.` },
  cast_buff_tribe:{ tr:'cast', l:'Bonus à vos serviteurs', ps:['a', 'h', 'tb'], w:0.8, mag:e => (e.a + e.h) * AL(), txt:(e, k) => `Quand vous lancez un sort, donne ${sign(e.a * k, e.h * k)} à vos autres ${one(e.tb)}.` },
  eot_combo:{ tr:'eot', l:'Combo : se renforcer si…', ps:['tb2', 'a', 'h'], w:1, mag:e => e.a + e.h, txt:(e, k) => `Fin de tour : si vous avez un ${one(e.tb2, 1)}, gagne ${sign(e.a * k, e.h * k)}.` },
  bc_combo:{ tr:'bc', l:'Combo : bonus à tous si…', ps:['tb2', 'a', 'h'], w:0.6, mag:e => (e.a + e.h) * AL(), txt:(e, k) => `Cri de guerre : si vous avez un ${one(e.tb2, 1)}, donne ${sign(e.a * k, e.h * k)} à vos autres serviteurs.` },
  soc_combo_dmg:{ tr:'soc', l:'Combo : dégâts si…', ps:['tb2', 'd', 'n'], w:0.7, mag:e => e.d * e.n, txt:(e, k) => `Début du combat : si vous avez un ${one(e.tb2, 1)}, inflige ${e.d * k} dégâts à ${e.n > 1 ? e.n + ' ennemis aléatoires' : 'un ennemi aléatoire'}.` },
  soc_chill:{ tr:'soc', l:'Gel : baisser l\'attaque d\'ennemis', ps:['a', 'n'], w:0.8, mag:e => e.a * Math.min(e.n, 4) * 1.2, txt:(e, k) => `Début du combat : ${e.n >= 7 ? 'tous les ennemis perdent' : e.n > 1 ? e.n + ' ennemis aléatoires perdent' : 'un ennemi aléatoire perd'} ${e.a * k} attaque.` },
  soc_combo_chill:{ tr:'soc', l:'Combo : gel si…', ps:['tb2', 'a', 'n'], w:0.6, mag:e => e.a * Math.min(e.n, 4) * 1.2, txt:(e, k) => `Début du combat : si vous avez un ${one(e.tb2, 1)}, ${e.n > 1 ? e.n + ' ennemis aléatoires perdent' : 'un ennemi aléatoire perd'} ${e.a * k} attaque.` },
  soc_chill_el:{ tr:'soc', l:'Gel par élément', ps:['a'], w:0.8, mag:e => e.a * 2.5 * 4, txt:(e, k) => `Début du combat : tous les ennemis perdent ${e.a * k} attaque par élément Squishy différent sur votre plateau.` },
  atk_zap:{ tr:'atk', l:'Zap : dégâts après avoir attaqué', ps:['d', 'n'], w:1.1, mag:e => e.d * e.n * 2, txt:(e, k) => `Après avoir attaqué, inflige ${e.d * k} dégât${e.d * k > 1 ? 's' : ''} à ${e.n > 1 ? e.n + ' ennemis aléatoires' : 'un ennemi aléatoire'}.` },
  atk_zap_el:{ tr:'atk', l:'Zap par élément', ps:['d'], w:1.1, mag:e => e.d * 2.5 * 2, txt:(e, k) => `Après avoir attaqué, inflige ${e.d * k} dégât${e.d * k > 1 ? 's' : ''} à un ennemi aléatoire par élément Squishy différent sur votre plateau.` },
  eot_elements:{ tr:'eot', l:'Se renforcer par élément', ps:['a', 'h'], w:1.2, mag:e => (e.a + e.h) * 2.5, txt:(e, k) => `Fin de tour : gagne ${sign(e.a * k, e.h * k)} par élément différent parmi vos Squishys.` },
  soc_elements:{ tr:'soc', l:'Bonus aux Squishys par élément', ps:['a', 'h'], w:0.6, mag:e => (e.a + e.h) * 2.5 * AL(), txt:(e, k) => `Début du combat : vos autres Squishys gagnent ${sign(e.a * k, e.h * k)} par élément différent.` },
  soc_self_el:{ tr:'soc', l:'Se renforcer par élément', ps:['a', 'h'], w:0.9, mag:e => (e.a + e.h) * 2.5, txt:(e, k) => `Début du combat : gagne ${sign(e.a * k, e.h * k)} par élément différent parmi vos Squishys.` },
  roll_self:{ tr:'roll', l:'Se renforcer', ps:['a', 'h'], w:1.5, mag:e => e.a + e.h, txt:(e, k) => `Quand vous actualisez la taverne, gagne ${sign(e.a * k, e.h * k)}.` },
  shield_buff:{ tr:'shield', l:'Renforcer l\'allié qui le perd', ps:['a'], w:1.2, mag:e => e.a * 2, txt:(e, k) => `Quand un de vos serviteurs perd son Bouclier divin, il gagne +${e.a * k} attaque.` },
  pow_buff_rand:{ tr:'pow', l:'Bonus à un allié aléatoire', ps:['a', 'h'], w:1.5, mag:e => e.a + e.h, txt:(e, k) => `Quand vous utilisez votre pouvoir héroïque, donne ${sign(e.a * k, e.h * k)} à un autre serviteur aléatoire.` },
  pow_spell:{ tr:'pow', l:'Ajouter un sort à la main', ps:['n'], w:1.2, mag:e => e.n * 3, txt:(e, k) => `Quand vous utilisez votre pouvoir héroïque, ajoute ${e.n * k > 1 ? e.n * k + ' sorts aléatoires' : 'un sort aléatoire'} à votre main.` },
  sot_gold:{ tr:'sot', l:'Gagner de l\'or', ps:['n'], w:2, mag:e => e.n, txt:(e, k) => `Début de tour : gagnez ${e.n * k} or.` },
  eot_buff_left:{ tr:'eot', l:'Bonus au serviteur le plus à gauche', ps:['a', 'h'], w:1.5, mag:e => e.a + e.h, txt:(e, k) => `Fin de tour : donne ${sign(e.a * k, e.h * k)} à votre serviteur le plus à gauche.` },
  eot_blood:{ tr:'eot', l:'Payer des PV pour se renforcer', ps:['a', 'h', 'd'], w:1.2, mag:e => Math.max(0, e.a + e.h - e.d), txt:(e, k) => `Fin de tour : votre héros perd ${e.d} PV et ce serviteur gagne ${sign(e.a * k, e.h * k)}.` },
  up_buff_all:{ tr:'up', l:'Bonus à tous vos serviteurs', ps:['a', 'h', 'tb'], w:0.8, mag:e => (e.a + e.h) * AL(), txt:(e, k) => `Quand vous améliorez la taverne, donne ${sign(e.a * k, e.h * k)} à tous vos ${one(e.tb)}.` },
  eot_fireball:{ tr:'eot', l:'Renforcer la boule de feu du héros', ps:['n'], w:1, mag:e => e.n * 2, txt:(e, k) => `Fin de tour : la boule de feu de votre héros gagne +${e.n * k} dégât${e.n * k > 1 ? 's' : ''}.` },
  aura_bc:{ tr:'aura', l:'Doubler les Cris de guerre', ps:[], w:10, mag:() => 1, txt:(e, k) => `Vos Cris de guerre se déclenchent ${k > 1 ? 'trois' : 'deux'} fois.` },
  aura_dr:{ tr:'aura', l:'Doubler les Râles d\'agonie', ps:[], w:10, mag:() => 1, txt:(e, k) => `Vos Râles d'agonie se déclenchent ${k > 1 ? 'trois' : 'deux'} fois.` },
  aura_eot:{ tr:'aura', l:'Doubler les effets de Fin de tour', ps:[], w:10, mag:() => 1, txt:(e, k) => `Vos effets de Fin de tour se déclenchent ${k > 1 ? 'trois' : 'deux'} fois.` },
  aura_soc:{ tr:'aura', l:'Doubler les effets de Début du combat', ps:[], w:8, mag:() => 1, txt:(e, k) => `Vos effets de Début du combat se déclenchent ${k > 1 ? 'trois' : 'deux'} fois.` },
  sell_gold:{ tr:'sell', l:'Rapporter de l\'or à la vente', ps:['n'], w:1.5, mag:e => e.n, txt:(e, k) => `Quand vous le vendez, gagnez ${e.n * k} or de plus.` },
};
const fxW = k => { const o = SET.fxw[k] || {}; return { b:o.b != null ? +o.b : 0, w:o.w != null ? +o.w : ET[k].w }; };
function newEffect(k) { const e = { k }; ET[k].ps.forEach(p => { const P = PARAMS[p]; e[p] = P.sel === 'tribe' ? '' : P.sel === 'card' ? (Object.keys(CARDS).find(id => CARDS[id].t === 0) || Object.keys(CARDS)[0] || '') : P.sel === 'kw' ? 's' : P.def; }); return e; }
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
function cardTextH(id, g) {
  const c = CD(id), k = g ? 2 : 1, parts = [];
  const kws = (c.kw || []).map(x => `<b>${esc(SET.kw[x].n)}</b>`);
  if (kws.length) parts.push(kws.join(', ') + '.');
  (c.fx || []).forEach(e => { if (ET[e.k]) { const t = esc(fxText(e, k)); const i = t.indexOf(' : '); parts.push(i > 0 && i < 24 ? `<b>${t.slice(0, i)}</b>${t.slice(i)}` : t); } });
  return parts.join(' ');
}

/* =====================================================================
   EFFETS EN RECRUTEMENT (côté hôte, Math.random)
   ===================================================================== */
function recruitSummon(p, id, g, after) {
  if (p.bd.length >= 7 || !C[id]) return;
  const i = p.bd.indexOf(after);
  p.bd.splice(i < 0 ? p.bd.length : i + 1, 0, mk(id, g));
}
function runRecruit(G, p, m, e, ctx) { return withSrc(e && e.src ? e.src : m && m.c && C[m.c] ? CD(m.c).n : BSRC, () => runRecruit0(G, p, m, e, ctx)); }
function runRecruit0(G, p, m, e, ctx) {
  const k = mult(m), A = (e.a || 0) * k, Hh = (e.h || 0) * k;
  const others = () => p.bd.filter(x => x !== m && tribeOk(x, e.tb));
  switch (e.k) {
    case 'bc_buff_tribe': case 'eot_buff_all': others().forEach(x => buff(x, A, Hh)); break;
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
  }
}
const fxOf = (m, tr) => { const b = CD(m.c).by[tr] || []; return m.x && m.x.length ? b.concat(m.x.filter(e => ET[e.k] && ET[e.k].tr === tr)) : b; };
// nombre de déclenchements : 1, ou 2 avec une aura (3 si l'aura est dorée) ; les auras ne se cumulent pas
function auraTimes(list, k) { let t = 1; for (const m of list) if (m.h > 0 && fxOf(m, 'aura').some(e => e.k === k)) t = Math.max(t, 1 + mult(m)); return t; }

/* =====================================================================
   COMBAT — entièrement déterministe à partir d'une graine : l'hôte et
   chaque joueur rejouent exactement le même combat.
   ===================================================================== */
function simSummon(S, s, pos, id, g) {
  const arr = S.sides[s]; if (arr.length >= 7 || !C[id]) return null;
  const b = C[id]; const m = { c:id, a:b.a * (g ? 2 : 1), h:b.h * (g ? 2 : 1), g:g ? 1 : 0, f:b.f, u:S.uid++ };
  arr.splice(Math.min(pos, arr.length), 0, m); return m;
}
const sideOf = (S, m) => S.sides[0].includes(m) ? 0 : 1;
function runCombat(S, s, m, e, pos, ctx) {
  const k = mult(m), A = (e.a || 0) * k, Hh = (e.h || 0) * k, al = S.sides[s], en = S.sides[1 - s];
  const R = n => Math.floor(S.rng() * n);
  switch (e.k) {
    case 'dr_summon': for (let i = 0; i < e.n; i++) simSummon(S, s, pos, e.card, m.g); break;
    case 'dr_summon_rand': { const ids = POOL_IDS.filter(id => C[id].t <= e.tier && (!e.tb || C[id].tr === e.tb)); for (let i = 0; i < e.n && ids.length; i++) simSummon(S, s, pos, ids[R(ids.length)], m.g); break; }
    case 'dr_buff_rand': { const o = al.filter(x => x.h > 0 && tribeOk(x, e.tb)); if (o.length) buff(o[R(o.length)], A, Hh); break; }
    case 'dr_buff_all': al.filter(x => x.h > 0 && tribeOk(x, e.tb)).forEach(x => buff(x, A, Hh)); break;
    case 'dr_dmg': case 'soc_dmg': { const o = en.filter(x => x.h > 0); for (let i = 0; i < e.n && o.length; i++) { const j = R(o.length); simDamage(S, o[j], e.d * k, null); o.splice(j, 1); } break; }
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
    case 'soc_aoe': en.filter(x => x.h > 0).forEach(x => simDamage(S, x, e.d * k, null)); break;
    case 'atk_buff_rand': { const o = al.filter(x => x !== m && x.h > 0); if (o.length) buff(o[R(o.length)], A, Hh); break; }
  }
}
function simDamage(S, m, n, src) {
  if (n <= 0 || m.h <= 0) return;
  if (has(m, 's')) { remF(m, 's'); const s = sideOf(S, m); S.sides[s].forEach(al => { if (al.h > 0) fxOf(al, 'shield').forEach(e => runCombat(S, s, al, e, 0, m)); }); return; }
  m.h -= n;
  if (src && has(src, 'v')) m.h = Math.min(m.h, 0);
  if (m.h > 0) { const s = sideOf(S, m); fxOf(m, 'surv').forEach(e => runCombat(S, s, m, e)); }
}
function simDeaths(S) {
  let changed = true, guard = 0;
  while (changed && guard++ < 50) {
    changed = false;
    for (const s of [0, 1]) {
      const arr = S.sides[s];
      let i = arr.findIndex(x => x.h <= 0);
      while (i >= 0) {
        changed = true;
        const d = arr[i]; arr.splice(i, 1); S.dead[s].push(d.c);
        if (S.mx.eboulement && has(d, 't') && S.mx.eboulement.includes(tribe(d))) { const o = S.sides[1 - s].filter(x => x.h > 0); if (o.length) simDamage(S, o[Math.floor(S.rng() * o.length)], 3, null); }
        for (const al of arr.slice()) if (al.h > 0) fxOf(al, 'die').forEach(e => runCombat(S, s, al, e, 0, d));
        const before = arr.length;
        const ndr = auraTimes(arr, 'aura_dr');
        for (let r = 0; r < ndr; r++) fxOf(d, 'dr').forEach(e => runCombat(S, s, d, e, i));
        const added = arr.length - before;
        if (has(d, 'r') && !d.rb && arr.length < 7) {
          const nm = simSummon(S, s, i + Math.max(0, added), d.c, d.g);
          if (nm) { nm.h = 1; remF(nm, 'r'); nm.rb = 1; }
        }
        i = arr.findIndex(x => x.h <= 0);
      }
    }
  }
}
const snap = S => S.sides.map(arr => arr.map(m => ({ c:m.c, a:m.a, h:m.h, g:m.g, f:m.f, u:m.u })));
function simulate(bA, bB, seed, tA, tB, fire, mx) {
  const BS0 = BSRC; BSRC = null;
  try { return simulate0(bA, bB, seed, tA, tB, fire, mx); } finally { BSRC = BS0; }
}
function simulate0(bA, bB, seed, tA, tB, fire, mx) {
  const S = { sides:[clone(bA), clone(bB)], rng:mulberry(seed), uid:1000000, frames:[], mx:mx || {}, dead:[[], []] };
  S.frames.push({ s:snap(S) });
  if (fire) for (const s of [0, 1]) {
    const en = S.sides[1 - s].filter(x => x.h > 0);
    let dmg = fire[s] || 0, hit = [];
    while (dmg > 0) {
      const pool = S.sides[1 - s].filter(x => x.h > 0 && !hit.includes(x)); if (!pool.length) break;
      const t = pool[Math.floor(S.rng() * pool.length)]; hit.push(t);
      const shielded = has(t, 's'), dealt = shielded ? dmg : Math.min(dmg, t.h);
      S.frames.push({ s:snap(S), fb:t.u, fs:s, fd:shielded ? 0 : dealt });
      simDamage(S, t, dealt, null);
      dmg = shielded ? 0 : dmg - dealt;
    }
    simDeaths(S);
  }
  for (const s of [0, 1]) { const nsoc = auraTimes(S.sides[s], 'aura_soc'); for (const m of S.sides[s].slice()) for (let r = 0; r < nsoc; r++) fxOf(m, 'soc').forEach(e => runCombat(S, s, m, e)); }
  if (S.mx.ruee) for (const s of [0, 1]) { const w = S.sides[s].filter(m => m.h > 0 && S.mx.ruee.includes(tribe(m))); if (w.length >= 3) w.forEach(m => buff(m, 2, 0)); }
  simDeaths(S);
  S.frames.push({ s:snap(S) });
  const lA = S.sides[0].length, lB = S.sides[1].length;
  let cur = lA > lB ? 0 : lB > lA ? 1 : (S.rng() < 0.5 ? 0 : 1);
  const ptr = [0, 0]; let guard = 0, stall = 0;
  while (S.sides[0].length && S.sides[1].length && guard++ < 400) {
    const arr = S.sides[cur], en = S.sides[1 - cur];
    let idx = -1;
    for (let k = 0; k < arr.length; k++) { const j = (ptr[cur] + k) % arr.length; if (arr[j].a > 0) { idx = j; break; } }
    if (idx < 0) { if (++stall >= 2) break; cur = 1 - cur; continue; }
    stall = 0;
    const att = arr[idx]; const swings = has(att, 'w') ? 2 : 1; let posBefore = idx;
    for (let w = 0; w < swings; w++) {
      if (att.h <= 0 || !arr.includes(att) || !en.length) break;
      const taunts = en.filter(x => has(x, 't')); const pool = taunts.length ? taunts : en;
      const tgt = pool[Math.floor(S.rng() * pool.length)];
      S.frames.push({ s:snap(S), at:att.u, tg:tgt.u });
      posBefore = arr.indexOf(att);
      const aa = att.a, ta = tgt.a;
      simDamage(S, tgt, aa, att); if (!(S.mx.first && tgt.h <= 0)) simDamage(S, att, ta, tgt);   // duel : la cible abattue ne riposte pas
      if (att.h > 0) fxOf(att, 'atk').forEach(e => runCombat(S, cur, att, e));
      simDeaths(S);
      // duo lié (Éveil) : le partenaire du compagnon frappe aussitôt la même cible
      if (att.duo && tgt.h > 0 && en.includes(tgt)) { const pt = arr.find(x => x !== att && x.duo && x.h > 0 && x.a > 0); if (pt) { S.frames.push({ s:snap(S), at:pt.u, tg:tgt.u }); const pa = pt.a, tb = tgt.a; simDamage(S, tgt, pa, pt); simDamage(S, pt, tb, tgt); simDeaths(S); } }
    }
    ptr[cur] = arr.includes(att) ? arr.indexOf(att) + 1 : Math.min(posBefore, arr.length);
    if (ptr[cur] >= arr.length) ptr[cur] = 0;
    cur = 1 - cur;
  }
  S.frames.push({ s:snap(S) });
  const a = S.sides[0].length, b = S.sides[1].length;
  const w = a && !b ? 0 : b && !a ? 1 : -1;
  let dmg = 0;
  if (w === 0) dmg = tA + S.sides[0].reduce((t, m) => t + tierOf(m), 0);
  if (w === 1) dmg = tB + S.sides[1].reduce((t, m) => t + tierOf(m), 0);
  return { w, dmg, frames:S.frames, dead:S.dead, alive:S.sides.map(a => a.map(m => m.c)) };
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
const upCost = p => p.t >= 6 ? 0 : Math.max(0, p.uc - (p.hero === 'ilka' ? 1 : 0));

const UNIV_FAMS = 5;   // chaque univers compte 5 familles ; on n'en joue qu'un par partie
function univChosen(sel) {
  const on = SET.tribes.filter(t => t.on !== false).map(t => t.id);
  const first = (sel || [])[0];
  const us = (SET.univ || []).filter(u => u.n === first && u.tribes.some(t => on.includes(t)));
  const trs = [];
  for (const u of us) for (const t of u.tribes) if (on.includes(t) && !trs.includes(t)) trs.push(t);
  return { us:us.map(u => u.n), trs };
}
const HERO_OFFER = 5, HERO_ROLLS = 3;
// relance d'un héros proposé : d'abord un héros de l'univers que personne ne s'est vu proposer, sinon un autre de l'univers
function heroReroll(G, p) {
  const ok = h => heroFam(h).some(t => G.trs.includes(t));
  const seen = new Set(); G.ps.forEach(q => { if (q.hero) seen.add(q.hero); if (!q.hero || q === p) (q.ho || []).forEach(h => seen.add(h)); });
  return pickR(Object.keys(HEROES).filter(h => ok(h) && !seen.has(h))) || pickR(Object.keys(HEROES).filter(h => !seen.has(h) && !/^nh_/.test(h))) || null;
}
function hostStart(humans, opt) {
  const G = { ph:'hero', rd:0, end:Date.now() + 60000, pool:{}, ps:[] };
  const on = SET.tribes.filter(t => t.on !== false).map(t => t.id);
  const n = +RU().tribesPerGame || 0;
  const ch = univChosen(opt && opt.univ);
  G.univ = [];
  const pool = (SET.univ || []).filter(u => u.tribes.some(t => on.includes(t)));
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
  for (let k = 0; k < HERO_OFFER; k++) for (const p of G.ps) {
    let h = ids.shift();
    if (!h && rest.length) h = rest.shift();
    if (!h) h = pickR(allOk.filter(x => !p.ho.includes(x)));
    if (!h) h = pickR(Object.keys(HEROES).filter(x => !p.ho.includes(x)));
    if (h) p.ho.push(h);
  }
  G.ps.forEach(p => { p.hrr = HERO_ROLLS; });
  G.ps.forEach(p => { if (p.bot) p.hero = pickR(p.ho); });
  H.G = G;
  clearInterval(H.tick); H.tick = setInterval(hostTick, 200);
  broadcast();
}

function drawOne(G, maxT, exactT, tb) {
  const cands = G.ids.filter(id => (exactT ? C[id].t === exactT : C[id].t <= maxT) && G.pool[id] > 0 && (!tb || C[id].tr === tb));
  if (!cands.length) return null;
  let tot = cands.reduce((t, id) => t + G.pool[id], 0), r = Math.random() * tot;
  for (const id of cands) { r -= G.pool[id]; if (r <= 0) { G.pool[id]--; return mk(id, 0); } }
  const id = cands[cands.length - 1]; G.pool[id]--; return mk(id, 0);
}
function toPool(G, m) { if (G.pool[m.c] != null) G.pool[m.c] += m.g ? 3 : 1; }
// taverne gelée : on garde ce qui reste et on complète les places vides (et l'étagère à sorts si elle est vide)
function topUpShop(G, p) { if (!p.sp) p.sp = drawSpell(p.t); for (let k = p.sh.length; k < SLOTS[p.t]; k++) { const m = drawOne(G, p.t); if (m) p.sh.push(m); else break; } }
function fillShop(G, p) { p.sp = drawSpell(p.t); p.sh.forEach(m => toPool(G, m)); p.sh = []; for (let k = 0; k < SLOTS[p.t]; k++) { const m = drawOne(G, p.t); if (m) p.sh.push(m); } }

function checkTriple(G, p) {
  const all = p.hd.concat(p.bd).filter(m => !m.sp && !m.g && !CD(m.c).tok);
  const cnt = {}; all.forEach(m => cnt[m.c] = (cnt[m.c] || 0) + 1);
  for (const id in cnt) if (cnt[id] >= 3) {
    const copies = [];
    for (const zone of [p.hd, p.bd]) for (let i = zone.length - 1; i >= 0 && copies.length < 3; i--) if (zone[i].c === id && !zone[i].g && !zone[i].sp) copies.push(zone.splice(i, 1)[0]);
    const b = CD(id);
    const gm = { c:id, a:b.a * 2 + copies.reduce((t, m) => t + m.a - b.a, 0), h:b.h * 2 + copies.reduce((t, m) => t + m.h - b.h, 0), g:1, f:b.f, u:UID++, tr:1 };
    copies.forEach(m => { for (const k of m.f || '') addF(gm, k); if (m.x) gm.x = (gm.x || []).concat(m.x); (m.bn || []).forEach(e => { const L = gm.bn || (gm.bn = []); const f = L.find(x => x.s === e.s); if (f) { f.a += e.a; f.h += e.h; f.n += e.n; for (const k of e.k || '') if (!(f.k || '').includes(k)) f.k = (f.k || '') + k; } else L.push({ ...e }); }); });
    p.hd.push(gm);
    if (inMech(G, 'serment', gm)) withSrc('Serment des anciens', () => p.bd.concat(p.hd).forEach(x => { if (x !== gm && !x.sp && inMech(G, 'serment', x)) buff(x, 2, 2); }));
    return checkTriple(G, p);
  }
}
const CK_MAX = 10;
const ckMax = p => CK_MAX + ((p && p.bd) || []).reduce((t, m) => t + ((CD(m.c).fxAll || []).filter(e => e.k === 'pas_ckx').reduce((u, e) => u + e.n, 0)) * (m.g ? 2 : 1), 0);
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
const MK_TIER = { feu:[[1, 0], [2, 1], [4, 2, 'r']], vent:[[1, 1], [2, 1], [3, 2, 'w']], eau:[[0, 2], [1, 3], [2, 5, 's']], foudre:[[1, 0], [2, 1], [3, 3, 'v']], terre:[[0, 3], [1, 5], [2, 8, 't']] };
const MK_TIER_TX = { feu:'Clan Katon', vent:'Clan Fûton', eau:'Clan Suiton', foudre:'Clan Raiton', terre:'Clan Doton' };
const MK_KW = { r:'Renaissance', w:'Furie des vents', s:'Bouclier divin', v:'Toxique', t:'Provocation' };
// éclat de résonance (5 marqueurs consommés par un combo)
const MK_BURST = {
  feu:['Prochain combat : 5 dégâts à l\'ennemi', (G, p) => { p.njf = (p.njf || 0) + 5; }],
  vent:['Gagne 2 or', (G, p) => { p.g += 2; }],
  eau:['Tes serviteurs gagnent +1/+2', (G, p) => p.bd.forEach(m => buff(m, 1, 2))],
  foudre:['Récupère 3 chakra', (G, p) => { p.ck = Math.min(ckMax(p), (p.ck || 0) + 3); }],
  terre:['Tes serviteurs gagnent +0/+3', (G, p) => p.bd.forEach(m => buff(m, 0, 3))],
};
function mkSync(p) { p.mkl = p.mkl || {}; p.mkLast = p.mkLast || {}; for (const el in MK) { const v = p[MK[el]] || 0, l = p.mkLast[el] || 0; if (v > l) p.mkl[el] = (p.mkl[el] || 0) + (v - l); p.mkLast[el] = v; } }
const mkAdd = (p, el, n) => { if (!MK[el] || !n) return; p[MK[el]] = (p[MK[el]] || 0) + n; mkSync(p); };
const mkTier = (p, el) => { const t = ((p.mkl || {})[el]) || 0; return MK_STEPS.filter(s => t >= s).length; };
var AWK_JOIN = true;
const awakeNow = () => typeof H !== 'undefined' && awake(H.G);
/* ---------- Éveil (4 joueurs ou moins) : héros, compagnon et techniques s'éveillent ---------- */
// pouvoir éveillé : les valeurs sont doublées (sauf les coûts) et certains pouvoirs gagnent un bonus
const PW_COSTS = { braisebuff:['n'], g2ck:['g'] };
function awkPw(w) {
  if (!w) return w; const o = Object.assign({}, w), keep = PW_COSTS[w.k] || [];
  ['n', 'd', 'a', 'h', 'g', 'n2', 'a2', 'h2', 'm', 'max'].forEach(k => { if (typeof o[k] === 'number' && !keep.includes(k)) o[k] *= 2; });
  return o;
}
const pwOf = p => { const w = HEROES[p.hero] && HEROES[p.hero].pw; return w && typeof H !== 'undefined' && awake(H.G) ? awkPw(w) : w; };
const PW_AWK_TX = { rfill:'remplit la moitié et récupère 2 chakra', techel:'ajoute 2 techniques', rpure:'déclenche le combo pur et gagne 2 or', pdouble:'les deux premiers combos du tour s\'appliquent deux fois', ptechc:'tes techniques coûtent 2 or de moins', rcycle:'gagne 2 or', rdump:'gagne 6 or' };
const heroAwkTx = h => !h || !h.pw ? '' : PW_AWK_TX[h.pw.k] || 'effet doublé';
// forme éveillée du compagnon : pouvoir ultime de son clan (sans doublement des stats)
const COMP_AWK = {
  feu:{ n:'Phénix de flammes', tx:'Renaissance et début du duel : 4 dégâts au compagnon adverse', fn:c => { addF(c, 'r'); (c.x = c.x || []).push({ k:'soc_dmg', d:4, n:1, src:'Phénix de flammes' }); } },
  vent:{ n:'Lame d\'ouragan', tx:'Furie des vents et après avoir attaqué : +2/+0', fn:c => { addF(c, 'w'); (c.x = c.x || []).push({ k:'atk_self', a:2, h:0, src:'Lame d\'ouragan' }); } },
  eau:{ n:'Corps de l\'eau', tx:'+0/+8 et quand il survit à un coup : +3/+3', fn:c => { buff(c, 0, 8); (c.x = c.x || []).push({ k:'surv_self', a:3, h:3, src:'Corps de l\'eau' }); } },
  foudre:{ n:'Chakra de foudre', tx:'+3 attaque et après avoir attaqué : 4 dégâts à l\'ennemi', fn:c => { buff(c, 3, 0); (c.x = c.x || []).push({ k:'atk_zap', d:4, n:1, src:'Chakra de foudre' }); } },
  terre:{ n:'Golem de pierre', tx:'+0/+10 et début du duel : gagne +3/+3', fn:c => { buff(c, 0, 10); (c.x = c.x || []).push({ k:'soc_self', a:3, h:3, src:'Golem de pierre' }); } },
};
function awakenComp(c) { if (!c || c.awk) return; const el = CLAN_EL[CD(c.c).tr], A = COMP_AWK[el]; c.awk = 1; withSrc('Éveil du compagnon', () => { if (A) A.fn(c); }); c.awkN = A ? A.n : ''; }
const hasFx = (m, k) => (CD(m.c).fxAll || []).some(e => e.k === k);
// dans l'univers du chakra, les pouvoirs héroïques se paient en chakra
const powPaid = G => !!(G && inMechAny(G, 'chakra'));   // Ninja : le pouvoir du héros se paie en chakra
const powPurse = (G, p) => powPaid(G) ? (p.ck || 0) : p.g;
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
          ['+6 vie et Renaissance : se relève une fois pendant le duel', c => { buff(c, 0, 6); addF(c, 'r'); }]],
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
  'eau+vent':{ n:'Glace', col:'#bfe8ff', fx:{ k:'soc_chill', a:2, n:7 } },
  'eau+terre':{ n:'Bois', col:'#6aa84a', fx:{ k:'eot_self', a:1, h:2 } },
  'feu+terre':{ n:'Lave', col:'#ff5a1a', fx:{ k:'soc_aoe', d:3 } },
  'eau+feu':{ n:'Vapeur', col:'#e8e2da', fx:{ k:'surv_self', a:2, h:2 } },
  'foudre+terre':{ n:'Explosion', col:'#ffb04a', fx:{ k:'dr_dmg', d:6, n:1 } },
  'feu+vent':{ n:'Fournaise', col:'#ff9a4a', fx:{ k:'soc_dmg', d:4, n:1 } },
  'foudre+vent':{ n:'Tempête', col:'#c8f0ff', fx:{ k:'atk_zap', d:2, n:2 } },
  'eau+foudre':{ n:'Pluie d\'orage', col:'#6a9ad8', fx:{ k:'soc_self', a:2, h:4 } },
  'feu+foudre':{ n:'Plasma', col:'#ff6ad8', fx:{ k:'atk_self', a:3, h:0 } },
  'terre+vent':{ n:'Sable', col:'#d8b878', fx:{ k:'eot_self', a:0, h:3 } },
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
// affinité : une technique de l'élément du héros coûte 1 chakra de moins
const ckCost = (p, S) => Math.max(0, (S.ck || 0) - (S.el && HEROES[p.hero] && HEROES[p.hero].clan === S.el ? 1 : 0) - (p.hero === 'nh_haru' && S.nin ? 1 : 0));   // affinité : 1 de moins dans l'élément du héros
const CLAN_EL = { n_feu:'feu', n_vent:'vent', n_eau:'eau', n_foudre:'foudre', n_terre:'terre' };
const isComp = m => !!(m && C[m.c] && C[m.c].comp);
// Cinq Nations : le compagnon est déjà en jeu (triplé) à côté du héros, hors plateau
const comps = p => p.cp ? [p.cp] : (p.bd || []).filter(isComp);
const compEl = m => m.el || CLAN_EL[CD(m.c).tr] || null;
const spCost = (p, S) => p.hero === 'sylvara' && !p.sylv ? Math.max(0, S.c - 1) : p.hero === 'nh_haru' && S.nin ? Math.max(0, S.c - (awakeNow() ? 2 : 1)) : S.c;
const trigBoard = (G, p, tr) => p.bd.concat(p.cp ? [p.cp] : []).forEach(x => fxOf(x, tr).forEach(e => runRecruit(G, p, x, e)));
const SQ = ['sq_feu', 'sq_eau', 'sq_terre', 'sq_vent', 'sq_glace', 'sq_foudre'];
const isSq = m => SQ.includes(tribe(m));
const elems = list => new Set(list.filter(x => x.h > 0 && isSq(x)).map(tribe)).size;
const sellValue = m => 1 + fxOf(m, 'sell').reduce((t, e) => t + e.n * mult(m), 0);

const OPS = {
  buy(G, p, a) { const i = a.i; if (p.g < 3 || p.hd.length >= 10 || !p.sh[i]) return false; p.g -= 3; p.hd.push(p.sh.splice(i, 1)[0]); checkTriple(G, p); return true; },
  sell(G, p, a) { const m = p.bd[a.i]; if (!m) return false; p.bd.splice(a.i, 1); if (p.ck) p.ck = Math.min(p.ck, ckMax(p)); p.g += 1; if (inMech(G, 'marche', m) && (p.mkt || 0) < 2) { p.g += 1; p.mkt = (p.mkt || 0) + 1; } fxOf(m, 'sell').forEach(e => runRecruit(G, p, m, e)); toPool(G, m); return true; },
  play(G, p, a) {
    const m = p.hd[a.i]; if (!m || m.sp || p.bd.length >= 7) return false;
    p.hd.splice(a.i, 1);
    const pos = Math.max(0, Math.min(a.pos == null ? p.bd.length : a.pos, p.bd.length));
    p.bd.splice(pos, 0, m);
    if (p.hero === 'leon' && tribe(m) === 'sq_terre') withSrc('Passif de Léon', () => { addF(m, 't'); buff(m, 1, 2); });
    const nbc = auraTimes(p.bd, 'aura_bc');
    for (let r = 0; r < nbc; r++) fxOf(m, 'bc').forEach(e => runRecruit(G, p, m, e));
    p.bd.slice().forEach(x => { if (x !== m) fxOf(x, 'play').forEach(e => runRecruit(G, p, x, e, m)); });
    if (m.tr) { delete m.tr; if (p.hd.length < 10) { const r = drawOne(G, 6, Math.min(6, p.t + 1)); if (r) p.hd.push(r); } }
    checkTriple(G, p); return true;
  },
  move(G, p, a) { const m = p.bd[a.i]; if (!m) return false; p.bd.splice(a.i, 1); p.bd.splice(Math.max(0, Math.min(a.to, p.bd.length)), 0, m); return true; },
  roll(G, p) { const free = p.hero === 'rivet' && p.rr === 0; if (!free && p.g < 1) return false; if (!free) p.g -= 1; p.rr++; p.fz = false; fillShop(G, p); trigBoard(G, p, 'roll'); return true; },
  frz(G, p) { p.fz = !p.fz; return true; },
  up(G, p) { const c = upCost(p); if (p.t >= 6 || p.g < c) return false; p.g -= c; p.t++; p.uc = (+RU().up[p.t] || 0) + (inMechAny(G, 'chakra') && p.t < 6 ? 1 : 0); trigBoard(G, p, 'up'); return true; },
  comp(G, p) { const id = compOf(p.hero); if (inMechAny(G, 'chakra') || !id || !C[id] || (p.cb || 0) >= compLimit(G.rd) || p.g < 3 || p.hd.length >= 10) return false; p.g -= 3; p.cb = (p.cb || 0) + 1; p.hd.push(mk(id, 0)); checkTriple(G, p); return true; },
  pow(G, p) { return withSrc(HEROES[p.hero] ? 'Pouvoir de ' + HEROES[p.hero].n.split(' ')[0] : null, () => OPS.pow0(G, p)); },
  pow0(G, p) {
    const h = HEROES[p.hero]; if (!h || !h.cost || p.pu || powPurse(G, p) < h.cost) return false;
    if (h.pw && !powRun(G, p, h.pw)) return false;
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
    if (powPaid(G)) p.ck -= h.cost; else p.g -= h.cost; p.pu = true; trigBoard(G, p, 'pow'); return true;
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
  cpel(G, p, a) { if (!p.cp || !ELS[a.el] || (p.ck || 0) < 2 || compEl(p.cp) === a.el) return false; p.ck -= 2; p.cp.el = a.el; p.cp.elLock = 1; return true; },
  // choisir une des 3 améliorations du coffre
  // choix obligatoire d'une récompense sur 3 : elle se range dans l'entraînement, les 2 autres sont perdues
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
    p.ck -= c; p.eqs.splice(a.i, 1);
    withSrc('Entraînement · ' + SPELLS[id].n, () => { applyEquip(comp, id); for (let l = 1; l < ((p.eqlv || {})[id] || 1); l++) eqUpgrade(comp, id); });
    return true;
  },
  buysp(G, p) { const S = p.sp && SPELLS[p.sp.sp]; const c = S ? spCost(p, S) : 0; if (!S || p.g < c || p.hd.length >= 10) return false; p.g -= c; if (p.hero === 'sylvara') p.sylv = true; p.hd.push(p.sp); p.sp = null; return true; },
  cast(G, p, a) { const it = p.hd[a.i]; if (!it || !it.sp || p.disc) return false; return castSpell(G, p, a.i, a.tg); },
  pick(G, p, a) { if (!p.disc || !p.disc[a.i]) return false; const m = p.disc.splice(a.i, 1)[0]; p.disc.forEach(x => toPool(G, x)); p.disc = null; if (p.hd.length < 10) p.hd.push(m); else toPool(G, m); checkTriple(G, p); return true; },
};

// pouvoirs décrits par des données (héros des Cinq Nations)
const rsvHas = (p, el) => (p.rsv || []).includes(el);
const pwPool = (p, w) => (p.bd || []).filter(m => !w.tb || tribe(m) === w.tb);
function powCanW(p, w) {
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
function powRun(G, p, w0) {
  const w = awake(G) ? awkPw(w0) : w0;
  if (!powCanW(p, w)) return false;
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
  const h = HEROES[p.hero]; if (!h || !h.cost || p.pu || (p.ckPay ? (p.ck || 0) : p.g) < h.cost) return false;
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
  if (a.t === 'hero') { if (G.ph === 'hero' && !p.hero && p.ho.includes(a.h)) { p.hero = a.h; broadcast(); } return; }
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
  return s;
}
function aiTurn(G, p) {
  const targetRound = inMechAny(G, 'chakra') ? { 1:2, 2:5, 3:7, 4:9, 5:11 } : { 1:2, 2:4, 3:6, 4:8, 5:10 };
  while (p.g >= 3 && OPS.comp(G, p)) {}
  for (let guard = 0; guard < 40; guard++) {
    let acted = false;
    const c = upCost(p);
    if (p.t < 6 && p.g >= c && (G.rd >= targetRound[p.t] || p.g - c >= 3)) { OPS.up(G, p); acted = true; continue; }
    const hc = HEROES[p.hero] && HEROES[p.hero].cost;
    const nonoWait = p.hero === 'nono' && (G.rd < 3 || ((p.fb || 1) < 4 && G.rd < 9));
    if (hc && !nonoWait && !p.pu && (powPaid(G) ? (p.ck || 0) >= hc : p.g >= hc && p.g - hc >= 3) && (p.bd.length || p.hero === 'oren' || p.hero === 'nono')) { if (OPS.pow(G, p)) { acted = true; continue; } }
    aiPlayAll(G, p);
    if (p.g >= 3 && p.sh.length) {
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
    const free = p.hero === 'rivet' && p.rr === 0;
    if ((p.g >= 4 || (free && p.g >= 3)) && p.bd.length < 7) { OPS.roll(G, p); acted = true; continue; }
    if (!acted) break;
  }
  const front = m => fxOf(m, 'dr').length || has(m, 'r') ? 0 : 1;
  p.bd.sort((x, y) => front(x) - front(y) || y.a - x.a);
  aiPlayAll(G, p); aiSpells(G, p);
  p.rdy = true;
}

/* ---------- phases ---------- */
const humansLive = G => G.ps.filter(p => p.al && p.human && !p.bot);
function startRecruit() {
  const G = H.G; G.rd++;
  for (const p of G.ps) if (p.al) {
    if (inMechAny(G, 'chakra') && !p.cp && p.hero && compOf(p.hero)) { p.cp = mk(compOf(p.hero), 1); p.cb = 3; }
    if (p.cp && awake(G) && !p.cp.awk) awakenComp(p.cp);
    if (p.cp && awake(G)) summonBeast(p);
    p.mg = Math.min(10, 2 + G.rd); p.g = p.mg;
    if (p.hero === 'barnabe' && G.rd % 2 === 0) p.g += 1;
    p.uc = Math.max(0, p.uc - 1);
    if (p.fz) { p.fz = false; topUpShop(G, p); } else fillShop(G, p);
    p.pu = false; p.fbq = false; p.njf = 0; p.sylv = false; p.rr = 0; p.rdy = false; p.lastRes = p.res ? (p.res.cr || p.res.r) : null; p.res = null;
    if (p.inc && p.inc.length) p.g += p.inc.shift() || 0;
    { const w = pwOf(p); if (w && w.k === 'pturn' && p.hero && /^nh_/.test(p.hero)) { if (w.g) p.g += w.g; if (w.el) mkAdd(p, w.el, w.n); } }
    trigBoard(G, p, 'sot');
    p.mkt = 0; p.cdbl = 0; p.hruse = 0;
    if (inMechAny(G, 'ames') && (p.souls || 0) >= 3) { const k = Math.floor(p.souls / 3); p.souls -= k * 3; withSrc('Moisson d\'âmes', () => p.bd.forEach(m => { if (inMech(G, 'ames', m)) buff(m, k, k); })); }
    if (inMechAny(G, 'chakra')) { const n = p.bd.filter(m => inMech(G, 'chakra', m)).length; p.ck = Math.min(ckMax(p), (p.ck || 0) + n); mkSync(p); }
    // un coffre après chaque combat : majeur si le compagnon gagne son duel, mineur sinon
    if (inMechAny(G, 'chakra') && p.lastRes) p.pendChest = (p.lastRes === 'win' ? 'maj' : 'min') + (p.t || 1);
    // Éveil : le coffre favorise les plus bas au classement (moitié inférieure en points de vie)
    p.chFav = 0;
    if (inMechAny(G, 'chakra') && awake(G) && p.lastRes) { const al = G.ps.filter(x => x.al).sort((x, y) => x.hp - y.hp), k = al.indexOf(p); p.chFav = k < Math.ceil(al.length / 2) ? 1 : 0; p.pendChest = (p.chFav ? 'maj' : 'min') + (p.t || 1); }
    // pureté : 5 serviteurs ou plus d'un même clan → +1 chakra
    if (inMechAny(G, 'chakra')) { const n = {}; p.bd.forEach(m => { const t = CD(m.c).tr; if (CLAN_EL[t]) n[t] = (n[t] || 0) + 1; }); const pure = Object.keys(n).find(t => n[t] >= 5) || null; p.pure = pure; if (pure) p.ck = Math.min(ckMax(p), (p.ck || 0) + 1); }
    { const w = HEROES[p.hero] && HEROES[p.hero].pw; if (w && w.k === 'pck') p.ck = Math.min(ckMax(p), (p.ck || 0) + w.n); if (w && w.k === 'ptech' && G.rd % 2 === 0 && p.hd.length < 10) { const sp = drawSpell(p.t); if (sp) p.hd.push(sp); } }
    p.bd.forEach(m => { delete m.tmp; }); p.tma = null;
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
    if (p.pendChest) OPS.chest(G, p);
    if (p.choice) { const b = p.choice.reduce((bi, o, i) => o.r > p.choice[bi].r ? i : bi, 0); OPS.upick(G, p, { i:b }); }
    if (p.bot && p.cp) for (let g = 0; g < 8 && (p.ups || []).length && (p.ck || 0) >= upgCost(p.ups[0]); g++) OPS.uapply(G, p, { i:0 });
    { const w = pwOf(p); if (w && w.k === 'prsv' && (p.rsv || []).length === 1) p.maree = (p.maree || 0) + w.n; }
    const neot = auraTimes(p.bd, 'aura_eot');
    for (const m of p.bd.concat(p.cp ? [p.cp] : [])) for (let r = 0; r < neot; r++) fxOf(m, 'eot').forEach(e => runRecruit(G, p, m, e));
    mkSync(p);
    if (p.hero === 'maelle' && p.bd[0]) withSrc('Passif de Maëlle', () => buff(p.bd[0], 1, 1));
    if (inMechAny(G, 'fusion') && elems(p.bd) >= 4) withSrc('Fusion élémentaire', () => p.bd.forEach(m => { if (inMech(G, 'fusion', m)) buff(m, 1, 1); }));
    if (p.hero === 'nono' && G.rd >= 3 && !p.pu) p.fb = (p.fb || 3) + 1;
    if (p.disc) OPS.pick(G, p, { i:aiBestIndex(p, p.disc) });
  }
  const alive = G.ps.filter(p => p.al);
  let order = shuffle(alive.slice());
  for (let t = 0; t < 12; t++) {
    let ok = true; for (let i = 0; i + 1 < order.length; i += 2) if (order[i].lastOpp === order[i + 1].pid) ok = false;
    if (ok) break; order = shuffle(alive.slice());
  }
  G.pend = []; let maxFrames = 0;
  const cap = G.rd <= 3 ? 5 : alive.length >= 4 ? 15 : 99;
  const fight = (p, q, ghost) => {
    const seed = rint(1e9), qb = ghost ? ghost.bd : q.bd, qt = ghost ? ghost.t : q.t, qn = ghost ? 'Fantôme de ' + ghost.n : q.n;
    const heat = x => (x.fbq ? (x.fb || 3) : 0) + (x.hero === 'pyra' ? 2 : 0) + (x.njf || 0) + (HEROES[x.hero] && HEROES[x.hero].pw && HEROES[x.hero].pw.k === 'pfire' ? HEROES[x.hero].pw.d * (awake(G) ? 2 : 1) : 0) + (awake(G) && x.bd ? Math.floor((x.charge || 0) / 2) * (x.bd.some(m => hasFx(m, 'awk_storm')) ? 2 : 1) : 0);
    const fire = [heat(p), ghost ? 0 : heat(q)];
    const pb = combatBoard(p), qcb = combatBoard(ghost || q);
    // après l'Éveil (Ninja) : compagnon et bête d'invocation rejoignent la bataille, en tête de rangée
    const join = awake(G) && inMechAny(G, 'chakra') && (typeof AWK_JOIN === 'undefined' || AWK_JOIN);
    const lead = x => x && x.cp ? [resonate(x, Object.assign({}, x.cp, { duo:1 }))].concat(x.bst ? [Object.assign({}, x.bst, { duo:1 })] : []) : [];
    if (join) { pb.splice(Math.floor(pb.length / 2), 0, ...lead(p)); const qx = ghost || q; qcb.splice(Math.floor(qcb.length / 2), 0, ...lead(qx)); }   // au centre de la rangée
    elementDuel(pb, qcb);
    const r = simulate(pb, qcb, seed, p.t, qt, fire, G.mx);
    lawsAfterFight(G, p, r, 0); if (!ghost) lawsAfterFight(G, q, r, 1);
    const stl = !ghost ? chakraSteal(p, q, pb, qcb, r) : [0, 0];
    const d = Math.min(cap, r.dmg);
    if (r.w === 1) G.pend.push({ pid:p.pid, d });
    if (r.w === 0 && !ghost) G.pend.push({ pid:q.pid, d });
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
    if (!ghost) q.res = { o:p.n, r:X(r.w), d, cr:duel ? X(duel.w) : join && q.cp ? stand(q, 1) : null };
    const base = { duel, stl, rd:G.rd, a:pb.map(fullM), b:qcb.map(fullM), seed, ta:p.t, tb:qt, cap, ha:p.hero, hb:ghost ? ghost.hero : q.hero, fire, mx:G.mx || {} };
    if (p.human && !p.bot) { deliverFight(p, Object.assign({ me:0, on:qn }, base)); maxFrames = Math.max(maxFrames, r.frames.length); }
    if (!ghost && q.human && !q.bot) { deliverFight(q, Object.assign({ me:1, on:p.n }, base)); maxFrames = Math.max(maxFrames, r.frames.length); }
    p.lastOpp = ghost ? null : q.pid; if (!ghost) q.lastOpp = p.pid;
  };
  for (let i = 0; i + 1 < order.length; i += 2) fight(order[i], order[i + 1]);
  if (order.length % 2) { const p = order[order.length - 1]; const others = alive.filter(x => x !== p); fight(p, null, others.length ? pickR(others) : p); }
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
  const a = take(q, p, n(pb, 'soc_steal') + dead(0, 'dr_steal')), b = take(p, q, n(qb, 'soc_steal') + dead(1, 'dr_steal'));
  return [a, b];
}
function lawsAfterFight(G, p, r, side) {
  if (inMechAny(G, 'ames')) { const n = r.dead[side].filter(c => C[c] && G.mx.ames.includes(C[c].tr)).length; if (n) p.souls = (p.souls || 0) + n; }
  if (G.mx && G.mx.pillage && r.w === side && r.alive[side].some(c => C[c] && G.mx.pillage.includes(C[c].tr)) && p.hd.length < 10) { const sp = drawSpell(p.t); if (sp) { p.hd.push(sp); p.loot = (p.loot || 0) + 1; } }
}
const inMechAny = (G, k) => !!(G && G.mx && G.mx[k]);
function endCombat() {
  const G = H.G;
  for (const x of G.pend) G.ps[x.pid].hp -= x.d;
  const dead = G.ps.filter(p => p.al && p.hp <= 0).sort((a, b) => b.hp - a.hp);
  let alive = G.ps.filter(p => p.al && p.hp > 0).length;
  dead.forEach((p, k) => { p.al = false; p.place = alive + 1 + k; p.sh.forEach(m => toPool(G, m)); p.bd.forEach(m => toPool(G, m)); p.sh = []; });
  if (inMechAny(G, 'chakra') && !G.eveil) { const al = G.ps.filter(p => p.al), low = al.filter(p => p.hp <= ((+RU().hp || 40) / 2)).length; if (low * 2 >= al.length || alive <= 3) G.eveil = G.rd + 1; }
  if (alive <= 1) {
    const w = G.ps.find(p => p.al); if (w) w.place = 1;
    if (!w && dead[0]) dead[0].place = 1;
    G.ph = 'end'; G.end = Date.now(); broadcast(); clearInterval(H.tick); setLobbyPresence();
    if (Net.role === 'host') setTimeout(hostBackToTable, 1200);   // en ligne : tout le monde revient à la table
    return;
  }
  startRecruit();
}
function finishHero() {
  const G = H.G;
  G.ps.forEach(p => { if (!p.hero) p.hero = p.ho[0]; if (p.hero === 'gor') p.hp += 5; });
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
const smallM = m => { if (m.sp) return { sp:m.sp, u:m.u }; const o = { c:m.c, a:m.a, h:m.h }; if (m.memo) o.memo = m.memo; if (m.el) o.el = m.el; if (m.fu) o.fu = m.fu; if (m.xp) o.xp = m.xp; if (m.eq && m.eq.length) o.eq = m.eq; if (m.u) o.u = m.u; if (m.g) o.g = 1; if (m.f) o.f = m.f; if (m.tr) o.tr = 1; if (m.x) o.x = m.x; if (m.tmp) o.tmp = m.tmp; if (m.bn) o.bn = m.bn; return o; };
const fullM = m => { const o = { c:m.c, a:m.a, h:m.h, g:m.g || 0, f:m.f || '', u:m.u }; if (m.x) o.x = m.x; if (m.domb) o.domb = m.domb; if (m.awk) o.awk = m.awk; if (m.duo) o.duo = 1; if (m.el) o.el = m.el; return o; };
function pubData() {
  const G = H.G;
  if (!G) return { ph:'lobby', code:H.code, cv:CAT_REV, us:(V.univSel || []).slice(), pl:H.roster.map(r => ({ n:r.n, pe:r.peer })), last:H.last || null };
  return { ph:G.ph, rd:G.rd, rem:Math.max(0, G.end - Date.now()), code:H.code, cv:CAT_REV, trs:G.trs, ban:G.ban, univ:G.univ, laws:G.laws || [], ev:G.eveil || 0, mhp:(+RU().hp || 40) + 10,
    pl:G.ps.map(p => ({ pid:p.pid, n:p.n, hp:p.hp, t:p.t, ai:!p.human, bot:p.bot, al:p.al, pl:p.place, r:p.rdy, h:p.hero, pe:p.peer, nb:p.bd.length, el:p.cp ? compEl(p.cp) : null, mk:p.cp ? p[MK[compEl(p.cp)]] || 0 : 0 })) };
}
function privData(p) {
  return { to:p.peer, pid:p.pid, g:p.g, mg:p.mg, t:p.t, uc:upCost(p), sh:p.sh.map(smallM), bd:p.bd.map(smallM), hd:p.hd.map(smallM),
    fz:p.fz, pu:p.pu, fb:p.fb || 3, spc:p.sp && SPELLS[p.sp.sp] ? spCost(p, SPELLS[p.sp.sp]) : null, cb:p.cb || 0, cid:compOf(p.hero), cp:p.cp || null, bst:p.bst || null, sp:p.sp ? p.sp.sp : null, disc:p.disc ? p.disc.map(smallM) : null, inc:(p.inc && p.inc[0]) || 0, tma:p.tma || null, souls:p.souls || 0, braise:p.braise || 0, maree:p.maree || 0, charge:p.charge || 0, ck:p.ck || 0, ckm:ckMax(p), ckPay:powPaid(H.G) ? 1 : 0, pend:p.pendChest || null, rsv:p.rsv || [], combo:p.combo || null, mkl:(mkSync(p), p.mkl) || {}, souffle:p.souffle || 0, roche:p.roche || 0, choice:p.choice || null, chFav:p.chFav || 0, ups:p.ups || [], pure:p.pure || null, eqs:p.eqs || [], eqlv:p.eqlv || {}, loot:p.loot || null, mkt:p.mkt || 0, rd:H.G ? H.G.rd : 0, hero:p.hero, ho:p.ho, hrr:p.hrr || 0, rdy:p.rdy, rr:p.rr, res:p.res, hp:p.hp };
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
