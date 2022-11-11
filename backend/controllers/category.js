import { Router } from "express";
import { randomboxService } from "../services";

const categoryController = Router();

categoryController.get("/:categoryId/randombox", async (req, res, next) => {
  try {
    const randomboxes = await randomboxService.getListByCategory(req.params);
    res.status(200).json(randomboxes);
  } catch (err) {
    next(err);
  }
});

export { categoryController };
