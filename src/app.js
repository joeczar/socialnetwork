import React, { Component } from "react";
import axios from "axios";

/////////////////  COMPONENTS  ////////////////////
import Layout from "./layouts/layout";
import Uploader from "./components/uploader";
import Profile from "./components/profile";
///////////////  CSS  //////////////////
import style from "./css/app.module.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggleUploadModal: false,
            name: "",
            url: "",
            bio: "",
        };
        this.toggleUploadModal = this.toggleUploadModal.bind(this);
        this.updateUrl = this.updateUrl.bind(this);
        this.setBio = this.setBio.bind(this);
    }
    async componentDidMount() {
        console.log("App has mounted");
        const { data } = await axios.get("/user");
        const { first, last, pic_url, bio } = data;

        this.setState({
            name: { first: first, last: last },
            url: pic_url,
            bio: bio,
        });
    }
    toggleUploadModal() {
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
    async setBio(bio) {
        console.log("in set bio", bio);
        try {
            const { data } = await axios.post(
                "/add-bio",
                { bio: bio },
                {
                    xsrfCookieName: "token",
                    xsrfHeaderName: "csrf-token",
                }
            );
            console.log("setBio response", data);
            if (data.success) {
                this.setState({
                    bio: data.bio,
                });
            } else {
                console.log("Something went wrong.", data.errors);
            }
        } catch (err) {
            console.log("error in setBio", err);
        }
    }
    render() {
        console.log("app state", this.state);
        return (
            <Layout
                toggleUpload={this.toggleUploadModal}
                name={this.state.name}
                url={this.state.url}
            >
                <Profile
                    name={this.state.name}
                    url={this.state.url}
                    bio={this.state.bio}
                    setBio={this.setBio}
                />

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
