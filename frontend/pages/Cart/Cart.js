import Component from "../../core/Component.js";
import PaymentInfo from "../../components/PaymentInfo/PaymentInfo.js";
import { qs } from "../../utils/index.js";

export class Cart extends Component {
  template() {
    return `<div class="container">장바구니 페이지입니다.</div>`;
  }

  mounted() {
    new PaymentInfo(qs(".container"), [
      {
        name: "MATIN FLEECE ZIP UP JUMPER IN BLACK",
        price: 198000,
        quantity: 1
      },
      {
        name: "NJ1DN82B 여성 눕시 하이브리드 다운 볼 자켓",
        price: 249000,
        quantity: 1
      },
      {
        name: "[유아인 착용 상품] 리버서블 플리스 숏 패딩 재킷 [블랙/크림] ",
        price: 89900,
        quantity: 1
      }
    ]);
  }
}
