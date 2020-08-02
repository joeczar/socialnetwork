DROP TABLE IF EXISTS images;

-- psql socialnetwork -f sql/profilePics.sql

DROP TABLE IF EXISTS profilepics;

CREATE TABLE profilepics(
    id SERIAL PRIMARY KEY,
    url VARCHAR NOT NULL,
    user_id VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
