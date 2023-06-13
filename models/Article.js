const mongoose = require("mongoose");

const articleSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        max: 255,
    },
    date: {
        type: Date,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Article", articleSchema);