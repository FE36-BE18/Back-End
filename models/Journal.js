const mongoose = require("mongoose");

const journalSchema = mongoose.Schema({
  user: {
    type: mongoose.ObjectId,
    ref: "User",
    required: true,
  },
  food: {
    type: mongoose.ObjectId,
    ref: "Food",
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Journal", journalSchema);
