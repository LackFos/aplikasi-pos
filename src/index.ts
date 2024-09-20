import express from "express";
import dotenv from "dotenv";
import connectToDatabase from "./database";

dotenv.config();
connectToDatabase();

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`⚡ App running at: http://localhost:${port}`);
});
