import { useEffect, useState, useRef, useCallback } from "react";
import { Form, Field } from "react-final-form";
import { connect } from "react-redux";
import styled from "styled-components";
import { Scrollbars } from "rc-scrollbars";
import { db, fst, fb } from "../../../Utils/firebase";

import {
  removeChatRoom,
  selectRoom,
  deselectRoom,
  handleChatOn,
  postMessage,
} from "../../../Redux/Reducers/chat";

import { ButtonIcon } from "../Button/ButtonIcon";
import { TextInput } from "../Inputs/Inputs";

import { colors } from "../../../Utils/palette";
import mask from "../../../Assets/Masks/commonBtn.svg";
import sendmess from "../../../Assets/Icons/message.svg";

const DialogHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  width: 100%;
  height: 120px;
  padding: 0 24px;
  background-color: #ffffffd8;
  transform: translateY(${({ curRoomID }) => (curRoomID ? "0%" : "-100%")});
  transition: 0.16s ease-in-out 0.16s;
  z-index: 820;

  .dialog_header_img {
    flex-shrink: 0;
    width: 56px;
    height: 56px;
    object-fit: cover;
    mask-image: url(${mask});
    mask-size: cover;
    mask-repeat: no-repeat;
  }

  .dialog_header_info {
    width: 100%;
    margin: 0 16px;

    .dialog_header_label {
      font-weight: 700;
      font-size: 16px;
      line-height: 20px;
      letter-spacing: -0.16px;
      color: #3d3158;
    }

    .dialog_header_user {
      display: flex;
      align-items: center;

      & > svg {
        margin-right: 8px;
      }

      .dialog_header_username {
        font-weight: 500;
        font-size: 12px;
        line-height: 16px;
        display: flex;
        align-items: center;
        color: #160242;
      }
    }
  }
`;

const ContactCard = styled.div`
  .card_header {
    display: flex;

    .card_header_info {
      display: flex;
      align-items: center;
      // width: calc(100% - 74px);
      width: 100%;
      height: 112px;
      cursor: pointer;
      transition: 0.08s linear;

      .card_header_image {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
        width: 112px;
        height: 100%;

        .card_header_thumb {
          position: relative;
          width: 64px;
          height: 64px;

          .card_header_pic {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            object-fit: cover;
            will-change: filter;
            filter: drop-shadow(0 12px 16px $primary2IdleShadow);
          }

          .card_header_newmsgs {
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            top: -3px;
            right: -3px;
            width: 28px;
            height: 28px;
            font-size: 12px;
            font-weight: 700;
            color: ${colors.fontWhite};
            border: 3px solid ${colors.chatbox};
            border-radius: 50%;
            background-color: ${colors.fontNotification};
          }
        }
      }

      .card_header_labels {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        height: 112px;
        overflow: hidden;
        border-bottom: 1px solid ${colors.spacer};

        .card_header_title {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          font-size: 16px;
          font-weight: 700;
          letter-spacing: -0.16px;
          color: ${colors.chatfont1};
          margin-bottom: 4px;
        }

        .card_header_sub {
          width: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-weight: 500;
          font-size: 13px;
          letter-spacing: -0.08px;
          color: ${colors.chatfont2};
        }
      }
    }
  }
`;

const ContactsList = styled.div`
  width: 100%;
  height: 100%;
  transform: translateX(${({ curRoomID }) => (curRoomID ? "100%" : "0%")});
  transition: 0.16s ease-in-out;

  .chat_header {
    width: 100%;
    padding: 0 24px;

    .chat_header_row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 120px;

      .chat_header_title {
        font-weight: 800;
        font-size: 32px;
        letter-spacing: -0.32px;
        user-select: none;
      }
    }

    .chat_header_search {
      height: 64px;
      background-color: ${colors.chatbox};

      .chat_search_temp {
        width: 100%;
        height: 48px;
        background-color: #fff;
        border-radius: 24px;
      }
    }
  }

  .chat_body {
    height: calc(100vh - 184px);
  }
