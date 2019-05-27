const Web3 = require('web3');
const contractAbi = require('../../build/contracts/Elections.json').abi;
const contractCode = require('../../build/contracts/ElectionsBytecode.json').object;

const web3 = new Web3('http://127.0.0.1:7545');
web3.eth.transactionConfirmationBlocks = 1;

const ownerAddress = '0x12D31fce5cb8640EcC171518eab723DDD0588Ce4';

const MyContract = new web3.eth.Contract(contractAbi);

const deployElectionContract = async () => {
  const gas = await MyContract.deploy({ data: contractCode }).estimateGas();
  const instance = await MyContract.deploy({
    data: contractCode,
  }).send({
    from: ownerAddress,
    gas,
  });

  return instance;
};

module.exports = {
  deployElectionContract,
};
