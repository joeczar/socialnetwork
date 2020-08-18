import React from "react";
import style from "../css/errors.module.css";

const Errors = ({ errors }) => {
    return (
        errors.length > 0 &&
        errors.map((err, key) => {
            return (
                <div className={style.error} key={key}>
                    <p>{err}</p>
                </div>
            );
        })
    );
};
export default Errors;
