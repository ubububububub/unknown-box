import Component from "../../core/Component.js";
import { isClassContained, qs, editForm } from "../../utils/index.js";
import Modal from "../Modal/Modal.js";
import ProductItem from "../ProductItem/ProductItem.js";
// import {
//   getProducts,
//   editProduct,
//   deleteProduct,
//   addProduct
// } from "../../apis/index.js";

export default class ProductList extends Component {
  template() {
    return `
      <ul class="products-list">
          <button type="button" class="btn product-addBtn">추가하기</button>
      </ul>`;
  }

  mounted() {
    // const productList = await getProducts();
    const mockData = [
      {
        productId: 1,
        Name: "의류 랜덤박스 Platinum",
        category: "의류",
        price: 39900,
        productMin: 5000,
        productMax: 100000,
        thumbnail: "#",
        discount: null,
        count: 10,
        description: "",
        products: ["아이템1", "아이템2", "아이템3"]
      },
      {
        productId: 2,
        Name: "전자제품 랜덤박스 Dia",
        category: "전자제품",
        price: 49900,
        productMin: 5000,
        productMax: 120000,
        thumbnail: "#",
        discount: 44910,
        count: 20,
        description: "",
        products: ["아이템1", "아이템2", "아이템3"]
      },
      {
        productId: 3,
        Name: "의류 랜덤박스 Gold",
        category: "의류",
        price: 29900,
        productMin: 2000,
        productMax: 80000,
        thumbnail: "#",
        discount: null,
        count: 7,
        description: "",
        products: ["아이템1", "아이템2", "아이템3"]
      }
    ];

    this.state = { productList: mockData };

    this.state.productList.forEach(
      product =>
        new ProductItem(qs(".products-list"), {
          product,
          editProduct: this.editProduct.bind(this),
          deleteProduct: this.deleteProduct.bind(this)
        })
    );
  }

  setEvent() {
    this.target.addEventListener("click", e => {
      if (!isClassContained(e.target, "btn")) return;

      if (isClassContained(e.target, "product-addBtn")) {
        this.addHandler();
      }
    });
  }

  addHandler() {
    const domList = [
      { className: "product-name", title: "상품명", attr: { name: "Name" } },
      {
        className: "category-name",
        title: "카테고리명",
        attr: { name: "category" }
      },
      { className: "price", title: "가격", attr: { name: "price" } },
      { className: "discount", title: "할인율", attr: { name: "discount" } },
      { className: "count", title: "재고", attr: { name: "count" } },
      {
        className: "item-min-price",
        title: "최저가",
        attr: { name: "productMin" }
      },
      {
        className: "item-max-price",
        title: "최고가",
        attr: { name: "productMax" }
      },
      { className: "desc", title: "상세설명", attr: { name: "description" } }
    ];

    new Modal(qs("#app"), {
      type: "ADD",
      headerText: "상품 추가하기",
      contents: { body: [editForm(domList)] },
      submit: this.addProduct.bind(this)
    });
  }

  async addProduct(data) {
    // await API.addProduct(data);
    location = "/admin/products";
  }

  async deleteProduct(id) {
    // await API.deleteCategory(id);
    const remain = this.state.productList.filter(
      product => product.productId !== id
    );
    this.setState({ productList: remain });
  }

  async editProduct(id, data) {
    // await API.editCategory(id, data);
    location = "/admin/products";
  }
}
