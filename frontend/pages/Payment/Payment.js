import Component from "../../core/Component.js";
import OrderEdit from "../../components/OrderEdit/OrderEdit.js";
import PaymentInfo from "../../components/PaymentInfo/PaymentInfo.js";
import { qs } from "../../utils/index.js";
import { cart } from "../../store/cart.js";

export class Payment extends Component {
  setup() {
    this.state = {
      cartList: cart.getCartList(),
      buttonEvent: this.handleMoveNextPage.bind(this)
    };
  }

  template() {
    return `<section id="container">
      <h2>주문 결제</h2>
      <div id="content"></div>
    </section>`;
  }

  mounted() {
    new OrderEdit(qs("#content"));
    new PaymentInfo(qs("#content"), this.state);
  }

  handleMoveNextPage({ target }) {
    const className = target.classList.value;

    if (className !== "payment-info__button") {
      return;
    }

    return (window.location = "/order/recipt");
  }
}
