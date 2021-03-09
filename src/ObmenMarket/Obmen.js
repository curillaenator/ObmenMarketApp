import { BrowserRouter, Route } from "react-router-dom";
import { HeaderCont } from "./Header/Header";
import { LoginCont } from "./Login/Login";
import { HomeCont } from "./Home/Home";
import { ProfileCont } from "./Profile/Profile";

import styles from "./obmen.module.scss";

function Obmen() {
  return (
    <BrowserRouter>
      <div className={styles.container}>
        <HeaderCont />
        <Route exact path="/" render={() => <HomeCont />} />
        <Route path="/login" render={() => <LoginCont />} />
        <Route path="/profile" render={() => <ProfileCont />} />
      </div>
    </BrowserRouter>
  );
}

export default Obmen;
