const express = require("express");
const router = express.Router();

const Journal = require("../models/Journal");
const { verifyToken, verifyAdmin } = require("./verifyToken");

router.get("/", verifyAdmin, async (req, res) => {
  try {
    await Journal.find({})
      .lean()
      .populate("food")
      .populate("user", "name")
      .then((journal, err) => {
        if (err) {
          res.status(404).json({
            status: res.statusCode,
            message: err.message,
          });
        } else {
          res.status(200).json(journal);
        }
      });
  } catch (error) {
    res.status(400).json({
      status: res.statusCode,
      message: error.message,
    });
  }
});

router.get("/:id", verifyToken, async (req, res) => {
  try {
    const dataJournal = await Journal.findById(req.params.id)
      .populate("food")
      .populate("user", "name")
      .then((journal, err) => {
        if (err) {
          res.status(404).json({
            status: res.statusCode,
            message: "Data not Found",
          });
        } else {
          return journal;
        }
      });
    if (!dataJournal) {
      return res.status(404).json({
        status: res.statusCode,
        message: "Journal not found",
      });
    }
    res.status(200).json(dataJournal);
  } catch (error) {
    res.status(400).json({
      status: res.statusCode,
      message: error.message,
    });
  }
});

router.get("/user/:id", verifyToken, async (req, res) => {
  try {
    const dataJournal = await Journal.find({
      user: req.params.id,
    })
      .populate("food")
      .populate("user", "name")
      .then((journal, err) => {
        if (err) {
          res.status(404).json({
            status: res.statusCode,
            message: err.message,
          });
        } else {
          return journal;
        }
      });
    if (!dataJournal) {
      return res.status(404).json({
        status: res.statusCode,
        message: "Journal not found",
      });
    }
    res.status(200).json(dataJournal);
  } catch (error) {
    res.status(400).json({
      status: res.statusCode,
      message: error.message,
    });
  }
});

router.post("/user", verifyToken, async (req, res) => {
  const { user, food, qty, date } = req.body;

  // create category
  const journal = new Journal({
    user: user,
    food: food,
    qty: qty,
    date: Date.now(),
  });
  try {
    const saveJournal = await journal.save();
    res.json(saveJournal);
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
});

router.put("/:id", verifyToken, async (req, res) => {
  const { food, qty, date } = req.body;

  try {
    await Journal.findByIdAndUpdate(req.params.id, {
      food: food,
      qty: qty,
      date: date,
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

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const data = await Journal.findById(req.params.id);
    if (!data) {
      res.status(404).json({
        status: statusCode,
        message: "Journal not found",
      });
    }
    await Journal.deleteOne({
      _id: req.params.id,
    }).then(
      res.status(200).json({
        status: res.statusCode,
        message: "Successfully deleted journal",
      })
    );
  } catch (error) {
    return res.status(404).json({
      status: res.statusCode,
      message: "Journal not found",
    });
  }
});

router.delete("/user/:userId", verifyToken, async (req, res) => {
  try {
    const data = await Journal.find({ user: req.params.userId });
    if (!data) {
      res.status(404).json({
        status: statusCode,
        message: "User not found",
      });
    }
    await Journal.deleteMany({
      user: req.params.userId,
    }).then(
      res.status(200).json({
        status: res.statusCode,
        message: "Successfully deleted journal",
      })
    );
  } catch (error) {
    return res.status(404).json({
      status: res.statusCode,
      message: "User not found",
    });
  }
});

module.exports = router;
