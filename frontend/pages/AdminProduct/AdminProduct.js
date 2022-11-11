import Component from "../../core/Component.js";
import Navbar from "../../components/Navbar/Navbar.js";
import { qs } from "../../utils/index.js";
import { ADMIN_PAGE_NAV } from "../../constants/index.js";
import { ProductList } from "../../components/ProductList/ProductList.js";
import style from "./adminProduct.css" assert { type: "css" };
document.adoptedStyleSheets.push(style);

export class AdminProduct extends Component {
  template() {
    return `<section id="admin_product-container"> 
              <div id="admin_product-nav"></div>
              <div id="admin_product-list-wrapper"></div>
            </section>
        `;
  }

  mounted() {
    new Navbar(qs("#admin_product-nav"), ADMIN_PAGE_NAV);
    new ProductList(qs("#admin_product-list-wrapper"));
  }
}
