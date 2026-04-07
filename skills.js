// skills.js - Death's Armada Képesség Rendszer
const SKILLS_DATA = {
    "Harcos": {
        "manaPool": 50,
        "skills": [
            { name: "Pajzsütés", cost: 15, cd: 1, power: 1.2, effect: "Kábítás (1 kör)", type: "basic" },
            { name: "Vérszomj", cost: 20, cd: 2, power: 1.5, effect: "Öngyógyítás 10% HP", type: "basic" },
            { name: "Birodalmi Roham", cost: 40, cd: 5, power: 2.5, effect: "Páncéláttörés", type: "ultimate", maxUses: 1 }
        ]
    },
    "Mágus": {
        "manaPool": 150,
        "skills": [
            { name: "Tűzgolyó", cost: 30, cd: 1, power: 1.8, effect: "Égetés", type: "basic" },
            { name: "Jégcsap", cost: 25, cd: 2, power: 1.4, effect: "Lassítás (-2 Def)", type: "basic" },
            { name: "Apokalipszis", cost: 80, cd: 6, power: 3.5, effect: "Területi sebzés", type: "ultimate", maxUses: 1 }
        ]
    },
    "Lovag": {
        "manaPool": 60,
        "skills": [
            { name: "Szent Csapás", cost: 20, cd: 1, power: 1.3, effect: "Vakítás", type: "basic" },
            { name: "Védelmező Aura", cost: 30, cd: 3, power: 0, effect: "+5 Def (2 kör)", type: "basic" },
            { name: "Égi Ítélet", cost: 50, cd: 5, power: 2.2, effect: "Sebzés + Full Heal", type: "ultimate", maxUses: 1 }
        ]
    },
    "Íjász": {
        "manaPool": 70,
        "skills": [
            { name: "Mérgezett Nyíl", cost: 20, cd: 1, power: 1.2, effect: "Méreg (3 kör)", type: "basic" },
            { name: "Sólyomszem", cost: 25, cd: 2, power: 1.6, effect: "Garantált Kritikus", type: "basic" },
            { name: "Nyíleső", cost: 50, cd: 5, power: 2.8, effect: "Kitérés csökkentés", type: "ultimate", maxUses: 1 }
        ]
    },
    "Bérgyilkos": {
        "manaPool": 80,
        "skills": [
            { name: "Hátbaszúrás", cost: 25, cd: 1, power: 2.0, effect: "Vérzés", type: "basic" },
            { name: "Füstbomba", cost: 30, cd: 3, power: 0, effect: "Láthatatlanság (1 kör)", type: "basic" },
            { name: "Halálos Tánc", cost: 60, cd: 6, power: 4.0, effect: "Azonnali kivégzés 15% HP alatt", type: "ultimate", maxUses: 1 }
        ]
    },
    "Nekromanta": {
        "manaPool": 120,
        "skills": [
            { name: "Léleknyíl", cost: 25, cd: 1, power: 1.4, effect: "Mana elszívás", type: "basic" },
            { name: "Csontfal", cost: 35, cd: 3, power: 0, effect: "Sebzés elnyelés", type: "basic" },
            { name: "Holtak Serege", cost: 90, cd: 7, power: 3.0, effect: "Ellenfél sebzésének felezése", type: "ultimate", maxUses: 1 }
        ]
    }
};
