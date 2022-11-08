import Component from "../../core/Component.js";
import style from "./paymentInfo.css" assert { type: "css" };
document.adoptedStyleSheets.push(style);

const DELIVERY_PRICE = 3000;

export default class PaymentInfo extends Component {
  setup() {
    this.state = this.props;
  }

  template() {
    const orderProducts = this.getOrderProducts(this.state.cartList);
    const productsTotalPrice = this.getProductsTotalPrice(this.state.cartList);
    const orderTotalPrice = productsTotalPrice + DELIVERY_PRICE;

    return `<div id="paymentInfo_container">
      <h3 class="paymentInfo_title">결제정보</h3>
      <section class="paymentInfo_sub-container">
        <dl class="paymentInfo_product-list">
          <div class="paymentInfo_product-list-container">
            ${orderProducts}
          </div>
        </dl>
        <dl class="paymentInfo_price-list">
          <div class="paymentInfo_price-item">
            <dt>상품총액</dt>
            <dd class="paymentInfo_products-price">${productsTotalPrice.toLocaleString()}원</dd>
          </div>
          <div class="paymentInfo_price-item">
            <dt>배송비</dt>
            <dd class="paymentInfo_delivery-price">${DELIVERY_PRICE.toLocaleString()}원</dd>
          </div>
          <div class="paymentInfo_price-item">
            <dt>총 결제금액</dt>
            <dd class="paymentInfo_total-price">${orderTotalPrice.toLocaleString()}원</dd>
          </div>
          <button type="button" class="paymentInfo_button">${this.getButtonText()}</button>
        </dl>
      </section>
    </div>`;
  }

  render() {
    this.target.insertAdjacentHTML("beforeend", this.template());
  }

  setEvent() {
    this.target
      .querySelector(".paymentInfo_button")
      .addEventListener("click", this.state.buttonEvent);
  }

  getOrderProducts(products) {
    return products.reduce(
      (prev, curr) =>
        prev +
        `<dd class="paymentInfo_product-item">
          <ul class="paymentInfo_product-info-list">
            <li class="paymentInfo_product-img">
              <img src="https://picsum.photos/id/235/72/72" alt="product-img"/>
            </li>
            <li class="paymentInfo_product-name">${curr.name}</li>
            <li class="paymentInfo_product-quantity">${curr.quantity}개</li>
            <li class="paymentInfo_product-price">${
              curr.price * curr.quantity
            }원</li>
          </ul>
        </dd>`,
      ""
    );
  }

  getProductsTotalPrice(products) {
    return products.reduce(
      (prev, { price, quantity }) => prev + price * quantity,
      0
    );
  }

  getButtonText() {
    const uri = location.pathname;

    if (uri === "/cart") {
      return "주문하기";
    }

    return "결제하기";
  }
}
