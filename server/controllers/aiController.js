const { validationResult } = require('express-validator');
const Entry = require('../models/Entry');

// Writing prompts for different moods and situations
const writingPrompts = {
  gratitude: [
    "What are three things that made you smile today?",
    "Write about someone who has positively impacted your life recently.",
    "What's something beautiful you noticed today that you're grateful for?",
    "Describe a moment today when you felt truly happy and content.",
    "What's something you're looking forward to that fills you with excitement?"
  ],
  reflection: [
    "How have you grown as a person in the last month?",
    "What's a challenge you faced recently and how did you handle it?",
    "What would you tell your past self from a year ago?",
    "What's something you've learned about yourself recently?",
    "How do you want to be remembered by the people in your life?"
  ],
  creativity: [
    "If you could have dinner with anyone from history, who would it be and why?",
    "Write about your perfect day from start to finish.",
    "What's a dream you have that you haven't shared with anyone?",
    "Describe a place that makes you feel completely at peace.",
    "What would you do if you had unlimited resources and time?"
  ],
  daily: [
    "What's the highlight of your day so far?",
    "What's something you're looking forward to tomorrow?",
    "How are you feeling right now, and what's contributing to that feeling?",
    "What's one thing you'd like to improve about today?",
    "What made you laugh today?"
  ]
};

// Mood analysis keywords
const moodKeywords = {
  positive: ['happy', 'joy', 'excited', 'grateful', 'blessed', 'wonderful', 'amazing', 'love', 'beautiful', 'fantastic', 'great', 'good', 'awesome', 'perfect', 'delighted', 'thrilled', 'content', 'peaceful', 'calm', 'relaxed'],
  negative: ['sad', 'angry', 'frustrated', 'anxious', 'worried', 'stressed', 'tired', 'exhausted', 'overwhelmed', 'disappointed', 'hurt', 'lonely', 'scared', 'nervous', 'depressed', 'upset', 'mad', 'annoyed', 'irritated', 'confused'],
  neutral: ['okay', 'fine', 'normal', 'alright', 'stable', 'balanced', 'centered', 'focused', 'determined', 'motivated', 'productive', 'busy', 'active', 'energetic']
};

// AI response templates
const aiResponses = {
  greetings: [
    "Hello there! I'm here to help you with your journaling journey. How can I assist you today? ✨",
    "Hi! Ready to explore your thoughts and feelings together? What's on your mind? 🌟",
    "Welcome back! I'm excited to help you reflect and grow through journaling. What would you like to work on? 💫"
  ],
  writingHelp: [
    "That's a great topic to explore! Try starting with how it makes you feel, then dive deeper into the details. Remember, there are no wrong answers in journaling! 📝",
    "I love that you want to write about this! Consider asking yourself 'why' questions to dig deeper into your thoughts and emotions. 💭",
    "Perfect journaling material! Start with the surface details, then let your thoughts flow naturally. Your authentic voice is what makes your journal special! ✨"
  ],
  moodSupport: [
    "It sounds like you're going through a lot right now. Remember that it's okay to feel this way, and writing about it can be really therapeutic. You're doing great! 💕",
    "I hear you, and your feelings are completely valid. Journaling can help you process these emotions. Would you like to explore this further? 🌸",
    "Thank you for sharing that with me. Sometimes just putting our thoughts on paper can bring clarity and peace. You're not alone in this! 💖"
  ],
  encouragement: [
    "You're doing amazing! Every entry you write is a step toward self-discovery and growth. Keep going! 🌟",
    "I'm so proud of your commitment to journaling! Your dedication to self-reflection is truly inspiring. ✨",
    "You have such a beautiful way of expressing yourself! Your journal entries are a testament to your growth and wisdom. 💫"
  ]
};

