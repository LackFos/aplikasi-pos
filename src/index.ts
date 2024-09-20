import express from "express";
import dotenv from "dotenv";
import connectToDatabase from "./database";

import menuRouter from "./routes/MenuRoutes";

dotenv.config();
connectToDatabase();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/v1/menus", menuRouter);

app.listen(port, () => {
  console.log(`⚡ App running at: http://localhost:${port}`);
});
