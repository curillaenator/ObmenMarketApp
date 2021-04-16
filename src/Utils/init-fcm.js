

const messaging = initializedFirebaseApp.messaging();

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

export {messaging}