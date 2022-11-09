import { Sequelize, DataTypes } from "sequelize";
import Account from "./account.model.js";
import sequelize from "./index.js";
import User from "./user.model.js";

const Transaction = sequelize.define("transactions", {
  from: {
    type: DataTypes.INTEGER,
    references: {
      model: Account,
      key: "account_number",
    },
  },
  to: {
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
  foreignKey: "from",
});
Account.hasMany(Transaction, {
  foreignKey: "to",
});

export default Transaction;
