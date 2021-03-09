import { BrowserRouter, Route } from "react-router-dom";
import { HeaderCont } from "./Header/Header";
import { LoginCont } from "./Login/Login";
import styles from "./obmen.module.scss";

function Obmen() {
  return (
    <BrowserRouter>
      <div className={styles.container}>
        <HeaderCont />
        <Route path="/login" render={() => <LoginCont />} />
      </div>
    </BrowserRouter>
  );
}

export default Obmen;
