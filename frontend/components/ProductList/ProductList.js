import Component from "../../core/Component.js";
import { isClassContained, qs, createEditForm } from "../../utils/index.js";
import Modal from "../Modal/Modal.js";
import Product from "../Product/Product.js";
import ImageUploadForm from "../ImageUploadForm/ImageUploadForm.js";
import {
  getProductList,
  editProduct,
  deleteProduct,
  addProduct
} from "../../apis/index.js";
import style from "./productList.css" assert { type: "css" };
document.adoptedStyleSheets.push(style);

export class ProductList extends Component {
  template() {
    return `<button type="button" class="btn product-addBtn">추가하기</button>
            <ul class="admin_product-list"></ul>`;
  }

  async mounted() {
    const products = await getProductList();
    this.state = { products };

    this.state.products.forEach(
      product =>
        new Product(qs(".admin_product-list"), {
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
      contents: { body: [createEditForm(domList)] },
      submit: this.addProductItem.bind(this)
    });

    new ImageUploadForm(qs("form > .product-img"));
  }

  async addProductItem(data) {
    await addProduct(data);
    location = "/admin/product";
  }

  async deleteProductItem(id) {
    await deleteProduct(id);
    const remain = this.state.products.filter(
      product => product.productId !== id
    );
    this.setState({ products: remain });
  }

  async editProductItem(id, data) {
    await editProduct(id, data);
    location = "/admin/product";
  }
}
