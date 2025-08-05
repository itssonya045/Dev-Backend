const express = require("express");
const app = express();


app.get("/user",(req,res)=>{
    res.send({firstName:"shri",lastName:"rakshe"})
})

app.post("/user",(req,res)=>{
    res.send("save in db")
})

app.delete("/user",(req,res)=>{
    res.send("user delete in database")
})
app.listen(7777,(req,res)=>{
    console.log("server working well")
})