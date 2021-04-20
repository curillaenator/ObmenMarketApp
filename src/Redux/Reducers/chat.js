import { db, db_chat } from "../../Utils/firebase";
import { setUserChatsIDs } from "./auth";

const IS_CHAT_ON = "chat/IS_CHAT_ON";
const IS_DIALOGS_ON = "chat/IS_DIALOGS_ON";
const SET_ROOMS = "chat/SET_ROOMS";
const SET_ROOMS_IDS = "chat/SET_ROOMS_CNT";

const initialState = {
  isChatOn: false,
  isDialogsOn: false,
  isRoomIDs: false,
  rooms: null,
  // roomsCnt: 0,
};

export const chat = (state = initialState, action) => {
  switch (action.type) {
    case IS_CHAT_ON:
      return { ...state, isChatOn: action.payload };

    case IS_DIALOGS_ON:
      return { ...state, isDialogsOn: action.payload };

    case SET_ROOMS:
      return { ...state, rooms: action.payload };

    case SET_ROOMS_IDS:
      return { ...state, isRoomIDs: action.payload };

    default:
      return state;
  }
};

export const setIsChatOn = (payload) => ({ type: IS_CHAT_ON, payload });
export const setIsDialogsOn = (payload) => ({ type: IS_DIALOGS_ON, payload });
const setRooms = (payload) => ({ type: SET_ROOMS, payload });
const setRoomIDs = (payload) => ({ type: SET_ROOMS_IDS, payload });

export const setChatFromLotFull = () => (dispatch) => {
  dispatch(setIsChatOn(true));
  dispatch(setIsDialogsOn(true));
};

export const chatRoom = (lotMeta, offerMeta) => async (dispatch) => {
  const onUpd = (error) =>
    error ? console.log(error) : console.log("success");

  const roomID = await db_chat.ref().push().key;

  const room = {
    title: `${lotMeta.title} на ${offerMeta.name}`,
    lotAuthorID: lotMeta.uid,
    offerAuthorID: offerMeta.authorID,
    roomID: roomID,
    photoPath: `${lotMeta.uid}/${lotMeta.postid}/photo0`,
    lotDescription: lotMeta.description,
    offerDescription: offerMeta.description,
  };

  const user = {
    lotAuthorID: lotMeta.uid,
    offerAuthorID: offerMeta.authorID,
  };

  const chatRoom = {};
  chatRoom[`users/${lotMeta.uid}/chats/${roomID}`] = user;
  chatRoom[`users/${offerMeta.authorID}/chats/${roomID}`] = user;

  await db_chat.ref(`chats/${roomID}`).update(room, onUpd);
  await db.ref().update(chatRoom, onUpd);
};

export const updateRoomList = (ownerID) => (dispatch) => {
  db.ref(`users/${ownerID}/chats`).on("value", (snap) => {
    dispatch(setUserChatsIDs(snap.val()));
    dispatch(setRoomIDs(true));
  });
};

export const getChatRoomList = (roomList) => (dispatch) => {
  const roomKeys = roomList ? roomList : {};
  const chatPromises = Object.keys(roomKeys).map((id) =>
    db_chat.ref(`chats/${id}`).once("value", (sn) => sn.val())
  );

  Promise.all(chatPromises).then((rooms) =>
    dispatch(setRooms(rooms.map((r) => r.val())))
  );
};

export const chatRoomSub = () => (dispatch) => {};
