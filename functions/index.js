const functions = require("firebase-functions");
const { Path } = require("path-parser");

const admin = require("firebase-admin");
admin.initializeApp();

const createTags = async (id) => {
  const lotMeta = await admin.database().ref(id).once("value");
  functions.logger.log(` LotMeta = "${lotMeta}" `);

  const { title, uid } = lotMeta.val();
  functions.logger.log(` Title & UID = "${title}" & ${uid}`);

  const photoPromise = await (
    await admin.storage().ref(`posts/${uid}/${id}`).listAll()
  ).items.map((item) => item.getDownloadURL());

  const photoLinks = await Promise.all(photoPromise);
  functions.logger.log(` PhotoLinks = "${photoLinks}"`);

  return `
  <title>${title} | Обмен.маркет</title>
  <meta name="description" content="Предложите мне что-то равноценное и интересное в обмен на ${title} на Обмен.маркет">
  <meta name="image" content="${photoLinks[0]}">
  <!-- Schema.org for Google -->
  <meta itemprop="name" content=${title}>
  <meta itemprop="description" content="Предложите мне что-то равноценное и интересное в обмен на ${title} на Обмен.маркет">
  <meta itemprop="image" content="${photoLinks[0]}">
  <!-- Twitter -->
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="Предложите мне что-то равноценное и интересное в обмен на ${title} на Обмен.маркет">
  <meta name="twitter:image:src" content="${photoLinks[0]}">
  <!-- Open Graph general (Facebook, Pinterest & Google+) -->
  <meta name="og:title" content="${title}">
  <meta name="og:description" content="Предложите мне что-то равноценное и интересное в обмен на ${title} на Обмен.маркет">
  <meta name="og:image" content="${photoLinks[0]}">
  <meta name="og:url" content="https://obmen.market/posts/${id}">
  <meta name="og:site_name" content="Обмен.маркет">
  <meta name="og:locale" content="ru_RU">
  <meta name="fb:admins" content="102352718682701">
  <meta name="fb:app_id" content="5838082132931263">
  <meta name="og:type" content="article:ticket">`;
};

const template = (tags) => `
<!DOCTYPE html>
<html lang="ru">
  <head>

  <!-- Meta tags -->

    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="referrer" content="origin" />
    <meta name="referrer" content="origin-when-cross-origin" />

    ${tags}

    <!-- App settings and icons -->

    <meta name="mobile-web-app-capable" content="no" />
    <meta name="apple-mobile-web-app-capable" content="no" />
    <meta
      name="apple-mobile-web-app-status-bar-style"
      content="white-translucent" />
    <meta name="apple-mobile-web-app-status-bar-style" content="#FFFFFF" />
    <meta name="apple-mobile-web-app-title" content="Обмен.маркет" />
    <meta name="application-name" content="Обмен.маркет" />
    <meta name="msapplication-TileColor" content="#7000ff" />
    <meta
      name="msapplication-TileImage"
      content="https://obmen.market/mstile-144x144.png?type=duotone.v1" />
    <meta
      name="msapplication-config"
      content="https://obmen.market/browserconfig.xml?type=duotone.v1" />
    <meta name="msapplication-tap-highlight" content="no" />
    <meta name="theme-color" content="#f7f6f8" />

<!-- Links -->

    <link
      rel="apple-touch-icon"
      sizes="180x180"
      href="https://obmen.market/apple-touch-icon.png?type=duotone.v1" />
    <link
      rel="icon"
      type="image/png"
      sizes="32x32"
      href="https://obmen.market/favicon-32x32.png?type=duotone.v1" />
    <link
      rel="icon"
      type="image/png"
      sizes="16x16"
      href="https://obmen.market/favicon-16x16.png?type=duotone.v1" />
    <link
      rel="manifest"
      href="https://obmen.market/site.webmanifest?type=duotone.v1" />
    <link
      rel="mask-icon"
      href="https://obmen.market/safari-pinned-tab.svg?type=duotone.v1"
      color="#7000ff" />
    <link
      rel="shortcut icon"
      href="https://obmen.market/favicon.ico?type=duotone.v1" />
    <link
      rel="preconnect"
      href="https://fonts.gstatic.com" />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
      rel="stylesheet" />
  </head>
  <body>
  <script defer type="module" src="/static/js/runtime-main.3fd8c8ae.js.map"></script>
  <script defer type="module" src="/static/js/main.7f4a4819.chunk.js.map"></script>
  <script defer type="module" src="/static/js/2.3103ecab.chunk.js.map"></script>
    <div id="root"></div>
  </body>
</html>
`;

exports.addsocialmeta = functions.https.onRequest(async (req, res) => {
  const path = new Path("/posts/:id");
  functions.logger.log(` Path created "${path}" `);

  const { id } = path.test(req.path);
  functions.logger.log(` ID = "${id}" `);

  const tags = await createTags(id);
  functions.logger.log(` TAGS = "${tags}" `);

  const html = template(tags);

  res.set("Cache-Control", "public, max-age=0, s-maxage=0");
  res.send(html);
});
