import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { ui } from "./Reducers/ui";
import { auth } from "./Reducers/auth";
import { user } from "./Reducers/user";

const rootReducer = combineReducers({
  ui,
  auth,
  user,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

window.store = store;
