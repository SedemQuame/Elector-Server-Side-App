// jshint esversion:6
// ================================ creating list application route ===================================//
module.exports = app => {
    const user = require('../controllers/user.controller');

    //========================================== app users routes ============================================//
    app.route('/user_login')
        .post(user.login);
};
