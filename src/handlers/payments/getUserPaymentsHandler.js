const Payment = require("../../models/payment").Payment;

function schema() {
  return {
    description: "Get all user payments information",
    tags: ["Payment"],
    params: {
      type: "object",
      properties: {
        user_id: {
          type: "string",
        },
      },
    },
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
    const { count, rows } = await Payment.findAndCountAll({
      where: {
        user_id: req.params.user_id,
      },
      offset: req.query.offset,
      limit: req.query.limit,
    });
    return reply.code(200).send(rows);
  };
}

module.exports = { handler, schema };
