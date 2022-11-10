import { qs, editForm, isClassContained } from "../../utils/index.js";
import ImageUploadForm from "../ImageUploadForm/ImageUploadForm.js";
import Component from "../../core/Component.js";
import Modal from "../Modal/Modal.js";
// import { getProductDetail } from "../../apis/index.js";
import style from "./product.css" assert { type: "css" };
document.adoptedStyleSheets.push(style);

export default class Product extends Component {
  template() {
    const { productId, productName, categoryName, price, thumbnail } =
      this.props.product;

    return `<li class="product-item product-${productId}">
              <div class="product-thumbnail">
                <img src="${thumbnail}"/>
              </div>
              <div class="info">
                <div class="product-name">
                  <span>${productName}</span>
                </div>
                <div class="category-name">
                  <span>${categoryName}</span>
                </div>
                <div class="product-price">
                  <span>${price.toLocaleString()}원</span>
                </div>
              </div>
              <div class="product-btns">
                <button type="button" class="btn product-editBtn">수정하기</button>
                <button type="button" class="btn product-delBtn">삭제하기</button>
              <div>
            </li>
        `;
  }

  render() {
    this.target.insertAdjacentHTML("beforeend", this.template());
  }

  setEvent() {
    const productLi = qs(`.product-${this.props.product.productId}`);
    productLi.addEventListener("click", e => {
      if (isClassContained(e.target, "product-editBtn")) {
        this.editHandler();
      }

      if (isClassContained(e.target, "product-delBtn")) {
        this.deleteHandler();
      }
    });
  }

  async editHandler() {
    // const product = await getProductDetail(this.props.product.productId);
    // props 데이터가 아닌 디테일 정보를 받아왔다 가정
    const {
      productId,
      thumbnail,
      productName,
      categoryName,
      price,
      description,
      count
    } = this.props.product;

    const domList = [
      {
        className: "product-img"
      },
      {
        className: "product-name",
        title: "상품명",
        attr: { name: "productName", value: productName }
      },
      {
        className: "category-name",
        title: "카테고리명",
        attr: { name: "categoryName", value: categoryName }
      },
      {
        className: "price",
        title: "가격",
        attr: { name: "price", value: price }
      },
      {
        className: "count",
        title: "재고",
        attr: { name: "count", value: count }
      },
      {
        className: "desc",
        title: "상세설명",
        attr: { name: "description", value: description }
      }
    ];

    await new Modal(qs("#app"), {
      id: productId,
      headerText: "아이템 수정",
      type: "EDIT",
      contents: {
        body: [editForm(domList)]
      },
      submit: this.props.editProductItem.bind(this)
    });
    new ImageUploadForm(qs("form > .product-img"));
  }

  deleteHandler() {
    this.props.deleteProductItem(this.props.product.productId);
  }
}
