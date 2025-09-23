const express = require("express")
const authRouter = express.Router();
const {validData}=require("../utils/validationData")
const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

authRouter.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, emailId, password } = req.body;

    // 1. Validate input
    if (!firstName || !lastName || !emailId || !password) {
      return res.status(400).send({ error: "All fields are required" });
    }

    // 2. Check if user already exists
    const existingUser = await User.findOne({ emailId });
    if (existingUser) {
      return res.status(400).send({ error: "Email already registered" });
    }

    // 3. Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // 4. Create user
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();

    // 5. Generate JWT
    const token = jwt.sign({ _id: user._id }, "devtinder@123", { expiresIn: "1h" });

    // 6. Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,  // set true if HTTPS
      sameSite: "lax",
      maxAge: 60 * 60 * 1000, // 1h
    });

    // 7. Remove password before sending response
    const { password: pwd, ...userWithoutPassword } = user.toObject();

    res.status(201).send({
      message: "User registered successfully",
      user: userWithoutPassword,
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});


authRouter.post("/login", async (req, res) => {
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

authRouter.post("/logout", (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      secure: false,      
      sameSite: "lax",
      expires: new Date(0), 
    });

    res.status(200).send({ message: "User logged out successfully" });
  } catch (err) {
    res.status(500).send({ error: "Logout failed" });
  }
});

module.exports = authRouter;

module.exports = authRouter