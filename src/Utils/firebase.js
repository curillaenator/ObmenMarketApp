import firebase from "firebase";
// import "firebase/<PACKAGE>";
// import "firebase/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyBmYNXLxCwaIR_U2RYWUAzCeRIQjixMVv4",
  authDomain: "obmen-market-666.firebaseapp.com",
  databaseURL: "https://obmenmarket.europe-west1.firebasedatabase.app/",
  projectId: "obmen-market-666",
  storageBucket: "obmen-market-666.appspot.com",
  messagingSenderId: "755387476175",
  appId: "1:755387476175:web:5b498b1b1c23fe5268afba",
  measurementId: "G-QBMC7DMV5G",
});

export const fb = firebase;
export const fa = firebase.auth();
export const db = firebase.database();
export const fn = firebase.functions();
export const fs = firebase.firestore();

export const postsRef = db.ref("posts");
// export const usersRef = db.ref("users");

// export const firestore = firebase.firestore();

// using SendGrid's Node.js Library - https://github.com/sendgrid/sendgrid-nodejs
export const sg = require("sendgrid")("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");