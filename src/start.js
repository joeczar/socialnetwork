import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./pages/welcome";
import Home from "./pages/home";
import App from "./app";
import "./css/style.css";
let elem;

let isLoggedIn = location.pathname !== "/welcome";
// let isLoggedIn = true;
if (isLoggedIn) {
    elem = <App />;
} else {
    elem = <Welcome />;
}

ReactDOM.render(elem, document.querySelector("main"));
