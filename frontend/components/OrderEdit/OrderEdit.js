import { getShippingInfo } from "../../apis/index.js";
import Component from "../../core/Component.js";
import { qs } from "../../utils/index.js";
import ShippingInfoEdit from "../ShippingInfoEdit/ShippingInfoEdit.js";

class OrderEdit extends Component {
  template() {
    const item = this.state;
    return `<div>
              <span>주문번호 : ${item.orderId}</span>
              <span>주문일자 : ${item.orderTime}</span>
              <span>주문상태 : ${item.orderState}</span>
              <div id="shipping-info-container"/>
            </div>
        `;
  }

  async setup() {
    const data = await getShippingInfo(this.props);
    this.state = data;
  }

  mounted() {
    new ShippingInfoEdit(qs("#shipping-info-container"), this.state);
  }
}

export default OrderEdit;
