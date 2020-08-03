import React, { Component } from "react";

export default class Bio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: "add",
            draft: "Tell us about yourself...",
            bio: null,
        };
        this.handleAddBio = this.handleAddBio.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        // this.showBio = this.showBio.bind(this);
    }
    componentDidMount() {
        this.props.bio &&
            this.setState({ draft: this.props.bio, bio: this.props.bio });
        console.log("bio cdm state", this.state, this.props.bio);
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.bio !== this.props.bio) {
            console.log("Props.bio updated", this.props.bio);
            this.setState(
                { draft: this.props.bio, bio: this.props.bio, mode: "showBio" },
                () => {
                    console.log("state updated", this.state);
                }
            );
        }
    }
    handleAddBio(e) {
        e.preventDefault();
        console.log("handle addBio");
        this.setState({ mode: "edit" });
    }
    handleEdit(e) {
        e.preventDefault();
        this.props.setBio(this.state.draft);
        // this.showBio();
    }
    handleChange(e) {
        this.setState({ draft: e.target.value });
    }
    showBio() {
        console.log("Show bio", this.state.bio);
        if (this.props.bio) {
            console.log("Showing bio");
            this.setState({ mode: "show" }, () => {
                console.log("updated State", this.state);
            });
        }
    }
    render() {
        if (this.state.mode === "add") {
            return <AddBio handleAddBio={this.handleAddBio} />;
        } else if (this.state.mode === "edit") {
            return (
                <EditBio
                    handleEdit={this.handleEdit}
                    handleChange={this.handleChange}
                    draft={this.state.draft}
                />
            );
        } else if (this.state.mode == "showBio") {
            return (
                <div>
                    <ShowBio
                        bio={this.props.bio}
                        handleAddBio={this.handleAddBio}
                    />
                </div>
            );
        }
    }
}
const AddBio = ({ handleAddBio }) => {
    return (
        <div>
            <h2>Bio</h2>
            <button onClick={(e) => handleAddBio(e)}>Add a Bio</button>
        </div>
    );
};
const EditBio = ({ handleEdit, handleChange, draft }) => {
    return (
        <div>
            <h2>Bio</h2>
            <textarea
                defaultValue={draft}
                onChange={(e) => handleChange(e)}
            ></textarea>
            <button onClick={(e) => handleEdit(e)}>Save</button>
        </div>
    );
};
const ShowBio = ({ bio, handleAddBio }) => {
    return (
        <div>
            <h2>Bio</h2>
            <p>{bio}</p>
            <button onClick={(e) => handleAddBio(e)}>Edit Bio</button>
        </div>
    );
};
