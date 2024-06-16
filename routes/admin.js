const express = require('express');
const User = require('../schema/userSchema');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Login failed:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router