// Helper function to analyze text sentiment
const analyzeSentiment = (text) => {
  const words = text.toLowerCase().split(/\s+/);
  let positiveCount = 0;
  let negativeCount = 0;
  let neutralCount = 0;

  words.forEach(word => {
    if (moodKeywords.positive.includes(word)) positiveCount++;
    else if (moodKeywords.negative.includes(word)) negativeCount++;
    else if (moodKeywords.neutral.includes(word)) neutralCount++;
  });

  if (positiveCount > negativeCount) return 'positive';
  if (negativeCount > positiveCount) return 'negative';
  return 'neutral';
};

// Helper function to get random response from array
const getRandomResponse = (responses) => {
  return responses[Math.floor(Math.random() * responses.length)];
};

// Helper function to generate contextual response
const generateContextualResponse = (message, userEntries = []) => {
  const lowerMessage = message.toLowerCase();
  
  // Check for specific keywords and intents
  if (lowerMessage.includes('prompt') || lowerMessage.includes('write about') || lowerMessage.includes('what should i write')) {
    const categories = Object.keys(writingPrompts);
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const prompts = writingPrompts[randomCategory];
    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    return `Here's a writing prompt for you: "${randomPrompt}"\n\nThis prompt is designed to help you explore your thoughts and feelings. Take your time with it and let your thoughts flow naturally! ✨`;
  }
  
  if (lowerMessage.includes('mood') || lowerMessage.includes('feel') || lowerMessage.includes('emotion')) {
    if (userEntries.length > 0) {
      const recentEntries = userEntries.slice(0, 5);
      const allContent = recentEntries.map(entry => `${entry.title} ${entry.content}`).join(' ');
      const sentiment = analyzeSentiment(allContent);
      
      if (sentiment === 'positive') {
        return "Based on your recent entries, I can see you've been in a positive and uplifting mood! Your writing reflects joy, gratitude, and optimism. Keep embracing those beautiful feelings! 🌟";
      } else if (sentiment === 'negative') {
        return "I notice your recent entries have been more challenging. Remember that it's completely normal to have difficult days, and writing about them is a healthy way to process. You're doing great! 💕";
      } else {
        return "Your recent entries show a balanced and reflective mood. You seem to be in a thoughtful, contemplative space. This is a wonderful place for growth and self-discovery! ✨";
      }
    } else {
      return "I'd love to help you analyze your mood! As you write more entries, I'll be able to provide insights about your emotional patterns and growth. For now, how are you feeling today? 💭";
    }
  }
  
  if (lowerMessage.includes('gratitude') || lowerMessage.includes('thankful') || lowerMessage.includes('blessed')) {
    return getRandomResponse(writingPrompts.gratitude) + "\n\nGratitude journaling is such a powerful practice! It helps us focus on the positive and appreciate the beauty in our lives. 💖";
  }
  
  if (lowerMessage.includes('help') || lowerMessage.includes('assist') || lowerMessage.includes('support')) {
    return "I'm here to help you with your journaling journey! I can provide writing prompts, analyze your mood patterns, help you reflect on your entries, or just chat about your day. What would be most helpful for you right now? 🌸";
  }
  
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return getRandomResponse(aiResponses.greetings);
  }
  
  // Default encouraging response
  return getRandomResponse(aiResponses.encouragement) + "\n\nIs there anything specific you'd like to explore in your journal today? I'm here to support you! 💫";
};

// @desc    Chat with AI assistant
// @route   POST /api/ai/chat
// @access  Private
const chatWithAI = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: errors.array()
    });
  }

  try {
    const { message } = req.body;
    
    // Get user's recent entries for context
    const recentEntries = await Entry.find({ user: req.userId })
      .sort({ date: -1 })
      .limit(5)
      .select('title content');
    
    // Generate contextual response
    const response = generateContextualResponse(message, recentEntries);
    
    res.json({
      response,
      timestamp: new Date()
    });
  } catch (error) {
    console.error('AI chat error:', error);
    res.status(500).json({
      message: 'Sorry, I\'m having trouble processing your request right now. Please try again! 😔'
    });
  }
};

