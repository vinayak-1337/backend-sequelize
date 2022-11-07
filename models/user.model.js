import { Sequelize, DataTypes } from "sequelize";
import sequelize from "./index.js";

const User = sequelize.define("users", {
  // user_id: {
  //   type: DataTypes.UUID,
  //   defaultValue: DataTypes.UUIDV4,
  //   primaryKey: true,
  // },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.SMALLINT,
    allowNull: false,
  },
  contact: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default User;