const express = require("express");
const  verifyFbToken = require("../middleware/verifyFbToken");
const verifyAdmin = require("../middleware/verifyAdmin");
const { getAllUsers } = require("../controllers/adminController");

const router = express.Router();


router.get("/users", verifyFbToken, verifyAdmin, getAllUsers);

module.exports = router;
