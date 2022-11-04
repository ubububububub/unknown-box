import Component from "../../core/Component.js";

export default class CategoryItem extends Component {
  template() {
    return `
            <div id="category-item">
                <div class="category-item-name">${this.props.title}</div>
                <button type="button">수정하기</button>
                <button type="button">삭제하기</button>
            </div>
        `;
  }

  render() {
    this.target.insertAdjacentHTML("beforeend", this.template());
  }
}
