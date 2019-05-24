const solc = require('solc');
const Web3 = require('web3');
const fs = require('fs');

const web3 = new Web3('http://127.0.0.1:7545');
web3.eth.transactionConfirmationBlocks = 1;

const electionsSOL = fs.readFileSync('./contracts/Elections.sol', 'utf8');
const ownerAddress = '0x12D31fce5cb8640EcC171518eab723DDD0588Ce4';
const compiledContract = solc.compile(electionsSOL, 1).contracts[':Elections'];
const contractAbi = compiledContract.interface;
const contractCode = compiledContract.bytecode;

const MyContract = new web3.eth.Contract(JSON.parse(contractAbi));

const deployElectionContract = async () => {
  const gas = await MyContract.deploy({ data: contractCode }).estimateGas();
  const instance = await MyContract.deploy({
    data: contractCode,
  }).send({
    from: ownerAddress,
    gas: gas + 1,
  });

  return instance;
};

module.exports = {
  deployElectionContract,
};
