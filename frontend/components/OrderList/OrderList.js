import Component from "../../core/Component.js";
import { qs } from "../../utils/index.js";
import OrderItem from "../OrderItem/OrderItem.js";
//import { getOrderList } from "../../apis/index.js";

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
    // const orders = await getOrderList();
    const mockData = [
      {
        orderId: "507f1f77bcf86cd799439011",
        orderTime: "22-10-10",
        orderState: "배송준비중",
        orderName: "이상조",
        orderPhone: "01074253535",
        orderAddress: {
          postcode: "123123",
          roadAddress: "사랑시 고백구 행복동",
          jibunAddress: "사랑시 고백구 행복동",
          detailAddress: "상세한주소",
          extraAddress: "이건뭐이야"
        },
        randomboxes: [{ randomboxName: "의류 랜덤박스 Dia", count: 2 }],
        boxesPrice: 60000,
        deliveryPrice: 3000,
        totalPrice: 63000,
        createdAt: "22-10-10",
        updatedAt: "22-10-12"
      },
      {
        orderId: 2,
        orderTime: "22-10-10",
        orderState: "배송중",
        orderName: "고나현",
        orderPhone: "01074253535",
        orderAddress: {
          postcode: "123123",
          roadAddress: "사랑시 고백구 행복동",
          jibunAddress: "사랑시 고백구 행복동",
          detailAddress: "상세한주소",
          extraAddress: "이건뭐이야"
        },
        randomboxes: [{ randomboxName: "의류 랜덤박스 Dia", count: 2 }],
        boxesPrice: 100000,
        deliveryPrice: 3000,
        totalPrice: 103000,
        createdAt: "22-10-10",
        updatedAt: "22-10-12"
      },
      {
        orderId: 3,
        orderTime: "22-10-10",
        orderState: "배송준비중",
        orderName: "김지택",
        orderPhone: "01074253535",
        orderAddress: {
          postcode: "123123",
          roadAddress: "사랑시 고백구 행복동",
          jibunAddress: "사랑시 고백구 행복동",
          detailAddress: "상세한주소",
          extraAddress: "이건뭐이야"
        },
        randomboxes: [{ randomboxName: "의류 랜덤박스 Dia", count: 2 }],
        boxesPrice: 45000,
        deliveryPrice: 3000,
        totalPrice: 48000,
        createdAt: "22-10-10",
        updatedAt: "22-10-12"
      }
    ];

    this.state = { orders: mockData };

    this.state.orders.forEach(
      order =>
        new OrderItem(qs(".order-list-body"), {
          order,
          cancelOrder: this.cancelOrder.bind(this)
        })
    );
  }

  async cancelOrder(id, data) {
    // await deleteOrder(id);
    const remain = this.state.orders.filter(order => order.orderId !== id);
    this.setState({ products: remain });
  }
}
