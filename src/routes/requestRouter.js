const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionreqmodel"); // ✅ default import

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    

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
