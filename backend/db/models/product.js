import mongoose from "mongoose";
import { productSchema } from "../schemas";

const Product = mongoose.model("products", productSchema);

export class ProductModel {
  async getAll() {
    const products = await Product.find({});
    return products;
  }
  async getOne(_id) {
    const product = await Product.findOne({ _id });
    return product;
  }
  async regist(productInfo) {
    const product = await Product.create(productInfo);
    return product;
  }
  async remove(_id) {
    const result = await Product.deleteOne({ _id });
    return result;
  }
  async modify(_id, productInfo) {
    const product = await Product.updateOne({ _id }, productInfo);
    return product;
  }
}

const productModel = new ProductModel();

export { productModel };
