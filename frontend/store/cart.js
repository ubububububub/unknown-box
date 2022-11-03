import * as CART from "../constants/cart.js";

class Store {
  constructor() {
    this.store = localStorage;
    this.store.setItem("cart", JSON.stringify([]));
  }

  getCartList() {
    return JSON.parse(this.store.getItem("cart"));
  }

  setCartItem(product) {
    const { price } = product;
    const cartList = this.getCartList();

    cartList.push({ ...product, quantity: CART.INIT_VALUE, total: price });

    this.store.setItem("cart", JSON.stringify(cartList));
  }

  deleteCartItem({ name }) {
    const index = this.getCartItemIndex(name);
    const cartList = this.getCartList();
    const newCartList = [
      ...cartList.slice(CART.REMOVE_FIRST_INDEX, index),
      ...cartList.slice(
        index + CART.REMOVE_SECOND_INDEX,
        this.getCartListLength()
      )
    ];

    this.store.setItem("cart", JSON.stringify(newCartList));
  }

  addCartItemQuantity({ name }) {
    this.updateCartItemQuantity(name, CART.ADD_UNIT);
  }

  subtractCartItemQuantity({ name }) {
    this.updateCartItemQuantity(name, CART.SUBTRACT_UNIT);
  }

  updateCartItemQuantity(name, quantityUnit) {
    const index = this.getCartItemIndex(name);
    const cartList = this.getCartList();
    const newCartList = [...cartList];

    newCartList[index].quantity += quantityUnit;

    this.store.setItem("cart", JSON.stringify(newCartList));
  }

  getCartItemIndex({ name }) {
    const cartList = this.getCartList();
    return cartList.findIndex(cartItem => cartItem.name === name);
  }

  getCartListLength() {
    return JSON.parse(this.store.getItem("cart")).length;
  }
}

const store = new Store();

export { store };
