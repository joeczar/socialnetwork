const express = require("express");
const router = express.Router();
const db = require("../utils/db");

router.use(express.json());

router.post("/api/streak", async (req, res) => {
    const { title, streak } = req.body;
    try {
        const { rows } = await db.addStreak([
            title,
            streak,
            req.session.registerId,
        ]);
        console.log(rows);
        res.json(rows);
    } catch (err) {
        console.log("Error in /post streak", err);
    }
});
router.get("/api/streaks", async (req, res) => {
    try {
        const { rows } = await db.getStreaks([req.session.registerId]);
        console.log("/API/STREAKS", rows);
        res.json(rows);
    } catch (err) {}
});

module.exports.streakRouter = router;
