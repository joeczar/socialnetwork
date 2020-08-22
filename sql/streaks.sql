-- psql socialnetwork -f sql/streaks.sql
DROP TABLE IF EXISTS streaks
CASCADE;
CREATE TABLE streaks
(
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id),
    title VARCHAR NOT NULL CHECK(title != ''),
    slug VARCHAR NOT NULL CHECK(slug != ''),
    description TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    length INT NOT NULL,

    ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

-- SELECT * FROM streaks WHERE user_id=201 AND title='make-a-editable-streak-builder';
-- SELECT * FROM streaks WHERE user_id=201 AND title='make-a-editable-streak-builder' AND streak@> '{"streak": [{"dayNumber":0}]}';