const createWallet = require("./handlers/createWalletHandler");
const getWalletData = require("./handlers/getWalletHandler");
const getWalletsData = require("./handlers/getWalletsHandler");
const deleteWallet = require("./handlers/deleteWalletHandler");

const createDeposit = require("./handlers/createDepositHandler");
const getDepositsData = require("./handlers/getDepositsHandler");
const getUserDepositsData = require("./handlers/getUserDepositsHandler");

const getBalance = require("./handlers/getWalletBalanceHandler");

const createPayment = require("./handlers/createPaymentHandler");
const getPaymentsData = require("./handlers/getPaymentsHandler");
const getUserPaymentsData = require("./handlers/getUserPaymentsHandler");

const createExtraction = require("./handlers/createExtractionHandler");
const getExtractionsData = require("./handlers/getExtractionsHandler");
const getUserExtractionsData = require("./handlers/getUserExtractionsHandler");

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

function createExtractionRoute({ services, config }) {
  return {
    method: "POST",
    url: "/extraction/:user_id",
    schema: createExtraction.schema(config),
    handler: createExtraction.handler({ config, ...services }),
  };
}

function getExtractionsDataRoute({ services, config }) {
  return {
    method: "GET",
    url: "/extraction",
    schema: getExtractionsData.schema(config),
    handler: getExtractionsData.handler({ config, ...services }),
  };
}

function getUserExtractionsDataRoute({ services, config }) {
  return {
    method: "GET",
    url: "/extraction/:user_id",
    schema: getUserExtractionsData.schema(config),
    handler: getUserExtractionsData.handler({ config, ...services }),
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
  createExtractionRoute,
  getExtractionsDataRoute,
  getUserExtractionsDataRoute,
];
