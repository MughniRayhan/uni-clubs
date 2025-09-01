const express = require('express');
const {createUser, getUsers, getUserById, updatedUser, deleteUser} = require('../controllers/userController');
const router = express.Router();

router.post('/user',createUser);

module.exports = router;