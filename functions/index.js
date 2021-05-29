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

exports.indexnewentry = functions.database
  .instance("obmenmarket")
  .ref("posts/{postid}")
  .onCreate((lot, context) => {
    const firebaseObject = {
      title: lot.val().title,
      description: lot.val().description,
      categories: lot.val().categories,
      wishes: lot.val().wishes,
      expireDate: lot.val().expireDate,
      objectID: context.params.postid,
    };

    index.saveObject(firebaseObject);
  });

exports.indexupdentry = functions.database
  .instance("obmenmarket")
  .ref("posts/{postid}")
  .onUpdate((lot, context) => {
    const firebaseObject = {
      title: lot.after.val().title,
      description: lot.after.val().description,
      categories: lot.after.val().categories,
      wishes: lot.after.val().wishes,
      expireDate: lot.after.val().expireDate,
      objectID: context.params.postid,
    };

    index.partialUpdateObject(firebaseObject);
  });

exports.indexdelentry = functions.database
  .instance("obmenmarket")
  .ref("posts/{postid}")
  .onDelete((lot, context) => {
    index.deleteObject(context.params.postid);
  });

exports.searchentry = functions.database
  .instance("obmenmarket")
  .ref("search/queries/{queryid}")
  .onCreate(async (snap, context) => {
    const query = snap.val().query;
    const key = snap.key;

    // const requestOptions = {
    //   timeouts: { read: 10 },
    // };

    const content = await index.search(query);

    const updates = {
      "search/last_query_timestamp": Date.parse(context.timestamp),
    };
    updates[`search/results/${key}`] = content;
    return admin.database().ref().update(updates);
  });
