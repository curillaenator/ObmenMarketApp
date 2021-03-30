import { useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Redirect, withRouter } from "react-router-dom";

import { logout } from "../../Redux/Reducers/auth";
import { setFormMode, getProfile } from "../../Redux/Reducers/home";
import {
  onLotCreateFromForm,
  onLotCreateFormCancel,
  publishNewLotFromForm,
} from "../../Redux/Reducers/lots";

import { UserInfo } from "./UserInfo";
import { Cta } from "../Components/CTA/CTA";
import { FormFull } from "../Components/FormFull/FormFull";
import { ProfileLots } from "./ProfileLots";

import styles from "./profile.module.scss";

const Profile = ({
  icons,
  formFullUI,
  user,
  isAuth,
  match,
  createLotId,
  isFormModeOn,
  isProfilePending,
  isOwner,
  profile,
  getProfile,
  logout,
  setFormMode,
  onLotCreateFromForm,
  onLotCreateFormCancel,
  publishNewLotFromForm,
  ...props
}) => {
  // console.log(user);
  useEffect(() => getProfile(user, match.params.id), [
    user,
    match.params.id,
    getProfile,
  ]);

  if (!isAuth) return <Redirect to="/login" />;

  if (isProfilePending) return <div></div>;

  return (
    profile && (
      <div className={styles.profile}>
        <UserInfo isOwner={isOwner} profile={profile} logout={logout} />
        {isOwner && (
          <>
            <Cta
              icons={icons}
              isAuth={isAuth}
              isFormModeOn={isFormModeOn}
              setFormMode={setFormMode}
              createLotId={createLotId}
              onLotCreateFromForm={onLotCreateFromForm}
              onLotCreateFormCancel={onLotCreateFormCancel}
            />

            {isFormModeOn && (
              <FormFull
                icons={icons}
                formFullUI={formFullUI}
                lotID={createLotId}
                update={false}
                formHandler={publishNewLotFromForm}
              />
            )}
          </>
        )}

        <ProfileLots
          isAuth={isAuth}
          isOwner={isOwner}
          isFormModeOn={isFormModeOn}
          matchedID={match.params.id}
        />
      </div>
    )
  );
};

const mstp = (state) => ({
  icons: state.ui.icons,
  formFullUI: state.ui.formFull,
  user: state.auth.user,
  isAuth: state.auth.isAuth,
  isFormModeOn: state.home.isFormModeOn,
  isProfilePending: state.home.isProfilePending,
  isOwner: state.home.isOwner,
  profile: state.home.profile,
  createLotId: state.lots.createLotId,
});

export const ProfileCont = compose(
  withRouter,
  connect(mstp, {
    setFormMode,
    getProfile,
    logout,
    onLotCreateFromForm,
    onLotCreateFormCancel,
    publishNewLotFromForm,
  })
)(Profile);
