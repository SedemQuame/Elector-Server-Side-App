// jshint esversion:6
// ================================ creating list application route ===================================//
module.exports = app => {
    const election = require('../controllers/election.controller');

    //========================================== election CRUD routes ============================================//

    // election creation route
    app.route('/create_election').post(election.createElection);    

    // get election result
    app.route('/get_election').post(election.getElectionResult);

    // delete current election
    app.route('/remove_election').post(election.removeElection);

    // delete all the current election
    app.route('/remove_all_elections').post(election.removeAllElection);

    // updating election results
    app.route('/update_election').post(election.updateResults);
};
