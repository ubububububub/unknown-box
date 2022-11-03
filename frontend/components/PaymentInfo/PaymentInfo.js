import Component from "../../core/Component.js";

export class PaymentInfo extends Component {
  template() {
    return `<div class="container">
      <h2>결제정보<h2>
      <dl>
        <div>
          <dt>주문상품</dt>
          <dd>${null} / ${null}개</dd>
        </div>
        <div>
          <dt>상품총액</dt>
          <dd>${null}원</dd>
        </div>
      </dl>
      <dl>
        <dt>총 결제금액</dt>
        <dd>${null}원</dd>
      </dl>
      <button type="button">결제하기</button>
    </div>`;
  }
}
