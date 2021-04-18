// import { useSelector } from "react-redux";
import { connect } from "react-redux";

import { setIsChatOn } from "../../../Redux/Reducers/chat";

import styles from "./chat.module.scss";

import ima from "../../../Assets/Images/2.jpg";

const Header = ({ icons, title, setIsChatOn }) => {
  return (
    <div className={styles.chat_header}>
      <div className={styles.title}>{title}</div>
      <div className={styles.close} onClick={() => setIsChatOn(false)}>
        {icons.cancel}
      </div>
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

const Chat = ({ isChatOn, icons, setIsChatOn }) => {
  // const icons = useSelector((state) => state.ui.icons);

  const contArr = [0, 5, 3, 12, 8, 0, 6, 0, 0, 13];

  const presence = isChatOn ? { width: "416px" } : { width: "0px" };

  return (
    <div className={styles.chat} style={presence}>
      <Header icons={icons} title="Мессенджер" setIsChatOn={setIsChatOn} />

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

const mstp = (state) => ({
  icons: state.ui.icons,
  isChatOn: state.chat.isChatOn,
});

export const ChatCont = connect(mstp, { setIsChatOn })(Chat);
