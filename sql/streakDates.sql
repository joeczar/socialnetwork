-- psql socialnetwork -f sql/streakDates.sql
DROP TABLE IF EXISTS streak_dates;
CREATE TABLE streak_dates
(
    id SERIAL PRIMARY KEY,
    streak_id INT NOT NULL REFERENCES streaks(id),
    day INT NOT NULL,
    date_obj JSONb NOT NULL,
    notes JSONb,
    completed BOOLEAN
);