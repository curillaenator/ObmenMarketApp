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
  const [user, userLoading] = useAuthState(fa);
  useEffect(() => user && authCheck(user), [user, authCheck]);

  return (
    <div className={styles.container}>
      <HeaderCont userLoading={userLoading} />
      <Switch>
        <Route exact path="/" render={() => <HomeCont />} />
        <Route path="/posts/:id" render={() => <LotFullCont />} />
        <Route path="/login" render={() => <LoginCont />} />
        <Route path="/profile/:id?" render={() => <ProfileCont />} />
      </Switch>
    </div>
  );
}
const mstp = (state) => ({});

export const ObmenCont = connect(mstp, { authCheck })(Obmen);
