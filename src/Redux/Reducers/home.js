import { batch } from "react-redux";
import { db, fa } from "../../Utils/firebase";
import { toastsModel } from "../../Utils/toasts";

const SET_PROGRESS = "home/SET_PROGRESS";
const SET_FORM_MODE = "home/SET_FORM_MODE";
const SET_IS_OWNER = "home/SET_IS_OWNER";
const SET_PROFILE = "home/SET_PROFILE";
const SET_IS_MODAL_ON = "home/SET_IS_MODAL_ON";
const SET_TOAST = "home/SET_TOAST";

const initialState = {
  progress: null,
  isFormModeOn: false,
  isOwner: false,
  profile: null,
  isModalOn: false,
  isToast: null,
};

export const home = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROGRESS:
      return { ...state, progress: action.payload };

    case SET_FORM_MODE:
      return { ...state, isFormModeOn: action.mode };

    case SET_IS_OWNER:
      return { ...state, isOwner: action.payload };

    case SET_PROFILE:
      return { ...state, profile: action.payload };

    case SET_IS_MODAL_ON:
      return { ...state, isModalOn: action.payload };

    case SET_TOAST:
      return { ...state, isToast: action.payload };

    default:
      return state;
  }
};

// ACTIONs

export const setProgress = (payload) => ({ type: SET_PROGRESS, payload });
export const setIsModalOn = (payload) => ({ type: SET_IS_MODAL_ON, payload });
export const setFormMode = (mode) => ({ type: SET_FORM_MODE, mode });
const setIsOwner = (payload) => ({ type: SET_IS_OWNER, payload });
export const setProfile = (payload) => ({ type: SET_PROFILE, payload });
const setToast = (payload) => ({ type: SET_TOAST, payload });

// THUNKs

export const setNewToast = (type, title, message, button) => (dispatch) => {
  dispatch(setToast({ type, title, message, button }));
};

export const getProfile = (ownerID, matchedID) => (dispatch, getState) => {
  const id = matchedID ? matchedID : ownerID;
  const auth = fa.currentUser;

  if (!auth || auth.uid !== id) {
    return db.ref(`users/${id}`).once("values", (userMeta) => {
      batch(() => {
        dispatch(setProfile(userMeta.val()));
        dispatch(setIsOwner(false));
      });
    });
  }

  if (auth.uid === id) {
    return batch(() => {
      dispatch(setProfile(getState().auth.user));
      dispatch(setIsOwner(true));
    });
  }

  // db.ref("users/" + id).once("value", (snap) => {
  //   dispatch(setProfile(snap.val()));
  //   if (!auth) return dispatch(setIsOwner(false));
  //   if (auth.uid === id) return dispatch(setIsOwner(true));
  //   if (auth.uid !== id) return dispatch(setIsOwner(false));
  // });
};

export const realtimeToasts = (tst, history) => (dispatch) => {
  if (tst.type === "offerAdded") {
    return dispatch(
      setNewToast(
        "new",
        toastsModel.offerAdded.title,
        toastsModel.offerAdded.msg(tst.lotTitle),
        () => history.push(tst.toastLink)
      )
    );
  }

  if (tst.type === "offerApproved") {
    return dispatch(
      setNewToast(
        "new",
        toastsModel.offerApproved.title,
        toastsModel.offerApproved.msg(tst.lotTitle, tst.offerTitle),
        () => history.push(tst.toastLink)
      )
    );
  }

  if (tst.type === "offerConfirmed") {
    return dispatch(
      setNewToast(
        "new",
        toastsModel.offerConfirmed.title,
        toastsModel.offerConfirmed.msg(tst.lotTitle, tst.offerTitle),
        null
        // () => history.push(tst.toastLink)
      )
    );
  }
};
