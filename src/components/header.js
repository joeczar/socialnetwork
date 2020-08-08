import React from "react";
import style from "../css/header.module.css";
import Logo from "./logo";
import Logout from "./logout";
import ProfilePic from "./profilePic";
// import { Route } from "react-router-dom";
// import { Link } from "react-router-dom";

const Header = (props) => {
    console.log("header props", props);
    return (
        <header className={style.header}>
            <div className={style.logoWrapper}>
                <Logo />
                <h1>ZS</h1>
            </div>
            <div className={style.title}>
                <h1>Zen Streak</h1>
                <p>Mindful Goal Tracking</p>
            </div>
            <div className={style.profilePicWrapper}>
                <ProfilePic
                    name={props.name}
                    url={props.url}
                    toggleUpload={props.toggleUpload}
                    size="small"
                />
                <div className={style.logOut} id="logInOut">
                    <Logout />
                </div>
            </div>
        </header>
    );
};

export default Header;
