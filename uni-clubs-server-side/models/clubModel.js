const mongoose = require("mongoose");

const clubSchema = new mongoose.Schema({
name: { type: String, required: true, index: true },
shortName: { type: String },
coverImage: { type: String },
description: { type: String },
mission: { type: String },
extraDetails: { type: String, default: "" },
category: { type: String },
tags: [String],
images: [{ url: String, caption: String }],
documents: [{ name: String, url: String }],
contactEmail: String,
contactPhone: String,
meetingTimes: String,
status: { type: String, enum: ['pending','approved','rejected','archived'], default: 'pending' },
leader: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
membershipFee: { amount: Number, currency: String },
createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
createdAt:{ type: Date, default: Date.now },
updatedAt: { type: Date, default: Date.now },
stats: { memberCount: Number, eventsHosted: Number }
});

const Club = mongoose.model("Club", clubSchema);
module.exports = Club;
