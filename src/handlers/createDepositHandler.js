function schema() {
  return {
    description: "Make a deposit",
    tags: ["Deposit"],
    body: {
      type: "object",
      properties: {
        senderId: {
          type: "string",
        },
        amountInEthers: {
          type: "string",
        },
      },
    },
    required: ["senderId", "amountInEthers"],
  };
}

function handler({ contractInteraction, walletService }) {
  return async function (req) {
    return contractInteraction.deposit(walletService.getWallet(req.body.senderId), req.body.amountInEthers);
  };
}

module.exports = { schema, handler };
