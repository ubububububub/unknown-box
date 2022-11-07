import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import * as CART from "../constants/cart.js";
import Toast from "../components/Toast/Toast.js";

class Store {
  constructor() {
    this.store = localStorage;
  }

  getCartList() {
    return JSON.parse(this.store.getItem("cart"));
  }

  setCartList(product) {
    this.store.setItem("cart", JSON.stringify(product));
    return true;
  }

  setCartItem(product) {
    if (this.checkDuplication(product)) {
      new Toast("이미 장바구니에 있는 상품입니다.");
      return false;
    }

    const { price } = product;
    const cartList = this.getCartList();

    const newCartList = [
      ...cartList,
      { ...product, id: uuidv4(), quantity: CART.INIT_QUANTITY, total: price }
    ];

    this.store.setItem("cart", JSON.stringify(newCartList));
    return true;
  }

  checkDuplication(product) {
    const cartList = this.getCartList();

    const isDuplicationExist = cartList.some(
      cartItem => cartItem.name === product.name
    );

    // 옵션 중복 체크 로직
    // const checkedNameCartList = cartList.filter(
    //   cartItem => cartItem.name === product.name
    // );

    // const isDuplication = checkedNameCartList.some(cartItem => {
    //   const productOptions = Object.values(product.options);
    //   const cartItemOptions = Object.values(cartItem.options);

    //   for (let i = 0; i < productOptions.length; i += 1) {
    //     if (productOptions[i] === cartItemOptions[i]) {
    //       return true;
    //     }
    //   }
    // });

    return isDuplicationExist;
  }
}

const cart = new Store();

export { cart };
