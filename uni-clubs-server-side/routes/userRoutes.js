const express = require('express');
const {createUser,userRole, getAllUsers, removeAdmin, makeAdmin, singleUser, updateProfile} = require('../controllers/userController');
const verifyFbToken = require('../middleware/verifyFbToken');
const verifyAdmin = require('../middleware/verifyAdmin');
const router = express.Router();

router.post('/user',createUser);
router.get("/users", verifyFbToken, verifyAdmin, getAllUsers);
router.patch('/users/admin/:id', verifyFbToken, verifyAdmin, makeAdmin);
router.patch('/users/remove-admin/:id', verifyFbToken, verifyAdmin, removeAdmin);
router.get('/users/:email', singleUser);
router.get('/user/role/:email',userRole);
router.patch('/user/profile/:email', verifyFbToken, updateProfile)

module.exports = router;