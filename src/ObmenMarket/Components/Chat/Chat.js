import { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Form, Field } from "react-final-form";
import { Scrollbars } from "rc-scrollbars";
import { fb, fst } from "../../../Utils/firebase";

import { TextInput } from "../../Components/Inputs/Inputs";

import {
  selectRoom,
  deselectRoom,
  closeChat,
  postMessage,
  subscribeAllRooms,
} from "../../../Redux/Reducers/chat";

import sendmess from "../../../Assets/Icons/message.svg";

import styles from "./chat.module.scss";

const ContactCard = ({
  room,
  rooms,
  messqty,
  curRoomID,
  isDialogsOn,
  handleSelected,
}) => {
  const [photolinks, setPhotoLinks] = useState(null);

  const roomCnt = rooms.findIndex((id) => id === room.roomID);
  const curRoomCnt = rooms.findIndex((id) => id === curRoomID);

  useEffect(() => {
    const photoItems = fst
      .ref(room.photoPath)
      .listAll()
      .then((res) => res.items.map((item) => item.getDownloadURL()));

    Promise.resolve(photoItems).then((links) =>
      Promise.all(links).then((linksArr) => setPhotoLinks(linksArr))
    );
  }, [room.photoPath]);

  const contactsClassName = () => {
    if (room.roomID === curRoomID)
      return `${styles.contact} ${styles.contact_active}`;
    if (isDialogsOn && roomCnt === curRoomCnt - 1)
      return `${styles.contact} ${styles.contact_before}`;
    if (isDialogsOn && roomCnt === curRoomCnt + 1)
      return `${styles.contact} ${styles.contact_after}`;
    return styles.contact;
  };

  return (
    photolinks && (
      <div
        className={contactsClassName()}
        onClick={() => handleSelected(room.roomID)}
      >
        <div className={styles.contact_image}>
          <div className={styles.thumb}>
            <img className={styles.image} src={photolinks[0]} alt="" />

            {messqty > 0 && <div className={styles.messqty}>{messqty}</div>}
          </div>
        </div>

        <div className={styles.contact_info}>
          <div className={styles.infottl}>{room.title}</div>

          <div className={styles.infotxt}>{room.lotDescription}</div>
        </div>
      </div>
    )
  );
};

const Contacts = ({
  icons,
  rooms,
  isChatOn,
  isDialogsOn,
  curRoomID,
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

      <Scrollbars autoHide classes={{ view: styles.contacts_list }}>
        {rooms.map((room) => (
          <ContactCard
            key={room.roomID}
            room={room}
            rooms={rooms.map((room) => room.roomID)}
            curRoomID={curRoomID}
            messqty={2}
            isDialogsOn={isDialogsOn}
            handleSelected={handleSelected}
          />
        ))}
      </Scrollbars>
    </div>
  );
};

const Dialogs = ({
  isDialogsOn,
  curRoomID,
  ownerID,
  messages,
  postMessage,
}) => {
  const ref = useRef(null);

  useEffect(() => messages && ref.current.scrollToBottom(), [
    messages,
    curRoomID,
  ]);

  const Message = ({ message }) => {
    const messageClassN =
      message.authorID === ownerID
        ? `${styles.message} ${styles.message_owner}`
        : `${styles.message} ${styles.message_opponent}`;

    return <div className={messageClassN}>{message.message}</div>;
  };

  const dialogsOpen = isDialogsOn ? { width: "720px" } : { width: "0px" };

  const onSubmit = (messData) => {
    const messMeta = {
      authorID: ownerID,
      postedAt: fb.database.ServerValue.TIMESTAMP,
    };

    postMessage(curRoomID, { ...messData, ...messMeta });
  };

  return (
    <div className={styles.dialogs} style={dialogsOpen}>
      <div className={styles.dialogs_header}>
        <div className={styles.interlocutor}></div>
        <div className={styles.foldinout}></div>
      </div>

      <div className={styles.dialogs_messages}>
        <Scrollbars
          ref={ref}
          autoHide
          classes={{ view: styles.dialogs_scroll }}
        >
          {messages &&
            Object.keys(messages)
              .map((id) => messages[id])
              .map((message) => (
                <Message key={message.postedAt} message={message} />
              ))}
        </Scrollbars>
      </div>

      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, form }) => {
          const handleSendMessage = (e) => {
            e.preventDefault();
            form.submit();
            form.reset();
          };

          return (
            <form className={styles.dialogs_newmessage} onSubmit={handleSubmit}>
              <div className={styles.write}>
                <Field
                  name="message"
                  placeholder="Текст сообщения"
                  classN="message"
                  component={TextInput}
                />

                <button className={styles.send} onClick={handleSendMessage}>
                  <img src={sendmess} alt="Send" />
                </button>
              </div>
            </form>
          );
        }}
      />
    </div>
  );
};

const Chat = ({
  icons,
  ownerID,
  isChatOn,
  isDialogsOn,
  curRoomID,
  rooms,
  roomsMsgs,
  subscribeAllRooms,
  selectRoom,
  deselectRoom,
  closeChat,
  postMessage,
}) => {
  const handleSelected = (roomID) => {
    curRoomID === roomID ? deselectRoom() : selectRoom(roomID);
  };

  useEffect(() => ownerID && subscribeAllRooms(ownerID), [
    ownerID,
    subscribeAllRooms,
  ]);

  return (
    rooms && (
      <div className={styles.chat}>
        <Dialogs
          isDialogsOn={isDialogsOn}
          curRoomID={curRoomID}
          ownerID={ownerID}
          messages={roomsMsgs[curRoomID]}
          postMessage={postMessage}
        />

        <Contacts
          icons={icons}
          isDialogsOn={isDialogsOn}
          isChatOn={isChatOn}
          rooms={rooms}
          curRoomID={curRoomID}
          handleSelected={handleSelected}
          closeChat={closeChat}
        />
      </div>
    )
  );
};

const mstp = (state) => ({
  icons: state.ui.icons,
  ownerID: state.auth.ownerID,
  rooms: state.chat.rooms,
  curRoomID: state.chat.curRoomID,
  isChatOn: state.chat.isChatOn,
  isDialogsOn: state.chat.isDialogsOn,
  roomsMsgs: state.chat.roomsMsgs,
});

export const ChatCont = connect(mstp, {
  selectRoom,
  deselectRoom,
  closeChat,
  postMessage,
  subscribeAllRooms,
})(Chat);
