import { fsdb } from "./firebase";

// SENDMAIL UTILS

const bucket = "obmen-market-666.appspot.com";

const onSendRemover = (id) => {
  console.log("start");

  const unsub = fsdb
    .collection("mail-test")
    .doc(id)
    .onSnapshot((doc) => {
      if (doc.data().delivery.state === "SUCCESS") {
        console.log("finish");

        fsdb.collection("mail-test").doc(id).delete();

        unsub();
      }
    });

  const stateAdder = () => {
    console.log("stateChange");

    fsdb
      .collection("mail-test")
      .doc(id)
      .update({ delivery: { state: "SUCCESS" } });
  };

  setTimeout(stateAdder, 5000);
};

// FUNCTIONS

export const onLotCreateSendMail = (lotData) => {
  const lotMailBody = {
    delivery: { state: "CREATED" },
    toUids: [`${lotData.uid}`],
    template: {
      name: "new-post",
      data: {
        lotTitle: lotData.title,
        username: lotData.username,
        avatar: lotData.avatar,
        lotLink: `https://obmen.market/posts/${lotData.postid}`,
      },
    },
  };

  fsdb
    .collection("mail-test")
    .add(lotMailBody)
    .then((doc) => onSendRemover(doc.id));
};

export const onOfferCreateSendMail = (lotMeta, offerData) => {
  const offerMailBody = {
    delivery: { state: "CREATED" },
    toUids: [`${lotMeta.uid}`],
    template: {
      name: "new-offer",
      data: {
        offerTitle: offerData.name,
        offerDescription: offerData.description,
        offerOverprice: offerData.overprice,
        offerAuthorName: offerData.authorName,
        offerAuthorAvatar: offerData.avatar,
        offerPhotoLink: `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/offers%2F${lotMeta.postid}%2F${offerData.offerID}%2Foffer0?alt=media`,
        offerLink: `https://obmen.market/posts/${lotMeta.postid}`,
        acceptOfferLink: `https://obmen.market/posts/${lotMeta.postid}`,
      },
    },
  };

  fsdb
    .collection("mail-test")
    .add(offerMailBody)
    .then((doc) => onSendRemover(doc.id));
};

export const onApproveByLotAuthor = (lotMeta, offerMeta) => {
  const approveMailBody = {
    delivery: { state: "CREATED" },
    toUids: [`${offerMeta.authorID}`],
    template: {
      name: "your-offer-accepted",
      data: {
        lotTitle: lotMeta.title,
        lotPhotoLink: `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/posts%2F${lotMeta.uid}%2F${lotMeta.postid}%2Fphoto0?alt=media`,
        offerTitle: offerMeta.name,
        offerDescription: offerMeta.description,
        offerOverprice: offerMeta.overprice,
        offerAuthorName: offerMeta.authorName,
        offerAuthorAvatar: offerMeta.avatar,
        offerPhotoLink: `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/offers%2F${lotMeta.postid}%2F${offerMeta.offerID}%2Foffer0?alt=media`,
        offerLink: `https://obmen.market/posts/${lotMeta.postid}`,
        confirmOfferLink: `https://obmen.market/posts/${lotMeta.postid}`,
      },
    },
  };

  fsdb
    .collection("mail-test")
    .add(approveMailBody)
    .then((doc) => onSendRemover(doc.id));
};

export const onConfirmByOfferAuthor = (lotMeta, offerMeta) => {
  const approveMailBody = {
    delivery: { state: "CREATED" },
    toUids: [`${lotMeta.uid}`],
    template: {
      name: "start-chat",
      data: {
        lotTitle: lotMeta.title,
        lotPhotoLink: `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/posts%2F${lotMeta.uid}%2F${lotMeta.postid}%2Fphoto0?alt=media`,
        offerTitle: offerMeta.name,
        offerDescription: offerMeta.description,
        offerOverprice: offerMeta.overprice,
        offerAuthorName: offerMeta.authorName,
        offerAuthorAvatar: offerMeta.avatar,
        offerPhotoLink: `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/offers%2F${lotMeta.postid}%2F${offerMeta.offerID}%2Foffer0?alt=media`,
        offerLink: `https://obmen.market/posts/${lotMeta.postid}`,
        confirmOfferLink: `https://obmen.market/posts/${lotMeta.postid}`,
      },
    },
  };

  fsdb
    .collection("mail-test")
    .add(approveMailBody)
    .then((doc) => onSendRemover(doc.id));
};
