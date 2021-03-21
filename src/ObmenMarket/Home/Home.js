import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { Welcome } from "./Welcome/Welcome";
import { Cta } from "./CTA/CTA";
import { Lots } from "./Lots/Lots";
import { Warning } from "./Warning/Warning";
import { FormFull } from "../Components/FormFull/FormFull";

import { setFormMode } from "../../Redux/Reducers/home";

import {
  getLotsList,
  initializeLot,
  deleteCanceledLot,
  publishLotFromForm,
} from "../../Redux/Reducers/lots";

import styles from "./home.module.scss";

const Home = (props) => {
  if (props.isCurrentLot) return <Redirect to="/post" />;
  return (
    <div className={styles.home}>
      <Welcome />
      <Cta
        icons={props.icons}
        isFormModeOn={props.isFormModeOn}
        setFormMode={props.setFormMode}
        newLot={props.newLot}
        newLotId={props.newLotId}
        initializeLot={props.initializeLot}
        deleteCanceledLot={props.deleteCanceledLot}
      />
      <Lots
        lotsList={props.lotsList}
        isLotsLoaded={props.isLotsLoaded}
        isFormModeOn={props.isFormModeOn}
        user={props.user}
        firestore={props.firestore}
        getLotsList={props.getLotsList}
      />
      {!props.isAuth && props.isFormModeOn && <Warning />}
      {props.isAuth && (
        <FormFull
          isFormModeOn={props.isFormModeOn}
          icons={props.icons}
          furmFullUi={props.furmFullUi}
          newLotId={props.newLotId}
          publishLotFromForm={props.publishLotFromForm}
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
  // user: state.user.user,
  newLot: state.lots.newLot,
  newLotId: state.lots.newLotId,
  lotsList: state.lots.lotsList,
  isLotsLoaded: state.lots.isLotsLoaded,
  isCurrentLot: state.lots.isCurrentLot,
});

export const HomeCont = connect(mstp, {
  setFormMode,
  initializeLot,
  deleteCanceledLot,
  publishLotFromForm,
  getLotsList,
})(Home);
