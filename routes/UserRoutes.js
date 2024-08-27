const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user with hashed password
        const newUser = new User({ email, password: hashedPassword });

        await newUser.save();

        res.status(201).json({ message: 'User saved successfully', user: newUser });
    } catch (err) {
        console.error('Error saving user:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
