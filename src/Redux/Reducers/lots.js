const SET_LOTS = "lots/SET_LOTS";

const initialState = {
  lots: [],
};

export const lots = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOTS:
      return { ...state, lots: action.lots };
    default:
      return state;
  }
};
