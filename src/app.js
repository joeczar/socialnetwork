import React, { Component } from "react";
import axios from "axios";

/////////////////  COMPONENTS  ////////////////////
import Layout from "./layouts/layout";
import Uploader from "./components/uploader";
///////////////  CSS  //////////////////
import style from "./css/app.module.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggleUploadModal: false,
            name: "",
            url: "",
        };
        this.toggleUploadModal = this.toggleUploadModal.bind(this);
        this.updateUrl = this.updateUrl.bind(this);
    }
    async componentDidMount() {
        console.log("App has mounted");
        const { data } = await axios.get("/user");
        const { first, last, pic_url } = data;
        this.setState({
            name: { first: first, last: last },
            url: pic_url,
        });
    }
    toggleUploadModal(e) {
        console.log(e.target);
        this.setState(
            {
                toggleUploadModal: !this.state.toggleUploadModal,
            },
            () => {
                console.log("upload toggled to:", this.state.toggleUploadModal);
            }
        );
    }
    updateUrl(url) {
        this.setState({ url: url });
    }
    render() {
        console.log("app state", this.state);
        return (
            <Layout
                toggleUpload={this.toggleUploadModal}
                name={this.state.name}
                url={this.state.url}
            >
                <h1>App</h1>
                <p>Hi! {`$`} </p>

                {this.state.toggleUploadModal && (
                    <Uploader
                        name={this.state.name}
                        url={this.state.url}
                        toggleModal={this.toggleUploadModal}
                        updateUrl={this.updateUrl}
                    />
                )}
            </Layout>
        );
    }
}

export default App;
