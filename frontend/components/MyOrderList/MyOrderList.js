import { getMyOrder } from "../../apis/index.js";
import Component from "../../core/Component.js";
import MyOrderItem from "../MyOrderItem/MyOrderItem.js";

class MyOrderList extends Component {
  async setup() {
    const mockData = [
      {
        orderId: 1,
        orderTime: "22-10-10",
        orderState: "배송중",
        orderProducts: [
          {
            productInfo: { productId: 1, productName: "콜라", price: "1000" },
            quantity: "1"
          },
          {
            productInfo: { productId: 2, productName: "사이다", price: "2000" },
            quantity: "2"
          },
          {
            productInfo: { productId: 4, productName: "주스", price: "1000" },
            quantity: "2"
          },
          {
            productInfo: { productId: 1, productName: "몬스터", price: "3000" },
            quantity: "10"
          }
        ]
      },
      {
        orderId: 2,
        orderTime: "22-10-11",
        orderState: "배송완료",
        orderProducts: [
          {
            productInfo: {
              productId: 4,
              productName: "돼지고기",
              price: "8000"
            },
            quantity: "1"
          },
          {
            productInfo: {
              productId: 5,
              productName: "소고기",
              price: "50000"
            },
            quantity: "2"
          },
          {
            productInfo: {
              productId: 6,
              productName: "닭고기",
              price: "10000"
            },
            quantity: "3"
          }
        ]
      }
    ];

    this.state = { mockData };
    // const data = await getMyOrder();
  }

  template() {
    return `<div id="list-container"></div>`;
  }

  mounted() {
    this.state.mockData.forEach(
      (item, idx) =>
        new MyOrderItem(this.target, {
          item,
          idx,
          deleteOrder: this.deleteOrder.bind(this)
        })
    );
  }

  deleteOrder(deleteOrderId) {
    const newItem = this.state.mockData.filter(
      order => order.orderId !== deleteOrderId
    );
    this.setState({ mockData: [...newItem] });
  }
}

export default MyOrderList;
