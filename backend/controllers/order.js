import { Router } from "express";
import { orderService } from "../services";

const orderController = Router();

orderController.post("/", async (req, res, next) => {
  try {
    const orderId = await orderService.postOrder(
      req.body,
      req.headers["x-access-token"]
    );
    res.status(201).json({ orderId });
  } catch (err) {
    next(err);
  }
});
orderController.get("/", async (req, res, next) => {
  try {
    const orders = await orderService.getListByUser(
      req.headers["x-access-token"]
    );
    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
});
orderController.put("/:orderId", async (req, res, next) => {
  try {
    const result = await orderService.putOrder(req.params, req.body);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});
orderController.delete("/:orderId", async (req, res, next) => {
  try {
    const result = await orderService.cancel(req.params);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

export { orderController };
