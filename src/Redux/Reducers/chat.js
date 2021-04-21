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
      return {
        ...state,
        messages: { ...state.messages, [action.key]: action.messages },
      };

    default:
      return state;
  }
};

export const setIsChatOn = (payload) => ({ type: IS_CHAT_ON, payload });
export const setIsDialogsOn = (payload) => ({ type: IS_DIALOGS_ON, payload });
const setRooms = (payload) => ({ type: SET_ROOMS, payload });
const setRoomIDs = (payload) => ({ type: SET_ROOMS_IDS, payload });
const setCurRoom = (payload) => ({ type: SET_CUR_ROOM, payload });
const setRoomMessages = (data) => ({
  type: SET_ROOM_MESSAGES,
  key: data.key,
  messages: data.messages,
});

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
    photoPath: `posts/${lotMeta.uid}/${lotMeta.postid}`,
    lotDescription: lotMeta.description,
    offerDescription: offerMeta.description,
  };

  const user = {
    lotAuthorID: lotMeta.uid,
    offerAuthorID: offerMeta.authorID,
  };

  const userData = {};
  userData[`users/${lotMeta.uid}/chats/${roomID}`] = user;
  userData[`users/${offerMeta.authorID}/chats/${roomID}`] = user;

  const roomData = {};
  roomData[`chats/${roomID}`] = room;
  roomData[`messages/${roomID}`] = { roomID };

  await db_chat.ref().update(roomData, onUpd);
  await db.ref().update(userData, onUpd);
};

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

export const selectRoom = (roomData) => (dispatch, getState) => {
  const roomIDs = Object.keys(getState().chat.messages);

  dispatch(setIsDialogsOn(false));

  const handleSubscribe = async () => {
    dispatch(setCurRoom(roomData));

    await db_chat.ref(`messages/${roomData.roomID}`).on("value", (snap) => {
      if (snap.exists()) {
        dispatch(
          setRoomMessages({ key: roomData.roomID, messages: snap.val() })
        );
      }
    });

    dispatch(setIsDialogsOn(true));
  };

  const handleOpen = () => {
    dispatch(setCurRoom(roomData));
    dispatch(setIsDialogsOn(true));
  };

  roomIDs.includes(roomData.roomID) ? handleOpen() : handleSubscribe();
};

export const deselectRoom = () => (dispatch) => {
  dispatch(setCurRoom({ roomID: null, roomCnt: null }));
  dispatch(setIsDialogsOn(false));
};

export const closeChat = () => (dispatch) => {
  dispatch(setCurRoom({ roomID: null, roomCnt: null }));
  dispatch(setIsDialogsOn(false));
  dispatch(setIsChatOn(false));
};

export const postMessage = (roomID, message) => (dispatch) => {
  const newMessID = db_chat.ref(`messages/${roomID}`).push().key;

  const onSet = (error) =>
    error ? console.log(error) : console.log("success");

  db_chat.ref(`messages/${roomID}/${newMessID}`).set(message, onSet);
};

export const blabla = () => {};
