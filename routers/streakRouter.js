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
    ];

    try {
        const { rows } = await db.addStreak(enterStreak);
        console.log(rows);
        const { id } = rows[0];
        streak.forEach(async (s) => {
            const date = [id, s.dayNumber, s];

            const { rows } = await db.addStreakDate(date);
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
    console.log("in /api/streak/:streak", req.params);
    try {
        const { streak } = req.params;
        const { rows } = await db.getStreak([req.session.registerId, streak]);
        res.json(rows[0]);
    } catch (err) {
        console.log("error in /api/streak/:streak", err);
    }
});
router.get("/api/streak-dates/:id", async (req, res) => {
    console.log("GET /api/streak-dates/:id", req.params);
    try {
        const { id } = req.params;
        const { rows } = await db.getDates([id]);
        console.log("GET /api/streak-dates/:id, rows", rows, id);
        res.json(rows);
    } catch (err) {
        console.log("Error in GET /api/streak-dates/:id", err);
    }
});
module.exports.streakRouter = router;
