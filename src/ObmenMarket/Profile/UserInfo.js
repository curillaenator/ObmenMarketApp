import { ButtonOutline } from "../Components/Button/ButtonOutline";

import styles from "./userinfo.module.scss";

import country from "../../Assets/Icons/country.svg";
import city from "../../Assets/Icons/city.svg";
import mail from "../../Assets/Icons/mail.svg";
import tel from "../../Assets/Icons/tel.svg";

export const UserInfo = ({ isOwner, profile, logout, handleEdit }) => {
  return (
    <div className={styles.userInfo}>
      <div className={styles.shape}></div>
      <img
        className={styles.photo}
        src={profile.avatar}
        alt={profile.username}
      />

      <div className={styles.info}>
        <h2 className={styles.userName}>{profile.username}</h2>

        {isOwner && (
          <div className={styles.buttons}>
            <ButtonOutline
              width={160}
              height={40}
              title="Редактировать"
              handler={handleEdit}
            />

            <ButtonOutline
              width={95}
              height={40}
              title="Выйти"
              handler={logout}
            />
          </div>
        )}

        <div className={styles.details}>
          {isOwner && (
            <div className={styles.item}>
              <img src={tel} alt="Телефон" />
              <p>+7 999 555 66 44</p>
            </div>
          )}

          {isOwner && (
            <div className={styles.item}>
              <img src={mail} alt="E-mail" />
              <p>useremail@email.ru</p>
            </div>
          )}

          <div className={styles.item}>
            <img src={country} alt="Страна" />
            <p>Россия</p>
          </div>

          <div className={styles.item}>
            <img src={city} alt="Город" />
            <p>Москва</p>
          </div>
        </div>
      </div>
    </div>
  );
};
