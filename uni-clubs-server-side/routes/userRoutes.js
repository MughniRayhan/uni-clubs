const express = require('express');
const {createUser,userRole} = require('../controllers/userController');
const router = express.Router();

router.post('/user',createUser);
router.get('/user/role/:email',userRole);

module.exports = router;