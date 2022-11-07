import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import router from "./routes/user.routes.js";
import sequelize from "./models/index.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", router);

try {
  await sequelize.sync();
  console.log("Synced db");
} catch (error) {
  console.log("Failed to sync db : ", error);
}

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("--------listening--------");
});
