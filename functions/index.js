const functions = require("firebase-functions");
const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

admin.initializeApp();

const db = admin.database();

const STACKABLE_TYPES = new Set(["consumable"]);
const EQUIP_SLOTS = ["sisak", "fegyver", "páncél", "pajzs", "lábvért", "cipő"];

function requireString(v, name, min = 1, max = 128) {
  if (typeof v !== "string") {
    throw new functions.https.HttpsError("invalid-argument", `${name} must be string`);
  }
  const t = v.trim();
  if (t.length < min || t.length > max) {
    throw new functions.https.HttpsError("invalid-argument", `${name} length invalid`);
  }
  return t;
}

function requireNumber(v, name, min, max) {
  if (typeof v !== "number" || !Number.isFinite(v)) {
    throw new functions.https.HttpsError("invalid-argument", `${name} must be number`);
  }
  if (v < min || v > max) {
    throw new functions.https.HttpsError("invalid-argument", `${name} out of range`);
  }
  return v;
}

function clampInt(v, min, max) {
  return Math.max(min, Math.min(max, Math.floor(Number(v) || 0)));
}

let cachedItems = null;
function getItemCatalog() {
  if (cachedItems) return cachedItems;
  const filePath = path.join(__dirname, "..", "items.js");
  const src = fs.readFileSync(filePath, "utf8");
  const sandbox = {};
  vm.createContext(sandbox);
  vm.runInContext(`${src}\nthis.__OUT_ITEMS = ITEMS;`, sandbox, { timeout: 1500 });
  if (!sandbox.__OUT_ITEMS || typeof sandbox.__OUT_ITEMS !== "object") {
    throw new Error("Could not parse ITEMS from items.js");
  }
  cachedItems = sandbox.__OUT_ITEMS;
  return cachedItems;
}

exports.secureShopTrade = functions.region("europe-west1").https.onCall(async (data) => {
  const characterId = requireString(data && data.characterId, "characterId", 3, 120);
  const pin = requireString(data && data.pin, "pin", 4, 16);
  const action = requireString(data && data.action, "action", 3, 16);
  const itemId = data && data.itemId ? requireString(data.itemId, "itemId", 1, 80) : null;
  const inventoryKey = data && data.inventoryKey ? requireString(data.inventoryKey, "inventoryKey", 1, 120) : null;

  if (action !== "buy" && action !== "sell") {
    throw new functions.https.HttpsError("invalid-argument", "Invalid action.");
  }

  const catalog = getItemCatalog();
  if (!catalog) {
    throw new functions.https.HttpsError("failed-precondition", "Missing item catalog.");
  }

  const charRef = db.ref(`characters/${characterId}`);
  const charSnap = await charRef.once("value");
  const c = charSnap.val();
  if (!c) throw new functions.https.HttpsError("not-found", "Character not found.");
  if (String(c.pin || "") !== pin) {
    throw new functions.https.HttpsError("permission-denied", "Invalid character pin.");
  }

  if (action === "buy") {
    const item = catalog[itemId];
    if (!item) throw new functions.https.HttpsError("not-found", "Item not found.");
    const price = clampInt(item.price, 0, 9999999);
    const itemType = String(item.type || "");
    const isStackable = STACKABLE_TYPES.has(itemType);

    const inv = c.inventory && typeof c.inventory === "object" ? c.inventory : {};
    const invValues = Object.values(inv);
    if (!isStackable && invValues.includes(itemId)) {
      throw new functions.https.HttpsError("failed-precondition", "Item already in inventory.");
    }
    if (invValues.length >= 28) {
      throw new functions.https.HttpsError("failed-precondition", "Inventory full.");
    }
    if (!isStackable) {
      const alreadyEquipped = EQUIP_SLOTS.some((slot) => c[`equip_${slot}`] === itemId);
      if (alreadyEquipped) {
        throw new functions.https.HttpsError("failed-precondition", "Item already equipped.");
      }
    }
    const gold = clampInt(c.gold, 0, 9999999);
    if (gold < price) throw new functions.https.HttpsError("failed-precondition", "Not enough gold.");

    const invPushRef = charRef.child("inventory").push();
    await charRef.update({
      gold: gold - price,
      lastUpdate: Date.now(),
      [`inventory/${invPushRef.key}`]: itemId
    });
    return { ok: true, action: "buy" };
  }

  if (!inventoryKey) {
    throw new functions.https.HttpsError("invalid-argument", "Missing inventoryKey.");
  }
  const inv = c.inventory && typeof c.inventory === "object" ? c.inventory : {};
  const existingItemId = inv[inventoryKey];
  if (!existingItemId) {
    throw new functions.https.HttpsError("not-found", "Inventory entry not found.");
  }
  const item = catalog[existingItemId];
  if (!item) throw new functions.https.HttpsError("failed-precondition", "Unknown item.");
  const sellPrice = clampInt(item.sellPrice, 0, 9999999);
  const gold = clampInt(c.gold, 0, 9999999);
  const nextGold = clampInt(gold + sellPrice, 0, 9999999);

  await charRef.update({
    gold: nextGold,
    lastUpdate: Date.now(),
    [`inventory/${inventoryKey}`]: null
  });
  return { ok: true, action: "sell" };
});

