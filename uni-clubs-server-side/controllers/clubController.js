const Club = require("../models/clubModel");
const User = require("../models/userModel");

// Create a new club request
const createClubRequest = async (req, res) => {
  try {
    const { clubName, category, coverImage, description, creatorName, creatorEmail, studentId } = req.body;

    // Prevent duplicate club requests
    const existing = await Club.findOne({ clubName });
    if (existing) {
      return res.status(400).json({ message: "A club with this name already exists or is pending approval." });
    }

    const newClub = new Club({
      clubName,
      category,
      coverImage,
      description,
      creatorName,
      creatorEmail,
      studentId,
      status: "pending"
    });

    await newClub.save();
    res.status(201).json({ success: true, message: "Club request submitted!", club: newClub });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all pending clubs (for admin)
const getPendingClubs = async (req, res) => {
  try {
    const pendingClubs = await Club.find({ status: "pending" }).sort({ createdAt: -1 });
    res.status(200).json(pendingClubs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch pending clubs", error: error.message });
  }
};

// Approve / Reject a club
const updateClubStatus = async (req, res) => {
  const { clubId } = req.params;
  const { action } = req.body;

  try {
    const club = await Club.findById(clubId);
    if (!club) {
      return res.status(404).json({ success: false, message: "Club not found" });
    }

    if (action === "approve") {
      club.status = "approved";

      //  make the creator leader of this club
      
      await User.findOneAndUpdate(
        { email: club.creatorEmail },
        { role: "leader" }
      );
    } else if (action === "reject") {
      club.status = "rejected";
    } else {
      return res.status(400).json({ success: false, message: "Invalid action" });
    }

    await club.save();
    res.json({ success: true, message: `Club ${action}d successfully` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all approved clubs
const getApprovedClubs = async (req, res) => {
  try {
    const approvedClubs = await Club.find({ status: "approved" }).sort({ createdAt: -1 }).lean();
    res.status(200).json(approvedClubs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch approved clubs", error: error.message });
  }
};


module.exports = {
  createClubRequest,
  getPendingClubs,
  updateClubStatus,
  getApprovedClubs
};