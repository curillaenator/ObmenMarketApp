import { db } from "../../Utils/firebase";

const SET_FORM_MODE = "home/SET_FORM_MODE";
const SET_PROFILE_PEND = "home/SET_PROFILE_PEND";
const SET_IS_OWNER = "home/SET_IS_OWNER";
const SET_PROFILE = "home/SET_PROFILE";

const initialState = {
  isFormModeOn: false,
  isProfilePending: false,
  isOwner: false,
  profile: null,
};

export const home = (state = initialState, action) => {
  switch (action.type) {
    case SET_FORM_MODE:
      return { ...state, isFormModeOn: action.mode };

    case SET_PROFILE_PEND:
      return { ...state, isProfilePending: action.payload };

    case SET_IS_OWNER:
      return { ...state, isOwner: action.payload };

    case SET_PROFILE:
      return { ...state, profile: action.payload };

    default:
      return state;
  }
};

// ACTIONs

export const setFormMode = (mode) => ({ type: SET_FORM_MODE, mode });
const setIsProfilePending = (payload) => ({ type: SET_PROFILE_PEND, payload });
const setIsOwner = (payload) => ({ type: SET_IS_OWNER, payload });
const setProfile = (payload) => ({ type: SET_PROFILE, payload });

// THUNKs

export const getProfile = (user, profileID) => (dispatch) => {
  const getSelectedUser = (profileID) => {
    db.ref("users/" + profileID).once("value", (snap) => {
      dispatch(setProfile(snap.val()));
      dispatch(setIsOwner(false));
      dispatch(setIsProfilePending(false));
    });
  };

  const setOwnerProfile = () => {
    dispatch(setProfile(user));
    dispatch(setIsOwner(true));
    dispatch(setIsProfilePending(false));
  };

  dispatch(setIsProfilePending(true));

  profileID ? getSelectedUser(profileID) : setOwnerProfile();
};
