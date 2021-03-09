import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import { setUser } from "./user";

firebase.initializeApp({
  apiKey: "AIzaSyBmYNXLxCwaIR_U2RYWUAzCeRIQjixMVv4",
  authDomain: "obmen-market-666.firebaseapp.com",
  databaseURL:
    "https://obmen-market-666-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "obmen-market-666",
  storageBucket: "obmen-market-666.appspot.com",
  messagingSenderId: "755387476175",
  appId: "1:755387476175:web:5b498b1b1c23fe5268afba",
  measurementId: "G-QBMC7DMV5G",
});

const fireauth = firebase.auth();
// const firestore = firebase.firestore();

const IS_AUTH = "auth/IS_AUTH";

const initialState = {
  isAuth: false,
  appName: "Обмен.Маркет",
  providers: ["google", "vk"],
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
