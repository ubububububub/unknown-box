import Component from "../../core/Component.js";

const DELIVERY_PRICE = 3000;

export default class PaymentInfo extends Component {
  setup() {
    this.state = this.props;
  }

  template() {
    const orderProducts = this.getOrderProducts(this.state.cartList);
    const productsTotalPrice = this.getProductsTotalPrice(this.state.cartList);
    const orderTotalPrice = productsTotalPrice + DELIVERY_PRICE;

    return `<div class="container">
      <h2>결제정보</h2>
      <dl>
        <div>
          <dt>주문상품</dt>
          ${orderProducts}
        </div>
        <div>
          <dt>상품총액</dt>
          <dd class="payment-info__products-price">${productsTotalPrice.toLocaleString()}원</dd>
        </div>
        <div>
          <dt>배송비</dt>
          <dd class="payment-info__delivery-price">${DELIVERY_PRICE.toLocaleString()}원</dd>
        </div>
      </dl>
      <dl>
        <dt>총 결제금액</dt>
        <dd class="payment-info__total-price">${orderTotalPrice.toLocaleString()}원</dd>
      </dl>
      <button type="button" class="payment-info__button">결제하기</button>
    </div>`;
  }

  render() {
    this.target.insertAdjacentHTML("beforeend", this.template());
  }

  setEvent() {
    this.target
      .querySelector(".payment-info__button")
      .addEventListener("click", this.state.buttonEvent);
  }

  getOrderProducts(products) {
    return products.reduce(
      (prev, curr) =>
        prev +
        `<dd class="payment-info__product-name">${curr.name}, ${curr.quantity}개</dd>`,
      ""
    );
  }

  getProductsTotalPrice(products) {
    return products.reduce(
      (prev, { price, quantity }) => prev + price * quantity,
      0
    );
  }
}
