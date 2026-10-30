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
    { id:'n_feu', n:'Clan du Feu', col:'#d8502a', bg:'volcan', on:true },
    { id:'n_vent', n:'Clan du Vent', col:'#b8944a', bg:'sqvent', on:true },
    { id:'n_eau', n:'Clan de l\'Eau', col:'#2f7ab8', bg:'sqeau', on:true },
    { id:'n_foudre', n:'Clan de la Foudre', col:'#c8a020', bg:'sqfoudre', on:true },
    { id:'n_terre', n:'Clan de la Terre', col:'#7a5a3a', bg:'mine', on:true },
  ],
  univ:[
    { n:'Ténèbres', col:'#6a2a8a', ic:'moon', lore:'Ici, mourir n\'est qu\'un contretemps.', mech:'ames', tribes:['spec', 'vamp', 'garou', 'mort', 'bete'] },
    { n:'Royaumes anciens', col:'#9a7228', ic:'crown', lore:'Les vieilles lignées tiennent parole.', mech:'serment', tribes:['nain', 'elfe', 'ogre', 'bete', 'vamp'] },
    { n:'Ateliers et bas-fonds', col:'#4a6a86', ic:'gear', lore:'Tout se vend, surtout ce qui fume.', mech:'marche', tribes:['meca', 'gob', 'nain', 'cors', 'ogre'] },
    { n:'Terres sauvages', col:'#4a7a2a', ic:'leaf', lore:'La meute charge d\'abord.', mech:'ruee', tribes:['bete', 'garou', 'elfe', 'drag', 'elem'] },
    { n:'Mers et cieux', col:'#1f6a96', ic:'wave', lore:'Chaque victoire a son butin.', mech:'pillage', tribes:['cors', 'drag', 'elem', 'spec', 'meca'] },
    { n:'Arcanes', col:'#5a3a9a', ic:'star', lore:'Un sort, et tout s\'illumine.', mech:'resonance', tribes:['elem', 'elfe', 'meca', 'mort', 'spec'] },
    { n:'Montagnes', col:'#6a5038', ic:'mount', lore:'Ils tombent… et tout s\'effondre.', mech:'eboulement', tribes:['nain', 'ogre', 'gob', 'drag', 'garou'] },
    { n:'Les Cinq Nations', col:'#a8402a', ic:'sword', lore:'Le chakra coule, la technique frappe.', mech:'chakra', tribes:['n_feu', 'n_vent', 'n_eau', 'n_foudre', 'n_terre'] },
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
  ['n_f1', 'Apprentie des braises', 1, 'n_feu', 2, 1, '', [{ k:'cast_self', a:1, h:1 }]],
  ['n_f2', 'Souffleur de flammes', 2, 'n_feu', 3, 2, '', [{ k:'bc_chakra', n:2 }]],
  ['n_f3', 'Gardienne du foyer', 3, 'n_feu', 3, 4, '', [{ k:'cast_buff_tribe', a:1, h:1, tb:'n_feu' }]],
  ['n_f4', 'Danseur de cendres', 4, 'n_feu', 4, 4, '', [{ k:'soc_dmg', d:3, n:2 }]],
  ['n_f5', 'Maître du brasier', 5, 'n_feu', 5, 5, '', [{ k:'bc_spell', n:1 }, { k:'cast_buff_rand', a:2, h:2 }]],
  ['n_f6', 'Grand Sage du Feu', 6, 'n_feu', 7, 6, '', [{ k:'cast_buff_tribe', a:2, h:2, tb:'n_feu' }]],
  ['n_v1', 'Éclaireur des dunes', 1, 'n_vent', 1, 2, '', [{ k:'atk_self', a:1, h:0 }]],
  ['n_v2', 'Lame tourbillon', 2, 'n_vent', 2, 2, 'w', []],
  ['n_v3', 'Cerf-volant de guerre', 3, 'n_vent', 3, 3, '', [{ k:'atk_buff_rand', a:1, h:1 }]],
  ['n_v4', 'Faucheuse du vent', 4, 'n_vent', 4, 3, 'w', [{ k:'atk_self', a:1, h:1 }]],
  ['n_v5', 'Mur de sable', 5, 'n_vent', 5, 4, '', [{ k:'soc_kw', kw:'w', tb:'n_vent' }]],
  ['n_v6', 'Seigneur des dunes', 6, 'n_vent', 6, 8, 't', [{ k:'eot_buff_all', a:1, h:2, tb:'n_vent' }]],
  ['n_e1', 'Guetteur des brumes', 1, 'n_eau', 1, 3, '', [{ k:'surv_self', a:1, h:0 }]],
  ['n_e2', 'Ondine silencieuse', 2, 'n_eau', 2, 3, 's', []],
  ['n_e3', 'Porteuse de marée', 3, 'n_eau', 3, 3, '', [{ k:'eot_buff_rand', a:1, h:2, n:2, tb:'n_eau' }]],
  ['n_e4', 'Duelliste des brumes', 4, 'n_eau', 4, 5, '', [{ k:'dr_kw', kw:'s', tb:'n_eau' }]],
  ['n_e5', 'Serpent de marée', 5, 'n_eau', 5, 6, '', [{ k:'bc_chakra', n:3 }, { k:'surv_self', a:2, h:0 }]],
  ['n_e6', 'Gardien des abysses', 6, 'n_eau', 6, 9, 's', [{ k:'soc_buff', a:3, h:3, tb:'n_eau' }]],
  ['n_o1', 'Étincelle rapide', 1, 'n_foudre', 2, 1, '', [{ k:'atk_zap', d:1, n:1 }]],
  ['n_o2', 'Messager de l\'orage', 2, 'n_foudre', 2, 3, '', [{ k:'eot_chakra', n:1 }]],
  ['n_o3', 'Lame crépitante', 3, 'n_foudre', 4, 2, '', [{ k:'atk_zap', d:2, n:1 }]],
  ['n_o4', 'Hurleur du tonnerre', 4, 'n_foudre', 3, 5, '', [{ k:'soc_dmg', d:2, n:3 }]],
  ['n_o5', 'Cuirasse d\'éclairs', 5, 'n_foudre', 6, 5, 'w', [{ k:'atk_zap', d:2, n:2 }]],
  ['n_o6', 'Seigneur de l\'orage', 6, 'n_foudre', 7, 7, '', [{ k:'soc_aoe', d:2 }, { k:'eot_chakra', n:2 }]],
  ['n_t1', 'Petit golem de pierre', 1, 'n_terre', 1, 3, 't', []],
  ['n_t2', 'Bâtisseur de remparts', 2, 'n_terre', 2, 3, 't', [{ k:'bc_buff_tribe', a:0, h:2, tb:'n_terre' }]],
  ['n_t3', 'Garde des roches', 3, 'n_terre', 2, 6, 't', [{ k:'eot_buff_taunt', a:1, h:1 }]],
  ['n_t4', 'Lanceur de rochers', 4, 'n_terre', 5, 4, '', [{ k:'soc_dmg', d:4, n:1 }]],
  ['n_t5', 'Colosse de granit', 5, 'n_terre', 4, 9, 't', [{ k:'surv_self', a:2, h:0 }]],
  ['n_f7', 'Voleur d\'étincelles', 2, 'n_feu', 2, 3, '', [{ k:'soc_steal', n:1 }]],
  ['n_f8', 'Pyromancien avide', 4, 'n_feu', 3, 4, '', [{ k:'soc_ck', a:1, h:0 }]],
  ['n_v7', 'Pickpocket des sables', 1, 'n_vent', 2, 1, '', [{ k:'dr_steal', n:1 }]],
  ['n_v8', 'Danseur d\'éventail', 3, 'n_vent', 3, 3, '', [{ k:'cast_ck', n:1 }]],
  ['n_e7', 'Siphon de brume', 3, 'n_eau', 2, 5, '', [{ k:'soc_steal', n:2 }]],
  ['n_e8', 'Méditant des cascades', 5, 'n_eau', 4, 7, '', [{ k:'eot_ck_spend', n:2, a:2, h:2 }]],
  ['n_o7', 'Parasite de foudre', 2, 'n_foudre', 3, 2, '', [{ k:'dr_steal', n:2 }]],
  ['n_o8', 'Tempête intérieure', 5, 'n_foudre', 5, 5, '', [{ k:'soc_ck', a:1, h:1 }]],
  ['n_t7', 'Pilleur souterrain', 4, 'n_terre', 4, 5, 't', [{ k:'soc_steal', n:2 }]],
  ['n_t8', 'Ermite des cimes', 6, 'n_terre', 5, 8, '', [{ k:'eot_ck_spend', n:3, a:3, h:3 }, { k:'cast_ck', n:1 }]],
  ['c_nj_feu', 'Disciple de la flamme', 3, 'n_feu', 6, 5, '', [{ k:'cast_memo' }, { k:'sot_memo' }, { k:'soc_dmg', d:3, n:2 }]],
  ['c_nj_vent', 'Disciple du vent', 3, 'n_vent', 6, 4, 'w', [{ k:'cast_memo' }, { k:'sot_memo' }, { k:'atk_self', a:2, h:1 }]],
  ['c_nj_eau', 'Disciple de la brume', 3, 'n_eau', 4, 8, 's', [{ k:'cast_memo' }, { k:'sot_memo' }, { k:'surv_self', a:2, h:2 }]],
  ['c_nj_foudre', 'Disciple de l\'orage', 3, 'n_foudre', 5, 5, '', [{ k:'cast_memo' }, { k:'sot_memo' }, { k:'atk_zap', d:3, n:2 }]],
  ['c_nj_terre', 'Disciple du roc', 3, 'n_terre', 4, 10, 't', [{ k:'cast_memo' }, { k:'sot_memo' }, { k:'eot_self', a:1, h:2 }]],
  ['n_t6', 'Seigneur des roches', 6, 'n_terre', 6, 10, 't', [{ k:'eot_buff_taunt', a:2, h:2 }, { k:'eot_chakra', n:1 }]],
];
const DEFAULT_CARDS = {};
DEFAULT_CARD_LIST.forEach(([id, n, t, tr, a, h, kw, fx]) => { DEFAULT_CARDS[id] = { id, n, t, tr, a, h, kw:kw.split(''), fx, art:{ f:'base', id } }; });
const COMPANIONS = { nh_akari:'c_nj_feu', nh_hoshi:'c_nj_feu', nh_ren:'c_nj_feu', nh_tsubaki:'c_nj_feu', nh_daigo:'c_nj_feu', nh_mira:'c_nj_vent', nh_taro:'c_nj_vent', nh_haru:'c_nj_vent', nh_gen:'c_nj_vent', nh_saki:'c_nj_vent', nh_mizu:'c_nj_eau', nh_ryota:'c_nj_eau', nh_umi:'c_nj_eau', nh_kenji:'c_nj_eau', nh_aya:'c_nj_eau', nh_raiko:'c_nj_foudre', nh_kenta:'c_nj_foudre', nh_hikari:'c_nj_foudre', nh_akio:'c_nj_foudre', nh_rika:'c_nj_foudre', nh_goro:'c_nj_terre', nh_kaito:'c_nj_terre', nh_masa:'c_nj_terre', nh_toshi:'c_nj_terre', nh_emi:'c_nj_terre', paul:'c_pouf', leon:'c_caillou', zoe:'c_gloup', jeanne:'c_frisouille', selene:'c_nyx', brok:'c_enclume', sylvara:'c_lys', grumbo:'c_miette', vaskor:'c_osbrise', pyra:'c_etincelle', rivet:'c_bricole', egide:'c_lumen', ondine:'c_fiole', barnabe:'c_sou', maelle:'c_croc', oren:'c_plume', gor:'c_bastion', ilka:'c_truelle', nono:'c_braise' };
for (const h in COMPANIONS) DEFAULT_CARDS[COMPANIONS[h]].comp = h;
const compOf = hero => { const id = COMPANIONS[hero]; if (id && CARDS[id]) return id; return Object.keys(CARDS).find(k => CARDS[k].comp === hero) || null; };
const compLimit = rd => rd >= 6 ? 3 : rd >= 5 ? 2 : rd >= 3 ? 1 : 0;

