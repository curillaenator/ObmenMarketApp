import { useSelector } from "react-redux";

import styles from "./chat.module.scss";

import ima from "../../../Assets/Images/2.jpg";

const Header = ({ icons, title }) => {
  return (
    <div className={styles.chat_header}>
      <div className={styles.title}>{title}</div>
      <div className={styles.close}>{icons.cancel}</div>
    </div>
  );
};

const Search = () => {
  return (
    <div className={styles.chat_search}>
      <div className={styles.temp}></div>
    </div>
  );
};

const ContactCard = ({ image, messqty, title, text }) => {
  return (
    <div className={styles.contact}>
      <div className={styles.contact_image}>
        <div className={styles.thumb}>
          <img className={styles.image} src={image} alt="" />

          {messqty > 0 && <div className={styles.messqty}>{messqty}</div>}
        </div>
      </div>

      <div className={styles.contact_info}>
        <div className={styles.infottl}>{title}</div>

        <div className={styles.infotxt}>{text}</div>
      </div>
    </div>
  );
};

export const Chat = () => {
  const icons = useSelector((state) => state.ui.icons);

  const contArr = [0, 5, 3, 12, 8, 0, 6, 0, 0, 13];

  return (
    <div className={styles.chat}>
      <Header icons={icons} title="Мессенджер" />

      <Search />

      <div className={styles.chat_contacts}>
        {contArr.map((cont, i) => (
          <ContactCard
            key={i}
            image={ima}
            messqty={cont}
            title="Мускулькар на Самокат Xiaomi"
            text="Фотоаппарат Zenith на Что-то, без чего вы жить не сможете никогда!"
          />
        ))}
      </div>
    </div>
  );
};
