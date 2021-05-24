import { useEffect, useMemo } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { connect } from "react-redux";

import { setTitle, setFormMode, setProfile } from "../../Redux/Reducers/home";

import {
  resetMetaState,
  onLotCreateFromForm,
  onLotCreateFormCancel,
  publishNewLotFromForm,
} from "../../Redux/Reducers/lots";

import { Warning } from "../Components/Warning/Warning";
import { Cta } from "../Components/CTA/CTA";
import { LotListCont } from "../Components/LotList/LotList";
import { FormFull } from "../Components/FormFull/FormFull";

import styles from "./home.module.scss";

const Home = ({
  isAuth,
  icons,
  user,
  ownerID,
  formFullUI,
  isFormModeOn,
  setTitle,
  createLotId,
  setFormMode,
  setProfile,
  onLotCreateFromForm,
  onLotCreateFormCancel,
  publishNewLotFromForm,
  resetMetaState,
}) => {
  const history = useHistory();
  const locationSeacrh = useLocation().search;
  const query = useMemo(
    () => new URLSearchParams(locationSeacrh),
    [locationSeacrh]
  );

  const querySelector = useMemo(
    () => ({
      createpost: () => setFormMode(true),
    }),
    [setFormMode]
  );

  useEffect(() => {
    if (query.has("action") && !querySelector[query.get("action")]) {
      console.log("bad link query");
      return history.push(`/`);
    }

    if (
      query.get("action") === "createpost" &&
      query.get("action") in querySelector
    ) {
      setFormMode(true);
      history.push("/");
    }
  }, [setFormMode, query, querySelector, history]);

  useEffect(() => {
    resetMetaState();
    setProfile(null);
  }, [resetMetaState, setProfile]);

  useEffect(() => setTitle("Обмен.маркет"), [setTitle]);

  return (
    <div className={styles.home}>
      <h1 className={styles.welcome}>
        Обменяй ненужное <br />
        на нужное!
      </h1>

      <Cta
        icons={icons}
        isAuth={isAuth}
        isFormModeOn={isFormModeOn}
        setFormMode={setFormMode}
        createLotId={createLotId}
        onLotCreateFromForm={onLotCreateFromForm}
        onLotCreateFormCancel={onLotCreateFormCancel}
      />

      {!isFormModeOn && <LotListCont />}

      {!isAuth && isFormModeOn && <Warning />}

      {isAuth && isFormModeOn && (
        <FormFull
          user={user}
          ownerID={ownerID}
          createLotId={createLotId}
          cloudtail={true}
          icons={icons}
          formFullUI={formFullUI}
          // lotID={createLotId}
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
  createLotId: state.lots.createLotId,
});

export const HomeCont = connect(mstp, {
  setTitle,
  resetMetaState,
  setFormMode,
  setProfile,
  onLotCreateFromForm,
  onLotCreateFormCancel,
  publishNewLotFromForm,
})(Home);
