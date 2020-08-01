import React from "react";
import style from "../css/header.module.css";
import Logo from "./logo";
import Logout from "./logout";
import ProfilePic from "./profilePic";
// import { Route } from "react-router-dom";
// import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className={style.header}>
            <Logo />
            <h1>This is my header</h1>
            <ProfilePic name={{ first: "Joe", last: "Czar" }} />
            <div id="logInOut">
                <Logout />
            </div>
        </header>
    );
};

export default Header;
