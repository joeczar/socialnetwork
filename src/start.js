import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./pages/welcome";
import Home from "./pages/home";
import "./css/style.css";
let elem;

let isLoggedIn = true;

if (isLoggedIn) {
    elem = <Home />;
} else {
    elem = <Welcome />;
}

ReactDOM.render(elem, document.querySelector("main"));
