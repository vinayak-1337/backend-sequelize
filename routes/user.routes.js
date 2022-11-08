import { create, login, getUser } from "../controllers/user.controller.js";
import { deposit, transfer } from "../controllers/account.controller.js";
import { transactionHistory } from "../controllers/transaction.controller.js";
import { authenticateToken } from "../middleware/authenticate.js";
import { Router } from "express";

const router = Router();

router.post("/create", create);
router.post("/login", login);
router.post("/deposit", deposit);
router.post("/transfer", transfer);
router.get("/getUser", authenticateToken, getUser);
router.post("/transaction", transactionHistory);

export default router;
