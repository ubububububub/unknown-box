import "dotenv/config";
import cors from "cors";
import path from "path";
import express from "express";
import mongoose from "mongoose";
import { router } from "./controllers";
import { errorHandler } from "./middlewares";

mongoose.connect(process.env.MONGODB_URL);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", express.static(path.resolve(__dirname, "../frontend")));

app.use("/api", router);

// 여기에도 __dirname 추가
app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend", "index.html"));
});

app.use(errorHandler);

export { app };
