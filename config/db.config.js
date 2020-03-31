// jshint esversion:6
const dotenv = require('dotenv');
require('dotenv').config({ path: '../'});

module.exports = {
    url: `mongodb+srv://elector_admin:46cEBruRq9KDhYE1@cluster0-3et10.mongodb.net/test?retryWrites=true&w=majority`,
    // url: `mongodb://localhost:27017/Elector`,
    options: {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    }
};