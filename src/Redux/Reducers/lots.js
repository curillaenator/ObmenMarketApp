// import { firestore } from "../../Utils/firebase";

const SET_UID = "createLot/SET_UID";
const SET_NEWLOT_ID = "createLot/SET_NEWLOT_ID";
const SET_LOTS = "lots/SET_LOTS";
const SET_IS_LOTS_LOADED = "lots/SET_IS_LOTS_LOADED";
const SET_CURRENT_LOT = "lots/SET_CURRENT_LOT";
const SET_IS_CURRENT_LOT = "lots/SET_IS_CURRENT_LOT";

const initialState = {
  lotsList: [],
  isLotsLoaded: false,
  currentLot: null,
  isCurrentLot: false,
  newLot: {
    published: false,
    title: "Title",
    uid: "",
  },
  newLotId: "",
};

export const lots = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOTS:
      return { ...state, lotsList: action.payload };
    case SET_IS_LOTS_LOADED:
      return { ...state, isLotsLoaded: action.payload };
    case SET_CURRENT_LOT:
      return { ...state, currentLot: action.payload };
    case SET_IS_CURRENT_LOT:
      return { ...state, isCurrentLot: action.payload };
    case SET_UID:
      return { ...state, newLot: { ...state.newLot, uid: action.uid } };
    case SET_NEWLOT_ID:
      return { ...state, newLotId: action.id };
    default:
      return state;
  }
};

// const setLotsList = (payload) => ({ type: SET_LOTS, payload });
// const setIsLotsLoaded = (payload) => ({ type: SET_IS_LOTS_LOADED, payload });
// const setCurrentLot = (payload) => ({ type: SET_CURRENT_LOT, payload });
// const setIsCurrentLot = (payload) => ({ type: SET_IS_CURRENT_LOT, payload });

export const getLotsList = () => async (dispatch) => {
  // const lotsArray = [];
  // await firestore
  //   .collection("posts")
  //   .where("published", "==", true)
  //   .get()
  //   .then((querySnapshot) =>
  //     querySnapshot.docs.forEach((doc) =>
  //       lotsArray.push({ ...doc.data(), lotId: doc.id })
  //     )
  //   );
  // dispatch(setLotsList(lotsArray));
  // dispatch(setIsLotsLoaded(true));
};

export const setIsCurrentLotAfterRedirect = (boolean) => (dispatch) => {
  // dispatch(setIsCurrentLot(boolean));
};

export const initializeLot = (lotData) => (dispatch) => {
  // firestore
  //   .collection("posts")
  //   .add(lotData)
  //   .then((docRef) => dispatch(setNewLotId(docRef.id)))
  //   .catch((error) => console.log(error));
};

export const deleteCanceledLot = (id) => (dispatch) => {
  // firestore
  //   .collection("posts")
  //   .doc(id)
  //   .delete()
  //   .then(() => dispatch(setNewLotId("")))
  //   .catch((error) => console.log(error));
};

export const publishLotFromForm = (id, submitData) => (dispatch) => {
  // firestore
  //   .collection("posts")
  //   .doc(id)
  //   .update(submitData)
  //   .then(() => {
  //     console.log("Publish success");
  //     firestore
  //       .collection("posts")
  //       .doc(id)
  //       .onSnapshot((doc) => {
  //         console.log(doc);
  //         dispatch(setCurrentLot(doc.data()));
  //         dispatch(setIsCurrentLot(true));
  //       });
  //   })
  //   .catch((error) => console.log(error));
};