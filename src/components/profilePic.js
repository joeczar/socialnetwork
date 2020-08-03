import React from "react";

import style from "../css/profilePic.module.css";

const classes = {
    small: style.smallPic,
    medium: style.mediumPic,
    large: style.largePic,
};

const ProfilePic = ({ name, url, toggleUpload, size }) => {
    return (
        <div
            onClick={toggleUpload}
            className={`${style.profilePic} ${classes[size]} `}
        >
            <img
                src={url || "/ZenUserIcon.png"}
                alt={`${name.first} ${name.last}`}
            />
        </div>
    );
};

export default ProfilePic;
