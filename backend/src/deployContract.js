const Web3 = require('web3');
const contractAbi = require('../contracts/ElectionsABI.json');
const contractCode = require('../contracts/ElectionsBytecode.json').object;

const web3 = new Web3('http://127.0.0.1:7545');
web3.eth.transactionConfirmationBlocks = 1;

const ownerAddress = '0x12D31fce5cb8640EcC171518eab723DDD0588Ce4'; // mudar para um endereço valido do ganache

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

deployElectionContract().then((instance) => {
  console.log(instance.address);
});
