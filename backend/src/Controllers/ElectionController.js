const Web3 = require('web3');
const contractAbi = require('../../build/contracts/Elections.json').abi;

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

    return result.toNumber();
  } catch (e) {
    console.error(e);
  }
};

const getWinner = async (contractAddress, data) => {
  try {
    const myContract = new web3.eth.Contract(contractAbi, contractAddress);
    const result = await myContract.methods.winner(data.electionID).call();

    return result;
  } catch (e) {
    console.error(e);
  }
};

const getCandidate = async (contractAddress, data) => {
  try {
    const myContract = new web3.eth.Contract(contractAbi, contractAddress);
    const result = await myContract.methods.getCandidate(data.electionID, data.candidateID).call();

    const candidateData = {};

    candidateData._id = result['0'].toNumber();
    candidateData._name = result['1'];
    candidateData._number = result['2'].toNumber();
    candidateData._voteCount = result['3'].toNumber();

    return candidateData;
  } catch (e) {
    console.error(e);
  }
};

const getContractOwner = async (contractAddress) => {
  try {
    const myContract = new web3.eth.Contract(contractAbi, contractAddress);
    const result = await myContract.methods.contractOwner().call();

    return result;
  } catch (e) {
    console.error(e);
  }
};

const getElections = async (contractAddress, data) => {
  try {
    const myContract = new web3.eth.Contract(contractAbi, contractAddress);
    const result = await myContract.methods.elections(data.electionID).call();

    const electionData = {};

    electionData._electionID = result._electionID.toNumber();
    electionData._electionAdmin = result._electionAdmin;
    electionData._electionName = result._electionName;
    electionData._emailDomain = result._emailDomain;
    electionData._openingTime = result._openingTime.toNumber();
    electionData._closingTime = result._closingTime.toNumber();
    electionData._candidatesCount = result._candidatesCount.toNumber();
    electionData._votersCount = result._votersCount.toNumber();

    return electionData;
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
};
