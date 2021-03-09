import { connect } from "react-redux";
import { Button } from "../Components/Button/Button";
import { Redirect } from "react-router-dom";

import { authWithGoogle } from "../../Redux/Reducers/auth";

import styles from "./login.module.scss";

const Login = (props) => {
  if (props.isAuth) return <Redirect to="/" />;

  return (
    <div className={styles.login}>
      <div className={styles.shape}></div>

      <p>Войти через:</p>

      <div className={styles.providers}>
        <Button
          width={56}
          height={56}
          icon={props.icons.google}
          handler={props.authWithGoogle}
        />
      </div>
    </div>
  );
};

const mstp = (state) => ({
  icons: state.ui.icons,
  isAuth: state.auth.isAuth,
});

export const LoginCont = connect(mstp, { authWithGoogle })(Login);
