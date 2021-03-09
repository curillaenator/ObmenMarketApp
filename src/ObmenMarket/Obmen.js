import { BrowserRouter, Route } from "react-router-dom";
import { HeaderCont } from "./Header/Header";
import { LoginCont } from "./Login/Login";
import { HomeCont } from "./Home/Home";

import styles from "./obmen.module.scss";

function Obmen() {
  return (
    <BrowserRouter>
      <div className={styles.container}>
        <HeaderCont />
        <Route exact path="/" render={() => <HomeCont />} />
        <Route path="/login" render={() => <LoginCont />} />
      </div>
    </BrowserRouter>
  );
}

export default Obmen;
