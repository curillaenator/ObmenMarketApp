import { connect } from "react-redux";

import { Welcome } from "./Welcome/Welcome";
import { Cta } from "./CTA/CTA";
import { Lots } from "./Lots/Lots";
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
      <FormFull isFormModeOn={props.isFormModeOn} icons={props.icons} />
    </div>
  );
};

const mstp = (state) => ({
  icons: state.ui.icons,
  firestore: state.auth.firestore,
  user: state.user.user,
  isFormModeOn: state.home.isFormModeOn,
});

export const HomeCont = connect(mstp, { setFormMode })(Home);
