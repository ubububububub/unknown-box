import mongoose from "mongoose";
import { orderSchema } from "../schemas";

const Order = mongoose.model("orders", orderSchema);

class OrderModel {
  async getAll() {
    const orders = await Order.find({});
    return orders;
  }
  async getAllByUser(orderEmail) {
    const orders = await Order.find({ orderEmail });
    return orders;
  }
  async createOrder(orderInfo) {
    const order = await Order.create(orderInfo);
    return order;
  }
  async getOne(_id) {
    const order = await Order.findOne({ _id });
    return order;
  }
  async modify(condition, orderInfo) {
    const result = await Order.updateOne(condition, orderInfo);
    return result;
  }
  async remove(_id) {
    const result = await Order.deleteOne({ _id });
    return result;
  }
}

const orderModel = new OrderModel();

export { orderModel };
