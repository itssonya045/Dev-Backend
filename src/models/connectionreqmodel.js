const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
  fromUserId: {
    type: mongoose.Schema.Types.ObjectId,
    
    required: true
  },
  toUserId: {
    type: mongoose.Schema.Types.ObjectId,
   
    required: true
  },
  status: {
    type: String,
    enum: {
      values: ["ignored", "interested", "accepted", "rejected"], // ✅ fixed spelling
      message: "{VALUE} is not supported"
    },
    required: true
  }
});

const ConnectionRequest = mongoose.model("ConnectionRequest", connectionRequestSchema);

module.exports = ConnectionRequest; // ✅ default export
