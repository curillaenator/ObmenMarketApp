import { db, fa } from "../../Utils/firebase";

const SET_FORM_MODE = "home/SET_FORM_MODE";
const SET_IS_OWNER = "home/SET_IS_OWNER";
const SET_PROFILE = "home/SET_PROFILE";
const SET_IS_MODAL_ON = "home/SET_IS_MODAL_ON";

const initialState = {
  isFormModeOn: false,
  isOwner: false,
  profile: null,
  isModalOn: false,
};

export const home = (state = initialState, action) => {
  switch (action.type) {
    case SET_FORM_MODE:
      return { ...state, isFormModeOn: action.mode };

    case SET_IS_OWNER:
      return { ...state, isOwner: action.payload };

    case SET_PROFILE:
      return { ...state, profile: action.payload };

    case SET_IS_MODAL_ON:
      return { ...state, isModalOn: action.payload };

    default:
      return state;
  }
};

// ACTIONs

export const setIsModalOn = (payload) => ({ type: SET_IS_MODAL_ON, payload });
export const setFormMode = (mode) => ({ type: SET_FORM_MODE, mode });
const setIsOwner = (payload) => ({ type: SET_IS_OWNER, payload });
export const setProfile = (payload) => ({ type: SET_PROFILE, payload });

// THUNKs

export const getProfile = (ownerID, matchedID) => (dispatch) => {
  const id = matchedID ? matchedID : ownerID;
  const auth = fa.currentUser;

  db.ref("users/" + id).once("value", (snap) => {
    dispatch(setProfile(snap.val()));
    if (!auth) return dispatch(setIsOwner(false));
    if (auth.uid === id) return dispatch(setIsOwner(true));
    if (auth.uid !== id) return dispatch(setIsOwner(false));
  });
};
