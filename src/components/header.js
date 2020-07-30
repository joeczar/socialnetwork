import React from "react";
import style from "../css/header.module.css";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "../helpers/axios";

const Header = () => {
    return (
        <header className={style.header}>
            <h1>This is my header</h1>
            <div id="logInOut">
                <Route path="/" component={Logout} />
            </div>
        </header>
    );
};

const Logout = () => {
    function handleLogout() {
        console.log("Logout");
        if (window.confirm("Are you sure you wish to delete this item?")) {
            axios.get("/logout").then((data) => {
                console.log(data);
            });
        }
    }

    return (
        <div className="logoutWrapper">
            <form>
                <button onClick={handleLogout}>Logout</button>
            </form>
        </div>
    );
};
export default Header;
