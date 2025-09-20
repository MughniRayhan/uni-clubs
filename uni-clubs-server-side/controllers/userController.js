const User = require('../models/userModel');

const createUser = async (req, res) => {
  try {
    const { email, displayName, photoURL } = req.body;

    // Check if user already exists
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).json({
        message: "User already exists",
        user: existingUser
      });
    }

    // Create a new user if not exists
    const newUser = new User({
      email,
      displayName,
      photoURL,
      role: "user",
      creation_date: new Date(),
      last_login: new Date()
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {createUser};