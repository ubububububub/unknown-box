import Component from "../../core/Component.js";
import { cart } from "../../store/cart.js";
import * as CART from "../../constants/cart.js";

const category = ["상품명", "가격", "수량", "총 가격"];

export class CartList extends Component {
  setup() {
    this.state = this.props;
  }

  template() {
    if (this.isEmptyCartList()) {
      return this.getEmptyTemplate();
    }

    return (
      this.getDeleteButtonTemplate() +
      this.getCategoryTemplate() +
      this.getCartListTemplate()
    );
  }

  render() {
    this.target.innerHTML = this.template();
  }

  setEvent() {
    this.target.addEventListener("click", ({ target }) => {
      const { id } = target.closest(".cart-item").dataset;
      const className = target.classList.value;

      switch (className) {
        case "cart-item__button--add":
          this.addCartItemQuantity(id);
          break;
        case "cart-item__button--subtract":
          this.subtractCartItemQuantity(id);
          break;
        case "cart-item__button--delete":
          this.deleteCartItem(id);
          break;
        default:
          break;
      }
    });

    this.target
      .querySelector(".cart-list__button--delete")
      .addEventListener("click", () => {
        cart.setCartList([]);
        this.state.setCartList({ cartList: [] });
      });
  }

  getEmptyTemplate() {
    return `<div>장바구니가 텅 비었습니다.</div>`;
  }

  getDeleteButtonTemplate() {
    return `<button type="button" class="cart-list__button--delete">전체 삭제</button>`;
  }

  getCategoryTemplate() {
    return (
      category.reduce((prev, curr) => {
        return prev + `<li>${curr}</li>`;
      }, "<li><ul>") + "</li></ul>"
    );
  }

  getCartListTemplate() {
    return (
      this.state.cartList.reduce(
        (prev, { id, name, price, quantity, total }) => {
          return (
            prev +
            `<li class="cart-item" data-id="${id}">
              <ul>
                <li>${name}</li>
                <li>${price.toLocaleString()}</li>
                <li class="counter">
                  <button type="button" class="cart-item__button--subtract">-</button>
                  ${quantity}
                  <button type="button" class="cart-item__button--add">+</button>
                </li>
                <li>${total.toLocaleString()}</li>
                <button type="button" class="cart-item__button--delete">x</button>
              </ul>
            </li>`
          );
        },
        "<ul>"
      ) + "</ul>"
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
    if (!this.state.cartList.length) {
      return true;
    }

    return false;
  }
}
