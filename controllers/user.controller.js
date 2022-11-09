import * as dotenv from "dotenv";
dotenv.config();
import User from "../models/user.model.js";
import Account from "../models/account.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const create = async (req, res) => {
  const { name, age, contact, username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const result = await User.create({
      name,
      age,
      contact,
      username,
      password: hashedPassword,
    });
    const result2 = await Account.create({
      user_id: result.id,
    });
    // res.send(`User created : ${JSON.stringify(result)}`);
    return res.status(200).send(result);
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).send("username already exists");
    }
    return res.sendStatus(500);
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const userResult = await User.findOne({
      where: {
        username,
      },
    });
    if (!userResult) {
      return res.status(401).send("incorrect username or password");
    }
    if (await bcrypt.compare(password, userResult.password)) {
      const accountResult = await Account.findOne({
        where: {
          user_id: userResult.id,
        },
      });
      const userData = {
        id: userResult.id,
        name: userResult.name,
        username: userResult.username,
        age: userResult.age,
        balance: accountResult.balance,
        accountNumber: accountResult.account_number,
      };
      const accessToken = jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET);
      return res.status(201).send({
        userData,
        accessToken,
      });
    } else {
      return res.status(401).send("incorrect username or password");
    }
  } catch (error) {
    return res.sendStatus(500);
  }
};

export const getUser = async (req, res) => {
  const { id, name, username, accountNumber, age, balance } = req.user;
  res.status(200).send({ id, name, username, age, accountNumber, balance });
};
