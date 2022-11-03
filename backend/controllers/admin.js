import { Router } from "express";
import { productService, categoryService } from "../services";

const adminController = Router();

adminController.get("/", async (req, res, next) => {
  try {
    const categories = await categoryService.getList();
    res.json(categories);
  } catch (err) {
    next(err);
  }
});
adminController.post("/", async (req, res, next) => {
  try {
    const categoryName = await categoryService.regist(req.body);
    res.json({ name: categoryName });
  } catch (err) {
    next(err);
  }
});
adminController.put("/:name", async (req, res, next) => {
  try {
    const category = await categoryService.modify(
      req.params.name,
      req.body.name
    );
    res.json(category);
  } catch (err) {
    next(err);
  }
});
adminController.delete("/:name", async (req, res, next) => {
  try {
    const result = await categoryService.remove(req.params);
    res.json(result);
  } catch (err) {
    next(err);
  }
});
adminController.get("/product", async (req, res, next) => {
  try {
    const products = await productService.getList();
    res.json(products);
  } catch (err) {
    next(err);
  }
});
adminController.post("/product", async (req, res, next) => {
  try {
    const productId = await productService.regist(req.body);
    res.json({ id: productId });
  } catch (err) {
    next(err);
  }
});
adminController.delete("/product/:id", async (req, res, next) => {
  try {
    const result = await productService.remove(req.params);
    res.json(result);
  } catch (err) {
    next(err);
  }
});
adminController.put("/product/:id", async (req, res, next) => {
  try {
    const product = await productService.modify(req.params, req.body);
    res.json(product);
  } catch (err) {
    next(err);
  }
});

export { adminController };
