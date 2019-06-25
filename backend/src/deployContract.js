const Web3 = require('web3');
const contractAbi = require('../contracts/ElectionsABI.json');
const contractCode = require('../contracts/ElectionsBytecode.json').object;

const web3 = new Web3('http://127.0.0.1:7545');
web3.eth.transactionConfirmationBlocks = 1;

// const ownerAddress = '0x8274C99Bc6B51E0440C81576EC1d65971d7dd0d5'; // mudar para um endereço valido do ganache

/*
 * Ex.: node deployContract.js 0x8274C99Bc6B51E0440C81576EC1d65971d7dd0d5
 */
const ownerAddress = process.argv[2]; // passado como argumento na CLI

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
