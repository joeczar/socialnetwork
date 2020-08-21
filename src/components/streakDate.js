import React, { useState, useEffect } from "react";
import moment from "moment";
import style from "../css/streakDate.module.css";
const StreakDate = ({ date, top, left, size }) => {
    // console.log("date in streakDate", date);
    const [hover, setHover] = useState(false);
    const [showButton, setShowButton] = useState(false);
    useEffect(() => {
        setShowButton(hover);
    }, [hover]);

    const dateStyle = {
        position: "absolute",
        top: `${top}px`,
        left: `${left}px`,
        width: `${size}px`,
        height: `${size}px`,
    };
    console.log("Streak Date", date);
    return (
        <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={dateStyle}
            className={style.wrapper}
        >
            <div className={style.text}>
                <h4 className={style.day}>{`Day ${date.dayNumber}`}</h4>
                <p className={style.date}>{`${moment(date.streakDate).format(
                    "DD.MM.YYYY"
                )}`}</p>
                {hover && <button>Edit</button>}
            </div>
        </div>
    );
};

export default StreakDate;
