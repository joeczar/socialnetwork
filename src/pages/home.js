import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
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
        <>
            <Logo open={showMenus} />
            <h1 onClick={handleClick}>Welcome</h1>
            {showMenus && (
                <BrowserRouter>
                    <div className={style.home}>
                        <h1 onClick={handleClick}>Welcome</h1>
                        <Route exact path="/" component={Registration} />
                        <Route path="/login" component={Login} />
                        <Route path="/reset" component={ResetPassword} />
                    </div>
                </BrowserRouter>
            )}
        </>
    );
};
export default Home;
