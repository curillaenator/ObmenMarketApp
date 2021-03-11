import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { Route } from "react-router-dom";
import { connect } from "react-redux";

import { HeaderCont } from "./Header/Header";
import { LoginCont } from "./Login/Login";
import { HomeCont } from "./Home/Home";
import { ProfileCont } from "./Profile/Profile";

import { setAuthIfLogined } from "../Redux/Reducers/auth";

import styles from "./obmen.module.scss";

function Obmen({ setAuthIfLogined, ...props }) {
  const [user, userLoading] = useAuthState(props.fireauth);

  useEffect(() => setAuthIfLogined(user), [user, setAuthIfLogined]);

  return (
    <div className={styles.container}>
      <HeaderCont userLoading={userLoading} />
      <Route exact path="/" render={() => <HomeCont />} />
      <Route path="/login" render={() => <LoginCont />} />
      <Route path="/profile" render={() => <ProfileCont />} />
    </div>
  );
}
const mstp = (state) => ({
  fireauth: state.auth.fireauth,
  firestore: state.auth.firestore,
});

export const ObmenCont = connect(mstp, { setAuthIfLogined })(Obmen);

export default Obmen;
