import avatar from "../../Assets/Images/ava.jpg";
const DUMMY = "user/DUMMY";

const initialState = {
  name: "Кирилл Арт",
  avatar: avatar,
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case DUMMY:
      return { ...state };
    default:
      return state;
  }
};
