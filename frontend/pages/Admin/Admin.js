import CategoryList from "../../components/CategoryList/CategoryList.js";
import Navbar from "../../components/Navbar/Navbar.js";
import Component from "../../core/Component.js";
import { qs } from "../../utils/index.js";

export class Admin extends Component {
  
  setup () {
    this.state = [
      { 
        title: '상품 카테고리 관리', 
        path: '/admin' 
      },
      { 
        title: '상품 관리', 
        path: 'admin/products' 
      },
      { 
        title: '결제 내역 관리', 
        path: 'admin/order' 
      }
    ];
  }

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

    new Navbar(qs('#category-nav'), this.state);
    new CategoryList(qs('#category-list-container'), mockData);
  }
}
