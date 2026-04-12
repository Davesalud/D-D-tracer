/**
 * Karaktermentés integritás-ellenőrzéssel (checksum) és szűk whitelisttel,
 * hogy sérült vagy idegen kulcsok ne kerüljenek vissza a Firebase-be.
 */
(function (global) {
    var APP_ID = 'deaths-armada';
    var FORMAT_VER = 1;
    var LOCAL_PREFIX = 'da_char_snapshot_v1_';

    var SCALAR_KEYS = {
        id: 1,
        name: 1,
        pin: 1,
        charClass: 1,
        level: 1,
        gold: 1,
        xp: 1,
        nextLvlXp: 1,
        hp: 1,
        maxHp: 1,
        mp: 1,
        maxMp: 1,
        atk: 1,
        def: 1,
        bonusAtk: 1,
        bonusDef: 1,
        status: 1,
        lastUpdate: 1,
        arenaWins: 1,
        arenaLosses: 1
    };

    function deepSortKeys(x) {
        if (x === null || typeof x !== 'object') return x;
        if (Array.isArray(x)) return x.map(deepSortKeys);
        var out = {};
        Object.keys(x)
            .sort()
            .forEach(function (k) {
                out[k] = deepSortKeys(x[k]);
            });
        return out;
    }

    function fnv1a32(str) {
        var h = 0x811c9dc5;
        for (var i = 0; i < str.length; i++) {
            h ^= str.charCodeAt(i);
            h = Math.imul(h, 0x01000193) >>> 0;
        }
        return ('00000000' + h.toString(16)).slice(-8);
    }

    function checksumData(data) {
        return fnv1a32(JSON.stringify(deepSortKeys(data)));
    }

    function isEquipKey(k) {
        return /^equip_/.test(k);
    }

    function isInventoryKey(k) {
        return typeof k === 'string' && k.length > 0 && k.length < 120;
    }

    function isItemId(v) {
        return typeof v === 'string' && v.length > 0 && v.length < 80 && /^[a-zA-Z0-9_]+$/.test(v);
    }

    /**
     * Csak a játék által ismert mezők; idegen kulcsok eldobása.
     */
    function sanitizeCharacter(raw, expectedCharId) {
        if (!raw || typeof raw !== 'object') return null;
        if (String(raw.id) !== String(expectedCharId)) return null;

        var out = {};
        var k;

        for (k in raw) {
            if (!Object.prototype.hasOwnProperty.call(raw, k)) continue;
            if (SCALAR_KEYS[k]) {
                var v = raw[k];
                if (k === 'id') {
                    if (v != null) out.id = String(v).slice(0, 120);
                } else if (k === 'name' || k === 'pin' || k === 'charClass' || k === 'status') {
                    if (typeof v === 'string') out[k] = v.slice(0, 200);
                } else if (typeof v === 'number' && isFinite(v)) {
                    out[k] = v;
                } else if (v === null) {
                    out[k] = null;
                }
            } else if (k === 'inventory' && raw[k] && typeof raw[k] === 'object' && !Array.isArray(raw[k])) {
                out.inventory = {};
                for (var ik in raw[k]) {
                    if (!Object.prototype.hasOwnProperty.call(raw[k], ik)) continue;
                    if (!isInventoryKey(ik)) continue;
                    if (isItemId(raw[k][ik])) out.inventory[ik] = raw[k][ik];
                }
            } else if (isEquipKey(k)) {
                if (raw[k] == null) out[k] = null;
                else if (isItemId(raw[k])) out[k] = raw[k];
            }
        }

        out.id = String(expectedCharId);
        return out;
    }

    function buildExportObject(charData, charId) {
        var payload = JSON.parse(JSON.stringify(charData || {}));
        return {
            app: APP_ID,
            v: FORMAT_VER,
            exportedAt: Date.now(),
            charId: String(charId),
            checksum: checksumData(payload),
            data: payload
        };
    }

    function parseImportText(text) {
        var j = JSON.parse(text);
        if (!j || j.app !== APP_ID || j.v !== FORMAT_VER) {
            throw new Error('Érvénytelen vagy nem kompatibilis mentésfájl.');
        }
        if (!j.data || typeof j.data !== 'object') {
            throw new Error('Hiányzó karakteradat a fájlban.');
        }
        var chk = checksumData(j.data);
        if (chk !== j.checksum) {
            throw new Error(
                'Integritás ellenőrzés sikertelen: a fájl sérült, vagy a checksum nem egyezik.'
            );
        }
        return j;
    }

    function saveLocalSnapshot(charId, charData) {
        if (!charId || !charData) return;
        try {
            var body = buildExportObject(charData, charId);
            localStorage.setItem(LOCAL_PREFIX + charId, JSON.stringify(body));
        } catch (e) {}
    }

    function loadLocalSnapshot(charId) {
        try {
            var t = localStorage.getItem(LOCAL_PREFIX + charId);
            if (!t) return null;
            return parseImportText(t);
        } catch (e) {
            return null;
        }
    }

    function clearLocalSnapshot(charId) {
        try {
            localStorage.removeItem(LOCAL_PREFIX + charId);
        } catch (e) {}
    }

    global.DeathBackup = {
        checksumData: checksumData,
        sanitizeCharacter: sanitizeCharacter,
        buildExportObject: buildExportObject,
        parseImportText: parseImportText,
        saveLocalSnapshot: saveLocalSnapshot,
        loadLocalSnapshot: loadLocalSnapshot,
        clearLocalSnapshot: clearLocalSnapshot
    };
})(typeof window !== 'undefined' ? window : this);
