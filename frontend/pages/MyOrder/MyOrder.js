import MyOrderList from "../../components/MyOrderList/MyOrderList.js";
import Navbar from "../../components/Navbar/Navbar.js";
import { MY_PAGE_NAV } from "../../constants/index.js";
import Component from "../../core/Component.js";
import { qs } from "../../utils/index.js";
import style from "./myOrder.css" assert { type: "css" };
document.adoptedStyleSheets.push(style);

export class MyOrder extends Component {
  template() {
    return `
    <div id="mypage-nav"></div>
    <div id="mypage-container">
        <H1>내 주문목록</H1>
        <div id="myorder-myorderlist-section"></div>
    </div>
    `;
  }

  mounted() {
    new Navbar(qs("#mypage-nav"), MY_PAGE_NAV);
    new MyOrderList(qs("#myorder-myorderlist-section"));
  }
}
