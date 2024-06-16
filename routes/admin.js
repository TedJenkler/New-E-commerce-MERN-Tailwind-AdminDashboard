const express = require('express');
const User = require('../schema/userSchema');
const router = express.Router();
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
    try {
        const { username, email, password, admin } = req.body;

        const existingUser = await User.findOne({ email }); 
        if(existingUser){
            return res.status(400).json({ message: 'User already exists' })
        }

        const newUser = new User({
            username,
            email,
            password,
            admin
        })

        await newUser.save();

        res.status(200).json({ message: 'User created successfully', user: newUser })
    }catch (error) {
        console.error({ message: 'Register failed', error});
        res.status(500).json({ message: 'Internal server error'});
    }
})

router.post('/login', async (req, res) => {
    try {

    }catch (error) {
        console.error({ message: 'Login failed', error});
        res.status(500).json({ message: 'Internal server error'});
    }
});

module.exports = router