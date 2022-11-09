import { Router } from "express";
import { productService } from "../services";

const productController = Router();

productController.get("/:productId", async (req, res, next) => {
  try {
    const product = await productService.getProduct(req.params);
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
});

export { productController };
