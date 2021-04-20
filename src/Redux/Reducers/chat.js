import { db, db_chat } from "../../Utils/firebase";

const IS_CHAT_ON = "chat/IS_CHAT_ON";
const IS_DIALOGS_ON = "chat/IS_DIALOGS_ON";
const SET_ROOMS = "chat/SET_ROOMS";

const initialState = {
  isChatOn: false,
  isDialogsOn: false,
  rooms: null,
};

export const chat = (state = initialState, action) => {
  switch (action.type) {
    case IS_CHAT_ON:
      return { ...state, isChatOn: action.payload };

    case IS_DIALOGS_ON:
      return { ...state, isDialogsOn: action.payload };

    case SET_ROOMS:
      return { ...state, rooms: action.payload };

    default:
      return state;
  }
};

export const setIsChatOn = (payload) => ({ type: IS_CHAT_ON, payload });
export const setIsDialogsOn = (payload) => ({ type: IS_DIALOGS_ON, payload });
const setRooms = (payload) => ({ type: SET_ROOMS, payload });

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

export const updateRoomList = (ownerID) => (dispatch, getState) => {
  console.log(ownerID);

  // db.ref(`users/${ownerID}/chats`).on("child_added", (snap) =>
  //   console.log(snap.val())
  // );
};

export const getChatRoomList = (roomList) => (dispatch) => {
  const chatPromises = Object.keys(roomList).map((id) =>
    db_chat.ref(`chats/${id}`).once("value", (sn) => sn.val())
  );

  Promise.all(chatPromises).then((rooms) =>
    dispatch(setRooms(rooms.map((r) => r.val())))
  );
};

export const chatRoomSub = () => (dispatch) => {};
