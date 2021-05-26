const algoliasearch = require("algoliasearch");
const functions = require("firebase-functions");

const admin = require("firebase-admin");
admin.initializeApp({
  databaseURL: "https://obmenmarket.europe-west1.firebasedatabase.app/",
});

const client = algoliasearch(
  functions.config().algolia.app_id,
  functions.config().algolia.api_key
);

const index = client.initIndex("title");

exports.indexentry = functions.database
  .instance("obmenmarket")
  .ref("posts/{postid}")
  .onWrite(async (data, context) => {
    const firebaseObject = {
      title: data.after.val().title,
      description: data.after.val().description,
      categories: data.after.val().categories,
      wishes: data.after.val().wishes,
      expireDate: data.after.val().expireDate,
      objectID: context.params.postid,
    };

    await index.saveObject(firebaseObject);

  });

exports.searchentry = functions.database
  .instance("obmenmarket")
  .ref("search/queries/{queryid}")
  .onCreate(async (snap, context) => {
    const query = snap.val().query;
    const key = snap.key;

    const content = await index.search(query);
    const updates = {
      "search/last_query_timestamp": Date.parse(context.timestamp),
    };
    updates[`search/results/${key}`] = content;
    return admin.database().ref().update(updates);
  });