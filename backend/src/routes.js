const express = require('express');
const ElectionController = require('./Controllers/ElectionController');
const EmailController = require('./Controllers/EmailController');

const Router = express.Router();

/** ****************************************
 *                 ROTAS
 *
 * getCountElections => /getCountElections
 * getWinnerRouter => /getWinner/:id
 * getCandidate => /getCandidate/:idElection/:idCandidate
 * getContractOwner => /getContractOwner
 * getElections => /getElection/:id
 * canVote => /canVote/:id/:email
 * hasVoted => /hasVoted/:id/:email
 * sendCreateElection => /createElection
 * sendAddCandidate=> /addCandidate
 * sendGiveRightToVote => /giveRightToVote
 * sendVote => /vote
 * sendEmail => /sendEmail
 * validationEmail => /validationEmail
 * validationCode => /validationCode
 *
 ******************************************* */

Router.get('/getCountElections', ElectionController.getCountElections);
Router.get('/getWinner/:id', ElectionController.getWinner);
Router.get('/getCandidate/:idElection/:idCandidate', ElectionController.getCandidate);
Router.get('/getContractOwner', ElectionController.getContractOwner);
Router.get('/getElection/:id', ElectionController.getElections);
Router.get('/canVote/:id/:email', ElectionController.canVote);
Router.get('/hasVoted/:id/:email', ElectionController.hasVoted);
Router.post('/createElection', ElectionController.sendCreateElection);
Router.post('/addCandidate', ElectionController.sendAddCandidate);
Router.post('/giveRightToVote', ElectionController.sendGiveRightToVote);
Router.post('/vote', ElectionController.sendVote);
Router.post('/sendEmail', EmailController.sendEmail);
Router.post('/validationEmail', EmailController.validationEmail);
Router.post('/validationCode', EmailController.validationCode);

module.exports = Router;
