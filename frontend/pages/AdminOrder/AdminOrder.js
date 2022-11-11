import Component from "../../core/Component.js";
import Navbar from "../../components/Navbar/Navbar.js";
import OrderList from "../../components/OrderList/OrderList.js";
import { qs } from "../../utils/index.js";
import { ADMIN_PAGE_NAV } from "../../constants/index.js";
import style from "./adminOrder.css" assert { type: "css" };
document.adoptedStyleSheets.push(style);

export class AdminOrder extends Component {
  template() {
    return `
          <section id="admin_order-container">
            <div id="admin_order-nav"></div>
            <table id="admin_order-list-wrapper"></table>
          </section>
        `;
  }

  mounted() {
    new Navbar(qs("#admin_order-nav"), ADMIN_PAGE_NAV);
    new OrderList(qs("#admin_order-list-wrapper"));
  }
}
