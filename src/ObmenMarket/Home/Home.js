import { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Welcome } from "./Welcome/Welcome";
import { Warning } from "./Warning/Warning";
import { Cta } from "../Components/CTA/CTA";
import { LotsContainer } from "../Components/LotsContainer/LotsContainer";
import { FormFull } from "../Components/FormFull/FormFull";

import { setFormMode, setProfile } from "../../Redux/Reducers/home";

import {
  resetMetaState,
  onLotCreateFromForm,
  onLotCreateFormCancel,
  publishNewLotFromForm,
} from "../../Redux/Reducers/lots";

import styles from "./home.module.scss";

const Home = ({
  isAuth,
  icons,
  user,
  ownerID,
  formFullUI,
  isFormModeOn,
  createLotId,
  isLotCreated,
  setFormMode,
  setProfile,
  onLotCreateFromForm,
  onLotCreateFormCancel,
  publishNewLotFromForm,
  resetMetaState,
}) => {
  useEffect(() => {
    setFormMode(false);
    resetMetaState();
    setProfile(null);
  }, [setFormMode, resetMetaState, setProfile]);

  if (isLotCreated) return <Redirect to={`/posts/${createLotId}`} />;

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
          user={user}
          ownerID={ownerID}
          createLotId={createLotId}
          cloudtail={true}
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
  user: state.auth.user,
  ownerID: state.auth.ownerID,
  formFullUI: state.ui.formFull,
  isFormModeOn: state.home.isFormModeOn,
  isLotCreated: state.lots.isLotCreated,
  createLotId: state.lots.createLotId,
});

export const HomeCont = connect(mstp, {
  resetMetaState,
  setFormMode,
  setProfile,
  onLotCreateFromForm,
  onLotCreateFormCancel,
  publishNewLotFromForm,
})(Home);
