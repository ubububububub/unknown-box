import CategoryList from "../../components/CategoryList/CategoryList.js";
import Navbar from "../../components/Navbar/Navbar.js";
import Component from "../../core/Component.js";
import { qs } from "../../utils/index.js";
import { ADMIN_PAGE_NAV } from "../../constants/index.js";
import style from "./admin.css" assert { type: "css" };
document.adoptedStyleSheets.push(style);

export class Admin extends Component {
  template() {
    return `<section id="admin_category-container">  
              <div id="admin_category-nav"></div>
              <div id="admin_category-wrapper"></div>
            </sction>
    `;
  }

  mounted() {
    new Navbar(qs("#admin_category-nav"), ADMIN_PAGE_NAV);
    new CategoryList(qs("#admin_category-wrapper"));
  }
}
