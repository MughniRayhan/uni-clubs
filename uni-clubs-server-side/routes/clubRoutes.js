const express = require('express');
const verifyFbToken = require('../middleware/verifyFbToken');
const { createClubRequest, getPendingClubs, updateClubStatus, getApprovedClubs } = require('../controllers/clubController');
const verifyAdmin = require('../middleware/verifyAdmin');

const router = express.Router();

// User creates a club request
router.post("/clubs", verifyFbToken, createClubRequest);
router.get("/pending-clubs", verifyFbToken, verifyAdmin, getPendingClubs);
router.patch("/clubs/:clubId", verifyFbToken, verifyAdmin, updateClubStatus);
router.get("/approved-clubs", getApprovedClubs);

module.exports = router;