import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { receiveStreaks } from "../helpers/actions";
import StreakCard from "./streakCard";
import Streak from "../helpers/streak";

import style from "../css/streakCard.module.css";

const MyStreaks = () => {
    const dispatch = useDispatch();
    const streaks = useSelector((state) => state.streaks && state.streaks);
    // const [streak, setStreak] = useState();
    console.log("MyStreaks", streaks);

    useEffect(() => {
        console.log("useeffect streaks");
        dispatch(receiveStreaks());
    }, []);

    return (
        <div className={style.streakFlexRow}>
            hi
            {streaks &&
                streaks.reverse().map((streak) => {
                    // const streak = new Streak(streak.streak);
                    return <StreakCard key={streak.id} streak={streak} />;
                })}
        </div>
    );
};

export default MyStreaks;
