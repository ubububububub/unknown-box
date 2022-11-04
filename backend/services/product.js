import { productModel, categoryModel } from "../db/models";

class ProductService {
  constructor(productModel, categoryModel) {
    this.productModel = productModel;
    this.categoryModel = categoryModel;
  }
  async getList() {
    const products = await this.productModel.getAll();
    if (products.length === 0) return { error: "등록된 상품이 없습니다." };
    return products.map(product => ({
      id: product._id,
      name: product.name,
      price: product.price,
      thumbnail: product.thumbnail
    }));
  }
  async regist({
    name,
    price,
    count,
    description,
    imageUrl,
    thumbnail,
    category
  }) {
    const productInfo = {};
    if (name) productInfo.name = name;
    if (price) productInfo.price = Number(price);
    if (count) productInfo.count = Number(count);
    if (description) productInfo.description = description;
    if (imageUrl && imageUrl.length) productInfo.imageUrl = imageUrl;
    if (thumbnail) productInfo.thumbnail = thumbnail;
    const product = await this.productModel.regist(productInfo);
    await categoryModel.addProduct(category, product);
    return product._id;
  }
  async modify(
    { id },
    { name, price, count, description, imageUrl, thumbnail }
  ) {
    const productInfo = {};
    if (name) productInfo.name = name;
    if (price) productInfo.price = Number(price);
    if (count) productInfo.count = Number(count);
    if (description) productInfo.description = description;
    if (imageUrl && imageUrl.length) productInfo.imageUrl = imageUrl;
    if (thumbnail) productInfo.thumbnail = thumbnail;
    const product = await this.productModel.modify(id, productInfo);
    return product;
  }
  async getProduct({ id }) {
    const product = await this.productModel.getOne(id);
    if (!product) return { error: "없는 상품입니다." };
    return product;
  }
  async remove({ id }) {
    const result = await this.productModel.remove(id);
    return result.deletedCount ? { result: "success" } : { result: "fail" };
  }
}

const productService = new ProductService(productModel, categoryModel);

export { productService };
