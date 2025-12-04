const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  club: { type: mongoose.Schema.Types.ObjectId, ref: "Club", required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  title: { type: String, required: true },
  shortDescription: String,
  description: String,

  banner: String,
  attachments: [{ name: String, url: String }],

  date: String,
  time: String,
  venue: String,
  category: String,

  capacity: Number,
  registrationDeadline: Date,

  ticketPrice: {
    amount: { type: Number, default: 0 },
    currency: { type: String, default: "BDT" },
  },

  schedule: String,

  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  },

  createdAt: { type: Date, default: Date.now },
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
