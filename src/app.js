import React, { Component } from "react";
import axios from "axios";

/////////////////  COMPONENTS  ////////////////////
import Layout from "./layouts/layout";

///////////////  CSS  //////////////////
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
            <Layout>
                {/* <div className={style.app}> */}
                {/* <Logo width="100px" />
                <Logout class={style.logout} />
                <UserIcon /> */}
                <h1>App</h1>
                <p>Hi! </p>
                {/* </div> */}
            </Layout>
        );
    }
}

export default App;
