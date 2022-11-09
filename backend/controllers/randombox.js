import { Router } from "express";
import { randomboxService } from "../services";

const randomboxController = Router();

randomboxController.get("/:categoryId/randombox", async (req, res, next) => {
  try {
    const randomboxes = await randomboxService.getListByCategory(req.params);
    res.status(200).json(randomboxes);
  } catch (err) {
    next(err);
  }
});
randomboxController.get("/:randomboxId", async (req, res, next) => {
  try {
    const randombox = await randomboxService.getRandombox(req.params);
    res.status(200).json(randombox);
  } catch (err) {
    next(err);
  }
});
randomboxController.get("/", async (req, res, next) => {
  try {
    const randomboxes = await randomboxService.getRandomboxes();
    res.status(200).json(randomboxes);
  } catch (err) {
    next(err);
  }
});

export { randomboxController };
