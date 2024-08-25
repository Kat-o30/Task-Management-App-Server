const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
   Email: { type: String, required: true },
   Password: { type: String, required: true },
})

const Login = mongoose.model('Login', loginSchema);

module.exports = Login;   