`;

const Message = styled.div`
  display: flex;
  justify-content: center;
  align-self: ${({ isAuthor }) => (isAuthor ? "flex-end " : "flex-start")};
  width: fit-content;
  max-width: 80%;
  height: auto;
  margin-bottom: 24px;
  padding: 18px 24px;
  line-height: 20px;
  border-radius: 16px;
  background-color: ${({ isAuthor }) =>
    isAuthor ? colors.ownermessage : colors.opponentmessage};
  color: ${({ isAuthor }) => (isAuthor ? colors.fontWhite : colors.fontTitle)};
`;

const Dialog = styled.div`
  position: absolute;
  width: 100vw;
  height: calc(100vh - 104px);
  background-color: ${colors.dialogs};
  transform: translateX(${({ curRoomID }) => (curRoomID ? "0%" : "-100%")});
  transition: 0.16s ease-in-out;

  .dialog_scroll {
    display: flex;
    flex-direction: column;
    padding: 24px;
  }
`;

const NewMessage = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: 104px;
  padding: 0 32px;
  background-color: #f3f2f5;
  transform: translateY(${({ curRoomID }) => (curRoomID ? "0%" : "100%")});
  transition: 0.16s ease-in-out 0.16s;
  z-index: 820;

  .new_message {
    width: 100%;
    position: relative;

    .send_message {
      position: absolute;
      top: 50%;
      right: 16px;
      border: 0;
      background-color: transparent;
      outline: none;
      transition: 0.08s linear;
      cursor: pointer;
      transform: translateY(-50%);

      &:hover {
        transform: translateY(-50%) scale(1.15);
      }

      &:active {
        transform: translateY(-50%) scale(1);
      }
    }
  }
`;

const ChatMobileStyled = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: ${({ isChatOn }) => (isChatOn ? "100vw" : "0vw")};
  height: 100vh;
  background-color: ${colors.chatbox};
  transition: width 0.16s ease-in-out;
  overflow: hidden;
  z-index: 800;
