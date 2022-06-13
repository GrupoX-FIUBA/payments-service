const Payment = require("../models/payment").Payment;

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
    const receipt = await contractInteraction.sendPayment(
      await walletService.getDeployerWallet(),
      await walletService.getWallet(req.body.receiverId),
      req.body.amountInEthers,
    );

    // Save in DB
    await Payment.create({
      user_id: req.body.receiverId,
      txHash: receipt.hash,
      amount: req.body.amountInEthers,
    });

    return receipt;
  };
}

module.exports = { schema, handler };
