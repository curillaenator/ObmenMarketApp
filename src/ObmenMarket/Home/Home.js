import { connect } from "react-redux";

import { Welcome } from "./Welcome/Welcome";
import { Cta } from "./CTA/CTA";
import { Lots } from "./Lots/Lots";
import { Warning } from "./Warning/Warning";
import { FormFull } from "../Components/FormFull/FormFull";

import { setFormMode } from "../../Redux/Reducers/home";

import styles from "./home.module.scss";

const Home = (props) => {
  return (
    <div className={styles.home}>
      <Welcome />
      <Cta
        icons={props.icons}
        isFormModeOn={props.isFormModeOn}
        setFormMode={props.setFormMode}
      />
      <Lots
        isFormModeOn={props.isFormModeOn}
        user={props.user}
        firestore={props.firestore}
      />
      {!props.isAuth && props.isFormModeOn && <Warning />}
      {props.isAuth && (
        <FormFull
          isFormModeOn={props.isFormModeOn}
          icons={props.icons}
          furmFullUi={props.furmFullUi}
        />
      )}
    </div>
  );
};

const mstp = (state) => ({
  isAuth: state.auth.isAuth,
  icons: state.ui.icons,
  furmFullUi: state.ui.formFull,
  isFormModeOn: state.home.isFormModeOn,
  firestore: state.auth.firestore,
  user: state.user.user,
});

export const HomeCont = connect(mstp, { setFormMode })(Home);
