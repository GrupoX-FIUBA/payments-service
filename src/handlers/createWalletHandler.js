const { ConsoleLogger } = require("ts-generator/dist/logger");

function schema() {
  return {
    description: "Create a new wallet",
    tags: ["Wallet"],
    query: {
      type: "object",
      properties: {
        user_id: {
          type: "string",
        },
      },
    },
    required: ["user_id"],
  };
}

function handler({ walletService }) {
  return async function (req, reply) {
    const body = await walletService.createWallet(req.query.user_id);
    return reply.code(200).send(body);
  };
}

module.exports = { handler, schema };
