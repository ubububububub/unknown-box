import { Router } from "express";
import { categoryService, randomboxService } from "../services";

const mainController = Router();

mainController.get("/", async (req, res, next) => {
  try {
    const randomboxes = await randomboxService.getTwoForMain();
    const categories = await categoryService.getList();
    res.status(200).json({ randomboxes, categories });
  } catch (err) {
    next(err);
  }
});

export { mainController };
