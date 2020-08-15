const db = require("./db");
(async () => {
    const args = process.argv.slice(2);
    if (!args[0]) {
        return console.log("please enter a userId");
    }
    const arr = [];
    const newFriends = [];
    while (arr.length < 10) {
        const r = Math.floor(Math.random() * 200) + 1;
        if (arr.indexOf(r) === -1) arr.push(r);
    }
    console.log(arr);

    try {
        arr.forEach(async (id) => {
            const { rows } = await db.addFriend([id, args[0]]);
            newFriends.push(rows);
        });
    } catch (err) {
        console.log("error making friends", err);
    }
    console.log(await newFriends);
})();
