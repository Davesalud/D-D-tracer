// Karakterosztályok alapértelmezett regenerációs értékei (HP/perc, MP/perc)
const REGEN_SETTINGS = {
    "Harcos":     { hp: 7,  mp: 2 },
    "Mágus":      { hp: 2,  mp: 10 },
    "Lovag":      { hp: 9,  mp: 3 },
    "Íjász":      { hp: 5,  mp: 5 },
    "Bérgyilkos": { hp: 4,  mp: 6 },
    "Nekromanta": { hp: 5,  mp: 8 }
};

/**
 * Kiszámolja a regenerációt az eltelt idő alapján.
 * @param {Object} char - A karakter adatai a Firebase-ből.
 * @returns {Object|null} - A frissítendő adatok vagy null.
 */
function processRegeneration(char) {
    if (!char) return null;

    const now = Date.now();
    const lastUpdate = char.lastUpdate || now;
    const elapsedSeconds = Math.floor((now - lastUpdate) / 1000);
    const ticks = Math.floor(elapsedSeconds / 60); // Hány egész perc telt el

    const rates = REGEN_SETTINGS[char.charClass] || { hp: 5, mp: 5 };
    const maxHp = Number(char.maxHp) || 100;
    const maxMp = Number(char.maxMp) || 50;

    let updatedHp = Number(char.hp || 0);
    let updatedMp = Number(char.mp || 0);

    // Regeneráció csak akkor, ha nem harcol és eltelt legalább 1 perc
    if (ticks >= 1 && char.status !== "fighting") {
        updatedHp = Math.min(updatedHp + (ticks * rates.hp), maxHp);
        updatedMp = Math.min(updatedMp + (ticks * rates.mp), maxMp);
    }

    // Mindig visszaadjuk az objektumot az új időbélyeggel (Szinkron az Arénához)
    return {
        hp: updatedHp,
        mp: updatedMp,
        lastUpdate: now
    };
}

/**
 * Lekéri a karaktert, kiszámolja a gyógyulást és beküldi a Firebase-be.
 */
function checkAndApplyRegen(charId) {
    if (!charId) return;
    const charRef = firebase.database().ref(`characters/${charId}`);
    
    charRef.once('value', snapshot => {
        const charData = snapshot.val();
        if (!charData) return;

        const updates = processRegeneration(charData);
        if (updates) {
            charRef.update(updates);
        }
    });
}
