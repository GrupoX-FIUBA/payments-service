require("dotenv").config();
const network = "kovan";
const deployArtifact = require(`../deployments/${network}/BasicPayments`);
const deployerMnemonic = process.env.MNEMONIC;
const infuraApiKey = process.env.INFURA_API_KEY;
const usersServiceURL = process.env.USERS_SERVICE_URL;

// Price in ethers
const prices = {
  Regular: 0.001,
  Silver: 0.002,
  Gold: 0.003,
};

console.log(deployerMnemonic);
module.exports = {
  contractAddress: deployArtifact.address,
  contractAbi: deployArtifact.abi,
  deployerMnemonic,
  infuraApiKey,
  network,
  prices,
  usersServiceURL,
};
