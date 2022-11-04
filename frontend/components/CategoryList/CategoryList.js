import Component from "../../core/Component.js";
import CategoryItem from "../CategoryItem/CategoryItem.js";

export default class CategoryList extends Component {
  render() {
    this.props.forEach(category => {
      return new CategoryItem(this.target, category);
    });

    this.target.insertAdjacentHTML(
      "beforebegin",
      '<button type="button">추가하기</button>'
    );
  }
}
