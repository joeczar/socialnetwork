import React, { useEffect, useState, useRef } from "react";
import moment from "moment";
import Circles from "./circles";
import style from "../css/streakCard.module.css";

const StreakCard = ({ streak }) => {
    const targetRef = useRef();
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    useEffect(() => {
        if (targetRef.current) {
            setDimensions({
                width: targetRef.current.offsetWidth,
                height: targetRef.current.offsetHeight,
            });
        }
    }, []);
    console.log(dimensions, streak);
    return (
        <section className={`card ${style.card}`}>
            <a href={`/streaks/mystreaks/${streak.slug}`}>
                <h1>{streak.title}</h1>
            </a>

            <div className={style.dates}>
                <div className={style.dateWrapper}>
                    <span className={style.startStop}>Started on:</span>
                    <span className={style.date}>
                        {moment(streak.beginning).format("DD.MM.YY")}
                    </span>
                </div>
                {!streak.openEnded && (
                    <div className={style.dateWrapper}>
                        <span className={style.startStop}>End Date:</span>
                        <span className={style.date}>
                            {moment(streak.endDate).format("DD.MM.YY")}
                        </span>
                    </div>
                )}
            </div>
            <div className={style.circles} ref={targetRef}>
                <Circles
                    radius={dimensions.height / 4 - 5}
                    steps={streak.streakLength}
                    centerX={dimensions.height}
                    centerY={dimensions.height}
                    spread="0"
                />
            </div>
        </section>
    );
};

export default StreakCard;
