import { fb, fa, db, db_notes, an } from "../../Utils/firebase";
import { batch } from "react-redux";

import { chatReset } from "./chat";
import { resetLotsState } from "./lots";
import { realtimeToasts, setNewToast } from "./home"; // setNewToast

import { toastsModel } from "../../Utils/toasts";

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
  dispatch(resetLotsState());

  const newUser = (user) => {
    const newUser = {
      username: user.displayName,
      email: user.email,
      avatar: user.photoURL,
    };

    db.ref(`users/${user.uid}`)
      .set(newUser)
      .then(() => {
        //
        // registration merics
        an.logEvent("sign_up", { method: "Google" });

        batch(() => {
          dispatch(setOwnerID(user.uid));
          dispatch(setAuthedUser(newUser));
          dispatch(setIsAuth(true));
          dispatch(setInitialized(true));

          dispatch(
            setNewToast(
              "success",
              toastsModel.newUser.title,
              toastsModel.newUser.msg,
              null
            )
          );
        });
      });
  };

  const provider = new fb.auth.GoogleAuthProvider();
  await fb.auth().signInWithPopup(provider);

  await fb.auth().onAuthStateChanged((user) => {
    // if (!user) return;
    // const ref = db.ref(`users/${user.uid}`);
    db.ref(`users/${user.uid}`).once("value", (snapshot) => {
      !snapshot.exists() && newUser(user);

      // login metrics
      snapshot.exists() && an.logEvent("login", { method: "Google" });
    });
  });
};

export const authCheck = (curUser, history) => (dispatch) => {
  if (curUser) {
    db.ref("users/" + curUser.uid).once("value", async (userMeta) => {
      //

      await batch(() => {
        dispatch(setOwnerID(curUser.uid));
        dispatch(setAuthedUser(userMeta.val()));
        dispatch(setIsAuth(true));
        dispatch(setInitialized(true));
      });
      //
      // Listener for new toasts when online
      //
      db_notes.ref(curUser.uid).once("value", (oldNotes) => {
        const instance = oldNotes.exists() ? Object.keys(oldNotes.val()) : [];

        db_notes.ref(curUser.uid).on("child_added", (added) => {
          if (!instance.includes(added.key)) {
            dispatch(realtimeToasts(added.val(), history));
          }
        });
      });
    });
  }

  if (!curUser) {
    batch(() => {
      dispatch(setAuthedUser({ isAdmin: false }));
      dispatch(setInitialized(true));
    });
  }
};

// update profile from profile page

export const updateUserProfile = (userUpdData) => (dispatch) => {
  const userID = fa.currentUser.uid;

  const Success = () => {
    db.ref(`users/${userID}`).once("value", (userMeta) => {
      batch(() => {
        dispatch(
          setNewToast(
            "success",
            toastsModel.profileUpdated.title,
            toastsModel.profileUpdated.msg,
            null
          )
        );

        dispatch(setAuthedUser(userMeta.val()));
      });
    });
  };

  const Failure = (err) => {
    dispatch(
      setNewToast(
        "error",
        toastsModel.commonError.title,
        toastsModel.commonError.msg,
        null
      )
    );

    console.log(err);
  };

  db.ref(`users/${userID}`).update(userUpdData, (err) =>
    err ? Failure(err) : Success()
  );
};

// logout & set user lastLogout & isOnline on logout

export const logout = (ownerID) => async (dispatch) => {
  await dispatch(
    setNewToast(
      "warning",
      toastsModel.logout.title,
      toastsModel.logout.msg,
      null
    )
  );

  await db.ref(`users/${ownerID}`).update({
    isOnline: false,
    lastLogout: fb.database.ServerValue.TIMESTAMP,
  });

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
  const userRef = db.ref(`users/${ownerID}`);

  userRef.update({ isOnline: true });
  userRef.onDisconnect().update({
    isOnline: false,
    lastLogout: fb.database.ServerValue.TIMESTAMP,
  });
};
