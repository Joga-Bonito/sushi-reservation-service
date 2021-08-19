import React from "react";
import reactDom from "react-dom";
import App from "./App";
import "./styles/style.css";
import { BrowserRouter } from "react-router-dom";

import Reducer from "./_reducers";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise";
import ReduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

reactDom.render(
  <Provider
    store={createStore(
      Reducer,
      composeWithDevTools(applyMiddleware(promiseMiddleware, ReduxThunk))
    )}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
