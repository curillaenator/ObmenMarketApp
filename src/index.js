import React, {useState} from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./Redux/store";
import { ObmenCont } from "./ObmenMarket/Obmen";
import { NProgress } from '@tanem/react-nprogress';
import Bar from './ObmenMarket/Components/Loading/Bar/Bar';
import Container from './ObmenMarket/Components/Loading/Container/Container';
import { postsRef } from "./Utils/firebase";
import "./index.scss";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  document.addEventListener("DOMContentLoaded", event => {
    postsRef
    .orderByChild("published")
    .equalTo(true)
    .once("value", (snapshot) => {
      setIsLoading(false);
    });
  });
  return (
    <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <NProgress isAnimating={isLoading}>
          {({ animationDuration, isFinished, progress }) => (
            <Container animationDuration={animationDuration} isFinished={isFinished}>
              <Bar animationDuration={animationDuration} progress={progress} />
            </Container>
          )}
        </NProgress>
        <ObmenCont/>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
  )
};
ReactDOM.render(
  <App />,
  document.getElementById("root")
);
