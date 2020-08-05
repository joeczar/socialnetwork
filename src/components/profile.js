import React, { Component } from "react";
import ProfilePic from "./profilePic";
import BioHooked from "./BioHooked";

export default class Profile extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        console.log("Profile mounted");
    }
    render() {
        const { name, url, bio, setBio } = this.props;
        console.log("profile props", this.props);
        return (
            <div>
                <h1>{`${name.first}'s `}Profile</h1>
                <ProfilePic name={name} url={url} size="large" />
                <BioHooked setBio={setBio} bio={bio} />
            </div>
        );
    }
}
