import { Router } from "express";
import { orderService } from "../services";

const orderController = Router();

orderController.get("/", async (req, res, next) => {
  try {
    const orders = await orderService.getList(req.cookies);
    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
});
orderController.post("/", async (req, res, next) => {
  try {
    const order = await orderService.postOrder(req.body, req.cookies);
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
});
orderController.get("/:orderId", async (req, res, next) => {
  try {
    const order = await orderService.getOrder(req.params);
    res.status(200).json(order);
  } catch (err) {
    next(err);
  }
});
orderController.put("/:orderId", async (req, res, next) => {
  try {
    const order = await orderService.putOrder(req.params, req.body);
    res.status(200).json(order);
  } catch (err) {
    next(err);
  }
});

export { orderController };
