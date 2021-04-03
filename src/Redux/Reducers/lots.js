import { fb, db, fa, db_offers } from "../../Utils/firebase";

import { setFormMode } from "./home";

const SET_NEWLOT_ID = "lots/SET_NEWLOT_ID";
const SET_IS_LOTCREATED = "lots/SET_IS_LOTCREATED";
const SET_CURRENT_ID = "lots/SET_CURRENT_ID";
const SET_IS_LOTMETA = "lots/SET_IS_LOTMETA";
const SET_CURRENT_LOTMETA = "lots/SET_CURRENT_LOT";
const SET_CURRENT_LOTPHOTOS = "lots/SET_CURRENT_LOTPHOTOS";
const SET_NEW_OFFERMETA = "lots/SET_NEW_OFFER_ID";

const initialState = {
  createLotId: null,
  isLotCreated: false,
  currentLotId: null,
  isLotMeta: false,
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
const setLotMeta = (payload) => ({ type: SET_CURRENT_LOTMETA, payload });
const setLotPhotos = (payload) => ({ type: SET_CURRENT_LOTPHOTOS, payload });
const setNewOfferMeta = (payload) => ({ type: SET_NEW_OFFERMETA, payload });

// FIREBASE

export const onLotCreateFromForm = () => async (dispatch, getState) => {
  const author = await fa.currentUser;
  const lotID = await db.ref().child("posts").push().key;

  const newLotData = {
    uid: author.uid,
    postid: lotID,
    username: getState().auth.user.username,
    avatar: author.photoURL,
    published: false,
    draft: true,
  };

  dispatch(setNewLotId(lotID));

  const updates = {};
  updates["/posts/" + lotID] = newLotData;
  db.ref().update(updates);
};

export const onLotCreateFormCancel = (lotID) => async (dispatch) => {
  const author = await fa.currentUser;

  await db.ref("posts/" + lotID).remove();
  dispatch(setIsLotMeta(false));
  dispatch(setNewLotId(null));
  dispatch(setLotMeta(null));
  dispatch(setLotPhotos(null));

  const storage = fb.storage().ref();
  storage
    .child("posts/" + author.uid + "/" + lotID)
    .listAll()
    .then((res) => res.items.forEach((item) => item.delete()));
};

export const publishNewLotFromForm = (lotID, updData) => async (dispatch) => {
  const onUpdate = (error) => {
    if (error) return console.log("ошибка записи");
    db.ref("posts/" + lotID).once("value", (snap) => {
      dispatch(setLotMeta(snap.val()));
      dispatch(setIsLotMeta(true));
      dispatch(setFormMode(false));
      dispatch(setIsLotCreated(true));
    });
  };

  await db.ref("posts/" + lotID).update(updData, onUpdate);
};

export const updateLotFromEditForm = (lotID, updData) => (dispatch) => {
  const onUpdate = (error) => {
    if (error) return console.log("ошибка записи");
    db.ref("posts/" + lotID).once("value", (snap) => {
      dispatch(setLotMeta(snap.val()));
      dispatch(setFormMode(false));
    });
  };

  db.ref("posts/" + lotID).update(updData, onUpdate);
};

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
  };

  db.ref("posts/" + lotID).once("value", (snap) => {
    const lotMeta = snap.val();
    getLotPhotos(lotMeta);
    dispatch(setLotMeta(lotMeta));
    dispatch(setIsLotMeta(true));
    dispatch(setFormMode(false));
  });
};

export const setEditLotForm = (lotID, isFormModeOn) => (dispatch) => {
  // console.log(lotID);
  dispatch(setCurrentLotId(lotID));
  dispatch(setFormMode(!isFormModeOn));
};

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
