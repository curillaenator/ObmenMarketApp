import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Form, Field } from "react-final-form";
import { fb, fst } from "../../../Utils/firebase";

import { TextInput } from "../../Components/Inputs/Inputs";

import {
  getChatRoomList,
  updateRoomList,
  selectRoom,
  deselectRoom,
  closeChat,
  postMessage,
} from "../../../Redux/Reducers/chat";

import sendmess from "../../../Assets/Icons/message.svg";

import styles from "./chat.module.scss";

const ContactCard = ({ room, messqty, roomCnt, curRoom, handleSelected }) => {
  const [photolinks, setPhotoLinks] = useState(null);

  const roomData = {
    roomID: room && room.roomID,
    roomCnt: roomCnt,
  };

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
    if (roomCnt === curRoom.roomCnt)
      return `${styles.contact} ${styles.contact_active}`;
    if (curRoom.roomCnt > 0 && roomCnt === curRoom.roomCnt - 1)
      return `${styles.contact} ${styles.contact_before}`;
    if (curRoom.roomCnt !== null && roomCnt === curRoom.roomCnt + 1)
      return `${styles.contact} ${styles.contact_after}`;
    return styles.contact;
  };

  return (
    photolinks && (
      <div
        className={contactsClassName()}
        onClick={() => handleSelected(roomData)}
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
  curRoom,
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
        {rooms.map((room, roomCnt) => (
          <ContactCard
            key={roomCnt}
            room={room}
            messqty={2}
            roomCnt={roomCnt}
            curRoom={curRoom}
            handleSelected={handleSelected}
          />
        ))}
      </div>
    </div>
  );
};

const Dialogs = ({ isDialogsOn, curRoom, ownerID, messages, postMessage }) => {
  const onSubmit = (messData) => {
    const messMeta = {
      authorID: ownerID,
      postedAt: fb.database.ServerValue.TIMESTAMP,
    };

    postMessage(curRoom.roomID, { ...messData, ...messMeta });
  };

  const currentDialog = messages[curRoom.roomID]
    ? messages[curRoom.roomID]
    : {};

  const dialog = Object.keys(currentDialog).map((mgs) => currentDialog[mgs]);

  const Message = ({ message }) => {
    const messageClassN =
      message.authorID === ownerID
        ? `${styles.message} ${styles.message_owner}`
        : `${styles.message} ${styles.message_opponent}`;

    return <div className={messageClassN}>{message.message}</div>;
  };

  const dialogsOpen = isDialogsOn
    ? { width: "720px", opacity: 1 }
    : { width: "0px", opacity: 0 };

  return (
    <div className={styles.dialogs} style={dialogsOpen}>
      <div className={styles.dialogs_header}>
        <div className={styles.interlocutor}></div>
        <div className={styles.foldinout}></div>
      </div>

      <div className={styles.dialogs_messages}>
        {dialog.map((mess) => (
          <Message key={mess.postedAt} message={mess} />
        ))}
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
  user,
  ownerID,
  isChatOn,
  isDialogsOn,
  isRoomIDs,
  curRoom,
  rooms,
  messages,
  getChatRoomList,
  updateRoomList,
  selectRoom,
  deselectRoom,
  closeChat,
  postMessage,
}) => {
  const handleSelected = (roomData) => {
    curRoom.roomCnt === roomData.roomCnt
      ? deselectRoom()
      : selectRoom(roomData);
  };

  useEffect(() => isRoomIDs && getChatRoomList(user.chats), [
    user.chats,
    isRoomIDs,
    getChatRoomList,
  ]);

  useEffect(() => ownerID && updateRoomList(ownerID), [
    ownerID,
    updateRoomList,
  ]);

  return (
    rooms && (
      <div className={styles.chat}>
        <Dialogs
          isDialogsOn={isDialogsOn}
          curRoom={curRoom}
          ownerID={ownerID}
          messages={messages}
          postMessage={postMessage}
        />

        <Contacts
          icons={icons}
          isChatOn={isChatOn}
          rooms={rooms}
          curRoom={curRoom}
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
  user: state.auth.user,
  isRoomIDs: state.chat.isRoomIDs,
  rooms: state.chat.rooms,
  curRoom: state.chat.curRoom,
  isChatOn: state.chat.isChatOn,
  isDialogsOn: state.chat.isDialogsOn,
  messages: state.chat.messages,
});

export const ChatCont = connect(mstp, {
  getChatRoomList,
  updateRoomList,
  selectRoom,
  deselectRoom,
  closeChat,
  postMessage,
})(Chat);
