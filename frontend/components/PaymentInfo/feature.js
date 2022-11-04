import * as CART from "../../constants/cart.js";

class Feature {
  static getOrderProductsText(products) {
    const [firstProduct] = products;

    return products.length === CART.INIT_QUANTITY
      ? `<dd>${firstProduct.name} / 1개</dd>`
      : `<dd>${firstProduct.name} 외 ${products.length}개</dd>`;
  }

  static getProductsTotalPrice(products) {
    return products.reduce(
      (prev, { price, quantity }) => prev + price * quantity,
      0
    );
  }
}

export { Feature };
