import { fb, fa, db, db_notes } from "../../Utils/firebase";
import { batch } from "react-redux";

import { chatReset } from "./chat";
import { resetLotsState } from "./lots";

import { toast } from "react-toastify";
import { ToastComponent } from "../../ObmenMarket/Components/Toast/Toast";
import { toastsModel, slidein } from "../../Utils/toasts";

const SET_INITIALIZED = "auth/SET_INITIALIZED";
const SET_OWNER_ID = "auth/SET_OWNER_ID";
const SET_IS_AUTH = "auth/IS_AUTH";
const SET_USER = "auth/SET_USER";

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

    default:
      return state;
  }
};

// ACTIONs

const setInitialized = (payload) => ({ type: SET_INITIALIZED, payload });
export const setIsAuth = (auth) => ({ type: SET_IS_AUTH, auth });
const setOwnerID = (payload) => ({ type: SET_OWNER_ID, payload });
const setAuthedUser = (user) => ({ type: SET_USER, user });

// THUNKs

// authorization

export const googleSignIn = () => async (dispatch) => {
  const newUser = (user) => {
    const newUser = {
      username: user.displayName,
      email: user.email,
      avatar: user.photoURL,
    };

    db.ref("users/" + user.uid)
      .set(newUser)
      .then(() => {
        batch(() => {
          dispatch(setOwnerID(user.uid));
          dispatch(setAuthedUser(newUser));
          dispatch(setIsAuth(true));
          dispatch(setInitialized(true));
        });
      });
  };

  dispatch(resetLotsState());

  const provider = new fb.auth.GoogleAuthProvider();
  await fb.auth().signInWithPopup(provider);

  await fb.auth().onAuthStateChanged((user) => {
    if (!user) return;
    const ref = db.ref("users/" + user.uid);
    ref.once("value", (snapshot) => !snapshot.exists() && newUser(user));
  });
};

export const authCheck = (curUser, history) => (dispatch, getState) => {
  if (curUser) {
    db.ref("users/" + curUser.uid).once("value", (snapshot) => {
      db_notes.ref(curUser.uid).once("value", (oldNotes) => {
        const instance = oldNotes.exists() ? Object.keys(oldNotes.val()) : [];

        db_notes.ref(curUser.uid).on("child_added", (added) => {
          if (!instance.includes(added.key)) {
            if (added.val().type === "offerAdded") {
              return toast(
                ({ closeToast }) => (
                  <ToastComponent
                    title={toastsModel.offerAdded.title}
                    text={toastsModel.offerAdded.msg(added.val().lotTitle)}
                    icon={getState().ui.icons.toasts.new}
                    type="new"
                    close={closeToast}
                    button={() => {
                      history.push(added.val().toastLink);
                      closeToast();
                    }}
                  />
                ),
                { transition: slidein }
              );
            }

            if (added.val().type === "offerApproved") {
              return toast(
                ({ closeToast }) => (
                  <ToastComponent
                    title={toastsModel.offerApproved.title}
                    text={toastsModel.offerApproved.msg(
                      added.val().lotTitle,
                      added.val().offerTitle
                    )}
                    icon={getState().ui.icons.toasts.new}
                    type="new"
                    close={closeToast}
                    button={() => {
                      history.push(added.val().toastLink);
                      closeToast();
                    }}
                  />
                ),
                { transition: slidein }
              );
            }

            if (added.val().type === "offerConfirmed") {
              return toast(
                ({ closeToast }) => (
                  <ToastComponent
                    title={toastsModel.offerConfirmed.title}
                    text={toastsModel.offerConfirmed.msg(
                      added.val().lotTitle,
                      added.val().offerTitle
                    )}
                    icon={getState().ui.icons.toasts.new}
                    type="new"
                    close={closeToast}
                    // button={() => {
                    //   history.push(added.val().toastLink);
                    //   closeToast();
                    // }}
                  />
                ),
                { transition: slidein }
              );
            }
          }
        });
      });

      batch(() => {
        dispatch(setOwnerID(curUser.uid));
        dispatch(setAuthedUser(snapshot.val()));
        dispatch(setIsAuth(true));
        dispatch(setInitialized(true));
      });
    });
  }

  if (!curUser) {
    dispatch(setInitialized(true));
  }
};

// update profile from profile page

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

// logout & set user lastLogout & isOnline on logout

export const logout = (ownerID) => async (dispatch) => {
  const lastLogout = {
    isOnline: false,
    lastLogout: fb.database.ServerValue.TIMESTAMP,
  };

  await db.ref(`users/${ownerID}`).update(lastLogout);

  await fa.signOut();

  batch(() => {
    dispatch(chatReset());
    dispatch(resetLotsState());
    dispatch(setOwnerID(null));
    dispatch(setIsAuth(false));
    dispatch(setAuthedUser(null));
  });
};

// set user lastLogout & isOnline onConnect/Disconnect

export const onConnectDisconnect = (ownerID) => (dispatch) => {
  const lastLogout = {
    isOnline: false,
    lastLogout: fb.database.ServerValue.TIMESTAMP,
  };

  const userRef = db.ref(`users/${ownerID}`);

  userRef.update({ isOnline: true });
  userRef.onDisconnect().update(lastLogout);
};
