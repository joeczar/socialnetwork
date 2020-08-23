import React from "react";
import { Link } from "react-router-dom";

const StreakNav = () => {
    return (
        <nav>
            <Link to="/streaks/builder">Streak Builder</Link>
        </nav>
    );
};

export default StreakNav;
