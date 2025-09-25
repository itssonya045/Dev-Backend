const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionreqmodel"); // ✅ default import
const User = require("../models/user")
const mongoose = require("mongoose");


requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    const allowedStatus = ["ignored", "interested"]
    if(!allowedStatus.includes(status)){
      return res.status(400).json({ message: "Invalid status: " + status });

    }


    

// First check if toUserId is a valid MongoDB ObjectId
if (!mongoose.Types.ObjectId.isValid(toUserId)) {
  return res.status(400).json({ message: "Invalid User ID" });
}

// Find the user by ID
const toUser = await User.findById(toUserId);

// If user not found, return 404
if (!toUser) {
  return res.status(404).json({ message: "User ID does NOT exist in DB" });
}





  


    const existingConnectionRequest = await ConnectionRequest.findOne({
      $or:[
        {fromUserId,toUserId},{fromUserId:toUserId,toUserId:fromUserId}
      ]
    })

    if(existingConnectionRequest){
      res.status(404).json({ message : "User Already Present ... !!!"})
    }

    

    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status
    });

    await connectionRequest.save();

    res.status(201).json({
      message: "Connection request sent successfully",
      data: connectionRequest
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = requestRouter;
