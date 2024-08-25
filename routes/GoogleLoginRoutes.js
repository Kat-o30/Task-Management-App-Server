const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const router = express.Router();
const GoogleLogin = require('../models/GoogleLogin'); // Updated import

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post('/', async (req, res) => {
    const { token } = req.body; 
  
    if (!token) {
      return res.status(400).json({ message: 'Token is required' });
    }
  
    try {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
  
      const payload = ticket.getPayload();
      const email = payload.email;
      const googleId = payload.sub;
  
      let user = await GoogleLogin.findOne({ googleId });
  
      if (!user) {
        user = new GoogleLogin({
          email,
          googleId,
        });
        await user.save();
      }
  
      res.status(200).json(user);
  
    } catch (error) {
      console.error('Error verifying token:', error);
      res.status(500).json({ message: 'Error verifying token' });
    }
  });
  

module.exports = router;
