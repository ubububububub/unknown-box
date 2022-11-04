import Component from "../../core/Component.js";
import { qs, qsAll } from "../../utils/index.js";

class MyOrderItem extends Component {
  template() {
    const { item, idx, deleteOrder } = this.state;
    return `<div>
                <span class="order-id">주문번호 : ${item.orderId}</span>
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
                <button class="myorder-edit-btn">주문 정보 수정</button>
                <button class="myorder-delete-btn">주문 취소</button>
            </div>`;
  }

  setup() {
    this.state = this.props;
  }

  render() {
    this.target.insertAdjacentHTML("beforeend", this.template());
  }

  setEvent() {
    qsAll(".myorder-edit-btn")[this.props.idx].addEventListener("click", e => {
      window.location = `/mypage/order/${this.props.item.orderId}`;
    });

    qsAll(".myorder-delete-btn")[this.props.idx].addEventListener(
      "click",
      e => {
        this.handleDeleteBtn(e);
      }
    );
  }

  handleDeleteBtn(e) {
    e.preventDefault();
    // deleteOrderInfo(this.props.item.orderId);
    this.props.deleteOrder(this.props.item.orderId);
  }
}

export default MyOrderItem;
