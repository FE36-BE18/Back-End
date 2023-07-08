const express = require("express");
const router = express.Router();

const Food = require("../models/Food");
const { verifyAdmin } = require("./verifyToken");

router.get("/", async (req, res) => {
  try {
    await Food.find({})
      .lean()
      .populate("calLevel", "level")
      .populate("category", "name")
      .then((food, err) => {
        if (err) {
          res.status(404).json({
            status: res.statusCode,
            message: err.message,
          });
        } else {
          res.status(200).json(food);
        }
      });
  } catch (error) {
    res.status(400).json({
      status: res.statusCode,
      message: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const dataFood = await Food.findById(req.params.id)
      .populate("calLevel", "level")
      .populate("category", "name")
      .then((food, err) => {
        if (err) {
          res.status(404).json({
            status: res.statusCode,
            message: err.message,
          });
        } else {
          return food;
        }
      });
    if (!dataFood) {
      return res.status(404).json({
        status: res.statusCode,
        message: "Food not found",
      });
    }
    res.status(200).json(dataFood);
  } catch (error) {
    res.status(400).json({
      status: res.statusCode,
      message: error.message,
    });
  }
});
router.get("/level/:id", async (req, res) => {
  try {
    const dataFood = await Food.find({ calLevel: req.params.id })
      .populate("calLevel", "level")
      .populate("category", "name")
      .then((food, err) => {
        if (err) {
          res.status(404).json({
            status: res.statusCode,
            message: err.message,
          });
        } else {
          return food;
        }
      });
    if (!dataFood) {
      return res.status(404).json({
        status: res.statusCode,
        message: "Food not found",
      });
    }
    res.status(200).json(dataFood);
  } catch (error) {
    res.status(400).json({
      status: res.statusCode,
      message: error.message,
    });
  }
});

router.post("/", verifyAdmin, async (req, res) => {
  const { name, img, calory, proteins, carbo, fat, carbon, calLevel, category } = req.body;

  // create category
  const food = new Food({
    name: name,
    img: img,
    calory: calory,
    proteins: proteins,
    carbo: carbo,
    fat: fat,
    carbon: carbon,
    calLevel: calLevel,
    category: category,
  });
  try {
    const saveFood = await food.save();
    res.json(saveFood);
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
});

// update food by id
router.put("/:id", verifyAdmin, async (req, res) => {
  const { name, img, calory, proteins, carbo, fat, carbon, calLevel, category } = req.body;

  try {
    await Food.findByIdAndUpdate(req.params.id, {
      name: name,
      img: img,
      calory: calory,
      proteins: proteins,
      carbo: carbo,
      fat: fat,
      carbon: carbon,
      calLevel: calLevel,
      category: category,
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
    const data = await Food.findById(req.params.id);
    if (!data) {
      res.status(404).json({
        status: statusCode,
        message: "Food not found",
      });
    }
    await Food.deleteOne({
      _id: req.params.id,
    }).then(
      res.status(200).json({
        status: res.statusCode,
        message: "Successfully deleted food",
      })
    );
  } catch (error) {
    return res.status(404).json({
      status: res.statusCode,
      message: "Food not found",
    });
  }
});

module.exports = router;
