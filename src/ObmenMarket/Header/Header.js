import { compose } from "redux";
import { connect } from "react-redux";
import { Button } from "../Components/Button/Button";
import { Link, withRouter } from "react-router-dom";

import { setFormMode } from "../../Redux/Reducers/home";

import logo from "../../Assets/Icons/logo.svg";

import styles from "./header.module.scss";

const User = ({ username, avatar }) => {
  return (
    <Link to="/profile" className={styles.user}>
      <p>{username}</p>
      <img src={avatar} alt={username} />
    </Link>
  );
};

export const Header = (props) => {
  const handleLoginButton = () => props.setFormMode(false);

  const loginButtonClicked = props.location.pathname === "/login";
  const loginButtonPath = props.location.pathname === "/login" ? "/" : "/login";

  return (
    <div className={styles.header}>
      <div className={styles.pad}>
        <Link to="/" className={styles.logo}>
          <img src={logo} alt={props.appName} />
        </Link>
      </div>

      <div className={styles.pad}>
        {props.isAuth ? (
          <User username={props.user.username} avatar={props.user.avatar} />
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
  user: state.auth.user,
  icons: state.ui.icons,
  isFormModeOn: state.home.isFormModeOn,
});

export const HeaderCont = compose(
  withRouter,
  connect(mstp, { setFormMode })
)(Header);
