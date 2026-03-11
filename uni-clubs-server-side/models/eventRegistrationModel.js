const mongoose = require("mongoose");

const eventRegistrationSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true
  },

  club: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Club",
    required: true
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  name: String,
  studentId: String,
  department: String,
  phone: String,

  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  },

  registeredAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("EventRegistration", eventRegistrationSchema);