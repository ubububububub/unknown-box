import mongoose from "mongoose";
import { categorySchema } from "../schemas";

const Category = mongoose.model("categories", categorySchema);

class CategoryModel {
  async getAll() {
    const categories = await Category.find({});
    return categories;
  }
  async getOne(_id) {
    const category = await Category.findOne({ _id });
    return category;
  }
  async regist(name) {
    const category = await Category.create({ name });
    return category;
  }
  async modify(_id, name) {
    const category = await Category.updateOne({ _id }, { name });
    return category;
  }
  async remove(_id) {
    const result = await Category.deleteOne({ _id });
    return result;
  }
  async addProduct(name, product) {
    await Category.updateOne({ name }, { $push: { products: product } });
  }
}

const categoryModel = new CategoryModel();

export { categoryModel };
