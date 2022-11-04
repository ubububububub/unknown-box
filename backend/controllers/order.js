import { Router } from "express";
import { orderService } from "../services";

const orderController = Router();

orderController.get("/", async (req, res, next) => {
  try {
    const orders = await orderService.getList(req.cookies);
    res.json(orders);
  } catch (err) {
    next(err);
  }
});
orderController.post("/", async (req, res, next) => {
  try {
    const order = await orderService.postOrder(req.body, req.cookies);
    res.json(order);
  } catch (err) {
    next(err);
  }
});
orderController.get("/:orderId", async (req, res, next) => {
  try {
    const order = await orderService.getOrder(req.params);
    res.json(order);
  } catch (err) {
    next(err);
  }
});
orderController.put("/:orderId", async (req, res, next) => {
  try {
    const order = await orderService.putOrder(req.params, req.body);
    res.json(order);
  } catch (err) {
    next(err);
  }
});

export { orderController };
