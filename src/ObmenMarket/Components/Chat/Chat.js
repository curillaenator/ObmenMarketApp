import { useState, useEffect, useRef, useCallback } from "react";
import { connect } from "react-redux";
import { Form, Field } from "react-final-form";
import { Scrollbars } from "rc-scrollbars";
import { db, fb, fst } from "../../../Utils/firebase";

import { ButtonIcon } from "../../Components/Button/ButtonIcon";
import { Dropdown } from "../Dropdown/Dropdown";
import { TextInput } from "../../Components/Inputs/Inputs";
import { Author } from "../Author/Author";
import { Loading } from "../Loading/Loading";

import {
  removeChatRoom,
  selectRoom,
  deselectRoom,
  handleChatOn,
  postMessage,
  getDialogOpponent,
} from "../../../Redux/Reducers/chat";

import sendmess from "../../../Assets/Icons/message.svg";

import styles from "./chat.module.scss";

const onUpd = (err) => (err ? console.log(err) : console.log("success"));

const ContactCard = ({
  icons,
  ownerID,
  room,
  rooms,
  messqty,
  lastMessage,
  curRoomID,
  isDialogsOn,
  handleSelected,
  removeChatRoom,
}) => {
  const [opened, setOpened] = useState(null);
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

  useEffect(() => {
    if (opened !== null && opened !== curRoomID) {
      db.ref(`users/${ownerID}/chats/${opened}`)
        .update({ newMessages: 0 }, onUpd)
        .then(() => setOpened(null));
      return null;
    }

    if (opened === null && room.roomID === curRoomID) {
      db.ref(`users/${ownerID}/chats/${curRoomID}`)
        .update({ newMessages: 0 }, onUpd)
        .then(() => setOpened(room.roomID));
      return null;
    }
  }, [ownerID, opened, room.roomID, curRoomID]);

  const contactsClassName = () => {
    if (room.roomID === curRoomID)
      return `${styles.contact} ${styles.contact_active}`;
    if (isDialogsOn && roomCnt === curRoomCnt - 1)
      return `${styles.contact} ${styles.contact_before}`;
    if (isDialogsOn && roomCnt === curRoomCnt + 1)
      return `${styles.contact} ${styles.contact_after}`;
    return styles.contact;
  };

  const dropMenuItems = [
    {
      title: "Удалить",
      icon: icons.delete,
      handler: () => removeChatRoom(room.roomID),
    },
    {
      title: "Блокировать",
      icon: icons.edit,
      handler: () => console.log("Пока не работаит, идиот не блокирован"),
    },
  ];

  return (
    photolinks && (
      <div className={contactsClassName()}>
        <div
          className={styles.roominfo}
          onClick={() => handleSelected(room.roomID)}
        >
          <div className={styles.roominfo_image}>
            <div className={styles.thumb}>
              <img className={styles.image} src={photolinks[0]} alt="" />

              {messqty > 0 && <div className={styles.messqty}>{messqty}</div>}
            </div>
          </div>

          <div className={styles.roominfo_label}>
            <div className={styles.labelttl}>{room.title}</div>

            <div className={styles.labeltxt}>{lastMessage.message}</div>
          </div>
        </div>

        <div className={styles.dropmenu}>
          <Dropdown icon={icons.fold} items={dropMenuItems} />
        </div>
      </div>
    )
  );
};

const Contacts = ({
  icons,
  ownerID,
  rooms,
  roomsNewMsgs,
  roomsMsgs,
  contactsOpen,
  isDialogsOn,
  isChatLoading,
  curRoomID,
  handleSelected,
  handleChatOn,
  removeChatRoom,
}) => {
  return (
    <div className={styles.contacts} style={contactsOpen}>
      <div className={styles.contacts_header}>
        <div className={styles.title}>Мессенджер</div>

        <ButtonIcon icon={icons.cancel} handler={handleChatOn} />
      </div>

      <div className={styles.contacts_search}>
        <div className={styles.temp}></div>
      </div>

      <Scrollbars autoHide classes={{ view: styles.contacts_list }}>
        {isChatLoading && (
          <div className={styles.empty_contacts}>
            <Loading />
          </div>
        )}

        {!isChatLoading && rooms.length === 0 && (
          <div className={styles.empty_contacts}>Список пуст</div>
        )}

        {rooms.length > 0 &&
          rooms.map((room) => {
            const messages = roomsMsgs[room.roomID];
            const lastMessage = messages ? messages[messages.length - 1] : "";

            return (
              <ContactCard
                key={room.roomID}
                icons={icons}
                ownerID={ownerID}
                room={room}
                rooms={rooms.map((room) => room.roomID)}
                curRoomID={curRoomID}
                messqty={roomsNewMsgs[room.roomID]}
                lastMessage={lastMessage}
                isDialogsOn={isDialogsOn}
                handleSelected={handleSelected}
                removeChatRoom={removeChatRoom}
              />
            );
          })}
      </Scrollbars>
    </div>
  );
};

