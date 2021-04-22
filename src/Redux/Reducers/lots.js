import { fb, db, fa, db_offers } from "../../Utils/firebase";

import { setFormMode } from "./home";

const SET_NEWLOT_ID = "lots/SET_NEWLOT_ID";
const SET_IS_LOTCREATED = "lots/SET_IS_LOTCREATED";
const SET_CURRENT_ID = "lots/SET_CURRENT_ID";
const SET_IS_LOTMETA = "lots/SET_IS_LOTMETA";
const SET_IS_LOTPHOTOS = "lots/SET_IS_LOTPHOTOS";
const SET_CURRENT_LOTMETA = "lots/SET_CURRENT_LOT";
const SET_CURRENT_LOTPHOTOS = "lots/SET_CURRENT_LOTPHOTOS";
const SET_NEW_OFFERMETA = "lots/SET_NEW_OFFER_ID";

const initialState = {
  createLotId: null,
  isLotCreated: false,
  currentLotId: null,
  isLotMeta: false,
  isLotPhotos: false,
  currentLotMeta: null,
  currentLotPhotos: null,
  newOfferMeta: null,
};

export const lots = (state = initialState, action) => {
  switch (action.type) {
    case SET_NEWLOT_ID:
      return { ...state, createLotId: action.id };

    case SET_IS_LOTCREATED:
      return { ...state, isLotCreated: action.bool };

    case SET_CURRENT_ID:
      return { ...state, currentLotId: action.id };

    case SET_CURRENT_LOTMETA:
      return { ...state, currentLotMeta: action.payload };

    case SET_CURRENT_LOTPHOTOS:
      return { ...state, currentLotPhotos: action.payload };

    case SET_IS_LOTMETA:
      return { ...state, isLotMeta: action.payload };

    case SET_IS_LOTPHOTOS:
      return { ...state, isLotPhotos: action.payload };

    case SET_NEW_OFFERMETA:
      return { ...state, newOfferMeta: action.payload };

    default:
      return state;
  }
};

// ACTIONS

export const setNewLotId = (id) => ({ type: SET_NEWLOT_ID, id });
export const setIsLotCreated = (bool) => ({ type: SET_IS_LOTCREATED, bool });
const setCurrentLotId = (id) => ({ type: SET_CURRENT_ID, id });
const setIsLotMeta = (payload) => ({ type: SET_IS_LOTMETA, payload });
const setIsLotPhotos = (payload) => ({ type: SET_IS_LOTPHOTOS, payload });
const setLotMeta = (payload) => ({ type: SET_CURRENT_LOTMETA, payload });
const setLotPhotos = (payload) => ({ type: SET_CURRENT_LOTPHOTOS, payload });
const setNewOfferMeta = (payload) => ({ type: SET_NEW_OFFERMETA, payload });

// THUNKS

// full Meta reset

export const resetMetaState = () => (dispatch) => {
  dispatch(setNewLotId(null));
  dispatch(setCurrentLotId(null));
  dispatch(setIsLotMeta(false));
  dispatch(setIsLotPhotos(false));
  dispatch(setLotMeta(null));
  dispatch(setLotPhotos(null));
  dispatch(setNewOfferMeta(null));
};

// lot create / cancel create / publish

export const onLotCreateFromForm = () => async (dispatch, getState) => {
  const onUpd = (error) =>
    error ? console.log(error) : console.log("success");

  const author = await fa.currentUser;
  const lotID = await db.ref().child("posts").push().key;

  const lotData = {
    uid: author.uid,
    postid: lotID,
    username: getState().auth.user.username,
    avatar: author.photoURL,
    published: false,
    draft: true,
  };

  dispatch(setNewLotId(lotID));

  db.ref(`posts/${lotID}`).update(lotData, onUpd);
};

export const onLotCreateFormCancel = (lotID) => async (dispatch) => {
  const author = await fa.currentUser;

  await db.ref(`posts/${lotID}`).remove();
  dispatch(setIsLotMeta(false));
  dispatch(setNewLotId(null));
  dispatch(setLotMeta(null));
  dispatch(setLotPhotos(null));

  fb.storage()
    .ref()
    .child(`posts/${author.uid}/${lotID}`)
    .listAll()
    .then((res) => res.items.forEach((item) => item.delete()));
};

export const publishNewLotFromForm = (lotID, updData) => (dispatch) => {
  const onUpdate = (error) => {
    error ? console.log(error) : console.log("success");

    db.ref(`posts/${lotID}`).once("value", (snap) => {
      dispatch(setLotMeta(snap.val()));
      dispatch(setIsLotMeta(true));
      dispatch(setFormMode(false));
      dispatch(setIsLotCreated(true));
    });
  };

  db.ref(`posts/${lotID}`).update(updData, onUpdate);
};

