const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const newUser = new User({ email, password });

        await newUser.save();

        res.status(201).json({ message: 'User saved successfully', user: newUser });
    } catch (err) {
        console.error('Error saving user:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
