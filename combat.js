/**
 * Death's Armada - közös harci motor (arena + campaign)
 */
const CombatEngine = {
    getPct: function (value) {
        return Math.max(0, Number(value) || 0) / 100;
    },
    safeNum: function (value) {
        return Number(value) || 0;
    },
    roll: function (count, sides, bonus) {
        count = count || 1;
        sides = sides || 20;
        bonus = bonus || 0;
        let total = 0;
        const rolls = [];
        for (let i = 0; i < count; i++) {
            const r = Math.floor(Math.random() * sides) + 1;
            rolls.push(r);
            total += r;
        }
        return {
            total: total + bonus,
            rolls: rolls,
            display: count > 1 ? `${total + bonus} (${rolls.join("+")})` : `${total + bonus}`,
        };
    },
    calculatePhysicalDamage: function (attacker, defender) {
        const diceResult = this.roll(1, 20);
        const roll = diceResult.total;
        const isCrit = roll === 20;
        const hitBonus = this.safeNum(attacker.bonusHitChance);
        const missChance = Math.max(0.01, (5 - hitBonus) / 100);
        if (Math.random() < missChance) {
            return { damage: 0, isCrit: false, roll: diceResult.display, missed: true };
        }
        const dodgeChance = this.getPct(defender.dodgeChance);
        if (Math.random() < dodgeChance) {
            return { damage: 0, isCrit: false, roll: diceResult.display, dodged: true };
        }
        let baseDmg;
        if (attacker.isMonster) {
            const md = this.roll(2, 10);
            baseDmg = md.total + attacker.atk * 0.5;
        } else {
            baseDmg = attacker.atk * (0.8 + Math.random() * 0.4);
            if (isCrit) baseDmg *= 2.5;
            if (!attacker._openingStrikeUsed && this.safeNum(attacker.openingStrikeDamage) > 0) {
                baseDmg += this.safeNum(attacker.openingStrikeDamage);
                attacker._openingStrikeUsed = true;
            }
        }
        let effectiveDef = defender.def || 0;
        const armorPenPct = Math.max(0, Math.min(0.9, this.getPct(attacker.armorPenPercent)));
        effectiveDef = Math.max(0, effectiveDef * (1 - armorPenPct));
        if (defender.isDefending) effectiveDef *= 2;
        const cap = defender.isDefending ? 0.9 : 0.8;
        const reduction = Math.min(cap, effectiveDef / 100);
        let finalDmg = Math.max(1, Math.floor(baseDmg * (1 - reduction)));
        const blockChance = this.getPct(defender.blockChance);
        if (Math.random() < blockChance) {
            finalDmg = Math.max(1, Math.floor(finalDmg * 0.5));
        }
        finalDmg = Math.max(1, finalDmg - this.safeNum(defender.flatDamageReduction));
        return { damage: finalDmg, isCrit: isCrit, roll: diceResult.display };
    },
    calculateSkillEffect: function (attacker, defender, skill) {
        const rawDmg = Math.floor(attacker.atk * skill.power * (0.9 + Math.random() * 0.2));
        let effectiveDef = defender.def || 0;
        if (defender.isDefending) effectiveDef *= 1.5;
        const reduction = Math.min(0.85, effectiveDef / 100);
        let finalDmg = Math.max(1, Math.floor(rawDmg * (1 - reduction)));
        const effect = { damage: finalDmg, healing: 0 };
        if (attacker.charClass === "Nekromanta" && skill.name === "Életelszívás") {
            effect.healing = Math.floor(finalDmg * 0.8);
        }
        return effect;
    },
};
