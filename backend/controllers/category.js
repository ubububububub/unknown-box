import { Router } from "express";
import { categoryService } from "../services";

const categoryController = Router();

categoryController.get("/", async (req, res, next) => {
  try {
    const categories = await categoryService.getList();
    res.status(200).json(categories);
  } catch (err) {
    next(err);
  }
});

export { categoryController };
