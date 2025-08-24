const express = require("express");
const { addmainAuth,userAuth } = require("./middleware/auth"); // or default export
// const addmainAuth = require("./middleware/auth"); // if using default export

const app = express();   // ✅ define app first

// use middleware AFTER defining app
app.use("/admin", addmainAuth);

app.get("/admin/getdata", (req, res) => {
  res.send("All data is sent");
});

app.get("/admin/deletedata", (req, res) => {
  res.send("Data is deleted");
});

app.get("/user",userAuth,(req,res)=>{
    res.send("user data send")
})

app.listen(7777, () => {
  console.log("Server working well on port 7777");
});
