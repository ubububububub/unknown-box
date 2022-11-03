import Navbar from "../../components/Navbar/Navbar.js";
import OrderEdit from "../../components/OrderEdit/OrderEdit.js";
import { MY_PAGE_NAV } from "../../constants/index.js";
import Component from "../../core/Component.js";
import { qs } from "../../utils/index.js";

export class MyOrderEdit extends Component {
  template() {
    return `<ul id="mypage-nav"></ul>
            <span>주문자 정보수정</span>
            <div id="container"></div>`;
  }

  mounted() {
    new Navbar(qs("#mypage-nav"), MY_PAGE_NAV);
    new OrderEdit(qs("#container"), this.props);
  }
}
