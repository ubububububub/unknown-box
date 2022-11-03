import { Router } from "express";
import { categoryService } from "../services";

const categoryController = Router();

categoryController.get("/", async (req, res, next) => {
  try {
    const categories = await categoryService.getList();
    res.json(categories);
  } catch (err) {
    next(err);
  }
});
categoryController.get("/:name", async (req, res, next) => {
  try {
    const products = await categoryService.getProductsByCategory(req.params);
    res.json(products);
  } catch (err) {
    next(err);
  }
});

export { categoryController };
