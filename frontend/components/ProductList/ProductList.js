import Component from "../../core/Component.js";
import { qs } from "../../utils/index.js";
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
        productName: "의류 랜덤박스 Platinum",
        categoryName: "의류",
        price: 39900,
        desc: "",
        count: 10,
        thumbnail: "#",
        itemList: [],
        discountRate: 0,
        discountedPrice: 39900
      },
      {
        productId: 2,
        productName: "전자제품 랜덤박스 Dia",
        categoryName: "전자제품",
        price: 49900,
        desc: "",
        count: 10,
        thumbnail: "#",
        itemList: [],
        discountRate: 10,
        discountedPrice: 44910
      },
      {
        productId: 3,
        productName: "의류 랜덤박스 Gold",
        categoryName: "의류",
        price: 29900,
        desc: "",
        count: 30,
        thumbnail: "#",
        itemList: [],
        discountRate: 0,
        discountedPrice: 0
      }
    ];
    this.state = { products: mockData };
    this.state.products.forEach(
      product =>
        new ProductItem(qs(".products-list"), {
          product,
          editProduct: this.editProductState.bind(this),
          deleteProduct: this.deleteProductState.bind(this)
        })
    );
  }

  setEvent() {
    this.target.addEventListener("click", e => {
      if (!e.target.classList.contains("btn")) return;

      if (e.target.classList.contains("product-addBtn")) {
        this.addHandler();
      }
    });
  }

  addHandler() {
    const contents = `
        <form id="form">
              <img class="thumbnail"/>
              <div class="productName">
                  <span>상품명</span>
                  <input name="productName"/>
              </div>
              <div class="categotyName">
                  <span>카테고리명</span>
                  <input name="categoryName"/>
              </div>
              <div class="price">
                  <span>가격</span>
                  <input name="price" />
              </div>
              <div class="discountRate">
                  <span>할인율</span>
                  <input name="discountRate"/>
              </div>
              <div class="count">
                  <span>재고</span>
                  <input name="count"/>
              </div>
              <div class="desc">
                  <span>상세 설명</span>
                  <input name="desc"/>
              </div>
          </form>`;

    new Modal(qs("#app"), {
      type: "ADD",
      headerText: "랜덤박스 상세 정보",
      contents,
      submit: this.addProductState.bind(this)
    });
  }

  async addProductState(data) {
    // await addCategory(data);
    location = "/admin/products";
  }

  async deleteProductState(id) {
    // await deleteCategory(id);

    const remain = this.state.products.filter(
      product => product.productId != id
    );
    this.setState({ products: remain });
    location = "/admin/products";
  }

  async editProductState(id, data) {
    // await editCategory(id, data);
    location = "/admin/products";
  }
}
