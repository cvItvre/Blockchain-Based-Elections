const Elections = artifacts.require('./Elections.sol');

module.exports = function (deployer) {
  deployer.deploy(Elections);
};
