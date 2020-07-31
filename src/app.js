import React, { Component } from "react";
import axios from "axios";

/////////////////  COMPONENTS  ////////////////////
import Logo from "./components/logo";
import Logout from "./components/logout";
import style from "./css/app.module.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        console.log("App has mounted");
        axios.get("/user");
    }
    render() {
        return (
            <div className={style.app}>
                <Logo width="100px" />
                <Logout class={style.logout} />
                <h1>App</h1>
                <p>Hi! </p>
            </div>
        );
    }
}

export default App;
