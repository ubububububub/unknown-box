import Component from "../../core/Component.js";
import { qs } from "../../utils/index.js";
import AddressForm from "../AddressForm/AddressForm.js";
import ImageUploadForm from "../ImageUploadForm/ImageUploadForm.js";
import style from "./form.css" assert { type: "css" };
document.adoptedStyleSheets.push(style);

class Form extends Component {
  template() {
    return `<form id="form_section">
            </form>
        `;
  }

  mounted() {
    this.props.formChildren.forEach(item => {
      if (item.type === "text") {
        qs("#form_section").insertAdjacentHTML(
          "beforeend",
          `
          <div class="form-${item.id}_container" >
            <label for="${item.id}">${item.title}</label>
            <input type="text" id="${item.id}" name="${item.id}" ${
            item.value ? `value="${item.value}"` : ""
          }/>
          </div>`
        );
      } else if (item.type === "password") {
        qs("#form_section").insertAdjacentHTML(
          "beforeend",
          `
          <div class="form-${item.id}_container" >
            <label for="${item.id}">${item.title}</label>
            <input type="password" id="${item.id}" name="${item.id}" ${
            item.value ? `value="${item.value}"` : ""
          }/>
          </div>`
        );
      } else if (item.type === "address") {
        qs("#form_section").insertAdjacentHTML(
          "beforeend",
          `<div id="address_container" ></div>`
        );
        new AddressForm(qs("#address_container"), this.props.orderAddress);
      } else if (item.type === "image") {
        qs("#form_section").insertAdjacentHTML(
          "beforeend",
          `<div id="image-upload-container"></div>`
        );
        new ImageUploadForm(qs("#image-upload_container"));
      } else if (item.type === "button") {
        qs("#form_section").insertAdjacentHTML(
          "beforeend",
          `<button class="form-${item.id}-btn form_btn" >${item.title}</div>`
        );
      }
    });
  }

  static getFormData() {
    const formData = new FormData(qs("#form_section"));
    return formData;
  }
}

export default Form;
