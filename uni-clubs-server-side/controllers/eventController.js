const Event = require("../models/eventModel");
const Club = require("../models/clubModel");

// Create Event (Club Leader)
const createEvent = async (req, res) => {
  try {
    const { clubId } = req.params;
    const user = req.user; // comes from verifyFbToken

    // 1. Find club
    const club = await Club.findById(clubId);
    if (!club) {
      return res.status(404).json({
        success: false,
        message: "Club not found",
      });
    }

    // 2. Check leader ownership
    if (club.leader.toString() !== user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Only the club leader can create events for this club",
      });
    }

    // 3. Create event
    const event = await Event.create({
  title: req.body.title,
  shortDescription: req.body.shortDescription,
  eventDate: new Date(req.body.eventDate),
  time: req.body.time,
  venue: req.body.venue,
  category: req.body.category,
  banner: req.body.banner,

  registrationStart: req.body.registrationStart
    ? new Date(req.body.registrationStart)
    : null,

  registrationEnd: req.body.registrationEnd
    ? new Date(req.body.registrationEnd)
    : null,

  club: clubId,
  createdBy: user._id,
  status: "pending",
});


    res.status(201).json({
      success: true,
      message: "Event request sent to admin",
      data: event,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to create event",
    });
  }
};


// Get all approved events (public)
const getEvents = async (req, res) => {
  try {
    const now = new Date();

    const events = await Event.find({ status: "approved" })
      .populate("club", "name coverImage")
      .sort({ eventDate: 1 });

    const upcoming = events.filter(e => e.eventDate > now);
    const past = events.filter(e => e.eventDate <= now);

    res.json({
      success: true,
      upcoming,
      past,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// Leader: Get my events
const getMyEvents = async (req, res) => {
  try {
    const userId = req.user._id;

    const events = await Event.find({ createdBy: userId })
      .populate("club", "name")
      .sort({ createdAt: -1 });

    res.json({ success: true, data: events });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// Admin: Get all events
const getAllEventsForAdmin = async (req, res) => {
  try {
    if (req.user.role !== "admin")
      return res.status(403).json({ success: false, message: "Admin only" });

    const events = await Event.find()
      .populate("club", "name")
      .populate("createdBy", "displayName email")
      .sort({ createdAt: -1 });

    res.json({ success: true, data: events });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get single event by ID
const getEventById = async (req, res) => {
  try {
    const { eventId } = req.params;

    const event = await Event.findById(eventId)
      .populate("club", "name coverImage")
      .populate("createdBy", "displayName email");

    if (!event) return res.status(404).json({ success: false, message: "Event not found" });

    res.json({ success: true, data: event });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Admin Approve Event
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

// Admin Reject Event
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

// Admin: Update event
const updateEvent = async (req, res) => {
  try {
    if (req.user.role !== "admin")
      return res.status(403).json({ success: false, message: "Admin only" });

    const { eventId } = req.params;

    const {
  ticketAmount,
  ticketCurrency,
  registrationStart,
  registrationEnd,
  eventDate,
  ...rest
} = req.body;

const updatedData = {
  ...rest,

  eventDate: eventDate
    ? new Date(eventDate)
    : undefined,

  registrationStart: registrationStart
    ? new Date(registrationStart)
    : null,

  registrationEnd: registrationEnd
    ? new Date(registrationEnd)
    : null,

  ticketPrice: {
    amount: ticketAmount || 0,
    currency: ticketCurrency || "BDT",
  },
};


    console.log("Updating:", updatedData);

    const event = await Event.findByIdAndUpdate(
      eventId,
      updatedData,
      { new: true, runValidators: true, strict: true }
    )
      .populate("club", "name")
      .populate("createdBy", "displayName email");

    if (!event)
      return res.status(404).json({ success: false, message: "Event not found" });

    res.json({ success: true, message: "Event updated", data: event });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};


// Leader: Update my event
const updateMyEvent = async (req, res) => {
  try {
    const { eventId } = req.params;

    const event = await Event.findById(eventId);
    if (!event)
      return res.status(404).json({ success: false, message: "Event not found" });

    // ownership check
    if (event.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    const updated = await Event.findByIdAndUpdate(
      eventId,
      req.body,
      { new: true }
    );

    res.json({ success: true, message: "Event updated", data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// Admin Delete Event
const deleteEvent = async (req, res) => {
  try {
    if (req.user.role !== "admin")
      return res.status(403).json({ message: "Admin only" });

    await Event.findByIdAndDelete(req.params.eventId);
    res.json({ success: true, message: "Event deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Leader: Delete my event
const deleteMyEvent = async (req, res) => {
  try {
    const { eventId } = req.params;

    const event = await Event.findById(eventId);
    if (!event)
      return res.status(404).json({ success: false, message: "Event not found" });

    if (event.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    await Event.findByIdAndDelete(eventId);

    res.json({ success: true, message: "Event deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


module.exports = {
  createEvent,
  getEvents,
  getMyEvents,
  getAllEventsForAdmin,
  getEventById,
  approveEvent,
  rejectEvent,
  updateEvent,
  updateMyEvent,
  deleteEvent,
  deleteMyEvent,
};
