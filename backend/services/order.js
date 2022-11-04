import { productModel, orderModel } from "../db/models";
import JWT from "../utils/token";

class OrderService {
  constructor(orderModel) {
    this.orderModel = orderModel;
  }
  async getList({ accessToken }) {
    const token = JWT.decodeToken(accessToken);
    let orders = await this.orderModel.getAllByUser(token.email);
    if (orders.length === 0) throw new Error("주문 이력이 없습니다.");
    for (let i = 0; i < orders.length; i++) {
      await orders[i].populate("products.product");
    }
    return orders;
  }
  async postOrder({ name, phone, address, products }, { accessToken }) {
    const token = JWT.decodeToken(accessToken);
    products.forEach(product => (product.count = Number(product.count)));
    for (let i = 0; i < products.length; i++) {
      const product = await productModel.getOne(products[i].product);
      //   if (product.count < products[i].count)
      //     throw new Error("재고가 부족합니다.");
      await productModel.modify(product._id, {
        count: product.count - products[i].count
      });
    }
    const order = await this.orderModel.createOrder(
      token.email,
      name,
      phone,
      address,
      products
    );
    return order;
  }
  async getOrder({ orderId }) {
    const order = await this.orderModel.getOne(orderId);
    if (!order) throw new Error("주문내역이 없습니다.");
    await order.populate("products.product");
    return order;
  }
  async putOrder({ orderId }, { name, phone, address }) {
    const newInfo = {};
    if (name) newInfo.name = name;
    if (phone) newInfo.phone = phone;
    if (address) newInfo.address = address;
    const order = await this.orderModel.modify(orderId, newInfo);
    return order;
  }
  async getWholeOrder() {
    const orders = await this.orderModel.getAll();
    if (orders.length === 0) throw new Error("주문내역이 없습니다.");
    for (let i = 0; i < orders.length; i++) {
      await orders[i].populate("products.product");
    }
    return orders;
  }
}

const orderService = new OrderService(orderModel);

export { orderService };
