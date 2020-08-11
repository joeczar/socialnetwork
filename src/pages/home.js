import React, { useState, useEffect } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
////////  COMPONENTS  /////////////////////
import Logo from "../components/logo";
import Registration from "../components/register";
import Login from "../components/login";
import ResetPassword from "../components/resetPassword";
import style from "../css/home.module.css";

const Home = () => {
    const [showMenus, setShowMenus] = useState(false);
    const pathName = window.location.pathname;
    if (pathName === "/login" || pathName === "/reset") {
        setShowMenus(true);
    }
    const handleClick = () => {
        setShowMenus(!showMenus);
    };
    console.log("show menus", showMenus, "path", pathName);
    return (
        <div className={style.homeWrapper}>
            <Logo open={showMenus} />
            <div className={style.modal}>
                {!showMenus && (
                    <h1 className={style.welcome} onClick={handleClick}>
                        Zen Streak
                    </h1>
                )}
                {showMenus && (
                    <HashRouter>
                        <div className={style.home}>
                            <div className={style.container}>
                                <Route
                                    exact
                                    path="/"
                                    component={Registration}
                                />
                                <Route path="/login" component={Login} />
                                <Route
                                    path="/reset"
                                    component={ResetPassword}
                                />
                            </div>
                        </div>
                    </HashRouter>
                )}
            </div>
        </div>
    );
};
export default Home;
