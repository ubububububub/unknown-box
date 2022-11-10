import Component from "../../core/Component.js";
import { isClassContained, qs, editForm } from "../../utils/index.js";
import Modal from "../Modal/Modal.js";
import Product from "../Product/Product.js";
import ImageUploadForm from "../ImageUploadForm/ImageUploadForm.js";
// import {
//   getProductList,
//   editProduct,
//   deleteProduct,
//   addProduct
// } from "../../apis/index.js";
import style from "./productList.css" assert { type: "css" };
document.adoptedStyleSheets.push(style);

export class ProductList extends Component {
  template() {
    return `
      <ul class="product-list">
          <button type="button" class="btn product-addBtn">추가하기</button>
      </ul>`;
  }

  async mounted() {
    // const products = await getProductList();
    const mockData = [
      {
        productId: 1,
        productName: "에어팟",
        categoryName: "전자제품",
        price: 190000,
        thumbnail: "#",
        count: 10,
        description: ""
      },
      {
        productId: 2,
        productName: "의자",
        categoryName: "잡화",
        price: 79900,
        thumbnail: "#",
        count: 20,
        description: ""
      },
      {
        productId: 3,
        productName: "블루투스 스피커",
        categoryName: "전자제품",
        price: 100000,
        thumbnail: "#",
        count: 10,
        description: ""
      }
    ];

    this.state = { products: mockData };

    this.state.products.forEach(
      product =>
        new Product(qs(".product-list"), {
          product,
          editProductItem: this.editProductItem.bind(this),
          deleteProductItem: this.deleteProductItem.bind(this)
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

  async addHandler() {
    const domList = [
      {
        className: "product-img"
      },
      {
        className: "product-name",
        title: "상품명",
        attr: { name: "productName" }
      },
      {
        className: "category-name",
        title: "카테고리명",
        attr: { name: "categoryName" }
      },
      { className: "price", title: "가격", attr: { name: "price" } },
      { className: "count", title: "재고", attr: { name: "count" } },
      { className: "desc", title: "상세 설명", attr: { name: "description" } }
    ];

    await new Modal(qs("#app"), {
      type: "ADD",
      headerText: "상품 아이템 추가하기",
      contents: { body: [editForm(domList)] },
      submit: this.addProductItem.bind(this)
    });

    new ImageUploadForm(qs("form > .product-img"));
  }

  async addProductItem(data) {
    // await addProduct(data);
    location = "/admin/product";
  }

  async deleteProductItem(id) {
    // await deleteProduct(id);
    const remain = this.state.products.filter(
      product => product.productId !== id
    );
    this.setState({ products: remain });
  }

  async editProductItem(id, data) {
    // await editProduct(id, data);
    location = "/admin/product";
  }
}
