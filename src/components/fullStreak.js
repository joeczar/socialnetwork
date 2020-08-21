import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { receiveStreaks } from "../helpers/actions";
import { circlePos } from "../helpers/circleOfCircles";
import StreakDate from "./streakDate";
import style from "../css/fullStreak.module.css";

const FullStreak = ({ location }) => {
    const dispatch = useDispatch();

    const [title, setTitle] = useState();
    const [streak, setStreak] = useState();
    const streaks = useSelector(
        (state) =>
            state.streaks && state.streaks.filter((s) => s.title === title)
    );
    useEffect(() => {
        const wrapper = streaks && streaks[0];
        const { streak } = wrapper && wrapper;
        setStreak(streak);
        console.log(streak);
    }, [streaks]);
    useEffect(() => {
        dispatch(receiveStreaks());
        console.log("FullStreak!");
        const slug = location.pathname.split("/");
        setTitle(slug[slug.length - 1]);
        // console.log({ getStreaks });
        // setStreak(getStreaks);
    }, []);

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
        steps: (streak && streak.streakLength) || 0,
        centerX: dateDimensions.width / 2,
        centerY: dateDimensions.height / 2 + 50,
        spread: 0,
    });
    console.log("STREAK FULL STRREAK!!!", streak);
    return (
        <div className={style.wrapper}>
            <header>
                <h1>{streak && streak.title}</h1>
                <button>Edit</button>
            </header>
            <section className={style.dates} ref={datesRef}>
                {streak &&
                    streak.map((date, i) => (
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
