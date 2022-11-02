import MyInfo from "../../components/MyInfo/MyInfo.js";
import Component from "../../core/Component.js";
import { qs } from "../../utils/index.js";

export class MyPage extends Component {
  template() {
    return `<div id="myinfo-container" ></div>
    <button class="mycart-btn">장바구니</button>
    <button class="myorder-btn">내 주문목록</button>`;
  }

  mounted() {
    new MyInfo(qs("#myinfo-container"));
  }
}
