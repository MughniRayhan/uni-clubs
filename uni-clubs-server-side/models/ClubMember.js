const mongoose = require("mongoose");

const clubMemberSchema = new mongoose.Schema({
  clubId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Club",
    required: true,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  // Application Info
  fullName: String,
  studentId: String,
  department: String,
  batch: String,
  phone: String,
  motivation: String,

  role: {
    type: String,
    enum: ["member", "executive", "leader"],
    default: "member",
  },

  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },

  joinedAt: Date,

  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

}, { timestamps: true });

// Prevent duplicate request
clubMemberSchema.index({ clubId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model("ClubMember", clubMemberSchema);