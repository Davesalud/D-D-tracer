/**
 * Death's Armada - Hős Képességek Adatbázisa
 * Tartalmazza a mana poolokat, sebzési szorzókat és hangulati leírásokat.
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
                txt: "Minden vágással életerőt szívsz el, miközben ellenfeled sebei csúnyán vérezni kezdenek." 
            },
            { 
                name: "Birodalmi Roham", 
                cost: 40, 
                cd: 99, 
                power: 2.5, 
                txt: "A birodalom dicsőségéért! Megállíthatatlan roham, ami áttöri a legerősebb páncélt is." 
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
                txt: "Fagyos tüske repül a célpont felé, ami jégbe zárja az ellenség minden mozdulatát." 
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
                txt: "A lovag megfogja a kardját és isteni fény kíséretében arányosan nagyot sebez ellenfelére." 
            },
            { 
                name: "Védelmező Aura", 
                cost: 30, 
                cd: 3, 
                power: 0.5, 
                txt: "Isteni pajzs vonja körbe a lovagot, ami elnyeli és visszaveri a beérkező csapásokat." 
            },
            { 
                name: "Égi Ítélet", 
                cost: 50, 
                cd: 99, 
                power: 2.2, 
                txt: "A mennyek haragja sújt le, miközben a hit ereje összeforrasztja a lovag sebeit." 
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
                txt: "Sötét füst marad utánad, amiből váratlanul sújtasz le az összezavarodott célpontra." 
            },
            { 
                name: "Halálos Tánc", 
                cost: 60, 
                cd: 99, 
                power: 4.0, 
                txt: "Villámgyors vágások sorozata, ami azonnal véget vet minden földi szenvedésnek." 
            }
        ]
    }
};

// Ha véletlenül Node.js környezetben is használnád (opcionális)
if (typeof module !== 'undefined') {
    module.exports = SKILLS_DATA;
}
