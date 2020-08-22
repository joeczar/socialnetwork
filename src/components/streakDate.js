import React, { useState, useEffect } from "react";
import moment from "moment";
import style from "../css/streakDate.module.css";
const StreakDate = ({ date, top, left, size }) => {
    // console.log("date in streakDate", date);
    const [hover, setHover] = useState(false);
    const [modal, setModal] = useState(false);
    const [large, setLarge] = useState("false");
    const [showModal, setShowModal] = useState("");
    useEffect(() => {}, [hover]);
    useEffect(() => {
        const isLarge = modal ? style.large : "";
        setLarge(isLarge);
        const isModal = modal ? style.modal : "";
        setShowModal(isModal);
        console.log(modal, large);
    }, [modal]);
    const dateStyle = {
        position: "absolute",
        top: `${top}px`,
        left: `${left}px`,
        // width: `${size}px`,
        // height: `${size}px`,
    };
    const handleClick = (e) => {
        const isModal = modal ? false : true;
        setModal(isModal);
        console.log("handleClick", modal);
    };

    return (
        <div className={showModal}>
            <div
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                onClick={(e) => handleClick(e)}
                style={dateStyle}
                className={`${style.wrapper} ${large}`}
            >
                <div className={style.text}>
                    <h4 className={style.day}>{`Day ${date.day}`}</h4>
                    <p className={style.date}>{`${moment(
                        date.date_obj.streakDate
                    ).format("DD.MM.YYYY")}`}</p>
                </div>
            </div>
        </div>
    );
};

export default StreakDate;
