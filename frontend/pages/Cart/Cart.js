import Component from "../../core/Component.js";
import PaymentInfo from "../../components/PaymentInfo/PaymentInfo.js";
import { qs } from "../../utils/index.js";
import { cart } from "../../store/cart.js";
import { CartList } from "../../components/CartList/CartList.js";
import style from "./cart.css" assert { type: "css" };
document.adoptedStyleSheets.push(style);

export class Cart extends Component {
  setup() {
    this.state = {
      cartList: cart.getCartList(),
      setCartList: this.setState.bind(this),
      buttonEvent: this.handleMoveNextPage.bind(this)
    };
  }

  template() {
    return `<div id="cart_container">
      <h2>장바구니</h2>
      <section class="cart_sub-container">
        <li class="cart_button">
          <button type="button" class="cart_button-delete">전체 삭제</button>
        </li>
        <ul class="cart_list">
        </ul>
      </section>
    </div>`;
  }

  mounted() {
    new CartList(qs(".cart_list"), this.state);
    new PaymentInfo(qs(".cart_sub-container"), this.state);
  }

  handleMoveNextPage({ target }) {
    const className = target.classList.value;

    if (className !== "paymentInfo_button") {
      return;
    }

    if (!this.isEmpty()) {
      return (window.location = "/order/payment");
    }
  }

  isEmpty() {
    return this.state.cartList.length === 0;
  }
}
