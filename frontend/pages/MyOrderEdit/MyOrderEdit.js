import Navbar from "../../components/Navbar/Navbar.js";
import OrderEdit from "../../components/OrderEdit/OrderEdit.js";
import { MY_PAGE_NAV } from "../../constants/index.js";
import Component from "../../core/Component.js";
import { qs } from "../../utils/index.js";
import style from "./myOrderEdit.css" assert { type: "css" };
document.adoptedStyleSheets.push(style);

export class MyOrderEdit extends Component {
  template() {
    return `<ul id="mypage-nav"></ul>
            <div id="myorderedit-orderedit-container"/>`;
  }

  mounted() {
    new Navbar(qs("#mypage-nav"), MY_PAGE_NAV);
    new OrderEdit(qs("#myorderedit-orderedit-container"), ...this.props);
  }
}
