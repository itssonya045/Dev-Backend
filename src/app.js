/*const express = require("express");
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
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser())

const appRouter = require("./routes/auth")
const profileRouter = require("./routes/profile")

app.use("/", appRouter,profileRouter)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/", appRouter, profileRouter);


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
*/

const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

// Body parsers — must be before routes
app.use(express.json({
  strict: true,
  verify: (req, res, buf) => {
    if (buf.length === 0) {
      req.body = {}; // prevent crash on empty body
    }
  }
}));

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// Import routers
const appRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requestRouter")

// Use routers
app.use("/", appRouter, profileRouter,requestRouter);

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
