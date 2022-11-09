import Component from "../../core/Component.js";
import Navbar from "../../components/Navbar/Navbar.js";
import ProductList from "../../components/ProductList/ProductList.js";
import { qs } from "../../utils/index.js";
import { ADMIN_PAGE_NAV } from "../../constants/index.js";

export class AdminProduct extends Component {
  template() {
    return `
          <ul id="product-nav"></ul>
            <div id="product-list-container"></div>
        `;
  }

  mounted() {
    new Navbar(qs("#product-nav"), ADMIN_PAGE_NAV);
    new ProductList(qs("#product-list-container"));
  }
}
