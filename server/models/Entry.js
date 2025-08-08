const mongoose = require("mongoose");

const entrySchema = new mongoose.Schema({
  title: String,
  content: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  deleted: { type: Boolean, default: false },
});

module.exports = mongoose.model("Entry", entrySchema);