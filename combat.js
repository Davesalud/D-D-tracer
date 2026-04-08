/**
 * Death's Armada - Harci Motor v1.4
 * Minden harci logika egy helyen: kockák, sebzés, páncél, skillek, taktikák.
 */

const CombatEngine = {
    
    // --- 1. UNIVERZÁLIS KOCKADOBÓ ---
    // Kezeli a sima és a többkockás (pl. 2d10) dobásokat is
    roll: function(count = 1, sides = 20, bonus = 0) {
        let total = 0;
        let rolls = [];
        
        for (let i = 0; i < count; i++) {
            let r = Math.floor(Math.random() * sides) + 1;
            rolls.push(r);
            total += r;
        }
        
        return {
            total: total + bonus,
            rolls: rolls,
            // Megjelenítés: "15" vagy "15 (7+8)" ha több kocka van
            display: (count > 1) ? `${total + bonus} (${rolls.join('+')})` : `${total + bonus}`
        };
    },

    // --- 2. FIZIKAI TÁMADÁS SZÁMÍTÁSA ---
    // Figyelembe veszi: Támadó ereje, Védő páncélja, Kritikus dobás, Aktív védekezés
    calculatePhysicalDamage: function(attacker, defender) {
        // A játékos mindig D20-szal dob a találathoz/kritikushoz
        const diceResult = this.roll(1, 20);
        const roll = diceResult.total;
        const isCrit = roll === 20;
        
        let baseDmg;
        // SZÖRNY LOGIKA: Ha a támadó szörny, 2d10-et használ
        if (attacker.isMonster) {
            const monsterDice = this.roll(2, 10);
            baseDmg = monsterDice.total + (attacker.atk * 0.5);
        } else {
            // JÁTÉKOS LOGIKA: ATK + véletlenszerű variancia
            baseDmg = attacker.atk * (0.8 + Math.random() * 0.4);
            if (isCrit) baseDmg *= 2.5; // Kritikus szorzó
        }

        // --- VÉDELEM ÉS AKTÍV VÉDEKEZÉS ---
        let effectiveDef = defender.def || 0;
        
        // Ha a védő 'isDefending' állapotban van, a védelme megduplázódik
        if (defender.isDefending) {
            effectiveDef *= 2; 
        }

        // Sebzés csökkentés mértéke (DEF / 100), maximum 85%-ot foghat fel
        const maxMitigation = defender.isDefending ? 0.90 : 0.80;
        const reduction = Math.min(maxMitigation, effectiveDef / 100);
        
        const finalDmg = Math.max(1, Math.floor(baseDmg * (1 - reduction)));
        
        return {
            damage: finalDmg,
            isCrit: isCrit,
            roll: diceResult.display // Ezt küldjük a UI-nak
        };
    },

    // --- 3. KÉPESSÉGEK (SPELLS) SZÁMÍTÁSA ---
    calculateSkillEffect: function(attacker, defender, skill) {
        // Skilleknél a power szorzót használjuk
        let rawDmg = Math.floor(attacker.atk * skill.power * (0.9 + Math.random() * 0.2));
        
        // A skillek ellen a védekezés 50%-kal hatékonyabb (nem duplázódik, mint a sima ütésnél)
        let effectiveDef = defender.def || 0;
        if (defender.isDefending) effectiveDef *= 1.5;

        const reduction = Math.min(0.85, effectiveDef / 100);
        let finalDmg = Math.max(1, Math.floor(rawDmg * (1 - reduction)));

        let effect = {
            damage: finalDmg,
            healing: 0,
            buff: null,
            logMsg: ""
        };

        // --- OSZTÁLY-SPECIFIKUS EXTRA HATÁSOK ---
        switch(attacker.class) {
            case "Nekromanta":
                if (skill.name === "Életelszívás") {
                    effect.healing = Math.floor(finalDmg * 0.8);
                    effect.logMsg = "életerőt szívott el!";
                }
                break;
            case "Lovag":
                if (skill.name === "Védelmező Aura") {
                    effect.buff = { stat: "def", value: 20 };
                    effect.logMsg = "páncélja felragyogott!";
                }
                break;
            case "Bérgyilkos":
                if (skill.name === "Mérgezett Tőr") {
                    // Itt később lehetne 'poison' státusz effekt
                    effect.logMsg = "mély sebet ejtett!";
                }
                break;
        }

        return effect;
    }
};
