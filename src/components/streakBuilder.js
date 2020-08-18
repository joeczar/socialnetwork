import React, { useState, useEffect } from "react";
import { useStatefulFields } from "../hooks/useStatefulFields";
import { useDispatch, useSelector } from "react-redux";
import { generateStreak } from "../helpers/actions";
import style from "../css/streaks.module.css";

const streakBuilder = (props) => {
    const [values, handleChange] = useStatefulFields();
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(values);
        dispatch(generateStreak(values));
    };
    return (
        <div className={style.container}>
            <h1>Streak Builder</h1>
            <form>
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Give your streak a name."
                    required
                    onChange={handleChange}
                />
                <label htmlFor="description">Description:</label>
                <textarea
                    name="description"
                    id="description"
                    placeholder="What are you working towards and what will you do each day to achieve that goal?"
                    required
                    onChange={handleChange}
                />
                <label htmlFor="startDate">Start Date:</label>
                <input
                    className={style.startDate}
                    type="date"
                    name="startDate"
                    id="startDate"
                    required
                    onChange={handleChange}
                />
                <p>Do you have an end date? Or, is this an open ended goal?</p>
                <div className={style.endDateWrapper}>
                    <div>
                        <label htmlFor="endDate">End Date</label>
                        <input
                            className={style.endDate}
                            name="endDate"
                            id="endDate"
                            type="date"
                            onChange={handleChange}
                        />
                    </div>
                    <label htmlFor="openEnded">
                        Open Ended
                        <input
                            type="checkbox"
                            name="openEnded"
                            id="openEnded"
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <button onClick={(e) => handleSubmit(e)}>
                    Generate Streak
                </button>
            </form>
        </div>
    );
};

export default streakBuilder;
