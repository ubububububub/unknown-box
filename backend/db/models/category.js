import mongoose from "mongoose";
import { categorySchema } from "../schemas";

const Category = mongoose.model("categories", categorySchema);

class CategoryModel {
  async getAll() {
    const categories = await Category.find({});
    return categories;
  }
  async getOne(name) {
    const category = await Category.findOne({ name });
    return category;
  }
  async regist(name) {
    const category = await Category.create({ name });
    return category;
  }
  async modify(name, newName) {
    const category = await Category.updateOne({ name }, { name: newName });
    return category;
  }
  async remove(name) {
    const result = await Category.deleteOne({ name });
    return result;
  }
  async addProduct(name, product) {
    await Category.updateOne({ name }, { $push: { products: product } });
  }
}

const categoryModel = new CategoryModel();

export { categoryModel };
