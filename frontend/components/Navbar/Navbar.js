import Component from "../../core/Component.js";
import { qs } from "../../utils/index.js";
import style from "./navbar.css" assert { type: "css" };
document.adoptedStyleSheets.push(style);

export default class Navbar extends Component {
  template() {
    return this.props.reduce((template, navItem) => {
      template += `
                <div class="navbar-item" id="${navItem.id}">
                    <a href="${navItem.path}">
                        ${navItem.title}
                    </a>
                </div>`;
      return template;
    }, "");
  }

  mounted() {
    this.props.forEach(navItem => {
      console.log(window.location.pathname, navItem.path);

      window.location.pathname === navItem.path
        ? qs(`#${navItem.id}`).classList.add("navbar-item-selected")
        : qs(`#${navItem.id}`).classList.remove("navbar-item-selected");
    });
  }
}
