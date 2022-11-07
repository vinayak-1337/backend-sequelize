import User from "../models/user.model.js";
import Account from "../models/account.model.js";
import Transaction from "../models/transaction.model.js";
import sequelize from "../models/index.js";
import { QueryTypes } from "sequelize";

export const deposit = async (req, res) => {
  const { accountNumber, amount } = req.body;
  try {
    const result = await sequelize.transaction(async (t) => {
      const [results, metadata] = await sequelize.query(
        `UPDATE accounts SET balance=balance+${amount} WHERE account_number=${accountNumber}`,
        {
          type: QueryTypes.UPDATE,
          transaction: t,
        }
      );
      const userTransaction = await Transaction.create({
        credit: accountNumber,
        amount,
      });
    });
    res.status(200).send("Deposit successful");
  } catch (error) {
    console.log("cannot insert amount : ", error);
  }
};

export const transfer = async (req, res) => {
  const { senderAccountNumber, receiverAccountNumber, amount } = req.body;
  try {
    const result = await sequelize.transaction(async (t) => {
      const [debitResults, debitMetadata] = await sequelize.query(
        `UPDATE accounts SET balance=balance-${amount} WHERE account_number=${senderAccountNumber}`,
        { transaction: t }
      );
      const [creditResults, creditMetadata] = await sequelize.query(
        `UPDATE accounts SET balance=balance+${amount} WHERE account_number=${receiverAccountNumber}`,
        { transaction: t }
      );
      const userTransaction = await Transaction.create(
        {
          debit: senderAccountNumber,
          credit: receiverAccountNumber,
          amount,
        },
        { transaction: t }
      );
      return userTransaction;
    });
    // res.status(200).send("Transfer successful");
    res.send(result);
  } catch (error) {
    console.log("Cannot transfer money : ", error);
  }
};
