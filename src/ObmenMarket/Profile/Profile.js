import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { UserInfo } from "./UserInfo";
import { logout } from "../../Redux/Reducers/auth";

import styles from "./profile.module.scss";

const Profile = (props) => {
  if (!props.isAuth) return <Redirect to="/login" />;
  return (
    <div className={styles.profile}>
      <UserInfo user={props.user} logout={props.logout} />
    </div>
  );
};

const mstp = (state) => ({
  user: state.user.user,
  isAuth: state.auth.isAuth,
});

export const ProfileCont = connect(mstp, { logout })(Profile);
