const express = require("express");
const profileRouter = express.Router();
const {userAuth} = require("../middleware/auth")
const {validateProfileData} = require("../utils/validationData")


profileRouter.get("/profile/view", userAuth, (req, res) => {
  // req.user comes from userAuth middleware
  const { password, ...userWithoutPassword } = req.user.toObject();

  res.status(200).send({
    message: "Profile fetched successfully",
    user: userWithoutPassword
  });
});

profileRouter.patch("/profile/edits", userAuth, async (req, res) => {
  try {
    if (!validateProfileData(req.body)) {
      throw new Error("Invalid Edits Request.");
    }

    const loggeduser = req.user;
    console.log(loggeduser)

    Object.keys(req.body).forEach(k => {
      loggeduser[k] = req.body[k];
    });
    console.log(loggeduser)

    await loggeduser.save();

    res.send("Profile updated successfully");
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});




module.exports = profileRouter