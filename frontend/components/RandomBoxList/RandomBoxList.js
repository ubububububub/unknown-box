import Component from "../../core/Component.js";
import { isClassContained, qs, createEditForm } from "../../utils/index.js";
import ImageUploadForm from "../ImageUploadForm/ImageUploadForm.js";
import Modal from "../Modal/Modal.js";
import RandomBox from "../RandomBox/RandomBox.js";
import { getBoxList, editBox, deleteBox, addBox } from "../../apis/index.js";
import style from "./randomBoxList.css" assert { type: "css" };
document.adoptedStyleSheets.push(style);

export default class RandomBoxList extends Component {
  template() {
    return `<button type="button" class="btn randombox-addBtn">추가하기</button>
              <ul class="admin_randombox-list"></ul>`;
  }

  async mounted() {
    const boxList = await getBoxList();

    this.state = { boxList };

    this.state.boxList.forEach(
      box =>
        new RandomBox(qs(".admin_randombox-list"), {
          box,
          editBoxProduct: this.editBoxProduct.bind(this),
          deleteBoxProduct: this.deleteBoxProduct.bind(this)
        })
    );
  }

  setEvent() {
    this.target.addEventListener("click", e => {
      if (!isClassContained(e.target, "btn")) return;

      if (isClassContained(e.target, "randombox-addBtn")) {
        this.addHandler();
      }
    });
  }

  async addHandler() {
    const domList = [
      {
        className: "randombox-img",
        title: "썸네일"
      },
      {
        className: "randombox-name",
        title: "상품명",
        attr: { name: "randomboxName" }
      },
      {
        className: "category-name",
        title: "카테고리명",
        attr: { name: "categoryName" }
      },
      { className: "price", title: "가격", attr: { name: "price" } },
      { className: "discount", title: "할인율", attr: { name: "discount" } },
      { className: "count", title: "재고", attr: { name: "count" } },
      {
        className: "product-min-price",
        title: "최저가",
        attr: { name: "productMin" }
      },
      {
        className: "product-max-price",
        title: "최고가",
        attr: { name: "productMax" }
      },
      { className: "desc", title: "상세설명", attr: { name: "description" } }
    ];

    await new Modal(qs("#app"), {
      type: "ADD",
      headerText: "랜덤박스 추가하기",
      contents: { body: [createEditForm(domList)] },
      submit: this.addBoxProduct.bind(this)
    });
    new ImageUploadForm(qs("form > .randombox-img"));
  }

  async addBoxProduct(data) {
    await addBox(data);
    location = "/admin/randombox";
  }

  async deleteBoxProduct(id) {
    await deleteBox(id);
    const remain = this.state.boxList.filter(box => box.randomboxId !== id);
    this.setState({ boxList: remain });
  }

  async editBoxProduct(id, data) {
    await editBox(id, data);
    location = "/admin/randombox";
  }
}
