const mongoose = require('mongoose');

const googleLoginSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    googleId: { type: String, unique: true },
    // Add other fields as needed
});

const GoogleLogin = mongoose.model('GoogleLogin', googleLoginSchema);

module.exports = GoogleLogin;
