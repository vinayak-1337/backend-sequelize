import { Sequelize, DataTypes } from "sequelize";
import Account from "./account.model.js";
import sequelize from "./index.js";
import User from "./user.model.js";

const Transaction = sequelize.define("transactions", {
  debit: {
    type: DataTypes.INTEGER,
    references: {
      model: Account,
      key: "account_number",
    },
  },
  credit: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Account,
      key: "account_number",
    },
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Account.hasMany(Transaction, {
  foreignKey: "debit",
});
Account.hasMany(Transaction, {
  foreignKey: "credit",
});

export default Transaction;
