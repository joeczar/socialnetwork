import React, { Component } from "react";
import axios from "./helpers/axios";
import { BrowserRouter, Route, Switch } from "react-router-dom";
/////////////////  COMPONENTS  ////////////////////
import Layout from "./layouts/layout";
import Uploader from "./components/uploader";
import Profile from "./components/profile";
import { FindPeople } from "./components/findPeople";
import NotFound from "./components/404";
import OtherProfile from "./components/otherProfile";
import Friends from "./components/friends";
import Chat from "./components/chat";
import OtherProfileFR from "./components/otherProfileFR";
///////////////  CSS  //////////////////
import "./css/style.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggleUploadModal: false,
            name: "",
            url: "",
            bio: "",
            id: null,
        };
        this.toggleUploadModal = this.toggleUploadModal.bind(this);
        this.updateUrl = this.updateUrl.bind(this);
        this.setBio = this.setBio.bind(this);
    }
    async componentDidMount() {
        console.log("App has mounted");
        const { data } = await axios.get("/user");
        const { id, first, last, pic_url, bio } = data;

        this.setState({
            name: { first: first, last: last },
            url: pic_url,
            bio: bio,
            id: id,
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
            const { data } = await axios.post("/add-bio", { bio: bio });
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
            <BrowserRouter>
                <Layout
                    toggleUpload={this.toggleUploadModal}
                    name={this.state.name}
                    url={this.state.url}
                >
                    <Switch>
                        <Route
                            exact
                            path="/"
                            render={() => (
                                <>
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
                                </>
                            )}
                        />
                        <Route path="/users" component={FindPeople} />
                        {/* <Route path="/user/:id" component={OtherProfile} /> */}
                        <Route path="/user/:id" component={OtherProfileFR} />
                        <Route path="/friends" component={Friends} />
                        <Route
                            path="/chat"
                            render={() => <Chat userId={this.state.id} />}
                        />
                        <Route component={NotFound} />
                    </Switch>
                </Layout>
            </BrowserRouter>
        );
    }
}

export default App;
