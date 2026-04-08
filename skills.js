/**
 * Death's Armada - Hős Képességek Adatbázisa v2.0
 * Konzisztens elnevezések, mana költségek és sebzési szorzók.
 */

const SKILLS_DATA = {
    "Harcos": {
        "manaPool": 50,
        "skills": [
            { 
                name: "Pajzsütés", 
                cost: 15, 
                cd: 1, 
                power: 1.2, 
                txt: "A harcos nehéz pajzsával arcba vágja az ellenséget, aki megszédül a brutális csapástól." 
            },
            { 
                name: "Vérszomj", 
                cost: 20, 
                cd: 2, 
                power: 1.5, 
                txt: "Minden vágással életerőt szívsz el, miközben ellenfeled sebei vérezni kezdenek." 
            },
            { 
                name: "Birodalmi Roham", 
                cost: 40, 
                cd: 99, 
                power: 2.5, 
                txt: "Megállíthatatlan roham, ami áttöri a legerősebb páncélt is. (Csak egyszer használható!)" 
            }
        ]
    },
    "Mágus": {
        "manaPool": 150,
        "skills": [
            { 
                name: "Tűzgolyó", 
                cost: 30, 
                cd: 1, 
                power: 1.8, 
                txt: "Koncentrált mágikus lángok, melyek elevenen porrá égetik az ellenség húsát." 
            },
            { 
                name: "Jégcsap", 
                cost: 25, 
                cd: 2, 
                power: 1.4, 
                txt: "Fagyos tüske, ami jégbe zárja az ellenség minden mozdulatát." 
            },
            { 
                name: "Apokalipszis", 
                cost: 80, 
                cd: 99, 
                power: 3.5, 
                txt: "Megnyílik az ég, izzó meteorok hullanak alá. Ez a végítélet pillanata!" 
            }
        ]
    },
    "Lovag": {
        "manaPool": 60,
        "skills": [
            { 
                name: "Szent Csapás", 
                cost: 20, 
                cd: 1, 
                power: 1.3, 
                txt: "Isteni fény kíséretében sújtasz le, megtisztítva a bűnösöket." 
            },
            { 
                name: "Védelmező Aura", 
                cost: 30, 
                cd: 3, 
                power: 0.5, 
                txt: "Isteni pajzs vonja körbe a lovagot, ami elnyeli a beérkező csapások egy részét." 
            },
            { 
                name: "Égi Ítélet", 
                cost: 50, 
                cd: 99, 
                power: 2.2, 
                txt: "A mennyek haragja sújt le, miközben a hit ereje összeforrasztja sebeidet." 
            }
        ]
    },
    "Íjász": {
        "manaPool": 70,
        "skills": [
            { 
                name: "Mérgezett Nyíl", 
                cost: 20, 
                cd: 1, 
                power: 1.2, 
                txt: "A nyíl hegyén lévő méreg lassan emészti fel az ellenség életerejét." 
            },
            { 
                name: "Sólyomszem", 
                cost: 25, 
                cd: 2, 
                power: 1.6, 
                txt: "Tökéletes célzás, ami áthatol a legkisebb réseken is a páncélzaton." 
            },
            { 
                name: "Nyíleső", 
                cost: 50, 
                cd: 99, 
                power: 2.8, 
                txt: "Vesszők százai lepik el a csatateret, nincs hová menekülni az égi áldás elől." 
            }
        ]
    },
    "Bérgyilkos": {
        "manaPool": 80,
        "skills": [
            { 
                name: "Hátbaszúrás", 
                cost: 25, 
                cd: 1, 
                power: 2.0, 
                txt: "Az árnyakból előbukkanva tőreidet mélyen az ellenfél bordái közé döföd." 
            },
            { 
                name: "Füstbomba", 
                cost: 30, 
                cd: 3, 
                power: 0.8, 
                txt: "Sötét füst marad utánad, amiből váratlanul sújtasz le újra." 
            },
            { 
                name: "Halálos Tánc", 
                cost: 60, 
                cd: 99, 
                power: 4.0, 
                txt: "Villámgyors vágások sorozata, ami azonnal véget vet a földi szenvedésnek." 
            }
        ]
    },
    "Nekromanta": {
        "manaPool": 120,
        "skills": [
            { 
                name: "Léleknyíl", 
                cost: 25, 
                cd: 1, 
                power: 1.4, 
                txt: "Kínzott lelkek sikolya kíséri a sötét energiát, ami az ellenség húsába mar." 
            },
            { 
                name: "Életelszívás", 
                cost: 40, 
                cd: 4, 
                power: 1.1, 
                txt: "Sötét kötelék alakul ki: az ellenség életereje közvetlenül téged táplál." 
            },
            { 
                name: "Holtak Serege", 
                cost: 90, 
                cd: 99, 
                power: 3.2, 
                txt: "A sírok megnyílnak, és a feltámasztott holtak serege lerohanja a célpontot." 
            }
        ]
    }
};

// --- BIZTONSÁGI MÁSOLATOK (Ékezet nélküli kulcsok a hibák elkerülésére) ---
SKILLS_DATA["Ijász"] = SKILLS_DATA["Íjász"];
SKILLS_DATA["Magus"] = SKILLS_DATA["Mágus"];
SKILLS_DATA["Bergyilkos"] = SKILLS_DATA["Bérgyilkos"];

if (typeof module !== 'undefined') {
    module.exports = SKILLS_DATA;
}
