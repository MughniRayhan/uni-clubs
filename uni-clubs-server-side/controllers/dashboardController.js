const Club = require("../models/clubModel");
const Event = require("../models/eventModel");
const EventRegistration = require("../models/eventRegistrationModel");
const ClubMember = require("../models/ClubMember");
const User = require("../models/userModel");

const getUserDashboard = async (req, res) => {
  try {
    const userId = req.user._id;

    // -------------------------
    // MY CLUBS (approved)
    // -------------------------
    const myClubs = await ClubMember.countDocuments({
      userId,
      status: "approved"
    });

    // -------------------------
    // PARTICIPATED EVENTS (approved)
    // -------------------------
    const participatedEvents = await EventRegistration.countDocuments({
      user: userId,
      status: "approved"
    });

    // -------------------------
    // PARTICIPATED EVENTS PER MONTH
    // -------------------------
    const monthlyParticipations = await EventRegistration.aggregate([
      {
        $match: {
          user: userId,
          status: "approved"
        }
      },
      {
        $group: {
          _id: { $month: "$registeredAt" },
          events: { $sum: 1 }
        }
      },
      {
        $sort: { "_id": 1 }
      }
    ]);

    res.json({
      cards: {
        myClubs,
        participatedEvents
      },
      monthlyParticipations
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to load user dashboard",
      error: error.message
    });
  }
};

const getAdminDashboard = async (req, res) => {
  try {

    // TOTAL USERS
    const totalUsers = await User.countDocuments();


    // TOTAL APPROVED CLUBS
    const totalClubs = await Club.countDocuments({
      status: "approved"
    });


    // TOTAL APPROVED EVENTS
    const totalEvents = await Event.countDocuments({
      status: "approved"
    });


    // -----------------------------
    // HIGHEST CLUB MEMBERS
    // -----------------------------
    const clubMembersAgg = await ClubMember.aggregate([
      {
        $match: { status: "approved" }
      },
      {
        $group: {
          _id: "$clubId",
          members: { $sum: 1 }
        }
      },
      { $sort: { members: -1 } },
      { $limit: 1 }
    ]);

    const highestClubMembers =
      clubMembersAgg.length > 0 ? clubMembersAgg[0].members : 0;


    // -----------------------------
    // HIGHEST EVENT PARTICIPANTS
    // -----------------------------
    const eventParticipantsAgg = await EventRegistration.aggregate([
      {
        $match: { status: "approved" }
      },
      {
        $group: {
          _id: "$event",
          participants: { $sum: 1 }
        }
      },
      { $sort: { participants: -1 } },
      { $limit: 1 }
    ]);

    const highestParticipants =
      eventParticipantsAgg.length > 0
        ? eventParticipantsAgg[0].participants
        : 0;


    // -----------------------------
    // MONTHLY EVENTS (APPROVED)
    // -----------------------------
    const monthlyEvents = await Event.aggregate([
      {
        $match: { status: "approved" }
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          events: { $sum: 1 }
        }
      },
      { $sort: { "_id": 1 } }
    ]);


    // -----------------------------
    // CLUB STATUS PIE CHART
    // -----------------------------
    const clubStatusAgg = await Club.aggregate([
      {
        $group: {
          _id: "$status",
          value: { $sum: 1 }
        }
      }
    ]);

    const clubStatus = clubStatusAgg.map(item => ({
      name: item._id,
      value: item.value
    }));


    // -----------------------------
    // EVENT STATUS PIE CHART
    // -----------------------------
    const eventStatusAgg = await Event.aggregate([
      {
        $group: {
          _id: "$status",
          value: { $sum: 1 }
        }
      }
    ]);

    const eventStatus = eventStatusAgg.map(item => ({
      name: item._id,
      value: item.value
    }));


    // RESPONSE
    res.json({
      cards: {
        totalUsers,
        totalClubs,
        totalEvents,
        highestClubMembers,
        highestParticipants
      },
      monthlyEvents,
      clubStatus,
      eventStatus
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to load admin dashboard",
      error: error.message
    });
  }
};

const getLeaderDashboard = async (req, res) => {
  try {
    const leaderId = req.user._id; // from auth middleware

    // Clubs where user is leader
    const clubs = await Club.find({ leader: leaderId, status: "approved" }).select("_id name");

    const clubIds = clubs.map((c) => c._id);

    const totalClubs = clubs.length;

    // Events created by leader
    const totalEvents = await Event.countDocuments({
      createdBy: leaderId,
      status: "approved"
    });

    // Event registrations aggregation
    const registrations = await EventRegistration.aggregate([
      { $match: { club: { $in: clubIds }, status: "approved" } },
      {
        $group: {
          _id: "$event",
          participants: { $sum: 1 },
        },
      },
      { $sort: { participants: -1 } },
    ]);

    const highestParticipants =
      registrations.length > 0 ? registrations[0].participants : 0;

    // Monthly events for chart
    const monthlyEvents = await Event.aggregate([
      { $match: { createdBy: leaderId, status: "approved" } },
      {
        $group: {
          _id: { $month: "$createdAt" },
          events: { $sum: 1 },
        },
      },
      { $sort: { "_id": 1 } },
    ]);

    res.json({
      cards: {
        totalClubs,
        totalEvents,
        highestParticipants,
      },
      monthlyEvents,
      clubs,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { 
    getUserDashboard,
    getAdminDashboard,
    getLeaderDashboard 
};