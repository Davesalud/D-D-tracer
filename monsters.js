const MONSTERS = {
    easy: [
        { id: "veszett_kutya", name: "Veszett Kutya", hp: 85, maxHp: 85, atk: 14, def: 4, gold: 5, xp: 15, image: "https://i.ibb.co/PvSwKyJx/Copilot-20260409-202938.png", passiveName: "Veszett düh", passiveDesc: "20% HP alatt sebzés +2", passiveLogic: "enrage_20" },
        { id: "patkanyraj", name: "Patkányraj", hp: 66, maxHp: 66, atk: 10, def: 3, gold: 4, xp: 12, image: "https://i.ibb.co/1YsWLbWD/Copilot-20260409-202953.png", passiveName: "Sereghatás", passiveDesc: "Körönként kétszer sebez", passiveLogic: "double_attack" },
        { id: "csontvaz", name: "Csontváz", hp: 94, maxHp: 94, atk: 17, def: 7, gold: 6, xp: 20, image: "https://i.ibb.co/gM5dwp8f/Copilot-20260409-203247.png", passiveName: "Csontvázszerkezet", passiveDesc: "Távolsági sebzés -20%", passiveLogic: "arrow_resist" },
        { id: "goblin", name: "Goblin", hp: 75, maxHp: 75, atk: 19, def: 4, gold: 8, xp: 18, image: "https://i.ibb.co/Gf4R1tQS/Copilot-20260409-211658.png", passiveName: "Gyávaság", passiveDesc: "Balszerencse esetén nem támad", passiveLogic: "cowardice" },
        { id: "bandita", name: "Bandita", hp: 112, maxHp: 112, atk: 22, def: 9, gold: 12, xp: 25, image: "https://i.ibb.co/DDMVJ1FS/Copilot-20260409-211740.png", passiveName: "Zsebmetszés", passiveDesc: "Ellop 1 aranyat minden ütésnél", passiveLogic: "steal_gold" },
        { id: "zombi", name: "Zombi", hp: 141, maxHp: 141, atk: 14, def: 3, gold: 5, xp: 22, image: "placeholder_link", passiveName: "Holtak nyugalma", passiveDesc: "Immunis a kábításra", passiveLogic: "stun_immune" },
        { id: "oriaspok", name: "Óriáspók", hp: 104, maxHp: 104, atk: 19, def: 7, gold: 7, xp: 24, image: "placeholder_link", passiveName: "Hálócsapda", passiveDesc: "10% esély körkihagyásra", passiveLogic: "web_trap" },
        { id: "mocsari_iszap", name: "Mocsári Iszap", hp: 131, maxHp: 131, atk: 12, def: 4, gold: 6, xp: 20, image: "placeholder_link", passiveName: "Amorf test", passiveDesc: "Kritikus ütés ellen védett", passiveLogic: "crit_immune" },
        { id: "denever", name: "Denevér", hp: 56, maxHp: 56, atk: 12, def: 3, gold: 3, xp: 10, image: "placeholder_link", passiveName: "Szonár", passiveDesc: "30% kitérés", passiveLogic: "dodge_30" },
        { id: "fiatal_farkas", name: "Fiatal Farkas", hp: 94, maxHp: 94, atk: 17, def: 7, gold: 5, xp: 18, image: "placeholder_link", passiveName: "Falkaösztön", passiveDesc: "+1 védelem a játékos körében", passiveLogic: "pack_defense" }
    ],
    medium: [
        { id: "pancelos_lovag", name: "Páncélos Lovag", hp: 165, maxHp: 165, atk: 22, def: 13, gold: 30, xp: 60, image: "placeholder_link", passiveName: "Acélfal", passiveDesc: "Fix -3 sebzés csökkentés", passiveLogic: "flat_reduction_3" },
        { id: "hegyi_troll", name: "Hegyi Troll", hp: 220, maxHp: 220, atk: 27, def: 7, gold: 35, xp: 75, image: "placeholder_link", passiveName: "Regeneráció", passiveDesc: "Körönként +5 HP", passiveLogic: "regen_5" },
        { id: "tuz_elemental", name: "Tűz-elementál", hp: 143, maxHp: 143, atk: 32, def: 5, gold: 40, xp: 80, image: "placeholder_link", passiveName: "Perzselő aura", passiveDesc: "Körönként -2 HP a játékosnak", passiveLogic: "burn_aura" },
        { id: "ork_vezer", name: "Ork Vezér", hp: 198, maxHp: 198, atk: 29, def: 10, gold: 45, xp: 90, image: "placeholder_link", passiveName: "Vérszomj", passiveDesc: "Alacsony HP-nál kritikus esély", passiveLogic: "low_hp_crit" },
        { id: "arnyeklovas", name: "Árnyéklovas", hp: 154, maxHp: 154, atk: 25, def: 8, gold: 50, xp: 100, image: "placeholder_link", passiveName: "Árnyékfátyol", passiveDesc: "A d20 dobások 25%-kal hibáznak", passiveLogic: "miss_chance_25" },
        { id: "harpia", name: "Hárpia", hp: 132, maxHp: 132, atk: 23, def: 7, gold: 30, xp: 70, image: "placeholder_link", passiveName: "Sikoly", passiveDesc: "3. körönként elnémít", passiveLogic: "silence_3" },
        { id: "verfarkas", name: "Vérfarkas", hp: 176, maxHp: 176, atk: 25, def: 8, gold: 40, xp: 85, image: "placeholder_link", passiveName: "Holdkóros", passiveDesc: "50% HP alatt d12 sebzés", passiveLogic: "d12_enrage" },
        { id: "gorgo", name: "Gorgó", hp: 154, maxHp: 154, atk: 27, def: 9, gold: 45, xp: 95, image: "placeholder_link", passiveName: "Kővé dermesztés", passiveDesc: "D20 dobás utáni lefagyás", passiveLogic: "stun_on_d20" },
        { id: "mumia", name: "Múmia", hp: 187, maxHp: 187, atk: 20, def: 12, gold: 35, xp: 80, image: "placeholder_link", passiveName: "A fáraó átka", passiveDesc: "A következő sebzés felezőodik", passiveLogic: "half_dmg_curse" },
        { id: "liderc", name: "Lidérc", hp: 110, maxHp: 110, atk: 36, def: 3, gold: 50, xp: 110, image: "placeholder_link", passiveName: "Testetlenség", passiveDesc: "Csak a Mana alapú sebek érnek 100%-ot", passiveLogic: "mana_only_dmg" }
    ],
    hard: [
        { id: "vampirur", name: "Vámpírúr", hp: 357, maxHp: 357, atk: 28, def: 13, gold: 150, xp: 300, image: "placeholder_link", passiveName: "Életszívás", passiveDesc: "Sebzés 30%-át visszakapja", passiveLogic: "lifesteal_30" },
        { id: "kuklopsz", name: "Küklopsz", hp: 510, maxHp: 510, atk: 39, def: 17, gold: 200, xp: 400, image: "placeholder_link", passiveName: "Zúzó ütés", passiveDesc: "D20-nál pajzs összetörik", passiveLogic: "shield_break" },
        { id: "csontvaz_sarkany", name: "Csontváz Sárkány", hp: 459, maxHp: 459, atk: 33, def: 20, gold: 250, xp: 500, image: "placeholder_link", passiveName: "Csontvihar", passiveDesc: "5 körönként full Cooldown", passiveLogic: "mass_cd" },
        { id: "sotet_varazslo", name: "Sötét Varázsló", hp: 306, maxHp: 306, mana: 200, maxMana: 200, atk: 44, def: 11, gold: 300, xp: 600, image: "placeholder_link", passiveName: "Mágikus pajzs", passiveDesc: "A Mana védi a HP-t", passiveLogic: "mana_shield" },
        { id: "golem", name: "Gólem", hp: 612, maxHp: 612, atk: 28, def: 28, gold: 180, xp: 450, image: "placeholder_link", passiveName: "Sziklafal", passiveDesc: "Csak 15 feletti d20 sebzi", passiveLogic: "hard_skin_15" },
        { id: "kimera", name: "Kiméra", hp: 408, maxHp: 408, atk: 31, def: 15, gold: 220, xp: 550, image: "placeholder_link", passiveName: "Háromfejű", passiveDesc: "Sebzés/Gyógyulás/Pajzs körönként", passiveLogic: "tri_action" },
        { id: "cerberus", name: "Cerberus", hp: 428, maxHp: 428, atk: 35, def: 13, gold: 200, xp: 500, image: "placeholder_link", passiveName: "Pokoltűz", passiveDesc: "3 körös -5 HP égetés", passiveLogic: "burn_dot_5" },
        { id: "liderc_kiraly", name: "Lidérc király", hp: 388, maxHp: 388, atk: 33, def: 17, gold: 280, xp: 650, image: "placeholder_link", passiveName: "Lélekidézés", passiveDesc: "Egyszer feltámad 1 HP-val", passiveLogic: "revive_once" },
        { id: "orias_skorpio", name: "Óriás Skorpió", hp: 459, maxHp: 459, atk: 31, def: 22, gold: 150, xp: 400, image: "placeholder_link", passiveName: "Halálos méreg", passiveDesc: "10 kör után azonnali vereség", passiveLogic: "death_timer_10" },
        { id: "elatkozott_pancel", name: "Elátkozott Páncél", hp: 561, maxHp: 561, atk: 22, def: 33, gold: 180, xp: 450, image: "placeholder_link", passiveName: "Visszaverés", passiveDesc: "A sebzés 15%-át visszaadja", passiveLogic: "reflect_15" }
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
