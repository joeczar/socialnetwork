const express = require("express");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");
const { hash, compare } = require("./utils/bc");
const csurf = require("csurf");
const { COOKIE_SESSION } = require("./secrets.json");
const {
    registerValidate,
    loginValidate,
    validate,
} = require("./utils/validatorRules");
const db = require("./utils/db");

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
app.post("/register", registerValidate, async (req, res) => {
    // use hash here  registerValidate(),
    // console.log("POST register", req.session);
    console.log("register", req.body);
    // console.log(req);
    const errors = [...validate(req)];
    try {
        const hashed = await hash(req.body.pass);
        const { first, last, email } = req.body;
        const usrArr = [first, last, email, hashed];

        if (errors.length > 0) {
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
