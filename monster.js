const MONSTERS = {
    easy: [
        { id: "veszett_kutya", name: "Veszett Kutya", hp: 50, maxHp: 50, atk: 6, def: 2, gold: 5, xp: 15, image: "placeholder_link", passiveName: "Veszett düh", passiveDesc: "20% HP alatt sebzés +2", passiveLogic: "enrage_20" },
        { id: "patkanyraj", name: "Patkányraj", hp: 39, maxHp: 39, atk: 4, def: 1, gold: 4, xp: 12, image: "placeholder_link", passiveName: "Sereghatás", passiveDesc: "Körönként kétszer sebez", passiveLogic: "double_attack" },
        { id: "csontvaz", name: "Csontváz", hp: 55, maxHp: 55, atk: 7, def: 3, gold: 6, xp: 20, image: "placeholder_link", passiveName: "Csontvázszerkezet", passiveDesc: "Távolsági sebzés -20%", passiveLogic: "arrow_resist" },
        { id: "goblin", name: "Goblin", hp: 44, maxHp: 44, atk: 8, def: 2, gold: 8, xp: 18, image: "placeholder_link", passiveName: "Gyávaság", passiveDesc: "Balszerencse esetén nem támad", passiveLogic: "cowardice" },
        { id: "bandita", name: "Bandita", hp: 66, maxHp: 66, atk: 9, def: 4, gold: 12, xp: 25, image: "placeholder_link", passiveName: "Zsebmetszés", passiveDesc: "Ellop 1 aranyat minden ütésnél", passiveLogic: "steal_gold" },
        { id: "zombi", name: "Zombi", hp: 83, maxHp: 83, atk: 6, def: 1, gold: 5, xp: 22, image: "placeholder_link", passiveName: "Holtak nyugalma", passiveDesc: "Immunis a kábításra", passiveLogic: "stun_immune" },
        { id: "oriaspok", name: "Óriáspók", hp: 61, maxHp: 61, atk: 8, def: 3, gold: 7, xp: 24, image: "placeholder_link", passiveName: "Hálócsapda", passiveDesc: "10% esély körkihagyásra", passiveLogic: "web_trap" },
        { id: "mocsari_iszap", name: "Mocsári Iszap", hp: 77, maxHp: 77, atk: 5, def: 2, gold: 6, xp: 20, image: "placeholder_link", passiveName: "Amorf test", passiveDesc: "Kritikus ütés ellen védett", passiveLogic: "crit_immune" },
        { id: "denever", name: "Denevér", hp: 33, maxHp: 33, atk: 5, def: 1, gold: 3, xp: 10, image: "placeholder_link", passiveName: "Szonár", passiveDesc: "30% kitérés", passiveLogic: "dodge_30" },
        { id: "fiatal_farkas", name: "Fiatal Farkas", hp: 55, maxHp: 55, atk: 7, def: 3, gold: 5, xp: 18, image: "placeholder_link", passiveName: "Falkaösztön", passiveDesc: "+1 védelem a játékos körében", passiveLogic: "pack_defense" }
    ],
    medium: [
        { id: "pancelos_lovag", name: "Páncélos Lovag", hp: 150, maxHp: 150, atk: 12, def: 10, gold: 30, xp: 60, image: "placeholder_link", passiveName: "Acélfal", passiveDesc: "Fix -3 sebzés csökkentés", passiveLogic: "flat_reduction_3" },
        { id: "hegyi_troll", name: "Hegyi Troll", hp: 200, maxHp: 200, atk: 15, def: 5, gold: 35, xp: 75, image: "placeholder_link", passiveName: "Regeneráció", passiveDesc: "Körönként +5 HP", passiveLogic: "regen_5" },
        { id: "tuz_elemental", name: "Tűz-elementál", hp: 130, maxHp: 130, atk: 18, def: 4, gold: 40, xp: 80, image: "placeholder_link", passiveName: "Perzselő aura", passiveDesc: "Körönként -2 HP a játékosnak", passiveLogic: "burn_aura" },
        { id: "ork_vezer", name: "Ork Vezér", hp: 180, maxHp: 180, atk: 16, def: 8, gold: 45, xp: 90, image: "placeholder_link", passiveName: "Vérszomj", passiveDesc: "Alacsony HP-nál kritikus esély", passiveLogic: "low_hp_crit" },
        { id: "arnyeklovas", name: "Árnyéklovas", hp: 140, maxHp: 140, atk: 14, def: 6, gold: 50, xp: 100, image: "placeholder_link", passiveName: "Árnyékfátyol", passiveDesc: "A d20 dobások 25%-kal hibáznak", passiveLogic: "miss_chance_25" },
        { id: "harpia", name: "Hárpia", hp: 120, maxHp: 120, atk: 13, def: 5, gold: 30, xp: 70, image: "placeholder_link", passiveName: "Sikoly", passiveDesc: "3. körönként elnémít", passiveLogic: "silence_3" },
        { id: "verfarkas", name: "Vérfarkas", hp: 160, maxHp: 160, atk: 14, def: 6, gold: 40, xp: 85, image: "placeholder_link", passiveName: "Holdkóros", passiveDesc: "50% HP alatt d12 sebzés", passiveLogic: "d12_enrage" },
        { id: "gorgo", name: "Gorgó", hp: 140, maxHp: 140, atk: 15, def: 7, gold: 45, xp: 95, image: "placeholder_link", passiveName: "Kővé dermesztés", passiveDesc: "D20 dobás utáni lefagyás", passiveLogic: "stun_on_d20" },
        { id: "mumia", name: "Múmia", hp: 170, maxHp: 170, atk: 11, def: 9, gold: 35, xp: 80, image: "placeholder_link", passiveName: "A fáraó átka", passiveDesc: "A következő sebzés feleződik", passiveLogic: "half_dmg_curse" },
        { id: "liderc", name: "Lidérc", hp: 100, maxHp: 100, atk: 20, def: 2, gold: 50, xp: 110, image: "placeholder_link", passiveName: "Testetlenség", passiveDesc: "Csak a Mana alapú sebek érnek 100%-ot", passiveLogic: "mana_only_dmg" }
    ],
    hard: [
        { id: "vampirur", name: "Vámpírúr", hp: 350, maxHp: 350, atk: 25, def: 12, gold: 150, xp: 300, image: "placeholder_link", passiveName: "Életszívás", passiveDesc: "Sebzés 30%-át visszakapja", passiveLogic: "lifesteal_30" },
        { id: "kuklopsz", name: "Küklopsz", hp: 500, maxHp: 500, atk: 35, def: 15, gold: 200, xp: 400, image: "placeholder_link", passiveName: "Zúzó ütés", passiveDesc: "D20-nál pajzs összetörik", passiveLogic: "shield_break" },
        { id: "csontvaz_sarkany", name: "Csontváz Sárkány", hp: 450, maxHp: 450, atk: 30, def: 18, gold: 250, xp: 500, image: "placeholder_link", passiveName: "Csontvihar", passiveDesc: "5 körönként full Cooldown", passiveLogic: "mass_cd" },
        { id: "sotet_varazslo", name: "Sötét Varázsló", hp: 300, maxHp: 300, mana: 200, maxMana: 200, atk: 40, def: 10, gold: 300, xp: 600, image: "placeholder_link", passiveName: "Mágikus pajzs", passiveDesc: "A Mana védi a HP-t", passiveLogic: "mana_shield" },
        { id: "golem", name: "Gólem", hp: 600, maxHp: 600, atk: 25, def: 25, gold: 180, xp: 450, image: "placeholder_link", passiveName: "Sziklafal", passiveDesc: "Csak 15 feletti d20 sebzi", passiveLogic: "hard_skin_15" },
        { id: "kimera", name: "Kiméra", hp: 400, maxHp: 400, atk: 28, def: 14, gold: 220, xp: 550, image: "placeholder_link", passiveName: "Háromfejű", passiveDesc: "Sebzés/Gyógyulás/Pajzs körönként", passiveLogic: "tri_action" },
        { id: "cerberus", name: "Cerberus", hp: 420, maxHp: 420, atk: 32, def: 12, gold: 200, xp: 500, image: "placeholder_link", passiveName: "Pokoltűz", passiveDesc: "3 körös -5 HP égetés", passiveLogic: "burn_dot_5" },
        { id: "liderc_kiraly", name: "Lidérc király", hp: 380, maxHp: 380, atk: 30, def: 15, gold: 280, xp: 650, image: "placeholder_link", passiveName: "Lélekidézés", passiveDesc: "Egyszer feltámad 1 HP-val", passiveLogic: "revive_once" },
        { id: "orias_skorpio", name: "Óriás Skorpió", hp: 450, maxHp: 450, atk: 28, def: 20, gold: 150, xp: 400, image: "placeholder_link", passiveName: "Halálos méreg", passiveDesc: "10 kör után azonnali vereség", passiveLogic: "death_timer_10" },
        { id: "elatkozott_pancel", name: "Elátkozott Páncél", hp: 550, maxHp: 550, atk: 20, def: 30, gold: 180, xp: 450, image: "placeholder_link", passiveName: "Visszaverés", passiveDesc: "A sebzés 15%-át visszaadja", passiveLogic: "reflect_15" }
    ],
    boss: [
        { id: "voros_sarkany", name: "Vörös Sárkány", hp: 1500, maxHp: 1500, atk: 80, def: 50, gold: 2000, xp: 5000, image: "placeholder_link", passiveName: "Sárkánypikkely", passiveDesc: "Immunis a d10-re, csak d20 sebzi", passiveLogic: "d20_only" },
        { id: "ido_ura", name: "Az Idő Ura", hp: 1200, maxHp: 1200, atk: 70, def: 40, gold: 2500, xp: 6000, image: "placeholder_link", passiveName: "Időhurok", passiveDesc: "4 körönként HP visszatöltés", passiveLogic: "time_rewind_4" },
        { id: "kaosz_lovag", name: "Káosz Lovag", hp: 1400, maxHp: 1400, atk: 75, def: 45, gold: 3000, xp: 7000, image: "placeholder_link", passiveName: "Tükörkép", passiveDesc: "50% eséllyel visszalövi a skilledet", passiveLogic: "mirror_skill_50" }
    ]
};

function getRandomMonster(difficulty) {
    const list = MONSTERS[difficulty];
    return { ...list[Math.floor(Math.random() * list.length)] };
}
