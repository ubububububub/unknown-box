//import { editCategory, deleteCategory } from "../../apis/index.js";
import Component from "../../core/Component.js";
import { qs } from "../../utils/index.js";
import Modal from "../Modal/Modal.js";
import { isClassContained } from "../../utils/index.js";

export default class CategoryItem extends Component {
  template() {
    return `
            <li class="category-item-${this.props.id}">
                <span>${this.props.name}</span>
                <button type="button" class="btn category-editBtn">수정하기</button>
                <button type="button" class="btn category-delBtn">삭제하기</button>
            </li>
        `;
  }

  render() {
    this.target.insertAdjacentHTML("beforeend", this.template());
  }

  setEvent() {
    const categoryLi = qs(`.category-item-${this.props.id}`);

    categoryLi.addEventListener("click", e => {
      const target = e.target.closest("li").querySelector("span");

      if (isClassContained(e.target, "category-editBtn")) {
        this.editHandler(target);
        return;
      }

      if (this.isContained(e.target, "category-delBtn")) {
        this.deleteHandler();
        return;
      }
    });
  }

  editHandler() {
    new Modal(qs("#app"), {
      id: this.props.id,
      headerText: "카테고리 수정",
      type: "EDIT",
      contents: `<form><input name="name" value="${this.props.name}"/></form>`,
      submit: this.props.editCategory.bind(this, this.props.id),
      path: "/admin"
    });
  }

  deleteHandler() {
    this.props.deleteCategory(this.props.id);
  }
}
