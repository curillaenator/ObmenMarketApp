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

function Obmen(props) {
  const [user] = useAuthState(props.fireauth);
  useEffect(() => props.setAuthIfLogined(user));

  return (
    <div className={styles.container}>
      <HeaderCont />
      <Route exact path="/" render={() => <HomeCont />} />
      <Route path="/login" render={() => <LoginCont />} />
      <Route path="/profile" render={() => <ProfileCont />} />
    </div>
  );
}
const mstp = (state) => ({
  fireauth: state.auth.fireauth,
});

export const ObmenCont = connect(mstp, { setAuthIfLogined })(Obmen);

export default Obmen;
