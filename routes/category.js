const express = require("express");
const router = express.Router();

const Category = require("../models/Category");
const { verifyAdmin } = require("./verifyToken");

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

router.get("/:id", async (req, res) => {
  try {
    const data = await Category.findById(req.params.id);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({
      status: res.statusCode,
      message: "Error",
    });
  }
});

router.post("/", verifyAdmin, async (req, res) => {
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

// update category by id
router.put("/:id", async (req, res) => {
  const { name } = req.body;

  try {
    if (name == null) {
      return res.status(400).json({
        status: res.statusCode,
        message: "Data cannot be empty",
      });
    }

    await Category.findByIdAndUpdate(req.params.id, {
      name: name,
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
    const data = await Category.findById(req.params.id);
    if (!data) {
      res.status(404).json({
        status: statusCode,
        message: "Category not found",
      });
    }
    await Category.deleteOne({
      _id: req.params.id,
    }).then(
      res.status(200).json({
        status: res.statusCode,
        message: "Successfully deleted category",
      })
    );
  } catch (error) {
    return res.status(404).json({
      status: res.statusCode,
      message: "Category not found",
    });
  }
});

module.exports = router;
