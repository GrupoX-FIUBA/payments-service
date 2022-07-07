const Deposit = require("../../models/deposit").Deposit;
const { Op } = require("sequelize");

const PAGE_SIZE = 100;
const DAYS_WEEK = 7;

function schema() {
  return {
    description: "Retrieve deposits metrics",
    tags: ["Metrics"],
  };
}

function handler({}) {
  return async function (req, reply) {
    var today = new Date();
    var info = {};

    for (var i = 0; i < DAYS_WEEK; i++) {
      var selectedDayMin = new Date(today);
      var selectedDayMax = new Date(today);
      selectedDayMin.setDate(selectedDayMin.getDate() - i);
      selectedDayMin.setHours(0, 0, 0, 0);
      selectedDayMax.setDate(selectedDayMax.getDate() - i + 1);
      selectedDayMax.setHours(0, 0, 0, 0);

      var j = 0;
      var amountSum = 0;

      do {
        var { count, rows } = await Deposit.findAndCountAll({
          where: {
            createdAt: {
              [Op.lte]: selectedDayMax,
              [Op.gt]: selectedDayMin,
            },
          },
          offset: j * PAGE_SIZE,
          limit: PAGE_SIZE,
        });

        rows.forEach(deposit => {
          amountSum += deposit.amount;
        });

        j++;
      } while (count - j * PAGE_SIZE > 0);

      info[selectedDayMin.toISOString().split("T")[0]] = { count: count, amount: amountSum };
    }

    return reply.code(200).send(info);
  };
}

module.exports = { handler, schema };
