const express = require('express');
const Login = require('../models/Login');
const router = express.Router();
  
router.post('/', async (req, res) => {
    try {
        console.log('Request body:', req.body);  // Log incoming data

        const { Email, Password } = req.body;

        if (!Email || !Password) {
            return res.status(400).json({ message: "Email and Password are required" });
        }

        const login = new Login({ Email, Password });
        await login.save();
        res.status(201).json({ message: "Data created successfully" });
    } catch (error) {
        console.error("Error creating data", error);  // Log error details
        res.status(500).json({ message: "Error creating data" });
    }
});


module.exports = router;