import Component from "../../core/Component.js";
import PaymentInfo from "../../components/PaymentInfo/PaymentInfo.js";
import { qs } from "../../utils/index.js";
import { cart } from "../../store/cart.js";
import { CartList } from "../../components/CartList/CartList.js";
import style from "./cart.css" assert { type: "css" };
document.adoptedStyleSheets.push(style);

export class Cart extends Component {
  setup() {
    cart.setCartItem({
      name: "MATIN FLEECE ZIP UP JUMPER IN BLACK",
      price: 198000,
      options: {
        color: "orange",
        size: "L"
      }
    });
    cart.setCartItem({
      name: "[유아인 착용 상품] 리버서블 플리스 숏 패딩 재킷 [블랙/크림] ",
      price: 89900,
      options: {
        color: "yellow",
        size: "M"
      }
    });
    cart.setCartItem({
      name: "NJ1DN82B 여성 눕시 하이브리드 다운 볼 자켓",
      price: 249000,
      options: {
        color: "blue",
        size: "M"
      }
    });
    cart.setCartItem({
      name: "[유아인 착용 상품] 리버서블 플리스 숏 패딩 재킷 [블랙/크림] ",
      price: 89900,
      options: {
        color: "yellow",
        size: "M"
      }
    });

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

    return (window.location = "/order/payment");
  }
}
