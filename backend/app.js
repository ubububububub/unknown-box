import "dotenv/config";
import cors from "cors";
import path from "path";
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import multer from "multer";
import { createClient } from "redis";
import { router } from "./controllers";
import { errorHandler } from "./middlewares";

mongoose.connect(process.env.MONGODB_URL);
mongoose.connection.on("connected", () =>
  console.log("정상적으로 DB를 연결했습니다.")
);

const redisClient = createClient({
  url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}/0`,
  legacyMode: true
});
redisClient.on("connect", () => {
  console.info("Redis connected!");
});
redisClient.on("error", err => {
  console.error("Redis Client Error", err);
});
redisClient.connect();

const redisCli = redisClient.v4;

const app = express();
const upload = multer();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", express.static(path.resolve(__dirname, "../frontend")));

app.use("/api", upload.single("thumbnail"), router);

app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend", "index.html"));
});

app.use(errorHandler);

export { app, redisCli };
