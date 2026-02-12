const admin = require("../config/firebase");
const User = require("../models/userModel");

const verifyFbToken = async (req, res, next) => {
  const authHeaders = req.headers.authorization;
  if (!authHeaders) {
    return res.status(401).send({ message: "Unauthorized access" });
  }

  const token = authHeaders.split(" ")[1];
  if (!token) {
    return res.status(401).send({ message: "Unauthorized access" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
   

    // Find the user in your DB
    const user = await User.findOne({ email: decodedToken.email });
    if (!user) return res.status(404).json({ message: "User not found in DB" });

    req.user = user;          // <-- set req.user
    req.decoded = decodedToken; 
    next();
  } catch (error) {
    console.error(error);
    res.status(403).send({ message: "Forbidden access" });
  }
};

module.exports = verifyFbToken;
