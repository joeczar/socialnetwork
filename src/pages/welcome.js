import React from "react";
import { HashRouter, Route } from "react-router-dom";
////////  COMPONENTS  /////////////////////
import Layout from "../layouts/layout";
import Registration from "../components/register";
import Login from "../components/login";
import ResetPassword from "../components/resetPassword";

const Welcome = () => {
    return (
        <Layout>
            <div className="welcomeWrapper">
                <h1>Welcome</h1>
                <HashRouter>
                    <Route path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                    <Route path="/reset" component={ResetPassword} />
                </HashRouter>
            </div>
        </Layout>
    );
};

export default Welcome;
