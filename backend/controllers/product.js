import { Router } from "express";
import { productService } from "../services";

const productController = Router();

productController.get("/", async (req, res, next) => {
  try {
    const products = await productService.getList();
    res.json(products);
  } catch (err) {
    next(err);
  }
});
productController.get("/:id", async (req, res, next) => {
  try {
    const product = await productService.getProduct(req.params);
    res.json(product);
  } catch (err) {
    next(err);
  }
});

export { productController };
