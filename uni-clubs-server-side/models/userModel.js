const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   
    email: {
      type: String,
      required: true,
      unique: true, // no duplicate emails
      lowercase: true,
      trim: true,
    },
    displayName: {
      type: String,
      required: true,
      trim: true,
    },
    photoURL: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "admin", "leader"], 
      default: "user",
    },
    status: { type: String, enum: ['active','banned','pending'], default: 'active' },
    studentId: { 
      type: String, 
      default: "" 
    },
  department: { 
    type: String, 
    default: "" 
  },
  enrolledClubs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Club' }],
  points: { type: Number, default: 0 },
badges: [{ code: String, name: String, dateAwarded: Date }],
  phone: { 
    type: String, 
    default: "" 
  },
  batch: { 
    type: String, 
    default: "" 
  },
  bio: { 
    type: String, 
    default: "" 
  },
    creation_date: {
      type: Date,
      default: Date.now, 
    },
    last_login: {
      type: Date,
      default: Date.now, 
    }
   
  

})

const User= mongoose.model('User', userSchema);
module.exports = User;