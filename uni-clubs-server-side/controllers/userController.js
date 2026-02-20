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


// get all users
const getAllUsers = async (req, res) => {
  try {
    const { search = "", role = "" } = req.query;

    const query = {};

    //  Search by name or email
    if (search.trim()) {
      query.$or = [
        { displayName: { $regex: search.trim(), $options: "i" } },
        { email: { $regex: search.trim(), $options: "i" } },
      ];
    }

    // Filter by role
    if (role && role !== "all") {
      query.role = role;
    }

    const users = await User.find(query)
      .sort({ creation_date: -1 })
      .lean();

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};
// make admin
const makeAdmin = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await User.findByIdAndUpdate(
      id,
      { role: 'admin' },
      { new: true } // return updated document
    );
    if (!result) return res.status(404).send({ message: 'User not found' });
    res.send(result);
  } catch (error) {
    console.error('Error making admin:', error);
    res.status(500).send({ message: 'Failed to make admin' });
  }
};

const singleUser = async (req, res) => {
  try {
    const email = req.params.email;
    const user = await User.findOne({ email }); 
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// remove admin
const removeAdmin = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await User.findByIdAndUpdate(
      id,
      { role: 'user' },
      { new: true }
    );
    if (!result) return res.status(404).send({ message: 'User not found' });
    res.send(result);
  } catch (error) {
    console.error('Error removing admin:', error);
    res.status(500).send({ message: 'Failed to remove admin' });
  }
};



// get user role
const userRole =async (req, res) =>  {
  try {
    const { email } = req.params;
    if (!email) {
      return res.status(400).send({ message: "Email parameter is required" });
    }
    const user = await User.findOne(
      { email }
    );
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.send({ role: user.role || "user" }); 
  } catch (error) {
    console.error("Error fetching user role:", error);
    res.status(500).send({ message: "Failed to get user role" });
  }
};


// update user profile
const updateProfile = async (req, res) => {
  try {
    const email = req.params.email;
    const { email: _, role: __, ...updateData } = req.body;

    const updatedUser = await User.findOneAndUpdate(
      { email },
      { $set: updateData },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Failed to update profile' });
  }
};

module.exports = {createUser, getAllUsers, makeAdmin,removeAdmin, singleUser, userRole, updateProfile};