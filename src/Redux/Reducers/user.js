const SET_USER = "user/SET_USER";

const initialState = {
  user: null,
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.userData };
    default:
      return state;
  }
};

// ACTIONs

export const setUser = (userData) => ({ type: SET_USER, userData });

// THUNKs

