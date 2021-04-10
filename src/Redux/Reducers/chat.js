import { db_chat, db_offers } from "../../Utils/firebase";

const initialState = {};

export const chat = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
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
