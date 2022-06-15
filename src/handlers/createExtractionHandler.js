const Extraction = require("../models/extraction").Extraction;

function schema() {
  return {
    description: "Make an extraction",
    tags: ["Extraction"],
    params: {
      type: "object",
      properties: {
        user_id: {
          type: "string",
        },
      },
    },
    body: {
      type: "object",
      properties: {
        destAddress: {
          type: "string",
        },
        amountInEthers: {
          type: "string",
        },
      },
    },
    required: ["user_id", "destAddress", "amountInEthers"],
  };
}

function handler({ walletService }) {
  return async function (req, reply) {
    const srcWallet = await walletService.getWallet(req.params.user_id);
    const receipt = await walletService.transferToAddress(srcWallet, req.body.amountInEthers, req.body.destAddress);

    // Save in DB
    await Extraction.create({
      user_id: req.params.user_id,
      txHash: receipt.hash,
      amount: req.body.amountInEthers,
      destAddress: req.body.destAddress,
    });

    return receipt;
  };
}

module.exports = { handler, schema };
