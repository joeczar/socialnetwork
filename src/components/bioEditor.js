import React, { Component } from "react";
import axios from "../helpers/axios";

export default class Bio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: "add",
            draft: "Tell us about yourself...",
            bio: "",
        };
        this.handleAddBio = this.handleAddBio.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.showBio = this.showBio.bind(this);
    }
    handleAddBio(e) {
        e.preventDefault();
        console.log("handle addBio");
        this.setState({ mode: "edit" });
    }
    async handleEdit(e) {
        e.preventDefault();
        console.log("handle edit");
        console.log(this.state.draft);
        this.props.setBio(this.state.draft);

        // const { data } = await axios.post("./add-bio", this.state.draft);
        // console.log(data);
    }
    handleChange(e) {
        this.setState({ draft: e.target.value });
    }
    showBio() {
        if (this.state.bio != "") {
            this.setState({ mode: "show" });
        }
    }
    render() {
        console.log("Bio state", this.state);
        this.props.bio && this.setState({ draft: this.props.bio });
        this.showBio();

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
            return <ShowBio bio={this.props.bio} />;
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
const ShowBio = ({ bio }) => {
    return (
        <div>
            <h2>Bio</h2>
            <p>{bio}</p>
        </div>
    );
};
