import { Sequelize, DataTypes } from "sequelize";
import sequelize from "./index.js";
import User from "./user.model.js";

const Account = sequelize.define(
  "accounts",
  {
    account_number: {
      type: DataTypes.INTEGER(5),
      autoIncrement: true,
      primaryKey: true,
    },
    balance: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1000,
    },
  },
  { initialAutoIncrement: 10101 }
);
Account.belongsTo(User, {
  foreignKey: {
    name: "user_id",
  },
});
export default Account;
