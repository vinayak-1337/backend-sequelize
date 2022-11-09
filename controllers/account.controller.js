import Transaction from "../models/transaction.model.js";
import sequelize from "../models/index.js";
import { QueryTypes } from "sequelize";

export const balance = async (req, res) => {};

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
        to: accountNumber,
        amount,
      });
    });
    return res.status(200).send("Deposit successful");
  } catch (error) {
    return res.sendStatus(500);
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
          from: senderAccountNumber,
          to: receiverAccountNumber,
          amount,
        },
        { transaction: t }
      );
      return userTransaction;
    });
    // res.status(200).send("Transfer successful");
    res.send(result);
  } catch (error) {
    if (error.index === "transactions_debit_fkey") {
      return res.status(404).send("sender account does not exits");
    } else if (error.index === "transactions_credit_fkey") {
      return res.status(404).send("receiver account does not exits");
    }
    res.sendStatus(500);
  }
};
