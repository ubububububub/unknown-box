import { productModel, categoryModel } from "../db/models";

class ProductService {
  constructor(productModel, categoryModel) {
    this.productModel = productModel;
    this.categoryModel = categoryModel;
  }
  async getProducts() {
    const products = await this.productModel.getAll();
    if (products.length === 0) throw new Error("등록된 상품이 없습니다.");
    return products.map(
      ({ _id, productName, categoryName, price, thumbnail }) => ({
        productId: _id,
        productName,
        categoryName,
        price,
        thumbnail
      })
    );
  }
  async regist({
    productName,
    categoryName,
    price,
    count,
    description,
    thumbnail
  }) {
    const category = await this.categoryModel.findByName(categoryName);
    if (!category) throw new Error("등록되지 않은 카테고리입니다.");
    const productInfo = {};
    if (productName) productInfo.productName = productName;
    productInfo.categoryName = categoryName;
    if (price) productInfo.price = Number(price);
    if (count) productInfo.count = Number(count);
    if (description) productInfo.description = description;
    if (thumbnail) productInfo.thumbnail = thumbnail;
    await this.productModel.regist(productInfo);
  }
  async modify(
    { productId },
    { productName, price, count, description, thumbnail }
  ) {
    const productInfo = {};
    if (productName) productInfo.productName = productName;
    if (price) productInfo.price = Number(price);
    if (count) productInfo.count = Number(count);
    if (description) productInfo.description = description;
    if (thumbnail) productInfo.thumbnail = thumbnail;
    const result = await this.productModel.modify(productId, productInfo);
    return { result: result.matchedCount ? "success" : "false" };
  }
  async getProduct({ productId }) {
    const product = await this.productModel.getOne(productId);
    if (!product) throw new Error("없는 상품입니다.");
    return {
      productId: product._id,
      productName: product.name,
      categoryName: product.category,
      price: product.price,
      count: product.count,
      description: product.description,
      thumbnail: product.thumbnail
    };
  }
  async remove({ productId }) {
    const result = await this.productModel.remove(productId);
    return result.deletedCount ? { result: "success" } : { result: "fail" };
  }
}

const productService = new ProductService(productModel, categoryModel);

export { productService };
