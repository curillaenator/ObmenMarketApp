import { db, db_chat } from "../../Utils/firebase";
import { setUserChatsIDs } from "./auth";

const IS_CHAT_ON = "chat/IS_CHAT_ON";
const IS_DIALOGS_ON = "chat/IS_DIALOGS_ON";
const SET_ROOMS = "chat/SET_ROOMS";
const SET_ROOMS_IDS = "chat/SET_ROOMS_IDS";
const SET_CUR_ROOM = "chat/SET_CUR_ROOM";
const SET_ROOM_MESSAGES = "chat/SET_ROOM_MESSAGES";

const initialState = {
  isChatOn: false,
  isDialogsOn: false,
  isRoomIDs: false,
  rooms: null,
  curRoom: { roomID: null, roomCnt: null },
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

    case SET_ROOMS_IDS:
      return { ...state, isRoomIDs: action.payload };

    case SET_CUR_ROOM:
      return { ...state, curRoom: action.payload };

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
const setRoomIDs = (payload) => ({ type: SET_ROOMS_IDS, payload });
const setCurRoom = (payload) => ({ type: SET_CUR_ROOM, payload });
export const setRoomMessages = (data) => ({ type: SET_ROOM_MESSAGES, data });

// THUNKS

export const setChatFromLotFull = () => (dispatch) => {
  dispatch(setIsChatOn(true));
  // dispatch(setIsDialogsOn(true));
};

// create chatRoom & userChatData in DB

export const chatRoom = (lotMeta, offerMeta) => async (dispatch) => {
  const onUpd = (error) =>
    error ? console.log(error) : console.log("success");

  const roomID = await db_chat.ref().push().key;

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
    dispatch(setRoomIDs(true));
  });
};

// selectRoom & closeChat unsubscribe helper

const handleUnsubscribe = async (dispatch, getState) => {
  const roomIDs = Object.keys(getState().chat.messages);
  const curRoomInit = { roomID: null, roomCnt: null };

  dispatch(setIsDialogsOn(false));

  await roomIDs.forEach((roomID) => db_chat.ref(`messages/${roomID}`).off());

  dispatch(setCurRoom(curRoomInit));
  dispatch(setRoomMessages({}));
};

// selectRoom subscribe helper

const handleSubscribe = async (roomData, dispatch) => {
  dispatch(setCurRoom(roomData));

  await db_chat.ref(`messages/${roomData.roomID}`).on("value", (snap) => {
    dispatch(setRoomMessages({ [roomData.roomID]: snap.val() }));
  });

  dispatch(setIsDialogsOn(true));
};

// room select/deselect & closeChat

export const selectRoom = (roomData) => async (dispatch, getState) => {
  await handleUnsubscribe(dispatch, getState);
  await handleSubscribe(roomData, dispatch);
};

export const deselectRoom = (roomData) => async (dispatch) => {
  const curRoomInit = { roomID: null, roomCnt: null };
  await db_chat.ref(`messages/${roomData.roomID}`).off();
  dispatch(setCurRoom(curRoomInit));
  dispatch(setIsDialogsOn(false));
};

export const closeChat = () => async (dispatch, getState) => {
  await handleUnsubscribe(dispatch, getState);
  dispatch(setIsDialogsOn(false));
  dispatch(setIsChatOn(false));
};

// post message

export const postMessage = (roomID, message) => (dispatch) => {
  const newMessID = db_chat.ref(`messages/${roomID}`).push().key;

  const onSet = (error) =>
    error ? console.log(error) : console.log("success");

  db_chat.ref(`messages/${roomID}/${newMessID}`).set(message, onSet);
};
