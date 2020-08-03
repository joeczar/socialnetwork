import React from "react";

import style from "../css/profilePic.module.css";

const ProfilePic = ({ name, url, toggleUpload }) => {
    console.log("profilePic", url);
    return (
        <div onClick={toggleUpload} className={`${style.profilePic}`}>
            <img
                src={url || "/ZenUserIcon.png"}
                alt={`${name.first} ${name.last}`}
            />
        </div>
    );
};

export default ProfilePic;
