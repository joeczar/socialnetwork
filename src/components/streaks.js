import React, { useEffect, useState } from "react";
import {
    BrowserRouter,
    Route,
    Switch,
    useLocation,
    Link,
} from "react-router-dom";
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
import StreakNav from "./streakNav";
import StreakDayEditor from "./streakDayEditor";

const Streaks = () => {
    const dispatch = useDispatch();
    let location = useLocation();
    const streaks = useSelector((state) => state.streaks && state.streaks);

    useEffect(() => {
        dispatch(receiveStreaks());
        //
    }, []);

    // useEffect(() => {}, [location.pathname]);
    // const streaks = useSelector((state) => state.streaks && state.streaks);

    return (
        <div id="streaksWrapper" className={style.streaksWrapper}>
            <BrowserRouter>
                <header className={style.header}>
                    <Link to="/streaks">
                        <h1 className={style.title}>Streaks</h1>
                    </Link>
                    <StreakNav />
                </header>

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
                    <Route
                        path="/streaks/mystreaks-day/:streak/:dayNumber"
                        component={StreakDayEditor}
                    />
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
