import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";

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
  history,
  location,
  createLotId,
  isFormModeOn,
  isOwner,
  ownerID,
  profile,
  getProfile,
  logout,
  updateUserProfile,
  setFormMode,
  onLotCreateFromForm,
  onLotCreateFormCancel,
  publishNewLotFromForm,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const handleEdit = () => setIsEdit(!isEdit);

  useEffect(() => {
    setFormMode(false);
    if (!isAuth && !match.params.id) return history.push("/login");
    if (!isAuth && match.params.id) return getProfile(null, match.params.id);
    if (isAuth && !match.params.id) return getProfile(ownerID, null);
    return getProfile(ownerID, match.params.id);
  }, [ownerID, match.params.id, getProfile, setFormMode, history, isAuth]);

  return (
    profile && (
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
            {isOwner && (
              <Cta
                icons={icons}
                isAuth={isAuth}
                isFormModeOn={isFormModeOn}
                setFormMode={setFormMode}
                createLotId={createLotId}
                onLotCreateFromForm={onLotCreateFromForm}
                onLotCreateFormCancel={onLotCreateFormCancel}
              />
            )}

            {!isFormModeOn && (
              <>
                <UserInfo
                  isOwner={isOwner}
                  profile={profile}
                  logout={logout}
                  handleEdit={handleEdit}
                />

                <ProfileLots
                  ownerID={ownerID}
                  isOwner={isOwner}
                  matchedID={match.params.id}
                />
              </>
            )}

            {isFormModeOn && (
              <FormFull
                icons={icons}
                formFullUI={formFullUI}
                lotID={createLotId}
                update={false}
                formHandler={publishNewLotFromForm}
              />
            )}
          </div>
        )}
      </div>
    )
  );
};

const mstp = (state) => ({
  icons: state.ui.icons,
  formProfile: state.ui.formProfile,
  formFullUI: state.ui.formFull,
  user: state.auth.user,
  isAuth: state.auth.isAuth,
  isFormModeOn: state.home.isFormModeOn,
  isOwner: state.home.isOwner,
  ownerID: state.auth.ownerID,
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
