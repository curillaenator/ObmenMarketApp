const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

//---------------------------------
// Детект порева, жморева и Киркорева
//---------------------------------

// Node.js core modules
const fs = require("fs");
const mkdirp = fs.promises.mkdir;
const { promisify } = require("util");
const exec = promisify(require("child_process").exec);
const path = require("path");
const os = require("os");

// Vision API
const vision = require("@google-cloud/vision");

// Where we'll save blurred images
const BLURRED_FOLDER = "blurred";

exports.blurOffensiveImages = functions.storage
  .object()
  .onFinalize(async (object) => {
    const storage = admin.storage();
    const bucket = storage.bucket(object.bucket);
    const file = bucket.file(object.name);

    const pathFull = `gs://${object.bucket}/${object.name}`;
    const filePath = object.name;
    // const bucketName = object.bucket;
    // const metadata = object.metadata;

    const destination = bucket(
      `${filePath.split("/").pop().join("/")}/${BLURRED_FOLDER}/${file.name}`
    );

    const meta = await file.getMetadata();

    // Ignore things we've already blurred
    // if (object.name.startsWith(`${BLURRED_FOLDER}/`)) {
    if (object.name.includes(`${BLURRED_FOLDER}/`)) {
      functions.logger.log(`Ignoring upload "${object.name}"`);
      return null;
    }

    // Check the image content using the Cloud Vision API.
    const visionClient = new vision.ImageAnnotatorClient();
    const data = await visionClient.safeSearchDetection(pathFull);
    const safeSearchResult = data[0].safeSearchAnnotation;

    // functions.logger.log(
    //   `SafeSearch results on image "${object.name}"`,
    //   safeSearchResult
    // );

    // Tune these detection likelihoods to suit your app.
    // The current settings show the most strict configuration
    // Available likelihoods are defined in https://cloud.google.com/vision/docs/reference/rest/v1/AnnotateImageResponse#likelihood
    if (
      safeSearchResult.adult !== "VERY_UNLIKELY" ||
      safeSearchResult.spoof !== "VERY_UNLIKELY" ||
      safeSearchResult.medical !== "VERY_UNLIKELY" ||
      safeSearchResult.violence !== "VERY_UNLIKELY" ||
      safeSearchResult.racy !== "VERY_UNLIKELY"
    ) {
      //   functions.logger.log("Offensive image found. Blurring.");
      //   return blurImage(object.name, object.bucket, object.metadata);

      const tempLocalFile = path.join(os.tmpdir(), filePath);
      const tempLocalDir = path.dirname(tempLocalFile);

      new Promise(async (resolve) => {
        await mkdirp(tempLocalDir, { recursive: true });
        functions.logger.log(
          "Temporary directory has been created",
          tempLocalDir
        );

        // Download file from bucket.
        await bucket.file(filePath).download({ destination: tempLocalFile });
        functions.logger.log("The file has been downloaded to", tempLocalFile);

        await exec(
          `convert ${tempLocalFile} -resize 50% -grayscale Rec709Luma -blur 0x8 ${tempLocalFile}`
        );
        functions.logger.log("Blurred", tempLocalFile);

        // Uploading the Blurred image.
        await bucket.upload(tempLocalFile, {
          destination,
          meta,
          // destination: `${BLURRED_FOLDER}/${filePath}`,
          // metadata: { metadata: metadata }, // Keeping custom metadata.
        });

        functions.logger.log("Blurred image uploaded to Storage at", filePath);

        // Clean up the local file
        fs.unlinkSync(tempLocalFile);
        resolve(functions.logger.log("Finish", filePath));
      });
    }
  });

/**
 * Blurs the given image located in the given bucket using ImageMagick.
 */
// async function blurImage(filePath, bucketName, metadata) {

//   const tempLocalFile = path.join(os.tmpdir(), filePath);
//   const tempLocalDir = path.dirname(tempLocalFile);

//   const bucket = admin.storage().bucket(bucketName);

// Create the temp directory where the storage file will be downloaded.
//   await mkdirp(tempLocalDir, { recursive: true });
//   functions.logger.log("Temporary directory has been created", tempLocalDir);

// Download file from bucket.
//   await bucket.file(filePath).download({ destination: tempLocalFile });
//   functions.logger.log("The file has been downloaded to", tempLocalFile);

// Blur the image using ImageMagick.
//   await exec(
//     `convert ${tempLocalFile} -resize 50% -grayscale Rec709Luma -blur 0x8 ${tempLocalFile}`
//   );
//   functions.logger.log("Blurred image created at", tempLocalFile);

// Uploading the Blurred image.
//   await bucket.upload(tempLocalFile, {
//     destination: `${BLURRED_FOLDER}/${filePath}`,
//     metadata: { metadata: metadata }, // Keeping custom metadata.
//   });
//   functions.logger.log("Blurred image uploaded to Storage at", filePath);

//   // Clean up the local file
//   fs.unlinkSync(tempLocalFile);
//   functions.logger.log("Deleted local file", filePath);
// }
