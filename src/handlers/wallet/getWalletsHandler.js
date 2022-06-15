const Wallet = require("../../models/wallet").Wallet;

function schema() {
  return {
    description: "Get all wallets information",
    tags: ["Wallet"],
    query: {
      type: "object",
      properties: {
        offset: {
          type: "integer",
          default: 0,
        },
        limit: {
          type: "integer",
          default: 100,
        },
      },
    },
  };
}

function handler({ walletService }) {
  return async function (req, reply) {
    const { count, rows } = await Wallet.findAndCountAll({
      offset: req.query.offset,
      limit: req.query.limit,
    });
    return reply.code(200).send(rows);
  };
}

module.exports = { handler, schema };
