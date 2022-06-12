function schema() {
  return {
    description: "Make a payment",
    tags: ["Payment"],
    body: {
      type: "object",
      properties: {
        receiverId: {
          type: "string",
        },
        amountInEthers: {
          type: "string",
        },
      },
    },
    required: ["receiverId", "amountInEthers"],
  };
}

function handler({ contractInteraction, walletService }) {
  return async function (req) {
    return contractInteraction.sendPayment(
      await walletService.getDeployerWallet(),
      await walletService.getWallet(req.body.receiverId),
      req.body.amountInEthers,
    );
  };
}

module.exports = { schema, handler };
