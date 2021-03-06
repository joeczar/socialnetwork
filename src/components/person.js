import React from "react";
import { Link } from "react-router-dom";
import ProfilePic from "./profilePic";
import style from "../css/person.module.css";

const Person = ({ id, first, last, url, size }) => {
    const name = { first, last };
    return (
        <div className={style.person}>
            <ProfilePic name={name} url={url} toggleUpload={null} size={size} />
            <Link className={style.link} to={`/user/${id}`}>
                <h3>
                    {first} {last}
                </h3>
            </Link>
        </div>
    );
};
export default Person;
