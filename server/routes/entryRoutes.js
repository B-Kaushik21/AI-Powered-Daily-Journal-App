const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const Entry = require("../models/Entry");
const authMiddleware = require("../middleware/authMiddleware");

// ----------------------
// Validation middleware
// ----------------------
const entryValidation = [
  body("title")
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage("Title must be between 1 and 200 characters"),
  body("content")
    .trim()
    .isLength({ min: 1, max: 10000 })
    .withMessage("Content must be between 1 and 10,000 characters"),
];

// ----------------------
// Routes
// ----------------------

// @desc    Get all entries for a user (with pagination)
// @route   GET /api/entries
// @access  Private
router.get(
  "/",
  authMiddleware,
  asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const entries = await Entry.find({ user: req.userId })
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Entry.countDocuments({ user: req.userId });

    res.json({
      entries,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalEntries: total,
        hasNextPage: page * limit < total,
        hasPrevPage: page > 1,
      },
    });
  })
);

// @desc    Search entries
// @route   GET /api/entries/search?q=keyword
// @access  Private
router.get(
  "/search",
  authMiddleware,
  asyncHandler(async (req, res) => {
    const { q } = req.query;
    if (!q || q.trim().length === 0) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const searchRegex = new RegExp(q.trim(), "i");

    const entries = await Entry.find({
      user: req.userId,
      $or: [{ title: searchRegex }, { content: searchRegex }],
    })
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Entry.countDocuments({
      user: req.userId,
      $or: [{ title: searchRegex }, { content: searchRegex }],
    });

    res.json({
      entries,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalEntries: total,
        hasNextPage: page * limit < total,
        hasPrevPage: page > 1,
      },
      searchQuery: q,
    });
  })
);

// @desc    Get a single entry by ID
// @route   GET /api/entries/:id
// @access  Private
router.get(
  "/:id",
  authMiddleware,
  asyncHandler(async (req, res) => {
    try {
      const entry = await Entry.findOne({
        _id: req.params.id,
        user: req.userId,
      });

      if (!entry) {
        return res.status(404).json({ message: "Entry not found" });
      }

      res.json({ entry });
    } catch (error) {
      if (error.kind === "ObjectId") {
        return res.status(400).json({ message: "Invalid entry ID" });
      }
      throw error;
    }
  })
);

// @desc    Create a new entry
// @route   POST /api/entries
// @access  Private
router.post(
  "/",
  authMiddleware,
  entryValidation,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: "Validation failed", errors: errors.array() });
    }

    const { title, content } = req.body;

    const newEntry = new Entry({
      user: req.userId,
      title,
      content,
    });

    await newEntry.save();
    res.status(201).json({ entry: newEntry });
  })
);

// @desc    Update an entry
// @route   PUT /api/entries/:id
// @access  Private
router.put(
  "/:id",
  authMiddleware,
  entryValidation,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: "Validation failed", errors: errors.array() });
    }

    const { title, content } = req.body;

    try {
      const entry = await Entry.findOne({
        _id: req.params.id,
        user: req.userId,
      });

      if (!entry) {
        return res.status(404).json({ message: "Entry not found" });
      }

      entry.title = title;
      entry.content = content;
      entry.date = new Date();

      await entry.save();
      res.json({ entry });
    } catch (error) {
      if (error.kind === "ObjectId") {
        return res.status(400).json({ message: "Invalid entry ID" });
      }
      throw error;
    }
  })
);

// @desc    Delete an entry
// @route   DELETE /api/entries/:id
// @access  Private
router.delete(
  "/:id",
  authMiddleware,
  asyncHandler(async (req, res) => {
    try {
      const entry = await Entry.findOne({
        _id: req.params.id,
        user: req.userId,
      });

      if (!entry) {
        return res.status(404).json({ message: "Entry not found" });
      }

      await Entry.findByIdAndDelete(req.params.id);
      res.json({ message: "Entry deleted successfully" });
    } catch (error) {
      if (error.kind === "ObjectId") {
        return res.status(400).json({ message: "Invalid entry ID" });
      }
      throw error;
    }
  })
);

module.exports = router;
