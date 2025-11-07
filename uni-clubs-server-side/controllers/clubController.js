const Club = require("../models/clubModel");
const User = require("../models/userModel");

// USER CREATE CLUB REQUEST
const createClubRequest = async (req, res) => {
  try {
    const { 
      name,
      shortName,
      coverImage,
      description,
      mission,
      category,
      tags,
      images,
      documents,
      contactEmail,
      contactPhone,
      meetingTimes
    } = req.body;

  

    // check duplicate name
    const existing = await Club.findOne({ name: name.trim() });
    if (existing) {
      return res.status(400).json({ success: false, message: "A club with this name already exists or request is pending." });
    }

   const creatorUser = await User.findOne({ email: req.decoded.email });
    if(!creatorUser){
      return res.status(404).json({ success:false, message: "User not found in DB" });
    }

    const newClub = new Club({
      name,
      shortName,
      coverImage,
      description,
      mission,
      category,
      tags,
      images,
      documents,
      contactEmail,
      contactPhone,
      meetingTimes,
      status: "pending",
      createdBy: creatorUser._id
    });

    await newClub.save();
    res.status(201).json({ success:true, message:"Club request submitted!", club: newClub });

  } catch (error) {
    return res.status(500).json({ success:false, message: error.message });
  }
};


// ADMIN : GET PENDING CLUBS
const getPendingClubs = async(req,res)=>{
  try{
    const pending = await Club.find({ status:"pending" }).populate("createdBy","displayName email");
    res.status(200).json(pending);
  }catch(err){
    res.status(500).json({success:false,message:err.message});
  }
}


// ADMIN APPROVE or REJECT
const updateClubStatus = async (req, res) => {
  try {
    const { clubId } = req.params;
    const { action } = req.body;

    const club = await Club.findById(clubId).populate("createdBy");

    if(!club) return res.status(404).json({success:false,message:"Club not found"});

    if(action==="approve"){
      club.status="approved";
      club.leader = club.createdBy._id;

      // change user role to leader
      await User.findByIdAndUpdate(club.createdBy._id, { role:"leader" });

    }else if(action==="reject"){
      club.status="rejected";
    }else{
      return res.status(400).json({success:false,message:"Invalid action"});
    }

    await club.save();
    return res.json({success:true,message:`Club ${action}d successfully`});

  } catch (err) {
    res.status(500).json({success:false,message:err.message});
  }
};


// PUBLIC approved clubs listing
const getApprovedClubs = async(req,res)=>{
  try{
    const clubs = await Club.find({status:"approved"}).sort({createdAt:-1});
    res.status(200).json(clubs);
  }catch(err){
    res.status(500).json({success:false,message:err.message});
  }
}


// PUBLIC single club details page
const getClubById = async(req,res)=>{
  try{
    const { clubId } = req.params;
    const club = await Club.findById(clubId).populate("leader","name email role");
    if(!club) return res.status(404).json({success:false,message:"Club not found"});
    res.status(200).json(club);
  }catch(err){
    res.status(500).json({success:false,message:err.message});
  }
}



module.exports = {
  createClubRequest,
  getPendingClubs,
  updateClubStatus,
  getApprovedClubs,
  getClubById
};
