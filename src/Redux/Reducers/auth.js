import { fb, fa, db } from "../../Utils/firebase";

import { setRooms, resetRoomMessages } from "./chat";

const SET_INITIALIZED = "auth/SET_INITIALIZED";
const SET_OWNER_ID = "auth/SET_OWNER_ID";
const SET_IS_AUTH = "auth/IS_AUTH";
const SET_USER = "auth/SET_USER";
const SET_USER_CHATS = "auth/SET_USER_CHATS";

const initialState = {
  isInitialized: false,
  ownerID: null,
  isAuth: false,
  user: null,
};

export const auth = (state = initialState, action) => {
  switch (action.type) {
    case SET_INITIALIZED:
      return { ...state, isInitialized: action.payload };

    case SET_OWNER_ID:
      return { ...state, ownerID: action.payload };

    case SET_IS_AUTH:
      return { ...state, isAuth: action.auth };

    case SET_USER:
      return { ...state, user: action.user };

    case SET_USER_CHATS:
      return { ...state, user: { ...state.user, chats: action.payload } };

    default:
      return state;
  }
};

// ACTIONs

const setInitialized = (payload) => ({ type: SET_INITIALIZED, payload });
export const setIsAuth = (auth) => ({ type: SET_IS_AUTH, auth });
const setOwnerID = (payload) => ({ type: SET_OWNER_ID, payload });
const setAuthedUser = (user) => ({ type: SET_USER, user });
export const setUserChatsIDs = (payload) => ({ type: SET_USER_CHATS, payload });

// THUNKs

export const googleSignIn = () => async (dispatch) => {
  // // SendGrid
  // const email = {
  // to: 'info@obmen.market',
  // from: 'noreply@obmen.market',
  // subject: 'Sending with SendGrid is Fun',
  // html: 'and easy to do anywhere, even with Node.js',
  // }
  // sg.send(email).then(() => {
  //   console.log('Email sent')
  // })
  // .catch((error) => {
  //   console.error(error)
  // });
  // // End of SendGrid

  const newUser = (user) => {
    const newUser = {
      username: user.displayName,
      email: user.email,
      avatar: user.photoURL,
    };

    db.ref("users/" + user.uid)
      .set(newUser)
      .then(() => {
        // user.sendEmailVerification().then(() => console.log("sent"));
        dispatch(setOwnerID(user.uid));
        dispatch(setAuthedUser(newUser));
        dispatch(setIsAuth(true));
        dispatch(setInitialized(true));
      });
  };

  const provider = new fb.auth.GoogleAuthProvider();
  await fb.auth().signInWithPopup(provider);

  await fb.auth().onAuthStateChanged((user) => {
    if (!user) return;
    const ref = db.ref("users/" + user.uid);
    ref.once("value", (snapshot) => !snapshot.exists() && newUser(user));
  });
};

export const authCheck = (curUser) => (dispatch) => {
  if (curUser) {
    db.ref("users/" + curUser.uid).once("value", (snapshot) => {
      dispatch(setOwnerID(curUser.uid));
      dispatch(setAuthedUser(snapshot.val()));
      dispatch(setIsAuth(true));
      dispatch(setInitialized(true));
    });
  }

  if (!curUser) {
    dispatch(setInitialized(true));
  }
};

export const logout = () => async (dispatch) => {
  await fa.signOut();
  dispatch(resetRoomMessages());
  dispatch(setRooms(null));
  dispatch(setOwnerID(null));
  dispatch(setIsAuth(false));
  dispatch(setAuthedUser(null));
};

export const updateUserProfile = (userUpdData) => (dispatch) => {
  const userID = fa.currentUser.uid;

  const onUpdate = (error) => {
    if (error) return console.log("ошибка записи");

    db.ref("users/" + userID).once("value", (snapshot) => {
      dispatch(setAuthedUser(snapshot.val()));
    });
  };

  db.ref("users/" + userID).update(userUpdData, onUpdate);
};
