const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const asyncHandler = require('express-async-handler');
const authMiddleware = require('../middleware/authMiddleware');
const aiController = require('../controllers/aiController');

// Validation middleware
const chatValidation = [
  body('message')
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage('Message must be between 1 and 1000 characters')
];

// @desc    Chat with AI assistant
// @route   POST /api/ai/chat
// @access  Private
router.post('/chat', authMiddleware, chatValidation, asyncHandler(aiController.chatWithAI));

// @desc    Get writing prompts
// @route   GET /api/ai/prompts
// @access  Private
router.get('/prompts', authMiddleware, asyncHandler(aiController.getWritingPrompts));

// @desc    Analyze mood from recent entries
// @route   POST /api/ai/analyze-mood
// @access  Private
router.post('/analyze-mood', authMiddleware, asyncHandler(aiController.analyzeMood));

// @desc    Get journal insights
// @route   GET /api/ai/insights
// @access  Private
router.get('/insights', authMiddleware, asyncHandler(aiController.getJournalInsights));

module.exports = router;
