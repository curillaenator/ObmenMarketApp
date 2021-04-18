import { db_chat } from "../../Utils/firebase";

const IS_CHAT_ON = "chat/IS_CHAT_ON";
const IS_DIALOGS_ON = "chat/IS_DIALOGS_ON";

const initialState = {
  isChatOn: true,
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
};

export const createNewChatRoom = (lotID, offerID, lotAuthor, offerAuthor) => {
  // db_chat.child(lotID).push().key;
  const createRoom = () => {
    console.log("create");
    const newRoom = {
      lotID,
      offerID,
      lotAuthor,
      offerAuthor,
    };
    db_chat.ref().child(lotID).set(newRoom);
  };

  db_chat.ref(lotID).once("value", (snap) => {
    !snap.exists() && createRoom();
    snap.exists() && console.log("exists");
  });
};
