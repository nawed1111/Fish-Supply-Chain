const Gateway = artifacts.require("./Gateway.sol");

module.exports = function (deployer) {
  deployer.deploy(Gateway);
};
