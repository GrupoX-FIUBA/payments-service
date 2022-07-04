const Wallet = require("../../models/wallet").Wallet;

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
    const wallet = await Wallet.findByPk(req.query.user_id);
    if (wallet != null) {
      reply.code(400).send({ detail: "Wallet already exists" });
    }
    const body = await walletService.createWallet(req.query.user_id);
    return reply.code(200).send(body);
  };
}

module.exports = { handler, schema };
