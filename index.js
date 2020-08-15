const express = require("express");
const app = express();

// SOCKET IO
const server = require("http").Server(app);
const io = require("socket.io")(server, {
    origins: "localhost:8080 127.0.0.1:8080",
});
//////////////////////////////
const compression = require("compression");
const cookieSession = require("cookie-session");
const { hash, compare } = require("./utils/bc");
const { uploader } = require("./utils/multer");
const aws = require("./utils/aws");
const { s3Url } = require("./config");
const csurf = require("csurf");
const { COOKIE_SESSION } = require("./secrets.json");
const {
    registerValidate,
    loginValidate,
    validate,
} = require("./utils/validatorRules");
const db = require("./utils/db");
const cryptoRandomString = require("crypto-random-string");

/////////////  REDIS  ////////////////
const { promisify } = require("util");
const redis = require("redis");
const { IoT1ClickDevicesService } = require("aws-sdk");
const client = redis.createClient({
    host: "localhost",
    port: 6379,
});
const setex = promisify(client.setex).bind(client);
const redisGet = promisify(client.get).bind(client);

client.on("error", (err) => {
    console.log("Redis error", err);
});

//////////  MIDDLEWARE  //////////////
const cookieSessionMiddleware = cookieSession({
    secret: COOKIE_SESSION,
    maxAge: 1000 * 60 * 60 * 24 * 14,
});
app.use(cookieSessionMiddleware);

