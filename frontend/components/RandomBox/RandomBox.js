//import { editProduct, deleteProduct } from "../../apis/index.js";
import Component from "../../core/Component.js";
import { qs, editForm, MODAL } from "../../utils/index.js";
import Modal from "../Modal/Modal.js";
import { isClassContained } from "../../utils/index.js";

export default class Product extends Component {
  template() {
    const { productId, Name, category, price, thumbnail, discount } =
      this.props.product;

    return `
            <li class="product-item-${productId}">
              <div class="image">
                <img src="${thumbnail}"/>
              </div>
              <div class="info">
                <div class="product-name">
                  <span>상품명</span>
                  <span>${Name}</span>
                </div>
                <div class="category-name">
                  <span>카테고리명</span>
                  <span>${category}</span>
                </div>
                <div class="price">
                  <span>가격</span>
                  ${
                    discount
                      ? `<span style="text-decoration: line-through">${price}</span>
                          <span>${discount}</span>`
                      : `<span>${price}</span>`
                  }
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
      if (isClassContained(e.target, "product-editBtn")) {
        this.editHandler();
      }

      if (isClassContained(e.target, "product-delBtn")) {
        this.deleteHandler();
      }
    });
  }

  editHandler() {
    // const product = await API.getProductDetail(this.props.product.id);
    // props 데이터가 아닌 디테일 정보를 받아왔다 가정
    const {
      productId,
      thumbnail,
      Name,
      category,
      price,
      discount,
      productMin,
      productMax,
      description,
      products,
      count
    } = this.props.product;

    const domList = [
      {
        className: "product-name",
        title: "상품명",
        attr: { name: "Name", value: Name }
      },
      {
        className: "category-name",
        title: "카테고리명",
        text: category,
        attr: { name: "category", value: category }
      },
      {
        className: "price",
        title: "가격",
        attr: { name: "price", value: price }
      },
      {
        className: "discount",
        title: "할인율",
        attr: {
          name: "discount",
          value: discount ? Math.round(100 - (discount / price) * 100) : 0
        }
      },
      {
        className: "count",
        title: "재고",
        attr: { name: "count", value: count }
      },
      {
        className: "item-min-price",
        title: "최저가",
        attr: { name: "prouctMin", value: productMin }
      },
      {
        className: "item-max-price",
        title: "최고가",
        attr: { name: "productMax", value: productMax }
      },
      {
        className: "desc",
        title: "상세설명",
        attr: { name: "description", value: description }
      }
    ];

    new Modal(qs("#app"), {
      id: productId,
      headerText: "상품 수정",
      type: "EDIT",
      contents: {
        body: [
          editForm(domList),
          MODAL.Div({ className: "item-list" }, [
            ...products.map(item => MODAL.Span({}, [item]))
          ])
        ]
      },
      submit: this.props.editProduct.bind(this)
    });
  }

  deleteHandler() {
    this.props.deleteProduct(this.props.product.productId);
  }
}
