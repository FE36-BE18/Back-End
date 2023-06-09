const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();
dotenv.config();

app.use(express.json());

// import routes
const userRoutes = require("./routes/authUser");
const categoryRoutes = require("./routes/category");
const levelRoutes = require("./routes/level");
const foodRoutes = require("./routes/food");

// routes example
app.use("/user", userRoutes);
app.use("/category", categoryRoutes);
app.use("/level", levelRoutes);
app.use("/food", foodRoutes);

// connect to DB
mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
let db = mongoose.connection;

db.on("error", console.error.bind(console, "Database connect Error!"));
db.once("open", () => {
  console.log("Database is Connected");
});

app.listen(process.env.PORT);
