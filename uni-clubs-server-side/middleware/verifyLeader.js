const verifyLeader = (req, res, next) => {
  try {
    // req.user is set by verifyFbToken
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    if (req.user.role !== "leader") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Leader only.",
      });
    }

    next();
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Leader verification failed",
    });
  }
};

module.exports = verifyLeader;
