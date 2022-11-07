import Component from "../../core/Component.js";
import OrderEdit from "../../components/OrderEdit/OrderEdit.js";
import PaymentInfo from "../../components/PaymentInfo/PaymentInfo.js";
import { qs, qsAll } from "../../utils/index.js";
import { cart } from "../../store/cart.js";
import { postOrder } from "../../apis/index.js";

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
    const clickedElClassName = target.classList.value;

    if (clickedElClassName !== "payment-info__button") {
      return;
    }

    const product = {
      productName: this.parsePaymentProductName(".payment-info__product-name"),
      productNum: this.parsePaymentProductNum(".payment-info__product-name"),
      productsPrice: this.parsePaymentPriceInfo(
        ".payment-info__products-price"
      ),
      deliveryPrice: this.parsePaymentPriceInfo(
        ".payment-info__delivery-price"
      ),
      orderPrice: this.parsePaymentPriceInfo(".payment-info__total-price")
    };

    postOrder(product);

    return (window.location = "/order/recipt");
  }

  parsePaymentProductName(selector) {
    return Array.from(qsAll(selector)).map(product => {
      const [productName] = product.innerText.split(",");

      return productName;
    });
  }

  parsePaymentProductNum(selector) {
    return Array.from(qsAll(selector)).map(product => {
      const [_, productPriceText] = product.innerText.split(",");
      const [productNumText] = productPriceText.split("개");

      return Number(productNumText);
    }, 0);
  }

  parsePaymentPriceInfo(selector) {
    const regex = /\d/g;

    return Number(qs(selector).innerText.match(regex).join(""));
  }
}
