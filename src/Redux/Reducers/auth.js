import { fb, fa, db, fn, fs } from "../../Utils/firebase";

const SET_IS_AUTH = "auth/IS_AUTH";
const SET_USER = "auth/SET_USER";

const initialState = {
  isAuth: false,
  user: null,
};

export const auth = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_AUTH:
      return { ...state, isAuth: action.auth };
    case SET_USER:
      return { ...state, user: action.user };
    default:
      return state;
  }
};

// ACTIONs

const setIsAuth = (auth) => ({ type: SET_IS_AUTH, auth });
const setCurrentUser = (user) => ({ type: SET_USER, user });

// THUNKs

export const googleSignIn = () => (dispatch) => {
  const newUser = (us) => {
    console.log("ttt");
    fb.database()
      .ref("users/" + us.uid)
      .set({
        username: us.displayName,
        email: us.email,
        avatar: us.photoURL,
      });
  };

  const login = async () => {
    const provider = new fb.auth.GoogleAuthProvider();

    await fb.auth().signInWithPopup(provider);

    await fb.auth().onAuthStateChanged((u) => {
      const ref = fb.database().ref("users/" + u.uid);
      ref.once("value", (snapshot) => {
        dispatch(setCurrentUser(snapshot.val()));
        !snapshot.exists && newUser(u);
      });
    });

    dispatch(setIsAuth(true));
  };

  const check = () => dispatch(setIsAuth(true));

  fb.auth().currentUser ? check() : login();

  // await functions.auth.user().onCreate((user) => {
  //   db.ref("users/" + user.uid).set({
  //     username: user.displayName,
  //     email: user.email,
  //     avatar: user.photoURL,
  //   });
  // });
};

export const logout = () => async (dispatch) => {
  fa.signOut().then(() => dispatch(setIsAuth(false)));
};
