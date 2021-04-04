import { getLCP, getFID, getCLS } from "web-vitals";

import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { fa } from "../Utils/firebase";

import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import { HeaderCont } from "./Header/Header";
import { LoginCont } from "./Login/Login";
import { HomeCont } from "./Home/Home";
import { ProfileCont } from "./Profile/Profile";
import { LotFullCont } from "./LotFull/LotFull";

import { authCheck } from "../Redux/Reducers/auth";

import styles from "./obmen.module.scss";

function Obmen({ authCheck }) {
  const [user, userLoading] = useAuthState(fa); // userLoading
  useEffect(() => !userLoading && authCheck(user), [
    user,
    authCheck,
    userLoading,
  ]);

  getCLS(console.log);
  getFID(console.log);
  getLCP(console.log);

  return (
    <div className={styles.container}>
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
});

export const ObmenCont = connect(mstp, { authCheck })(Obmen);
