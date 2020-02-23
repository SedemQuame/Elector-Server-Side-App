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
// create new user
exports.createUser = (req, res) => {
    // console.log(req.query);
    
    if(req.query.password != null && req.query.email_address != null){
        console.log("test fulfilled");
        
        user.estimatedDocumentCount({email_address: req.query.email}, (err, result) => {
            if (err) {
                res.send({msg: `Account, creation failed. Please, try again.`});
              } else {                  
                if (result < 1){ 
                    bcrypt.genSalt(12, (err, salt) => {
                        let password = req.query.password;
                        bcrypt.hash(password, SALT_ROUNDS, (err, hash) => {
                            // Store hash in your password DB.
                            user.create({
                                name: req.query.name,
                                phone_number: req.query.phone_number,
                                email_address: req.query.email_address,
                                password: hash,
                                data_of_birth: req.query.data_of_birth||null,
                                gender: req.query.gender,
                                photo_url: req.query.photo_url,
                            }).then(() => {
                                res.send({msg: `Account, created successfully.`});
                            }).catch((err) => {
                                console.log(err);
                                res.send({msg: `Account, creation failed. Email already exists.`});
                            });
                        });
                    });
                }else{
                    res.send({msg: `Account, creation failed. Email already exists.`});
                }
              }
        });
    }else{
        res.json('Email and/or password cannot be null.');
    }
};


// user authentication and logging
exports.login = (req, res) => {
    if(req.query.password != null && req.query.email_address != null){
        user_to_login = user.where({ email_address: req.query.email });
            user_to_login.findOne().then((returnedUser) => {
                // Load hash from your password DB.
                bcrypt.compare(req.query.password, returnedUser.password).then(function(response) {
                    if (response == true) {
                        res.send({msg: 'Login Successful'});
                    } else {
                        res.send({msg: 'Wrong Login Credentials. Please try again.'});
                    }
                });
            }).catch((err) => {
                res.send({msg: 'Wrong Login Credentials'});
        });
    }else{
        res.send({msg: 'Password and/or email address cannot be null.'});
    }
};