import Component from "../../core/Component.js";
import { qs, MODAL } from "../../utils/index.js";
import Modal from "../Modal/Modal.js";
import { isClassContained } from "../../utils/index.js";
import style from "./categoryItem.css" assert { type: "css" };
document.adoptedStyleSheets.push(style);

export default class CategoryItem extends Component {
  template() {
    return `
            <li class="category-item category-item-${this.props.categoryId}">
                <span>${this.props.categoryName}</span>
                <div>
                  <button type="button" class="btn category-editBtn">수정하기</button>
                  <button type="button" class="btn category-delBtn">삭제하기</button>
                </div>
            </li>
        `;
  }

  render() {
    this.target.insertAdjacentHTML("beforeend", this.template());
  }

  setEvent() {
    const categoryLi = qs(`.category-item-${this.props.categoryId}`);

    categoryLi.addEventListener("click", e => {
      if (isClassContained(e.target, "category-editBtn")) {
        this.editHandler();
      }

      if (isClassContained(e.target, "category-delBtn")) {
        this.deleteHandler();
      }
    });
  }

  editHandler() {
    new Modal(qs("#app"), {
      id: this.props.categoryId,
      headerText: "카테고리 수정",
      type: "EDIT",
      contents: {
        body: [
          MODAL.Form({}, [
            MODAL.Input({
              value: this.props.categoryName,
              name: "categoryName"
            })
          ])
        ]
      },
      submit: this.props.editCategoryName.bind(this)
    });
  }

  deleteHandler() {
    this.props.deleteCategoryName(this.props.categoryId);
  }
}
