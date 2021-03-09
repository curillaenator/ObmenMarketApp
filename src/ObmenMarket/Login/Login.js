import { connect } from "react-redux";
import { Button } from "../Components/Button/Button";
import styles from "./login.module.scss";

const Login = (props) => {
  //   console.log(props);
  return (
    <div className={styles.login}>
      <div className={styles.shape}></div>

      <p>Войти через:</p>

      <div className={styles.providers}>
        {props.providers.map((p) => (
          <Button width={56} height={56} icon={props.icons[p]} key={p} />
        ))}
      </div>
    </div>
  );
};

const mstp = (state) => ({
  icons: state.ui.icons,
  providers: state.auth.providers,
});

export const LoginCont = connect(mstp)(Login);
