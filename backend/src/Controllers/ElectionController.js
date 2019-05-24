const solc = require('solc');
const Web3 = require('web3');
const fs = require('fs');

const web3 = new Web3('http://127.0.0.1:7545');
web3.eth.transactionConfirmationBlocks = 1;

const electionsSOL = fs.readFileSync('./contracts/Elections.sol', 'utf8');
// const ownerAddress = '0x12D31fce5cb8640EcC171518eab723DDD0588Ce4';
const compiledContract = solc.compile(electionsSOL, 1).contracts[':Elections'];
const contractAbi = compiledContract.interface;

// para set's
// const options = {
//   from: ownerAddress,
//   gas: 3000000,
// };

const getCountElections = async (contractAddress) => {
  const myContract = new web3.eth.Contract(JSON.parse(contractAbi), contractAddress);
  const result = await myContract.methods.electionCount().call();

  return result.toNumber();
};

module.exports = {
  getCountElections,
};
