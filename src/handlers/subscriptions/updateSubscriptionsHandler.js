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
    var today = new Date();
    var i = 0;

    do {
      var { count, rows } = await Wallet.findAndCountAll({
        where: {
          expiration: {
            [Op.lte]: today,
          },
        },
        offset: i * PAGE_SIZE,
        limit: PAGE_SIZE,
      });

      rows.forEach(wallet => {
        console.log(wallet.dataValues);
        wallet.update({
          subscription: "None",
          expiration: null,
        });
      });

      i++;
    } while (count - i * PAGE_SIZE > 0);

    return reply.code(200).send({ msg: "subscriptions updated" });
  };
}

module.exports = { handler, schema };
