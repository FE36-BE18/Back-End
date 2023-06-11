const mongoose = require("mongoose");

const foodSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    max: 255,
  },
  img: {
    type: String,
    required: false,
  },
  calory: {
    type: Number,
    required: true,
  },
  proteins: {
    type: Number,
    required: true,
  },
  carbo: {
    type: Number,
    required: true,
  },
  fat: {
    type: Number,
    required: true,
  },
  carbon: {
    type: Number,
    required: true,
  },
  calLevel: {
    type: mongoose.ObjectId,
    ref: "Level",
  },
  category: {
    type: mongoose.ObjectId,
    ref: "Category",
  },
});

module.exports = mongoose.model("Food", foodSchema);
