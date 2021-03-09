import firebase from "firebase";
import { setUser } from "./user";
import { fireauth, firestore } from "../../Utils/firebase";

const IS_AUTH = "auth/IS_AUTH";

const initialState = {
  isAuth: false,
  fireauth,
  firestore,
  appName: "Обмен.Маркет",
};

export const auth = (state = initialState, action) => {
  switch (action.type) {
    case IS_AUTH:
      return { ...state, isAuth: action.auth };
    default:
      return state;
  }
};

// ACTIONs

const setIsAuth = (auth) => ({ type: IS_AUTH, auth });

// THUNKs

export const authWithGoogle = () => async (dispatch) => {
  const provider = new firebase.auth.GoogleAuthProvider();
  const { user } = await fireauth.signInWithPopup(provider);
  dispatch(setUser(user));
  dispatch(setIsAuth(true));
};

export const setAuthIfLogined = (userData) => (dispatch) => {
  dispatch(setUser(userData));
  userData !== null ? dispatch(setIsAuth(true)) : dispatch(setIsAuth(false));
};

export const logout = () => async (dispatch) => {
  await fireauth.signOut();
  dispatch(setIsAuth(false));
  dispatch(setUser(null));
};
