import { fb, fa, db } from "../../Utils/firebase";

const SET_OWNER_ID = "auth/SET_OWNER_ID";
const SET_IS_AUTH = "auth/IS_AUTH";
const SET_USER = "auth/SET_USER";

const initialState = {
  ownerID: null,
  isAuth: false,
  user: null,
};

export const auth = (state = initialState, action) => {
  switch (action.type) {
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

export const setIsAuth = (auth) => ({ type: SET_IS_AUTH, auth });
const setOwnerID = (payload) => ({ type: SET_OWNER_ID, payload });
const setCurrentUser = (user) => ({ type: SET_USER, user });

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
    db.ref("users/" + user.uid)
      .set({
        username: user.displayName,
        email: user.email,
        avatar: user.photoURL,
      })
      .then(() => {
        user.sendEmailVerification().then(() => console.log("sent"));
        db.ref("users/" + user.uid).once("value", (snapshot) => {
          dispatch(setOwnerID(user.uid));
          dispatch(setCurrentUser(snapshot.val()));
          dispatch(setIsAuth(true));
        });
      });
  };

  const provider = new fb.auth.GoogleAuthProvider();
  await fb.auth().signInWithPopup(provider);

  await fb.auth().onAuthStateChanged((u) => {
    const ref = db.ref("users/" + u.uid);
    ref.once("value", (snapshot) => !snapshot.exists() && newUser(u));
  });
};

export const authCheck = (curUser) => (dispatch) => {
  if (curUser) {
    db.ref("users/" + curUser.uid).once("value", (snapshot) => {
      dispatch(setOwnerID(curUser.uid));
      dispatch(setCurrentUser(snapshot.val()));
      dispatch(setIsAuth(true));
    });
  }
};

export const logout = () => async (dispatch) => {
  await fa.signOut();
  dispatch(setIsAuth(false));
  dispatch(setCurrentUser(null));
};

export const updateUserProfile = (userUpdData) => (dispatch) => {
  const userID = fa.currentUser.uid;

  const onUpdate = (error) => {
    if (error) return console.log("ошибка записи");

    db.ref("users/" + userID).once("value", (snapshot) => {
      dispatch(setCurrentUser(snapshot.val()));
    });
  };

  db.ref("users/" + userID).update(userUpdData, onUpdate);
};
