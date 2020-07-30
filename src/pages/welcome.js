import React from "react";
import { HashRouter, Route } from "react-router-dom";
////////  COMPONENTS  /////////////////////

import Registration from "../components/register";
import Login from "../components/login";

import ResetPassword from "../components/resetPassword";

const Welcome = () => {
    return (
        <HashRouter>
            <div className="welcomeWrapper">
                <h1>Welcome</h1>
                <Route exact path="/" component={Registration} />
                <Route path="/login" component={Login} />
                <Route path="/reset" component={ResetPassword} />
            </div>
        </HashRouter>
    );
};

export default Welcome;
