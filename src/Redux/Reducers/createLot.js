// import firebase from "firebase";
import { firestore } from "../../Utils/firebase";

import { setCurrentLot, setIsCurrentLot } from "../Reducers/lots";

const SET_UID = "createLot/SET_UID";
const SET_NEWLOT_ID = "createLot/SET_NEWLOT_ID";

const initialState = {
  newLot: {
    published: false,
    title: "Title",
    uid: "",
  },
  newLotId: "",
};

export const createLot = (state = initialState, action) => {
  switch (action.type) {
    case SET_UID:
      return { ...state, newLot: { ...state.newLot, uid: action.uid } };
    case SET_NEWLOT_ID:
      return { ...state, newLotId: action.id };
    default:
      return state;
  }
};

export const setUidForLotForm = (uid) => ({ type: SET_UID, uid });
const setNewLotId = (id) => ({ type: SET_NEWLOT_ID, id });

export const initializeLot = (lotData) => (dispatch) => {
  firestore
    .collection("posts")
    .add(lotData)
    .then((docRef) => dispatch(setNewLotId(docRef.id)))
    .catch((error) => console.log(error));
};

export const deleteCanceledLot = (id) => (dispatch) => {
  firestore
    .collection("posts")
    .doc(id)
    .delete()
    .then(() => dispatch(setNewLotId("")))
    .catch((error) => console.log(error));
};

export const publishLotFromForm = (id, submitData) => (dispatch) => {
  firestore
    .collection("posts")
    .doc(id)
    .update(submitData)
    .then(() => {
      console.log("Publish success");
      firestore
        .collection("posts")
        .doc(id)
        .onSnapshot((doc) => {
          console.log(doc);
          dispatch(setCurrentLot(doc.data()));
          dispatch(setIsCurrentLot(true));
        });
    })
    .catch((error) => console.log(error));
};
