const express = require('express');
const morgan = require('morgan');
const deployContract = require('./src/Controllers/deployContract');
const ElectionContract = require('./src/Controllers/ElectionController');

let addressContract = '0x0';

const server = express();
server.use(morgan('dev'));

server.get('/', (req, res) => {
  res.send('Hello World');
});

const teste = async () => {
  const instance = await deployContract.deployElectionContract();

  addressContract = instance.address;
  console.log(addressContract);

  const result = await ElectionContract.getCountElections(addressContract);
  console.log(result);
};

teste();

server.listen(3000);
