import React from "react";
import style from "../css/circle.module.css";

const Circle = ({ radius, cx, cy, spread, color }) => (
    <circle
        cx={cx}
        cy={cy}
        r={radius - spread}
        strokeWidth="1"
        id="circle"
        className={style.circle}
    />
);

export default Circle;
