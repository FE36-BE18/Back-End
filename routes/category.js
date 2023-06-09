const express = require("express");
const router = express.Router();

const Category = require("../models/Category");

router.get("/", async (req, res) => {
  try {
    const data = await Category.find({});
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({
      status: res.statusCode,
      message: "Error",
    });
  }
});

router.post("/", async (req, res) => {
  const { name } = req.body;

  // create category
  const category = new Category({
    name: name,
  });
  try {
    const saveCategory = await category.save();
    res.json(saveCategory);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create category",
    });
  }
});

module.exports = router;
