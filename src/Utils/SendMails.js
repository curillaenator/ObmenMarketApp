import { fsdb, fst } from "./firebase";
import { newPostTpl, newOfferTpl, offerApprovedTpl, offerConfirmedTpl } from "./mailTemplates";

// SENDMAIL UTILS

// const bucket = "obmen-market-666.appspot.com";

const onSendRemover = (id) => {
  console.log("start" + id);

  // const unsub = fsdb
  //   .collection("mail")
  //   .doc(id)
  //   .onSnapshot((doc) => {
  //     if (doc.data().delivery.state === "SUCCESS") {
  //       fsdb.collection("mail").doc(id).delete();
  //       unsub();
  //     }
  //   });
};

// FUNCTIONS

export const onLotCreateSendMail = async (lotData) => {
  const lotPhoto = await fst
    .ref()
    .child(`posts/${lotData.uid}/${lotData.postid}/photo0`)
    .getDownloadURL();

  
  // const lotDescription =
  //   lotData.description.length > 50
  //     ? `${lotData.description.slice(0, 50)}...`
  //     : lotData.description;

  // Lot phtoto
  const finalLotPhoto = lotPhoto.replace("https://firebasestorage.googleapis.com", "https://ik.imagekit.io/wnq6ecptz6/firebase/tr:n-mail_small_photo");

  const lotMailBody = {
    delivery: { state: "CREATED" },
    toUids: [`${lotData.uid}`],
    message: {
      subject: "✏️ Объявление опубликовано!",
      html: newPostTpl(
        lotData.title,
        `https://obmen.market/posts/${lotData.postid}`,
        finalLotPhoto,
        `https://obmen.market/posts/${lotData.postid}?action=extend`,
        `https://obmen.market?action=createpost`
      ),
    },
  };
  fsdb
    .collection("mail")
    .add(lotMailBody)
    .then((doc) => onSendRemover(doc.id));
};

export const onOfferCreateSendMail = async (lotMeta, offerData) => {

  const lotPhoto = await fst
  .ref()
  .child(`posts/${lotMeta.uid}/${lotMeta.postid}/photo0`)
  .getDownloadURL();

  // Offer photo
  const offerPhotoPath = offerData.photoURLs[0];
  const finalOfferPhoto = offerPhotoPath.replace("https://firebasestorage.googleapis.com", "https://ik.imagekit.io/wnq6ecptz6/firebase/tr:n-mail_big_photo");

  // Lot phtoto
  const finalLotPhoto = lotPhoto.replace("https://firebasestorage.googleapis.com", "https://ik.imagekit.io/wnq6ecptz6/firebase/tr:n-mail_small_photo");


  const offerMailBody = {
    delivery: { state: "CREATED" },
    toUids: [`${lotMeta.uid}`],
    message: {
      subject: "🎉 Новое предложение!",
      html: newOfferTpl(
        offerData.name,
        `https://obmen.market/posts/${lotMeta.postid}?action=view&offer=${offerData.offerID}`,
        finalOfferPhoto,
        offerData.description,
        `https://obmen.market/posts/${lotMeta.postid}?action=approved&offerID=${offerData.offerID}`,
        `https://obmen.market/posts/${lotMeta.postid}?action=decline&offerID=${offerData.offerID}`,
        `https://obmen.market/posts/${lotMeta.postid}`,
        lotMeta.title,
        finalLotPhoto
      ),
    },
  };

  fsdb
    .collection("mail")
    .add(offerMailBody)
    .then((doc) => onSendRemover(doc.id));
};

export const onApproveByLotAuthor = async (lotMeta, offerData) => {
  
  const lotPhoto = await fst
  .ref()
  .child(`posts/${lotMeta.uid}/${lotMeta.postid}/photo0`)
  .getDownloadURL();

  // Lot phtoto
  const finalLotPhoto = lotPhoto.replace("https://firebasestorage.googleapis.com", "https://ik.imagekit.io/wnq6ecptz6/firebase/tr:n-mail_small_photo");

  const approveMailBody = {
    delivery: { state: "CREATED" },
    toUids: [`${offerData.uid}`],
    message: {
      subject: "🥂 Предложение принято!",
      html: offerApprovedTpl(
        lotMeta.title,
        finalLotPhoto,
        offerData.name,
        `https://obmen.market/posts/${lotMeta.postid}?action=view&offer=${offerData.offerID}`,
        `https://obmen.market/posts/${lotMeta.postid}`,
        `https://obmen.market/posts/${lotMeta.postid}?action=approve&offer=${offerData.offerID}`,
        `https://obmen.market/posts/${lotMeta.postid}?action=decline&offer=${offerData.offerID}`
      ),
    },
  };

  fsdb
    .collection("mail")
    .add(approveMailBody)
    .then((doc) => onSendRemover(doc.id));
};

export const onConfirmByOfferAuthor = async (lotMeta, offerData) => {
  
  const lotPhoto = await fst
  .ref()
  .child(`posts/${lotMeta.uid}/${lotMeta.postid}/photo0`)
  .getDownloadURL();

  // Lot phtoto
  const finalLotPhoto = lotPhoto.replace("https://firebasestorage.googleapis.com", "https://ik.imagekit.io/wnq6ecptz6/firebase/tr:n-mail_small_photo");

  const confirmMailBody = {
    delivery: { state: "CREATED" },
    toUids: [`${lotMeta.uid}`],
    message: {
      subject: "Предложение подтверждено!",
      html: offerConfirmedTpl(
        lotMeta.title,
        finalLotPhoto,
        offerData.name,
        `https://obmen.market/posts/${lotMeta.postid}?action=view&offer=${offerData.offerID}`,
        `https://obmen.market/posts/${lotMeta.postid}`,
        `https://obmen.market/posts/${lotMeta.postid}?action=chat&offer=${offerData.offerID}`
      ),
    },
  };

  fsdb
    .collection("mail")
    .add(confirmMailBody)
    .then((doc) => onSendRemover(doc.id));
};