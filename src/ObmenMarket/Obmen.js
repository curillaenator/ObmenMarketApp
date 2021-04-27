import { lazy, Suspense, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { fa } from "../Utils/firebase";

import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

import { HeaderCont } from "./Components/Header/Header";
import { LoginCont } from "./Login/Login";
import { HomeCont } from "./Home/Home";
import { ProfileCont } from "./Profile/Profile";
import { LotFullCont } from "./LotFull/LotFull";
import { Footer } from "./Components/Footer/Footer";

import { authCheck, onConnectDisconnect } from "../Redux/Reducers/auth";
import { setIsModalOn } from "../Redux/Reducers/home";
import { getPaginationFirstPage } from "../Redux/Reducers/lots";

import styles from "./obmen.module.scss";

const ChatLazy = lazy(() => import("./Components/Chat/Chat"));

function Obmen({
  isInitialized,
  isAuth,
  ownerID,
  isModalOn,
  isChatTouched,
  history,
  authCheck,
  setIsModalOn,
  onConnectDisconnect,
  getPaginationFirstPage,
}) {
  const [user, userLoading] = useAuthState(fa);

  useEffect(() => !userLoading && authCheck(user), [
    user,
    authCheck,
    userLoading,
  ]);

  useEffect(() => {
    onConnectDisconnect(ownerID);
  }, [ownerID, onConnectDisconnect]);

  useEffect(() => getPaginationFirstPage(), [getPaginationFirstPage]);

  history.listen(() => isModalOn && setIsModalOn(false));

  return (
    <div
      className={styles.container}
      style={isModalOn ? { filter: "blur(20px)" } : {}}
    >
      <HeaderCont />

      {isInitialized && isAuth && isChatTouched && (
        <Suspense
          fallback={<div className={styles.chatLoading}>Загружаем чат</div>}
        >
          <ChatLazy />
        </Suspense>
      )}

      <Switch>
        <Route exact path="/" render={() => <HomeCont />} />
        <Route path="/posts/:id" render={() => <LotFullCont />} />
        <Route path="/login" render={() => <LoginCont />} />
        <Route path="/profile/:id?" render={() => <ProfileCont />} />
      </Switch>

      <Footer />
    </div>
  );
}
const mstp = (state) => ({
  isInitialized: state.auth.isInitialized,
  isAuth: state.auth.isAuth,
  isChatTouched: state.chat.isChatTouched,
  ownerID: state.auth.ownerID,
  isModalOn: state.home.isModalOn,
});

export const ObmenCont = compose(
  withRouter,
  connect(mstp, {
    authCheck,
    setIsModalOn,
    onConnectDisconnect,
    getPaginationFirstPage,
  })
)(Obmen);
