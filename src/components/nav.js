import React from "react";
import { Link } from "react-router-dom";
import style from "../css/nav.module.css";
import { GrChatOption, GrSearch, GrGroup } from "react-icons/gr";
import { IconContext } from "react-icons";

const Nav = () => {
    return (
        <nav className={style.nav}>
            <Link to="/users">
                <div className={style.navGroup}>
                    <GrSearch size="30" />
                    <p>Search</p>
                </div>
            </Link>
            <Link to="/friends">
                <div className={style.navGroup}>
                    <GrGroup size="30" />
                    <p>Friends</p>
                </div>
            </Link>
            <Link to="/chat">
                <div className={style.navGroup}>
                    <GrChatOption size="30" />
                    <p>Chat</p>
                </div>
            </Link>
        </nav>
    );
};
export default Nav;
