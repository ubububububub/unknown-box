import { getMyOrder } from "../../apis/index.js";
import Component from "../../core/Component.js";
import { qs } from "../../utils/index.js";
import MyOrderItem from "../MyOrderItem/MyOrderItem.js";
import style from "./myOrderList.css" assert { type: "css" };
document.adoptedStyleSheets.push(style);

class MyOrderList extends Component {
  async setup() {
    const data = await getMyOrder();
    this.state = { data };
  }

  template() {
    return `<div id="myorderlist-container"></div>`;
  }

  mounted() {
    if (this.state.data.error) {
      const noOrderTitle = document.createElement("span");
      noOrderTitle.innerText = "주문 내역이 없습니다.";
      qs("#myorderlist-container").appendChild(noOrderTitle);
    } else {
      this.state.data.forEach(
        (item, idx) =>
          new MyOrderItem(qs("#myorderlist-container"), {
            item,
            idx,
            deleteOrder: this.deleteOrder.bind(this)
          })
      );
    }
  }

  deleteOrder(deleteOrderId) {
    const newItem = this.state.data.filter(
      order => order.orderId !== deleteOrderId
    );
    this.setState({ data: [...newItem] });
  }
}

export default MyOrderList;