io.use(function (socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

app.use(compression());
app.use(express.static("public"));
app.use(express.static("uploads"));
app.use(express.json());
app.use(csurf());

app.use((req, res, next) => {
    res.cookie("token", req.csrfToken());
    next();
});

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/",
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

/////////////////////////  REGISTER  /////////////////////////////
app.post("/register", registerValidate(), async (req, res) => {
    // use hash here  registerValidate(),
    // console.log("POST register", req.session);
    console.log("register", req.body);
    // console.log(req);
    const errors = [...validate(req)];
    try {
        console.log("in register try");
        const hashed = await hash(req.body.pass);
        console.log("got hashed in register", hashed);
        const { first, last, email } = req.body;
        const usrArr = [first, last, email, hashed];

        if (errors.length > 0) {
            console.log("register errors");
            return res.json({ success: false, errors: errors });
        } else {
            const user = await db.addUser(usrArr);
            console.log("register User", req.session);
            const { first, last, id } = user.rows[0];
            req.session.registerId = id;
            // req.session.name = { first, last };
            res.json({ success: true });
            console.log("register User after session", req.session);
        }
    } catch (err) {
        console.log("error in register", err);
        if (err.detail.includes("already exists")) {
            errors.push(
                "That email is already in use. Would you like to log in?"
            );
        } else {
            errors.push("Something went wrong, please try again.");
        }
        res.json({ success: false, errors: errors });
    }
});
////////////////////////  LOGIN  //////////////////////////////
app.post("/login", loginValidate(), async (req, res) => {
    console.log("Login", req.body);
    const { email, pass } = req.body;
    const errors = [...validate(req)];
    if (errors.length > 0) {
        console.log("errors login", errors);
        res.json({ success: false, errors });
    } else {
        try {
            const { rows } = await db.getUserByEmail([email]);
            const { id, first, last, hash } = rows[0];
            const match = await compare(pass, hash);

            if (match) {
                req.session.registerId = id;
                console.log("match is true!", first, last);
                res.json({ success: true, name: { first, last } });
            } else {
                errors.push("That email/password didn't work");
                res.json({ success: false });
            }
        } catch (err) {
            console.log("error in getUserBaEmail", err);
        }
    }
});

///////////////////////  LOGOUT  //////////////////////////////
app.get("/logout", (req, res) => {
    console.log(req.body);
    req.session = null;
    res.redirect("/");
});
////////////////  WELCOME  ///////////////////////////
app.get("/welcome", function (req, res) {
    console.log("/welcome", req.session);
    if (req.session.registerId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});
/////////////////  RESET PASSWORD  //////////////////

app.post("/resetpassword", async (req, res) => {
    console.log("post /resetpassword sanityCheck", req.body);
    // check for email
    const email = req.body.email;
    try {
        const { rows } = await db.getUserByEmail([email]);
        if (rows[0]) {
            // generate code
            const secretCode = cryptoRandomString({
                length: 6,
            });
            // save in REDIS
            const data = await setex(secretCode, 600, email);
            const emailMsg = `Your secret code is: \n \t${secretCode} \n\n It is only good for 10 min.`;
            const subject = "Reset your Password";
            const confirmation = await aws.sendEmail(email, emailMsg, subject);
            console.log("AWS Confirmation", confirmation);
            res.json({ success: true, confirmation });
        }
    } catch (err) {
        res.json({ success: false, errors: [err.message] });
        console.log("Error in reset password", err);
    }
});
app.post("/entercode", async (req, res) => {
    const { code, password, email } = req.body;
    try {
        const data = await redisGet(code);
        if (data == email) {
            // hash password
            const hashed = await hash(password);
            // store new password
            const { rows } = await db.updatePassword([
                hashed,
                req.session.registerId,
            ]);
            res.json({ success: true });
        } else {
            res.json({ success: false, errors: ["That code didn't match"] });
        }
    } catch (err) {
        res.json({ success: false, errors: [err.message] });
        console.log("Error in POST /entercode", err);
    }
});
///////////////////////  USER  /////////////////////////////////
app.get("/user", async (req, res) => {
    const { rows } = await db.getUser([req.session.registerId]);
    res.json(rows[0]);
});
app.post(
    "/upload-pic",
    uploader.single("file"),
    aws.upload,
    async (req, res) => {
        const { filename } = req.file;
        const url = `${s3Url}${filename}`;
        try {
            const { rows } = await db.addProfilePic([
                url,
                req.session.registerId,
            ]);
            res.json({ success: true, url: rows[0] });
        } catch (err) {
            console.log("Error in db.addProfilePic", err);
            res.json({ success: false, errors: [err.message] });
        }
    }
);
app.post("/add-bio", async (req, res) => {
    try {
        const { rows } = await db.addBio([
            req.body.bio,
            req.session.registerId,
        ]);
        res.send({ success: true, bio: rows[0].bio });
    } catch (err) {
        console.log("error in add-bio", err);
    }
});
app.get("/other-user/:id", async (req, res) => {
    const { rows } = await db.getUser([req.params.id]);
    res.json(rows[0]);
});
//////////////////////  FIND USERS  ////////////////////////////

app.get("/new-users", async (req, res) => {
    console.log("get /new-users sanityCheck");
    const { rows } = await db.getNewUsers();
    res.json({ success: true, rows });
});
app.get("/search-users/:input", async (req, res) => {
    console.log("get /search-users sanityCheck", req.params.input);
    try {
        const { rows } = await db.searchUsers([req.params.input + "%"]);
        res.json({ success: true, rows });
    } catch (err) {
        console.log("Error getting users", err);
    }
});
//////////////  FRIEND REQUESTS  /////////////////////////
app.get("/friendship/:id", async (req, res) => {
    try {
        const profileId = Number(req.params.id);
        const userId = req.session.registerId;
        const { rows } = await db.getFriendshipStatus([userId, profileId]);
        console.log("friendship button response", {
            success: true,
            rows,
            userId,
        });
        res.json({ success: true, rows, userId });
    } catch (err) {
        console.log("error in GET /friendship", err);
    }
});
app.post("/friend-request", async (req, res) => {
    const userId = req.session.registerId;
    const { action, recipient_id, accepted } = req.body;
    console.log("POST /friend-request", action, userId, recipient_id);
    try {
        switch (action) {
            case "Add": {
                try {
                    const { rows } = await db.addFriend([userId, recipient_id]);
                    console.log(rows);
                    res.json({ success: true, rows, userId });
                } catch (err) {
                    console.log("Error in acceptFriendRequest", err);
                }
                break;
            }
            case "Cancel": {
                // db.cancelFriendReq
                const { rows } = await db.cancelFriendReq([
                    userId,
                    recipient_id,
                ]);
                res.json({ success: true, rows });
                break;
            }
            case "Accept": {
                // db.acceptFriendReq
                const { rows } = await db.acceptFriendReq([
                    userId,
                    recipient_id,
                ]);
                res.json({ success: true, rows });
                break;
            }
            case "End": {
                //db.endFriendship
                const { rows } = await db.endFriendship([userId, recipient_id]);
                res.json({ success: true });
                break;
            }
        }
    } catch (err) {
        console.log("error in friend request", err);
    }
});
app.get("/friends-and-requests", async (req, res) => {
    console.log("friends-and-requests");
    try {
        const { rows } = await db.getFriendsAndRequests([
            req.session.registerId,
        ]);
        res.json(rows);
    } catch (err) {
        console.log("error in friends-and-requests", err);
    }
});

app.get("/suggested-friends/:otherId", async (req, res) => {
    console.log(req.params);
    const { otherId } = req.params;
    console.log("GET /suggested-friends params", otherId);
    try {
        const { rows } = await db.getOtherProfileFriends([otherId]);
        console.log("ROWS getOtherProfileFriends", rows);
        res.json(rows);
    } catch (err) {
        console.log("Error in /suggested-friends", err);
    }
});
///////////////////////  *  /////////////////////////////////////
app.post("/reset", (req, res) => {
    console.log("/reset", req.session);
    if (!req.session.registerId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.get("*", function (req, res) {
    console.log("*", req.session);

    if (!req.session.registerId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

io.on("connection", async (socket) => {
    console.log(socket.request.session);
    const userId = socket.request.session.registerId;
    console.log("User is logged on", userId);
    if (!userId) {
        return socket.disconnect();
    }
    try {
        // send the chatMessages event to the socket that just connected
        const { rows } = await db.getRecentMsgs();
        io.emit("chatMessages", rows.reverse());
        // the payload must include the 10 most recent messages + associated user info
    } catch (err) {
        console.log("Error in chat", err);
    }

    socket.on("chatMessage", async (data) => {
        // userId is the id of the user who sent this chat message
        console.log("chatMessage socket io", data);

        try {
            const { rows } = await db.addMessage([data, userId]);

            const getMsgData = await db.getMsgData([rows[0].id]);

            const chatMessage = {
                ...getMsgData.rows[0],
            };

            console.log(chatMessage);
            io.emit("chatMessage", chatMessage);
        } catch (err) {
            console.log("Error in socketio getUser", err);
        }
    });
});

server.listen(8080, function () {
    console.log("Server listening at: http://localhost:8080");
});
