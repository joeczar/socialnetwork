-- psql socialnetwork -f sql/users.sql

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS password_reset_codes;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    first VARCHAR NOT NULL CHECK(first != ''),
    last VARCHAR NOT NULL CHECK(last != ''),
    email TEXT NOT NULL CHECK(email != '') UNIQUE,
    hash VARCHAR(255) NOT NULL,
    pic_url VARCHAR,
    bio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE password_reset_codes(
    id SERIAL PRIMARY KEY,
    email VARCHAR,
    code VARCHAR(6),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
 CREATE TABLE friendships( id SERIAL PRIMARY KEY,
     sender_id INT REFERENCES users(id) NOT NULL,
     recipient_id INT REFERENCES users(id) NOT NULL,
     accepted BOOLEAN DEFAULT false);