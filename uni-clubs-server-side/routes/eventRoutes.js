const express = require("express");
const router = express.Router();
const {
  createEvent,
  approveEvent,
  rejectEvent,
  getEvents,
  getEventById,
  getAllEventsForAdmin,
  deleteEvent,
  updateEvent,
  getMyEvents,
  updateMyEvent,
  deleteMyEvent
} = require("../controllers/eventController");

const verifyFbToken = require("../middleware/verifyFbToken");
const verifyAdmin = require("../middleware/verifyAdmin");
const verifyLeader = require("../middleware/verifyLeader");

// -------- STATIC ROUTES FIRST ---------
// Admin: fetch all events
router.get("/all-events", verifyFbToken, verifyAdmin, getAllEventsForAdmin);

// Public: fetch approved events
router.get("/approved", getEvents);

router.get("/my-events", verifyFbToken,verifyLeader, getMyEvents);
router.put("/my-events/:eventId", verifyFbToken, verifyLeader, updateMyEvent);
router.delete("/my-events/:eventId", verifyFbToken, verifyLeader, deleteMyEvent);

// -------- EVENT CREATION ---------
// Create event (club leader)
router.post("/create/:clubId", verifyFbToken, createEvent);

// -------- DYNAMIC ROUTES ---------
// Get single event by ID
router.get("/id/:eventId", getEventById);

// Admin approve/reject/delete
router.patch("/id/:eventId/approve", verifyFbToken, verifyAdmin, approveEvent);
router.patch("/id/:eventId/reject", verifyFbToken, verifyAdmin, rejectEvent);
router.put("/:eventId", verifyFbToken, verifyAdmin, updateEvent);
router.delete("/id/:eventId", verifyFbToken, verifyAdmin, deleteEvent);

module.exports = router;
