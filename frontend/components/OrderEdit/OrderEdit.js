import Component from "../../core/Component.js";
import { qs } from "../../utils/index.js";
import AddressForm from "../AddressForm/AddressForm.js";

class OrderEdit extends Component {
  template() {
    const item = this.state;
    return `<div>
              <span>${item.orderId}</span>
              <span>${item.orderTime}</span>
              <span>${item.orderState}</span>
              <div id="address-container"/>
            </div>
            <button>수정 완료</button>
            <button>취소</button>
        `;
  }

  setup() {
    const data = {
      orderId: 1,
      orderTime: "22-10-10",
      orderState: "배송중",
      orderLocation: "서울시 강남구",
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
    };
    this.state = data;
  }

  mounted() {
    new AddressForm(qs("#address-container"));
  }
}

export default OrderEdit;
