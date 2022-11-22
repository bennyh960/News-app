import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chalk from "chalk";

import "./server/src/db/config/mongoose";

import { authRouter } from "./server/src/routes/index";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// app use general
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// app use routes
app.use(authRouter);

app.listen(PORT, () => {
  console.log(chalk.green("Server run on port ", PORT));
});
