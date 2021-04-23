import { db, db_chat } from "../../Utils/firebase";
import { batch } from "react-redux";

const IS_CHAT_ON = "chat/IS_CHAT_ON";
const IS_DIALOGS_ON = "chat/IS_DIALOGS_ON";
const SET_ROOMS = "chat/SET_ROOMS";
const SET_CUR_ROOM_ID = "chat/SET_CUR_ROOM_ID";
const SET_ROOMS_MSGS = "chat/SET_ROOMS_MSGS";

const initialState = {
  isChatOn: false,
  isDialogsOn: false,
  rooms: null,
  curRoomID: null,
  roomsMsgs: {},
};

export const chat = (state = initialState, action) => {
  switch (action.type) {
    case IS_CHAT_ON:
      return { ...state, isChatOn: action.payload };

    case IS_DIALOGS_ON:
      return { ...state, isDialogsOn: action.payload };

    case SET_ROOMS:
      return { ...state, rooms: [...(state.rooms || []), action.room] };

    case SET_CUR_ROOM_ID:
      return { ...state, curRoomID: action.payload };

    case SET_ROOMS_MSGS:
      return {
        ...state,
        roomsMsgs: {
          ...state.roomsMsgs,
          [action.rID]: [...(state.roomsMsgs[action.rID] || []), action.mess],
        },
      };

    default:
      return state;
  }
};

// ACTIONS

export const setIsChatOn = (payload) => ({ type: IS_CHAT_ON, payload });
export const setIsDialogsOn = (payload) => ({ type: IS_DIALOGS_ON, payload });
export const setRooms = (room) => ({ type: SET_ROOMS, room });
const setCurRoomID = (payload) => ({ type: SET_CUR_ROOM_ID, payload });
// const setRoomMessages = (data) => ({ type: SET_ROOM_MESSAGES, data });

const setAllRooms = (rID, mess) => ({ type: SET_ROOMS_MSGS, rID, mess });

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

  console.log(roomID);

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

// room select/deselect & closeChat

export const selectRoom = (roomID) => (dispatch) => {
  batch(() => {
    dispatch(setCurRoomID(roomID));
    dispatch(setIsDialogsOn(true));
  });
};

export const deselectRoom = () => (dispatch) => {
  batch(() => {
    dispatch(setIsDialogsOn(false));
    dispatch(setCurRoomID(null));
  });
};

export const closeChat = () => async (dispatch) => {
  await deselectRoom();
  dispatch(setIsChatOn(false));
};

export const subscribeAllRooms = (ownerID) => (dispatch) => {
  db.ref(`users/${ownerID}/chats`).on("child_added", (roomID) => {
    //
    // set rooms' info for contact list
    db_chat.ref(`chats/${roomID.key}`).once("value", (roomInfo) => {
      dispatch(setRooms(roomInfo.val()));
    });

    // subscribe all rooms to get messages
    db_chat.ref(`messages/${roomID.key}`).on("child_added", (msgs) => {
      dispatch(setAllRooms(roomID.key, { ...msgs.val(), id: msgs.key }));
    });
  });
};

// post message

export const postMessage = (roomID, message) => (dispatch) => {
  const newMessID = db_chat.ref(`messages/${roomID}`).push().key;

  const onSet = (error) =>
    error ? console.log(error) : console.log("success");

  db_chat.ref(`messages/${roomID}/${newMessID}`).set(message, onSet);
};

