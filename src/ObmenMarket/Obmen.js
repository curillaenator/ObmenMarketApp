// import { useEffect } from "react";
// import { useAuthState } from "react-firebase-hooks/auth";

import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import { HeaderCont } from "./Header/Header";
import { LoginCont } from "./Login/Login";
import { HomeCont } from "./Home/Home";
import { ProfileCont } from "./Profile/Profile";
import { LotFullCont } from "./LotFull/LotFull";
// import { Masks } from "./Components/Masks/Masks";

import styles from "./obmen.module.scss";

function Obmen({ setAuthIfLogined, ...props }) {
  // const [user, userLoading] = useAuthState(props.fireauth);
  // useEffect(() => setAuthIfLogined(user), [user, setAuthIfLogined]);

  // userLoading = { userLoading };

  return (
    <div className={styles.container}>
      <HeaderCont isFormModeOn={props.isFormModeOn} />
      <Switch>
        <Route exact path="/" render={() => <HomeCont />} />
        <Route path="/posts/:id" render={() => <LotFullCont />} />
        <Route path="/login" render={() => <LoginCont />} />
        <Route path="/profile" render={() => <ProfileCont />} />
        {/* <Route path="/masks" render={() => <Masks />} /> */}
      </Switch>
    </div>
  );
}
const mstp = (state) => ({
  // fireauth: state.auth.fireauth,
  // firestore: state.auth.firestore,
});

export const ObmenCont = connect(mstp, {})(Obmen);

export default Obmen;
