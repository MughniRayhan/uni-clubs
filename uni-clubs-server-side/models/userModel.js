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