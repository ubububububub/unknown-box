import { categoryModel } from "../db/models";

class CategoryService {
  constructor(categoryModel) {
    this.categoryModel = categoryModel;
  }
  async getList() {
    const categories = await this.categoryModel.getAll();
    if (categories.length === 0) return [];
    return categories.map(({ _id, categoryName }) => ({
      categoryId: _id,
      categoryName
    }));
  }
  async regist({ categoryName }) {
    const category = await this.categoryModel.findByName(categoryName);
    if (category) throw new Error("이미 등록된 카테고리입니다.");
    await this.categoryModel.regist(categoryName);
  }
  async modify({ categoryId }, { categoryName }) {
    const result = await this.categoryModel.modify(categoryId, categoryName);
    return { result: result.matchedCount ? "success" : "fail" };
  }
  async remove({ categoryId }) {
    const result = await this.categoryModel.remove(categoryId);
    return result.deletedCount ? { result: "success" } : { result: "fail" };
  }
}

const categoryService = new CategoryService(categoryModel);

export { categoryService };
