import {
  userModel,
  orderModel,
  randomboxModel,
  productModel
} from "../db/models";
import JWT from "../utils/token";

class OrderService {
  constructor(orderModel, randomboxModel, userModel, productModel) {
    this.orderModel = orderModel;
    this.randomboxModel = randomboxModel;
    this.userModel = userModel;
    this.productModel = productModel;
  }
  async postOrder({ formData, product }, accessToken) {
    const [
      orderName,
      orderPhone,
      postalcode,
      roadAddress,
      jibunAddress,
      detailAddress,
      extraAddress
    ] = formData;
    const { boxesPrice, deliveryPrice, randomboxes, totalPrice } = product;
    const { email } = JWT.decodeToken(accessToken);
    const randomboxInfo = {
      orderEmail: email,
      orderName: orderName[1],
      orderPhone: orderPhone[1],
      orderAddress: {
        postalcode: postalcode[1],
        roadAddress: roadAddress[1],
        jibunAddress: jibunAddress[1],
        detailAddress: detailAddress[1],
        extraAddress: extraAddress[1]
      },
      randomboxes: [],
      randomboxesCount: 0,
      boxesPrice: boxesPrice.reduce((acc, val) => acc + val, 0),
      deliveryPrice,
      totalPrice
    };
    randomboxes.forEach(({ randombox, count }) => {
      randomboxInfo.randomboxes.push({ randombox });
      randomboxInfo.randomboxesCount += Number(count);
    });
    const order = await this.orderModel.createOrder(randomboxInfo);
    for (let i = 0; i < randomboxes.length; i++) {
      const randombox = await this.randomboxModel.getOne(
        randomboxes[i].randombox
      );
      await this.randomboxModel.modify(randombox._id, {
        count: randombox.count - randomboxes[i].count
      });
      await this.userModel.modify(email, {
        $push: {
          randomboxes: {
            randomboxId: randombox._id,
            randomboxName: randombox.randomboxName,
            thumbnail: randombox.thumbnail,
            price: randombox.discount,
            orderId: order._id
          }
        }
      });
    }
    await this.userModel.modify(email, {
      name: randomboxInfo.orderName,
      address: randomboxInfo.orderAddress,
      phone: randomboxInfo.orderPhone
    });
    return order._id;
  }
  async getListByUser(accessToken) {
    const { email } = JWT.decodeToken(accessToken);
    let orders = await this.orderModel.getAllByUser(email);
    if (orders.length === 0) throw new Error("주문 이력이 없습니다.");
    for (let i = 0; i < orders.length; i++) {
      await orders[i].populate("randomboxes.randombox");
    }
    return orders.map(
      ({ _id, createdAt, updatedAt, state, randomboxes, totalPrice }) => ({
        orderId: _id,
        createdAt,
        updatedAt,
        state,
        randomboxes: randomboxes.map(
          ({ randombox, opened, product, thumbnail }) => ({
            randomboxId: randombox._id,
            randomboxName: randombox.randomboxName,
            price: randombox.price,
            opened,
            product,
            thumbnail
          })
        ),
        totalPrice
      })
    );
  }
  async putOrder({ orderId }, { orderName, orderPhone, orderAddress }) {
    const orderInfo = {};
    if (orderName) orderInfo.orderName = orderName;
    if (orderPhone) orderInfo.orderPhone = orderPhone;
    if (orderAddress) orderInfo.orderAddress = orderAddress;
    const result = await this.orderModel.modify({ _id: orderId }, orderInfo);
    return { result: result.matchedCount ? "success" : "fail" };
  }
  async cancel({ orderId }) {
    const { orderEmail, randomboxes } = await this.orderModel.getOne(orderId);
    for (let i = 0; i < randomboxes.length; i++) {
      if (randomboxes[i].opened) {
        await this.userModel.modify(orderEmail, {
          $pull: { products: { productId: randomboxes[i].product.productId } }
        });
        await this.productModel.modify(randomboxes[i].product.productId, {
          $inc: { count: 1 }
        });
      } else {
        await this.userModel.modify(orderEmail, {
          $pull: { randomboxes: { randomboxId: randomboxes[i].randombox } }
        });
        await this.randomboxModel.modify(randomboxes[i].randombox, {
          $inc: { count: 1 }
        });
      }
    }
    const result = await this.orderModel.remove(orderId);
    return result.deletedCount ? { result: "success" } : { result: "fail" };
  }
  async getWholeOrder() {
    const orders = await this.orderModel.getAll();
    if (orders.length === 0) throw new Error("주문내역이 없습니다.");
    return orders.map(({ _id, state, createdAt, updatedAt }) => ({
      orderId: _id,
      state,
      createdAt,
      updatedAt
    }));
  }
  async getOrder({ orderId }) {
    const order = await this.orderModel.getOne(orderId);
    if (!order) throw new Error("주문내역이 없습니다.");
    await order.populate("randomboxes.randombox");
    return {
      orderId: order._id,
      state: order.state,
      orderName: order.orderName,
      orderPhone: order.orderPhone,
      orderAddress: order.orderAddress,
      randomboxes: order.randomboxes.map(({ randombox, opened, product }) => ({
        randomboxId: randombox._id,
        randomboxName: randombox.randomboxName,
        price: randombox.price,
        opened,
        product
      })),
      boxesPrice: order.boxesPrice,
      deliveryPrice: order.deliveryPrice,
      totalPrice: order.totalPrice,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt
    };
  }
  async changeState({ orderId }, { state }) {
    const result = await this.orderModel.modify({ _id: orderId }, { state });
    return { result: result.matchedCount ? "success" : "fail" };
  }
}

const orderService = new OrderService(
  orderModel,
  randomboxModel,
  userModel,
  productModel
);

export { orderService };
