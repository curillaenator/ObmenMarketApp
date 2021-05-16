import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./Redux/store";
import { ToastContainer } from "react-toastify";
import ScrollMemory from "react-router-scroll-memory";

import { ObmenMarketApp } from "./ObmenMarket/Obmen";

import "react-toastify/dist/ReactToastify.css";
import "./toastsAnimation.scss";
import "./index.scss";

const App = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <ScrollMemory />
          <ObmenMarketApp />
          <ToastContainer
            hideProgressBar={true}
            // limit={3}
            closeButton={false}
            // newestOnTop={true}
            closeOnClick={false}
            // autoClose={false}
            position="bottom-right"
          />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));
