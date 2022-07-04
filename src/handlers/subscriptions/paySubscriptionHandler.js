const Wallet = require("../../models/wallet").Wallet;
const Deposit = require("../../models/deposit").Deposit;

const prices = require("../../config").prices;

function schema() {
  return {
    description: "Pay a subscription",
    tags: ["Subscriptions"],
    body: {
      type: "object",
      properties: {
        user_id: {
          type: "string",
        },
        subscription: {
          type: "string",
        },
      },
    },
    required: ["user_id", "subscription"],
  };
}

function handler({ contractInteraction, walletService }) {
  return async function (req, reply) {
    const wallet = await Wallet.findByPk(req.body.user_id);

    const receipt = await contractInteraction.deposit(
      await walletService.getWallet(req.body.user_id),
      prices[req.body.subscription].toString(),
    );

    // Save in DB
    await Deposit.create({
      user_id: req.body.user_id,
      txHash: receipt.hash,
      amount: prices[req.body.subscription],
    });

    var nowDate = new Date();
    var expDate = new Date(nowDate);
    expDate.setMonth(expDate.getMonth() + 1); // 1 Month

    var retVal = await wallet.update({
      subscription: req.body.subscription,
      expiration: expDate,
    });

    return reply.code(200).send(retVal);
  };
}

module.exports = { handler, schema };
