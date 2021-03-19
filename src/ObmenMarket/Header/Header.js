import { compose } from "redux";
import { connect } from "react-redux";
import { Button } from "../Components/Button/Button";
import { LOGIN_ROUTE } from "../../Utils/routes";
import { Link, withRouter } from "react-router-dom";

import { setFormMode } from "../../Redux/Reducers/home";

import logo from "../../Assets/Icons/logo.svg";

import styles from "./header.module.scss";

const User = (props) => {
  return (
    <Link to="/profile" className={styles.user}>
      <p>{props.user.displayName}</p>
      <img src={props.user.photoURL} alt={props.user.displayName} />
    </Link>
  );
};

export const Header = (props) => {
  const handleLoginButton = () => props.setFormMode(false);

  const loginButtonClicked = props.location.pathname === LOGIN_ROUTE;
  const loginButtonPath =
    props.location.pathname === LOGIN_ROUTE ? "/" : LOGIN_ROUTE;
  return (
    <div className={styles.header}>
      <div className={styles.pad}>
        <Link to="/" className={styles.logo}>
          <img src={logo} alt={props.appName} />
        </Link>
      </div>

      <div className={styles.pad}>
        {props.isAuth ? (
          <User name={props.name} avatar={props.avatar} user={props.user} />
        ) : props.userLoading ? (
          <div>Загрузка...</div>
        ) : (
          <Link to={loginButtonPath} className={styles.loginButton}>
            <Button
              width={40}
              height={40}
              handler={handleLoginButton}
              icon={props.icons.login}
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
  appName: state.auth.appName,
  user: state.user.user,
  icons: state.ui.icons,
  isFormModeOn: state.home.isFormModeOn,
});

export const HeaderCont = compose(
  withRouter,
  connect(mstp, { setFormMode })
)(Header);
