import {
  userModel,
  productModel,
  orderModel,
  randomboxModel
} from "../db/models";
import JWT from "../utils/token";

class OrderService {
  constructor(orderModel, productModel, randomboxModel, userModel) {
    this.orderModel = orderModel;
    this.productModel = productModel;
    this.randomboxModel = randomboxModel;
    this.userModel = userModel;
  }
  async getList(accessToken) {
    const token = JWT.decodeToken(accessToken);
    let orders = await this.orderModel.getAllByUser(token.email);
    if (orders.length === 0) throw new Error("주문 이력이 없습니다.");
    for (let i = 0; i < orders.length; i++) {
      await orders[i]
        .populate("randomboxes.randombox")
        .populate("products.product");
    }
    return orders;
  }
  // 주문결제창에서 고객이 이전에 사용한 이름,주소,전화가 있는지 - 근데 이건 userService에 있어야 될 수도...
  async getUser(accessToken) {
    const token = JWT.decodeToken(accessToken);
    const { name, address, phone } = await this.userModel.getByEmail(
      token.email
    );
    const user = {};
    if (name) user.orderName = name;
    if (phone) user.orderPhone = phone;
    user.orderName = address;
    return user;
  }
  async postOrder(
    {
      orderName,
      orderPhone,
      orderAddress,
      randomboxes,
      products,
      boxesPrice,
      deliveryPrice,
      totalPrice
    },
    accessToken
  ) {
    const token = JWT.decodeToken(accessToken);
    await this.userModel.modify(token.email, {
      name: orderName,
      address: orderAddress,
      phone: orderPhone
    });
    randomboxes.forEach(
      randombox => (randombox.count = Number(randombox.count))
    );
    for (let i = 0; i < randomboxes.length; i++) {
      const randombox = await this.randomboxModel.getOne(
        randomboxes[i].randombox
      );
      await this.randomboxModel.modify(randombox._id, {
        count: randombox.count - randomboxes[i].count
      });
    }
    products.forEach(product => (product.count = Number(product.count)));
    for (let i = 0; i < products.length; i++) {
      const product = await this.productModel.getOne(products[i].product);
      await this.productModel.modify(product._id, {
        count: product.count - products[i].count
      });
    }
    const order = await this.orderModel.createOrder({
      orderEmail: token.email,
      orderName,
      orderPhone,
      orderAddress,
      randomboxes,
      products,
      boxesPrice: Number(boxesPrice),
      deliveryPrice: Number(deliveryPrice),
      totalPrice: Number(totalPrice)
    });
    return order._id;
  }
  async getOrder({ orderId }) {
    const order = await this.orderModel.getOne(orderId);
    if (!order) throw new Error("주문내역이 없습니다.");
    await order.populate("randomboxes.randombox").populate("products.product");
    return order;
  }
  async putOrder({ orderId }, { orderName, orderPhone, orderAddress }) {
    const orderInfo = {};
    if (orderName) orderInfo.orderName = orderName;
    if (orderPhone) orderInfo.orderPhone = orderPhone;
    if (orderAddress) orderInfo.orderAddress = orderAddress;
    const result = await this.orderModel.modify(orderId, orderInfo);
    return { result: result.matchedCount ? "success" : "fail" };
  }
  async getWholeOrder() {
    const orders = await this.orderModel.getAll();
    if (orders.length === 0) throw new Error("주문내역이 없습니다.");
    return orders.map(order => ({ orderId: order._id, state: order.state }));
  }
  async changeState({ orderId }, { state }) {
    const result = this.orderModel.modify(orderId, { state });
    return { result: result.matchedCount ? "success" : "fail" };
  }
  async cancel({ orderId }) {
    const result = this.orderModel.remove(orderId);
    return result.deletedCount ? { result: "success" } : { result: "fail" };
  }
}

const orderService = new OrderService(
  orderModel,
  productModel,
  randomboxModel,
  userModel
);

export { orderService };
