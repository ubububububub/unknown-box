import Component from "../../core/Component.js";
import { qs } from "../../utils/index.js";

class MyOrderListItem extends Component {
  template() {
    const item = this.props;
    return `<div>
                <span>주문번호 : ${item.orderId}</span>
                <span>주문일시 : ${item.orderTime}</span>
                <ul id="product-list">
                    ${item.orderProducts
                      .map(
                        item => `<li>
                                    <span>${item.productInfo.productName}</span>
                                    <span>${item.quantity}개</span>
                                </li>`
                      )
                      .join("")}
                </ul>
                <span>총 ${item.orderProducts.reduce((acc, cur) => {
                  acc += cur.quantity * cur.productInfo.price;
                  return acc;
                }, 0)}원</span>
                <span>상태 : ${item.orderState}</span>
                <button>주문 정보 수정</button>
                <button>주문 취소</button>
            </div>`;
  }
}

export default MyOrderListItem;
