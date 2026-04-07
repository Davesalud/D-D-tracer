<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Death's Armada - ARENA v3.8 ⚔️</title>
    <link href="https://fonts.googleapis.com/css2?family=MedievalSharp&display=swap" rel="stylesheet">
    <style>
        :root { --gold: #c5a059; --accent: #8b0000; --bg: #050507; --glass: rgba(15, 15, 20, 0.95); --magic: #0088ff; }
        body { 
            background: var(--bg); color: white; font-family: 'MedievalSharp', cursive; margin: 0;
            background-image: linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.95)), url('https://wallpaperaccess.com/full/1155861.jpg');
            background-size: cover; height: 100vh; overflow: hidden; display: flex; flex-direction: column;
        }
        .arena-header { padding: 10px; border-bottom: 2px solid var(--gold); text-align: center; background: rgba(0,0,0,0.9); display: flex; justify-content: space-between; align-items: center; }
        .battlefield { display: flex; flex: 1; justify-content: space-around; align-items: center; padding: 10px; gap: 10px; }
        
        /* Fighter Card */
        .fighter-card { flex: 1; max-width: 340px; padding: 15px; border: 2px solid #333; background: var(--glass); border-radius: 15px; text-align: center; position: relative; transition: 0.3s; }
        .fighter-card.active { border-color: var(--gold); box-shadow: 0 0 20px var(--gold); transform: scale(1.02); }
        .hero-portrait { width: 100%; height: 180px; border: 1px solid var(--gold); margin: 10px 0; background-size: cover; background-position: center 20%; border-radius: 8px; box-shadow: inset 0 0 15px black; }
        
        /* Bars */
        .bar-container { width: 100%; height: 20px; background: #000; border: 1px solid #444; margin: 4px 0; overflow: hidden; position: relative; border-radius: 4px; }
        .hp-fill { height: 100%; background: linear-gradient(90deg, #600, #f00); width: 100%; transition: 0.6s; }
        .mp-fill { height: 100%; background: linear-gradient(90deg, #003366, #0088ff); width: 0%; transition: 0.6s; }
        .bar-text { position: absolute; width: 100%; text-align: center; font-size: 11px; top: 2px; font-weight: bold; text-shadow: 1px 1px 2px black; z-index: 5; }

        /* Skill Slots */
        .skills-wrapper { display: flex; gap: 8px; justify-content: center; margin: 10px 0; }
        .skill-slot { 
            width: 60px; height: 60px; background: #111; border: 2px solid #444; border-radius: 10px;
            cursor: pointer; position: relative; display: flex; align-items: center; justify-content: center;
            transition: 0.2s; overflow: hidden; font-size: 0.7em; padding: 4px; color: #ccc;
        }
        .skill-slot:hover:not(:disabled) { border-color: var(--gold); color: white; transform: translateY(-3px); }
        .skill-slot.selected { border-color: #00ff00; box-shadow: 0 0 10px #00ff00; color: white; }
        .skill-slot:disabled { opacity: 0.3; filter: grayscale(1); }

        /* Info & Log */
        .info-box { background: rgba(0,0,0,0.7); border: 1px solid #333; border-left: 4px solid var(--gold); padding: 12px; margin: 10px 0; min-height: 70px; font-size: 0.9em; text-align: left; line-height: 1.4; color: #ddd; border-radius: 4px; }
        .dice-box { width: 60px; height: 60px; border: 2px solid var(--gold); font-size: 2em; background: #000; color: var(--gold); border-radius: 10px; display: flex; align-items: center; justify-content: center; }
        .battle-log { width: 100%; max-width: 280px; height: 120px; background: rgba(0,0,0,0.8); border: 1px solid #444; padding: 10px; font-size: 0.8em; overflow-y: auto; color: #aaa; border-radius: 8px; }

        .btn { background: var(--accent); color: white; border: 1px solid var(--gold); padding: 12px; font-family: 'MedievalSharp'; cursor: pointer; width: 100%; border-radius: 5px; font-weight: bold; }
        .btn:disabled { opacity: 0.3; }

        #win-screen { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.98); display: none; flex-direction: column; align-items: center; justify-content: center; z-index: 1000; text-align: center; }
        .win-active { display: flex !important; }
    </style>
</head>
<body>

<div id="win-screen">
    <h1 id="win-title" style="color: var(--gold); font-size: 3em;">GYŐZELEM!</h1>
    <div id="rewards" style="padding: 20px; border: 1px solid var(--gold); width: 250px; margin-bottom: 20px;">
        <p id="reward-xp" style="font-size: 1.4em;"></p>
        <p id="reward-gold" style="font-size: 1.4em; color: gold;"></p>
    </div>
    <button class="btn" style="width:250px" onclick="safeExit()">🏰 VISSZATÉRÉS</button>
</div>

<div class="arena-header">
    <button class="btn" style="width:auto; padding: 5px 15px;" onclick="handleExit()">🏰 KILÉPÉS</button>
    <h2 id="turn-display">KERESÉS...</h2>
    <div style="width:100px;"></div>
</div>

<div class="battlefield">
    <div id="p-card" class="fighter-card">
        <h3 id="p-name" style="color: var(--gold); margin: 5px 0;">Hősöd</h3>
        <div class="bar-container"><div id="p-hp-fill" class="hp-fill"></div><div class="bar-text" id="p-hp-val">HP: ? / ?</div></div>
        <div class="bar-container" style="height:12px;"><div id="p-mp-fill" class="mp-fill"></div><div class="bar-text" id="p-mp-val" style="font-size:9px; top:0;">MP: ? / ?</div></div>
        
        <div id="p-img" class="hero-portrait"></div>
        
        <div class="skills-wrapper" id="p-skills">
            <button class="skill-slot" id="sk-0" onclick="selectSkill(0)" disabled>?</button>
            <button class="skill-slot" id="sk-1" onclick="selectSkill(1)" disabled>?</button>
            <button class="skill-slot" id="sk-2" onclick="selectSkill(2)" disabled>?</button>
        </div>

        <div id="info-text" class="info-box">
            <i>Várj a sorodra, vitéz!</i>
        </div>
        
        <button id="btn-attack" class="btn" onclick="executeAction()" disabled>⚔️ AKCIÓ INDÍTÁSA</button>
    </div>

    <div style="display:flex; flex-direction:column; align-items:center; gap:10px;">
        <div id="dice" class="dice-box">?</div>
        <div id="log" class="battle-log"></div>
    </div>

    <div id="e-card" class="fighter-card">
        <h3 id="e-name" style="color: #ff4444; margin: 5px 0;">Ellenség</h3>
        <div class="bar-container"><div id="e-hp-fill" class="hp-fill"></div><div class="bar-text" id="e-hp-val">HP: ---</div></div>
        <div id="e-img" class="hero-portrait"></div>
        <div class="info-box" id="e-info" style="border-left-color: #ff4444;">
            Keresés...
        </div>
    </div>
</div>

<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-database-compat.js"></script>

<script>
    // A Te SKILLS_DATA-d, kibővítve a látványos leírásokkal
    const SKILLS_DATA = {
        "Harcos": {
            "manaPool": 50,
            "skills": [
                { name: "Pajzsütés", cost: 15, cd: 1, power: 1.2, txt: "A harcos nehéz pajzsával arcba vágja az ellenséget, aki megszédül a csapástól." },
                { name: "Vérszomj", cost: 20, cd: 2, power: 1.5, txt: "Minden vágással életerőt szívsz el az ellenségtől, miközben sebei vérezni kezdenek." },
                { name: "Birodalmi Roham", cost: 40, cd: 99, power: 2.5, txt: "A birodalom dicsőségéért! Egyetlen megállíthatatlan roham, ami áttöri a legerősebb páncélt is." }
            ]
        },
        "Mágus": {
            "manaPool": 150,
            "skills": [
                { name: "Tűzgolyó", cost: 30, cd: 1, power: 1.8, txt: "Koncentrált mágikus lángok, melyek porrá égetik az ellenség ruházatát és bőrét." },
                { name: "Jégcsap", cost: 25, cd: 2, power: 1.4, txt: "Fagyos tüske repül a célpont felé, ami jégbe zárja az ízületeit, lassítva mozgását." },
                { name: "Apokalipszis", cost: 80, cd: 99, power: 3.5, txt: "Megnyílik az ég, és izzó meteorok hullanak alá. Ez a végítélet pillanata." }
            ]
        },
        "Lovag": {
            "manaPool": 60,
            "skills": [
                { name: "Szent Csapás", cost: 20, cd: 1, power: 1.3, txt: "A lovag felemeli kardját és égi fénytől övezve sújt le, elvakítva a bűnösöket." },
                { name: "Védelmező Aura", cost: 30, cd: 3, power: 0, txt: "Isteni pajzs vonja körbe a lovagot, ami elnyeli a beérkező csapások erejét." },
                { name: "Égi Ítélet", cost: 50, cd: 99, power: 2.2, txt: "A mennyek haragja lesújt, miközben a hit ereje teljesen összeforrasztja a lovag sebeit." }
            ]
        },
        "Bérgyilkos": {
            "manaPool": 80,
            "skills": [
                { name: "Hátbaszúrás", cost: 25, cd: 1, power: 2.0, txt: "Az árnyakból előbukkanva tőreidet mélyen az ellenfél bordái közé döföd." },
                { name: "Füstbomba", cost: 30, cd: 3, power: 0, txt: "Egy puffanás, és csak sötét füst marad utánad. Az ellenfél nem látja, honnan jön a köv. ütés." },
                { name: "Halálos Tánc", cost: 60, cd: 99, power: 4.0, txt: "Villámgyors vágások sorozata, ami azonnal véget vet a szenvedésnek, ha az ellenség már gyenge." }
            ]
        }
    };

    const firebaseConfig = { apiKey: "AIzaSyBg2WzLqxt0QRDkDiUKYrGRCw0Kg-gr1OU", authDomain: "dnd-tracker-4fe05.firebaseapp.com", projectId: "dnd-tracker-4fe05", databaseURL: "https://dnd-tracker-4fe05-default-rtdb.europe-west1.firebasedatabase.app" };
    firebase.initializeApp(firebaseConfig);
    const db = firebase.database();
    const myId = localStorage.getItem('selectedCharId');
    
    let currentRoom = null, bRef = null, isFighting = false, selectedIdx = -1, playerClass = "";
    let myCDs = [0, 0, 0];
    const HERO_IMGS = { "Harcos":"https://i.ibb.co/20BXyqpy/Copilot-20260403-032810.png", "Mágus":"https://i.ibb.co/yFz5bcXv/Copilot-20260403-033651.png", "Lovag":"https://i.ibb.co/Fk3n339M/Copilot-20260403-034043.png", "Bérgyilkos":"https://i.ibb.co/b525CsLg/Copilot-20260403-032807.png" };

    function selectSkill(idx) {
        if(myCDs[idx] > 0) return;
        selectedIdx = idx;
        const s = SKILLS_DATA[playerClass].skills[idx];
        document.querySelectorAll('.skill-slot').forEach(el => el.classList.remove('selected'));
        document.getElementById(`sk-${idx}`).classList.add('selected');
        document.getElementById('info-text').innerHTML = `<b>${s.name}</b><br><span style="color:var(--magic)">Költség: ${s.cost} MP</span><br>${s.txt}`;
        document.getElementById('btn-attack').innerText = `${s.name.toUpperCase()} INDÍTÁSA`;
    }

    function executeAction() {
        if(selectedIdx === -1) { performBasic(); } else { useSkill(selectedIdx); }
        selectedIdx = -1;
        document.querySelectorAll('.skill-slot').forEach(el => el.classList.remove('selected'));
        document.getElementById('btn-attack').innerText = `⚔️ AKCIÓ INDÍTÁSA`;
    }

    function useSkill(idx) {
        bRef.once('value', snap => {
            const b = snap.val(); const isP1 = b.p1.id === myId; const me = isP1 ? b.p1 : b.p2;
            const s = SKILLS_DATA[playerClass].skills[idx];
            if(me.mp < s.cost) return;
            myCDs[idx] = s.cd;
            
            const dmg = Math.floor((Math.random()*10 + 10) * s.power);
            const updates = {};
            updates[isP1 ? 'p2/hp' : 'p1/hp'] = Math.max(0, (isP1?b.p2.hp:b.p1.hp) - dmg);
            updates[isP1 ? 'p1/mp' : 'p2/mp'] = me.mp - s.cost;
            updates['turn'] = isP1 ? b.p2.id : b.p1.id;
            updates['lastRoll'] = "✨";
            let nLog = b.log || []; nLog.push(`${me.name} -> ${s.name} (${dmg})`);
            updates['log'] = nLog.slice(-5);
            bRef.update(updates);
        });
    }

    function performBasic() {
        bRef.once('value', snap => {
            const b = snap.val(); const isP1 = b.p1.id === myId; const me = isP1 ? b.p1 : b.p2;
            const roll = Math.floor(Math.random()*20)+1;
            const dmg = roll === 20 ? 25 : Math.floor(Math.random()*8)+10;
            const updates = {};
            updates[isP1 ? 'p2/hp' : 'p1/hp'] = Math.max(0, (isP1?b.p2.hp:b.p1.hp) - dmg);
            updates['turn'] = isP1 ? b.p2.id : b.p1.id;
            updates['lastRoll'] = roll;
            let nLog = b.log || []; nLog.push(`${me.name}: ${roll===20?'Kritikus!':'Ütés'} (${dmg})`);
            updates['log'] = nLog.slice(-5);
            bRef.update(updates);
        });
    }

    // --- Rendszer logikák (Matchmaking, Listeners) ---
    function findMatch() {
        db.ref('battles').once('value', snap => {
            const rooms = snap.val(); let found = null;
            if(rooms) { for(let id in rooms) { if(rooms[id].p2.id === "waiting" && rooms[id].p1.id !== myId) { found = id; break; } } }
            found ? joinBattle(found) : createNewBattle();
        });
    }

    function createNewBattle() {
        currentRoom = "room_" + Math.random().toString(36).substr(2,6);
        bRef = db.ref('battles/' + currentRoom);
        db.ref(`characters/${myId}`).once('value', s => {
            const c = s.val(); playerClass = c.charClass;
            const mp = SKILLS_DATA[playerClass] ? SKILLS_DATA[playerClass].manaPool : 50;
            bRef.set({ p1: {id:myId, name:c.name, hp:c.hp, maxHp:c.maxHp, mp:mp, maxMp:mp, class:c.charClass}, p2:{id:"waiting", name:"Várakozás..."}, turn:myId, lastRoll:"?", log:["Ellenfelet keresünk..."], winner:"none" });
            bRef.onDisconnect().remove(); listen();
        });
    }

    function joinBattle(id) {
        currentRoom = id; bRef = db.ref('battles/' + currentRoom);
        db.ref(`characters/${myId}`).once('value', s => {
            const c = s.val(); playerClass = c.charClass;
            const mp = SKILLS_DATA[playerClass] ? SKILLS_DATA[playerClass].manaPool : 50;
            bRef.update({ p2: {id:myId, name:c.name, hp:c.hp, maxHp:c.maxHp, mp:mp, maxMp:mp, class:c.charClass}, log:["Csata indul!"], winner:"none" });
            listen();
        });
    }

    function listen() {
        bRef.on('value', snap => {
            const b = snap.val(); if(!b) return;
            if(b.winner !== "none") { showWin(b.winner === myId); return; }
            updateUI(b);
        });
    }

    function updateUI(b) {
        const isP1 = b.p1.id === myId;
        const me = isP1 ? b.p1 : b.p2;
        const opp = isP1 ? b.p2 : b.p1;

        if(b.turn === myId && isFighting && window.lastT !== myId) { myCDs = myCDs.map(x => x > 0 ? x-1 : 0); }
        window.lastT = b.turn;

        if(opp.id !== "waiting") {
            isFighting = true;
            document.getElementById('e-name').innerText = opp.name;
            document.getElementById('e-img').style.backgroundImage = `url('${HERO_IMGS[opp.class]}')`;
            document.getElementById('e-hp-fill').style.width = (opp.hp/opp.maxHp*100) + "%";
            document.getElementById('e-hp-val').innerText = `HP: ${Math.ceil(opp.hp)} / ${opp.maxHp}`;
            document.getElementById('e-info').innerText = `${opp.name} éppen támadásra készül...`;
        }

        document.getElementById('p-name').innerText = me.name;
        document.getElementById('p-img').style.backgroundImage = `url('${HERO_IMGS[me.class]}')`;
        document.getElementById('p-hp-fill').style.width = (me.hp/me.maxHp*100) + "%";
        document.getElementById('p-hp-val').innerText = `HP: ${Math.ceil(me.hp)} / ${me.maxHp}`;
        document.getElementById('p-mp-fill').style.width = (me.mp/me.maxMp*100) + "%";
        document.getElementById('p-mp-val').innerText = `MP: ${Math.ceil(me.mp)} / ${me.maxMp}`;

        const myT = (b.turn === myId && isFighting);
        document.getElementById('turn-display').innerText = myT ? "TE KÖVETKEZEL!" : "ELLENFÉL... ";
        document.getElementById('p-card').classList.toggle('active', myT);
        document.getElementById('btn-attack').disabled = !myT;

        const sData = SKILLS_DATA[playerClass].skills;
        sData.forEach((s, i) => {
            const btn = document.getElementById(`sk-${i}`);
            btn.innerHTML = `<span style="font-size:9px">${s.name}</span>`;
            if(myCDs[i] > 0) btn.innerHTML += `<div style="position:absolute; background:rgba(0,0,0,0.7); width:100%; height:100%; display:flex; align-items:center; justify-content:center; color:red;">${myCDs[i]}</div>`;
            btn.disabled = !myT || me.mp < s.cost || myCDs[i] > 0;
        });

        document.getElementById('dice').innerText = b.lastRoll;
        document.getElementById('log').innerHTML = b.log ? b.log.map(l => `<div>${l}</div>`).reverse().join('') : "";

        if(isFighting && me.hp <= 0 && !window.endP) { window.endP = true; bRef.update({winner: opp.id}); }
    }

    function showWin(win) {
        document.getElementById('win-screen').classList.add('win-active');
        document.getElementById('win-title').innerText = win ? "GYŐZELEM!" : "VERESÉG!";
        document.getElementById('reward-xp').innerText = win ? "+15 XP" : "+3 XP";
        document.getElementById('reward-gold').innerText = win ? "+10 Arany" : "-2 Arany";
    }

    function safeExit() {
        db.ref(`characters/${myId}`).update({status: "online"}).then(() => { window.location.replace('index.html'); });
    }

    findMatch();
</script>
</body>
</html>
