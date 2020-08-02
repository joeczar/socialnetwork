import React from "react";
import style from "../css/closeX.module.css";

function CloseX({ close }) {
    return (
        <button
            id="closeUploader"
            onClick={(e) => close(e)}
            className={style.closeBtn}
        >
            <div id={style.minus45} className={style.closeX}></div>
            <div id={style.plus45} className={style.closeX}></div>
        </button>
    );
}

export default CloseX;
