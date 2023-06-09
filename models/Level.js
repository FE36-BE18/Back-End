const mongoose = require("mongoose");

const calLevelSchema = mongoose.Schema({
  level: {
    type: String,
    required: true,
    max: 255,
  },
});

module.exports = mongoose.model("Level", calLevelSchema);
