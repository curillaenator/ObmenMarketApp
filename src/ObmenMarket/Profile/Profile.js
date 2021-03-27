import { useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Redirect, withRouter } from "react-router-dom";

import { logout } from "../../Redux/Reducers/auth";
import { getProfile } from "../../Redux/Reducers/home";

import { UserInfo } from "./UserInfo";

import styles from "./profile.module.scss";

const Profile = ({
  user,
  isAuth,
  match,
  isProfilePending,
  isOwner,
  profile,
  getProfile,
  logout,
  ...props
}) => {
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
      </div>
    )
  );
};

const mstp = (state) => ({
  user: state.auth.user,
  isAuth: state.auth.isAuth,
  isProfilePending: state.home.isProfilePending,
  isOwner: state.home.isOwner,
  profile: state.home.profile,
});

export const ProfileCont = compose(
  withRouter,
  connect(mstp, { getProfile, logout })
)(Profile);
