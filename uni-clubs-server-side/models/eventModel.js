const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  club: { type: mongoose.Schema.Types.ObjectId, ref: "Club", required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  title: { type: String, required: true },
  shortDescription: String,
  description: String,

  banner: String,

  eventDate: { type: Date, required: true },
  time: String,
  venue: String,
  category: String,

  capacity: Number,

  registrationStart: { type: Date, default: null },
registrationEnd: { type: Date, default: null },


  ticketPrice: {
    amount: { type: Number, default: 0 },
    currency: { type: String, default: "BDT" },
  },

  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },

  createdAt: { type: Date, default: Date.now },
});

// Virtual status (upcoming / finished)
eventSchema.virtual("eventState").get(function () {
  const now = new Date();
  return this.eventDate > now ? "upcoming" : "finished";
});

module.exports = mongoose.model("Event", eventSchema);