const SLOTS = { 1:3, 2:4, 3:4, 4:5, 5:5, 6:6 };
const HEROES = {
  nh_akari: {fam:['n_feu'], n:'Akari l\'ardente', cost:1, clan:'feu', pw:{'k': 'ck', 'n': 2}, tx:'Gagnez 2 chakra.' },
  nh_hoshi: {fam:['n_feu'], n:'Hoshi le vieux sage', clan:'feu', pw:{'k': 'pck', 'n': 1}, tx:'Passif : gagnez 1 chakra de plus au début de chaque tour.' },
  nh_ren: {fam:['n_feu'], n:'Ren aux mille braises', cost:2, clan:'feu', pw:{'k': 'fire', 'd': 3}, tx:'Prochain combat : 3 dégâts frappent l\'ennemi au début du combat.' },
  nh_tsubaki: {fam:['n_feu'], n:'Tsubaki la gardienne', cost:2, clan:'feu', pw:{'k': 'buffall', 'a': 1, 'h': 0, 'tb': 'n_feu'}, tx:'Vos serviteurs du Clan du Feu gagnent +1 attaque.' },
  nh_daigo: {fam:['n_feu'], n:'Daigo le souffleur', cost:2, clan:'feu', pw:{'k': 'tech'}, tx:'Ajoute une technique ninja aléatoire à votre main.' },
  nh_mira: {fam:['n_vent'], n:'Mira des dunes', cost:2, clan:'vent', pw:{'k': 'kw', 'kw': 'w'}, tx:'Donne Furie des vents à un de vos serviteurs aléatoire qui ne l\'a pas.' },
  nh_taro: {fam:['n_vent'], n:'Taro le cerf-volant', cost:1, clan:'vent', pw:{'k': 'buffr', 'a': 2, 'h': 0, 'tb': 'n_vent'}, tx:'Donne +2 attaque à un serviteur du Clan du Vent aléatoire.' },
  nh_haru: {fam:['n_vent'], n:'Haru le nomade', clan:'vent', pw:{'k': 'ptech'}, tx:'Passif : au début de chaque tour pair, ajoute une technique ninja aléatoire à votre main.' },
  nh_gen: {fam:['n_vent'], n:'Gen aux éventails', cost:3, clan:'vent', pw:{'k': 'tma', 'a': 2, 'h': 1}, tx:'Prochain combat seulement : vos serviteurs gagnent +2/+1.' },
  nh_saki: {fam:['n_vent'], n:'Saki la bourrasque', cost:1, clan:'vent', pw:{'k': 'buffr', 'a': 1, 'h': 1}, tx:'Donne +1/+1 à un de vos serviteurs aléatoire.' },
  nh_mizu: {fam:['n_eau'], n:'Mizu la brume', cost:2, clan:'eau', pw:{'k': 'kw', 'kw': 's'}, tx:'Donne Bouclier divin à un de vos serviteurs aléatoire qui ne l\'a pas.' },
  nh_ryota: {fam:['n_eau'], n:'Ryota le silencieux', cost:1, clan:'eau', pw:{'k': 'buffr', 'a': 0, 'h': 3, 'tb': 'n_eau'}, tx:'Donne +3 vie à un serviteur du Clan de l\'Eau aléatoire.' },
  nh_umi: {fam:['n_eau'], n:'Umi la marée', cost:2, clan:'eau', pw:{'k': 'buffall', 'a': 0, 'h': 2, 'tb': 'n_eau'}, tx:'Vos serviteurs du Clan de l\'Eau gagnent +2 vie.' },
  nh_kenji: {fam:['n_eau'], n:'Kenji l\'épéiste', cost:2, clan:'eau', pw:{'k': 'tma', 'a': 3, 'h': 0}, tx:'Prochain combat seulement : vos serviteurs gagnent +3 attaque.' },
  nh_aya: {fam:['n_eau'], n:'Aya des abysses', cost:2, clan:'eau', pw:{'k': 'ck', 'n': 3}, tx:'Gagnez 3 chakra.' },
  nh_raiko: {fam:['n_foudre'], n:'Raiko l\'éclair', cost:1, clan:'foudre', pw:{'k': 'fire', 'd': 2}, tx:'Prochain combat : 2 dégâts frappent l\'ennemi au début du combat.' },
  nh_kenta: {fam:['n_foudre'], n:'Kenta le tonnerre', cost:2, clan:'foudre', pw:{'k': 'kw', 'kw': 'w'}, tx:'Donne Furie des vents à un de vos serviteurs aléatoire qui ne l\'a pas.' },
  nh_hikari: {fam:['n_foudre'], n:'Hikari l\'étincelle', clan:'foudre', pw:{'k': 'pfire', 'd': 2}, tx:'Passif : au début de chaque combat, 2 dégâts frappent l\'ennemi.' },
  nh_akio: {fam:['n_foudre'], n:'Akio l\'orage', cost:2, clan:'foudre', pw:{'k': 'buffall', 'a': 1, 'h': 1, 'tb': 'n_foudre'}, tx:'Vos serviteurs du Clan de la Foudre gagnent +1/+1.' },
  nh_rika: {fam:['n_foudre'], n:'Rika la foudroyante', cost:1, clan:'foudre', pw:{'k': 'ck', 'n': 2}, tx:'Gagnez 2 chakra.' },
  nh_goro: {fam:['n_terre'], n:'Goro le roc', cost:2, clan:'terre', pw:{'k': 'kw', 'kw': 't'}, tx:'Donne Provocation à un de vos serviteurs aléatoire qui ne l\'a pas.' },
  nh_kaito: {fam:['n_terre'], n:'Kaito le bâtisseur', cost:1, clan:'terre', pw:{'k': 'buffr', 'a': 0, 'h': 3, 'tb': 'n_terre'}, tx:'Donne +3 vie à un serviteur du Clan de la Terre aléatoire.' },
  nh_masa: {fam:['n_terre'], n:'Masa la montagne', clan:'terre', pw:{'k': 'pck', 'n': 1}, tx:'Passif : gagnez 1 chakra de plus au début de chaque tour.' },
  nh_toshi: {fam:['n_terre'], n:'Toshi le colosse', cost:3, clan:'terre', pw:{'k': 'buffall', 'a': 1, 'h': 2, 'tb': 'n_terre'}, tx:'Vos serviteurs du Clan de la Terre gagnent +1/+2.' },
  nh_emi: {fam:['n_terre'], n:'Emi la géode', cost:2, clan:'terre', pw:{'k': 'tech'}, tx:'Ajoute une technique ninja aléatoire à votre main.' },
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
  chakra:{ n:'Chakra et cycle des éléments', ic:'k_spark', d:'Chaque serviteur de l\'univers génère 1 chakra au début de votre tour (10 au plus). Les techniques s\'achètent en or et se lancent au chakra (1 de moins dans l\'élément de votre héros) ; après chaque combat, un coffre arrive (meilleur après une victoire). Votre compagnon retient l\'élément de la dernière technique. Enchaîner deux éléments crée une fusion (Glace, Bois, Lave, Vapeur, Explosion) ; lancer l\'élément nourri (Vent → Feu → Foudre → Terre → Eau → Vent) rend 2 chakra ; dominer l\'élément d\'en face (Feu > Vent > Foudre > Terre > Eau > Feu) donne +4/+4 au combat.' },
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
const TRIG = { bc:'Cri de guerre', dr:'Râle d\'agonie', soc:'Début du combat', eot:'Fin de tour', play:'Après avoir joué', die:'Quand un allié meurt', surv:'Quand il survit', atk:'Après avoir attaqué', sell:'Quand vous le vendez', aura:'Aura', roll:'Quand vous actualisez', shield:'Quand un allié perd son Bouclier', pow:'Quand vous utilisez le pouvoir', sot:'Début de tour', up:'Quand vous améliorez', cast:'Quand vous lancez un sort' };
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
    case 'bc_chakra': case 'eot_chakra': p.ck = Math.min(CK_MAX, (p.ck || 0) + e.n * k); break;
    case 'cast_ck': p.ck = Math.min(CK_MAX, (p.ck || 0) + e.n * k); break;
    case 'eot_ck_spend': if ((p.ck || 0) >= e.n) { p.ck -= e.n; buff(m, A, Hh); } break;
    case 'cast_memo': if (p.lastCast && SPELLS[p.lastCast] && SPELLS[p.lastCast].nin) { m.memo = p.lastCast; if (SPELLS[p.lastCast].el) m.el = SPELLS[p.lastCast].el; } break;
    case 'sot_memo': if (m.memo && SPELLS[m.memo]) for (let i = 0; i < k + (m.memo2 ? 1 : 0); i++) if (p.hd.length < 10) p.hd.push({ sp:m.memo, u:UID++ }); break;
    case 'bc_card': for (let i = 0; i < e.n; i++) if (p.hd.length < 10) { const c = drawOne(G, p.t, null, e.tb); if (c) p.hd.push(c); } break;
    case 'eot_self': buff(m, A, Hh); break;
    case 'eot_buff_rand': shuffle(others()).slice(0, e.n).forEach(x => buff(x, A, Hh)); break;
    case 'play_self': if (tribeOk(ctx, e.tb)) buff(m, A, Hh); break;
    case 'play_other': if (tribeOk(ctx, e.tb)) buff(ctx, A, Hh); break;
    case 'sell_gold': p.g += e.n * k; break;
    case 'roll_self': case 'cast_self': buff(m, A, Hh); break;
    case 'roll_buff_tribe': case 'cast_buff_tribe': others().forEach(x => buff(x, A, Hh)); break;
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
      simDamage(S, tgt, aa, att); simDamage(S, att, ta, tgt);
      if (att.h > 0) fxOf(att, 'atk').forEach(e => runCombat(S, cur, att, e));
      simDeaths(S);
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
function hostStart(humans, opt) {
  const G = { ph:'hero', rd:0, end:Date.now() + 25000, pool:{}, ps:[] };
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
  const ids = shuffle(Object.keys(HEROES).filter(ok)), rest = shuffle(Object.keys(HEROES).filter(h => !ok(h)));
  G.ps.forEach(p => { p.ho = []; });
  for (let k = 0; k < 3; k++) for (const p of G.ps) if (ids.length) p.ho.push(ids.shift());
  for (let k = 0; k < 3; k++) for (const p of G.ps) if (p.ho.length <= k && rest.length) p.ho.push(rest.shift());
  for (const p of G.ps) while (p.ho.length < 2) { const h = pickR(Object.keys(HEROES).filter(x => !p.ho.includes(x))); if (!h) break; p.ho.push(h); }
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
// le cycle des cinq éléments (Vent ← Bois, Foudre ← case jaune, Terre ← Métal)
const ELS = { feu:{ n:'Feu', col:'#ff7a2a' }, vent:{ n:'Vent', col:'#9be36a' }, eau:{ n:'Eau', col:'#4ab0e8' }, foudre:{ n:'Foudre', col:'#ffd23a' }, terre:{ n:'Terre', col:'#c8a878' } };
const EL_GEN = { vent:'feu', feu:'foudre', foudre:'terre', terre:'eau', eau:'vent' };   // génération : A nourrit B
const EL_DOM = { feu:'vent', vent:'foudre', foudre:'terre', terre:'eau', eau:'feu' };   // domination : A l'emporte sur B
// fusions : deux éléments enchaînés par le compagnon lui donnent un pouvoir hybride (remplace le précédent)
const FUSIONS = {
  'eau+vent':{ n:'Glace', col:'#bfe8ff', fx:{ k:'soc_chill', a:1, n:7 } },
  'eau+terre':{ n:'Bois', col:'#6aa84a', fx:{ k:'eot_buff_all', a:0, h:2 } },
  'feu+terre':{ n:'Lave', col:'#ff5a1a', fx:{ k:'soc_aoe', d:2 } },
  'eau+feu':{ n:'Vapeur', col:'#e8e2da', fx:{ k:'soc_kw', kw:'s' } },
  'foudre+terre':{ n:'Explosion', col:'#ffb04a', fx:{ k:'dr_dmg', d:5, n:2 } },
};
const fusionOf = (a, b) => a && b && a !== b ? FUSIONS[[a, b].sort().join('+')] || null : null;
// affinité : une technique de l'élément du héros coûte 1 chakra de moins
const ckCost = (p, S) => Math.max(0, (S.ck || 0) - (S.el && HEROES[p.hero] && HEROES[p.hero].clan === S.el ? 1 : 0));
const CLAN_EL = { n_feu:'feu', n_vent:'vent', n_eau:'eau', n_foudre:'foudre', n_terre:'terre' };
const isComp = m => !!(m && C[m.c] && C[m.c].comp);
const compEl = m => m.el || CLAN_EL[CD(m.c).tr] || null;
const spCost = (p, S) => p.hero === 'sylvara' && !p.sylv ? Math.max(0, S.c - 1) : S.c;
const trigBoard = (G, p, tr) => p.bd.slice().forEach(x => fxOf(x, tr).forEach(e => runRecruit(G, p, x, e)));
const SQ = ['sq_feu', 'sq_eau', 'sq_terre', 'sq_vent', 'sq_glace', 'sq_foudre'];
const isSq = m => SQ.includes(tribe(m));
const elems = list => new Set(list.filter(x => x.h > 0 && isSq(x)).map(tribe)).size;
const sellValue = m => 1 + fxOf(m, 'sell').reduce((t, e) => t + e.n * mult(m), 0);

const OPS = {
  buy(G, p, a) { const i = a.i; if (p.g < 3 || p.hd.length >= 10 || !p.sh[i]) return false; p.g -= 3; p.hd.push(p.sh.splice(i, 1)[0]); checkTriple(G, p); return true; },
  sell(G, p, a) { const m = p.bd[a.i]; if (!m) return false; p.bd.splice(a.i, 1); p.g += 1; if (inMech(G, 'marche', m) && (p.mkt || 0) < 2) { p.g += 1; p.mkt = (p.mkt || 0) + 1; } fxOf(m, 'sell').forEach(e => runRecruit(G, p, m, e)); toPool(G, m); return true; },
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
  up(G, p) { const c = upCost(p); if (p.t >= 6 || p.g < c) return false; p.g -= c; p.t++; p.uc = +RU().up[p.t] || 0; trigBoard(G, p, 'up'); return true; },
  comp(G, p) { const id = compOf(p.hero); if (!id || !C[id] || (p.cb || 0) >= compLimit(G.rd) || p.g < 3 || p.hd.length >= 10) return false; p.g -= 3; p.cb = (p.cb || 0) + 1; p.hd.push(mk(id, 0)); checkTriple(G, p); return true; },
  pow(G, p) { return withSrc(HEROES[p.hero] ? 'Pouvoir de ' + HEROES[p.hero].n.split(' ')[0] : null, () => OPS.pow0(G, p)); },
  pow0(G, p) {
    const h = HEROES[p.hero]; if (!h || !h.cost || p.pu || p.g < h.cost) return false;
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
    p.g -= h.cost; p.pu = true; trigBoard(G, p, 'pow'); return true;
  },
  rdy(G, p) { p.rdy = !p.rdy; return true; },
  buysp(G, p) { const S = p.sp && SPELLS[p.sp.sp]; const c = S ? spCost(p, S) : 0; if (!S || p.g < c || p.hd.length >= 10) return false; p.g -= c; if (p.hero === 'sylvara') p.sylv = true; p.hd.push(p.sp); p.sp = null; return true; },
  cast(G, p, a) { const it = p.hd[a.i]; if (!it || !it.sp || p.disc) return false; return castSpell(G, p, a.i, a.tg); },
  pick(G, p, a) { if (!p.disc || !p.disc[a.i]) return false; const m = p.disc.splice(a.i, 1)[0]; p.disc.forEach(x => toPool(G, x)); p.disc = null; if (p.hd.length < 10) p.hd.push(m); else toPool(G, m); checkTriple(G, p); return true; },
};

// pouvoirs décrits par des données (héros des Cinq Nations)
const pwPool = (p, w) => (p.bd || []).filter(m => !w.tb || tribe(m) === w.tb);
function powCanW(p, w) {
  switch (w.k) {
    case 'ck': return (p.ck || 0) < CK_MAX;
    case 'tech': return (p.hd || []).length < 10;
    case 'buffr': case 'buffall': return pwPool(p, w).length > 0;
    case 'kw': return (p.bd || []).some(m => !has(m, w.kw));
    case 'tma': return (p.bd || []).length > 0;
    case 'fire': return true;
  }
  return false;
}
function powRun(G, p, w) {
  if (!powCanW(p, w)) return false;
  switch (w.k) {
    case 'ck': p.ck = Math.min(CK_MAX, (p.ck || 0) + w.n); break;
    case 'tech': { const sp = drawSpell(p.t); if (sp) p.hd.push(sp); break; }
    case 'buffr': buff(pickR(pwPool(p, w)), w.a, w.h); break;
    case 'buffall': pwPool(p, w).forEach(m => buff(m, w.a, w.h)); break;
    case 'kw': addF(pickR(p.bd.filter(m => !has(m, w.kw))), w.kw); break;
    case 'tma': p.tma = { a:((p.tma && p.tma.a) || 0) + w.a, h:((p.tma && p.tma.h) || 0) + w.h }; break;
    case 'fire': p.njf = (p.njf || 0) + w.d; break;
  }
  return true;
}
// le pouvoir a-t-il un effet possible maintenant ? (même règles que pow0, sans rien modifier)
function powCan(p, rd) {
  const h = HEROES[p.hero]; if (!h || !h.cost || p.pu || p.g < h.cost) return false;
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
  const targetRound = { 1:2, 2:4, 3:6, 4:8, 5:10 };
  while (p.g >= 3 && OPS.comp(G, p)) {}
  for (let guard = 0; guard < 40; guard++) {
    let acted = false;
    const c = upCost(p);
    if (p.t < 6 && p.g >= c && (G.rd >= targetRound[p.t] || p.g - c >= 3)) { OPS.up(G, p); acted = true; continue; }
    const hc = HEROES[p.hero] && HEROES[p.hero].cost;
    const nonoWait = p.hero === 'nono' && (G.rd < 3 || ((p.fb || 1) < 4 && G.rd < 9));
    if (hc && !nonoWait && !p.pu && p.g >= hc && p.g - hc >= 3 && (p.bd.length || p.hero === 'oren' || p.hero === 'nono')) { if (OPS.pow(G, p)) { acted = true; continue; } }
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
    p.mg = Math.min(10, 2 + G.rd); p.g = p.mg;
    if (p.hero === 'barnabe' && G.rd % 2 === 0) p.g += 1;
    p.uc = Math.max(0, p.uc - 1);
    if (p.fz) { p.fz = false; topUpShop(G, p); } else fillShop(G, p);
    p.pu = false; p.fbq = false; p.njf = 0; p.sylv = false; p.rr = 0; p.rdy = false; p.lastRes = p.res ? p.res.r : null; p.res = null;
    if (p.inc && p.inc.length) p.g += p.inc.shift() || 0;
    trigBoard(G, p, 'sot');
    p.mkt = 0;
    if (inMechAny(G, 'ames') && (p.souls || 0) >= 3) { const k = Math.floor(p.souls / 3); p.souls -= k * 3; withSrc('Moisson d\'âmes', () => p.bd.forEach(m => { if (inMech(G, 'ames', m)) buff(m, k, k); })); }
    if (inMechAny(G, 'chakra')) { const n = p.bd.filter(m => inMech(G, 'chakra', m)).length; if (n) p.ck = Math.min(CK_MAX, (p.ck || 0) + n); }
    // un coffre après chaque combat : meilleur après une victoire, mineur après une égalité ou une défaite
    if (inMechAny(G, 'chakra') && p.lastRes && p.hd.length < 10) p.hd.push({ sp:p.lastRes === 'win' ? (G.rd < 7 ? 'cf_argent' : 'cf_or') : 'cf_bois', u:UID++ });
    { const w = HEROES[p.hero] && HEROES[p.hero].pw; if (w && w.k === 'pck') p.ck = Math.min(CK_MAX, (p.ck || 0) + w.n); if (w && w.k === 'ptech' && G.rd % 2 === 0 && p.hd.length < 10) { const sp = drawSpell(p.t); if (sp) p.hd.push(sp); } }
    p.bd.forEach(m => { delete m.tmp; }); p.tma = null;
  }
  G.ph = 'recruit';
  const live = humansLive(G).length;
  const secs = Math.min(+RU().maxTime || 75, (+RU().time || 35) + G.rd * (+RU().perRound || 0));
  G.end = Date.now() + (live ? secs * 1000 : 1500);
  for (const p of G.ps) if (p.al && p.bot) aiTurn(G, p);
  broadcast();
}
function endRecruit() {
  const G = H.G;
  for (const p of G.ps) if (p.al) {
    const neot = auraTimes(p.bd, 'aura_eot');
    for (const m of p.bd.slice()) for (let r = 0; r < neot; r++) fxOf(m, 'eot').forEach(e => runRecruit(G, p, m, e));
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
    const heat = x => (x.fbq ? (x.fb || 3) : 0) + (x.hero === 'pyra' ? 2 : 0) + (x.njf || 0) + (HEROES[x.hero] && HEROES[x.hero].pw && HEROES[x.hero].pw.k === 'pfire' ? HEROES[x.hero].pw.d : 0);
    const fire = [heat(p), ghost ? 0 : heat(q)];
    const pb = combatBoard(p), qcb = combatBoard(ghost || q);
    elementDuel(pb, qcb);
    const r = simulate(pb, qcb, seed, p.t, qt, fire, G.mx);
    lawsAfterFight(G, p, r, 0); if (!ghost) lawsAfterFight(G, q, r, 1);
    if (!ghost) chakraSteal(p, q, pb, qcb, r);
    const d = Math.min(cap, r.dmg);
    if (r.w === 1) G.pend.push({ pid:p.pid, d });
    if (r.w === 0 && !ghost) G.pend.push({ pid:q.pid, d });
    p.res = { o:qn, r:r.w === 0 ? 'win' : r.w === 1 ? 'loss' : 'draw', d };
    if (!ghost) q.res = { o:p.n, r:r.w === 1 ? 'win' : r.w === 0 ? 'loss' : 'draw', d };
    const base = { rd:G.rd, a:pb.map(fullM), b:qcb.map(fullM), seed, ta:p.t, tb:qt, cap, ha:p.hero, hb:ghost ? ghost.hero : q.hero, fire, mx:G.mx || {} };
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
function elementDuel(a, b) {
  const elOf = bd => { const c = bd.find(isComp); if (c) return compEl(c); const n = {}; bd.forEach(m => { const e = CLAN_EL[CD(m.c).tr]; if (e) n[e] = (n[e] || 0) + 1; }); return Object.keys(n).sort((x, y) => n[y] - n[x])[0] || null; };
  const ea = elOf(a), eb = elOf(b);
  for (const [bd, mine, theirs] of [[a, ea, eb], [b, eb, ea]]) {
    if (!mine || !theirs || EL_DOM[mine] !== theirs) continue;
    bd.filter(isComp).forEach(c => { const x = (c.eq || []).includes('eq_talisman') ? 8 : 4; c.a += x; c.h += x; });
  }
}
// vol de chakra : « Début du combat » (plateaux de départ) et « Râle d'agonie » (serviteurs morts)
function chakraSteal(p, q, pb, qb, r) {
  const n = (b, k) => b.reduce((t, m) => t + (CD(m.c).fxAll || []).filter(e => e.k === k).reduce((u, e) => u + e.n * (m.g ? 2 : 1), 0), 0);
  const dead = (side, k) => r.dead[side].reduce((t, c) => t + ((C[c] && C[c].fxAll) || []).filter(e => e.k === k).reduce((u, e) => u + e.n, 0), 0);
  const take = (from, to, x) => { const v = Math.min(from.ck || 0, x); if (v > 0) { from.ck -= v; to.ck = Math.min(CK_MAX, (to.ck || 0) + v); } };
  take(q, p, n(pb, 'soc_steal') + dead(0, 'dr_steal')); take(p, q, n(qb, 'soc_steal') + dead(1, 'dr_steal'));
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
const smallM = m => { if (m.sp) return { sp:m.sp, u:m.u }; const o = { c:m.c, a:m.a, h:m.h }; if (m.memo) o.memo = m.memo; if (m.el) o.el = m.el; if (m.fu) o.fu = m.fu; if (m.eq && m.eq.length) o.eq = m.eq; if (m.u) o.u = m.u; if (m.g) o.g = 1; if (m.f) o.f = m.f; if (m.tr) o.tr = 1; if (m.x) o.x = m.x; if (m.tmp) o.tmp = m.tmp; if (m.bn) o.bn = m.bn; return o; };
const fullM = m => { const o = { c:m.c, a:m.a, h:m.h, g:m.g || 0, f:m.f || '', u:m.u }; if (m.x) o.x = m.x; return o; };
function pubData() {
  const G = H.G;
  if (!G) return { ph:'lobby', code:H.code, cv:CAT_REV, us:(V.univSel || []).slice(), pl:H.roster.map(r => ({ n:r.n, pe:r.peer })), last:H.last || null };
  return { ph:G.ph, rd:G.rd, rem:Math.max(0, G.end - Date.now()), code:H.code, cv:CAT_REV, trs:G.trs, ban:G.ban, univ:G.univ, laws:G.laws || [], mhp:(+RU().hp || 40) + 10,
    pl:G.ps.map(p => ({ pid:p.pid, n:p.n, hp:p.hp, t:p.t, ai:!p.human, bot:p.bot, al:p.al, pl:p.place, r:p.rdy, h:p.hero, pe:p.peer, nb:p.bd.length })) };
}
function privData(p) {
  return { to:p.peer, pid:p.pid, g:p.g, mg:p.mg, t:p.t, uc:upCost(p), sh:p.sh.map(smallM), bd:p.bd.map(smallM), hd:p.hd.map(smallM),
    fz:p.fz, pu:p.pu, fb:p.fb || 3, spc:p.sp && SPELLS[p.sp.sp] ? spCost(p, SPELLS[p.sp.sp]) : null, cb:p.cb || 0, cid:compOf(p.hero), sp:p.sp ? p.sp.sp : null, disc:p.disc ? p.disc.map(smallM) : null, inc:(p.inc && p.inc[0]) || 0, tma:p.tma || null, souls:p.souls || 0, ck:p.ck || 0, mkt:p.mkt || 0, rd:H.G ? H.G.rd : 0, hero:p.hero, ho:p.ho, rdy:p.rdy, rr:p.rr, res:p.res, hp:p.hp };
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
