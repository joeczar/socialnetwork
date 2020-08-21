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
router.get("/api/streak/:streak", async (req, res) => {
    try {
        const { streak } = req.params;
        const { data } = await db.getStreaks([req.session.registerId, streak]);
        console.log("GET /api/streak/:streak", streak, data);
    } catch (err) {}
});

module.exports.streakRouter = router;
