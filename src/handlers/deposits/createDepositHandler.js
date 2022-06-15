const Deposit = require("../../models/deposit").Deposit;

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
    const receipt = await contractInteraction.deposit(
      await walletService.getWallet(req.body.senderId),
      req.body.amountInEthers,
    );

    // Save in DB
    await Deposit.create({
      user_id: req.body.senderId,
      txHash: receipt.hash,
      amount: req.body.amountInEthers,
    });

    return receipt;
  };
}

module.exports = { schema, handler };
