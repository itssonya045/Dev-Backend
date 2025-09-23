const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken")



app.use(express.json({
  strict: true,
  verify: (req, res, buf) => {
    if (buf && buf.length === 0) req.body = {};
  }
}));

app.use(cookieParser())

const appRouter = require("./routes/auth")
const profileRouter = require("./routes/profile")

app.use("/", appRouter,profileRouter)

connectDB()
  .then(() => {
    console.log("Successfully connected to database.");
    app.listen(7777, () => {
      console.log("Server running on port 7777");
    });
  })
  .catch(() => {
    console.log("Unsuccessful database connection");
  });
