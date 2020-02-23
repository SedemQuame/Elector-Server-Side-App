// jshint esversion:8
require('dotenv').config({ path: __dirname + './../.env' });

//====================================== requiring modules ===========================================//
// node modules

// custom models
const user = require('../models/user.model').user;
const election = require('../models/election.model');

//================================== creating HTTP handler methods ==================================//
function processCandidateData(strObj) {
    const words = strObj.split(',');
    let newArr = [];
    for(let i =0; i < words.length; i++){
        let newVar = words[i] + "," + words[i+1];
        newArr.push(JSON.parse(newVar));
  	    i++;
    }
    // console.log(newArr);
    return newArr;
}

// create new election
exports.createElection = (req, res) => {
    election.create({
        name: req.query.electionName || null,
        description:req.query.electionDescription || null,
        start_time :req.query.electionStartTime || null,
        end_time:req.query.electionEndTime || null,
        candidates: processCandidateData(req.query.electionCandidates)
    }).then(() => {
        res.send({msg: `Election creation successful 😎😎`});
    }).catch((err) => {
        res.send({err: `${err}`});
        res.send({msg: `Election creation failed 😫😫 Candidates`});
    });
};

// get current vote results
exports.getElectionResult = (req, res) => {
    election.findById(req.query.electionId, (err, election) => {
        if(err){
            res.send({msg: `Can't get election results. Please try again in a minute.`});
        }else{
            res.send({result: election});
        }
    });
};

// uodate vote results
exports.updateResults = (req, res) => {
    // executes
   election.findOne({_id: req.query._id}, (err, docs) => {
       if(err){
        res.send({msg: `Unable to update, election.`});
       }else{
        // iterating through the docs.
        // console.log(docs.candidates);

        let newCount;
        
        docs.candidates.forEach(element => {
            // console.log(element);
            console.log(req.query.candidateId);
            // console.log(element._id);
            if(req.query.candidateId == element._id){
                // console.log("condition fulfilled");
                newCount = parseInt(JSON.stringify(element.voteCount)) + 1;
                element.voteCount = newCount;
                docs.save()
                    .then(() => {
                        console.log("New count for candidate with id: " + JSON.stringify(req.query.candidateId) + " is " + newCount);
                        res.send({msg: `Object updated.`});
                    }).catch(() => {
                        res.send({msg: `Object could not be updated.`});
                    });
            }
        });

       }
   });
};

// remove current Election
exports.removeElection = (req, res) => {
    election.findByIdAndRemove(req.query.electionId, (err, result) => {
        if(err){
            res.send({msg: `Error occurered whilst, removing election.`});
        }else{
            res.send({msg: `Election of id: ${req.query.electionId} was removed.`});
        }
    });
};

// remove all Elections
exports.removeAllElection = (req, res) => {
    election.deleteMany({})
            .then((docs) => {
                if(docs.ok == 1){
                    res.send({msg: `${docs.deletedCount} election entries deleted.`});
                }else{
                    res.send({msg: `Elections not deleted. Please try again later.`});
                }
                
            }).catch(() => {
                res.send({msg: `Elections not deleted. Please try again later.`});
            });
};

