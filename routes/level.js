const express = require("express");
const router = express.Router();

const Level = require("../models/Level");

router.get("/", async (req, res) => {
  try {
    const data = await Level.find({});
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({
      status: res.statusCode,
      message: "Error",
    });
  }
});

router.post("/", async (req, res) => {
  const { level } = req.body;

  // create level
  const data = new Level({
    level: level,
  });
  try {
    const saveLevel = await data.save();
    res.json(saveLevel);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create level",
    });
  }
});

module.exports = router;
