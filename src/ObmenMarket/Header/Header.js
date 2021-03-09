import { compose } from "redux";
import { connect } from "react-redux";
import logo from "../../Assets/Icons/logo.svg";
import { Button } from "../Components/Button/Button";
import { LOGIN_ROUTE } from "../../Utils/routes";
import { Link, withRouter } from "react-router-dom";

import styles from "./header.module.scss";

const User = (props) => {
  return (
    <div className={styles.user}>
      <p>{props.user.displayName}</p>
      <img src={props.user.photoURL} alt={props.user.displayName} />
    </div>
  );
};

export const Header = (props) => {
  const loginButtonClicked = props.location.pathname === LOGIN_ROUTE;
  const loginButtonPath =
    props.location.pathname === LOGIN_ROUTE ? "/" : LOGIN_ROUTE;
  return (
    <div className={styles.header}>
      <div className={styles.pad}>
        <Link to="/">
          <img src={logo} alt={props.appName} />
        </Link>
      </div>
      <div className={styles.pad}>
        {props.isAuth ? (
          <User name={props.name} avatar={props.avatar} user={props.user} />
        ) : (
          <Link to={loginButtonPath} className={styles.loginButton}>
            <Button
              width={83}
              height={40}
              title="Вход"
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
});

export const HeaderCont = compose(withRouter, connect(mstp, {}))(Header);
