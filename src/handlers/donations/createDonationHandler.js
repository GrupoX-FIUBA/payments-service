const Donation = require("../../models/donation").Donation;

function schema() {
  return {
    description: "Make a donation",
    tags: ["Donation"],
    body: {
      type: "object",
      properties: {
        sender_id: {
          type: "string",
        },
        receiver_id: {
          type: "string",
        },
        amountInEthers: {
          type: "string",
        },
      },
    },
    required: ["sender_id", "receiver_id", "amountInEthers"],
  };
}

function handler({ walletService }) {
  return async function (req, reply) {
    const srcWallet = await walletService.getWallet(req.body.sender_id);
    const destWallet = await walletService.getWallet(req.body.receiver_id);
    const receipt = await walletService.transferToAddress(srcWallet, req.body.amountInEthers, destWallet.address);

    // Save in DB
    await Donation.create({
      user_id: req.body.sender_id,
      txHash: receipt.hash,
      amount: req.body.amountInEthers,
      destUser: req.body.receiver_id,
    });

    return receipt;
  };
}

module.exports = { handler, schema };
