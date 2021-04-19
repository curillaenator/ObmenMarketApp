import { db_chat } from "../../Utils/firebase";

const IS_CHAT_ON = "chat/IS_CHAT_ON";
const IS_DIALOGS_ON = "chat/IS_DIALOGS_ON";

const initialState = {
  isChatOn: false,
  isDialogsOn: false,
};

export const chat = (state = initialState, action) => {
  switch (action.type) {
    case IS_CHAT_ON:
      return { ...state, isChatOn: action.payload };

    case IS_DIALOGS_ON:
      return { ...state, isDialogsOn: action.payload };

    default:
      return state;
  }
};

export const setIsChatOn = (payload) => ({ type: IS_CHAT_ON, payload });
export const setIsDialogsOn = (payload) => ({ type: IS_DIALOGS_ON, payload });

export const setChatFromLotFull = () => (dispatch) => {
  dispatch(setIsChatOn(true));
  dispatch(setIsDialogsOn(true));
};

export const createNewChatRoom = (lotMeta, offerMeta) => (dispatch) => {
  const createRoom = () => {
    const onSet = (error) => {
      if (error) return console.log("db error");
      console.log("room set");
    };

    const newRoom = {
      lotID: lotMeta.postid,
      offerID: offerMeta.offerID,
      lotAuthor: lotMeta.uid,
      offerAuthor: offerMeta.authorID,
      confirmed: false,
    };

    db_chat.ref(`${lotMeta.uid}/${offerMeta.offerID}`).set(newRoom, onSet);
  };

  db_chat.ref(`${lotMeta.uid}/${offerMeta.offerID}`).once("value", (snap) => {
    !snap.exists() ? createRoom() : console.log("exists");
  });
};

// export const enterChatRoom = (lotMeta, offerMeta) => (dispatch) => {
//   db_chat.ref(`${lotMeta}/`)
// }
