const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.header("authuser");
  if (!token) {
    return res.status(400).json({
      status: res.statusCode,
      message: "Access Denied!",
    });
  }
  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({
      status: res.statusCode,
      message: "Invalid Token!",
    });
  }
};

const verifyAdmin = (req, res, next) => {
  try {
    const token = req.header("authuser");
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    if (decode.role != "admin") {
      res.status(400);
      res.json({
        status: res.statusCode,
        message: "You are not entitled to access this feature",
      });
      return;
    }
  } catch (error) {
    res.status(400).json({
      status: res.statusCode,
      message: "Invalid token",
    });

    return;
  }

  next();
};

module.exports = { verifyToken: verifyToken, verifyAdmin: verifyAdmin };
