import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    receiveStreaks,
    receiveStreak,
    receiveDates,
} from "../helpers/actions";
import { circlePos } from "../helpers/circleOfCircles";
// import { mapMonthsAndYears } from "../helpers/newStreak";
import StreakDate from "./streakDate";
import CircleArrayWrapper from "./circleArrayWrapper";
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
        radius: dateDimensions.width / 4 + 20,
        steps: (streak && streak.length) || 0,
        centerX: dateDimensions.width / 2,
        centerY: dateDimensions.height / 2 + 50,
        spread: 0,
    });
    const mapToMonthsAndYears = (datesArr) => {
        const months = {};
        //create months object with name,number and year properties
        // map dates to
        datesArr.forEach((d) => {
            months[`${d.date_obj.month.name}_${d.date_obj.year}`] = {
                name: d.date_obj.month.name,
                number: d.date_obj.month.number,
                year: d.date_obj.year,
                dates: [],
            };
        });
        datesArr.forEach((d) => {
            months[`${d.date_obj.month.name}_${d.date_obj.year}`].dates.push(d);
        });
        return months;
    };
    const months = dates && mapToMonthsAndYears(dates);

    return (
        <div className={style.wrapper}>
            <header>
                <h1>{streak && streak.title}</h1>
                <button>Edit</button>
            </header>
            <section className={style.dates} ref={datesRef}>
                {
                    months &&
                        Object.keys(months)
                            .sort((a, b) =>
                                months[a].number < months[b].number ? 1 : -1
                            )
                            .sort((a, b) =>
                                Number(months[a].year) < Number(months[b].year)
                                    ? 1
                                    : -1
                            )

                            .map((month, i) => {
                                console.log("month", months[month]);
                                return (
                                    <div
                                        key={i}
                                        id={`#${months[month].name}`}
                                        className={style.fullMonthWrapper}
                                    >
                                        <div
                                            className={style.monthWrapper}
                                            style={{
                                                left:
                                                    dateDimensions.width / 6 -
                                                    200 +
                                                    "px",
                                                top: "50%",
                                            }}
                                        >
                                            <h3 className={style.monthName}>
                                                {months[month].name}
                                            </h3>
                                            <h3 className={style.year}>
                                                {months[month].year}
                                            </h3>
                                        </div>
                                        <CircleArrayWrapper
                                            key
                                            size={dateDimensions.width / 3 - 50}
                                        >
                                            {months[month].dates
                                                .sort((a, b) =>
                                                    a.date_obj.streakDate <
                                                    b.date_obj.streakDate
                                                        ? 1
                                                        : -1
                                                )
                                                .map((date, i) => {
                                                    return (
                                                        <Link
                                                            to={`/streaks/mystreaks-day/${
                                                                streak &&
                                                                streak.slug
                                                            }/${date.day}`}
                                                        >
                                                            <StreakDate
                                                                key={date.id}
                                                                date={date}
                                                                top={0}
                                                                left={0}
                                                                size={
                                                                    dateDimensions.width /
                                                                    3 /
                                                                    2
                                                                }
                                                            />
                                                        </Link>
                                                    );
                                                })}
                                        </CircleArrayWrapper>
                                    </div>
                                );
                            })

                    // dates.map((date, i) => )}
                }
            </section>
        </div>
    );
};

export default FullStreak;
