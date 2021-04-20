import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { fa } from "../Utils/firebase";

import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

import { HeaderCont } from "./Header/Header";
import { LoginCont } from "./Login/Login";
import { HomeCont } from "./Home/Home";
import { ProfileCont } from "./Profile/Profile";
import { LotFullCont } from "./LotFull/LotFull";
import { ChatCont } from "./Components/Chat/Chat";

import { authCheck } from "../Redux/Reducers/auth";
import { setIsModalOn } from "../Redux/Reducers/home";

import styles from "./obmen.module.scss";

function Obmen({ isInitialized, authCheck, isModalOn, history, setIsModalOn }) {
  const [user, userLoading] = useAuthState(fa);

  useEffect(() => !userLoading && authCheck(user), [
    user,
    authCheck,
    userLoading,
  ]);

  history.listen(() => isModalOn && setIsModalOn(false));

  const modalBlurStyle = isModalOn ? { filter: "blur(20px)" } : {};

  return (
    <div className={styles.container} style={modalBlurStyle}>
      <HeaderCont />
      {isInitialized && <ChatCont />}
      <Switch>
        <Route exact path="/" render={() => <HomeCont />} />
        <Route path="/posts/:id" render={() => <LotFullCont />} />
        <Route path="/login" render={() => <LoginCont />} />
        <Route path="/profile/:id?" render={() => <ProfileCont />} />
      </Switch>
    </div>
  );
}
const mstp = (state) => ({
  isInitialized: state.auth.isInitialized,
  isModalOn: state.home.isModalOn,
});

export const ObmenCont = compose(
  withRouter,
  connect(mstp, { authCheck, setIsModalOn })
)(Obmen);

// messaging.getToken(
//   { vapidKey: 'BOsXtfpHw1gYRFvpZ_bcpZvyRKlFtEJRdAmlcmK_aMdWq9YEsB30L2WKmpnGpe77jd0Cv5DFhjQKH9xHZoq2_fs' }).then((currentToken) => {
//   if (currentToken) {
//     // const token = messaging.getToken();
//   } else {
//     // Show permission request UI
//     console.log('No registration token available. Request permission to generate one.');
//     // ...
//   }
// }).catch((err) => {
//   console.log('An error occurred while retrieving token. ', err);
//   // ...
// });
// navigator.serviceWorker.addEventListener("message", (message) => console.log(message));
