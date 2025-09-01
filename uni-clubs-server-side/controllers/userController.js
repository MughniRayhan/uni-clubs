const User = require('../models/userModel');

const createUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        const saveUser = await newUser.save();
        res.status(201).json(saveUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}






module.exports = {createUser};