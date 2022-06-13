const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/db");

const Payment = sequelize.define(
  "payment",
  {
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    txHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
    updatedAt: false,
  },
);

module.exports = {
  Payment: Payment,
};
