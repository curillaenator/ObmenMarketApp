import { useEffect } from "react";
import { connect } from "react-redux";
import { Button } from "../Components/Button/Button";
import { Redirect } from "react-router-dom";

import { googleSignIn } from "../../Redux/Reducers/auth";
import { setTitle } from "../../Redux/Reducers/home";

import styles from "./login.module.scss";

const Login = ({ setTitle, icons, isAuth, googleSignIn }) => {
  const handleLogin = () => googleSignIn(null);

  useEffect(() => setTitle("Вход в Обмен.маркет"), [setTitle]);

  if (isAuth) return <Redirect to="/" />;

  return (
    <div className={styles.login}>
      <div className={styles.shape}></div>

      <p>Войти через:</p>

      <div className={styles.providers}>
        <Button
          width={56}
          height={56}
          icon={icons.google}
          handler={handleLogin}
        />
      </div>
    </div>
  );
};

const mstp = (state) => ({
  icons: state.ui.icons,
  isAuth: state.auth.isAuth,
});

export const LoginCont = connect(mstp, {
  googleSignIn,
  setTitle,
})(Login);
