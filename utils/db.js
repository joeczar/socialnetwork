const spicedPg = require("spiced-pg");
const username = require("os").userInfo().username;
const { POSTGRES_PWD } = require("../secrets.json");
// const fakeUsers = require("./fakeUsers.json")

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


// const add200Users = () => {
//     return db.query(fakeUsers.query)
// }
// (async () => {
//     try {
//         const {rows} = await add200Users()
//     console.log(rows);
//     } catch (err) {
//         console.log('Error in add200Users', err);
//     }
    
// }
// )();

module.exports = {
    addUser,
    getUserByEmail,
    getUser,
    addProfilePic,
    updatePassword,
    addBio,
};
