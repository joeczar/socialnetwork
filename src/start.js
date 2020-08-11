import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import reducer from "./helpers/reducer";

import Welcome from "./pages/welcome";
import App from "./app";
import Home from "./pages/home";

import "./css/style.css";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

let elem;
let isLoggedIn = location.pathname !== "/welcome";
// let isLoggedIn = true;
if (isLoggedIn) {
    elem = (
        <Provider store={store}>
            <App />
        </Provider>
    );
} else {
    elem = <Home />; //; <Welcome />
}

ReactDOM.render(elem, document.getElementById("root"));
