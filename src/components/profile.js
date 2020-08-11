import React, { Component } from "react";
import ProfilePic from "./profilePic";
import BioHooked from "./BioHooked";
import style from "../css/profile.module.css";

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
            <div className={`profile ${style.profile}`}>
                <h1>{`${name.first}'s `}Profile</h1>
                <div className={style.profileWrapper}>
                    <ProfilePic name={name} url={url} size="large" />
                    <BioHooked setBio={setBio} bio={bio} />
                </div>
            </div>
        );
    }
}
