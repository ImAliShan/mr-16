import "dotenv/config";

import express from "express";
import allRoutes from "./routes/index.js";
import { connectDB } from "./db/config.js";
import syncDb from "./db/init.js";

const app = express();

app.use(express.json());

app.use(allRoutes);

connectDB();
syncDb();

app.listen(3003, () => {
  console.log("server started");
});
