import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    receiveStreaks,
    receiveStreak,
    receiveDates,
} from "../helpers/actions";
import { circlePos } from "../helpers/circleOfCircles";
import StreakDate from "./streakDate";
import style from "../css/fullStreak.module.css";

const FullStreak = ({ location }) => {
    const getSlug = location.pathname.split("/");

    const dispatch = useDispatch();
    const streak = useSelector((state) => state.streak && state.streak);
    const dates = useSelector((state) => state.dates);
    const [title, setTitle] = useState();
    // const [dates, setDates] = useState();

    useEffect(() => {
        const slug = getSlug[getSlug.length - 1];
        setTitle(slug);
        dispatch(receiveStreak(slug));
    }, []);
    useEffect(() => {
        streak && dispatch(receiveDates(streak.id));
    }, [streak]);
    const [dateDimensions, setDateDimensions] = useState({});
    const datesRef = useRef();

    useEffect(() => {
        setDateDimensions({
            width: datesRef.current.offsetWidth,
            top: datesRef.current.offsetTop,
            height: datesRef.current.offsetHeight,
        });
    }, [datesRef]);

    const { yValues, xValues } = circlePos({
        radius: dateDimensions.width / 4,
        steps: (streak && streak.length) || 0,
        centerX: dateDimensions.width / 2,
        centerY: dateDimensions.height / 2 + 50,
        spread: 0,
    });
    console.log("dates", dates);
    console.log("STREAK FULL STRREAK!!!", streak && streak);
    return (
        <div className={style.wrapper}>
            <header>
                <h1>{streak && streak.title}</h1>
                <button>Edit</button>
            </header>
            <section className={style.dates} ref={datesRef}>
                {dates &&
                    dates.map((date, i) => (
                        <StreakDate
                            date={date}
                            top={yValues[i]}
                            left={xValues[i]}
                            size={dateDimensions.width / 2}
                        />
                    ))}
                <div className={style.filler} />
            </section>
        </div>
    );
};

export default FullStreak;
