const mongoose = require('mongoose');

const EntrySchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: [true, 'User ID is required'],
    index: true
  },
  title: { 
    type: String, 
    required: [true, 'Title is required'],
    trim: true,
    minlength: [1, 'Title cannot be empty'],
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  content: { 
    type: String, 
    required: [true, 'Content is required'],
    trim: true,
    minlength: [1, 'Content cannot be empty'],
    maxlength: [10000, 'Content cannot exceed 10,000 characters']
  },
  date: { 
    type: Date, 
    default: Date.now,
    index: true
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true,
    maxlength: 50
  }],
  mood: {
    type: String,
    enum: ['happy', 'sad', 'excited', 'calm', 'anxious', 'grateful', 'frustrated', 'inspired', 'tired', 'energetic', 'neutral'],
    default: 'neutral'
  },
  isPrivate: {
    type: Boolean,
    default: false
  },
  wordCount: {
    type: Number,
    default: 0
  },
  readingTime: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for formatted date
EntrySchema.virtual('formattedDate').get(function() {
  return this.date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
});

// Virtual for relative time (e.g., "2 hours ago")
EntrySchema.virtual('relativeTime').get(function() {
  const now = new Date();
  const diffTime = Math.abs(now - this.date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 1) return 'Today';
  if (diffDays === 2) return 'Yesterday';
  if (diffDays <= 7) return `${diffDays - 1} days ago`;
  if (diffDays <= 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays <= 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
});

// Pre-save middleware to calculate word count and reading time
EntrySchema.pre('save', function(next) {
  if (this.isModified('content')) {
    // Calculate word count
    this.wordCount = this.content.trim().split(/\s+/).filter(word => word.length > 0).length;
    
    // Calculate reading time (average 200 words per minute)
    this.readingTime = Math.ceil(this.wordCount / 200);
  }
  next();
});

// Method to get entry summary
EntrySchema.methods.getSummary = function() {
  const words = this.content.split(' ');
  const summary = words.slice(0, 50).join(' ');
  return summary + (words.length > 50 ? '...' : '');
};

// Static method to get user's entry statistics
EntrySchema.statics.getUserStats = async function(userId) {
  const stats = await this.aggregate([
    { $match: { user: mongoose.Types.ObjectId(userId) } },
    {
      $group: {
        _id: null,
        totalEntries: { $sum: 1 },
        totalWords: { $sum: '$wordCount' },
        totalReadingTime: { $sum: '$readingTime' },
        averageWordsPerEntry: { $avg: '$wordCount' },
        averageReadingTime: { $avg: '$readingTime' }
      }
    }
  ]);
  
  return stats[0] || {
    totalEntries: 0,
    totalWords: 0,
    totalReadingTime: 0,
    averageWordsPerEntry: 0,
    averageReadingTime: 0
  };
};

// Indexes for better query performance
EntrySchema.index({ user: 1, date: -1 });
EntrySchema.index({ user: 1, title: 'text', content: 'text' });
EntrySchema.index({ user: 1, mood: 1 });
EntrySchema.index({ user: 1, tags: 1 });

module.exports = mongoose.model('Entry', EntrySchema);
