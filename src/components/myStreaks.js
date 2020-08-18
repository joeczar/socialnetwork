import React from "react";
import moment from "moment";

const MyStreaks = ({ streaks }) => {
    console.log("MYSTREAKS", streaks);
    return (
        <div>
            <h1>My Streaks</h1>
            <div>
                {streaks &&
                    streaks.map((streak) => {
                        console.log(streak);
                        return (
                            <>
                                <h2>{streak.streak.title}</h2>
                                <p>{streak.streak.description}</p>
                                <h3>
                                    Started on:{" "}
                                    {moment(streak.startDate).format(
                                        "dddd, MMMM Do YYYY"
                                    )}
                                </h3>
                                {!streak.streak.openEnded && (
                                    <h3>
                                        End Date:{" "}
                                        {moment(streak.endDate).format(
                                            "dddd, MMMM Do YYYY"
                                        )}
                                    </h3>
                                )}
                            </>
                        );
                    })}
            </div>
        </div>
    );
};

export default MyStreaks;
