//import { editProduct, deleteProduct } from "../../apis/index.js";
import Component from "../../core/Component.js";
import { qs } from "../../utils/index.js";
import Modal from "../Modal/Modal.js";
import { isClassContained } from "../../utils/index.js";

export default class ProductItem extends Component {
  template() {
    const {
      productId,
      productName,
      categoryName,
      price,
      desc,
      count,
      thumbnail,
      discountRate,
      discountedPrice
    } = this.props.product;

    return `
            <li class="product-item-${productId}">
              <div class="image">
                <img src="${thumbnail}"/>
              </div>
              <div class="info">
                <div class="product-name">
                  <span>상품명</span>
                  <span>${productName}</span>
                </div>
                <div class="category-name">
                  <span>카테고리명</span>
                  <span>${categoryName}</span>
                </div>
                <div class="price">
                  <span>가격</span>
                  ${
                    discountRate
                      ? `<span style="text-decoration: line-through">${price}</span>
                          <span>${discountedPrice}</span>`
                      : `<span>${price}</span>`
                  }
                </div>
                <div class="desc">
                  <span>상세 설명</span>
                  <span>${desc}</span>
                </div>
                <div class="count">
                  <span>재고</span>
                  <span>${count}</span>
                </div>
              </div>
                <button type="button" class="btn product-editBtn">수정하기</button>
                <button type="button" class="btn product-delBtn">삭제하기</button>
            </li>
        `;
  }

  render() {
    this.target.insertAdjacentHTML("beforeend", this.template());
  }

  setEvent() {
    const productLi = qs(`.product-item-${this.props.product.productId}`);
    productLi.addEventListener("click", e => {
      const target = e.target.closest("li").querySelector("span");

      if (isContained(e.target, "product-editBtn")) {
        this.editHandler(target);
      }

      if (this.isContained(e.target, "product-delBtn")) {
        this.deleteHandler();
      }
    });
  }

  editHandler() {
    const contents = `
        <form>
        <img url="${this.props.product.thumbnail}"/>
        <div class="productName">
            <span>상품명</span>
            <input name="productName" value="${this.props.product.productName}"/>
        </div>
        <div class="categotyName">
            <span>카테고리명</span>
            <input name="categoryName" value="${this.props.product.categoryName}"/>
        </div>
        <div class="price">
            <span>가격</span>
            <input name="price" value="${this.props.product.price}"/>
        </div>
        <div class="discountRate">
            <span>할인율</span>
            <input name="discountRate" value="${this.props.product.discountRate}"/>
        </div>
        <div class="count">
            <span>재고</span>
            <input name="count" value="${this.props.product.count}"/>
        </div>
        <div class="desc">
            <span>상세 설명</span>
            <input name="desc" value="${this.props.product.desc}"/>
        </div>
    </form>`;

    new Modal(qs("#app"), {
      id: this.props.product.productId,
      headerText: "아이템 수정",
      type: "EDIT",
      contents,
      submit: this.props.editProduct.bind(this)
    });
  }

  deleteHandler() {
    this.props.deleteProduct(this.props.product.productId);
  }
}
