import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import Obmen from "./ObmenMarket/Obmen";

import "./index.scss";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Obmen />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
