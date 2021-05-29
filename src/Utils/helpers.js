import { fst } from "./firebase";

export const lotImageGetter = async (lot) => {
  const bucket =
    "https://firebasestorage.googleapis.com/v0/b/obmen-market-666.appspot.com/o/";

  const urlsPromiser = async (prefix) => {
    const urlsPromises = await fst
      .ref(`${prefix}posts/${lot.uid}/${lot.postid}`)
      .listAll()
      .then((res) => res.items.map((item) => item.getDownloadURL()));

    const fullUrls = await Promise.all(urlsPromises);

    return fullUrls.map((url) => url.replace(bucket, ""));
  };

  const urls = await urlsPromiser("");
  const blurls = await urlsPromiser("blyadstvo/");

  return urls
    .map((url) =>
      blurls.includes(`blyadstvo%2F${url}`)
        ? blurls.find((blurl) => blurl === `blyadstvo%2F${url}`)
        : url
    )
    .map((url) => `${bucket}${url}`);
};

export const fileNamer = (fName, num) => {
  const fileExt = fName.split(".")[fName.split(".").length - 1];
  return `photo${num}.${fileExt}`;
};
