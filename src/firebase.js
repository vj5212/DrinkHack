import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyB9hhuR8F0KBWhyfIBRiiu8KbqygL6xzmE",
    authDomain: "drinkhack-f8951.firebaseapp.com",
    projectId: "drinkhack-f8951",
    storageBucket: "drinkhack-f8951.appspot.com",
    messagingSenderId: "1079731836416",
    appId: "1:1079731836416:web:0193c1be16189a979e6ae5"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebaseApp.auth();
  const storage = firebaseApp.storage();
  const provider = new firebase.auth.GoogleAuthProvider();

  export{db, auth, provider, storage};