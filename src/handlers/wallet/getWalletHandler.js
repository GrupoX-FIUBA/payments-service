function schema() {
  return {
    description: "Get wallet information",
    tags: ["Wallet"],
    params: {
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
    const body = await walletService.getWalletData(req.params.user_id);
    if (body === null) {
      reply.code(404).send({ detail: "Wallet not found" });
    }
    reply.code(200).send(body);
  };
}

module.exports = { handler, schema };
