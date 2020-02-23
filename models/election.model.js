//jshint esversion:6
// ===================================== requiring node modules ===================================== //
const mongoose = require('mongoose');
const userSchema = require('../models/user.model').userSchema;

// ==================================== creating database schema=======================================//
const electionSchema = mongoose.Schema({
    // election information
    name: String,
    description: String,
    start_time : String,
    end_time: String,
    candidates: [{
        name: String,
        voteCount: {type: Number, default: 0},
    }],
});


// ==================================== creating schema model =========================================//
module.exports = mongoose.model('election', electionSchema);