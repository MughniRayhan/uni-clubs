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
    const clubs = await Club.find({status:"approved"})
  .populate("leader", "displayName email")
  .populate("createdBy", "displayName email")
  .sort({ createdAt: -1 });
    res.status(200).json(clubs);
  }catch(err){
    res.status(500).json({success:false,message:err.message});
  }
}

// GET ALL CLUBS (ADMIN)
const getAllClubs = async (req, res) => {
  try {
    const clubs = await Club.find({ status: { $ne: "pending" } })
      .populate("leader", "displayName email")
      .populate("createdBy", "displayName email")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, clubs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};


/**
 * GET club by id (public)
 */
const getClubById = async (req, res) => {
  try {
    const { clubId } = req.params;
    if (!clubId) return res.status(400).json({ success: false, message: "clubId required" });

    const club = await Club.findById(clubId)
      .populate("leader", "displayName email")
      .populate("createdBy", "displayName email")
      .lean();

    if (!club) return res.status(404).json({ success: false, message: "Club not found" });

    res.json({ success: true, data: club });
  } catch (err) {
    console.error("getClubById:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * PATCH /clubs/:clubId/details
 * Leader or admin only
 */
const updateClubDetails = async (req, res) => {
  try {
    const { club } = req;
    const payload = req.body;

    const allowed = ["name","shortName","description","mission","extraDetails","contactPhone","meetingTimes","category","tags"];
    allowed.forEach(f => {
      if (f in payload) {
        if (f === "tags" && Array.isArray(payload.tags)) {
          club.tags = payload.tags.map(t => t?.toString().trim()).filter(Boolean);
        } else {
          club[f] = payload[f];
        }
      }
    });

    club.updatedAt = new Date();
    await club.save();

    res.json({ success: true, message: "Club details updated", club });
  } catch (err) {
    console.error("updateClubDetails:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};


// Add gallery image
const addClubImage = async (req,res) => {
  try {
    const { clubId } = req.params;
    const { url, caption = "" } = req.body;
    if (!url) return res.status(400).json({ success:false, message: "Image url required" });
    const club = await Club.findById(clubId);
    if (!club) return res.status(404).json({ success:false, message: "Club not found" });
    club.images = club.images ? [...club.images, { url, caption }] : [{ url, caption }];
    await club.save();
    return res.status(201).json({ success:true, data: club.images[club.images.length-1] });
  } catch (err) {
    res.status(500).json({ success:false, message: err.message });
  }
};

// Remove gallery image
// DELETE /:clubId/gallery/:imageId
const removeClubImage = async (req, res) => {
  const { clubId, imageId } = req.params;
  try {
    const club = await Club.findById(clubId);
    if (!club) return res.status(404).json({ message: "Club not found" });

    const imageIndex = club.images.findIndex(img => img._id.toString() === imageId);
    if (imageIndex === -1) return res.status(404).json({ message: "Image not found" });

    // remove from array
    club.images.splice(imageIndex, 1);
    await club.save();

    res.json({ success: true, message: "Image removed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};


const addSection = async (req, res) => {
  try {
    const { clubId } = req.params;
    const { title = "", image = "", description } = req.body;

    if (!description) return res.status(400).json({ success:false, message: "description required" });

    const club = await Club.findById(clubId);
    if (!club) return res.status(404).json({ success:false, message: "Club not found" });

    const section = { title, image, description };
    club.sections = club.sections ? [...club.sections, section] : [section];
    await club.save();

    // return the newly added section (it will have _id)
    const added = club.sections[club.sections.length - 1];
    return res.status(201).json({ success:true, data: added });
  } catch (err) {
    console.error("addSection:", err);
    return res.status(500).json({ success:false, message: err.message });
  }
};

/**
 * DELETE /:clubId/sections/:sectionId
 * Requires leader or admin
 */
const removeSection = async (req, res) => {
  try {
    const { clubId, sectionId } = req.params;
    const club = await Club.findById(clubId); 
    if (!club) return res.status(404).json({ success:false, message: "Club not found" });

    // remove from sections array
    club.sections = club.sections.filter(s => s._id.toString() !== sectionId);
    await club.save();

    return res.json({ success:true, message: "Section removed" });
  } catch (err) {
    console.error("removeSection:", err);
    return res.status(500).json({ success:false, message: err.message });
  }
};

const getMyClubs = async (req, res) => {
  try {
    const email = req.decoded.email; // use decoded from middleware

    // Find the user first
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    // Find clubs where this user is the leader
    const clubs = await Club.find({ leader: user._id });

    res.json({ success: true, clubs });
  } catch (err) {
    console.error("getMyClubs:", err);
    res.status(500).json({ success: false, message: "Failed to load clubs" });
  }
};


// ADMIN: Update club fully
const updateClubByAdmin = async (req, res) => {
  try {
    const { clubId } = req.params;
    const payload = req.body;

    const club = await Club.findById(clubId);
    if (!club)
      return res.status(404).json({ success: false, message: "Club not found" });

    const allowedFields = [
      "name",
      "shortName",
      "description",
      "mission",
      "category",
      "contactEmail",
      "contactPhone",
      "meetingTimes",
      "tags"
    ];

    allowedFields.forEach((field) => {
      if (payload[field] !== undefined) {
        club[field] = payload[field];
      }
    });

    club.updatedAt = new Date();
    await club.save();

    res.json({ success: true, message: "Club updated successfully", club });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ADMIN: Delete club
const deleteClubAdmin = async (req, res) => {
  try {
    const { clubId } = req.params;

    const club = await Club.findById(clubId);
    if (!club)
      return res.status(404).json({ success: false, message: "Club not found" });

    await Club.findByIdAndDelete(clubId);

    res.json({ success: true, message: "Club deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  createClubRequest,
  getPendingClubs,
  updateClubStatus,
  getApprovedClubs,
  getAllClubs,
  getClubById,
  updateClubDetails,
  addClubImage,
  removeClubImage,
  addSection,
  removeSection,
  getMyClubs,
  updateClubByAdmin,
  deleteClubAdmin,
};
