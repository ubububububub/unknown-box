import { postShippingInfo } from "../../apis/index.js";
import Component from "../../core/Component.js";
import {
  detailAddressValidation,
  nameValidation,
  phoneValidation,
  qs
} from "../../utils/index.js";
import AddressForm from "../AddressForm/AddressForm.js";

class ShippingInfoEdit extends Component {
  template() {
    const item = this.props;
    return `<div>
    <label>주문자 성함</label>
              <input id="order-name" value=${item.orderName} />
              <label>주문자 연락처</label>
              <input id="order-phone" value="${item.orderPhone || ""}" />
              <div id="address-container"/>
            </div>
            <button id="edit-btn">수정 완료</button>
            <button>취소</button>
        `;
  }

  mounted() {
    new AddressForm(qs("#address-container"), this.props.orderAddress);
  }

  setEvent() {
    qs("#edit-btn").addEventListener("click", e => {
      this.handleEditBtn(e);
    });
  }

  handleEditBtn(e) {
    e.preventDefault();

    if (
      nameValidation(qs("#order-name").value) &&
      phoneValidation(qs("#order-phone").value) &&
      detailAddressValidation(qs("#detailAddress").value)
    ) {
      const data = {
        orderName: qs("#order-name").value,
        orderPhone: qs("#order-phone").value,
        postcode: qs("#postcode").value,
        roadAddress: qs("#roadAddress").value,
        jibunAddress: qs("#jibunAddress").value,
        detailAddress: qs("#detailAddress").value,
        extraAddress: qs("#extraAddress").value
      };
      postShippingInfo(data, this.props.orderId);
    }
  }
}

export default ShippingInfoEdit;
