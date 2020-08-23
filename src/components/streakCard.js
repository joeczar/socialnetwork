import React, { useEffect, useState, useRef } from "react";
import moment from "moment";
import Circles from "./circles";
import { circlePos } from "../helpers/circleOfCircles";

import Logo from "./logo";
import style from "../css/streakCard.module.css";

const StreakCard = ({ streak }) => {
    const targetRef = useRef();
    const [multiple, setMultiple] = useState(false);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [circlesArr, setCirclesArr] = useState([]);
    const [circlePosition, setCirclePos] = useState({
        xValues: [],
        yValues: [],
    });
    const [multiCircPos, setMultiCirPos] = useState();
    useEffect(() => {
        if (targetRef.current) {
            setDimensions({
                width: targetRef.current.offsetWidth,
                height: targetRef.current.offsetHeight,
            });
        }
    }, []);
    useEffect(() => {
        const mapCircles = circles(streak.length);
        setCirclesArr(mapCircles);
        console.log(dimensions, streak.length);
        const { yValues, xValues } = circlePos({
            radius: dimensions.width / 4,
            steps: mapCircles.length,
            centerX: dimensions.width / 2 - 20,
            centerY: dimensions.height / 2,
            spread: -20,
        });
        setCirclePos({ xValues, yValues });
    }, [streak]);
    useEffect(() => {
        const circleStyles = circlesArr.map((c, i) => {
            return {
                position: "absolute",
                top: `${circlePosition.yValues[i] - 20}px`,
                left: `${circlePosition.xValues[i]}px`,
                width: `${dimensions.width * 0.6}px`,
            };
        });
        setMultiCirPos(circleStyles);
        console.log(circleStyles);
    }, [circlePosition]);
    const circles = (steps) => {
        const stepArr = [];
        if (steps > 30) {
            setMultiple(true);
            const full = Math.floor(steps / 30);
            const rest = steps % 30;
            for (let i = 0; i < full; i++) {
                stepArr.push(30);
            }
            stepArr.push(rest);
        } else {
            stepArr.push(steps);
        }
        return stepArr;
    };
    return (
        <section className={`card ${style.card}`}>
            <a href={`/streaks/mystreaks/${streak.slug}`}>
                <h1>{streak.title}</h1>
            </a>

            <div className={style.dates}>
                <div className={style.dateWrapper}>
                    <span className={style.startStop}>Started on:</span>
                    <span className={style.date}>
                        {moment(streak.start_date).format("DD.MM.YY")}
                    </span>
                </div>
                {!streak.end_date && (
                    <div className={style.dateWrapper}>
                        <span className={style.startStop}>End Date:</span>
                        <span className={style.date}>
                            {moment(streak.end_date).format("DD.MM.YY")}
                        </span>
                    </div>
                )}
            </div>
            <div className={style.circles} ref={targetRef}>
                {/* <Circles
                    radius={dimensions.height / 4 - 2}
                    steps={streak.length}
                    centerX={dimensions.height}
                    centerY={dimensions.height}
                    spread="0"
                /> */}
                {circlesArr.map((steps, i) => {
                    const style =
                        multiCircPos && multiple
                            ? multiCircPos[i]
                            : { position: "relative" };
                    // console.log("STyLE", style, multiCircPos[i]);
                    return (
                        <div style={style}>
                            <Logo steps={steps} />
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default StreakCard;
