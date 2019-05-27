const deployContract = require('../src/deployContract');
const ElectionContract = require('../src/Controllers/ElectionController');

// dados de teste ################
let addressContract = '0x0';
const ownerAddress = '0x86544D44C6A63621DDDc410D9abFEce49ca0246B'; // mudar para um endereço valido do ganache

const election = {
  name: 'eleicao1',
  domain: 'amaury@gmail.com',
  opening: Math.round(new Date().getTime() / 1000 + 10),
  closing: Math.round(new Date().getTime() / 1000 + 20),
};

const candidate1 = {
  electionID: 1,
  name: 'Pedro',
  number: 10,
};

const candidate2 = {
  electionID: 1,
  name: 'Jonas',
  number: 20,
};

const voter = {
  electionID: 1,
  email: 'amaury@teste.com',
};

const vote = {
  electionID: 1,
  candidateID: 2,
};

const data = {
  electionID: 1,
  candidateID: 2,
};
// ##########################

const teste = async () => {
  const instance = await deployContract.deployElectionContract();

  addressContract = instance.address;
  console.log(`Contract Address: ${addressContract}`);

  let result = await ElectionContract.getContractOwner(addressContract);
  console.log(`Owner Address: ${result}`);

  await ElectionContract.sendCreateElection(addressContract, ownerAddress, election);

  await ElectionContract.sendAddCandidate(addressContract, ownerAddress, candidate1);
  await ElectionContract.sendAddCandidate(addressContract, ownerAddress, candidate2);

  result = await ElectionContract.canVote(addressContract, voter);
  console.log(`Voter can vote? ${result}`);

  await ElectionContract.sendGiveRightToVote(addressContract, ownerAddress, voter);
  console.log('Permission to vote granted!');

  result = await ElectionContract.canVote(addressContract, voter);
  console.log(`Voter can vote? ${result}`);
  result = await ElectionContract.hasVoted(addressContract, voter);
  console.log(`Voter has voted? ${result}`);

  setTimeout(async () => {
    await ElectionContract.sendVote(addressContract, ownerAddress, vote);
    console.log('Voted candidate 2!');

    result = await ElectionContract.canVote(addressContract, voter);
    console.log(`Voter can vote? ${result}`);
    result = await ElectionContract.hasVoted(addressContract, voter);
    console.log(`Voter has voted? ${result}`);

    result = await ElectionContract.getCountElections(addressContract);
    console.log(`Contract count: ${result}`);

    result = await ElectionContract.getCandidate(addressContract, data);
    console.log('Candidate 2:');
    console.log(result);

    setTimeout(async () => {
      result = await ElectionContract.getWinner(addressContract, data);
      console.log(`Winner Election 1: ${result}`);

      result = await ElectionContract.getElections(addressContract, data);
      console.log('Contract 1:');
      console.log(result);
    }, 12000);
  }, 12000);
};

teste();
