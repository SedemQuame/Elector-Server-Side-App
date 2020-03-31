// jshint esversion:6
// ================================ creating list application route ===================================//
module.exports = app => {
    const election = require('../controllers/election.controller');

    //========================================== election CRUD routes ============================================//

    app.get('/homeWithError', (req, res) =>{
        res.render(__dirname + './../views/home.views.ejs', {err: 'Could not delete element.'});
    });

    app.route('/home').get(election.routeToHome);


    app.route('/login').get((req, res) =>{
        res.render(__dirname + './../views/login.views.ejs');
    });
    
    app.route('/creatorPage').get((req, res) =>{
        res.render(__dirname + './../views/createElection.views.ejs');
    });
    

    // election creation route
    app.route('/create_election').post(election.createElection);    

    // get election result
    app.route('/get_election').get(election.getElectionResult);

    // get election result by id
    app.route('/get_election_by_id').get(election.getElectionResultById);

    // delete current election
    app.route('/remove_election_by_id').post(election.removeElectionById);

    // publish current election
    app.route('/publish_election_by_id').post(election.publishElectionById);

    // delete all the current election
    app.route('/remove_all_elections').get(election.removeAllElection);

    // updating election results
    app.route('/update_election').post(election.updateResults);

};
