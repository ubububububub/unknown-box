import {
  userModel,
  productModel,
  categoryModel,
  orderModel,
  randomboxModel
} from "../db/models";
import JWT from "../utils/token";

class RandomboxService {
  constructor(
    randomboxModel,
    categoryModel,
    productModel,
    orderModel,
    userModel
  ) {
    this.randomboxModel = randomboxModel;
    this.categoryModel = categoryModel;
    this.productModel = productModel;
    this.orderModel = orderModel;
    this.userModel = userModel;
  }
  async getTwoForMain() {
    const randomboxes = await this.randomboxModel.getAll();
    if (randomboxes.length === 0) return [];
    const one = Math.floor(Math.random() * randomboxes.length);
    const two = Math.floor(Math.random() * randomboxes.length);
    return [randomboxes[one], randomboxes[two]].map(
      ({ _id, randomboxName, categoryName, price, discount, thumbnail }) => ({
        randomboxId: _id,
        randomboxName,
        categoryName,
        price,
        discount,
        thumbnail
      })
    );
  }
  async getListByCategory({ categoryId }) {
    const { categoryName } = await this.categoryModel.getOne(categoryId);
    const randomboxes = await this.randomboxModel.getSome(categoryName);
    if (randomboxes.length === 0)
      throw new Error("등록된 랜덤박스가 없습니다.");
    return randomboxes.map(
      ({ _id, randomboxName, categoryName, price, discount, thumbnail }) => ({
        randomboxId: _id,
        randomboxName,
        categoryName,
        price,
        discount,
        thumbnail
      })
    );
  }
  async getRandombox({ randomboxId }) {
    const randombox = await this.randomboxModel.getOne(randomboxId);
    if (!randombox) throw new Error("등록되지 않은 랜덤박스입니다.");
    await randombox.populate("products.product");
    return {
      randomboxId,
      randomboxName: randombox.randomboxName,
      categoryName: randombox.categoryName,
      price: randombox.price,
      discount: randombox.discount,
      count: randombox.count,
      description: randombox.description,
      thumbnail: randombox.thumbnail,
      products: randombox.products.map(obj => ({
        productId: obj.product._id,
        productName: obj.product.productName,
        price: obj.product.price,
        thumbnail: obj.product.thumbnail
      }))
    };
  }
  async openRandombox({ randomboxId }, { orderId, productId }, accessToken) {
    const { discount } = await this.randomboxModel.getOne(randomboxId);
    const { productName, price, count, thumbnail } =
      await this.productModel.getOne(productId);
    await this.productModel.modify(productId, { count: count - 1 });
    const order = await this.orderModel.getOne(orderId);
    const state =
      order.randomboxesCount === order.productsCount + 1
        ? "배송 준비중"
        : order.state;
    const result = await this.orderModel.modify(
      {
        _id: orderId,
        "randomboxes.randombox": randomboxId,
        "randomboxes.opened": false
      },
      {
        state,
        $set: {
          "randomboxes.$.opened": true,
          "randomboxes.$.product": { productId, productName, price, thumbnail }
        },
        productsCount: order.productsCount + 1
      }
    );
    if (result.modifiedCount !== 0) {
      const { email } = JWT.decodeToken(accessToken);
      await this.userModel.modify(email, {
        $inc: { benefit: discount - price },
        $pull: { randomboxes: { randomboxId } },
        $push: { products: { productId, productName, thumbnail, price } }
      });
    }
  }
  async getRandomboxes() {
    const randomboxes = await this.randomboxModel.getAll();
    if (randomboxes.length === 0)
      throw new Error("등록된 랜덤박스가 없습니다.");
    return randomboxes.map(
      ({ _id, randomboxName, categoryName, price, discount, thumbnail }) => ({
        randomboxId: _id,
        randomboxName,
        categoryName,
        price,
        discount,
        thumbnail
      })
    );
  }
  async regist({
    randomboxName,
    categoryName,
    price,
    discount,
    count,
    description,
    thumbnail,
    productMin,
    productMax
  }) {
    const category = await this.categoryModel.findByName(categoryName);
    if (!category) throw new Error("등록되지 않은 카테고리입니다.");
    const randomboxInfo = { randomboxName, categoryName };
    price = Number(price);
    randomboxInfo.price = price;
    randomboxInfo.discount = price - (price * Number(discount)) / 100;
    randomboxInfo.count = Number(count);
    if (description) randomboxInfo.description = description;
    randomboxInfo.thumbnail = thumbnail;
    const products = await this.productModel.getSome(
      categoryName,
      Number(productMin),
      Number(productMax)
    );
    if (products.length === 0) throw new Error("조건에 맞는 상품이 없습니다.");
    randomboxInfo.products = products.map(({ _id }) => ({ product: _id }));
    await this.randomboxModel.regist(randomboxInfo);
  }
  async modify(
    { randomboxId },
    {
      randomboxName,
      categoryName,
      price,
      discount,
      count,
      description,
      thumbnail,
      productMin,
      productMax
    }
  ) {
    const randomboxInfo = {};
    if (randomboxName) randomboxInfo.randomboxName = randomboxName;
    if (categoryName) {
      const category = await this.categoryModel.findByName(categoryName);
      if (!category) throw new Error("등록되지 않은 카테고리입니다.");
      randomboxInfo.categoryName = categoryName;
    }
    if (discount > 0)
      randomboxInfo.discount = price - (price * Number(discount)) / 100;
    if (count) randomboxInfo.count = Number(count);
    if (description) randomboxInfo.description = description;
    if (thumbnail) randomboxInfo.thumbnail = thumbnail;
    if (productMin || productMax) {
      const products = await this.productModel.getSome(
        categoryName,
        Number(productMin),
        Number(productMax)
      );
      if (products.length === 0)
        throw new Error("조건에 맞는 상품이 없습니다.");
      randomboxInfo.products = products.map(({ _id }) => ({ product: _id }));
    }
    const result = await this.randomboxModel.modify(randomboxId, randomboxInfo);
    return { result: result.matchedCount ? "success" : "fail" };
  }
  async remove({ randomboxId }) {
    const result = await this.randomboxModel.remove(randomboxId);
    return { result: result.deletedCount ? "success" : "fail" };
  }
  async getRandomboxForAdmin({ randomboxId }) {
    const randombox = await this.randomboxModel.getOne(randomboxId);
    if (!randombox) throw new Error("등록되지 않은 랜덤박스입니다.");
    await randombox.populate("products.product");
    return {
      randomboxId,
      randomboxName: randombox.randomboxName,
      categoryName: randombox.categoryName,
      price: randombox.price,
      discount: randombox.discount,
      count: randombox.count,
      description: randombox.description,
      thumbnail: randombox.thumbnail,
      products: randombox.products.map(obj => ({
        productName: obj.product.productName
      }))
    };
  }
}

const randomboxService = new RandomboxService(
  randomboxModel,
  categoryModel,
  productModel,
  orderModel,
  userModel
);

export { randomboxService };
