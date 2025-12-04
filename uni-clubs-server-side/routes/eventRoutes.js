const express = require("express");
const router = express.Router();
const { createEvent, approveEvent, rejectEvent, getEvents, getEventById } = require("../controllers/eventController");
const verifyFbToken = require('../middleware/verifyFbToken');

router.post("/:clubId", verifyFbToken, createEvent);
router.get("/", getEvents);  
router.get("/:eventId", getEventById);

// Admin routes
router.patch("/:eventId/approve", verifyFbToken,  approveEvent);
router.patch("/:eventId/reject", verifyFbToken, rejectEvent);

module.exports = router;
