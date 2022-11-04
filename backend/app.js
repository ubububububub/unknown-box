import "dotenv/config";
import cors from "cors";
import path from "path";
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { router } from "./controllers";
import { errorHandler } from "./middlewares";

mongoose.connect(process.env.MONGODB_URL);
mongoose.connection.on("connected", () =>
  console.log("정상적으로 DB를 연결했습니다.")
);

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", express.static(path.resolve(__dirname, "../frontend")));

app.use("/api", router);

app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend", "index.html"));
});

app.use(errorHandler);

export { app };
