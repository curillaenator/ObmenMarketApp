import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { ui } from "./Reducers/ui";

const rootReducer = combineReducers({
  ui,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
