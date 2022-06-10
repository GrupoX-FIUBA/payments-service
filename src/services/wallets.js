const ethers = require("ethers");
const accounts = [];

const getDeployerWallet = ({ config }) => () => {
  const provider = new ethers.providers.InfuraProvider(config.network, config.infuraApiKey);
  const wallet = ethers.Wallet.fromMnemonic(config.deployerMnemonic).connect(provider);
  console.log("Deployer wallet" + wallet.address);
  return wallet;
};

const createWallet = () => async user_id => {
  const provider = new ethers.providers.InfuraProvider("kovan", process.env.INFURA_API_KEY);
  // This may break in some environments, keep an eye on it
  const wallet = ethers.Wallet.createRandom().connect(provider);
  accounts.push({
    user_id: user_id,
    address: wallet.address,
    privateKey: wallet.privateKey,
  });
  const result = {
    user_id: user_id,
    address: wallet.address,
    privateKey: wallet.privateKey,
  };
  return result;
};

const getWalletsData = () => () => {
  return accounts;
};

const getWalletData = () => user_id => {
  return accounts.filter(account => account.user_id == user_id)[0];
};

const getWallet = ({}) => index => {
  const provider = new ethers.providers.InfuraProvider("kovan", process.env.INFURA_API_KEY);
  return new ethers.Wallet(accounts.filter(account => account.user_id == index)[0].privateKey, provider);
};

module.exports = ({ config }) => ({
  createWallet: createWallet({ config }),
  getDeployerWallet: getDeployerWallet({ config }),
  getWalletsData: getWalletsData({ config }),
  getWalletData: getWalletData({ config }),
  getWallet: getWallet({ config }),
});
