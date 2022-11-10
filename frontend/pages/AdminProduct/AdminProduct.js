import Component from "../../core/Component.js";
import Navbar from "../../components/Navbar/Navbar.js";
import { qs } from "../../utils/index.js";
import { ADMIN_PAGE_NAV } from "../../constants/index.js";
import { ProductList } from "../../components/ProductList/ProductList.js";
import style from "./adminProduct.css" assert { type: "css" };
document.adoptedStyleSheets.push(style);

export class AdminProduct extends Component {
  template() {
    return `<section id="admin-product-container"> 
              <div id="admin-product-nav"></div>
              <div id="admin-product-list-wrapper"></div>
            </section>
        `;
  }

  mounted() {
    new Navbar(qs("#admin-product-nav"), ADMIN_PAGE_NAV);
    new ProductList(qs("#admin-product-list-wrapper"));
  }
}
