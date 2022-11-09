import CategoryList from "../../components/CategoryList/CategoryList.js";
import Navbar from "../../components/Navbar/Navbar.js";
import Component from "../../core/Component.js";
import { qs } from "../../utils/index.js";
import { ADMIN_PAGE_NAV } from "../../constants/index.js";

export class Admin extends Component {
  template() {
    return `
      <ul id="category-nav"></ul>
      <div id="category-list-container"></div>
    `;
  }

  mounted() {
    new Navbar(qs("#category-nav"), ADMIN_PAGE_NAV);
    new CategoryList(qs("#category-list-container"));
  }
}
