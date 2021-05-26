import { fsdb, fst } from "./firebase";
import {
  newPostTpl,
  newOfferTpl,
  offerApprovedTpl,
  offerConfirmedTpl,
} from "./mailTemplates";

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

export const onLotCreateSendMail = async (lotMeta) => {
  const lotPromise = await (
    await fst.ref().child(`posts/${lotMeta.uid}/${lotMeta.postid}`).listAll()
  ).items.map((item) => item.getDownloadURL());

  const lotPhoto = await Promise.all(lotPromise);

  // Lot phtoto
  const finalLotPhoto = lotPhoto[0].replace(
    "https://firebasestorage.googleapis.com",
    "https://ik.imagekit.io/wnq6ecptz6/firebase/tr:n-mail_small_photo"
  );

  const lotMailBody = {
    delivery: { state: "CREATED" },
    toUids: [`${lotMeta.uid}`],
    message: {
      subject: "✏️ Объявление опубликовано!",
      html: newPostTpl(
        lotMeta.title,
        `https://obmen.market/posts/${lotMeta.postid}`,
        finalLotPhoto,
        `https://obmen.market/posts/${lotMeta.postid}?action=extend`,
        `https://obmen.market?action=createpost`
      ),
    },
    filters: {
      ganalytics: {
        settings: {
          enable: 1,
          utm_source: "New post notification",
          utm_medium: "email",
          utm_content: "Объявление опубликовано",
          utm_campaign: "Email notification",
        },
      },
    },
  };

  fsdb
    .collection("mail")
    .add(lotMailBody)
    .then((doc) => onSendRemover(doc.id));
};

export const onOfferCreateSendMail = async (lotMeta, offerData) => {
  const lotPromise = await (
    await fst.ref().child(`posts/${lotMeta.uid}/${lotMeta.postid}`).listAll()
  ).items.map((item) => item.getDownloadURL());

  const lotPhoto = await Promise.all(lotPromise);

  // Offer photo
  const offerPhotoPath = offerData.photoURLs[0];
  const finalOfferPhoto = offerPhotoPath.replace(
    "https://firebasestorage.googleapis.com",
    "https://ik.imagekit.io/wnq6ecptz6/firebase/tr:n-mail_big_photo"
  );

  // Lot phtoto
  const finalLotPhoto = lotPhoto[0].replace(
    "https://firebasestorage.googleapis.com",
    "https://ik.imagekit.io/wnq6ecptz6/firebase/tr:n-mail_small_photo"
  );

  const offerMailBody = {
    delivery: { state: "CREATED" },
    toUids: [`${lotMeta.uid}`],
    message: {
      subject: "⚡️ Новое предложение!",
      html: newOfferTpl(
        offerData.name,
        `https://obmen.market/posts/${lotMeta.postid}?action=view&offerID=${offerData.offerID}`,
        finalOfferPhoto,
        offerData.description,
        `https://obmen.market/posts/${lotMeta.postid}?action=approved&offerID=${offerData.offerID}`,
        `https://obmen.market/posts/${lotMeta.postid}?action=decline&offerID=${offerData.offerID}`,
        `https://obmen.market/posts/${lotMeta.postid}`,
        lotMeta.title,
        finalLotPhoto
      ),
    },
    filters: {
      ganalytics: {
        settings: {
          enable: 1,
          utm_source: "New offer notification",
          utm_medium: "email",
          utm_content: "Новое предложение",
          utm_campaign: "Email notification",
        },
      },
    },
  };

  fsdb
    .collection("mail")
    .add(offerMailBody)
    .then((doc) => onSendRemover(doc.id));
};

export const onApproveByLotAuthor = async (lotMeta, offerData) => {
  const lotPromise = await (
    await fst.ref().child(`posts/${lotMeta.uid}/${lotMeta.postid}`).listAll()
  ).items.map((item) => item.getDownloadURL());

  const lotPhoto = await Promise.all(lotPromise);

  // Lot phtoto
  const finalLotPhoto = await lotPhoto[0].replace(
    "https://firebasestorage.googleapis.com",
    "https://ik.imagekit.io/wnq6ecptz6/firebase/tr:n-mail_small_photo"
  );

  const approveMailBody = {
    delivery: { state: "CREATED" },
    toUids: [`${offerData.authorID}`],
    message: {
      subject: "🤝 Предложение принято!",
      html: offerApprovedTpl(
        lotMeta.title,
        finalLotPhoto,
        offerData.name,
        `https://obmen.market/posts/${lotMeta.postid}?action=view&offerID=${offerData.offerID}`,
        `https://obmen.market/posts/${lotMeta.postid}`,
        `https://obmen.market/posts/${lotMeta.postid}?action=confirmed&offerID=${offerData.offerID}`,
        `https://obmen.market/posts/${lotMeta.postid}?action=decline&offerID=${offerData.offerID}`
      ),
    },
    filters: {
      ganalytics: {
        settings: {
          enable: 1,
          utm_source: "Offer approved notification",
          utm_medium: "email",
          utm_content: "Предложение принято",
          utm_campaign: "Email notification",
        },
      },
    },
  };

  fsdb
    .collection("mail")
    .add(approveMailBody)
    .then((doc) => onSendRemover(doc.id));
};

export const onConfirmByOfferAuthor = async (lotMeta, offerData) => {
  const lotPromise = await (
    await fst.ref().child(`posts/${lotMeta.uid}/${lotMeta.postid}`).listAll()
  ).items.map((item) => item.getDownloadURL());

  const lotPhoto = await Promise.all(lotPromise);

  // Lot phtoto
  const finalLotPhoto = lotPhoto[0].replace(
    "https://firebasestorage.googleapis.com",
    "https://ik.imagekit.io/wnq6ecptz6/firebase/tr:n-mail_small_photo"
  );

  const confirmMailBody = {
    delivery: { state: "CREATED" },
    toUids: [`${lotMeta.uid}`],
    message: {
      subject: "🎉 Обмен подтвержден!",
      html: offerConfirmedTpl(
        lotMeta.title,
        finalLotPhoto,
        offerData.name,
        `https://obmen.market/posts/${lotMeta.postid}?action=view&offerID=${offerData.offerID}`,
        `https://obmen.market/posts/${lotMeta.postid}`,
        `https://obmen.market/posts/${lotMeta.postid}?action=chat&chatroomID=${offerData.offerID}`
      ),
    },
    filters: {
      ganalytics: {
        settings: {
          enable: 1,
          utm_source: "Exchange confirmed notification",
          utm_medium: "email",
          utm_content: "Предложение принято",
          utm_campaign: "Email notification",
        },
      },
    },
  };

  fsdb
    .collection("mail")
    .add(confirmMailBody)
    .then((doc) => onSendRemover(doc.id));
};
