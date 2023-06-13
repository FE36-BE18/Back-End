const express = require("express");
const router = express.Router();

const Article = require("../models/Article");

router.get("/", async (req, res) => {
    try {
        const data = await Article.find({});
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({
            status: res.statusCode,
            message: "Error",
        });
    }
})






module.exports = router;