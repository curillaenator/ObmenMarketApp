import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";

import { logout, updateUserProfile } from "../../Redux/Reducers/auth";
import { setSiteTitle, getProfile } from "../../Redux/Reducers/home";
import { resetMetaState, setAuthoredLots } from "../../Redux/Reducers/lots";

import { UserInfo } from "./UserInfo";
import { ProfileEdit } from "./ProfileEdit";
import { LotListCont } from "../Components/LotList/LotList";

import { colors } from "../../Utils/palette";

const ProfileStyled = styled.div`
  .profile_titles {
    display: flex;
    align-items: center;

    .titles_title {
      text-decoration: none;
      margin-right: 0;
      margin-bottom: 24px;
      font-weight: 800;
      font-size: 28px;
      line-height: 20px;
      letter-spacing: -0.576px;
      color: ${colors.primary};
      user-select: none;
    }
  }
`;

const Profile = ({
  icons,
  formProfile,
  user,
  isAuth,
  isOwner,
  ownerID,
  profile,
  myLotsPage,
  myLotList,
  setSiteTitle,
  getProfile,
  logout,
  updateUserProfile,
  resetMetaState,
  setAuthoredLots,
}) => {
  const history = useHistory();
  const { userid } = useParams();

  const [isEdit, setIsEdit] = useState(false);

  useEffect(
    () => setAuthoredLots(ownerID, userid),
    [setAuthoredLots, ownerID, userid, myLotsPage]
  );

  useEffect(() => {
    resetMetaState();
    if (!isAuth && !userid) return history.push("/login");
    if (!isAuth && userid) return getProfile(null, userid);
    if (isAuth && !userid) return getProfile(ownerID, null);
    return getProfile(ownerID, userid);
  }, [ownerID, userid, getProfile, resetMetaState, history, isAuth]);

  useEffect(() => {
    profile && setSiteTitle(`${profile.username}`);
  }, [setSiteTitle, profile]);

  return (
    profile && (
      <ProfileStyled>
        {isEdit && (
          <ProfileEdit
            icons={icons}
            user={user}
            handleEdit={() => setIsEdit(!isEdit)}
            updateUserProfile={updateUserProfile}
            formProfile={formProfile}
          />
        )}

        {!isEdit && profile && (
          <>
            <UserInfo
              ownerID={ownerID}
              isOwner={isOwner}
              profile={isOwner ? user : profile}
              logout={logout}
              handleEdit={() => setIsEdit(!isEdit)}
            />

            {myLotList.length > 0 && (
              <div className="profile_titles">
                <div className="titles_title">
                  {isOwner ? "Мои лоты" : "Лоты автора"}
                </div>
              </div>
            )}

            <LotListCont profileLots />
          </>
        )}
      </ProfileStyled>
    )
  );
};

const mstp = (state) => ({
  icons: state.ui.icons,
  formProfile: state.ui.formProfile,
  user: state.auth.user,
  isAuth: state.auth.isAuth,
  isOwner: state.home.isOwner,
  ownerID: state.auth.ownerID,
  profile: state.home.profile,
  myLotsPage: state.lots.myLotsPage,
  myLotList: state.lots.myLotList,
});

export const ProfileCont = connect(mstp, {
  resetMetaState,
  // setFormMode,
  getProfile,
  logout,
  updateUserProfile,
  setAuthoredLots,
  setSiteTitle,
})(Profile);
