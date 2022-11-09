import Transaction from "../models/transaction.model.js";
import sequelize from "../models/index.js";
import { Op } from "sequelize";

export const transactionHistory = async (req, res) => {
  const { accountNumber } = req.body;
  try {
    const result = await Transaction.findAll({
      attributes: [
        ["id", "transactionId"],
        "to",
        "from",
        "amount",
        ["createdAt", "time"],
      ],
      where: {
        [Op.or]: [{ to: accountNumber }, { from: accountNumber }],
      },
      order: [["id", "DESC"]],
    });
    return res.send(result);
  } catch (error) {
    res.sendStatus(500);
  }
};
