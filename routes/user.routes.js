import { create, login } from "../controllers/user.controller.js";
import { deposit, transfer } from "../controllers/account.controller.js";
import { Router } from "express";

const router = Router();

router.post("/create", create);
router.post("/login", login);
router.post("/deposit", deposit);
router.post("/transfer", transfer);

export default router;
