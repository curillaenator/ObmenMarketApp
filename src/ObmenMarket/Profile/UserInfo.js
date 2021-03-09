import { ButtonOutline } from "../Components/Button/ButtonOutline";

import styles from "./userinfo.module.scss";

import country from "../../Assets/Icons/country.svg";
import city from "../../Assets/Icons/city.svg";
import mail from "../../Assets/Icons/mail.svg";
import tel from "../../Assets/Icons/tel.svg";

export const UserInfo = (props) => {
  //   console.log(props);
  return (
    <div className={styles.userInfo}>
      <div className={styles.shape}></div>
      <img className={styles.photo} src={props.user.photoURL} alt="" />

      <div className={styles.info}>
        <h2 className={styles.userName}>{props.user.displayName}</h2>

        <div className={styles.buttons}>
          <ButtonOutline width={160} height={40} title="Редактировать" />
          <ButtonOutline
            width={95}
            height={40}
            title="Выйти"
            handler={props.logout}
          />
        </div>

        <div className={styles.details}>
          <div className={styles.item}>
            <img src={tel} alt="Телефон" />
            <p>+7 999 555 66 44</p>
          </div>

          <div className={styles.item}>
            <img src={mail} alt="E-mail" />
            <p>useremail@email.ru</p>
          </div>

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
