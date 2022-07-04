const config = require("../../config");

function schema() {
  return {
    description: "Get subscriptions prices",
    tags: ["Subscriptions"],
  };
}

function handler({ walletService }) {
  return async function (req, reply) {
    return reply.code(200).send(config.prices);
  };
}

module.exports = { handler, schema };
