import Component from "../../core/Component.js";
import { qs, isClassContained } from "../../utils/index.js";

export default class OrderItem extends Component {
  template() {
    const { orderId, orderState, createdAt, updatedAt } = this.props.order;

    return `<tr class="order-${orderId}">
                <td>${orderId}</td>
                <td>${orderState}</td>
                <td>${createdAt}</td>
                <td>${updatedAt}</td>
                <td>
                    <button type="button" class="order-editBtn">배송상태 수정</button>
                </td>
                <td>
                    <button type="button" class="order-cancelBtn">주문 취소</button>
                </td>
            </tr>
        `;
  }

  render() {
    this.target.insertAdjacentHTML("beforeend", this.template());
  }

  setEvent() {
    const orderEl = qs(`.order-${this.props.order.orderId}`);
    orderEl.addEventListener("click", e => {
      if (isClassContained(e.target, "order-editBtn")) {
        this.editHandler();
      }

      if (isClassContained(e.target, "order-cancelBtn")) {
        this.cancelHandler();
      }
    });
  }

  editHandler() {
    location = `/admin/order/${this.props.order.orderId}`;
  }

  cancelHandler() {
    this.props.cancelOrder(this.props.order.orderId);
  }
}
