const Announcement = require("../models/announcementModel");


// Create Announcement
// Create Announcement
const createAnnouncement = async (req, res) => {
  try {

    let fileUrl = "";
    let fileName = "";

    if (req.file) {
      fileUrl = req.file.path;
      fileName = req.file.originalname;
    }

    const announcement = await Announcement.create({
      title: req.body.title,
      message: req.body.message,
      type: req.body.type,
      createdBy: req.user._id,
      fileUrl,
      fileName
    });

    res.status(201).json({
      success: true,
      message: "Announcement created",
      data: announcement
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};



// Get All Announcements
const getAnnouncements = async (req, res) => {
  try {

    const announcements = await Announcement.find()
      .populate("createdBy", "displayName")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: announcements
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};



// Get Single Announcement
const getAnnouncementById = async (req, res) => {
  try {

    const announcement = await Announcement.findById(req.params.id);

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: "Announcement not found"
      });
    }

    res.json({
      success: true,
      data: announcement
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// Update Announcement
const updateAnnouncement = async (req, res) => {
  try {

    const updateData = {
      title: req.body.title,
      message: req.body.message,
      type: req.body.type,
      isActive: req.body.isActive
    };

    if (req.file) {
      updateData.fileUrl = req.file.path;
      updateData.fileName = req.file.originalname;
    }

    const announcement = await Announcement.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: "Announcement not found"
      });
    }

    res.json({
      success: true,
      message: "Announcement updated",
      data: announcement
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};




// Delete Announcement
const deleteAnnouncement = async (req, res) => {
  try {

    const announcement = await Announcement.findByIdAndDelete(req.params.id);

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: "Announcement not found"
      });
    }

    res.json({
      success: true,
      message: "Announcement deleted"
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


module.exports = {
  createAnnouncement,
  getAnnouncements,
  getAnnouncementById,
  updateAnnouncement,
  deleteAnnouncement
};