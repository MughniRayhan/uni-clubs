const express = require('express');
const router = express.Router();

const verifyFbToken = require('../middleware/verifyFbToken');
const verifyAdmin = require('../middleware/verifyAdmin');

const {
  createClubRequest,
  getPendingClubs,
  updateClubStatus,
  getApprovedClubs,
  getClubById,
  updateClubDetails,
  addClubImage,
  removeClubImage,
  addSection,
  removeSection
} = require('../controllers/clubController');
const verifyClubLeaderOrAdmin = require('../middleware/verifyClubLeaderOrAdmin');


// USER → create a club request
router.post("/clubs", verifyFbToken, createClubRequest);

// PUBLIC or AUTH user can see approved clubs
router.get("/clubs/approved", getApprovedClubs);

// ADMIN ONLY → get all pending club requests
router.get("/admin/pending", verifyFbToken, verifyAdmin, getPendingClubs);

// ADMIN ONLY → approve/reject a club request + assign leader automatically
router.patch("/admin/status/:clubId", verifyFbToken, verifyAdmin, updateClubStatus);


// GET club single details public (this will be used on club details page)
router.get("/:clubId", getClubById);

// Leader/Admin only
router.patch("/:clubId/details", verifyFbToken, verifyClubLeaderOrAdmin, updateClubDetails);
router.post("/:clubId/gallery", verifyFbToken, verifyClubLeaderOrAdmin, addClubImage);
router.delete("/:clubId/gallery/:imageId", verifyFbToken, verifyClubLeaderOrAdmin, removeClubImage);

// sections
router.post('/:clubId/sections', verifyFbToken, verifyClubLeaderOrAdmin, addSection);
router.delete('/:clubId/sections/:sectionId', verifyFbToken, verifyClubLeaderOrAdmin, removeSection);




module.exports = router;
