
// firebase for firestore query (get token from certain userId)
var firebase = require("firebase");
// firebase-admin for sending push notification
var admin = require("firebase-admin");

/**
* Update your Firebase Project
* Credentials and Firebase Database URL
* 
* Also generate a new serviceAccountKey.json and place it in the same folder as this file
*   this credentials should be the same as the ones used in the app
*/
var credentials = {
  apiKey: "<< API - KEY >>",
  authDomain: "ambev-app-demo.firebaseapp.com",
  databaseURL: "https://ambev-app-demo.firebaseio.com",
  projectId: "ambev-app-demo",
  storageBucket: "",
  messagingSenderId: "<< MESSAGING SENDER ID >>",
  appId: "<< APP ID >>"
};

// initializing firebase in two ways:
firebase.initializeApp(credentials);
admin.initializeApp({
  credential: admin.credential.cert('./serviceAccountKey.json'),
  databaseURL: credentials.databaseURL,
});


// get token by userId:
//    returns an array of tokenIds
function getTokens(userId) {
  console.info("\n\nquerying ", userId)
  var db = firebase.firestore().collection('devices');
  return new Promise((resolve, reject) => {
    db.where('userId', '==', userId)
      .get()
      .then(snapshot => {
        let ids = [];
        snapshot.forEach((doc) => {
          console.log(doc.id, '=>', doc.data());
          ids.push(doc.id);
        });
        resolve(ids);
      })
      .catch(err => {
        console.error(err);
        reject(err);
      });

  });
}
// send push notification
function sendNotification(title, message, tokens) {
  console.info("\n\n =============================== ****");
  var payload = {
    notification: {
      title: title,
      body: message,
    }
  };
  console.info("message: ", payload);
  var options = {
    priority: "high",
    timeToLive: 60 * 60 *24
  };
  console.info("to tokens: ", tokens);
  return admin.messaging().sendToDevice(tokens, payload, options);
}






// ===========================================================================
// sample function >>

async function sendTestMessage() {
  let userId = 'user.app';
  let tokens = await getTokens(userId);

  sendNotification("Teste", "Testing push notification", tokens)
    .then(response => console.info(response))
    .catch(err => console.error(err));
}

// run
sendTestMessage();
