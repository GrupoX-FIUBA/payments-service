const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/db");
const { Deposit } = require("./deposit");
const { Payment } = require("./payment");
const { Extraction } = require("./extraction");
const { Donation } = require("./donation");

const Wallet = sequelize.define(
  "wallet",
  {
    user_id: {
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

Wallet.hasMany(Deposit, {
  foreignKey: {
    name: "user_id",
  },
});

Wallet.hasMany(Payment, {
  foreignKey: {
    name: "user_id",
  },
});

Wallet.hasMany(Extraction, {
  foreignKey: {
    name: "user_id",
  },
});

Wallet.hasMany(Donation, {
  foreignKey: {
    name: "user_id",
  },
});

module.exports = {
  Wallet: Wallet,
};