`;

export const ChatMobile = ({
  icons,
  ownerID,
  rooms,
  curRoomID,
  isChatOn,
  isChatLoading,
  isDialogsOn,
  roomsMsgs,
  roomsNewMsgs,
  // methods
  handleChatOn,
  removeChatRoom,
  selectRoom,
  deselectRoom,
  postMessage,
  // subscribeRoomsMsgs,
}) => {
  const ref = useRef(null);
  const [roomsFull, setRoomsFull] = useState([]);
  const [messages, setMessages] = useState([]);

  const curRoom = curRoomID && roomsFull.find((r) => r.roomID === curRoomID);

  const opponentID = useCallback(
    (room) => {
      if (room.lotAuthorID === ownerID) return room.offerAuthorID;
      if (room.offerAuthorID === ownerID) return room.lotAuthorID;
    },
    [ownerID]
  );

  useEffect(() => {
    if (!curRoomID) return setMessages([]);

    if (curRoomID && !roomsMsgs[curRoomID]) {
      return setMessages([]);
    }

    if (curRoomID && roomsMsgs[curRoomID]) {
      return setMessages(roomsMsgs[curRoomID]);
    }
  }, [curRoomID, roomsMsgs]);

  useEffect(() => {
    const roomsPromise = (rooms || []).map(async (room) => {
      const photoPromise = await fst
        .ref(room.photoPath)
        .listAll()
        .then((res) => res.items.map((item) => item.getDownloadURL()));

      const photoURLs = await Promise.all(photoPromise);

      const opponentPromise = new Promise((resolve) => {
        db.ref(`users/${opponentID(room)}`).once("value", (oppMeta) => {
          resolve(oppMeta.val());
        });
      });

      const opponent = await Promise.resolve(opponentPromise);

      return { ...room, photoURLs, opponent };
    });

    Promise.all(roomsPromise).then((newRooms) => setRoomsFull(newRooms));
  }, [rooms, ownerID, opponentID]);

  useEffect(() => messages && ref.current.scrollToBottom(), [messages]);

  const onSubmit = (messData) => {
    const messMeta = {
      authorID: ownerID,
      postedAt: fb.database.ServerValue.TIMESTAMP,
    };

    postMessage(curRoomID, { ...messData, ...messMeta }, opponentID(curRoom));
  };

  return (
    <ChatMobileStyled isChatOn={isChatOn}>
      <DialogHeader curRoomID={curRoomID}>
        <img
          className="dialog_header_img"
          src={curRoom && curRoom.photoURLs[0]}
          alt=""
        />

        <div className="dialog_header_info">
          <div className="dialog_header_label">{curRoom && curRoom.title}</div>

          <div className="dialog_header_user">
            {curRoom && curRoom.opponent.isOnline && icons.online}

            <div className="dialog_header_username">
              {curRoom && curRoom.opponent.username}
            </div>
          </div>
        </div>

        <ButtonIcon icon={icons.fold} handler={deselectRoom} />
      </DialogHeader>

      <Dialog curRoomID={curRoomID}>
        <Scrollbars ref={ref} autoHide classes={{ view: "dialog_scroll" }}>
          {messages.map((message) => (
            <Message
              key={message.postedAt}
              isAuthor={message.authorID === ownerID}
            >
              {message.message}
            </Message>
          ))}
        </Scrollbars>
      </Dialog>

      <ContactsList curRoomID={curRoomID}>
        <div className="chat_header">
          <div className="chat_header_row">
            <div className="chat_header_title">Мессенджер</div>
            <ButtonIcon icon={icons.cancel} handler={handleChatOn} />
          </div>

          <div className="chat_header_search">
            <div className="chat_search_temp"></div>
          </div>
        </div>

        <Scrollbars autoHide classes={{ view: "chat_body" }}>
          {rooms &&
            roomsFull.length > 0 &&
            roomsFull.map((room) => {
              const messages = roomsMsgs[room.roomID];
              const lastMessage = messages ? messages[messages.length - 1] : "";

              return (
                <ContactCard
                  key={room.roomID}
                  selected={curRoomID === room.roomID}
                >
                  <div className="card_header">
                    <div
                      className="card_header_info"
                      onClick={() =>
                        curRoomID === room.roomID
                          ? deselectRoom()
                          : selectRoom(room.roomID)
                      }
                    >
                      <div className="card_header_image">
                        <div className="card_header_thumb">
                          <img
                            className="card_header_pic"
                            src={room.photoURLs[0]}
                            alt=""
                          />

                          {roomsNewMsgs[room.roomID] > 0 && (
                            <div className="card_header_newmsgs">
                              {roomsNewMsgs[room.roomID]}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="card_header_labels">
                        <div className="card_header_title">{room.title}</div>

                        <div className="card_header_sub">
                          {lastMessage.message}
                        </div>
                      </div>
                    </div>
                  </div>
                </ContactCard>
              );
            })}
        </Scrollbars>
      </ContactsList>

      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, form }) => {
          const handleSendMessage = (e) => {
            e.preventDefault();
            form.submit();
            form.reset();
          };

          return (
            <NewMessage onSubmit={handleSubmit} curRoomID={curRoomID}>
              <div className="new_message">
                <Field
                  name="message"
                  placeholder="Текст сообщения"
                  classN="message"
                  component={TextInput}
                />

                <button className="send_message" onClick={handleSendMessage}>
                  <img src={sendmess} alt="Send" />
                </button>
              </div>
            </NewMessage>
          );
        }}
      />
    </ChatMobileStyled>
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
});

export const ChatMobileCont = connect(mstp, {
  removeChatRoom,
  selectRoom,
  deselectRoom,
  handleChatOn,
  postMessage,
  // subscribeRoomsMsgs,
})(ChatMobile);
