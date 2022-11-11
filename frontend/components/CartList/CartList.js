import Component from "../../core/Component.js";
import { cart } from "../../store/cart.js";
import { qs } from "../../utils/index.js";
import * as CART from "../../constants/cart.js";
import style from "./cartList.css" assert { type: "css" };
document.adoptedStyleSheets.push(style);

const category = [
  { name: "상품명", className: "cart_category-name" },
  { name: "가격", className: "cart_category-price" },
  { name: "수량", className: "cart_category-quantity" },
  { name: "총 가격", className: "cart_category-total-price" },
  { name: "제거", className: "cart_category-delete" }
];

export class CartList extends Component {
  setup() {
    this.state = this.props;
  }

  template() {
    if (this.isEmptyCartList()) {
      return this.getEmptyTemplate();
    }

    return this.getCategoryTemplate() + this.getCartListTemplate();
  }

  render() {
    this.target.innerHTML = this.template();
  }

  setEvent() {
    this.target.addEventListener("click", ({ target }) => {
      if (cart.isEmpty()) {
        return;
      }

      const { id } = target.closest(".cart_item").dataset;
      const className = target.classList.value;

      switch (className) {
        case "cart_product-button-add":
          this.addCartItemQuantity(id);
          break;
        case "cart_product-button-subtract":
          this.subtractCartItemQuantity(id);
          break;
        case "cart_product-button-delete":
          this.deleteCartItem(id);
          break;
        default:
          break;
      }
    });

    qs(".cart_button-delete").addEventListener("click", () => {
      if (this.isEmptyCartList()) {
        return;
      }

      cart.setCartList([]);
      this.state.setCartList({ cartList: [] });
    });
  }

  getAllDeleteButtonTemplate() {
    return `<li class="cart_button">
      <button type="button" class="cart_button-delete">전체 삭제</button>
    </li>`;
  }

  getEmptyTemplate() {
    return `<div class="cart_product_empty">장바구니가 텅 비었습니다.</div>`;
  }

  getCategoryTemplate() {
    return (
      category.reduce((prev, { name, className }) => {
        return prev + `<li class="${className}">${name}</li>`;
      }, "<li><ul class='cart_category'>") + "</ul></li>"
    );
  }

  getCartListTemplate() {
    return (
      this.state.cartList.reduce(
        (
          prev,
          { thumbnail, id, randomboxName, categoryName, price, quantity, total }
        ) => {
          return (
            prev +
            `<li class="cart_item" data-id="${id}">
              <ul class="cart_product-list">
                <li class="cart_product-item-thumbnail">
                  <img class="cart_product-item-thumbnail-img" src="${thumbnail}" alt="상품 이미지" width="75px" height="75px"/>
                </li>
                <li class="cart_product-item-name">
                  <ul class="cart_product-item-name-list">
                    <li class="cart_product-item-randombox-name-item">${randomboxName}</li>
                    <li class="cart_product-item-category-name-item">종류: ${categoryName}</li>
                  </ul>
                </li>
                <li class="cart_product-item-price">${price.toLocaleString()}</li>
                <li class="cart_product-item-quantity">
                  <div class="temp">
                    <button type="button" class="cart_product-button-subtract">-</button>
                    <span class="cart_product-item-quantity-text">${quantity}</span>
                    <button type="button" class="cart_product-button-add">+</button>
                  </div>
                </li>
                <li class="cart_product-item-total-price">${total.toLocaleString()}</li>
                <li class="cart_product-item-button">
                  <button type="button" class="cart_product-button-delete">x</button>
                </li>
              </ul>
            </li>`
          );
        },
        "<li><ul>"
      ) + "</ul></li>"
    );
  }

  addCartItemQuantity(id) {
    const newCartList = [...this.state.cartList];
    const index = newCartList.findIndex(cartItem => cartItem.id === id);

    this.updateCartItemQuantity(newCartList[index].quantity >= 99, {
      newCartList,
      index,
      quantityUnit: CART.ADD_UNIT
    });
  }

  subtractCartItemQuantity(id) {
    const newCartList = [...this.state.cartList];
    const index = newCartList.findIndex(cartItem => cartItem.id === id);

    this.updateCartItemQuantity(newCartList[index].quantity <= 1, {
      newCartList,
      index,
      quantityUnit: CART.SUBTRACT_UNIT
    });
  }

  updateCartItemQuantity(
    quantityBoundary,
    { newCartList, index, quantityUnit }
  ) {
    if (quantityBoundary) return;

    newCartList[index].quantity += quantityUnit;
    newCartList[index].total =
      newCartList[index].quantity * newCartList[index].price;

    cart.setCartList(newCartList);
    this.state.setCartList({ cartList: [...newCartList] });
  }

  deleteCartItem(id) {
    const newCartList = this.state.cartList.filter(
      cartItem => cartItem.id !== id
    );

    cart.setCartList(newCartList);
    this.state.setCartList({ cartList: [...newCartList] });
  }

  isEmptyCartList() {
    return this.state.cartList.length === 0;
  }
}
