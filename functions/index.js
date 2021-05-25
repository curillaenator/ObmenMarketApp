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

const database = admin.database().ref("posts");

exports.baseentry = functions.database
  .instance("obmenmarket")
  .ref("/search/write")
  .onWrite(async (data, context) => {
    database.once("value", (posts) => {
      const postsArr = Object.keys(posts.val())
        .map((id) => posts.val()[id])
        .map((obj) => ({
          title: obj.title,
          description: obj.description,
          categories: obj.categories,
          wishes: obj.wishes,
          objectID: obj.postid,
          expireDate: obj.expireDate,
        }));

      index
        .saveObjects(postsArr)
        .then(({ postsIDs }) => console.log(postsIDs))
        .catch((err) => console.log(err));
    });
  });

exports.indexentry = functions.database
  .instance("obmenmarket")
  .ref("/posts/{postid}")
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

    // return data.after.ref.parent
    //   .child("last_index_timestamp")
    //   .set(Date.parse(context.timestamp));
  });

exports.searchentry = functions.database
  .instance("obmenmarket")
  .ref("/search/queries/{queryid}")
  .onCreate(async (snap, context) => {
    const query = snap.val().query;
    const key = snap.key;

    const content = await index.search(query);
    const updates = {
      "/search/last_query_timestamp": Date.parse(context.timestamp),
    };
    updates[`/search/results/${key}`] = content;
    return admin.database().ref().update(updates);
  });
