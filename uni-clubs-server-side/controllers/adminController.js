const User = require("../models/userModel");

const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

module.exports = { getAllUsers };
