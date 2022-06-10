function schema() {
  return {
    description: "Get all wallets information",
    tags: ["Wallet"],
    params: {},
  };
}

function handler({ walletService }) {
  return async function (req, reply) {
    const body = await walletService.getWalletsData();
    return reply.code(200).send(body);
  };
}

module.exports = { handler, schema };
