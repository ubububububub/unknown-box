import InfoEditForm from "../InfoEditForm/InfoEditForm.js";
import Component from "../../core/Component.js";
import {
  detailAddressValidation,
  nameValidation,
  phoneValidation,
  qs
} from "../../utils/index.js";

class OrderEdit extends Component {
  template() {
    const item = this.state;
    return `<span>주문자 정보수정</span>
            <div>
              <span>주문번호 : ${item.orderId}</span>
              <span>주문일자 : ${item.orderTime}</span>
              <span>주문상태 : ${item.orderState}</span>
              <div id="shipping-info-container"></div>
              <button id="edit-btn">수정 완료</button>
            </div>
            `;
  }

  mounted() {
    const formChildren = [
      {
        id: "orderName",
        title: "주문자명",
        type: "text",
        value: this.state.orderName
      },
      {
        id: "orderPhone",
        title: "주문자 전화번호",
        type: "text",
        value: this.state.orderPhone
      },
      { type: "address" }
    ];
    const InfoEditFormProps = {
      formChildren,
      orderAddress: this.state.orderAddress
    };
    new InfoEditForm(qs("#shipping-info-container"), InfoEditFormProps);
  }

  async setup() {
    const mockData = {
      orderId: 1,
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
      }
    };
    // const data = await getOrderInfo(this.props);
    this.state = mockData;
  }

  setEvent() {
    qs("#edit-btn").addEventListener("click", e => {
      this.handleEditBtn(e);
    });
  }

  handleEditBtn(e) {
    e.preventDefault();
    if (
      nameValidation(qs("#orderName").value) &&
      phoneValidation(qs("#orderPhone").value) &&
      detailAddressValidation(qs("#detailAddress").value)
    ) {
      const formData = new FormData(qs("#container-form"));
      postOrderInfo(formData, this.props.orderId);
    }
  }
}

export default OrderEdit;
