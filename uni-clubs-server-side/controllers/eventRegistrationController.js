const EventRegistration = require("../models/eventRegistrationModel");
const Event = require("../models/eventModel");
const User = require("../models/userModel");
const Club = require("../models/clubModel")

// USER → Send registration request
const registerEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const user = await User.findOne({ email: req.decoded.email });
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ success:false, message:"Event not found"});
    }
    // prevent duplicate request
    const existing = await EventRegistration.findOne({
      event: eventId,
      user: user._id
    });
    if (existing) {
      return res.json({
        success:false,
        message:"You already sent registration request"
      });
    }

    const registration = await EventRegistration.create({
      event: eventId,
      club: event.club,
      user: user._id,
      name: req.body.name,
      studentId: req.body.studentId,
      department: req.body.department,
      phone: req.body.phone
    });

    res.json({
      success:true,
      message:"Registration request sent",
      data: registration
    });

  } catch (err) {
    res.status(500).json({ success:false, message:err.message});
  }
};

const getPendingRegistrations = async (req, res) => {
  try {

    const user = await User.findOne({ email: req.decoded.email });

    // find club where user is leader
    const club = await Club.findOne({ leader: user._id });

    if (!club) {
      return res.json({
        success: true,
        data: []
      });
    }

    const registrations = await EventRegistration.find({
      club: club._id,
      status: "pending"
    })
      .populate("event", "title eventDate")
      .populate("user", "displayName email studentId");

    res.json({
      success: true,
      data: registrations
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

const approveRegistration = async (req,res)=>{
  try{

    const { registrationId } = req.params;

    const reg = await EventRegistration.findById(registrationId);

    if(!reg){
      return res.status(404).json({success:false,message:"Request not found"});
    }

    reg.status = "approved";

    await reg.save();

    res.json({
      success:true,
      message:"Registration approved"
    });

  }catch(err){
    res.status(500).json({success:false,message:err.message});
  }
};


const rejectRegistration = async (req,res)=>{
  try{

    const { registrationId } = req.params;

    const reg = await EventRegistration.findById(registrationId);

    reg.status = "rejected";

    await reg.save();

    res.json({
      success:true,
      message:"Registration rejected"
    });

  }catch(err){
    res.status(500).json({success:false,message:err.message});
  }
};

const getEventParticipants = async (req,res)=>{
  try{

    const { eventId } = req.params;

    const users = await EventRegistration.find({
      event:eventId,
      status:"approved"
    })
      .populate("user","displayName email studentId")
      .sort({registeredAt:-1});

    res.json({success:true,data:users});

  }catch(err){
    res.status(500).json({success:false,message:err.message});
  }
};

const getMyRegistrations = async (req, res) => {
  try {

    const user = await User.findOne({ email: req.decoded.email });

    const registrations = await EventRegistration.find({
      user: user._id,
      status: "approved"
    })
      .populate("event", "title eventDate time venue")
      .sort({ registeredAt: -1 });

    res.json({
      success: true,
      data: registrations
    });

  } catch (err) {
    res.status(500).json({
      success:false,
      message: err.message
    });
  }
};

const getLeaderEvents = async (req, res) => {
  try {

    const user = await User.findOne({ email: req.decoded.email });

    const club = await Club.findOne({ leader: user._id });

    if (!club) {
      return res.json({
        success: true,
        upcoming: [],
        past: []
      });
    }

    const now = new Date();

    const upcoming = await Event.find({
      club: club._id,
      eventDate: { $gte: now }
    }).select("title eventDate");

    const past = await Event.find({
      club: club._id,
      eventDate: { $lt: now }
    }).select("title eventDate");

    res.json({
      success: true,
      upcoming,
      past
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

module.exports = {
    registerEvent,
    getPendingRegistrations,
    approveRegistration,
    rejectRegistration,
    getEventParticipants,
    getMyRegistrations,
    getLeaderEvents
}