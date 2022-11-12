import Component from "../../core/Component.js";
import {
  qs,
  createEditForm,
  MODAL,
  isClassContained
} from "../../utils/index.js";
import ImageUploadForm from "../ImageUploadForm/ImageUploadForm.js";
import Modal from "../Modal/Modal.js";
import { getBoxDetail } from "../../apis/index.js";

import style from "./randomBoxItem.css" assert { type: "css" };
document.adoptedStyleSheets.push(style);

export default class RandomBoxItem extends Component {
  template() {
    const {
      randomboxId,
      randomboxName,
      categoryName,
      price,
      thumbnail,
      discount
    } = this.props.box;

    return `
            <li class="randombox-item randombox-${randomboxId}">
              <div class="randombox-thumbnail">
                <img src="${thumbnail}"/>
              </div>
              <div class="info">
                <div class="randombox-name">
                  <span>${randomboxName}</span>
                </div>
                <div class="category-name">
                  <span>${categoryName}</span>
                </div>
                <div class="price">
                  ${
                    discount != price
                      ? `<span style="text-decoration: line-through">${price.toLocaleString()}원</span>
                          <span>${discount.toLocaleString()}원</span>`
                      : `<span>${price.toLocaleString()}원</span>`
                  }
                </div>
              </div>
              <div class="randombox-btns">
                <button type="button" class="btn randombox-editBtn">수정하기</button>
                <button type="button" class="btn randombox-delBtn">삭제하기</button>
              </div>
            </li>
        `;
  }

  render() {
    this.target.insertAdjacentHTML("beforeend", this.template());
  }

  setEvent() {
    const boxLi = qs(`.randombox-${this.props.box.randomboxId}`);
    boxLi.addEventListener("click", e => {
      if (isClassContained(e.target, "randombox-editBtn")) {
        this.editHandler();
      }

      if (isClassContained(e.target, "randombox-delBtn")) {
        this.deleteHandler();
      }
    });
  }

  async editHandler() {
    const box = await getBoxDetail(this.props.box.randomboxId);
    const {
      randomboxId,
      thumbnail,
      randomboxName,
      categoryName,
      price,
      discount,
      description,
      products,
      count
    } = box;

    const domList = [
      {
        className: "box-img",
        title: "이미지"
      },
      {
        className: "box-name",
        title: "상품명",
        attr: { name: "randomboxName", value: randomboxName }
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
        className: "discount",
        title: "할인율",
        attr: {
          name: "discount",
          value: Number(discount)
            ? Math.round(100 - (discount / price) * 100)
            : 0
        }
      },
      {
        className: "count",
        title: "재고",
        attr: { name: "count", value: count }
      },
      {
        className: "product-min-price",
        title: "최저가",
        attr: { name: "productMin", value: 0 }
      },
      {
        className: "product-max-price",
        title: "최고가",
        attr: { name: "productMax", value: price * 2 }
      },
      {
        className: "desc",
        title: "상세설명",
        attr: { name: "description", value: description || "" }
      }
    ];

    await new Modal(qs("#app"), {
      id: randomboxId,
      headerText: "상품 수정",
      type: "EDIT",
      contents: {
        body: [
          createEditForm(domList),
          MODAL.Div({ className: "modal-products-list-wrapper" }, [
            MODAL.Span({}, ["상품목록"]),
            MODAL.Div(
              { className: "modal-products-list" },
              products?.map(product => MODAL.Div({}, [product.productName]))
            )
          ])
        ]
      },
      submit: this.props.editBoxProduct.bind(this)
    });
    new ImageUploadForm(qs("form > .box-img"));
  }

  deleteHandler() {
    this.props.deleteBoxProduct(this.props.box.randomboxId);
  }
}
