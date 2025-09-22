const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const {validData}=require("./utils/validationData")
const bcrypt = require('bcrypt');
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken")
const {userAuth} = require("./middleware/auth")

app.use(express.json({
  strict: true,
  verify: (req, res, buf) => {
    if (buf && buf.length === 0) req.body = {};
  }
}));

app.use(cookieParser())

app.post("/signup", async (req, res) => {
  try {
    // Validate request body
    validData(req);

    // Destructure fields from req.body
    const { firstName, lastName, emailId, password } = req.body;

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();

    res.send({ message: "User added successfully", user });
  } catch (err) {
    res.status(400).send("error: " + err.message);
  }
});


app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId });
    if (!user) throw new Error("Email is not present");

    const isPasswordValid = await user.validatepassword(password)
    if (!isPasswordValid) throw new Error("Invalid password");

    const token = await user.getJWT()

    // Set cookie correctly
    res.cookie("token", token, {
      httpOnly: true,       // prevents JS access (XSS protection)
      secure: false,        // true if HTTPS
      sameSite: "lax",      // protects against CSRF
      maxAge: 60 * 60 * 1000 // 1 hour
    });

    // Send user **without password**
    const { password: pwd, ...userWithoutPassword } = user.toObject();

    res.status(200).send({ message: "Login successful", user: userWithoutPassword });

  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

app.get("/profile", userAuth, (req, res) => {
  // req.user comes from userAuth middleware
  const { password, ...userWithoutPassword } = req.user.toObject();

  res.status(200).send({
    message: "Profile fetched successfully",
    user: userWithoutPassword
  });
});


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

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];

    //  Check if all update keys are allowed
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      return res.status(400).send({ error: "Update not allowed" });
    }

    //  Validate skills length if present
    if (data.skills && data.skills.length > 10) {
      return res.status(400).send({ error: "Skills cannot be more than 10" });
    }

    // ✅ Update user
    const user = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after", // returns updated doc
      runValidators: true,     // enforce schema validation
    });

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    res.send({ message: "User updated successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Something went wrong" });
  }
});



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
