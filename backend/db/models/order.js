import mongoose from "mongoose";
import { orderSchema } from "../schemas";

const Order = mongoose.model("orders", orderSchema);

class OrderModel {
  async getAll() {
    const orders = await Order.find({});
    return orders;
  }
  async getAllByUser(email) {
    const orders = await Order.find({ email });
    return orders;
  }
  async createOrder(state, email, products) {
    const order = await Order.create({ state, email, products });
    return order;
  }
  async getOne(_id) {
    const order = await Order.findOne({ _id });
    return order;
  }
  async modify(_id, newInfo) {
    const order = await Order.updateOne({ _id }, newInfo);
    return order;
  }
}

const orderModel = new OrderModel();

export { orderModel };
