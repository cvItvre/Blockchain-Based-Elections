const Web3 = require('web3');
const contractAbi = require('../contracts/ElectionsABI.json');
const contractCode = require('../contracts/ElectionsBytecode.json').object;

const web3 = new Web3('http://127.0.0.1:7545');
web3.eth.transactionConfirmationBlocks = 1;

const ownerAddress = '0x86544D44C6A63621DDDc410D9abFEce49ca0246B'; // mudar para um endereço valido do ganache

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
