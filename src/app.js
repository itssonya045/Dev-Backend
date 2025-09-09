const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());
app.post("/signup",async (req,res)=>{
  const user = new User(req.body)
  await user.save();
  res.send("user add successfully.")
})


app.get("/feed",async(req,res)=>{
  const user = await User.find({})
  if(!user){
    res.send("user not found")
  }else{
    res.send(user)
  }
})

app.get("/user",async(req,res)=>{
  const emailId = req.body.emailId
  const user = await User.findOne({emailId:emailId})
  if(!user){
    res.send("user not found")
  }else{
    res.send(user)
  }
})

app.delete("/user",async(req,res)=>{
  const userId = req.body.userId
  const user = await User.findByIdAndDelete(userId)
  if(!user){
    req.send("something went wrong")
  }else{
    res.send("user deleted successfully.")
  }
})

app.patch("/user",async(req,res)=>{
const userId = req.body.userId;
const data = req.body;
try{
  const user = await User.findByIdAndUpdate(userId,data)
  res.send("user updated successfully.")
}catch(err){
  res.send("something went wrong.")
}
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
