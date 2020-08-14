import React from "react";
import { Link } from "react-router-dom";
import style from "../css/header.module.css";
import Logo from "./logo";
import Logout from "./logout";
import ProfilePic from "./profilePic";
import Nav from "./nav";
// import { Route } from "react-router-dom";
// import { Link } from "react-router-dom";

const Header = (props) => {
    console.log("header props", props);
    return (
        <header className={style.header}>
            <div className={style.logoWrapper}>
                <Link to="/">
                    <Logo />
                    <h1 className={style.zs}>ZS</h1>
                </Link>
            </div>
            <div className={style.spacer}>
                <Nav />
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
