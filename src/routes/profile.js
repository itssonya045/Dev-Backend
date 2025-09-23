const express = require("express");
const profileRouter = express.Router();
const {userAuth} = require("../middleware/auth")


profileRouter.get("/profile", userAuth, (req, res) => {
  // req.user comes from userAuth middleware
  const { password, ...userWithoutPassword } = req.user.toObject();

  res.status(200).send({
    message: "Profile fetched successfully",
    user: userWithoutPassword
  });
});

module.exports = profileRouter