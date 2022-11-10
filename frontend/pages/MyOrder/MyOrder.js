import MyOrderList from "../../components/MyOrderList/MyOrderList.js";
import Navbar from "../../components/Navbar/Navbar.js";
import { MY_PAGE_NAV } from "../../constants/index.js";
import Component from "../../core/Component.js";
import { qs } from "../../utils/index.js";

export class MyOrder extends Component {
  template() {
    return `
    <div id="mypage-nav"></div>
    <div id="mypage-container">
      <div>
        <span>내 주문목록</span>
        <div id="list-container"></div>
      </div>
    </div>
    `;
  }

  mounted() {
    new Navbar(qs("#mypage-nav"), MY_PAGE_NAV);
    new MyOrderList(qs("#list-container"));
  }
}
