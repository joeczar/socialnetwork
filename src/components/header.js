import React from "react";
import style from "../css/header.module.css";
import { HashRouter, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "../helpers/axios";

const Header = () => {
    return (
        <header className={style.header}>
            <h1>This is my header</h1>
            <div id="logInOut">
                <HashRouter>
                    <Route path="/" component={Logout} />
                </HashRouter>
            </div>
        </header>
    );
};

const Logout = () => {
    function handleLogout() {
        console.log("Logout");
        if (window.confirm("Are you sure you wish to delete this item?")) {
            axios.post("/logout").then((data) => {
                console.log(data);
            });
        }
    }

    return (
        <div className="logoutWrapper">
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};
export default Header;
