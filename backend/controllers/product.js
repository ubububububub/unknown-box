import { Router } from "express";
import { productService } from "../services";

const productController = Router();

productController.get("/", async (req, res, next) => {
  try {
    const products = await productService.getList();
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
});
productController.get("/:productId", async (req, res, next) => {
  try {
    const product = await productService.getProduct(req.params);
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
});

export { productController };
