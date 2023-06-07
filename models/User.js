const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    max: 100,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
  },
  gender: {
    type: String,
    required: true,
    min: 1,
    max: 1,
  },
  role: {
    type: String,
    required: true,
    max: 100,
  },
});

module.exports = mongoose.model("User", userSchema);
