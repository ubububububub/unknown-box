import Component from "../../core/Component.js";

export class Admin extends Component {
  template() {
    return `<div id="manage-container">
          <div class="manage-category">카테고리 관리</div>
          <div class="manage-product">상품 관리</div>
          <div class="manage-order">주문 내역 관리</div>
      </div>
      `;
  }
}
