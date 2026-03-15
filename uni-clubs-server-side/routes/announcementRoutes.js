const express = require("express");
const router = express.Router();

const {
  createAnnouncement,
  getAnnouncements,
  getAnnouncementById,
  updateAnnouncement,
  deleteAnnouncement
} = require("../controllers/announcementController");

const verifyFbToken = require('../middleware/verifyFbToken');
const verifyAdmin = require('../middleware/verifyAdmin');

const upload = require("../middleware/upload");

router.get("/", getAnnouncements);

router.post("/", upload.single("file"), verifyFbToken, verifyAdmin, createAnnouncement);

router.get("/:id", getAnnouncementById);

router.patch("/:id", upload.single("file"), verifyFbToken, verifyAdmin, updateAnnouncement);

router.delete("/:id", verifyFbToken, verifyAdmin, deleteAnnouncement);

module.exports = router;

