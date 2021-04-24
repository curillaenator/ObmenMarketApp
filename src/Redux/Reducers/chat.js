import { db, db_chat } from "../../Utils/firebase";
import { batch } from "react-redux";

const IS_CHAT_ON = "chat/IS_CHAT_ON";
const IS_DIALOGS_ON = "chat/IS_DIALOGS_ON";
const SET_CUR_ROOM_ID = "chat/SET_CUR_ROOM_ID";
const SET_ROOMS = "chat/SET_ROOMS";
const RESET_ROOMS = "chat/RESET_ROOMS";
const SET_ROOMS_MSGS = "chat/SET_ROOMS_MSGS";
const RESET_ROOMS_MSGS = "chat/RESET_ROOMS_MSGS";
const SET_ROOMS_NEW_MSGS = "chat/SET_ROOMS_NEW_MSGS";

const initialState = {
  isChatOn: false,
  isDialogsOn: false,
  rooms: null,
  curRoomID: null,
  roomsMsgs: {},
  roomsNewMsgs: {},
};

export const chat = (state = initialState, action) => {
  switch (action.type) {
    case IS_CHAT_ON:
      return { ...state, isChatOn: action.payload };

    case IS_DIALOGS_ON:
      return { ...state, isDialogsOn: action.payload };

    case SET_CUR_ROOM_ID:
      return { ...state, curRoomID: action.roomID };

    case SET_ROOMS:
      return { ...state, rooms: [...(state.rooms || []), action.room] };

    case RESET_ROOMS:
      return { ...state, rooms: null };

    case SET_ROOMS_MSGS:
      return {
        ...state,
        roomsMsgs: {
          ...state.roomsMsgs,
          [action.rID]: [...(state.roomsMsgs[action.rID] || []), action.mess],
        },
      };

    case RESET_ROOMS_MSGS:
      return { ...state, roomsMsgs: {} };

    case SET_ROOMS_NEW_MSGS:
      return {
        ...state,
        roomsNewMsgs: { ...state.roomsNewMsgs, ...action.newMsgs },
      };

    default:
      return state;
  }
};

// ACTIONS

export const setIsChatOn = (payload) => ({ type: IS_CHAT_ON, payload });
export const setIsDialogsOn = (payload) => ({ type: IS_DIALOGS_ON, payload });
const setCurRoomID = (roomID) => ({ type: SET_CUR_ROOM_ID, roomID });
const setRooms = (room) => ({ type: SET_ROOMS, room });
const resetRooms = () => ({ type: RESET_ROOMS });
const setRoomsMsgs = (rID, mess) => ({ type: SET_ROOMS_MSGS, rID, mess });
const resetRoomsMsgs = () => ({ type: RESET_ROOMS_MSGS });
const setRoomsNewMsgs = (newMsgs) => ({ type: SET_ROOMS_NEW_MSGS, newMsgs });

// THUNKS

export const setChatFromLotFull = () => (dispatch) => {
  dispatch(setIsChatOn(true));
  // dispatch(setIsDialogsOn(true));
};

//  chat full reset

export const chatReset = () => (dispatch) => {
  batch(() => {
    dispatch(setCurRoomID(null));
    dispatch(resetRoomsMsgs());
    dispatch(resetRooms());
    dispatch(setIsDialogsOn(false));
    dispatch(setIsChatOn(false));
  });
};

// create chatRoom & userChatData in DB (TODO: remove chatRoom)

export const chatRoom = (lotMeta, offerMeta) => async (dispatch) => {
  const onUpd = (error) =>
    error ? console.log(error) : console.log("success");

  const roomID = await db_chat.ref().push().key;

  const userData = {};
  userData[`users/${lotMeta.uid}/chats/${roomID}`] = { newMessages: 0 };
  userData[`users/${offerMeta.authorID}/chats/${roomID}`] = { newMessages: 0 };

  const toRoom = {
    title: `${lotMeta.title} на ${offerMeta.name}`,
    lotAuthorID: lotMeta.uid,
    offerAuthorID: offerMeta.authorID,
    roomID: roomID,
    photoPath: `posts/${lotMeta.uid}/${lotMeta.postid}`,
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

export const closeChat = () => (dispatch) => {
  batch(() => {
    dispatch(deselectRoom());
    dispatch(setIsChatOn(false));
  });
};

// rooms & messages subscribtion

export const subscribeRoomsMsgs = (ownerID) => (dispatch) => {
  db.ref(`users/${ownerID}/chats`).on("child_added", async (roomID) => {
    //
    // set rooms' info for contact list
    await db_chat.ref(`chats/${roomID.key}`).once("value", (roomInfo) => {
      dispatch(setRooms(roomInfo.val()));
    });

    await dispatch(setRoomsNewMsgs({ [roomID.key]: roomID.val().newMessages }));

    // subscribe room last opened
    db.ref(`users/${ownerID}/chats/${roomID.key}`).on(
      "child_changed",
      (changed) => dispatch(setRoomsNewMsgs({ [roomID.key]: changed.val() }))
    );

    // subscribe all rooms to get messages
    db_chat.ref(`messages/${roomID.key}`).on("child_added", (msg) => {
      dispatch(setRoomsMsgs(roomID.key, { ...msg.val(), id: msg.key }));
    });
  });
};

// post message

export const postMessage = (roomID, message, ownerID, roomInfo) => async (
  dispatch
) => {
  console.log(message);

  const onSet = (error) =>
    error ? console.log(error) : console.log("success");

  const userID =
    ownerID === roomInfo.lotAuthorID
      ? roomInfo.offerAuthorID
      : roomInfo.lotAuthorID;

  const newMessID = await db_chat.ref(`messages/${roomID}`).push().key;

  if (message.message) {
    await db_chat.ref(`messages/${roomID}/${newMessID}`).set(message, onSet);

    const userRoomRef = await db.ref(`users/${userID}/chats/${roomID}`);
    userRoomRef
      .once("value", (snap) => snap)
      .then((snap) => {
        userRoomRef.update({ newMessages: snap.val().newMessages + 1 }, onSet);
      });
  }
};
