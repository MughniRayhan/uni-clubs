const express = require("express");
const router = express.Router();


const verifyFbToken = require("../middleware/verifyFbToken");
const verifyAdmin = require('../middleware/verifyAdmin');
const verifyLeader = require("../middleware/verifyLeader");
const { getLeaderDashboard, getAdminDashboard, getUserDashboard } = require("../controllers/dashboardController");

router.get("/user", verifyFbToken, getUserDashboard);

router.get("/admin",verifyFbToken, verifyAdmin, getAdminDashboard);

router.get("/leader", verifyFbToken, verifyLeader, getLeaderDashboard);

module.exports = router;