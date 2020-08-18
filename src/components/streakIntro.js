import React from "react";

const StreakIntro = () => {
    return (
        <div id="introWrapper">
            <h1>What is a Streak</h1>
            <div className="intro-bubble">What is a streak</div>
            <div className="intro-bubble">Why should I use streaks?</div>
            <div className="intro-bubble">
                How do I create a Streak? To the{" "}
                <a href="/streaks/tutorial">tutorial</a>!
            </div>
        </div>
    );
};

export default StreakIntro;
