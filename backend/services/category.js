import { categoryModel } from "../db/models";

class CategoryService {
  constructor(categoryModel) {
    this.categoryModel = categoryModel;
  }
  async getList() {
    const categories = await this.categoryModel.getAll();
    if (categories.length === 0) return { error: "카테고리가 없습니다." };
    return categories.map(category => ({
      name: category.name
    }));
  }
  async regist({ name }) {
    const category = await this.categoryModel.regist(name);
    return category.name;
  }
  async modify({ categoryId }, { name }) {
    const category = await this.categoryModel.modify(categoryId, name);
    return category;
  }
  async getProductsByCategory({ categoryId }) {
    const category = await this.categoryModel.getOne(categoryId);
    if (!category) return { error: "카테고리를 찾을 수 없습니다." };
    if (category.products.length === 0)
      return { error: "등록된 상품이 없습니다." };
    const products = await category.populate("products");
    return products.products.map(product => ({
      id: product._id,
      name: product.name,
      price: product.price,
      thumbnail: product.thumbnail
    }));
  }
  async remove({ categoryId }) {
    const result = await this.categoryModel.remove(categoryId);
    return result.deletedCount ? { result: "success" } : { result: "fail" };
  }
}

const categoryService = new CategoryService(categoryModel);

export { categoryService };
