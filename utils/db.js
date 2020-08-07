const spicedPg = require("spiced-pg");
const username = require("os").userInfo().username;
const { POSTGRES_PWD } = require("../secrets.json");
// const fakeUsers = require("./fakeUsers.json");

const db = spicedPg(
    process.env.DATABASE_URL ||
        `postgres:${username}:${POSTGRES_PWD}@localhost:5432/socialnetwork`
);
const addUser = (params) => {
    const q = `INSERT INTO users (first, last, email, hash) VALUES ($1, $2, $3, $4) RETURNING first, last, id`;
    return db.query(q, params);
};
const getUserByEmail = (params) => {
    const q = `SELECT * FROM users WHERE email=$1`;
    return db.query(q, params);
};
const getUser = (params) => {
    const q = `SELECT first, last, pic_url, bio FROM users WHERE id=$1`;
    return db.query(q, params);
};
const searchUsers = (params) => {
    const q = `SELECT * FROM users WHERE first ILIKE $1`;
    return db.query(q, params);
};
const getNewUsers = () => {
    const q = `SELECT * FROM users ORDER BY id DESC LIMIT 3`;
    return db.query(q, []);
};
const addProfilePic = (params) => {
    const q = `UPDATE users SET pic_url=$1 WHERE id=$2 RETURNING pic_url`;
    return db.query(q, params);
};
const addBio = (params) => {
    const q = `UPDATE users SET bio=$1 WHERE id=$2 RETURNING bio`;
    return db.query(q, params);
};
const updatePassword = (params) => {
    const q = `UPDATE users SET hash=$1 WHERE id=$2`;
    return db.query(q, params);
};
const getFriendshipStatus = (params) => {
    const q = `SELECT * FROM friendships
    WHERE (recipient_id = $1 AND sender_id = $2)
    OR (recipient_id = $2 AND sender_id = $1);`;
    return db.query(q, params);
};
const addFriend = (params) => {
    const q = `INSERT INTO friendships (sender_id, recipient_id) values ($1, $2) RETURNING sender_id, recipient_id, accepted`;
    return db.query(q, params);
};
const cancelFriendReq = (params) => {
    const q = `DELETE FROM friendships WHERE (sender_id=$1 AND recipient_id=$2) OR (sender_id=$2 AND recipient_id=$1)`;
    return db.query(q, params);
};
const acceptFriendReq = (params) => {
    const q = `UPDATE friendships SET accepted=true WHERE (sender_id=$2 AND recipient_id=$1) RETURNING sender_id, recipient_id, accepted;`;
    return db.query(q, params);
};
const endFriendship = (params) => {
    const q = `DELETE FROM friendships WHERE (sender_id=$1 AND recipient_id=$2) OR (sender_id=$2 AND recipient_id=$1)`;
    return db.query(q, params);
};

/* 
    SELECT * FROM friendships
    WHERE (recipient_id = 69 AND sender_id = 201)
    OR (recipient_id = 201 AND sender_id = 69);
*/
// const add200Users = () => {
//     return db.query(fakeUsers.query);
// };
// (async () => {
//     try {
//         const { rows } = await add200Users();
//         console.log(rows);
//     } catch (err) {
//         console.log("Error in add200Users", err);
//     }
// })();

module.exports = {
    addUser,
    getUserByEmail,
    getUser,
    getNewUsers,
    searchUsers,
    addProfilePic,
    updatePassword,
    addBio,
    getFriendshipStatus,
    addFriend,
    cancelFriendReq,
    acceptFriendReq,
    endFriendship,
};
