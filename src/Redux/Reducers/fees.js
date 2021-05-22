const SET_EXTENDPAY = "fees/SET_EXTENDPAY";

const initialState = {
  payOptions: [
    { name: "card", title: "Банковской картой" },
    { name: "applepay", title: "" },
    { name: "googlepay", title: "" },
  ],
  paySelected: "card",
};

export const fees = (state = initialState, action) => {
  switch (action.type) {
    case SET_EXTENDPAY:
      return { ...state, paySelected: action.payload };

    default:
      return state;
  }
};

// ACTIONS

export const setExtendPay = (payload) => ({ type: SET_EXTENDPAY, payload });

// THUNKS
