import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Route, Switch, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import ProgressBar from "@ramonak/react-progress-bar";
import { toast } from "react-toastify";
import { RemoveScroll } from "react-remove-scroll";

import { fa } from "../Utils/firebase";
import { slidein } from "../Utils/toasts";

import { LoadingFS } from "./Components/Loading/Loading";
import { HeaderCont } from "./Components/Header/Header";
import { ToastComponent } from "./Components/Toast/Toast";
import { LoginCont } from "./Login/Login";
import { HomeCont } from "./Home/Home";
import { ProfileCont } from "./Profile/Profile";
import { LotFullCont } from "./LotFull/LotFull";
import Chat from "./Components/Chat/Chat";
import { ChatMobileCont } from "./Components/Chat/ChatMobile";
// import { Footer } from "./Components/Footer/Footer";

import { authCheck, onConnectDisconnect } from "../Redux/Reducers/auth";
import { subRoomsMsgs } from "../Redux/Reducers/chat";
import { setIsModalOn, setProgress, setIsMobile } from "../Redux/Reducers/home";

import styles from "./obmen.module.scss";

const ObmenMarket = ({
  isMobile,
  title,
  icons,
  isInitialized,
  isAuth,
  ownerID,
  isModalOn,
  isChatOn,
  progress,
  isToast,
  setIsMobile,
  setProgress,
  authCheck,
  setIsModalOn,
  onConnectDisconnect,
  subRoomsMsgs,
}) => {
  const history = useHistory();
  const [user, userLoading] = useAuthState(fa);

  // listen for viewport resize

  useEffect(() => {
    const isMobileSetter = () => {
      window.innerWidth >= 768 && setIsMobile(false);
      window.innerWidth < 768 && setIsMobile(true);
    };

    isMobileSetter();

    window.addEventListener("resize", isMobileSetter);
  }, [setIsMobile]);

  // change title by state title

  useEffect(() => (document.title = title), [title]);

  // check for user auth

  useEffect(() => {
    !userLoading && authCheck(user, history);
  }, [user, authCheck, userLoading, history]);

  // connect disconect handler

  useEffect(() => {
    onConnectDisconnect(ownerID);
  }, [ownerID, onConnectDisconnect]);

  // progress bar watcher

  useEffect(() => {
    progress === 100 && setTimeout(() => setProgress(null), 1000);
  }, [progress, setProgress]);

  // toasts watcher

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

  // chat rooms subscription

  useEffect(() => {
    ownerID && subRoomsMsgs(ownerID);
  }, [ownerID, subRoomsMsgs]);

  history.listen(() => isModalOn && setIsModalOn(false));

  if (userLoading) return <LoadingFS />;

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

      <RemoveScroll enabled={isChatOn}>
        {isInitialized && isAuth && !isMobile && <Chat />}
        {isInitialized && isAuth && isMobile && <ChatMobileCont />}
      </RemoveScroll>

      <div
        className={styles.container}
        style={isModalOn ? { filter: "blur(20px)" } : {}}
      >
        <HeaderCont />

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
  isMobile: state.home.isMobile,
  title: state.home.title,
  icons: state.ui.icons,
  progress: state.home.progress,
  isInitialized: state.auth.isInitialized,
  isAuth: state.auth.isAuth,
  ownerID: state.auth.ownerID,
  isModalOn: state.home.isModalOn,
  isToast: state.home.isToast,
  isChatOn: state.chat.isChatOn,
});

export const ObmenMarketApp = connect(mstp, {
  setIsMobile,
  setProgress,
  authCheck,
  setIsModalOn,
  onConnectDisconnect,
  subRoomsMsgs,
})(ObmenMarket);
