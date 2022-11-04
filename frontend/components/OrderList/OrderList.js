import Component from "../../core/Component.js";
import { qs } from "../../utils/index.js";
import OrderItem from "../OrderItem/OrderItem.js";

export default class OrderList extends Component {
  template() {
    return `
            <thead>
                <tr>
                    <th>주문번호</th>
                    <th>주문날짜</th>
                    <th>주문상품</th>
                    <th>총가격</th>
                    <th>상태</th>
                </tr>
            </thead>
            <tbody id="order-list-body"></tbody>
        </table>
        `;
  }

  mounted() {
    this.props.forEach(order => new OrderItem(qs("#order-list-body"), order));
  }
}
