import Component from "../../core/Component.js";
import CategoryItem from "../CategoryItem/CategoryItem.js";
import { MODAL, qs } from "../../utils/index.js";
//import { getCategoryList, addCategory, deleteCategory } from "../../apis/index.js";
import Modal from "../Modal/Modal.js";

export default class CategoryList extends Component {
  setup() {
    const mockData = [
      { id: 1, Name: "의류 랜덤박스" },
      { id: 2, Name: "전자제품 랜덤박스" },
      { id: 3, Name: "랜덤박스" }
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
    // const list = await API.getCategoryList();
    // this.state = { category: list };

    this.state.category.forEach(({ id, Name }) => {
      new CategoryItem(qs(".category-list"), {
        id,
        Name,
        editCategory: this.editCategory.bind(this),
        deleteCategory: this.deleteCategory.bind(this)
      });
    });
  }

  setEvent() {
    qs(".category-addBtn").addEventListener("click", () => {
      new Modal(qs("#app"), {
        headerText: "카테고리 추가",
        type: "ADD",
        contents: {
          body: [MODAL.Form({}, [MODAL.Input({ type: "text", name: "Name" })])]
        },
        submit: this.addCategory.bind(this)
      });
    });
  }

  async addCategory(data) {
    // await API.addCategory(data);
    location = "/admin";
  }

  editCategory(id, data) {
    // await API.editCategory(id, data);
    location = "/admin";
  }

  deleteCategory(id) {
    // await API.deleteCategory(id);
    const categories = this.state.category.filter(
      category => category.id !== id
    );
    this.setState({ category: categories });
  }
}