const Dialogs = ({
  icons,
  dialogsOpen,
  roomInfo,
  curRoomID,
  ownerID,
  messages,
  opponent,
  postMessage,
  getDialogOpponent,
  deselectRoom,
}) => {
  const ref = useRef(null);

  const opponentID = useCallback(() => {
    if (curRoomID)
      return ownerID === roomInfo.lotAuthorID
        ? roomInfo.offerAuthorID
        : roomInfo.lotAuthorID;
    return null;
  }, [curRoomID, ownerID, roomInfo]);

  useEffect(
    () => messages && ref.current.scrollToBottom(),
    [messages, curRoomID]
  );

  // useEffect(() => getDialogOpponent(opponentID()), [
  //   getDialogOpponent,
  //   opponentID,
  // ]);

  const Message = ({ message }) => {
    const messageClassN =
      message.authorID === ownerID
        ? `${styles.message} ${styles.message_owner}`
        : `${styles.message} ${styles.message_opponent}`;

    return <div className={messageClassN}>{message.message}</div>;
  };

  const onSubmit = (messData) => {
    const messMeta = {
      authorID: ownerID,
      postedAt: fb.database.ServerValue.TIMESTAMP,
    };

    postMessage(curRoomID, { ...messData, ...messMeta }, opponentID());
  };

  const resetNewMsgs = () => {
    db.ref(`users/${ownerID}/chats/${curRoomID}`).update({ newMessages: 0 });
  };

  return (
    <div className={styles.dialogs} style={dialogsOpen} onClick={resetNewMsgs}>
      <div className={styles.dialogs_header}>
        <Author
          authorID={opponent && opponent.opponentID}
          avatar={opponent && opponent.avatar}
          name={opponent && opponent.opponentName}
        />

        <ButtonIcon icon={icons.fold} handler={deselectRoom} />
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
  isChatLoading,
  isDialogsOn,
  curRoomID,
  rooms,
  roomsMsgs,
  roomsNewMsgs,
  opponent,
  selectRoom,
  deselectRoom,
  handleChatOn,
  postMessage,
  getDialogOpponent,
  removeChatRoom,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  const handleSelected = (roomID) => {
    curRoomID === roomID ? deselectRoom() : selectRoom(roomID);
  };

  const chatResize = () => {
    console.log(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", chatResize);
  }, []);

  return (
    <div className={styles.chat}>
      {rooms && (
        <Dialogs
          icons={icons}
          dialogsOpen={
            isDialogsOn
              ? { width: "calc(100vw - 416px)", maxWidth: "720px" }
              : { width: "0px" }
          }
          roomInfo={rooms.find((room) => room.roomID === curRoomID)}
          curRoomID={curRoomID}
          ownerID={ownerID}
          messages={roomsMsgs[curRoomID]}
          postMessage={postMessage}
          getDialogOpponent={getDialogOpponent}
          opponent={opponent}
          deselectRoom={deselectRoom}
        />
      )}

      <Contacts
        icons={icons}
        isDialogsOn={isDialogsOn}
        isChatLoading={isChatLoading}
        contactsOpen={isChatOn ? { width: "416px" } : { width: "0px" }}
        ownerID={ownerID}
        rooms={rooms ? rooms : []}
        roomsNewMsgs={roomsNewMsgs}
        roomsMsgs={roomsMsgs}
        curRoomID={curRoomID}
        handleSelected={handleSelected}
        handleChatOn={handleChatOn}
        removeChatRoom={removeChatRoom}
      />
    </div>
  );
};

const mstp = (state) => ({
  icons: state.ui.icons,
  ownerID: state.auth.ownerID,
  rooms: state.chat.rooms,
  curRoomID: state.chat.curRoomID,
  isChatOn: state.chat.isChatOn,
  isChatLoading: state.chat.isChatLoading,
  isDialogsOn: state.chat.isDialogsOn,
  roomsMsgs: state.chat.roomsMsgs,
  roomsNewMsgs: state.chat.roomsNewMsgs,
  opponent: state.chat.opponent,
});

const ChatCont = connect(mstp, {
  removeChatRoom,
  selectRoom,
  deselectRoom,
  handleChatOn,
  postMessage,
  // subscribeRoomsMsgs,
  getDialogOpponent,
})(Chat);

export default ChatCont;
