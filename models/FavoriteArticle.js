const mongoose = require("mongoose");

const favoriteArticleSchema = mongoose.Schema({

    user: {
        type: mongoose.ObjectId,
        ref: "User"
    },
    article: {
        type: mongoose.ObjectId,
        ref: "Article",
    },
});

module.exports = mongoose.model("Favorite", favoriteArticleSchema);