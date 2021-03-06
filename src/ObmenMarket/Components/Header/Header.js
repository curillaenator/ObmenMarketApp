import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import { setFormMode } from "../../../Redux/Reducers/home";
import { handleChatOn } from "../../../Redux/Reducers/chat";
import { onLogoClick } from "../../../Redux/Reducers/lots";

import { ButtonOutline } from "../Button/ButtonOutline";

import logo1 from "../../../Assets/Icons/logo1.svg";
import logo2 from "../../../Assets/Icons/logo2.svg";
import logo3 from "../../../Assets/Icons/logo3.svg";
import chaticon from "../../../Assets/Icons/chat.svg";
// import bellicon from "../../../Assets/Icons/bell.svg";

import styles from "./header.module.scss";

const ObmenMarketLogo = ({ onLogoClick }) => {
  return (
    <Link to="/" className={styles.logo} onClick={() => onLogoClick()}>
      <img className={styles.image} src={logo1} alt="" />
      <img className={styles.obmen} src={logo2} alt="" />
      <img className={styles.market} src={logo3} alt="" />
    </Link>
  );
};

const HeaderButton = ({ icon, iconpos = 0, notes, active, handler }) => {
  const canvasClass = active
    ? `${styles.canvas} ${styles.canvas_active}`
    : styles.canvas;

  return (
    <div className={styles.authbutton} onClick={handler}>
      <div className={canvasClass}>
        <img
          src={icon}
          alt=""
          style={{ transform: `translateY(${iconpos}px)` }}
        />
      </div>

      {notes > 0 && <div className={styles.note}>{notes}</div>}
    </div>
  );
};

const Authorized = ({ user, newMsgsQty, isChatOn, handleChatOn }) => {
  const notesCnt = Object.keys(newMsgsQty)
    .map((id) => newMsgsQty[id])
    .reduce((a, b) => a + b, 0);

  return (
    <div className={styles.authorized}>
      <Link to="/profile" className={styles.user}>
        <img src={user.avatar} alt={user.username} />
      </Link>

      <HeaderButton
        icon={chaticon}
        iconpos={2}
        notes={notesCnt}
        active={isChatOn}
        handler={handleChatOn}
      />

      {/* <HeaderButton
        icon={bellicon}
        iconpos={0}
        notes={0}
        active={false}
        handler={() => {}}
      /> */}
    </div>
  );
};

export const Header = ({
  user,
  isAuth,
  isInitialized,
  newMsgsQty,
  isChatOn,
  setFormMode,
  handleChatOn,
  setIsChatTouched,
  onLogoClick,
}) => {
  const location = useLocation();

  const handleLoginButton = () => setFormMode(false);

  const loginButtonClicked = location.pathname === "/login";
  const loginButtonPath = location.pathname === "/login" ? "/" : "/login";

  return (
    <div className={styles.header}>
      <ObmenMarketLogo onLogoClick={onLogoClick} />

      <div className={styles.pad}>
        {isInitialized && isAuth && user && (
          <Authorized
            user={user}
            newMsgsQty={newMsgsQty}
            handleChatOn={handleChatOn}
            isChatOn={isChatOn}
            setIsChatTouched={setIsChatTouched}
          />
        )}

        {isInitialized && !isAuth && (
          <Link to={loginButtonPath} className={styles.loginButton}>
            <ButtonOutline
              width={83}
              height={40}
              title="??????????"
              handler={handleLoginButton}
              active={loginButtonClicked}
            />
          </Link>
        )}
      </div>
    </div>
  );
};

const mstp = (state) => ({
  isAuth: state.auth.isAuth,
  user: state.auth.user,
  isInitialized: state.auth.isInitialized,
  isFormModeOn: state.home.isFormModeOn,
  isChatOn: state.chat.isChatOn,
  newMsgsQty: state.chat.roomsNewMsgs,
});

export const HeaderCont = connect(mstp, {
  setFormMode,
  handleChatOn,
  onLogoClick,
})(Header);
