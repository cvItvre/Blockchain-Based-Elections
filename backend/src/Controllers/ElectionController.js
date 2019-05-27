const Web3 = require('web3');
const contractAbi = require('../../contracts/ElectionsABI.json');

const web3 = new Web3('http://127.0.0.1:7545');
web3.eth.transactionConfirmationBlocks = 1;

const sendVote = async (contractAddress, ownerAddress, voteData) => {
  try {
    const myContract = new web3.eth.Contract(contractAbi, contractAddress);

    const gas = await myContract.methods
      .vote(voteData.electionID, voteData.candidateID)
      .estimateGas();

    await myContract.methods.vote(voteData.electionID, voteData.candidateID).send({
      from: ownerAddress,
      gas,
    });
  } catch (e) {
    console.error(e);
  }
};

const sendGiveRightToVote = async (contractAddress, ownerAddress, voter) => {
  try {
    const myContract = new web3.eth.Contract(contractAbi, contractAddress);
    const gas = await myContract.methods
      .giveRightToVote(voter.electionID, voter.email)
      .estimateGas();

    await myContract.methods.giveRightToVote(voter.electionID, voter.email).send({
      from: ownerAddress,
      gas,
    });
  } catch (e) {
    console.error(e);
  }
};

const sendAddCandidate = async (contractAddress, ownerAddress, candidate) => {
  try {
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
  } catch (e) {
    console.error(e);
  }
};

const sendCreateElection = async (contractAddress, ownerAddress, election) => {
  try {
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
  } catch (e) {
    console.error(e);
  }
};

const getCountElections = async (contractAddress) => {
  try {
    const myContract = new web3.eth.Contract(contractAbi, contractAddress);
    const result = await myContract.methods.electionCount().call();

    const resultJSON = {
      countElection: result.toNumber(),
    };

    return JSON.stringify(resultJSON);
  } catch (e) {
    console.error(e);
  }
};

const getWinner = async (contractAddress, data) => {
  try {
    const myContract = new web3.eth.Contract(contractAbi, contractAddress);
    const result = await myContract.methods.winner(data.electionID).call();

    const resultJSON = {
      winner: result,
    };

    return JSON.stringify(resultJSON);
  } catch (e) {
    console.error(e);
  }
};

const getCandidate = async (contractAddress, data) => {
  try {
    const myContract = new web3.eth.Contract(contractAbi, contractAddress);
    const result = await myContract.methods.getCandidate(data.electionID, data.candidateID).call();

    const candidateData = {};

    candidateData.id = result['0'].toNumber();
    candidateData.name = result['1'];
    candidateData.number = result['2'].toNumber();
    candidateData.voteCount = result['3'].toNumber();

    return JSON.stringify(candidateData);
  } catch (e) {
    console.error(e);
  }
};

const getContractOwner = async (contractAddress) => {
  try {
    const myContract = new web3.eth.Contract(contractAbi, contractAddress);
    const result = await myContract.methods.contractOwner().call();

    const resultJSON = {
      contractOwner: result,
    };

    return JSON.stringify(resultJSON);
  } catch (e) {
    console.error(e);
  }
};

const getElections = async (contractAddress, data) => {
  try {
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

    return JSON.stringify(electionData);
  } catch (e) {
    console.error(e);
  }
};

const canVote = async (contractAddress, data) => {
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

const hasVoted = async (contractAddress, data) => {
  try {
    const myContract = web3.eth.Contract(contractAbi, contractAddress);
    const result = await myContract.methods.hasVoted(data.electionID, data.email).call();

    const resultJSON = {
      hasVoted: result,
    };

    return JSON.stringify(resultJSON);
  } catch (e) {
    console.error(e);
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
