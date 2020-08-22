const express = require("express");
const router = express.Router();
const db = require("../utils/db");

router.use(express.json());

router.post("/api/streak", async (req, res) => {
    const {
        title,
        slug,
        description,
        startDate,
        endDate,
        streakLength,
        streak,
    } = req.body.streak;
    console.log("REQ:BODY", req.body);
    const enterStreak = [
        req.session.registerId,
        title,
        slug,
        description,
        startDate,
        endDate,
        streakLength,
        { streak },
    ];
    console.log("ENTER STREAK", enterStreak);
    try {
        const { rows } = await db.addStreak(enterStreak);
        console.log(rows);
        const { id } = rows[0];
        streak.forEach(async (s) => {
            const date = [id, s.dayNumber, s];
            console.log("DATE", date);
            const { rows } = await db.addStreakDate(date);
            console.log("ROWS assStreakDate", rows[0]);
        });
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
router.get("/api/streak/:streak", async (req, res) => {
    try {
        const { streak } = req.params;
        const { data } = await db.getStreaks([req.session.registerId, streak]);
        console.log("GET /api/streak/:streak", streak, data);
    } catch (err) {}
});

module.exports.streakRouter = router;
