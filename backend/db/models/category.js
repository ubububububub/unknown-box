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
  async regist(categoryName) {
    await Category.create({ categoryName });
  }
  async findByName(categoryName) {
    const category = await Category.findOne({ categoryName });
    return category;
  }
  async modify(_id, categoryName) {
    const result = await Category.updateOne({ _id }, { categoryName });
    return result;
  }
  async remove(_id) {
    const result = await Category.deleteOne({ _id });
    return result;
  }
}

const categoryModel = new CategoryModel();

export { categoryModel };
