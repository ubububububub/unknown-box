import { Router } from "express";
import { productService, categoryService, orderService } from "../services";

const adminController = Router();

adminController.get("/category", async (req, res, next) => {
  try {
    const categories = await categoryService.getList();
    res.status(200).json(categories);
  } catch (err) {
    next(err);
  }
});
adminController.post("/category", async (req, res, next) => {
  try {
    const categoryName = await categoryService.regist(req.body);
    res.status(201).json({ name: categoryName });
  } catch (err) {
    next(err);
  }
});
adminController.put("/:categoryId", async (req, res, next) => {
  try {
    const category = await categoryService.modify(req.params, req.body);
    res.status(200).json(category);
  } catch (err) {
    next(err);
  }
});
adminController.delete("/:categoryId", async (req, res, next) => {
  try {
    const result = await categoryService.remove(req.params);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});
adminController.get("/product", async (req, res, next) => {
  try {
    const products = await productService.getList();
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
});
adminController.post("/product", async (req, res, next) => {
  try {
    const productId = await productService.regist(req.body);
    res.status(201).json({ id: productId });
  } catch (err) {
    next(err);
  }
});
adminController.delete("/product/:productId", async (req, res, next) => {
  try {
    const result = await productService.remove(req.params);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});
adminController.put("/product/:productId", async (req, res, next) => {
  try {
    const product = await productService.modify(req.params, req.body);
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
});
adminController.get("/order", async (req, res, next) => {
  try {
    const orders = await orderService.getWholeOrder();
    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
});
adminController.get("/order/:orderId", async (req, res, next) => {
  try {
    const order = await orderService.getOrder(req.params);
    res.status(200).json(order);
  } catch (err) {
    next(err);
  }
});

export { adminController };
