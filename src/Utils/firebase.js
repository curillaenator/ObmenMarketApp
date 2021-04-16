import firebase from "firebase/app";
import "firebase/storage";
import "firebase/auth";
import "firebase/performance";
import "firebase/analytics";
import "firebase/database";
import "firebase/functions";
import "firebase/messaging";

// POSTS
// authDomain: "obmen-market-666.firebaseapp.com",

const app = firebase.initializeApp({
  apiKey: "AIzaSyBmYNXLxCwaIR_U2RYWUAzCeRIQjixMVv4",
  authDomain: "obmen.market",
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

/// CHAT

export const db_chat = app.database("https://obmenmarket-chat.firebaseio.com/");

// COMMON

export const fb = firebase;
export const fa = firebase.auth();
export const perf = firebase.performance();
export const fn = firebase.functions();
export const an = firebase.analytics();

export const messaging = app.messaging();

messaging.getToken({ vapidKey: 'BOsXtfpHw1gYRFvpZ_bcpZvyRKlFtEJRdAmlcmK_aMdWq9YEsB30L2WKmpnGpe77jd0Cv5DFhjQKH9xHZoq2_fs' }).then((currentToken) => {
  if (currentToken) {
    // Send the token to your server and update the UI if necessary
    // ...
  } else {
    // Show permission request UI
    console.log('No registration token available. Request permission to generate one.');
    // ...
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
  // ...
});

// using SendGrid's Node.js Library - https://github.com/sendgrid/sendgrid-nodejs
// export const sg = require("@sendgrid/mail")
// sg.setApiKey(process.env.SENDGRID_API_KEY)
