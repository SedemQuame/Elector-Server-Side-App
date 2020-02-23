//jshint esversion:6
// ===================================== requiring node modules ===================================== //
const mongoose = require('mongoose');

// ==================================== creating database schema=======================================//
const userSchema = mongoose.Schema({
    // personal information
    name: String,
    phone_number: String,
    email_address: String,
    password: String,
    data_of_birth: { type: Date, default: Date.now },
    gender: String,
    photo_url: { type: String, default: 'none' },
});

// exporting user schema.
module.exports = {
    user: mongoose.model('user', userSchema),
    userSchema: userSchema
};