exports.secureCampaignSettle = functions.region("europe-west1").https.onCall(async (data) => {
  const characterId = requireString(data && data.characterId, "characterId", 3, 120);
  const pin = requireString(data && data.pin, "pin", 4, 16);
  const mode = requireString(data && data.mode, "mode", 4, 32);

  const hp = requireNumber(Number(data && data.hp), "hp", 1, 9999);
  const mp = requireNumber(Number(data && data.mp), "mp", 0, 9999);
  const maxHp = requireNumber(Number(data && data.maxHp), "maxHp", 1, 9999);

  const reqXp = clampInt(data && data.xpGain, 0, 9999999);
  const reqGold = clampInt(data && data.goldGain, 0, 9999999);
  const soulEaterStacks = clampInt(data && data.soulEaterStacks, 0, 20);
  const soulEaterAppliedStacks = clampInt(data && data.soulEaterAppliedStacks, 0, 9999);
  const challengeBestLevel = clampInt(data && data.challengeBestLevel, 0, 10);

  const payoutCaps = {
    solo_win: { xp: 300, gold: 300 },
    challenge_step_win: { xp: 450, gold: 450 },
    challenge_cashout: { xp: 2000, gold: 2000 },
    challenge_full: { xp: 3500, gold: 3500 },
    solo_loss: { xp: 0, gold: 0 },
    challenge_fail: { xp: 0, gold: 0 }
  };
  const cap = payoutCaps[mode];
  if (!cap) throw new functions.https.HttpsError("invalid-argument", "Invalid settle mode.");

  const xpGain = Math.min(reqXp, cap.xp);
  const goldGain = Math.min(reqGold, cap.gold);

  const charRef = db.ref(`characters/${characterId}`);
  await charRef.transaction((c) => {
    if (!c) return c;
    if (String(c.pin || "") !== pin) return c;

    const prevXp = clampInt(c.xp, 0, 9999999);
    const prevGold = clampInt(c.gold, 0, 9999999);
    const nowTs = Date.now();

    if (mode === "solo_loss" || mode === "challenge_fail") {
      c.hp = 1;
      c.mp = clampInt(mp, 0, 9999);
      c.lastUpdate = nowTs;
      return c;
    }

    c.xp = clampInt(prevXp + xpGain, 0, 9999999);
    c.gold = clampInt(prevGold + goldGain, 0, 9999999);
    c.maxHp = clampInt(maxHp, 1, 9999);
    c.hp = clampInt(Math.min(hp, c.maxHp), 1, c.maxHp);
    c.mp = clampInt(mp, 0, 9999);
    c.soulEaterStacks = soulEaterStacks;
    c.soulEaterAppliedStacks = soulEaterAppliedStacks;
    if (mode === "challenge_full") {
      c.challengeBestLevel = 10;
    } else if (challengeBestLevel > clampInt(c.challengeBestLevel, 0, 10)) {
      c.challengeBestLevel = challengeBestLevel;
    }
    c.lastUpdate = nowTs;
    return c;
  });

  const finalSnap = await charRef.once("value");
  const finalData = finalSnap.val() || {};
  if (String(finalData.pin || "") !== pin) {
    throw new functions.https.HttpsError("permission-denied", "Invalid character pin.");
  }
  return {
    ok: true,
    xp: clampInt(finalData.xp, 0, 9999999),
    gold: clampInt(finalData.gold, 0, 9999999),
    hp: clampInt(finalData.hp, 1, 9999),
    mp: clampInt(finalData.mp, 0, 9999),
    maxHp: clampInt(finalData.maxHp, 1, 9999),
    challengeBestLevel: clampInt(finalData.challengeBestLevel, 0, 10)
  };
});
