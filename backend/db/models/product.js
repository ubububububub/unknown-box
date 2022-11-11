import mongoose from "mongoose";
import { productSchema } from "../schemas";

const Product = mongoose.model("products", productSchema);

class ProductModel {
  async getAll() {
    const products = await Product.find({});
    return products;
  }
  async getOne(_id) {
    const product = await Product.findOne({ _id });
    return product;
  }
  async regist(productInfo) {
    await Product.create(productInfo);
  }
  async remove(_id) {
    const result = await Product.deleteOne({ _id });
    return result;
  }
  async modify(_id, productInfo) {
    const result = await Product.updateOne({ _id }, productInfo);
    return result;
  }
  async getSome(categoryName, productMin, productMax) {
    const products = await Product.find({
      categoryName,
      price: { $gte: productMin, $lte: productMax }
    });
    return products;
  }
}

const productModel = new ProductModel();

export { productModel };
