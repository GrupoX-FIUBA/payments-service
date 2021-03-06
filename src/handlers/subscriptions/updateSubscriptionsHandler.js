const Wallet = require("../../models/wallet").Wallet;
const { Op } = require("sequelize");
const axios = require("axios").create();
const USERS_SERVICE_URL = "https://users-service-manuelbilbao.cloud.okteto.net/";

axios.interceptors.request.use(function (config) {
  config.headers["X-API-Key"] = process.env.USERS_SERVICE_API_KEY;
  return config;
});

const USER_PREFIX = "user/";
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
        wallet.update({
          subscription: "None",
          expiration: null,
        });

        var path = USERS_SERVICE_URL + USER_PREFIX + wallet.user_id + "/subscription_status/";

        axios.patch(path, null, {
          params: {
            subscription: "None",
          },
        });
      });

      i++;
    } while (count - i * PAGE_SIZE > 0);

    return reply.code(200).send({ msg: "subscriptions updated" });
  };
}

module.exports = { handler, schema };
