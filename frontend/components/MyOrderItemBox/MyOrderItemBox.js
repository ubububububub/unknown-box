import Component from "../../core/Component.js";
import { qs, qsAll } from "../../utils/index.js";
import style from "./myOrderItemBox.css" assert { type: "css" };
document.adoptedStyleSheets.push(style);

class MyOrderItemBox extends Component {
  template() {
    const { item, parentIdx, boxIdx } = this.props;

    return `<div class="myorderitem-product-item">
                <img src="${item.thumbnail}"/>
                <span>${item.randomboxName}</span>
            </div>`;
  }

  render() {
    this.target.insertAdjacentHTML("beforeend", this.template());
  }

  setEvent() {
    const { item, parentIdx, boxIdx } = this.props;
    qsAll(".myorderitem-product-list")[this.props.parentIdx].children[
      this.props.boxIdx
    ].addEventListener("mousedown", e => {
      if (item.product.thumbnail) {
        e.currentTarget.innerHTML = ` <img src="${item.product.thumbnail}"/>
            <span>${item.product.productName}</span>`;
      }
    });

    qsAll(".myorderitem-product-list")[this.props.parentIdx].children[
      this.props.boxIdx
    ].addEventListener("mouseup", e => {
      if (item.product.thumbnail) {
        e.currentTarget.innerHTML = ` <img src="${item.thumbnail}"/>
        <span>${item.randomboxName}</span>`;
      }
    });
  }
}

export default MyOrderItemBox;
