window.FIREBASE_CONFIG = {
    apiKey: "AIzaSyBg2WzLqxt0QRDkDiUKYrGRCw0Kg-gr1OU",
    authDomain: "dnd-tracker-4fe05.firebaseapp.com",
    projectId: "dnd-tracker-4fe05",
    databaseURL: "https://dnd-tracker-4fe05-default-rtdb.europe-west1.firebasedatabase.app"
};

window.initFirebaseDb = function initFirebaseDb() {
    if (!firebase.apps.length) {
        firebase.initializeApp(window.FIREBASE_CONFIG);
    }
    return firebase.database();
};
