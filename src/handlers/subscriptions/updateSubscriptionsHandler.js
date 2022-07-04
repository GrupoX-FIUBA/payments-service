const Wallet = require("../../models/wallet").Wallet;
const { Sequelize, Op } = require("sequelize");
const PAGE_SIZE = 100;

function schema() {
  return {
    description: "Update subscriptions (Called once daily)",
    tags: ["Subscriptions"],
  };
}

function handler({ walletService }) {
  return async function (req, reply) {
    var i = 0;
    do {
      var { count, rows } = await Wallet.findAndCountAll({
        where: {
          user_id: {
            [Op.substring]: "eze",
          },
        },
        offset: i * PAGE_SIZE,
        limit: PAGE_SIZE,
      });

      rows.forEach(wallet => {
        console.log(wallet.user_id);
      });

      i++;
    } while (count - i * PAGE_SIZE > 0);

    return reply.code(200).send({ msg: "subscriptions updated" });
  };
}

module.exports = { handler, schema };
