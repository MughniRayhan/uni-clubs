const express = require('express');
const router = express.Router();

const verifyFbToken = require('../middleware/verifyFbToken');
const verifyAdmin = require('../middleware/verifyAdmin');

const {
  createClubRequest,
  getPendingClubs,
  updateClubStatus,
  getApprovedClubs,
  getClubById
} = require('../controllers/clubController');


// USER → create a club request
router.post("/clubs", verifyFbToken, createClubRequest);

// PUBLIC or AUTH user can see approved clubs
router.get("/clubs/approved", getApprovedClubs);

// GET club single details public (this will be used on club details page)
router.get("/:clubId", getClubById);


// ADMIN ONLY → get all pending club requests
router.get("/admin/pending", verifyFbToken, verifyAdmin, getPendingClubs);

// ADMIN ONLY → approve/reject a club request + assign leader automatically
router.patch("/admin/status/:clubId", verifyFbToken, verifyAdmin, updateClubStatus);


module.exports = router;
