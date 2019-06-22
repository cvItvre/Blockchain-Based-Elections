const Web3 = require('web3');
const contractAbi = require('../../contracts/ElectionsABI.json');

const contractAddress = '0xd1A2C51cFe22c94F73D6796D02404d94592630b7';
const web3 = new Web3('http://127.0.0.1:7545');
web3.eth.transactionConfirmationBlocks = 1;

/*
  Ex JSON:

  {
    "ownerAddress": "0xAb2a2274ABe4371fd7A6dcf937c4C91A1cBb24AE",
    "voteData": {
      "electionID": 1,
      "candidateID": 1
    }
  }

*/

const sendVote = async (req, res) => {
  try {
    const { ownerAddress, voteData } = req.body;
    const myContract = new web3.eth.Contract(contractAbi, contractAddress);

    // const gas = await myContract.methods
    //  .vote(voteData.electionID, voteData.candidateID)
    //  .estimateGas();

    await myContract.methods.vote(voteData.electionID, voteData.candidateID).send({
      from: ownerAddress,
    });

    res.json({ sucess: true });
  } catch (e) {
    res.status(500).send();
  }
};

/*
  Ex JSON:

  {
    "ownerAddress": "0xAb2a2274ABe4371fd7A6dcf937c4C91A1cBb24AE",
    "voter": {
      "electionID": 1,
      "email": "teste@ufrpe.br"
    }
  }

*/

const sendGiveRightToVote = async (req, res) => {
  try {
    const { ownerAddress, voter } = req.body;
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

/*
  Ex JSON:

  {
    "ownerAddress": "0x12D31fce5cb8640EcC171518eab723DDD0588Ce4",
    "candidate": {
      "electionID": 1,
      "name": "Pedro Henrique",
      "number": 30
    }
  }

*/

const sendAddCandidate = async (req, res) => {
  try {
    const { ownerAddress, candidate } = req.body;
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

/*
  Ex JSON:

  {
    "ownerAddress": "0x12D31fce5cb8640EcC171518eab723DDD0588Ce4",
    "election": {
      "name": "Eleicao nova",
      "domain": "@ufrpe.br",
      "opening": "1560566200",
      "closing": "1560566250"
    }
  }

*/

const sendCreateElection = async (req, res) => {
  try {
    const { ownerAddress, election } = req.body;
    const myContract = new web3.eth.Contract(contractAbi, contractAddress);
    const gas = await myContract.methods
      .createElection(election.name, election.domain, election.opening, election.closing)
      .estimateGas();

    await myContract.methods
      .createElection(election.name, election.domain, election.opening, election.closing)
      .send({
        from: ownerAddress,
        gas,
      })
      .then(async () => { // vai funcionar mas corrigir pra algo mais seguro
        const result = await myContract.methods.electionCount().call();
        res.json({ electionID: result.toNumber() });
      });
  } catch (e) {
    res.status(500).send();
  }
};

/*
  Ex: http://localhost:3001/api/getCountElections
*/

const getCountElections = async (req, res) => {
  try {
    const myContract = new web3.eth.Contract(contractAbi, contractAddress);
    const result = await myContract.methods.electionCount().call();

    const resultJSON = {
      countElection: result.toNumber(),
    };

    res.json(resultJSON);
  } catch (e) {
    res.status(500).send();
  }
};

/*
  Ex: http://localhost:3001/api/getWinner/1
*/

const getWinner = async (req, res) => {
  try {
    const electionID = req.params.id;
    const myContract = new web3.eth.Contract(contractAbi, contractAddress);
    const result = await myContract.methods.winner(electionID).call();

    const resultJSON = {
      winner: result,
    };

    res.json(resultJSON);
  } catch (e) {
    res.status(500).send();
  }
};

/*
  Ex: http://localhost:3001/api/getCandidate/1/1
*/

const getCandidate = async (req, res) => {
  try {
    const electionID = req.params.idElection;
    const candidateID = req.params.idCandidate;
    const myContract = new web3.eth.Contract(contractAbi, contractAddress);
    const result = await myContract.methods.getCandidate(electionID, candidateID).call();

    const candidateData = {};

    candidateData.id = result['0'].toNumber();
    candidateData.name = result['1'];
    candidateData.number = result['2'].toNumber();
    candidateData.voteCount = result['3'].toNumber();

    res.json(candidateData);
  } catch (e) {
    res.status(500).send();
  }
};

/*
  Ex: http://localhost:3001/api/getContractOwner
*/

const getContractOwner = async (req, res) => {
  try {
    const myContract = new web3.eth.Contract(contractAbi, contractAddress);
    const result = await myContract.methods.contractOwner().call();

    const resultJSON = {
      contractOwner: result,
    };

    res.json(resultJSON);
  } catch (e) {
    res.status(500).send();
  }
};

/*
  Ex: http://localhost:3001/api/getElection/1
*/

const getElections = async (req, res) => {
  try {
    const electionID = req.params.id;
    const myContract = new web3.eth.Contract(contractAbi, contractAddress);
    const result = await myContract.methods.elections(electionID).call();

    const electionData = {};

    electionData.electionID = result._electionID.toNumber();
    electionData.electionAdmin = result._electionAdmin;
    electionData.electionName = result._electionName;
    electionData.emailDomain = result._emailDomain;
    electionData.openingTime = result._openingTime.toNumber();
    electionData.closingTime = result._closingTime.toNumber();
    electionData.candidatesCount = result._candidatesCount.toNumber();
    electionData.votersCount = result._votersCount.toNumber();

    res.json(electionData);
  } catch (e) {
    res.status(500).send();
  }
};

/*
  Ex: http://localhost:3001/api/canVote/1/teste@ufrpe.br
*/

const canVote = async (req, res) => {
  try {
    const electionID = req.params.id;
    const { email } = req.params;
    const myContract = web3.eth.Contract(contractAbi, contractAddress);
    const result = await myContract.methods.canVote(electionID, email).call();

    const resultJSON = {
      canVote: result,
    };

    res.json(resultJSON);
  } catch (e) {
    res.status(500).send();
  }
};

/*
  Ex: http://localhost:3001/api/hasVoted/1/teste@ufrpe.br
*/

const hasVoted = async (req, res) => {
  try {
    const electionID = req.params.id;
    const { email } = req.params;
    const myContract = web3.eth.Contract(contractAbi, contractAddress);
    const result = await myContract.methods.hasVoted(electionID, email).call();

    const resultJSON = {
      hasVoted: result,
    };

    res.json(resultJSON);
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
