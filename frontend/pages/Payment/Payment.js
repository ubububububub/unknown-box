import Component from "../../core/Component.js";
import PaymentInfo from "../../components/PaymentInfo/PaymentInfo.js";
import {
  detailAddressValidation,
  nameValidation,
  phoneValidation,
  qs,
  qsAll
} from "../../utils/index.js";
import Form from "../../components/Form/Form.js";
import { cart } from "../../store/cart.js";
import { postOrderInfo, postOrder } from "../../apis/index.js";

export class Payment extends Component {
  setup() {
    this.state = {
      cartList: cart.getCartList(),
      buttonEvent: this.handleMoveNextPage.bind(this)
    };
  }

  template() {
    return `<section id="container">
      <h2>주문 결제</h2>
      <div id="content"></div>
    </section>`;
  }

  mounted() {
    const formChildren = [
      {
        id: "orderName",
        title: "주문자명",
        type: "text"
      },
      {
        id: "orderPhone",
        title: "주문자 전화번호",
        type: "text"
      },
      { type: "address" }
    ];
    const formProps = {
      formChildren,
      orderAddress: {
        postcode: "123123",
        roadAddress: "사랑시 고백구 행복동",
        jibunAddress: "사랑시 고백구 행복동",
        detailAddress: "상세한주소",
        extraAddress: "이건뭐이야"
      }
    };
    new Form(qs("#content"), formProps);
    new PaymentInfo(qs("#content"), this.state);
  }

  handleMoveNextPage({ target }) {
    const clickedElClassName = target.classList.value;

    if (clickedElClassName !== "payment-info__button") {
      return;
    }

    this.handleEditBtn(e);

    const product = {
      productName: this.parsePaymentProductName(".payment-info__product-name"),
      productNum: this.parsePaymentProductNum(".payment-info__product-name"),
      productsPrice: this.parsePaymentPriceInfo(
        ".payment-info__products-price"
      ),
      deliveryPrice: this.parsePaymentPriceInfo(
        ".payment-info__delivery-price"
      ),
      orderPrice: this.parsePaymentPriceInfo(".payment-info__total-price")
    };

    postOrder(product);

    return (window.location = "/order/recipt");
  }

  parsePaymentProductName(selector) {
    return Array.from(qsAll(selector)).map(product => {
      const [productName] = product.innerText.split(",");

      return productName;
    });
  }

  parsePaymentProductNum(selector) {
    return Array.from(qsAll(selector)).map(product => {
      const [_, productPriceText] = product.innerText.split(",");
      const [productNumText] = productPriceText.split("개");

      return Number(productNumText);
    }, 0);
  }

  parsePaymentPriceInfo(selector) {
    const regex = /\d/g;

    return Number(qs(selector).innerText.match(regex).join(""));
  }

  handleEditBtn(e) {
    e.preventDefault();
    if (
      nameValidation(qs("#orderName").value) &&
      phoneValidation(qs("#orderPhone").value) &&
      detailAddressValidation(qs("#detailAddress").value)
    ) {
      postOrderInfo(Form.getFormData(), this.props);
    }
  }
}
