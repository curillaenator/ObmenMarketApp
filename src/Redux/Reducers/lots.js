import { fb, db, fa } from "../../Utils/firebase";

import { setFormMode } from "./home";

const SET_NEWLOT_ID = "lots/SET_NEWLOT_ID";
const SET_IS_LOTMETA = "lots/SET_IS_LOTMETA";
const SET_CURRENT_LOTMETA = "lots/SET_CURRENT_LOT";
const SET_CURRENT_LOTPHOTOS = "lots/SET_CURRENT_LOTPHOTOS";

const initialState = {
  createLotId: null,
  isLotMeta: false,
  currentLotMeta: null,
  currentLotPhotos: null,
};

export const lots = (state = initialState, action) => {
  switch (action.type) {
    case SET_NEWLOT_ID:
      return { ...state, createLotId: action.id };

    case SET_CURRENT_LOTMETA:
      return { ...state, currentLotMeta: action.payload };

    case SET_CURRENT_LOTPHOTOS:
      return { ...state, currentLotPhotos: action.payload };

    case SET_IS_LOTMETA:
      return { ...state, isLotMeta: action.payload };

    default:
      return state;
  }
};

// ACTIONS

const setNewLotId = (id) => ({ type: SET_NEWLOT_ID, id });
const setIsLotMeta = (payload) => ({ type: SET_IS_LOTMETA, payload });
const setLotMeta = (payload) => ({ type: SET_CURRENT_LOTMETA, payload });
const setLotPhotos = (payload) => ({ type: SET_CURRENT_LOTPHOTOS, payload });

export const onLotCreateFromForm = () => async (dispatch) => {
  const authedUser = await fa.currentUser;
  const newLotId = await db.ref().child("posts").push().key;

  const newLotData = {
    uid: authedUser.uid,
    postid: newLotId,
    username: authedUser.displayName,
    avatar: authedUser.photoURL,
    published: false,
    draft: true,
  };

  dispatch(setNewLotId(newLotId));
  const updates = {};
  updates["/posts/" + newLotId] = newLotData;
  // console.log(updates);
  db.ref().update(updates);
};

export const onLotCreateFormCancel = (id) => async (dispatch) => {
  await db.ref("posts/" + id).remove();
  dispatch(setNewLotId(null));

  const storage = fb.storage().ref();
  storage
    .child("posts/" + fa.currentUser.uid + "/" + id)
    .listAll()
    .then((res) => res.items.forEach((item) => item.delete()));
};

export const publishNewLotFromForm = (id, updData) => async (dispatch) => {
  const onUpdate = (error) => {
    if (error) return console.log("ошибка записи");
    db.ref("posts/" + id).once("value", (snap) => {
      dispatch(setLotMeta(snap.val()));
      dispatch(setFormMode(false));
    });
  };
  await db.ref("posts/" + id).update(updData, onUpdate);
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

