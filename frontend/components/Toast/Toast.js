import { qs } from "../../utils/index.js";
import style from "./toast.css" assert { type: "css" };
document.adoptedStyleSheets.push(style);

class Toast {
  constructor(text) {
    this.text = text || "확인";
    this.render();
  }

  render() {
    if (!qs(".toast-container")) {
      this.container = document.createElement("div");
      this.container.className = "toast-container";
      document.body.appendChild(this.container);
    } else {
      this.container = qs(".toast-container");
    }
    this.toast = document.createElement("div");
    this.toast.className = "toast";
    this.container.insertAdjacentElement("afterbegin", this.toast);

    const text = document.createElement("span");
    text.innerText = this.text;
    this.toast.appendChild(text);

    setTimeout(() => {
      this.toast.parentNode?.removeChild(this.toast);
    }, 2000);
  }
}

export default Toast;
