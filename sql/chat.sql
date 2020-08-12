-- psql socialnetwork -f sql/chat.sql

CREATE TABLE chat_messages
(
    id SERIAL PRIMARY KEY,
    message VARCHAR NOT NULL CHECK (message <> ''),
    sender_id INT NOT NULL REFERENCES users(id),
    ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);