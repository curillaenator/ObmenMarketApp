import { useState, useEffect } from "react";
import { connect } from "react-redux";

import { setIsChatOn, setIsDialogsOn } from "../../../Redux/Reducers/chat";

import styles from "./chat.module.scss";

import ima from "../../../Assets/Images/2.jpg";

const Search = () => {
  return (
    <div className={styles.contacts_search}>
      <div className={styles.temp}></div>
    </div>
  );
};

const ContactCard = ({
  image,
  messqty,
  title,
  text,
  contactID,
  selectedContact,
  handleSelectedContact,
}) => {
  const className = () => {
    if (contactID === selectedContact)
      return `${styles.contact} ${styles.contact_active}`;
    if (selectedContact > 0 && contactID === selectedContact - 1)
      return `${styles.contact} ${styles.contact_before}`;
    if (selectedContact !== null && contactID === selectedContact + 1)
      return `${styles.contact} ${styles.contact_after}`;
    return styles.contact;
  };

  return (
    <div
      className={className()}
      onClick={() => handleSelectedContact(contactID)}
    >
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

const Chat = ({
  isChatOn,
  isDialogsOn,
  icons,
  setIsChatOn,
  setIsDialogsOn,
}) => {
  const [selectedContact, setSelectedContact] = useState(null);

  const closeChat = () => {
    setSelectedContact(null);
    setIsDialogsOn(false);
    setIsChatOn(false);
  };

  const handleSelectedContact = (contactID) => {
    const select = () => {
      setSelectedContact(contactID);
      setIsDialogsOn(true);
    };

    const deselect = () => {
      setSelectedContact(null);
      setIsDialogsOn(false);
    };

    selectedContact === contactID ? deselect() : select();
  };

  const contArr = [0, 5, 3, 12, 8, 0, 6, 0, 0, 13];

  const contactsOpen = isChatOn ? { width: "416px" } : { width: "0px" };
  const dialogsOpen = isDialogsOn ? { width: "720px" } : { width: "0px" };

  return (
    <div className={styles.chat}>
      <div className={styles.dialogs} style={dialogsOpen}>
        <div className={styles.dialogs_header}>
          <div className={styles.interlocutor}></div>
          <div className={styles.foldinout}></div>
        </div>

        <div className={styles.dialogs_messages}></div>

        <div className={styles.dialogs_send}></div>
      </div>

      <div className={styles.contacts} style={contactsOpen}>
        <div className={styles.contacts_header}>
          <div className={styles.title}>Мессенджер</div>

          <div className={styles.close} onClick={closeChat}>
            {icons.cancel}
          </div>
        </div>

        <Search />

        <div className={styles.contacts_list}>
          {contArr.map((contact, contactID) => (
            <ContactCard
              key={contactID}
              image={ima}
              messqty={contact}
              title="Мускулькар на Самокат Xiaomi"
              text="Фотоаппарат Zenith на Что-то, без чего вы жить не сможете никогда!"
              contactID={contactID}
              selectedContact={selectedContact}
              handleSelectedContact={handleSelectedContact}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const mstp = (state) => ({
  icons: state.ui.icons,
  isChatOn: state.chat.isChatOn,
  isDialogsOn: state.chat.isDialogsOn,
});

export const ChatCont = connect(mstp, { setIsChatOn, setIsDialogsOn })(Chat);
