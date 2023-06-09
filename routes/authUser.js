const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// import validation
const { registerValidation } = require("../configs/validation");

// import models
const User = require("../models/User");
const { verifyToken } = require("./verifyToken");

// validateUser
const validateUserRegister = async (req, res, next) => {
  const { email } = req.body;
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).json({
      status: res.statusCode,
      message: error.details[0].message,
    });
  }
  // if email exist
  const emailExist = await User.findOne({ email: email });

  if (emailExist) {
    return res.status(400).json({
      status: res.statusCode,
      message: "Email has been used",
    });
  }
  next();
};

// Register
router.post("/register", validateUserRegister, async (req, res) => {
  const { name, email, password, gender } = req.body;

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  // create user
  const user = new User({
    name: name,
    email: email,
    password: hashPassword,
    gender: gender,
    role: "user",
  });
  try {
    const saveUser = await user.save();
    res.json(saveUser);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create user",
    });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  // if email exist
  const user = await User.findOne({
    email: email,
  });
  if (!user) {
    return res.status(400).json({
      status: res.statusCode,
      message: "Invalid Email",
    });
  }

  // check password
  const validPwd = await bcrypt.compare(password, user.password);
  if (!validPwd) {
    return res.status(400).json({
      status: res.statusCode,
      message: "Invalid Password",
    });
  }

  // create token
  const token = jwt.sign(
    {
      _id: user._id,
      iss: "skilvul",
      aud: "frontend",
      exp: parseInt(new Date().getTime() / 1000 + 12 * 60 * 60),
      role: user.role,
    },
    process.env.SECRET_KEY
  );
  res.header("authuser", token).json({
    id: user._id,
    token: token,
  });
});

// get user by id
router.get("/:id", async (req, res) => {
  try {
    const data = await User.findById(req.params.id);

    if (!data) {
      return res.status(404).json({
        status: res.statusCode,
        message: "User not found",
      });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({
      status: res.statusCode,
      message: "Error",
    });
  }
});

// update user by id
router.put("/:id", verifyToken, async (req, res) => {
  const { name, password, gender } = req.body;
  try {
    if (name == "" || password == "" || gender == "") {
      return res.status(400).json({
        status: res.statusCode,
        message: "Data cannot be empty",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    await User.findByIdAndUpdate(req.params.id, {
      name: name,
      password: hashPassword,
      gender: gender,
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
    const data = await User.findById(req.params.id);
    if (!data) {
      res.status(404).json({
        status: statusCode,
        message: "User not found",
      });
    }
    await User.deleteOne({
      _id: req.params.id,
    }).then(
      res.status(200).json({
        status: res.statusCode,
        message: "Successfully deleted the user",
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
