const SET_FORM_MODE = "home/SET_FORM_MODE";

const initialState = {
  isFormModeOn: false,
};

export const home = (state = initialState, action) => {
  switch (action.type) {
    case SET_FORM_MODE:
      return { ...state, isFormModeOn: action.mode };
    default:
      return state;
  }
};

// ACTIONs

export const setFormMode = (mode) => ({ type: SET_FORM_MODE, mode });

// THUNKs
