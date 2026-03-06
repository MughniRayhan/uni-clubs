const { default: mongoose } = require("mongoose");
const ClubMember = require("../models/ClubMember");

// sent join request 
const joinClub = async (req, res) => {
  try {
    const userId = req.user._id; 
    const { clubId, fullName, studentId, department, batch, phone, motivation } = req.body;

    // Check existing request
    const existing = await ClubMember.findOne({ clubId, userId });

    if (existing) {
      return res.status(400).json({
        message: "You already applied or are a member of this club.",
      });
    }

    const newRequest = await ClubMember.create({
      clubId,
      userId,
      fullName,
      studentId,
      department,
      batch,
      phone,
      motivation,
      status: "pending",
    });

    res.status(201).json({
      message: "Join request sent successfully.",
      data: newRequest,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// get all pending requests for admin dashboard
const getPendingRequests = async (req, res) => {
  try {
    const requests = await ClubMember.find({ status: "pending" })
      .populate("userId", "displayName email studentId department batch phone")
      .populate("clubId", "name shortName"); 

    res.json(requests);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// approve  request (Admin)
const approveRequest = async (req, res) => {
  try {
    const { id } = req.params; 
    const adminId = req.user._id;

    const membership = await ClubMember.findById(id);

    if (!membership) {
      return res.status(404).json({ message: "Request not found" });
    }

    membership.status = "approved";
    membership.joinedAt = new Date();
    membership.approvedBy = adminId;

    await membership.save();

    res.json({ message: "Member approved successfully." });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// reject request (Admin)
const rejectRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const adminId = req.user._id;

    const membership = await ClubMember.findById(id);

    if (!membership) {
      return res.status(404).json({ message: "Request not found" });
    }

    membership.status = "rejected";
    membership.approvedBy = adminId;

    await membership.save();

    res.json({ message: "Request rejected successfully." });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// check membership status for a club
const getMyMembershipStatus = async (req, res) => {
  try {
    const userId = req.user._id;
    const { clubId } = req.params;

    const membership = await ClubMember.findOne({ clubId, userId });

    if (!membership) {
      return res.json({ status: "not_requested" });
    }

    res.json({ status: membership.status });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get approved clubs for logged-in user
const getMyClubs = async (req, res) => {
  try {
    const userId = req.user._id;

    const memberships = await ClubMember.find({
      userId,
      status: "approved",
    })
      .populate("clubId", "name shortName coverImage")
      .select("clubId joinedAt role");

    res.json(memberships);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getClubMembers = async (req, res) => {
  try {
    const { clubId } = req.params;

    const members = await ClubMember.find({
      clubId,
      status: "approved",
    })
      .populate("userId", "displayName email photoURL studentId department batch")
      .select("userId role joinedAt");

    res.json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const updateMemberRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!["member", "executive", "leader"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const member = await ClubMember.findById(id);

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    // Ensure only 1 leader per club
    if (role === "leader") {
      const existingLeader = await ClubMember.findOne({
        clubId: member.clubId,
        role: "leader",
        status: "approved",
      });

      if (existingLeader && existingLeader._id.toString() !== id) {
        return res.status(400).json({
          message: "This club already has a leader",
        });
      }
    }

    member.role = role;
    await member.save();

    res.json({ message: "Role updated successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeMember = async (req, res) => {
  try {
    const { id } = req.params;

    const member = await ClubMember.findById(id);

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    if (member.role === "leader") {
      return res.status(400).json({
        message: "Cannot remove the leader. Assign new leader first.",
      });
    }

    await member.deleteOne();

    res.json({ message: "Member removed successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
    joinClub,
    getPendingRequests,
    approveRequest,
    rejectRequest,
    getClubMembers,
    updateMemberRole,
    removeMember,
    getMyMembershipStatus,
    getMyClubs
}