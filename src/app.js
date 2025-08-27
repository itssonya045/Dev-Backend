const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());
app.post("/signup",async (req,res)=>{
  const user = new User(req.body)
  await user.save();
  res.send("user add successfully")
})

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
