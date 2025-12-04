const Event = require("../models/eventModel");
const Club = require("../models/clubModel");

const createEvent = async (req, res) => {
  try {
    const { clubId } = req.params;
    const user = req.user;

    const club = await Club.findById(clubId);
    if (!club) return res.status(404).json({ success: false, message: "Club not found" });

    if (String(club.leader) !== String(user._id))
      return res.status(403).json({ success: false, message: "Only leader can create events" });

    const event = await Event.create({
      ...req.body,
      club: clubId,
      createdBy: user._id,
    });

    res.json({ success: true, message: "Event request sent to admin", data: event });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// get all approved events
const getEvents = async (req, res) => {
  try {
    const events = await Event.find({ status: "approved" })
      .populate("club", "name coverImage")
      .sort({ createdAt: -1 });

    res.json({ success: true, data: events });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId)
      .populate("club", "name coverImage")
      .populate("createdBy", "displayName email");

    if (!event) return res.status(404).json({ success: false, message: "Event not found" });

    res.json({ success: true, data: event });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Admin Approve
const approveEvent = async (req, res) => {
  try {
    if (req.user.role !== "admin")
      return res.status(403).json({ success: false, message: "Admin only" });

    await Event.findByIdAndUpdate(req.params.eventId, { status: "approved" });
    res.json({ success: true, message: "Event approved" });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Admin Reject
const rejectEvent = async (req, res) => {
  try {
    if (req.user.role !== "admin")
      return res.status(403).json({ success: false, message: "Admin only" });

    await Event.findByIdAndUpdate(req.params.eventId, { status: "rejected" });
    res.json({ success: true, message: "Event rejected" });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  createEvent,
  getEvents,
  getEventById,
  approveEvent,
  rejectEvent,
};