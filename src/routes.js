const getWalletData = require("./handlers/getWalletHandler");
const getWalletsData = require("./handlers/getWalletsHandler");
const createWallet = require("./handlers/createWalletHandler");
const createDeposit = require("./handlers/createDepositHandler");
const createPayment = require("./handlers/createPaymentHandler");
const getBalance = require("./handlers/getWalletBalanceHandler");
const getDepositsData = require("./handlers/getDepositsHandler");
const getUserDepositsData = require("./handlers/getUserDepositsHandler");
const getPaymentsData = require("./handlers/getPaymentsHandler");
const getUserPaymentsData = require("./handlers/getUserPaymentsHandler");
const deleteWallet = require("./handlers/deleteWalletHandler");

function getWalletDataRoute({ services, config }) {
  return {
    method: "GET",
    url: "/wallet/:user_id",
    schema: getWalletData.schema(config),
    handler: getWalletData.handler({ config, ...services }),
  };
}

function getWalletsDataRoute({ services, config }) {
  return {
    method: "GET",
    url: "/wallet",
    schema: getWalletsData.schema(config),
    handler: getWalletsData.handler({ config, ...services }),
  };
}

function getWalletBalanceRoute({ services, config }) {
  return {
    method: "GET",
    url: "/balance/:user_id",
    schema: getBalance.schema(config),
    handler: getBalance.handler({ config, ...services }),
  };
}

function createWalletRoute({ services, config }) {
  return {
    method: "POST",
    url: "/wallet",
    schema: createWallet.schema(config),
    handler: createWallet.handler({ config, ...services }),
  };
}

function createDepositRoute({ services, config }) {
  return {
    method: "POST",
    url: "/deposit",
    schema: createDeposit.schema(config),
    handler: createDeposit.handler({ config, ...services }),
  };
}

function createPaymentRoute({ services, config }) {
  return {
    method: "POST",
    url: "/payment",
    schema: createPayment.schema(config),
    handler: createPayment.handler({ config, ...services }),
  };
}

function getDepositsDataRoute({ services, config }) {
  return {
    method: "GET",
    url: "/deposit",
    schema: getDepositsData.schema(config),
    handler: getDepositsData.handler({ config, ...services }),
  };
}

function getUserDepositsDataRoute({ services, config }) {
  return {
    method: "GET",
    url: "/deposit/:user_id",
    schema: getUserDepositsData.schema(config),
    handler: getUserDepositsData.handler({ config, ...services }),
  };
}

function getPaymentsDataRoute({ services, config }) {
  return {
    method: "GET",
    url: "/payment",
    schema: getPaymentsData.schema(config),
    handler: getPaymentsData.handler({ config, ...services }),
  };
}

function getUserPaymentsDataRoute({ services, config }) {
  return {
    method: "GET",
    url: "/payment/:user_id",
    schema: getUserPaymentsData.schema(config),
    handler: getUserPaymentsData.handler({ config, ...services }),
  };
}

function deleteWalletRoute({ services, config }) {
  return {
    method: "DELETE",
    url: "/wallet/:user_id",
    schema: deleteWallet.schema(config),
    handler: deleteWallet.handler({ config, ...services }),
  };
}

module.exports = [
  getWalletDataRoute,
  getWalletsDataRoute,
  createWalletRoute,
  createDepositRoute,
  createPaymentRoute,
  getWalletBalanceRoute,
  getDepositsDataRoute,
  getUserDepositsDataRoute,
  getPaymentsDataRoute,
  getUserPaymentsDataRoute,
  deleteWalletRoute,
];