// @desc    Get writing prompts
// @route   GET /api/ai/prompts
// @access  Private
const getWritingPrompts = async (req, res) => {
  try {
    const { category = 'daily' } = req.query;
    const prompts = writingPrompts[category] || writingPrompts.daily;
    
    res.json({
      prompts,
      category,
      totalPrompts: prompts.length
    });
  } catch (error) {
    console.error('Get prompts error:', error);
    res.status(500).json({
      message: 'Failed to fetch writing prompts'
    });
  }
};

// @desc    Analyze mood from recent entries
// @route   POST /api/ai/analyze-mood
// @access  Private
const analyzeMood = async (req, res) => {
  try {
    const recentEntries = await Entry.find({ user: req.userId })
      .sort({ date: -1 })
      .limit(10)
      .select('title content date');
    
    if (recentEntries.length === 0) {
      return res.json({
        message: "I don't have enough entries to analyze your mood yet. Keep writing and I'll be able to provide insights! ✨",
        sentiment: 'neutral',
        entryCount: 0
      });
    }
    
    const allContent = recentEntries.map(entry => `${entry.title} ${entry.content}`).join(' ');
    const sentiment = analyzeSentiment(allContent);
    
    let analysis = '';
    if (sentiment === 'positive') {
      analysis = "Your recent entries show a positive and uplifting mood! You've been expressing joy, gratitude, and optimism. This is wonderful energy to carry forward! 🌟";
    } else if (sentiment === 'negative') {
      analysis = "I notice your recent entries have been more challenging. Remember that difficult emotions are part of being human, and writing about them is a healthy way to process. You're doing great! 💕";
    } else {
      analysis = "Your recent entries show a balanced and reflective mood. You seem to be in a thoughtful, contemplative space. This is a wonderful place for growth and self-discovery! ✨";
    }
    
    res.json({
      analysis,
      sentiment,
      entryCount: recentEntries.length,
      dateRange: {
        from: recentEntries[recentEntries.length - 1].date,
        to: recentEntries[0].date
      }
    });
  } catch (error) {
    console.error('Mood analysis error:', error);
    res.status(500).json({
      message: 'Failed to analyze mood'
    });
  }
};

// @desc    Get journal insights
// @route   GET /api/ai/insights
// @access  Private
const getJournalInsights = async (req, res) => {
  try {
    const totalEntries = await Entry.countDocuments({ user: req.userId });
    const recentEntries = await Entry.find({ user: req.userId })
      .sort({ date: -1 })
      .limit(5);
    
    if (totalEntries === 0) {
      return res.json({
        message: "Welcome to your journaling journey! Start writing your first entry and I'll provide insights as you grow! ✨",
        totalEntries: 0,
        insights: []
      });
    }
    
    const insights = [];
    
    // Writing frequency insight
    if (totalEntries >= 5) {
      insights.push("You're building a wonderful journaling habit! Your consistency shows dedication to self-reflection and growth. 🌟");
    }
    
    // Content length insight
    const avgContentLength = recentEntries.reduce((sum, entry) => sum + entry.content.length, 0) / recentEntries.length;
    if (avgContentLength > 200) {
      insights.push("You're a deep thinker! Your detailed entries show thoughtful reflection and self-awareness. 💭");
    }
    
    // Recent activity insight
    const lastEntry = recentEntries[0];
    const daysSinceLastEntry = Math.floor((new Date() - lastEntry.date) / (1000 * 60 * 60 * 24));
    if (daysSinceLastEntry <= 1) {
      insights.push("You're actively engaging with your thoughts! Your recent entries show you're prioritizing self-reflection. ✨");
    }
    
    res.json({
      totalEntries,
      insights,
      lastEntryDate: lastEntry.date,
      daysSinceLastEntry
    });
  } catch (error) {
    console.error('Get insights error:', error);
    res.status(500).json({
      message: 'Failed to get journal insights'
    });
  }
};

module.exports = {
  chatWithAI,
  getWritingPrompts,
  analyzeMood,
  getJournalInsights
};
