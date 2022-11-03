import Component from "../../core/Component.js";
import Navbar from "../../components/Navbar/Navbar.js";
import ProductList from "../../components/ProductList/ProductList.js";
import { qs } from "../../utils/index.js";

export class AdminProduct extends Component {
    setup () {
        this.state = [
          { 
            title: '상품 카테고리 관리', 
            path: '/admin' 
          },
          { 
            title: '상품 관리', 
            path: '/admin/products' 
          },
          { 
            title: '결제 내역 관리', 
            path: '/admin/order' 
          }
        ];
      }
    
      template () {
        return `
          <ul id="product-nav"></ul>
            <table id="product-list-container"></table>
        `;
      }
    
      mounted () {
        const mockData = [
            { 
                productId: 1, 
                productName: "콜라", 
                price: "1000",
                desc: "제로콜라" 
            },
            { 
                productId: 2, 
                productName: "사이다", 
                price: "2000",
                desc: "제로사이다" 
            },
            {
                productId: 3, 
                productName: "막걸리", 
                price: "3000",
                desc: ""
            },
        ];
    
        new Navbar(qs('#product-nav'), this.state);
        new ProductList(qs('#product-list-container'), mockData);
    }
}