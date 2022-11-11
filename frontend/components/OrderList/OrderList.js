import Component from "../../core/Component.js";
import { qs } from "../../utils/index.js";
import OrderItem from "../OrderItem/OrderItem.js";
import { getOrderList } from "../../apis/index.js";
import style from "./orderList.css" assert { type: "css" };
document.adoptedStyleSheets.push(style);
import { deleteOrder } from "../../apis/index.js";

export default class OrderList extends Component {
  template() {
    return `<thead>
              <tr>
                <th>주문번호</th>
                <th>배송상태</th>
                <th>주문날짜</th>
                <th>수정날짜</th>
              </tr>
            </thead>
            <tbody class="order-list-body"></tbody>
          `;
  }

  async mounted() {
    const orders = await getOrderList();

    this.state = { orders };

    this.state.orders.forEach(
      order =>
        new OrderItem(qs(".order-list-body"), {
          order,
          cancelOrder: this.cancelOrder.bind(this)
        })
    );
  }

  async cancelOrder(id) {
    await deleteOrder(id);
    const remain = this.state.orders.filter(order => order.orderId !== id);
    this.setState({ products: remain });
  }
}
