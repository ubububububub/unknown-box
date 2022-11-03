import CategoryList from "../../components/CategoryList/CategoryList.js";
import Navbar from "../../components/Navbar/Navbar.js";
import Component from "../../core/Component.js";
import { qs } from "../../utils/index.js";
import { ADMIN_PAGE_NAV } from "../../const/index.js";

export class Admin extends Component {
  
  template () {
    return `
      <ul id="category-nav"></ul>
      <div id="category-list-container"></div>
    `;
  }

  mounted () {
    const mockData = [
      { title: '식품' },
      { title: '가전' },
      { title: '화장품' },
    ];

    new Navbar(qs('#category-nav'), ADMIN_PAGE_NAV);
    new CategoryList(qs('#category-list-container'), mockData);
  }
}
