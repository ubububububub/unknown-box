import Component from "../../core/Component.js";
import { qs } from "../../utils/index.js";
import AddressForm from "../AddressForm/AddressForm.js";

class InfoEditForm extends Component {
  template() {
    return `<form id="container-form">
            </form>
        `;
  }

  mounted() {
    this.props.formChildren.forEach(item => {
      if (item.type === "text") {
        qs("#container-form").insertAdjacentHTML(
          "beforeend",
          `<label for="${item.id}">${item.title}</label>
          <input type="text" id="${item.id}" name="${item.id}" ${
            item.value ? `value="${item.value}"` : null
          }/>`
        );
      } else if (item.type === "password") {
        qs("#container-form").insertAdjacentHTML(
          "beforeend",
          `<label for="${item.id}">${item.title}</label>
          <input type="password" id="${item.id}" name="${item.id}" ${
            item.value ? `value="${item.value}"` : null
          }/>`
        );
      } else if (item.type === "address") {
        qs("#container-form").insertAdjacentHTML(
          "beforeend",
          `<div id="address-container" ></div>`
        );
        new AddressForm(qs("#address-container"), this.props.orderAddress);
      }
    });
  }
}

export default InfoEditForm;
