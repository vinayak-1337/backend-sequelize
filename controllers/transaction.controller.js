import Transaction from "../models/transaction.model.js";
import sequelize from "../models/index.js";
import { Op } from "sequelize";

export const transactionHistory = async (req, res) => {
  const { accountNumber } = req.body;
  try {
    const result = await Transaction.findAll({
      attributes: [
        ["id", "transactionId"],
        "credit",
        "debit",
        "amount",
        ["createdAt", "time"],
      ],
      where: {
        [Op.or]: [{ credit: accountNumber }, { debit: accountNumber }],
      },
      order: [["id", "DESC"]],
    });
    return res.send(result);
  } catch (error) {
    console.log("cannot get transaction history : ", error);
  }
};
