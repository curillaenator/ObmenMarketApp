import { firestore } from "../../Utils/firebase";

const SET_LOTS = "lots/SET_LOTS";
const SET_IS_LOTS_LOADED = "lots/SET_IS_LOTS_LOADED";
const SET_CURRENT_LOT = "lots/SET_CURRENT_LOT";
const SET_IS_CURRENT_LOT = "lots/SET_IS_CURRENT_LOT";

const initialState = {
  lotsList: [],
  isLotsLoaded: false,
  currentLot: null,
  isCurrentLot: false,
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
    default:
      return state;
  }
};

const setLotsList = (payload) => ({ type: SET_LOTS, payload });
const setIsLotsLoaded = (payload) => ({ type: SET_IS_LOTS_LOADED, payload });
export const setCurrentLot = (payload) => ({ type: SET_CURRENT_LOT, payload });
export const setIsCurrentLot = (payload) => ({
  type: SET_IS_CURRENT_LOT,
  payload,
});

export const getLotsList = () => async (dispatch) => {
  const lotsArray = [];
  await firestore
    .collection("posts")
    .where("published", "==", true)
    .get()
    .then((querySnapshot) =>
      querySnapshot.docs.forEach((doc) =>
        lotsArray.push({ ...doc.data(), lotId: doc.id })
      )
    );
  dispatch(setLotsList(lotsArray));
  dispatch(setIsLotsLoaded(true));
};

export const setIsCurrentLotAfterRedirect = (boolean) => (dispatch) => {
  dispatch(setIsCurrentLot(boolean));
};
