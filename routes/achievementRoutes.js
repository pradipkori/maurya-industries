const express = require("express");
const router = express.Router();
const Achievement = require("../models/Achievement");

// GET all
router.get("/", async (req, res) => {
  const achievements = await Achievement.find().sort({ year: -1 });
  res.json({ success: true, achievements });
});

// POST (admin)
router.post("/", async (req, res) => {
  const achievement = await Achievement.create(req.body);
  res.json({ success: true, achievement });
});

// PUT
router.put("/:id", async (req, res) => {
  await Achievement.findByIdAndUpdate(req.params.id, req.body);
  res.json({ success: true });
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Achievement.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
