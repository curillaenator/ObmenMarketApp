import { compose } from "redux";
import { connect } from "react-redux";
import { ButtonOutline } from "../Components/Button/ButtonOutline";
import { Link, withRouter } from "react-router-dom";

import { setFormMode } from "../../Redux/Reducers/home";

import logo from "../../Assets/Icons/logo.svg";

import styles from "./header.module.scss";
// import { auth } from "../../Redux/Reducers/auth";
//      <p>{user.username}</p>

const User = ({ user }) => {
  return (
    <Link to="/profile" className={styles.user}>

      <img src={user.avatar} alt={user.username} />
    </Link>
  );
};

export const Header = ({
  user,
  isInitialized,
  location,
  setFormMode,
  isAuth,
}) => {
  const handleLoginButton = () => setFormMode(false);

  const loginButtonClicked = location.pathname === "/login";
  const loginButtonPath = location.pathname === "/login" ? "/" : "/login";

  return (
    <div className={styles.header}>
      <div className={styles.pad}>
        <Link to="/" className={styles.logo}>
          <img src={logo} alt="Обмен.маркет" />
        </Link>
      </div>

      <div className={styles.pad}>
        {isInitialized && isAuth && <User user={user} />}

        {isInitialized && !isAuth && (
          <Link to={loginButtonPath} className={styles.loginButton}>
            <ButtonOutline
              width={83}
              height={40}
              title="Войти"
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
});

export const HeaderCont = compose(
  withRouter,
  connect(mstp, { setFormMode })
)(Header);
