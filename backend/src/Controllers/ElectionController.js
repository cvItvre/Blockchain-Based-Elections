const Web3 = require('web3');
const electionsJSON = require('../../build/contracts/Elections.json');

let web3Provider = null;
const contracts = {};
const account = '0x0';
const hasVoted = false;

let web3 = new Web3();

const teste = async () => {
  try {
    const deployed = contracts.Elections.deployed();
    console.log(deployed);
  } catch (e) {
    console.error(e);
  }
};

const initContract = () => {
  // Instantiate a new truffle contract from the artifact
  contracts.Elections = web3.eth.Contract(electionsJSON);
  // Connect provider to interact with contract
  contracts.Elections.setProvider(web3Provider);

  // listenForEvents();

  // return render();
  return teste();
};

const initWeb3 = () => {
  if (typeof web3 !== 'undefined') {
    // If a web3 instance is already provided by Meta Mask.
    web3Provider = web3.currentProvider;
    web3 = new Web3(web3.currentProvider);
  } else {
    // Specify default instance if no web3 instance provided
    web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    web3 = new Web3(web3Provider);
  }

  console.log(web3Provider);
  return initContract();
};

module.exports = {
  initWeb3,
};
