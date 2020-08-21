-- psql socialnetwork -f sql/streaks.sql
DROP TABLE IF EXISTS streaks;
CREATE TABLE streaks
(
    id SERIAL PRIMARY KEY,
    title VARCHAR NOT NULL CHECK(title != '') UNIQUE,
    streak JSONb NOT NULL,
    user_id INT NOT NULL REFERENCES users(id),
    ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

-- SELECT * FROM streaks WHERE user_id=201 AND title='make-a-editable-streak-builder';
-- SELECT * FROM streaks WHERE user_id=201 AND title='make-a-editable-streak-builder' AND streak@> '{"streak": [{"dayNumber":0}]}';