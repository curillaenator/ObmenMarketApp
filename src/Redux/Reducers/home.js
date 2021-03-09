const SET_FORM_MODE = "home/SET_FORM_MODE";

const initialState = {
  isFormModeOn: false,
};

export const home = (state = initialState, action) => {
  switch (action.type) {
    case SET_FORM_MODE:
      return { ...state, isFormModeOn: !state.isFormModeOn };
    default:
      return state;
  }
};

// ACTIONs

export const setFormMode = () => ({ type: SET_FORM_MODE });

// THUNKs

