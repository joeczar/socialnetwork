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
        console.log("Bio mounted");
        const bioState =
            this.props.bio != "" || !this.props.bio ? "showBio" : "add";
        if (this.props.bio) {
            console.log("BIO PROPS CDM!!!!");
            this.setState({
                draft: this.props.bio,
                bio: this.props.bio,
            });
        }

        this.setState({ mode: bioState });
        // this.setState(
        //     { draft: this.props.bio, bio: this.props.bio, mode: "showBio" },
        //     () => {
        //         console.log("state updated", this.state);
        //     }
        // );
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.bio !== this.props.bio) {
            // this.showBio();
            // this.setState(
            //     { draft: this.props.bio, bio: this.props.bio, mode: "showBio" },
            //     () => {
            //         console.log("state updated", this.state);
            //     }
            // );
        }
    }
    handleAddBio(e) {
        e.preventDefault();
        this.setState({ mode: "edit" });
    }
    handleEdit(e) {
        e.preventDefault();
        this.props.setBio(this.state.draft);
        this.showBio();
    }
    handleChange(e) {
        this.setState({ draft: e.target.value });
    }
    showBio() {
        const bioState =
            this.props.bio != "" || !this.props.bio ? "showBio" : "add";
        this.setState(
            { draft: this.props.bio, bio: this.props.bio, mode: bioState },
            () => {
                console.log("state updated", this.state);
            }
        );
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
            <button id="editBio" onClick={(e) => handleAddBio(e)}>
                Edit Bio
            </button>
        </div>
    );
};
