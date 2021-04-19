import { useState } from "react";
import { connect } from "react-redux";
import { Form, Field } from "react-final-form";

import { TextInput } from "../../Components/Inputs/Inputs";

import { setIsChatOn, setIsDialogsOn } from "../../../Redux/Reducers/chat";

import sendmess from "../../../Assets/Icons/message.svg";

import styles from "./chat.module.scss";

import ima from "../../../Assets/Images/2.jpg";

const ContactCard = ({
  image,
  messqty,
  title,
  text,
  contactID,
  selectedID,
  handleSelected,
}) => {
  const className = () => {
    if (contactID === selectedID)
      return `${styles.contact} ${styles.contact_active}`;
    if (selectedID > 0 && contactID === selectedID - 1)
      return `${styles.contact} ${styles.contact_before}`;
    if (selectedID !== null && contactID === selectedID + 1)
      return `${styles.contact} ${styles.contact_after}`;
    return styles.contact;
  };

  return (
    <div className={className()} onClick={() => handleSelected(contactID)}>
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

const Contacts = ({
  icons,
  isChatOn,
  contacts,
  selectedID,
  handleSelected,
  closeChat,
}) => {
  const contactsOpen = isChatOn ? { width: "416px" } : { width: "0px" };

  return (
    <div className={styles.contacts} style={contactsOpen}>
      <div className={styles.contacts_header}>
        <div className={styles.title}>Мессенджер</div>

        <div className={styles.close} onClick={closeChat}>
          {icons.cancel}
        </div>
      </div>

      <div className={styles.contacts_search}>
        <div className={styles.temp}></div>
      </div>

      <div className={styles.contacts_list}>
        {contacts.map((contact, contactID) => (
          <ContactCard
            key={contactID}
            image={ima}
            messqty={contact}
            title="Мускулькар на Самокат Xiaomi"
            text="Фотоаппарат Zenith на Что-то, без чего вы жить не сможете никогда!"
            contactID={contactID}
            selectedID={selectedID}
            handleSelected={handleSelected}
          />
        ))}
      </div>
    </div>
  );
};

const NewMessage = ({ handleSubmit }) => {
  return (
    <form className={styles.dialogs_newmessage} onSubmit={handleSubmit}>
      <div className={styles.write}>
        <Field
          name="message"
          placeholder="Текст сообщения"
          classN="message"
          component={TextInput}
        />

        <button className={styles.send}>
          <img src={sendmess} alt="Send" />
        </button>
      </div>
    </form>
  );
};

const Dialogs = ({ isDialogsOn }) => {
  const onSubmit = (messData) => console.log(messData);

  const dialogsOpen = isDialogsOn ? { width: "720px" } : { width: "0px" };

  return (
    <div className={styles.dialogs} style={dialogsOpen}>
      <div className={styles.dialogs_header}>
        <div className={styles.interlocutor}></div>
        <div className={styles.foldinout}></div>
      </div>

      <div className={styles.dialogs_messages}></div>

      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, form }) => (
          <NewMessage handleSubmit={handleSubmit} form={form} />
        )}
      />
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
  const [selectedID, setSelectedID] = useState(null);

  const closeChat = () => {
    setSelectedID(null);
    setIsDialogsOn(false);
    setIsChatOn(false);
  };

  const handleSelected = (contactID) => {
    const select = () => {
      setSelectedID(contactID);
      setIsDialogsOn(true);
    };

    const deselect = () => {
      setSelectedID(null);
      setIsDialogsOn(false);
    };

    selectedID === contactID ? deselect() : select();
  };

  const contacts = [0, 5, 3, 12, 8, 0, 6, 0, 0, 13];

  return (
    <div className={styles.chat}>
      <Dialogs isDialogsOn={isDialogsOn} />

      <Contacts
        icons={icons}
        isChatOn={isChatOn}
        contacts={contacts}
        selectedID={selectedID}
        handleSelected={handleSelected}
        closeChat={closeChat}
      />
    </div>
  );
};

const mstp = (state) => ({
  icons: state.ui.icons,
  isChatOn: state.chat.isChatOn,
  isDialogsOn: state.chat.isDialogsOn,
});

export const ChatCont = connect(mstp, { setIsChatOn, setIsDialogsOn })(Chat);
