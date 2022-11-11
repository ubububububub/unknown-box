//import { editBox, deleteBox } from "../../apis/index.js";
import Component from "../../core/Component.js";
import {
  qs,
  createEditForm,
  MODAL,
  isClassContained
} from "../../utils/index.js";
import ImageUploadForm from "../ImageUploadForm/ImageUploadForm.js";
import Modal from "../Modal/Modal.js";
import style from "./randomBox.css" assert { type: "css" };
document.adoptedStyleSheets.push(style);

export default class Product extends Component {
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
                    discount
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
    // const box = await getBoxDetail(this.props.box.randomboxId);
    // props 데이터가 아닌 디테일 정보를 받아왔다 가정
    const {
      randomboxId,
      thumbnail,
      randomboxName,
      categoryName,
      price,
      discount,
      productMin,
      productMax,
      description,
      products,
      count
    } = this.props.box;

    const domList = [
      {
        className: "box-img",
        title: "이미지"
      },
      {
        className: "box-name",
        title: "상품명",
        attr: { name: "Name", value: randomboxName }
      },
      {
        className: "category-name",
        title: "카테고리명",
        attr: { name: "category", value: categoryName }
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
        className: "product-min-price",
        title: "최저가",
        attr: { name: "prouctMin", value: productMin }
      },
      {
        className: "product-max-price",
        title: "최고가",
        attr: { name: "productMax", value: productMax }
      },
      {
        className: "desc",
        title: "상세설명",
        attr: { name: "description", value: description }
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
              products.map(product => MODAL.Div({}, [product]))
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
