const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/db");

const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    publicKey: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    privateKey: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
    timestamps: false,
  },
);

module.exports = {
  User: User,
};
