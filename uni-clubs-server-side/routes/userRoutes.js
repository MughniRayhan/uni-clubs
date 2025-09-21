const express = require('express');
const {createUser,userRole, getAllUsers} = require('../controllers/userController');
const verifyFbToken = require('../middleware/verifyFbToken');
const verifyAdmin = require('../middleware/verifyAdmin');
const router = express.Router();

router.post('/user',createUser);
router.get("/users", verifyFbToken, verifyAdmin, getAllUsers);
router.get('/user/role/:email',userRole);

module.exports = router;