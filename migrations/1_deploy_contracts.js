var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var Education = artifacts.require("./EducationContract.sol");

export default function(deployer, network, accounts) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(Education);
};
