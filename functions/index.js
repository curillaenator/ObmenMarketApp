const functions = require("firebase-functions");
const admin = require("firebase-admin");
const gm = require("gm").subClass({ imageMagick: true });
const path = require("path");
const vision = require("@google-cloud/vision");

const BLURED = "blured";

admin.initializeApp({
  databaseURL: "https://obmenmarket.europe-west1.firebasedatabase.app/",
});

exports.blurOffensiveImages = functions.storage
  .object()
  .onFinalize(async (object) => {
    const storage = admin.storage();
    const bucket = storage.bucket(object.bucket);
    const file = bucket.file(object.name);
    const filePath = `gs://${object.bucket}/${object.name}`;

    const fileMeta = await file.getMetadata();
    const meta = { ...fileMeta, contentType: object.contentType };

    console.log(filePath, meta);

    const checked = await vision.detectSafeSearch(file);

    if (checked[0].adult || checked[0].violence) {
      const tempFile = `gs://${object.bucket}/${BLURED}/${file.name}`;
      const tempLocalDir = path.dirname(tempFile);

      new Promise((resolve) => {
        file.download({ destination: tempLocalDir });
        resolve("ok");
      })
        .then((res) => {
          console.log(res);

          gm(tempLocalDir)
            .blur(0, 16)
            .write(tempLocalDir, (err, out) => {
              if (err) return err;
              console.log(out);
            });
        })
        .then(() => {
          bucket.file(`${BLURED}/${file.name}`).setMetadata(meta);
        });
    }
  });

// exec(`convert ${tempFile} -channel RGB -blur 0x8 ${tempFile}`);