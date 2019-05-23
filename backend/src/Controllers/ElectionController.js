const Web3 = require('web3');
const fs = require('fs');
const solc = require('solc');
// const electionsJSON = require('../../build/contracts/Elections.json');

const web3 = new Web3(Web3.givenProvider || 'ws://localhost:7545', null, {});

const abi = fs.readFileSync('./build/contracts/Elections.json', 'utf8');
const bytecode = fs.readFileSync('./build/contracts/Elections.bytecode', 'utf8');
const gasEstimate = web3.eth.estimateGas({ data: bytecode });
const MyContract = web3.eth.Contract(JSON.parse(abi));
console.log(MyContract);
const myContractReturned = MyContract.new(
  {
    from: web3.eth.coinbase,
    data: bytecode,
    gas: gasEstimate,
  },
  (err, myContract) => {
    if (!err) {
      // NOTE: The callback will fire twice!
      // Once the contract has the transactionHash property set and once its deployed on an address.
      // e.g. check tx hash on the first call (transaction send)
      if (!myContract.address) {
        // The hash of the transaction, which deploys the contract
        console.log(myContract.transactionHash);

        // check address on the second call (contract deployed)
      } else {
        console.log(myContract.address); // the contract address
      }
      // Note that the returned "myContractReturned" === "myContract",
      // so the returned "myContractReturned" object will also get the address set.
    }
  },
);

console.log(myContractReturned);

// https://github.com/ethereum/wiki/wiki/JavaScript-API#web3ethcontract
