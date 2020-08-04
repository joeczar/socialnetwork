const express = require("express");
const app = express();
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
app.use(
    cookieSession({
        secret: COOKIE_SESSION,
        maxAge: 1000 * 60 * 60 * 24 * 14,
    })
);

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
            req.session.name = { first, last };
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
    const { email, pass } = req.body;
    const errors = [...validate(req)];
    if (errors.length > 0) {
        res.json({ success: false, errors });
    } else {
        try {
            const { rows } = await db.getUserByEmail([email]);
            const { id, first, last, hash } = rows[0];
            const match = await compare(pass, hash);
            if (match) {
                req.session.registerId = id;

                res.json({ success: true, name: { first, last } });

                return;
            } else {
                errors.push("That email/password didn't work");
                res.json({ success: false });
                return;
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
            console.log(data);

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
    console.log("post /entercode sanityCheck", req.body);
    const { code, password, email } = req.body;
    try {
        const data = await redisGet(code);
        console.log("entercode redis response", data, email);
        if (data == email) {
            // hash password
            const hashed = await hash(password);
            console.log(hashed);
            // store new password
            const { rows } = await db.updatePassword([
                hashed,
                req.session.registerId,
            ]);
            console.log(rows);
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
    console.log("post /add-bio sanityCheck", req.body);
    try {
        const { rows } = await db.addBio([
            req.body.bio,
            req.session.registerId,
        ]);
        console.log("add-bio rows", rows);
        res.send({ success: true, bio: rows[0].bio });
    } catch (err) {
        console.log("error in add-bio", err);
    }
});
app.get("/other-user/:id", async (req, res) => {
    const {rows} = await db.getUser([req.params.id])
    res.json(rows[0])

}
)
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

// app.get('*', function(req, res) {
//     res.sendFile(__dirname + '/index.html');
// });

app.listen(8080, function () {
    console.log("Server listening at: http://localhost:8080");
});
