import Component from "../../core/Component.js";
import Navbar from "../../components/Navbar/Navbar.js";
import OrderList from "../../components/OrderList/OrderList.js";
import { qs } from "../../utils/index.js";
import { ADMIN_PAGE_NAV } from "../../constants/index.js";

export class AdminOrder extends Component {
  template() {
    return `
          <ul id="order-nav"></ul>
            <table id="order-list-container"></table>
        `;
  }

  mounted() {
    new Navbar(qs("#order-nav"), ADMIN_PAGE_NAV);
    new OrderList(qs("#order-list-container"));
  }
}
