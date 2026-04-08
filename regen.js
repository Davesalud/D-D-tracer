/**
 * Death's Armada - Regenerációs Rendszer v1.1
 * Kezeli a HP és MP töltődését kaszt-specifikus rátákkal.
 */

const REGEN_SETTINGS = {
    "Harcos":     { hp: 7,  mp: 2 },
    "Mágus":      { hp: 2,  mp: 10 },
    "Lovag":      { hp: 9,  mp: 3 },
    "Íjász":      { hp: 5,  mp: 5 },
    "Bérgyilkos": { hp: 4,  mp: 6 },
    "Nekromanta": { hp: 5,  mp: 8 }
};

/**
 * Kiszámolja és frissíti a karakter adatait.
 * Akkor is működik, ha a játékos offline volt.
 */
function processRegeneration(char) {
    if (!char) return null;

    const now = Date.now();
    // Ha még sosem volt frissítve, a mostani időt vesszük alapul
    const lastUpdate = char.lastUpdate || now;
    const elapsedSeconds = Math.floor((now - lastUpdate) / 1000);
    
    // Percenkénti regeneráció (60 másodperces ciklus)
    const ticks = Math.floor(elapsedSeconds / 60);

    // Ha kevesebb mint 1 perc telt el, nem módosítunk semmit
    if (ticks < 1) return null;

    // Kaszt adatok lekérése (biztonsági tartalékkal)
    const rates = REGEN_SETTINGS[char.charClass] || { hp: 5, mp: 5 };

    const oldHp = Number(char.hp);
    const oldMp = Number(char.mp);
    const maxHp = Number(char.maxHp);
    const maxMp = Number(char.maxMp);

    // Számítás: Jelenlegi érték + (eltelt percek * kaszt ráta)
    let updatedHp = oldHp + (ticks * rates.hp);
    let updatedMp = oldMp + (ticks * rates.mp);

    // Maximum korlátok alkalmazása
    updatedHp = Math.min(updatedHp, maxHp);
    updatedMp = Math.min(updatedMp, maxMp);

    // Csak akkor küldünk vissza frissítést, ha változtak az értékek
    if (updatedHp !== oldHp || updatedMp !== oldMp) {
        return {
            hp: updatedHp,
            mp: updatedMp,
            lastUpdate: now // Fontos: az időt mindig frissítjük a mentéshez!
        };
    }

    return null;
}

/**
 * Példa függvény a Firebase-szel való integrációhoz
 */
function checkAndApplyRegen(charId) {
    const charRef = firebase.database().ref(`characters/${charId}`);
    
    charRef.once('value', snapshot => {
        const charData = snapshot.val();
        if (!charData) return;

        const updates = processRegeneration(charData);
        
        if (updates) {
            charRef.update(updates).then(() => {
                console.log("Regeneráció alkalmazva:", updates);
                // Itt hívhatod meg az UI frissítő függvényedet (pl. updateBars())
            });
        }
    });
}
