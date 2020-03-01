// jshint esversion:6
require('dotenv').config({ path: __dirname + './../.env' });

//====================================== requiring modules ===========================================//
// node modules
const bcrypt = require('bcryptjs');
const fs = require('fs');

// custom models
const user = require('../models/user.model').user;
const SALT_ROUNDS = 12;


//================================== creating HTTP handler methods ==================================//
// user authentication and logging
exports.login = (req, res) => {   
    if(req.body.password != null && req.body.email_address != null){
        if(req.body.email_address == `sedem.amekpewu.3@gmail.com` && req.body.password == `qwerty`){
            res.redirect('/home');
        } else {
            res.redirect('/login');
        }
    }else{
        res.send({msg: 'Password and/or email address cannot be null.'});
    }
};