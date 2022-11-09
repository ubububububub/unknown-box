import { Router } from "express";
import {
  productService,
  categoryService,
  orderService,
  randomboxService
} from "../services";

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
    await categoryService.regist(req.body);
    res.status(201);
  } catch (err) {
    next(err);
  }
});
adminController.put("/:categoryId", async (req, res, next) => {
  try {
    const result = await categoryService.modify(req.params, req.body);
    res.status(200).json(result);
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
adminController.get("/:productId", async (req, res, next) => {
  try {
    const product = await productService.getProduct(req.params);
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
});
adminController.post("/product", async (req, res, next) => {
  try {
    await productService.regist(req.body);
    res.status(201);
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
    const result = await productService.modify(req.params, req.body);
    res.status(200).json(result);
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
adminController.put("/order/:orderId", async (req, res, next) => {
  try {
    const result = await orderService.changeState(req.params, req.body);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});
adminController.delete("/order/:orderId", async (req, res, next) => {
  try {
    const result = await orderService.cancel(req.params);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});
adminController.get("/randombox", async (req, res, next) => {
  try {
    const randomboxes = await randomboxService.getRandomboxes();
    res.status(200).json(randomboxes);
  } catch (err) {
    next(err);
  }
});
adminController.get("/randombox/:randomboxId", async (req, res, next) => {
  try {
    const randombox = await randomboxService.getRandomboxForAdmin(req.params);
    res.status(200).json(randombox);
  } catch (err) {
    next(err);
  }
});
adminController.post("/randombox", async (req, res, next) => {
  try {
    await randomboxService.regist(req.body);
    res.status(201);
  } catch (err) {
    next(err);
  }
});
adminController.put("/randombox/:randomboxId", async (req, res, next) => {
  try {
    const result = await randomboxService.modify(req.params, req.body);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});
adminController.delete("/randombox/:randomboxId", async (req, res, next) => {
  try {
    const result = await randomboxService.remove(req.params);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

export { adminController };
