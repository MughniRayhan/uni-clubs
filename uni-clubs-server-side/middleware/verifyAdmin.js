const admin = require("../config/firebase");
const User = require("../models/userModel");

const verifyAdmin = async (req, res, next) => {
  const email = req.decoded.email;
  if (!email) return res.status(401).send({ message: "Unauthorized" });

  try {
    const user = await User.findOne({ email });
    if(!user || user.role !== 'admin'){
      return res.status(403).send({message: "Forbidden accesss"})
    }
    next();
  } catch (error) {
    console.error("Error fetching user role:", error);
    res.status(500).send({ message: "Failed to fetch user role" });
  }
};

module.exports = verifyAdmin;
