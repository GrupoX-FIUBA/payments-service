const Wallet = require("../../models/wallet").Wallet;

function schema() {
  return {
    description: "Delete a wallet",
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
    const deletedWallet = await Wallet.findByPk(req.params.user_id).then(async wallet => {
      return await Wallet.destroy({
        where: {
          user_id: req.params.user_id,
        },
      }).then(() => {
        return wallet;
      });
    });

    return deletedWallet;
  };
}

module.exports = { handler, schema };
