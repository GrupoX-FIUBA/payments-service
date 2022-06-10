function schema() {
  return {
    description: "Get deposit receipt",
    tags: ["Deposit"],
    params: {
      type: "object",
      properties: {
        txHash: {
          type: "string",
        },
      },
    },
    required: ["txHash"],
  };
}

function handler({ contractInteraction }) {
  return async function (req, reply) {
    const body = await contractInteraction.getDepositReceipt(req.params.txHash);
    reply.code(200).send(body);
  };
}

module.exports = { handler, schema };
