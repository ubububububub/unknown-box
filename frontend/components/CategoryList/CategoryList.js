import Component from "../../core/Component.js";
import CategoryItem from "../CategoryItem/CategoryItem.js";
import { qs } from "../../utils/index.js";
//import { getCategoryList, addCategory, deleteCategory } from "../../apis/index.js";
import Modal from "../Modal/Modal.js";

export default class CategoryList extends Component {
  setup() {
    const mockData = [
      { id: 1, name: "의류 랜덤박스" },
      { id: 2, name: "전자제품 랜덤박스" },
      { id: 3, name: "랜덤박스" }
    ];

    this.state = {
      category: mockData
    };
  }

  template() {
    return `<ul class="category-list">
              <button type="button" class="category-addBtn">추가하기</button>
            </ul>
              `;
  }

  mounted() {
    // const list = await getCategoryList();
    // this.state = { category: list };

    this.state.category.forEach(({ id, name }) => {
      new CategoryItem(qs(".category-list"), {
        name,
        id,
        editCategory: this.editCategoryState.bind(this),
        deleteCategory: this.deleteCategoryState.bind(this)
      });
    });
  }

  setEvent() {
    qs(".category-addBtn").addEventListener("click", () => {
      new Modal(qs("#app"), {
        headerText: "카테고리 추가",
        type: "ADD",
        contents: `<form><input name="name"/></form>`,
        submit: this.addCategoryState.bind(this),
        path: "/admin"
      });
    });
  }

  async addCategoryState(data) {
    // 동일한 카테고리명이 존재할 경우 toast 처리
    // await addCategory(data);
    location = "/admin";
  }

  editCategoryState(id, name) {
    // await editCategory(id, name);
    location = "/admin";
  }

  deleteCategoryState(id) {
    // await deleteCategory(id);
    const categories = this.state.category.filter(
      category => category.id !== id
    );
    this.setState({ category: categories });
  }
}
