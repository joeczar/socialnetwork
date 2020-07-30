const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:ripley:IfIhad1PostGres!@localhost:5432/socialnetwork"
);
module.exports.addUser = (params) => {
    const q = `INSERT INTO users (first, last, email, hash) VALUES ($1, $2, $3, $4) RETURNING first, last, id`;
    return db.query(q, params);
};
