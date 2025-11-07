const User = require("../models/userModel");
const Club = require("../models/clubModel");

/**
 * Middleware to allow only club leader or admin
 * Attach user and club to req for controllers
 */
const verifyClubLeaderOrAdmin = async (req, res, next) => {
  try {
    if (!req.decoded?.email) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const email = req.decoded.email;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const { clubId } = req.params;
    const club = await Club.findById(clubId);
    if (!club) return res.status(404).json({ success: false, message: "Club not found" });

    const isAdmin = user.role === "admin";
    const isLeader = club.leader && club.leader.toString() === user._id.toString();

    if (!isAdmin && !isLeader) {
      return res.status(403).json({ success: false, message: "Forbidden: leader or admin required" });
    }

    // Attach for controllers
    req.user = user;
    req.club = club;
    next();
  } catch (err) {
    console.error("verifyClubLeaderOrAdmin:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = verifyClubLeaderOrAdmin;
