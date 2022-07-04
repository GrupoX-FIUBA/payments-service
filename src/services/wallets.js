const ethers = require("ethers");
const Wallet = require("../models/wallet").Wallet;

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
    user_id: user_id,
    publicKey: wallet.address,
    privateKey: wallet.privateKey,
    subscription: "None",
  };

  const dbWallet = await Wallet.create(newWallet);
  await dbWallet.save();

  return newWallet;
};

const getWalletData = () => async user_id => {
  return await Wallet.findByPk(user_id);
};

const getWallet = ({}) => async user_id => {
  const provider = new ethers.providers.InfuraProvider("kovan", process.env.INFURA_API_KEY);
  const wallet = await Wallet.findByPk(user_id);
  return new ethers.Wallet(wallet.dataValues.privateKey, provider);
};

const getWalletBalance = () => async user_id => {
  const provider = new ethers.providers.InfuraProvider("kovan", process.env.INFURA_API_KEY);
  const wallet = await Wallet.findByPk(user_id);

  const balance = provider.getBalance(wallet.dataValues.publicKey).then(balance => {
    // Convert a currency unit from wei to ether
    const balanceInEth = ethers.utils.formatEther(balance);
    return balanceInEth;
  });

  return balance;
};

const transferToAddress = () => async (wallet, amount, destAddress) => {
  let tx = {
    to: destAddress,
    // Convert currency unit from ether to wei
    value: ethers.utils.parseEther(amount),
  };

  // Send a transaction
  return wallet.sendTransaction(tx);
};

module.exports = ({ config }) => ({
  createWallet: createWallet({ config }),
  getDeployerWallet: getDeployerWallet({ config }),
  getWalletData: getWalletData({ config }),
  getWallet: getWallet({ config }),
  getWalletBalance: getWalletBalance({ config }),
  transferToAddress: transferToAddress({ config }),
});
