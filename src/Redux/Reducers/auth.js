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

  const initialUserData = {
    avatar: user.photoURL, // (string) ссылка на авку
    country: "", // (reference) страна. Путь к документу страны в базе
    city: "", // (reference) город. Путь к документу города в базе
    createdAt: user.metadata.creationTime, // (timestamp) дата и время создания
    lastVisited: user.metadata.lastSignInTime,
    email: user.email, // (string) Мыло
    name: user.displayName, // (string) Имя
    surname: "", // (string) Фамилия
    username: "", // (string) Юзернейм (в большенстве случаев присваивается при регистрации, пока не знаю зачем он нам)
    phone: user.phoneNumber, // (string) Номер телефона (без кода, код подставляется из страны)
    providers: [], // (array) список подключенных провайдеров авторизации
    role: {
      isAdmin: false, // (boolean) admin role key
      isModerator: false, // (boolean) moderator role key
    },
    status: {
      isBanned: false, // (boolean) banned user key
      banExpirationDate: false, // (timestamp) дата окончания бана
    },
  };

  const userRef = firestore.collection("users").doc(user.uid);
  userRef.get().then((user) =>
    user.exists
      ? userRef.update({
          lastVisited: firebase.firestore.FieldValue.serverTimestamp(),
        })
      : userRef.set(initialUserData)
  );

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
