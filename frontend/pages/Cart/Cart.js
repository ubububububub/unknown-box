import Component from "../../core/Component.js";
import { PaymentInfo } from "../../components/PaymentInfo/PaymentInfo.js";
import { qs } from "../../utils/index.js";

export class Cart extends Component {
  template() {
    return `<div class="container">장바구니 페이지입니다.</div>`;
  }

  render() {
    new PaymentInfo(qs(".container"), [
      { name: "MATIN FLEECE ZIP UP JUMPER IN BLACK", price: 198000 }
    ]);
  }
}
