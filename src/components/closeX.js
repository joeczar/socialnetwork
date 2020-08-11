import React from "react";
import style from "../css/closeX.module.css";

function CloseX({ close }) {
    return (
        <div
            id="closeUploader"
            onClick={(e) => close(e)}
            className={style.closeBtn}
        >
            <div id={style.minus45} className={style.closeX}></div>
            <div id={style.plus45} className={style.closeX}></div>
        </div>
    );
}

export default CloseX;
