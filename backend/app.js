import cors from "cors";
import path from "path";
import express from "express";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", express.static(path.resolve(__dirname, "../frontend")));

// 여기에도 __dirname 추가
app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend", "index.html"));
});

export { app };
