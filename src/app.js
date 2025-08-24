const express = require("express");
const connectDB = require("./config/database")

const app = express();   

connectDB().then(()=>{
    console.log("successfully connected database.")

}).catch(()=>{
    console.log("unsuccessful connection")
}
)

app.listen(7777, () => {
  console.log("Server working well on port 7777");
});
