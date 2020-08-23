import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { receiveStreaks } from "../helpers/actions";
import StreakCard from "./streakCard";
import Streak from "../helpers/streak";

import style from "../css/streakCard.module.css";

const MyStreaks = () => {
    const dispatch = useDispatch();
    const streaks = useSelector((state) => state.streaks && state.streaks);

    useEffect(() => {
        dispatch(receiveStreaks());
    }, []);

    return (
        <div className={style.streakFlexRow}>
            {streaks &&
                streaks.reverse().map((streak) => {
                    return <StreakCard key={streak.id} streak={streak} />;
                })}
        </div>
    );
};

export default MyStreaks;
