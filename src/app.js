const express = require("express");
const app = express();

app.use("/app",(req,res)=>{
    res.send("app working well")
})
app.use("/hello",(req,res)=>{
    res.send("hello hello")
})
app.use("/test",(req,res)=>{
    res.send("test working well")
})
app.use("/",(req,res)=>{
    res.send("working well")
})
app.listen(7777,(req,res)=>{
    console.log("server working well")
})