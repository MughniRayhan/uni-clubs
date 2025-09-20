const User = require("../models/userModel");

const getAllUsers = async (req, res) => {
  const search = req.query.search;
  let query = {};

  if (search) {
    query = {
      $or: [
        { displayName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } }
      ]
    };
  }

  try {
    const users = await User.find(query).lean();
    res.send(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send({ message: "Failed to fetch users" });
  }
};

module.exports = { getAllUsers };
