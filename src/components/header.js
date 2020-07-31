import React from "react";
import style from "../css/header.module.css";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className={style.header}>
            <h1>This is my header</h1>
            <div id="logInOut">
                <Logout />
            </div>
        </header>
    );
};

export default Header;
