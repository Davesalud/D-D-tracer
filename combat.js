
/**
 * Death's Armada - közös harci motor (arena + campaign)
 */
const CombatEngine = {
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
        let baseDmg;
        if (attacker.isMonster) {
            const md = this.roll(2, 10);
            baseDmg = md.total + attacker.atk * 0.5;
        } else {
            baseDmg = attacker.atk * (0.8 + Math.random() * 0.4);
            if (isCrit) baseDmg *= 2.5;
        }
        let effectiveDef = defender.def || 0;
        if (defender.isDefending) effectiveDef *= 2;
        const cap = defender.isDefending ? 0.9 : 0.8;
        const reduction = Math.min(cap, effectiveDef / 100);
        const finalDmg = Math.max(1, Math.floor(baseDmg * (1 - reduction)));
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
