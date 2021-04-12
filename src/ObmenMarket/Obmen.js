// import { getLCP, getFID, getCLS } from "web-vitals";
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

import { authCheck } from "../Redux/Reducers/auth";
import { setIsModalOn } from "../Redux/Reducers/home";

import styles from "./obmen.module.scss";

function Obmen({ authCheck, isModalOn, history, setIsModalOn }) {
  const [user, userLoading] = useAuthState(fa);
  useEffect(() => !userLoading && authCheck(user), [
    user,
    authCheck,
    userLoading,
  ]);

  history.listen(() => isModalOn && setIsModalOn(false));

  // getCLS(console.log);
  // getFID(console.log);
  // getLCP(console.log);

  const modalBlurStyle = isModalOn ? { filter: "blur(20px)" } : {};

  return (
    <div className={styles.container} style={modalBlurStyle}>
      <HeaderCont />
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
  // isInitialized: state.auth.isInitialized,
  isModalOn: state.home.isModalOn,
});

export const ObmenCont = compose(
  withRouter,
  connect(mstp, { authCheck, setIsModalOn })
)(Obmen);
