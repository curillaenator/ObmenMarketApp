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

import {
  authCheck,
  // userIsOnline,
  onConnectDisconnect,
} from "../Redux/Reducers/auth";
import { setIsModalOn } from "../Redux/Reducers/home";

import styles from "./obmen.module.scss";

function Obmen({
  isInitialized,
  isAuth,
  ownerID,
  isModalOn,
  history,
  setIsModalOn,
  authCheck,
  onLoginLogout,
}) {
  const [user, userLoading] = useAuthState(fa);

  useEffect(() => !userLoading && authCheck(user), [
    user,
    authCheck,
    userLoading,
  ]);

  useEffect(() => {
    onLoginLogout(ownerID);
  }, [ownerID, onLoginLogout]);

  history.listen(() => isModalOn && setIsModalOn(false));

  const modalBlurStyle = isModalOn ? { filter: "blur(20px)" } : {};

  return (
    <div className={styles.container} style={modalBlurStyle}>
      <HeaderCont />
      {isInitialized && isAuth && <ChatCont />}
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
  isAuth: state.auth.isAuth,
  ownerID: state.auth.ownerID,
  isModalOn: state.home.isModalOn,
});

export const ObmenCont = compose(
  withRouter,
  connect(mstp, { authCheck, setIsModalOn, onLoginLogout: onConnectDisconnect })
)(Obmen);
