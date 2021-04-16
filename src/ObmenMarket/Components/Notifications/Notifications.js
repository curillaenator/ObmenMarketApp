import firebase from "firebase/app";
import "firebase/messaging";
import { messaging } from "../../../Utils/firebase";

export const notifications = function() {
if(firebase.messaging.isSupported()) {
  messaging.getToken(
    { vapidKey: 'BOsXtfpHw1gYRFvpZ_bcpZvyRKlFtEJRdAmlcmK_aMdWq9YEsB30L2WKmpnGpe77jd0Cv5DFhjQKH9xHZoq2_fs' }).then((currentToken) => {
    if (currentToken) {
      // const token = messaging.getToken();
    } else {
      // Show permission request UI
      console.log('No registration token available. Request permission to generate one.');
      // ...
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // ...
  });
  navigator.serviceWorker.addEventListener("message", (message) => console.log(message));
}
}
