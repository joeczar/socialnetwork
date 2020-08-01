import React from "react";

import style from "../css/profilePic.module.css";

const ProfilePic = ({ name, url, showUpload }) => {
    return (
        <div onClick={showUpload} className={style.profilePic}>
            <img
                src={url || "/userIcon.png"}
                alt={`${name.first} ${name.last}`}
            />
        </div>
    );
};

export default ProfilePic;
