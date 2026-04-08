/**
 * Death's Armada - Harci Motor v1.4
 * Kockadobás, Sebzés, Védelem és Védekezési állapot kezelése.
 */

const CombatEngine = {
    
    // Univerzális kockadobó (kezeli a 2d10-et is a szörnyeknek)
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
            display: (count > 1) ? `${total + bonus} (${rolls.join('+')})` : `${total + bonus}`
        };
    },

    // Fizikai támadás számítása
    calculatePhysicalDamage: function(attacker, defender) {
        // Alapértelmezett játékos dobás (D20 a kritikushoz)
        const diceResult = this.roll(1, 20);
        const roll = diceResult.total;
        const isCrit = roll === 20;
        
        let baseDmg;
        if (attacker.isMonster) {
            // Szörny dobás: 2d10 + az ereje fele
            const monsterDice = this.roll(2, 10);
            baseDmg = monsterDice.total + (attacker.atk * 0.5);
        } else {
            // Játékos alap sebzés varianciával
            baseDmg = attacker.atk * (0.8 + Math.random() * 0.4);
            if (isCrit) baseDmg *= 2.5;
        }

        // --- AKTÍV VÉDEKEZÉS LOGIKA ---
        let effectiveDef = defender.def || 0;
        if (defender.isDefending) {
            effectiveDef *= 2; // Védekezéskor dupla páncél
        }

        const cap = defender.isDefending ? 0.9 : 0.8; // Magasabb limit védekezéskor
        const reduction = Math.min(cap, effectiveDef / 100);
        const finalDmg = Math.max(1, Math.floor(baseDmg * (1 - reduction)));
        
        return {
            damage: finalDmg,
            isCrit: isCrit,
            roll: (attacker.isMonster && !isCrit) ? this.roll(2,10).display : diceResult.display
        };
    },

    // Képességek hatásának számítása
    calculateSkillEffect: function(attacker, defender, skill) {
        let rawDmg = Math.floor(attacker.atk * skill.power * (0.9 + Math.random() * 0.2));
        
        let effectiveDef = defender.def || 0;
        if (defender.isDefending) effectiveDef *= 1.5; // Skillek ellen is segít a védekezés

        const reduction = Math.min(0.85, effectiveDef / 100);
        let finalDmg = Math.max(1, Math.floor(rawDmg * (1 - reduction)));

        let effect = {
            damage: finalDmg,
            healing: 0,
            buff: null,
            logMsg: ""
        };

        // Speciális osztály-effektek
        if(attacker.class === "Nekromanta" && skill.name === "Életelszívás") {
            effect.healing = Math.floor(finalDmg * 0.8);
        }
        if(attacker.class === "Lovag" && skill.name === "Védelmező Aura") {
            effect.buff = { stat: "def", value: 20 };
        }

        return effect;
    }
};
