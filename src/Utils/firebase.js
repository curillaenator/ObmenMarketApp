import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

firebase.initializeApp({
  apiKey: "AIzaSyBmYNXLxCwaIR_U2RYWUAzCeRIQjixMVv4",
  authDomain: "obmen-market-666.firebaseapp.com",
  databaseURL:
    "https://obmen-market-666-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "obmen-market-666",
  storageBucket: "obmen-market-666.appspot.com",
  messagingSenderId: "755387476175",
  appId: "1:755387476175:web:5b498b1b1c23fe5268afba",
  measurementId: "G-QBMC7DMV5G",
});

export const fireauth = firebase.auth();
export const firestore = firebase.firestore();
