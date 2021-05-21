import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Route, Switch, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import ProgressBar from "@ramonak/react-progress-bar";
import { toast } from "react-toastify";

import { fa } from "../Utils/firebase";
import { slidein } from "../Utils/toasts";

import { Loading } from "./Components/Loading/Loading";
import { HeaderCont } from "./Components/Header/Header";
import { ToastComponent } from "./Components/Toast/Toast";
import { LoginCont } from "./Login/Login";
import { HomeCont } from "./Home/Home";
import { ProfileCont } from "./Profile/Profile";
import { LotFullCont } from "./LotFull/LotFull";
import Chat from "./Components/Chat/Chat";
// import { Footer } from "./Components/Footer/Footer";

import { authCheck, onConnectDisconnect } from "../Redux/Reducers/auth";
import { setIsModalOn, setProgress } from "../Redux/Reducers/home";

import styles from "./obmen.module.scss";

const ObmenMarket = ({
  icons,
  isInitialized,
  isAuth,
  ownerID,
  isModalOn,
  progress,
  isToast,
  setProgress,
  authCheck,
  setIsModalOn,
  onConnectDisconnect,
}) => {
  const history = useHistory();
  const [user, userLoading] = useAuthState(fa);

  window.pushlink = history;

  // console.log(window.location);
  // if (window.location.hostname === "localhost") {
  //   fb.database().useEmulator("localhost", 9000);
  // }

  useEffect(() => {
    !userLoading && authCheck(user, history);
  }, [user, authCheck, userLoading, history]);

  useEffect(() => {
    onConnectDisconnect(ownerID);
  }, [ownerID, onConnectDisconnect]);

  useEffect(() => {
    progress === 100 && setTimeout(() => setProgress(null), 1000);
  }, [progress, setProgress]);

  useEffect(() => {
    isToast &&
      toast(
        ({ closeToast }) => (
          <ToastComponent
            title={isToast.title}
            text={isToast.message}
            icon={icons.toasts[isToast.type]}
            type={isToast.type}
            close={closeToast}
            button={
              isToast.button
                ? () => {
                    isToast.button();
                    closeToast();
                  }
                : null
            }
          />
        ),
        { transition: slidein }
      );
  }, [isToast, icons.toasts]);

  history.listen(() => isModalOn && setIsModalOn(false));

  if (userLoading) return <Loading />;

  return (
    <div className={styles.app}>
      <div
        className={
          progress
            ? `${styles.progress} ${styles.progress_active}`
            : styles.progress
        }
      >
        <ProgressBar
          completed={progress || 0}
          bgColor="#7000ff"
          baseBgColor="#ffffff"
          transitionDuration="0.3s"
          isLabelVisible={false}
          height="2px"
        />
      </div>

      <div
        className={styles.container}
        style={isModalOn ? { filter: "blur(20px)" } : {}}
      >
        <HeaderCont />

        {isInitialized && isAuth && <Chat />}

        <Switch>
          <Route exact path="/" render={() => <HomeCont />} />
          <Route path="/posts/:lotid" render={() => <LotFullCont />} />
          <Route path="/login" render={() => <LoginCont />} />
          <Route path="/profile/:userid?" render={() => <ProfileCont />} />
        </Switch>

        {/* <Footer /> */}
      </div>
    </div>
  );
};
const mstp = (state) => ({
  icons: state.ui.icons,
  progress: state.home.progress,
  isInitialized: state.auth.isInitialized,
  isAuth: state.auth.isAuth,
  ownerID: state.auth.ownerID,
  isModalOn: state.home.isModalOn,
  isToast: state.home.isToast,
});

export const ObmenMarketApp = connect(mstp, {
  setProgress,
  authCheck,
  setIsModalOn,
  onConnectDisconnect,
})(ObmenMarket);
