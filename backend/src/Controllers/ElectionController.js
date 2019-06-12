const Web3 = require('web3');
const contractAbi = require('../../contracts/ElectionsABI.json');

const addressContract = ''
const web3 = new Web3('http://127.0.0.1:7545');
web3.eth.transactionConfirmationBlocks = 1;

const sendVote = async (req, res) => {
  try {
    const { ownerAddress, voteData } = JSON.parse(req.body);
    const myContract = new web3.eth.Contract(contractAbi, contractAddress);

    const gas = await myContract.methods
      .vote(voteData.electionID, voteData.candidateID)
      .estimateGas();

    await myContract.methods.vote(voteData.electionID, voteData.candidateID).send({
      from: ownerAddress,
      gas,
    });

    res.send();
  } catch (e) {
    res.status(500).send();
  }
};

const sendGiveRightToVote = async (req, res) => {
  try {
    const { ownerAddress, voter } = JSON.parse(req.body);
    const myContract = new web3.eth.Contract(contractAbi, contractAddress);
    const gas = await myContract.methods
      .giveRightToVote(voter.electionID, voter.email)
      .estimateGas();

    await myContract.methods.giveRightToVote(voter.electionID, voter.email).send({
      from: ownerAddress,
      gas,
    });

    res.send();
  } catch (e) {
    res.status(500).send();
  }
};

const sendAddCandidate = async (req, res) => {
  try {
    const { ownerAddress, candidate } = JSON.parse(req.body);
    const myContract = new web3.eth.Contract(contractAbi, contractAddress);
    const gas = await myContract.methods
      .addCandidates(candidate.electionID, candidate.name, candidate.number)
      .estimateGas();

    await myContract.methods
      .addCandidates(candidate.electionID, candidate.name, candidate.number)
      .send({
        from: ownerAddress,
        gas,
      });

    res.send();
  } catch (e) {
    res.status(500).send();
  }
};

const sendCreateElection = async (req, res) => {
  try {
    const { ownerAddress, election } = JSON.parse(req.body);
    const myContract = new web3.eth.Contract(contractAbi, contractAddress);
    const gas = await myContract.methods
      .createElection(election.name, election.domain, election.opening, election.closing)
      .estimateGas();

    await myContract.methods
      .createElection(election.name, election.domain, election.opening, election.closing)
      .send({
        from: ownerAddress,
        gas,
      });

    res.send();
  } catch (e) {
    res.status(500).send();
  }
};

const getCountElections = async (req, res) => {
  try {
    const myContract = new web3.eth.Contract(contractAbi, contractAddress);
    const result = await myContract.methods.electionCount().call();

    const resultJSON = {
      countElection: result.toNumber(),
    };

    res.json(JSON.stringify(resultJSON));
  } catch (e) {
    res.status(500).send();
  }
};

const getWinner = async (req, res) => {
  try {
    const { data } = JSON.parse(req.body);
    const myContract = new web3.eth.Contract(contractAbi, contractAddress);
    const result = await myContract.methods.winner(data.electionID).call();

    const resultJSON = {
      winner: result,
    };

    res.json(JSON.stringify(resultJSON));
  } catch (e) {
    res.status(500).send();
  }
};

const getCandidate = async (req, res) => {
  try {
    const { data } = JSON.parse(req.body);
    const myContract = new web3.eth.Contract(contractAbi, contractAddress);
    const result = await myContract.methods.getCandidate(data.electionID, data.candidateID).call();

    const candidateData = {};

    candidateData.id = result['0'].toNumber();
    candidateData.name = result['1'];
    candidateData.number = result['2'].toNumber();
    candidateData.voteCount = result['3'].toNumber();

    res.json(JSON.stringify(candidateData));
  } catch (e) {
    res.status(500).send();
  }
};

const getContractOwner = async (req, res) => {
  try {
    const myContract = new web3.eth.Contract(contractAbi, contractAddress);
    const result = await myContract.methods.contractOwner().call();

    const resultJSON = {
      contractOwner: result,
    };

    res.json(JSON.stringify(resultJSON));
  } catch (e) {
    res.status(500).send();
  }
};

const getElections = async (req, res) => {
  try {
    const { data } = JSON.parse(req.body);
    const myContract = new web3.eth.Contract(contractAbi, contractAddress);
    const result = await myContract.methods.elections(data.electionID).call();

    const electionData = {};

    electionData.electionID = result._electionID.toNumber();
    electionData.electionAdmin = result._electionAdmin;
    electionData.electionName = result._electionName;
    electionData.emailDomain = result._emailDomain;
    electionData.openingTime = result._openingTime.toNumber();
    electionData.closingTime = result._closingTime.toNumber();
    electionData.candidatesCount = result._candidatesCount.toNumber();
    electionData.votersCount = result._votersCount.toNumber();

    res.json(JSON.stringify(electionData));
  } catch (e) {
    res.status(500).send();
  }
};

const canVote = async (data) => {
  try {
    const myContract = web3.eth.Contract(contractAbi, contractAddress);
    const result = await myContract.methods.canVote(data.electionID, data.email).call();

    const resultJSON = {
      canVote: result,
    };

    return JSON.stringify(resultJSON);
  } catch (e) {
    console.error(e);
  }
};

const hasVoted = async (data) => {
  try {
    const { data } = JSON.parse(req.body);
    const myContract = web3.eth.Contract(contractAbi, contractAddress);
    const result = await myContract.methods.hasVoted(data.electionID, data.email).call();

    const resultJSON = {
      hasVoted: result,
    };

    res.json(JSON.stringify(resultJSON));
  } catch (e) {
    res.status(500).send();
  }
};

module.exports = {
  getCountElections,
  getWinner,
  getCandidate,
  getContractOwner,
  getElections,
  sendCreateElection,
  sendAddCandidate,
  sendGiveRightToVote,
  sendVote,
  canVote,
  hasVoted,
};
