const db = require("./db");

const arr = [];
const newFriends = [];
while (arr.length < 10) {
    const r = Math.floor(Math.random() * 200) + 1;
    if (arr.indexOf(r) === -1) arr.push(r);
}
console.log(arr);

try {
    arr.forEach(async (id) => {
        const { rows } = await db.addFriend([id, 201]);
        newFriends.push(rows);
    });
} catch (err) {
    console.log("error making friends", err);
}
console.log(await newFriends);
