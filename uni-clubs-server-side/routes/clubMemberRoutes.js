const express = require("express");
const router = express.Router();
const clubMemberController = require("../controllers/clubMemberController");
const verifyFbToken = require('../middleware/verifyFbToken');
const verifyAdmin = require('../middleware/verifyAdmin');

// User sends request
router.post("/join", verifyFbToken, clubMemberController.joinClub);

// Admin view pending requests
router.get("/pending", verifyFbToken, verifyAdmin, clubMemberController.getPendingRequests);

router.get("/my-clubs", verifyFbToken, clubMemberController.getMyClubs);

// Admin approve and reject request
router.patch("/approve/:id", verifyFbToken, verifyAdmin, clubMemberController.approveRequest);
router.patch("/reject/:id", verifyFbToken, verifyAdmin, clubMemberController.rejectRequest);

router.get("/status/:clubId", verifyFbToken, clubMemberController.getMyMembershipStatus);

router.get("/club/:clubId", verifyFbToken, clubMemberController.getClubMembers);

router.patch("/role/:id",verifyFbToken,verifyAdmin, clubMemberController.updateMemberRole);

router.delete("/:id",verifyFbToken, verifyAdmin, clubMemberController.removeMember);

module.exports = router;