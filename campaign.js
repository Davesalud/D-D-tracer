// Globális változó, ami az aktuálisan kisorsolt szörnyet tárolja
let currentMonster = null;

function startCampaign(difficulty) {
    // 1. Menü elrejtése, Aréna mutatása
    document.getElementById('campaign-menu').style.display = 'none';
    document.getElementById('combat-arena').style.display = 'block';

    // 2. Szörny kisorsolása a megadott esélyekkel
    currentMonster = rollMonsterWithChances(difficulty);

    // 3. UI frissítése az ellenfél adataival
    updateMonsterUI(currentMonster);

    // 4. Ide jön majd az Aréna harci inicializálása
    // pl. initCombat(playerStats, currentMonster);
    console.log("Megtámadott egy:", currentMonster.name, currentMonster);
}

// Sorsoló logika a kért százalékokkal
function rollMonsterWithChances(difficulty) {
    let roll = Math.random(); // Véletlen szám 0.00 és 0.99 között
    let selectedCategory = difficulty;

    if (difficulty === 'easy') {
        // 5% esély a medium szörnyre
        if (roll < 0.05) {
            selectedCategory = 'medium';
        }
    } 
    else if (difficulty === 'medium') {
        // 8% esély a hard szörnyre
        if (roll < 0.08) {
            selectedCategory = 'hard';
        }
    } 
    else if (difficulty === 'hard') {
        // 2% esély bossra
        if (roll < 0.02) {
            selectedCategory = 'boss';
        } else {
            // Összes közepes és nehéz mob közül sorsol
            const combinedList = MONSTERS.medium.concat(MONSTERS.hard);
            return { ...combinedList[Math.floor(Math.random() * combinedList.length)] };
        }
    }

    // A monsters.js-ben lévő getRandomMonster függvényt használjuk
    return getRandomMonster(selectedCategory);
}

// Aréna felület feltöltése
function updateMonsterUI(monster) {
    document.getElementById('monster-name').innerText = monster.name;
    document.getElementById('monster-hp').innerText = monster.hp;
    document.getElementById('monster-maxhp').innerText = monster.maxHp;
    document.getElementById('monster-passive').innerText = `${monster.passiveName} (${monster.passiveDesc})`;

    // Ha később valós képeket raksz be a placeholder_link helyett
    if (monster.image && monster.image !== "placeholder_link") {
        document.getElementById('monster-img').src = monster.image;
    } else {
        document.getElementById('monster-img').src = "https://via.placeholder.com/200x200/444/fff?text=" + encodeURI(monster.name);
    }
}
