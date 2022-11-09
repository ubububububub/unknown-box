import { Router } from "express";
import { qnaboardService } from "../services";

const qnaboardController = Router();

qnaboardController.get("/", async (req, res, next) => {
  try {
    const qnaboards = await qnaboardService.getList();
    res.status(200).json(qnaboards);
  } catch (err) {
    next(err);
  }
});
qnaboardController.get("/:qnaboardId", async (req, res, next) => {
  try {
    const qnaboard = await qnaboardService.getPost(req.params, req.body);
    res.status(200).json(qnaboard);
  } catch (err) {
    next(err);
  }
});
qnaboardController.post("/", async (req, res, next) => {
  try {
    const qnaboard = await qnaboardService.regist(
      req.body,
      req.headers["x-access-token"]
    );
    res.status(201).json(qnaboard);
  } catch (err) {
    next(err);
  }
});
qnaboardController.put("/:qnaboardId", async (req, res, next) => {
  try {
    const result = await qnaboardService.modify(req.params, req.body);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});
qnaboardController.delete("/:qnaboardId", async (req, res, next) => {
  try {
    const result = await qnaboardService.remove(req.params, req.body);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

export { qnaboardController };
