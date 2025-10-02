const mongoose = require("mongoose");

const clubSchema = new mongoose.Schema({
  clubName: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ["Cultural", "Sports", "Academic", "Technology", "Social", "Other"]
  },
   coverImage: { 
    type: String, 
    required: true 
}, 
  description: {
    type: String,
    required: true,
    minlength: 30
  },
  creatorName: {
    type: String,
    required: true
  },
  creatorEmail: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  studentId: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  leader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // link to User model when approved
  }
});

const Club = mongoose.model("Club", clubSchema);
module.exports = Club;
