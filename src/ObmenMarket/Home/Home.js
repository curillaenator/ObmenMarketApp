import { useEffect, useMemo } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { connect } from "react-redux";

import {
  setSiteTitle,
  setFormMode,
  setProfile,
  ctaSearch,
} from "../../Redux/Reducers/home";

import {
  myLotList,
  resetMetaState,
  onLotCreateFromForm,
  onLotCreateFormCancel,
  publishNewLotFromForm,
} from "../../Redux/Reducers/lots";

import { Warning } from "../Components/Warning/Warning";
import { Cta } from "../Components/CTA/CTA";
import { FiltersCont } from "../Components/Search/FiltersHome";
import { LotListCont } from "../Components/LotList/LotList";
import { FormFull } from "../Components/FormFull/FormFull";
import { Loading } from "../Components/Loading/Loading";

import styles from "./home.module.scss";

const Home = ({
  isAuth,
  icons,
  user,
  ownerID,
  formFullUI,
  isFormModeOn,
  isSearching,
  // searchResults,
  setSiteTitle,
  createLotId,
  setFormMode,
  setProfile,
  myLotList,
  onLotCreateFromForm,
  onLotCreateFormCancel,
  publishNewLotFromForm,
  resetMetaState,
  ctaSearch,
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
    myLotList([]);
  }, [resetMetaState, setProfile, myLotList]);

  useEffect(() => setSiteTitle("Обмен.маркет"), [setSiteTitle]);

  return (
    <div className={styles.home}>
      <h1 className={styles.welcome}>
        Обменяй ненужное <br />
        на нужное!
      </h1>

      <Cta
        icons={icons}
        isAuth={isAuth}
        ctaSearch={ctaSearch}
        isFormModeOn={isFormModeOn}
        setFormMode={setFormMode}
        createLotId={createLotId}
        onLotCreateFromForm={onLotCreateFromForm}
        onLotCreateFormCancel={onLotCreateFormCancel}
      />

      {!isAuth && isFormModeOn && <Warning />}

      {!isFormModeOn && <FiltersCont />}

      {isSearching && (
        <div className={styles.searchloading}>
          <Loading />
        </div>
      )}

      {!isFormModeOn && !isSearching && <LotListCont />}

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
  isSearching: state.home.isSearching,
  // searchResults: state.lots.searchResults,
  formFullUI: state.ui.formFull,
  isFormModeOn: state.home.isFormModeOn,
  createLotId: state.lots.createLotId,
});

export const HomeCont = connect(mstp, {
  setSiteTitle,
  resetMetaState,
  setFormMode,
  setProfile,
  myLotList,
  onLotCreateFromForm,
  onLotCreateFormCancel,
  publishNewLotFromForm,
  ctaSearch,
})(Home);
