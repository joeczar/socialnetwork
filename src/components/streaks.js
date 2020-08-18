import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { receiveStreaks } from "../helpers/actions";
import StreakIntro from "./streakIntro";
import StreaksTutorial from "./streaksTutorial";
import streakBuilder from "./streakBuilder";
import SearchStreaks from "./searchStreaks";
import style from "../css/streaks.module.css";
import MyStreaks from "./myStreaks";

const streaks = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(receiveStreaks());
    }, []);

    const streaks = useSelector((state) => state.streaks && state.streaks);
    console.log("STREAKS ", streaks);
    return (
        <div className={style.streaksWrapper}>
            <h1>Streaks</h1>
            <BrowserRouter>
                <Route
                    exact
                    path="/streaks"
                    render={() => {
                        return <MyStreaks streaks={streaks} />;
                    }}
                />
                <Route path="/streaks/intro" component={StreakIntro} />
                <Route path="/streaks/tutorial" component={StreaksTutorial} />
                <Route path="/streaks/builder" component={streakBuilder} />
                <Route path="/streaks/search" component={SearchStreaks} />
            </BrowserRouter>
        </div>
    );
};

export default streaks;
