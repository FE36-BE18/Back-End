const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// import validation
const { registerValidation } = require("../configs/validation");

// import models
const User = require("../models/User");

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

// router.get("/", async (req, res) => {
//   const data = await User.find({});
//   res.json(data);
// });

module.exports = router;
