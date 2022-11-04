import Component from "../../core/Component.js";
import { Feature } from "./feature.js";

const DELIVERY_CHARGE = 3000;

export class PaymentInfo extends Component {
  template() {
    const orderProducts = Feature.getOrderProductsText(this.props);
    const productsTotalPrice = Feature.getProductsTotalPrice(this.props);
    const orderTotalPrice = productsTotalPrice + DELIVERY_CHARGE;

    return `<div class="container">
      <h2>결제정보<h2>
      <dl>
        <div>
          <dt>주문상품</dt>
          ${orderProducts}
        </div>
        <div>
          <dt>상품총액</dt>
          <dd>${productsTotalPrice.toLocaleString()}원</dd>
        </div>
        <div>
          <dt>배송비</dt>
          <dd>${DELIVERY_CHARGE.toLocaleString()}원</dd>
        </div>
      </dl>
      <dl>
        <dt>총 결제금액</dt>
        <dd>${orderTotalPrice.toLocaleString()}원</dd>
      </dl>
      <button type="button">결제하기</button>
    </div>`;
  }
}
