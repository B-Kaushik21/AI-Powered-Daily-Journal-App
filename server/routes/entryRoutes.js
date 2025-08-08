const express = require("express");
const router = express.Router();
const Entry = require("../models/Entry");
const auth = require("../middleware/auth");

router.post("/entries", auth, async (req, res) => {
  const { title, content } = req.body;
  const newEntry = new Entry({ title, content, user: req.user.id });
  await newEntry.save();
  res.status(201).json(newEntry);
});

router.get("/entries", auth, async (req, res) => {
  const entries = await Entry.find({ user: req.user.id, deleted: false });
  res.json(entries);
});

router.get("/entries/deleted", auth, async (req, res) => {
  const entries = await Entry.find({ user: req.user.id, deleted: true });
  res.json(entries);
});

router.delete("/entries/:id", auth, async (req, res) => {
  await Entry.findByIdAndUpdate(req.params.id, { deleted: true });
  res.sendStatus(204);
});

router.patch("/restore/:id", auth, async (req, res) => {
  await Entry.findByIdAndUpdate(req.params.id, { deleted: false });
  res.sendStatus(200);
});

module.exports = router;
