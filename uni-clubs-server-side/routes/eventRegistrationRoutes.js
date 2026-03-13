const express = require("express");
const router = express.Router();

const verifyFbToken = require("../middleware/verifyFbToken");
const verifyLeader = require("../middleware/verifyLeader");

const {
  registerEvent,
  getPendingRegistrations,
  approveRegistration,
  rejectRegistration,
  getEventParticipants,
  getMyRegistrations,
  getLeaderEvents,
  getRegistrationStatus
} = require("../controllers/eventRegistrationController");


// user register
router.post("/register/:eventId", verifyFbToken, registerEvent);


// leader dashboard
router.get("/leader/pending", verifyFbToken, verifyLeader, getPendingRegistrations);

router.patch("/approve/:registrationId", verifyFbToken, verifyLeader, approveRegistration);

router.patch("/reject/:registrationId", verifyFbToken, verifyLeader, rejectRegistration);


// event participants
router.get("/event-participants/:eventId", verifyFbToken, verifyLeader, getEventParticipants);

router.get("/my-registrations",verifyFbToken,getMyRegistrations);

// 
router.get("/leader/events", verifyFbToken,verifyLeader, getLeaderEvents);
router.get("/status/:eventId", verifyFbToken, getRegistrationStatus);


module.exports = router;