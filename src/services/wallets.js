const ethers = require("ethers");
const User = require("../models/user").User;

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

  const newWallet = {
    id: user_id,
    publicKey: wallet.address,
    privateKey: wallet.privateKey,
  };

  const dbWallet = await User.create(newWallet);
  await dbWallet.save();

  return newWallet;
};

const getWalletsData = () => async () => {
  return await User.findAll();
};

const getWalletData = () => async user_id => {
  return await User.findByPk(user_id);
};

const getWallet = ({}) => async user_id => {
  const provider = new ethers.providers.InfuraProvider("kovan", process.env.INFURA_API_KEY);
  const wallet = await User.findByPk(user_id);
  return new ethers.Wallet(wallet.dataValues.privateKey, provider);
};

const getWalletBalance = () => async user_id => {
  const provider = new ethers.providers.InfuraProvider("kovan", process.env.INFURA_API_KEY);
  const wallet = await User.findByPk(user_id);

  const balance = provider.getBalance(wallet.dataValues.publicKey).then(balance => {
    // Convert a currency unit from wei to ether
    const balanceInEth = ethers.utils.formatEther(balance);
    return balanceInEth;
  });

  return balance;
};

module.exports = ({ config }) => ({
  createWallet: createWallet({ config }),
  getDeployerWallet: getDeployerWallet({ config }),
  getWalletsData: getWalletsData({ config }),
  getWalletData: getWalletData({ config }),
  getWallet: getWallet({ config }),
  getWalletBalance: getWalletBalance({ config }),
});
