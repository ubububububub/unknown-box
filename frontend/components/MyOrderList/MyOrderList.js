import Component from "../../core/Component.js";
import { qs } from "../../utils/index.js";
import MyOrderListItem from "../MyOrderListItem/MyOrderListItem.js";

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
        productInfo: { productId: 3, productName: "막걸리", price: "3000" },
        quantity: "3"
      },
      {
        productInfo: {
          productId: 4,
          productName: "주스",
          price: "1000"
        },
        quantity: "4"
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
        productInfo: { productId: 5, productName: "소고기", price: "50000" },
        quantity: "2"
      },
      {
        productInfo: { productId: 6, productName: "닭고기", price: "10000" },
        quantity: "3"
      }
    ]
  },
  {
    orderId: 3,
    orderTime: "22-10-12",
    orderState: "주문완료",
    orderProducts: [
      {
        productInfo: {
          productId: 1,
          productName: "콜라",
          price: "1000"
        },
        quantity: "100"
      }
    ]
  },
  {
    orderId: 4,
    orderTime: "22-10-15",
    orderState: "주문취소",
    orderProducts: [
      {
        productInfo: {
          productId: 1,
          productName: "몬스터",
          price: "3000"
        },
        quantity: "10"
      }
    ]
  }
];

class MyOrderList extends Component {
  template() {
    return `<div>
                <span>내 주문목록</span>
                <div id="list-container"></div>
            </div>`;
  }

  mounted() {
    const list = qs("#list-container");
    mockData.forEach(item => {
      const itemContainer = document.createElement("div");
      new MyOrderListItem(itemContainer, item);
      list.appendChild(itemContainer);
    });
  }
}

export default MyOrderList;