// lot open edit form & update from edit form

export const setEditLotForm = (lotID, isFormModeOn) => (dispatch) => {
  dispatch(setCurrentLotId(lotID));
  dispatch(setFormMode(!isFormModeOn));
};

export const updateLotFromEditForm = (lotID, updData) => (dispatch) => {
  dispatch(setIsLotMeta(false));

  const onUpdate = (error) => {
    error ? console.log(error) : console.log("success");

    db.ref(`posts/${lotID}`).once("value", (snap) => {
      dispatch(setLotMeta(snap.val()));
      dispatch(setIsLotMeta(true));
      dispatch(setFormMode(false));
    });
  };

  db.ref(`posts/${lotID}`).update(updData, onUpdate);
};

// get lotMeta & lotPhotos

export const getLotMeta = (lotID) => (dispatch) => {
  const getLotPhotos = async (lotMeta) => {
    const res = await fb
      .storage()
      .ref()
      .child("posts/" + lotMeta.uid + "/" + lotMeta.postid)
      .listAll();

    const photoList = [];

    await res.items.forEach((item) =>
      photoList.push(
        "https://firebasestorage.googleapis.com/v0/b/" +
          item.bucket +
          "/o/posts%2F" +
          lotMeta.uid +
          "%2F" +
          lotMeta.postid +
          "%2F" +
          item.name +
          "?alt=media"
      )
    );

    dispatch(setLotPhotos(photoList));
    dispatch(setLotMeta(lotMeta));
    dispatch(setIsLotPhotos(true));
    dispatch(setIsLotMeta(true));
  };

  db.ref("posts/" + lotID).once("value", (snap) => {
    const lotMeta = snap.val();
    dispatch(setFormMode(false));
    getLotPhotos(lotMeta);
  });
};

// offer create / cancel create / publish

export const onOfferCreate = (lotMeta) => (dispatch) => {
  const offerAuthor = fa.currentUser;

  const offerID = db_offers.child(lotMeta.postid).push().key;

  const offerInitial = {
    avatar: offerAuthor.photoURL,
    authorName: offerAuthor.displayName,
    offerID: offerID,
    authorID: offerAuthor.uid,
    photospath: `/offers/${lotMeta.postid}/${offerID}`,
  };

  const offerUpdate = {};
  offerUpdate[`${lotMeta.postid}/${offerID}`] = offerInitial;
  db_offers.update(offerUpdate);

  dispatch(setNewOfferMeta(offerInitial));
};

export const onOfferCancel = (offerMeta, lotMeta) => (dispatch) => {
  db_offers.child(`${lotMeta.postid}/${offerMeta.offerID}`).remove();
  dispatch(setNewOfferMeta(null));

  const storage = fb.storage().ref();

  storage
    .child(offerMeta.photospath)
    .listAll()
    .then((res) => res.items.forEach((item) => item.delete()));
};

export const createOffer = (lotMeta, offerFormData) => async (dispatch) => {
  const offerUpdate = {};
  offerUpdate[`${lotMeta.postid}/${offerFormData.offerID}`] = offerFormData;
  db_offers.update(offerUpdate);

  dispatch(setNewOfferMeta(null));
};

// offer prolong

export const add48hours = (lotMeta) => (dispatch) => {
  const onUpdate = (error) => {
    if (error) return console.log("ошибка записи");

    db.ref("posts/" + lotMeta.postid).once("value", (snap) => {
      dispatch(setLotMeta(snap.val()));
      dispatch(setIsLotMeta(true));
    });
  };

  const newExpiry = new Date(
    Date.parse(lotMeta.expireDate) + 48 * 60 * 60 * 1000
  );

  db.ref("posts/" + lotMeta.postid).update({ expireDate: newExpiry }, onUpdate);
};

// offer accept by lotAuthor & confirm by offerAuthor

export const acceptConfirmOffer = (lotID, payload) => (dispatch) => {
  const onUpdate = (error) => {
    if (error) return console.log("ошибка записи");

    db.ref("posts/" + lotID).once("value", (snap) => {
      const lotMeta = snap.val();
      dispatch(setLotMeta(lotMeta));
      dispatch(setIsLotMeta(true));
      dispatch(setFormMode(false));
    });
  };

  db.ref("posts/" + lotID).update(payload, onUpdate);
};
