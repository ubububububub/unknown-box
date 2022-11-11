import Form from "../Form/Form.js";
import Component from "../../core/Component.js";
import {
  detailAddressValidation,
  nameValidation,
  phoneValidation,
  qs
} from "../../utils/index.js";
import { postOrderInfo } from "../../apis/index.js";
import style from "./orderEdit.css" assert { type: "css" };
document.adoptedStyleSheets.push(style);

class OrderEdit extends Component {
  template() {
    const item = this.state;
    return `<H1>주문자 정보수정</H1>
            <div class="orderedit-edit-container">
              <div class="orderedit-shipping-container"></div>
              <button class="orderedit-edit-btn form_btn">수정 완료</button>
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
    const formProps = {
      formChildren,
      orderAddress: this.state.orderAddress
    };
    new Form(qs(".orderedit-shipping-container"), formProps);
  }

  async setup() {
    const mockData = {
      orderId: 1,
      orderTime: "22-10-10",
      orderState: "배송준비중",
      orderName: "이상조",
      orderPhone: "01074253535",
      orderAddress: {
        postalcode: "123123",
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
    qs(".orderedit-edit-btn").addEventListener("click", e => {
      this.handleEditBtn(e);
    });
  }

  handleEditBtn(e) {
    e.preventDefault();
    if (
      nameValidation(qs("#orderName")) &&
      phoneValidation(qs("#orderPhone")) &&
      detailAddressValidation(qs("#detailAddress"))
    ) {
      postOrderInfo(Form.getFormData(), this.props);
    }
  }
}

export default OrderEdit;
