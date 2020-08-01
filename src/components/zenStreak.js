import React from "react";
import style from "../css/zenStreak.module.css";

const ZenStreak = ({ height, width }) => (
    <svg id="zenStreak" className={style.zen}>
        <text>Zen Streak</text>
    </svg>
);

export default ZenStreak;
