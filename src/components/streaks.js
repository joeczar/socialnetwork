import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { receiveStreaks } from "../helpers/actions";
import NotFound from "./404";
import StreakIntro from "./streakIntro";
import StreaksTutorial from "./streaksTutorial";
import streakBuilder from "./streakBuilder";
import SearchStreaks from "./searchStreaks";
import style from "../css/streaks.module.css";
import MyStreaks from "./myStreaks";
import FullStreak from "./fullStreak";

const Streaks = () => {
    const dispatch = useDispatch();
    let location = useLocation();
    const streaks = useSelector((state) => state.streaks && state.streaks);

    useEffect(() => {
        dispatch(receiveStreaks());
        //
    }, []);

    // useEffect(() => {}, []);
    // const streaks = useSelector((state) => state.streaks && state.streaks);

    return (
        <div id="streaksWrapper" className={style.streaksWrapper}>
            <h1>Streaks</h1>
            <BrowserRouter>
                <Switch>
                    <Route
                        exact
                        path="/streaks"
                        render={() => {
                            return <MyStreaks streaks={streaks && streaks} />;
                        }}
                    />
                    {streaks && (
                        <Route
                            path="/streaks/mystreaks/:streak"
                            render={() => {
                                return (
                                    <FullStreak
                                        location={location}
                                        streaks={streaks && streaks}
                                    />
                                );
                            }}
                        />
                    )}
                    <Route path="/streaks/intro" component={StreakIntro} />
                    <Route
                        path="/streaks/tutorial"
                        component={StreaksTutorial}
                    />
                    <Route path="/streaks/builder" component={streakBuilder} />
                    <Route path="/streaks/search" component={SearchStreaks} />
                    <Route component={NotFound} />
                </Switch>
            </BrowserRouter>
        </div>
    );
};

export default Streaks;
