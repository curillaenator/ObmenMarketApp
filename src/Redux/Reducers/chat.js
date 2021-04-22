import { db, db_chat } from "../../Utils/firebase";
import { setUserChatsIDs } from "./auth";
import { batch } from "react-redux";

const IS_CHAT_ON = "chat/IS_CHAT_ON";
const IS_DIALOGS_ON = "chat/IS_DIALOGS_ON";
const SET_ROOMS = "chat/SET_ROOMS";
const SET_IS_ROOMS_IDS = "chat/SET_ROOMS_IDS";
const SET_CUR_ROOM_ID = "chat/SET_CUR_ROOM_ID";
const SET_ROOM_MESSAGES = "chat/SET_ROOM_MESSAGES";

const initialState = {
  isChatOn: false,
  isDialogsOn: false,
  isRoomIDs: false,
  rooms: null,
  curRoomID: null,
  messages: {},
};

export const chat = (state = initialState, action) => {
  switch (action.type) {
    case IS_CHAT_ON:
      return { ...state, isChatOn: action.payload };

    case IS_DIALOGS_ON:
      return { ...state, isDialogsOn: action.payload };

    case SET_ROOMS:
      return { ...state, rooms: action.payload };

    case SET_IS_ROOMS_IDS:
      return { ...state, isRoomIDs: action.payload };

    case SET_CUR_ROOM_ID:
      return { ...state, curRoomID: action.payload };

    case SET_ROOM_MESSAGES:
      return { ...state, messages: action.data };

    default:
      return state;
  }
};

// ACTIONS

export const setIsChatOn = (payload) => ({ type: IS_CHAT_ON, payload });
export const setIsDialogsOn = (payload) => ({ type: IS_DIALOGS_ON, payload });
export const setRooms = (payload) => ({ type: SET_ROOMS, payload });
export const setIsRoomIDs = (payload) => ({ type: SET_IS_ROOMS_IDS, payload });
const setCurRoomID = (payload) => ({ type: SET_CUR_ROOM_ID, payload });
export const setRoomMessages = (data) => ({ type: SET_ROOM_MESSAGES, data });

// THUNKS

export const setChatFromLotFull = () => (dispatch) => {
  dispatch(setIsChatOn(true));
  // dispatch(setIsDialogsOn(true));
};

// create/remove chatRoom & userChatData in DB

export const chatRoom = (lotMeta, offerMeta) => async (dispatch) => {
  const onUpd = (error) =>
    error ? console.log(error) : console.log("success");

  const roomID = await db_chat.ref().push().key;

  // console.log(roomID);

  // dispatch(setCurRoomID(roomID));

  const toUser = { title: `${lotMeta.title} на ${offerMeta.name}` };

  const userData = {};
  userData[`users/${lotMeta.uid}/chats/${roomID}`] = toUser;
  userData[`users/${offerMeta.authorID}/chats/${roomID}`] = toUser;

  const toRoom = {
    title: `${lotMeta.title} на ${offerMeta.name}`,
    lotAuthorID: lotMeta.uid,
    offerAuthorID: offerMeta.authorID,
    roomID: roomID,
    photoPath: `posts/${lotMeta.uid}/${lotMeta.postid}`,
    lotDescription: lotMeta.description,
    offerDescription: offerMeta.description,
  };

  const roomData = {};
  roomData[`chats/${roomID}`] = toRoom;

  await db_chat.ref().update(roomData, onUpd);
  await db.ref().update(userData, onUpd);
};

export const removeChatRoom = (roomID) => (dispatch) => {};

// get & update roomList

export const getChatRoomList = (roomList) => (dispatch) => {
  const roomKeys = roomList ? roomList : {};
  const chatPromises = Object.keys(roomKeys).map((id) =>
    db_chat.ref(`chats/${id}`).once("value", (sn) => sn.val())
  );

  Promise.all(chatPromises).then((rooms) =>
    dispatch(setRooms(rooms.map((room) => room.val())))
  );
};

export const updateRoomList = (ownerID) => (dispatch) => {
  db.ref(`users/${ownerID}/chats`).on("value", (snap) => {
    dispatch(setUserChatsIDs(snap.val()));
    dispatch(setIsRoomIDs(true));
  });
};

// selectRoom & closeChat unsubscribe helper

const handleUnsubscribe = async (dispatch, getState) => {
  const roomIDs = Object.keys(getState().chat.messages);
  const messagesInit = {};

  dispatch(setIsDialogsOn(false));

  await roomIDs.forEach((roomID) => db_chat.ref(`messages/${roomID}`).off());

  batch(() => {
    dispatch(setCurRoomID(null));
    dispatch(setRoomMessages(messagesInit));
  });
};

// selectRoom subscribe helper

const handleSubscribe = async (roomID, dispatch) => {
  dispatch(setCurRoomID(roomID));

  await db_chat.ref(`messages/${roomID}`).on("value", (snap) => {
    batch(() => {
      dispatch(setRoomMessages({ [roomID]: snap.val() }));
      dispatch(setIsDialogsOn(true));
    });
  });
};

// room select/deselect & closeChat

export const selectRoom = (roomID) => async (dispatch, getState) => {
  await handleUnsubscribe(dispatch, getState);
  await handleSubscribe(roomID, dispatch);
};

export const deselectRoom = (roomID) => async (dispatch) => {
  const messagesInit = {};

  await db_chat.ref(`messages/${roomID}`).off();

  batch(() => {
    dispatch(setIsDialogsOn(false));
    dispatch(setRoomMessages(messagesInit));
    dispatch(setCurRoomID(null));
  });
};

export const closeChat = () => async (dispatch, getState) => {
  await handleUnsubscribe(dispatch, getState);

  batch(() => {
    dispatch(setIsDialogsOn(false));
    dispatch(setIsChatOn(false));
  });
};

// post message

export const postMessage = (roomID, message) => (dispatch) => {
  const newMessID = db_chat.ref(`messages/${roomID}`).push().key;

  const onSet = (error) =>
    error ? console.log(error) : console.log("success");

  db_chat.ref(`messages/${roomID}/${newMessID}`).set(message, onSet);
};
