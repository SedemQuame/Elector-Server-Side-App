//jshint esversion:6
// ===================================== requiring node modules ===================================== //
const mongoose = require('mongoose');
const userSchema = require('../models/user.model').userSchema;

// ==================================== creating database schema=======================================//
const electionSchema = mongoose.Schema({
    // election information
    name: String,
    description: String,
    image_url: String,
    start_time : String,
    end_time: String,
    status: {type: String, default: "Ongoing"},
    candidates: [{
        name: String,
        voteCount: {type: String, default: '0'},
        candidateImg: String,
    }],
});


// ==================================== creating schema model =========================================//
module.exports = mongoose.model('election', electionSchema);