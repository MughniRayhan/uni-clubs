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
  removeSection,
  getMyClubs,
  deleteClubAdmin,
  updateClubByAdmin,
  getAllClubs,
  getClubDetails,
  removeLeaderCard,
  getClubCategories,
  getAvailableLeaders,
  changeClubLeader
} = require('../controllers/clubController');
const verifyClubLeaderOrAdmin = require('../middleware/verifyClubLeaderOrAdmin');
const verifyLeader = require('../middleware/verifyLeader');




router.get('/admin/clubs', verifyFbToken, verifyAdmin, getAllClubs);
router.get("/admin/pending", verifyFbToken, verifyAdmin, getPendingClubs);
router.get("/admin/users/available-leaders", verifyFbToken, verifyAdmin, getAvailableLeaders);
router.patch("/admin/clubs/:clubId/change-leader", verifyFbToken, verifyAdmin, changeClubLeader);
router.patch("/admin/clubs/:clubId", verifyFbToken, verifyAdmin, updateClubByAdmin);
router.delete("/admin/clubs/:clubId", verifyFbToken, verifyAdmin, deleteClubAdmin);
router.patch("/admin/status/:clubId", verifyFbToken, verifyAdmin, updateClubStatus);


router.post("/clubs", verifyFbToken, createClubRequest);
router.get("/leader/clubs", verifyFbToken, verifyLeader, getMyClubs);


router.get("/clubs/approved", getApprovedClubs);
router.get("/clubs/categories", getClubCategories);


router.patch("/clubs/:id", verifyFbToken, verifyAdmin, updateClubDetails);
router.post("/:clubId/gallery", verifyFbToken, verifyClubLeaderOrAdmin, addClubImage);
router.delete("/:clubId/gallery/:imageId", verifyFbToken, verifyClubLeaderOrAdmin, removeClubImage);
router.post("/:clubId/sections", verifyFbToken, verifyClubLeaderOrAdmin, addSection);
router.delete("/clubs/:clubId/sections/:sectionId", verifyFbToken, verifyAdmin, removeSection);
router.delete("/clubs/:clubId/leaderCards/:cardId", verifyFbToken, verifyAdmin, removeLeaderCard);


router.get("/clubs/:id", getClubDetails);

module.exports = router;
