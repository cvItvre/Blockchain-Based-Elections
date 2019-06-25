const Web3 = require('web3');
const contractAbi = require('../../contracts/ElectionsABI.json');

let contractAddress = '0x6E5938449cedE008886E6F08ECBdC639f6477e2B';

// Set contract address from CLI argument
if (process.argv[2] !== undefined) {
  contractAddress = process.argv[2];
  console.log(contractAddress);
}

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
      .then(async () => {
        // vai funcionar mas corrigir pra algo mais seguro
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
    const numberOfElections = await getCountElectionsUtil();

    const resultJSON = {
      countElection: numberOfElections,
    };

    res.json(resultJSON);
  } catch (e) {
    res.status(500).send();
  }
};

const getCountElectionsUtil = async () => {
  const myContract = new web3.eth.Contract(contractAbi, contractAddress);
  const result = await myContract.methods.electionCount().call();

  return result.toNumber();
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

    const candidateData = await getCandidateUtil(electionID, candidateID);

    res.json(candidateData);
  } catch (e) {
    res.status(500).send();
  }
};

const getCandidateUtil = async (electionID, candidateID) => {
  const myContract = new web3.eth.Contract(contractAbi, contractAddress);
  const result = await myContract.methods.getCandidate(electionID, candidateID).call();

  const candidateData = {
    id: result['0'].toNumber(),
    name: result['1'],
    number: result['2'].toNumber(),
    voteCount: result['3'].toNumber(),
  };

  return candidateData;
};

/*
  Ex: http://localhost:3001/api/getCandidates/1
*/
const getCandidatesList = async (req, res) => {
  try {
    const electionID = req.params.idElection;

    const electionData = await getElectionsUtil(electionID);
    const numberOfCandidates = electionData._candidatesCount;

    const candidates = [];

    for (let index = 0; index < numberOfCandidates; index++) {
      const candidateData = await getCandidateUtil(electionID, index);
      candidates.push(candidateData);
    }

    res.json(candidates);
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
    const electionData = await getElectionsUtil(electionID);

    res.json(electionData);
  } catch (e) {
    res.status(500).send();
  }
};

const getElectionsUtil = async (id) => {
  const myContract = new web3.eth.Contract(contractAbi, contractAddress);
  const result = await myContract.methods.elections(electionID).call();

  const electionData = {
    electionID: result._electionID.toNumber(),
    electionAdmin: result._electionAdmin,
    electionName: result._electionName,
    emailDomain: result._emailDomain,
    openingTime: result._openingTime.toNumber(),
    closingTime: result._closingTime.toNumber(),
    candidatesCount: result._candidatesCount.toNumber(),
    votersCount: result._votersCount.toNumber(),
  };

  return electionData;
};

/*
  Ex: http://localhost:3001/api/getElection
*/

const getElectionsList = async (req, res) => {
  try {
    const numberOfElections = await getCountElectionsUtil();
    const elections = [];

    for (let index = 0; index < numberOfElections; index++) {
      const electionData = await getElectionsUtil(index);

      elections.push(electionData);
    }

    res.json(elections);
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
  getCandidatesList,
  getContractOwner,
  getElections,
  getElectionsList,
  sendCreateElection,
  sendAddCandidate,
  sendGiveRightToVote,
  sendVote,
  canVote,
  hasVoted,
};
