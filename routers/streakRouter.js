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

        res.json(rows);
    } catch (err) {}
});
router.get("/api/streak/:streak", async (req, res) => {
    try {
        const { streak } = req.params;
        const { rows } = await db.getStreak([req.session.registerId, streak]);
        res.json(rows[0]);
    } catch (err) {
        console.log("error in /api/streak/:streak", err);
    }
});
router.get("/api/streak-dates/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { rows } = await db.getDates([id]);

        res.json(rows);
    } catch (err) {
        console.log("Error in GET /api/streak-dates/:id", err);
    }
});
router.get("/api/streak-day/:streakId/:day", async (req, res) => {
    try {
        const { streakId, day } = req.params;
        const { rows } = await db.getStreakDay([streakId, day]);
        res.json(rows[0]);
    } catch (err) {
        console.log("Error in /api/streak-day/:streak/:day", err);
    }
});
router.post("/api/save-note", async (req, res) => {
    try {
        const { id, note } = req.body;
        console.log(id, note);
        const { rows } = await db.updateNote([id, note]);
        res.json(rows[0]);
        console.log(id, note, rows[0]);
    } catch (err) {
        console.log("error in /api/save-note", err);
    }
});
module.exports.streakRouter = router;
