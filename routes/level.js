const express = require("express");
const router = express.Router();

const Level = require("../models/Level");
const { verifyAdmin } = require("./verifyToken");

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

router.get("/:id", async (req, res) => {
  try {
    const data = await Level.findById(req.params.id);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({
      status: res.statusCode,
      message: error.message,
    });
  }
});

router.post("/", verifyAdmin, async (req, res) => {
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

// update level by id
router.put("/:id", async (req, res) => {
  const { level } = req.body;

  try {
    if (level == null) {
      return res.status(400).json({
        status: res.statusCode,
        message: "Data cannot be empty",
      });
    }

    await Level.findByIdAndUpdate(req.params.id, {
      level: level,
    }).then(
      res.status(200).json({
        status: res.statusCode,
        message: "Success",
      })
    );
  } catch (error) {
    res.status(400).json({
      status: res.statusCode,
      message: "Error when update data",
    });
  }
});

router.delete("/:id", verifyAdmin, async (req, res) => {
  try {
    const data = await Level.findById(req.params.id);
    if (!data) {
      res.status(404).json({
        status: statusCode,
        message: "Level not found",
      });
    }
    await Level.deleteOne({
      _id: req.params.id,
    }).then(
      res.status(200).json({
        status: res.statusCode,
        message: "Successfully deleted level",
      })
    );
  } catch (error) {
    return res.status(404).json({
      status: res.statusCode,
      message: "Level not found",
    });
  }
});

module.exports = router;
