import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { Welcome } from "./Welcome/Welcome";
import { Cta } from "../Components/CTA/CTA";
import { LotsContainer } from "../Components/LotsContainer/LotsContainer";
import { Warning } from "./Warning/Warning";
import { FormFull } from "../Components/FormFull/FormFull";

import { setFormMode } from "../../Redux/Reducers/home";

import {
  onLotCreateFromForm,
  onLotCreateFormCancel,
  publishNewLotFromForm,
} from "../../Redux/Reducers/lots";

import styles from "./home.module.scss";

const Home = (props) => {
  if (props.isCurrentLot) return <Redirect to="/post" />;

  return (
    <div className={styles.home}>
      <Welcome />

      <Cta
        icons={props.icons}
        isAuth={props.isAuth}
        isFormModeOn={props.isFormModeOn}
        setFormMode={props.setFormMode}
        createLotId={props.createLotId}
        onLotCreateFromForm={props.onLotCreateFromForm}
        onLotCreateFormCancel={props.onLotCreateFormCancel}
      />

      <LotsContainer isFormModeOn={props.isFormModeOn} toRender="all" />

      {!props.isAuth && props.isFormModeOn && <Warning />}

      {props.isAuth && (
        <FormFull
          isFormModeOn={props.isFormModeOn}
          icons={props.icons}
          formFullUI={props.formFullUI}
          createLotId={props.createLotId}
          publishNewLotFromForm={props.publishNewLotFromForm}
        />
      )}
    </div>
  );
};

const mstp = (state) => ({
  isAuth: state.auth.isAuth,
  icons: state.ui.icons,
  formFullUI: state.ui.formFull,
  isFormModeOn: state.home.isFormModeOn,
  createLotId: state.lots.createLotId,
});

export const HomeCont = connect(mstp, {
  setFormMode,
  onLotCreateFromForm,
  onLotCreateFormCancel,
  publishNewLotFromForm,
})(Home);
