const ITEMS = {
    "fakard_01": { 
        id: "fakard_01", 
        name: "Ócska Fakard", 
        type: "fegyver",
        price: 150,
        sellPrice: 35,
        atk: 2, 
        def: 0, 
        rarity: "common", 
        img: "https://i.ibb.co/1YryWDNW/Copilot-20260403-152801.png" 
    },
    "szakadtfelso_01": { 
        id: "szakadtfelso_01", 
        name: "Szakadt Felső", 
        type: "páncél",
        price: 80,
        sellPrice: 20,
        atk: 0, 
        def: 2, 
        rarity: "common", 
        img: "https://i.ibb.co/zw8sSP7/Copilot-20260403-153302.png" 
    },
    // --- ÚJ GYÓGYÍTÓ TÁRGYAK ---
    "potion_01": {
        id: "potion_01",
        name: "Kisebb Életerő Ital",
        type: "consumable",
        heal: 25,       // 25 HP-t tölt vissza
        price: 50,      // Boltban ennyibe kerül
        sellPrice: 15,  // Eladáskor ennyit kapsz érte
        rarity: "common",
        img: "https://i.ibb.co/3YChW7rk/Copilot-20260405-034109.png" // A képed linkje
    },
    "potion_02": {
        id: "potion_02",
        name: "Nagyobb Életerő Ital",
        type: "consumable",
        heal: 60,       // 60 HP-t tölt vissza
        price: 120,
        sellPrice: 40,
        rarity: "uncommon",
        img: "https://i.ibb.co/3YChW7rk/Copilot-20260405-034109.png" // Használhatod ugyanazt, vagy kereshetsz másikat
    }
};
