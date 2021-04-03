import firebase from "firebase";

// POSTS

const app = firebase.initializeApp({
  apiKey: "AIzaSyBmYNXLxCwaIR_U2RYWUAzCeRIQjixMVv4",
  authDomain: "obmen-market-666.firebaseapp.com",
  databaseURL: "https://obmenmarket.europe-west1.firebasedatabase.app/",
  projectId: "obmen-market-666",
  storageBucket: "obmen-market-666.appspot.com",
  messagingSenderId: "755387476175",
  appId: "1:755387476175:web:5b498b1b1c23fe5268afba",
  measurementId: "G-QBMC7DMV5G",
});

export const db = app.database();

export const postsRef = db.ref("posts");

/// OFFERS

export const db_offers = app
  .database("https://obmenmarket-offers.europe-west1.firebasedatabase.app/")
  .ref();

// COMMON

export const fb = firebase;
export const fa = firebase.auth();
// export const fn = firebase.functions();
// export const fs = firebase.firestore();

// using SendGrid's Node.js Library - https://github.com/sendgrid/sendgrid-nodejs
// export const sg = require("@sendgrid/mail")
// sg.setApiKey(process.env.SENDGRID_API_KEY)
