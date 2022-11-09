import Component from "../../core/Component.js";
import CategoryItem from "../CategoryItem/CategoryItem.js";
import { MODAL, qs } from "../../utils/index.js";
//import { getCategoryList, addCategory, deleteCategory } from "../../apis/index.js";
import Modal from "../Modal/Modal.js";

export default class CategoryList extends Component {
  template() {
    return `<ul class="category-list">
              <button type="button" class="category-addBtn">추가하기</button>
            </ul>
              `;
  }

  async mounted() {
    // const list = await getCategoryList();
    // this.state = { category: list };
    const mockData = [
      { categoryId: 1, categoryName: "의류 랜덤박스" },
      { categoryId: 2, categoryName: "전자제품 랜덤박스" },
      { categoryId: 3, categoryName: "랜덤박스" }
    ];

    this.state = {
      category: mockData
    };

    this.state.category.forEach(({ categoryId, categoryName }) => {
      new CategoryItem(qs(".category-list"), {
        categoryId,
        categoryName,
        editCategoryName: this.editCategoryName.bind(this),
        deleteCategoryName: this.deleteCategoryName.bind(this)
      });
    });
  }

  setEvent() {
    qs(".category-addBtn").addEventListener("click", () => {
      new Modal(qs("#app"), {
        headerText: "카테고리 추가",
        type: "ADD",
        contents: {
          body: [
            MODAL.Form({}, [
              MODAL.Input({ type: "text", name: "categoryName" })
            ])
          ]
        },
        submit: this.addCategoryName.bind(this)
      });
    });
  }

  async addCategoryName(data) {
    // await addCategory(data);
    location = "/admin";
  }

  async editCategoryName(id, data) {
    // await editCategory(id, data);
    location = "/admin";
  }

  async deleteCategoryName(id) {
    // await deleteCategory(id);
    const remain = this.state.category.filter(
      category => category.categoryId !== id
    );
    this.setState({ category: remain });
  }
}
