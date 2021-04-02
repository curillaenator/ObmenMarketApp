import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Redirect, withRouter } from "react-router-dom";

import { fa } from "../../Utils/firebase";
import { logout, updateUserProfile } from "../../Redux/Reducers/auth";
import { setFormMode, getProfile } from "../../Redux/Reducers/home";
import {
  onLotCreateFromForm,
  onLotCreateFormCancel,
  publishNewLotFromForm,
} from "../../Redux/Reducers/lots";

import { UserInfo } from "./UserInfo";
import { ProfileLots } from "./ProfileLots";
import { ProfileEdit } from "./ProfileEdit";
import { Cta } from "../Components/CTA/CTA";
import { FormFull } from "../Components/FormFull/FormFull";

import styles from "./profile.module.scss";

const Profile = ({
  icons,
  formProfile,
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
  updateUserProfile,
  setFormMode,
  onLotCreateFromForm,
  onLotCreateFormCancel,
  publishNewLotFromForm,
  ...props
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const handleEdit = () => setIsEdit(!isEdit);

  useEffect(() => getProfile(user, match.params.id), [
    user,
    match.params.id,
    getProfile,
  ]);

  if (!fa.currentUser) return <Redirect to="/login" />;

  if (isProfilePending) return <div></div>;

  return (
    <div className={styles.profile}>
      {isEdit && (
        <ProfileEdit
          icons={icons}
          user={user}
          handleEdit={handleEdit}
          updateUserProfile={updateUserProfile}
          formProfile={formProfile}
        />
      )}

      {!isEdit && profile && (
        <div className={styles.display}>
          <UserInfo
            isOwner={isOwner}
            profile={profile}
            logout={logout}
            handleEdit={handleEdit}
          />

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
      )}
    </div>
  );
};

const mstp = (state) => ({
  icons: state.ui.icons,
  formProfile: state.ui.formProfile,
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
    updateUserProfile,
    onLotCreateFromForm,
    onLotCreateFormCancel,
    publishNewLotFromForm,
  })
)(Profile);
