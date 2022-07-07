const createWallet = require("./handlers/wallet/createWalletHandler");
const getWalletData = require("./handlers/wallet/getWalletHandler");
const getWalletsData = require("./handlers/wallet/getWalletsHandler");
const deleteWallet = require("./handlers/wallet/deleteWalletHandler");

const createDeposit = require("./handlers/deposits/createDepositHandler");
const getDepositsData = require("./handlers/deposits/getDepositsHandler");
const getUserDepositsData = require("./handlers/deposits/getUserDepositsHandler");

const getBalance = require("./handlers/wallet/getWalletBalanceHandler");

const createPayment = require("./handlers/payments/createPaymentHandler");
const getPaymentsData = require("./handlers/payments/getPaymentsHandler");
const getUserPaymentsData = require("./handlers/payments/getUserPaymentsHandler");

const createExtraction = require("./handlers/extractions/createExtractionHandler");
const getExtractionsData = require("./handlers/extractions/getExtractionsHandler");
const getUserExtractionsData = require("./handlers/extractions/getUserExtractionsHandler");

const createDonation = require("./handlers/donations/createDonationHandler");
const getDonationsData = require("./handlers/donations/getDonationsHandler");
const getUserDonationsData = require("./handlers/donations/getUserDonationsHandler");

const updateSubscriptions = require("./handlers/subscriptions/updateSubscriptionsHandler");
const paySubscriptions = require("./handlers/subscriptions/paySubscriptionHandler");
const getSubscriptionsPrices = require("./handlers/subscriptions/getSubscriptionsPrices");

const getDepositsAmount = require("./handlers/metrics/depositsAmountHandler");
const getPaymentsAmount = require("./handlers/metrics/paymentsAmountHandler");

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
    url: "/extraction",
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

function createDonationRoute({ services, config }) {
  return {
    method: "POST",
    url: "/donation",
    schema: createDonation.schema(config),
    handler: createDonation.handler({ config, ...services }),
  };
}

function getDonationsDataRoute({ services, config }) {
  return {
    method: "GET",
    url: "/donation",
    schema: getDonationsData.schema(config),
    handler: getDonationsData.handler({ config, ...services }),
  };
}

function getUserDonationsDataRoute({ services, config }) {
  return {
    method: "GET",
    url: "/donation/:user_id",
    schema: getUserDonationsData.schema(config),
    handler: getUserDonationsData.handler({ config, ...services }),
  };
}

function updateSubscriptionsRoute({ services, config }) {
  return {
    method: "PATCH",
    url: "/subscriptions",
    schema: updateSubscriptions.schema(config),
    handler: updateSubscriptions.handler({ config, ...services }),
  };
}

function paySubscriptionsRoute({ services, config }) {
  return {
    method: "POST",
    url: "/subscriptions",
    schema: paySubscriptions.schema(config),
    handler: paySubscriptions.handler({ config, ...services }),
  };
}

function getSubscriptionsPricesRoute({ services, config }) {
  return {
    method: "GET",
    url: "/subscriptions",
    schema: getSubscriptionsPrices.schema(config),
    handler: getSubscriptionsPrices.handler({ config, ...services }),
  };
}

function getDepositsAmountRoute({ services, config }) {
  return {
    method: "GET",
    url: "/metrics/deposits",
    schema: getDepositsAmount.schema(config),
    handler: getDepositsAmount.handler({ config, ...services }),
  };
}

function getPaymentsAmountRoute({ services, config }) {
  return {
    method: "GET",
    url: "/metrics/payments",
    schema: getPaymentsAmount.schema(config),
    handler: getPaymentsAmount.handler({ config, ...services }),
  };
}

module.exports = [
  getWalletDataRoute,
  getWalletsDataRoute,
  createWalletRoute,
  deleteWalletRoute,
  getWalletBalanceRoute,
  createDepositRoute,
  createPaymentRoute,
  getDepositsDataRoute,
  getUserDepositsDataRoute,
  getPaymentsDataRoute,
  getUserPaymentsDataRoute,
  createExtractionRoute,
  getExtractionsDataRoute,
  getUserExtractionsDataRoute,
  createDonationRoute,
  getDonationsDataRoute,
  getUserDonationsDataRoute,
  updateSubscriptionsRoute,
  paySubscriptionsRoute,
  getSubscriptionsPricesRoute,
  getDepositsAmountRoute,
  getPaymentsAmountRoute,
];
