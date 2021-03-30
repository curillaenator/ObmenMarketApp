import { useEffect } from "react";
import { connect } from "react-redux";
// import { Redirect } from "react-router-dom";

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

const Home = ({
  isAuth,
  icons,
  formFullUI,
  isFormModeOn,
  createLotId,
  setFormMode,
  onLotCreateFromForm,
  onLotCreateFormCancel,
  publishNewLotFromForm,
}) => {
  useEffect(() => setFormMode(false), []);

  // if (props.isCurrentLot) return <Redirect to="/post" />;

  return (
    <div className={styles.home}>
      <Welcome />

      <Cta
        icons={icons}
        isAuth={isAuth}
        isFormModeOn={isFormModeOn}
        setFormMode={setFormMode}
        createLotId={createLotId}
        onLotCreateFromForm={onLotCreateFromForm}
        onLotCreateFormCancel={onLotCreateFormCancel}
      />

      {!isFormModeOn && <LotsContainer toRender="all" />}

      {!isAuth && isFormModeOn && <Warning />}

      {isAuth && isFormModeOn && (
        <FormFull
          icons={icons}
          formFullUI={formFullUI}
          lotID={createLotId}
          update={false}
          formHandler={publishNewLotFromForm}
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
